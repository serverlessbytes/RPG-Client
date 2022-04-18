import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Form, Row, Select, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { UserTableStyleWrapper } from '../pages/style';
import { ListButtonSizeWrapper, TableWrapper } from '../styled';
import { Button } from '../../components/buttons/buttons';
import { editJobPost, getJobPost } from '../../redux/jobs/actionCreator';
import Item from 'antd/lib/list/Item';
import { useHistory, useRouteMatch } from 'react-router';


const JobListTable = ({ match }) => {
  const { path } = useRouteMatch();
  console.log("pathh",path)
  let history = useHistory();
  let dispatch = useDispatch()
  const { users } = useSelector(state => {
    return {
      users: state.users,
    };
  });

  const usersTableData = [];
  const [usertable, setUsertable] = useState([]) //set data
  const [perPage, setPerPage] = useState(2)
  const [pageNumber, setPageNumber] = useState(1)

  const courseData = useSelector((state) => state.job.getJobPostData)

  const onDelete = (id) => {
    let courseDataDelete = courseData && courseData.data && courseData.data.data.find((item) => item.id === id)
    console.log("44444444", courseDataDelete)
    if (courseDataDelete) {

        courseDataDelete = {
          ...courseDataDelete,
          isActive: false,
          // isDeleted: true,
          id: courseDataDelete.id,
          jobRoleId: courseDataDelete.jobRole.id,
          jobCategoryId: courseDataDelete.jobType.id,
        }
    }
    delete courseDataDelete.jobRole,
    delete courseDataDelete.jobType,
    delete courseDataDelete.key,
    delete courseDataDelete.hiredNumber,
      dispatch((editJobPost(courseDataDelete)))
  }

  const onEdit = (id) => {
    history.push(`/admin/job/new?id=${id}`)
  }


  useEffect(() => {
    console.log("77777", courseData)
  }, [courseData])

  useEffect(() => {
    dispatch(getJobPost(perPage, pageNumber))
  }, [perPage, pageNumber])

  useEffect(() => {
    if (courseData && courseData.data) {
      setUsertable(courseData.data?.data?.map(item => {
        //const { id, name, designation, status } = user;

        return ({
          //key: id,
          //user: name,
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
          user: item.name,
          email: item.email,
          company: item.description,
          position: item.jobRole.name,
          joinDate: item.startDate,
          // status: status,
          action: (
            <div className="table-actions">
              <>
                {/* <Button className="btn-icon" type="primary" to="#" shape="circle">
                  <FeatherIcon icon="eye" size={16} />
                </Button> */}
                <Button className="btn-icon" type="info" to="#" onClick = {() => onEdit(item.id)} shape="circle">
                  <FeatherIcon icon="edit" size={16} />
                </Button>
                <Button className="btn-icon" type="danger" to="#" onClick={() => onDelete(item.id)} shape="circle">
                  <FeatherIcon icon="trash-2" size={16} />
                </Button>
              </>
            </div>
          ),
        });
      })

      )
    }
  }, [courseData])


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

    <UserTableStyleWrapper>
      <TableWrapper className="table-responsive">
        <Table
          rowSelection={rowSelection}
          dataSource={usertable}
          columns={usersTableColumns}
          pagination={{
            defaultPageSize: 5,
            total: usersTableData.length,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
        />
      </TableWrapper>
    </UserTableStyleWrapper>

  );
};

export default JobListTable;
