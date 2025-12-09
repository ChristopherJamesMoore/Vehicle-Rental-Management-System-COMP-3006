import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CarShowcase.css';
import bydSeal from '../assets/byd-seal.webp';
import lexusEs from '../assets/lexus-es.jpg';
import mercEClass from '../assets/merc-e-class.jpg';

const cars = [
  {
    id: 1,
    name: 'Lexus ES',
    image: lexusEs,
  },
  {
    id: 2,
    name: 'BYD Seal',
    image: bydSeal,
  },
  {
    id: 3,
    name: 'Mercedes-Benz E-Class',
    image: mercEClass,
  },
];

const CarShowcase = () => {
  const [currentCar, setCurrentCar] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentCar((prevCar) => (prevCar === cars.length - 1 ? 0 : prevCar + 1));
    }, 5000); // Change car every 5 seconds

    return () => clearTimeout(timer);
  }, [currentCar]);

  return (
    <div className="car-showcase">
      {cars.map((car, index) => (
        <div
          key={car.id}
          className={`showcase-slide ${index === currentCar ? 'active' : ''}`}
          style={{ backgroundImage: `url(${car.image})` }}
        >
          <div className="showcase-content">
            <h1>{car.name}</h1>
            <p>Find the perfect car for your next adventure.</p>
            <Link to="/cars">
              <button className="showcase-btn">Explore Cars</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarShowcase;
