import { useState, useEffect } from 'react';
import {  FaPrint, FaTrashAlt, FaEdit, FaPlus } from 'react-icons/fa';
import Button from '../../../components/Button';
import { fetchStaffPayments, deleteStaffPayment} from '../../../services/api';
import { toast } from 'react-toastify';

const StaffPaymentReport = () => {
  const [searchClient, setSearchClient] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [payments, setPayments] = useState([]);

  const monthsMap = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December',
};


  useEffect(() => {
    const loadPayments = async () => {
      try {
        const response = await fetchStaffPayments();
        setPayments(response.data);
      } catch (error) {
        console.error('Failed to fetch payments', error);
      }
    };
    loadPayments();
  }, []);

  const handleSearch = () => {
    // Implement search functionality here
  };

  const handleReset = () => {
    setSearchClient('');
    setSearchDate('');
  };

  const handleDelete = async (id) => {
    try {
      await deleteStaffPayment(id);
      setPayments(payments.filter(payment => payment._id !== id));
      toast.success('Payment deleted successfully!');
    } catch (error) {
      console.error('Failed to delete payment', error);
      toast.error('Failed to delete payment');
    }
  };

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      {/* Header section */}
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Staff Payment Report</h2>
        <Button
          icon={<FaPlus />}
          text="Add New"
          bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
          textColor="text-white border border-green-500"
          onClick={handleSearch}
          to='/staff_payment_create'
        />
      </div>

      {/* Filter Portion */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <div className="p-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">Search by Client</label>
          <input
            type="text"
            value={searchClient}
            placeholder="Search Client..."
            onChange={(e) => setSearchClient(e.target.value)}
            className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="p-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">Search by Date</label>
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
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
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Date</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Month | Year</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">ID No</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Category</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Account</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Transaction ID</th>
            {/* <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Description</th> */}
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Transaction Type</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Amount</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Printable</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.slice(0, rowsPerPage).map((payment, index) => (
            <tr key={payment._id}>
              <td className="py-2 px-4 border border-gray-200">{index + 1}</td>
              <td className="py-2 px-4 border border-gray-200">{payment.createdAt.slice(0,10)}</td>
              <td className="py-2 px-4 border border-gray-200">
                {monthsMap[(payment.month)]} | {payment.year.toString()}
              </td>
              <td className="py-2 px-4 border border-gray-200">{payment.clientId}</td>
              <td className="py-2 px-4 border border-gray-200">{payment.category.name}</td>
              <td className="py-2 px-4 border border-gray-200">{payment.account.title}</td>
              <td className="py-2 px-4 border border-gray-200">{payment.transactionId}</td>
              {/* <td className="py-2 px-4 border border-gray-200">{payment.description}</td> */}
              <td className="py-2 px-4 border border-gray-200">{payment.transactionType}</td>
              <td className="py-2 px-4 border border-gray-200">{payment.amount}</td>
              <td className="py-2 px-4 border border-gray-200 text-center">
                <button type="button" className="text-green-500 hover:text-green-700">
                  <FaPrint />
                </button>
              </td>
              <td className="py-2 px-4 border border-gray-200">
                <div className="flex justify-center space-x-2">
                  {/* <button type="button" className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button> */}
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(payment._id)}
                  >
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
          Showing 1 to {Math.min(rowsPerPage, payments.length)} of {payments.length} entries
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

export default StaffPaymentReport;
