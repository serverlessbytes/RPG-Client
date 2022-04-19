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
      // buttons={[
      //   <div key="6" className="page-header-actions">
      //     <CalendarButtonPageHeader key="1" />
      //     <ExportButtonPageHeader key="2" />
      //     <ShareButtonPageHeader key="3" />
      //     <Button size="small" key="4" type="primary">
      //       <FeatherIcon icon="plus" size={14} />
      //       Add New
      //     </Button>
      //   </div>,
      // ]}
      />
      <Main>
        <Row gutter={25}>
          <Col xxl={6} md={12} sm={12} xs={24}>
            <Cards headless>
              <EChartCard>
                <div className="card-chunk">
                  <CardBarChart2>
                    <Heading as="h1">7,461</Heading>
                    <span>No.of registration</span>
                    <p>
                      <span className="growth-upward">
                        {/* <FeatherIcon icon="arrow-up" /> */}
                        25%
                      </span>
                      <span>Since last week</span>
                    </p>
                  </CardBarChart2>
                </div>

              </EChartCard>
            </Cards>
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
              <ClosedDeals dnone={'d-none'} title={'Page views schemes Graph'} />
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
              <EmailSent dnone={'d-none'} emailSendTitle={'Page views schemes Graph'} />
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
              <SalesLeaderBoard dnone={'d-none'} tableheader={'Top 10 Jobs viewes'} />
            </Suspense>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default Dashboard;
