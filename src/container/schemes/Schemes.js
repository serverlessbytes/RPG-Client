import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import FeatherIcon from 'feather-icons-react';
import { ListButtonSizeWrapper, Main, ProjectPagination, TableWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Col, Form, Input, Row, Select, Table, Tabs, Switch, Pagination, Menu, Dropdown, Space } from 'antd';
import { UserTableStyleWrapper } from '../pages/style';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { editSchemeData, getAllSchemes, getOneSchemeData, getSchemecategory, getSchemeData } from '../../redux/schemes/actionCreator';
import moment from 'moment';
import { getBenefitsData } from '../../redux/benefitsType/actionCreator';
import { Modal } from '../../components/modals/antd-modals';
import ViewModal from './ViewModal';
import { constants } from 'redux-firestore';
import { CSVLink } from 'react-csv';
import { ApiPatch, ApiPost } from '../../helper/API/ApiData';
import actions from '../../redux/schemes/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImportFileModal from '../../components/modals/ImportFileModal';
import { DownOutlined } from '@ant-design/icons';
import StarRatings from 'react-star-ratings';

const Schemes = () => {
  const { getAllSchemesSuccess, addSchemeSuccess, editSchemeSuccess, editSchemeErr, addSchemeErr, addSchemeInBulk } = actions;
  const { path } = useRouteMatch();
  let history = useHistory();
  let dispatch = useDispatch();
  const CSVLinkRef = useRef(null)
  const { Option } = Select;
  // const [setUsersTableData, setsetUsersTableData] = useState()
  const usersTableData = [];

  const [schemeCategory, setSchemeCategory] = useState({
    category: '',
    benefit: ''
  });
  const [viewModal, setViewModal] = useState(false);
  const [state, setState] = useState('') //for export
  const [status, setStatus] = useState('active');
  const [perPage, setPerPage] = useState(20);// forpagination
  const [pageNumber, setPageNumber] = useState(1);
  const [exportTog, setExportTog] = useState(false)
  const [importModal, setImportModal] = useState(false);
  const [schemeTableData, setSchemeTableData] = useState();
  // const [state, setState] = useState({ visible: false, modalType: 'primary', colorModal: false });

  const users = useSelector(state => state.scheme.getAllSchemeData);
  const getBenefitData = useSelector(state => state.beneFit.getBenefitData);
  const schemeData = useSelector(state => state.scheme.schemecatogeryData);
  const getOneScheme = useSelector((state) => state.scheme.getOneSchemeData);
  const allschemeData = useSelector(state => state.scheme.allSchemeData); // export 
  const addSchemeData = useSelector(state => state.scheme.addSchemeData); // export addSchemeData 
  const editSchemedata = useSelector((state) => state.scheme.editSchemeData); // export  editSchemeData for toastify
  const editSchemeError = useSelector((state) => state.scheme.editSchemeErr); // export  editSchemeData for toastify
  const addSchemeError = useSelector((state) => state.scheme.addSchemeErr); // export  editSchemeData for toastifycons
  const schemeModulData = useSelector((state) => state.scheme.addSchemeInBulk)
  const schemeModulDataErr = useSelector((state) => state.scheme.addSchemeInBulkErr)

  const onChnageValue = (e, name) => {
    if (name === 'category') {
      setSchemeCategory({ ...schemeCategory, category: e });
    } else if (name === 'benefits') {
      setSchemeCategory({ ...schemeCategory, benefit: e });
    }
  };

  // useEffect(() => {
  //   if (users?.data) {
  //     users?.data.map((item,i) => {
  //       let x = Math.floor((Math.random() * 5) + 1);

  //       let data = {
  //         "comment": "test rating",
  //         "rating": x,
  //         "schemeId": item.id
  //       }
  //       ApiPost('schemeRating/addSchemeRating',data).then((res) => {
  //         console.log('index', i)
  //       })
  //     })
  //   }
  // }, [users]);

  useEffect(() => {
    dispatch(getSchemecategory());
  }, []);

  useEffect(() => {
    dispatch(getBenefitsData());
  }, []);

  useEffect(() => {
    if (editSchemedata && editSchemedata.status === 200) {
      dispatch(editSchemeSuccess(null))
      //dispatch(getJobsFilterForMainSuccess(null))
      toast.success("Scheme update successful");

      //toastAssetsAdd(true)
      //onHide()
    }
    // else if(editSchemedata && editSchemedata.data && editSchemedata.data.isActive === true){
    //   dispatch(editSchemeSuccess(null))
    //   toast.success("Jobs Update successful");
    // }
  }, [editSchemedata])

  useEffect(() => {
    console.log("schemeModulData=====", schemeModulData);
    if (schemeModulData && schemeModulData.status === 200) {
      toast.success("Scheme Import sucessful")
      dispatch(addSchemeInBulk(null))
    }
    if (schemeModulData && schemeModulData.status !== 200) {
      toast.error("somthimg went wromg")
      dispatch(addSchemeInBulk(null))
    }
  }, [schemeModulData])


  useEffect(() => {
    if (addSchemeData && addSchemeData.status === 200) {
      dispatch(addSchemeSuccess(null))
      toast.success("Scheme add successful");
      //toastAssetsAdd(true)
      //onHide()
    }
  }, [addSchemeData])

  useEffect(() => {
    if (editSchemeError) {
      dispatch(editSchemeErr(null))
      toast.error("Something Wrong")
    }
  }, [editSchemeError])

  useEffect(() => {
    if (addSchemeError) {
      dispatch(addSchemeErr(null))
      toast.error("Something Wrong")
    }
  }, [addSchemeError])

  const onApply = () => {
    dispatch((perPage, pageNumber, status, schemeCategory.benefit ? schemeCategory.benefit : "", schemeCategory.category ? schemeCategory.category : ""));
  };
  const header = [
    { label: "id", key: "id" },
    { label: "name", key: "name" },
    { label: "locations", key: "locations" },
    { label: "schemeBenifit", key: "schemeBenifit" },
    { label: "schemeCategory", key: "schemeCategory" },
    { label: "benificiary", key: "benificiary" },
    { label: "benifitLine", key: "benifitLine" },
    { label: "createdAt", key: "createdAt" },
    { label: "detail", key: "detail" },
    { label: "documentation", key: "documentation" },
    { label: "elink", key: "elink" },
    { label: "grievanceRedress", key: "grievanceRedress" },
    { label: "howToApply", key: "howToApply" },
    { label: "isActive", key: "isActive" },
    { label: "isApproved", key: "isApproved" },
    { label: "key", key: "key" },
    // { label: "sequence", key: "sequence" },
    { label: "spoc", key: "spoc" },
    { label: "thumbnail", key: "thumbnail" },
    { label: "updatedAt", key: "updatedAt" },
    { label: "videoUrl", key: "videoUrl" },
    { label: "viewCount", key: "viewCount" },
    { label: "website", key: "website" },

  ];
  useEffect(() => {
    if (users?.data) { //set a state for export excel
      setState(users.data.map((item) => {
        return {
          ...item,
          locations: item?.locations?.map(item => item.name),
          schemeBenifit: item?.schemeBenifit?.name,
          schemeCategory: item?.schemeCategory?.name,
          benifitLine: item.benifitLine,
        }
      })
      )
    }
  }, [users])

  useEffect(() => {
    if (allschemeData?.data?.data) { //set a state for export excel
      setState(allschemeData.data.data.map((item) => {
        return {
          ...item,
          locations: item?.locations?.map(item => item.name),
          schemeBenifit: item?.schemeBenifit?.name,
          schemeCategory: item?.schemeCategory?.name,
          benifitLine: item.benifitLine,
        }
      })
      )
    }
  }, [allschemeData])

  useEffect(() => {
    if (state.length && exportTog) {
      CSVLinkRef?.current?.link.click()  // for export
      toast.success("Scheme data exported successfully")
    } else if (exportTog) {
      toast.success("No scheme data for export")
    }

  }, [state])

  useEffect(() => {
    return (() => {
      dispatch(getAllSchemesSuccess(null)) //FOR CLEAR A STATE OF A EXPORT
    })
  }, [])
  const reDirect = () => {
    history.push(`${path}/addscheme`);
  };

  const reDirectSchemes = key => {
    history.push(`${path}/addscheme?key=${key}`);
  };

  const newSchemes = userForDelete => {
    const newVal = ApiPost("scheme/editScheme", userForDelete)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getAllSchemes())
        }
        return res
      })
    return newVal
  }

  const deleteSchemes = async key => {
    let userForDelete = users && users.data.find(item => item.key === key);
    if (userForDelete) {
      delete userForDelete.key;
      delete userForDelete.updatedAt;
      delete userForDelete.viewCount;
      delete userForDelete.createdAt;
      delete userForDelete.schemeRatings;
      userForDelete = {
        ...userForDelete,
        schemeBenifit: userForDelete.schemeBenifit.id,
        schemeCategory: userForDelete.schemeCategory.id,
        isActive: false,
        isDeleted: true,
      };
      // dispatch(editSchemeData(userForDelete));
      const deleteSchemes = await newSchemes(userForDelete)
      if (deleteSchemes.status === 200) {
        toast.success("schemes delete successful")
      }
    }
  };

  const activeSchemeData = data => {
    const newVal = ApiPost("scheme/editScheme", data)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getAllSchemes())
        }
        return res
      })
    return newVal
  }

  const onRestore = async (key) => {
    let userForactive = users && users.data.find(item => item.key === key);
    let data = {
      id: userForactive.id,
      // sequence: userForactive.sequence,
      name: userForactive.name,
      schemeCategory: userForactive.schemeCategory.id,
      schemeBenifit: userForactive.schemeBenifit.id,
      benifitLine: userForactive.benifitLine,
      benificiary: userForactive.benificiary,
      locations: userForactive.locations,
      detail: userForactive.detail,
      howToApply: userForactive.howToApply,
      documentation: userForactive.documentation,
      thumbnail: userForactive.thumbnail,
      videoUrl: userForactive.videoUrl,
      website: userForactive.website,
      type: userForactive.type,
      elink: userForactive.elink,
      grievanceRedress: userForactive.grievanceRedress,
      spoc: userForactive.spoc,
      isActive: true,
      isDeleted: false,
      isPublished: true,
      isApproved: true,
      //key:key,
    }
    const restoreSchemeData = await activeSchemeData(data)
    if (restoreSchemeData.status === 200) {
      toast.success("Schemes active successful")
    }
    // dispatch(editSchemeData(data));

  }

  useEffect(() => {
    dispatch(getSchemeData(perPage, pageNumber, status)); //for listing
  }, [perPage, pageNumber, status]);
  const { TabPane } = Tabs;

  const callback = key => {
    setStatus(key);
    setPageNumber(1);
    setExportTog(false);
  };

  const viewSchemesdata = (key) => {
    // dispatch(getOneSchemeData(key))
    // setViewModal(true)
    history.push(`/admin/scheme/view?key=${key}`)
  }

  const onExportschemes = () => {
    dispatch(getSchemeData(perPage, pageNumber, status, schemeCategory.benefit ? schemeCategory.benefit : "", schemeCategory.category ? schemeCategory.category : ""));
    setExportTog(true)
  }

  const onAllExportSchemes = () => {
    dispatch(getAllSchemes())
    setExportTog(true)
  }

  const clearFilter = () => {
    setSchemeCategory({ category: "", benefit: "" })
    dispatch(getSchemeData(perPage, pageNumber, status));
  }

  const onClick = ({ key }) => {
    if (key == 'exportSchemes') {
      onExportschemes();
    }
    if (key == 'exportAllScheme') {
      onAllExportSchemes();
    }
    if (key == 'addScheme') {
      reDirect();
    }
    if (key == 'import') {
      setImportModal(true);
    }

  };

  const menu = (
    <Menu
      onClick={onClick}
      items={[
        {
          label: 'Export Schemes',
          key: 'exportSchemes',
        },
        {
          label: 'Export All Scheme',
          key: 'exportAllScheme',
        },
        {
          label: 'Add Scheme',
          key: 'addScheme',
        },
        {
          label: 'Import',
          key: 'import',
        },
      ]}
    />
  );

  const onApproved = (id, isAp) => {
    if (status !== "active") {
      return
    }
    let data = {
      id: id,
      isApproved: !isAp
    }

    ApiPost(`scheme/updateIsApproved?`, data)
      .then((res) => {
        console.log("res", res)
        toast.success(data.isApproved ? "Approved successful" : "Disapproved successful ")
        dispatch(getSchemeData(perPage, pageNumber, status, schemeCategory.benefit ? schemeCategory.benefit : "", schemeCategory.category ? schemeCategory.category : ""));
      })
      .catch((err) => console.log("Error", err))
  }

  useEffect(() => {
    setSchemeTableData(users?.data.map(item => {
      let schemeratings = item.schemeRatings.map(item => item.rating)
      // console.log("schemeratings",schemeratings)
      var sum = 0;
      for (var i = 0; i < schemeratings.length; i++) {
        sum += parseInt(schemeratings[i], 10);
      }
      var avg = sum / schemeratings.length;
      // console.log(avg);
      return ({
        SchemeName: (
          <span style={{ cursor: "pointer" }} onClick={() => viewSchemesdata(item.key)}>
            {item?.name}
          </span>
        ),
        // SchemeName: item.name,
        TypeOfBenefits: item.schemeBenifit.name,
        TargetBeneficiary: item.benificiary,
        //  schemeRatings: item.schemeRatings.map(item => item.rating),
        schemeRatings: (
          <StarRatings
            rating={avg ? avg : 0}
            starRatedColor="#f57c00"
            numberOfStars={5}
            name="schemeRatings"
            starDimension="13px"
          />
        ),
        Website: item.website,
        LastUpdated: moment(item.updatedAt).format('DD-MM-YYYY'),
        approved: (
          <>
            {/* <div onClick={() => onApproved(item.id, item.isApproved)}>
              <Switch checked={item.isApproved} disabled={status === "active" ? false : true}></Switch>
            </div> */}
          </>
        ),

        action: (
          <div className="active-schemes-table">
            <div className="table-actions">

              {
                status === "active" ?
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
                      <FeatherIcon icon="trash-2" size={16} />
                    </Button>
                    {/* <Button className="btn-icon" to="#" type="success" onClick={() => viewSchemesdata(item.key)} shape="circle">
                      <FeatherIcon icon="eye" size={16} />
                    </Button> */}
                  </> : <Button
                    className="btn-icon"
                    type="warning"
                    to="#"
                    onClick={() => onRestore(item.key)}
                    shape="circle"
                  >
                    <FeatherIcon icon="rotate-ccw" size={16} />
                  </Button>
              }
              {status === '' && (
                <Button className="btn-icon" type="success" to="#" shape="circle">
                  <FeatherIcon icon="star" size={16} />
                </Button>
              )}


            </div>
          </div>
        ),
      });
    })
    )
  }, [users])

  const schemeTableColumns = [

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
      title: 'Scheme Ratings',
      dataIndex: 'schemeRatings',
    },
    {
      title: 'Website',
      dataIndex: 'Website',
    },
    {
      title: 'Last Updated',
      dataIndex: 'LastUpdated',
    },
    // {
    //   title: 'Approved',
    //   dataIndex: 'approved',
    // },
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
          //   <div className="page-header-actions">
          //     <Button size="small" onClick={() => onExportschemes()} type="info">
          //       Export Schemes
          //     </Button>
          //     <Button size="small" onClick={() => onAllExportSchemes()} type="info">
          //       Export All Scheme
          //     </Button>
          //     <CSVLink data={state} ref={CSVLinkRef} headers={header} filename="Scheme.csv" style={{ opacity: 0 }}></CSVLink>
          //     {/* <Button size="small" type="light">
          //                     Import Schemes
          //                 </Button> */}
          //     <Button onClick={reDirect} size="small" type="primary">
          //       Add Scheme
          //     </Button>
          //     <Button onClick={() => setImportModal(true)} size="small" type="primary">
          //       Import
          //     </Button>

          //     {/* <Button size="small" type="warning">
          //                     Deactivate All Schemes
          //                 </Button> */}
          //   </div>,
          <div key="1" className="page-header-actions">
            <Dropdown overlay={menu} trigger='click'>
              <a onClick={e => e.preventDefault()}>
                <Space>
                  Actions
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
            <CSVLink
              headers={header}
              data={state}
              ref={CSVLinkRef}
              filename="Scheme.csv"
              style={{ opacity: 0 }}
            ></CSVLink>
          </div>
        ]}
      />
      <Main>
        <Cards headless>
          <Row gutter={15}>
            <Col xs={24}>
              <Row gutter={30}>
                <Col md={6} xs={24} className="mb-25">
                  <Form layout="vertical">
                    <Form.Item label="Scheme Category">
                      <Select
                        size="large"
                        className={schemeCategory.category ? "sDash_fullwidth-select" : 'select-option-typ-placeholder'}
                        name="category"
                        value={schemeCategory.category}
                        onChange={e => onChnageValue(e, 'category')}
                        placeholder="Select Scheme Category"
                      >
                        <Option value="">Select Scheme Category</Option>
                        {schemeData && schemeData.data?.map(items => <Option value={items.id}>{items.name} </Option>)}
                      </Select>
                    </Form.Item>
                  </Form>
                </Col>
                <Col md={6} xs={24} className="mb-25">
                  <Form layout="vertical">
                    <Form.Item label="Scheme Benefits">
                      <Select
                        size="large"
                        className={schemeCategory.benefit ? "sDash_fullwidth-select" : 'select-option-typ-placeholder'}
                        value={schemeCategory.benefit}
                        name="benefits"
                        onChange={e => onChnageValue(e, 'benefits')}
                        placeholder="Select Scheme Benefits"
                      >
                        <Option value="">Select Scheme Benefits</Option>
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
                    <Button size="small" type="primary" onClick={e => { onApply(e); setExportTog(false) }}>
                      Apply
                    </Button>
                    <Button size="small" type="light" onClick={() => clearFilter()}>
                      Clear
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
                    <TableWrapper className="table-responsive pb-30">

                      {/* --- search bar --- */}
                      {/* <Form name="sDash_select" layout="vertical">
                        <Form.Item name="search" label="">
                          <Input placeholder="search" style={{ width: 200 }} />
                        </Form.Item>
                      </Form> */}

                      <Table
                        // rowSelection={rowSelection}
                        dataSource={schemeTableData}
                        columns={schemeTableColumns}
                        // pagination={false}
                        pagination={{
                          defaultPageSize: users?.per_page,
                          total: users?.page_count,
                          // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
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
                  {/* <ProjectPagination>
                    <Pagination
                      onChange={() => { }}
                      showSizeChanger
                      onShowSizeChange={() => { }}
                      pageSize={10}
                      defaultCurrent={1}
                      total={10}
                    />
                  </ProjectPagination> */}
                </TabPane>
                <TabPane tab="Inactive Schemes" key="inactive">
                  <UserTableStyleWrapper>
                    <TableWrapper className="table-responsive">
                      {/* --- search bar --- */}
                      {/* <Form name="sDash_select" layout="vertical">
                        <Form.Item name="search" label="">
                          <Input placeholder="search" style={{ width: 200 }} />
                        </Form.Item>
                      </Form> */}

                      <Table
                        // rowSelection={rowSelection}
                        dataSource={schemeTableData}
                        // columns={usersTableColumns.filter(item => item.title !== 'Actions')}
                        columns={schemeTableColumns}
                        pagination={{
                          defaultPageSize: users?.per_page,
                          total: users?.page_count,
                          // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
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
      {importModal && <ImportFileModal importModal={importModal} handleCancel={() => setImportModal(false)} modaltitle="Import Schemes" />}
    </>
  );
};

export default Schemes;
