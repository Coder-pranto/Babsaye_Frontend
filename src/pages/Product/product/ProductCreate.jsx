
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
import { toast } from 'react-toastify';

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

                setUnits(unitData.data.map(unit => ({ label: unit.unitName, value: unit._id })));
                setColors(colorData.data.map(color => ({ label: color.colorName, value: color._id })));
                setBrands(brandData.data.map(brand => ({ label: brand.brandName, value: brand._id })));
                setSizes(sizeData.data.map(size => ({ label: size.sizeName, value: size._id })));
                setGroups(groupData.data.map(group => ({ label: group.groupName, value: group._id })));
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
           const {data} =  await addProduct(formData);
           if(data) console.log(data);
            toast.success('Product added successfully');
        } catch (error) {
            toast.error('Error adding product:', error);
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

