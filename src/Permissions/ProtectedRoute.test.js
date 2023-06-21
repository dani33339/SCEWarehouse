import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import ProtectedRoute from './ProtectedRoute';

Enzyme.configure({ adapter: new Adapter() });

describe('ProtectedRoute component', () => {
  it('renders without crashing', () => {
    shallow(<ProtectedRoute />);
  });

  it('renders the Outlet component when user is provided', () => {
    const wrapper = shallow(<ProtectedRoute user={{ name: 'John' }} />);
    expect(wrapper.find(Outlet)).toHaveLength(1);
  });

  it('renders the Navigate component when user is not provided', () => {
    const wrapper = shallow(<ProtectedRoute />);
    expect(wrapper.find(Navigate)).toHaveLength(1);
  });

  it('sets the correct redirectPath when user is not provided', () => {
    const redirectPath = '/sign-in';
    const wrapper = shallow(<ProtectedRoute redirectPath={redirectPath} />);
    const navigateComponent = wrapper.find(Navigate);
    expect(navigateComponent.prop('to')).toEqual(redirectPath);
  });
});
