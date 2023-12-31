import PropTypes from "prop-types";
import MaterialComponent from "./Material";
import Icon from "./Icons";

export function SimplePagination({ active, next, prev, totalPages }) {
  return (
    <div className="flex items-center gap-8">
      <MaterialComponent
        component="IconButton"
        size="sm"
        variant="outlined"
        color="white"
        onClick={prev}
        disabled={active === 1}
      >
        <Icon icon="ArrowLeftIcon" strokeWidth={2} className="h-4 w-4" />
      </MaterialComponent>
      <MaterialComponent component="Typography" className="font-normal">
        Page <strong className="text-emerald-900">{active}</strong> of{" "}
        <strong className="text-emerald-400">{totalPages}</strong>
      </MaterialComponent>
      <MaterialComponent
        component="IconButton"
        size="sm"
        variant="outlined"
        color="white"
        onClick={next}
        disabled={active === totalPages}
      >
        <Icon icon="ArrowRightIcon" strokeWidth={2} className="h-4 w-4" />
      </MaterialComponent>
    </div>
  );
}

SimplePagination.propTypes = {
  active: PropTypes.number.isRequired,
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default { SimplePagination };
