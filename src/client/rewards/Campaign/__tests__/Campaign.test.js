import React from 'react';
// import React, { useContext } from 'react';
import { shallow } from 'enzyme';
import { mountWithIntl } from 'enzyme-react-intl';
import { MemoryRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';
import Campaign from '../Campaign';
import { initialState } from '../__mock__/mockData';

// jest.mock('../Campaign', () => () => <div className="context-wrap" />);
jest.mock('../../../Wrapper', () => () => <div className="context-wrap" />);

describe('Campaign snapshot', () => {
  jest.mock('../Campaign', () => () => <div className="Campaign-mock" />);
  let wrapper;

  it('renders and matches snapshot', () => {
    const props = initialState;
    wrapper = shallow(
      <IntlProvider>
        <Campaign {...props} />
      </IntlProvider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Campaign', () => {
  let wrapper;

  beforeEach(() => {
    const props = initialState;

    wrapper = mountWithIntl(
      <Router>
        <Campaign {...props} />
      </Router>,
    );
  });

  afterEach(() => jest.clearAllMocks());

  it('should render Campaign wrap', () => {
    act(() => {
      wrapper.update();
    });
    const container = wrapper.find('.Campaign');
    expect(container).toHaveLength(2);
  });
});
