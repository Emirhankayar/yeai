import { useState, useEffect } from 'react';
import axios from 'axios';

const SV_URL = import.meta.env.VITE_SV_URL;

const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let categories = localStorage.getItem('categories'); // Get the categories from the local storage
        if (categories) {
          categories = JSON.parse(categories); // Parse the stored categories
        } else {
          const response = await axios.get(`${SV_URL}/allCategories`, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log('Response data:', response.data);
          categories = response.data;
          categories = modifyCategoryNames(categories);
          console.log('Modified categories:', categories);
          localStorage.setItem('categories', JSON.stringify(categories)); // Store the categories in the local storage
        }
        setCategories(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const modifyCategoryNames = (categories) => {
      return categories.map(category => {
        if (typeof category === 'string') {
          let original = category;
          let modifiedName = category.replace(/-/g, ' ').split(' ').map(word => {
            if (word === 'and') {
              return word;
            } else if (word === 'ai') {
              return word.toUpperCase();
            } else {
              return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }
          }).join(' ');
          return { original: original, modifiedName: modifiedName };
        } else {
          return { original: '', modifiedName: '' };
        }
      });
    };

    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories]);

  return categories;
};

export default useFetchCategories;