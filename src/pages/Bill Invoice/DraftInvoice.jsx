import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Button from '../../components/Button';

const DraftInvoice = () => {
  const [searchGeneral, setSearchGeneral] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [drafts, setDrafts] = useState([
    {
      id: 1,
      client: 'John Doe',
      invoiceId: 'INV-001',
      category: 'Office Supplies',
      returnQuantity: 5,
      billAmount: 2000,
      discount: 100,
      receiveAmount: 1900,
      dueAmount: 0,
      createdAt: '2024-07-29',
      type: 'Cash',
      printable: 'Yes',
      action: 'View',
    },
    {
      id: 2,
      client: 'Jane Smith',
      invoiceId: 'INV-002',
      category: 'Consulting',
      returnQuantity: 2,
      billAmount: 1500,
      discount: 50,
      receiveAmount: 1450,
      dueAmount: 0,
      createdAt: '2024-07-30',
      type: 'Credit',
      printable: 'No',
      action: 'Edit',
    },
    // Add more draft objects as needed
  ]);

  const handleSearch = () => {
    // Implement search functionality here
  };

  const handleReset = () => {
    setSearchGeneral('');
  };

  // Calculate totals
  const totalReturnQuantity = drafts.reduce((acc, curr) => acc + curr.returnQuantity, 0);
  const totalBillAmount = drafts.reduce((acc, curr) => acc + curr.billAmount, 0);
  const totalDiscount = drafts.reduce((acc, curr) => acc + curr.discount, 0);
  const totalReceiveAmount = drafts.reduce((acc, curr) => acc + curr.receiveAmount, 0);
  const totalDueAmount = drafts.reduce((acc, curr) => acc + curr.dueAmount, 0);

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      {/* header section */}
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Bill Invoice List</h2>
        <Button
          icon={<FaPlus />}
          text="Add New"
          bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
          textColor="text-white border border-green-500"
        />
      </div>

      <div className="flex flex-col justify-center items-center space-x-2l mt-4">
        <h2 className='font-bold text-2xl'>Pranto</h2>
        <p className='font-semibold text-2xl'>01521206350</p>
        <p className='font-semibold text-2xl'>Bill Invoice List</p>
      </div>

      {/* Filter Portion */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <div className="p-4 col-span-2">
          <label className="block text-lg font-medium text-gray-700 mb-2">Search</label>
          <input
            type="text"
            value={searchGeneral}
            placeholder="Search..."
            onChange={(e) => setSearchGeneral(e.target.value)}
            className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col justify-center items-center p-4 mt-8">
          <Button
            text="Clear Filter"
            bgColor="bg-slate-800 hover:bg-slate-600"
            textColor="text-white"
            onClick={handleReset}
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
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">SL</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Client</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Invoice ID No</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Category</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Return Quantity</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Bill Amount</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Discount</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Receive Amount</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Due Amount</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Created At</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Type</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Printable</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {drafts.slice(0, rowsPerPage).map((draft, index) => (
            <tr key={draft.id}>
              <td className="py-2 px-4 border border-gray-200">{index + 1}</td>
              <td className="py-2 px-4 border border-gray-200">{draft.client}</td>
              <td className="py-2 px-4 border border-gray-200">{draft.invoiceId}</td>
              <td className="py-2 px-4 border border-gray-200">{draft.category}</td>
              <td className="py-2 px-4 border border-gray-200">{draft.returnQuantity}</td>
              <td className="py-2 px-4 border border-gray-200">{draft.billAmount}</td>
              <td className="py-2 px-4 border border-gray-200">{draft.discount}</td>
              <td className="py-2 px-4 border border-gray-200">{draft.receiveAmount}</td>
              <td className="py-2 px-4 border border-gray-200">{draft.dueAmount}</td>
              <td className="py-2 px-4 border border-gray-200">{draft.createdAt}</td>
              <td className="py-2 px-4 border border-gray-200">{draft.type}</td>
              <td className="py-2 px-4 border border-gray-200">{draft.printable}</td>
              <td className="py-2 px-4 border border-gray-200">{draft.action}</td>
            </tr>
          ))}
          {/* Totals Row */}
          <tr className="font-semibold">
            <td colSpan="4" className="py-2 px-4 border border-gray-200 text-left">Total</td>
            <td className="py-2 px-4 border border-gray-200">{totalReturnQuantity}</td>
            <td className="py-2 px-4 border border-gray-200">{totalBillAmount}</td>
            <td className="py-2 px-4 border border-gray-200">{totalDiscount}</td>
            <td className="py-2 px-4 border border-gray-200">{totalReceiveAmount}</td>
            <td className="py-2 px-4 border border-gray-200">{totalDueAmount}</td>
            <td colSpan="3" className="py-2 px-4 border border-gray-200 text-left"></td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-6 p-4">
        <span className="text-gray-700 text-sm">
          Showing 1 to {Math.min(rowsPerPage, drafts.length)} of {drafts.length} entries
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
    </div>
  );
};

export default DraftInvoice;
