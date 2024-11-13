import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1';

export interface NumberEntry {
  id: number;
  telephone_number: string;
  has_whatsapp: boolean;
  date_added: string;
}

// Type guard function to check if the data is an array of NumberEntry
function isNumberEntryArray(data: unknown): data is NumberEntry[] {
  return Array.isArray(data) && data.every(item =>
    typeof item === 'object' &&
    item !== null &&
    'id' in item &&
    'telephone_number' in item &&
    'has_whatsapp' in item &&
    'date_added' in item
  );
}

export const login = async (username: string, full_name:string, password: string) => {
  const response = await axios.post(`${API_URL}/user/register`, { username, full_name, password });
  return response.data;
};

export const addNumbers = async ( telephone_number: string, has_whatsapp: boolean, id:number) => {
  const response = await axios.post(`${API_URL}/numbers/add`, { telephone_number, has_whatsapp, id });
  return response.data;
};

export const checkNumbers = async (numbers: string[]) => {
  const response = await axios.post(`${API_URL}/numbers/check`, { numbers });
  return response.data;
};

export const getRecentNumbers = async (): Promise<NumberEntry[]> => {
  const response = await axios.get(`${API_URL}/numbers/recent`);
  if (!isNumberEntryArray(response.data)) {
    throw new Error('API response does not match expected NumberEntry[] type');
  }
  return response.data;
};