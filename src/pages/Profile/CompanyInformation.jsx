
import { FaBuilding, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const CompanyInformation = () => {
  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-lg max-w-4xl mx-auto mt-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Company Information</h2>
        <p className="text-gray-600 mt-2">
          {`Detailed information about the company's identity, location, and contact.`}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex items-center bg-white p-6 rounded-lg shadow-md">
          <FaBuilding className="text-4xl text-[#5D5B10] mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Company Name</h3>
            <p className="text-gray-600">DeshIT-bd Ltd.</p>
          </div>
        </div>

        <div className="flex items-center bg-white p-6 rounded-lg shadow-md">
          <FaMapMarkerAlt className="text-4xl text-[#5D5B10] mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Location</h3>
            <p className="text-gray-600">Dhaka, Bangladesh</p>
          </div>
        </div>

        <div className="flex items-center bg-white p-6 rounded-lg shadow-md">
          <FaPhone className="text-4xl text-[#5D5B10] mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Phone Number</h3>
            <p className="text-gray-600">+880 1234 567890</p>
          </div>
        </div>

        <div className="flex items-center bg-white p-6 rounded-lg shadow-md">
          <FaEnvelope className="text-4xl text-[#5D5B10] mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Email</h3>
            <p className="text-gray-600">info@deshit-bd.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInformation;
