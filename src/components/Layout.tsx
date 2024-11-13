import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800">
        <nav className="mt-5">
          <Link to="/register" className="block py-2 px-4 text-gray-200 hover:bg-gray-700">Register</Link>
          <Link to="/add-number" className="block py-2 px-4 text-gray-200 hover:bg-gray-700">Add Number</Link>
          <Link to="/view-numbers" className="block py-2 px-4 text-gray-200 hover:bg-gray-700">Check Numbers</Link>
        </nav>
      </aside>
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
