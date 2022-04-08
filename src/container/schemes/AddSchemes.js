import { Checkbox, Col, Form, Input, Radio, Row, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import RichTextEditor from 'react-rte';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
// import getSchemecategory from '../../redux/schemes/actionCreator'
import { useDispatch, useSelector } from 'react-redux';
import AuthStorage from '../../helper/AuthStorage';
import STORAGEKEY from '../../config/APP/app.config';
import { addSchemeData, editSchemeData, getOneSchemeData, getSchemeBenifits, getSchemecategory, getState } from '../../redux/schemes/actionCreator';
import uuid from 'react-uuid'
import { useHistory, useLocation, useRouteMatch } from 'react-router';

const AddSchemes = () => {

    const { path } = useRouteMatch();
    let history = useHistory();
    let location = useLocation();
    useEffect(() => {
        console.log("path", path);
    }, [])




    /* const [typeOfJob, setTypeOfJob] = useState("");
    const onChange = e => {
        console.log('radio checked', e.target.value);
        setTypeOfJob(e.target.value)
    }; */
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
        locations: '',
        website: '',
        type: '',
        benificiary: '',
        grievanceRedress: '',
        elink: '',
        spoc: '',
        isActive: '',
        sequence: '',
    });
    /*   useEffect(() => { console.log("state.schemename", state.schemename) }, [state.schemename]) */
    /* useEffect(() => { console.log("state.documentation", state.documentation) }, [state.documentation]) */
    useEffect(() => {
        dispatch(getSchemecategory());
        dispatch(getSchemeBenifits());
        dispatch(getState());
    }, [])

    useEffect(() => {
        if (location.search) {
            dispatch(getOneSchemeData(location.search))
        }
    }, [location.search])

    const schemeCategory = useSelector((state) => state.schemeCategory.schemecatogeryData)
    useEffect(() => {
        console.log("schemeCategory", schemeCategory)
    }, [schemeCategory])

    const SchemeBenifits = useSelector((state) => state.schemeCategory.schemeBenefitData)
    const State = useSelector((state) => state.schemeCategory.addState)
    const getOneScHemeData = useSelector((state) => state.schemeCategory.getOneSchemeData)

    console.log("getOneScHemeData", getOneScHemeData)

    useEffect(() => {

        if (getOneScHemeData) {
            console.log("getOneScHemeData", getOneScHemeData)
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
            })
        }
    }, [getOneScHemeData])


    useEffect(() => {
        console.log("STATE", state);
    }, [state])

    const onChangesEditorBenifit = (value) => {
        // console.log(value.toString('markdown'));
        setState({ ...state, benifitLine: value });
    };
    const onChangesEditorSchemeSummary = (value) => {
        setState({ ...state, detail: value });
    };
    const onChangesEditorHowToApply = (value) => {
        setState({ ...state, howToApply: value });
    };
    const onChangesEditorDocumentation = (value) => {
        setState({ ...state, documentation: value });
    };


    /*    const SchemeName = (value) => {
           setState({ ...state, schemename: value });
       }; */
    /*   const SchemeCategory = (value) => {
          setState({ ...state, schemeCategory: value });
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
        if (name === "schemeBenifit") {
            setState({
                ...state,
                schemeBenifit: e
            });
        }
        else if (name === "schemeCategory") {
            setState({ ...state, schemeCategory: e });
        }
        else if (name === "type") {
            setState({ ...state, type: e });
        }
        else if (name === "locations") {
            setState({ ...state, locations: e });
        }
    }

    const onChangeValue = (e) => {
        //let re = /^[0-9\b]+$/;
        if (e.target.name === "isActive") {
            setState({
                ...state,
                [e.target.name]: e.target.checked
            });
        } else if (e.target.name === "sequence") {
            if (e.target.value > 0) {
                setState({ ...state, [e.target.name]: e.target.value })
            } else {
                setState({ ...state, [e.target.name]: 0 })
            }
        }
        // else if (name === "sequence") {

        //     if (e.target.value === "" || re.test(e.target.value)) {
        //         setState({ ...state, [e.target.name]: e.target.value })
        //     }
        // }
        else {
            setState({ ...state, [e.target.name]: e.target.value })
        }
    }


    const onSubmit = () => {
        let data = {
            key: uuid(),
            sequence: parseInt(state.sequence),
            benifitLine: state.benifitLine.toString('markdown'),
            detail: state.detail.toString('markdown'),
            howToApply: state.howToApply.toString('markdown'),
            documentation: state.documentation.toString('markdown'),
            name: state.name,
            //locations:[state.loCation],
            locations: state.locations,
            schemeCategory: state.schemeCategory,
            schemeBenifit: state.schemeBenifit,
            website: state.website,
            type: state.type,
            benificiary: state.benificiary,
            grievanceRedress: state.grievanceRedress,
            elink: state.elink,
            spoc: state.spoc,
            isActive: state.isActive
        }
        console.log("data", state);
        if (!location.search) {
            dispatch(addSchemeData(data))
            history.push(`${path}/scheme`)
        } else {
            delete data.key
            data = {
                ...data,
                id: getOneScHemeData.id,
                isDeleted: false,
                isPublished: true,
                isApproved: true
            }
            dispatch(editSchemeData(data))
            history.push(`${path}/scheme`)
        }
    }


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

            <Main >
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
                        <Col lg={11} md={11} sm={24}>
                            <label htmlFor="name">Scheme Name</label>
                            <Form.Item>
                                <Input placeholder="Scheme Name" value={state.name} name="name" onChange={(e) => onChangeValue(e)} />
                            </Form.Item>
                        </Col>

                        {/* </Row>
                    <Row justify="space-between"> */}
                        <Col lg={11} md={11} sm={24}>
                            <label htmlFor="category mb-4">Scheme Category</label>
                            <Form.Item initialValue=" Select a scheme category ">
                                <Select size="large" placeholder="Select Category" value={state.schemeCategory} className="sDash_fullwidth-select" name="schemeCategory" onChange={(e) => selectValue(e, "schemeCategory")}>
                                    {schemeCategory && schemeCategory.map((items) => (
                                        <Option value={items.id}>{items.name} </Option>
                                    ))}

                                    {/* <Option value="2"> Other Schemes </Option> */}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col lg={11} md={11} sm={24}>
                            <label htmlFor="Benefits">Type of Benefits</label>
                            <Form.Item initialValue="Type of Benefits">
                                <Select size="large" placeholder="Select Benefits" value={state.schemeBenifit} className="sDash_fullwidth-select" name="schemeBenifit" onChange={(e) => selectValue(e, "schemeBenifit")}>
                                    {SchemeBenifits && SchemeBenifits.map((items) => (
                                        <Option value={items.id}>{items.name} </Option>
                                    ))}

                                </Select>
                            </Form.Item>
                        </Col>
                        <Col lg={11} md={11} sm={24}>
                            <label htmlFor="name">Senquence</label>
                            <Form.Item>
                                <Input type="number" placeholder="Scheme Name" value={state.sequence} name="sequence" onChange={(e) => onChangeValue(e)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <label htmlFor="Benefit-1-Line">Benefit 1-Line</label>
                    <div className="group">
                        <RichTextEditor placeholder="Type your message..." name="benifitLine" value={state.benifitLine} onChange={onChangesEditorBenifit} />
                    </div>

                    <label htmlFor="TargetBeneficiary">Target Beneficiary</label>
                    <Form.Item >
                        <Input.TextArea placeholder="" value={state.benificiary} name='benificiary' onChange={(e) => onChangeValue(e)} />
                    </Form.Item>

                    <label htmlFor="SchemeSummary">Scheme Summary</label>
                    <div className="group">
                        <RichTextEditor placeholder="Type your message..." name="detail" value={state.detail} onChange={onChangesEditorSchemeSummary} />
                    </div>

                    <label htmlFor="HowtoApply">How to Apply</label>
                    <div className="group">
                        <RichTextEditor placeholder="Type your message..." name="howToApply" value={state.howToApply} onChange={onChangesEditorHowToApply} />
                    </div>

                    <label htmlFor="Documentation">Documentation</label>
                    <div className="group">
                        <RichTextEditor placeholder="Type your message..." name="documentation" value={state.documentation} onChange={onChangesEditorDocumentation} />
                    </div>
                    <Row justify="space-between">
                        <Col lg={11} className="d-flex f-d-cloumn">
                            <label htmlFor="Location">Location</label>
                            <Form.Item initialValue="Select a location">
                                <Select size="large" className="sDash_fullwidth-select" value={state.locations} name="locations" onChange={(e) => selectValue(e, "locations")} mode="multiple">
                                    {State && State.map((item) => (
                                        <>
                                            <Option value={item.id}> {item.name} </Option>
                                        </>
                                    ))}

                                </Select>
                            </Form.Item>
                        </Col>
                        <Col lg={11}>
                            <label htmlFor="Website">Website</label>
                            <Form.Item >
                                <Input placeholder="" value={state.website} name="website" onChange={(e) => onChangeValue(e)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="space-between">
                        <Col lg={11} className="d-flex f-d-cloumn">
                            <label htmlFor="Category">Type</label>
                            <Form.Item  >
                                <Select size="large" className="sDash_fullwidth-select" value={state.type} name="type" onChange={(e) => selectValue(e, "type")}>
                                    <Option value="ONLINE">Online </Option>
                                    <Option value="OFFLINE">Offline</Option>
                                </Select>
                                {/* <Input placeholder="" name='category' onChange={(e) => onChangeValue(e)} /> */}
                            </Form.Item>
                        </Col>
                        <Col lg={11}>
                            <label htmlFor="GrievanceRedress">Grievance Redress</label>
                            <Form.Item  >
                                <Input placeholder="" value={state.grievanceRedress} name="grievanceRedress" onChange={(e) => onChangeValue(e)} />
                            </Form.Item>
                        </Col>
                        <Col lg={11} className="d-flex f-d-cloumn">
                            <label htmlFor="E-Link">E Link</label>
                            <Form.Item>
                                <Input placeholder="" name='elink' value={state.elink} onChange={(e) => onChangeValue(e)} />
                            </Form.Item>
                        </Col>
                        <Col lg={11}>
                            <label htmlFor="SPOC">SPOC</label>
                            <Form.Item>
                                <Input placeholder="" name='spoc' value={state.spoc} onChange={(e) => onChangeValue(e)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <label htmlFor="visible" className='ml-10'>Visible to User</label>
                    <Checkbox id='visible' name="isActive" checked={state.isActive} onChange={(e) => onChangeValue(e)} ></Checkbox>
                    <div className="sDash_form-action mt-20">
                        <Button className="btn-signin ml-10" type="primary" size="medium" onClick={(e) => onSubmit(e)}>
                            Add
                        </Button>
                        <Button className="btn-signin" type="light" size="medium">
                            Cancel
                        </Button>
                    </div>
                </Cards>
            </Main>
        </>
    )
}

export default AddSchemes