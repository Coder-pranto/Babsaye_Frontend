import { useState, useEffect } from 'react';
import { FaUser, FaPhone, FaBuilding, FaEnvelope, FaGlobe, FaFileAlt } from 'react-icons/fa';
import { HiOutlineDocumentAdd } from 'react-icons/hi';
import useFormInput from '../../../hooks/useFormInput';
import useFormFileInput from '../../../hooks/useFormFileInput';
import FormInput from '../../../components/FormInputs/FormInput';
import FormSelect from '../../../components/FormInputs/FormSelect';
import FormFileInput from '../../../components/FormInputs/FormFileInput';
import { addSupplier, fetchSupplierGroups } from '../../../services/api';
import { toast } from 'react-toastify';

const SupplierAdd = () => {
    const supplierName = useFormInput('');
    const companyName = useFormInput('');
    const phone = useFormInput('');
    const phoneNumberOptional = useFormInput('');
    const email = useFormInput('', 'email');
    const address = useFormInput('');
    const city = useFormInput('');
    const previousDue = useFormInput('');
    const zipCode = useFormInput('');
    const country = useFormInput('Bangladesh');
    const domain = useFormInput('');
    const bankAccount = useFormInput('');
    const group = useFormInput('');
    const status = useFormInput('Active');
    const { file: fileInput, onChange: handleFileChange } = useFormFileInput();

    const [supplierGroups, setSupplierGroups] = useState([]);

    // Fetch supplier groups data when the component mounts
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const res = await fetchSupplierGroups();
                console.log(res.data);
                setSupplierGroups(res.data.map(group => ({
                    label: group.groupName,
                    value: group._id
                })));
            } catch (error) {
                console.error('Failed to fetch supplier groups:', error.message);
            }
        };

        fetchGroups();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('supplierName', supplierName.value);
        formData.append('companyName', companyName.value);
        formData.append('phone', phone.value);
        formData.append('phoneNumberOptional', phoneNumberOptional.value);
        formData.append('email', email.value);
        formData.append('address', address.value);
        formData.append('city', city.value);
        formData.append('previousDue', previousDue.value);
        formData.append('zipCode', zipCode.value);
        formData.append('country', country.value);
        formData.append('domain', domain.value);
        formData.append('bankAccount', bankAccount.value);
        formData.append('group', group.value);
        formData.append('status', status.value);
        if (fileInput) formData.append('file', fileInput);

        try {
            const response = await addSupplier(formData);
            console.log('Supplier added successfully:', response.data);
            toast.success('Supplier created successfully', {
                position: "top-right",
                autoClose: 5000,
            });
            // Optionally, reset the form or provide user feedback here
        } catch (error) {
            console.error('Failed to add supplier:', error.message);
            toast.error('Failed to add supplier', {
                position: "top-right",
                autoClose: 5000,
            });
        }
    };

    return (
        <div className="bg-white rounded shadow-lg w-full max-w-6xl mx-auto mt-12">
            <div className="h-16 flex justify-center items-center text-2xl font-bold bg-[#5D5B10] text-white">
                <span>Supplier Create</span>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4 p-8">
                <FormInput label="Supplier Name" icon={<FaUser />} {...supplierName} />
                <FormInput label="Company Name" icon={<FaBuilding />} {...companyName} />
                <FormInput label="Phone" icon={<FaPhone />} {...phone} />
                <FormInput label="Phone Number (Optional)" icon={<FaPhone />} {...phoneNumberOptional} />
                <FormInput label="Email" icon={<FaEnvelope />} {...email} />
                <FormInput label="Address" icon={<FaBuilding />} {...address} />
                <FormInput label="City" icon={<FaBuilding />} {...city} />
                <FormInput label="Previous Due" icon={<FaFileAlt />} {...previousDue} />
                <FormInput label="Zip Code" icon={<FaBuilding />} {...zipCode} />
                <FormSelect label="Country" icon={<FaGlobe />} {...country} options={[
                    { label: 'Bangladesh', value: 'Bangladesh' },
                    { label: 'India', value: 'India' },
                    { label: 'USA', value: 'USA' },
                    // Add more countries as needed
                ]} />
                <FormInput label="Domain" icon={<FaGlobe />} {...domain} />
                <FormInput label="Bank Account" icon={<FaFileAlt />} {...bankAccount} />
                <FormSelect label="Select a Group" icon={<FaBuilding />} {...group} options={supplierGroups} />
                <FormFileInput label="Browse" icon={<HiOutlineDocumentAdd />} onChange={handleFileChange} />
                <FormSelect label="Status" icon={<FaUser />} {...status} options={[
                    { label: 'Active', value: 'active' },
                    { label: 'Inactive', value: 'inactive' },
                ]} />
                <button type="submit" className="col-span-3 bg-[#5D5B10] text-white py-2 mx-4 rounded">
                    Add Supplier
                </button>
            </form>
        </div>
    );
};

export default SupplierAdd;

