import Base from './Base';
import config from '../configApi/config';

export default class Performers extends Base {
  constructor(params) {
    super(params);

    this.searchInstrumentsStat = this.searchInstrumentsStat.bind(this);
  }

  searchInstrumentsStat(searchString, limit = 7) {
    return this.apiClient
      .get(
        `${config.performers.searchInstrumentsStatistic}/${encodeURIComponent(
          searchString,
        )}?limit=${limit}`,
      )
      .then(response => response.data);
  }

  getPerformersStatistics() {
    return new Promise((resolve, reject) => {
      this.apiClient
        .get(`${config.performers.top}`)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  }
  getPerformersStatisticsForPeriod(period = 'm1', limit = 5, skip = 0) {
    return new Promise((resolve, reject) => {
      this.apiClient
        .get(`${config.performers.top}/${period}?limit=${limit}&skip=${skip}`)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  }

  getInstrumentStatistics(autorPermlink) {
    return new Promise((resolve, reject) => {
      this.apiClient
        .get(`${config.performers.instrumentStatistic}/${autorPermlink}`)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  }
}