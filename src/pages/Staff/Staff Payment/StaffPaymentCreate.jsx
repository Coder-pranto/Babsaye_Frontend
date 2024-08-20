import { FaDollarSign, FaCalendarAlt, FaBuilding, FaList } from 'react-icons/fa';
import useFormInput from '../../../hooks/useFormInput';
import FormInput from '../../../components/FormInputs/FormInput';
import FormSelect from '../../../components/FormInputs/FormSelect';

const StaffPaymentCreate = () => {
    const date = useFormInput('');
    const account = useFormInput('');
    const amount = useFormInput('');
    const category = useFormInput('');

    const month = useFormInput('');
    const year = useFormInput('');

    const months = [
        { label: 'January', value: '01' },
        { label: 'February', value: '02' },
        { label: 'March', value: '03' },
        { label: 'April', value: '04' },
        { label: 'May', value: '05' },
        { label: 'June', value: '06' },
        { label: 'July', value: '07' },
        { label: 'August', value: '08' },
        { label: 'September', value: '09' },
        { label: 'October', value: '10' },
        { label: 'November', value: '11' },
        { label: 'December', value: '12' },
    ];

    const years = Array.from(new Array(30), (val, index) => {
        const year = new Date().getFullYear() - index;
        return { label: year, value: year };
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log({
            date: date.value,
            month: month.value,
            year: year.value,
            account: account.value,
            amount: amount.value,
            category: category.value,
        });
    };

    return (
        <div className="bg-white rounded shadow-lg w-full max-w-6xl mx-auto mt-12">
            <div className="h-16 flex justify-center items-center text-2xl font-bold bg-[#5D5B10] text-white">
                <span>Staff Payment Create</span>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4 p-8">
                <div className="grid grid-cols-3 gap-4 col-span-3">
                    <FormInput label="Date" icon={<FaCalendarAlt />} {...date} />
                    <FormSelect label="Month" icon={<FaCalendarAlt />} {...month} options={months} />
                    <FormSelect label="Year" icon={<FaCalendarAlt />} {...year} options={years} />
                </div>
                <FormInput label="Account" icon={<FaBuilding />} {...account} />
                <FormInput label="Amount" icon={<FaDollarSign />} {...amount} />
                <FormInput label="Category" icon={<FaList />} {...category} />
                <button type="submit" className="col-span-3 bg-[#5D5B10] text-white py-2 mx-4 rounded">
                    Add Payment
                </button>
            </form>
        </div>
    );
};

export default StaffPaymentCreate;
