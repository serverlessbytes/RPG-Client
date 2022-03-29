import React, { Suspense, useState } from 'react';
import { PageHeader } from '../../components/page-headers/page-headers';
import PropTypes from 'prop-types';
import FeatherIcon from 'feather-icons-react';
// import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
// import { Badge, Col, Row } from 'antd';
import { Main } from '../styled';
import { UL, Content } from '../chat/style';
import { ListButtonSizeWrapper, TableWrapper } from '../styled';
import { Col, Form, Row, Badge, Select, Table, Skeleton } from 'antd';
import JobListTable from './JobListTable';
import { NavLink, Route, Switch, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Cards } from '../../components/cards/frame/cards-frame';
import Scrollbars from 'react-custom-scrollbars';
import { useSelector } from 'react-redux';

const JobPost = ({ match }) => {
    const { Option } = Select;
    const [type, setType] = useState("Active")
    const history=useHistory()

    return (
        <>
            <PageHeader
                ghost
                title="Job"
                buttons={[
                    <div key="1" className="page-header-actions">
                        {/* <CalendarButtonPageHeader />
                        <ExportButtonPageHeader />
                        <ShareButtonPageHeader /> */}
                        <Button size="small" onClick={()=>{history.push("new")}} type="primary">
                            <FeatherIcon icon="plus" size={14} />
                            Add New
                        </Button>
                    </div>,
                ]}
            />
            <Main >
                <Cards headless>
                    <Row gutter={15}>
                        <Col xs={24}>
                            <Row gutter={30}>
                                <Col md={6} xs={24} className="mb-25">
                                    <Form name="sDash_select" layout="vertical">
                                        <Form.Item name="basic-select" label="State">
                                            <Select size="large" className="sDash_fullwidth-select" placeholder="Select">
                                                <Option value="1">All india</Option>
                                                <Option value="2">Gujrat</Option>
                                                <Option value="3">Bihar</Option>
                                                <Option value="4">Assam</Option>
                                                <Option value="5">Delhi</Option>
                                                <Option value="6">Goa</Option>
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col md={6} xs={24} className="mb-25">
                                    <Form name="sDash_select" layout="vertical">
                                        <Form.Item name="basic-select" label="Employer">
                                            <Select size="large" className="sDash_fullwidth-select" placeholder="Select">
                                                <Option value="1">All</Option>
                                                <Option value="2"> Manipal Hospital </Option>
                                                <Option value="3"> K.j memorial hospital </Option>
                                                <Option value="4"> Ananat hospital </Option>
                                                <Option value="5"> Rishab Hospital  </Option>
                                                <Option value="6"> Suvidha Hospital </Option>
                                                <Option value="7"> Daksh Foundation </Option>
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col md={6} xs={24} className="mb-25">
                                    <Form name="sDash_select" layout="vertical">
                                        <Form.Item name="basic-select" label="Job Role">
                                            <Select size="large" className="sDash_fullwidth-select" placeholder="Select">
                                                <Option value="1">All</Option>
                                                <Option value="2"> General Duty Assistant </Option>
                                                <Option value="3"> Nursing </Option>
                                                <Option value="4">  Tipper Truck Driver </Option>
                                                <Option value="5"> Health Executive </Option>
                                                <Option value="6">  Nursing Assistant  </Option>
                                                <Option value="7">  Vaccination Registration Assistant  </Option>
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col md={6} xs={24} className="mb-25">
                                    <ListButtonSizeWrapper>
                                        <Button size="small" type="primary">
                                            Apply
                                        </Button>
                                        <Button size="small" type="light">
                                            Clear
                                        </Button>
                                    </ListButtonSizeWrapper>
                                </Col>
                            </Row>
                            <Row className="mb-25">
                                <Button size="small" type={type === "Active" ? "primary" : "light"} onClick={() => setType("Active")}>
                                    Active Jobs
                                </Button>
                                <Button size="small" type={type === "Inactive" ? "primary" : "light"} onClick={() => setType("Inactive")}>
                                    Inactive Jobs
                                </Button>
                            </Row>
                            {type === "Active" ? <JobListTable /> : ""}
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