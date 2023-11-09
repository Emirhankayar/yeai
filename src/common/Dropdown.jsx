import PropTypes from 'prop-types';
import MaterialComponent from './Material';

const DropdownComponent = ({ label, options, onChange, isOptionDisabled }) => (
  <MaterialComponent label={label} component="Select"
    labelProps={{ className: "text-white" }}
    menuProps={{ className: "bg-gray-200" }}
    size="md"
    containerProps={{ className: "min-w-[50px]" }}
    onChange={onChange}
  >
    {options.map((option, index) => (
      <MaterialComponent
        key={index}
        component="Option"
        className="bg-transparent gap-2 hover:bg-emerald-600 duration-300 ease-in-out"
        value={option.label}
        disabled={isOptionDisabled(option)}
      >
        <div className='flex gap-2 items-center'>
          {option.label}
        </div>
      </MaterialComponent>
    ))}
  </MaterialComponent>
);

DropdownComponent.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
  })).isRequired,
  selectedOption: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  isOptionDisabled: PropTypes.func,
};

export default DropdownComponent;