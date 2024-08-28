import { useState, useEffect } from 'react';
import { FaUser, FaPhone, FaBuilding, FaEnvelope } from 'react-icons/fa';
import { HiOutlineDocumentAdd } from 'react-icons/hi';
import useFormInput from '../../../hooks/useFormInput';
import FormInput from '../../../components/FormInputs/FormInput';
import FormSelect from '../../../components/FormInputs/FormSelect';
import FormFileInput from '../../../components/FormInputs/FormFileInput';
import { addClient, fetchClientGroups } from '../../../services/api';
import useFormFileInput from '../../../hooks/useFormFileInput';
import { toast } from 'react-toastify';
import { generateCustomId } from '../../../utils/CustomIDCreator';


const ClientAdd = () => {
    const [idNo, setIdNo] = useState(''); 
    const clientName = useFormInput('');
    const email = useFormInput('', 'email');
    const phoneNumber = useFormInput('');
    const address = useFormInput('');
    const previousDue = useFormInput('');
    const companyName = useFormInput(''); // New state for companyName
    const reference = useFormInput(''); // New state for reference
    const clientGroup = useFormInput('');
    const active = useFormInput('active');
    const { file: imageFile, onChange: handleFileChange } = useFormFileInput();

    const [clientGroups, setClientGroups] = useState([]);

    useEffect(() => {
        // Generate a unique ID when the component mounts
        setIdNo(generateCustomId('CLT-'));

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
        formData.append('idNo', idNo); 
        formData.append('name', clientName.value);
        formData.append('phoneNumber', phoneNumber.value);
        formData.append('email', email.value);
        formData.append('address', address.value);
        formData.append('previousDue', previousDue.value);
        formData.append('companyName', companyName.value); // Include companyName
        formData.append('reference', reference.value); // Include reference
        formData.append('clientGroup', clientGroup.value);
        formData.append('status', active.value);
        if (imageFile) formData.append('image', imageFile);

        try {
            const response = await addClient(formData);
            console.log('Client added successfully:', response.data);
            toast.success('Client created successfully', {
                position: "top-right",
                autoClose: 5000,
            });
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
                <FormInput
                    label="ID No"
                    icon={<FaUser />}
                    value={idNo} // Display the generated ID
                    readOnly // Make the field read-only
                />
                <FormInput label="Client Name" icon={<FaUser />} {...clientName} />
                <FormInput label="Phone Number" icon={<FaPhone />} {...phoneNumber} />
                <FormInput label="Email" icon={<FaEnvelope />} {...email} />
                <FormInput label="Address" icon={<FaBuilding />} {...address} />
                <FormInput label="Previous Due" icon={<FaBuilding />} {...previousDue} />
                <FormInput label="Company Name" icon={<FaBuilding />} {...companyName} /> {/* New companyName input */}
                <FormInput label="Reference" icon={<FaUser />} {...reference} /> {/* New reference input */}
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
