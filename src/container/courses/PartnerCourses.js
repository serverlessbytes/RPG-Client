import React, { useEffect, useState } from 'react';
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import FeatherIcon from 'feather-icons-react';
import { ListButtonSizeWrapper, Main, TableWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Col, Form, Input, Row, Select, Table, Tabs } from 'antd';
import { UserTableStyleWrapper } from '../pages/style';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import { getCategoryData, getCoursefilter } from '../../redux/course/actionCreator';

const PartnerCourses = () => {

    const courseData = useSelector((state) => state.category.courseFilterData)
    const { Option } = Select;
    const history = useHistory()
    let dispatch = useDispatch()
    const { path } = useRouteMatch();

    const [state, setState] = useState({
        category: "",
        mode: "ONLINE",
    })
    const [activeCoursetog,setActiveCourseTog]=useState(true)

    let catdata = useSelector((state) => state.category.categoryData)
    //useEffect(() => { console.log("catdata", catdata) }, [catdata])
    useEffect(() => {
        dispatch(getCategoryData());
    }, [])

    useEffect(() => {
      if(catdata && catdata.data && catdata.data.length>0){
        setState({ ...state, category: catdata.data[0].id})
      }
    }, [catdata])

    useEffect(() => {
      if(state && activeCoursetog){
        Submit()
      }
    }, [state])
    


    const usersTableData = [];
   const [usertable,setUsertable] =useState([]) //set data
    // const { users } = useSelector(state => {
    //     return {
    //         users: state.users,
    //     };
    // });
   
    const [perPage, setPerPage] = useState(10)   //paganation
    const [pageNumber, setPageNumber] = useState(1) //paganation

    const onChangehandle = (e, name) => {
        setActiveCourseTog(false)
        if (name == "category") {
            setState({ ...state, category: e })
        }
        else if (name == "mode") {
            setState({ ...state, mode: e })
        }
    }
    const onEdit = (id) =>{
        history.push(`${path}/addpartnercourses?id=${id}`)
    }

    useEffect(() => {
        
        if (courseData && courseData.data) {
            setUsertable(courseData.data?.data?.map((item) => {
               
                // const { id, name, designation, status } = user;
                return {
                    //key: id,
                   
                    CourseName: item.name,
                    CourseCategory: item.courseCategory.name,
                    //State: item.state,
                    CourseType: item.mode,
                    // Language: "Hindi",
                    action: (
                        <div className='active-schemes-table'>
                            <div className="table-actions">
                                <>
                                    <Button className="btn-icon" onClick = {()=>onEdit(item.id)} type="info" to="#" shape="circle">
                                        <FeatherIcon icon="edit" size={16} />
                                    </Button>

                                    {/* <Button className="btn-icon" type="danger"  to="#" shape="circle">
                                        <FeatherIcon icon="x-circle" size={16} />
                                    </Button> */}
                                    {/* <Button className="btn-icon" type="info" to="#" shape="circle">
                                <FeatherIcon icon="edit" size={16} />
                            </Button> */}
                                </>
                            </div>
                        </div>
                    ),
                };
                
            }))
        }

    }, [courseData])

    //useEffect(()=>{console.log("--------->>",courseData)},[courseData])
    const Submit = () => {
        dispatch(getCoursefilter(state.category, perPage, pageNumber, state.mode))
    }
  
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
        // {
        //     title: 'State',
        //     dataIndex: 'State',
        // },
        {
            title: 'Course Type',
            dataIndex: 'CourseType',
        },
        // {
        //     title: 'Language',
        //     dataIndex: 'Language',
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
        //     console.log(key);
    }



    return (
        <>
            <PageHeader
                ghost
                title="Partner Courses"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Button size="small" type="primary" onClick={() => { history.push(`${path}/addpartnercourses`) }}>
                            Add Courses
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
                                            <Select size="large" className="sDash_fullwidth-select" name="category" value={state.category}  placeholder="Select Category" onChange={(e) => onChangehandle(e, "category")}>
                                                {catdata && catdata.data.map((items) => (
                                                    <Option value={items.id}>{items.name} </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Col>
                                {/* <Col md={6} xs={24} className="mb-25">
                                    <Form name="sDash_select" layout="vertical">
                                        <Form.Item name="basic-select" label="State">
                                            <Select size="large" className="sDash_fullwidth-select" placeholder="Select State">
                                                <Option value="1"> All India </Option>
                                                <Option value="2"> Andaman and Nicobar Islands </Option>
                                                <Option value="3"> Arunachal Pradesh </Option>
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Col> */}
                                <Col md={6} xs={24} className="mb-25">
                                    <Form name="sDash_select" layout="vertical">
                                        <Form.Item  label="Mode">
                                            <Select size="large" className="sDash_fullwidth-select" name="mode" value={state.mode}  onChange={(e) => onChangehandle(e, "mode")} placeholder="Select Mode Type">
                                                <Option value="ONLINE">Online</Option>
                                                <Option value="OFFLINE">Offline</Option>
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col md={6} xs={24} className="mb-25">
                                    <ListButtonSizeWrapper>
                                        <Button size="small" type="primary" onClick={(e) => Submit(e)}>
                                            Apply
                                        </Button>
                                        {/* <Button size="small" type="light">
                                            Clear
                                        </Button> */}
                                    </ListButtonSizeWrapper>
                                </Col>
                            </Row>
                            {/* <Row className="mb-25">
                                <Button size="small" type={type === "Active" ? "primary" : "light"} onClick={() => setType("Active")}>
                                    Active Courses
                                </Button>
                                <Button size="small" type={type === "Inactive" ? "primary" : "light"} onClick={() => setType("Inactive")}>
                                    Inactive Courses
                                </Button>
                            </Row> */}

                            <Tabs defaultActiveKey="1" onChange={callback}>
                                <TabPane tab="Active Courses" key="1">
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
                                {/* <TabPane tab="Inactive Courses" key="2">
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
                                </TabPane> */}
                            </Tabs>

                        </Col>
                    </Row>
                </Cards>
            </Main>
        </>
    )
}

export default PartnerCourses