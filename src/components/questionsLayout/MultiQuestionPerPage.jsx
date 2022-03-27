import Question from '../view/Question';
import SubmitButton from '../view/SubmitButton';

const MultiQuestionPerPage = ({
  quiz,
  submittedAnswersHandler,
  setIsSubmitQuiz,
}) => {
  return (
    <div className="bg-gray-50 pb-5 h-full">
      <div className="w-900 mx-auto pt-3 px-6 rounded-lg h-full">
        <div className="bg-slate-50 w-4/5 mx-auto shadow p-4 rounded mt-4 first:mt-0">
          <div className="bg-slate-50 mx-auto shadow-md p-3 rounded mb-3">
            <h2 className="text-18 font-bold">{quiz?.title}</h2>
          </div>
          {quiz?.questions.map((question, index) => (
            <Question
              key={question.id}
              index={index + 1}
              question={question}
              submittedAnswersHandler={value =>
                submittedAnswersHandler(index, value)
              }
            />
          ))}
          <SubmitButton setIsSubmitQuiz={() => setIsSubmitQuiz(true)} />
        </div>
      </div>
    </div>
  );
};

export default MultiQuestionPerPage;
