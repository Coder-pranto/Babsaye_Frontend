import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import Button from '../../../components/Button';
import { fetchPurchases, deletePurchase } from '../../../services/api';

const PurchaseList = () => {
  const [purchases, setPurchases] = useState([]);
  const [searchSupplier, setSearchSupplier] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const getPurchases = async () => {
      try {
        const response = await fetchPurchases(); 
        console.log("products data", response.data);
        setPurchases(response.data.purchases);
      } catch (error) {
        console.error('Error fetching purchases:', error.message);
      }
    };
    getPurchases();
  }, []);


  const handleSearch = () => {

  };



  const handleReset = () => {
    setSearchSupplier('');
    setSearchDate('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this purchase?')) {
      try {
        console.log(id);
        await deletePurchase(id);
        setPurchases((prevPurchases) => prevPurchases.filter(purchase => purchase._id !== id));
      } catch (error) {
        console.error('Error deleting purchase:', error.message);
      }
    }
  };
  

  const totalBuying = purchases.reduce((acc, purchase) => {
    return acc + purchase.products.reduce((sum, product) => sum + product.buyingPrice, 0);
  }, 0);

  const totalSelling = purchases.reduce((acc, purchase) => {
    return acc + purchase.products.reduce((sum, product) => sum + product.sellingPrice, 0); 
  }, 0);

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Product Wise Purchase List</h2>
        <Button
          icon={<FaPlus />}
          text="Add New"
          bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
          textColor="text-white border border-green-500"
          to='/add_new_purchase'
        />
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="p-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">Search by Supplier</label>
          <input
            value={searchSupplier}
            onChange={(e) => setSearchSupplier(e.target.value)}
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
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Products</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Buying</th>

            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Quantity</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Discount</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Payment</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Due amount</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">GrandTotal</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Action</th>
          </tr>
        </thead>
        <tbody>
  {purchases?.slice(0, rowsPerPage).map((purchase) => (
    <tr key={purchase._id}>
      <td className="py-2 px-4 border border-gray-200">{purchase.invoiceId}</td>
      <td className="py-2 px-4 border border-gray-200">{purchase.date.slice(0,10)}</td>
      <td className="py-2 px-4 border border-gray-200">{purchase.supplier.supplierName}</td>
      <td className="py-2 px-4 border border-gray-200">
        <ul className="list-none space-y-2">
          {purchase?.products?.map((prod) => (
            <li key={prod.product._id} className="flex items-center justify-between  p-2 ">
              <span className="font-semibold text-gray-700">{prod.product.productName}</span>
              <span className="text-sm text-green-500 bg-gray-200 p-2 rounded-full text-center">
                {prod.quantity} units
              </span>
            </li>
          ))}
        </ul>
      </td>

      <td className="py-2 px-4 border border-gray-200">
        {purchase.products.reduce((sum, prod) => sum + prod.price, 0)}
      </td>

      <td className="py-2 px-4 border border-gray-200">{purchase.products.reduce((sum, prod) => sum + prod.quantity, 0)}</td>
      <td className="py-2 px-4 border border-gray-200">{purchase.discountRate}</td>
      <td className="py-2 px-4 border border-gray-200">{purchase.paymentAmount}</td>
      <td className="py-2 px-4 border border-gray-200">{purchase.dueAmount}</td>
      <td className="py-2 px-4 border border-gray-200">{purchase.grandTotal}</td>
      <td className="py-2 px-4 border border-gray-200">
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={() => handleDelete(purchase._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default PurchaseList;
