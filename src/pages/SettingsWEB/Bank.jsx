import { useEffect, useState } from 'react';
import {FaDollarSign, FaList, FaBook } from 'react-icons/fa';
import useFormInput from '../../hooks/useFormInput';
import FormInput from '../../components/FormInputs/FormInput';
import FormTextArea from '../../components/FormInputs/FormTextArea';
import { addBankAccount } from '../../services/api';
import { toast } from 'react-toastify';
import { generateCustomId } from '../../utils/CustomIDCreator';

const BankAccountCreate = () => {
    const [accountNumber, setAccountNumber] = useState('');
    const bankName = useFormInput('');
    const initialBalance = useFormInput(0, 'number');
    const description = useFormInput('');


    useEffect(() => {

        if (bankName.value) {
          const cleanedBankName = bankName.value.replace(/\s+/g, '_').toUpperCase();
            setAccountNumber(`${cleanedBankName}-${generateCustomId('ACC')}`);
        } else {
            setAccountNumber(generateCustomId('BANK-'));
        }
    }, [bankName.value]); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            bankName: bankName.value,
            accountNumber: accountNumber,
            balance: initialBalance.value,
            description: description.value
        };

        try {
            const res = await addBankAccount(formData);
            console.log('Bank account created successfully!', res.data);
            toast.success('Bank account created successfully!');
        } catch (err) {
            console.log('Failed to create bank account:', err.message);
            toast.error('Failed to create bank account!');
        }
    };

    return (
        <div className="bg-white rounded shadow-lg w-full max-w-6xl mx-auto mt-12">
            <div className="h-16 flex justify-center items-center text-2xl font-bold bg-[#5D5B10] text-white">
                <span>Create Bank Account</span>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 p-8">
                <FormInput label="Bank Name" icon={<FaList />} {...bankName} />
                <FormInput label="Account Number" value={accountNumber} readOnly icon={<FaBook />} />
                <FormInput label="Initial Balance" icon={<FaDollarSign />} {...initialBalance} />
                <div className="col-span-2">
                    <FormTextArea label="Description" icon={<FaBook />} {...description} />
                </div>
                <button type="submit" className="col-span-2 bg-[#5D5B10] text-white py-2 mx-4 rounded hover:bg-green-600">
                    Add Account
                </button>
            </form>
        </div>
    );
};

export default BankAccountCreate;
