import { Form, Input, Modal, Pagination, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { UserTableStyleWrapper } from '../pages/style';
import { Main, ProjectPagination, TableWrapper } from '../styled';
import FeatherIcon from 'feather-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { editCategoryData, getCategoryData, postCategoryData } from '../../redux/course/actionCreator';
import uuid from 'react-uuid';
import { editBenefitsData } from '../../redux/benefitsType/actionCreator';

const CourseCategory = () => {

    const [dataForEdit, setDataForEdit] = useState(); //foredit
    const dispatch = useDispatch();
    const usersTableData = [];
    const [form] = Form.useForm()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { users } = useSelector(state => {
        return {
            users: state.users,
        };
    });
 
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const onDelete = (id) => {
        let dataForDelete = getcategoryData && getcategoryData.data && getcategoryData.data.find((item) => item.id === id)
        //console.log("-----",dataForDelete)
        if (dataForDelete) {
            delete dataForDelete.key
            delete dataForDelete.id     
            dataForDelete = {
                ...dataForDelete,
                categoryId : id,
                isActive: false,
                isDeleted: true
            }
            dispatch(editCategoryData(dataForDelete))
        }
    }

    const onEdit = (id) => {
        let dataForEdit = getcategoryData && getcategoryData.data && getcategoryData.data.find((item) => item.id === id)
        console.log("", dataForEdit);
        if (dataForEdit) {
            setDataForEdit(dataForEdit)
            form.setFieldsValue({
                ...dataForEdit,
                name: dataForEdit.name,
            })
        }
        // dispatch(editBenefitsData(dataForEdit))
        setIsModalVisible(true)

    }

    const handleOk = () => {
        let data = form.getFieldsValue()
        if(dataForEdit){
            let data = form.getFieldsValue() //get value from form field
                    //console.log("========>data<==========", data);
                    delete data.key;

                    data = {
                        
                        ...data, 
                        id: dataForEdit.id, 
                        "isActive": true,
                        "isDeleted": false
                    }
                    dispatch(editBenefitsData(data))
                    console.log("data",data) 
        }
        else{
            //console.log("========>data<==========", data);
            data = {
                ...data,
                key: uuid()
            }
           // console.log("dataaaaaaaaaa", data)
            dispatch(postCategoryData(data))
    
            setIsModalVisible(false);
        }
   
    };
    // const handleOk = () => {
    //     if (dataForEdit) {
    //         let data = form.getFieldsValue() //get value from form field
    //         //console.log("========>data<==========", data);
    //         //delete data.key;
    //         data = {
    //             ...data, 
    //             id: dataForEdit.id, 
    //             "isActive": true,
    //             "isDeleted": false
    //         }
    //         dispatch(editBenefitsData(data))
    //         console.log("data",data) 
    //     }
    //     else {
    //         let data = form.getFieldsValue()
    //         //console.log("========>data<==========", data);
    //         data = {
    //             ...data,
    //             key: uuid()
    //         }
    //         dispatch(postBenefitsData(data))
    //         console.log("data", data)
    //     }
    //     form.resetFields()
    //     setIsModalVisible(false);

    // };
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

    useEffect(() => {
        dispatch(getCategoryData())
        // console.log("getCategoryData",getCategoryData); 
    }, [])

    const getcategoryData = useSelector((state) => state.category.categoryData)
    useEffect(() => {
        console.log("getcategoryData", getcategoryData);
    }, [getcategoryData])

    getcategoryData && getcategoryData.data.map((item) => {
        // const { id, name, designation, status } = user;

        return usersTableData.push({
            Category: item.name,
            // Sequence: '7',
            action: (
                <div className='active-schemes-table'>
                    <div className="table-actions">
                        <>
                            <Button className="btn-icon" type="info" onClick={() => onEdit(item.id)} to="#" shape="circle">
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

    const usersTableColumns = [
        {
            title: 'Category',
            dataIndex: 'Category',
            sortDirections: ['descend', 'ascend'],
        },
        // {
        //     title: 'Sequence',
        //     dataIndex: 'Sequence',
        // },
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
                title="Course Category"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Button className="btn-signin ml-10" type="primary" size="medium" onClick={showModal}>
                            Add Category
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

            <Modal title="Add Course Category" visible={isModalVisible} onOk={() => handleOk()} onCancel={() => handleCancel()}>
                <Form name="login" form={form} layout="vertical">
                    <label htmlFor="name">Type of Category</label>
                    <Form.Item name="name">
                        <Input
                            placeholder=""
                            name="name"
                        />
                    </Form.Item>
                    {/* <label htmlFor="name">Sequence</label>
                    <Form.Item name="key">
                        <Input
                            placeholder=""
                            name="key"
                        />
                    </Form.Item> */}
                </Form>

            </Modal>
        </>
    )
}

export default CourseCategory