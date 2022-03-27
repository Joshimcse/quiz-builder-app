import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DndProvider } from 'react-dnd';
import update from 'immutability-helper';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Question from './Question';

const Questions = ({ questions, setQuestions }) => {
  const addNewQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: uuidv4(),
        title: '',
        optionsWithAnswer: [
          { value: '', isCorrect: false },
          { value: '', isCorrect: false },
        ],
      },
    ]);
  };

  const updateQuestionTitle = (index, value) => {
    const newQuestions = questions;
    newQuestions[index].title = value;
    setQuestions([...newQuestions]);
  };

  const deleteQuestion = index => {
    if (questions.length > 1) {
      const newQuestions = questions;
      newQuestions.splice(index, 1);
      setQuestions([...newQuestions]);
    }
  };

  const addOption = index => {
    const newQuestions = questions;
    newQuestions[index].optionsWithAnswer.push({ value: '', isCorrect: false });
    setQuestions([...newQuestions]);
  };

  const deleteOption = (questionIndex, optionIndex) => {
    const newQuestions = questions;
    let optionsWithAnswer = newQuestions[questionIndex].optionsWithAnswer;

    if (optionsWithAnswer.length > 2) {
      optionsWithAnswer.splice(optionIndex, 1);
      setQuestions([...newQuestions]);
    }
  };

  const optionInputHandler = (questionIndex, optionIndex, value) => {
    const newQuestions = questions;
    newQuestions[questionIndex].optionsWithAnswer[optionIndex].value = value;
    setQuestions([...newQuestions]);
  };

  const markOptionAsCorrectAnswerOrNot = (questionIndex, optionIndex) => {
    const newQuestions = questions;
    newQuestions[questionIndex].optionsWithAnswer[optionIndex].isCorrect =
      !newQuestions[questionIndex].optionsWithAnswer[optionIndex].isCorrect;
    setQuestions([...newQuestions]);
  };

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setQuestions(prevQuestions =>
      update(prevQuestions, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevQuestions[dragIndex]],
        ],
      })
    );
  }, []);

  return (
    <div className="border border-gray-300 border-dashed rounded pt-2 pb-6 px-4 mt-5">
      <div>
        <DndProvider backend={HTML5Backend}>
          {questions?.map((question, index) => (
            <Question
              key={question.id}
              id={question.id}
              index={index}
              addNewQuestion={addNewQuestion}
              question={question}
              addOption={addOption}
              deleteOption={deleteOption}
              deleteQuestion={deleteQuestion}
              optionInputHandler={optionInputHandler}
              updateQuestionTitle={value => updateQuestionTitle(index, value)}
              markOptionAsCorrectAnswerOrNot={markOptionAsCorrectAnswerOrNot}
              moveCard={moveCard}
            />
          ))}
        </DndProvider>
      </div>

      <div className="mt-4">
        <button
          className=" bg-orange-600 py-3 w-full flex flex-row items-center justify-center rounded text-white uppercase font-bold"
          onClick={addNewQuestion}
        >
          <AiOutlinePlusCircle className="mr-1" /> Add Question
        </button>
      </div>
    </div>
  );
};
export default Questions;
