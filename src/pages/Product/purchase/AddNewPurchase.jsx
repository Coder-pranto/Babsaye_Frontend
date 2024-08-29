import { useState, useEffect } from 'react';
import { FaDollarSign, FaTrashAlt, FaList } from 'react-icons/fa';
import { SlCalender } from 'react-icons/sl';
import useFormInput from '../../../hooks/useFormInput';
import FormInput from '../../../components/FormInputs/FormInput';
import Button from '../../../components/Button';
import FormSelect from '../../../components/FormInputs/FormSelect';

import { addPurchase, fetchProducts } from '../../../services/api';
import { fetchSuppliers } from '../../../services/api';
import { toast } from 'react-toastify';
import { generateCustomId  } from '../../../utils/CustomIDCreator';




const AddNewPurchase = () => {
    const [invoiceId, setInvoiceId] = useState("");
    const date = useFormInput('', 'date');
    const discountRate = useFormInput(0, 'number');
    const discountType = useFormInput('flat');
    const paymentAmount = useFormInput(0, 'number');
    const transportFare = useFormInput(0, 'number');
    const [products, setProducts] = useState([]);
    const [productOptions, setProductOptions] = useState([]);
    const [supplierOptions, setSupplierOptions] = useState([]);

    const [selectedProduct, setSelectedProduct] = useState("");
    const [selectedSupplier, setSelectedSupplier] = useState("");

    const [billAmount, setBillAmount] = useState(0);
    const [vat, setVat] = useState(12);
    const [grandTotal, setGrandTotal] = useState(0);
    const [dueAmount, setDueAmount] = useState(0);


    const fetchFunc = async () => {
        try {
            const [productResponse, supplierResponse] = await Promise.all([
                fetchProducts(),
                fetchSuppliers()
            ]);

            const productOptions = productResponse.data.map(product => ({
                id: product._id,
                name: product.productName,
                price: product.buyingPrice,
                stock: product.openingStock
            }));

            const supplierOptions = supplierResponse.data.map(supplier => ({
                id: supplier._id,
                name: supplier.supplierName
            }));

            return { productOptions, supplierOptions };
        } catch (error) {
            console.error('Failed to fetch products or suppliers:', error.message);
        }
    };

    useEffect(() => {
        setInvoiceId(generateCustomId('INVOICE-333'));
        const fetchData = async () => {
            const { productOptions, supplierOptions } = await fetchFunc();
            setProductOptions(productOptions);
            setSupplierOptions(supplierOptions);
        };
        fetchData();
    }, []);



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


    const handleAddPurchase = async (e) => {
        e.preventDefault(); 

        const purchaseData = {
            invoiceId: invoiceId,
            date: date.value,
            supplier: supplierOptions.find((s) => s.supplierName === supplierOptions.value)?.id,
            products: products.map(product => ({
                product: product.id,
                quantity: product.quantity,
                price: product.price,
            })),
            discountRate: discountRate.value,
            discountType: discountType.value,
            paymentAmount: paymentAmount.value,
            transportFare: transportFare.value,
            vat,
            grandTotal,
            dueAmount,
        };
        console.log(purchaseData);
        try {
            const response = await addPurchase(purchaseData);
            console.log(response.data);
            toast.success('Purchase created successfully');
        } catch (error) {
            console.error('Failed to add purchase:', error.message);
            toast.error('Failed to add purchase. Please try again.');
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl mx-auto mt-12">
            <div className="rounded-t-lg h-16 flex justify-center items-center text-2xl font-bold bg-[#5D5B10] text-white">
                <span>Add New Purchase</span>
            </div>
            <form className="p-8">
                <div className="grid grid-cols-2 gap-4">
                    <FormInput label="Invoice ID No" value={invoiceId} readOnly icon={<FaDollarSign />} />
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
                                <td className="py-2 px-4 border border-gray-200 font-semibold">Grand Total</td>
                                <td className="py-2 px-4 border border-gray-200">{grandTotal}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border border-gray-200 font-semibold">Due</td>
                                <td className="py-2 px-4 border border-gray-200">{dueAmount}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end mt-4">
                    <Button
                        text="Add Purchase"
                        onClick={handleAddPurchase}
                        bgColor="bg-blue-500 hover:bg-blue-700"
                        textColor="text-white"
                        icon={<FaDollarSign />}
                    />

                </div>
            </form>
        </div>
    );
};

export default AddNewPurchase;






