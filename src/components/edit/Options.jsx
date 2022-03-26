import { AiOutlineDelete } from 'react-icons/ai';

const Option = ({
  option,
  deleteOption,
  optionInputHandler,
  markOptionAsCorrectAnswerOrNot,
}) => {
  return (
    <div className="flex flex-row items-center mt-1 w-1/2">
      <input
        className="border rounded w-2/3 h-8 text-10 border-gray-500 py-1 px-2 focus:border-gray-500"
        placeholder="Option"
        type="text"
        value={option?.value}
        onChange={e => {
          optionInputHandler(e.target.value);
        }}
      />
      <div className="w-1/3">
        <div className="ml-5">
          <input
            id="correct"
            type="checkbox"
            className="mr-2 cursor-pointer w-2.5 h-2.5"
            onChange={markOptionAsCorrectAnswerOrNot}
            checked={option.isCorrect}
          />
          <label className="cursor-pointer uppercase text-10" htmlFor="correct">
            Correct
          </label>
        </div>

        <div className="ml-5">
          <button
            className="text-red-600 py-0 flex text-10 flex-row items-center justify-center rounded uppercase"
            onClick={deleteOption}
          >
            <AiOutlineDelete className="mr-2 text-12" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default Option;
