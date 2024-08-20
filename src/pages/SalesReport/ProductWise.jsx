import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Button from '../../components/Button';

const ProductWise = () => {
  const [searchProductGroup, setSearchProductGroup] = useState('');
  const [searchProduct, setSearchProduct] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([
    {
      id: 1,
      productInfo: 'Product A',
      pcsBagCSQty: 10,
      pcsQty: 50,
      totalSalesQty: 100,
      totalCTNQty: 20,
      totalPCSQty: 150,
      totalBuyAmount: 5000,
      totalSaleAmount: 6000,
    },
    {
      id: 2,
      productInfo: 'Product B',
      pcsBagCSQty: 5,
      pcsQty: 30,
      totalSalesQty: 80,
      totalCTNQty: 15,
      totalPCSQty: 100,
      totalBuyAmount: 4000,
      totalSaleAmount: 5000,
    },
    // Add more data as needed
  ]);

  const handleSearch = () => {
    let filteredData = data;

    if (searchProductGroup) {
      filteredData = filteredData.filter((item) =>
        item.productInfo.toLowerCase().includes(searchProductGroup.toLowerCase())
      );
    }

    if (searchProduct) {
      filteredData = filteredData.filter((item) =>
        item.productInfo.toLowerCase().includes(searchProduct.toLowerCase())
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
    setSearchProductGroup('');
    setSearchProduct('');
    setStartDate('');
    setEndDate('');
  };

  const filteredData = handleSearch();

  const totals = filteredData.reduce((acc, curr) => {
    acc.pcsBagCSQty += curr.pcsBagCSQty;
    acc.pcsQty += curr.pcsQty;
    acc.totalSalesQty += curr.totalSalesQty;
    acc.totalCTNQty += curr.totalCTNQty;
    acc.totalPCSQty += curr.totalPCSQty;
    acc.totalBuyAmount += curr.totalBuyAmount;
    acc.totalSaleAmount += curr.totalSaleAmount;
    return acc;
  }, {
    pcsBagCSQty: 0,
    pcsQty: 0,
    totalSalesQty: 0,
    totalCTNQty: 0,
    totalPCSQty: 0,
    totalBuyAmount: 0,
    totalSaleAmount: 0,
  });

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      {/* header section */}
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Product Wise Records</h2>
        <Button
          icon={<FaPlus />}
          text="Add New"
          bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
          textColor="text-white border border-green-500"
        />
      </div>

      {/* Filter Portion */}
      <div className="grid grid-cols-12 gap-2 mb-4">
        <div className="p-4 col-span-3">
          <label className="block text-lg font-medium text-gray-700 mb-2">Search By Product Group</label>
          <input
            type="text"
            value={searchProductGroup}
            placeholder="Search Product Group..."
            onChange={(e) => setSearchProductGroup(e.target.value)}
            className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="p-4 col-span-3">
          <label className="block text-lg font-medium text-gray-700 mb-2">Search By Product</label>
          <input
            type="text"
            value={searchProduct}
            placeholder="Search Product..."
            onChange={(e) => setSearchProduct(e.target.value)}
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
        <div className="p-4 col-span-3">
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
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Product Info</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">PCS/Bag/CS Quantity</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">PCS Quantity</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Total Sales Quantity</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Total CTN Quantity</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Total PCS Quantity</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Total Buy Amount</th>
            <th className="py-2 px-4 border border-gray-300 bg-[#5D5B10] text-white">Total Sale Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.slice(0, rowsPerPage).map((item, index) => (
            <tr key={item.id} className="w-full">
              <td className="py-2 px-4 border border-gray-300">{index + 1}</td>
              <td className="py-2 px-4 border border-gray-300">{item.productInfo}</td>
              <td className="py-2 px-4 border border-gray-300">{item.pcsBagCSQty}</td>
              <td className="py-2 px-4 border border-gray-300">{item.pcsQty}</td>
              <td className="py-2 px-4 border border-gray-300">{item.totalSalesQty}</td>
              <td className="py-2 px-4 border border-gray-300">{item.totalCTNQty}</td>
              <td className="py-2 px-4 border border-gray-300">{item.totalPCSQty}</td>
              <td className="py-2 px-4 border border-gray-300">{item.totalBuyAmount}</td>
              <td className="py-2 px-4 border border-gray-300">{item.totalSaleAmount}</td>
            </tr>
          ))}
          <tr className="w-full">
            <td className="py-2 px-4 border border-gray-300 font-bold" colSpan="2">Total</td>
            <td className="py-2 px-4 border border-gray-300 font-bold">{totals.pcsBagCSQty}</td>
            <td className="py-2 px-4 border border-gray-300 font-bold">{totals.pcsQty}</td>
            <td className="py-2 px-4 border border-gray-300 font-bold">{totals.totalSalesQty}</td>
            <td className="py-2 px-4 border border-gray-300 font-bold">{totals.totalCTNQty}</td>
            <td className="py-2 px-4 border border-gray-300 font-bold">{totals.totalPCSQty}</td>
            <td className="py-2 px-4 border border-gray-300 font-bold">{totals.totalBuyAmount}</td>
            <td className="py-2 px-4 border border-gray-300 font-bold">{totals.totalSaleAmount}</td>
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

export default ProductWise;
