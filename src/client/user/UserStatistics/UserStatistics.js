import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { isEmpty } from 'lodash';
import UserStatisticContainer from './UserStatisticContainer/UserStatisticContainer';
import UserForecastInstruments from './UserForecastInstruments/UserForecastInstruments';
import api from '../../../investarena/configApi/apiResources';
import './UserStatistics.less';
import UserInstrumentsTable from './UserInstrumentsTable/UserInstrumentsTable';

const UserStatistics = ({ match }) => {
  const [statAccuracyData, setStatAccuracyData] = useState({});
  const [sortOptions, setSortOptions] = useState({});
  console.log(sortOptions);
  useEffect(() => {
    api.statistics
      .getUserStatistics(match.params.name)
      .then(response => setStatAccuracyData(response.data));
  }, []);
  const mockInstrumentsData = [
    { forecastName: 'AUD/CAD', count: 24 },
    { forecastName: 'Apple', count: 45 },
    { forecastName: 'Bitcoin', count: 54 },
  ];
  return (
    <div className="UserStatistics">
      {!isEmpty(statAccuracyData) && (
        <React.Fragment>
          <UserStatisticContainer accuracy={statAccuracyData} contentType={'forecast'} />
          <UserStatisticContainer accuracy={statAccuracyData} contentType={'profitability'} />
        </React.Fragment>
      )}
      {!isEmpty(mockInstrumentsData) && <UserForecastInstruments forecasts={mockInstrumentsData} />}
      <UserInstrumentsTable setSortOptions={setSortOptions} />
    </div>
  );
};

export default injectIntl(UserStatistics);
