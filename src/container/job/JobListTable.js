import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Form, Row, Select, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { UserTableStyleWrapper } from '../pages/style';
import { ListButtonSizeWrapper, TableWrapper } from '../styled';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';

const JobListTable = () => {
  const { users } = useSelector(state => {
    return {
      users: state.users,
    };
  });

  const usersTableData = [];

  users.map(user => {
    const { id, name, designation, status } = user;

    return usersTableData.push({
      key: id,
      user: name,
      // user: (
      //   <div className="user-info">
      //     <figure>
      //       <img style={{ width: '40px' }} src={require(`../../../${img}`)} alt="" />
      //     </figure>
      //     <figcaption>
      //       <Heading className="user-name" as="h6">
      //         {name}
      //       </Heading>
      //       <span className="user-designation">San Francisco, CA</span>
      //     </figcaption>
      //   </div>
      // ),
      email: 'john@gmail.com',
      company: 'Business Development',
      position: designation,
      joinDate: 'January 20, 2020',
      status: status,
      action: (
        <div className="table-actions">
          <>
            {/* <Button className="btn-icon" type="primary" to="#" shape="circle">
              <FeatherIcon icon="eye" size={16} />
            </Button> */}
            <Button className="btn-icon" type="info" to="#" shape="circle">
              <FeatherIcon icon="edit" size={16} />
            </Button>
            <Button className="btn-icon" type="danger" to="#" shape="circle">
              <FeatherIcon icon="trash-2" size={16} />
            </Button>
          </>
        </div>
      ),
    });
  });

  const usersTableColumns = [
    {
      title: 'User',
      dataIndex: 'user',
      // key: 'user',
      sorter: (a, b) => a.user.length - b.user.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ['descend', 'ascend'],
      // key: 'email',
    },
    {
      title: 'Company',
      dataIndex: 'company',
      // key: 'company',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      // key: 'position',
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      // key: 'joinDate',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      // key: 'status',
      // onFilter: (value, status) => status.name.indexOf(value) === 0,
      sorter: (a, b) => a.status.length - b.status.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      // key: 'action',
      width: '90px',
    },
  ];

  const rowSelection = {
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  const { Option } = Select;

  return (
    <Cards headless>
      <UserTableStyleWrapper>
        <TableWrapper className="table-responsive">
          <Row gutter={30}>
            <Col md={6} xs={24} className="mb-25">
              <Form name="sDash_select" layout="vertical">
                <Form.Item name="basic-select" label="State">
                  <Select size="large" className="sDash_fullwidth-select" placeholder="Select">
                    <Option value="1">All india</Option>
                    <Option value="2">Gujrat</Option>
                    <Option value="3">Bihar</Option>
                    <Option value="4">Assam</Option>
                    <Option value="5">Delhi</Option>
                    <Option value="6">Goa</Option>
                  </Select>
                </Form.Item>
              </Form>
            </Col>
            <Col md={6} xs={24} className="mb-25">
              <Form name="sDash_select" layout="vertical">
                <Form.Item name="basic-select" label="Employer">
                  <Select size="large" className="sDash_fullwidth-select" placeholder="Select">
                    <Option value="1">All</Option>
                    <Option value="2"> Manipal Hospital </Option>
                    <Option value="3"> K.j memorial hospital </Option>
                    <Option value="4"> Ananat hospital </Option>
                    <Option value="5"> Rishab Hospital  </Option>
                    <Option value="6"> Suvidha Hospital </Option>
                    <Option value="7"> Daksh Foundation </Option>
                  </Select>
                </Form.Item>
              </Form>
            </Col>
            <Col md={6} xs={24} className="mb-25">
              <Form name="sDash_select" layout="vertical">
                <Form.Item name="basic-select" label="Job Role">
                  <Select size="large" className="sDash_fullwidth-select" placeholder="Select">
                    <Option value="1">All</Option>
                    <Option value="2"> General Duty Assistant </Option>
                    <Option value="3"> Nursing </Option>
                    <Option value="4">  Tipper Truck Driver </Option>
                    <Option value="5"> Health Executive </Option>
                    <Option value="6">  Nursing Assistant  </Option>
                    <Option value="7">  Vaccination Registration Assistant  </Option>
                  </Select>
                </Form.Item>
              </Form>
            </Col>
            <Col md={6} xs={24} className="mb-25">
              <ListButtonSizeWrapper>
                <Button size="small" type="primary">
                  Apply
                </Button>
                <Button size="small" type="light">
                  Clear
                </Button>
              </ListButtonSizeWrapper>
            </Col>

          </Row>
          <Table
            rowSelection={rowSelection}
            dataSource={usersTableData}
            columns={usersTableColumns}
            pagination={{
              defaultPageSize: 5,
              total: usersTableData.length,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </TableWrapper>
      </UserTableStyleWrapper>
    </Cards>
  );
};

export default JobListTable;
