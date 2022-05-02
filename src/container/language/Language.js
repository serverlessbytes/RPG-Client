import React, { useEffect, useState } from 'react'
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import FeatherIcon from 'feather-icons-react';
import { Modal } from '../../components/modals/antd-modals';
import { Form, Input, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getLanguageData, postLanguageData } from '../../redux/language/actionCreator';
import { Main, ProjectPagination, TableWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { UserTableStyleWrapper } from '../pages/style';
import actions from '../../redux/language/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Language = () => {
    const {
        postLanguageSuccess,postLanguageDataErr,
      } = actions;
    const [languageTableData, setLanguageTableData] = useState([])
    const [addLanguageData, setAddLanguageData] = useState({
        name: '',
        sequence: 0
    })
    const languageData = useSelector((state) => state.language.getLanguageData);
    const postLanguagedata = useSelector((state) => state.language.postLanguageData);
    const LanguageError = useSelector((state) => state.language.LanguageError);

    useEffect(() => {
       console.log("postLanguagedata",postLanguagedata)
    }, [postLanguagedata])

    const dispatch = useDispatch()

    const [form] = Form.useForm()
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        if (languageData && languageData.data) {
            setLanguageTableData(languageData.data)
        }
    }, [languageData])

    useEffect(() => {
        if (postLanguagedata && postLanguagedata.status  ===  200) {
            dispatch(postLanguageSuccess(null))
            toast.success("Language Add successful");
        }
      }, [postLanguagedata])

      useEffect(()=>{
        if(LanguageError){ 
            dispatch(postLanguageDataErr(null))
          toast.error("Something Wrong")
        }
      },[LanguageError])

    useEffect(() => {
        dispatch(getLanguageData())
    }, [])

    const languagesTableColumns = [
        {
            title: 'Language',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend', 'ascend'],
        }
    ];

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        const data = form.getFieldsValue()
        dispatch(postLanguageData(data))
        form.resetFields()
        setIsModalVisible(false)
    };

    const handleCancel = () => {
        form.resetFields()
        setIsModalVisible(false);
    };


    return (
        <>
            <PageHeader
                ghost
                title="Language"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Button size="small" type="primary" onClick={showModal}>
                            {/* <FeatherIcon icon="plus" size={14} /> */}
                            Add Language
                        </Button>
                    </div>
                ]}
            />
            <Main >
                <Cards headless>
                    <UserTableStyleWrapper>
                        <TableWrapper className="table-responsive pb-30">

                            {/* <Form name="sDash_select" layout="vertical">
                                <Form.Item name="search" label="">
                                    <Input placeholder="search" style={{ width: 200 }} />
                                </Form.Item>
                            </Form> */}

                            <Table
                                // rowSelection={rowSelection}
                                dataSource={languageTableData}
                                columns={languagesTableColumns}
                                pagination={false}
                            />

                        </TableWrapper>
                    </UserTableStyleWrapper>
                </Cards>
            </Main>


            {isModalVisible &&
                <Modal
                    onOk={() => handleOk()}
                    visible={isModalVisible}
                    onCancel={() => handleCancel()}
                    title="Add language"
                >
                    <Form name="language" form={form} layout="vertical">
                        <label htmlFor="name">Language</label>
                        <Form.Item name="name">
                            <Input
                                placeholder="Enter Language"
                                name="name"
                                defaultValue={addLanguageData.name}
                            />
                        </Form.Item>
                        <label htmlFor="sequence">Sequence</label>
                        <Form.Item name="sequence">
                            <Input
                                type="number"
                                placeholder="Enter sequence"
                                name="sequence"
                                defaultValue={addLanguageData.sequence}
                            />
                        </Form.Item>
                        {/* <label htmlFor="name">Sequence</label>
                    <Form.Item name="sequence">
                        <Input
                            type="number"
                            placeholder="Enter Sequence"
                            name="key"
                            defaultValue={data.sequence}
                        />
                    </Form.Item> */}
                    </Form>
                </Modal>}
        </>
    )
}

export default Language