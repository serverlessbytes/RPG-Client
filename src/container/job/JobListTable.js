import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Form, Row, Select, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { UserTableStyleWrapper } from '../pages/style';
import { ListButtonSizeWrapper, TableWrapper } from '../styled';
import { Button } from '../../components/buttons/buttons';
import { editJobPost, getJobPost, getJobsFilterForMain } from '../../redux/jobs/actionCreator';
import { useHistory, useRouteMatch } from 'react-router';
import ViewJobPost from './ViewJobPost';


const JobListTable = ({ state, type, jobRole, apply }) => { // props from JobPost

  const { path } = useRouteMatch();
  console.log("pathh", state)
  console.log("type", type)
  console.log("jobRole", jobRole)
  let history = useHistory();
  let dispatch = useDispatch()
  const { users } = useSelector(state => {
    return {
      users: state.users,
    };
  });

  const usersTableData = [];
  const [usertable, setUsertable] = useState([]) //set data
  const [perPage, setPerPage] = useState(5) // forpagination
  const [pageNumber, setPageNumber] = useState(1)

  const courseData = useSelector((state) => state.job.getJobPostData)
  const getJobFilterData = useSelector((state) => state.job.getJobFilterData) //for filter
  const editJobPostData = useSelector((state) => state.job.editJobPostData) // fetch from redux 
  const [viewModal, setViewModal] = useState(false);
  const onDelete = (id) => {
    let courseDataDelete = courseData && courseData.data && courseData.data.data.find((item) => item.id === id)

    if (courseDataDelete) {
      courseDataDelete = {
        ...courseDataDelete,
        isActive: false,
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
  useEffect(() => {
    if (editJobPostData && editJobPostData.status === 200) {  //
      dispatch(getJobPost(perPage, pageNumber))
    }
  }, [editJobPostData])
  const onEdit = (id) => {
    history.push(`/admin/job/new?id=${id}`)
  }

  useEffect(() => {
    if (apply) {
      dispatch(getJobsFilterForMain(perPage, pageNumber, state.state, type.type, jobRole.jobRole))
    }
  }, [perPage, pageNumber, state, type, jobRole, apply])

  useEffect(() => {
    dispatch(getJobPost(perPage, pageNumber))
  }, [perPage, pageNumber])

  useEffect(() => {
    if (apply) {
      setUsertable(getJobFilterData.data?.data?.map(item => {
        return ({
          user: item.name,
          email: item.email,
          company: item.description,
          position: item.jobRole.name,
          joinDate: item.startDate,
          // status: status,
          action: (
            <div className="table-actions">
              <>
                <Button className="btn-icon" type="info" to="#" onClick={() => onEdit(item.id)} shape="circle">
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
    else if (courseData && courseData.data) {
      setUsertable(courseData.data?.data?.map(item => {
        return ({
          user: item.name,
          email: item.email,
          company: item.description,
          position: item.jobRole.name,
          joinDate: item.startDate,
          // status: status,
          action: (
            <div className="table-actions">
              <>
                <Button className="btn-icon" type="info" to="#" onClick={() => onEdit(item.id)} shape="circle">
                  <FeatherIcon icon="edit" size={16} />
                </Button>
                <Button className="btn-icon" type="danger" to="#" onClick={() => onDelete(item.id)} shape="circle">
                  <FeatherIcon icon="trash-2" size={16} />
                </Button>
                <Button className="btn-icon" type="success" onClick={() => setViewModal(true)} shape="circle">
                      <FeatherIcon icon="eye" size={16} />
                    </Button>
              </>
            </div>
          ),
        });
      }))
    }
  }, [getJobFilterData, courseData])


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
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   // key: 'status',
    //   // onFilter: (value, status) => status.name.indexOf(value) === 0,
    //   sorter: (a, b) => a.status.length - b.status.length,
    //   sortDirections: ['descend', 'ascend'],
    // },
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
<>
    <UserTableStyleWrapper>
      <TableWrapper className="table-responsive">
        <Table
          rowSelection={rowSelection}
          dataSource={usertable}
          columns={usersTableColumns}
          pagination={{
            // defaultPageSize: 10,
            // total: usersTableData.length,
            // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            defaultPageSize: courseData?.data.per_page,
            total: courseData?.data.page_count,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            onChange: (page, pageSize) => {
              setPageNumber(page);
              setPerPage(pageSize)
            }
          }}
        />
      </TableWrapper>
    </UserTableStyleWrapper>
     {viewModal && <ViewJobPost viewModal={viewModal} type="primary" setViewModal={setViewModal} />}
     </>
  );
};

export default JobListTable;
