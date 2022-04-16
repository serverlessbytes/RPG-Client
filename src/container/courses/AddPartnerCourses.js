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
import { getCategoryData, postCategoryData } from '../../redux/course/actionCreator';
import { useLocation } from 'react-router';

const AddPartnerCourses = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id')
    const { path } = useRouteMatch();
    let history = useHistory();
    let location = useLocation();
    let dispatch = useDispatch();

    const editOneFilterData = useSelector(state => state.category.editFilterData);

    let catdata = useSelector(state => state.category.categoryData);

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
        sequence: '',
        duration: '',
        cateGory: '',
        state: '',
        district: '',
        mode: '',
        Certification: '',
        key: ''
    });

    useEffect(() => {
        console.log("state ============= state", state);
    }, [state])

    const [editPartnerCourseID, setEditPartnerCourseID] = useState()

    useEffect(() => {
        dispatch(getCategoryData());
    }, []);

   useEffect(() => {

        if (location.search) {
            dispatch(getOneCoursefilter(location.search.split('=')[1]));
            setEditPartnerCourseID(location.search.split('=')[1])
        }
    }, [location.search])

    useEffect(() => {
        console.log("editPartnerCourseID", editPartnerCourseID);
    }, [editPartnerCourseID])

    useEffect(() => {
        if (editOneFilterData && editOneFilterData.data && id) {
            setState({
                ...state,
                key: editOneFilterData.data.key,
                name: editOneFilterData.data.name,
                organiZation: editOneFilterData.data.organization,
                detail: editOneFilterData.data.detail,
                certificationBody: editOneFilterData.data.certificationBody,
                eligiBility: editOneFilterData.data.eligibility,
                component: editOneFilterData.data.component,
                contactpersonname: editOneFilterData.data.contactPersonName,
                contactpersonemail: editOneFilterData.data.contactPersonEmail,
                contactpersonphone: editOneFilterData.data.contactPersonPhone,
                pincode: editOneFilterData.data.pincode,
                locations: editOneFilterData.data.location,
                sequence: editOneFilterData.data.sequence,
                duration: moment(editOneFilterData.data.duration, 'HH:mm:ss'),
                cateGory: editOneFilterData.data.courseCategory.id,
                state: editOneFilterData.data.state,
                district: editOneFilterData.data.district,
                mode: editOneFilterData.data.mode,
                Certification: editOneFilterData.data.certificate,
            });
        }
    }, [editOneFilterData]);
    const validation = () => {
        // console.log("(state.benifitLine).toString", (state.benifitLine).toString("markdown"))
        let error = {};
        let flage = false;
        if (state.name === '') {
            error.name = '*Course Name is required';
            flage = true;
        }
        if (state.organiZation === '') {
            error.organiZation = '*Organization is required';
            flage = true;
        }
        if (state.detail === '') {
            error.detail = '*Detail is required';
            flage = true;
        }
        if (state.certificationBody === '') {
            error.certificationBody = '*Certification Body is required';
            flage = true;
        }
        if (state.eligiBility === '') {
            error.eligiBility = '*Eligibility is required';
            flage = true;
        }
        if (state.component === '') {
            error.component = '*Component is required';
            flage = true;
        }
        if (state.contactpersonname === '') {
            error.contactpersonname = '*Contact Person Name is required';
            flage = true;
        }
        if (state.contactpersonemail === '') {
            error.contactpersonemail = '*Contact Person Email is required';
            flage = true;
        }
        if (state.contactpersonphone === '') {
            error.contactpersonphone = '*Contact Person Phone is required';
            flage = true;
        }
        if (state.pincode === '') {
            error.pincode = '*pincode is required';
            flage = true;
        }
        if (state.locations === '') {
            error.locations = '*locations is required';
            flage = true;
        }
        if (state.sequence === '') {
            error.sequence = '*sequence is required';
            flage = true;
        }
        if (state.duration === '') {
            error.duration = '*Time is required';
            flage = true;
        }
        if (state.cateGory === '') {
            error.cateGory = '*CategoryId is required';
            flage = true;
        }
        if (state.state === '') {
            error.state = '*state is required';
            flage = true;
        }
        if (state.district === '') {
            error.district = '*District is required';
            flage = true;
        }
        if (state.mode === '') {
            error.mode = '*Mode is required';
            flage = true;
        }
        if (state.Certification === '') {
            error.Certification = '*Certification is required';
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
            sequence: parseInt(state.sequence),
            mode: state.mode,
        };
        dispatch(addPartnerCourse(data));
        history.push(`/admin/courses/partnercourses`);
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
            sequence: parseInt(state.sequence),
            duration: moment(state.duration).format('hh:mm:ss'),
            categoryId: state.cateGory,
            state: state.state,
            district: state.district,
            mode: state.mode,
            certification: state.Certification,
            isActive: true,
            isDeleted: false
        }
        dispatch(editPartnerCoursefilter(data));
    }

    // const onChangevalue = (e) => {
    //     if(e.target.name==="location"){
    //         if (e.target.value > 0) {
    //             setState({ ...state, [e.target.name]: e.target.value })
    //         } else {
    //             setState({ ...state, [e.target.name]: 0 })
    //         }
    //     }
    //     else{
    //         setState({ ...state, [e.target.name]: e.target.value })
    //     }

    // }

    const onChangevalue = e => {
        setState({ ...state, [e.target.name]: e.target.value });
    };
    const onSelect = (e, name) => {
        if (name === 'cateGory') {
            setState({ ...state, cateGory: e });
        } else if (name === 'duration') {
            setState({ ...state, duration: e });
        }
        // else if (name == "state") {
        //     setState({ ...state, state: e })
        // }
        // else if (name == "district") {
        //     setState({ ...state, district: e })
        // }
        else if (name === 'mode') {
            setState({ ...state, mode: e });
        } else if (name === 'sequence') {
            if (e.target.value > 0) {
                setState({ ...state, [e.target.name]: e.target.value });
            } else {
                setState({ ...state, [e.target.name]: 0 });
            }
        }
    };
    console.log('sttaeee', state);

    const { Option } = Select;
    // const [typeOfJob, setTypeOfJob] = useState("");
   
    // const onChange = e => {
    //     console.log('radio checked', e.target.value);
    //     setTypeOfJob(e.target.value)
    // };
    // console.log("----",typeOfJob);
    const { TextArea } = Input;
    return (
        <>
            <PageHeader ghost title="Add Partner Courses" />
            <Main>
                <Cards headless>
                    <Row justify="space-between">
                        <Col lg={11}>
                            <label htmlFor="name">Name</label>
                            <Form.Item name="name">
                                <Input placeholder="Name" value={state.name} name="name" onChange={e => onChangevalue(e)} />
                                {error.name && <span style={{ color: 'red' }}>{error.name}</span>}
                            </Form.Item>
                        </Col>
                        <Col lg={11} className="addpartnercourses">
                            <label htmlFor="category mb-4">Time</label>
                            <Form.Item
                                initialValue={moment('00:00:00', 'HH:mm:ss')}
                            >
                                <TimePicker name="duration" value={state.duration} onChange={e => onSelect(e, 'duration')} />
                                {error.duration && <span style={{ color: 'red' }}>{error.duration}</span>}
                            </Form.Item>
                        </Col>
                        <Col lg={11}>
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
                        <Col lg={11}>
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
                        <Col lg={11}>
                            <label htmlFor="detail">Detail</label>
                            <Form.Item>
                                <TextArea name="detail" value={state.detail} onChange={e => onChangevalue(e)} />
                                {error.detail && <span style={{ color: 'red' }}>{error.detail}</span>}
                            </Form.Item>
                        </Col>
                        <Col lg={11}>
                            <label htmlFor="certification">Certification Body</label>
                            <Form.Item>
                                <TextArea value={state.certificationBody} name="certificationBody" onChange={e => onChangevalue(e)} />
                                {error.certificationBody && <span style={{ color: 'red' }}>{error.certificationBody}</span>}
                            </Form.Item>
                        </Col>
                        <Col lg={11}>
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
                        <Col lg={11}>
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
                        <Col lg={11}>
                            <label htmlFor="contactpersonname">Contact Person Name</label>
                            <Form.Item name="contactpersonname">
                                <Input
                                    value={state.contactpersonname}
                                    placeholder="contactpersonname"
                                    name="contactpersonname"
                                    onChange={e => onChangevalue(e)}
                                />
                                {error.contactpersonname && <span style={{ color: 'red' }}>{error.contactpersonname}</span>}
                            </Form.Item>
                        </Col>
                        <Col lg={11}>
                            <label htmlFor="contactpersonemail">Contact Person Email</label>
                            <Form.Item name="contactpersonemail">
                                <Input
                                    value={state.contactpersonemail}
                                    placeholder="contactpersonemail"
                                    name="contactpersonemail"
                                    onChange={e => onChangevalue(e)}
                                />
                                {error.contactpersonemail && <span style={{ color: 'red' }}>{error.contactpersonemail}</span>}
                            </Form.Item>
                        </Col>
                        <Col lg={11}>
                            <label htmlFor="contactpersonphone">Contact Person Phone</label>
                            <Form.Item name="contactpersonphone">
                                <Input
                                    value={state.contactpersonphone}
                                    placeholder="contactpersonphone"
                                    name="contactpersonphone"
                                    onChange={e => onChangevalue(e)}
                                />
                                {error.contactpersonphone && <span style={{ color: 'red' }}>{error.contactpersonphone}</span>}
                            </Form.Item>
                        </Col>
                        <Col lg={11}>
                            <label htmlFor="state">State</label>
                            <Form.Item name="state">
                                {/* <Select size="large" placeholder="Select State" className="sDash_fullwidth-select" name="state" onChange={(e) => onSelect(e, "state")}>
                                    <Option value="1"> Andaman and Nicobar Islands </Option>
                                    <Option value="2"> Andra Pradesh </Option>
                                </Select> */}
                                <Input value={state.state} placeholder="State" name="state" onChange={e => onChangevalue(e)} />
                                {error.state && <span style={{ color: 'red' }}>{error.state}</span>}
                            </Form.Item>
                        </Col>
                        <Col lg={11}>
                            <label htmlFor="district">District</label>
                            <Form.Item name="district">
                                {/* <Select size="large" placeholder="Select District" className="sDash_fullwidth-select" name="district" onChange={(e) => onSelect(e, "district")}>
                                    <Option value="1">surat</Option>
                                    <Option value="2">bhavnagar</Option>
                                </Select> */}
                                <Input value={state.district} placeholder="District" name="district" onChange={e => onChangevalue(e)} />
                                {error.district && <span style={{ color: 'red' }}>{error.district}</span>}
                            </Form.Item>
                        </Col>
                        <Col lg={11}>
                            <label htmlFor="pincode">Pincode</label>
                            <Form.Item name="pincode">
                                <Input value={state.pincode} placeholder="pincode" name="pincode" onChange={e => onChangevalue(e)} />
                                {error.pincode && <span style={{ color: 'red' }}>{error.pincode}</span>}
                            </Form.Item>
                        </Col>
                        <Col lg={11}>
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
                        <Col lg={11}>
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
                        </Col>
                        <Col lg={11}>
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
                        </Col>
                        <Col lg={11} className="d-flex f-d-cloumn">
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
                        {editPartnerCourseID ? <Button className="btn-signin ml-10" type="primary" onClick={e => onEdit(e)} size="medium">
                            Edit
                        </Button> : <Button className="btn-signin ml-10" type="primary" onClick={e => onsubmit(e)} size="medium">
                            Add
                        </Button>}
                        <Button
                            className="btn-signin"
                            type="light"
                            size="medium"
                            onClick={() => {
                                history.push(`/admin/courses/partnercourses`);
                            }}
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
