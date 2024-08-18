import React from 'react';
import HeroSection from './HeroSection';
import ServiceSection from './ServiceSection';
import AboutSection from './AboutSection';
import AdvertiseSection from './AdvertiseSection';
import MembershipSection from './MembershipSection';
import Footer from './Footer';
import ContactUs from './ContactUs';

const MgiWebsiteFree = () => {
  return (
    <div>
      <div id="hero-section"><HeroSection/></div>
      <div id="service-section"><ServiceSection/></div>
      <div id="about-section"><AboutSection/></div>
      <div id="advertise-section"><AdvertiseSection/></div>
      <div id="membership-section"><MembershipSection/></div>
      <div id="contact-us"><ContactUs/></div>
      <div id="footer"><Footer/></div>
    </div>
  );
}

export default MgiWebsiteFree;
