import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import Quiz from './components/Quiz';
import Results from './components/Results';
import StartAnimation from './components/StartAnimation';
import { allQuestions } from './components/question';

const App = () => {
  const [showStartAnimation, setShowStartAnimation] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [category, setCategory] = useState(null);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  const handleStartQuiz = (info) => {
    setUserInfo(info);
    setCategory(info.category);
    navigate('/quiz');
  };

  const handleFinishQuiz = (finalScore, finalResults) => {
    setScore(finalScore);
    setResults(finalResults);
    navigate('/results');
  };

  const handleAnimationEnd = () => {
    setShowStartAnimation(false);
  };

  return (
    <div>
      {showStartAnimation ? (
        <StartAnimation onAnimationEnd={handleAnimationEnd} />
      ) : (
        <Routes>
          <Route path="/" element={<HomePage onStartQuiz={handleStartQuiz} />} />
          <Route
  path="/quiz"
  element={
    <Quiz
      userInfo={userInfo}
      questions={allQuestions[category] || []} // Kontroll për kategori të pavlefshme
      onFinish={handleFinishQuiz}
    />
            }
          />
          <Route
            path="/results"
            element={
              <Results score={score} results={results} userInfo={userInfo} />
            }
          />
        </Routes>
      )}
    </div>
  );
};

const AppWrapper = () => {
  return (
    <Router basename="/QuizApp">
      <App />
    </Router>
  );
};

export default AppWrapper;
