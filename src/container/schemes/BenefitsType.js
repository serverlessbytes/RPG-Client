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
import { editBenefitsData, getBenefitsData, postBenefitsData } from '../../redux/benefitsType/actionCreator';
import uuid from 'react-uuid';
import { toast } from 'react-toastify';
import actions from '../../redux/benefitsType/actions';

const BenefitsType = () => {
    const {editBenefitsSuccess} = actions;

    const usersTableData = [];
    //const [form] = Form.useForm()
    const [dataForEdit, setDataForEdit] = useState(); //foredit

    const getBenefitData = useSelector((state) => state.beneFit.getBenefitData)
    const editBenefitData = useSelector((state) => state.beneFit.editBenefitData)
    useEffect(() => {
    }, [getBenefitData]);
    const dispatch = useDispatch();

    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { users } = useSelector(state => {
        return {
            users: state.users,
        };
    });
    const languageData = useSelector((state) => state.language.getLanguageData);

    useEffect(() => {
        console.log('editBenefitData', editBenefitData)
        if (editBenefitData && editBenefitData.message === 'Scheme Benifit updated successfully.') {
            dispatch(editBenefitsSuccess(null))
            toast.success(editBenefitData.message);
            //toastAssetsAdd(true)
            //onHide()
        }
    }, [editBenefitData])  
    
    useEffect(() => {
        dispatch(getBenefitsData())
    }, []);

    const onDelete = (id) => {
        let dataForDelete = getBenefitData && getBenefitData.data && getBenefitData.data.find((item) => item.id === id)
        if (dataForDelete) {
            delete dataForDelete.key
            dataForDelete = {
                ...dataForDelete,
                isActive: false,
                isDeleted: true
            }
            dispatch(editBenefitsData(dataForDelete))
        }
    }
    const onEdit = (id) => {
        let dataForEdit = getBenefitData && getBenefitData.data && getBenefitData.data.find((item) => item.id === id)
        if (dataForEdit) {
            setDataForEdit(dataForEdit)
            form.setFieldsValue({
                ...dataForEdit,
                name: dataForEdit.name,
            })
        }
        //dispatch(editBenefitsData(dataForEdit))
        setIsModalVisible(true)

    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalVisible(false);
    };

    const handleOk = () => {
        if (dataForEdit) {
            let data = form.getFieldsValue() //get value from form field
            //console.log("========>data<==========", data);
            //delete data.key;
            data = {
                ...data, 
                id: dataForEdit.id, 
                "isActive": true,
                "isDeleted": false
            }
            dispatch(editBenefitsData(data))
            console.log("data",data) 
        }
        else {
            let data = form.getFieldsValue()
            //console.log("========>data<==========", data);
            data = {
                ...data,
                key: uuid()
            }
            dispatch(postBenefitsData(data))
            console.log("data", data)
        }
        form.resetFields()
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

    // users.map(user => {
    //     const {  } = user;

    //useEffect(() =>{
    getBenefitData && getBenefitData.data.map((item) => {
        return usersTableData.push({
            Typeofbenefit: item.name,
            action: (
                <div className='active-schemes-table'>
                    <div className="table-actions">
                        <>
                            <Button className="btn-icon" type="info" to="#" onClick={() => onEdit(item.id)} shape="circle">
                                <FeatherIcon icon="edit" size={16} />
                            </Button>
                            <Button className="btn-icon" type="danger" onClick={() => onDelete(item.id)} to="#" shape="circle">
                                <FeatherIcon icon="x-circle" size={16} />
                            </Button>
                        </>
                    </div>
                </div>
            ),
        });
    });
     //},[getBenefitData])

    const usersTableColumns = [
        {
            title: 'Type Of Benefit',
            dataIndex: 'Typeofbenefit',
            sorter: (a, b) => a.Typeofbenefit.length - b.Typeofbenefit.length,
            sortDirections: ['descend', 'ascend'],
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
                    {/* <ProjectPagination>
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
                    </ProjectPagination> */}
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
                </Form>

            </Modal>
        </>
    )
}

export default BenefitsType