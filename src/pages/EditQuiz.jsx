import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';

import Questions from '../components/edit/Questions';
import {
  editQuiz,
  formatQuestionsForState,
  formatQuestionsForStore,
  getQuiz,
} from '../utils';

const EditQuiz = () => {
  const { quizId } = useParams();
  const [quizInfo, setQuizInfo] = useState(null);

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const quiz = getQuiz(quizId);
    if (quiz) {
      setQuizInfo({
        id: quiz?.id,
        title: quiz?.title,
        pointPerQuetion: quiz?.pointPerQuetion,
        isShowQuestionPerPage: quiz?.isShowQuestionPerPage,
      });

      setQuestions(formatQuestionsForState(quiz?.questions));
    }
  }, []);

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

  const updateQuizHandler = () => {
    editQuiz({
      ...quizInfo,
      questions: formatQuestionsForStore(questions),
    });
  };

  return quizInfo ? (
    <div className="bg-gray-50 pt-3 pb-5 h-screen">
      <div className="w-900 mx-auto  pt-3 px-6 rounded-lg">
        <div className="flex flex-row items-start">
          <input
            className="border rounded h-9 text-12 border-gray-500 py-1 px-2 w-11/12 mr-5 focus:border-gray-500"
            placeholder="Quiz Title"
            type="text"
            name="title"
            value={quizInfo?.title}
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
                value={quizInfo?.pointPerQuetion}
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
            onClick={updateQuizHandler}
          >
            <AiOutlinePlusCircle className="mr-1" /> Update Quiz
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default EditQuiz;
