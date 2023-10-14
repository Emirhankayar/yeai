// utils.js
const fetchData = (setData, setLoading, setError) => {
    fetch('https://yeaiserver.onrender.com/posts') // Replace with the appropriate endpoint
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data); // Log the fetched data
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      });
  };

export { fetchData };
