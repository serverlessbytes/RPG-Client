import { Checkbox, Col, Form, Input, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import RichTextEditor from 'react-rte';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { useDispatch, useSelector } from 'react-redux';
import {
  addSchemeData, editSchemeData, getOneSchemeData, getSchemeBenifits, getSchemecategory, getState,
} from '../../redux/schemes/actionCreator';
import uuid from 'react-uuid';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import TextArea from 'antd/lib/input/TextArea';

const AddSchemes = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get('key');
  const langId = searchParams.get('langid');
  const ids = searchParams.get('id');
  let history = useHistory();
  let location = useLocation();

  const dispatch = useDispatch();
  const { Option } = Select;

  const [state, setState] = useState({
    // benifitLine: RichTextEditor.createEmptyValue(),
    // detail: RichTextEditor.createEmptyValue(),
    // howToApply: RichTextEditor.createEmptyValue(),
    // documentation: RichTextEditor.createEmptyValue(),
    // name: '',
    // schemeCategory: '',
    // schemeBenifit: '',
    // locations: [],
    // website: '',
    // type: '',
    // benificiary: '',
    // grievanceRedress: '',
    // elink: '',
    // spoc: '',
    // isActive: true,
    // // sequence: '',
    // videoUrl: '',
    // thumbnail: '',
    // application_form: "",
    // recommended_and_forwarded: "",
    // application_process: "",
    // medical_superintendent: "",
    // hospital_expenses_estimation_certificate: ""
    key: '',
    name: '',
    schemeCategory: '',
    schemeBenifit: '',
    benifitLine: RichTextEditor.createEmptyValue(),
    benificiary: '',
    videoUrl: '',
    detail: RichTextEditor.createEmptyValue(),
    howToApply: RichTextEditor.createEmptyValue(),
    documentation: RichTextEditor.createEmptyValue(),
    website: '',
    type: '',
    elink: '',
    grievanceRedress: '',
    spoc: '',
    isActive: true,
    locations: [],
    application_form: '',
    recommended_and_forwarded: '',
    application_process: '',
    medical_superintendent: '',
    hospital_expenses_estimation_certificate: '',
    thumbnail: '',
  });

  const [error, setError] = useState({});

  const scheme = useSelector(state => state.scheme.schemecatogeryData);
  const SchemeBenifits = useSelector(state => state.scheme.schemeBenefitData);
  const State = useSelector(state => state.scheme.addState);
  const getOneScHemeData = useSelector(state => state.scheme.getOneSchemeData);

  useEffect(() => {
    dispatch(getSchemecategory());
    dispatch(getSchemeBenifits());
    dispatch(getState());
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getOneSchemeData(id));
    }
  }, [id]);
  useEffect(() => {
    console.log("getOneScHemeData", getOneScHemeData);
  }, [getOneScHemeData])

  useEffect(() => {
    if (getOneScHemeData && id) {
      setState({
        ...state,
        benifitLine: RichTextEditor.createValueFromString(getOneScHemeData.benifitLine, 'markdown'),
        detail: RichTextEditor.createValueFromString(getOneScHemeData.detail, 'markdown'),
        howToApply: RichTextEditor.createValueFromString(getOneScHemeData.howToApply, 'markdown'),
        documentation: RichTextEditor.createValueFromString(getOneScHemeData.documentation, 'markdown'),
        key: getOneScHemeData.key,
        name: getOneScHemeData.name,
        schemeCategory: getOneScHemeData.schemeCategory.id,
        schemeBenifit: getOneScHemeData.schemeBenifit.id,
        locations: getOneScHemeData.locations.map(item => item.id),
        website: getOneScHemeData.website,
        type: getOneScHemeData.type,
        benificiary: getOneScHemeData.benificiary,
        grievanceRedress: getOneScHemeData.grievanceRedress,
        elink: getOneScHemeData.elink,
        spoc: getOneScHemeData.spoc,
        isActive: getOneScHemeData.isActive,
        videoUrl: getOneScHemeData.videoUrl,
        thumbnail: getOneScHemeData.thumbnail,
        id: getOneScHemeData.id,
        isDeleted: getOneScHemeData.isDeleted,
        isPublished: getOneScHemeData.isPublished,
        isApproved: getOneScHemeData.isApproved,
        application_form: getOneScHemeData.application_form,
        application_process: getOneScHemeData.application_process,
        hospital_expenses_estimation_certificate: getOneScHemeData.hospital_expenses_estimation_certificate,
        medical_superintendent: getOneScHemeData.medical_superintendent,
        recommended_and_forwarded: getOneScHemeData.recommended_and_forwarded,
      });
    }
  }, [getOneScHemeData]);

  const onChangesEditorBenifit = value => {
    setState({ ...state, benifitLine: value });
    setError({ ...error, benifitLine: "" })
  };
  const onChangesEditorSchemeSummary = value => {
    setState({ ...state, detail: value });
    setError({ ...error, detail: "" })
  };
  const onChangesEditorHowToApply = value => {
    setState({ ...state, howToApply: value });
    setError({ ...error, howToApply: "" })

  };
  const onChangesEditorDocumentation = value => {
    setState({ ...state, documentation: value });
    setError({ ...error, documentation: "" })
  };


  const selectValue = (e, name) => {
    if (name === 'schemeBenifit') {
      setState({
        ...state,
        schemeBenifit: e,
      });
      setError({ ...error, schemeBenifit: "" })
    } else if (name === 'schemeCategory') {
      setState({ ...state, schemeCategory: e });
      setError({ ...error, schemeCategory: "" })
    } else if (name === 'type') {
      setState({ ...state, type: e });
      setError({ ...error, type: "" })
    }
    // else if (name === "locations") {
    //     setState({ ...state, locations: [...state.locations, e ]});
    // }
    else if (name === 'locations') {
      setState({ ...state, locations: e });
      setError({ ...error, locations: "" })
    }
  };
  const onChangeValue = e => {
    setError({ ...error, [e.target.name]: "" })
    if (e.target.name === 'isActive') {
      setState({
        ...state,
        [e.target.name]: e.target.checked
      });
    }

    // else if (e.target.name === 'sequence') {
    //   if (e.target.value > 0) {
    //     setState({ ...state, [e.target.name]: e.target.value });
    //   } else {
    //     setState({ ...state, [e.target.name]: 0 });
    //   }
    // }
    // else if (name === "sequence") {

    //     if (e.target.value === "" || re.test(e.target.value)) {
    //         setState({ ...state, [e.target.name]: e.target.value })
    //     }
    // }

    else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  };

  const fileUpload = (e, name) => {
    let firsttemp = e.target.files[0]?.name?.split('.');
    if (firsttemp) {
      let fileexten = ['jpeg', 'jpg', 'png']
      if (fileexten.includes(firsttemp[firsttemp.length - 1])) {
        setState({ ...state, [name]: e.target.files[0] })
        setError({ ...error, thumbnail: "" });
      }
      else {
        setError({ ...error, thumbnail: 'Please select valid document file' })
        setState({ ...state, thumbnail: '' })
      }
    }
    else {
      setError({ ...error, thumbnail: 'Please select document file' })
    }
  }

  const validation = () => {
    let error = {};
    let flage = false;
    let urlReg = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    let stringReg = /^[ A-Za-z]/;
    let a = stringReg.test(state.name)

    if (!state.name) {
      error.name = 'Scheme name is required';
      flage = true;
    }
    else if (!stringReg.test(state.name)) {
      error.name = 'Name must be string';
      flage = true;
    }
    if (!state.schemeCategory) {
      error.schemeCategory = 'Scheme category is required';
      flage = true;
    }
    // if (state.sequence) {
    //   error.sequence = 'sequence is required';
    //   flage = true;
    // }
    if (!state.schemeBenifit) {
      error.schemeBenifit = 'Scheme benifit is required';
      flage = true;
    }
    if (state.benifitLine.toString('markdown').length <= 2) {
      error.benifitLine = 'Benifit 1-line is required';
      flage = true;
    }
    if (!state.benificiary) {
      error.benificiary = 'Benificiary is required';
      flage = true;
    }
    if (state.detail.toString('markdown').length <= 2) {
      error.detail = 'Scheme summary is required';
      flage = true;
    }
    if (state.howToApply.toString('markdown').length <= 2) {
      error.howToApply = 'How to apply is required';
      flage = true;
    }
    if (state.documentation.toString('markdown').length <= 2) {
      error.documentation = 'Documentation is required';
      flage = true;
    }
    if (state.locations.length < 1) {
      error.locations = 'Locations is required';
      flage = true;
    }
    if (!state.website) {
      error.website = 'Website is required';
      flage = true;
    }
    else if (!urlReg.test(state.website)) {
      error.website = 'Enter valid website';
      flage = true;
    }
    if (!state.type) {
      error.type = 'Type is required';
      flage = true;
    }
    if (!state.grievanceRedress) {
      error.grievanceRedress = 'Grievance redress is required';
      flage = true;
    }
    if (!state.elink) {
      error.elink = 'E link is required';
      flage = true;
    }
    else if (!urlReg.test(state.elink)) {
      error.elink = 'Enter valid elink';
      flage = true;
    }
    if (!state.spoc) {
      error.spoc = 'SOPC is required';
      flage = true;
    }
    if (!state.videoUrl) {
      error.videoUrl = 'Video url is required';
      flage = true;
    }
    else if (!urlReg.test(state.videoUrl)) {
      error.videoUrl = 'Enter Valid videoUrl';
      flage = true;
    }
    if (!state.thumbnail) {
      error.thumbnail = 'Thumbnail is required';
      flage = true;
    }
    if (!state.application_form) {
      error.application_form = 'Application form is required';
      flage = true;
    }
    if (!state.recommended_and_forwarded) {
      error.recommended_and_forwarded = 'Recommended and forwarded is required';
      flage = true;
    }
    if (!state.application_process) {
      error.application_process = 'Application process is required';
      flage = true;
    }
    if (!state.medical_superintendent) {
      error.medical_superintendent = 'Medical superintendent is required';
      flage = true;
    }
    if (!state.hospital_expenses_estimation_certificate) {
      error.hospital_expenses_estimation_certificate = 'Hospital expenses estimate certificate is required';
      flage = true;
    }
    setError(error);
    return flage;
  };

  const onSubmit = () => {
    if (validation()) {
      return;
    }
    let formData = new FormData();
    formData.append('benifitLine', state.benifitLine.toString('markdown'));
    formData.append('detail', state.detail.toString('markdown'));
    formData.append('howToApply', state.howToApply.toString('markdown'));
    formData.append('documentation', state.documentation.toString('markdown'));
    formData.append('name', state.name);
    formData.append('locations', JSON.stringify(state.locations));
    formData.append('schemeCategory', state.schemeCategory);
    formData.append('schemeBenifit', state.schemeBenifit);
    formData.append('website', state.website);
    formData.append('type', state.type,);
    formData.append('benificiary', state.benificiary);
    formData.append('grievanceRedress', state.grievanceRedress);
    formData.append('elink', state.elink);
    formData.append('spoc', state.spoc);
    formData.append('isActive', state.isActive);
    formData.append('thumbnail', state.thumbnail);
    formData.append('application_form', state.application_form);
    formData.append('recommended_and_forwarded', state.recommended_and_forwarded);
    formData.append('application_process', state.application_process);
    formData.append('medical_superintendent', state.medical_superintendent);
    formData.append('hospital_expenses_estimation_certificate', state.hospital_expenses_estimation_certificate);
    formData.append('videoUrl', state.videoUrl);
    if (langId) {
      formData.append('key', state.key);
      dispatch(addSchemeData(langId, formData));
      history.push(`/admin/scheme`);
    }
    else {
      if (id) {
        formData.append('id', state.id);
        formData.append('isDeleted', state.isDeleted);
        formData.append('isPublished', state.isPublished);
        formData.append('isApproved', state.isApproved);
        dispatch(editSchemeData(formData));
        history.push(`/admin/scheme`);
      } else {
        formData.append('key', uuid());
        dispatch(addSchemeData(langId, formData));
        history.push(`/admin/scheme`);
      }
    }
  };

  //   if (!location.search) {
  //     dispatch(addSchemeData(data, langId));
  //     // history.push(`${path}/scheme`)
  //     history.push(`/admin/scheme`);
  //   } else {
  //     delete data.key;
  //     dispatch(editSchemeData(data));
  //     history.push(`/admin/scheme`);
  //   }
  // };
  const onCancel = () => {
    history.push(`/admin/scheme`)
  }
  // useEffect(() => {
  //   if (schemeDataAdd && schemeDataAdd.status === 200) {
  //     dispatch(addSchemeSuccess(null))
  //     toast.success("Scheme add successful");
  //   }
  // }, [schemeDataAdd])
  return (
    <>
      <PageHeader
        ghost
        title={id ? "Edit scheme" : "Add scheme"}
      /*    buttons={[
                 // <div key="1" className="page-header-actions">
                 //     <Button size="small" type="link">
                 //         Export Schemes
                 //     </Button>
                 //     <Button size="small" type="light">
                 //         Import Schemes
                 //     </Button>
                 //     <Button size="small" type="success">
                 //         Create Scheme
                 //     </Button>
                 //     <Button size="small" type="warning">
                 //         Deactivate All Schemes
                 //     </Button>
                 // </div>
             ]} */
      />
      <Main>
        <Cards headless>
          <Row justify="space-between">
            {/* <Col lg={11} className="d-flex f-d-cloumn">
                            <label htmlFor="name" className='mb-5'>Language</label>
                            <Radio.Group onChange={onChange} value={typeOfJob}>
                                <Space direction="vertical">
                                    <Row>
                                        <Radio value={"English"}>English</Radio>
                                        <Radio value={"Hindi"}>Hindi</Radio>
                                    </Row>
                                </Space>
                            </Radio.Group>
                        </Col> */}
            <Col lg={11} md={11} sm={24} xs={24}>
              <label htmlFor="name">Scheme name</label>
              <Form.Item>
                <Input type="name" placeholder="Scheme name" value={state.name} name="name" onChange={e => onChangeValue(e)} />
                {error.name && <span style={{ color: 'red' }}>{error.name}</span>}
              </Form.Item>
            </Col>

            <Col lg={11} md={11} sm={24} xs={24}>
              <label htmlFor="category mb-4">Scheme category</label>
              <Form.Item initialValue=" Select a scheme category ">
                <Select
                  size="large"
                  className={state.schemeCategory ? 'sDash_fullwidth-select' : 'select-option-typ-placeholder'}
                  value={state.schemeCategory}
                  name="schemeCategory"
                  placeholder="Select scheme category"
                  onChange={e => selectValue(e, 'schemeCategory')}
                >
                  <Option value="">Select scheme category</Option>
                  {scheme && scheme.data.map(items => <Option key={items.id} value={items.id}>{items.name} </Option>)}
                </Select>
                {error.schemeCategory && <span style={{ color: 'red' }}>{error.schemeCategory}</span>}
              </Form.Item>
            </Col>

            <Col lg={11} md={11} sm={24} xs={24}>
              <label htmlFor="Benefits">Type of benefits</label>
              <Form.Item initialValue="Type of Benefits">
                <Select
                  size="large"
                  value={state.schemeBenifit}
                  placeholder="Select scheme benefits"
                  className={state.schemeBenifit ? 'sDash_fullwidth-select' : 'select-option-typ-placeholder'}
                  name="schemeBenifit"
                  onChange={e => selectValue(e, 'schemeBenifit')}
                >
                  <Option value="">Select scheme benefits</Option>
                  {SchemeBenifits && SchemeBenifits.map(items => (<> <Option key={items.id} value={items.id}>{items.name} </Option> </>))}
                </Select>
                {error.schemeBenifit && <span style={{ color: 'red' }}>{error.schemeBenifit}</span>}
              </Form.Item>
            </Col>

            {/* <Col lg={11} md={11} sm={24} xs={24}>
              <label htmlFor="name">Senquence</label>
              <Form.Item>
                <Input
                  type="number"
                  placeholder="Senquence"
                  value={state.sequence}
                  name="sequence"
                  onChange={e => onChangeValue(e)}
                />
                {error.sequence && <span style={{ color: 'red' }}>{error.sequence}</span>}
              </Form.Item>
            </Col> */}
          </Row>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="Benefit-1-Line">Benefit 1-line</label>
            <div className="group" style={{ marginBottom: '0px' }}>
              <RichTextEditor
                placeholder="Type your message..."
                name="benifitLine"
                value={state.benifitLine}
                onChange={onChangesEditorBenifit}
              />
            </div>
            {error.benifitLine && <span style={{ color: 'red' }}>{error.benifitLine}</span>}
          </div>

          <label htmlFor="TargetBeneficiary">Target beneficiary</label>
          <Form.Item>
            <Input
              placeholder="Target beneficiary"
              value={state.benificiary}
              name="benificiary"
              onChange={e => onChangeValue(e)}
            />
            {error.benificiary && <span style={{ color: 'red' }}>{error.benificiary}</span>}
          </Form.Item>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="SchemeSummary">Scheme summary</label>
            <div className="group" style={{ marginBottom: '0px' }}>
              <RichTextEditor
                placeholder="Scheme summary"
                name="detail"
                value={state.detail}
                onChange={onChangesEditorSchemeSummary}
              />
            </div>
            {error.detail && <span style={{ color: 'red' }}>{error.detail}</span>}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="HowtoApply">How to apply</label>
            <div className="group" style={{ marginBottom: '0px' }}>
              <RichTextEditor
                placeholder="How to apply"
                name="howToApply"
                value={state.howToApply}
                onChange={onChangesEditorHowToApply}
              />
            </div>
            {error.howToApply && <span style={{ color: 'red' }}>{error.howToApply}</span>}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="Documentation">Documentation</label>
            <div className="group" style={{ marginBottom: '0px' }}>
              <RichTextEditor
                placeholder="Documentation"
                name="documentation"
                value={state.documentation}
                onChange={onChangesEditorDocumentation}
              />
            </div>
            {error.documentation && <span style={{ color: 'red' }}>{error.documentation}</span>}
          </div>

          <Row justify="space-between">
            <Col lg={11} md={11} sm={24} xs={24} className="d-flex f-d-cloumn">
              <label htmlFor="Location">Location</label>
              <Form.Item initialValue="Select a location">
                <Select
                  size="large"
                  placeholder="Location"
                  className="sDash_fullwidth-select"
                  value={state.locations}
                  name="locations"
                  onChange={e => selectValue(e, 'locations')}
                  mode="multiple"
                >
                  {State &&
                    State.map(item => (
                      <>
                        <Option key={item.id} value={item.id}> {item.name} </Option>
                      </>
                    ))}
                </Select>
                {error.locations && <span style={{ color: 'red' }}>{error.locations}</span>}
              </Form.Item>
            </Col>

            <Col lg={11} md={11} sm={24} xs={24}>
              <label htmlFor="Website">Website</label>
              <Form.Item>
                <Input type='url' placeholder=" Website" value={state.website} name="website" onChange={e => onChangeValue(e)} />
                {error.website && <span style={{ color: 'red' }}>{error.website}</span>}
              </Form.Item>
            </Col>

            <Col lg={11} md={11} sm={24} xs={24} className="mb-mb-25">
              <Form layout="vertical">
                <Form.Item label="Type">
                  <Select
                    size="large"
                    className={state.type ? 'sDash_fullwidth-select' : 'select-option-typ-placeholder'}
                    value={state.type}
                    name="type"
                    placeholder="Select type"
                    onChange={e => selectValue(e, 'type')}
                  >
                    <Option value="">Select type</Option>
                    <Option value="ONLINE">Online </Option>
                    <Option value="OFFLINE">Offline</Option>
                  </Select>
                  {/* <Input placeholder="" name='category' onChange={(e) => onChangeValue(e)} /> */}
                  {error.type && <span style={{ color: 'red' }}>{error.type}</span>}
                </Form.Item>
              </Form>
            </Col>

            <Col lg={11} md={11} sm={24} xs={24}>
              <label htmlFor="GrievanceRedress">Grievance redress</label>
              <Form.Item>
                <Input
                  placeholder="Grievance redress"
                  value={state.grievanceRedress}
                  name="grievanceRedress"
                  onChange={e => onChangeValue(e)}
                />
                {error.grievanceRedress && <span style={{ color: 'red' }}>{error.grievanceRedress}</span>}
              </Form.Item>
            </Col>

            <Col lg={11} md={11} sm={24} xs={24} className="d-flex f-d-cloumn">
              <label htmlFor="E-Link">E link</label>
              <Form.Item>
                <Input placeholder="E link" name="elink" value={state.elink} onChange={e => onChangeValue(e)} />
                {error.elink && <span style={{ color: 'red' }}>{error.elink}</span>}
              </Form.Item>
            </Col>

            <Col lg={11} md={11} sm={24} xs={24}>
              <label htmlFor="SPOC">SPOC</label>
              <Form.Item>
                <Input placeholder="SPOC" name="spoc" value={state.spoc} onChange={e => onChangeValue(e)} />
                {error.spoc && <span style={{ color: 'red' }}>{error.spoc}</span>}
              </Form.Item>
            </Col>

            <Col lg={11} md={11} sm={24} xs={24} className="d-flex f-d-cloumn">
              <label htmlFor="videoUrl">video url</label>
              <Form.Item>
                <Input placeholder="video url" value={state.videoUrl} name="videoUrl" onChange={e => onChangeValue(e)} />
                {error.videoUrl && <span style={{ color: 'red' }}>{error.videoUrl}</span>}
              </Form.Item>
            </Col>

            <Col lg={11} md={11} sm={24} xs={24}>
              <label htmlFor="thumbnail">Thumbnail</label>
              <Form.Item>
                <Input
                  type="file"
                  placeholder="thumbnail"
                  // value={state.thumbnail}
                  name="thumbnail"
                  // onChange={e => onChangeValue(e)}
                  onChange={e => fileUpload(e, "thumbnail")}
                />
                {error.thumbnail && <span style={{ color: 'red' }}>{error.thumbnail}</span>}
              </Form.Item>
            </Col>

            <Col lg={11} md={11} sm={24} xs={24}>
              <label htmlFor="application_form">Application form</label>
              <Form.Item name="application_form">
                <TextArea placeholder='Application form' value={state.application_form} name="application_form" onChange={e => onChangeValue(e)} />
                {error.application_form && <span style={{ color: 'red' }}>{error.application_form}</span>}
              </Form.Item>
            </Col>

            <Col lg={11} md={11} sm={24} xs={24}>
              <label htmlFor="recommended_and_forwarded">Recommended and forwarded</label>
              <Form.Item name="recommended_and_forwarded">
                <TextArea placeholder='Recommended and forwarded' value={state.recommended_and_forwarded} name="recommended_and_forwarded" onChange={e => onChangeValue(e)} />
                {error.recommended_and_forwarded && <span style={{ color: 'red' }}>{error.recommended_and_forwarded}</span>}
              </Form.Item>
            </Col>

            <Col lg={11} md={11} sm={24} xs={24}>
              <label htmlFor="application_process">Application process</label>
              <Form.Item name="application_process">
                <TextArea placeholder='Application process' value={state.application_process} name="application_process" onChange={e => onChangeValue(e)} />
                {error.application_process && <span style={{ color: 'red' }}>{error.application_process}</span>}
              </Form.Item>
            </Col>

            <Col lg={11} md={11} sm={24} xs={24}>
              <label htmlFor="medical_superintendent">Medical superintendent</label>
              <Form.Item name="medical_superintendent">
                <TextArea placeholder='Medical superintendent' value={state.medical_superintendent} name="medical_superintendent" onChange={e => onChangeValue(e)} />
                {error.medical_superintendent && <span style={{ color: 'red' }}>{error.medical_superintendent}</span>}
              </Form.Item>
            </Col>

            <Col lg={11} md={11} sm={24} xs={24}>
              <label htmlFor="hospital_expenses_estimation_certificate">Hospital expenses estimate certificate</label>
              <Form.Item name="hospital_expenses_estimation_certificate">
                <TextArea placeholder='Hospital expenses estimate certificate' value={state.hospital_expenses_estimation_certificate} name="hospital_expenses_estimation_certificate" onChange={e => onChangeValue(e)} />
                {error.hospital_expenses_estimation_certificate && <span style={{ color: 'red' }}>{error.hospital_expenses_estimation_certificate}</span>}
              </Form.Item>
            </Col>

          </Row>

          {/* <div>
            <label htmlFor="visible" className="ml-10">
              Visible to User
            </label>
            <Checkbox id="visible" name="isActive" checked={state.isActive} onChange={e => onChangeValue(e)}></Checkbox>
          </div> */}

          <div className="sDash_form-action mt-20">
            <Button className="btn-signin ml-10" type="primary" size="medium" onClick={e => onSubmit(e)}>
              {id && !langId ? 'Edit' : 'Add'}
            </Button>

            <Button className="btn-signin" type="light" size="medium"
              onClick={() => onCancel()}>
              Cancel
            </Button>
          </div>
        </Cards>
      </Main>
    </>
  );
};

export default AddSchemes;
