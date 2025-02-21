import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";


export default function useFetch(func, params) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await func(params);
        setData(result);
      } catch (err) {
        console.log(err);
        setError(err)
        // todo: notfound로 이동 경로 추가
        navigate("/")
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [func, params, navigate]);

  return { data, loading, error };
}
