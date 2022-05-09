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
// import actions from "../../redux/job/actions";

const AddJobApplication = () => {

    const { path } = useRouteMatch();
    let history = useHistory();
    let location = useLocation();
    const dispatch = useDispatch();
    const { Option } = Select;

    const [jobApplication, setJobApplication] = useState({
        resume_url: "",
        certification_url: "",
        experience: "",
        currently_working: "",
        job_id : "",
    });

    const onChangeValue = (e) => {
        if (e.target.name === 'currently_working') {
            setJobApplication({
                ...jobApplication,
                [e.target.name]: e.target.checked,
            });
        }
        else {
            setJobApplication({ ...jobApplication, [e.target.name]: e.target.value })
        }
    }

    const selectValue = (e,name) => {
        if (name === "job_id" ){
            setJobApplication({
                ...jobApplication,job_id : e
            })
        }
    }
    const [error, setError] = useState({})

    const allJobsData = useSelector((state) => state.job.allJobs)

    useEffect(() => {
        console.log("allJobsData", allJobsData);
    }, [allJobsData])

    // useEffect(() => {
    //     console.log("jobApplication", jobApplication);
    // }, [jobApplication])

    useEffect(() => {
        dispatch(allJobs())
    }, [])

    const validation = () => {

        let error = {}
        let flage = false
        if (jobApplication.resume_url === "") {
            error.resume_url = "Resume URL is required";
            flage = true;
        }
        if (jobApplication.experience === "") {
            error.experience = "Experience is required";
            flage = true;
        }
        if (jobApplication.certification_url === "") {
            error.certification_url = "Certification URL is required";
            flage = true;
        }
        // if (jobApplication.currently_working === "") {
        //     error.currently_working = "Currently Working is required";
        //     flage = true;
        // }
        if (jobApplication.job_id === "") {
            error.job_id = "Job Id is required";
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
                title="Add JobApplication"
            />
            <Main >
                <Cards headless>
                    <Row justify="space-between">
                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="resume_url">Resume URL</label>
                            <Form.Item>
                                <Input placeholder="Resume URL" name="resume_url" onChange={(e) => onChangeValue(e)} />
                                {
                                    error.resume_url && <span style={{ color: "red" }}>{error.resume_url}</span>
                                }
                            </Form.Item>
                        </Col>

                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="certification_url">Certification URL</label>
                            <Form.Item>
                                <Input placeholder="Certification URL" name="certification_url" onChange={(e) => onChangeValue(e)} />
                                {
                                    error.certification_url && <span style={{ color: "red" }}>{error.certification_url}</span>
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="experience">Experience</label>
                            <Form.Item>
                                <Input placeholder="Experience" name="experience" onChange={(e) => onChangeValue(e)} />
                                {error.experience && <span style={{ color: "red" }}>{error.experience}</span>}
                            </Form.Item>
                        </Col>
                        <Col lg={11} md={11} sm={24} xs={24}>
                            <div>
                                <label htmlFor="visible" className="ml-10">
                                    currently Working
                                </label>
                                <Checkbox id="visible" name="currently_working" onChange={e => onChangeValue(e)}></Checkbox>
                            </div>
                            {/* {error.currently_working && <span style={{ color: "red" }}>{error.currently_working}</span>} */}
                        </Col>
                    </Row>

                    <Row justify="space-between">
                        <Col lg={11} md={11} sm={24} xs={24}>
                        <label htmlFor="job_id">Jobs Id</label>
                            <Form.Item >
                                <Select
                                    size="large"
                                    placeholder="Select Job Id"
                                    className="sDash_fullwidth-select"
                                    name="job_id"
                                    onChange={e => selectValue(e, 'job_id')}
                                >
                                    {allJobsData && allJobsData.data && allJobsData.data.data.map((items) => 
                                    <Option value={items.id}>{items.name.name}</Option>)}
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