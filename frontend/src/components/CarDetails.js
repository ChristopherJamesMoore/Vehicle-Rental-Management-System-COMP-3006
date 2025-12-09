import React from 'react';
import './CarDetails.css';

const CarDetails = ({ car }) => {
  if (!car) {
    return (
      <div className="car-details">
        <h2 className="car-details-placeholder">Select a car to see the details</h2>
      </div>
    );
  }

  return (
    <div className="car-details">
      <div className="car-details-image">
        <img src={car.image} alt={car.name} />
      </div>
      <h2 className="car-details-name">{car.name}</h2>
      <p className="car-details-description">{car.description}</p>
      <div className="car-details-actions">
        <p className="car-details-price">
          ${car.price} <span className="price-per-day">per day</span>
        </p>
        <button className="rent-btn">Rent Now</button>
      </div>
    </div>
  );
};

export default CarDetails;
