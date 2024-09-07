import { useEffect, useState } from 'react';
import { FaUser, FaDollarSign, FaList, FaTag, FaBook, FaCreditCard, FaCalendarAlt } from 'react-icons/fa';
import useFormInput from '../../../hooks/useFormInput';
import FormInput from '../../../components/FormInputs/FormInput';
import FormSelect from '../../../components/FormInputs/FormSelect';
import FormTextArea from '../../../components/FormInputs/FormTextArea';
import { fetchClients, fetchAllAccount, fetchReceiveCategories, fetchReceiveSubCategories, createReceive } from '../../../services/api'; 
import { toast } from 'react-toastify';
import { generateCustomId } from '../../../utils/CustomIDCreator';


const AddNewReceive = () => {
    const client = useFormInput('');
    const account = useFormInput('');
    const amount = useFormInput(0, 'number');
    const subCategory = useFormInput('');
    const category = useFormInput('');
    const receiveDescription = useFormInput('');
    const paymentMethod = useFormInput('');
    const date = useFormInput('', 'date');
    const [moneyRecipt, setMoneyRecipt] = useState('');

    const [clients, setClients] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCatnegories, setSubCategories] = useState([]);
    const [isSubCategoryDisabled, setIsSubCategoryDisabled] = useState(true);

    useEffect(() => {
        // Fetch clients
        const loadClients = async () => {
            try {
                const response = await fetchClients();
                setClients(response.data); 
            } catch (error) {
                console.error('Error fetching clients:', error.message);
            }
        };

        // Fetch accounts
        const loadAccounts = async () => {
            try {
                const response = await fetchAllAccount();
                setAccounts(response.data);
            } catch (error) {
                console.error('Error fetching accounts:', error.message);
            }
        };

        // Fetch categories
        const loadCategories = async () => {
            try {
                const response = await fetchReceiveCategories();
                setCategories(response.data); 
            } catch (error) {
                console.error('Error fetching categories:', error.message);
            }
        };

        setMoneyRecipt(generateCustomId("RCPT_MT"));

        loadClients();
        loadAccounts();
        loadCategories();
    }, []);

    useEffect(() => {
        const loadSubCategories = async () => {
            if (category.value) {
                try {
                    const { data } = await fetchReceiveSubCategories();
                    const filteredSubcategories = data.filter(d => d.category._id === category.value);
                    setSubCategories(filteredSubcategories);
                    setIsSubCategoryDisabled(false);
                } catch (error) {
                    console.error('Error fetching subcategories:', error.message);
                }
            } else {
                setSubCategories([]);
                setIsSubCategoryDisabled(true);
            }
        };

        loadSubCategories();
    }, [category.value]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const receiveData = {
            client: client.value,
            account: account.value,
            amount: amount.value,
            subcategory: subCategory.value,
            category: category.value,
            description: receiveDescription.value,
            paymentMethod: paymentMethod.value,
            moneyReceiptId:moneyRecipt,
            date: date.value,
        };
        try {
            const response = await createReceive(receiveData);
            console.log('Receive created:', response.data);
            toast.success("Receive created.")
        } catch (error) {
            console.error('Error creating receive:', error.message);
            toast.error("Error creating receive!")
        }
    };

    return (
        <div className="bg-white rounded shadow-lg w-full max-w-6xl mx-auto mt-12">
            <div className="h-16 flex justify-center items-center text-2xl font-bold bg-[#5D5B10] text-white">
                <span>Add New Receive</span>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 p-8">
                <FormSelect
                    label="Select Client"
                    icon={<FaUser />}
                    {...client}
                    options={[
                        { value: '', label: 'Select Client' },
                        ...clients.map(client => ({ value: client._id, label: client.name }))
                    ]}
                />
                <FormSelect
                    label="Select Account"
                    icon={<FaBook />}
                    {...account}
                    options={[
                        { value: '', label: 'Select Account' },
                        ...accounts.map(account => ({ value: account._id, label: account.title }))
                    ]}
                />
                <FormInput label="Amount" icon={<FaDollarSign />} {...amount} />
                <FormInput label="Date" icon={<FaCalendarAlt />} {...date} />
                <FormSelect
                    label="Select Category"
                    icon={<FaList />}
                    {...category}
                    options={[
                        { value: '', label: 'Select Category' },
                        ...categories.map(cat => ({ value: cat._id, label: cat.name }))
                    ]}
                />
                <FormSelect
                    label="Select Sub Category"
                    icon={<FaTag />}
                    {...subCategory}
                    options={[
                        { value: '', label: 'Select Sub Category' },
                        ...subCategories.map(subCat => ({ value: subCat._id, label: subCat.name }))
                    ]}
                    disabled={isSubCategoryDisabled}
                />
                <div className="col-span-2">
                    <FormTextArea label="Receive Description" icon={<FaBook />} {...receiveDescription} />
                </div>
                <FormSelect
                    label="Payment Method"
                    icon={<FaCreditCard />}
                    {...paymentMethod}
                    options={[
                        { value: '', label: 'Select Payment Method' },
                        { value: 'Cash', label: 'Cash' },
                        { value: 'Bank', label: 'Bank Transfer' },
                        { value: 'Other', label: 'Others' },
                    ]}
                />
                <button type="submit" className="col-span-2 bg-[#5D5B10] text-white py-2 mx-4 rounded hover:bg-green-600">
                    Add Receive
                </button>
            </form>
        </div>
    );
};

export default AddNewReceive;
