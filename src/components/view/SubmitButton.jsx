import React from 'react';

const SubmitButton = ({ className, setIsSubmitQuiz }) => {
  return (
    <button
      className={`text-16 font-bold uppercase text-white w-full bg-green-600 mt-4 flex flex-row items-center justify-center p-2 rounded ${className}`}
      onClick={setIsSubmitQuiz}
    >
      Submit
    </button>
  );
};

export default SubmitButton;
