import React from 'react';
import { shallow } from 'enzyme';
import { IntlProvider } from 'react-intl';
import { mountWithIntl } from 'enzyme-react-intl';
import { MemoryRouter as Router } from 'react-router-dom';
import Details from '../Details';
import {
  initialState,
  stateForActiveReserve,
  stateForFrequency,
  stateForIsEligible,
  stateForPostRequirements,
  stateForReservePastPress,
} from '../__mock__/mockData';

jest.mock('../../CampaignCardHeader/CampaignCardHeader', () => () => (
  <div className="CampaignCardHeader" />
));

const toggleModal = jest.fn();
const reserveOnClickHandler = jest.fn();

describe('Details', () => {
  let wrapper;

  beforeEach(() => {
    const props = initialState;
    wrapper = mountWithIntl(
      <Router>
        <Details
          toggleModal={toggleModal}
          reserveOnClickHandler={reserveOnClickHandler}
          {...props}
        />
      </Router>,
    );
  });

  afterEach(() => jest.clearAllMocks());

  it('renders and matches snapshot', () => {
    const props = initialState;
    wrapper = shallow(
      <IntlProvider>
        <Details {...props} />
      </IntlProvider>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should find class Details__text-wrap', () => {
    const container = wrapper.find('.Details__text-wrap');
    expect(container).toHaveLength(1);
  });

  it('should find class Details__text', () => {
    const container = wrapper.find('.Details__text');
    expect(container).toHaveLength(7);
  });

  it('should find class Details__criteria-wrap', () => {
    const container = wrapper.find('.Details__criteria-wrap');
    expect(container).toHaveLength(2);
  });

  it('should find class Details__criteria-row', () => {
    const container = wrapper.find('.Details__criteria-row');
    expect(container).toHaveLength(8);
  });

  it('should find class nowrap', () => {
    const container = wrapper.find('.nowrap');
    expect(container).toHaveLength(2);
  });

  it('should find class no-visible', () => {
    const container = wrapper.find('.no-visible');
    expect(container).toHaveLength(2);
  });

  it('should find class Details__footer', () => {
    const container = wrapper.find('.Details__footer');
    expect(container).toHaveLength(1);
  });

  it('should find class Details__footer-reserve-btn', () => {
    const container = wrapper.find('.Details__footer-reserve-btn');
    expect(container).toHaveLength(1);
  });

  it('should find class ant-btn', () => {
    const container = wrapper.find('.ant-btn');
    expect(container).toHaveLength(2);
  });

  it('should find in button attribute "disabled"', () => {
    expect(wrapper.find('.ant-btn-primary').props().disabled).toBe(true);
  });

  it('should be "active" button "Reserved"', () => {
    const props = stateForActiveReserve;
    wrapper = mountWithIntl(
      <Router>
        <Details
          toggleModal={toggleModal}
          reserveOnClickHandler={reserveOnClickHandler}
          {...props}
        />
      </Router>,
    );
    wrapper.find('.ant-btn-primary').simulate('click');
    expect(reserveOnClickHandler).toHaveBeenCalled();
  });

  it('should get link www.waivio.com/object/testnet', () => {
    const textPayables = wrapper.find('.Details__criteria-link').first();
    expect(textPayables.text()).toEqual('www.waivio.com/object/testnet');
  });

  it('should get link www.waivio.com/object/testing123', () => {
    const textPayables = wrapper.find('.Details__criteria-link').last();
    expect(textPayables.text()).toEqual('www.waivio.com/object/testing123');
  });

  it('should be "active" button "Write review"', () => {
    const props = stateForReservePastPress;
    wrapper = mountWithIntl(
      <Router>
        <Details
          toggleModal={toggleModal}
          reserveOnClickHandler={reserveOnClickHandler}
          {...props}
        />
      </Router>,
    );
    const btn = wrapper.find('.ant-btn-primary');
    expect(btn.text()).toEqual('Write review');
  });

  it('should be add new checkbox"', () => {
    const props = stateForFrequency;
    wrapper = mountWithIntl(
      <Router>
        <Details
          toggleModal={toggleModal}
          reserveOnClickHandler={reserveOnClickHandler}
          {...props}
        />
      </Router>,
    );
    const container = wrapper.find('.Details__criteria-row').at(3);
    expect(container.text()).toEqual(
      'Have not received a reward from @alexeygrigurko for reviewing Testing123 in the last 1 days and does not have an active reservation for such a reward at the moment.',
    );
  });

  it('should get text Minimum Waivio expertise: 1', () => {
    const props = initialState;
    wrapper = mountWithIntl(
      <Router>
        <Details
          toggleModal={toggleModal}
          reserveOnClickHandler={reserveOnClickHandler}
          {...props}
        />
      </Router>,
    );
    const textPayables = wrapper.find('.Details__criteria-row').at(0);
    expect(textPayables.text()).toEqual('Minimum Waivio expertise: 1');
  });

  it('should get text Minimum number of followers: 2', () => {
    const props = initialState;
    wrapper = mountWithIntl(
      <Router>
        <Details
          toggleModal={toggleModal}
          reserveOnClickHandler={reserveOnClickHandler}
          {...props}
        />
      </Router>,
    );
    const textPayables = wrapper.find('.Details__criteria-row').at(1);
    expect(textPayables.text()).toEqual('Minimum number of followers: 2');
  });

  it('should get text Minimum number of posts: 3', () => {
    const props = initialState;
    wrapper = mountWithIntl(
      <Router>
        <Details
          toggleModal={toggleModal}
          reserveOnClickHandler={reserveOnClickHandler}
          {...props}
        />
      </Router>,
    );
    const textPayables = wrapper.find('.Details__criteria-row').at(2);
    expect(textPayables.text()).toEqual('Minimum number of posts: 3');
  });

  it('should simulate button "Cancel', () => {
    const props = initialState;

    wrapper = mountWithIntl(
      <Router>
        <Details
          toggleModal={toggleModal}
          reserveOnClickHandler={reserveOnClickHandler}
          {...props}
        />
      </Router>,
    );
    wrapper
      .find('.ant-btn')
      .first()
      .simulate('click');
    expect(toggleModal).toHaveBeenCalledTimes(1);
  });

  it('should find in isEligible attribute "disabled"', () => {
    const props = stateForIsEligible;
    wrapper = mountWithIntl(
      <Router>
        <Details
          toggleModal={toggleModal}
          reserveOnClickHandler={reserveOnClickHandler}
          {...props}
        />
      </Router>,
    );
    expect(wrapper.find('.ant-btn-primary').props().disabled).toBe(true);
  });

  it('should found in Post requirements new item', () => {
    const props = stateForPostRequirements;
    wrapper = mountWithIntl(
      <Router>
        <Details
          toggleModal={toggleModal}
          reserveOnClickHandler={reserveOnClickHandler}
          {...props}
        />
      </Router>,
    );
    const container = wrapper.find('.Details__criteria-row').at(6);
    expect(container.text()).toEqual('2. Photo of the receipt (without personal details);');
  });

  it('should found in Reward bot "aggroed"', () => {
    const props = stateForPostRequirements;
    wrapper = mountWithIntl(
      <Router>
        <Details
          toggleModal={toggleModal}
          reserveOnClickHandler={reserveOnClickHandler}
          {...props}
        />
      </Router>,
    );
    const container = wrapper.find('a').at(9);
    expect(container.props().href).toBe('/object/aggroed');
  });

  it('should found in Reward bot "fenrir78"', () => {
    const props = stateForPostRequirements;
    wrapper = mountWithIntl(
      <Router>
        <Details
          toggleModal={toggleModal}
          reserveOnClickHandler={reserveOnClickHandler}
          {...props}
        />
      </Router>,
    );
    const container = wrapper.find('a').at(10);
    expect(container.props().href).toBe('/object/fenrir78');
  });

  it('should found in Reward bot "ace108"', () => {
    const props = stateForPostRequirements;
    wrapper = mountWithIntl(
      <Router>
        <Details
          toggleModal={toggleModal}
          reserveOnClickHandler={reserveOnClickHandler}
          {...props}
        />
      </Router>,
    );
    const container = wrapper.find('a').at(11);
    expect(container.props().href).toBe('/object/ace108');
  });

  it('should return link Terms', () => {
    const props = stateForPostRequirements;
    wrapper = mountWithIntl(
      <Router>
        <Details
          toggleModal={toggleModal}
          reserveOnClickHandler={reserveOnClickHandler}
          {...props}
        />
      </Router>,
    );
    const container = wrapper.find('a').at(12);
    expect(container.props().href).toBe('/object/xrj-terms-and-conditions/page');
  });
});
