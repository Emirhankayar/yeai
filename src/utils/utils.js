// utils.js

const url = 'http://localhost:3000/posts';
const fetchData = (page, setData, setLoading, setError) => {
    fetch(`${url}?page=${page}`) 
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data); 
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
  