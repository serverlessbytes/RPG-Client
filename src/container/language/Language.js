import React, { useState } from 'react'
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import FeatherIcon from 'feather-icons-react';
import { Modal } from '../../components/modals/antd-modals';
import { Form,Input  } from 'antd';
import { useDispatch } from 'react-redux';
import { postLanguageData } from '../../redux/language/actionCreator';

const Language = () => {


    const [data, setData] = useState({
        name: '',
        // sequence: 0
    })
    const dispatch =useDispatch()

    const [form] = Form.useForm()
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        const data = form.getFieldsValue()
        console.log("======><=====", data);
        dispatch(postLanguageData(data))
        setIsModalVisible(false)
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    return (
        <>
            <PageHeader
                ghost
                title="Language"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Button size="small" type="primary"  onClick={showModal}>
                            <FeatherIcon icon="plus" size={14} />
                            Add Language
                        </Button>
                    </div>
                ]}
            />

            <Modal
                onOk={()=>handleOk()}
                visible={isModalVisible}
                onCancel={()=>handleCancel()}
                title="Add language"
            > 
                <Form name="language" form={form} layout="vertical">
                    <label htmlFor="name">Language</label>
                    <Form.Item name="name">
                        <Input
                            placeholder="Enter Language"
                            name="name"
                            defaultValue={data.name}
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
            </Modal>
        </>
    )
}

export default Language