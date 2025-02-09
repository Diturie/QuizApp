import React from 'react';
import {useNavigate } from 'react-router-dom'; 
import '../styles/Results.css';

const Results = ({ score, results, userInfo }) => {
  const navigate = useNavigate(); 

  console.log(results);
  console.log('Results length:', results.length);

  return (
    <div className="results">
      <h2>Quiz Results</h2>
      <p><strong>Name:</strong> {userInfo.name} {userInfo.surname}</p>
      <p><strong>Email:</strong> {userInfo.email}</p>
      <p><strong>Total Score:</strong> {score} out of {results.length}</p>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>Question {index + 1}</td>
              <td>{result.isCorrect ? 'Correct' : 'Incorrect'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    
      <button className="back-button" onClick={() =>navigate('/')}>
        Back to Home
      </button>
    </div>
  );
};

export default Results;
