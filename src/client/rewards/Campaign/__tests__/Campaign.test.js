import React from 'react';
import { shallow } from 'enzyme';
import { IntlProvider } from 'react-intl';
import Campaign from '../Campaign';
import { initialState } from '../__mock__/mockData';

jest.mock('../../../Wrapper', () => () => <div className="context-wrap" />);
jest.mock('../Campaign', () => () => <div className="Campaign-mock" />);

describe('Campaign snapshot', () => {
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
