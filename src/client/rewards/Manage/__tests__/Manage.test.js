import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mountWithIntl } from 'enzyme-react-intl';
import Manage from '../Manage';
import { initialState } from '../__mock__/mockData';
import * as getAuthent from '../../../reducers';

const mockGetAuthent = jest.spyOn(getAuthent, 'getAuthenticatedUser');
mockGetAuthent.modalOnOklHandlerMock = '';

jest.mock('../../../translations/index', () => () => 0);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Manage', () => {
  let wrapper;

  beforeEach(() => {
    const store = mockStore({
      auth: {
        user: 'asd09',
      },
    });
    const props = initialState;
    wrapper = mountWithIntl(
      <Provider store={store}>
        <Router>
          <Manage {...props} />
        </Router>
      </Provider>,
    );
  });
  afterEach(() => jest.clearAllMocks());

  it('should find class "Manage"', () => {
    const container = wrapper.find('.Manage');
    expect(container).toHaveLength(1);
  });

  it('should find class "Manage__account-balance-wrap"', () => {
    const container = wrapper.find('.Manage__account-balance-wrap');
    expect(container).toHaveLength(1);
  });

  it('should find class "Manage__account-balance-wrap-title"', () => {
    const container = wrapper.find('.Manage__account-balance-wrap-title');
    expect(container).toHaveLength(1);
  });

  it('should find class "Manage__account-balance-wrap-text-content"', () => {
    const container = wrapper.find('.Manage__account-balance-wrap-text-content');
    expect(container).toHaveLength(1);
  });

  it('should find class "Manage__rewards-campaign-wrap"', () => {
    const container = wrapper.find('.Manage__rewards-campaign-wrap');
    expect(container).toHaveLength(1);
  });

  it('should find class "Manage__rewards-campaign-wrap-title"', () => {
    const container = wrapper.find('.Manage__rewards-campaign-wrap-title');
    expect(container).toHaveLength(1);
  });

  it('should find class "Manage__rewards-campaign-wrap-text-content"', () => {
    const container = wrapper.find('.Manage__rewards-campaign-wrap-text-content');
    expect(container).toHaveLength(1);
  });

  it('should find class "Manage__button"', () => {
    const container = wrapper.find('.Manage__button');
    expect(container).toHaveLength(1);
  });
});
