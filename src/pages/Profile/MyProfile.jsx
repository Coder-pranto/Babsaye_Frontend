import { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { HiPencilAlt } from 'react-icons/hi';
// import { MdOutlineEditNote } from 'react-icons/md';

const MyProfile = ({ user }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        bio: user.bio || '',
    });

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = () => {
        // Handle save logic here (e.g., API call)
        setIsEditing(false);
        console.log('Profile data saved:', profileData);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-700">
                    {isEditing ? 'Edit Profile' : 'Profile'}
                </h2>
                <button
                    onClick={handleEditToggle}
                    className="bg-[#5D5B10] text-white px-4 py-2 rounded-full flex items-center gap-2"
                >
                    <HiPencilAlt className="w-5 h-5" />
                    {isEditing ? 'Cancel' : 'Edit'}
                </button>
            </div>

            <div className="mt-6 flex items-center space-x-6">
                <div className="w-32 h-32 bg-gray-200 rounded-full flex justify-center items-center text-[#5D5B10] text-3xl font-bold">
                    <FaUser />
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-gray-800">{profileData.name}</h3>
                    <p className="text-gray-600">
                        <FaEnvelope className="inline mr-2" />
                        {profileData.email}
                    </p>
                    <p className="text-gray-600">
                        <FaPhone className="inline mr-2" />
                        {profileData.phone}
                    </p>
                    <p className="text-gray-600">
                        <FaMapMarkerAlt className="inline mr-2" />
                        {profileData.address}
                    </p>
                </div>
            </div>

            {isEditing && (
                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700">
                        Bio
                    </label>
                    <textarea
                        name="bio"
                        value={profileData.bio}
                        onChange={handleChange}
                        rows="4"
                        className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-[#5D5B10] focus:border-[#5D5B10] text-sm"
                        placeholder="Write a brief bio..."
                    />
                    <button
                        onClick={handleSave}
                        className="mt-4 bg-[#5D5B10] text-white px-6 py-2 rounded-full"
                    >
                        Save
                    </button>
                </div>
            )}
            {!isEditing && profileData.bio && (
                <div className="mt-6">
                    <h4 className="text-lg font-medium text-gray-800">Bio</h4>
                    <p className="text-gray-600">{profileData.bio}</p>
                </div>
            )}
        </div>
    );
};

export default MyProfile;
