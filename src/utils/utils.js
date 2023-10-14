// utils.js

const url = import.meta.env.VITE_SV_URL;
const fetchData = (page, setData, setLoading, setError) => {
    fetch(`${url}?page=${page}`) 
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
  