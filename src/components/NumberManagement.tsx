import React, { useState } from 'react';
import { addNumbers, checkNumbers } from '../services/api';

const NumberManagement: React.FC = () => {
  const [numbers, setNumbers] = useState('');
  const [result, setResult] = useState('');
  const [number, setNumber] = useState('');
  const [whatsapp, setWhatsapp] = useState(true);
  const [userId, setUserId] = useState(0);

  const handleAddNumbers = async () => {
    try {
      const formattedNumbers = numbers.split('\n').map(number => ({
        telephone_number: number.trim(),
        has_whatsapp: false,
        userUid: 8
      }));


      
      const response = await addNumbers(number, whatsapp, userId);
      setResult(JSON.stringify(response));
    } catch (error) {
      setResult('Error adding numbers');
    }
  };
  
  const handleCheckNumbers = async () => {
    try {
      const response = await checkNumbers(numbers.split('\n'));
      setResult(JSON.stringify(response));
    } catch (error) {
      setResult('Error checking numbers');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add/Check Number</h1>
      <textarea
        value={numbers}
        onChange={(e) => setNumbers(e.target.value)}
        placeholder="Enter phone numbers, one per line"
      />
      <button onClick={handleAddNumbers}>Add Numbers</button>
      <button onClick={handleCheckNumbers}>Check Numbers</button>
      <pre>{result}</pre>
    </div>
  );
};

export default NumberManagement;
