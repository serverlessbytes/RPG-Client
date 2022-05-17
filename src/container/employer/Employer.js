import { Button, Form, Input, Table, Tabs } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Cards } from '../../components/cards/frame/cards-frame'
import { PageHeader } from '../../components/page-headers/page-headers'
import { getAllUser } from '../../redux/users/actionCreator'
import { UserTableStyleWrapper } from '../pages/style'
import { Main, TableWrapper } from '../styled'
import FeatherIcon from 'feather-icons-react';
import { ApiGet } from '../../helper/API/ApiData'
import { CSVLink } from 'react-csv'
import { toast } from 'react-toastify';

const Employer = () => {

    const { TabPane } = Tabs;
    const dispatch = useDispatch();
    const CSVLinkRef = useRef(null)

    const [perPage, setPerPage] = useState(5)
    const [pageNumber, setPageNumber] = useState(1)
    const [status, setStatus] = useState("active") 
    const [usertable, setUsertable] = useState([]) 
    const [exportEmployer,setExportEmployer]=useState([])
    const [exportTog,setExportTog]=useState(false)

    const getEmployer = useSelector((state) => state.users.getAllUser)

    useEffect(() => {
        if (status) {
            dispatch(getAllUser(perPage, pageNumber, status, "EMPLOYER"));
        }
    }, [perPage, pageNumber, status]);

    useEffect(() => {
        if (exportEmployer.length && exportTog) {
            CSVLinkRef?.current?.link.click()  
            toast.success("User data exported successfully")
        }else if(exportTog){
            toast.success("No user data for export")
        }
        
    }, [exportEmployer])

    useEffect(() => {
        if (getEmployer && getEmployer.data) {
            // console.log("getAllUsers", getAllUsers)
            setUsertable(getEmployer.data?.data?.map(item => {

                return ({
                    name: item.name,
                    email: item.email,
                    phone: item.phone,
                    // action: (
                    //     <div className="table-actions">
                    //         {
                    //             status === "active" ?
                    //                 <>
                    //                     <Button className="btn-icon" type="info" to="#"  shape="circle">
                    //                         <FeatherIcon icon="edit" size={16} />
                    //                     </Button>
                    //                     <Button className="btn-icon" type="danger" to="#"  shape="circle">
                    //                         <FeatherIcon icon="trash-2" size={16} />
                    //                     </Button>
                    //                 </> : <Button className="btn-icon" type="danger" to="#"  shape="circle">
                    //                     <FeatherIcon icon="rotate-ccw" size={16} />
                    //                 </Button>
                    //         }

                    //     </div>
                    // ),
                });
            })
            )
        }
    }, [getEmployer])


    const allEmployerExport=()=>{
        setExportTog(true)
        ApiGet(`user/auth/allUsers?type=EMPLOYER`).then((res) => {
            setExportEmployer(res?.data?.data)
        })
    }

    const callback=(data)=>{
        setStatus(data)
    }
    

    const usersTableColumns = [

        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            width: '90px',
        },
    ]

   
  return (
    <>
    <PageHeader
        ghost
        title="Employer"
        buttons={[
            <div className="page-header-actions">
                <Button  size="small" type="primary" onClick={allEmployerExport}>
                    Export All
                </Button>
                <CSVLink data={exportEmployer} ref={CSVLinkRef} filename="Employer.csv" style={{ opacity: 0 }}></CSVLink>
            </div>
        ]}
    />

    <Main >
        <Cards headless>

        <Tabs onChange={callback}>
                                <TabPane tab="Active Users" key="active">
                                    <UserTableStyleWrapper>
                                        <TableWrapper className="table-responsive">
                                                    {/* --- search bar --- */}
                                            {/* <Form name="sDash_select" layout="vertical">
                                                <Form.Item name="search" label="">
                                                    <Input placeholder="search" style={{ width: 200 }} />
                                                </Form.Item>
                                            </Form> */}

                                            <Table
                                                dataSource={usertable}
                                                columns={usersTableColumns}
                                                pagination={{
                                                    defaultPageSize: getEmployer?.data.per_page,
                                                    total: getEmployer?.data.page_count,
                                                    onChange: (page, pageSize) => {
                                                        setPageNumber(page);
                                                        setPerPage(pageSize)
                                                    }
                                                }}
                                             
                                            />
                                        </TableWrapper>
                                    </UserTableStyleWrapper>
                                </TabPane>
                                <TabPane tab="Inactive Users" key='inactive'>
                                    <UserTableStyleWrapper>
                                        <TableWrapper className="table-responsive">

                                            <Form name="sDash_select" layout="vertical">
                                                <Form.Item name="search" label="">
                                                    <Input placeholder="search" style={{ width: 200 }} />
                                                </Form.Item>
                                            </Form>

                                            <Table
                                                dataSource={usertable}
                                                columns={usersTableColumns} 
                                                pagination={{
                                                    defaultPageSize: getEmployer?.data.per_page,
                                                    total: getEmployer?.data.page_count,
                                                    onChange: (page, pageSize) => {
                                                        setPageNumber(page);
                                                        setPerPage(pageSize)
                                                    }
                                                }}
                                            />
                                        </TableWrapper>
                                    </UserTableStyleWrapper>
                                </TabPane>
                            </Tabs>
                </Cards>
            </Main>

</>
  )
}

export default Employer