import React from 'react';
import { mountWithIntl } from 'enzyme-react-intl';
import { act } from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import { IntlProvider } from 'react-intl';
import RewardsFiltersPanel from '../RewardsFiltersPanel';

import {
  activePayableFiltersMock,
  initialState,
  payablesFilterData15days,
  payablesFilterData30days,
  stateToSimulateFirstInAll,
  stateToSimulateFirstInPayables,
  stateToSimulateLastInAll,
  stateToSimulateLastInPayables,
} from '../__mock_/mockData';

describe('RewardsFiltersPanel', () => {
  let wrapper;

  beforeEach(() => {
    const props = initialState;

    wrapper = mountWithIntl(<RewardsFiltersPanel {...props} />);
  });

  afterEach(() => jest.clearAllMocks());

  it('renders and matches snapshot', () => {
    const props = initialState;
    wrapper = shallow(
      <IntlProvider>
        <RewardsFiltersPanel {...props} />
      </IntlProvider>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should find class RewardsFiltersPanel', () => {
    act(() => {
      wrapper.update();
    });
    const container = wrapper.find('.RewardsFiltersPanel');
    expect(container).toHaveLength(1);
  });

  it('should find class RewardsFiltersPanel__container', () => {
    act(() => {
      wrapper.update();
    });
    const container = wrapper.find('.RewardsFiltersPanel__container');
    expect(container).toHaveLength(1);
  });

  it('should find class RewardsFiltersPanel__item-wrap', () => {
    act(() => {
      wrapper.update();
    });
    const container = wrapper.find('.RewardsFiltersPanel__item-wrap');
    expect(container).toHaveLength(2);
  });

  it('should find class RewardsFiltersPanel__name', () => {
    act(() => {
      wrapper.update();
    });
    const container = wrapper.find('.RewardsFiltersPanel__name');
    expect(container).toHaveLength(2);
  });

  it('should find class RewardsFiltersPanel__title', () => {
    act(() => {
      wrapper.update();
    });
    const container = wrapper.find('.RewardsFiltersPanel__title');
    expect(container).toHaveLength(1);
  });

  it('should find class iconfont', () => {
    act(() => {
      wrapper.update();
    });
    const container = wrapper.find('.iconfont');
    expect(container).toHaveLength(1);
  });

  it('should find id filter_rewards', () => {
    act(() => {
      wrapper.update();
    });
    const container = wrapper.find('#filter_rewards');
    expect(container).toHaveLength(1);
  });

  it('should find class RewardsFiltersPanel__title-text', () => {
    act(() => {
      wrapper.update();
    });
    const container = wrapper.find('.RewardsFiltersPanel__title-text');
    expect(container).toHaveLength(1);
  });

  it('simulated click on first checkbox', () => {
    const props = stateToSimulateFirstInPayables;
    const mockSetFilterValue = jest.fn();
    wrapper = mountWithIntl(
      <RewardsFiltersPanel setPayablesFilterValue={mockSetFilterValue} {...props} />,
    );
    wrapper
      .find('.ant-checkbox-input')
      .first()
      .simulate('change');
    expect(mockSetFilterValue).toHaveBeenCalledTimes(1);
  });

  it('simulated click on last checkbox', () => {
    const props = stateToSimulateLastInPayables;
    const mockSetFilterValue = jest.fn();
    wrapper = mountWithIntl(
      <RewardsFiltersPanel setPayablesFilterValue={mockSetFilterValue} {...props} />,
    );
    wrapper
      .find('.ant-checkbox-input')
      .last()
      .simulate('change');
    expect(mockSetFilterValue).toHaveBeenCalledTimes(1);
  });

  it('simulated click on first checkbox in all', () => {
    const props = stateToSimulateFirstInAll;
    const mockSetFilterValue = jest.fn();
    wrapper = mountWithIntl(<RewardsFiltersPanel setFilterValue={mockSetFilterValue} {...props} />);
    wrapper
      .find('.ant-checkbox-input')
      .first()
      .simulate('change');
    expect(mockSetFilterValue).toHaveBeenCalledTimes(1);
  });

  it('simulated click on last checkbox in all', () => {
    const props = stateToSimulateLastInAll;
    const mockSetFilterValue = jest.fn();
    wrapper = mountWithIntl(<RewardsFiltersPanel setFilterValue={mockSetFilterValue} {...props} />);
    wrapper
      .find('.ant-checkbox-input')
      .last()
      .simulate('change');
    expect(mockSetFilterValue).toHaveBeenCalledTimes(1);
  });

  it('should render text Payables', () => {
    const textRewards = wrapper.find('.RewardsFiltersPanel__title-text');
    expect(textRewards.text()).toEqual('Payables:');
  });

  it('should change text on Over 15 days', () => {
    const props = payablesFilterData15days;
    wrapper = mountWithIntl(<RewardsFiltersPanel {...props} />);
    const textPayables = wrapper.find('.RewardsFiltersPanel__name').first();
    expect(textPayables.text()).toEqual('Over 15 days');
  });

  it('should change text on Over 30 days', () => {
    const props = payablesFilterData30days;
    wrapper = mountWithIntl(<RewardsFiltersPanel {...props} />);
    const textPayables = wrapper.find('.RewardsFiltersPanel__name').first();
    expect(textPayables.text()).toEqual('Over 30 days');
  });

  it('should change text on Over 10 STEEM', () => {
    const props = payablesFilterData15days;
    wrapper = mountWithIntl(<RewardsFiltersPanel {...props} />);
    const textPayables = wrapper.find('.RewardsFiltersPanel__name').last();
    expect(textPayables.text()).toEqual('Over 10 STEEM');
  });

  it('should change text on Over 20 STEEM', () => {
    const props = payablesFilterData30days;
    wrapper = mountWithIntl(<RewardsFiltersPanel {...props} />);
    const textPayables = wrapper.find('.RewardsFiltersPanel__name').last();
    expect(textPayables.text()).toEqual('Over 20 STEEM');
  });

  it('should render activePayableFilters', () => {
    const props = activePayableFiltersMock;
    wrapper = mountWithIntl(<RewardsFiltersPanel {...props} />);
    const checkBox = wrapper.find('.ant-checkbox-wrapper-checked');
    expect(checkBox).toHaveLength(1);
  });
});
