import React, { useEffect, useState } from 'react';
import { getRecentNumbers, NumberEntry } from '../services/api';

const Dashboard: React.FC = () => {
  const [recentNumbers, setRecentNumbers] = useState<NumberEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentNumbers = async () => {
      try {
        const numbers = await getRecentNumbers();
        setRecentNumbers(numbers);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch recent numbers:', err);
        setError('Failed to fetch recent numbers. Please try again later.');
      }
    };
    fetchRecentNumbers();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Recent Numbers</h2>
      {recentNumbers.length === 0 ? (
        <p>No recent numbers found.</p>
      ) : (
        <ul>
          {recentNumbers.map((number) => (
            <li key={number.id}>
              {number.telephone_number} - WhatsApp: {number.has_whatsapp ? 'Yes' : 'No'}
              <br />
              <small>Added on: {new Date(number.date_added).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;