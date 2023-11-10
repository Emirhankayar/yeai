import PropTypes from 'prop-types';
import MaterialComponent from "./Material";
import Icon from './Icons';

export function SearchBar({ value, onChange, handleSearch, handleRefresh, searchTerm }) {
    return (
            <MaterialComponent 
              component="Input"
              type="text"
              color="white"
              value={value}
              icon={searchTerm 
                ? <Icon icon="ArrowLeftCircleIcon" color="white" className="w-5 h-5 cursor-pointer hover:text-emerald-900 duration-300" onClick={handleRefresh} />
                : <Icon icon="MagnifyingGlassIcon" color="white" className="w-5 h-5 cursor-pointer hover:text-emerald-900 duration-300" onClick={handleSearch} />}
              onChange={onChange}
              variant="outlined"
              label="Search"
              size="md"
              aria-label="Search"
              containerProps={{ className: "min-w-[50px]" }}
            />
     );
   }
  
  SearchBar.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
    handleRefresh: PropTypes.func.isRequired,
    searchTerm: PropTypes.string,
  };

export default SearchBar;