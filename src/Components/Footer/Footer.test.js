import React from 'react';
import Enzyme, { render, shallow } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import Footer from './Footer';
import { ReactComponent as SCEicon } from '../../Assets/SCEicon.svg';
import { screen } from '@testing-library/react';
Enzyme.configure({ adapter: new Adapter() });

describe('Footer', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.exists()).toBe(true);
  });

  it('contains a video element with proper attributes', () => {
    const wrapper = shallow(<Footer />);
    const video = wrapper.find('video');
    expect(video).toHaveLength(1);
  });


  it('contains links to YouTube and Instagram pages', () => {
    const wrapper = shallow(<Footer />);
    const youtubeLink = wrapper.find('a[href="https://www.youtube.com/@scebsc"]');
    const instagramLink = wrapper.find('a[href="https://www.instagram.com/sce.academy/"]');
    expect(youtubeLink).toHaveLength(1);
    expect(instagramLink).toHaveLength(1);
  });
});

  describe('SCEicon', () => {
    it('renders without errors', () => {
        const wrapper = shallow(<SCEicon />);
        expect(wrapper.exists()).toBe(true);
    });

    it('contains the correct contact information', () => {
      const wrapper = shallow(<Footer />);
      const contactInfo = wrapper.find('.footerParagraph').text();
      expect(contactInfo).toContain('The warehouse of the Department of Visual Communication Sami Shamoon College');
      expect(contactInfo).toContain('for any question or request, please contact Production studio and warehouse manager:');
      expect(contactInfo).toContain('Production studio and warehouse manager: Mr. Shay Sadika');
      expect(contactInfo).toContain('08-6174709');
      expect(contactInfo).toContain('shaysa@sce.ac.il');
    });
  
    it('contains clickable phone number and email', () => {
      const wrapper = shallow(<Footer />);
      const phoneNumberLink = wrapper.find('a[href="tel:08-6174709"]');
      const emailLink = wrapper.find('a[href="mailto:shaysa@sce.ac.il"]');
      expect(phoneNumberLink).toHaveLength(1);
      expect(emailLink).toHaveLength(1);
    });

    it('contains the site owners contact information', () => {
      const wrapper = shallow(<Footer />);
      const studentContacts = wrapper.find('.footerIntro span');
      expect(studentContacts).toHaveLength(4);
      expect(studentContacts.at(0).text()).toContain('Daniel Markov : daniema14@ac.sce.ac.il');
      expect(studentContacts.at(1).text()).toContain('Anton Volkov : antonvo@ac.sce.ac.il');
      expect(studentContacts.at(2).text()).toContain('Pavel Kormilchik : pavelko@ac.sce.ac.il');
      expect(studentContacts.at(3).text()).toContain('Orel Meir : orelma2@ac.sce.ac.il');
    });
  });