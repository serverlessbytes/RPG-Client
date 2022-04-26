import React from 'react';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import Heading from '../../../../components/heading/heading';
import { UserCard } from '../../../pages/style';
import { Button } from '../../../../components/buttons/buttons';

const UserCards = ({ user }) => {
  const { name, designation, img } = user;
  return (
    <UserCard>
      <div className="card user-card">
        <Cards headless>
          <figure>
            <img src={img} alt="" width='100px' height='100px'/>
          </figure>
          <figcaption>
            <div className="card__content">
              <Heading className="card__name" as="h6">
                <Link to="#">{name}</Link>
              </Heading>
              {/* <p className="card__designation">{designation}</p> */}
            </div>
          </figcaption>
        </Cards>
      </div>
    </UserCard>
  );
};

UserCards.propTypes = {
  user: PropTypes.object,
};

export default UserCards;
