import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { AiOutlinePlusCircle, AiOutlineDelete } from 'react-icons/ai';
import { ItemTypes } from '../../constants';

import Options from './Options';

const Question = ({
  id,
  moveCard,
  question,
  addOption,
  deleteOption,
  index,
  deleteQuestion,
  optionInputHandler,
  updateQuestionTitle,
  markOptionAsCorrectAnswerOrNot,
}) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.QUESTION,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.QUESTION,
    item: () => {
      return { id, index };
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      className="mt-4 bg-gray-200 border border-gray-800 py-3 px-12 rounded-xl relative"
      ref={ref}
      data-handler-id={handlerId}
    >
      <div className="border border-gray-800 rounded-tl-xl rounded-br-xl w-9 h-9 flex items-center justify-center absolute -top-px -left-px">
        <h5 className="m-0 p-0 text-16">{index + 1}</h5>
      </div>
      <div
        className="bg-red-600 rounded-tr-xl rounded-bl-xl w-9 h-9 flex items-center justify-center absolute -top-px -right-px"
        onClick={() => deleteQuestion(index)}
      >
        <button className="text-white text-16">
          <AiOutlineDelete />
        </button>
      </div>

      <div>
        <input
          className="border rounded h-9 text-12 border-gray-500 py-1 px-2 w-full  focus:border-gray-500"
          type="text"
          value={question?.title}
          onChange={e => updateQuestionTitle(e.target.value)}
          placeholder="Question Title"
        />

        <div className="flex flex-row flex-wrap">
          {question?.optionsWithAnswer?.map((option, optionIndex) => (
            <Options
              key={optionIndex}
              option={option}
              deleteOption={() => deleteOption(index, optionIndex)}
              optionInputHandler={value =>
                optionInputHandler(index, optionIndex, value)
              }
              markOptionAsCorrectAnswerOrNot={() =>
                markOptionAsCorrectAnswerOrNot(index, optionIndex)
              }
            />
          ))}
        </div>

        <div className="w-1/2 mr-5 mt-2">
          <button
            className="bg-orange-600 py-2 w-full flex flex-row items-center text-12 justify-center rounded text-white uppercase font-bold"
            onClick={() => addOption(index)}
          >
            <AiOutlinePlusCircle className="mr-1" /> Add More Option
          </button>
        </div>
      </div>
    </div>
  );
};
export default Question;
