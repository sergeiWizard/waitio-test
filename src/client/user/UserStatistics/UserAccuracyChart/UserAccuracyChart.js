import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import classNames from 'classnames';
import { Doughnut } from 'react-chartjs-2';
import './UserAccuracyChart.less';

const UserAccuracyChart = ({ value }) => {
  const data = {
    labels: [],
    datasets: [
      {
        data: [value, 100 - value],
        backgroundColor: ['#54d2a0', '#d9534f'],
        borderColor: 'transparent',
      },
    ],
  };
  const options = {
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
    hover: { mode: null },
    cutoutPercentage: 75,
    maintainAspectRatio: false,
  };
  return (
    <div className="UserAccuracy">
      <div className="UserAccuracy__chart">
        <Doughnut data={data} options={options} width={95} height={95} />
      </div>
      <div
        className={classNames('UserAccuracy__value', {
          success: value > 50,
          unsuccess: value < 50,
        })}
      >{`${value}%`}</div>
    </div>
  );
};

UserAccuracyChart.propTypes = {
  value: PropTypes.number.isRequired,
};

export default injectIntl(UserAccuracyChart);
