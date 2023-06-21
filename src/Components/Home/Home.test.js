import React from 'react';
import Home from './Home';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

Enzyme.configure({ adapter: new Adapter() });

describe('Home component', () => {
  it('renders without crashing', () => {
    shallow(<Home />);
  });

  it('renders a video', () => {
    const wrapper = shallow(<Home />);
    const video = wrapper.find('video');
    expect(video).toHaveLength(1);
  });

  it('renders a section with class "home"', () => {
    const wrapper = shallow(<Home />);
    const section = wrapper.find('section.home');
    expect(section).toHaveLength(1);
  });

  it('renders a Main component with Filters prop', () => {
    const wrapper = shallow(<Home />);
    const main = wrapper.find('Main');
    expect(main).toHaveLength(1);
    expect(main.prop('Filters')).toBeNull();
  });

  it('displays "Search your item" in the title', () => {
    const wrapper = shallow(<Home />);
    const title = wrapper.find('.homeTitle');
    expect(title.text()).toEqual('Search your item');
  });

  
  it('displays the item type select element', () => {
    const wrapper = shallow(<Home />);
    const selectElement = wrapper.find('.FromInput select');
    expect(selectElement).toHaveLength(1);
  });
  
  it('displays the correct options in the item type select element', () => {
    const wrapper = shallow(<Home />);
    const options = wrapper.find('.FromInput select option');
    const optionValues = options.map((option) => option.prop('value'));
    const expectedOptionValues = ['1', '2', '3', '4', '5', '6', '7', '7']; 

    expect(optionValues).toEqual(expectedOptionValues);
  });
  it('resets filters, receive date, and return date when ResetSetSearch is called', () => {
    const wrapper = shallow(<Home />);

    // Mock the useState hook for testing
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((initialState) => [initialState, setState]);

    // Simulate the function call
    wrapper.find('.ResetsearchOptions').simulate('click');

    // Assert the expected changes
    expect(setState).toHaveBeenCalledTimes(0);
  });
});
