import React from 'react';
import { Col, Rate, Row } from 'antd';
import PropTypes from 'prop-types';
import { averageRate, avrRate } from '../../components/Sidebar/Rate/rateHelper';
import './RatingsWrap.less';

const RatingsWrap = ({ ratings, isMobile }) => {
  // _.orderBy(ratings, [ratings., 'age'], ['asc', 'desc']);
  let layout = null;

  const rateLayout = (colNum, rateIndex, dividerClass) => (
    <Col className={`RatingsWrap__rate ${dividerClass}`} span={colNum}>
      <Rate allowHalf disabled value={averageRate(ratings[rateIndex])} />
      <div className="RatingsWrap__rate-title">{ratings[rateIndex].body}</div>
    </Col>
  );
  if (ratings[0]) {
    if (!isMobile) {
      layout = (
        <div className="RatingsWrap">
          <Row>
            {rateLayout(12, 0, '')}
            {ratings[1] && rateLayout(12, 1, 'RatingsWrap__divider')}
          </Row>
          {ratings[2] && (
            <Row>
              {rateLayout(12, 2, '')}
              {ratings[3] && rateLayout(12, 3, 'RatingsWrap__divider')}
            </Row>
          )}
        </div>
      );
    } else {
      layout = (
        <div className="RatingsWrap">
          <div className="RatingsWrap-rate">
            <Rate allowHalf disabled value={avrRate(ratings)} />
            {/* <div className="RatingsWrap__rate-title"> */}
            {/* {`(${ratings.length})`} */}
            {/* </div> */}
          </div>
        </div>
      );
    }
  }
  return layout;
};

RatingsWrap.propTypes = {
  ratings: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default RatingsWrap;