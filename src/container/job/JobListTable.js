import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Form, Pagination, Row, Select, Switch, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { UserTableStyleWrapper } from '../pages/style';
import { ListButtonSizeWrapper, ProjectPagination, TableWrapper } from '../styled';
import { Button } from '../../components/buttons/buttons';
import {
  addJobPost,
  editJobPost,
  getJobPost,
  getJobsFilterForMain,
  getoneJobPost,
  jobApproved,
} from '../../redux/jobs/actionCreator';
import { useHistory, useRouteMatch } from 'react-router';
import ViewJobPost from './ViewJobPost';
import moment from 'moment';
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import actions from '../../redux/jobs/actions';
import ConfirmModal from '../../components/modals/confirm_modal';
import { jobBannerUpdate } from '../../redux/jobs/actionCreator';


const JobListTable = ({ state, type, jobRole, apply, clear, status, setPagePer, setNumberOfPage, setExportTog, search }) => {
  // props from JobPost
  const { addJobPostSuccess, editJobPostSuccess, getJobsFilterForMainSuccess, addLanguageJobPostSuccess,
    addLanguageJobPostErr, editJobPostErr, updateJObBanner } = actions;
  const { path } = useRouteMatch();
  let history = useHistory();
  let dispatch = useDispatch();

  const [usertable, setUsertable] = useState([]); //set data
  const [perPage, setPerPage] = useState(20); // forpagination
  const [pageNumber, setPageNumber] = useState(1);
  const [approved, setApproved] = useState();
  const [viewModal, setViewModal] = useState(false);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [selectedLanguageData, setSelectedLanguageData] = useState()
  const [langIds, setLangIds] = useState({
    hindi: '',
    marathi: ''
  });
  const [languageIds, setLanguageIDs] = useState();
  const [ids, setIDs] = useState();

  const { users } = useSelector(state => {
    return {
      users: state.users,
    };
  });
  const languageData = useSelector(state => state.language.getLanguageData);
  const getJobFilterData = useSelector(state => state.job.getJobFilterData); //for filter
  const editJobPostData = useSelector(state => state.job.editJobPostData); // fetch for tostify from reducer for edit/delete
  const addJobPostErr = useSelector(state => state.job.addJobPostErr); //fetch for tostify from reducer for jobposterror
  const editJobPostError = useSelector(state => state.job.editJobPostErr); //fetch for tostify from reducer for jobposterror
  const getOneJobPostData = useSelector(state => state.job.getOneJobPostData);
  const addLanguageJobPost = useSelector(state => state.job.addLanguageJobPost);
  const addLanguageJobPostError = useSelector(state => state.job.addLanguageJobPostErr);
  const addJobPostData = useSelector(state => state.job.addJobPostData); //fetch for tostify from reducer
  const upadteJobBenner = useSelector(state => state.job.upadteJobBannerData); //fetch for tostify from reducer

  const newJobPost = data => {
    let id = data.id;
    delete data.id;
    const newVal = ApiPost(`job/update?jobId=${id}`, data).then(res => {
      if (res.status === 200) {
        dispatch(getJobsFilterForMain(perPage, pageNumber));
        return res;
      }
    });
    return newVal;
  };

  const getOneJobDetailByKey = async (languageId, key, id) => {
    await ApiGet(`job/getJobByKey?langId=${languageId}&key=${key}`)
      .then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          toast.success("Jobs alredy exist in this language!")
        }
      })
      .catch((e) => {
        if (e.response.status) {
          setIsConfirmModal(true)
          setLanguageIDs(languageId);
          setIDs(id);
          // history.push(`${path}/addcourses?langId=${languageId}?key=${key}`)
        }
      })
  }

  const languageHandalCancle = () => {
    console.log("languageHandalCancle");
    setIsConfirmModal(false)
  }

  const languageHandalOk = (languageIds, ids) => {

    history.push(`/admin/job/new?langid=${languageIds}&id=${ids}`);
    // history.push(`/admin/job/new?id=${id}`);

    // let selectLanguageAddData = {
    //   key: selectedLanguageData.key,
    //   name: selectedLanguageData.name.id,
    //   state: selectedLanguageData.state.id,
    //   district: selectedLanguageData.district.id,
    //   town: selectedLanguageData.town,
    //   pincode: selectedLanguageData.pincode,
    //   description: selectedLanguageData.description,
    //   vacancies: selectedLanguageData.vacancies,
    //   reqExperience: selectedLanguageData.reqExperience,
    //   salary: selectedLanguageData.salary,
    //   benifits: selectedLanguageData.benifits,
    //   requirements: selectedLanguageData.requirements,
    //   type: selectedLanguageData.type,
    //   extraType: selectedLanguageData.extraType,
    //   isActive: selectedLanguageData.isActive,
    //   shifts: selectedLanguageData.shifts,
    //   email: selectedLanguageData.email,
    //   phone: selectedLanguageData.phone,
    //   startDate: selectedLanguageData.startDate,
    //   endDate: selectedLanguageData.endDate,
    //   jobRole: selectedLanguageData.jobRole.id,
    //   jobType: selectedLanguageData.jobType.id,
    // };
    // console.log(selectLanguageAddData, "selectedLanguageData");
    // addLanguageJobPost(selectLanguageAddData, languageIds)
    // setIsConfirmModal(false)
  }
  // const addLanguageJobPost = (body, languageID) => {
  //   ApiPost(`job/add?langId=${languageID}`, body)
  //     .then((res) => {
  //       console.log("res", res);
  //       return dispatch(addJobPostSuccess(res))
  //     })
  //     .catch((err) => dispatch(addJobPostErr(err)))
  // }

  const onDelete = async id => {
    let courseDataDelete =
      getJobFilterData && getJobFilterData?.data && getJobFilterData?.data?.data.find(item => item.id === id);
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
        shifts: courseDataDelete?.shifts ? courseDataDelete?.shifts : '',
        email: courseDataDelete.email,
        phone: courseDataDelete.phone,
        startDate: courseDataDelete.startDate,
        endDate: courseDataDelete.endDate,
        jobRole: courseDataDelete.jobRole.id,
        jobType: courseDataDelete.jobType.id,
        id: id,
      };

      const deleteJobPost = await newJobPost(data);
      if (deleteJobPost.status === 200) {
        toast.success('Jobs delete successfully.');
      }
    }
  };
  const onEdit = id => {
    history.push(`/admin/job/new?id=${id}`);
  };

  useEffect(() => {
    let temp = {
      hindi: '',
      marathi: ''
    }
    languageData && languageData.data && languageData.data.map((item) => {
      if (item.name === "marathi") {
        temp.marathi = item.id
      } else if (item.name === "Hindi") {
        temp.hindi = item.id
      }
    })
    setLangIds(temp)
  }, [languageData])

  // const activeJobPost = data => {
  //   let id = data.id;
  //   delete data.id;
  //   const newVal = ApiPost(`job/update?jobId=${id}`, data).then(res => {
  //     if (res.status === 200) {
  //       dispatch(getJobsFilterForMain(perPage, pageNumber, "", "", "", "inactive"));
  //     }
  //     return res;
  //   });
  //   return newVal;
  // };

  const onRestore = async id => {
    let jobsData =
      getJobFilterData && getJobFilterData?.data && getJobFilterData?.data.data.find(item => item.id === id);
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
      };
      delete data.id;
      ApiPost(`job/update?jobId=${id}`, data).then(res => {
        if (res.status === 200) {
          dispatch(getJobsFilterForMain(perPage, pageNumber, "", "", "", "inactive"));
        }
      })
    }
    //   const restoreJobPost = await activeJobPost(data);
    //   if (restoreJobPost.status === 200) {
    //     toast.success('Jobs active successfully.');
    //   }

    // }
  };

  useEffect(() => {
    if (addLanguageJobPostError) {
      toast.error('Something Wrong');
    }
  }, [addLanguageJobPostError]);

  useEffect(() => {
    if (addJobPostErr) {
      toast.error('Something Wrong');
    }
  }, [addJobPostErr]);

  useEffect(() => {
    dispatch(
      getJobsFilterForMain(
        perPage,
        pageNumber,
        state?.state ? state?.state : '',
        type?.type ? type?.type : '',
        jobRole?.jobRole ? jobRole?.jobRole : '',
        // search.search ? search.search : '',
        status,
      ),
    );
  }, [perPage, pageNumber, apply, status]);

  useEffect(() => {
    if (addJobPostData && addJobPostData.message === 'Jobs added successfully.') {
      dispatch(addJobPostSuccess(null));
      toast.success('Jobs Add successful');
    }
  }, [addJobPostData]);

  useEffect(() => {
    if (addLanguageJobPost && addLanguageJobPost.status === 200) {
      dispatch(getJobsFilterForMainSuccess(null));
      toast.success('Jobs Addd successful');

    }
  }, [addLanguageJobPost]);

  useEffect(() => {
    if (editJobPostError) {
      dispatch(editJobPostErr(null))
      toast.error('Something Wrong');
    }
  }, [editJobPostError]);

  useEffect(() => {
    if (editJobPostData && editJobPostData.data && editJobPostData.data.isActive === false) {
      dispatch(editJobPostSuccess(null));
      toast.success('Jobs Delete successful');
    }
    else if (editJobPostData && editJobPostData.data && editJobPostData.data.isActive === true) {
      dispatch(editJobPostSuccess(null))
      toast.success("Jobs Update successful");
    }
  }, [editJobPostData]);

  // useEffect(() => {
  //   dispatch(getJobsFilterForMain(perPage, pageNumber));
  //   setPagePer(perPage);
  //   setNumberOfPage(pageNumber);
  //   setExportTog(false);
  // }, [perPage, pageNumber]);

  const onApproved = (id, isAp) => {
    if (status !== 'active') {
      return;
    }
    let data = {
      isApproved: !isAp,
    };
    ApiPost(`job/updateIsApproved?jobId=${id}`, data)
      .then(res => {
        console.log('res', res);
        toast.success(res.data.isApproved ? 'Approved successful' : 'Disapproved successful ');
        dispatch(
          getJobsFilterForMain(
            perPage,
            pageNumber,
            state.state ? state.state : '',
            type.type ? type.type : '',
            jobRole.jobRole ? jobRole.jobRole : '',
          ),
        );
      })
      .catch(err => console.log('Error', err));
  };
  const onBannerSelect = (id, bannerSelected) => {
    if (status !== 'active') {
      return
    }
    let body = {
      bannerSelected: !bannerSelected
    }
    ApiPost(`job/updateBannerSelected?jobId=${id}`, body)
      .then(res => {
        toast.success(!bannerSelected ? 'Banner Selected successful' : 'Banner unSelected  successful');
        dispatch(getJobsFilterForMain(perPage, pageNumber));
      });
  }

  useEffect(() => {
    setUsertable(
      getJobFilterData?.data?.data?.map(item => {
        return {
          user: (
            <span className='For-Underline' onClick={() => viewJobdata(item.id)}>
              {item?.name?.name}
            </span>
          ),
          email: item.email,
          company: item.description,
          position: item.jobRole?.name,
          joinDate: moment(item.startDate).format('DD-MM-YYYY'),
          vacancies: item.vacancies,
          // approved: (
          //   <>
          //     <div id={item.id} onClick={() => onApproved(item.id, item.isApproved)}>
          //       <Switch checked={item.isApproved} disabled={status === 'active' ? false : true}></Switch>
          //     </div>
          //   </>
          // ),
          // status: status,
          selectLanguage: (
            <div className="">
              {/* <div className="active-schemes-table"> */}
              <div className="">
                {/* <div className="table-actions"> */}
                <>
                  <Button size="small" type="primary" shape='round'
                    onClick={() => {
                      getOneJobDetailByKey(langIds?.hindi, item?.key, item?.id)
                      setSelectedLanguageData(item)
                    }}
                  >
                    {/* <FeatherIcon icon="edit" size={16} /> */}
                    HN
                  </Button>
                  <Button size="small" type="primary" shape='round'
                    onClick={() => {
                      // setSelectedLanguageData(item)
                      getOneJobDetailByKey(langIds?.marathi, item?.key, item?.id)
                      setSelectedLanguageData(item)
                    }}
                  >
                    {/* <FeatherIcon icon="edit" size={16} /> */}
                    MT
                  </Button>
                  {/* <Button
                      className="btn-icon"
                      type="success"
                      onClick={() => viewSwayamCoursedata(item.id)}
                      shape="circle"
                    >
                      <FeatherIcon icon="eye" size={16} />
                    </Button> */}
                </>
              </div>
            </div>
          ),
          chooseBanner: (
            <div onClick={() => onBannerSelect(item.id, item.bannerSelected)} style={{ textAlign: "center" }}>
              <Switch checked={item.bannerSelected} disabled={status === 'active' ? false : true}></Switch>
            </div>

          ),
          action: (
            <div className="table-actions">
              {status === 'active' ? (
                <>
                  <Button className="btn-icon" type="info" to="#" onClick={() => onEdit(item.id)} shape="circle">
                    <FeatherIcon icon="edit" size={16} />
                  </Button>
                  <Button className="btn-icon" type="danger" to="#" onClick={() => onDelete(item.id)} shape="circle">
                    <FeatherIcon icon="trash-2" size={16} />
                  </Button>
                  {/* <Button className="btn-icon" type="success" onClick={() => viewJobdata(item.id)} shape="circle">
                  <FeatherIcon icon="eye" size={16} />
                </Button> */}
                </>
              ) : (
                <Button className="btn-icon" type="success" onClick={() => onRestore(item.id)} shape="circle">
                  <FeatherIcon icon="rotate-ccw" size={16} />
                </Button>
              )}
            </div>
          ),
        };
      }),
    );
  }, [getJobFilterData],
  );

  const viewJobdata = id => {
    // dispatch(getoneJobPost(key));
    //setViewModal(true);
    history.push(`/admin/job/view?id=${id}`)
  };

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
      title: 'Vacancies',
      dataIndex: 'vacancies',
    },
    // {
    //   title: 'Approved',
    //   dataIndex: 'approved',
    // },
    {
      title: 'Select Language',
      dataIndex: 'selectLanguage',
      width: '90px',
    },
    {
      title: 'Choose banner',
      dataIndex: 'chooseBanner',
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
              defaultPageSize: getJobFilterData?.data?.per_page,
              total: getJobFilterData?.data?.page_count,
              // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              onChange: (page, pageSize) => {
                setPageNumber(page);
                setPerPage(pageSize);
              },
            }}
          // pagination={false}
          />
        </TableWrapper>
      </UserTableStyleWrapper>
      {isConfirmModal && (
        <ConfirmModal
          onOk={() => { setIsConfirmModal(false) }}
          onCancel={() => { setIsConfirmModal(false) }}
          visible={isConfirmModal}
          footer={
            <>
              <Button size="small" type="primary" onClick={() => {
                languageHandalCancle()
                // getOneCourseDetailByKey(langIds?.hindi, item?.key)
              }}>
                {/* <FeatherIcon icon="edit" size={16} /> */}
                No
              </Button>
              <Button size="small" type="primary" onClick={() => {
                // getOneCourseDetailByKey(langIds?.marathi, item?.key)
                languageHandalOk(languageIds, ids)
              }} >
                {/* <FeatherIcon icon="edit" size={16} /> */}
                Yes
              </Button>
            </>}
          children={"This coures in not available in this language. You want to add?"}
        />
      )}
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
      {viewModal && (
        <ViewJobPost viewModal={viewModal} type="primary" setViewModal={setViewModal} data={getOneJobPostData?.data} />
      )}
    </>
  );
};

export default JobListTable;
