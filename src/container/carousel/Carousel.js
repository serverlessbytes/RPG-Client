import React, { useState } from 'react'
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Form, Input, Modal, Table } from 'antd';
import { Main, TableWrapper } from '../styled';
import { UserTableStyleWrapper } from '../pages/style';
import { Cards } from '../../components/cards/frame/cards-frame';



const Carousel = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [data, setData] = useState({
        title : "",
        imgUrl : "",
    });
    const [languageTableData, setLanguageTableData] = useState([{title:'ABC'},{title:'BCD'}]);

    const languagesTableColumns = [
        {
            title: 'Carousel',
            dataIndex: 'title',
            sorter: (a, b) => a.title.length - b.title.length,
            sortDirections: ['descend', 'ascend'],
        }
    ];

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false)
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleChange = (e) =>{
        setData({...data,[e.target.name]:e.target.value})
    }

    return (
        <>
            <PageHeader
                ghost
                title="Carousel"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Button size="small" type="primary" onClick={showModal}>
                            Add Carousel
                        </Button>
                    </div>
                ]}
            />

            <Main >
                <Cards headless>
                    <UserTableStyleWrapper>
                        <TableWrapper className="table-responsive pb-30">

                            <Table
                                // rowSelection={rowSelection}
                                dataSource={languageTableData}
                                columns={languagesTableColumns}
                                pagination={false}
                            />

                        </TableWrapper>
                    </UserTableStyleWrapper>
                    {/* <ProjectPagination>

                        <Pagination
                            onChange={() => { }}
                            showSizeChanger
                            onShowSizeChange={() => { }}
                            pageSize={10}
                            defaultCurrent={1}
                            total={10}
                        />

                    </ProjectPagination> */}
                </Cards>
            </Main>

            {isModalVisible &&
                <Modal
                    onOk={() => handleOk()}
                    visible={isModalVisible}
                    onCancel={() => handleCancel()}
                    title="Carousel"
                    okText="Add"
                >
                    <Form name="carousel" layout="vertical">
                        <label htmlFor="title">Title</label>
                        <Form.Item>
                            <Input
                                placeholder="Enter title"
                                name="title"
                                onChange={(e)=>handleChange(e)}
                                value={data.title}
                                
                                />
                        </Form.Item>
                        <label htmlFor="imgUrl">Image URL</label>
                        <Form.Item>
                            <Input
                                type="text"
                                placeholder="Enter image URL"
                                name="imgUrl"
                                value={data.imgUrl}
                                onChange={(e)=>handleChange(e)}
                            />
                        </Form.Item>
                    </Form>
                </Modal>}
        </>
    )
}

export default Carousel