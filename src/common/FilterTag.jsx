import PropTypes from 'prop-types';
import MaterialComponent from './Material';
import Icon from './Icons';

export default function FilterTag({ filterName, displayValue, onClear }) {
    const backgroundColor = filterName === 'Filtered by' ? 'bg-yellow-900' : 
                            filterName === 'Sorted by' ? 'bg-blue-600' : 
                            filterName === 'Category' ? 'bg-emerald-900' : 'bg-gray-900';

    return (
      <div className={`flex items-center gap-2 ${backgroundColor} px-2 rounded-lg`}>
        <MaterialComponent component="Typography" variant="small" className="font-normal"> {displayValue}</MaterialComponent>
        <Icon icon="XMarkIcon" color="whitesmoke" className="w-5 h-5 cursor-pointer" onClick={onClear}/>
      </div>
    );
  }
  
  FilterTag.propTypes = {
    filterName: PropTypes.string.isRequired,
    displayValue: PropTypes.string.isRequired,
    onClear: PropTypes.func.isRequired,
  };