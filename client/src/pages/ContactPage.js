import React from 'react';
import Navbar from '../components/Navbar'; // Adjust path if necessary
import '../styles/ContactPage.css';

const ContactPage = () => {
  return (
    <div className="page-container">
      <Navbar />
      <div className="contact-page-content">
        <h1>Contact Us</h1>
        <p>
          Have questions, feedback, or need support? Feel free to reach out to us on Github!
        </p>
        <p>
          @Redwolf917
          @MagneticSoul7
          @Michael-Isom
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
