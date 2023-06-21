import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Order from './Order';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

Enzyme.configure({ adapter: new Adapter() });

describe('Order component', () => {
  it('renders without crashing', () => {
    shallow(
      <MemoryRouter>
        <Order />
      </MemoryRouter>
    );
  });
});



