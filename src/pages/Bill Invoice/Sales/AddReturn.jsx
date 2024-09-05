import { useState, useEffect } from 'react';
import { FaBarcode, FaDollarSign, FaTrashAlt, FaList, FaUser } from 'react-icons/fa';
import { SlCalender, SlClock } from "react-icons/sl";
import useFormInput from '../../../hooks/useFormInput';
import FormInput from '../../../components/FormInputs/FormInput';
import FormTextArea from '../../../components/FormInputs/FormTextArea';
import Button from '../../../components/Button';
import FormSelect from '../../../components/FormInputs/FormSelect';
import { BiCategory } from 'react-icons/bi';
import { MdAccountBalance } from 'react-icons/md';

import { createReturn, fetchClients, fetchProducts, fetchAllAccount, fetchCategories, fetchClientById } from '../../../services/api';
import { toast } from 'react-toastify';

const AddReturn = () => {
    const [client, setClient] = useState("");
    const [previousDue, setPreviousDue] = useState(0);
    const barcode = useFormInput('');
    const date = useFormInput('', 'date');
    const time = useFormInput('', 'time');
    const description = useFormInput('');
    const transportFare = useFormInput(0, 'number');
    const [account, setAccount] = useState("");
    const [category, setCategory] = useState("");
    const [products, setProducts] = useState([]);
    const [productOptions, setProductOptions] = useState([]);
    const [accountOptions, setAccountOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [clientOptions, setClientOptions] = useState([]);
    const [billAmount, setBillAmount] = useState(0);
    const [dueAmount, setDueAmount] = useState(0);
    const [returnAmount, setReturnAmount] = useState(0); 
    const [selectedProduct, setSelectedProduct] = useState('');

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [productResponse, accountResponse, categoryResponse, clientResponse] = await Promise.all([
                    fetchProducts(),
                    fetchAllAccount(),
                    fetchCategories(),
                    fetchClients()
                ]);

                setProductOptions(productResponse.data);
                setAccountOptions(accountResponse.data);
                setCategoryOptions(categoryResponse.data); 
                setClientOptions(clientResponse.data); 
            } catch (error) {
                console.error('Failed to fetch products, accounts, or categories:', error.message);
                toast.error('Failed to load initial data');
            }
        };
        fetchInitialData();
    }, []);

    // Update billAmount, dueAmount, and returnAmount based on products and previous due
    useEffect(() => {
        const totalReturn = products.reduce((total, product) => total + (product.sellingPrice * product.quantity), 0);
        const totalBill = totalReturn + parseFloat(transportFare.value);
        let totalDue = totalBill - previousDue;

        // If return amount is less than the due, calculate remaining due
        if (totalDue < 0) {
            setDueAmount(Math.abs(totalDue)); // This will be the remaining due amount
            setReturnAmount(0); // No return amount
        } else {
            setDueAmount(0); // No remaining due
            setReturnAmount(totalDue); // Full return
        }
        setBillAmount(totalReturn);
    }, [products, transportFare.value, previousDue]);

    const handleClientChange = async (clientId) => {
        try {
            const response = await fetchClientById(clientId);
            setPreviousDue(response.data?.previousDue || 0);
            setClient(response.data._id);
        } catch (error) {
            console.error('Failed to fetch client details:', error.message);
            toast.error('Failed to fetch client details. Please try again.');
        }
    };

    const handleAddProduct = (productName) => {
        const product = productOptions.find(p => p.productName === productName);
        if (product) {
            setProducts([...products, { ...product, quantity: 1 }]);
        }
    };

    const handleRemoveProduct = (index) => {
        setProducts(products.filter((_, i) => i !== index));
    };

    const handleAddReturn = async (e) => {
        e.preventDefault();

        const returnData = {
            client,
            barcode: barcode.value,
            date: date.value,
            time: time.value,
            products: products.map(product => ({
                product: product._id,
                quantity: product.quantity,
                price: product.sellingPrice,
            })),
            transportFare: transportFare.value,
            account,
            category,
            returnAmount,
            billAmount,
            dueAmount,
            description: description.value,
        };

        try {
            await createReturn(returnData);
            toast.success('Return created successfully');
        } catch (error) {
            console.error('Failed to create return:', error.message);
            toast.error('Failed to create return. Please try again.');
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl mx-auto mt-12">
            <div className="rounded-t-lg h-16 flex justify-center items-center text-2xl font-bold bg-[#5D5B10] text-white">
                <span>Add Return</span>
            </div>
            <form className="p-8" onSubmit={handleAddReturn}>
                <div className="grid grid-cols-2 gap-4">
                    <FormSelect
                      label="Select Client"
                      icon={<FaUser />}
                      options={clientOptions.map(client => ({ label: client.name, value: client._id }))}
                      onChange={(e) => handleClientChange(e.target.value)}
                    />
                    <div className="grid grid-cols-2 space-x-4">
                        <FormInput label="Issued Date" icon={<SlCalender />} {...date} />
                        <FormInput label="Issued Time" icon={<SlClock />} {...time} />
                    </div>
                    <FormInput label="Barcode Number" icon={<FaBarcode />} {...barcode} />
                    <FormSelect
                        label="Select Product"
                        icon={<FaList />}
                        options={productOptions.map(product => ({ label: product.productName, value: product.productName }))}
                        value={selectedProduct}
                        onChange={(e) => {
                            setSelectedProduct(e.target.value);
                            handleAddProduct(e.target.value);
                        }}
                    />
                </div>

                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="bg-[#5D5B10] py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">SL</th>
                            <th className="bg-[#5D5B10] py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Product</th>
                            <th className="bg-[#5D5B10] py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Description</th>
                            <th className="bg-[#5D5B10] py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Stock</th>
                            <th className="bg-[#5D5B10] py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Price</th>
                            <th className="bg-[#5D5B10] py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Quantity</th>
                            <th className="bg-[#5D5B10] py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Total</th>
                            <th className="bg-[#5D5B10] py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td className="py-2 px-4 border border-gray-200">{index + 1}</td>
                                <td className="py-2 px-4 border border-gray-200">{product.productName}</td>
                                <td className="py-2 px-4 border border-gray-200">{product.description}</td>
                                <td className="py-2 px-4 border border-gray-200">{product.openingStock}</td>
                                <td className="py-2 px-4 border border-gray-200">{product.sellingPrice}</td>
                                <td className="py-2 px-4 border border-gray-200">
                                    <input
                                        type="number"
                                        value={product.quantity}
                                        onChange={(e) => {
                                            const newProducts = [...products];
                                            newProducts[index].quantity = parseInt(e.target.value, 10);
                                            setProducts(newProducts);
                                        }}
                                        className="w-full"
                                    />
                                </td>
                                <td className="py-2 px-4 border border-gray-200">{product.sellingPrice * product.quantity}</td>
                                <td className="py-2 px-4 border border-gray-200 text-center">
                                    <button type="button" onClick={() => handleRemoveProduct(index)} className="text-red-500">
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex flex-col gap-4">
                        <FormSelect
                            label="Select Account"
                            icon={<MdAccountBalance />}
                            options={accountOptions.map(account => ({ label: account.title, value: account._id }))}
                            value={account}
                            onChange={(e) => setAccount(e.target.value)}
                        />
                        <FormSelect
                            label="Select Category"
                            icon={<BiCategory />}
                            options={categoryOptions.map(category => ({ label: category.name, value: category._id }))}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <FormInput label="Transport Fare" {...transportFare} icon={<FaDollarSign />} />
                        <div>
                        <FormTextArea label="Cause of Return" {...description} />
                    </div>
                    </div>
                    <table className="min-w-full bg-white my-5">
                        <tbody>
                            <tr>
                                <td className="py-2 px-4 border border-gray-200 font-semibold">Return Amount</td>
                                <td className="py-2 px-4 border border-gray-200">{returnAmount}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border border-gray-200 font-semibold">Transport Fare</td>
                                <td className="py-2 px-4 border border-gray-200">{transportFare.value}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border border-gray-200 font-semibold">Invoice Bill</td>
                                <td className="py-2 px-4 border border-gray-200">{billAmount}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border border-gray-200 font-semibold">Previous Due</td>
                                <td className="py-2 px-4 border border-gray-200">{previousDue}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border border-gray-200 font-semibold">Total Bill</td>
                                <td className="py-2 px-4 border border-gray-200">
                                    {billAmount + parseFloat(transportFare.value)}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border border-gray-200 font-semibold">Remaining Due</td>
                                <td className="py-2 px-4 border border-gray-200">{dueAmount}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div>
                    <Button type="submit">Add Return</Button>
                </div>
                <div className="flex justify-between">
                    <Button text="Cancel" bgColor="bg-red-500" textColor="text-white" />
                    <Button text="Add Invoice" bgColor="bg-[#5D5B10]" textColor="text-white" onClick={handleAddReturn} />
                </div>
            </form>
        </div>
    );
};

export default AddReturn;
