import { useState } from 'react';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match', {
        position: 'top-right',
        autoClose: 5000,
      });
      return;
    }

    try {
      // Add logic to call your API for changing the password
      // const response = await changePassword({ currentPassword, newPassword });
      
      toast.success('Password changed successfully!', {
        position: 'top-right',
        autoClose: 5000,
      });

      // Optionally, reset the form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast.error('Failed to change password', {
        position: 'top-right',
        autoClose: 5000,
      });
      console.error('Password change error:', error.message);
    }
  };

  return (
    <div className="bg-white rounded shadow-lg w-full max-w-lg mx-auto mt-12">
      <div className="h-16 flex justify-center items-center text-2xl font-bold bg-[#5D5B10] text-white">
        <span>Change Password</span>
      </div>
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="relative">
          <FaLock className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
          <input
            type="password"
            className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5D5B10] focus:border-transparent"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="relative">
          <FaLock className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            className="w-full pl-10 pr-10 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5D5B10] focus:border-transparent"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <div
            className="absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer text-gray-400"
            onClick={toggleShowPassword}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        <div className="relative">
          <FaLock className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            className="w-full pl-10 pr-10 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5D5B10] focus:border-transparent"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div
            className="absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer text-gray-400"
            onClick={toggleShowPassword}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-[#5D5B10] text-white py-2 rounded hover:bg-[#4a4914] transition-colors"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
