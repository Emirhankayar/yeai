// utils.js
const fetchData = (page, setData, setLoading, setError) => {
    fetch(`http://localhost:3000/posts?page=${page}`) 
      .then((response) => response.json())
      .then((data) => {
        //console.log('Fetched data:', data); 
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
  