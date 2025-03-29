'use client';
import { useState } from 'react';
import { useAuth } from '../breadcrumbs/context/AuthContext';
import Portal from './Portal';

const LoginModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { login } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    setLoading(true);
    try {
      if (isSignup) {
        // Signup process
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Signup failed');

        alert('Account created successfully! Please log in.');
        setIsSignup(false);
      } else {
        // Login process
        await login(email, password);
        onClose(); // Close modal after successful login
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      alert(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Portal>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4">{isSignup ? 'Sign Up' : 'Login'}</h2>
          
          {isSignup && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
          )}
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />

          <div className="flex justify-between">
            <button
              onClick={handleAuth}
              className={`px-4 py-2 rounded ${loading ? 'bg-gray-500' : 'bg-blue-500'} text-white`}
              disabled={loading}
            >
              {loading ? 'Processing...' : isSignup ? 'Sign Up' : 'Login'}
            </button>
            <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </div>

          <p className="mt-4 text-center">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button className="text-blue-500 underline" onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </Portal>
  );
};

export default LoginModal;
