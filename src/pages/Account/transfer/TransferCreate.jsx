// import { useState, useEffect } from 'react';
// import { FaCalendarAlt, FaBook, FaDollarSign, FaCreditCard, FaTag, FaStarOfLife } from 'react-icons/fa';
// import useFormInput from '../../../hooks/useFormInput';
// import FormInput from '../../../components/FormInputs/FormInput';
// import FormSelect from '../../../components/FormInputs/FormSelect';
// import FormTextArea from '../../../components/FormInputs/FormTextArea';
// import { createTransfer, fetchAllAccount } from '../../../services/api';

// const TransferCreate = () => {
//     const [accounts, setAccounts] = useState([]);
//     const [transactionType, setTransactionType] = useState('transfer');
//     const date = useFormInput('', 'date');
//     const fromAccount = useFormInput('');
//     const toAccount = useFormInput('');
//     const amount = useFormInput(0, 'number');
//     const transferDescription = useFormInput('');
//     const paymentMethod = useFormInput('');
//     const tag = useFormInput('');
//     const reference = useFormInput('');

//     // Fetch accounts when component loads
//     useEffect(() => {
//         const loadAccounts = async () => {
//             try {
//                 const response = await fetchAllAccount();
//                 setAccounts(response.data); 
//             } catch (err) {
//                 console.error('Failed to load accounts', err);
//             }
//         };

//         loadAccounts();
//     }, []);

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const data = {
//                 date: date.value,
//                 fromAccount: fromAccount.value,
//                 toAccount: transactionType === 'transfer' ? toAccount.value : undefined,
//                 amount: amount.value,
//                 description: transferDescription.value,
//                 paymentMethod: paymentMethod.value,
//                 tag: tag.value,
//                 reference: reference.value,
//                 type: transactionType,
//             };
//             await createTransfer(data);
//             alert('Transaction successful');
//         } catch (err) {
//             console.error("transaction failed", err.message);
//             alert('Transaction failed');
//         }
//     };

//     // Filtered toAccount options excluding selected fromAccount
//     const toAccountOptions = accounts.filter(acc => acc._id !== fromAccount.value);

//     return (
//         <div className="bg-white rounded shadow-lg w-full max-w-6xl mx-auto mt-12">
//             <div className="h-16 flex justify-center items-center text-2xl font-bold bg-[#5D5B10] text-white">
//                 <span>Create New Transfer</span>
//             </div>
//             <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 p-8">
//                 <FormInput label="Date" icon={<FaCalendarAlt />} {...date} />

//                 <FormSelect
//                     label="Transaction Type"
//                     icon={<FaBook />}
//                     value={transactionType}
//                     onChange={(e) => setTransactionType(e.target.value)}
//                     options={[
//                         { value: 'transfer', label: 'Fund Transfer' },
//                         { value: 'deposit', label: 'Deposit' },
//                         { value: 'withdraw', label: 'Withdraw' },
//                     ]}
//                 />

//                 <FormSelect
//                     label="From Account"
//                     icon={<FaBook />}
//                     {...fromAccount}
//                     options={[
//                         ...accounts.map(acc => ({ value: acc._id, label: acc.title }))
//                     ]}
//                 />

//                 {transactionType === 'transfer' && (
//                     <FormSelect
//                         label="To Account"
//                         icon={<FaBook />}
//                         {...toAccount}
//                         options={[
//                             { value: '', label: 'Select Account' },
//                             ...toAccountOptions.map(acc => ({ value: acc._id, label: acc.title }))
//                         ]}
//                     />
//                 )}

//                 <FormInput label="Amount" icon={<FaDollarSign />} {...amount} />
//                 <FormTextArea label="Transfer Description" icon={<FaBook />} {...transferDescription} className="col-span-2" />
                
//                 <FormSelect
//                     label="Payment Method"
//                     icon={<FaCreditCard />}
//                     {...paymentMethod}
//                     options={[
//                         { value: 'cash', label: 'Cash' },
//                         { value: 'credit', label: 'Credit Card' },
//                         { value: 'bank', label: 'Bank Transfer' },
//                     ]}
//                 />

//                 <FormInput label="Tag" icon={<FaTag />} {...tag} />
//                 <FormInput label="Reference" icon={<FaStarOfLife />} {...reference} />
//                 <button type="submit" className="col-span-2 bg-[#5D5B10] text-white py-2 mx-4 rounded hover:bg-green-600">
//                     Create Transfer
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default TransferCreate;

import { useState, useEffect } from 'react';
import { FaCalendarAlt, FaBook, FaDollarSign, FaCreditCard, FaTag, FaStarOfLife } from 'react-icons/fa';
import useFormInput from '../../../hooks/useFormInput';
import FormInput from '../../../components/FormInputs/FormInput';
import FormSelect from '../../../components/FormInputs/FormSelect';
import FormTextArea from '../../../components/FormInputs/FormTextArea';
import { createTransfer, fetchAllAccount } from '../../../services/api';

const TransferCreate = () => {
    const [accounts, setAccounts] = useState([]);
    const [transactionType, setTransactionType] = useState('transfer');
    const date = useFormInput('', 'date');
    const fromAccount = useFormInput('');
    const toAccount = useFormInput('');
    const amount = useFormInput(0, 'number');
    const transferDescription = useFormInput('');
    const paymentMethod = useFormInput('');
    const tag = useFormInput('');
    const reference = useFormInput('');

    // Fetch accounts when component loads
    useEffect(() => {
        const loadAccounts = async () => {
            try {
                const response = await fetchAllAccount();
                setAccounts(response.data); 
            } catch (err) {
                console.error('Failed to load accounts', err);
            }
        };

        loadAccounts();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                date: date.value,
                fromAccount: fromAccount.value,
                toAccount: transactionType === 'transfer' ? toAccount.value : undefined,
                amount: amount.value,
                description: transferDescription.value,
                paymentMethod: paymentMethod.value,
                tag: tag.value,
                reference: reference.value,
                transactionType,  // Updated to use transactionType consistently
            };
            await createTransfer(data);
            alert('Transaction successful');
        } catch (err) {
            console.error("Transaction failed", err.message);
            alert('Transaction failed');
        }
    };

    // Filter toAccount options excluding the selected fromAccount
    const toAccountOptions = accounts.filter(acc => acc._id !== fromAccount.value);

    return (
        <div className="bg-white rounded shadow-lg w-full max-w-6xl mx-auto mt-12">
            <div className="h-16 flex justify-center items-center text-2xl font-bold bg-[#5D5B10] text-white">
                <span>Create New Transfer</span>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 p-8">
                <FormInput label="Date" icon={<FaCalendarAlt />} {...date} />

                <FormSelect
                    label="Transaction Type"
                    icon={<FaBook />}
                    value={transactionType}
                    onChange={(e) => setTransactionType(e.target.value)}
                    options={[
                        { value: 'transfer', label: 'Fund Transfer' },
                        { value: 'deposit', label: 'Deposit' },
                        { value: 'withdraw', label: 'Withdraw' },
                    ]}
                />

                <FormSelect
                    label="From Account"
                    icon={<FaBook />}
                    {...fromAccount}
                    options={[
                        ...accounts.map(acc => ({ value: acc._id, label: acc.title }))
                    ]}
                />

                {transactionType === 'transfer' && (
                    <FormSelect
                        label="To Account"
                        icon={<FaBook />}
                        {...toAccount}
                        options={[
                            { value: '', label: 'Select Account' },
                            ...toAccountOptions.map(acc => ({ value: acc._id, label: acc.title }))
                        ]}
                    />
                )}

                <FormInput label="Amount" icon={<FaDollarSign />} {...amount} />
                <FormTextArea label="Transfer Description" icon={<FaBook />} {...transferDescription} className="col-span-2" />
                
                <FormSelect
                    label="Payment Method"
                    icon={<FaCreditCard />}
                    {...paymentMethod}
                    options={[
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
