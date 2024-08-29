


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

