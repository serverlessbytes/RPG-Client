import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Form, Pagination, Row, Select, Switch, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { UserTableStyleWrapper } from '../pages/style';
import { ListButtonSizeWrapper, ProjectPagination, TableWrapper } from '../styled';
import { Button } from '../../components/buttons/buttons';
import { editJobPost, getJobPost, getJobsFilterForMain, getoneJobPost, jobApproved } from '../../redux/jobs/actionCreator';
import { useHistory, useRouteMatch } from 'react-router';
import ViewJobPost from './ViewJobPost';
import moment from 'moment';
import { ApiPost } from '../../helper/API/ApiData';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import actions from '../../redux/jobs/actions';


const JobListTable = ({ state, type, jobRole, apply, clear, status,setPagePer,setNumberOfPage,setExportTog }) => { // props from JobPost
  const {
    addJobPostSuccess, editJobPostSuccess, getJobsFilterForMainSuccess
  } = actions;
  const { path } = useRouteMatch();
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
  const [approved, setApproved] = useState()
  const [viewModal, setViewModal] = useState(false);

  const jobData = useSelector((state) => state.job.getJobPostData)
  const getJobFilterData = useSelector((state) => state.job.getJobFilterData) //for filter
  const editJobPostData = useSelector((state) => state.job.editJobPostData) // fetch for tostify from reducer for edit/delete
  const addJobPostErr = useSelector((state) => state.job.addJobPostErr) //fetch for tostify from reducer for jobposterror
  const editJobPostErr = useSelector((state) => state.job.editJobPostErr) //fetch for tostify from reducer for jobposterror
  const getOneJobPostData = useSelector((state) => state.job.getOneJobPostData)
  const addJobPostData = useSelector((state) => state.job.addJobPostData) //fetch for tostify from reducer 
  // useEffect(() => { console.log("editJobPostData", editJobPostData) }, [editJobPostData])

 const newJobPost =  data =>{
  let id = data.id
  delete data.id
    const newVal = ApiPost(`job/update?jobId=${id}` , data)
   .then((res) =>{
     if (res.status === 200) {
       dispatch(getJobPost(perPage, pageNumber))
     } return res
   })
    return newVal
 }

  const onDelete = async(id) => {
    let courseDataDelete = getJobFilterData && getJobFilterData?.data && getJobFilterData?.data?.data.find((item) => item.id === id)
    console.log("courseDataDelete", courseDataDelete)
    if (courseDataDelete) {
      let data = {
        name: courseDataDelete.name.id,
        state: courseDataDelete.state.id,
        district: courseDataDelete.district.id,
        town: courseDataDelete.town,
        pincode: courseDataDelete.pincode,
        description: courseDataDelete.description,
        vacancies: courseDataDelete.vacancies,
        reqExperience: courseDataDelete.reqExperience,
        salary: courseDataDelete.salary,
        benifits: courseDataDelete.benifits,
        requirements: courseDataDelete.requirements,
        type: courseDataDelete.type,
        isActive: false,
        extraType: courseDataDelete.extraType,
        shifts: courseDataDelete?.shifts ? courseDataDelete?.shifts : "" ,
        email: courseDataDelete.email,
        phone: courseDataDelete.phone,
        startDate: courseDataDelete.startDate,
        endDate: courseDataDelete.endDate,
        jobRole: courseDataDelete.jobRole.id,
        jobType: courseDataDelete.jobType.id,
        id: id,
      }
      // dispatch((editJobPost(data)))
      const deleteJobPost = await newJobPost(data)
      if (deleteJobPost.status === 200) {
        toast.success("Jobs delete successfully.")
      }
    }
  }

  // useEffect(() => {
  //   if (editJobPostData && editJobPostData.status === 200) {  //getJobFilterData
  //     dispatch(getJobPost(perPage, pageNumber))
  //   }
  // }, [editJobPostData])

  const onEdit = (id) => {
    history.push(`/admin/job/new?id=${id}`)
  }

  const onRestore = (id) => {
    let jobsData = getJobFilterData && getJobFilterData?.data && getJobFilterData?.data.data.find((item) => item.id === id)
    console.log("jobsdataInactive", jobsData);
    if (jobsData) {
      let data = {
        name: jobsData.name.id,
        state: jobsData.state.id,
        district: jobsData.district.id,
        town: jobsData.town,
        pincode: jobsData.pincode,
        description: jobsData.description,
        vacancies: jobsData.vacancies,
        reqExperience: jobsData.reqExperience,
        salary: jobsData.salary,
        benifits: jobsData.benifits,
        requirements: jobsData.requirements,
        type: jobsData.type,
        isActive: true,
        extraType: jobsData.extraType,
        shifts: jobsData.shifts,
        email: jobsData.email,
        phone: jobsData.phone,
        startDate: jobsData.startDate,
        endDate: jobsData.endDate,
        jobRole: jobsData.jobRole.id,
        jobType: jobsData.jobType.id,
        id: id,
      }
      dispatch((editJobPost(data)))
    }
  }

  useEffect(() => {
    dispatch(getJobsFilterForMain(perPage, pageNumber, state?.state ? state?.state : "", type?.type ? type?.type : "", jobRole?.jobRole ? jobRole?.jobRole : "", status))
  }, [perPage, pageNumber, apply, status])

  useEffect(() => {
    if (addJobPostData && addJobPostData.message === "Jobs added successfully.") {
      dispatch(addJobPostSuccess(null))
      toast.success("Jobs Add successful");
      //toastAssetsAdd(true)
      //onHide()
    }
  }, [addJobPostData])

  useEffect(() => {
    if (addJobPostErr) {
      toast.error("Something Wrong")
    }
  }, [addJobPostErr])

  useEffect(() => {
    if (editJobPostErr) {
      toast.error("Something Wrong")
    }
  }, [editJobPostErr])

  useEffect(() => {
    console.log("editJobPostData",editJobPostData)
    if (editJobPostData && editJobPostData.data && editJobPostData.data.isActive === false) {
      dispatch(editJobPostSuccess(null))
      //dispatch(getJobsFilterForMainSuccess(null))
      toast.success("Jobs Delete successful");
      //toastAssetsAdd(true)
      //onHide()
    }
    else if (editJobPostData && editJobPostData.data && editJobPostData.data.isActive === true) {
      dispatch(editJobPostSuccess(null))
      toast.success("Jobs Update successful");
    }
  }, [editJobPostData])

  useEffect(() => {
    dispatch(getJobPost(perPage, pageNumber));
    setPagePer(perPage);
    setNumberOfPage(pageNumber);
    setExportTog(false)
  }, [perPage, pageNumber])

  const onApproved = (id, isAp) => {
    if (status !== "active") {
      return
    }
    let data = {
      isApproved: !isAp
    }
    ApiPost(`job/updateIsApproved?jobId=${id}`, data)
      .then((res) => {
        console.log("res",res)
          toast.success( res.data.isApproved ? "Approved successful" : "Disapproved successful ")
        dispatch(getJobsFilterForMain (perPage, pageNumber, state.state ? state.state : "", type.type ? type.type : "", jobRole.jobRole ? jobRole.jobRole : ""))
      })
      .catch((err) => console.log("Error",err))
  }

  useEffect(() => {
    // if (apply) {
    setUsertable(getJobFilterData?.data?.data?.map(item => {
      return ({
        user: item?.name?.name,
        email: item.email,
        company: item.description,
        position: item.jobRole?.name,
        joinDate: moment(item.startDate).format('DD-MM-YYYY'),
        vacancies : item.vacancies,
        approved: (
          <>
            <div id={item.id} onClick={() => onApproved(item.id, item.isApproved)}>
              <Switch checked={item.isApproved} disabled={status === "active" ? false : true} ></Switch>
            </div>
          </>
        ),
        // status: status,
        action: (
          <div className="table-actions">
            {status === "active" ?
              <>
                <Button className="btn-icon" type="info" to="#" onClick={() => onEdit(item.id)} shape="circle">
                  <FeatherIcon icon="edit" size={16} />
                </Button>
                <Button className="btn-icon" type="danger" to="#" onClick={() => onDelete(item.id)} shape="circle">
                  <FeatherIcon icon="trash-2" size={16} />
                </Button>
                <Button className="btn-icon" type="success" onClick={() => viewJobdata(item.id)} shape="circle">
                  <FeatherIcon icon="eye" size={16} />
                </Button>
              </>
              :
              <Button className="btn-icon" type="success" onClick={() => onRestore(item.id)} shape="circle">
                <FeatherIcon icon="rotate-ccw" size={16} />
              </Button>}
          </div>
        ),
      });
    })
    )
  }
    // else if (jobData && jobData.data) {
    //   console.log("jobData",jobData)
    //   let newJobData={...jobData}
    //   console.log("newJobData",newJobData)
    //   setUsertable(newJobData.data?.data?.map(item => {
    //     return ({
    //       user: item.name?.name,
    //       email: item.email,
    //       company: item.description,
    //       position: item.jobRole.name,
    //       joinDate: moment(item.startDate).format('DD-MM-YYYY') ,
    //       approved:(
    //       <>
    //         <div id={item.id} onClick={()=>onApproved(item.id,item.isApproved)}>
    //         <Switch checked={item.isApproved} ></Switch>
    //         </div>
    //       </>
    //     ),

    //       action: (
    //         <div className="table-actions">
    //           <>
    //             <Button className="btn-icon" type="info" to="#" onClick={() => onEdit(item.id)} shape="circle">
    //               <FeatherIcon icon="edit" size={16} />
    //             </Button>
    //             <Button className="btn-icon" type="danger" to="#" onClick={() => onDelete(item.id)} shape="circle">
    //               <FeatherIcon icon="trash-2" size={16} />
    //             </Button>
    //             <Button className="btn-icon" type="success" onClick={() =>viewJobdata(item.id) } shape="circle">
    //                   <FeatherIcon icon="eye" size={16} />
    //                 </Button>
    //           </>
    //         </div>
    //       ),
    //     });
    //   }))
    // }
    // }
    , [getJobFilterData])

  const viewJobdata = (key) => {
    dispatch(getoneJobPost(key))
    setViewModal(true)
  }

  const usersTableColumns = [
    {
      title: 'User',
      dataIndex: 'user',
      // key: 'user',
      sorter: (a, b) => a?.user?.length - b?.user?.length,
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
      title: 'Approved',
      dataIndex: 'approved',
    },
    {
      title: 'Vacancies',
      dataIndex: 'vacancies',
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
    <>
      <UserTableStyleWrapper>
        <TableWrapper className="table-responsive pb-30">
          <Table
            rowSelection={rowSelection}
            dataSource={usertable}
            columns={usersTableColumns}
            pagination={{
              // defaultPageSize: 10,
              // total: usersTableData.length,
              // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              defaultPageSize: getJobFilterData?.data.per_page,
              total: getJobFilterData?.data.page_count,
              // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              onChange: (page, pageSize) => {
                setPageNumber(page);
                setPerPage(pageSize);
              }
            }}
            // pagination={false}
          />
        </TableWrapper>
      </UserTableStyleWrapper>
      {/* <ProjectPagination>
        
          <Pagination
            onChange={()=>{}}
            showSizeChanger
            onShowSizeChange={()=>{}}
            pageSize={10}
            defaultCurrent={1}
            total={10}
          />
       
      </ProjectPagination> */}
      {viewModal && <ViewJobPost viewModal={viewModal} type="primary" setViewModal={setViewModal} data={getOneJobPostData?.data} />}
    </>
  );
};

export default JobListTable;
