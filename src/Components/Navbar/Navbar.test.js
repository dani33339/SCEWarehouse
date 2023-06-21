import Enzyme, { shallow } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import Navbar from './Navbar';
import React from 'react';
Enzyme.configure({ adapter: new Adapter() });


// when user is not logged in
describe('Navbar component when user is not logged in', () => {
    let wrapper;
    beforeEach(() => {
    wrapper = shallow(<Navbar />);
    });
    
    it('renders a Sign-in button', () => {
    expect(wrapper.find('Link[to="/Sign-in"]').text()).toEqual('Sign-in');
    });
    
    it('renders a Sign-up button', () => {
    expect(wrapper.find('Link[to="/Sign-up"]').text()).toEqual('Sign-up');
    });
    
    it('does not render My Orders link', () => {
    expect(wrapper.find('a[href="Myorders"]').exists()).toBeFalsy();
    });
    
    it('does not render admin link', () => {
    expect(wrapper.find('a[href="admin"]').exists()).toBeFalsy();
    });
    
    it('displays correct logo text', () => {
    expect(wrapper.find('h1').text()).toEqual(' Warehouse.');
    });
    
    it('toggles navbar when toggleNavbar button is clicked', () => {
    const toggleNavbarBtn = wrapper.find('.toggleNavbar');
    toggleNavbarBtn.simulate('click');
    expect(wrapper.find('.navBar.activeNavbar').exists()).toBeTruthy();
    });
    
    it('closes navbar when closeNavbar button is clicked', () => {
    const toggleNavbarBtn = wrapper.find('.toggleNavbar');
    toggleNavbarBtn.simulate('click');
    const closeNavbarBtn = wrapper.find('.closeNavbar');
    closeNavbarBtn.simulate('click');
    expect(wrapper.find('.navBar').exists()).toBeTruthy();
    });
    });


// check when user is logged on and check if there is logout button ( check for the log-out function + button )
describe('Navbar', () => {
    it('does not render a Logout button when user is not logged in', () => {
      const wrapper = shallow(<Navbar />);
      expect(wrapper.find('button.btn').length).toEqual(2);
      expect(wrapper.find('button.btn').at(0).text()).toEqual('Sign-in');
      expect(wrapper.find('button.btn').at(1).text()).toEqual('Sign-up');
      expect(wrapper.find('Link[to="/Logout"]').length).toEqual(0);
    });
  
    it('renders a Login button when user is not logged in', () => {
        const wrapper = shallow(<Navbar />);
        jest.spyOn(React, 'useState').mockReturnValueOnce([null, false]);
        expect(wrapper.find('button.btn').length).toEqual(2);
        expect(wrapper.find('button.btn').at(0).text()).toEqual('Sign-in');
        expect(wrapper.find('button.btn').at(1).text()).toEqual('Sign-up');
        expect(wrapper.find('Link[to="/Logout"]').length).toEqual(0);
      });

      // check if the logo link navigates to the correct route
it('navigates to the home route when logo is clicked', () => {
  const wrapper = shallow(<Navbar />);
  const logoLink = wrapper.find('Link[to="/"]');
  expect(logoLink.prop('to')).toEqual('/');
});

  });

  