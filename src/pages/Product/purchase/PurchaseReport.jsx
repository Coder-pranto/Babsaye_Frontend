/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { FaPlus, FaTrashAlt, FaEdit } from 'react-icons/fa';
import Button from '../../../components/Button';

const PurchaseReport = () => {
  const [searchSupplier, setSearchSupplier] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [reports, setReports] = useState([
    {
      id: 1,
      date: '2024-07-29',
      supplier: 'Supplier A',
      product: 'Product 1',
      group: 'Group 1',
      buyingPrice: 200,
      sellingPrice: 300,
      quantity: 20,
      totalBuyingPrice: 4000,
      description: 'Description 1',
    },
    {
      id: 2,
      date: '2024-07-30',
      supplier: 'Supplier B',
      product: 'Product 2',
      group: 'Group 2',
      buyingPrice: 150,
      sellingPrice: 250,
      quantity: 30,
      totalBuyingPrice: 4500,
      description: 'Description 2',
    },
    // Add more report objects as needed
  ]);

  const supplierOptions = [
    { id: 1, name: 'Supplier A' },
    { id: 2, name: 'Supplier B' },
    { id: 3, name: 'Supplier C' },
  ];

  const handleSearch = () => {
    // Implement search functionality here
  };

  const handleReset = () => {
    setSearchSupplier('');
    setSearchDate('');
  };

  const totalBuyingPrice = reports.reduce((acc, report) => acc + report.buyingPrice, 0);
  const totalSellingPrice = reports.reduce((acc, report) => acc + report.sellingPrice, 0);
  const totalQuantity = reports.reduce((acc, report) => acc + report.quantity, 0);
  const totalBuyingPriceSum = reports.reduce((acc, report) => acc + report.totalBuyingPrice, 0);

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      {/* Header section */}
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Purchase Report</h2>
        <Button
          icon={<FaPlus />}
          text="Add New"
          bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
          textColor="text-white border border-green-500"
        />
      </div>

      {/* Filter Portion */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="p-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">Search by Supplier</label>
          <select
            value={searchSupplier}
            onChange={(e) => setSearchSupplier(e.target.value)}
            className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Supplier</option>
            {supplierOptions.map(supplier => (
              <option key={supplier.id} value={supplier.name}>{supplier.name}</option>
            ))}
          </select>
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
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">ID No</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Date</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Supplier</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Product</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Group</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Buying Price</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Selling Price</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Quantity</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Total Buying Price</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Description</th>
          </tr>
        </thead>
        <tbody>
          {reports.slice(0, rowsPerPage).map((report) => (
            <tr key={report.id}>
              <td className="py-2 px-4 border border-gray-200">{report.id}</td>
              <td className="py-2 px-4 border border-gray-200">{report.date}</td>
              <td className="py-2 px-4 border border-gray-200">{report.supplier}</td>
              <td className="py-2 px-4 border border-gray-200">{report.product}</td>
              <td className="py-2 px-4 border border-gray-200">{report.group}</td>
              <td className="py-2 px-4 border border-gray-200">{report.buyingPrice}</td>
              <td className="py-2 px-4 border border-gray-200">{report.sellingPrice}</td>
              <td className="py-2 px-4 border border-gray-200">{report.quantity}</td>
              <td className="py-2 px-4 border border-gray-200">{report.totalBuyingPrice}</td>
              <td className="py-2 px-4 border border-gray-200">{report.description}</td>
            </tr>
          ))}
          {/* Totals Row */}
          <tr className="bg-gray-100">
            <td className="py-2 px-4 border border-gray-200" colSpan="5">Total</td>
            <td className="py-2 px-4 border border-gray-200 font-bold">{totalBuyingPrice}</td>
            <td className="py-2 px-4 border border-gray-200 font-bold">{totalSellingPrice}</td>
            <td className="py-2 px-4 border border-gray-200 font-bold">{totalQuantity}</td>
            <td className="py-2 px-4 border border-gray-200 font-bold">{totalBuyingPriceSum}</td>
            <td className="py-2 px-4 border border-gray-200"></td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-6 p-4">
        <span className="text-gray-700 text-sm">
          Showing 1 to {Math.min(rowsPerPage, reports.length)} of {reports.length} entries
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

export default PurchaseReport;
