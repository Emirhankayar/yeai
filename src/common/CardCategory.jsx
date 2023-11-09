import PropTypes from 'prop-types';
import MaterialComponent from "./Material";
import Icon from "./Icons";

export function CategoryCard({ category, handleCategoryClick }) {
    return (
      <MaterialComponent
        component="Option"
        className="bg-transparent gap-2 hover:bg-emerald-600 duration-300 ease-in-out"
        aria-label="select category"
        onClick={() => handleCategoryClick(category.original)}
      >
        <div className='flex gap-2 items-center'>
  
        <Icon icon="Squares2X2Icon" className="w-3 h-3" />
        {category.modifiedName}
        </div>
      </MaterialComponent>
    );
  }
  CategoryCard.propTypes = {
    category: PropTypes.shape({
      original: PropTypes.string,
      modifiedName: PropTypes.string
    }).isRequired,
    handleCategoryClick: PropTypes.func.isRequired,
  };


export default { CategoryCard }