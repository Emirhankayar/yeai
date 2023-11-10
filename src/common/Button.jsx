import PropTypes from "prop-types";
import Icon from "./Icons";
import MaterialComponent from "./Material";
export function PgButton({ text }) {
  return (
    <MaterialComponent
      component="Button"
      className="flex flex-row gap-2 items-center uppercase h-7"
    >
      <Icon icon="ArrowUturnLeftIcon" className="h-3 w-3" stroke="white" />
      {text}
    </MaterialComponent>
  );
}
PgButton.propTypes = {
  text: PropTypes.string.isRequired,
};
