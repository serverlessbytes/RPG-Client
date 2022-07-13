import { Form, Input, Modal, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { UserTableStyleWrapper } from '../pages/style';
import { Main, TableWrapper } from '../styled';
import FeatherIcon from 'feather-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { editBenefitsData, getBenefitsData, postBenefitsData } from '../../redux/benefitsType/actionCreator';
import uuid from 'react-uuid';
import { toast } from 'react-toastify';
import actions from '../../redux/benefitsType/actions';
import { ApiPost } from '../../helper/API/ApiData';
import ImportSchemeBenefits from '../../components/modals/ImportSchemeBenefits';

const BenefitsType = () => {
    const { editBenefitsSuccess, editBenefitsErr, postBenefitsSuccess, postBenefitsErr, addSchemeBenefitBulkSuccess, addSchemeBenefitBulkErr } = actions;
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const [benifitsTableData, setBenifitsTableData] = useState([]);
    const [dataForEdit, setDataForEdit] = useState(); //foredit
    const [importModal, setImportModal] = useState(false);
    const [error, setError] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [nameTog, setNameTog] = useState(false)

    const getBenefitData = useSelector((state) => state.beneFit.getBenefitData)
    const editBenefitData = useSelector((state) => state.beneFit.editBenefitData)
    const postBenefitsdata = useSelector((state) => state.beneFit.postBenefitsData)
    const postBenefitsError = useSelector((state) => state.beneFit.postBenefitsError)
    const editBenefitError = useSelector((state) => state.beneFit.editBenefitError)
    const addSchemeBenefitBulkData = useSelector(state => state.beneFit.addSchemeBenefitBulkData)
    const addSchemeBenefitBulkError = useSelector(state => state.beneFit.addSchemeBenefitBulkErr)

    useEffect(() => {
        if (addSchemeBenefitBulkData && addSchemeBenefitBulkData.status === 200) {
            dispatch(addSchemeBenefitBulkSuccess(null))
            toast.success("Scheme imported");
        }
    }, [addSchemeBenefitBulkData])

    useEffect(() => {
        if (addSchemeBenefitBulkError) {
            dispatch(addSchemeBenefitBulkErr(null))
            toast.error("Benifit already exists");
        }
    }, [addSchemeBenefitBulkError])

    useEffect(() => {
        if (postBenefitsdata && postBenefitsdata.status === 200) {
            dispatch(getBenefitsData())
            dispatch(postBenefitsSuccess(null))
            toast.success("Scheme benifit added");
        }
    }, [postBenefitsdata])

    useEffect(() => {
        dispatch(getBenefitsData())
    }, []);

    useEffect(() => {
        if (postBenefitsError) {
            dispatch(postBenefitsErr(null))
            toast.success("Scheme benifit already exists");
        }
    }, [postBenefitsError])

    useEffect(() => {
        if (editBenefitData && editBenefitData.status === 200) {
            dispatch(editBenefitsSuccess(null))
            toast.success("Scheme benifit updated");
        }
    }, [editBenefitData])

    useEffect(() => {
        if (editBenefitError) {
            dispatch(editBenefitsErr(null))
            toast.error("Something went wrong");
        }
    }, [editBenefitError])

    const newBenefites = dataForEdit => {
        const newVal = ApiPost(`scheme/editSchemeBenifit`, dataForEdit)
            .then((res) => {
                if (res.status === 200) {
                    dispatch(getBenefitsData())
                }
                return res;
            })
        return newVal
    }

    const onDelete = async (id) => {
        let dataForDelete = getBenefitData && getBenefitData.data && getBenefitData.data.find((item) => item.id === id)
        if (dataForDelete) {
            delete dataForDelete.key
            dataForDelete = {
                ...dataForDelete,
                isActive: false,
                isDeleted: true
            }
            const deleteBenifts = await newBenefites(dataForDelete)
            if (deleteBenifts.status === 200) {
                toast.success("Scheme benifit deleted")
            }
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
            setNameTog(true)
        }
        setIsModalVisible(true)

    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const importModel = () => {
        setImportModal(true)
    }

    const handleCancel = () => {
        form.resetFields();
        setIsModalVisible(false);
        setNameTog(false)
        setDataForEdit(null)
        setError('')
    };

    const validation = (data) => {
        let error = {};
        let flag = false;

        if (!data.name) {
            error.name = "Benefit type is required";
            flag = true;
        }
        setError(error);
        return flag
    }

    const handleOk = () => {
        let data = form.getFieldsValue() //get value from form field
        if (validation(data)) {
            return
        }
        if (dataForEdit) {
            //delete data.key;
            data = {
                ...data,
                id: dataForEdit.id,
                "isActive": true,
                "isDeleted": false
            }
            dispatch(editBenefitsData(data))
        }
        else {
            let data = form.getFieldsValue()
            data = {
                ...data,
                key: uuid()
            }
            dispatch(postBenefitsData(data))
        }
        form.resetFields()
        handleCancel()
    };

    useEffect(() => {
        if (getBenefitData && getBenefitData.data) {
            setBenifitsTableData(getBenefitData.data.map((item) => {
                return {
                    Typeofbenefit: item.name,
                    action: (
                        <div className='active-schemes-table'>
                            <div className="table-actions">
                                <>
                                    <Button className="btn-icon" type="info" to="#" onClick={() => onEdit(item.id)} shape="circle">
                                        <FeatherIcon icon="edit" size={16} />
                                    </Button>
                                    <Button className="btn-icon" type="danger" onClick={() => onDelete(item.id)} to="#" shape="circle">
                                        <FeatherIcon icon="trash-2" size={16} />
                                    </Button>
                                </>
                            </div>
                        </div>
                    ),
                };
            }))
        }
    }, [getBenefitData])

    const usersTableColumns = [
        {
            title: 'Type of benefit',
            dataIndex: 'Typeofbenefit',
            sorter: (a, b) => a.Typeofbenefit.localeCompare(b.Typeofbenefit),
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
                title="Type of benefits"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Button className="btn-signin ml-10" type="primary" size="medium" onClick={showModal}>
                            Add benefits
                        </Button>
                        <Button className="btn-signin ml-10" type="primary" size="medium" onClick={importModel}>
                            Import
                        </Button>
                    </div>

                ]}
            />
            <Main >
                <Cards headless>
                    <UserTableStyleWrapper>
                        <TableWrapper className="table-responsive pb-30">
                            <Table
                                dataSource={benifitsTableData}
                                columns={usersTableColumns}
                                pagination={false}
                            />
                        </TableWrapper>
                    </UserTableStyleWrapper>
                </Cards>
            </Main>

            <Modal title="Benefit Type" visible={isModalVisible} onOk={() => handleOk()} onCancel={() => handleCancel()}
                okText={nameTog ? "Edit" : "Add"}>
                <Form name="login" form={form} layout="vertical">
                    <label htmlFor="name">Type of benefit</label>
                    <Form.Item name="name" className='mb-0'>
                        <Input
                            placeholder="Type of benefit"
                            name="name"
                        />
                    </Form.Item>
                    {
                        error.name && <span style={{ color: "red" }}>{error.name}</span>
                    }
                </Form>
            </Modal>

            {
                <ImportSchemeBenefits
                    importModal={importModal}
                    modaltitle="Import scheme benefits"
                    handleCancel={() => setImportModal(false)}
                />
            }
        </>
    )
}

export default BenefitsType