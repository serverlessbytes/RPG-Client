import { Col, Row } from 'antd';
import React from 'react'
import SampleCardSix from '../../components/cards/sampleCard/SampleCardSix';
import { PageHeader } from '../../components/page-headers/page-headers';
import { cardSix } from '../../demoData/sampleCards.json';
import { Main } from '../styled';

const JobDashboard = () => {
    return (
        <>
            <PageHeader
                ghost
                title="Dashboard"
                buttons={[
                    <div key="1" className="page-header-actions">
                        {/* <CalendarButtonPageHeader />
                        <ExportButtonPageHeader />
                        <ShareButtonPageHeader /> */}
                        {/* <Button size="small" type="primary">
                            <FeatherIcon icon="plus" size={14} />
                            Add New
                        </Button> */}
                    </div>,
                ]}
            />
            <Main>
                <Row gutter={25}>
                    {cardSix.map(item => {
                        return (
                            <Col key={item.id} xxl={6} md={12} sm={12} xs={24}>
                                <SampleCardSix item={item} />
                            </Col>
                        );
                    })}
                </Row>
            </Main>
        </>
    )
}

export default JobDashboard