import React from 'react';
import { Row, Col } from 'antd';
import FeatherIcon from 'feather-icons-react';
// import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main} from '../styled';
import { Button } from '../../components/buttons/buttons';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import SampleCardOne from '../../components/cards/sampleCard/SampleCardOne';
import SampleCardTwo from '../../components/cards/sampleCard/SampleCardTwo';
import SampleCardThree from '../../components/cards/sampleCard/SampleCardThree';
import SampleCardFour from '../../components/cards/sampleCard/SampleCardFour';
import SampleCardFive from '../../components/cards/sampleCard/SampleCardFive';
import SampleCardSix from '../../components/cards/sampleCard/SampleCardSix';
import SampleCardSeven from '../../components/cards/sampleCard/SampleCardSeven';
import { cardOne, cardTwo, cardThree, cardFive, cardSix, cardSeven } from '../../demoData/sampleCards.json';

// const actions = (
//   <>
//     <Link to="#">
//       <FeatherIcon size={14} icon="eye" />
//       <span>View</span>
//     </Link>
//     <Link to="#">
//       <FeatherIcon size={14} icon="edit" />
//       <span>Edit</span>
//     </Link>
//     <Link to="#">
//       <FeatherIcon size={14} icon="trash-2" />
//       <span>Delete</span>
//     </Link>
//   </>
// );

const WidgetsCard = () => {
  const {  } = useSelector(state => {
    return {
      products: state.products.data,
      projects: state.projects.data,
      users: state.users,
      team: state.team.data,
      gallery: state.gallery.data,
      contactUsers: state.Contact.data,
    };
  });
  return (
    <>
      <PageHeader
        title="Widgets Cards"
        buttons={[
          <div key="1" className="page-header-actions">
            <CalendarButtonPageHeader />
            <ExportButtonPageHeader />
            <ShareButtonPageHeader />
            <Button size="small" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Add New
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Row gutter={25}>
          {cardOne.map(item => {
            return (
              <Col key={item.id} xxl={6} md={12} sm={12} xs={24} className="mb-25">
                <SampleCardOne item={item} />
              </Col>
            );
          })}

          {cardTwo.map(item => {
            return (
              <Col key={item.id} xxl={6} md={12} sm={12} xs={24} className="mb-25">
                <SampleCardTwo item={item} />
              </Col>
            );
          })}

          {cardThree.map(item => {
            return (
              <Col key={item.id} xxl={6} md={12} sm={12} xs={24} className="mb-25">
                <SampleCardThree item={item} />
              </Col>
            );
          })}

          {cardOne.map(item => {
            return (
              <Col key={item.id} xxl={6} md={12} xs={24} className="mb-25">
                <SampleCardFour item={item} />
              </Col>
            );
          })}

          {cardFive.map(item => {
            return (
              <Col key={item.id} xxl={6} md={12} xs={24} className="mb-25">
                <SampleCardFive item={item} />
              </Col>
            );
          })}

          {cardSix.map(item => {
            return (
              <Col key={item.id} xxl={6} md={12} sm={12} xs={24}>
                <SampleCardSix item={item} />
              </Col>
            );
          })}

          {cardSeven.map(item => {
            return (
              <Col key={item.id} xxl={6} md={12} sm={12} xs={24} className="mb-25">
                <SampleCardSeven item={item} />
              </Col>
            );
          })}
        </Row>
      </Main>
    </>
  );
};

export default WidgetsCard;
