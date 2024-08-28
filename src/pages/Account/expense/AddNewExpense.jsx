import { FaCalendarAlt, FaBook, FaDollarSign, FaList, FaCreditCard, FaFileUpload, FaTag } from 'react-icons/fa';
import useFormInput from '../../../hooks/useFormInput';
import FormInput from '../../../components/FormInputs/FormInput';
import FormSelect from '../../../components/FormInputs/FormSelect';
import FormTextArea from '../../../components/FormInputs/FormTextArea';
import FormFileInput from '../../../components/FormInputs/FormFileInput';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { createExpense, fetchAllAccount, fetchExpenseCategories, fetchExpenseSubCategories } from '../../../services/api';
import { generateCustomId } from '../../../utils/CustomIDCreator';
import useFormFileInput from '../../../hooks/useFormFileInput';

const AddNewExpense = () => {
    const date = useFormInput('', 'date');
    const account = useFormInput('');
    const amount = useFormInput(0, 'number');
    const category = useFormInput('');
    const subCategory = useFormInput('');
    const expenseDescription = useFormInput('');
    const paymentMethod = useFormInput('');
    const file = useFormFileInput();

    const [cheque, setCheque] = useState(""); // For cheque number
    const [accounts, setAccounts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [isSubCategoryDisabled, setIsSubCategoryDisabled] = useState(true);

    useEffect(() => {
        // Generate a unique cheque number when the component mounts
        setCheque(generateCustomId("CHQ-EX"));

        // Fetch accounts
        const loadAccounts = async () => {
            try {
                const { data } = await fetchAllAccount();
                setAccounts(data);      
            } catch (error) {
                console.log("Failed to fetch account data", error.message);
            }
        };

        // Fetch categories
        const loadCategories = async () => {
            try {
                const { data } = await fetchExpenseCategories();
                setCategories(data);      
            } catch (error) {
                console.log("Failed to fetch category data", error.message);
            }
        };

        // Fetch subcategories
        const loadSubCategories = async () => {
            try {
                const { data } = await fetchExpenseSubCategories();
                setSubCategories(data);      
            } catch (error) {
                console.log("Failed to fetch subcategory data", error.message);
            }
        };

        loadAccounts();
        loadCategories();
        loadSubCategories();
    }, []);

    useEffect(() => {
        const loadSubCategory = async () => {
            if (category.value) {
                try {
                    const { data } = await fetchExpenseSubCategories();
                    const filteredSubcategories = data.filter(d => d.category._id === category.value);
                    setSubCategories(filteredSubcategories);
                    setIsSubCategoryDisabled(false);
                } catch (error) {
                    console.log("Error fetching subcategory data", error.message);
                }
            } else {
                setSubCategories([]);
                setIsSubCategoryDisabled(true);
            }
        };

        loadSubCategory();
    }, [category.value]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a FormData object
        const formData = new FormData();
        formData.append('date', date.value);
        formData.append('account', account.value);
        formData.append('amount', amount.value);
        formData.append('category', category.value);
        formData.append('subcategory', subCategory.value);
        formData.append('description', expenseDescription.value);
        formData.append('paymentMethod', paymentMethod.value);
        formData.append('chequeNo', cheque);
        if (file.file) {
            formData.append('file', file.file); 
        }
        try {
            const response = await createExpense(formData);
            console.log('Expense created:', response.data);
            toast.success("Expense created successfully.");
        } catch (error) {
            console.error('Error creating expense:', error.message);
            toast.error("Error creating expense!");
        }
    };

    return (
        <div className="bg-white rounded shadow-lg w-full max-w-6xl mx-auto mt-12">
            <div className="h-16 flex justify-center items-center text-2xl font-bold bg-[#5D5B10] text-white">
                <span>Add New Expense</span>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 p-8">
                <FormInput label="Date" icon={<FaCalendarAlt />} {...date} />
                <FormSelect
                    label="Select Account"
                    icon={<FaBook />}
                    {...account}
                    options={[
                        { value: '', label: 'Select Account' },
                        ...accounts.map(acc => ({ value: acc._id, label: acc.title }))
                    ]}
                />
                <FormInput label="Amount" icon={<FaDollarSign />} {...amount} />
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
                    <FormTextArea label="Expense Description" icon={<FaBook />} {...expenseDescription} />
                </div>
                <FormSelect
                    label="Payment Method"
                    icon={<FaCreditCard />}
                    {...paymentMethod}
                    options={[
                        { value: '', label: 'Select Payment Method' },
                        { value: 'Cash', label: 'Cash' },
                        { value: 'Bank', label: 'Bank Transfer' },
                        { value: 'Other', label: 'Others' }
                    ]}
                />
                <FormFileInput label="File" icon={<FaFileUpload />} {...file} />
                <button type="submit" className="col-span-2 bg-[#5D5B10] text-white py-2 mx-4 rounded hover:bg-green-600">
                    Add Expense
                </button>
            </form>
        </div>
    );
};

export default AddNewExpense;
