import React from 'react';
import { mountWithIntl } from 'enzyme-react-intl';
import { MemoryRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Campaign from '../Campaign';

jest.mock('../../../objectCard/ObjectCardView', () => () => <div className="ObjectCardView" />);

jest.mock('../../../Wrapper', () => () => <div className="context-wrap" />);

describe('Campaign', () => {
  let wrapper;

  beforeEach(() => {
    const props = {
      filterKey: 'all',
      history: {
        action: 'PUSH',
        length: 46,
      },
      proposition: {
        count: 1,
        distance: null,
        last_created: '2020-02-04T12:32:15.446Z',
        max_reward: 0.001,
        min_reward: 0.001,
      },
    };

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
