import { Button, Col, Input, Row, Form, Select, Radio, Space, DatePicker } from 'antd';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import FeatherIcon from 'feather-icons-react';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { HorizontalFormStyleWrap } from '../forms/overview/Style';
import { PageHeader } from '../../components/page-headers/page-headers';
import moment from 'moment';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getJobcategory, getJobroles } from '../../redux/jobs/actionCreator';


const AddJobPost = () => {
    let history = useHistory();
    let dispatch = useDispatch();
    const { Option } = Select;
    const { TextArea } = Input;
    // function onchange(date, dateString) { //for date    
    //     console.log(date, dateString);
    // }
    // const [typeOfJob, setTypeOfJob] = useState("")

    // const onChange = e => {
    //     console.log('radio checked', e.target.value);
    //     setTypeOfJob(e.target.value)
    // };

    let jobData = useSelector((state) => state.job.jobCatogeryData) //job category
    let jobRolData = useSelector((state) => state.job.jobRoleData)  //job rol
    useEffect(() => {
        dispatch(getJobcategory()) //dispatch job category
    }, [])

    useEffect(() => {
        dispatch(getJobroles()) //dispatch job rol
    }, [])

    const [error, setError] = useState({}); // for valadation

    useEffect(() => {
        console.log("jobRolData", jobRolData)
    }, [jobRolData])
    const [state, setState] = useState({
        salary: "",
        benifits: "",
        name: "",
        state: "",
        district: "",
        town: "",
        pincode: "",
        description: "",
        vacancies: "",
        req_experience: "",
        requirements: "",
        jobCategoryId: "",
        isActive: "",
        shifts: "",
        email: "",
        phone: "",
        type: "",
        jobCategoryId: "",
        startDate : "",
        endDate : "",
    });

    const validation = () => {
        // console.log("(state.benifitLine).toString", (state.benifitLine).toString("markdown"))
        let error = {};
        let flage = false;
        if (state.salary === '') {
            error.salary = 'Salary is required';
            flage = true;
        }
        if (state.benifits === '') {
            error.benifits = 'Benifits is required';
            flage = true;
        }
        if (state.jobCategoryId === '') {
            error.jobCategoryId = '*JobCategoryId is required';
            flage = true;
        }
        if (state.jobRoleId === '') {
            error.jobRoleId = 'JobRoleId is required';
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
        // if (state.contactpersonemail === '') {
        //     error.contactpersonemail = '*Contact Person Email is required';
        //     flage = true;
        // }
        // if (state.contactpersonphone === '') {
        //     error.contactpersonphone = '*Contact Person Phone is required';
        //     flage = true;
        // }
        // if (state.pincode === '') {
        //     error.pincode = '*pincode is required';
        //     flage = true;
        // }
        // if (state.locations === '') {
        //     error.locations = '*locations is required';
        //     flage = true;
        // }
        // if (state.sequence === '') {
        //     error.sequence = '*sequence is required';
        //     flage = true;
        // }
        // if (state.duration === '') {
        //     error.duration = '*Time is required';
        //     flage = true;
        // }
        // if (state.cateGory === '') {
        //     error.cateGory = '*CategoryId is required';
        //     flage = true;
        // }
        // if (state.state === '') {
        //     error.state = '*state is required';
        //     flage = true;
        // }
        // if (state.district === '') {
        //     error.district = '*District is required';
        //     flage = true;
        // }
        // if (state.mode === '') {
        //     error.mode = '*Mode is required';
        //     flage = true;
        // }
        // if (state.Certification === '') {
        //     error.Certification = '*Certification is required';
        //     flage = true;
        // }

        setError(error);
        return flage;
    };

    const onSubmit = (e) => {
        if (validation()) {
            return;
        }
    }
    const onChangeValue = e => {
        // console.log("-----",e.target.name)
        setState({ ...state, [e.target.name]: e.target.value });
    }

    const onChnageHandle = (e, name) => {
        console.log("name", name);
        console.log("e", e);
        if (name === "jobCategoryId") { //jobRoleId
            setState({ ...state, jobCategoryId: e })
        }
        else if (name === "jobRoleId") {
            setState({ ...state, jobRoleId: e })
        }
        else if (name === "startDate") {
            setState({ ...state, startDate: e })
        }
        else if (name === "endDate") {
            setState({ ...state, endDate: e })
        }
        else if (e.target.name === "vacancies") {
            if (e.target.value > 0) {
                setState({ ...state, [e.target.name]: e.target.value })
            } else {
                setState({ ...state, [e.target.name]: 0 })
            }
        }
    }

    useEffect(() => {
        console.log("----", state)
    }, [state])
    return (
        <>
            <PageHeader
                title="Add Job Post"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Button size="small" onClick={() => { }} type="primary">
                            <FeatherIcon icon="plus" size={14} />
                            Add New
                        </Button>
                    </div>,
                ]}
            />
            <Main >
                <HorizontalFormStyleWrap>
                    <Cards headless>
                        <Form name="horizontal-form" layout="horizontal">
                            <Row justify="space-between">
                                <Col lg={11}>
                                    <Row align="middle">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="jobCategoryId">Type of job post</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="jobCategoryId" initialValue="Select a job Category" >
                                                <Select size="large" className="sDash_fullwidth-select" name="jobCategoryId" onChange={(e) => onChnageHandle(e, "jobCategoryId")}>
                                                    {jobData && jobData.data.map((items) => (
                                                        <Option value={items.id}>{items.name} </Option>
                                                    ))}
                                                </Select>
                                                {error.jobCategoryId && <span style={{ color: 'red' }}>{error.jobCategoryId}</span>}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={11}>
                                    <Row align="middle" justify="space-between">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="salary">Monthly Salary Offered</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="salary">
                                                <Input placeholder="Salary " value={state.salary} name="salary" onChange={e => onChangeValue(e)} />
                                                {error.salary && <span style={{ color: 'red' }}>{error.salary}</span>}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row justify="space-between">
                                <Col lg={11}>
                                    <Row align="middle">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="name">Job Role</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="Selectajobrole" initialValue="Select a job role">
                                                <Select size="large" className="sDash_fullwidth-select" name="jobRoleId" onChange={(e) => onChnageHandle(e, "jobRoleId")}>
                                                    {jobRolData && jobRolData.map((items) => (
                                                        <Option value={items.id}>{items.name} </Option>
                                                    ))}
                                                </Select>
                                                {error.jobRoleId && <span style={{ color: 'red' }}>{error.jobRoleId}</span>}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={11}>
                                    <Row align="middle" justify="space-between">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="benifits">Benefits</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="AnyotherBenefitsE" initialValue="">
                                                <Input placeholder="Benefits" name="benifits" onChange={e => onChangeValue(e)} />
                                                {error.benifits && <span style={{ color: 'red' }}>{error.benifits}</span>}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row justify="space-between">
                                <Col lg={11}>
                                    <Row align="middle">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="name">Name of the Employer</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="name" initialValue="">
                                                <Input placeholder="Enter Employer Name" name='name' onChange={(e) => onChangeValue(e)} />
                                                {error.name && <span style={{ color: 'red' }}>{error.name}</span>}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={11}>
                                    <Row align="middle" justify="space-between">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="vacancies">Vacancies</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="vacancies" initialValue="">
                                                <Input type="number" placeholder="vacancies" name='vacancies' onChange={(e) => onChnageHandle(e)} />
                                                {error.vacancies && <span style={{ color: 'red' }}>{error.vacancies}</span>}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row justify="space-between">
                                <Col lg={11}>
                                    <Row align="middle">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="state">State</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="state">
                                                <Input placeholder="State" name="state" onChange={(e) => onChangeValue(e)} />
                                                {error.state && <span style={{ color: 'red' }}>{error.state}</span>}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={11}>
                                    <Row align="middle" justify="space-between">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="name">Type of Job</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Radio.Group  name="type"   onChange={(e) => onChangeValue(e)}>
                                                <Space direction="vertical">
                                                    <Row>
                                                        <Radio checked = {state.type === true } value={"partTime"}>Part-time</Radio>
                                                        <Radio checked = {state.type === true } value={"fullTime"}>Full-time</Radio>
                                                        <Radio checked = {state.type === true } value={"contractual"}>Contractual</Radio>
                                                        <Radio checked = {state.type === true } value={"onRoll"}>On-roll</Radio>
                                                    </Row>
                                                </Space>
                                            </Radio.Group>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row justify="space-between">
                                <Col lg={11}>
                                    <Row align="middle">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="district">District</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="district" >
                                                <Input placeholder="District" name="district" onChange={(e) => onChangeValue(e)} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={11}>
                                    <Row align="middle" justify="space-between">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="phone">Phone</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="phone">
                                                <Input placeholder="Phone" name="phone" onChange={e => onChangeValue(e)} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row justify="space-between">
                                <Col lg={11}>
                                    <Row align="middle">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="name">Town / Village</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="TownVillage" initialValue="">
                                                <Input placeholder="Enter Town / Village" name="town" onChange={(e) => onChangeValue(e)} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={11}>
                                    <Row align="middle" justify="space-between">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="email">Email</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="email">
                                                <Input placeholder="Email" name="email" onChange={e => onChangeValue(e)} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Row justify="space-between">
                                <Col lg={11}>
                                    <Row align="middle">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="pincode">Pincode</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="pincode">
                                                <Input placeholder="pincode" name="pincode" onChange={e => onChangeValue(e)} />

                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col lg={11}>
                                    <Row align="middle" justify="space-between">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="description">Description</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="description">
                                                <TextArea placeholder='Description' name="description" onChange={e => onChangeValue(e)} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Row justify="space-between">
                                <Col lg={11}>
                                    <Row align="middle">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="shifts">Shift</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="Description">
                                                <Input placeholder="Shift" name="" onChange={e => onChangeValue(e)} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col lg={11}>
                                    <Row align="middle" justify="space-between">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="req_experience">Requried Experience</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="req_experience">
                                                <Input placeholder="Requried Experience" name="req_experience" onChange={e => onChangeValue(e)} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Row justify="space-between">
                                <Col lg={11}>
                                    <Row align="middle">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="startdata">Start Date</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item  initialValue={moment('00/00/0000', 'dd/mm/yyyy')} name="startdata">
                                                {/* <DatePicker
                                                defaultValue={moment('2015-01-01', 'YYYY-MM-DD')}
                                                   disabledDate={this.disabledStartDate}
                                                    showTime
                                                    format="YYYY-MM-DD HH:mm:ss"
                                                    value={startValue}
                                                   placeholder="Start"
                                                    onChange={this.onStartChange}
                                                    onOpenChange={this.handleStartOpenChange}
                                                   style={{ margin: '5px' }}
                                                /> */}
                                                <Space direction="vertical">
                                                    <DatePicker  name = "startDate" onChange = {(e) => onChnageHandle(e,"startDate") }  />
                                                </Space>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col lg={11}>
                                    <Row align="middle" justify="space-between">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="requirements">Requirements</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="requirements">
                                                <Input placeholder="requirements" name="requirements" onChange={e => onChangeValue(e)} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Row justify="space-between">
                                <Col lg={11}>
                                    <Row align="middle">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="enddate">End Date</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="endDate">
                                                {/* <DatePicker
                                                defaultValue={moment('2015-01-01', 'YYYY-MM-DD')}
                                                   disabledDate={this.disabledStartDate}
                                                    showTime
                                                    format="YYYY-MM-DD HH:mm:ss"
                                                    value={startValue}
                                                   placeholder="Start"
                                                    onChange={this.onStartChange}
                                                    onOpenChange={this.handleStartOpenChange}
                                                   style={{ margin: '5px' }}
                                                /> */}
                                                <Space direction="vertical">
                                                    <DatePicker  name = "endDate" onChange = {(e) => onChnageHandle(e,"endDate") }  />
                                                </Space>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col lg={11}>
                                    <Row align="middle" justify="space-between">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="isactive">Is Active</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="isactive">
                                                <Radio.Group name="isactive" onChange={(e) => onChangeValue(e)}  >
                                                    <Space direction="vertical">
                                                        <Row>
                                                            <Radio checked={state.isActive === true} value={true}>
                                                                Yes
                                                            </Radio>
                                                            <Radio checked={state.isActive === false} value={false}>
                                                                No
                                                            </Radio>
                                                            {/* <Radio value={true}>Yes</Radio>
                                                            <Radio value={false}>No</Radio> */}
                                                        </Row>
                                                    </Space>
                                                </Radio.Group>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                        </Form>
                        <div className="sDash_form-action mt-20">
                            <Button className="btn-signin ml-10" type="primary" onClick={e => onSubmit(e)} size="medium">
                                Submit
                            </Button>
                            <Button
                                className="btn-signin"
                                type="light"
                                size="medium"
                                onClick={() => {
                                    history.push(`/admin/job/post`);
                                }}
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
