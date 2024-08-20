import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Button from '../../components/Button';

const All = () => {
  const [searchClient, setSearchClient] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([
    {
      id: 1,
      issuedDate: '2024-07-29',
      client: 'John Doe',
      product: 'Product A',
      unit: 'pcs',
      qty: 10,
      price: 50,
      total: 500,
      dis: 50,
      transportFare: 20,
      returnQty: 1,
      grandTotal: 450,
      receiveAmount: 400,
      dueAmount: 50,
    },
    {
      id: 2,
      issuedDate: '2024-07-30',
      client: 'Jane Smith',
      product: 'Product B',
      unit: 'pcs',
      qty: 5,
      price: 100,
      total: 500,
      dis: 20,
      transportFare: 10,
      returnQty: 0,
      grandTotal: 470,
      receiveAmount: 470,
      dueAmount: 0,
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
        const itemDate = new Date(item.issuedDate);
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

  const totals = filteredData.reduce((acc, curr) => {
    acc.total += curr.total;
    acc.dis += curr.dis;
    acc.transportFare += curr.transportFare;
    acc.grandTotal += curr.grandTotal;
    acc.receiveAmount += curr.receiveAmount;
    acc.dueAmount += curr.dueAmount;
    return acc;
  }, {
    total : 0,
    dis : 0,
    transportFare : 0,
    grandTotal : 0,
    receiveAmount : 0,
    dueAmount : 0,
  })


  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      {/* header section */}
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">All Records</h2>
        <Button
          icon={<FaPlus />}
          text="Add New"
          bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
          textColor="text-white border border-green-500"
        />
      </div>

      {/* Filter Portion */}
      <div className="grid grid-cols-12 gap-2 mb-4">
        <div className="p-4 col-span-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">Search Client</label>
          <input
            type="text"
            value={searchClient}
            placeholder="Search Client..."
            onChange={(e) => setSearchClient(e.target.value)}
            className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="p-4 col-span-3">
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
        <div className="p-4 col-span-3 flex justify-end mt-9">
          <div className='flex justify-center items-center'>
            <button
              onClick={handleClearFilters}
              className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-300"
            >
              Clear Filters
            </button>
          </div>
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

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="w-full bg-gray-200">
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">SL</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Issued Date</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Client</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Product</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Unit</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">QTY</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Price</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Total</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">DIS</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Transport Fare</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Return QTY</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Grand Total</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Receive Amount</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Due Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.slice(0, rowsPerPage).map((item, index) => (
            <tr key={item.id} className="w-full">
              <td className="py-2 px-4 border border-gray-300">{index + 1}</td>
              <td className="py-2 px-4 border border-gray-300">{item.issuedDate}</td>
              <td className="py-2 px-4 border border-gray-300">{item.client}</td>
              <td className="py-2 px-4 border border-gray-300">{item.product}</td>
              <td className="py-2 px-4 border border-gray-300">{item.unit}</td>
              <td className="py-2 px-4 border border-gray-300">{item.qty}</td>
              <td className="py-2 px-4 border border-gray-300">{item.price}</td>
              <td className="py-2 px-4 border border-gray-300">{item.total}</td>
              <td className="py-2 px-4 border border-gray-300">{item.dis}</td>
              <td className="py-2 px-4 border border-gray-300">{item.transportFare}</td>
              <td className="py-2 px-4 border border-gray-300">{item.returnQty}</td>
              <td className="py-2 px-4 border border-gray-300">{item.grandTotal}</td>
              <td className="py-2 px-4 border border-gray-300">{item.receiveAmount}</td>
              <td className="py-2 px-4 border border-gray-300">{item.dueAmount}</td>
            </tr>
          ))}
            <tr  className="w-full">
              <td className="py-2 px-4 border border-gray-300 font-bold" colSpan="7">Total</td>
              <td className="py-2 px-4 border border-gray-300 font-bold" >{totals.total}</td>
              <td className="py-2 px-4 border border-gray-300 font-bold" >{totals.dis}</td>
              <td className="py-2 px-4 border border-gray-300 font-bold" >{totals.transportFare}</td>
              <td className="py-2 px-4 border border-gray-300 font-bold" ></td>
              <td className="py-2 px-4 border border-gray-300 font-bold" >{totals.grandTotal}</td>
              <td className="py-2 px-4 border border-gray-300 font-bold" >{totals.receiveAmount}</td>
              <td className="py-2 px-4 border border-gray-300 font-bold" >{totals.dueAmount}</td>
            </tr>
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

export default All;

