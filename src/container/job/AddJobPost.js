import { Button, Col, Input, Row, Form, Select, Radio, Space, DatePicker, TimePicker } from 'antd';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import FeatherIcon from 'feather-icons-react';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { HorizontalFormStyleWrap } from '../forms/overview/Style';
import { PageHeader } from '../../components/page-headers/page-headers';
import moment from 'moment';
import { useHistory, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addJobPost, getJobcategory, getJobroles, getoneJobPost } from '../../redux/jobs/actionCreator';
import uuid from 'react-uuid';
import { getOneSchemeData } from '../../redux/schemes/actionCreator';


const AddJobPost = () => {
    let history = useHistory();
    let dispatch = useDispatch();
    let location = useLocation();
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

    useEffect(() => {
        console.log("location.search",location.search);
        if (location.search.split("=")[1]) {
            dispatch(getoneJobPost(location.search.split("=")[1]))
        }
    }, [location.search])
    const getOneJobPostData = useSelector((state) => state.job.getOneJobPostData)  // for fetch a single data
    const [error, setError] = useState({}); // for valadation

    // useEffect(() => {
    //     console.log("jobRolData", jobRolData)
    // }, [jobRolData])
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
        isActive: true,
        shifts: "",
        email: "",
        phone: "",
        type: "",
        extraType: "",
        startDate: "",
        endDate: "",
        jobRoleId: "",
     });
//   useEffect(()=>{
//     if(getOneJobPostData){
//         setState({
//             ...state,
//             salary:getOneJobPostData.salary,
//             benifits:getOneJobPostData.benifits ,
//             name:getOneJobPostData.name ,
//             state:getOneJobPostData.state,
//             district:getOneJobPostData.district ,
//             town:getOneJobPostData.town ,
//             pincode:getOneJobPostData.pincode ,
//             description:getOneJobPostData.description ,
//             vacancies:getOneJobPostData.vacancies ,
//             reqExperience:getOneJobPostData. ,
//             requirements: ,
//             jobCategoryId: ,
//             isActive: true,
//             shifts: ,
//             email: ,
//             phone: ,
//             type: ,
//             extraType: ,
//             startDate: ,
//             endDate: "",
//             jobRoleId: "",
//         })
//     }
//   },[getOneJobPostData])
   

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
        if (state.district === '') {
            error.district = 'District is required';
            flage = true;
        }
        if (state.town === '') {
            error.town = 'Town is required';
            flage = true;
        }
        if (state.pincode === '') {
            error.pincode = 'pincode is required';
            flage = true;
        }
        if (state.description === '') {
            error.description = 'Description is required';
            flage = true;
        }
        if (state.req_experience === '') {
            error.req_experience = 'Experience is required';
            flage = true;
        }
        if (state.requirements === '') {
            error.requirements = 'Requirements is required';
            flage = true;
        }
        if (state.shifts === '') {
            error.shifts = 'Shifts is required';
            flage = true;
        }
        if (state.email === '') {
            error.email = 'Email is required';
            flage = true;
        }
        if (state.phone === '') {
            error.phone = 'Phone is required';
            flage = true;
        }
        if (state.type === '') {
            error.type = 'Type is required';
            flage = true;
        }
        if (state.startDate === '') {
            error.startDate = 'StartDate is required';
            flage = true;
        }
        if (state.endDate === '') {
            error.endDate = 'EndDate is required';
            flage = true;
        }
        if (state.extraType === '') {
            error.extraType = 'Type Of Field is required';
            flage = true;
        }

        setError(error);
        return flage;
    };

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
        else if (name === "shifts") {   
            setState({ ...state, shifts: e })
        }
        else if (name === "startDate") {
            console.log("timeeewee",moment.utc(e).format()) 
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
    const onSubmit = (e) => {
        if (validation()) {
            return;
        }
       
        let data =  {
            key : uuid(),
            name : state.name,
            state : state.state,
            district : state.district,
            town : state.town,
            pincode : state.pincode,
            description : state.description,
            vacancies : parseInt(state.vacancies),
            req_experience : state.req_experience,
            salary : state.salary,
            benifits : state.benifits,
            requirements : state.requirements,
            type : state.type,
            extraType : state.extraType,
            isActive: true,
            shifts : state.shifts,
            email : state.email,
            phone : state.phone,
            startDate : moment.utc(state.startDate).format(),
            endDate : moment.utc(state.endDate).format(),
           // moment('2019-11-03T05:00:00.000Z').utc().format('MM/DD/YYYY')
            //endDate :  moment(state.endDate).format('DD-MM-YYYY hh:mm:ss'),
            jobRoleId : state.jobRoleId,
            jobCategoryId : state.jobCategoryId,
        }
        dispatch(addJobPost(data))
        //history.push(`job/post`);
        console.log("----", data)
      
    }

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
                                                <Select size="large" className="sDash_fullwidth-select" name="jobCategoryId" onChange={(e) => onChnageHandle(e, "jobCategoryId")} defaultValue="Select Job">
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
                                                <Select size="large" className="sDash_fullwidth-select" name="jobRoleId" onChange={(e) => onChnageHandle(e, "jobRoleId")} defaultValue="Select Job Role">
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
                                            <Radio.Group name="type" onChange={(e) => onChangeValue(e)}>
                                                <Space direction="vertical">
                                                    <Row>
                                                        <Radio checked={state.type === true} value={"PARTTIME"}>Part-time</Radio>
                                                        <Radio checked={state.type === true} value={"FULLTIME"}>Full-time</Radio>
                                                    </Row>
                                                </Space>
                                            </Radio.Group>
                                        </Col>
                                        {error.type && <span style={{ color: 'red' }}>{error.type}</span>}
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
                                                {error.district && <span style={{ color: 'red' }}>{error.district}</span>}
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
                                                {error.phone && <span style={{ color: 'red' }}>{error.phone}</span>}
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
                                                {error.town && <span style={{ color: 'red' }}>{error.town}</span>}
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
                                                {error.email && <span style={{ color: 'red' }}>{error.email}</span>}
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
                                                {error.pincode && <span style={{ color: 'red' }}>{error.pincode}</span>}
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
                                                {error.description && <span style={{ color: 'red' }}>{error.description}</span>}
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
                                            <Form.Item name="shifts" initialValue ="Select Shift">
                                                {/* <Input placeholder="Shift" name="shifts" onChange={e => onChangeValue(e)} />
                                                {error.shifts && <span style={{ color: 'red' }}>{error.shifts}</span>} */}
                                                <Select size="large" className="sDash_fullwidth-select" value={state.locations} name="shifts" onChange={(e) => onChnageHandle(e, "shifts")} mode="multiple">
                                                    <Option value={"DAY"}> Day </Option>
                                                    <Option value={"NIGHT"}> Night </Option>
                                                </Select>
                                                {error.shifts && <span style={{ color: "red" }}>{error.shifts}</span>}
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
                                                {error.req_experience && <span style={{ color: 'red' }}>{error.req_experience}</span>}
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
                                            <Form.Item initialValue={moment('00/00/0000', 'dd/mm/yyyy HH:mm:ss' )} name="startdata">
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
                                                    <DatePicker name="startDate"  onChange={(e) => onChnageHandle(e, "startDate")} />
                                                    {error.startDate && <span style={{ color: 'red' }}>{error.startDate}</span>}
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
                                                <TextArea placeholder='Requirements' name="requirements" onChange={e => onChangeValue(e)} />
                                                {error.requirements && <span style={{ color: 'red' }}>{error.requirements}</span>}
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
                                                    <DatePicker name="endDate" onChange={(e) => onChnageHandle(e, "endDate")} />
                                                    {error.endDate && <span style={{ color: 'red' }}>{error.endDate}</span>}
                                                </Space>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col lg={11}>
                                    <Row align="middle" justify="space-between">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="isactive">Type Of Field</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="isactive">
                                                <Radio.Group name="extraType" onChange={(e) => onChangeValue(e)}  >
                                                    <Space direction="vertical">
                                                        <Row>
                                                            <Radio checked={state.extraType === true} value={"CONTRACTUAL"}>
                                                                Contractual
                                                            </Radio>
                                                            <Radio checked={state.extraType === true} value={"ONROLL"}>
                                                                OnRoll
                                                            </Radio>
                                                            {/* <Radio value={true}>Yes</Radio>
                                                            <Radio value={false}>No</Radio> */}
                                                        </Row>
                                                    </Space>

                                                </Radio.Group>
                                                {error.extraType && <span style={{ color: 'red' }}>{error.extraType}</span>}
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
