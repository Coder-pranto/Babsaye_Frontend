import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBirthdayCake, FaFlag, FaPray, FaRing, FaIdCard, FaTint, FaBuilding } from 'react-icons/fa';
import { HiOutlineDocumentAdd } from 'react-icons/hi';
import useFormInput from '../../../hooks/useFormInput';
import FormInput from '../../../components/FormInputs/FormInput';
import FormSelect from '../../../components/FormInputs/FormSelect';
import FormFileInput from '../../../components/FormInputs/FormFileInput';

const StaffCreate = () => {
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
    const designation = useFormInput('');
    const bloodGroup = useFormInput('');
    const gender = useFormInput('');
    const educationalQualification = useFormInput('');
    const experience = useFormInput('');
    const staffId = useFormInput('');
    const department = useFormInput('');
    const image = useFormInput(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log({
          name: name.value,
          email: email.value,
          phoneNumber: phoneNumber.value,
          presentAddress: presentAddress.value,
          permanentAddress: permanentAddress.value,
          dateOfBirth: dateOfBirth.value,
          nationality: nationality.value,
          religion: religion.value,
          maritalStatus: maritalStatus.value,
          nid: nid.value,
          designation: designation.value,
          bloodGroup: bloodGroup.value,
          gender: gender.value,
          educationalQualification: educationalQualification.value,
          experience: experience.value,
          staffId: staffId.value,
          department: department.value,
          image: image.value,
      });
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
                    { label: 'Male', value: 'male' },
                    { label: 'Female', value: 'female' },
                    { label: 'Other', value: 'other' },
                ]} />
                <FormInput label="Educational Qualification" icon={<FaBuilding />} {...educationalQualification} />
                <FormInput label="Experience" icon={<FaBuilding />} {...experience} />
                <FormInput label="Staff ID" icon={<FaIdCard />} {...staffId} />
                <FormInput label="Department" icon={<FaBuilding />} {...department} />
                <FormInput label="Designation" icon={<FaIdCard />} {...designation} />
                <FormFileInput label="Image" icon={<HiOutlineDocumentAdd />} {...image} />
                <button type="submit" className="col-span-3 bg-[#5D5B10] text-white py-2 mx-4 rounded">
                    Staff Add
                </button>
            </form>
        </div>
    );
};

export default StaffCreate;
