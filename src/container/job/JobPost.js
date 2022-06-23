import React, { useEffect, useRef, useState } from 'react';
import { PageHeader } from '../../components/page-headers/page-headers';
import PropTypes from 'prop-types';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';
import { ListButtonSizeWrapper, TableWrapper } from '../styled';
import { Col, Form, Row, Badge, Select, Tabs, Input } from 'antd';
import JobListTable from './JobListTable';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Cards } from '../../components/cards/frame/cards-frame';
import { allJobs, getJobroles, getJobsFilterForMain } from '../../redux/jobs/actionCreator';
import { useDispatch, useSelector } from 'react-redux';
import { getStateData } from '../../redux/state/actionCreator';
import { CSVLink } from 'react-csv';
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import AuthStorage from '../../helper/AuthStorage';
import STORAGEKEY from '../../config/APP/app.config';
import actions from '../../redux/jobs/actions';
import { toast } from 'react-toastify';
import ImportJobPost from '../../components/modals/ImportJobPost';
import { Menu, Dropdown, message, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const JobPost = () => {
    const { allJobsSuccess, addBlukJobsSuccess } = actions;
    const { Option } = Select;
    const dispatch = useDispatch();
    const history = useHistory();
    const { TabPane } = Tabs;
    const CSVLinkRef = useRef(null);

    const [stateJob, setStateJob] = useState([]); //set data for job
    const [apply, setApply] = useState(false);
    const [state, setState] = useState('');
    const [type, setType] = useState('');
    const [jobRole, setJobRole] = useState('');
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('active');
    const [exportTog, setExportTog] = useState(false);
    const [pagePer, setPagePer] = useState();
    const [numberOfPage, setNumberOfPage] = useState();
    const [importModal, setImportModal] = useState(false);
    const [perPage, setPerPage] = useState(20); // forpagination
    const [pageNumber, setPageNumber] = useState(1);

    const jobRolesData = useSelector(state => state.job.jobRoleData);
    const allJobsData = useSelector(state => state.job.allJobs);
    const stateData = useSelector(state => state.state.getStateData); //state
    const filterData = useSelector(state => state.job.getJobFilterData);
    const addJobPostModulData = useSelector(state => state.job.addBulkJobsData)

    const onChangevalue = (e, name) => {
        if (name === 'type') {
            setType({ ...type, type: e });
        } else if (name === 'jobRole') {
            setJobRole({ ...jobRole, jobRole: e });
        } else if (name === 'state') {
            setState({ ...jobRole, state: e });
        } else if (name === "search") {
            setSearch(e)
        }
    };

    const callback = key => {
        setStatus(key);
        setExportTog(false);
    };

    const header = [
        { label: 'id', key: 'id' },
        { label: 'name', key: 'name' },
        { label: 'jobRole', key: 'jobRole' },
        { label: 'district', key: 'district' },
        { label: 'jobType', key: 'jobType' },
        { label: 'shifts', key: 'shifts' },
        { label: 'state', key: 'state' },
        { label: 'benifits', key: 'benifits' },
        { label: 'createdAt', key: 'createdAt' },
        { label: 'description', key: 'description' },
        { label: 'email', key: 'email' },
        { label: 'endDate', key: 'endDate' },
        { label: 'state', key: 'state' },
        { label: 'extraType', key: 'extraType' },
        { label: 'hiredNumber', key: 'hiredNumber' },
        { label: 'isActive', key: 'isActive' },
        { label: 'isApproved', key: 'isApproved' },
        { label: 'key', key: 'key' },
        { label: 'phone', key: 'phone' },
        { label: 'reqExperience', key: 'reqExperience' },
        { label: 'requirements', key: 'requirements' },
        { label: 'salary', key: 'salary' },
        { label: 'startDate', key: 'startDate' },
        { label: 'town', key: 'town' },
        { label: 'type', key: 'type' },
        { label: 'vacancies', key: 'vacancies' },
        { label: 'viewCount', key: 'viewCount' },
        { label: 'updatedAt', key: 'updatedAt' },
    ];



    // const onExportJobs = () => {
    //     dispatch(getJobsFilterForMain(pagePer,numberOfPage, state?.state ? state?.state : "", type?.type ? type?.type : "", jobRole?.jobRole ? jobRole?.jobRole : "", status))
    //     setExportTog(true)
    //     //CSVLinkRef?.current?.link.click()
    // };
    const onExportJobs = () => {
        dispatch(
            getJobsFilterForMain(
                pagePer, numberOfPage, state?.state ? state?.state : '', type?.type ? type?.type : '', jobRole?.jobRole ? jobRole?.jobRole : '', status, search),
        );
        setExportTog(true);
        //CSVLinkRef?.current?.link.click()
    };
    const allexPortJobs = () => {
        ApiPost(`job/allJobs?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
            .then(res => {
                setStateJob(
                    res?.data?.data.map(item => {
                        setExportTog(true);
                        return {
                            ...item,
                            jobRole: item?.jobRole?.name,
                            district: item?.district?.name,
                            jobType: item?.jobType?.name,
                            shifts: item?.shifts ? item?.shifts[0] : '',
                            state: item?.state?.name,
                            name: item?.name?.name,
                        };
                    }),
                );
            });
    };
    const onClear = (e) => {
        setType({ type: '' });
        setJobRole({ jobRole: '' });
        setState({ state: '' });
        setSearch(''),
            setApply(!apply);
    };

    const onClick = ({ key }) => {
        if (key == 'exportJobs') {
            onExportJobs();
        }
        if (key == 'exportAllJobs') {
            allexPortJobs();
        }
        if (key == 'addJobPost') {
            history.push('new');
        }
        if (key == 'import') {
            setImportModal(true);
        }
    }

    useEffect(() => {
        if (addJobPostModulData && addJobPostModulData.status === 200) {
            toast.success("Job Post Import Successful")
            dispatch(addBlukJobsSuccess(null));
            dispatch(getJobsFilterForMain(perPage, pageNumber));
        }
        if (addJobPostModulData && addJobPostModulData.status !== 200) {
            toast.error("Somthingwent wrong")
            dispatch(addBlukJobsSuccess(null))
        }
    }, [addJobPostModulData]);

    useEffect(() => {
        dispatch(getJobroles());
    }, []);

    useEffect(() => {
        dispatch(getStateData()); //dipatch state
    }, []);

    useEffect(() => {
        if (stateJob.length && exportTog) {
            CSVLinkRef?.current?.link.click();
            toast.success('Job data exported successfully');
            setExportTog(false);
        } else if (exportTog) {
            toast.success('No data for export');
        }
    }, [stateJob]); //

    useEffect(() => {
        dispatch(allJobsSuccess(null));
    }, []);

    useEffect(() => {
        if (filterData?.data?.data) {
            setStateJob(
                filterData?.data?.data.map(item => {
                    return {
                        ...item,
                        jobRole: item?.jobRole?.name,
                        district: item?.district?.name,
                        jobType: item?.jobType?.name,
                        shifts: item?.shifts ? item?.shifts[0] : '',
                        state: item?.state?.name,
                        name: item?.name?.name,
                    };
                }),
            );
            //set a state
        }
    }, [filterData]);

    const menu = (
        <Menu
            onClick={onClick}
            items={[
                {
                    label: 'Export Jobs',
                    key: 'exportJobs',
                },
                {
                    label: 'Export All Jobs',
                    key: 'exportAllJobs',
                },
                {
                    label: 'Add Job Post',
                    key: 'addJobPost',
                },
                {
                    label: 'Import',
                    key: 'import',
                },
            ]}
        />
    );

    return (
        <>
            <PageHeader
                ghost
                title="Job"

                buttons={[
                    //   <div key="1" className="page-header-actions">
                    //     <Button size="small" onClick={() => onExportJobs()} type="info">
                    //       Export Jobs
                    //     </Button>
                    //     <Button onClick={allexPortJobs} size="small" type="info">
                    //       Export All Jobs
                    //     </Button>
                    //     <Button
                    //       size="small"
                    //       onClick={() => {
                    //         history.push('new');
                    //       }}
                    //       type="primary"
                    //     >
                    //       Add Job Post
                    //     </Button>
                    //     <Button
                    //       size="small"
                    //       onClick={() => {
                    //         setImportModal(true);
                    //       }}
                    //       type="primary"
                    //     >
                    //       Import
                    //     </Button>
                    //     <CSVLink
                    //       headers={header}
                    //       data={stateJob}
                    //       ref={CSVLinkRef}
                    //       filename="Job.csv"
                    //       style={{ opacity: 0 }}
                    //     ></CSVLink>
                    //   </div>,
                    <div key="1" className="page-header-actions">
                        <Dropdown overlay={menu} trigger='click'>
                            <a onClick={e => e.preventDefault()}>
                                <Space>
                                    Actions
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                        <CSVLink
                            headers={header}
                            data={stateJob}
                            ref={CSVLinkRef}
                            filename="Job.csv"
                            style={{ opacity: 0 }}
                        ></CSVLink>
                    </div>
                ]}
            />

            <Main>
                <Cards headless>
                    <Row gutter={15}>
                        <Col xs={24}>
                            <Row gutter={30}>
                                <Col md={5} xs={24} className="mb-25">
                                    <Form layout="vertical">
                                        <Form.Item label="Type">
                                            <Select
                                                size="large"
                                                value={type.type}
                                                className={type.type ? 'sDash_fullwidth-select' : 'select-option-typ-placeholder'}
                                                name="type"
                                                placeholder="Select Type"
                                                onChange={e => onChangevalue(e, 'type')}
                                            >
                                                <Option value="">Select Type</Option>
                                                <Option value="PARTTIME">Part-Time</Option>
                                                <Option value="FULLTIME">Full-time</Option>
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col md={5} xs={24} className="mb-25">
                                    <Form name="sDash_select" layout="vertical">
                                        <Form.Item label="State">
                                            {/* <Input placeholder="State" name="state" onChange={(e) => onChangeHandle(e)} /> */}
                                            <Select
                                                size="large"
                                                className={state.state ? 'sDash_fullwidth-select' : 'select-option-typ-placeholder'}
                                                name="state"
                                                value={state.state}
                                                placeholder="Select State"
                                                onChange={e => onChangevalue(e, 'state')}
                                            >
                                                <Option value="">Select State</Option>
                                                {stateData && stateData.data.map(item => <Option value={item.id}> {item.name} </Option>)}
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col md={5} xs={24} className="mb-25">
                                    <Form layout="vertical">
                                        <Form.Item label="Job Role">
                                            <Select
                                                size="large"
                                                value={jobRole.jobRole}
                                                className={jobRole.jobRole ? 'sDash_fullwidth-select' : 'select-option-typ-placeholder'}
                                                name="jobRole"
                                                placeholder="Select Job Role"
                                                onChange={e => onChangevalue(e, 'jobRole')}
                                            >
                                                <Option value="">Select Job Role</Option>
                                                {jobRolesData && jobRolesData.map(items => <Option value={items.id}>{items.name} </Option>)}
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col md={5} xs={24} className="mb-25">
                                    <Form name="sDash_select" layout="vertical">
                                        <Form.Item label="Search">
                                            <Input placeholder="search" name='search' value={search} onChange={(e) => onChangevalue(e.target.value, "search")} />
                                        </Form.Item>
                                    </Form>
                                </Col>

                                <Col md={4} xs={24} className="mb-25">
                                    <ListButtonSizeWrapper>
                                        <Button size="small" type="primary" onClick={e => {
                                            setApply(!apply);
                                            setExportTog(false);
                                        }}>
                                            Apply
                                        </Button>
                                        <Button size="small" type="light" onClick={() => onClear()}>
                                            Clear
                                        </Button>
                                    </ListButtonSizeWrapper>
                                </Col>
                            </Row>

                            <Tabs defaultActiveKey="1" onChange={callback}>
                                <TabPane tab="Active Jobs" key="active">
                                    {status === "active" && <JobListTable
                                        state={state}
                                        type={type}
                                        jobRole={jobRole}
                                        apply={apply}
                                        status={status}
                                        search={search}
                                        setPagePer={setPagePer}
                                        setNumberOfPage={setNumberOfPage}
                                        setExportTog={setExportTog}
                                    />}
                                </TabPane>
                                <TabPane tab="Inactive Jobs" key="inactive">
                                    {status === "inactive" && <JobListTable
                                        state={state}
                                        type={type}
                                        jobRole={jobRole}
                                        apply={apply}
                                        status={status}
                                        search={search}
                                        setPagePer={setPagePer}
                                        setNumberOfPage={setNumberOfPage}
                                        setExportTog={setExportTog}
                                    />}
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </Cards>
            </Main>

            {< ImportJobPost
                importModal={importModal}
                handleCancel={() => setImportModal(false)}
                modaltitle="Import Jobs" />}
        </>
    );
}

JobPost.propTypes = {
    match: PropTypes.object,
};

export default JobPost;
