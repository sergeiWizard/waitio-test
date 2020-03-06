import React from 'react';
import { mountWithIntl } from 'enzyme-react-intl';
import { shallow } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';
import CampaignRewardsTable from '../CampaignRewardsTable';
import { initialState } from '../__mock__/mockData';

describe('CampaignRewardsTable', () => {
  let wrapper;

  beforeEach(() => {
    const props = initialState;
    wrapper = mountWithIntl(
      <Router>
        <CampaignRewardsTable {...props} />
      </Router>,
    );
  });
  afterEach(() => jest.clearAllMocks());

  it('should return snapshot', () => {
    const props = initialState;
    wrapper = shallow(
      <Router>
        <CampaignRewardsTable {...props} />
      </Router>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should found class of table Campaign-rewards', () => {
    const container = wrapper.find('.Campaign-rewards').first();
    expect(container).toHaveLength(1);
  });
});
