import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { ImSpinner } from 'react-icons/Im';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';

import Questions from '../components/edit/Questions';
import { addNewQuiz, formatQuestionsForStore } from '../utils';

const AddQuiz = () => {
  const history = useNavigate();
  const [loader, setLoader] = useState(false);
  const [quizInfo, setQuizInfo] = useState({
    title: 'quiz-title-1',
    pointPerQuetion: '1',
    isShowQuestionPerPage: true,
  });

  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      title: 'Initial Question 1',
      optionsWithAnswer: [
        { value: 'option-1-1', isCorrect: true },
        { value: 'option-1-2', isCorrect: false },
      ],
    },
    {
      id: uuidv4(),
      title: 'Initial Question 2',
      optionsWithAnswer: [
        { value: 'option-2-1', isCorrect: false },
        { value: 'option-2-2', isCorrect: true },
      ],
    },
  ]);

  const addNewQuizFailToast = () =>
    toast.error('Failed! Please Check Again. Quiz Title Must Be Unique', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

  const quizInfoInputHandler = e => {
    const { name, value } = e.target;
    setQuizInfo({
      ...quizInfo,
      [name]: value,
    });
  };

  const isShowQuesPerPageHandler = () => {
    setQuizInfo({
      ...quizInfo,
      isShowQuestionPerPage: !quizInfo.isShowQuestionPerPage,
    });
  };

  const saveQuizHandler = () => {
    setLoader(true);
    const isAddNewQuizSuccess = addNewQuiz({
      ...quizInfo,
      questions: formatQuestionsForStore(questions),
    });

    if (isAddNewQuizSuccess) {
      setLoader(false);
      history('/?add_new_quiz=true');
    } else {
      setLoader(false);
      addNewQuizFailToast();
    }
  };

  return (
    <div className="bg-gray-50 pt-3 pb-5 h-screen">
      <div className="w-900 mx-auto  pt-3 px-6 rounded-lg">
        <div className="flex flex-row items-start">
          <input
            className="border rounded h-9 text-12 border-gray-500 py-1 px-2 w-11/12 mr-5 focus:border-gray-500"
            placeholder="Quiz Title"
            type="text"
            name="title"
            value={quizInfo.title}
            onChange={quizInfoInputHandler}
          />

          <div className="flex flex-row items-start w-1/2">
            <div className="mr-5 w-1/2">
              <input
                className="border rounded h-9 text-12 w-full border-gray-500 py-1 px-2 focus:border-gray-500"
                placeholder="Points Per Ques."
                type="number"
                min="1"
                name="pointPerQuetion"
                value={quizInfo.pointPerQuetion}
                onChange={quizInfoInputHandler}
              />
            </div>

            <div className="w-1/2">
              <input
                id="single-view"
                type="checkbox"
                name=""
                className="mr-2 cursor-pointer h-3 w-3"
                checked={quizInfo?.isShowQuestionPerPage}
                onChange={isShowQuesPerPageHandler}
              />
              <label className="cursor-pointer text-12" htmlFor="single-view">
                Question Per Page
              </label>
            </div>
          </div>
        </div>

        <Questions questions={questions} setQuestions={setQuestions} />

        <div className="mt-4">
          <button
            className=" bg-green-600 py-3 w-full flex flex-row items-center justify-center rounded text-white uppercase font-bold"
            onClick={saveQuizHandler}
          >
            {loader ? (
              <ImSpinner className="mr-1.5 spinner" />
            ) : (
              <AiOutlinePlusCircle className="mr-1" />
            )}{' '}
            Save Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuiz;
