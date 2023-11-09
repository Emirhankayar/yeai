export const handleRedirect = (link) => {
    try {
      const newWindow = window.open(link, '_blank');
      newWindow.focus();
    } catch (error) {
      console.error('Error redirecting:', error);
    }
  };