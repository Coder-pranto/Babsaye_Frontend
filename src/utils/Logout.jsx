
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    // Clear user-related data from local storage or cookies
    localStorage.removeItem('user_token');
    
    navigate('/login');
  };

  return logout;
};
