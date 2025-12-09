import React from 'react';
import Navbar from '../components/Navbar';
import CarShowcase from '../components/CarShowcase';
import AboutUs from '../components/AboutUs';
import Footer from '../components/Footer';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <Navbar />
      <CarShowcase />
      <AboutUs />
      <Footer />
    </div>
  );
};

export default HomePage;
