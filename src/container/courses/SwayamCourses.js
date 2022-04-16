import React, { useEffect, useState } from 'react';
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import FeatherIcon from 'feather-icons-react';
import { ListButtonSizeWrapper, Main, TableWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Col, Form, Input, Row, Select, Table, Tabs } from 'antd';
import ActiveSchemesTable from '../schemes/ActiveSchemesTable';
import { UserTableStyleWrapper } from '../pages/style';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import { getCategoryData, getCoursefilter } from '../../redux/course/actionCreator';
import moment from 'moment';

const SwayamCourses = () => {

  

    const dispatch=useDispatch()
    const { Option } = Select;
    const [type, setType] = useState("Active")
    const [key, setKey] = useState("1")
    const history = useHistory()
    const usersTableData = [];
    const { path } = useRouteMatch();
    const [activeCoursetog, setActiveCourseTog] = useState(true)
    const categoryData = useSelector((state) => state.category.categoryData)
    const courseData = useSelector((state) => state.category.courseFilterData)

    const [data,setData]=useState(
        {
            category: "",
            mode: "BOTH",
        }
    )
    const [perPage, setPerPage] = useState(10)   
    const [pageNumber, setPageNumber] = useState(1)
    const [status, setStatus] = useState("active")
    const [usertable, setUsertable] = useState([]) 
    

  


    useEffect(() => {
        dispatch(getCategoryData());
    }, [])

    useEffect(() => {
        if (categoryData && categoryData.data && categoryData.data.length > 0) {
            setData({ ...data, category: categoryData.data[0].id })
        }
    }, [categoryData])

    useEffect(() => {
        if (data.category && activeCoursetog) {
            Submit()
        }
    }, [data])
    

    const onChangehandle = (e, name) => {
        setActiveCourseTog(false)
        if (name == "category") {
            setData({ ...data, category: e })
        }
        else if (name == "mode") {
            setData({ ...data, mode: e })
        }
    }

    const onEdit = (id) => {
        history.push(`${path}/addcourses?id=${id}`)
    }

    const Submit = () => {
        dispatch(getCoursefilter(data.category, perPage, pageNumber, data.mode,status))
    }
    

    // users.map(user => {

    //     const { id, name, designation, status } = user;
    //     return usersTableData.push({


    //         key: id,
    //         CourseName: 'Customer Interaction - Asking Right Questions',
    //         CourseCategory: 'Construction',
    //         CourseDuration: "	01:50",
    //         Certification: 'No',
    //         Location: "English",
    //         action: (
    //             <div className='active-schemes-table'>
    //                 <div className="table-actions">
    //                     <>

    //                         {key === "1" && <> <Button className="btn-icon" type="success" to="#" shape="circle">
    //                             <FeatherIcon icon="info" size={16} />
    //                         </Button>
    //                             <Button className="btn-icon" type="info" to="#" shape="circle">
    //                                 <FeatherIcon icon="edit" size={16} />
    //                             </Button>
    //                         </>}
    //                         <Button className="btn-icon" type="warning" to="#" shape="circle">
    //                             <FeatherIcon icon="file" size={16} />
    //                         </Button>
    //                     </>
    //                 </div>
    //             </div>
    //         ),
    //     });
    // });

    useEffect(() => {

        if (courseData && courseData.data) {
            setUsertable(courseData.data?.data?.map((item) => {
                // const { id, name, designation, status } = user;
                return {
                    //key: id,

                    CourseName: item.name,
                    CourseCategory: item.courseCategory.name,
                    CourseDuration:item.duration,
                    Certification: item.certificate ? "Yes" : "No",
                    // CourseDuration:item.
                    //State: item.state,
                    // CourseType: item.mode,
                    // Language: "Hindi",
                    action: (
                        <div className='active-schemes-table'>
                            <div className="table-actions">
                                <>
                                    <Button className="btn-icon" onClick={() => onEdit(item.id)} type="info" to="#" shape="circle">
                                        <FeatherIcon icon="edit" size={16} />
                                    </Button>

                                    <Button className="btn-icon" type="danger" onClick={() => onDelete(item.id)} to="#" shape="circle">
                                        <FeatherIcon icon="x-circle" size={16} />
                                    </Button>
                                </>
                            </div>
                        </div>
                    ),
                };

            }))
        }

    }, [courseData])

    const usersTableColumns = [

        {
            title: 'Course Name',
            dataIndex: 'CourseName',
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Course Category',
            dataIndex: 'CourseCategory',
        },
        {
            title: 'Course Duration (HH:MM)',
            dataIndex: 'CourseDuration',
        },
        {
            title: 'Certification',
            dataIndex: 'Certification',
        },
        // {
        //     title: 'Language',
        //     dataIndex: 'Location',
        //     sortDirections: ['descend', 'ascend'],
        // },
        {
            title: 'Actions',
            dataIndex: 'action',
            width: '90px',
        },

    ];


    const { TabPane } = Tabs;

    const callback = (key) => {
        setStatus(key)
    }


    
    return (
        <>
            <PageHeader
                ghost
                title="Courses"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Button size="small" type="primary" onClick={()=>{history.push(`/admin/courses/addcourses`)}}>
                            Create Course
                        </Button>
                    </div>
                ]}
            />

            <Main >
                <Cards headless>
                    <Row gutter={15}>
                        <Col xs={24}>
                            <Row gutter={30}>
                                <Col md={6} xs={24} className="mb-25">
                                    <Form name="sDash_select" layout="vertical">
                                        <Form.Item  label="Course Category">
                                            <Select name="category" size="large" className="sDash_fullwidth-select" value={data.category} placeholder="Select" onChange={(e)=>onChangehandle(e,"category")}>
                                            {categoryData && categoryData.data &&categoryData.data.map((items) => (
                                                    <Option value={items.id}>{items.name} </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col md={6} xs={24} className="mb-25">
                                    <Form name="sDash_select" layout="vertical">
                                        <Form.Item  label="Mode">
                                            <Select size="large" className="sDash_fullwidth-select" name="mode" value={data.mode} placeholder="Select Language" onChange={(e)=>onChangehandle(e,"mode")}>
                                                <Option value="BOTH">Both</Option>
                                                <Option value="ONLINE">Online</Option>
                                                <Option value="OFFLINE">Offline</Option>
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col md={6} xs={24} className="mb-25">
                                    <ListButtonSizeWrapper>
                                        <Button size="small" type="primary" onClick={()=>Submit()   }>
                                            Apply
                                        </Button>
                                        <Button size="small" type="light">
                                            Clear
                                        </Button>
                                    </ListButtonSizeWrapper>
                                </Col>
                            </Row>
                            <Tabs onChange={callback}>
                                <TabPane tab="Active Courses" key="active">
                                    <UserTableStyleWrapper>
                                        <TableWrapper className="table-responsive">

                                            <Form name="sDash_select" layout="vertical">
                                                <Form.Item name="search" label="">
                                                    <Input placeholder="search" style={{ width: 200 }} />
                                                </Form.Item>
                                            </Form>

                                            <Table
                                                // rowSelection={rowSelection}
                                                dataSource={usertable}
                                                columns={usersTableColumns}
                                                pagination={{
                                                    defaultPageSize: 5,
                                                    total: usersTableData.length,
                                                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                                                }}
                                            />
                                        </TableWrapper>
                                    </UserTableStyleWrapper>
                                </TabPane>
                                <TabPane tab="Inactive Courses" key="inactive">
                                    <UserTableStyleWrapper>
                                        <TableWrapper className="table-responsive">

                                            <Form name="sDash_select" layout="vertical">
                                                <Form.Item name="search" label="">
                                                    <Input placeholder="search" style={{ width: 200 }} />
                                                </Form.Item>
                                            </Form>

                                            <Table
                                                // rowSelection={rowSelection}
                                                dataSource={usertable}
                                                columns={usersTableColumns}
                                                pagination={{
                                                    defaultPageSize: 5,
                                                    total: usersTableData.length,
                                                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                                                }}
                                            />
                                        </TableWrapper>
                                    </UserTableStyleWrapper>
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </Cards>
            </Main>
        </>
    )
}

export default SwayamCourses