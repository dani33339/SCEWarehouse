import Admin from "./Admin";
import React from "react";
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

Enzyme.configure({ adapter: new Adapter() });

describe('Admin component', () => {
  it('renders without crashing', () => {
    shallow(<Admin />);
  });

  it('renders the correct number of items', () => {
    const wrapper = shallow(<Admin />);
    const items = wrapper.find('.singleDestination');
    expect(items).toHaveLength(0);
  });

  it('activates the add bar when "ADD" button is clicked', () => {
    const wrapper = shallow(<Admin />);
    const addButton = wrapper.find('#addbtn');

    // Initially, the add bar should not be active
    expect(wrapper.find('.activeaddbar')).toHaveLength(0);

    // Simulate a click on the "ADD" button
    addButton.simulate('click');

    // Now, the add bar should be active
    expect(wrapper.find('.activeaddbar')).toHaveLength(1);
  });

  it('displays the correct title', () => {
    const wrapper = shallow(<Admin />);
    const titleElement = wrapper.find('.title');
    const titleText = titleElement.text();
    expect(titleText).toEqual('items additing');
  });
});
