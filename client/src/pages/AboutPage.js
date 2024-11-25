import React from 'react';
import Navbar from '../components/Navbar'; // Adjust path if necessary
import '../styles/AboutPage.css';

const AboutPage = () => {
  return (
    <div className="page-container">
      <Navbar />
      <div className="about-page-content">
        <h1>About Card Flasher</h1>
        <p>
          Card Flasher is a flashcard application that helps you study and learn whatever subject you choose. You can create decks of flashcards, add cards to those decks, and quiz yourself on the cards. Card Flasher is a great tool for students, teachers, and anyone who wants to learn something new.
        </p>
        <p>
          The simple and intuitive design of Card Flasher makes it easy to create any deck of flashcards on any subject you want. You can then quiz yourself at you convenience to help you learn and retain the information.
        </p>
        <p>
          We believe Card Flasher is a great tool for anyone who wants to learn something new. We hope you enjoy using Card Flasher and find it helpful in your studies.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
