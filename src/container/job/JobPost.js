import React, { useEffect, useRef, useState } from 'react';
import { PageHeader } from '../../components/page-headers/page-headers';
import PropTypes from 'prop-types';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';
import { ListButtonSizeWrapper } from '../styled';
import { Col, Form, Row, Select, Tabs, Input } from 'antd';
import JobListTable from './JobListTable';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Cards } from '../../components/cards/frame/cards-frame';
import { getJobroles, getJobsFilterForMain } from '../../redux/jobs/actionCreator';
import { useDispatch, useSelector } from 'react-redux';
import { getStateData } from '../../redux/state/actionCreator';
import { CSVLink } from 'react-csv';
import { ApiPost } from '../../helper/API/ApiData';
import AuthStorage from '../../helper/AuthStorage';
import STORAGEKEY from '../../config/APP/app.config';
import actions from '../../redux/jobs/actions';
import { toast } from 'react-toastify';
import ImportJobPost from '../../components/modals/ImportJobPost';
import { Menu, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const JobPost = () => {
    const { allJobsSuccess, addBlukJobsSuccess, addBlukJobsErr } = actions;
    const { Option } = Select;
    const dispatch = useDispatch();
    const history = useHistory();
    const { TabPane } = Tabs;
    const CSVLinkRef = useRef(null);
    const CSVLinkRefAll = useRef(null);

    const [stateJob, setStateJob] = useState([]);
    const [stateJobAll, setStateJobAll] = useState([]);
    const [apply, setApply] = useState(false);
    const [state, setState] = useState('');
    const [type, setType] = useState('');
    const [jobRole, setJobRole] = useState('');
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('active');
    const [exportTog, setExportTog] = useState('');
    const [pagePer, setPagePer] = useState(20);
    const [numberOfPage, setNumberOfPage] = useState(1);
    const [importModal, setImportModal] = useState(false);
    const [perPage, setPerPage] = useState(20);
    const [pageNumber, setPageNumber] = useState(1);
    const [langIds, setLangIds] = useState({
        hindi: "",
        marathi: "",
    });

    const languageData = useSelector(state => state.language.getLanguageData);
    const jobRolesData = useSelector(state => state.job.jobRoleData);
    const stateData = useSelector(state => state.state.getStateData);
    const filterData = useSelector(state => state.job.getJobFilterData);
    const addJobPostModulData = useSelector(state => state.job.addBulkJobsData)
    const addBulkJobsError = useSelector(state => state.job.addBulkJobsError)

    const header = [
        { label: 'id', key: 'id' },
        { label: 'name', key: 'name.name' },
        { label: 'jobRole', key: 'jobRole.name' },
        { label: 'district', key: 'district.name' },
        { label: 'jobType', key: 'jobType.name' },
        { label: 'shifts', key: 'shifts' },
        { label: 'state', key: 'state.name' },
        { label: 'benifits', key: 'benifits' },
        { label: 'createdAt', key: 'createdAt' },
        { label: 'description', key: 'description' },
        { label: 'email', key: 'email' },
        { label: 'endDate', key: 'endDate' },
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
        { label: 'application_form', key: 'application_form' },
        { label: 'application_process', key: 'application_process' },
        { label: 'hospital_expenses_estimation_certificate', key: 'hospital_expenses_estimation_certificate' },
        { label: 'medical_superintendent', key: 'medical_superintendent' },
        { label: 'recommended_and_forwarded', key: 'recommended_and_forwarded' },
    ];
    const headerAll = [
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
        { label: 'application_form', key: 'application_form' },
        { label: 'application_process', key: 'application_process' },
        { label: 'hospital_expenses_estimation_certificate', key: 'hospital_expenses_estimation_certificate' },
        { label: 'medical_superintendent', key: 'medical_superintendent' },
        { label: 'recommended_and_forwarded', key: 'recommended_and_forwarded' },
    ];

    const onChangevalue = (e, name) => {
        if (name === 'type') {
            setType({ type: e });
        } else if (name === 'jobRole') {
            setJobRole({ jobRole: e });
        } else if (name === 'state') {
            setState({ state: e });
        } else if (name === "search") {
            setSearch(e)
        }
    };

    const callback = (key) => {
        setStatus(key);
        setExportTog(false);
    };

    const allexPortJobs = () => {
        ApiPost(`job/allJobs?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
            .then((res) => {
                setStateJobAll(
                    res && res.data && res.data.data && res.data.data.length > 0 ? res.data.data.map((item) => {
                        return {
                            ...item,
                            jobRole: item.jobRole?.name,
                            district: item.district?.name,
                            jobType: item.jobType?.name,
                            shifts: item.shifts ? item?.shifts[0] : '',
                            state: item.state?.name,
                            name: item.name?.name,
                            application_form: item.application_form,
                            application_process: item.application_process,
                            hospital_expenses_estimation_certificate: item.hospital_expenses_estimation_certificate,
                            medical_superintendent: item.medical_superintendent,
                            recommended_and_forwarded: item.recommended_and_forwarded,
                        };
                    }) : [],
                );
                setExportTog("all");
            });
    };

    const onClear = () => {
        setType({ type: '' });
        setJobRole({ jobRole: '' });
        setState({ state: '' });
        setSearch(''),
            setApply(false);
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

    const onExportJobs = () => {
        dispatch(
            getJobsFilterForMain(
                pagePer, numberOfPage, state?.state ? state?.state : '', type?.type ? type?.type : '', jobRole?.jobRole ? jobRole?.jobRole : '', status, search, langIds.hindi, langIds.marathi),
        );
        setExportTog('single');
    };

    useEffect(() => {
        if (addJobPostModulData && addJobPostModulData.status === 200) {
            toast.success("Job import")
            dispatch(addBlukJobsSuccess(null));
            dispatch(getJobsFilterForMain(perPage, pageNumber, "", "", "", "", "", langIds.hindi, langIds.marathi));
        } else if (addJobPostModulData && addJobPostModulData.status !== 200) {
            toast.error("Somthing went wrong")
            dispatch(addBlukJobsSuccess(null))
        }
    }, [addJobPostModulData]);

    useEffect(() => {
        if (addBulkJobsError) {
            dispatch(addBlukJobsErr(null))
            toast.error("Something went wrong")
        }
    }, [addBulkJobsError])

    useEffect(() => {
        dispatch(getJobroles());
        dispatch(getStateData());
        dispatch(allJobsSuccess(null));
    }, []);

    useEffect(() => {
        if (stateJob.length && exportTog === 'single') {
            CSVLinkRef?.current?.link.click();
            toast.success('Job exported');
            setExportTog('');
        } else if (stateJob.length && exportTog === 'all') {
            CSVLinkRefAll?.current?.link.click();
            toast.success('Jobs exported');
            setExportTog('');
        } else if (!stateJob.length && exportTog) {
            toast.success('No data for export');
        }
    }, [exportTog]);

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
                        application_form: item?.application_form,
                        application_process: item?.application_process,
                        hospital_expenses_estimation_certificate: item?.hospital_expenses_estimation_certificate,
                        medical_superintendent: item?.medical_superintendent,
                        recommended_and_forwarded: item?.recommended_and_forwarded,
                    };
                }),
            );
        }
    }, [filterData]);

    const menu = (
        <Menu
            onClick={onClick}
            items={[
                {
                    label: 'Export jobs',
                    key: 'exportJobs',
                },
                {
                    label: 'Export all jobs',
                    key: 'exportAllJobs',
                },
                {
                    label: 'Add job post',
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
                        <CSVLink
                            headers={headerAll}
                            data={stateJobAll}
                            ref={CSVLinkRefAll}
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
                                                placeholder="Select type"
                                                onChange={e => onChangevalue(e, 'type')}
                                            >
                                                <Option value="">Select type</Option>
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
                                                placeholder="Select state"
                                                onChange={e => onChangevalue(e, 'state')}
                                            >
                                                <Option value="">Select state</Option>
                                                {stateData && stateData.data.map((item, i) => <Option key={i} value={item.id}> {item.name} </Option>)}
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col md={5} xs={24} className="mb-25">
                                    <Form layout="vertical">
                                        <Form.Item label="Job role">
                                            <Select
                                                size="large"
                                                value={jobRole.jobRole}
                                                className={jobRole.jobRole ? 'sDash_fullwidth-select' : 'select-option-typ-placeholder'}
                                                name="jobRole"
                                                placeholder="Select job role"
                                                onChange={e => onChangevalue(e, 'jobRole')}
                                            >
                                                <Option value="">Select job role</Option>
                                                {jobRolesData && jobRolesData.map((items, i) => <Option key={i} value={items.id}>{items.name} </Option>)}
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col md={5} xs={24} className="mb-25">
                                    <Form name="sDash_select" layout="vertical">
                                        <Form.Item label="Search">
                                            <Input placeholder="Search" name='search' value={search} onChange={(e) => onChangevalue(e.target.value, "search")} />
                                        </Form.Item>
                                    </Form>
                                </Col>

                                <Col md={4} xs={24} className="mb-25">
                                    <ListButtonSizeWrapper>
                                        <Button size="small" type="primary" onClick={() => {
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
                                <TabPane tab="Active jobs" key="active">
                                    {status === "active" && <JobListTable
                                        state={state}
                                        type={type}
                                        jobRole={jobRole}
                                        apply={apply}
                                        status={status}
                                        search={search}
                                        getJobData={setStateJob}
                                        setPagePer={setPagePer}
                                        setNumberOfPage={setNumberOfPage}
                                        setExportTog={setExportTog}
                                    />}
                                </TabPane>
                                <TabPane tab="Inactive jobs" key="inactive">
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
                                        getJobData={setStateJob}
                                    />}
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </Cards>
            </Main>
            {importModal && <ImportJobPost importModal={importModal} handleCancel={() => setImportModal(false)} modaltitle="Import Jobs" />}
        </>
    );
}

JobPost.propTypes = {
    match: PropTypes.object,
};

export default JobPost;
