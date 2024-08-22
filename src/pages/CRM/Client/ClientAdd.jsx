import { useState, useEffect } from 'react';
import { FaUser, FaPhone, FaBuilding, FaEnvelope } from 'react-icons/fa';
import { HiOutlineDocumentAdd } from 'react-icons/hi';
import useFormInput from '../../../hooks/useFormInput';
import FormInput from '../../../components/FormInputs/FormInput';
import FormSelect from '../../../components/FormInputs/FormSelect';
import FormFileInput from '../../../components/FormInputs/FormFileInput';
import { addClient, fetchClientGroups } from '../../../services/api'; // Adjust the path as needed
import useFormFileInput from '../../../hooks/useFormFileInput';
import { toast } from 'react-toastify';

const ClientAdd = () => {
    const idNo = useFormInput('');
    const clientName = useFormInput('');
    const email = useFormInput('', 'email');
    const phoneNumber = useFormInput('');
    const address = useFormInput('');
    const previousDue = useFormInput('');
    const clientGroup = useFormInput('');
    const active = useFormInput('active');
    const { file: imageFile, onChange: handleFileChange } = useFormFileInput();

    const [clientGroups, setClientGroups] = useState([]);

    // Fetch client groups data when the component mounts
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const res = await fetchClientGroups();
                setClientGroups(res.data.data.map(group => ({
                    label: group.name,
                    value: group._id
                })));
                
            } catch (error) {
                console.error('Failed to fetch client groups:', error.message);
            }
        };

        fetchGroups();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('idNo', idNo.value);
        formData.append('name', clientName.value);
        formData.append('phoneNumber', phoneNumber.value);
        formData.append('email', email.value);
        formData.append('address', address.value);
        formData.append('previousDue', previousDue.value);
        formData.append('clientGroup', clientGroup.value);
        formData.append('status', active.value);
        if (imageFile) formData.append('image', imageFile);

        try {
            const response = await addClient(formData);
            console.log('Client added successfully:', response.data);
            toast.success('Client create successfully', {
                position: "top-right",
                autoClose: 5000,
                });
            // Optionally, reset the form or provide user feedback here
        } catch (error) {
            console.error('Failed to add client:', error.message);
            toast.error('Failed to add client', {
                position: "top-right",
                autoClose: 5000,
                });
        }
    };

    return (
        <div className="bg-white rounded shadow-lg w-full max-w-6xl mx-auto mt-12">
            <div className="h-16 flex justify-center items-center text-2xl font-bold bg-[#5D5B10] text-white">
                <span>Client Create</span>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4 p-8">
                <FormInput label="ID No" icon={<FaUser />} {...idNo} />
                <FormInput label="Client Name" icon={<FaUser />} {...clientName} />
                <FormInput label="Phone Number" icon={<FaPhone />} {...phoneNumber} />
                <FormInput label="Email" icon={<FaEnvelope />} {...email} />
                <FormInput label="Address" icon={<FaBuilding />} {...address} />
                <FormInput label="Previous Due" icon={<FaBuilding />} {...previousDue} />
                <FormSelect 
                    label="Select Client Group" 
                    icon={<FaBuilding />} 
                    {...clientGroup} 
                    options={clientGroups}
                />
                <FormFileInput 
                    label="Browse" 
                    icon={<HiOutlineDocumentAdd />} 
                    onChange={handleFileChange}
                />
                <FormSelect
                    label="Status"
                    icon={<FaUser />}
                    {...active}
                    options={[
                        { label: 'Active', value: 'active' },
                        { label: 'Inactive', value: 'inactive' },
                    ]}
                />
                <button type="submit" className="col-span-3 bg-[#5D5B10] text-white py-2 mx-4 rounded">
                    Client Add
                </button>
            </form>
        </div>
    );
};

export default ClientAdd;






