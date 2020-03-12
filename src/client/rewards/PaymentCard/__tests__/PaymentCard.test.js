import React from 'react';
import { mountWithIntl } from 'enzyme-react-intl';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import PaymentCard from '../PaymentCard';
import { initialState, stateForChangeMatchPath, stateForMemo } from '../__mock__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
jest.mock('../../../components/Avatar', () => () => <div className="Avatar" />);

describe('PaymentCard', () => {
  let wrapper;
  const store = mockStore({});
  beforeEach(() => {
    const props = initialState;
    wrapper = mountWithIntl(
      <Provider store={store}>
        <Router>
          <PaymentCard {...props} />
        </Router>
      </Provider>,
    );
  });

  afterEach(() => jest.clearAllMocks());

  it('should found class "PaymentCard"', () => {
    const container = wrapper.find('.PaymentCard');
    expect(container).toHaveLength(1);
  });

  it('should found class "PaymentCard__content"', () => {
    const container = wrapper.find('.PaymentCard__content');
    expect(container).toHaveLength(1);
  });

  it('should found class "PaymentCard__content-name-wrap"', () => {
    const container = wrapper.find('.PaymentCard__content-name-wrap');
    expect(container).toHaveLength(1);
  });

  it('should found class "PaymentCard__content-name-wrap-alias"', () => {
    const container = wrapper.find('.PaymentCard__content-name-wrap-alias');
    expect(container).toHaveLength(1);
  });

  it('should found class "PaymentCard__content-name-wrap-row"', () => {
    const container = wrapper.find('.PaymentCard__content-name-wrap-row');
    expect(container).toHaveLength(1);
  });

  it('should found class "PaymentCard__content-name-wrap-row-name"', () => {
    const container = wrapper.find('.PaymentCard__content-name-wrap-row-name');
    expect(container).toHaveLength(1);
  });

  it('should found class "PaymentCard__end-wrap"', () => {
    const container = wrapper.find('.PaymentCard__end-wrap');
    expect(container).toHaveLength(1);
  });

  it('should found class "PaymentCard__content-name-wrap-row-pay"', () => {
    const container = wrapper.find('.PaymentCard__content-name-wrap-row-pay');
    expect(container).toHaveLength(1);
  });

  it('should found class "PaymentCard__end-wrap-icon"', () => {
    const container = wrapper.find('.PaymentCard__end-wrap-icon');
    expect(container).toHaveLength(1);
  });

  it('should entry as a guest', () => {
    const props = stateForMemo;
    wrapper = mountWithIntl(
      <Provider store={store}>
        <Router>
          <PaymentCard {...props} />
        </Router>
      </Provider>,
    );

    const container = wrapper.find('.PaymentCard__content-name-wrap-row-name');
    expect(container.text()).toEqual('@waivio_');
  });

  it('should change matchPath', () => {
    const props = stateForChangeMatchPath;
    wrapper = mountWithIntl(
      <Provider store={store}>
        <Router initialEntries={['/rewards/receivables']}>
          <Route component={() => <PaymentCard {...props} />} path="/rewards/receivables" />
        </Router>
      </Provider>,
    );

    const container = wrapper.find('.PaymentCard__content-name-wrap-row-pay');
    expect(container.text()).toEqual(' 0.01 STEEM');
  });
});
