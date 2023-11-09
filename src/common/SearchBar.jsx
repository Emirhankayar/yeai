import PropTypes from 'prop-types';
import MaterialComponent from "./Material";

export function SearchBar({ value, onChange }) {
    return (
            <MaterialComponent 
              component="Input"
              type="text"
              color="white"
              value={value}
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
  };

export default SearchBar;