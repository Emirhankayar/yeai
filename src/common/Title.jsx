import PropTypes from 'prop-types';
import MaterialComponent from "./Material";

export function PgTitle({ text }) {
    return (
      <MaterialComponent component="Typography" variant="h5" color="white" className="font-bold">
        {text}
      </MaterialComponent>
    );
  }
  PgTitle.propTypes = {
    text: PropTypes.string.isRequired,
  };

export default PgTitle;