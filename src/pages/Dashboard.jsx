import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import QuizCard from '../components/dashboard/QuizCard';
import { deleteQuiz, getQuizzes, isArray } from '../utils';

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState(null);
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const _quizzes = getQuizzes();
    if (_quizzes) setQuizzes(_quizzes);
  }, []);

  useEffect(() => {
    if (searchParams.get('add_new_quiz') === 'true') {
      showToastHandler('Successfully Add New Quiz');
      setSearchParams({});
    }
    if (searchParams.get('edit_quiz') === 'true') {
      showToastHandler('Edit Quiz Success');
      setSearchParams({});
    }
  }, []);

  const showToastHandler = (msg, duration = 1000) =>
    toast.success(msg, {
      position: 'top-center',
      autoClose: duration,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

  const quizDeleteHandler = id => {
    const quizzesAfterDelete = deleteQuiz(id);
    console.log(id, quizzesAfterDelete);
    if (isArray(quizzesAfterDelete)) {
      showToastHandler('Quiz Deleted!', 1000);
      setQuizzes(quizzesAfterDelete);
    }
  };

  return (
    quizzes && (
      <div className="bg-gray-50 pb-5 h-screen">
        <div className="w-900 bg-gray-100 mx-auto pt-3 px-6 rounded-lg h-full">
          <div className="flex items-center bg-gray-300 pl-3 rounded-l">
            <h2 className="text-16 font-bold uppercase">Dashboard</h2>
            <Link className="ml-auto" to="/add-quiz">
              <button className=" bg-gray-500 text-white px-4 py-2 rounded">
                Create Quiz
              </button>
            </Link>
          </div>
          <div className="bg-slate-50 w-4/5 mx-auto shadow p-4 rounded mt-4 first:mt-0">
            {quizzes?.map(({ id, title }, index) => (
              <QuizCard
                key={id}
                index={index}
                id={id}
                title={title}
                quizDeleteHandler={() => quizDeleteHandler(id)}
              />
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
