import PropTypes from "prop-types";
import MaterialComponent from "./Material";
import Icon from "./Icons";

export function CategoryCard({ categories, handleCategoryClick, handleRefresh, selectedCategory, formattedCategoryName }) {
  return (
    <MaterialComponent
      component="Select"
      label="Select Category"
      labelProps={{ className: "!text-white" }}
      menuProps={{ className: "!bg-gray-300 text-gray-900" }}
      size="md"
      arrow={
        selectedCategory ? (
          <Icon
            icon="XMarkIcon"
            className="text-emerald-900"
            onClick={handleRefresh}
          />
        ) : (
          <Icon
            icon="ChevronDownIcon"
            className="text-white hover:text-emerald-900 duration-300"
          />
        )
      }
      animate={{
        mount: { y: 0, opacity: 1 },
        unmount: { y: 25, opacity: 0 },
      }}
      containerProps={{ className: "min-w-[50px]" }}
      className="text-gray-500"
      value={formattedCategoryName}
    >
      {categories.map((category, index) => (
        <MaterialComponent
          key={index}
          component="Option"
          className="gap-2 bg-transparent hover:!bg-emerald-600 duration-300 ease-in-out active:!bg-emerald-700"
          aria-label="select category"
          onClick={() => handleCategoryClick(category.original)}
        >
          <div className="flex gap-2 items-center">
            {category.modifiedName}
          </div>
        </MaterialComponent>
      ))}
    </MaterialComponent>
  );
}

CategoryCard.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    original: PropTypes.string,
    modifiedName: PropTypes.string,
  })).isRequired,
  handleCategoryClick: PropTypes.func.isRequired,
  handleRefresh: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string,
  formattedCategoryName: PropTypes.string.isRequired,
};

export default { CategoryCard };