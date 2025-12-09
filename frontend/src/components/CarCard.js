import React from 'react';
import './CarCard.css';

const CarCard = ({ car }) => {
  return (
    <div className="car-card">
      {car.image && (
        <div className="car-card-image">
          <img src={car.image} alt={car.name} />
        </div>
      )}
      <div className="car-card-content">
        <h3 className="car-card-name">{car.name}</h3>
        <p className="car-card-description">{car.description}</p>
        <div className="car-card-actions">
          <p className="car-card-price">
            ${car.price} <span className="price-per-day">per day</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
