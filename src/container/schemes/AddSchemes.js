import { Checkbox, Col, Form, Input, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import RichTextEditor from 'react-rte';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { useDispatch, useSelector } from 'react-redux';
import {
  addSchemeData,
  editSchemeData,
  getOneSchemeData,
  getSchemeBenifits,
  getSchemecategory,
  getState,
} from '../../redux/schemes/actionCreator';
import uuid from 'react-uuid';
import { useHistory, useLocation, useRouteMatch } from 'react-router';

const AddSchemes = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get('key');
  let history = useHistory();
  let location = useLocation();

  const dispatch = useDispatch();
  const { Option } = Select;

  const [state, setState] = useState({
    benifitLine: RichTextEditor.createEmptyValue(),
    detail: RichTextEditor.createEmptyValue(),
    howToApply: RichTextEditor.createEmptyValue(),
    documentation: RichTextEditor.createEmptyValue(),
    name: '',
    schemeCategory: '',
    schemeBenifit: '',
    locations: [],
    website: '',
    type: '',
    benificiary: '',
    grievanceRedress: '',
    elink: '',
    spoc: '',
    isActive: '',
    sequence: '',
    videoUrl: '',
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
    if (getOneScHemeData && id) {
      console.log('getOneScHemeData', getOneScHemeData);
      setState({
        ...state,
        benifitLine: RichTextEditor.createValueFromString(getOneScHemeData.benifitLine, 'markdown'),
        detail: RichTextEditor.createValueFromString(getOneScHemeData.detail, 'markdown'),
        howToApply: RichTextEditor.createValueFromString(getOneScHemeData.howToApply, 'markdown'),
        documentation: RichTextEditor.createValueFromString(getOneScHemeData.documentation, 'markdown'),
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
        sequence: getOneScHemeData.sequence,
        videoUrl: getOneScHemeData.videoUrl,
        thumbnail: getOneScHemeData.thumbnail,
        id: getOneScHemeData.id,
        isDeleted: getOneScHemeData.isDeleted,
        isPublished: getOneScHemeData.isPublished,
        isApproved: getOneScHemeData.isApproved,
      });
    }
  }, [getOneScHemeData]);

  useEffect(() => {
    console.log('STATE', state);
  }, [state]);

  const onChangesEditorBenifit = value => {
    setState({ ...state, benifitLine: value });
  };
  const onChangesEditorSchemeSummary = value => {
    setState({ ...state, detail: value });
  };
  const onChangesEditorHowToApply = value => {
    setState({ ...state, howToApply: value });
  };
  const onChangesEditorDocumentation = value => {
    setState({ ...state, documentation: value });
  };

  /*    const SchemeName = (value) => {
           setState({ ...state, schemename: value });
       }; */
  /*   const SchemeCategory = (value) => {
          setState({ ...state, scheme: value });
      }; */
  /*   const TypeOfBenefits = (value) => {
          setState({ ...state, schemeBenifit: value });
      }; */
  /*    const Location = (value) => {
          setState({ ...state, location: value });
      };  */
  // const Website = (value) => {
  //     setState({ ...state, website: value });
  // };
  /* const Category = (value) => {
        setState({ ...state, category: value });
    }; */
  /*   const TargetBeneficiary = (value) => {
          setState({ ...state, targetBeneficiary: value });
      };  */
  /* const GrievanceRedress = (value) => {
        setState({ ...state, grievanceRedress: value });
    }; */
  /* const eLink = (value) => {
        setState({ ...state, Elink: value });
    }; */
  /* const SPOC = (value) => {
        setState({ ...state, spoc: value });
    };
    const ch = (value) => {
        setState({ ...state, CH: value })
    }  */

  /*   const onChangeValue = (e) => {
          setState({ ...state, [e.target.name]: e.target.value })
      } */

  const selectValue = (e, name) => {
    if (name === 'schemeBenifit') {
      setState({
        ...state,
        schemeBenifit: e,
      });
    } else if (name === 'schemeCategory') {
      setState({ ...state, schemeCategory: e });
    } else if (name === 'type') {
      setState({ ...state, type: e });
    }
    // else if (name === "locations") {
    //     setState({ ...state, locations: [...state.locations, e ]});
    // }
    else if (name === 'locations') {
      setState({ ...state, locations: e });
    }
  };

  const onChangeValue = e => {
    //let re = /^[0-9\b]+$/;
    if (e.target.name === 'isActive') {
      setState({
        ...state,
        [e.target.name]: e.target.checked,
      });
    } else if (e.target.name === 'sequence') {
      if (e.target.value > 0) {
        setState({ ...state, [e.target.name]: e.target.value });
      } else {
        setState({ ...state, [e.target.name]: 0 });
      }
    }
    // else if (name === "sequence") {

    //     if (e.target.value === "" || re.test(e.target.value)) {
    //         setState({ ...state, [e.target.name]: e.target.value })
    //     }
    // }
    else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  };

  const validation = () => {
    // console.log("(state.benifitLine).toString", (state.benifitLine).toString("markdown"))
    let error = {};
    let flage = false;
    if (state.name === '') {
      error.name = '*Scheme Name is required';
      flage = true;
    }
    if (state.schemeCategory === '') {
      error.schemeCategory = '*schemeCategory is required';
      flage = true;
    }
    if (state.sequence === '') {
      error.sequence = '*sequence is required';
      flage = true;
    }
    if (state.schemeBenifit === '') {
      error.schemeBenifit = '*schemeBenifit is required';
      flage = true;
    }
    if (state.benifitLine.toString('markdown').length <= 2) {
      error.benifitLine = ' *benifitLine is required';
      flage = true;
    }
    if (state.benificiary === '') {
      error.benificiary = ' *benificiary is required';
      flage = true;
    }
    if (state.detail.toString('markdown').length <= 2) {
      error.detail = '*detail is required';
      flage = true;
    }
    if (state.howToApply.toString('markdown').length <= 2) {
      error.howToApply = '* howToApply is required';
      flage = true;
    }
    if (state.documentation.toString('markdown').length <= 2) {
      error.documentation = '*documentation is required';
      flage = true;
    }
    if (state.locations.length < 1) {
      error.locations = ' *locations is required';
      flage = true;
    }
    if (state.website === '') {
      error.website = ' *website is required';
      flage = true;
    }
    if (state.type === '') {
      error.type = ' *type is required';
      flage = true;
    }
    if (state.grievanceRedress === '') {
      error.grievanceRedress = '*grievanceRedress is required';
      flage = true;
    }
    if (state.elink === '') {
      error.elink = ' *elink is required';
      flage = true;
    }
    if (state.spoc === '') {
      error.spoc = '*spoc is required';
      flage = true;
    }
    if (state.videoUrl === '') {
      error.videoUrl = '*VideoUrl is required';
      flage = true;
    }
    if (state.thumbnail === '') {
      error.thumbnail = '*ThumbNail is required';
      flage = true;
    }
    setError(error);
    return flage;
  };

  const onSubmit = () => {
    if (validation()) {
      return;
    }
    let data = {
      key: uuid(),
      sequence: parseInt(state.sequence),
      benifitLine: state.benifitLine.toString('markdown'),
      detail: state.detail.toString('markdown'),
      howToApply: state.howToApply.toString('markdown'),
      documentation: state.documentation.toString('markdown'),
      name: state.name,
      locations: state.locations,
      schemeCategory: state.schemeCategory,
      schemeBenifit: state.schemeBenifit,
      website: state.website,
      type: state.type,
      benificiary: state.benificiary,
      grievanceRedress: state.grievanceRedress,
      elink: state.elink,
      spoc: state.spoc,
      isActive: state.isActive,
      videoUrl: state.videoUrl,
      thumbnail: state.thumbnail,
      id: state.id,
      isDeleted: state.isDeleted,
      isPublished: state.isPublished,
      isApproved: state.isApproved,
    };
    console.log('data', state);
    if (!location.search) {
      dispatch(addSchemeData(data));
      // history.push(`${path}/scheme`)
      history.push(`/admin/scheme`);
    } else {
      delete data.key;
      dispatch(editSchemeData(data));
      history.push(`/admin/scheme`);
    }
  };

  return (
    <>
      <PageHeader
        ghost
        title="Add Scheme"
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
              <label htmlFor="name">Scheme Name</label>
              <Form.Item>
                <Input placeholder="Scheme Name" value={state.name} name="name" onChange={e => onChangeValue(e)} />
                {error.name && <span style={{ color: 'red' }}>{error.name}</span>}
              </Form.Item>
            </Col>

            {/* </Row>
                    <Row justify="space-between"> */}
            <Col lg={11} md={11} sm={24} xs={24}>
              <label htmlFor="category mb-4">Scheme Category</label>
              <Form.Item initialValue=" Select a scheme category ">
                <Select
                  size="large"
                  placeholder="Select Category"
                  value={state.schemeCategory}
                  className="sDash_fullwidth-select"
                  name="schemeCategory"
                  onChange={e => selectValue(e, 'schemeCategory')}
                >
                  {scheme && scheme.data.map(items => <Option value={items.id}>{items.name} </Option>)}
                </Select>
                {error.schemeCategory && <span style={{ color: 'red' }}>{error.schemeCategory}</span>}
              </Form.Item>
            </Col>

            <Col lg={11} md={11} sm={24} xs={24}>
              <label htmlFor="Benefits">Type of Benefits</label>
              <Form.Item initialValue="Type of Benefits">
                <Select
                  size="large"
                  placeholder="Select Benefits"
                  value={state.schemeBenifit}
                  className="sDash_fullwidth-select"
                  name="schemeBenifit"
                  onChange={e => selectValue(e, 'schemeBenifit')}
                >
                  {SchemeBenifits && SchemeBenifits.map(items => <Option value={items.id}>{items.name} </Option>)}
                </Select>
                {error.schemeBenifit && <span style={{ color: 'red' }}>{error.schemeBenifit}</span>}
              </Form.Item>
            </Col>

            <Col lg={11} md={11} sm={24} xs={24}>
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
            </Col>
          </Row>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="Benefit-1-Line">Benefit 1-Line</label>
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

          <label htmlFor="TargetBeneficiary">Target Beneficiary</label>
          <Form.Item>
            <Input.TextArea
              placeholder="Target Beneficiary"
              value={state.benificiary}
              name="benificiary"
              onChange={e => onChangeValue(e)}
            />
            {error.benificiary && <span style={{ color: 'red' }}>{error.benificiary}</span>}
          </Form.Item>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="SchemeSummary">Scheme Summary</label>
            <div className="group" style={{ marginBottom: '0px' }}>
              <RichTextEditor
                placeholder="Scheme Summary"
                name="detail"
                value={state.detail}
                onChange={onChangesEditorSchemeSummary}
              />
            </div>
            {error.detail && <span style={{ color: 'red' }}>{error.detail}</span>}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="HowtoApply">How to Apply</label>
            <div className="group" style={{ marginBottom: '0px' }}>
              <RichTextEditor
                placeholder="How to Apply"
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
                        <Option value={item.id}> {item.name} </Option>
                      </>
                    ))}
                </Select>
                {error.locations && <span style={{ color: 'red' }}>{error.locations}</span>}
              </Form.Item>
            </Col>

            <Col lg={11} md={11} sm={24} xs={24}>
              <label htmlFor="Website">Website</label>
              <Form.Item>
                <Input placeholder="Website" value={state.website} name="website" onChange={e => onChangeValue(e)} />
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
                    placeholder="Select Type"
                    onChange={e => selectValue(e, 'type')}
                  >
                    <Option value="">Select Type</Option>
                    <Option value="ONLINE">Online </Option>
                    <Option value="OFFLINE">Offline</Option>
                  </Select>
                  {/* <Input placeholder="" name='category' onChange={(e) => onChangeValue(e)} /> */}
                  {error.type && <span style={{ color: 'red' }}>{error.type}</span>}
                </Form.Item>
              </Form>
            </Col>
            <Col lg={11} md={11} sm={24} xs={24}>
              <label htmlFor="GrievanceRedress">Grievance Redress</label>
              <Form.Item>
                <Input
                  placeholder="Grievance Redress"
                  value={state.grievanceRedress}
                  name="grievanceRedress"
                  onChange={e => onChangeValue(e)}
                />
                {error.grievanceRedress && <span style={{ color: 'red' }}>{error.grievanceRedress}</span>}
              </Form.Item>
            </Col>
            <Col lg={11} md={11} sm={24} xs={24} className="d-flex f-d-cloumn">
              <label htmlFor="E-Link">E Link</label>
              <Form.Item>
                <Input placeholder="E Link" name="elink" value={state.elink} onChange={e => onChangeValue(e)} />
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
            {/* </Row>

                    <Row justify="space-between"> */}
            <Col lg={11} md={11} sm={24} xs={24} className="d-flex f-d-cloumn">
              <label htmlFor="videoUrl">VideoUrl</label>
              <Form.Item>
                <Input placeholder="videoUrl" value={state.videoUrl} name="videoUrl" onChange={e => onChangeValue(e)} />
                {error.videoUrl && <span style={{ color: 'red' }}>{error.videoUrl}</span>}
              </Form.Item>
            </Col>
            <Col lg={11} md={11} sm={24} xs={24}>
              <label htmlFor="thumbnail">ThumbNail</label>
              <Form.Item>
                <Input
                  placeholder="ThumbNail"
                  value={state.thumbnail}
                  name="thumbnail"
                  onChange={e => onChangeValue(e)}
                />
                {error.thumbnail && <span style={{ color: 'red' }}>{error.thumbnail}</span>}
              </Form.Item>
            </Col>
          </Row>

          <div>
            <label htmlFor="visible" className="ml-10">
              Visible to User
            </label>
            <Checkbox id="visible" name="isActive" checked={state.isActive} onChange={e => onChangeValue(e)}></Checkbox>
          </div>

          <div className="sDash_form-action mt-20">
            <Button className="btn-signin ml-10" type="primary" size="medium" onClick={e => onSubmit(e)}>
              {id ? 'Edit' : 'Add'}
            </Button>
            <Button className="btn-signin" type="light" size="medium" onClick={() => history.push(`/admin/scheme`)}>
              Cancel
            </Button>
          </div>
        </Cards>
      </Main>
    </>
  );
};

export default AddSchemes;
