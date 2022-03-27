import cn from 'classnames';

import Option from './Option';
import SubmitButton from './SubmitButton';

const QuestionComponent = ({
  index,
  question,
  singleView,
  submittedAnswersHandler,
  submit,
  setIsSubmitQuiz,
}) => {
  return (
    <div
      className={cn(
        'bg-slate-50 mx-auto shadow-md py-3  rounded mt-4 first:mt-0',
        {
          'pr-20  px-10 flex flex-col h-full  ': singleView,
          'px-5': !singleView,
        }
      )}
    >
      <h2 className="text-16 font-bold mb-2 text-left">
        {`Q.${index} : ${question?.title}`}
      </h2>

      {question?.options.map((option, _index) => (
        <Option
          key={_index}
          id={_index}
          label={option}
          className={singleView ? 'mb-4' : ''}
          textSize={singleView ? 'text-16' : 'text-12'}
          submittedAnswersHandler={() => submittedAnswersHandler(option)}
        />
      ))}

      {singleView && submit && (
        <SubmitButton
          className="mt-auto mb-16"
          setIsSubmitQuiz={() => setIsSubmitQuiz(true)}
        />
      )}
    </div>
  );
};

export default QuestionComponent;
