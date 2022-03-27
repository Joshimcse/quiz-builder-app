import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

const QuizCard = ({ index, id, title, quizDeleteHandler }) => {
  return (
    <div className="bg-slate-50 mx-auto shadow-md p-3 rounded mb-3 flex items-center relative">
      <Link
        to={`/view/${id}`}
        className="text-16 font-bold cursor-pointer mr-4 pr-10 w-full"
      >
        {`Q.${index + 1} : ${title}`}
      </Link>

      <div className="flex ml-auto absolute right-0 h-full border-l pl-1 items-center">
        <Link to={`/edit/${id}`} className="">
          <button className="text-16 mr-1 text-gray-900 py-2 px-1">
            <AiOutlineEdit />
          </button>
        </Link>

        <button
          className="text-16 py-2 px-1 text-red-500"
          onClick={quizDeleteHandler}
        >
          <AiOutlineDelete />
        </button>
      </div>
    </div>
  );
};

export default QuizCard;
