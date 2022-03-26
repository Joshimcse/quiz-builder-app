const OptionView = ({
  id,
  label,
  className,
  submittedAnswersHandler,
  textSize,
}) => {
  return (
    <div className={`flex flex-row items-center mb-2 last:mb-0 ${className}`}>
      <input
        className="input-checkbox focus:ring-0 checked:focus:ring-0 mr-3 cursor-pointer"
        //TODO: id={id}
        type="checkbox"
        onChange={submittedAnswersHandler}
      />
      <label
        className={`block font-semibold cursor-pointer ${textSize}`}
        // htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default OptionView;
