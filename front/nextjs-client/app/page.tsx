'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5223/api/Login', {
          method: 'GET',
          mode: 'cors',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.text();
        setData(result);
      } catch (err) {
        setError(err.message);
        console.error('Error:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <h1>HALOJATA</h1>
      {error ? <div>Error: {error}</div> : <div>{data}</div>}
    </main>
  );
}