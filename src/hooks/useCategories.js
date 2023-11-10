import { useState, useEffect } from "react";
import axios from "axios";

const SV_URL = import.meta.env.VITE_SV_URL;

const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${SV_URL}/allCategories`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        let categories = response.data;
        categories = modifyCategoryNames(categories);
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
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

    if (categories.length === 0) {
      fetchCategories();
    }
  }, []);

  return categories;
};

export default useFetchCategories;
