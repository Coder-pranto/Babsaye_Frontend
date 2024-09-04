import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return logout;
};


// import { useNavigate } from 'react-router-dom';
// import { signOut } from 'firebase/auth';
// import { auth } from '../services/firebaseConfig';
// import { toast } from 'react-toastify';

// const Logout = () => {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       toast.success('Logged out successfully');
//       navigate('/login');
//     } catch (error) {
//       toast.error('Error logging out');
//     }
//   };

//   return handleLogout;
// };

// export default Logout;
