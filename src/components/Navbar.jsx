import { useState } from 'react';
import SimpleCalculator from '../utils/Calculator';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { MdWaterDrop, MdPushPin } from 'react-icons/md';
import { FaCalculator, FaLanguage, FaUserCog, FaLock, FaUserShield, FaUserPlus, FaCog, FaBuilding, FaSignOutAlt } from 'react-icons/fa';
import { useLogout } from '../utils/Logout';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ toggleSidebar, isCollapsed }) => {
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showCalculatorDropdown, setShowCalculatorDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const logout = useLogout(); 
  const navigate = useNavigate();

  const toggleLanguageDropdown = () => {
    setShowLanguageDropdown(!showLanguageDropdown);
    setShowCalculatorDropdown(false);
    setShowProfileDropdown(false);
  };

  const toggleCalculatorDropdown = () => {
    setShowCalculatorDropdown(!showCalculatorDropdown);
    setShowLanguageDropdown(false);
    setShowProfileDropdown(false);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
    setShowLanguageDropdown(false);
    setShowCalculatorDropdown(false);
  };

  const handleLanguageSelection = (language) => {
    console.log(`Selected language: ${language}`);
    setShowLanguageDropdown(false);
  };

  const handleLogout = () => {
    logout(); 
  };

  const handleCacheClear = async () => { 
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        for (let name of cacheNames) {
          await caches.delete(name);
        }
        console.log('Service Worker Cache cleared.');
        toast.success("Cache Cleared");
      }
  }

  const languageOptions = [
    { language: 'Bangla', code: 'bn' },
    { language: 'English', code: 'en' },
  ];

  const profileConfigs = [
    { icon: <FaUserCog />, label: 'My Profile', route:'/myprofile' },
    { icon: <FaLock />, label: 'Change Password',route:'/change_password' },
    { icon: <FaUserShield />, label: 'Roles' ,route:'/role'},
    { icon: <FaUserPlus />, label: 'Add User' },
    { icon: <FaCog />, label: 'Settings' },
    { icon: <MdPushPin />, label: 'Shortcut Menu' },
    { icon: <FaBuilding />, label: 'Company Information', route:'/company_information'},
    { icon: <FaSignOutAlt />, label: 'Sign Out', onClick: handleLogout },
  ];

  const handleNavigation = (route) => { 
    navigate(route);
    setShowProfileDropdown(!showProfileDropdown);
   }

  return (
    <nav className="flex items-center justify-between p-4 bg-[#918a51] text-white relative">
      <div className="flex items-center space-x-2">
        {isCollapsed ? (
          <AiOutlineClose className="text-2xl" onClick={toggleSidebar} />
        ) : (
          <AiOutlineMenu className="text-2xl" onClick={toggleSidebar} />
        )}
        <span className="text-lg">Pranto</span>
      </div>
      <div className="flex items-center space-x-4 text-black">
        <button onClick={handleCacheClear} className="bg-transparent text-yellow-400 border border-yellow-500 px-4 py-2 rounded-full hover:bg-yellow-500 hover:text-white transition">
          <span className="flex justify-center items-center">
            <MdWaterDrop className="text-white" /> 
            <span> Clear Cache</span>
          </span>
        </button>
        <button
          className="bg-transparent text-white border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-200 hover:text-black transition relative"
          onClick={toggleLanguageDropdown}
        >
          <span className="flex justify-center items-center gap-x-1">
            <FaLanguage className="text-white" size={25} /> 
            <span> Language</span>
          </span>
        </button>
        {showLanguageDropdown && (
          <div className="absolute top-16 right-40 bg-white text-black rounded shadow-lg">
            {languageOptions.map(({ language, code }) => (
              <button
                key={code}
                className="flex items-center px-4 py-2 hover:bg-gray-200 hover:text-blue-400 w-full"
                onClick={() => handleLanguageSelection(language)}
              >
                <FaLanguage className="mr-2 text-blue-500" size={25} /> {language}
              </button>
            ))}
          </div>
        )}
        <button
          className="bg-transparent text-white border border-gray-200 p-2 rounded-full hover:bg-gray-200 hover:text-black transition relative"
          onClick={toggleCalculatorDropdown}
        >
          <FaCalculator />
        </button>
        {showCalculatorDropdown && (
          <div className="absolute top-16 right-20 bg-white text-black rounded shadow-lg p-4">
            <SimpleCalculator />
          </div>
        )}
        <button
          className="bg-transparent text-white rounded-full hover:bg-gray-200 hover:text-black transition relative"
          onClick={toggleProfileDropdown}
        >
          <BiUserCircle className="text-4xl text-white" />
        </button>
        {showProfileDropdown && (
          <div className="absolute top-16 right-8 shadow-lg w-64 rounded-lg bg-white">
            <div className="flex flex-col items-center bg-[#756ffc] text-white py-4 rounded-t-lg">
              <BiUserCircle className="text-6xl mb-1" />
              <span className='font-semibold text-xl'>Pranto</span>
              <span>01521206350</span>
            </div>
            <div className="flex flex-col text-black space-y-2 px-2 mb-2">
              {profileConfigs.map(({ icon, label, route, onClick }) => (
                <button
                  key={label}
                  className="text-left w-full hover:text-blue-500 px-2 py-1 rounded flex items-center space-x-4"
                  onClick={route? ()=> handleNavigation(route) : onClick } // Add onClick handler for profile buttons
                >
                  {icon}
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
