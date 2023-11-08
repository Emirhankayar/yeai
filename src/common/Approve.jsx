import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const SV_URL = import.meta.env.VITE_SV_URL

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ApproveTool() {
  let query = useQuery();
  const [pending, setPending] = useState('');

  useEffect(() => {
    const toolId = query.get('toolId');
    const pendingStatus = query.get('pending');

    setPending(pendingStatus);

    axios.get(`${SV_URL}/update-tool-status?toolId=${toolId}&pending=${pendingStatus}`)
      .then(res => {
        // handle success
        console.log(res.data);
      })
      .catch(err => {
        // handle error
        console.error(err);
      });
  }, []);

  return (
    <div className={`p-4 text-white min-h-screen flex items-center justify-center ${pending === 'approved' ? 'bg-green-500' : 'bg-red-500'}`}>
      <h1>{`Tool successfully has been ${pending}`}</h1>
    </div>
  );
}

export default ApproveTool;