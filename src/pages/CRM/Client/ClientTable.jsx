// import { useState } from 'react';
// import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
// import { GiReceiveMoney } from 'react-icons/gi';
// import { RiArrowDownSFill } from 'react-icons/ri';
// import Modal from './Modal';
// import moment from 'moment';
// import { BASE_URL } from '../../../services/api';

// const ClientTable = ({ clients }) => {
//   const [dropdownVisible, setDropdownVisible] = useState(null);
//   const [selectedClient, setSelectedClient] = useState(null);

//   console.log('Clients:', clients);
//   console.log('Dropdown Visible:', dropdownVisible);
//   console.log('Selected Client:', selectedClient);

//   const handleDropdownToggle = (id) => {
//     setDropdownVisible(dropdownVisible === id ? null : id);
//     console.log('Toggled Dropdown for ID:', id);
//   };

//   const handleViewClick = (client) => {
//     setSelectedClient(client);
//     console.log('Selected Client for Modal:', client);
//   };

//   const handleCloseModal = () => {
//     setSelectedClient(null);
//     console.log('Modal Closed');
//   };

//   return (
//     <div>
//       <table className="min-w-full bg-white border border-gray-300">
//         <thead>
//           <tr className="w-full bg-gray-200">
//             <th className="py-2 px-4 border border-gray-300">ID NO</th>
//             <th className="py-2 px-4 border border-gray-300">IMAGE</th>
//             <th className="py-2 px-4 border border-gray-300">CLIENT DETAILS</th>
//             <th className="py-2 px-4 border border-gray-300">DETAILS</th>
//             <th className="py-2 px-4 border border-gray-300">ACTION</th>
//           </tr>
//         </thead>
//         <tbody>
//           {clients.map((client, idx) => (
//             <tr key={client.idNo || idx} className="w-full">
//               <td className="py-2 px-4 border border-gray-300">{client.idNo}</td>
//               <td className="py-2 px-4 border border-gray-300">
//                 <img src={`${BASE_URL}/${client.image}`} alt="Client" className="w-24 h-24 mx-auto border-2 border-slate-300 rounded-full" />
//               </td>
//               <td className="py-2 px-4 border border-gray-300">
//                 <div><strong>Name:</strong> {client.name}</div>
//                 <div><strong>Phone:</strong> {client.phoneNumber}</div>
//                 <div><strong>Address:</strong> {client.address}</div>
//                 <div><strong>Created At:</strong> {moment(client.createdAt).format('YYYY-MM-DD HH:mm:ss')}</div>
//               </td>
//               <td className="py-2 px-4 border border-gray-300">
//                 <table className="min-w-full border border-gray-300">
//                   <tbody>
//                     <tr>
//                       <td className="py-1 px-2 border border-gray-300"><strong>Previous Due:</strong></td>
//                       <td className="py-1 px-2 border border-gray-300">{client.previousDue}</td>
//                     </tr>
//                     <tr>
//                       <td className="py-1 px-2 border border-gray-300"><strong>Bill:</strong></td>
//                       <td className="py-1 px-2 border border-gray-300">{client.bill}</td>
//                     </tr>
//                     <tr>
//                       <td className="py-1 px-2 border border-gray-300"><strong>Total Bill:</strong></td>
//                       <td className="py-1 px-2 border border-gray-300">{client.totalBill || client.previousDue}</td>
//                     </tr>
//                     <tr>
//                       <td className="py-1 px-2 border border-gray-300"><strong>Receive:</strong></td>
//                       <td className="py-1 px-2 border border-gray-300">{client.receive}</td>
//                     </tr>
//                     <tr>
//                       <td className="py-1 px-2 border border-gray-300"><strong>Sales Return:</strong></td>
//                       <td className="py-1 px-2 border border-gray-300">{client.salesReturn}</td>
//                     </tr>
//                     <tr>
//                       <td className="py-1 px-2 border border-gray-300"><strong>Money Return:</strong></td>
//                       <td className="py-1 px-2 border border-gray-300">{client.moneyReturn}</td>
//                     </tr>
//                     <tr>
//                       <td className="py-1 px-2 border border-gray-300"><strong>Due:</strong></td>
//                       <td className="py-1 px-2 border border-gray-300">{client.due}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </td>
//               <td className="py-2 px-4 border border-gray-300 relative">
//                 <button
//                   className="p-2 mx-auto rounded-sm border border-green-500 bg-[#5d5b10] text-white flex items-center"
//                   onClick={() => handleDropdownToggle(client.idNo)}
//                 >
//                   Action <RiArrowDownSFill />
//                 </button>
//                 {dropdownVisible === client.idNo && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
//                     <button
//                       className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-100"
//                       onClick={() => handleViewClick(client)}
//                     >
//                       <FaEye className="mr-2" /> View
//                     </button>
//                     <button className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-100">
//                       <GiReceiveMoney className="mr-2" /> Receive
//                     </button>
//                     <button className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-100">
//                       <FaEdit className="mr-2" /> Edit
//                     </button>
//                     <button className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-100">
//                       <FaTrash className="mr-2" /> Delete
//                     </button>
//                   </div>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {selectedClient && (
//         <Modal isOpen={!!selectedClient} onClose={handleCloseModal}>
//           <h3 className="text-lg font-bold mb-4">Client Details</h3>
//           <table className="min-w-full border border-gray-300">
//             <tbody>
//               <tr>
//                 <td className="py-1 px-2 border border-gray-300"><strong>ID:</strong></td>
//                 <td className="py-1 px-2 border border-gray-300">{selectedClient.idNo}</td>
//               </tr>
//               <tr>
//                 <td className="py-1 px-2 border border-gray-300"><strong>Name:</strong></td>
//                 <td className="py-1 px-2 border border-gray-300">{selectedClient.name}</td>
//               </tr>
//               <tr>
//                 <td className="py-1 px-2 border border-gray-300"><strong>Phone:</strong></td>
//                 <td className="py-1 px-2 border border-gray-300">{selectedClient.phoneNumber}</td>
//               </tr>
//               <tr>
//                 <td className="py-1 px-2 border border-gray-300"><strong>Address:</strong></td>
//                 <td className="py-1 px-2 border border-gray-300">{selectedClient.address}</td>
//               </tr>
//               <tr>
//                 <td className="py-1 px-2 border border-gray-300"><strong>Created At:</strong></td>
//                 <td className="py-1 px-2 border border-gray-300">{moment(selectedClient.createdAt).format('YYYY-MM-DD HH:mm:ss')}</td>
//               </tr>
//               <tr>
//                 <td className="py-1 px-2 border border-gray-300"><strong>Total Bill:</strong></td>
//                 <td className="py-1 px-2 border border-gray-300">{selectedClient.totalBill}</td>
//               </tr>
//               <tr>
//                 <td className="py-1 px-2 border border-gray-300"><strong>Due:</strong></td>
//                 <td className="py-1 px-2 border border-gray-300">{selectedClient.due}</td>
//               </tr>
//             </tbody>
//           </table>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default ClientTable;


import { useState } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { GiReceiveMoney } from 'react-icons/gi';
import { RiArrowDownSFill } from 'react-icons/ri';
import Modal from './Modal';
import moment from 'moment';
import { BASE_URL, updateClient, deleteClient } from '../../../services/api';
import { toast } from 'react-toastify';

const ClientTable = ({ clients, onClientUpdate }) => {
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    phoneNumber: '',
    address: ''
  });

  const handleDropdownToggle = (id) => {
    setDropdownVisible(dropdownVisible === id ? null : id);
  };

  const handleViewClick = (client) => {
    setSelectedClient(client);
  };

  const handleEditClick = (client) => {
    setSelectedClient(client);
    setEditFormData({
      name: client.name,
      phoneNumber: client.phoneNumber,
      address: client.address,
    });
    setIsEditing(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await deleteClient(id);
        onClientUpdate(); // Refresh the client list after deletion
      } catch (error) {
        console.error("Error deleting client:", error.message);
      }
    }
  };

  const handleEditFormChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveEdit = async () => {
    try {
      await updateClient(selectedClient._id, editFormData);
      setIsEditing(false);
      setSelectedClient(null);
      onClientUpdate(); // Refresh the client list after updating
      toast.success('Client update successfully', {
        position: "top-right",
        autoClose: 5000,
        });
    } catch (error) {
      console.error("Error updating client:", error.message);
    }
  };

  const handleCloseModal = () => {
    setSelectedClient(null);
    setIsEditing(false);
  };

  return (
    <div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="w-full bg-gray-200">
            <th className="py-2 px-4 border border-gray-300">ID NO</th>
            <th className="py-2 px-4 border border-gray-300">IMAGE</th>
            <th className="py-2 px-4 border border-gray-300">CLIENT DETAILS</th>
            <th className="py-2 px-4 border border-gray-300">DETAILS</th>
            <th className="py-2 px-4 border border-gray-300">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, idx) => (
            <tr key={client.idNo || idx} className="w-full">
              <td className="py-2 px-4 border border-gray-300">{client.idNo}</td>
              <td className="py-2 px-4 border border-gray-300">
                <img src={`${BASE_URL}/${client.image}`} alt="Client" className="w-24 h-24 mx-auto border-2 border-slate-300 rounded-full" />
              </td>
              <td className="py-2 px-4 border border-gray-300">
                <div><strong>Name:</strong> {client.name}</div>
                <div><strong>Phone:</strong> {client.phoneNumber}</div>
                <div><strong>Address:</strong> {client.address}</div>
                <div><strong>Created At:</strong> {moment(client.createdAt).format('YYYY-MM-DD HH:mm:ss')}</div>
              </td>
              <td className="py-2 px-4 border border-gray-300">
                <table className="min-w-full border border-gray-300">
                  <tbody>
                    <tr>
                      <td className="py-1 px-2 border border-gray-300"><strong>Previous Due:</strong></td>
                      <td className="py-1 px-2 border border-gray-300">{client.previousDue}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 border border-gray-300"><strong>Bill:</strong></td>
                      <td className="py-1 px-2 border border-gray-300">{client.bill}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 border border-gray-300"><strong>Total Bill:</strong></td>
                      <td className="py-1 px-2 border border-gray-300">{client.totalBill}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 border border-gray-300"><strong>Receive:</strong></td>
                      <td className="py-1 px-2 border border-gray-300">{client.receive}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 border border-gray-300"><strong>Sales Return:</strong></td>
                      <td className="py-1 px-2 border border-gray-300">{client.salesReturn}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 border border-gray-300"><strong>Money Return:</strong></td>
                      <td className="py-1 px-2 border border-gray-300">{client.moneyReturn}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 border border-gray-300"><strong>Due:</strong></td>
                      <td className="py-1 px-2 border border-gray-300">{client.due}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td className="py-2 px-4 border border-gray-300 relative">
                <button
                  className="p-2 mx-auto rounded-sm border border-green-500 bg-[#5d5b10] text-white flex items-center"
                  onClick={() => handleDropdownToggle(client.idNo)}
                >
                  Action <RiArrowDownSFill />
                </button>
                {dropdownVisible === client.idNo && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                    <button
                      className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-100"
                      onClick={() => handleViewClick(client)}
                    >
                      <FaEye className="mr-2" /> View
                    </button>
                    <button
                      className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-100"
                      onClick={() => handleEditClick(client)}
                    >
                      <FaEdit className="mr-2" /> Edit
                    </button>
                    <button
                      className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-100"
                      onClick={() => handleDeleteClick(client._id)}
                    >
                      <FaTrash className="mr-2" /> Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedClient && (
        <Modal isOpen={!!selectedClient} onClose={handleCloseModal}>
          {isEditing ? (
            <div>
              <h3 className="text-lg font-bold mb-4">Edit Client</h3>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={editFormData.phoneNumber}
                  onChange={handleEditFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={editFormData.address}
                  onChange={handleEditFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <button
                onClick={handleSaveEdit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-bold mb-4">Client Details</h3>
              <table className="min-w-full border border-gray-300">
                <tbody>
                  <tr>
                    <td className="py-1 px-2 border border-gray-300"><strong>Name:</strong></td>
                    <td className="py-1 px-2 border border-gray-300">{selectedClient.name}</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2 border border-gray-300"><strong>Phone:</strong></td>
                    <td className="py-1 px-2 border border-gray-300">{selectedClient.phoneNumber}</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2 border border-gray-300"><strong>Address:</strong></td>
                    <td className="py-1 px-2 border border-gray-300">{selectedClient.address}</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2 border border-gray-300"><strong>Created At:</strong></td>
                    <td className="py-1 px-2 border border-gray-300">{moment(selectedClient.createdAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2 border border-gray-300"><strong>Total Bill:</strong></td>
                    <td className="py-1 px-2 border border-gray-300">{selectedClient.totalBill}</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2 border border-gray-300"><strong>Due:</strong></td>
                    <td className="py-1 px-2 border border-gray-300">{selectedClient.previousDue}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default ClientTable;
