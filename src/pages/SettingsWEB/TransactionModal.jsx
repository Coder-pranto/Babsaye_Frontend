import { useState } from 'react';

const TransactionModal = ({ type, onSubmit, onClose, accounts }) => {
  const [amount, setAmount] = useState('');
  const [toAccount, setToAccount] = useState('');

  const handleSubmit = () => {
    onSubmit({ amount, toAccount });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            min="0"
          />
        </div>

        {type === 'transfer' && (
          <div className="mb-4">
            <label className="block text-gray-700">To Account</label>
            <select
              value={toAccount}
              onChange={(e) => setToAccount(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Account</option>
              {accounts.map((account) => (
                <option key={account._id} value={account._id}>
                  {account.bankName} - {account.accountNumber}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex justify-end space-x-2">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
