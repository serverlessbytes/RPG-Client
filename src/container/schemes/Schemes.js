import React, { useEffect, useState } from 'react';
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import FeatherIcon from 'feather-icons-react';
import { ListButtonSizeWrapper, Main, TableWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Col, Form, Input, Row, Select, Table, Tabs } from 'antd';
import { UserTableStyleWrapper } from '../pages/style';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { editSchemeData, getOneSchemeData, getSchemecategory, getSchemeData } from '../../redux/schemes/actionCreator';
import moment from 'moment';
import { getBenefitsData } from '../../redux/benefitsType/actionCreator';
import { Modal } from '../../components/modals/antd-modals';
import ViewModal from './ViewModal';
import { constants } from 'redux-firestore';

const Schemes = () => {
  const { path } = useRouteMatch();
  let history = useHistory();
  let dispatch = useDispatch();
  const users = useSelector(state => state.scheme.getAllSchemeData);

  const [schemeCategory, setSchemeCategory] = useState({
    category:'',
    benefit:''
  });
  const [viewModal, setViewModal] = useState(false);
  // const [state, setState] = useState({ visible: false, modalType: 'primary', colorModal: false });

  const getBenefitData = useSelector(state => state.beneFit.getBenefitData);
  const schemeData = useSelector(state => state.scheme.schemecatogeryData);
  const getOneScheme=useSelector((state) => state.scheme.getOneSchemeData);
  


  const onChnageValue = (e, name) => {
    if (name === 'category') {
      setSchemeCategory({ ...schemeCategory, category: e });
    } else if (name === 'benefits') {
      setSchemeCategory({ ...schemeCategory, benefit: e });
    }
  };

  useEffect(() => {
    dispatch(getSchemecategory());
  }, []);

  useEffect(() => {
    dispatch(getBenefitsData());
  }, []);

  const onApply = () => {
      dispatch(getSchemeData(perPage, pageNumber, status, schemeCategory.benefit, schemeCategory.category));
  };


  const reDirect = () => {
    history.push(`${path}/addscheme`);
  };

  const reDirectSchemes = key => {
    history.push(`${path}/addscheme?key=${key}`);
  };

  const deleteSchemes = key => {
    let userForDelete = users && users.data.find(item => item.key === key);
    if (userForDelete) {
      delete userForDelete.key;
      delete userForDelete.updatedAt;
      userForDelete = {
        ...userForDelete,
        schemeBenifit: userForDelete.schemeBenifit.id,
        schemeCategory: userForDelete.schemeCategory.id,
        isActive: false,
        isDeleted: true,
      };
      dispatch(editSchemeData(userForDelete));
    }
  };


  const [status, setStatus] = useState('active');
  const [perPage, setPerPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const { Option } = Select;
  const usersTableData = [];

  useEffect(() => {
    dispatch(getSchemeData(perPage, pageNumber, status)); //for listing
  }, [perPage, pageNumber, status]);
  const { TabPane } = Tabs;

  const callback = key => {
    setStatus(key);
    
  };

  const viewSchemesdata=(key)=>{
      dispatch(getOneSchemeData(key))
  
    setViewModal(true)
  }



  users &&
    users.data.map(item => {
      // console.log(item.key);
      return usersTableData.push({
        SchemeName: item.name,
        TypeOfBenefits: item.schemeBenifit.name,
        TargetBeneficiary: item.benificiary,
        Website: item.website,
        LastUpdated: moment(item.updatedAt).format('DD-MM-YYYY'),
        action: (
          <div className="active-schemes-table">
            <div className="table-actions">
              <>
                <Button
                  className="btn-icon"
                  onClick={() => reDirectSchemes(item.key)}
                  type="info"
                  to="#"
                  shape="circle"
                >
                  <FeatherIcon icon="edit" size={16} />
                </Button>
                <Button
                  className="btn-icon"
                  type="warning"
                  to="#"
                  onClick={() => deleteSchemes(item.key)}
                  shape="circle"
                >
                  <FeatherIcon icon="file" size={16} />
                </Button>
                <Button className="btn-icon" to="#" type="success" onClick={() => viewSchemesdata(item.key)} shape="circle">
                  <FeatherIcon icon="eye" size={16} />
                </Button>
                {status === '' && (
                  <Button className="btn-icon" type="success" to="#" shape="circle">
                    <FeatherIcon icon="star" size={16} />
                  </Button>
                )}
              </>
            </div>
          </div>
        ),
      });
    });

  const usersTableColumns = [
    // {
    //     title: 'Sequence',
    //     dataIndex: 'Sequence',
    //     sorter: (a, b) => a.Sequence.length - b.Sequence.length,
    //     sortDirections: ['descend', 'ascend'],
    // },
    {
      title: 'Scheme Name',
      dataIndex: 'SchemeName',
      sorter: (a, b) => a.SchemeName.length - b.SchemeName.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Type Of Benefits',
      dataIndex: 'TypeOfBenefits',
    },
    {
      title: 'Target Beneficiary',
      dataIndex: 'TargetBeneficiary',
    },
    {
      title: 'Website',
      dataIndex: 'Website',
    },
    // {
    //     title: 'Location',
    //     dataIndex: 'Location',
    //     sorter: (a, b) => a.status.length - b.status.length,
    //     sortDirections: ['descend', 'ascend'],
    // },
    {
      title: 'Last Updated',
      dataIndex: 'LastUpdated',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      width: '90px',
    },
  ];

  const rowSelection = {
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <>
      <PageHeader
        ghost
        title="Schemes"
        buttons={[
          <div className="page-header-actions">
            <Button size="small" type="link">
                            Export Schemes
                        </Button>
                        {/* <Button size="small" type="light">
                            Import Schemes
                        </Button> */}
            <Button onClick={reDirect} size="small" type="success">
              Create Scheme
            </Button>
            {/* <Button size="small" type="warning">
                            Deactivate All Schemes
                        </Button> */}
          </div>,
        ]}
      />
      <Main>
        <Cards headless>
          <Row gutter={15}>
            <Col xs={24}>
              <Row gutter={30}>
                <Col md={6} xs={24} className="mb-25">
                  <Form name="sDash_select" layout="vertical">
                    <Form.Item name="basic-select" label="Scheme Category">
                      <Select
                        size="large"
                        className="sDash_fullwidth-select"
                        name="category"
                        onChange={e => onChnageValue(e, 'category')}
                        placeholder="Select"
                      >
                        {schemeData && schemeData.data?.map(items => <Option value={items.id}>{items.name} </Option>)}
                      </Select>
                    </Form.Item>
                  </Form>
                </Col>
                <Col md={6} xs={24} className="mb-25">
                  <Form name="sDash_select" layout="vertical">
                    <Form.Item name="basic-select" label="Scheme Benefits">
                      <Select
                        size="large"
                        className="sDash_fullwidth-select"
                        name="benefits"
                        onChange={e => onChnageValue(e, 'benefits')}
                        placeholder="Select"
                      >
                        {getBenefitData &&
                          getBenefitData.data?.map(items => <Option value={items.id}>{items.name} </Option>)}
                      </Select>
                    </Form.Item>
                  </Form>
                </Col>
                {/* <Col md={6} xs={24} className="mb-25">
                                    <Form name="sDash_select" layout="vertical">
                                        <Form.Item name="basic-select" label="Location">
                                            <Select size="large" className="sDash_fullwidth-select" placeholder="Select">
                                                <Option value="2">  All India </Option>
                                                <Option value="3">  Andra Pradesh  </Option>
                                                <Option value="4">  Assam  </Option>
                                                <Option value="5">  Chandigarh  </Option>
                                                <Option value="6">  Dadar and Nagar Haveli   </Option>
                                                <Option value="7">   Daman and Diu   </Option>
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Col> */}
                <Col md={6} xs={24} className="mb-25">
                  <ListButtonSizeWrapper>
                    <Button size="small" type="primary" onClick={e => onApply(e)}>
                      Apply
                    </Button>
                  </ListButtonSizeWrapper>
                </Col>
              </Row>
              {/* <Row className="mb-25">
                                <Button size="small" type={type === "Active" ? "primary" : "light"} onClick={() => setType("Active")}>
                                    Active Schemes
                                </Button>
                                <Button size="small" type={type === "Inactive" ? "primary" : "light"} onClick={() => setType("Inactive")}>
                                    Inactive Schemes
                                </Button>
                            </Row>
                             <ActiveSchemesTable type ={type}/> */}

              <Tabs onChange={callback}>
                <TabPane tab="Active Schemes" key="active">
                  <UserTableStyleWrapper>
                    <TableWrapper className="table-responsive">
                      <Form name="sDash_select" layout="vertical">
                        <Form.Item name="search" label="">
                          <Input placeholder="search" style={{ width: 200 }} />
                        </Form.Item>
                      </Form>

                      <Table
                        // rowSelection={rowSelection}
                        dataSource={usersTableData}
                        columns={usersTableColumns}
                        pagination={{
                          defaultPageSize: users?.per_page,
                          total: users?.page_count,
                          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                          onChange: (page, pageSize) => {
                            setPageNumber(page);
                            setPerPage(pageSize);
                          },
                        }}
                      />
                    </TableWrapper>
                  </UserTableStyleWrapper>
                </TabPane>
                <TabPane tab="Inactive Schemes" key="inactive">
                  <UserTableStyleWrapper>
                    <TableWrapper className="table-responsive">
                      <Form name="sDash_select" layout="vertical">
                        <Form.Item name="search" label="">
                          <Input placeholder="search" style={{ width: 200 }} />
                        </Form.Item>
                      </Form>

                      <Table
                        // rowSelection={rowSelection}
                        dataSource={usersTableData}
                        columns={usersTableColumns.filter(item => item.title !== 'Actions')}
                        pagination={{
                          defaultPageSize: users?.per_page,
                          total: users?.page_count,
                          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                          onChange: (page, pageSize) => {
                            setPageNumber(page);
                            setPerPage(pageSize);
                          },
                          // defaultPageSize: 5,
                          // total: usersTableData.length,
                          // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        }}
                      />
                    </TableWrapper>
                  </UserTableStyleWrapper>
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </Cards>
      </Main>

      {viewModal && <ViewModal viewModal={viewModal} type="primary" setViewModal={setViewModal} data={getOneScheme} />}
    </>
  );
};

export default Schemes;
