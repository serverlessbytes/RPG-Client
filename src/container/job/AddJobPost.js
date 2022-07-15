import { Button, Col, Input, Row, Form, Select, Radio, Space, DatePicker } from 'antd';
import React, { useEffect, useState } from 'react';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { HorizontalFormStyleWrap } from '../forms/overview/Style';
import { PageHeader } from '../../components/page-headers/page-headers';
import moment from 'moment';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addJobPost, addLanguageJobPost, editJobPost, getEmployerData, getJobcategory, getJobroles, getoneJobPost } from '../../redux/jobs/actionCreator';
import uuid from 'react-uuid';
import actions from "../../redux/jobs/actions";
import { getStateData } from '../../redux/state/actionCreator';
import { getDistrictData } from '../../redux/district/actionCreator';
import RichTextEditor from 'react-rte';

const AddJobPost = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');
    const langId = searchParams.get('langid');
    let history = useHistory();
    let dispatch = useDispatch();
    const { Option } = Select;
    const { TextArea } = Input;
    const {
        getoneJobPostSuccess,
    } = actions;

    const [error, setError] = useState({});
    const [editJobsID, seteditJobsID] = useState();
    const [langIds, setLangIds] = useState();
    const [state, setState] = useState({
        salary: "",
        benifits: RichTextEditor.createEmptyValue(),
        name: "",
        state: "",
        district: "",
        town: "",
        pincode: "",
        description: "",
        vacancies: "",
        reqExperience: "",
        requirements: "",
        jobType: "",
        isActive: true,
        shifts: "",
        email: "",
        phone: "",
        type: "",
        extraType: "",
        startDate: "",
        endDate: "",
        jobRole: "",
        key: "",
        application_form: "",
        recommended_and_forwarded: "",
        application_process: "",
        medical_superintendent: "",
        hospital_expenses_estimation_certificate: ""
    });

    const languageData = useSelector(state => state.language.getLanguageData);
    const getOneJobPostData = useSelector((state) => state.job.getOneJobPostData)
    const jobData = useSelector((state) => state.job.jobCatogeryData)
    const jobRolData = useSelector((state) => state.job.jobRoleData)
    const stateData = useSelector((state) => state.state.getStateData)
    const diStrictdata = useSelector((state) => state.district.getDistrictData)
    const getEmployerdata = useSelector((state) => state.job.getEmployerData)
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
        if (id) {
            seteditJobsID(id)
            dispatch(getoneJobPost(id))
        }
    }, [id])

    useEffect(() => {
        dispatch(getJobcategory())
        dispatch(getJobroles())
        dispatch(getStateData())
        dispatch(getEmployerData())
    }, [])

    useEffect(() => {
        if (getOneJobPostData && getOneJobPostData?.data && getOneJobPostData?.data?.data) {
            setState({
                ...state,
                key: getOneJobPostData.data.data.key,
                salary: getOneJobPostData.data.data.salary,
                benifits: RichTextEditor.createValueFromString(getOneJobPostData?.data?.data.benifits, 'markdown'),
                name: getOneJobPostData?.data?.data.name?.id,
                state: getOneJobPostData?.data?.data.state?.id,
                district: getOneJobPostData?.data?.data.district?.id,
                town: getOneJobPostData.data.data.town,
                pincode: getOneJobPostData.data.data.pincode,
                description: getOneJobPostData.data.data.description,
                vacancies: getOneJobPostData.data.data.vacancies,
                reqExperience: getOneJobPostData.data.data.reqExperience,
                requirements: getOneJobPostData.data.data.requirements,
                jobType: getOneJobPostData.data.data.jobType?.id,
                isActive: true,
                shifts: getOneJobPostData.data.data.shifts,
                email: getOneJobPostData.data.data.email,
                phone: getOneJobPostData.data.data.phone,
                type: getOneJobPostData.data.data.type,
                extraType: getOneJobPostData.data.data.extraType,
                startDate: moment(getOneJobPostData.data.data.startDate),
                endDate: moment(getOneJobPostData.data.data.endDate),
                jobRole: getOneJobPostData.data.data.jobRole?.id,
                application_form: getOneJobPostData.data.data.application_form,
                application_process: getOneJobPostData.data.data.application_process,
                medical_superintendent: getOneJobPostData.data.data.medical_superintendent,
                recommended_and_forwarded: getOneJobPostData.data.data.recommended_and_forwarded,
                hospital_expenses_estimation_certificate: getOneJobPostData.data.data.hospital_expenses_estimation_certificate,
            })
        }
    }, [getOneJobPostData])

    const validation = () => {
        let error = {};
        let flage = false;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        if (state.salary === '') {
            error.salary = 'Salary is required';
            flage = true;
        }
        if (state.benifits.toString('markdown').length <= 2) {
            error.benifits = 'Benifits is required';
            flage = true;
        }
        if (state.jobType === '') {
            error.jobType = 'Job category is required';
            flage = true;
        }
        if (state.jobRole === '') {
            error.jobRole = 'Job role is required';
            flage = true;
        }
        if (state.name === '') {
            error.name = 'Name is required';
            flage = true;
        }
        if (state.vacancies === '') {
            error.vacancies = 'Vacancies is required';
            flage = true;
        }
        if (state.state === '') {
            error.state = 'State is required';
            flage = true;
        }
        if (state.district === '') {
            error.district = 'District is required';
            flage = true;
        }
        if (state.town === '') {
            error.town = 'Town is required';
            flage = true;
        }
        if (state.pincode === '') {
            error.pincode = 'Pincode is required';
            flage = true;
        }
        if (state.pincode && state.pincode.length < 6) {
            error.pincode = 'Please enter valid pincode';
            flage = true;
        }
        if (state.description === '') {
            error.description = 'Description is required';
            flage = true;
        }
        if (state.reqExperience === '') {
            error.reqExperience = 'Experience is required';
            flage = true;
        }
        if (state.requirements === '') {
            error.requirements = 'Requirements is required';
            flage = true;
        }
        if (state.shifts.length <= 0) {
            error.shifts = 'Shifts is required';
            flage = true;
        }
        if (state.email === '') {
            error.email = 'Email is required';
            flage = true;
        }
        if (state.email && !state.email.match(regex)) {
            error.email = 'Please enter a valid email address';
            flage = true;
        }
        if (state.phone === '') {
            error.phone = 'Phone number is required';
            flage = true;
        }
        if (state.phone && state.phone.length < 10) {
            error.phone = 'Please enter valid phone number';
            flage = true
        }
        if (state.type === '') {
            error.type = 'Type is required';
            flage = true;
        }
        if (state.startDate === '') {
            error.startDate = 'Start date is required';
            flage = true;
        }
        if (state.endDate === '') {
            error.endDate = 'End date is required';
            flage = true;
        }
        if (state.extraType === '') {
            error.extraType = 'Type of field is required';
            flage = true;
        }
        if (state.application_form === '') {
            error.application_form = 'Application form is required';
            flage = true;
        }
        if (state.recommended_and_forwarded === '') {
            error.recommended_and_forwarded = 'Recommended and forwarded is required';
            flage = true;
        }
        if (state.application_process === '') {
            error.application_process = 'Application process is required';
            flage = true;
        }
        if (state.medical_superintendent === '') {
            error.medical_superintendent = 'Medical superintendent is required';
            flage = true;
        }
        if (state.hospital_expenses_estimation_certificate === '') {
            error.hospital_expenses_estimation_certificate = 'Hospital expenses estimate certificate is required';
            flage = true;
        }

        setError(error);
        return flage;
    };

    const onChangeValue = (e, name) => {

        const regexphone = /^[0-9\b]+$/;
        const regexpincode = /^[0-9]*$/;

        if (name === "phone") {
            if (e.target.value === '' || regexphone.test(e.target.value)) {
                setState({ ...state, [e.target.name]: e.target.value });
                setError({ ...error, phone: "" });
            }
        } else if (e.target.name === "pincode") {
            if (e.target.value === '' || regexpincode.test(e.target.value)) {
                setState({ ...state, [e.target.name]: e.target.value });
                setError({ ...error, pincode: "" });
            }
        } else if (e.target.name === "salary") {
            if (e.target.value === '' || regexphone.test(e.target.value)) {
                setState({ ...state, [e.target.name]: e.target.value });
                setError({ ...error, salary: "" });
            }
        }
        else {
            setState({ ...state, [e.target.name]: e.target.value });
            setError({ ...error, [e.target.name]: "" });
        }
    }

    const onChnageHandle = (e, name) => {
        if (name === "jobType") {
            setState({ ...state, jobType: e })
            setError({ ...error, jobType: "" });

        }
        else if (name === "jobRole") {
            setState({ ...state, jobRole: e })
            setError({ ...error, jobRole: "" });
        }
        else if (name === "shifts") {
            setState({ ...state, shifts: e })
            setError({ ...error, shifts: "" });
        }
        else if (name === "startDate") {
            setState({ ...state, startDate: e })
            setError({ ...error, startDate: "" });
        }
        else if (name === "endDate") {
            setState({ ...state, endDate: e })
            setError({ ...error, endDate: "" });
        }
        else if (name === "state") {
            setState({ ...state, state: e })
            setError({ ...error, state: "" });
        }
        else if (name === "district") {
            setState({ ...state, district: e })
            setError({ ...error, district: "" });
        }
        else if (name === "name") {
            setState({ ...state, name: e })
            setError({ ...error, name: "" });
        }
        else if (e.target.name === "vacancies") {
            if (e.target.value > 0) {
                setState({ ...state, [e.target.name]: e.target.value })
            } else {
                setState({ ...state, [e.target.name]: 0 })
            }
            setError({ ...error, vacancies: "" });
        }
    }

    const onChangesEditorBenifit = (value) => {
        setState({ ...state, benifits: value });
        setError({ ...error, benifits: "" });

    };

    useEffect(() => {
        if (state.state) {
            dispatch(getDistrictData(state.state))
        }
    }, [state.state]);

    const onSubmit = (e) => {
        if (validation()) {
            return;
        }
        let data = {
            name: state.name,
            state: state.state,
            district: state.district,
            town: state.town,
            pincode: state.pincode,
            description: state.description,
            vacancies: parseInt(state.vacancies),
            reqExperience: state.reqExperience,
            salary: state.salary,
            benifits: state.benifits.toString('markdown'),
            requirements: state.requirements,
            type: state.type,
            extraType: state.extraType,
            isActive: true,
            shifts: state.shifts,
            email: state.email,
            phone: state.phone,
            startDate: moment.utc(state.startDate).format(),
            endDate: moment.utc(state.endDate).format(),
            jobRole: state.jobRole,
            jobType: state.jobType,
            application_form: state.application_form,
            recommended_and_forwarded: state.recommended_and_forwarded,
            application_process: state.application_process,
            medical_superintendent: state.medical_superintendent,
            hospital_expenses_estimation_certificate: state.hospital_expenses_estimation_certificate,
        };
        if (langId) {
            data = {
                ...data,
                key: getOneJobPostData.data.data.key,
                jobRole: getOneJobPostData.data.data.jobRole.id,
                jobType: getOneJobPostData.data.data.jobType.id,
                name: getOneJobPostData.data.data.name.id,
                state: getOneJobPostData.data.data.state.id,
                district: getOneJobPostData.data.data.district.id,

            }
            dispatch(addLanguageJobPost(langId, data, langIds.hindi, langIds.marathi))
        }
        else {
            data = { ...data, key: uuid() }
            dispatch(addJobPost(data))
        }
        onCancel();
    };

    const onEdit = () => {
        let data = {
            name: state.name,
            state: state.state,
            district: state.district,
            town: state.town,
            pincode: state.pincode,
            description: state.description,
            vacancies: parseInt(state.vacancies),
            reqExperience: state.reqExperience,
            salary: state.salary,
            benifits: state.benifits.toString('markdown'),
            requirements: state.requirements,
            type: state.type,
            extraType: state.extraType,
            isActive: true,
            shifts: state.shifts,
            email: state.email,
            phone: state.phone,
            startDate: moment.utc(state.startDate).format(),
            endDate: moment.utc(state.endDate).format(),
            jobRole: state.jobRole,
            jobType: state.jobType,
            application_form: state.application_form,
            recommended_and_forwarded: state.recommended_and_forwarded,
            application_process: state.application_process,
            medical_superintendent: state.medical_superintendent,
            hospital_expenses_estimation_certificate: state.hospital_expenses_estimation_certificate,
        }
        dispatch(editJobPost(editJobsID, data, langIds.hindi, langIds.marathi));
        onCancel()
    }

    const onCancel = () => {
        history.push(`/admin/job/post`);
    }
    useEffect(() => {
        return (() => {
            dispatch(getoneJobPostSuccess([]))
        })
    }, [])

    return (
        <>
            <PageHeader
                title={editJobsID ? "Edit job post" : "Add job post"}
            />
            <Main >
                <HorizontalFormStyleWrap>
                    <Cards headless>
                        <Form name="horizontal-form" layout="horizontal">
                            <Row justify="space-between">
                                <Col lg={11} md={11} sm={24} xs={24}>
                                    <Row align="middle">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="jobType">Type of job post</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form name="sDash_select" layout="vertical">
                                                <Form.Item>
                                                    <Select
                                                        size="large"
                                                        className={state.jobType ? 'sDash_fullwidth-select' : 'select-option-typ-placeholder'}
                                                        name="jobType"
                                                        value={state.jobType}
                                                        placeholder="Select JobType"
                                                        onChange={e => onChnageHandle(e, "jobType")}
                                                    >
                                                        <Option value="">Select jobtype</Option>
                                                        {jobData && jobData.data.map((item, i) => <Option key={i} value={item.id}> {item.name} </Option>)}
                                                    </Select>
                                                    {error.jobType && <span style={{ color: 'red' }}>{error.jobType}</span>}
                                                </Form.Item>
                                            </Form>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={11} md={11} sm={24} xs={24}>
                                    <Row align="middle" justify="space-between">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="salary">Monthly salary offered</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="salary">
                                                <Input placeholder="Salary " value={state.salary} name="salary" onChange={e => onChangeValue(e)} />
                                                {error.salary && <span style={{ color: 'red' }}>{error.salary}</span>}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col lg={11} md={11} sm={24} xs={24}>
                                    <Row align="middle">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="name">Job role</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form name="sDash_select" layout="vertical">
                                                <Form.Item>
                                                    <Select
                                                        size="large"
                                                        className={state.jobRole ? 'sDash_fullwidth-select' : 'select-option-typ-placeholder'}
                                                        name="jobRole"
                                                        value={state.jobRole}
                                                        placeholder="Select JobRole"
                                                        onChange={e => onChnageHandle(e, "jobRole")}
                                                    >
                                                        <Option value="">Select jobrole</Option>
                                                        {jobRolData && jobRolData.map((item, i) => <Option key={i} value={item.id}> {item.name} </Option>)}
                                                    </Select>
                                                    {error.jobRole && <span style={{ color: 'red' }}>{error.jobRole}</span>}
                                                </Form.Item>
                                            </Form>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={24} md={24} sm={24} xs={24}>
                                    <div style={{ marginBottom: "20px" }}>
                                        <label htmlFor="Documentation">Benefits</label>
                                        <div className="group" style={{ marginBottom: "0px" }}>
                                            <RichTextEditor placeholder="Benefits" name="benifits" value={state.benifits} onChange={onChangesEditorBenifit} />
                                        </div>
                                        {error.benifits && <span style={{ color: "red" }}>{error.benifits}</span>}
                                    </div>
                                </Col>
                                <Col lg={11} md={11} sm={24} xs={24}>
                                    <Row align="middle">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="name">Name of the employer</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form name="sDash_select" layout="vertical">
                                                <Form.Item>
                                                    <Select
                                                        size="large"
                                                        className={state.name ? 'sDash_fullwidth-select' : 'select-option-typ-placeholder'}
                                                        name="name"
                                                        value={state.name}
                                                        placeholder="Select name"
                                                        onChange={e => onChnageHandle(e, "name")}
                                                    >
                                                        <Option value="">Select name</Option>
                                                        {getEmployerdata && getEmployerdata.data && getEmployerdata.data?.data.map((item, i) => <Option key={i} value={item.id}> {item.name} </Option>)}
                                                    </Select>
                                                    {error.name && <span style={{ color: 'red' }}>{error.name}</span>}
                                                </Form.Item>
                                            </Form>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={11} md={11} sm={24} xs={24}>
                                    <Row align="middle" justify="space-between">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="vacancies">Vacancies</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="vacancies" initialValue="">
                                                <Input type="number" className='experience-input' placeholder="Vacancies" value={state.vacancies} name='vacancies' onChange={(e) => onChnageHandle(e)} />
                                                {error.vacancies && <span style={{ color: 'red' }}>{error.vacancies}</span>}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col lg={11} md={11} sm={24} xs={24}>
                                    <Row align="middle">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="state">State</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form name="sDash_select" layout="vertical">
                                                <Form.Item>
                                                    <Select
                                                        size="large"
                                                        className={state.state ? 'sDash_fullwidth-select' : 'select-option-typ-placeholder'}
                                                        name="state"
                                                        value={state.state}
                                                        placeholder="Select State"
                                                        onChange={e => onChnageHandle(e, "state")}
                                                    >
                                                        <Option value="">Select state</Option>
                                                        {stateData && stateData.data.map((item, i) => <Option key={i} value={item.id}> {item.name} </Option>)}
                                                    </Select>
                                                    {error.state && <span style={{ color: 'red' }}>{error.state}</span>}
                                                </Form.Item>
                                            </Form>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col lg={11} md={11} sm={24} xs={24}>
                                    <Row align="middle">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="district">District</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form name="sDash_select" layout="vertical">
                                                <Form.Item>
                                                    <Select
                                                        size="large"
                                                        className={state.district ? 'sDash_fullwidth-select' : 'select-option-typ-placeholder'}
                                                        name="district"
                                                        value={state.district}
                                                        placeholder="Select district"
                                                        onChange={e => onChnageHandle(e, "district")}
                                                    >
                                                        <Option value="">Select district</Option>
                                                        {diStrictdata && diStrictdata.data.map((item,i) => <Option key={i} value={item.id}> {item.name} </Option>)}
                                                    </Select>
                                                    {error.district && <span style={{ color: 'red' }}>{error.district}</span>}
                                                </Form.Item>
                                            </Form>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={11} md={11} sm={24} xs={24}>
                                    <Row align="middle" justify="space-between">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="phone">Phone</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="phone">
                                                <Input placeholder="Phone" value={state.phone} name="phone" maxLength={10} onChange={e => onChangeValue(e, "phone")} />
                                                {error.phone && <span style={{ color: 'red' }}>{error.phone}</span>}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col lg={11} md={11} sm={24} xs={24}>
                                    <Row align="middle">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="name">Town / village</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="TownVillage" initialValue="">
                                                <Input placeholder="Enter town/village" value={state.town} name="town" onChange={(e) => onChangeValue(e)} />
                                                {error.town && <span style={{ color: 'red' }}>{error.town}</span>}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={11} md={11} sm={24} xs={24}>
                                    <Row align="middle" justify="space-between">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="email">Email</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="email">
                                                <Input placeholder="Email" value={state.email} name="email" onChange={e => onChangeValue(e)} />
                                                {error.email && <span style={{ color: 'red' }}>{error.email}</span>}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col lg={11} md={11} sm={24} xs={24}>
                                    <Row align="middle">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="pincode">Pincode</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="pincode">
                                                <Input placeholder="Pincode" value={state.pincode} name="pincode" maxLength={6} onChange={e => onChangeValue(e)} />
                                                {error.pincode && <span style={{ color: 'red' }}>{error.pincode}</span>}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col lg={11} md={11} sm={24} xs={24}>
                                    <Row align="middle">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="shifts">Shift</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form name="sDash_select" layout="vertical">
                                                <Form.Item>
                                                    <Select
                                                        size="large"
                                                        className={state.shifts ? 'sDash_fullwidth-select' : 'select-option-typ-placeholder'}
                                                        name="shifts"
                                                        value={state.shifts}
                                                        placeholder="Select shift"
                                                        onChange={e => onChnageHandle(e, "shifts")}
                                                    >
                                                        <Option value="">Select shift</Option>
                                                        <Option value="DAY"> Day </Option>
                                                        <Option value="NIGHT"> Night </Option>

                                                    </Select>
                                                    {error.shifts && <span style={{ color: 'red' }}>{error.shifts}</span>}
                                                </Form.Item>
                                            </Form>

                                        </Col>
                                    </Row>
                                </Col>

                                <Col lg={11} md={11} sm={24} xs={24}>
                                    <Row align="middle" justify="space-between">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="req_experience">Requried experience</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="reqExperience">
                                                <Input placeholder="Requried experience" value={state.reqExperience} name="reqExperience" onChange={e => onChangeValue(e)} />
                                                {error.reqExperience && <span style={{ color: 'red' }}>{error.reqExperience}</span>}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col lg={11} md={11} sm={24} xs={24} className="addpartnercourses">
                                    <Row align="middle">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="startdata">Start date</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="startdata">
                                                <Space direction="vertical">
                                                    <DatePicker name="startDate" value={state.startDate} onChange={(e) => onChnageHandle(e, "startDate")} />
                                                    {error.startDate && <span style={{ color: 'red' }}>{error.startDate}</span>}
                                                </Space>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={11} md={11} sm={24} xs={24} className="addpartnercourses">
                                    <Row align="middle">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="enddate">End date</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="endDate">
                                                <Space direction="vertical">
                                                    <DatePicker name="endDate" value={state.endDate} onChange={(e) => onChnageHandle(e, "endDate")} />
                                                    {error.endDate && <span style={{ color: 'red' }}>{error.endDate}</span>}
                                                </Space>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col lg={11} md={11} sm={24} xs={24}>
                                    <Row align="middle" justify="space-between">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="description">Description</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="description">
                                                <TextArea placeholder='Description' value={state.description} name="description" onChange={e => onChangeValue(e)} />
                                                {error.description && <span style={{ color: 'red' }}>{error.description}</span>}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={11} md={11} sm={24} xs={24}>
                                    <Row align="middle" justify="space-between">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="requirements">Requirements</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="requirements">
                                                <TextArea placeholder='Requirements' value={state.requirements} name="requirements" onChange={e => onChangeValue(e)} />
                                                {error.requirements && <span style={{ color: 'red' }}>{error.requirements}</span>}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>


                                <Col lg={11} md={11} sm={24} xs={24} className='' style={{ marginBottom: "24px" }}>
                                    <Row align="middle" justify="space-between">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="name" className='mb-0'>Type of Job</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>

                                            <Radio.Group name="type" value={state.type} onChange={(e) => onChangeValue(e)}>
                                                <Space direction="vertical">
                                                    <Row>
                                                        <Radio checked={state.type === "PARTTIME"} value="PARTTIME" style={{ marginBottom: "0px" }}>Part-time</Radio>
                                                        <Radio checked={state.type === "FULLTIME"} value="FULLTIME" style={{ marginBottom: "0px" }}>Full-time</Radio>
                                                    </Row>
                                                </Space>
                                            </Radio.Group>
                                            {error.type && <span style={{ color: 'red' }}>{error.type}</span>}

                                        </Col>
                                    </Row>
                                </Col>

                                <Col lg={11} md={11} sm={24} xs={24}>
                                    <Row align="middle" justify="space-between">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="isactive" className='mb-0'>Type of field</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Radio.Group name="extraType" value={state.extraType} onChange={(e) => onChangeValue(e)}  >
                                                <Space direction="vertical">
                                                    <Row>
                                                        <Radio checked={state.extraType === "CONTRACTUAL"} value={"CONTRACTUAL"} style={{ marginBottom: "0px" }}>
                                                            Contractual
                                                        </Radio>
                                                        <Radio checked={state.extraType === "ONROLL"} value={"ONROLL"} style={{ marginBottom: "0px" }}>
                                                            OnRoll
                                                        </Radio>
                                                    </Row>
                                                </Space>

                                            </Radio.Group>
                                            {error.extraType && <span style={{ color: 'red' }}>{error.extraType}</span>}
                                        </Col>
                                    </Row>
                                </Col>

                                <Col lg={11} md={11} sm={24} xs={24}>
                                    <Row align="middle" justify="space-between">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="application_form">Application form</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="application_form">
                                                <TextArea placeholder='Application form' value={state.application_form} name="application_form" onChange={e => onChangeValue(e)} />
                                                {error.application_form && <span style={{ color: 'red' }}>{error.application_form}</span>}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={11} md={11} sm={24} xs={24}>
                                    <Row align="middle" justify="space-between">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="recommended_and_forwarded">Recommended and forwarded</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="recommended_and_forwarded">
                                                <TextArea placeholder='Recommended and forwarded' value={state.recommended_and_forwarded} name="recommended_and_forwarded" onChange={e => onChangeValue(e)} />
                                                {error.recommended_and_forwarded && <span style={{ color: 'red' }}>{error.recommended_and_forwarded}</span>}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col lg={11} md={11} sm={24} xs={24}>
                                    <Row align="middle" justify="space-between">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="application_process">Application process</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="application_process">
                                                <TextArea placeholder='Application process' value={state.application_process} name="application_process" onChange={e => onChangeValue(e)} />
                                                {error.application_process && <span style={{ color: 'red' }}>{error.application_process}</span>}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={11} md={11} sm={24} xs={24}>
                                    <Row align="middle" justify="space-between">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="medical_superintendent">Medical superintendent</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="medical_superintendent">
                                                <TextArea placeholder='Medical superintendent' value={state.medical_superintendent} name="medical_superintendent" onChange={e => onChangeValue(e)} />
                                                {error.medical_superintendent && <span style={{ color: 'red' }}>{error.medical_superintendent}</span>}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col lg={11} md={11} sm={24} xs={24}>
                                    <Row align="middle" justify="space-between">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="hospital_expenses_estimation_certificate">Hospital expenses estimate certificate</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="hospital_expenses_estimation_certificate">
                                                <TextArea placeholder='Hospital expenses estimate certificate' value={state.hospital_expenses_estimation_certificate} name="hospital_expenses_estimation_certificate" onChange={e => onChangeValue(e)} />
                                                {error.hospital_expenses_estimation_certificate && <span style={{ color: 'red' }}>{error.hospital_expenses_estimation_certificate}</span>}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>

                            </Row>

                        </Form>
                        <div className="sDash_form-action mt-20">

                            {editJobsID && !langId ? <Button className="btn-signin ml-10" type="primary" onClick={e => onEdit(e)} size="medium">
                                Edit </Button> :
                                <Button className="btn-signin ml-10" type="primary" onClick={e => onSubmit(e)} size="medium">
                                    Add
                                </Button>
                            }
                            <Button
                                className="btn-signin"
                                type="light"
                                size="medium"
                                onClick={() => onCancel()}
                            >
                                Cancel
                            </Button>
                        </div>
                    </Cards>
                </HorizontalFormStyleWrap>
            </Main>
        </>
    )
}

export default AddJobPost
