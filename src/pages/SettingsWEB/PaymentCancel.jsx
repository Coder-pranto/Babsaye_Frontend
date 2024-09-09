import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PaymentCancel = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100">
            <FaExclamationTriangle className="text-yellow-500" size={80} />
            <h1 className="text-3xl font-bold text-yellow-600 mt-6">Payment Cancelled</h1>
            <p className="mt-2 text-gray-700">You have cancelled the payment. If you wish to continue, please try again.</p>
            <Link to="/payment_method" className="mt-6 px-6 py-3 bg-yellow-600 text-white rounded-lg shadow-lg hover:bg-yellow-700">
                Try Again
            </Link>
        </div>
    );
};

export default PaymentCancel;
