import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { mountWithIntl } from 'enzyme-react-intl';
import Campaign from '../Campaign';
import { initialState } from '../__mock__/mockData';
import * as adapter from '../../../adapters';

jest.mock('../../../Wrapper', () => () => {});
jest.mock('../../../adapters');
jest.mock('../../../objectCard/ObjectCardView', () => () => <div className="ObjectCardView" />);

describe('Campaign', () => {
  const mockgGetClientWObj = jest.spyOn(adapter, 'getClientWObj');
  mockgGetClientWObj.mockReturnValue({ id: 1 });

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

  it('should find class "Campaign', () => {
    const container = wrapper.find('.Campaign');
    console.log(container.debug());
    expect(container).toHaveLength(1);
  });
});
