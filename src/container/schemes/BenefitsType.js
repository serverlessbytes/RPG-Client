import { Form, Input, Modal, Pagination, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { UserTableStyleWrapper } from '../pages/style';
import { Main, ProjectPagination, TableWrapper } from '../styled';
import FeatherIcon from 'feather-icons-react';
import ActiveSchemesTable from './ActiveSchemesTable'
import { useDispatch, useSelector } from 'react-redux';
import { postBenefitsData } from '../../redux/benefitsType/actionCreator';

const BenefitsType = () => {

    const usersTableData = [];
    const [data, setData] = useState({
        name: '',
        sequence: 0
    })
    const dispatch =useDispatch()

    const [form] = Form.useForm()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { users } = useSelector(state => {
        return {
            users: state.users,
        };
    });
    const languageData=useSelector((state)=>state.language.getLanguageData)

    useEffect(() => {
      console.log("=====>languageData<====",languageData);
    }, [languageData])
    

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleOk = () => {
        const data = form.getFieldValue()
        console.log("========>data<==========", data);
        dispatch(postBenefitsData(data))
        setIsModalVisible(false);
    };

    const [state, setState] = useState({
        projects: usersTableData,
        current: 0,
        pageSize: 0,
    });

    const onShowSizeChange = (current, pageSize) => {
        setState({ ...state, current, pageSize });
    };

    const onHandleChange = (current, pageSize) => {
        // You can create pagination in here
        setState({ ...state, current, pageSize });
    };

    users.map(user => {
        const { id, name, designation, status } = user;

        return usersTableData.push({
            Typeofbenefit: 'Agriculture & Fisheries',
            Sequence: '7',
            action: (
                <div className='active-schemes-table'>
                    <div className="table-actions">
                        <>
                            <Button className="btn-icon" type="info" to="#" shape="circle">
                                <FeatherIcon icon="edit" size={16} />
                            </Button>
                            <Button className="btn-icon" type="danger" to="#" shape="circle">
                                <FeatherIcon icon="x-circle" size={16} />
                            </Button>
                        </>
                    </div>
                </div>
            ),
        });
    });

    const usersTableColumns = [
        {
            title: 'Type Of Benefit',
            dataIndex: 'Typeofbenefit',
            sorter: (a, b) => a.Typeofbenefit.length - b.Typeofbenefit.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Sequence',
            dataIndex: 'Sequence',
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            width: '90px',
        },
    ];
    return (
        <>
            <PageHeader
                ghost
                title="Type of Benefits"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Button className="btn-signin ml-10" type="primary" size="medium" onClick={showModal}>
                            Add Benefits
                        </Button>
                    </div>
                ]}
            />
            <Main >
                <Cards headless>
                    <UserTableStyleWrapper>
                        <TableWrapper className="table-responsive pb-30">

                            <Form name="sDash_select" layout="vertical">
                                <Form.Item name="search" label="">
                                    <Input placeholder="search" style={{ width: 200 }} />
                                </Form.Item>
                            </Form>

                            <Table
                                // rowSelection={rowSelection}
                                dataSource={usersTableData}
                                columns={usersTableColumns}
                                pagination={false}
                            />

                        </TableWrapper>
                    </UserTableStyleWrapper>
                        <ProjectPagination>
                            {usersTableData.length ? (
                                <Pagination
                                    onChange={onHandleChange}
                                    showSizeChanger
                                    onShowSizeChange={onShowSizeChange}
                                    pageSize={10}
                                    defaultCurrent={1}
                                    total={10}
                                />
                            ) : null}
                        </ProjectPagination>
                </Cards>
            </Main>

            <Modal title="Add Benefit Type" visible={isModalVisible} onOk={() => handleOk()} onCancel={() => handleCancel()}>
                <Form name="login" form={form} layout="vertical">
                    <label htmlFor="name">Type of Benefit</label>
                    <Form.Item name="name">
                        <Input
                            placeholder=""
                            name="name"
                        />
                    </Form.Item>
                    <label htmlFor="name">Sequence</label>
                    <Form.Item name="key">
                        <Input
                            placeholder=""
                            name="key"
                        />
                    </Form.Item>
                    {/* <Form.Item name="languageId" label="Language">
                        <Select style={{ height: "50px" }} size="large" defaultValue="Language" className="sDash_fullwidth-select" >
                        {
                            languageData && languageData.data.map((item)=>(
                                <Option value={item.id}> {item.name} </Option>
                            ))
                        }
                        </Select>
                    </Form.Item> */}
                </Form>

            </Modal>
        </>
    )
}

export default BenefitsType