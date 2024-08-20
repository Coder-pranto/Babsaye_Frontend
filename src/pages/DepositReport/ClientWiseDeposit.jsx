import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Button from '../../components/Button';

const ClientWiseDeposit = () => {
  const [searchClient, setSearchClient] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [data, setData] = useState([
    {
      id: 1,
      date: '2024-08-01',
      idNo: '12345',
      client: 'Client A',
      invoiceIdNo: 'INV001',
      description: 'Deposit for project A',
      amount: 1500,
    },
    {
      id: 2,
      date: '2024-08-02',
      idNo: '12346',
      client: 'Client B',
      invoiceIdNo: 'INV002',
      description: 'Deposit for project B',
      amount: 2000,
    },
    // Add more data as needed
  ]);

  const handleSearch = () => {
    let filteredData = data;

    if (searchClient) {
      filteredData = filteredData.filter((item) =>
        item.client.toLowerCase().includes(searchClient.toLowerCase())
      );
    }

    if (startDate && endDate) {
      filteredData = filteredData.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
      });
    }

    return filteredData;
  };

  const handleClearFilters = () => {
    setSearchClient('');
    setStartDate('');
    setEndDate('');
  };

  const filteredData = handleSearch();

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      {/* header section */}
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Client Wise Deposits</h2>
        <Button
          icon={<FaPlus />}
          text="Add New"
          bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
          textColor="text-white border border-green-500"
        />
      </div>

      {/* Filter Portion */}
      <div className="grid grid-cols-12 gap-2 mb-4">
        <div className="p-4 col-span-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">Search By Client</label>
          <input
            type="text"
            value={searchClient}
            placeholder="Search Client..."
            onChange={(e) => setSearchClient(e.target.value)}
            className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="p-4 col-span-4">
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
        <div className="p-4 col-span-4">
          <div className='flex justify-center items-center mt-9'>
            <button
              onClick={handleClearFilters}
              className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-300"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

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

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="w-full bg-gray-200">
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">SL</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Date</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">ID No</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Client</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Invoice ID No</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Description</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.slice(0, rowsPerPage).map((item, index) => (
            <tr key={item.id} className="w-full">
              <td className="py-2 px-4 border border-gray-300">{index + 1}</td>
              <td className="py-2 px-4 border border-gray-300">{item.date}</td>
              <td className="py-2 px-4 border border-gray-300">{item.idNo}</td>
              <td className="py-2 px-4 border border-gray-300">{item.client}</td>
              <td className="py-2 px-4 border border-gray-300">{item.invoiceIdNo}</td>
              <td className="py-2 px-4 border border-gray-300">{item.description}</td>
              <td className="py-2 px-4 border border-gray-300">{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-6 p-4">
        <span className="text-gray-700 text-sm">
          Showing 1 to {Math.min(rowsPerPage, filteredData.length)} of {filteredData.length} entries
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

export default ClientWiseDeposit;
