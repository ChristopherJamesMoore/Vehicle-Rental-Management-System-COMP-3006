import React from 'react';
import Navbar from '../components/Navbar';
import CarShowcase from '../components/CarShowcase';
import Footer from '../components/Footer';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <Navbar />
      <CarShowcase />
      <Footer />
    </div>
  );
};

export default HomePage;
