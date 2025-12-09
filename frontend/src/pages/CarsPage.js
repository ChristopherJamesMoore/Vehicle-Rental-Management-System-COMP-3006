import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import CarCard from '../components/CarCard';
import CarDetails from '../components/CarDetails';
import Footer from '../components/Footer';
import './CarsPage.css';
import bydSeal from '../assets/no-bg/byd-seal.png';
import lexusEs from '../assets/no-bg/lexus-es.png';
import mercEClass from '../assets/no-bg/merc-e-class.png';

const cars = [
  {
    id: 1,
    name: 'Lexus ES',
    image: lexusEs,
    description: 'A great business car with a luxurious and comfortable ride.',
    price: '150',
  },
  {
    id: 2,
    name: 'BYD Seal',
    image: bydSeal,
    description: 'A stylish and modern electric sedan with a long range.',
    price: '120',
  },
  {
    id: 3,
    name: 'Mercedes-Benz E-Class',
    image: mercEClass,
    description: 'A classic choice for business travel, offering both comfort and performance.',
    price: '180',
  },
  {
    id: 4,
    name: 'Lexus IS',
    image: lexusEs,
    description: 'A sporty sedan with a powerful engine and agile handling.',
    price: '140',
  },
  {
    id: 5,
    name: 'BYD Atto 3',
    image: bydSeal,
    description: 'A compact electric SUV with a spacious interior and a long list of features.',
    price: '110',
  },
  {
    id: 6,
    name: 'Mercedes-Benz C-Class',
    image: mercEClass,
    description: 'A stylish and luxurious compact sedan with a comfortable ride and a high-tech interior.',
    price: '160',
  },
];

const CarsPage = () => {
  const [selectedCar, setSelectedCar] = useState(null);

  const handleCarSelect = (car) => {
    setSelectedCar(car);
  };

  return (
    <div className="cars-page">
      <Navbar />
      <div className="cars-page-content">
        <div className="cars-list">
          {cars.map((car) => (
            <div key={car.id} onClick={() => handleCarSelect(car)}>
              <CarCard car={car} />
            </div>
          ))}
        </div>
        <div className="car-details-container">
          <CarDetails car={selectedCar} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CarsPage;
