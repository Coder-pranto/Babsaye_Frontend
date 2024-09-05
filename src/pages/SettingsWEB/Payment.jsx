import { useState } from 'react';
import { FaDollarSign, FaUser } from 'react-icons/fa';
import FormInput from '../../components/FormInputs/FormInput';
import FormSelect from '../../components/FormInputs/FormSelect';
import Button from '../../components/Button';
import { toast } from 'react-toastify';

const PaymentMethod = () => {
  const [supplier, setSupplier] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [note, setNote] = useState('');

  const supplierOptions = [
    { label: 'Supplier A', value: 'supplier_a' },
    { label: 'Supplier B', value: 'supplier_b' },
    { label: 'Supplier C', value: 'supplier_c' },
  ];

  const paymentMethodOptions = [
    { label: 'Bank Transfer', value: 'bank_transfer' },
    { label: 'Cash', value: 'cash' },
    { label: 'Cheque', value: 'cheque' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!supplier || !amount || !paymentMethod) {
      toast.error('Please fill in all fields');
      return;
    }

    // Placeholder for the actual API call
    const paymentData = {
      supplier,
      amount,
      paymentMethod,
      note,
    };

    console.log('Payment Data:', paymentData);
    toast.success('Payment processed successfully');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-auto mt-12 p-8">
      <div className="rounded-t-lg h-16 flex justify-center items-center text-2xl font-bold bg-[#5D5B10] text-white">
        <span>Supplier Payment</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <FormSelect
            label="Select Supplier"
            icon={<FaUser />}
            options={supplierOptions}
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
          />
          <FormInput
            label="Amount"
            type="number"
            icon={<FaDollarSign />}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <FormSelect
            label="Payment Method"
            options={paymentMethodOptions}
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <FormInput
            label="Note"
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Optional"
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" bgColor="bg-[#5D5B10]" textColor="text-white">
            Submit Payment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PaymentMethod;
