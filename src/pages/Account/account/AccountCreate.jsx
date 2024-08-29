import { useEffect, useState } from 'react';
import { FaUser, FaPhone, FaDollarSign, FaList, FaBook } from 'react-icons/fa';
import useFormInput from '../../../hooks/useFormInput';
import FormInput from '../../../components/FormInputs/FormInput';
import FormTextArea from '../../../components/FormInputs/FormTextArea';
import { addAccount } from '../../../services/api';
import { toast } from 'react-toastify';
import { generateCustomId } from '../../../utils/CustomIDCreator';


const AccountCreate = () => {
    const [accountNumber, setAccountNumber] = useState('');
    const accountTitle = useFormInput('');
    const initialBalance = useFormInput(0, 'number');
    const contactPerson = useFormInput('');
    const phoneNumber = useFormInput('', 'number');
    const description = useFormInput('');

    useEffect(() => {
        // Generate account number when the component mounts
        setAccountNumber(generateCustomId('ACC-'));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            title: accountTitle.value,
            initialBalance: initialBalance.value,
            accountNumber: accountNumber, 
            contactPerson: contactPerson.value,
            phoneNumber: phoneNumber.value,
            description: description.value,
        };

        try {
            const res = await addAccount(formData);
            console.log('Account created successfully!', res.data);
            toast.success('Account created successfully!', {
                position: 'top-right',
                autoClose: 5000,
            });
        } catch (err) {
            console.log('Failed to create account:', err.message);
            toast.error('Failed to create account!', {
                position: 'top-right',
                autoClose: 5000,
            });
        }
    };

    return (
        <div className="bg-white rounded shadow-lg w-full max-w-6xl mx-auto mt-12">
            <div className="h-16 flex justify-center items-center text-2xl font-bold bg-[#5D5B10] text-white">
                <span>Account Create</span>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 p-8">
                <FormInput label="Account Number" value={accountNumber} readOnly icon={<FaBook />} />
                <FormInput label="Account Title" icon={<FaList />} {...accountTitle} />
                <FormInput label="Initial Balance" icon={<FaDollarSign />} {...initialBalance} />
                <FormInput label="Contact Person" icon={<FaUser />} {...contactPerson} />
                <FormInput label="Phone Number" icon={<FaPhone />} {...phoneNumber} />
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

export default AccountCreate;
