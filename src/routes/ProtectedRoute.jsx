// import { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import { auth } from '../services/firebaseConfig';
// import { onAuthStateChanged } from 'firebase/auth';
// import { toast } from 'react-toastify';

// const ProtectedRoute = ({ element }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setIsAuthenticated(true);
//       } else {
//         setIsAuthenticated(false);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//     console.log(isAuthenticated)

//   if (isAuthenticated === null) {
//     // return <div>Loading...</div>; 
//     return element;
//   }

//   if (!isAuthenticated) {
//     toast.warn('You need to login first.');
//     return <Navigate to='/login' replace={true} />;
//   }

//   return element;
// };

// export default ProtectedRoute;










import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const ProtectedRoute = ({element}) => {

    const userToken = localStorage.getItem('userInfo');
    console.log(userToken);
    if(!userToken){
        toast.warn('You need to login first.');
        return <Navigate to='/login' replace={true}/>
    }

   return element;
}

export default ProtectedRoute;