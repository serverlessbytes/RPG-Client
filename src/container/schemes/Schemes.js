import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import FeatherIcon from 'feather-icons-react';
import { ListButtonSizeWrapper, Main, TableWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Col, Form, Input, Row, Select, Table, Tabs, Switch, Pagination, Menu, Dropdown, Space } from 'antd';
import { UserTableStyleWrapper } from '../pages/style';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { editSchemeData, getAllSchemes, getOneSchemeData, getSchemecategory, getSchemeData, addSchemeData, upadteBanner, deleteScheme } from '../../redux/schemes/actionCreator';
import moment from 'moment';
import { getBenefitsData } from '../../redux/benefitsType/actionCreator';
import ViewModal from './ViewModal';
import { CSVLink } from 'react-csv';
import { ApiGet, ApiPatch, ApiPost } from '../../helper/API/ApiData';
import actions from '../../redux/schemes/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImportFileModal from '../../components/modals/ImportFileModal';
import { DownOutlined } from '@ant-design/icons';
import StarRatings from 'react-star-ratings';
import ConfirmModal from '../../components/modals/confirm_modal';
import SweetAlert from 'react-bootstrap-sweetalert';

const Schemes = () => {
  const { getAllSchemesSuccess, addSchemeSuccess, editSchemeSuccess, editSchemeErr, addSchemeErr, addSchemeInBulk, deleteSchemeSuccess, deleteSchemeErr } = actions;
  const { path } = useRouteMatch();
  let history = useHistory();
  let dispatch = useDispatch();
  const CSVLinkRef = useRef(null)
  const CSVLinkRefAll = useRef(null);
  const { Option } = Select;
  const { TabPane } = Tabs;

  const [schemeCategory, setSchemeCategory] = useState({
    category: '',
    benefit: '',
    search: '',
  });
  const [viewModal, setViewModal] = useState(false);
  const [state, setState] = useState('')
  const [stateAll, setStateAll] = useState('')
  const [status, setStatus] = useState('active');
  const [perPage, setPerPage] = useState(20);
  const [pageNumber, setPageNumber] = useState(1);
  const [exportTog, setExportTog] = useState(false)
  const [importModal, setImportModal] = useState(false);
  const [schemeTableData, setSchemeTableData] = useState();
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [selectedLanguageData, setSelectedLanguageData] = useState()
  const [languageIds, setLanguageIds] = useState();
  const [id, setId] = useState();
  const [key, setKey] = useState();

  const [showAlert, setShowAlert] = useState(false)
  const [keyForDelete, setKeyForDelete] = useState('')
  const [idForDelete, setIdForDelete] = useState('')
  const [typeForDelete, setTypeForDelete] = useState('single')
  const [typeForMultipleDelete, setTypeForMultipleDelete] = useState('multiple')
  const [isAscend, setIsAscend] = useState(false);

  const [langIds, setLangIds] = useState({
    hindi: "",
    marathi: "",
  })

  const languageData = useSelector(state => state.language.getLanguageData);
  const users = useSelector(state => state.scheme.getAllSchemeData);
  const getBenefitData = useSelector(state => state.beneFit.getBenefitData);
  const schemeData = useSelector(state => state.scheme.schemecatogeryData);
  const getOneScheme = useSelector((state) => state.scheme.getOneSchemeData);
  const allschemeData = useSelector(state => state.scheme.allSchemeData);
  const schemeDataAdd = useSelector(state => state.scheme.addSchemeData);
  const editSchemedata = useSelector((state) => state.scheme.editSchemeData);
  const editSchemeError = useSelector((state) => state.scheme.editSchemeErr);
  const addSchemeError = useSelector((state) => state.scheme.addSchemeErr);
  const schemeModulData = useSelector((state) => state.scheme.addSchemeInBulk)
  const schemeModulDataErr = useSelector((state) => state.scheme.addSchemeInBulkErr)
  const deleteSchemeData = useSelector((state) => state.scheme.deleteSchemeData)
  const deleteSchemeError = useSelector((state) => state.scheme.deleteSchemeError)

  useEffect(() => {
    console.log("users", users)
  }, [users])

  const onChnageValue = (e, name) => {
    if (name === 'category') {
      setSchemeCategory({ ...schemeCategory, category: e });
    } else if (name === 'benefits') {
      setSchemeCategory({ ...schemeCategory, benefit: e });
    } else if (name === "search") {
      setSchemeCategory({ ...schemeCategory, search: e })
    }
  };

  useEffect(() => {
    dispatch(getSchemecategory());
    dispatch(getBenefitsData());
  }, []);

  useEffect(() => {
    if (status && langIds.hindi && langIds.marathi) {
      dispatch(getSchemeData(perPage, pageNumber, status, schemeCategory.benefit ? schemeCategory.benefit : "", schemeCategory.category ? schemeCategory.category : "", schemeCategory.search ? schemeCategory.search : "", langIds.hindi, langIds.marathi));
    }
  }, [perPage, pageNumber, status, langIds]);

  useEffect(() => {
    if (deleteSchemeData && deleteSchemeData.status === 200) {
      dispatch(deleteSchemeSuccess(null))
      toast.success("Scheme deleted");
    }
  }, [deleteSchemeData])

  useEffect(() => {
    if (deleteSchemeError) {
      dispatch(deleteSchemeErr(null))
      toast.error("Something went wrong")
    }
  }, [deleteSchemeError])

  useEffect(() => {
    if (editSchemedata && editSchemedata.status === 200) {
      dispatch(editSchemeSuccess(null))
      toast.success("Scheme updated");
    }
  }, [editSchemedata])

  useEffect(() => {
    if (editSchemedata && editSchemedata.status !== 200) {
      dispatch(editSchemeErr(null))
      toast.error("Something went wrong")
    }
  }, [editSchemeError])

  useEffect(() => {
    if (schemeModulData && schemeModulData.status === 200) {
      toast.success("Scheme imported")
      dispatch(addSchemeInBulk(null))
      dispatch(getSchemeData(perPage, pageNumber, "", "", "", "", langIds.hindi, langIds.marathi))
    }
    else if (schemeModulData && schemeModulData.status !== 200) {
      toast.error("Something went wrong")
      dispatch(addSchemeInBulk(null))
    }
  }, [schemeModulData])

  useEffect(() => {
    if (schemeDataAdd && schemeDataAdd.status === 200) {
      dispatch(addSchemeSuccess(null))
      toast.success("Scheme added");
      dispatch(getSchemeData(perPage, pageNumber, "", "", "", "", langIds.hindi, langIds.marathi))
    }
  }, [schemeDataAdd])

  useEffect(() => {
    if (addSchemeError) {
      dispatch(addSchemeErr(null))
      toast.error("Something went wrong")
    }
  }, [addSchemeError])

  useEffect(() => {
    let temp = {
      hindi: "",
      marathi: "",
    }
    languageData && languageData.data && languageData.data.map((item) => {
      if (item.name.toLowerCase() === "marathi") {
        temp.marathi = item.id
      } else if (item.name.toLowerCase() === "hindi") {
        temp.hindi = item.id
      }
    })
    setLangIds(temp);
  }, [languageData])

  const getOneSchemeDetailByKey = async (languageId, key, id) => {
    await ApiGet(`scheme/getOneScheme?langId=${languageId}&key=${key}`)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Course alredy exist in this language!")
        }
      })
      .catch((e) => {
        if (e.response.status) {
          setIsConfirmModal(true)
          setLanguageIds(languageId);
          setId(id)
          setKey(key)
        }
      })
  }
  const languageHandalCancle = () => {
    setIsConfirmModal(false)
  }

  const languageHandalOk = () => {
    history.push(`${path}/addscheme?langid=${languageIds}&key=${key}`);
  }
  const onApply = () => {
    dispatch(getSchemeData(perPage, pageNumber, status, schemeCategory.benefit ? schemeCategory.benefit : "", schemeCategory.category ? schemeCategory.category : "", schemeCategory.search ? schemeCategory.search : "", langIds.hindi, langIds.marathi));
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
    { label: "type", key: "type" },
    { label: "key", key: "key" },
    { label: "spoc", key: "spoc" },
    { label: "thumbnail", key: "thumbnail" },
    { label: "updatedAt", key: "updatedAt" },
    { label: "videoUrl", key: "videoUrl" },
    { label: "viewCount", key: "viewCount" },
    { label: "website", key: "website" },
    { label: 'application_form', key: 'application_form' },
    { label: 'application_process', key: 'application_process' },
    { label: 'hospital_expenses_estimation_certificate', key: 'hospital_expenses_estimation_certificate' },
    { label: 'medical_superintendent', key: 'medical_superintendent' },
    { label: 'recommended_and_forwarded', key: 'recommended_and_forwarded' },
  ];
  const headerAll = [
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
    { label: "type", key: "type" },
    { label: "key", key: "key" },
    { label: "spoc", key: "spoc" },
    { label: "thumbnail", key: "thumbnail" },
    { label: "updatedAt", key: "updatedAt" },
    { label: "videoUrl", key: "videoUrl" },
    { label: "viewCount", key: "viewCount" },
    { label: "website", key: "website" },
    { label: 'application_form', key: 'application_form' },
    { label: 'application_process', key: 'application_process' },
    { label: 'hospital_expenses_estimation_certificate', key: 'hospital_expenses_estimation_certificate' },
    { label: 'medical_superintendent', key: 'medical_superintendent' },
    { label: 'recommended_and_forwarded', key: 'recommended_and_forwarded' },
  ];

  useEffect(() => {
    if (users?.data) {
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

  // useEffect(() => {
  //   if (users?.data) {
  //     setStateAll(users.data.map((item) => {
  //       return {
  //         ...item,
  //         locations: item?.locations?.map(item => item.name),
  //         schemeBenifit: item?.schemeBenifit?.name,
  //         schemeCategory: item?.schemeCategory?.name,
  //         benifitLine: item.benifitLine,
  //       }
  //     })
  //     )
  //   }
  // }, [users])

  useEffect(() => {
    if (allschemeData?.data?.data) { //set a state for export excel+
      setStateAll(allschemeData.data.data.map((item) => {
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
    if (state.length && exportTog === 'single') {
      CSVLinkRef?.current?.link.click()  // for export
      toast.success("Scheme data exported")
      setExportTog('');
    } else if (stateAll.length && exportTog === 'all') {
      CSVLinkRefAll?.current?.link.click();
      toast.success('All scheme data exported');
      setExportTog('');
    } else if (!state.length && exportTog) {
      toast.success("No scheme data for export")
    }
  }, [state, stateAll])

  useEffect(() => {
    return (() => {
      dispatch(getAllSchemesSuccess(null))
    })
  }, [])

  const reDirect = () => {
    history.push(`${path}/addscheme`);
  };

  const onEdit = key => {
    history.push(`${path}/addscheme?key=${key}`);
  };

  const newSchemes = formData => {
    const newVal = ApiPost("scheme/editScheme", formData)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getSchemeData(perPage, pageNumber, status, "", "", "", langIds.hindi, langIds.marathi))
        }
        return res
      })
    return newVal
  }

  // const deleteSchemes = async key => {
  //   let userForDelete = users && users.data.find(item => item.key === key);
  //   let formData = new FormData();
  //   formData.append('benifitLine', userForDelete.benifitLine.toString('markdown'));
  //   formData.append('detail', userForDelete.detail.toString('markdown'));
  //   formData.append('howToApply', userForDelete.howToApply.toString('markdown'));
  //   formData.append('documentation', userForDelete.documentation.toString('markdown'));
  //   formData.append('name', userForDelete.name);
  //   formData.append('locations', JSON.stringify(userForDelete.locations));
  //   formData.append('schemeCategory', userForDelete.schemeCategory.id);
  //   formData.append('schemeBenifit', userForDelete.schemeBenifit.id);
  //   formData.append('website', userForDelete.website);
  //   formData.append('type', userForDelete.type,);
  //   formData.append('benificiary', userForDelete.benificiary);
  //   formData.append('grievanceRedress', userForDelete.grievanceRedress);
  //   formData.append('elink', userForDelete.elink);
  //   formData.append('spoc', userForDelete.spoc);
  //   formData.append('isActive', false);
  //   formData.append('thumbnail', userForDelete.thumbnail);
  //   formData.append('application_form', userForDelete.application_form);
  //   formData.append('recommended_and_forwarded', userForDelete.recommended_and_forwarded);
  //   formData.append('application_process', userForDelete.application_process);
  //   formData.append('medical_superintendent', userForDelete.medical_superintendent);
  //   formData.append('hospital_expenses_estimation_certificate', userForDelete.hospital_expenses_estimation_certificate);
  //   formData.append('videoUrl', userForDelete.videoUrl);
  //   formData.append('id', userForDelete.id);
  //   formData.append('isDeleted', true);
  //   formData.append('isPublished', userForDelete.isPublished);
  //   formData.append('isApproved', userForDelete.isApproved);
  //   const deleteSchemes = await newSchemes(formData)
  //   if (deleteSchemes.status === 200) {
  //     toast.success("Scheme deleted")
  //   }
  // }

  const activeSchemeData = formData => {
    const newVal = ApiPost("scheme/editScheme", formData)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getSchemeData(perPage, pageNumber, status, schemeCategory.benefit ? schemeCategory.benefit : "", schemeCategory.category ? schemeCategory.category : "", schemeCategory.search ? schemeCategory.search : "", langIds.hindi, langIds.marathi));
        }
        return res
      })
    return newVal
  }

  const onRestore = async (key) => {
    let userForactive = users && users.data.find(item => item.key === key);
    let formData = new FormData();
    formData.append('benifitLine', userForactive.benifitLine.toString('markdown'));
    formData.append('detail', userForactive.detail.toString('markdown'));
    formData.append('howToApply', userForactive.howToApply.toString('markdown'));
    formData.append('documentation', userForactive.documentation.toString('markdown'));
    formData.append('id', userForactive.id);
    formData.append('name', userForactive.name);
    formData.append('schemeCategory', userForactive.schemeCategory.id);
    formData.append('benificiary', userForactive.benificiary);
    formData.append('locations', JSON.stringify(userForactive.locations));
    formData.append('thumbnail', userForactive.thumbnail);
    formData.append('videoUrl', userForactive.videoUrl);
    formData.append('website', userForactive.website);
    formData.append('schemeBenifit', userForactive.schemeBenifit.id);
    formData.append('type', userForactive.type,);
    formData.append('grievanceRedress', userForactive.grievanceRedress);
    formData.append('elink', userForactive.elink);
    formData.append('spoc', userForactive.spoc);
    formData.append('isActive', true);
    formData.append('isDeleted', false);
    formData.append('isPublished', true);
    formData.append('isApproved', true);
    formData.append('application_form', userForactive.application_form);
    formData.append('recommended_and_forwarded', userForactive.recommended_and_forwarded);
    formData.append('application_process', userForactive.application_process);
    formData.append('medical_superintendent', userForactive.medical_superintendent);
    formData.append('hospital_expenses_estimation_certificate', userForactive.hospital_expenses_estimation_certificate);
    let data = {
      isActive: true,
      isDeleted: false,
      isPublished: true,
      isApproved: true,
    }
    const restoreSchemeData = await activeSchemeData(formData)
    if (restoreSchemeData.status === 200) {
      toast.success("Scheme active")
    }
  }

  const callback = key => {
    setStatus(key);
    setPageNumber(1);
    setExportTog(false);
  };

  const deleteSchemes = (id, key) => {
    setShowAlert(true);
    setKeyForDelete(key)
    setIdForDelete(id)
  }

  const onDelete = (idForDelete, keyForDelete, typeForDelete) => {
    dispatch(deleteScheme(idForDelete, keyForDelete, typeForDelete))
    setKeyForDelete('')
    setIdForDelete('')
    setShowAlert(false)
  }

  const onDeleteAll = (idForDelete, keyForDelete, typeForMultipleDelete) => {
    dispatch(deleteScheme(idForDelete, keyForDelete, typeForMultipleDelete))
    setKeyForDelete('')
    setIdForDelete('')
    setShowAlert(false)
  }

  const viewSchemesdata = (key) => {
    history.push(`/admin/scheme/view?key=${key}`)
  }

  const onExportschemes = () => {
    dispatch(getSchemeData(perPage, pageNumber, status, schemeCategory.benefit ? schemeCategory.benefit : "", schemeCategory.category ? schemeCategory.category : "", "", langIds.hindi, langIds.marathi));
    setExportTog(true)
    setExportTog('single');
  }

  const onAllExportSchemes = () => {
    dispatch(getAllSchemes(perPage, pageNumber))
    setExportTog(true)
    setExportTog("all");
  }

  const clearFilter = () => {
    setSchemeCategory({ ...schemeCategory, category: "", benefit: "", search: "" })
    dispatch(getSchemeData(perPage, pageNumber, status, "", "", "", langIds.hindi, langIds.marathi));
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
  const onBannerSelect = (id, bannerSelected) => {
    if (status !== 'active') {
      return
    }
    let body = {
      id: id,
      bannerSelected: !bannerSelected
    }
    ApiPost(`scheme/updateBannerSelected`, body)
      .then(res => {
        toast.success(!bannerSelected ? 'Banner selected ' : 'Banner deselected');
        dispatch(getSchemeData(perPage, pageNumber, status, "", "", "", langIds.hindi, langIds.marathi));
      });
  }
  const menu = (
    <Menu
      onClick={onClick}
      items={[
        {
          label: 'Export schemes',
          key: 'exportSchemes',
        },
        {
          label: 'Export all scheme',
          key: 'exportAllScheme',
        },
        {
          label: 'Add scheme',
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
        toast.success(data.isApproved ? "Scheme approved" : "Scheme disapproved")
        dispatch(getSchemeData(perPage, pageNumber, status, schemeCategory.benefit ? schemeCategory.benefit : "", schemeCategory.category ? schemeCategory.category : "", "", langIds.hindi, langIds.marathi));
      })
      .catch((err) => console.log("Error", err))
  }

  useEffect(() => {
    setSchemeTableData(users?.data.map((item, index) => {
      let schemeratings = item.schemeRatings.map(item => item.rating)
      var sum = 0;
      for (var i = 0; i < schemeratings.length; i++) {
        sum += parseInt(schemeratings[i], 10);
      }
      var avg = sum / schemeratings.length;

      return ({
        key: index,
        SchemeName: (
          <span className='For-Underline' onClick={() => viewSchemesdata(item.key)}>
            {item?.name}
          </span>
        ),
        TypeOfBenefits: item.schemeBenifit.name,
        TargetBeneficiary: item.benificiary,
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
        selectLanguage: (
          <div className="">
            <div className="languageBtn">
              <>
                <Button size="small" type={item.hindi ? "success" : "primary"} shape='round'
                  onClick={() => {
                    setSelectedLanguageData(item)
                    getOneSchemeDetailByKey(langIds?.hindi, item?.key, item?.id)
                  }}
                >
                  HN
                </Button>

                <Button size="small" type={item.marathi ? "success" : "primary"} shape='round'
                  onClick={() => {
                    getOneSchemeDetailByKey(langIds?.marathi, item?.key, item?.id)
                  }}
                >
                  MT
                </Button>
              </>
            </div>
          </div>
        ),
        chooseBanner: (
          <div onClick={() => onBannerSelect(item.id, item.bannerSelected)} style={{ textAlign: "center" }
          }>
            <Switch checked={item.bannerSelected} disabled={status === 'active' ? false : true}></Switch>
          </div>
        ),
        action: (
          <div className="active-schemes-table">
            <div className="table-actions">
              {
                status === "active" ?
                  <>
                    <Button
                      className="btn-icon"
                      onClick={() => onEdit(item.key)}
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
                      onClick={() => deleteSchemes(item.id, item.key)}
                      shape="circle"
                    >
                      <FeatherIcon icon="trash-2" size={16} />
                    </Button>
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
  }, [users, isAscend])

  const sorting = () => {
    if (isAscend) {
      users && users.data.sort((a, b) => a.name.localeCompare(b.name))
    }
    else {
      users && users.data.sort((a, b) => b.name.localeCompare(a.name))
    }
    setIsAscend(!isAscend)
  }

  const sortingDate = () => {
    if (isAscend) {
      users && users.data.sort((a, b) => moment(b.updatedAt).unix() - moment(a.updatedAt).unix())
    } else {
      users && users.data.sort((a, b) => moment(a.updatedAt).unix() - moment(b.updatedAt).unix())
    }
    setIsAscend(!isAscend)
  }
  const schemeTableColumns = [
    {
      title: 'Scheme name',
      dataIndex: 'SchemeName',
      sorter: (a, b) => sorting(),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Type of benefits',
      dataIndex: 'TypeOfBenefits',
      sorter: (a, b) => a.TypeOfBenefits.localeCompare(b.TypeOfBenefits),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Target beneficiary',
      dataIndex: 'TargetBeneficiary',
      sorter: (a, b) => a.TargetBeneficiary.localeCompare(b.TargetBeneficiary),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Scheme ratings',
      dataIndex: 'schemeRatings',
    },
    {
      title: 'Web site',
      dataIndex: 'Website',
      sorter: (a, b) => a.Website.localeCompare(b.Website),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Last updated',
      dataIndex: 'LastUpdated',
      sorter: (a, b) => sortingDate(),
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
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  return (
    <>
      <PageHeader
        ghost
        title="Schemes"
        buttons={[
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

            <CSVLink
              headers={headerAll}
              data={stateAll}
              ref={CSVLinkRefAll}
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
                    <Form.Item label="Scheme category">
                      <Select
                        size="large"
                        className={schemeCategory.category ? "sDash_fullwidth-select" : 'select-option-typ-placeholder'}
                        name="category"
                        value={schemeCategory.category}
                        onChange={e => onChnageValue(e, 'category')}
                        placeholder="Select scheme category"
                      >
                        <Option value="">Select scheme category</Option>
                        {schemeData && schemeData.data?.map((items, i) => <Option key={i} value={items.id}>{items.name} </Option>)}
                      </Select>
                    </Form.Item>
                  </Form>
                </Col>
                <Col md={6} xs={24} className="mb-25">
                  <Form layout="vertical">
                    <Form.Item label="Scheme benefits">
                      <Select
                        size="large"
                        className={schemeCategory.benefit ? "sDash_fullwidth-select" : 'select-option-typ-placeholder'}
                        value={schemeCategory.benefit}
                        name="benefits"
                        onChange={e => onChnageValue(e, 'benefits')}
                        placeholder="Select scheme benefits"
                      >
                        <Option value="">Select scheme benefits</Option>
                        {getBenefitData &&
                          getBenefitData.data?.map((items, i) => <Option key={i} value={items.id}>{items.name} </Option>)}
                      </Select>
                    </Form.Item>
                  </Form>
                </Col>
                <Col md={6} xs={24} className="mb-25">
                  <Form name="sDash_select" layout="vertical">
                    <Form.Item label="Search">
                      <Input placeholder="Search" name='search' value={schemeCategory.search} onChange={e => onChnageValue(e.target.value, 'search')} />
                    </Form.Item>
                  </Form>
                </Col>

                <Col md={6} xs={24} className="mb-25">
                  <ListButtonSizeWrapper>
                    <Button size="small" type="primary"
                      onClick={() => {
                        onApply();
                        setExportTog(false)
                      }}>

                      Apply
                    </Button>
                    <Button size="small" type="light" onClick={() => clearFilter()}>
                      Clear
                    </Button>
                  </ListButtonSizeWrapper>
                </Col>
              </Row>
              <Tabs onChange={callback}>
                <TabPane tab="Active schemes" key="active">
                  <UserTableStyleWrapper>
                    <TableWrapper className="table-responsive pb-30">
                      <Table
                        rowSelection={rowSelection}
                        dataSource={schemeTableData}
                        columns={schemeTableColumns}
                        pagination={{
                          defaultPageSize: users?.per_page,
                          total: users?.page_count,
                          onChange: (page, pageSize) => {
                            setPageNumber(page);
                            setPerPage(pageSize);
                          },
                        }}
                      />
                    </TableWrapper>
                  </UserTableStyleWrapper>
                </TabPane>

                <TabPane tab="Inactive schemes" key="inactive">
                  <UserTableStyleWrapper>
                    <TableWrapper className="table-responsive">
                      <Table
                        rowSelection={rowSelection}
                        dataSource={schemeTableData}
                        columns={schemeTableColumns}
                        pagination={{
                          defaultPageSize: users?.per_page,
                          total: users?.page_count,
                          onChange: (page, pageSize) => {
                            setPageNumber(page);
                            setPerPage(pageSize);
                          },
                        }}
                      />
                    </TableWrapper>
                  </UserTableStyleWrapper>
                </TabPane>
              </Tabs>
            </Col >
          </Row >
        </Cards >
      </Main >

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
                languageHandalOk(languageIds, key)
              }} >
                Yes
              </Button>
            </>}
          children={"This coures in not available in this language. You want to add?"}
        />
      )}

      {viewModal && <ViewModal viewModal={viewModal} type="primary" setViewModal={setViewModal} data={getOneScheme} />}
      {importModal && <ImportFileModal importModal={importModal} handleCancel={() => setImportModal(false)} modaltitle="Import schemes" />}

      {showAlert &&
        <SweetAlert
          danger
          cancelBtnText="Cancel"
          confirmBtnBsStyle="danger"
          title="Are you sure?"
        >
          You want to delete scheme.
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

export default Schemes;
