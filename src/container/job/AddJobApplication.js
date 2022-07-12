import { Checkbox, Col, Form, Input, Radio, Row, Select, Space } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers'
import React, { useEffect, useState } from 'react';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import { addUserSignup, editProfile, getOneUser } from '../../redux/users/actionCreator';
import { addJobApplication, allJobs } from '../../redux/jobs/actionCreator';

const AddJobApplication = () => {

    const { path } = useRouteMatch();
    let history = useHistory();
    let location = useLocation();
    const dispatch = useDispatch();
    const { Option } = Select;

    const allJobsData = useSelector((state) => state.job.allJobs)

    const [jobApplication, setJobApplication] = useState({
        resume_url: "",
        certification_url: "",
        experience: "",
        currently_working: "",
        job_id: "",
    });
    const [error, setError] = useState({})

    useEffect(() => {
        dispatch(allJobs())
    }, [])

    const onChangeValue = (e) => {
        if (e.target.name === 'currently_working') {
            setJobApplication({
                ...jobApplication,
                [e.target.name]: e.target.checked,
            });
        }
        else {
            setJobApplication({ ...jobApplication, [e.target.name]: e.target.value })
            setError({ ...error, [e.target.name]: "" })
        }
    }

    const onChnageHandle = (e, name) => {
        const input = document.getElementById('experience')
        input.onkeydown = (e) => {
            if (e.which === 38 || e.which === 40) {
                e.preventDefault();
            }
        }
        if (name === 'experience') {
            if (e.target.value > 0) {
                setJobApplication({ ...jobApplication, [e.target.name]: e.target.value })
            } else {
                console.log('e else', e.target.value)
                setJobApplication({ ...jobApplication, [e.target.name]: 0 })
            }
            setError({ ...error, [e.target.name]: "" })
        }
    }

    const selectValue = (e, name) => {
        if (name === "job_id") {
            setJobApplication({
                ...jobApplication, job_id: e
            })
            setError({ ...error, job_id: "" })
        }
    }


    const onFileSelecte = (e, name) => {
        let extensions = e.target.files[0]?.name?.split('.')
        if (extensions?.length > 0) {
            let extensionsValidation = ['docx', 'pdf', 'csv', 'xlsx']
            if (extensionsValidation.includes(extensions[extensions.length - 1])) {
                setJobApplication({ ...jobApplication, [name]: e.target.files[0] })
                setError({ ...error, [name]: "" });
            }
            else {
                setError({ ...error, resume_url: 'Please select valid document file' })
                setJobApplication({ ...jobApplication, [name]: "" })
            }
        }
        else {
            setError({ ...error, imageUrl: 'Please select document file' })
        }
    }
    const onChnagecertificationUrl = (e, name) => {
        let extensions = e.target.files[0].name?.split('.')
        if (extensions) {
            let extensionsValidation = ['docx', 'pdf', 'csv', 'xlsx']
            if (extensionsValidation.includes(extensions[extensions.length - 1])) {
                setJobApplication({ ...jobApplication, [name]: e.target.files[0] })
                setError({ ...error, certification_url: "" });
            }
            else {
                setError({ ...error, certification_url: 'Please select valid document file' })
                setJobApplication({ ...jobApplication, certification_url: '' })
            }
        }
        else {
            setError({ ...error, imageUrl: 'Please select document file' })
        }
    }

    const validation = () => {
        let error = {}
        let flage = false
        if (jobApplication.resume_url === "") {
            error.resume_url = "Resume is required";
            flage = true;
        }
        if (jobApplication.experience === "") {
            error.experience = "Experience is required";
            flage = true;
        }
        if (jobApplication.certification_url === "") {
            error.certification_url = "Certification is required";
            flage = true;
        }
        if (jobApplication.currently_working === "") {
            error.currently_working = "Currently Working is required";
            flage = true;
        }
        if (jobApplication.job_id === "") {
            error.job_id = "Job is required";
            flage = true;
        }
        setError(error);
        return flage
    }

    const onSubmit = () => {
        if (validation()) {
            return;
        }
        dispatch(addJobApplication(jobApplication))
        oncancel();
    }
    const oncancel = () => {
        history.push(`/admin/job/application`)
    }
    return (
        <>
            <PageHeader
                title="Add Job Application"
            />
            <Main >
                <Cards headless>
                    <Row justify="space-between">
                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="resume_url">Resume</label>
                            <Form.Item>
                                {/* <Input type="file" placeholder="Resume URL" name="resume_url" onChange={(e) => onChangeValue(e)} /> */}
                                <Input type="file" placeholder="Resume URL" name="resume_url" onChange={(e) => onFileSelecte(e, "resume_url")} />
                                {
                                    error.resume_url && <span style={{ color: "red" }}>{error.resume_url}</span>
                                }
                            </Form.Item>
                        </Col>

                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="certification_url">Certification</label>
                            <Form.Item>
                                <Input type="file" placeholder="Certification URL" name="certification_url" onChange={(e) => onChnagecertificationUrl(e, "certification_url")} />
                                {
                                    error.certification_url && <span style={{ color: "red" }}>{error.certification_url}</span>
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="experience">Experience</label>
                            <Form.Item>
                                <Input type="number" className='experience-input' placeholder="Experience" id='experience' name="experience" onChange={(e) => onChnageHandle(e, "experience")} />
                                {error.experience && <span style={{ color: "red" }}>{error.experience}</span>}
                            </Form.Item>
                        </Col>
                        <Col lg={11} md={11} sm={24} xs={24}>
                            <div>
                                <label htmlFor="visible" className="ml-10">
                                    Currently Working
                                </label>
                                <Checkbox id="visible" name="currently_working" onChange={e => onChangeValue(e)}></Checkbox>
                            </div>
                            {/* {error.currently_working && <span style={{ color: "red" }}>{error.currently_working}</span>} */}
                        </Col>
                    </Row>

                    <Row justify="space-between">
                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="job_id">Job</label>
                            <Form.Item >
                                <Select
                                    size="large"
                                    placeholder="Select Job"
                                    className="sDash_fullwidth-select"
                                    name="job_id"
                                    onChange={e => selectValue(e, 'job_id')}
                                >
                                    {allJobsData && allJobsData.data && allJobsData.data.data.map((items, i) =>
                                        <Option key={i} value={items.id}>{items.name.name}</Option>)}
                                </Select>
                                {error.job_id && <span style={{ color: 'red' }}>{error.job_id}</span>}
                            </Form.Item>
                        </Col>
                    </Row>

                    <div className="sDash_form-action mt-20">
                        <Button className="btn-signin ml-10" type="primary" size="medium" onClick={(e) => onSubmit(e)}>
                            {/* {id?"Edit":"Add"} */}Add
                        </Button>
                        <Button className="btn-signin" type="light" size="medium"
                            //    onClick={() => history.push(`/admin/user`)}
                            onClick={(e) => oncancel(e)}
                        >
                            Cancel
                        </Button>
                    </div>
                </Cards>
            </Main>
        </>
    )
}

export default AddJobApplication