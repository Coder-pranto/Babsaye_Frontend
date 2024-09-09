import { useState, useEffect } from 'react';
import { FaUserCircle, FaMoneyBillWave } from 'react-icons/fa';
import Button from '../../components/Button';
import { fetchSuppliers, createPayment2 } from '../../services/api';
import { toast } from 'react-toastify';
import { generateCustomId } from '../../utils/CustomIDCreator';
import { MdOutlinePayments } from 'react-icons/md';

const PaymentComponent = () => {
    const [supplierOptions, setSupplierOptions] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [paymentAmount, setPaymentAmount] = useState(0);
    const [transactionId, setTransactionId] = useState('');
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const loadSuppliers = async () => {
            try {
                const response = await fetchSuppliers();
                setSupplierOptions(response.data);
            } catch (error) {
                toast.error('Failed to load suppliers');
            }
        };
        loadSuppliers();
        setTransactionId(generateCustomId('Trxid-'))
    }, []);

    const handlePayment = async () => {
        if (!selectedSupplier || paymentAmount <= 0 || !transactionId) {
            toast.error('Please fill all fields correctly');
            return;
        }

        const paymentData = {
            supplier: selectedSupplier,
            amount: paymentAmount,
            transactionId,
        };

        try {
            setLoading(true);
            const {data}= await createPayment2(paymentData);
            // console.log(data.url);
            window.location.replace(data.url)
        } catch (error) {
            console.log(error.message);
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
            <div className="p-8 space-y-6">
                {/* Supplier Selection */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Select Supplier
                    </label>
                    <div className="relative">
                        <FaUserCircle className="absolute top-2 left-3 text-gray-500" size={20} />
                        <select
                            value={selectedSupplier}
                            onChange={(e) => setSelectedSupplier(e.target.value)}
                            className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2"
                        >
                            <option value="">-- Select Supplier --</option>
                            {supplierOptions.map((supplier) => (
                                <option key={supplier._id} value={supplier._id}>
                                    {supplier.supplierName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Payment Amount */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Payment Amount (BDT)
                    </label>
                    <div className="relative">
                        <FaMoneyBillWave className="absolute top-2 left-3 text-gray-500" size={20} />
                        <input
                            type="number"
                            value={paymentAmount}
                            onChange={(e) => setPaymentAmount(parseFloat(e.target.value))}
                            className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2"
                            placeholder="Enter amount"
                        />
                    </div>
                </div>

                {/* Transaction ID */}
                <div>
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
                <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-lg font-semibold text-gray-700">Payment Summary</h3>
                    <ul className="mt-2 space-y-1">
                        <li className="flex justify-between">
                            <span>Supplier:</span>
                            <span>{selectedSupplier ? supplierOptions.find(s => s._id === selectedSupplier)?.supplierName : '-'}</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Amount (BDT):</span>
                            <span>{paymentAmount > 0 ? paymentAmount : '-'}</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Transaction ID:</span>
                            <span>{transactionId || '-'}</span>
                        </li>
                    </ul>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <Button icon={<MdOutlinePayments />} text={"PAY"} bgColor={"bg-red-800"} textColor={"text-white"}  onClick={handlePayment} disabled={loading}>
                        {loading ? 'Processing...' : 'Make Payment'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PaymentComponent;
