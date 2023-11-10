export const formatCategoryName = (category) => {
  return `${category
    .split("-")
    .map((word) => {
      if (word === "and") return word.toLowerCase();
      if (word === "ai") return word.toUpperCase();
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ")}`;
};
