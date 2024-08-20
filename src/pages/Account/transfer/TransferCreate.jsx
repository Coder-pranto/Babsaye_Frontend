import { FaCalendarAlt, FaBook, FaDollarSign, FaCreditCard, FaTag,FaStarOfLife } from 'react-icons/fa';
import useFormInput from '../../../hooks/useFormInput';
import FormInput from '../../../components/FormInputs/FormInput';
import FormSelect from '../../../components/FormInputs/FormSelect';
import FormTextArea from '../../../components/FormInputs/FormTextArea';


const TransferCreate = () => {
    const date = useFormInput('', 'date');
    const account = useFormInput('');
    const amount = useFormInput(0, 'number');
    const transferDescription = useFormInput('');
    const paymentMethod = useFormInput('');
    const tag = useFormInput('');
    const reference = useFormInput('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log({
            date: date.value,
            account: account.value,
            amount: amount.value,
            transferDescription: transferDescription.value,
            paymentMethod: paymentMethod.value,
            tag: tag.value,
            reference: reference.value,
        });
    };

    return (
        <div className="bg-white rounded shadow-lg w-full max-w-6xl mx-auto mt-12">
            <div className="h-16 flex justify-center items-center text-2xl font-bold bg-[#5D5B10] text-white">
                <span>Create New Transfer</span>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 p-8">
                <FormInput label="Date" icon={<FaCalendarAlt />} {...date} />
                <FormSelect
                    label="Select Account"
                    icon={<FaBook />}
                    {...account}
                    options={[
                        { value: '', label: 'Select Account' },
                        { value: 'account1', label: 'Account 1' },
                        { value: 'account2', label: 'Account 2' },
                        // Add more account options
                    ]}
                />
                <FormInput label="Amount" icon={<FaDollarSign />} {...amount} />
                <FormTextArea label="Transfer Description" icon={<FaBook />} {...transferDescription} className="col-span-2" />
                <FormSelect
                    label="Payment Method"
                    icon={<FaCreditCard />}
                    {...paymentMethod}
                    options={[
                        { value: '', label: 'Select Payment Method' },
                        { value: 'cash', label: 'Cash' },
                        { value: 'credit', label: 'Credit Card' },
                        { value: 'bank', label: 'Bank Transfer' },
                    ]}
                />
                <FormInput label="Tag" icon={<FaTag />} {...tag} />
                <FormInput label="Reference" icon={<FaStarOfLife />} {...reference} />
                <button type="submit" className="col-span-2 bg-[#5D5B10] text-white py-2 mx-4 rounded hover:bg-green-600">
                    Create Transfer
                </button>
            </form>
        </div>
    );
};

export default TransferCreate;
