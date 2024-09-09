import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
            <FaCheckCircle className="text-green-500" size={80} />
            <h1 className="text-3xl font-bold text-green-600 mt-6">Payment Successful!</h1>
            <p className="mt-2 text-gray-700">Thank you for your payment. Your transaction was completed successfully.</p>
            <Link to="/payment_method" className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700">
                Go Back
            </Link>
        </div>
    );
};

export default PaymentSuccess;
