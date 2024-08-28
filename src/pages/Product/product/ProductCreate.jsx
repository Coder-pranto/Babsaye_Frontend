// import { FaDollarSign, FaList, FaBook, FaCube, FaBoxes } from 'react-icons/fa';
// import { GiWeight } from 'react-icons/gi';
// import useFormInput from '../../../hooks/useFormInput';
// import useFormFileInput from '../../../hooks/useFormFileInput';
// import FormInput from '../../../components/FormInputs/FormInput';
// import FormFileInput from '../../../components/FormInputs/FormFileInput';
// import Button from '../../../components/Button';
// import FormSelect from '../../../components/FormInputs/FormSelect';
// import { Link } from 'react-router-dom';

// const ProductCreate = () => {
//     const productName = useFormInput('');
//     const buyingPrice = useFormInput('', 'number');
//     const sellingPrice = useFormInput('', 'number');
//     const productGroup = useFormInput('');
//     const unit = useFormInput('');
//     const description = useFormInput('');
//     const productColor = useFormInput('');
//     const productBrand = useFormInput('');
//     const productSize = useFormInput('');
//     const openingStock = useFormInput('', 'number');
//     const carton = useFormInput('', 'number');
//     const stockWarningQuantity = useFormInput('', 'number');
//     const productImage = useFormFileInput();

//     const productGroups = [
//         { label: 'Group 1', value: 'group1' },
//         { label: 'Group 2', value: 'group2' },
//         // Add more groups as needed
//     ];

//     const units = [
//         { label: 'Unit 1', value: 'unit1' },
//         { label: 'Unit 2', value: 'unit2' },
//         // Add more units as needed
//     ];

//     const colors = [
//         { label: 'Red', value: 'red' },
//         { label: 'Blue', value: 'blue' },
//         // Add more colors as needed
//     ];

//     const brands = [
//         { label: 'Brand 1', value: 'brand1' },
//         { label: 'Brand 2', value: 'brand2' },
//         // Add more brands as needed
//     ];

//     const sizes = [
//         { label: 'Small', value: 'small' },
//         { label: 'Medium', value: 'medium' },
//         { label: 'Large', value: 'large' },
//         // Add more sizes as needed
//     ];

//     const handleSaveProduct = (e) => {
//         e.preventDefault(); // Prevent the default form submission behavior
        
//         // Create an object with the form data
//         const productData = {
//             productName: productName.value,
//             buyingPrice: buyingPrice.value,
//             sellingPrice: sellingPrice.value,
//             unit: unit.value,
//             productGroup: productGroup.value,
//             description: description.value,
//             productColor: productColor.value,
//             productBrand: productBrand.value,
//             productSize: productSize.value,
//             openingStock: openingStock.value,
//             carton: carton.value,
//             stockWarningQuantity: stockWarningQuantity.value,
//             productImage: productImage.file, // This will log the File object
//         };
    
//         // Log the product data to the console
//         console.log('Product Data:', productData);
//     };
    

//     const handleCancel = () => {
//         // Cancel logic
//     };

//     return (
//         <div className="bg-white rounded-lg shadow-lg w-[90%] mx-auto mt-16">
//             <div className="rounded-t-lg h-16 flex justify-center items-center text-2xl font-bold bg-[#5D5B10] text-white">
//                 <Link to='/product_create'>Add Product</Link>
//             </div>
//             <form className="p-8">
//                 <div className="grid grid-cols-2 gap-4">
//                     <FormInput label="Product Name" {...productName} icon={<FaBook />} />
//                     <FormFileInput label="Product Image" {...productImage} icon={<FaList />} />
//                     <FormInput label="Description" {...description} icon={<FaBook />} />
//                     <FormInput label="Buying Price" {...buyingPrice} icon={<FaDollarSign />} />
//                     <FormInput label="Selling Price" {...sellingPrice} icon={<FaDollarSign />} />
//                     <FormSelect
//                         label="Select Unit"
//                         icon={<FaList />}
//                         options={units}
//                         value={unit.value}
//                         onChange={unit.onChange}
//                     />
//                     <FormSelect
//                         label="Select Product Color"
//                         icon={<FaList />}
//                         options={colors}
//                         value={productColor.value}
//                         onChange={productColor.onChange}
//                     />
//                     <FormSelect
//                         label="Select Product Brand"
//                         icon={<FaList />}
//                         options={brands}
//                         value={productBrand.value}
//                         onChange={productBrand.onChange}
//                     />
//                     <FormSelect
//                         label="Select Product Size"
//                         icon={<FaCube />}
//                         options={sizes}
//                         value={productSize.value}
//                         onChange={productSize.onChange}
//                     />
//                     <FormInput label="Opening Stock" {...openingStock} icon={<GiWeight />} />
//                     <FormInput label="Carton" {...carton} icon={<FaBoxes />} />
//                     <FormInput label="Stock Warning Quantity" {...stockWarningQuantity} icon={<FaList />} />
//                     <FormSelect
//                         label="Select Product Group"
//                         icon={<FaList />}
//                         options={productGroups}
//                         value={productGroup.value}
//                         onChange={productGroup.onChange}
//                     />
//                 </div>

//                 <div className="flex justify-between mt-4">
//                     <Button text="Cancel" bgColor="bg-red-500" textColor="text-white" onClick={handleCancel} />
//                     <Button text="Save Product" bgColor="bg-[#5D5B10]" textColor="text-white" onClick={handleSaveProduct} />
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default ProductCreate;


import { useState, useEffect } from 'react';
import { FaDollarSign, FaList, FaBook, FaCube, FaBoxes } from 'react-icons/fa';
import { GiWeight } from 'react-icons/gi';
import useFormInput from '../../../hooks/useFormInput';
import useFormFileInput from '../../../hooks/useFormFileInput';
import FormInput from '../../../components/FormInputs/FormInput';
import FormFileInput from '../../../components/FormInputs/FormFileInput';
import Button from '../../../components/Button';
import FormSelect from '../../../components/FormInputs/FormSelect';
import { Link } from 'react-router-dom';
import { 
  fetchUnits, 
  fetchColors, 
  fetchBrands, 
  fetchSizes, 
  fetchGroups, 
  addProduct 
} from '../../../services/api';

const ProductCreate = () => {
    const productName = useFormInput('');
    const buyingPrice = useFormInput('', 'number');
    const sellingPrice = useFormInput('', 'number');
    const productGroup = useFormInput('');
    const unit = useFormInput('');
    const description = useFormInput('');
    const productColor = useFormInput('');
    const productBrand = useFormInput('');
    const productSize = useFormInput('');
    const openingStock = useFormInput('', 'number');
    const carton = useFormInput('', 'number');
    const stockWarningQuantity = useFormInput('', 'number');
    const productImage = useFormFileInput();

    const [units, setUnits] = useState([]);
    const [colors, setColors] = useState([]);
    const [brands, setBrands] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [unitData, colorData, brandData, sizeData, groupData] = await Promise.all([
                    fetchUnits(),
                    fetchColors(),
                    fetchBrands(),
                    fetchSizes(),
                    fetchGroups()
                ]);
                setUnits(unitData.data);
                setColors(colorData.data);
                setBrands(brandData.data);
                setSizes(sizeData.data);
                setGroups(groupData.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSaveProduct = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('productName', productName.value);
        formData.append('buyingPrice', buyingPrice.value);
        formData.append('sellingPrice', sellingPrice.value);
        formData.append('unit', unit.value);
        formData.append('productGroup', productGroup.value);
        formData.append('description', description.value);
        formData.append('productColor', productColor.value);
        formData.append('productBrand', productBrand.value);
        formData.append('productSize', productSize.value);
        formData.append('openingStock', openingStock.value);
        formData.append('carton', carton.value);
        formData.append('stockWarningQuantity', stockWarningQuantity.value);
        if (productImage.file) {
            formData.append('productImage', productImage.file);
        }
        
        try {
            await addProduct(formData);
            // Handle successful product creation (e.g., redirect or show a success message)
            console.log('Product added successfully');
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleCancel = () => {
        // Implement cancel logic (e.g., redirect or reset form)
    };

    return (
        <div className="bg-white rounded-lg shadow-lg w-[90%] mx-auto mt-16">
            <div className="rounded-t-lg h-16 flex justify-center items-center text-2xl font-bold bg-[#5D5B10] text-white">
                <Link to='/product_create'>Add Product</Link>
            </div>
            <form className="p-8">
                <div className="grid grid-cols-2 gap-4">
                    <FormInput label="Product Name" {...productName} icon={<FaBook />} />
                    <FormFileInput label="Product Image" {...productImage} icon={<FaList />} />
                    <FormInput label="Description" {...description} icon={<FaBook />} />
                    <FormInput label="Buying Price" {...buyingPrice} icon={<FaDollarSign />} />
                    <FormInput label="Selling Price" {...sellingPrice} icon={<FaDollarSign />} />
                    <FormSelect
                        label="Select Unit"
                        icon={<FaList />}
                        options={units}
                        value={unit.value}
                        onChange={unit.onChange}
                    />
                    <FormSelect
                        label="Select Product Color"
                        icon={<FaList />}
                        options={colors}
                        value={productColor.value}
                        onChange={productColor.onChange}
                    />
                    <FormSelect
                        label="Select Product Brand"
                        icon={<FaList />}
                        options={brands}
                        value={productBrand.value}
                        onChange={productBrand.onChange}
                    />
                    <FormSelect
                        label="Select Product Size"
                        icon={<FaCube />}
                        options={sizes}
                        value={productSize.value}
                        onChange={productSize.onChange}
                    />
                    <FormInput label="Opening Stock" {...openingStock} icon={<GiWeight />} />
                    <FormInput label="Carton" {...carton} icon={<FaBoxes />} />
                    <FormInput label="Stock Warning Quantity" {...stockWarningQuantity} icon={<FaList />} />
                    <FormSelect
                        label="Select Product Group"
                        icon={<FaList />}
                        options={groups}
                        value={productGroup.value}
                        onChange={productGroup.onChange}
                    />
                </div>

                <div className="flex justify-between mt-4">
                    <Button text="Cancel" bgColor="bg-red-500" textColor="text-white" onClick={handleCancel} />
                    <Button text="Save Product" bgColor="bg-[#5D5B10]" textColor="text-white" onClick={handleSaveProduct} />
                </div>
            </form>
        </div>
    );
};

export default ProductCreate;

