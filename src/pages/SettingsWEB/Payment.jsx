

import { useState, useEffect } from 'react';
import { FaMoneyCheckAlt,FaMobileAlt  } from 'react-icons/fa';
import { MdPerson, MdAttachMoney, MdCreditCard } from 'react-icons/md';
import Button from '../../components/Button';
import { fetchSuppliers, createPayment } from '../../services/api'
import { toast } from 'react-toastify';

const PaymentMethod = () => {
    const [supplierOptions, setSupplierOptions] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [paymentAmount, setPaymentAmount] = useState(0);
    const [transactionId, setTransactionId] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadSuppliers = async () => {
            try {
                const response = await fetchSuppliers();
                setSupplierOptions(response.data);
                console.log(response.data);
            } catch (error) {
                toast.error('Failed to load suppliers');
            }
        };
        loadSuppliers();
    }, []);

    const handlePayment = async () => {
        if (!selectedSupplier || !paymentMethod || paymentAmount <= 0 || !transactionId) {
            toast.error('Please fill all fields correctly');
            return;
        }

        const paymentData = {
            supplier: selectedSupplier,
            method: paymentMethod,
            amount: paymentAmount,
            transactionId,
        };

        try {
            setLoading(true);
            await createPayment(paymentData);
            toast.success('Payment successful!');
        } catch (error) {
            toast.error('Payment failed!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg w-full max-w-xl mx-auto mt-12">
            <div className="rounded-t-lg h-16 flex justify-center items-center text-2xl font-bold bg-primary text-white">
                <span>Make Payment</span>
            </div>
            <div className="p-8">
                {/* Supplier Selection */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Select Supplier
                    </label>
                    <select
                        value={selectedSupplier}
                        onChange={(e) => setSelectedSupplier(e.target.value)}
                        className="block w-full border border-gray-300 rounded-lg px-3 py-2"
                    >
                        <option value="">-- Select Supplier --</option>
                        {supplierOptions.map((supplier) => (
                            <option key={supplier._id} value={supplier._id}>
                                {supplier.supplierName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Payment Method */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Payment Method
                    </label>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => setPaymentMethod('bank')}
                            className={`w-1/3 p-4 border-2 rounded-lg flex flex-col items-center justify-center ${
                                paymentMethod === 'bank' ? 'border-blue-500' : 'border-gray-200'
                            }`}
                        >
                            <FaMobileAlt  size={24} />
                            <span className="text-sm mt-2">Bank</span>
                        </button>
                        <button
                            onClick={() => setPaymentMethod('mobile')}
                            className={`w-1/3 p-4 border-2 rounded-lg flex flex-col items-center justify-center ${
                                paymentMethod === 'mobile' ? 'border-blue-500' : 'border-gray-200'
                            }`}
                        >
                            <FaMobileAlt size={24} />
                            <span className="text-sm mt-2">Mobile</span>
                        </button>
                        <button
                            onClick={() => setPaymentMethod('card')}
                            className={`w-1/3 p-4 border-2 rounded-lg flex flex-col items-center justify-center ${
                                paymentMethod === 'card' ? 'border-blue-500' : 'border-gray-200'
                            }`}
                        >
                            <MdCreditCard size={24} />
                            <span className="text-sm mt-2">Card</span>
                        </button>
                    </div>
                </div>

                {/* Payment Amount */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Payment Amount (BDT)
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            value={paymentAmount}
                            onChange={(e) => setPaymentAmount(parseFloat(e.target.value))}
                            className="block w-full border border-gray-300 rounded-lg px-3 py-2"
                            placeholder="Enter amount"
                        />
                        <MdAttachMoney className="absolute top-2 right-3 text-gray-500" size={20} />
                    </div>
                </div>

                {/* Transaction ID */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Transaction ID
                    </label>
                    <input
                        type="text"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="block w-full border border-gray-300 rounded-lg px-3 py-2"
                        placeholder="Enter transaction ID"
                    />
                </div>

                {/* Payment Summary */}
                <div className="mb-4">
                    <div className="border-t border-gray-200 pt-4">
                        <h3 className="text-lg font-semibold text-gray-700">Payment Summary</h3>
                        <ul className="mt-2">
                            <li className="flex justify-between">
                                <span>Supplier:</span>
                                <span>{selectedSupplier ? supplierOptions.find(s => s._id === selectedSupplier)?.name : '-'}</span>
                            </li>
                            <li className="flex justify-between mt-1">
                                <span>Payment Method:</span>
                                <span>{paymentMethod || '-'}</span>
                            </li>
                            <li className="flex justify-between mt-1">
                                <span>Amount (BDT):</span>
                                <span>{paymentAmount > 0 ? paymentAmount : '-'}</span>
                            </li>
                            <li className="flex justify-between mt-1">
                                <span>Transaction ID:</span>
                                <span>{transactionId || '-'}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-6">
                    <Button onClick={handlePayment} disabled={loading}>
                        {loading ? 'Processing...' : 'Make Payment'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethod;

