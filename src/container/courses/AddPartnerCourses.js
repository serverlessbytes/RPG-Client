import { Col, Form, Input, Radio, Row, Select, Space, TimePicker } from 'antd';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { useHistory, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import uuid from 'react-uuid';
import { addPartnerCourse, editPartnerCoursefilter, getOneCoursefilter } from '../../redux/course/actionCreator';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryData } from '../../redux/course/actionCreator';
import { useLocation } from 'react-router';
import { getStateData } from '../../redux/state/actionCreator';
import { getDistrictData } from '../../redux/district/actionCreator';

const AddPartnerCourses = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id')
    const langid = searchParams.get('langid')
    const { path } = useRouteMatch();
    let history = useHistory();
    let location = useLocation();
    let dispatch = useDispatch();
    const { Option } = Select;
    const { TextArea } = Input;

    const languageData = useSelector(state => state.language.getLanguageData);
    const editOneFilterData = useSelector(state => state.category.editFilterData);
    const stateData = useSelector((state) => state.state.getStateData);
    const diStrictdata = useSelector((state) => state.district.getDistrictData); // district  
    const catdata = useSelector(state => state.category.categoryData);

    const [error, setError] = useState({}); // for valadation
    const [state, setState] = useState({
        name: '',
        organiZation: '',
        detail: '',
        certificationBody: '',
        eligiBility: '',
        component: '',
        contactpersonname: '',
        contactpersonemail: '',
        contactpersonphone: '',
        pincode: '',
        locations: '',
        // sequence: '',
        duration: '',
        cateGory: '',
        state: '',
        district: '',
        mode: 'PARTNER',
        Certification: '',
        key: '',
        thumbnail: '',
        application_form: "",
        recommended_and_forwarded: "",
        application_process: "",
        medical_superintendent: "",
        hospital_expenses_estimation_certificate: ""
    });
    const [editPartnerCourseID, setEditPartnerCourseID] = useState()
    const [langIds, setLangIds] = useState({
        hindi: '',
        marathi: ''
    });

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

    useEffect(() => {
        dispatch(getCategoryData());
    }, []);

    useEffect(() => {
        dispatch(getStateData()) //dipatch state 
    }, []);

    useEffect(() => {
        if (state.state) {
            dispatch(getDistrictData(state.state)) //dipatch  getDistrictData
        }
    }, [state.state]);

    useEffect(() => {
        if (location.search) {
            dispatch(getOneCoursefilter(id));
            setEditPartnerCourseID(location.search.split('=')[1])
        }
    }, [location.search])

    useEffect(() => {
        if (editOneFilterData && editOneFilterData.data && editOneFilterData.data.data && id) {
            setState({
                ...state,
                key: editOneFilterData.data.data.key,
                name: editOneFilterData.data.data.name,
                organiZation: editOneFilterData.data.data.organization,
                detail: editOneFilterData.data.data.detail,
                certificationBody: editOneFilterData.data.data.certificationBody,
                eligiBility: editOneFilterData.data.data.eligibility,
                component: editOneFilterData.data.data.component,
                contactpersonname: editOneFilterData.data.data.contactPersonName,
                contactpersonemail: editOneFilterData.data.data.contactPersonEmail,
                contactpersonphone: editOneFilterData.data.data.contactPersonPhone,
                pincode: editOneFilterData.data.data.pincode,
                locations: editOneFilterData.data.data.location,
                // sequence: editOneFilterData.data.sequence,
                duration: moment(editOneFilterData.data.data.duration, 'HH:mm:ss'),
                cateGory: editOneFilterData.data.data.courseCategory.id,
                state: editOneFilterData.data.data.state,
                district: editOneFilterData.data.data.district,
                mode: editOneFilterData.data.data.mode,
                Certification: editOneFilterData.data.data.certificate,
                thumbnail: editOneFilterData.data.data.thumbnail,
                application_form: editOneFilterData.data.data.application_form,
                recommended_and_forwarded: editOneFilterData.data.data.recommended_and_forwarded,
                application_process: editOneFilterData.data.data.application_process,
                medical_superintendent: editOneFilterData.data.data.medical_superintendent,
                hospital_expenses_estimation_certificate: editOneFilterData.data.data.hospital_expenses_estimation_certificate,
            });
        }
    }, [editOneFilterData]);

    const validation = () => {
        let error = {};
        let flage = false;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        if (state.name === '') {
            error.name = 'Course Name is required';
            flage = true;
        }
        if (state.organiZation === '') {
            error.organiZation = 'Organization is required';
            flage = true;
        }
        if (state.detail === '') {
            error.detail = 'Detail is required';
            flage = true;
        }
        if (state.certificationBody === '') {
            error.certificationBody = 'Certification Body is required';
            flage = true;
        }
        if (state.eligiBility === '') {
            error.eligiBility = 'Eligibility is required';
            flage = true;
        }
        if (state.component === '') {
            error.component = 'Component is required';
            flage = true;
        }
        if (state.contactpersonname === '') {
            error.contactpersonname = 'Contact Person Name is required';
            flage = true;
        }
        if (state.contactpersonemail === '') {
            error.contactpersonemail = 'Email is required';
            flage = true;
        }
        if (state.contactpersonemail && !state.contactpersonemail.match(regex)) {
            error.contactpersonemail = 'Please enter a valid email address';
            flage = true;
        }
        if (state.contactpersonphone === '') {
            error.contactpersonphone = 'Phone is required';
            flage = true;
        }
        if (state.contactpersonphone && state.contactpersonphone.length < 10) {
            error.contactpersonphone = 'Please enter valid phone number';
            flage = true;
        }
        if (state.pincode === '') {
            error.pincode = 'pincode is required';
            flage = true;
        }
        if (state.locations === '') {
            error.locations = 'locations is required';
            flage = true;
        }
        // if (state.sequence === '') {
        //     error.sequence = '*sequence is required';
        //     flage = true;
        // }
        if (state.duration === '') {
            error.duration = 'Time is required';
            flage = true;
        }
        if (state.cateGory === '') {
            error.cateGory = 'CategoryId is required';
            flage = true;
        }
        if (state.state === '') {
            error.state = 'state is required';
            flage = true;
        }
        if (state.district === '') {
            error.district = 'District is required';
            flage = true;
        }
        if (state.mode === '') {
            error.mode = 'Mode is required';
            flage = true;
        }
        if (state.Certification === '') {
            error.Certification = 'Certification is required';
            flage = true;
        } if (state.thumbnail === '') {
            error.thumbnail = 'Thumbnail is required';
            flage = true;
        }
        if (state.application_form === '') {
            error.application_form = 'Application Form is required';
            flage = true;
        }
        if (state.recommended_and_forwarded === '') {
            error.recommended_and_forwarded = 'Recommended and Forwarded is required';
            flage = true;
        }
        if (state.application_process === '') {
            error.application_process = 'Application Process is required';
            flage = true;
        }
        if (state.medical_superintendent === '') {
            error.medical_superintendent = 'Medical Superintendent is required';
            flage = true;
        }
        if (state.hospital_expenses_estimation_certificate === '') {
            error.hospital_expenses_estimation_certificate = 'Hospital Expenses Estimate Certificate is required';
            flage = true;
        }

        setError(error);
        return flage;
    };

    const onsubmit = () => {
        if (validation()) {
            return;
        }
        let data = {
            key: uuid(),
            name: state.name,
            detail: state.detail,
            duration: moment(state.duration).format('hh:mm:ss'),
            categoryId: state.cateGory,
            certificationBody: state.certificationBody,
            certification: state.Certification,
            organization: state.organiZation,
            eligibility: state.eligiBility,
            component: state.component,
            contactPersonName: state.contactpersonname,
            contactPersonEmail: state.contactpersonemail,
            contactPersonPhone: state.contactpersonphone,
            state: state.state,
            district: state.district,
            pincode: state.pincode,
            location: state.locations,
            // sequence: parseInt(state.sequence),
            mode: state.mode,
            thumbnail: state.thumbnail,
            application_form: state.application_form,
            recommended_and_forwarded: state.recommended_and_forwarded,
            application_process: state.application_process,
            medical_superintendent: state.medical_superintendent,
            hospital_expenses_estimation_certificate: state.hospital_expenses_estimation_certificate,
        };
        if (!langid) {
            dispatch(addPartnerCourse(data, langIds.hindi, langIds.marathi));
            handalCancle()
        }
        else {
            let selectLanguageAddData = {
                key: editOneFilterData.data.data.key,
                name: state.name,
                organization: state.organiZation,
                detail: state.detail,
                certificationBody: state.certificationBody,
                eligibility: state.eligiBility,
                component: state.component,
                contactPersonName: state.contactpersonname,
                contactPersonEmail: state.contactpersonemail,
                contactPersonPhone: state.contactpersonphone,
                pincode: state.pincode,
                location: state.locations,
                duration: moment(state.duration).format('hh:mm:ss'),
                categoryId: editOneFilterData.data.data.courseCategory.id,
                state: state.state,
                district: state.district,
                mode: state.mode,
                certification: state.Certification,
                thumbnail: state.thumbnail,

            };
            dispatch(addPartnerCourse(selectLanguageAddData, langid));
            handalCancle()
        }
    };

    const onEdit = () => {
        let data = {
            courseId: id,
            key: state.key,
            name: state.name,
            organization: state.organiZation,
            detail: state.detail,
            certificationBody: state.certificationBody,
            eligibility: state.eligiBility,
            component: state.component,
            contactPersonName: state.contactpersonname,
            contactPersonEmail: state.contactpersonemail,
            contactPersonPhone: state.contactpersonphone,
            pincode: state.pincode,
            location: state.locations,
            // sequence: parseInt(state.sequence),
            duration: moment(state.duration).format('hh:mm:ss'),
            categoryId: state.cateGory,
            state: state.state,
            district: state.district,
            mode: state.mode,
            certification: state.Certification,
            thumbnail: state.thumbnail,
            isActive: true,
            isDeleted: false,
            application_form: state.application_form,
            recommended_and_forwarded: state.recommended_and_forwarded,
            application_process: state.application_process,
            medical_superintendent: state.medical_superintendent,
            hospital_expenses_estimation_certificate: state.hospital_expenses_estimation_certificate,
        }
        dispatch(editPartnerCoursefilter(data, langIds.hindi, langIds.marathi));
        handalCancle()
    }


    const handalCancle = () => {
        history.push(`/admin/courses/partnercourses`);
    }

    const onChangevalue = (e, name) => {

        const regexphone = /^[0-9\b]+$/;
        const regexpincode = /^[0-9]*$/;

        if (name === 'contactpersonphone') {
            if (e.target.value === '' || regexphone.test(e.target.value)) {
                setState({ ...state, [e.target.name]: e.target.value });
                setError({ ...error, contactpersonphone: "" });
            }
        } else if (name === 'pincode') {
            if (e.target.value === '' || regexpincode.test(e.target.value)) {
                setState({ ...state, [e.target.name]: e.target.value });
                setError({ ...error, pincode: "" });
            }
        }
        else {
            setState({ ...state, [e.target.name]: e.target.value });
            setError({ ...error, [e.target.name]: "" })
        }

    };

    const onSelect = (e, name) => {
        if (name === 'cateGory') {
            setState({ ...state, cateGory: e });
            setError({ ...error, cateGory: "" });

        } else if (name === 'duration') {
            setState({ ...state, duration: e });
            setError({ ...error, duration: "" });
        }
        else if (name == "state") {
            setState({ ...state, state: e })
            setError({ ...error, state: "" });
        }
        else if (name == "district") {
            setState({ ...state, district: e })
            setError({ ...error, district: "" });
        }
        else if (name === 'mode') {
            setState({ ...state, mode: e });
            setError({ ...error, mode: "" });
        }
        //  else if (name === 'sequence') {
        //     if (e.target.value > 0) {
        //         setState({ ...state, [e.target.name]: e.target.value });
        //     } 
        //     else {
        //         setState({ ...state, [e.target.name]: 0 });
        //     }
        // }
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

    return (
        <>
            <PageHeader ghost
                title={id ? "Edit Partner Courses" : "Add Partner Courses"} />
            <Main>
                <Cards headless>
                    <Row justify="space-between">
                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="name">Name</label>
                            <Form.Item name="name">
                                <Input placeholder="Name" value={state.name} name="name" onChange={e => onChangevalue(e)} />
                                {error.name && <span style={{ color: 'red' }}>{error.name}</span>}
                            </Form.Item>
                        </Col>

                        <Col lg={11} md={11} sm={24} xs={24} className="addpartnercourses">
                            <label htmlFor="category mb-4">Time</label>
                            <Form.Item name="duration"
                            // initialValue={moment('00:00:00', 'HH:mm:ss')}
                            >
                                <TimePicker name="duration" value={state.duration} onChange={e => onSelect(e, 'duration')} />
                                {error.duration && <span style={{ color: 'red' }}>{error.duration}</span>}
                            </Form.Item>
                        </Col>

                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="categoryId">CategoryId</label>
                            <Form.Item name="categoryId">
                                <Select
                                    value={state.cateGory}
                                    size="large"
                                    placeholder="Select categoryId"
                                    className="sDash_fullwidth-select"
                                    name="cateGory"
                                    onChange={e => onSelect(e, 'cateGory')}
                                >
                                    {catdata && catdata.data.map(items => <Option value={items.id}>{items.name} </Option>)}
                                </Select>
                                {error.cateGory && <span style={{ color: 'red' }}>{error.cateGory}</span>}
                            </Form.Item>
                        </Col>

                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="organization">Organization</label>
                            <Form.Item name="organization">
                                <Input
                                    placeholder="organization"
                                    name="organiZation"
                                    value={state.organiZation}
                                    onChange={e => onChangevalue(e)}
                                />
                                {error.organiZation && <span style={{ color: 'red' }}>{error.organiZation}</span>}
                            </Form.Item>
                        </Col>

                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="detail">Detail</label>
                            <Form.Item>
                                <TextArea name="detail" value={state.detail} onChange={e => onChangevalue(e)} />
                                {error.detail && <span style={{ color: 'red' }}>{error.detail}</span>}
                            </Form.Item>
                        </Col>

                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="certification">Certification Body</label>
                            <Form.Item>
                                <TextArea value={state.certificationBody} name="certificationBody" onChange={e => onChangevalue(e)} />
                                {error.certificationBody && <span style={{ color: 'red' }}>{error.certificationBody}</span>}
                            </Form.Item>
                        </Col>

                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="eligibility">Eligibility</label>
                            <Form.Item name="eligibility">
                                <Input
                                    value={state.eligiBility}
                                    placeholder="eligibility"
                                    name="eligiBility"
                                    onChange={e => onChangevalue(e)}
                                />
                                {error.eligiBility && <span style={{ color: 'red' }}>{error.eligiBility}</span>}
                            </Form.Item>
                        </Col>

                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="component">Component</label>
                            <Form.Item name="component">
                                <Input
                                    value={state.component}
                                    placeholder="component"
                                    name="component"
                                    onChange={e => onChangevalue(e)}
                                />
                                {error.component && <span style={{ color: 'red' }}>{error.component}</span>}
                            </Form.Item>
                        </Col>

                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="contactpersonname">Contact Person Name</label>
                            <Form.Item name="contactpersonname">
                                <Input
                                    value={state.contactpersonname}
                                    placeholder="contactperson name"
                                    name="contactpersonname"
                                    onChange={e => onChangevalue(e)}
                                />
                                {error.contactpersonname && <span style={{ color: 'red' }}>{error.contactpersonname}</span>}
                            </Form.Item>
                        </Col>

                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="contactpersonemail">Contact Person Email</label>
                            <Form.Item name="contactpersonemail" >
                                <Input
                                    type="email"
                                    value={state.contactpersonemail}
                                    placeholder="contactperson email"
                                    name="contactpersonemail"
                                    onChange={e => onChangevalue(e)}
                                />
                                {error.contactpersonemail && <span style={{ color: 'red' }}>{error.contactpersonemail}</span>}
                            </Form.Item>
                        </Col>

                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="contactpersonphone">Contact Person Phone</label>
                            <Form.Item name="contactpersonphone">
                                <Input
                                    value={state.contactpersonphone}
                                    placeholder="contactperson phone"
                                    name="contactpersonphone"
                                    onChange={e => onChangevalue(e, "contactpersonphone")}
                                    maxLength={10}
                                />
                                {error.contactpersonphone && <span style={{ color: 'red' }}>{error.contactpersonphone}</span>}
                            </Form.Item>
                        </Col>

                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="state">State</label>
                            <Form.Item name="state">
                                <Select
                                    size="large"
                                    className="sDash_fullwidth-select"
                                    name="state"
                                    value={state.state}
                                    placeholder="Select State"
                                    onChange={(e) => onSelect(e, "state")}
                                >
                                    {
                                        stateData && stateData.data.map((item) => (
                                            <Option value={item.id}> {item.name} </Option>
                                        ))
                                    }
                                </Select>
                                {/* <Input value={state.state} placeholder="State" name="state" onChange={e => onChangevalue(e)} /> */}
                                {error.state && <span style={{ color: 'red' }}>{error.state}</span>}
                            </Form.Item>
                        </Col>

                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="district">District</label>
                            <Form.Item name="district">
                                <Select
                                    size="large"
                                    className="sDash_fullwidth-select"
                                    name="district"
                                    value={state.district}
                                    placeholder="Select District"
                                    onChange={(e) => onSelect(e, "district")}
                                >
                                    {
                                        diStrictdata && diStrictdata.data.map((item) => (
                                            <Option value={item.id}> {item.name} </Option>
                                        ))
                                    }
                                </Select>
                                {/* <Input value={state.district} placeholder="District" name="district" onChange={e => onChangevalue(e)} /> */}
                                {error.district && <span style={{ color: 'red' }}>{error.district}</span>}
                            </Form.Item>
                        </Col>

                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="pincode">Pincode</label>
                            <Form.Item name="pincode">
                                <Input value={state.pincode} placeholder="pincode" name="pincode" maxLength={6} onChange={e => onChangevalue(e, "pincode")} />
                                {error.pincode && <span style={{ color: 'red' }}>{error.pincode}</span>}
                            </Form.Item>
                        </Col>

                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="location">Location</label>
                            <Form.Item name="location">
                                <Input
                                    value={state.locations}
                                    placeholder="location"
                                    name="locations"
                                    onChange={e => onChangevalue(e)}
                                />
                                {error.locations && <span style={{ color: 'red' }}>{error.locations}</span>}
                            </Form.Item>
                        </Col>

                        <Col lg={11} md={11} sm={24} xs={24}>
                            {/* <Row align="middle" justify="space-between"> */}
                            {/* <Col lg={8} md={9} xs={24}> */}
                            <label htmlFor="application_form">Application Form</label>
                            {/* </Col> */}
                            {/* <Col lg={16} md={15} xs={24}> */}
                            <Form.Item name="application_form">
                                <TextArea placeholder='Application Form' value={state.application_form} name="application_form" onChange={e => onChangevalue(e)} />
                                {error.application_form && <span style={{ color: 'red' }}>{error.application_form}</span>}
                            </Form.Item>
                            {/* </Col> */}
                            {/* </Row> */}
                        </Col>

                        <Col lg={11} md={11} sm={24} xs={24}>
                            {/* <Row align="middle" justify="space-between"> */}
                            {/* <Col lg={8} md={9} xs={24}> */}
                            <label htmlFor="recommended_and_forwarded">Recommended and Forwarded</label>
                            {/* </Col> */}
                            {/* <Col lg={16} md={15} xs={24}> */}
                            <Form.Item name="recommended_and_forwarded">
                                <TextArea placeholder='Recommended and Forwarded' value={state.recommended_and_forwarded} name="recommended_and_forwarded" onChange={e => onChangevalue(e)} />
                                {error.recommended_and_forwarded && <span style={{ color: 'red' }}>{error.recommended_and_forwarded}</span>}
                            </Form.Item>
                            {/* </Col> */}
                            {/* </Row> */}
                        </Col>

                        <Col lg={11} md={11} sm={24} xs={24}>
                            {/* <Row align="middle" justify="space-between"> */}
                            {/* <Col lg={8} md={9} xs={24}> */}
                            <label htmlFor="application_process">Application Process</label>
                            {/* </Col> */}
                            {/* <Col lg={16} md={15} xs={24}> */}
                            <Form.Item name="application_process">
                                <TextArea placeholder='Application Process' value={state.application_process} name="application_process" onChange={e => onChangevalue(e)} />
                                {error.application_process && <span style={{ color: 'red' }}>{error.application_process}</span>}
                            </Form.Item>
                            {/* </Col> */}
                            {/* </Row> */}
                        </Col>

                        <Col lg={11} md={11} sm={24} xs={24}>
                            {/* <Row align="middle" justify="space-between"> */}
                            {/* <Col lg={8} md={9} xs={24}> */}
                            <label htmlFor="medical_superintendent">Medical Superintendent</label>
                            {/* </Col> */}
                            {/* <Col lg={16} md={15} xs={24}> */}
                            <Form.Item name="medical_superintendent">
                                <TextArea placeholder='Medical Superintendent' value={state.medical_superintendent} name="medical_superintendent" onChange={e => onChangevalue(e)} />
                                {error.medical_superintendent && <span style={{ color: 'red' }}>{error.medical_superintendent}</span>}
                            </Form.Item>
                            {/* </Col> */}
                            {/* </Row> */}
                        </Col>

                        <Col lg={11} md={11} sm={24} xs={24}>
                            {/* <Row align="middle" justify="space-between"> */}
                            {/* <Col lg={8} md={9} xs={24}> */}
                            <label htmlFor="hospital_expenses_estimation_certificate">Hospital Expenses Estimate Certificate</label>
                            {/* </Col> */}
                            {/* <Col lg={16} md={15} xs={24}> */}
                            <Form.Item name="hospital_expenses_estimation_certificate">
                                <TextArea placeholder='Hospital Expenses Estimate Certificate' value={state.hospital_expenses_estimation_certificate} name="hospital_expenses_estimation_certificate" onChange={e => onChangevalue(e)} />
                                {error.hospital_expenses_estimation_certificate && <span style={{ color: 'red' }}>{error.hospital_expenses_estimation_certificate}</span>}
                            </Form.Item>
                            {/* </Col> */}
                            {/* </Row> */}
                        </Col>

                        {/* <Col lg={11}>
                            <label htmlFor="mode">Mode</label>
                            <Form.Item name="mode">
                                <Select
                                    value={state.mode}
                                    size="large"
                                    placeholder="Select Mode"
                                    className="sDash_fullwidth-select"
                                    name="mode"
                                    onChange={e => onSelect(e, 'mode')}
                                >
                                    <Option value="ONLINE">ONLINE</Option>
                                    <Option value="OFFLINE">OFFLINE</Option>
                                </Select>
                                {error.mode && <span style={{ color: 'red' }}>{error.mode}</span>}
                            </Form.Item>
                        </Col> */}
                        {/* <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="location">Sequence </label>
                            <Form.Item name="location">
                                <Input
                                    value={state.sequence}
                                    placeholder="location"
                                    type="number"
                                    name="sequence"
                                    onChange={e => onSelect(e, 'sequence')}
                                />
                                {error.sequence && <span style={{ color: 'red' }}>{error.sequence}</span>}
                            </Form.Item>
                        </Col> */}

                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="location">Thumbnail</label>
                            <Form.Item >
                                <Input
                                    type="file"
                                    // value={state.thumbnail}
                                    placeholder="Enter thumbnail"
                                    // type="text"
                                    name="thumbnail"
                                    onChange={e => fileUpload(e, 'thumbnail')}
                                />
                                {error.thumbnail && <span style={{ color: 'red' }}>{error.thumbnail}</span>}
                            </Form.Item>
                        </Col>

                        <Col lg={11} md={11} sm={24} xs={24} className="d-flex f-d-cloumn">
                            <label htmlFor="name" className="mb-5">
                                Certification
                            </label>
                            <Radio.Group name="Certification" value={state.Certification} onChange={e => onChangevalue(e)}>
                                <Space direction="vertical">
                                    <Row>
                                        <Radio checked={state.Certification === true} value={true}>
                                            Yes
                                        </Radio>
                                        <Radio checked={state.Certification === false} value={false}>
                                            No
                                        </Radio>
                                    </Row>
                                </Space>
                            </Radio.Group>
                            {error.Certification && <span style={{ color: 'red' }}>{error.Certification}</span>}
                        </Col>
                    </Row>

                    <div className="sDash_form-action mt-20">
                        {editPartnerCourseID && !langid ? <Button className="btn-signin ml-10" type="primary" onClick={e => onEdit(e)} size="medium">
                            Edit
                        </Button> : <Button className="btn-signin ml-10" type="primary" onClick={e => onsubmit(e)} size="medium">
                            Add
                        </Button>}
                        <Button
                            className="btn-signin"
                            type="light"
                            size="medium"
                            onClick={() => handalCancle()}
                        >
                            Cancel
                        </Button>
                    </div>
                </Cards>
            </Main>
        </>
    );
};

export default AddPartnerCourses;
