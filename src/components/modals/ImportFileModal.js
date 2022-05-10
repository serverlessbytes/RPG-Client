import { Button, Col, Form, Input, Modal, Row, Select, Table } from 'antd'
import React from 'react'

const ImportFileModal = ({ importModal, handleCancel, modaltitle }) => {

    const { Option } = Select;

    const usersTableData = [];

    const usersTableColumns = [

        {
            title: 'Scheme Name',
            dataIndex: 'SchemeName',
            sorter: (a, b) => a.SchemeName.length - b.SchemeName.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Type Of Benefits',
            dataIndex: 'TypeOfBenefits',
        },
        {
            title: 'Target Beneficiary',
            dataIndex: 'TargetBeneficiary',
        },
        {
            title: 'Website',
            dataIndex: 'Website',
        },
        {
            title: 'Last Updated',
            dataIndex: 'LastUpdated',
        },
        {
            title: 'Approved',
            dataIndex: 'approved',
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            width: '90px',
        },
    ];


    return (
        <>
            <Col md={16}>
                <Modal
                    type="primery"
                    title={modaltitle}
                    visible={importModal}
                    // onOk={handleOk}
                    onCancel={handleCancel}
                    width={'991px'}
                >

                    <Row gutter={30}>
                        <Col md={12} xs={24} className="mb-25">
                            <Form.Item name="name">
                                <Input
                                    placeholder="File upload"
                                    name="name"
                                    type="file"
                                />
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24} className="mb-25">
                            <Button onClick={() => {}} type="primary">
                                Import
                            </Button>
                        </Col>
                        <Col md={12} xs={24} className="mb-25">
                            <Form layout="vertical">
                                <Form.Item label="Scheme Category">
                                    <Select
                                        size="large"
                                        className='sDash_fullwidth-select '
                                        name="category"
                                        onChange={() => { }}
                                        placeholder="Select Scheme Category"
                                    >
                                        <Option value="">Select Scheme Category</Option>
                                    </Select>
                                </Form.Item>
                            </Form>
                        </Col>
                        <Col md={12} xs={24} className="mb-25">
                            <Form layout="vertical">
                                <Form.Item label="Scheme Benefits">
                                    <Select
                                        size="large"
                                        className='sDash_fullwidth-select'
                                        name="benefits"
                                        onChange={() => { }}
                                        placeholder="Select Scheme Benefits"
                                    >
                                        <Option value="">Select Scheme Benefits</Option>
                                    </Select>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>

                    <Table
                        dataSource={usersTableData}
                        columns={usersTableColumns}
                    />
                </Modal>
            </Col>
        </>
    )
}

export default ImportFileModal