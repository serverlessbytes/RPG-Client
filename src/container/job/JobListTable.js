import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { UserTableStyleWrapper } from '../pages/style';
import { TableWrapper } from '../styled';
import { Button } from '../../components/buttons/buttons';
import { deleteJobs, getJobsFilterForMain } from '../../redux/jobs/actionCreator';
import { useHistory } from 'react-router';
import ViewJobPost from './ViewJobPost';
import moment from 'moment';
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import actions from '../../redux/jobs/actions';
import ConfirmModal from '../../components/modals/confirm_modal';
import SweetAlert from 'react-bootstrap-sweetalert';

const JobListTable = ({ state, type, jobRole, apply, clear, setPagePer, setNumberOfPage, setExportTog, status, search, getJobData }) => {
  // props from JobPost
  const { addJobPostSuccess, addJobPostErr, editJobPostSuccess, addLanguageJobPostSuccess, addLanguageJobPostErr, editJobPostErr, deleteJobsSuccess, deleteJobsErr } = actions;
  let history = useHistory();
  let dispatch = useDispatch();

  const [usertable, setUsertable] = useState([]); //set data
  const [filterData, setFilterData] = useState([]); //set data
  const [perPage, setPerPage] = useState(20); // forpagination
  const [pageNumber, setPageNumber] = useState(1);
  const [viewModal, setViewModal] = useState(false);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [isAscend, setIsAscend] = useState(false);
  const [selectedLanguageData, setSelectedLanguageData] = useState()
  const [langIds, setLangIds] = useState({
    hindi: '',
    marathi: ''
  });
  const [languageIds, setLanguageIDs] = useState();
  const [ids, setIDs] = useState();

  const [showAlert, setShowAlert] = useState(false)
  const [idForDelete, setIdForDelete] = useState('')
  const [keyForDelete, setKeyForDelete] = useState('')
  const [typeForDelete, setTypeForDelete] = useState('single')
  const [typeForMultipleDelete, setTypeForMultipleDelete] = useState('multiple')

  const languageData = useSelector(state => state.language.getLanguageData);
  const getJobFilterData = useSelector(state => state.job.getJobFilterData); //for filter
  const editJobPostData = useSelector(state => state.job.editJobPostData); // fetch for tostify from reducer for edit/delete
  const addJobPostError = useSelector(state => state.job.addJobPostErr); //fetch for tostify from reducer for jobposterror
  const editJobPostError = useSelector(state => state.job.editJobPostErr); //fetch for tostify from reducer for jobposterror
  const getOneJobPostData = useSelector(state => state.job.getOneJobPostData);
  const addLanguageJobPost = useSelector(state => state.job.addLanguageJobPost);
  const addLanguageJobPostError = useSelector(state => state.job.addLanguageJobPostErr);
  const addJobPostData = useSelector(state => state.job.addJobPostData); //fetch for tostify from reducer
  const upadteJobBenner = useSelector(state => state.job.upadteJobBannerData); //fetch for tostify from reducer
  const deleteJobData = useSelector(state => state.job.deleteJobData);
  const deleteJobError = useSelector(state => state.job.deleteJobError);


  const newJobPost = data => {
    let id = data.id;
    delete data.id;
    const newVal = ApiPost(`job/update?jobId=${id}`, data).then(res => {
      if (res.status === 200) {
        dispatch(getJobsFilterForMain(perPage, pageNumber, "", "", "", "", "", langIds.hindi, langIds.marathi,));
        return res;
      }
    }).catch((err) => {
      return err;
    })
    return newVal;
  };

  const getOneJobDetailByKey = async (languageId, key, id) => {
    await ApiGet(`job/getJobByKey?langId=${languageId}&key=${key}`)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Jobs alredy exist in this language!")
        }
      })
      .catch((e) => {
        if (e.response.status) {
          setIsConfirmModal(true)
          setLanguageIDs(languageId);
          setIDs(id);
        }
      })
  }

  const languageHandalCancle = () => {
    setIsConfirmModal(false)
  }

  const languageHandalOk = (languageIds, ids) => {
    history.push(`/admin/job/new?langid=${languageIds}&id=${ids}`);
  }

  const Delete = (id, key) => {
    setShowAlert(true);
    setKeyForDelete(key)
    setIdForDelete(id)
    // dispatch(deleteJobs(id,key,"multiple"))
  }

  const onDelete = (idForDelete, keyForDelete, typeForDelete) => {
    dispatch(deleteJobs(idForDelete, keyForDelete, typeForDelete))
    setKeyForDelete('')
    setIdForDelete('')
    setShowAlert(false)
  }

  const onDeleteAll = (idForDelete, keyForDelete, typeForMultipleDelete) => {
    dispatch(deleteJobs(idForDelete, keyForDelete, typeForMultipleDelete))
    setKeyForDelete('')
    setIdForDelete('')
    setShowAlert(false)
  }

  // const onDelete = async (id) => {

  //   let courseDataDelete =
  //     getJobFilterData && getJobFilterData?.data && getJobFilterData?.data?.data.find(item => item.id === id);
  //   if (courseDataDelete) {
  //     let data = {
  //       name: courseDataDelete.name.id,
  //       state: courseDataDelete.state.id,
  //       district: courseDataDelete.district.id,
  //       town: courseDataDelete.town,
  //       pincode: courseDataDelete.pincode,
  //       description: courseDataDelete.description,
  //       vacancies: courseDataDelete.vacancies,
  //       reqExperience: courseDataDelete.reqExperience,
  //       salary: courseDataDelete.salary,
  //       benifits: courseDataDelete.benifits,
  //       requirements: courseDataDelete.requirements,
  //       type: courseDataDelete.type,
  //       isActive: false,
  //       extraType: courseDataDelete.extraType,
  //       shifts: courseDataDelete?.shifts ? courseDataDelete?.shifts : '',
  //       email: courseDataDelete.email,
  //       phone: courseDataDelete.phone,
  //       startDate: courseDataDelete.startDate,
  //       endDate: courseDataDelete.endDate,
  //       jobRole: courseDataDelete.jobRole.id,
  //       jobType: courseDataDelete.jobType.id,
  //       application_form: courseDataDelete.application_form,
  //       recommended_and_forwarded: courseDataDelete.recommended_and_forwarded,
  //       application_process: courseDataDelete.application_process,
  //       medical_superintendent: courseDataDelete.medical_superintendent,
  //       hospital_expenses_estimation_certificate: courseDataDelete.hospital_expenses_estimation_certificate,
  //       id: id,
  //     };
  //     const deleteJobPost = await newJobPost(data);
  //     if (deleteJobPost.status === 200) {
  //       toast.success('Job deleted');
  //     }else{
  //       toast.error("Something went wrong")
  //     }
  //   }
  // };

  const onEdit = id => {
    history.push(`/admin/job/new?id=${id}`);
  };

  useEffect(() => {
    let temp = {
      hindi: '',
      marathi: ''
    }
    languageData && languageData.data && languageData.data.map((item) => {
      if (item.name.toLowerCase() === "marathi") {
        temp.marathi = item.id
      } else if (item.name.toLowerCase() === "hindi") {
        temp.hindi = item.id
      }
    })
    setLangIds(temp)
  }, [languageData])

  const activeJobPost = data => {
    let id = data.id;
    delete data.id;
    const newVal = ApiPost(`job/update?jobId=${id}`, data).then(res => {
      if (res.status === 200) {
        dispatch(getJobsFilterForMain(perPage, pageNumber, "", "", "", "inactive"));
      }
      return res;
    }).catch((err) => {
      return err;
    })
    return newVal;
  };

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
        application_form: jobsData.application_form,
        recommended_and_forwarded: jobsData.recommended_and_forwarded,
        application_process: jobsData.application_process,
        medical_superintendent: jobsData.medical_superintendent,
        hospital_expenses_estimation_certificate: jobsData.hospital_expenses_estimation_certificate,
        id: id,
      };
      const restoreJobPost = await activeJobPost(data);
      if (restoreJobPost.status === 200) {
        toast.success('Job actived');
      } else {
        toast.error('Something went wrong')
      }
    }
  };

  useEffect(() => {
    if (deleteJobData && deleteJobData.status === 200) {
      dispatch(deleteJobsSuccess(null))
      toast.success('Job deleted');
    }
  }, [deleteJobData])

  useEffect(() => {
    if (deleteJobError) {
      dispatch(deleteJobsErr(null))
      toast.error('Something went wrong');
    }
  }, [deleteJobError])

  useEffect(() => {
    if (addLanguageJobPostError) {
      dispatch(addLanguageJobPostErr(null))
      toast.error('Something went wrong');
    }
  }, [addLanguageJobPostError]);

  useEffect(() => {
    if (addJobPostError) {
      dispatch(addJobPostErr(null))
      toast.error('Something went wrong');
    }
  }, [addJobPostError]);

  useEffect(() => {
    if (status && langIds.hindi && langIds.marathi) {
      dispatch(
        getJobsFilterForMain(
          perPage,
          pageNumber,
          state?.state ? state?.state : '',
          type?.type ? type?.type : '',
          jobRole?.jobRole ? jobRole?.jobRole : '',
          status,
          search ? search : '',
          langIds.hindi,
          langIds.marathi,
        ),
      );
    }
  }, [perPage, pageNumber, apply, status, langIds]);

  useEffect(() => {
    if (addJobPostData && addJobPostData.message === 'Jobs added successfully.') {
      dispatch(addJobPostSuccess(null));
      toast.success('Job added');
    }
  }, [addJobPostData]);

  useEffect(() => {
    if (addLanguageJobPost && addLanguageJobPost.status === 200) {
      dispatch(addLanguageJobPostSuccess(null));
      toast.success('Job added');
    }
  }, [addLanguageJobPost]);

  useEffect(() => {
    if (editJobPostError) {
      dispatch(editJobPostErr(null))
      toast.error('Something went wrong');
    }
  }, [editJobPostError]);

  useEffect(() => {
    if (editJobPostData && editJobPostData.data && editJobPostData.data.isActive === false) {
      dispatch(editJobPostSuccess(null));
      toast.success('Jobs Deleted');
    }
    else if (editJobPostData && editJobPostData.data && editJobPostData.data.isActive === true) {
      dispatch(editJobPostSuccess(null))
      toast.success("Job updated");
    }
  }, [editJobPostData]);

  const onApproved = (id, isAp) => {
    if (status !== 'active') {
      return;
    }
    let data = {
      isApproved: !isAp,
    };
    ApiPost(`job/updateIsApproved?jobId=${id}`, data)
      .then(res => {
        toast.success(res.data.isApproved ? 'Approved successfully' : 'Disapproved successfully ');
        dispatch(
          getJobsFilterForMain(
            perPage,
            pageNumber,
            state.state ? state.state : '',
            type.type ? type.type : '',
            jobRole.jobRole ? jobRole.jobRole : '',
            "", "",
            langIds.hindi,
            langIds.marathi,
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
        toast.success(!bannerSelected ? 'Banner Selected' : 'Banner deselected');
        dispatch(getJobsFilterForMain(perPage, pageNumber, "", "", "", "", "", langIds.hindi, langIds.marathi));
      });
  }

  useEffect(() => {
    if (getJobFilterData?.data?.data) {
      setFilterData(getJobFilterData?.data?.data)
    }
  }, [getJobFilterData])

  useEffect(() => {
    if (filterData.length) {
      getJobData(filterData)
    }
    setUsertable(
      filterData.map((item, i) => {
        return {
          key: i,
          name: (
            <span className='For-Underline' onClick={() => viewJobdata(item.id)}>
              {item?.name?.name}
            </span>
          ),
          email: item.email,
          company: item.description,
          position: item.jobRole?.name,
          joinDate: moment(item.startDate).format('DD-MM-YYYY'),
          vacancies: item.vacancies,
          selectLanguage: (
            <div className="">
              <div className="">
                <>
                  <Button size="small" type={item.hindi ? "success" : "primary"} shape='round'
                    onClick={() => {
                      getOneJobDetailByKey(langIds?.hindi, item?.key, item?.id)
                      setSelectedLanguageData(item)
                    }}
                  >
                    HN
                  </Button>
                  <Button size="small" type={item.marathi ? "success" : "primary"} shape='round'
                    onClick={() => {
                      getOneJobDetailByKey(langIds?.marathi, item?.key, item?.id)
                      setSelectedLanguageData(item)
                    }}
                  >
                    MT
                  </Button>
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
                  {/* <Button className="btn-icon" type="danger" to="#" onClick={() => onDelete(item.id)} shape="circle"> */}
                  <Button className="btn-icon" type="danger" to="#" onClick={() => Delete(item.id, item.key)} shape="circle">
                    <FeatherIcon icon="trash-2" size={16} />
                  </Button>
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
  }, [filterData, isAscend]);

  const viewJobdata = id => {
    history.push(`/admin/job/view?id=${id}`)
  };

  const sorting = () => {
    if (isAscend) {
      setFilterData(getJobFilterData && getJobFilterData.data && getJobFilterData.data.data.sort((a, b) => a.name.name.localeCompare(b.name.name)))
    } else {
      setFilterData(getJobFilterData && getJobFilterData.data && getJobFilterData.data.data.sort((a, b) => b.name.name.localeCompare(a.name.name)))
    }
    setIsAscend(!isAscend)
  }

  const sortingForDate = () => {
    if (isAscend) {
      setFilterData(getJobFilterData && getJobFilterData.data && getJobFilterData.data.data.sort((a, b) => moment(b.startDate).unix() - moment(a.startDate).unix()))
    } else {
      setFilterData(getJobFilterData && getJobFilterData.data && getJobFilterData.data.data.sort((a, b) => moment(a.startDate).unix() - moment(b.startDate).unix()))
    }
    setIsAscend(!isAscend)
  }

  const usersTableColumns = [
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => sorting(),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortDirections: ['descend', 'ascend'],
      // key: 'email',
    },
    {
      title: 'Description',
      dataIndex: 'company',
      sorter: (a, b) => a.company.localeCompare(b.company),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Job role',
      dataIndex: 'position',
      sorter: (a, b) => a.position.localeCompare(b.position),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Join date',
      dataIndex: 'joinDate',
      sorter: (a, b) => sortingForDate()
    },
    {
      title: 'Vacancies',
      dataIndex: 'vacancies',
      sorter: (a, b) => a.vacancies - b.vacancies,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Select language',
      dataIndex: 'selectLanguage',
      width: '90px',
    },
    {
      title: 'Select banner',
      dataIndex: 'chooseBanner',
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
              }}>
                No
              </Button>
              <Button size="small" type="primary" onClick={() => {
                languageHandalOk(languageIds, ids)
              }} >
                Yes
              </Button>
            </>}
          children={"This coures in not available in this language. You want to add?"}
        />
      )}

      {viewModal && (
        <ViewJobPost viewModal={viewModal} type="primary" setViewModal={setViewModal} data={getOneJobPostData?.data} />
      )}

      {showAlert &&
        <SweetAlert
          danger
          cancelBtnText="Cancel"
          confirmBtnBsStyle="danger"
          title="Are you sure?"
        >
          You want to delete job.
          <div style={{ marginTop: '20px', display: "flex", gap: "5px", justifyContent: "center" }}>
            <Button className="ant-btn-delete" variant="success" onClick={() => onDelete(idForDelete, keyForDelete, typeForDelete)}  >
              Single delete
            </Button>
            <Button className="ant-btn-delete" variant="danger" onClick={() => onDeleteAll(idForDelete, keyForDelete, typeForMultipleDelete)} >
              All delete
            </Button>
            <Button className="ant-btn-light" variant="danger" onClick={() => setShowAlert(false)}  >
              Cancel
            </Button>
          </div>
        </SweetAlert>
      }
    </>
  );
};

export default JobListTable;
