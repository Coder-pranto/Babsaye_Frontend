import { useState, useEffect } from 'react';
import { FaDollarSign, FaTrashAlt, FaList } from 'react-icons/fa';
import { SlCalender } from 'react-icons/sl';
import useFormInput from '../../../hooks/useFormInput';
import FormInput from '../../../components/FormInputs/FormInput';
import Button from '../../../components/Button';
import FormSelect from '../../../components/FormInputs/FormSelect';

const AddNewPurchase = () => {
    const invoiceId = useFormInput('');
    const date = useFormInput('', 'date');
    const discountRate = useFormInput(0, 'number');
    const discountType = useFormInput('flat');
    const paymentAmount = useFormInput(0, 'number');
    const transportFare = useFormInput(0, 'number');
    const [products, setProducts] = useState([]);

    const [billAmount, setBillAmount] = useState(0);
    const [vat, setVat] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const [dueAmount, setDueAmount] = useState(0);

    const productOptions = [
        { id: 1, name: 'Biscuits', price: 150, stock: 10 },
        { id: 2, name: 'Chocolate', price: 250, stock: 10 },
        { id: 3, name: 'Cake', price: 120, stock: 10 },
        { id: 4, name: 'Choco Biscuits', price: 350, stock: 10 },
    ];

    const supplierOptions = [
        { id: 1, name: 'Supplier A' },
        { id: 2, name: 'Supplier B' },
        { id: 3, name: 'Supplier C' },
    ];

    useEffect(() => {
        const totalBill = products.reduce((total, product) => total + (product.price * product.quantity), 0);
        const discount = discountType.value === 'flat' ? parseFloat(discountRate.value) : (totalBill * parseFloat(discountRate.value) / 100);
        const grandTotalAmount = totalBill + parseFloat(vat) + parseFloat(transportFare.value) - discount;
        const totalDue = grandTotalAmount - parseFloat(paymentAmount.value);

        setBillAmount(totalBill);
        setGrandTotal(grandTotalAmount);
        setDueAmount(totalDue);
    }, [products, discountRate.value, discountType.value, transportFare.value, paymentAmount.value, vat]);

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
    };

    const handleAddPurchase = () => {
        // Add purchase logic
    };

    return (
        <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl mx-auto mt-12">
            <div className="rounded-t-lg h-16 flex justify-center items-center text-2xl font-bold bg-[#5D5B10] text-white">
                <span>Add New Purchase</span>
            </div>
            <form className="p-8">
                <div className="grid grid-cols-2 gap-4">
                    <FormInput label="Invoice ID No" {...invoiceId} icon={<FaDollarSign />} />
                    <FormInput label="Date" {...date} icon={<SlCalender />} />
                    <FormSelect
                        label="Select Product"
                        icon={<FaList />}
                        options={productOptions.map(product => ({ label: product.name, value: product.name }))}
                        value=""
                        onChange={(e) => handleAddProduct(e.target.value)}
                    />
                    <FormSelect
                        label="Select Supplier"
                        icon={<FaList />}
                        options={supplierOptions.map(supplier => ({ label: supplier.name, value: supplier.name }))}
                        value=""
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <FormInput label="Discount Rate" {...discountRate} icon={<FaDollarSign />} />
                        <FormSelect
                            label="Discount Type"
                            icon={<FaList />}
                            options={[
                                { label: 'Flat', value: 'flat' },
                                { label: 'Percentage', value: 'percentage' }
                            ]}
                            {...discountType}
                        />
                    </div>
                    <FormInput label="Payment Amount" {...paymentAmount} icon={<FaDollarSign />} />
                </div>

                <table className="min-w-full bg-white mt-4">
                    <thead>
                        <tr>
                            <th className="bg-[#5D5B10] py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">SL</th>
                            <th className="bg-[#5D5B10] py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Product</th>
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
                                <td className="py-2 px-4 border border-gray-200">{product.name}</td>
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
                        <FormInput label="Transport Fare" {...transportFare} icon={<FaDollarSign />} />
                        <FormInput label="VAT" value={vat} onChange={(e) => setVat(parseFloat(e.target.value))} icon={<FaDollarSign />} />
                    </div>

                    <table className="min-w-full bg-white mb-4">
                        <tbody>
                            <tr>
                                <td className="py-2 px-4 border border-gray-200 font-semibold">Total</td>
                                <td className="py-2 px-4 border border-gray-200">{billAmount}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border border-gray-200 font-semibold">VAT</td>
                                <td className="py-2 px-4 border border-gray-200">{vat}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border border-gray-200 font-semibold">Transport Fare</td>
                                <td className="py-2 px-4 border border-gray-200">{transportFare.value}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border border-gray-200 font-semibold">Discount</td>
                                <td className="py-2 px-4 border border-gray-200">
                                    {discountType.value === 'flat' ? discountRate.value : `${discountRate.value}%`}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border border-gray-200 font-semibold">Grand Total</td>
                                <td className="py-2 px-4 border border-gray-200">{grandTotal}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border border-gray-200 font-semibold">Payment</td>
                                <td className="py-2 px-4 border border-gray-200">{paymentAmount.value}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border border-gray-200 font-semibold">Total Due</td>
                                <td className="py-2 px-4 border border-gray-200">{dueAmount}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between">
                    <Button text="Cancel" bgColor="bg-red-500" textColor="text-white" />
                    <Button text="Save As Draft" bgColor="bg-[#5D5B10]" textColor="text-white" onClick={handleSaveAsDraft} />
                    <Button text="Add Purchase" bgColor="bg-[#5D5B10]" textColor="text-white" onClick={handleAddPurchase} />
                </div>
            </form>
        </div>
    );
};

export default AddNewPurchase;
