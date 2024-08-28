// import { useState } from 'react';
// import { FaPlus, FaTrashAlt, FaEdit } from 'react-icons/fa';
// import Button from '../../../components/Button';

// const ProductSize = () => {
//   const [searchAll, setSearchAll] = useState('');
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newSizeName, setNewSizeName] = useState('');
//   const [isEditing, setIsEditing] = useState(false);
//   const [editSizeId, setEditSizeId] = useState(null);

//   const [sizes, setSizes] = useState([
//     {
//       id: 1,
//       size: 'Size 1',
//       createdAt: '2024-07-29',
//     },
//     {
//       id: 2,
//       size: 'Size 2',
//       createdAt: '2024-07-30',
//     },
//     // Add more size objects as needed
//   ]);

//   const handleSearch = () => {
//     // Implement search functionality here
//   };

//   const handleAddSize = () => {
//     if (isEditing) {
//       setSizes(
//         sizes.map((size) =>
//           size.id === editSizeId ? { ...size, size: newSizeName } : size
//         )
//       );
//       setIsEditing(false);
//       setEditSizeId(null);
//     } else {
//       setSizes([
//         ...sizes,
//         { id: sizes.length + 1, size: newSizeName, createdAt: new Date().toISOString().split('T')[0] },
//       ]);
//     }
//     setNewSizeName('');
//     setIsModalOpen(false);
//   };

//   const handleDeleteSize = (id) => {
//     setSizes(sizes.filter((size) => size.id !== id));
//   };

//   const handleEditSize = (id) => {
//     const sizeToEdit = sizes.find((size) => size.id === id);
//     setNewSizeName(sizeToEdit.size);
//     setIsEditing(true);
//     setEditSizeId(id);
//     setIsModalOpen(true);
//   };

//   return (
//     <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
//       {/* Header section */}
//       <div className="flex justify-between items-center bg-[#5D5B10] p-4">
//         <h2 className="text-2xl font-bold text-white">Product Size</h2>
//         <Button
//           icon={<FaPlus />}
//           text="Add Size"
//           bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
//           textColor="text-white border border-green-500"
//           onClick={() => setIsModalOpen(true)}
//         />
//       </div>

//       {/* Filter Portion */}
//       <div className="grid grid-cols-5 gap-2 mb-4">
//         <div className="p-4 col-span-1">
//           <label className="block text-lg font-medium text-gray-700 mb-2">Search All</label>
//           <input
//             type="text"
//             value={searchAll}
//             placeholder="Search All..."
//             onChange={(e) => setSearchAll(e.target.value)}
//             className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//       </div>

//       {/* Dropdown for number of rows */}
//       <div className="flex justify-start mb-4">
//         <label className="mx-2 text-md font-medium text-gray-700">Show</label>
//         <select
//           value={rowsPerPage}
//           onChange={(e) => setRowsPerPage(Number(e.target.value))}
//           className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//         >
//           <option value={10}>10</option>
//           <option value={25}>25</option>
//           <option value={50}>50</option>
//           <option value={100}>100</option>
//         </select>
//         <label className="ml-2 text-md font-medium text-gray-700">entries</label>
//       </div>

//       <table className="min-w-full bg-white">
//         <thead>
//           <tr>
//             <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">ID No</th>
//             <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Size</th>
//             <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Created At</th>
//             <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sizes.slice(0, rowsPerPage).map((size) => (
//             <tr key={size.id}>
//               <td className="py-2 px-4 border border-gray-200">{size.id}</td>
//               <td className="py-2 px-4 border border-gray-200">{size.size}</td>
//               <td className="py-2 px-4 border border-gray-200">{size.createdAt}</td>
//               <td className="py-2 px-4 border border-gray-200">
//                 <div className="flex space-x-2">
//                   <button type="button" className="text-blue-500 hover:text-blue-700" onClick={() => handleEditSize(size.id)}>
//                     <FaEdit />
//                   </button>
//                   <button type="button" className="text-red-500 hover:text-red-700" onClick={() => handleDeleteSize(size.id)}>
//                     <FaTrashAlt />
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="flex justify-between items-center mt-6 p-4">
//         <span className="text-gray-700 text-sm">
//           Showing 1 to {Math.min(rowsPerPage, sizes.length)} of {sizes.length} entries
//         </span>
//         <div className="flex items-center space-x-2">
//           <button className="px-4 py-2 bg-gray-400 text-black rounded-sm hover:bg-gray-700 transition-colors duration-300">
//             Previous
//           </button>
//           <span className="text-white bg-blue-500 border-1 p-2 font-semibold rounded-sm">1</span>
//           <button className="px-4 py-2 bg-gray-400 text-black rounded-sm hover:bg-gray-700 transition-colors duration-300">
//             Next
//           </button>
//         </div>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-md">
//             <h3 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Size' : 'Add New Size'}</h3>
//             <input
//               type="text"
//               value={newSizeName}
//               placeholder="Size Name"
//               onChange={(e) => setNewSizeName(e.target.value)}
//               className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
//             />
//             <div className="flex justify-end space-x-4">
//               <Button
//                 text="Cancel"
//                 bgColor="bg-red-500 hover:bg-red-700"
//                 textColor="text-white"
//                 onClick={() => {
//                   setIsModalOpen(false);
//                   setIsEditing(false);
//                   setNewSizeName('');
//                 }}
//               />
//               <Button
//                 text={isEditing ? 'Save Changes' : 'Add Size'}
//                 bgColor="bg-green-500 hover:bg-green-700"
//                 textColor="text-white"
//                 onClick={handleAddSize}
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductSize;



import { useState, useEffect } from 'react';
import { FaPlus, FaTrashAlt, FaEdit } from 'react-icons/fa';
import Button from '../../../components/Button';
import { fetchSizes, addSize, updateSize, deleteSize } from '../../../services/api'; 
import { toast } from 'react-toastify';

const ProductSize = () => {
  const [searchAll, setSearchAll] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSizeName, setNewSizeName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editSizeId, setEditSizeId] = useState(null);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {

    const loadSizes = async () => {
      try {
        const response = await fetchSizes();
        setSizes(response.data)
      } catch (error) {
        console.error('Failed to fetch sizes', error);
      }
    }

    loadSizes();

  }, []);

  const handleSearch = () => {
    // Implement search functionality here
  };

  const handleAddSize = async () => {
    try {
      if (isEditing) {
        await updateSize(editSizeId, { sizeName: newSizeName });
        setSizes(
          sizes.map((size) =>
            size._id === editSizeId ? { ...size, sizeName: newSizeName } : size
          )
        );
        setIsEditing(false);
        setEditSizeId(null);
        setNewSizeName('');
        setIsModalOpen(false);
        toast.success("Size updated successfully!");
      } else {
        const response = await addSize({ sizeName: newSizeName });
        setSizes([
          ...sizes,
          { ...response.data, createdAt: new Date().toISOString().split('T')[0] },
        ]);
        setNewSizeName('');
        setIsModalOpen(false);
        toast.success("Size created successfully!");
      }
    } catch (error) {
      console.error('Failed to add/update size', error.message);
      toast.error('Failed to add/update size');
    }
  };
  
  const handleDeleteSize = async (id) => {

    const confirmed = window.confirm("Are you sure you want to delete this size?");
    if(confirmed){
    try {
      await deleteSize(id);
      setSizes(sizes.filter((size) => size._id !== id));
      toast.success("Size deleted successfully")
    } catch (error) {
      console.error('Failed to delete size', error.message);
      toast.error('Failed to delete size');
    }
  }
  };

  const handleEditSize = (id) => {
    const sizeToEdit = sizes.find((size) => size._id === id);
    setNewSizeName(sizeToEdit.sizeName);
    setIsEditing(true);
    setEditSizeId(id);
    setIsModalOpen(true);
  };

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      {/* Header section */}
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Product Size</h2>
        <Button
          icon={<FaPlus />}
          text="Add Size"
          bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
          textColor="text-white border border-green-500"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {/* Filter Portion */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        <div className="p-4 col-span-1">
          <label className="block text-lg font-medium text-gray-700 mb-2">Search All</label>
          <input
            type="text"
            value={searchAll}
            placeholder="Search All..."
            onChange={(e) => setSearchAll(e.target.value)}
            className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Dropdown for number of rows */}
      <div className="flex justify-start mb-4">
        <label className="mx-2 text-md font-medium text-gray-700">Show</label>
        <select
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <label className="ml-2 text-md font-medium text-gray-700">entries</label>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">ID No</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Size</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Created At</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {sizes.slice(0, rowsPerPage).map((size) => (
            <tr key={size.id}>
              <td className="py-2 px-4 border border-gray-200">{size._id}</td>
              <td className="py-2 px-4 border border-gray-200">{size.sizeName}</td>
              <td className="py-2 px-4 border border-gray-200">{size.createdAt.slice(0,10)}</td>
              <td className="py-2 px-4 border border-gray-200">
                <div className="flex space-x-2">
                  <button type="button" className="text-blue-500 hover:text-blue-700" onClick={() => handleEditSize(size._id)}>
                    <FaEdit />
                  </button>
                  <button type="button" className="text-red-500 hover:text-red-700" onClick={() => handleDeleteSize(size._id)}>
                    <FaTrashAlt />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-6 p-4">
        <span className="text-gray-700 text-sm">
          Showing 1 to {Math.min(rowsPerPage, sizes.length)} of {sizes.length} entries
        </span>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 bg-gray-400 text-black rounded-sm hover:bg-gray-700 transition-colors duration-300">
            Previous
          </button>
          <span className="text-white bg-blue-500 border-1 p-2 font-semibold rounded-sm">1</span>
          <button className="px-4 py-2 bg-gray-400 text-black rounded-sm hover:bg-gray-700 transition-colors duration-300">
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md">
            <h3 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Size' : 'Add New Size'}</h3>
            <input
              type="text"
              value={newSizeName}
              placeholder="Size Name"
              onChange={(e) => setNewSizeName(e.target.value)}
              className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
            />
            <div className="flex justify-end space-x-4">
              <Button
                text="Cancel"
                bgColor="bg-red-500 hover:bg-red-700"
                textColor="text-white"
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEditing(false);
                  setNewSizeName('');
                }}
              />
              <Button
                text={isEditing ? 'Save Changes' : 'Add Size'}
                bgColor="bg-green-500 hover:bg-green-700"
                textColor="text-white"
                onClick={handleAddSize}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSize;
