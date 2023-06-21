import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Main from './Main';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

Enzyme.configure({ adapter: new Adapter() });

describe('Main component', () => {
  it('renders without crashing', () => {
    shallow(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );
  });

});
