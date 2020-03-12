import React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { mountWithIntl } from 'enzyme-react-intl';
import Proposition from '../Proposition';
import { initialState } from '../__mock__/mockData';
import * as adapter from '../../../adapters';

jest.mock('../../../translations/index', () => {});
jest.mock('../../../adapters');
jest.mock('../../CampaignCardHeader/CampaignCardHeader', () => () => (
  <div className="CampaignCardHeader" />
));
jest.mock('../../../objectCard/ObjectCardView', () => () => <div className="ObjectCardView" />);
jest.mock('../../CampaignFooter/CampainFooterContainer', () => () => (
  <div className="CampainFooterContainer" />
));
jest.mock('../../Details/Details', () => () => <div className="Details" />);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Proposition', () => {
  const mockgGetClientWObj = jest.spyOn(adapter, 'getClientWObj');
  mockgGetClientWObj.mockReturnValue({ id: 1 });

  let wrapper;

  beforeEach(() => {
    const store = mockStore({});
    const props = initialState;
    wrapper = mountWithIntl(
      <Provider store={store}>
        <Router>
          <Proposition {...props} />
        </Router>
      </Provider>,
    );
  });

  afterEach(() => jest.clearAllMocks());

  it('should find class "Proposition"', () => {
    const container = wrapper.find('.Proposition');
    expect(container).toHaveLength(1);
  });

  it('should find class "Proposition__header"', () => {
    const container = wrapper.find('.Proposition__header');
    expect(container).toHaveLength(1);
  });

  it('should find class "Proposition__card"', () => {
    const container = wrapper.find('.Proposition__card');
    expect(container).toHaveLength(1);
  });

  it('should find class "Proposition__footer"', () => {
    const container = wrapper.find('.Proposition__footer');
    expect(container).toHaveLength(1);
  });

  it('should find class "Proposition__footer-details"', () => {
    const container = wrapper.find('.Proposition__footer-details');
    expect(container).toHaveLength(1);
  });

  it('should find class "Proposition__footer-button"', () => {
    const container = wrapper.find('.Proposition__footer-button');
    expect(container).toHaveLength(1);
  });
});
