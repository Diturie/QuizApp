import React, { useState } from 'react';
import Header from './Header';
import { allQuestions } from './question'; 
import '../styles/HomePage.css';

const HomePage = ({ onStartQuiz }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCategory) {
      const categoryQuestions = allQuestions[selectedCategory]; // Merr pyetjet per kategorine
      onStartQuiz({ name, surname, email, category: selectedCategory, questions: categoryQuestions });
    } else {
      alert('Please select a category!');
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <Header onSelectCategory={handleCategorySelect} />
      <div className="homepage">
        <div className="quiz-container"> 
          <h1>Welcome to the <span> CodeQuest</span></h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Start Quiz</button>
          </form>
          {selectedCategory && (
            <p>
              Selected Category: <strong>{selectedCategory}</strong>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
