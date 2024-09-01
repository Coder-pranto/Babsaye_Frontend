// import { useState } from 'react';
// import { FaDollarSign, FaCalendarAlt, FaBuilding, FaList, FaExchangeAlt } from 'react-icons/fa';
// import useFormInput from '../../../hooks/useFormInput';
// import FormInput from '../../../components/FormInputs/FormInput';
// import FormSelect from '../../../components/FormInputs/FormSelect';
// import { addStaffPayment } from '../../../services/api';
// import { generateCustomId } from '../../../utils/CustomIDCreator';
// import { toast } from 'react-toastify';

// const StaffPaymentCreate = () => {
//     const date = useFormInput('');
//     const account = useFormInput('');
//     const amount = useFormInput('');
//     const category = useFormInput('');
//     const month = useFormInput('');
//     const year = useFormInput('');
//     const transactionType = useFormInput('debit'); // Default value 'debit'

//     const [loading, setLoading] = useState(false);

//     const months = [
//         { label: 'January', value: '01' },
//         { label: 'February', value: '02' },
//         { label: 'March', value: '03' },
//         { label: 'April', value: '04' },
//         { label: 'May', value: '05' },
//         { label: 'June', value: '06' },
//         { label: 'July', value: '07' },
//         { label: 'August', value: '08' },
//         { label: 'September', value: '09' },
//         { label: 'October', value: '10' },
//         { label: 'November', value: '11' },
//         { label: 'December', value: '12' },
//     ];

//     const years = Array.from(new Array(30), (val, index) => {
//         const year = new Date().getFullYear() - index;
//         return { label: year, value: year };
//     });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         const staffPaymentData = {
//             date: date.value,
//             month: month.value,
//             year: year.value,
//             account: account.value,
//             amount: amount.value,
//             category: category.value,
//             transactionId: generateCustomId('SP-223'), // Generate transactionId
//             transactionType: transactionType.value,
//         };

//         try {
//             await addStaffPayment(staffPaymentData);
//             // Handle success (e.g., show a success message, clear the form, etc.)
//             toast.success("Staff payment added.")
//         } catch (error) {
//             console.log("Error occurred.", error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="bg-white rounded shadow-lg w-full max-w-6xl mx-auto mt-12">
//             <div className="h-16 flex justify-center items-center text-2xl font-bold bg-[#5D5B10] text-white">
//                 <span>Staff Payment Create</span>
//             </div>
//             <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4 p-8">
//                 <div className="grid grid-cols-3 gap-4 col-span-3">
//                     <FormInput label="Date" icon={<FaCalendarAlt />} {...date} />
//                     <FormSelect label="Month" icon={<FaCalendarAlt />} {...month} options={months} />
//                     <FormSelect label="Year" icon={<FaCalendarAlt />} {...year} options={years} />
//                 </div>
//                 <FormInput label="Account" icon={<FaBuilding />} {...account} />
//                 <FormInput label="Amount" icon={<FaDollarSign />} {...amount} />
//                 <FormInput label="Category" icon={<FaList />} {...category} />
//                 <FormSelect
//                     label="Transaction Type"
//                     icon={<FaExchangeAlt />}
//                     {...transactionType}
//                     options={[
//                         { label: 'Debit', value: 'debit' },
//                         { label: 'Credit', value: 'credit' },
//                     ]}
//                 />
//                 <button type="submit" className="col-span-3 bg-[#5D5B10] text-white py-2 mx-4 rounded" disabled={loading}>
//                     {loading ? 'Adding...' : 'Add Payment'}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default StaffPaymentCreate;



import { useState, useEffect } from 'react';
import { FaDollarSign, FaCalendarAlt, FaBuilding, FaList, FaExchangeAlt, FaIdBadge } from 'react-icons/fa';
import useFormInput from '../../../hooks/useFormInput';
import FormInput from '../../../components/FormInputs/FormInput';
import FormSelect from '../../../components/FormInputs/FormSelect';
import { addStaffPayment, fetchAllAccount, fetchExpenseCategories } from '../../../services/api';
import { generateCustomId } from '../../../utils/CustomIDCreator';
import { toast } from 'react-toastify';

const StaffPaymentCreate = () => {
    const date = useFormInput('','date');
    const account = useFormInput('');
    const amount = useFormInput('');
    const category = useFormInput('');
    const month = useFormInput('');
    const year = useFormInput('');
    const transactionType = useFormInput('debit'); 
    const transactionId = generateCustomId('SP-223'); 

    const [loading, setLoading] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [categories, setCategories] = useState([]);

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

    useEffect(() => {
        // Fetch accounts and categories when the component mounts
        const fetchDropdownData = async () => {
            try {
                const accountResponse = await fetchAllAccount();
                const categoryResponse = await fetchExpenseCategories();
                setAccounts(accountResponse.data);
                setCategories(categoryResponse.data);
            } catch (error) {
                toast.error("Error loading dropdown data.");
                console.log("Error fetching dropdown data.", error.message);
            }
        };

        fetchDropdownData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const staffPaymentData = {
            date: date.value,
            month: month.value,
            year: year.value,
            account: account.value,
            amount: amount.value,
            category: category.value,
            transactionId: transactionId, // Set transactionId
            transactionType: transactionType.value,
        };

        try {
            await addStaffPayment(staffPaymentData);
            toast.success("Staff payment added.");
            // Optionally, reset the form fields here
        } catch (error) {
            toast.error("Failed to add staff payment.");
            console.log("Error occurred.", error.message);
        } finally {
            setLoading(false);
        }
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
                <FormSelect
                    label="Account"
                    icon={<FaBuilding />}
                    {...account}
                    options={accounts.map(acc => ({ label: acc.title, value: acc._id }))}
                />
                <FormInput label="Amount" icon={<FaDollarSign />} {...amount} />
                <FormSelect
                    label="Category"
                    icon={<FaList />}
                    {...category}
                    options={categories.map(cat => ({ label: cat.name, value: cat._id }))}
                />
                <FormSelect
                    label="Transaction Type"
                    icon={<FaExchangeAlt />}
                    {...transactionType}
                    options={[
                        { label: 'Debit', value: 'debit' },
                        { label: 'Credit', value: 'credit' },
                    ]}
                />
                <FormInput
                    label="Transaction ID"
                    icon={<FaIdBadge />}
                    value={transactionId}
                    readOnly
                />
                <button type="submit" className="col-span-3 bg-[#5D5B10] text-white py-2 mx-4 rounded" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Payment'}
                </button>
            </form>
        </div>
    );
};

export default StaffPaymentCreate;
