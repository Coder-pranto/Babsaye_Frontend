import { useState, useEffect } from 'react';
import { FaBarcode, FaDollarSign, FaBook, FaTrashAlt, FaList, FaUser } from 'react-icons/fa';
import { SlCalender, SlClock } from "react-icons/sl";
import useFormInput from '../../../hooks/useFormInput';
import FormInput from '../../../components/FormInputs/FormInput';
import FormTextArea from '../../../components/FormInputs/FormTextArea';
import Button from '../../../components/Button';
import FormSelect from '../../../components/FormInputs/FormSelect';
import { BiCategory } from 'react-icons/bi';
import { MdAccountBalance } from 'react-icons/md';

const AddReturn = () => {
    const client = useFormInput('');
    const barcode = useFormInput('');
    const date = useFormInput('', 'date');
    const time = useFormInput('', 'time');
    const [products, setProducts] = useState([]);
    const transportFare = useFormInput(0, 'number');
    const account = useFormInput('');
    const category = useFormInput('');
    const [returnAmount, setReturnAmount] = useState(0);
    const [dueAmount, setDueAmount] = useState(0);
    const description = useFormInput('');
    const [selectedProduct, setSelectedProduct] = useState('');

    const productOptions = [
        { id: 1, name: 'Biscuits', price: 150, stock: 10 },
        { id: 2, name: 'Chocolate', price: 250, stock: 10 },
        { id: 3, name: 'Cake', price: 120, stock: 10 },
        { id: 4, name: 'Choco Biscuits', price: 350, stock: 10 },
    ];

    useEffect(() => {
        const totalReturn = products.reduce((total, product) => total + (product.price * product.quantity), 0);
        const totalDue = totalReturn + parseFloat(transportFare.value);
        setReturnAmount(totalReturn);
        setDueAmount(totalDue);
    }, [products, transportFare.value]);

    const handleAddProduct = (productName) => {
        const product = productOptions.find(p => p.name === productName);
        if (product) {
            setProducts([...products, { ...product, quantity: 1 }]);
        }
    };

    const handleRemoveProduct = (index) => {
        setProducts(products.filter((_, i) => i !== index));
    };

    const handleSaveAsDraft = () => {
        // Save as draft logic
    }

    const handleAddReturn = () => {
        // Add return logic
    }

    return (
        <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl mx-auto mt-12">
            <div className="rounded-t-lg h-16 flex justify-center items-center text-2xl font-bold bg-[#5D5B10] text-white">
                <span>Add Return</span>
            </div>
            <form className="p-8">
                <div className="grid grid-cols-2 gap-4">
                    <FormInput label="Select Client" {...client} icon={<FaUser />} />
                    <div className="grid grid-cols-2 space-x-4">
                        <FormInput label="Issued Date" icon={<SlCalender />} {...date} />
                        <FormInput label="Issued Time" icon={<SlClock />} {...time} />
                    </div>
                    <FormInput label="Barcode Number" icon={<FaBarcode />} {...barcode} />
                    <FormSelect
                        label="Select Product"
                        icon={<FaList />}
                        options={productOptions.map(product => ({ label: product.name, value: product.name }))}
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
                            <th className="bg-[#5D5B10] py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Unit</th>
                            <th className="bg-[#5D5B10] py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Total</th>
                            <th className="bg-[#5D5B10] py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td className="py-2 px-4 border border-gray-200">{index + 1}</td>
                                <td className="py-2 px-4 border border-gray-200">{product.name}</td>
                                <td className="py-2 px-4 border border-gray-200">null</td>
                                <td className="py-2 px-4 border border-gray-200">{product.stock}</td>
                                <td className="py-2 px-4 border border-gray-200">{product.price}</td>
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
                                <td className="py-2 px-4 border border-gray-200">Piece</td>
                                <td className="py-2 px-4 border border-gray-200">{product.price * product.quantity}</td>
                                <td className="py-2 px-4 border border-gray-200">
                                    <button type="button" onClick={() => handleRemoveProduct(index)}>
                                        <FaTrashAlt className="text-red-500" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex flex-col gap-4">
                        <FormInput label="Transport Fare" icon={<FaDollarSign />} {...transportFare} />
                        <FormInput label="Select Account" icon={<MdAccountBalance />} {...account} />
                        <FormInput label="Select Categories" icon={<BiCategory />} {...category} />
                        <FormInput label="Return Amount (Not Editable)" icon={<FaDollarSign />} value={returnAmount} disabled />
                        <FormInput label="Due Amount (Not Editable)" icon={<FaDollarSign />} value={dueAmount} disabled />
                    </div>

                    <table className="min-w-full bg-white my-5">
                        <tbody>
                            <tr>
                                <td className="py-2 px-4 border border-gray-200 font-semibold">Total</td>
                                <td className="py-2 px-4 border border-gray-200">{returnAmount}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border border-gray-200 font-semibold">Transport Fare</td>
                                <td className="py-2 px-4 border border-gray-200">{transportFare.value}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border border-gray-200 font-semibold">Invoice Bill</td>
                                <td className="py-2 px-4 border border-gray-200">{returnAmount}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border border-gray-200 font-semibold">Previous Due</td>
                                <td className="py-2 px-4 border border-gray-200">0</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border border-gray-200 font-semibold">Total Bill</td>
                                <td className="py-2 px-4 border border-gray-200">{returnAmount + parseFloat(transportFare.value)}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border border-gray-200 font-semibold">Payment</td>
                                <td className="py-2 px-4 border border-gray-200">{0}</td>
</tr>
<tr>
<td className="py-2 px-4 border border-gray-200 font-semibold">Upcoming Due</td>
<td className="py-2 px-4 border border-gray-200">0</td>
</tr>
<tr>
<td className="py-2 px-4 border border-gray-200 font-semibold">Total Return</td>
<td className="py-2 px-4 border border-gray-200">{dueAmount}</td>
</tr>
</tbody>
</table>
</div>
<FormTextArea label="Description" icon={<FaBook />} {...description} />
            <div className="flex justify-between">
                <Button text="Cancel" bgColor="bg-red-500" textColor="text-white" />
                <Button text="Save As Draft" bgColor="bg-[#5D5B10]" textColor="text-white" onClick={handleSaveAsDraft} />
                <Button text="Add Return" bgColor="bg-[#5D5B10]" textColor="text-white" onClick={handleAddReturn} />
            </div>
        </form>
    </div>
);

};

export default AddReturn;