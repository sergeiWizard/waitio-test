import React from 'react';
import { mountWithIntl } from 'enzyme-react-intl';
import { act } from 'react-dom/test-utils';
import { MemoryRouter as Router } from 'react-router-dom';
import CampaignCardHeader from '../CampaignCardHeader';
import {
  initialState,
  stateForModalDetail,
  stateForModalSteem,
  stateForModalSteemMinus,
  stateForTotal,
} from '../__mock__/mockData';
import * as helpers from '../../rewardsHelper';

jest.mock('../../../components/Avatar', () => () => <div className="Avatar" />);

describe('CampaignCardHeader', () => {
  const mock = jest.spyOn(helpers, 'getCurrentUSDPrice');
  mock.mockReturnValue(0.001);
  let wrapper;

  beforeEach(() => {
    const props = initialState;
    wrapper = mountWithIntl(
      <Router>
        <CampaignCardHeader {...props} />
      </Router>,
    );
  });

  afterEach(() => jest.clearAllMocks());

  it('should find class CampaignCardHeader', () => {
    const container = wrapper.find('.CampaignCardHeader');
    expect(container).toHaveLength(1);
  });

  it('should find class CampaignCardHeader__name', () => {
    const container = wrapper.find('.CampaignCardHeader__name');
    expect(container).toHaveLength(1);
  });

  it('should find class CampaignCardHeader__data', () => {
    const container = wrapper.find('.CampaignCardHeader__data');
    expect(container).toHaveLength(1);
  });

  it('should find class CampaignCardHeader__name-earn', () => {
    const container = wrapper.find('.CampaignCardHeader__name-earn');
    expect(container).toHaveLength(1);
  });

  it('should find class CampaignCardHeader__data-colored', () => {
    const container = wrapper.find('.CampaignCardHeader__data-colored');
    expect(container).toHaveLength(1);
  });

  it('should get text of price is  0.00 USD ', () => {
    const textPayables = wrapper.find('.fw6');
    expect(textPayables.text()).toEqual(' 0.00 USD ');
  });

  it('should get text of earn is Earn ', () => {
    const textPayables = wrapper.find('.CampaignCardHeader__name-earn');
    expect(textPayables.text()).toEqual('Earn');
  });

  it('should render modal details', () => {
    act(() => {
      wrapper.update();
    });
    const props = stateForModalDetail;
    wrapper = mountWithIntl(
      <Router>
        <CampaignCardHeader {...props} />
      </Router>,
    );
    const modal = wrapper.find('.CampaignCardHeader__data-colored');
    expect(modal.text()).toEqual(' 0.001 STEEM');
  });

  it('should get total paid 0', () => {
    act(() => {
      wrapper.update();
    });
    const props = stateForTotal;
    wrapper = mountWithIntl(
      <Router>
        <CampaignCardHeader {...props} />
      </Router>,
    );
    const modal = wrapper.find('.total-paid');
    expect(modal.text()).toEqual('Total paid:0 STEEM');
  });

  it('should get 0 STEEM in modal details', () => {
    act(() => {
      wrapper.update();
    });
    const props = stateForModalSteem;
    wrapper = mountWithIntl(
      <Router>
        <CampaignCardHeader {...props} />
      </Router>,
    );
    const modal = wrapper.find('.CampaignCardHeader__data-colored');
    expect(modal.text()).toEqual(' 0 STEEM');
  });

  it('should get -1 STEEM in modal details', () => {
    act(() => {
      wrapper.update();
    });
    const props = stateForModalSteemMinus;
    wrapper = mountWithIntl(
      <Router>
        <CampaignCardHeader {...props} />
      </Router>,
    );
    const modal = wrapper.find('.CampaignCardHeader__data-colored');
    expect(modal.text()).toEqual(' -1 STEEM');
  });

  it('should get text STEEM of 0', () => {
    mock.mockReturnValue(0);
    const props = initialState;
    wrapper = mountWithIntl(
      <Router>
        <CampaignCardHeader {...props} />
      </Router>,
    );
    const textPayables = wrapper.find('.fw6');
    expect(textPayables.text()).toEqual(' 0.001 STEEM ');
  });
});
