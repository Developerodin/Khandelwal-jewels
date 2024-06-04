import React from 'react';
import './ContactUsButton.css';

const ContactUsButton = ({ onClick ,buttonName }) => {
  return (
    <button className="contact-us-button" onClick={onClick}>
      {buttonName}
    </button>
  );
};

export default ContactUsButton;
