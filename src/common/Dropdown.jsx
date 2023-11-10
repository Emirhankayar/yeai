import PropTypes from "prop-types";
import Icon from "./Icons";
import MaterialComponent from "./Material";
import { useState, useEffect } from "react";

const DropdownComponent = ({
  label,
  options,
  onChange,
  value,
  isOptionDisabled,
}) => {
  const [selectedOption, setSelectedOption] = useState(value);
  useEffect(() => {
    setSelectedOption(value);
  }, [value]);
  const handleChange = (newValue) => {
    setSelectedOption(newValue);
    onChange(newValue);
  };

  const handleClear = () => {
    setSelectedOption(null);
    onChange(null);
  };

  return (
    <MaterialComponent
      label={label}
      component="Select"
      labelProps={{ className: "!text-white" }}
      menuProps={{ className: "!bg-gray-300 text-gray-900" }}
      size="md"
      arrow={
        selectedOption &&
        (typeof selectedOption === "object"
          ? selectedOption.field && selectedOption.order
          : selectedOption) ? (
          <Icon
            icon="XMarkIcon"
            className="text-emerald-900"
            onClick={handleClear}
          />
        ) : (
          <Icon icon="ChevronDownIcon" className="text-white hover:text-emerald-900 duration-300" />
        )
      }
      animate={{
        mount: { y: 0, opacity: 1 },
        unmount: { y: 25, opacity: 0 },
      }}
      containerProps={{ className: "min-w-[50px]" }}
      onChange={handleChange}
      className="text-gray-500"
      value={selectedOption}
    >
      {options.map((option, index) => (
        <MaterialComponent
          key={index}
          component="Option"
          className="gap-2 bg-transparent hover:!bg-emerald-600 duration-300 ease-in-out active:!bg-emerald-700"
          value={option.label}
          selected={option.label === selectedOption} // Modified line
          disabled={isOptionDisabled(option)}
        >
          <div className="flex gap-2 items-center">{option.label}</div>
        </MaterialComponent>
      ))}
    </MaterialComponent>
  );
};

DropdownComponent.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      field: PropTypes.string,
      order: PropTypes.string,
    }),
  ]),
  onChange: PropTypes.func.isRequired,
  isOptionDisabled: PropTypes.func,
};

export default DropdownComponent;