import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import App from './App';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Signup from './Components/Signup/Signup';
import Signin from './Components/Signin/Signin';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import Home from './Components/Home/Home';
import Admin from './Components/Admin/Admin';
import Confirmation from './Components/Confirmation/Confirmation';

Enzyme.configure({ adapter: new Adapter() });
// Mock fetchUserData function
jest.mock('./utils/fetchLocalStorageData', () => ({
    fetchUserData: jest.fn(),
  }));
  
  describe('App component', () => {
    it('renders without crashing', () => {
      shallow(<App />);
    });
  
    it('renders the Navbar component', () => {
      const wrapper = shallow(<App />);
      expect(wrapper.find(Navbar)).toHaveLength(1);
    });
  
    it('renders the Footer component', () => {
      const wrapper = shallow(<App />);
      expect(wrapper.find(Footer)).toHaveLength(1);
    });
  
    it('renders the Signinup component when the route matches "/Signin-up"', () => {
      const wrapper = shallow(<App />);
      const SignupRoute = wrapper.find({ path: '/Sign-up' });
      expect(SignupRoute.props().element).toEqual(<Signup />);
    });
  
    it('renders the Signinin component when the route matches "/Signin-in"', () => {
      const wrapper = shallow(<App />);
      const SigninRoute = wrapper.find({ path: '/Sign-in' });
      expect(SigninRoute.props().element).toEqual(<Signin />);
    });

    it('renders the Home component when the route matches "/"', () => {
      const wrapper = shallow(<App />);
      const homeRoute = wrapper.find({ path: '/' });
      expect(homeRoute.props().element).toEqual(<Home />);
    });

  });


  function checkUserRoles(userData) {
    var adminState = false;
    var Logedin = false;
  
    if (userData) {
      if (userData.userRoles.includes('admin'))
        adminState = true;
    }
    if (userData) {
      if (userData.userRoles.includes('user'))
        Logedin = true;
    }
  
    return { adminState, Logedin };
  }
  
  describe('checkUserRoles', () => {
    it('should set adminState to true if user is an admin', () => {
      // Arrange
      const userData = {
        userRoles: ['admin']
      };
      const expectedAdminState = true;
  
      // Act
      const result = checkUserRoles(userData);
  
      // Assert
      expect(result.adminState).toBe(expectedAdminState);
    });
  
    it('should set Logedin to true if user is a user', () => {
      // Arrange
      const userData = {
        userRoles: ['user']
      };
      const expectedLogedinState = true;
  
      // Act
      const result = checkUserRoles(userData);
  
      // Assert
      expect(result.Logedin).toBe(expectedLogedinState);
    });
  
    it('should set adminState to false if user is not an admin', () => {
      // Arrange
      const userData = {
        userRoles: ['user']
      };
      const expectedAdminState = false;
  
      // Act
      const result = checkUserRoles(userData);
  
      // Assert
      expect(result.adminState).toBe(expectedAdminState);
    });
  
    it('should set Logedin to false if user is not a user', () => {
      // Arrange
      const userData = {
        userRoles: []
      };
      const expectedLogedinState = false;
  
      // Act
      const result = checkUserRoles(userData);
  
      // Assert
      expect(result.Logedin).toBe(expectedLogedinState);
    });
  });
  
  