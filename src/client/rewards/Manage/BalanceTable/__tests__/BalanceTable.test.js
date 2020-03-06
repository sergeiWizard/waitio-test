import React from 'react';
import { mountWithIntl } from 'enzyme-react-intl';
import BalanceTable from '../BalanceTable';
import { initialState, stateToOperations } from '../__mock__/mockData';

describe('BalanceTable', () => {
  let wrapper;

  beforeEach(() => {
    const props = initialState;

    wrapper = mountWithIntl(<BalanceTable {...props} />);
  });

  afterEach(() => jest.clearAllMocks());

  it('should found table with class BalanceTable', () => {
    const container = wrapper.find('.BalanceTable');
    expect(container).toHaveLength(1);
  });

  it('should found in table 4 th', () => {
    const container = wrapper.find('th');
    expect(container).toHaveLength(4);
  });

  it('should found in table 4 td', () => {
    const container = wrapper.find('td');
    expect(container).toHaveLength(4);
  });

  it('column should have name "Balance"', () => {
    const container = wrapper.find('th').at(0);
    expect(container.text()).toEqual('Balance');
  });

  it('column should have name "Payable*"', () => {
    const container = wrapper.find('th').at(1);
    expect(container.text()).toEqual('Payable*');
  });

  it('column should have name "Reserved"', () => {
    const container = wrapper.find('th').at(2);
    expect(container.text()).toEqual('Reserved');
  });

  it('column should have name "Remaining"', () => {
    const container = wrapper.find('th').at(3);
    expect(container.text()).toEqual('Remaining');
  });

  it('should have balance 128.71', () => {
    const container = wrapper.find('td').at(0);
    expect(container.text()).toEqual('128.71');
  });

  it('should have Payable 0.000', () => {
    const container = wrapper.find('td').at(1);
    expect(container.text()).toEqual('0.000');
  });

  it('should have Reserved 0.000', () => {
    const container = wrapper.find('td').at(2);
    expect(container.text()).toEqual('0.000');
  });

  it('should have Remaining 128.710', () => {
    const container = wrapper.find('td').at(3);
    expect(container.text()).toEqual('128.710');
  });

  it('should payable have 50', () => {
    const props = stateToOperations;
    wrapper = mountWithIntl(<BalanceTable {...props} />);
    const container = wrapper.find('td').at(1);
    expect(container.text()).toEqual('50.000');
  });

  it('should Reserved have 50', () => {
    const props = stateToOperations;
    wrapper = mountWithIntl(<BalanceTable {...props} />);
    const container = wrapper.find('td').at(2);
    expect(container.text()).toEqual('50.000');
  });

  it('should Remaining have 28.710', () => {
    const props = stateToOperations;
    wrapper = mountWithIntl(<BalanceTable {...props} />);
    const container = wrapper.find('td').at(3);
    expect(container.text()).toEqual('28.710');
  });
});
