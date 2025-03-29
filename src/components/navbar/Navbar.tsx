'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useAuth } from '../breadcrumbs/context/AuthContext';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Button from '../Button/Button';
import LoginModal from './LoginModal';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="relative flex justify-between items-center px-4 py-4 bg-gray-800 text-white sticky top-0 z-50">
      <div className="text-xl font-bold">Logo</div>

      {/* Desktop Menu */}
      <nav className="hidden md:flex gap-10 items-center">
        <ul className="flex gap-10 items-center">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/settings">Settings</Link></li>
          <li>
            {user ? (
              <button 
                onClick={logout} 
                className="bg-red-500 px-4 py-2 rounded-md"
              >
                Logout
              </button>
            ) : (
              <button 
                onClick={() => setIsLoginModalOpen(true)} 
                className="bg-blue-500 px-4 py-2 rounded-md"
              >
                Login
              </button>
            )}
          </li>
        </ul>
      </nav>

      {/* Burger Menu Icon */}
      <button 
        className="md:hidden text-2xl"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Animated Mobile Menu */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isMobileMenuOpen ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 h-full w-3/4 bg-gray-900 text-white flex flex-col items-center justify-center space-y-6 text-lg md:hidden z-50 shadow-lg"
      >
        <button onClick={closeMobileMenu} className='absolute top-5 right-5 text-2xl'>❌</button>
        <Link href="/" onClick={closeMobileMenu} className="text-white text-2xl">Home</Link>
        <Link href="/about" onClick={closeMobileMenu} className="text-white text-2xl">About</Link>
        <Link href="/settings" onClick={closeMobileMenu} className="text-white text-2xl">Settings</Link>
        {user ? (
          <button 
            onClick={() => { logout(); closeMobileMenu(); }} 
            className="bg-red-500 px-6 py-3 rounded-md text-xl"
          >
            Logout
          </button>
        ) : (
          <Button
            onClick={() => { setIsLoginModalOpen(true); closeMobileMenu(); }} 
            color="blue"
          >
            Login
          </Button>
        )}
      </motion.div>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </div>
  );
}

export default Navbar;
