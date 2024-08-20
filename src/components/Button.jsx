// const Button = ({ icon, text, bgColor, textColor, onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       className={`flex items-center px-4 py-2 rounded transition duration-300 ease-in-out transform hover:scale-105 ${bgColor} ${textColor}`}
//     >
//       {icon && <span className="mr-2">{icon}</span>}
//       {text}
//     </button>
//   );
// };

// export default Button;



import { Link } from 'react-router-dom';

const Button = ({ icon, text, bgColor, textColor, onClick, to }) => {
  return to ? (
    <Link
      to={to}
      className={`${bgColor} ${textColor} px-4 py-2 rounded inline-flex items-center`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {text}
    </Link>
  ) : (
    <button onClick={onClick} className={`${bgColor} ${textColor}  px-4 py-2 rounded inline-flex items-center`}>
      {icon && <span className="mr-2">{icon}</span>}
      {text}
    </button>
  );
};

export default Button;

