import { useState } from 'react';
import { Link } from 'react-router-dom';

import { getQuizResult } from '../../utils';

const Success = ({
  correctAnswers,
  submitedAnswers,
  pointPerQuetion,
  handleTryAgain,
}) => {
  const [quizResult, setQuizResult] = useState(null);

  useState(() => {
    const [numberOfCorrectAnswers, earnPoints] = getQuizResult(
      correctAnswers,
      submitedAnswers,
      pointPerQuetion
    );

    setQuizResult({
      numberOfCorrectAnswers,
      earnPoints,
    });
  }, []);

  return (
    quizResult && (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <img className=" h-1/4 w-auto" src="/src/winner.svg" alt="" />
        <h2 className=" text-28 text-center text-green-500 font-bold mb-1">
          Congratulations!
        </h2>

        <h2 className="text-24 text-center text-green-500 font-bold mb-3">
          You have successfully completed
        </h2>
        <p className="text-18 mb-2">
          {quizResult?.numberOfCorrectAnswers} of {submitedAnswers.length}
        </p>
        <p className="text-18 font-bold">
          You earned +{quizResult?.earnPoints} points
        </p>
        <div className="flex">
          <Link to="/">
            <button className="mr-4 text-14 w-48 font-bold uppercase text-white bg-green-600 mt-4 flex flex-row items-center justify-center p-2 rounded">
              Goto Dashboard
            </button>
          </Link>

          <button
            className="text-14 w-48 font-bold uppercase text-white bg-green-600 mt-4 flex flex-row items-center justify-center p-2 rounded"
            onClick={handleTryAgain}
          >
            Try Again
          </button>
        </div>
      </div>
    )
  );
};

export default Success;
