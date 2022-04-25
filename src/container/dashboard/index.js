import React, { Suspense, useEffect, useState } from 'react';
import { Row, Col, Skeleton } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';

import { CardBarChart2, EChartCard } from './style';
import Heading from '../../components/heading/heading';
import ClosedDeals from './overview/crm/ClosedDeals';
import EmailSent from './overview/crm/EmailSent';
import SalesLeaderBoard from './overview/crm/SalesLeaderboard';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getDashBoardCourseData, getDashBoardUserData, getTopMostViewedCourses, getTopMostViewedJobs, getTopMostViewedSchemes } from '../../redux/dashboard/actionCreator';

const Dashboard = () => {

  const dispatch =useDispatch()

  const coursesData=useSelector(state=>state.dashboard.dashBoardCourseData) 
  const userData=useSelector(state=>state.dashboard.dashBoardUserData)
  const topTenCourseData=useSelector(state=>state.dashboard.topTenCourseData)
  const topTenSchemesData=useSelector(state=>state.dashboard.topTenSchemeData)
  const topTenJobsData=useSelector(state=>state.dashboard.topTenJobData)



  const [tenCourseData,setTenCourseData]=useState()
  const [tenSchemesData,setTenSchemesData]=useState()
  const [tenJobData,setTenJobData]=useState()
 

  useEffect(() => {
    if(topTenCourseData && topTenCourseData.data && topTenCourseData.data.data){
      setTenCourseData(topTenCourseData.data.data.map((item)=>{
        return{
          name:item.name,
          category:item.courseCategory.name,
          certification:item.certificate?"Yes":"No"
        }
      }))
    }
  }, [topTenCourseData])

  useEffect(() => {
    if(topTenSchemesData && topTenSchemesData.data && topTenSchemesData.data.data){
      setTenSchemesData(topTenSchemesData.data.data.map((item)=>{
        return{
          name:item.name,
          category:item.schemeCategory.name,
          type:item.type
        }
      }))
    }
  }, [topTenSchemesData])


  useEffect(() => {
    if(topTenJobsData && topTenJobsData.data && topTenJobsData.data.data){
      setTenJobData(topTenJobsData.data.data.map((item)=>{
        return{
          name:item.name,
          type:item.type,
          extraType:item.extraType,
          start_date:moment(item.startDate).format("YYYY:MM:DD"),
          end_date:moment(item.endDate).format("YYYY:MM:DD"),
          role:item.jobRole.name,
          category:item.jobType.name
        }
      }))
    }
  }, [topTenJobsData])


  useEffect(() => {
    dispatch(getDashBoardCourseData())
    dispatch(getDashBoardUserData())
    dispatch(getTopMostViewedCourses())
    dispatch(getTopMostViewedSchemes())
    dispatch(getTopMostViewedJobs())
  }, [])

  
  const courseColumns = [
    {
      title: 'Course Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Certification',
      dataIndex: 'certification',
      key: 'certification',
    },
  ];

  const schemesColumns = [
    {
      title: 'Schemes Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    
  ];

  const jobColumns = [
    {
      title: 'Job Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Extra type',
      dataIndex: 'extraType',
      key: 'extraType',
    },
    {
      title: 'Start date',
      dataIndex: 'start_date',
      key: 'start_date',
    },
    {
      title: 'End date',
      dataIndex: 'end_date',
      key: 'end_date',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
  ];
  

  return (
    <>
      <PageHeader
        ghost
        title="Dashbord"
      />
      <Main>
      <h3>Users</h3>
        <Row gutter={25}>
          <Col xxl={6} md={12} sm={12} xs={24}>
            <Cards headless>
              <EChartCard>
                <div className="card-chunk">
                  <CardBarChart2>
                    <Heading as="h1">{userData?.data?.all}</Heading>
                    <span>No.of all users</span>
                    {/* <p>
                      <span className="growth-upward">
                        25%
                      </span>
                      <span>Since last week</span>
                    </p> */}
                  </CardBarChart2>
                </div>

              </EChartCard>
            </Cards>
          </Col>
          <Col xxl={6} md={12} sm={12} xs={24}>
            <Cards headless>
              <EChartCard>
                <div className="card-chunk">
                  <CardBarChart2>
                    <Heading as="h1">{userData?.data?.users}</Heading>
                    <span>No.of users </span>
                    {/* <p>
                      <span className="growth-upward">
                        25%
                      </span>
                      <span>Since last week</span>
                    </p> */}
                  </CardBarChart2>
                </div>

              </EChartCard>
            </Cards>
          </Col>
          <Col xxl={6} md={12} sm={12} xs={24}>
            <Cards headless>
              <EChartCard>
                <div className="card-chunk">
                  <CardBarChart2>
                    <Heading as="h1">{userData?.data?.admin}</Heading>
                    <span>No.of admins</span>
                    {/* <p>
                      <span className="growth-upward">
                        25%
                      </span>
                      <span>Since last week</span>
                    </p> */}
                  </CardBarChart2>
                </div>

              </EChartCard>
            </Cards>
          </Col>
          <Col xxl={6} md={12} sm={12} xs={24}>
            <Cards headless>
              <EChartCard>
                <div className="card-chunk">
                  <CardBarChart2>
                    <Heading as="h1">{userData?.data?.partner}</Heading>
                    <span>No.of partners </span>
                    {/* <p>
                      <span className="growth-upward">
                        25%
                      </span>
                      <span>Since last week</span>
                    </p> */}
                  </CardBarChart2>
                </div>

              </EChartCard>
            </Cards>
          </Col>
          <Col xxl={6} md={12} sm={12} xs={24}>
            <Cards headless>
              <EChartCard>
                <div className="card-chunk">
                  <CardBarChart2>
                    <Heading as="h1">{userData?.data?.employer}</Heading>
                    <span>No.of employers</span>
                    {/* <p>
                      <span className="growth-upward">
                        25%
                      </span>
                      <span>Since last week</span>
                    </p> */}
                  </CardBarChart2>
                </div>

              </EChartCard>
            </Cards>
          </Col>
        </Row>
        <h3>Courses</h3>
        <Row gutter={25}>
          <Col xxl={6} md={12} sm={12} xs={24}>
            <Cards headless>
              <EChartCard>
                <div className="card-chunk">
                  <CardBarChart2>
                    <Heading as="h1">{coursesData?.data?.all_courses}</Heading>
                    <span>No.of total courses</span>
                    {/* <p>
                      <span className="growth-upward">
                        25%
                      </span>
                      <span>Since last week</span>
                    </p> */}
                  </CardBarChart2>
                </div>

              </EChartCard>
            </Cards>
          </Col>
          <Col xxl={6} md={12} sm={12} xs={24}>
            <Cards headless>
              <EChartCard>
                <div className="card-chunk">
                  <CardBarChart2>
                    <Heading as="h1">{coursesData?.data?.online_coueses}</Heading>
                    <span>No.of online courses</span>
                    {/* <p>
                      <span className="growth-upward">
                        25%
                      </span>
                      <span>Since last week</span>
                    </p> */}
                  </CardBarChart2>
                </div>

              </EChartCard>
            </Cards>
          </Col>
          <Col xxl={6} md={12} sm={12} xs={24}>
            <Cards headless>
              <EChartCard>
                <div className="card-chunk">
                  <CardBarChart2>
                    <Heading as="h1">{coursesData?.data?.offline_courses}</Heading>
                    <span>No.of offline courses</span>
                    {/* <p>
                      <span className="growth-upward">
                        25%
                      </span>
                      <span>Since last week</span>
                    </p> */}
                  </CardBarChart2>
                </div>

              </EChartCard>
            </Cards>
          </Col>
          <Col xxl={6} md={12} sm={12} xs={24}>
            <Cards headless>
              <EChartCard>
                <div className="card-chunk">
                  <CardBarChart2>
                    <Heading as="h1">{coursesData?.data?.partner_courses}</Heading>
                    <span>No.of partner courses</span>
                    {/* <p>
                      <span className="growth-upward">
                        25%
                      </span>
                      <span>Since last week</span>
                    </p> */}
                  </CardBarChart2>
                </div>

              </EChartCard>
            </Cards>
          </Col>
        </Row>
        
        <Row gutter={25}>
          <Col xxl={12} xs={24}>
            {/* <Row gutter={25}>
              <Col xxl={12} md={12} sm={12} xs={24}>
                <Cards headless>
                  <EChartCard>
                    <div className="card-chunk">
                      <CardBarChart2>
                        <Heading as="h1">100</Heading>
                        <span>No.of courses</span>
                        
                      </CardBarChart2>
                    </div>

                  </EChartCard>
                </Cards>
              </Col>
              <Col xxl={12} md={12} sm={12} xs={24}>
                <Cards headless>
                  <EChartCard>
                    <div className="card-chunk">
                      <CardBarChart2>
                        <Heading as="h1">10,000</Heading>
                        <span>No.of courses</span>
                      </CardBarChart2>
                    </div>

                  </EChartCard>
                </Cards>
              </Col>
            </Row> */}
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <EmailSent dnone={'d-none'} emailSendTitle={'Page views schemes'} />
            </Suspense>
          </Col>
          <Col xxl={12} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <ClosedDeals dnone={'d-none'} title={'Page views courses'} />
            </Suspense>
          </Col>
        </Row>
        <Row gutter={25}>
          <Col xxl={8} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <SalesLeaderBoard dnone={'d-none'} tableheader={'Top 10 Jobs viewes'} columns={jobColumns} data={tenJobData}/>
            </Suspense>
          </Col>
          <Col xxl={8} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <SalesLeaderBoard dnone={'d-none'} tableheader={'Top 10 courses viewes'} columns={courseColumns} data={tenCourseData}/>
            </Suspense>
          </Col>
          <Col xxl={8} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <SalesLeaderBoard dnone={'d-none'} tableheader={'Top 10 schemes' } columns={schemesColumns} data={tenSchemesData}
               />
            </Suspense>
          </Col>
        </Row>

      </Main>
    </>
  );
};

export default Dashboard;
