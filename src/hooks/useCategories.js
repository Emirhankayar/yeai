import { useState, useEffect } from 'react';
import axios from 'axios';

const SV_URL = import.meta.env.VITE_SV_URL;

const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const storedCategories = localStorage.getItem('categories');
        if (storedCategories) {
          let categories = JSON.parse(storedCategories);
          categories = modifyCategoryNames(categories);
          setCategories(categories);
        } else {
          const response = await axios.get(`${SV_URL}/allCategories`, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          let categories = response.data;
          categories = modifyCategoryNames(categories);
          setCategories(categories);
          localStorage.setItem('categories', JSON.stringify(categories));
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const modifyCategoryNames = (categories) => {
      return categories.map(category => {
        if (typeof category === 'string') {
          let modifiedName = category.split('-').map(word => {
            if (word !== 'and') {
              return word.charAt(0).toUpperCase() + word.slice(1);
            } else {
              return word;
            }
          }).join(' ');
          return modifiedName;
        } else {
          return category;
        }
      });
    };

    fetchCategories();
  }, []);

  return categories;
};

export default useFetchCategories;