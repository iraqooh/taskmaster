import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../lib/axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: user?.name, email: user?.email, password: '' });
  const [success, setSuccess] = useState('')
//   const [confirmPassord, setConfirmPassword] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setSuccess('Updating...')
    e.preventDefault();
    try {
        const response = await api.put('/auth/profile', form);
        setSuccess(response.data.message)
    } catch(err) {
        console.log(`Profile update error: ${err}`);
    }
  };

//   const comparePasswords = () => {
//     return form.password === confirmPassord
//   }

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold mb-4">Edit Profile</h1>
        <h1 className="text-xl text-green-600 font-bold mb-4">{success}</h1>
      </div>
      <form onSubmit={handleSubmit} className="max-w-md">
        <input
          className="border p-2 w-full mb-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-2 w-full mb-2"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="border p-2 w-full mb-2"
          type="password"
          placeholder="New Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {/* <input
          className="border p-2 w-full mb-2"
          type="password"
          placeholder="Confirm Password"
          value={form.password}
          onChange={(e) => setConfirmPassword(e.target.value)}
        /> */}
        <button className="bg-blue-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer">Save Changes</button>
      </form>
    </div>
  );
};

export default Profile;
