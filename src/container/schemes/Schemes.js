import React, { useState } from 'react';
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import FeatherIcon from 'feather-icons-react';
import { ListButtonSizeWrapper, Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Col, Form, Row, Select } from 'antd';
import ActiveSchemesTable from './ActiveSchemesTable';
import { useHistory } from "react-router-dom";
import {  useRouteMatch } from 'react-router-dom';

const Schemes = () => {
    const { path } = useRouteMatch();
    let history = useHistory();
    const { Option } = Select;
    const [type, setType] = useState("Active")

    const reDirect = () =>{
        history.push(`${path}/addscheme`);
    }

    return (
        <>
            <PageHeader
                ghost
                title="Schemes"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Button size="small" type="link">
                            Export Schemes
                        </Button>
                        <Button size="small" type="light">
                            Import Schemes
                        </Button>
                        <Button onClick = {reDirect} size="small" type="success">
                            Create Scheme
                        </Button>
                        <Button size="small" type="warning">
                            Deactivate All Schemes
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
                                        <Form.Item name="basic-select" label="Language">
                                            <Select size="large" className="sDash_fullwidth-select" placeholder="Select">
                                                <Option value="1">All </Option>
                                                <Option value="2">Einglish</Option>
                                                <Option value="3">Hindi</Option>
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col md={6} xs={24} className="mb-25">
                                    <Form name="sDash_select" layout="vertical">
                                        <Form.Item name="basic-select" label="Type of Benefits">
                                            <Select size="large" className="sDash_fullwidth-select" placeholder="Select">
                                                <Option value="1">All</Option>
                                                <Option value="2">  Food, Shelter & Financial aid </Option>
                                                <Option value="3"> Education & Training </Option>
                                                <Option value="4">  Agriculture & Fisheries </Option>
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col md={6} xs={24} className="mb-25">
                                    <Form name="sDash_select" layout="vertical">
                                        <Form.Item name="basic-select" label="Location">
                                            <Select size="large" className="sDash_fullwidth-select" placeholder="Select">
                                                <Option value="2">  All India </Option>
                                                <Option value="3">  Andra Pradesh  </Option>
                                                <Option value="4">  Assam  </Option>
                                                <Option value="5">  Chandigarh  </Option>
                                                <Option value="6">  Dadar and Nagar Haveli   </Option>
                                                <Option value="7">   Daman and Diu   </Option>
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
                                    Active Schemes
                                </Button>
                                <Button size="small" type={type === "Inactive" ? "primary" : "light"} onClick={() => setType("Inactive")}>
                                    Inactive Schemes
                                </Button>
                            </Row>
                             <ActiveSchemesTable type ={type}/>
                        </Col>
                    </Row>
                </Cards>
            </Main>
        </>
    )
}

export default Schemes