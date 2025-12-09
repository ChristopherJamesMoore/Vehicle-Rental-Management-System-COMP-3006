import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="about-us-container">
        <h2 className="about-us-heading">About Our Business</h2>
        <p className="about-us-text">
          We are a premier vehicle rental service dedicated to providing our customers with the best experience possible. Our fleet consists of a wide range of vehicles to suit every need, from luxury sedans for business trips to spacious SUVs for family vacations.
        </p>
        <div className="values-container">
          <div className="value">
            <h3 className="value-heading">Quality</h3>
            <p className="value-text">
              We pride ourselves on the quality of our vehicles. Every car is meticulously maintained and regularly serviced to ensure your safety and comfort.
            </p>
          </div>
          <div className="value">
            <h3 className="value-heading">Service</h3>
            <p className="value-text">
              Our commitment to customer service is second to none. Our team is always on hand to assist you with any queries or special requests you may have.
            </p>
          </div>
          <div className="value">
            <h3 className="value-heading">Value</h3>
            <p className="value-text">
              We offer competitive pricing and flexible rental options to provide you with the best value for your money.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
