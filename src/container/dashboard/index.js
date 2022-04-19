import React, { Suspense } from 'react';
import { Row, Col, Skeleton } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import { CardBarChart2, EChartCard } from './style';
import Heading from '../../components/heading/heading';
import ClosedDeals from './overview/crm/ClosedDeals';
import EmailSent from './overview/crm/EmailSent';
import SalesLeaderBoard from './overview/crm/SalesLeaderboard';

const Dashboard = () => {
  return (
    <>
      <PageHeader
        ghost
        title="Dashbord"
      />
      <Main>
        <Row gutter={25}>
          <Col xxl={6} md={12} sm={12} xs={24}>
            <Cards headless>
              <EChartCard>
                <div className="card-chunk">
                  <CardBarChart2>
                    <Heading as="h1">5,000</Heading>
                    <span>No.of registration</span>
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
                    <Heading as="h1">40</Heading>
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
          <Col xxl={6} md={12} sm={12} xs={24}>
            <Cards headless>
              <EChartCard>
                <div className="card-chunk">
                  <CardBarChart2>
                    <Heading as="h1">40</Heading>
                    <span>No.of partners</span>
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
                    <Heading as="h1">20</Heading>
                    <span>No.of courses</span>
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
            <Row gutter={25}>
              <Col xxl={12} md={12} sm={12} xs={24}>
                <Cards headless>
                  <EChartCard>
                    <div className="card-chunk">
                      <CardBarChart2>
                        <Heading as="h1">100</Heading>
                        <span>No.of courses</span>
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
              <Col xxl={12} md={12} sm={12} xs={24}>
                <Cards headless>
                  <EChartCard>
                    <div className="card-chunk">
                      <CardBarChart2>
                        <Heading as="h1">10,000</Heading>
                        <span>No.of courses</span>
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
              <SalesLeaderBoard dnone={'d-none'} tableheader={'Top 10 Jobs viewes'} />
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
              <SalesLeaderBoard dnone={'d-none'} tableheader={'Top 5 courses viewes'} />
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
              <SalesLeaderBoard dnone={'d-none'} tableheader={'Top 10 schemes'} />
            </Suspense>
          </Col>
        </Row>

      </Main>
    </>
  );
};

export default Dashboard;
