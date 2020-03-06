import React from 'react';
import { mountWithIntl } from 'enzyme-react-intl';
import { MemoryRouter as Router } from 'react-router-dom';
import CampaignRewardsTableRow from '../CampaignRewardsTableBodyRow';
import { initialState } from '../__mock__/mockDataRow';
import * as genPermlink from '../../../../helpers/wObjectHelper';
// eslint-disable-next-line import/no-duplicates
import * as validateActivation from '../../../../../waivioApi/ApiClient';
// eslint-disable-next-line import/no-duplicates
import * as validateInactivation from '../../../../../waivioApi/ApiClient';

describe('CampaignRewardsTableRow', () => {
  const mockGenPermlink = jest.spyOn(genPermlink, 'generatePermlink');
  mockGenPermlink.mockReturnValue(1);

  const mockValidateActivation = jest.spyOn(validateActivation, 'validateActivationCampaign');
  mockValidateActivation.mockReturnValue(1);

  const mockValidateInactivation = jest.spyOn(validateInactivation, 'validateInactivationCampaign');
  mockValidateInactivation.mockReturnValue(1);

  let wrapper;

  beforeEach(() => {
    const props = initialState;
    wrapper = mountWithIntl(
      <Router>
        <CampaignRewardsTableRow {...props} />
      </Router>,
    );
  });
  afterEach(() => jest.clearAllMocks());

  it('should return 0.10 in Monthly (STEEM)', () => {
    const container = wrapper.find('td').at(5);
    expect(container.text()).toEqual('0.10');
  });

  it('should return 0.10 in Reward (STEEM)', () => {
    const container = wrapper.find('td').at(6);
    expect(container.text()).toEqual('0.10');
  });

  it('should return 0 in Reserved', () => {
    const container = wrapper.find('td').at(7);
    expect(container.text()).toEqual('0');
  });

  it('should return 0 in Completed', () => {
    const container = wrapper.find('td').at(8);
    expect(container.text()).toEqual('0');
  });

  it('should return 1 in Remaining', () => {
    const container = wrapper.find('td').at(9);
    expect(container.text()).toEqual('1');
  });
});
