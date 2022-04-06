import React from 'react';
import { PageHeader } from '../../components/page-headers/page-headers';
import PropTypes from 'prop-types';
import FeatherIcon from 'feather-icons-react';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';
import { ListButtonSizeWrapper, TableWrapper } from '../styled';
import { Col, Form, Row, Badge, Select, Tabs } from 'antd';
import JobListTable from './JobListTable';
import {useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Cards } from '../../components/cards/frame/cards-frame';

const JobPost = ({ match }) => {
    const { Option } = Select;
    const history = useHistory();
    const { TabPane } = Tabs;

    const callback = (key) => {
        //     console.log(key);
    };
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

                            <Tabs defaultActiveKey="1" onChange={callback}>
                                <TabPane tab="Active Courses" key="1">
                                    <JobListTable />
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