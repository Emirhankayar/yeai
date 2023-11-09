export const truncateDescription = (description, maxLength) => {
    if (!description) {
      return '';
    }
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  };
  