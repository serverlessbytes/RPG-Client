import { Form, Input, Select, Table } from 'antd';
import React from 'react';
import { Button } from '../../components/buttons/buttons';
import { UserTableStyleWrapper } from '../pages/style';
import { TableWrapper } from '../styled';
import FeatherIcon from 'feather-icons-react';
import { useSelector } from 'react-redux';

const ActiveSchemesTable = ({type,...props}) => {

    const { users } = useSelector(state => {
        return {
            users: state.users,
        };
    });

    const { Option } = Select;
    const usersTableData = [];

    users.map(user => {
        const { id, name, designation, status } = user;

        return usersTableData.push({


            key: id,
            // user: name,
            Sequence: (
                <div className="user-info">
                    <Form name="sDash_select" layout="vertical">
                        <Form.Item name="basic-select" label="">
                            <Select className="sDash_fullwidth-select" style={{ width: 80, }} placeholder="1">
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">639</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </div>
            ),
            SchemeName: 'Mahatma Gandhi National',
            TypeOfBenefits: 'Business Development',
            TargetBeneficiary: "Target Beneficiary",
            Website: 'Website',
            Location: "Location",
            LastUpdated: 'Last Updated',
            action: (
                <div className='active-schemes-table'>
                    <div className="table-actions">
                        <>
                           { type === "Active" && <Button className="btn-icon" type="info" to="#" shape="circle">
                                <FeatherIcon icon="edit" size={16} />
                            </Button>}
                            <Button className="btn-icon" type="warning" to="#" shape="circle">
                                <FeatherIcon icon="file" size={16} />
                            </Button>
                            { type === 'Active' && <Button className="btn-icon" type="success" to="#" shape="circle">
                                <FeatherIcon icon="star" size={16} />
                            </Button>}
                        </>
                    </div>
                </div>
            ),
        });
    });


    const usersTableColumns = [

        {
            title: 'Sequence',
            dataIndex: 'Sequence',
            sorter: (a, b) => a.Sequence.length - b.Sequence.length,
            sortDirections: ['descend', 'ascend'],
        },
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
            title: 'Location',
            dataIndex: 'Location',
            sorter: (a, b) => a.status.length - b.status.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Last Updated',
            dataIndex: 'LastUpdated',
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            width: '90px',
        },

    ];

    const rowSelection = {
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };


    return (
        <UserTableStyleWrapper>
            <TableWrapper className="table-responsive">

                <Form name="sDash_select" layout="vertical">
                    <Form.Item name="search" label="">
                        <Input placeholder="search"  style={{ width: 200 }}/>
                    </Form.Item>
                </Form>

                <Table
                    // rowSelection={rowSelection}
                    dataSource={usersTableData}
                    columns={usersTableColumns}
                    pagination={{
                        defaultPageSize: 5,
                        total: usersTableData.length,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    }}
                />
            </TableWrapper>
        </UserTableStyleWrapper>
    )
}

export default ActiveSchemesTable