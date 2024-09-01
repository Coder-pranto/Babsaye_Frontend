// import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBirthdayCake, FaFlag, FaPray, FaRing, FaIdCard, FaTint, FaBuilding } from 'react-icons/fa';
// import { HiOutlineDocumentAdd } from 'react-icons/hi';
// import useFormInput from '../../../hooks/useFormInput';
// import FormInput from '../../../components/FormInputs/FormInput';
// import FormSelect from '../../../components/FormInputs/FormSelect';
// import FormFileInput from '../../../components/FormInputs/FormFileInput';

// const StaffCreate = () => {
//     const name = useFormInput('');
//     const email = useFormInput('');
//     const phoneNumber = useFormInput('');
//     const presentAddress = useFormInput('');
//     const permanentAddress = useFormInput('');
//     const dateOfBirth = useFormInput('');
//     const nationality = useFormInput('');
//     const religion = useFormInput('');
//     const maritalStatus = useFormInput('');
//     const nid = useFormInput('');
//     const designation = useFormInput('');
//     const bloodGroup = useFormInput('');
//     const gender = useFormInput('');
//     const educationalQualification = useFormInput('');
//     const experience = useFormInput('');
//     const staffId = useFormInput('');
//     const department = useFormInput('');
//     const image = useFormInput(null);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Handle form submission
//         console.log({
//           name: name.value,
//           email: email.value,
//           phoneNumber: phoneNumber.value,
//           presentAddress: presentAddress.value,
//           permanentAddress: permanentAddress.value,
//           dateOfBirth: dateOfBirth.value,
//           nationality: nationality.value,
//           religion: religion.value,
//           maritalStatus: maritalStatus.value,
//           nid: nid.value,
//           designation: designation.value,
//           bloodGroup: bloodGroup.value,
//           gender: gender.value,
//           educationalQualification: educationalQualification.value,
//           experience: experience.value,
//           staffId: staffId.value,
//           department: department.value,
//           image: image.value,
//       });
//     };

//     return (
//         <div className="bg-white rounded shadow-lg w-full max-w-6xl mx-auto mt-12">
//             <div className="h-16 flex justify-center items-center text-2xl font-bold bg-[#5D5B10] text-white"><span>Staff Create</span></div>
//             <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4 p-8">
//                 <FormInput label="Name" icon={<FaUser />} {...name} />
//                 <FormInput label="E-mail" icon={<FaEnvelope />} {...email} />
//                 <FormInput label="Phone Number" icon={<FaPhone />} {...phoneNumber} />
//                 <FormInput label="Present Address" icon={<FaMapMarkerAlt />} {...presentAddress} />
//                 <FormInput label="Permanent Address" icon={<FaMapMarkerAlt />} {...permanentAddress} />
//                 <FormInput label="Date Of Birth" icon={<FaBirthdayCake />} {...dateOfBirth} />
//                 <FormInput label="Nationality" icon={<FaFlag />} {...nationality} />
//                 <FormInput label="Religion" icon={<FaPray />} {...religion} />
//                 <FormInput label="Marital Status" icon={<FaRing />} {...maritalStatus} />
//                 <FormInput label="Nid" icon={<FaIdCard />} {...nid} />
//                 <FormInput label="Blood Group" icon={<FaTint />} {...bloodGroup} />
//                 <FormSelect label="Gender" icon={<FaUser />} {...gender} options={[
//                     { label: 'Male', value: 'male' },
//                     { label: 'Female', value: 'female' },
//                     { label: 'Other', value: 'other' },
//                 ]} />
//                 <FormInput label="Educational Qualification" icon={<FaBuilding />} {...educationalQualification} />
//                 <FormInput label="Experience" icon={<FaBuilding />} {...experience} />
//                 <FormInput label="Staff ID" icon={<FaIdCard />} {...staffId} />
//                 <FormInput label="Department" icon={<FaBuilding />} {...department} />
//                 <FormInput label="Designation" icon={<FaIdCard />} {...designation} />
//                 <FormFileInput label="Image" icon={<HiOutlineDocumentAdd />} {...image} />
//                 <button type="submit" className="col-span-3 bg-[#5D5B10] text-white py-2 mx-4 rounded">
//                     Staff Add
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default StaffCreate;


import { useEffect, useState } from 'react';
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBirthdayCake, FaFlag, FaPray, FaRing, FaIdCard, FaTint, FaBuilding } from 'react-icons/fa';
import { HiOutlineDocumentAdd } from 'react-icons/hi';
import useFormInput from '../../../hooks/useFormInput';
import FormInput from '../../../components/FormInputs/FormInput';
import FormSelect from '../../../components/FormInputs/FormSelect';
import FormFileInput from '../../../components/FormInputs/FormFileInput';
import { fetchDepartments, fetchDesignations, addStaff } from '../../../services/api'; 
import { toast } from 'react-toastify';
import useFormFileInput from '../../../hooks/useFormFileInput';

const StaffCreate = () => {
    const [departments, setDepartments] = useState([]);
    const [designations, setDesignations] = useState([]);

    const name = useFormInput('');
    const email = useFormInput('');
    const phoneNumber = useFormInput('');
    const presentAddress = useFormInput('');
    const permanentAddress = useFormInput('');
    const dateOfBirth = useFormInput('');
    const nationality = useFormInput('');
    const religion = useFormInput('');
    const maritalStatus = useFormInput('');
    const nid = useFormInput('');
    const bloodGroup = useFormInput('');
    const gender = useFormInput('');
    const educationalQualification = useFormInput('');
    const experience = useFormInput('');
    const staffId = useFormInput('');
    const department = useFormInput('');
    const designation = useFormInput('');
    const image = useFormFileInput("");

    useEffect(() => {
        // Fetch departments when the component mounts
        const fetchDropdownData = async () => {
            try {
                const departmentData = await fetchDepartments();
                setDepartments(departmentData.data);
            } catch (error) {
                console.error('Failed to fetch departments:', error);
            }
        };

        fetchDropdownData();
    }, []);

    useEffect(() => {
        // Fetch designations based on the selected department
        const fetchDesignationsByDepartment = async () => {
            if (!department.value) return; // Exit if no department is selected

            try {
                const designationData = await fetchDesignations(department.value);
                setDesignations(designationData.data);
            } catch (error) {
                console.error('Failed to fetch designations:', error);
            }
        };

        fetchDesignationsByDepartment();
    }, [department.value]); // Re-run when department changes
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name.value);
        formData.append('email', email.value);
        formData.append('phone', phoneNumber.value);
        formData.append('present_address', presentAddress.value);
        formData.append('permanent_address', permanentAddress.value);
        formData.append('date_of_birth', dateOfBirth.value);
        formData.append('nationality', nationality.value);
        formData.append('religion', religion.value);
        formData.append('marital_status', maritalStatus.value);
        formData.append('nid', nid.value);
        formData.append('blood_group', bloodGroup.value);
        formData.append('gender', gender.value);
        formData.append('educational_qualification', educationalQualification.value);
        formData.append('experience', experience.value);
        formData.append('staff_id', staffId.value);
        formData.append('department', department.value);
        formData.append('designation', designation.value);
    
        if (image.file) {
            formData.append('image', image.file);
        }
        
    
        try {
            // Use the FormData object in the API call
            await addStaff(formData); 
            console.log('Staff added successfully');
            toast.success('Staff added successfully');
        } catch (error) {
            console.error('Failed to add staff:', error.message);
            toast.error(`Failed to add staff.`);
        }
    };
    
    return (
        <div className="bg-white rounded shadow-lg w-full max-w-6xl mx-auto mt-12">
            <div className="h-16 flex justify-center items-center text-2xl font-bold bg-[#5D5B10] text-white"><span>Staff Create</span></div>
            <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4 p-8">
                <FormInput label="Name" icon={<FaUser />} {...name} />
                <FormInput label="E-mail" icon={<FaEnvelope />} {...email} />
                <FormInput label="Phone Number" icon={<FaPhone />} {...phoneNumber} />
                <FormInput label="Present Address" icon={<FaMapMarkerAlt />} {...presentAddress} />
                <FormInput label="Permanent Address" icon={<FaMapMarkerAlt />} {...permanentAddress} />
                <FormInput label="Date Of Birth" icon={<FaBirthdayCake />} {...dateOfBirth} />
                <FormInput label="Nationality" icon={<FaFlag />} {...nationality} />
                <FormInput label="Religion" icon={<FaPray />} {...religion} />
                <FormInput label="Marital Status" icon={<FaRing />} {...maritalStatus} />
                <FormInput label="Nid" icon={<FaIdCard />} {...nid} />
                <FormInput label="Blood Group" icon={<FaTint />} {...bloodGroup} />
                <FormSelect label="Gender" icon={<FaUser />} {...gender} options={[
                    { label: 'Male', value: 'Male' },
                    { label: 'Female', value: 'Female' },
                    { label: 'Other', value: 'Other' },
                ]} />
                <FormInput label="Educational Qualification" icon={<FaBuilding />} {...educationalQualification} />
                <FormInput label="Experience" icon={<FaBuilding />} {...experience} />
                <FormInput label="Staff ID" icon={<FaIdCard />} {...staffId} />
                <FormSelect label="Department" icon={<FaBuilding />} {...department} options={departments.map(dept => ({ label: dept.name, value: dept._id }))} />
                <FormSelect label="Designation" icon={<FaIdCard />} {...designation} options={designations.map(desig => ({ label: desig.title, value: desig._id }))} />
                <FormFileInput label="Image" icon={<HiOutlineDocumentAdd />} {...image} />
                <button type="submit" className="col-span-3 bg-[#5D5B10] text-white py-2 mx-4 rounded">
                    Staff Add
                </button>
            </form>
        </div>
    );
};

export default StaffCreate;

