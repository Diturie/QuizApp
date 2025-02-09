import React, { useEffect, useState } from 'react';
import '../styles/StartAnimation.css';

const StartAnimation = ({ onAnimationEnd }) => {
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowQuiz(true);
      onAnimationEnd();
    }, 3000); 

    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

  return (
    <div className="animation-container">
      {!showQuiz ? (
        <h1 className="quiz-title">CodeQuest</h1> 
      ) : (
        <div className="quiz-container"> 
          <h2>Quiz is starting...</h2>
        </div>
      )}
    </div>
  );
};

export default StartAnimation;
