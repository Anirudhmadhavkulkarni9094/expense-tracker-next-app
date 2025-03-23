"use client";

import Image from "next/image";
import React, { useState } from "react";

interface ProfileCardProps {
  name: string;
  email: string;
  role: string;
  company: string;
  location: string;
  contact: string;
  profilePic: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, email, role, company, location, contact, profilePic }) => {
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState({ name, email, role, company, location, contact });

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center gap-5 w-full max-w-lg">
      {/* Profile Image */}
      <Image
        src={profilePic}
        alt="Profile Picture"
        width={120}
        height={120}
        className="rounded-full border-4 border-gray-500 shadow-lg"
      />

      {/* Profile Info */}
      <div className="text-center md:text-left">
        <div className="text-2xl font-semibold">{profile.name}</div>
        <div className="text-gray-300">{profile.email}</div>
        <div className="text-sm text-gray-400 mt-1">{profile.role} at {profile.company}</div>
        <div className="text-sm text-gray-400">{profile.location}</div>
        <div className="text-sm text-gray-400">📞 {profile.contact}</div>

        {/* Buttons */}
        <div className="mt-4 flex gap-3 justify-center md:justify-start">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            onClick={() => setShowModal(true)}
          >
            Edit Profile
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
            Logout
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-black">
            <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
            <input type="text" name="name" value={profile.name} onChange={handleChange} className="w-full p-2 border rounded mb-2" placeholder="Name" />
            <input type="email" name="email" value={profile.email} onChange={handleChange} className="w-full p-2 border rounded mb-2" placeholder="Email" />
            <input type="text" name="role" value={profile.role} onChange={handleChange} className="w-full p-2 border rounded mb-2" placeholder="Role" />
            <input type="text" name="company" value={profile.company} onChange={handleChange} className="w-full p-2 border rounded mb-2" placeholder="Company" />
            <input type="text" name="location" value={profile.location} onChange={handleChange} className="w-full p-2 border rounded mb-2" placeholder="Location" />
            <input type="text" name="contact" value={profile.contact} onChange={handleChange} className="w-full p-2 border rounded mb-4" placeholder="Contact" />

            {/* Modal Buttons */}
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
                Cancel
              </button>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
