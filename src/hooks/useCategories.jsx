import { createContext, useContext } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import PropTypes from 'prop-types';
import { SV_URL } from '../utils/utils';

const fetchCategories = async () => {
  const response = await axios.get(`${SV_URL}/allCategories`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  let categories = response.data;
  return modifyCategoryNames(categories);
};

const modifyCategoryNames = (categories) => {
  return categories.map((category) => {
    if (typeof category === "string") {
      let original = category;
      let modifiedName = category
        .replace(/-/g, " ")
        .split(" ")
        .map((word) => {
          if (word === "and") {
            return word;
          } else if (word === "ai") {
            return word.toUpperCase();
          } else {
            return (
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            );
          }
        })
        .join(" ");
      return { original: original, modifiedName: modifiedName };
    } else {
      return { original: "", modifiedName: "" };
    }
  });
};

const useFetchCategories = () => {
  const { data: categories, isError, isLoading } = useQuery('categories', fetchCategories);

  return { categories, isError, isLoading };
};

const CategoryContext = createContext();

export const useCategories = () => {
  return useContext(CategoryContext);
};

export const CategoryProvider = ({ children }) => {
  const { categories, isError, isLoading } = useFetchCategories();

  return (
    <CategoryContext.Provider value={{ categories, isError, isLoading }}>
      {children}
    </CategoryContext.Provider>
  );
};
CategoryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


export default useFetchCategories;