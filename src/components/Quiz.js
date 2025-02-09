import React, { useState, useEffect } from "react";
import "../styles/Quiz.css";

const Quiz = ({ userInfo, questions = [], onFinish }) => {
  const [quizQuestions, setQuizQuestions] = useState([]); // Kopja e pyetjeve
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState([]);
  const [timers, setTimers] = useState([]);

  // Ngarko pyetjet dhe vendos timer-at kur komponenti ngarkohet
  useEffect(() => {
    if (questions && questions.length > 0) {
      setQuizQuestions([...questions]);
      setTimers(Array(questions.length).fill(45)); // Vendos timer-in per çdo pyetje
    } else {
      console.warn("Questions array is empty or undefined.");
    }
  }, [questions]);

  // Efekti per timer-in e pyetjes aktuale
  useEffect(() => {
    if (quizQuestions.length === 0) return; // Mos vazhdo nese pyetjet jane bosh

    if (timers[currentQuestion] > 0) {
      const countdown = setTimeout(() => {
        const updatedTimers = [...timers];
        updatedTimers[currentQuestion] -= 1;
        setTimers(updatedTimers);
      }, 1000);

      return () => clearTimeout(countdown);
    } else {
      handleNextQuestion(false); // Kalimi automatik ne pyetjen tjeter kur timer-i skadon
    }
  }, [timers, currentQuestion, quizQuestions]);

  // Funksioni per trajtimin e pergjigjes
  const handleAnswer = (selectedOption) => {
    const isCorrect =
      selectedOption === quizQuestions[currentQuestion].correctAnswer;

    const updatedResults = [
      ...results,
      { question: quizQuestions[currentQuestion].question, isCorrect },
    ];
    const updatedScore = score + (isCorrect ? 1 : 0);

    setResults(updatedResults);
    setScore(updatedScore);

    // Kontrollo nese eshte pyetja e fundit
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onFinish(updatedScore, updatedResults);
    }
  };

  // Funksioni per kalimin te pyetja tjeter
  const handleNextQuestion = (answered) => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else if (answered || timers[currentQuestion] === 0) {
      onFinish(score, results); // Perfundimi i quiz-it ne pyetjen e fundit
    }
  };

  // Funksioni per kalimin te pyetja e meparshme
  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  // Kontrollo nese ka pyetje te vlefshme ose perdorues te dhena
  if (!userInfo || !userInfo.name || quizQuestions.length === 0) {
    return <p>No user information or questions available. Please restart the quiz.</p>;
  }

  return (
    <div className="quiz">
      <div className="quiz-container">
        <h2>Welcome, {userInfo.name}!</h2>
        <h3>Category: {userInfo.category}</h3>
        <p>
          Question {currentQuestion + 1} of {quizQuestions.length}
        </p>
        <p>{quizQuestions[currentQuestion].question}</p>
        <div className="timer">{timers[currentQuestion]}s</div> 
        <div className="options">
          {quizQuestions[currentQuestion].options.map((option, index) => (
            <button key={index} onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
        </div>
        <div className="navigation-buttons">
          <button onClick={handleBack} disabled={currentQuestion === 0}>
            Back
          </button>
          <button
            onClick={() => handleNextQuestion(false)}
            disabled={currentQuestion === quizQuestions.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;

