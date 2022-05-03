
import React, { useState } from 'react'
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Form, Input, Modal } from 'antd';

const Banner = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [data, setData] = useState({
        title: "",
        imgUrl: ""
    });

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false)
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setData({
            title: "",
            imgUrl: ""
        })
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    return (
        <>
            <PageHeader
                ghost
                title="Banner"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Button size="small" type="primary" onClick={showModal}>
                            Add Banner
                        </Button>
                    </div>
                ]}
            />

            {isModalVisible &&
                <Modal
                    onOk={() => handleOk()}
                    visible={isModalVisible}
                    onCancel={() => handleCancel()}
                    title="Banner"
                    okText="Add"
                >
                    <Form name="banner" layout="vertical">
                        <label htmlFor="title">Title</label>
                        <Form.Item>
                            <Input
                                placeholder="Enter title"
                                name="title"
                                value={data.title}
                                onChange={(e) => handleChange(e)}
                            />
                        </Form.Item>
                        <label htmlFor="imgUrl">Image URL</label>
                        <Form.Item>
                            <Input
                                type="text"
                                placeholder="Enter image URL"
                                name="imgUrl"
                                value={data.imgUrl}
                                onChange={(e) => handleChange(e)}
                            />
                        </Form.Item>
                    </Form>
                </Modal>}
        </>
    )
}

export default Banner