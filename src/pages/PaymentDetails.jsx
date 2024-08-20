
 
import { useState } from 'react';

const PaymentDetails = ({ totalCost, serviceCharge, finalTotal, handlePrint, orderNumber }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <div className="flex-1 p-6 bg-white border-l border-gray-300">
      <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
      <div className="mb-4">
        <p className="text-gray-600 mb-2">Order No: {orderNumber} 123123</p>
        <p className="text-gray-600 mb-2">Subtotal: ৳{totalCost.toFixed(2)}</p>
        <p className="text-gray-600 mb-2">Service Charge: ৳{serviceCharge.toFixed(2)}</p>
        <p className="text-gray-700 text-xl font-semibold mb-2">Total: ৳{finalTotal.toFixed(2)}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
        <div className="flex items-center space-x-4">
          <button
            className={`py-2 px-4 rounded-lg border ${
              selectedPaymentMethod === 'cash' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => handlePaymentMethodSelect('cash')}
          >
            Cash
          </button>
          <button
            className={`py-2 px-4 rounded-lg border ${
              selectedPaymentMethod === 'card' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => handlePaymentMethodSelect('card')}
          >
            Card
          </button>
          <button
            className={`py-2 px-4 rounded-lg border ${
              selectedPaymentMethod === 'voucher' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => handlePaymentMethodSelect('voucher')}
          >
            Voucher
          </button>
        </div>
      </div>
      <div>
        <button onClick={handlePrint} disabled={!selectedPaymentMethod} className="w-full px-4 py-2 bg-[#8bb5be] text-slate-700 rounded-md tracking-widest">PRINT NOW</button>
      </div>
    </div>
  );
};

export default PaymentDetails;

