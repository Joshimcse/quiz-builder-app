import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import DashboardComp from '../components/Dashboard';
import { deleteQuiz, getQuizzes, isEmpty } from '../utils';

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState(null);

  useEffect(() => {
    const _quizzes = getQuizzes();
    if (_quizzes) setQuizzes(_quizzes);
  }, []);

  const quizDeleteHandler = id => {
    const quizzesAfterDelete = deleteQuiz(id);
    if (!isEmpty(quizzesAfterDelete)) {
      setQuizzes(quizzesAfterDelete);
    }
  };
  return (
    quizzes && (
      <div className="bg-gray-50 pb-5 h-screen">
        <Link to="/create">
          <button>Create Quiz</button>
        </Link>
        <div className="w-900 mx-auto pt-3 px-6 rounded-lg h-full">
          <div className="bg-slate-50 w-4/5 mx-auto shadow p-4 rounded mt-4 first:mt-0">
            {quizzes?.map(({ id, title }, index) => (
              <DashboardComp
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
