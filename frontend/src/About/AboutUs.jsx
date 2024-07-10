import React from 'react';
import About from '../components/About';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="mt-8">
        <About />
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
