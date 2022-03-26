import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import Question from '../view/Question';

const SingleQuestionPerPage = ({
  quiz,
  submittedAnswersHandler,
  setIsSubmitQuiz,
}) => {
  return (
    <div className="bg-gray-50 pb-5 h-screen">
      <div className="w-900 mx-auto pt-10 px-6 rounded-lg h-full">
        <div className="h-4/5 bg-white rounded">
          <Carousel
            className="singleQuestion h-full"
            autoPlay={false}
            centerMode={false}
            infiniteLoop={false}
            showArrows={true}
            showStatus={true}
            showIndicators={false}
            showThumbs={false}
          >
            {/* <Question singleView={true} />
            <Question singleView={true} />
            <Question singleView={true} submit={true} /> */}

            {quiz?.questions.map((question, index) => (
              <Question
                key={question.id}
                index={index + 1}
                question={question}
                singleView={true}
                submittedAnswersHandler={value =>
                  submittedAnswersHandler(index, value)
                }
                setIsSubmitQuiz={setIsSubmitQuiz}
                submit={index + 1 === quiz?.questions?.length}
              />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default SingleQuestionPerPage;
