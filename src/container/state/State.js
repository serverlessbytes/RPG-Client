
import React, { useState } from 'react'
import { PageHeader } from '../../components/page-headers/page-headers';
import FeatherIcon from 'feather-icons-react';
import { Button } from '../../components/buttons/buttons';
import { Form, Input, Modal, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { postStateData } from '../../redux/state/actionCreator';

const State = () => {

    const [data, setData] = useState({
        name: '',
        key: ''
    })

    const dispatch=useDispatch()

    const [form] = Form.useForm()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        const data = form.getFieldsValue()
        console.log('data', data)
        dispatch(postStateData(data))
        // setIsModalVisible(false);
        
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onChangeHandler = (e) => {
        console.log("e",e);
        // setData({[]
            
        // })
        // setData({name:})
    }
    return (
        <>
            <PageHeader
                ghost
                title="State"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Button size="small" type="primary" onClick={showModal}>
                            <FeatherIcon icon="plus" size={14} />
                            Add state
                        </Button>
                    </div>
                ]}
            />

            <Modal title="Enter State" visible={isModalVisible} onOk={() => handleOk()} onCancel={() => handleCancel()}>
                <Form name="login" form={form} layout="vertical">
                    {/* <Form.Item> */}
                        <label htmlFor="name">State</label>
                        <Form.Item name="name">
                        <Input
                            placeholder="Enter State"
                            name="name"
                            defaultValue={data.name}
                            // onChange={(e)=>{onChangeHandler(e)}}
                        />
                        </Form.Item>
                        <label htmlFor="name">Key</label>
                        <Form.Item name="key">
                        <Input 
                            placeholder="Enter Key"
                            name="key"
                            defaultValue={data.key}
                         />
                         </Form.Item>
                    {/* </Form.Item> */}
                </Form>

            </Modal>
        </>
    )
}

export default State