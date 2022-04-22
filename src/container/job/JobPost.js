import React, { useEffect, useState } from 'react';
import { PageHeader } from '../../components/page-headers/page-headers';
import PropTypes from 'prop-types';
import FeatherIcon from 'feather-icons-react';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';
import { ListButtonSizeWrapper, TableWrapper } from '../styled';
import { Col, Form, Row, Badge, Select, Tabs, Input } from 'antd';
import JobListTable from './JobListTable';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Cards } from '../../components/cards/frame/cards-frame';
import { getJobroles } from '../../redux/jobs/actionCreator';
import { useDispatch, useSelector } from 'react-redux';
import e from 'cors';
import { getStateData } from '../../redux/state/actionCreator';

const JobPost = ({ match }) => {
    const { Option } = Select;
    const dispatch = useDispatch();
    const history = useHistory();
    const { TabPane } = Tabs;
    const jobRolesData = useSelector((state) => state.job.jobRoleData)
    let stateData = useSelector((state) => state.state.getStateData) //state
    useEffect(() => {
        console.log("jobRolesData", jobRolesData)
    }, [jobRolesData])

    useEffect(() => {
        dispatch(getJobroles());
    }, [])
    useEffect(() => {
        dispatch(getStateData()) //dipatch state 
    }, []);
    const callback = (key) => {
        //     console.log(key);
    };
    const [state, setState] = useState("")
    const [type,setType] = useState("")
    const [jobRole,setJobRole] = useState("")
    const [apply,setApply] = useState(false)
  
    const onChangevalue = (e, name) => {
        if (name === "type") {
            setType({ ...type, type: e })
        }
        else if (name === "jobRole") {
            setJobRole({ ...jobRole, jobRole: e })
        }
        else if (name === "state") {
            setState({ ...jobRole, state: e })
        }
    
    }
    // useEffect(()=>{
    //     console.log("stateeeee",state)
    // },[state])
    // useEffect(()=>{
    //     console.log("type",type)
    // },[type])
    // useEffect(()=>{
    //     console.log("jobrole",jobRole)
    // },[jobRole])

    return (
        <>
            <PageHeader
                ghost
                title="Job"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Button size="small" onClick={() => { history.push("new") }} type="primary">
                            <FeatherIcon icon="plus" size={14} />
                            Add New
                        </Button>
                    </div>
                ]}
            />
            <Main >
                <Cards headless>
                    <Row gutter={15}>
                        <Col xs={24}>
                            <Row gutter={30}>
                                <Col md={6} xs={24} className="mb-25">
                                    <Form name="sDash_select" layout="vertical">
                                        <Form.Item name="basic-select" label="Type">
                                            <Select size="large" className="sDash_fullwidth-select" name="type" placeholder="Select" onChange={(e) => onChangevalue(e, "type")}>
                                                <Option value="PARTTIME">Part-Time</Option>
                                                <Option value="FULLTIME">Full-time</Option>
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col md={6} xs={24} className="mb-25">
                                    <Form name="sDash_select" layout="vertical">
                                        <Form.Item name="basic-select" label="State">
                                            {/* <Input placeholder="State" name="state" onChange={(e) => onChangeHandle(e)} /> */}
                                            <Select
                                                    size="large"
                                                    className="sDash_fullwidth-select"
                                                    name="state"
                                                    value={state.state}
                                                    placeholder="Select State"
                                                    onChange={(e) => onChangevalue(e, "state")}
                                                >
                                                    {
                                                        stateData && stateData.data.map((item) => (
                                                            <Option value={item.id}> {item.name} </Option>
                                                        ))
                                                    }
                                                </Select>
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col md={6} xs={24} className="mb-25">
                                    <Form name="sDash_select" layout="vertical">
                                        <Form.Item name="basic-select" label="Job Role">
                                            <Select size="large" className="sDash_fullwidth-select" name="jobRole" placeholder="Select" onChange={(e) => onChangevalue(e, "jobRole")}>
                                                {jobRolesData && jobRolesData.map((items) => (
                                                    <Option value={items.id}>{items.name} </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col md={6} xs={24} className="mb-25">
                                    <ListButtonSizeWrapper>
                                        <Button size="small" type="primary"name="submit" onClick = {(e) => setApply(true)}>
                                            Apply
                                        </Button>
                                        <Button size="small" type="light">
                                            Clear
                                        </Button>
                                    </ListButtonSizeWrapper>
                                </Col>
                            </Row>

                            <Tabs defaultActiveKey="1" onChange={callback}>
                                <TabPane tab="Active Courses" key="1">
                                    <JobListTable state = {state} type = {type} jobRole = {jobRole} apply = {apply} />
                                </TabPane>
                                <TabPane tab="Inactive Courses" key="2">
                                    <JobListTable />
                                </TabPane>
                            </Tabs>

                        </Col>
                    </Row>
                </Cards>
            </Main>
        </>
    )
}

JobPost.propTypes = {
    match: PropTypes.object,
};

export default JobPost