'use client'
import Link from 'next/link'
import React, { useState } from 'react'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeModal = () => setIsOpen(false);

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token); // Store token
        alert('Login Successful');
        closeModal();
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong');
    }
  };

  return (
    <div className="relative flex justify-between items-center px-4 py-4 bg-gray-800 text-white sticky top-0 z-50">
      <div className="text-xl font-bold">Logo</div>
      
      <nav>
        <ul className="hidden md:flex gap-10">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/settings">Settings</Link></li>
          <li>
            <button 
              onClick={toggleMenu} 
              className="bg-blue-500 px-4 rounded-md"
              aria-expanded={isOpen}
              aria-label="Open login modal"
            >
              Login
            </button>
          </li>
        </ul>
      </nav>

      {/* Login Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div 
            className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-80 relative"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="login-title"
            aria-hidden={!isOpen}
          >
            <h2 id="login-title" className="text-lg font-bold mb-4">Login</h2>
            
            <input 
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-3 rounded bg-gray-800 text-white border border-gray-600"
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-3 rounded bg-gray-800 text-white border border-gray-600"
            />

            <button 
              className="bg-blue-500 w-full p-2 rounded-md"
              onClick={handleLogin}
            >
              Login
            </button>
            <button 
              onClick={closeModal} 
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
