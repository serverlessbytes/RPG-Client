
import React, { useEffect, useState } from 'react'
import { PageHeader } from '../../components/page-headers/page-headers';
import FeatherIcon from 'feather-icons-react';
import { Button } from '../../components/buttons/buttons';
import { Form, Input, Modal, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { postStateData } from '../../redux/state/actionCreator';
import { getLanguageData } from '../../redux/language/actionCreator';

const State = () => {

    const [data, setData] = useState({
        name: '',
        key: ''
    })


    const languageData=useSelector((state)=>state.language.getLanguageData)

    useEffect(() => {
       
      console.log("languageData",languageData);
    }, [languageData])
    

    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const { Option } = Select;
    const handleOk = () => {
        const data = form.getFieldsValue()
        let id=data.languageId
        delete data.languageId
   
        dispatch(postStateData(data,id))
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onChangeHandler = (e) => {
        console.log("e", e);
        // setData({[]
        // })
        // setData({name:})
    }

    useEffect(() => {
        dispatch(getLanguageData())
    }, [])

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
                    <Form.Item name="languageId" label="Language">
                        <Select style={{ height: "50px" }} size="large" defaultValue="Language" className="sDash_fullwidth-select" >
                        {
                            languageData && languageData.data.map((item)=>(
                                <Option value={item.id}> {item.name} </Option>
                            ))
                        }
                            
                        </Select>
                    </Form.Item>
                </Form>

            </Modal>
        </>
    )
}

export default State