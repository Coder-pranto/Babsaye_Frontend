import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Button from '../../../components/Button';

const ClientStatement = () => {
  const [searchClient, setSearchClient] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [statements, setStatements] = useState([
    {
      id: 1,
      date: '2024-07-29',
      product: 'Product A',
      unit: 'pcs',
      qty: 10,
      price: 100,
      description: 'Purchase of Product A',
      invoiceBill: 1000,
      return: 100,
      receiveCredit: 900,
      balance: 0,
    },
    {
      id: 2,
      date: '2024-07-30',
      product: 'Product B',
      unit: 'pcs',
      qty: 5,
      price: 200,
      description: 'Purchase of Product B',
      invoiceBill: 1000,
      return: 0,
      receiveCredit: 1000,
      balance: 0,
    },
    // Add more statement objects as needed
  ]);

  const handleSearch = () => {
    // Implement search functionality here
  };

  const handleReset = () => {
    setSearchClient('');
    setStartDate('');
    setEndDate('');
  };

  const totalPrice = statements.reduce((total, statement) => total + statement.price, 0);
  const totalInvoiceBill = statements.reduce((total, statement) => total + statement.invoiceBill, 0);
  const totalReturn = statements.reduce((total, statement) => total + statement.return, 0);
  const totalReceiveCredit = statements.reduce((total, statement) => total + statement.receiveCredit, 0);
  const totalBalance = statements.reduce((total, statement) => total + statement.balance, 0);

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      {/* header section */}
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Client Statement</h2>
        <Button
          icon={<FaPlus />}
          text="Add New"
          bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
          textColor="text-white border border-green-500"
        />
      </div>

      {/* Filter Portion */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="p-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">Search Client</label>
          <div className="flex items-center">
            <input
              type="text"
              value={searchClient}
              placeholder="Search Client..."
              onChange={(e) => setSearchClient(e.target.value)}
              className="input flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
            <button
              onClick={handleSearch}
              className="btn bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition duration-300"
            >
              Search
            </button>
          </div>
        </div>
        <div className="p-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">Search By Date</label>
          <div className="flex space-x-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
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
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Product</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Unit</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">QTY</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Price</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Description</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Invoice Bill</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Return</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Receive / Credit</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Balance</th>
          </tr>
        </thead>
        <tbody>
          {statements.length > 0 ? (
            statements.slice(0, rowsPerPage).map((statement, index) => (
              <tr key={statement.id}>
                <td className="py-2 px-4 border border-gray-200">{index + 1}</td>
                <td className="py-2 px-4 border border-gray-200">{statement.date}</td>
                <td className="py-2 px-4 border border-gray-200">{statement.product}</td>
                <td className="py-2 px-4 border border-gray-200">{statement.unit}</td>
                <td className="py-2 px-4 border border-gray-200">{statement.qty}</td>
                <td className="py-2 px-4 border border-gray-200">{statement.price}</td>
                <td className="py-2 px-4 border border-gray-200">{statement.description}</td>
                <td className="py-2 px-4 border border-gray-200">{statement.invoiceBill}</td>
                <td className="py-2 px-4 border border-gray-200">{statement.return}</td>
                <td className="py-2 px-4 border border-gray-200">{statement.receiveCredit}</td>
                <td className="py-2 px-4 border border-gray-200">{statement.balance}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" className="py-2 px-4 border border-gray-200 text-center text-sm text-gray-500">
                No data is available for this table
              </td>
            </tr>
          )}
          <tr>
            <td colSpan="5" className="py-2 px-4 border border-gray-200 font-semibold text-right">Total</td>
            <td className="py-2 px-4 border border-gray-200 font-semibold">{totalPrice}</td>
            <td className="py-2 px-4 border border-gray-200"></td>
            <td className="py-2 px-4 border border-gray-200 font-semibold">{totalInvoiceBill}</td>
            <td className="py-2 px-4 border border-gray-200 font-semibold">{totalReturn}</td>
            <td className="py-2 px-4 border border-gray-200 font-semibold">{totalReceiveCredit}</td>
            <td className="py-2 px-4 border border-gray-200 font-semibold">{totalBalance}</td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-6 p-4">
        <span className="text-gray-700 text-sm">
          Showing 1 to {Math.min(rowsPerPage, statements.length)} of {statements.length} entries
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

export default ClientStatement;

