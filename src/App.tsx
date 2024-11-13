import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, UserPlus, PhoneCall, CheckSquare } from 'lucide-react';
import { login, addNumbers, checkNumbers, getRecentNumbers, NumberEntry } from './services/api';

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggle }) => (
  <div className={`fixed inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} w-64 bg-gray-800 text-white transition-transform duration-300 ease-in-out z-30`}>
    <nav className="mt-16">
      <Link to="/register" className="block py-2 px-4 hover:bg-gray-700">
        <UserPlus className="inline-block mr-2" size={18} />
        Register
      </Link>
      <Link to="/add-number" className="block py-2 px-4 hover:bg-gray-700">
        <PhoneCall className="inline-block mr-2" size={18} />
        Add Number
      </Link>
      <Link to="/check-numbers" className="block py-2 px-4 hover:bg-gray-700">
        <CheckSquare className="inline-block mr-2" size={18} />
        Check Numbers
      </Link>
    </nav>
  </div>
);

const Welcome: React.FC = () => (
  <div className="text-center">
    <h1 className="text-4xl font-bold mb-4">Welcome to Number Management System</h1>
    <p className="text-xl">Please select an option from the sidebar to get started.</p>
  </div>
);

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [full_name, setFullName] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, full_name, password);
      setResult("User registered successfully");
    } catch (error) {
      setResult('Error adding numbers');
    }

  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <input
        type="text"
        value={full_name}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Full Name"
        className="w-full p-2 mb-4 border rounded"
      />

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="w-full p-2 mb-4 border rounded"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full p-2 mb-4 border rounded"
      />

      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Register</button>
      <pre className="mt-4 p-2 bg-gray-100 rounded">{result}</pre>
    </form>
  );
};

const AddNumber: React.FC = () => {
  const [number, setNumber] = useState('');
  const [whatsapp, setWhatsapp] = useState<boolean>(true);
  const [userId, setUserId] = useState(0);
  const [result, setResult] = useState('');

  const handleAddNumbers = async () => {
    try {

      const response = await addNumbers(number, whatsapp, userId);
      setResult(JSON.stringify(response));
    } catch (error) {
      setResult('Error adding numbers');
    }
  };

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase(); // Convert to lowercase to make it case-insensitive
    if (value === "yes" || value === "true") {
      setWhatsapp(true);
    } else {
      setWhatsapp(false);
    }
  };

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedValue = Number(value);

    if (!isNaN(parsedValue)) {
      setUserId(parsedValue);  // Update state with the number
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add/Check Number</h1>
  
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="phoneNumber">
          Phone Number
        </label>
        <input
          id="phoneNumber" // Adding id for accessibility
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Enter phone number"
          className="w-full p-2 border rounded"
        />
      </div>
  
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="whatsapp">
          Has Whatsapp? (true/false)
        </label>
        <input
          id="whatsapp" // Adding id for accessibility
          value={whatsapp ? "true" : "false"}
          onChange={handleWhatsappChange}
          placeholder="Has Whatsapp? true/false"
          className="w-full p-2 border rounded"
        />
      </div>
  
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="userId">
          User ID
        </label>
        <input
          id="userId" // Adding id for accessibility
          value={userId !== undefined ? userId : ""} // Ensure it's a string for input value
          onChange={handleUserIdChange}
          placeholder="Enter valid user ID"
          className="w-full p-2 border rounded"
        />
      </div>
  
      <div className="flex justify-between">
        <button onClick={handleAddNumbers} className="p-2 bg-green-500 text-white rounded">
          Add Numbers
        </button>
        {/* <button onClick={handleCheckNumbers} className="p-2 bg-blue-500 text-white rounded">Check Numbers</button> */}
      </div>
  
      <pre className="mt-4 p-2 bg-gray-100 rounded">{result}</pre>
    </div>
  );
  
};



const tableStyle = {
  border: '1px solid black',
  borderCollapse: 'collapse' as const,
  width: '100%',
};

const cellStyle = {
  border: '1px solid black',
  padding: '8px',
  textAlign: 'left' as const,
};

const headerCellStyle = {
  ...cellStyle,
  backgroundColor: '#f2f2f2',
};

const CheckNumbers: React.FC = () => {
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
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div style={{ margin: '20px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Recent Numbers</h2>
      {recentNumbers.length === 0 ? (
        <p>No recent numbers found.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={headerCellStyle}>Number</th>
                <th style={headerCellStyle}>WhatsApp</th>
                <th style={headerCellStyle}>Time Added</th>
              </tr>
            </thead>
            <tbody>
              {recentNumbers.map((number) => (
                <tr key={number.id}>
                  <td style={cellStyle}>{number.telephone_number}</td>
                  <td style={cellStyle}>{number.has_whatsapp ? 'Yes' : 'No'}</td>
                  <td style={cellStyle}>{new Date(number.date_added).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
const Layout: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <div className="flex-1">

        <main className="p-10">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add-number" element={<AddNumber />} />
            <Route path="/check-numbers" element={<CheckNumbers />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <Router>
    <Layout />
  </Router>
);

export default App;