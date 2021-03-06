import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';
import { SentEmailWrapper } from '../../style';
import { ChartjsDonut } from '../../../../components/charts/chartjs';
import { deviceGetData, deviceFilterData } from '../../../../redux/chartContent/actionCreator';
import { Cards } from '../../../../components/cards/frame/cards-frame';

const EmailSent = ({dnone, emailSendTitle}) => {
  const dispatch = useDispatch();
  const { deviceState, dvIsLoading } = useSelector(state => {
    return {
      deviceState: state.chartContent.deviceData,
      dvIsLoading: state.chartContent.dvLoading,
    };
  });
  const [state, setState] = useState({
    device: 'year',
  });

  useEffect(() => {
    if (deviceGetData) {
      dispatch(deviceGetData());
    }
  }, [dispatch]);

  const handleActiveChangeDevice = value => {
    setState({
      ...state,
      device: value,
    });
    dispatch(deviceFilterData(value));
  };

  const labels = ['Total sent', 'Opened', 'Not opened'];
  const icons = ['Sent', 'Opened', 'NotOpen'];
  const types = ['success', 'primary', 'warning'];
  const datasets = [
    {
      data: deviceState,
      backgroundColor: ['#20C997', '#5F63F2', '#FA8B0C'],
    },
  ];

  return (
    <SentEmailWrapper>
      {deviceState !== null && (
        <Cards
          isbutton={
            <div className={`card-nav ${dnone}`}>
              <ul>
                <li className={state.device === 'today' ? 'active' : 'deactivate'}>
                  <Link onClick={() => handleActiveChangeDevice('today')} to="#">
                    Today
                  </Link>
                </li>
                <li className={state.device === 'week' ? 'active' : 'deactivate'}>
                  <Link onClick={() => handleActiveChangeDevice('week')} to="#">
                    Week
                  </Link>
                </li>
                <li className={state.device === 'month' ? 'active' : 'deactivate'}>
                  <Link onClick={() => handleActiveChangeDevice('month')} to="#">
                    Month
                  </Link>
                </li>
                <li className={state.device === 'year' ? 'active' : 'deactivate'}>
                  <Link onClick={() => handleActiveChangeDevice('year')} to="#">
                    Year
                  </Link>
                </li>
              </ul>
            </div>
          }
          title={emailSendTitle}
          size="large"
        >
          {dvIsLoading ? (
            <div className="sd-spin">
              <Spin />
            </div>
          ) : (
            <div className="sent-emial-chart" style={{paddingTop:"32px"}}>
              <ChartjsDonut labels={datasets} datasets={datasets} height={230} />

              <div className="sent-emial-data" style={{marginTop:"62px"}}>
                {datasets.map((item, key) => {
                  const { data } = item;
                  return (
                    <div className="sent-emial-box align-center-v" key={key + 1}>
                      {data.map((value, index) => {
                        return (
                          <div className="sent-emial-item" key={value}>
                            {/* <div className={`sent-emial-icon icon-${types[index]}`}>
                              <img src={require(`../../../../static/img/icon/${icons[index]}.svg`)} alt="" />
                            </div> */}
                            <div className="sent-emial-content">
                              <h4>
                                <strong>{value}</strong>
                              </h4>
                              <p>{labels[index]}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </Cards>
      )}
    </SentEmailWrapper>
  );
};

export default EmailSent;
