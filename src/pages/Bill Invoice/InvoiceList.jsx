import { useState, useEffect } from 'react';
import { FaPlus, FaPrint, FaTrash } from 'react-icons/fa';
import Button from '../../components/Button';
import { getInvoices,deleteInvoice, getPDF } from '../../services/api';

const InvoiceList = () => {
  const [searchClient, setSearchClient] = useState('');
  const [searchAccount, setSearchAccount] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const response = await getInvoices();
      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  // const handleSearch = () => {
  //   // Implement search functionality here
  // };

  const handleReset = () => {
    setSearchClient('');
    setSearchAccount('');
  };

  const handleDelete = async (id) => {
    try {
      await deleteInvoice(id);
      fetchInvoices();
    } catch (error) {
      console.error('Error deleting invoice:', error.message);
    }
  };

  // Calculate totals
  const totalBillAmount = invoices.reduce((acc, curr) => acc + curr.billAmount, 0);
  // const totalDiscount = invoices.reduce((acc, curr) => acc + curr.discount, 0);
  const totalReceiveAmount = invoices.reduce((acc, curr) => acc + curr.receiveAmount, 0);
  const totalDueAmount = invoices.reduce((acc, curr) => acc + curr.dueAmount, 0);


  const handlePrintInvoice = async (invoiceId) => {
    try {
      const response = await getPDF(invoiceId);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice-${invoiceId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error printing invoice:', error.message);
    }
  };

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      {/* header section */}
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Invoice List</h2>
        <Button
          icon={<FaPlus />}
          text="Add New"
          bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
          textColor="text-white border border-green-500"
         to='/add_new_invoice'
        />
      </div>

      {/* Filter Portion */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <div className="p-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">Search Client</label>
          <input
            type="text"
            value={searchClient}
            placeholder="Search Client..."
            onChange={(e) => setSearchClient(e.target.value)}
            className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="p-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">Search Account</label>
          <input
            type="text"
            value={searchAccount}
            placeholder="Search Account..."
            onChange={(e) => setSearchAccount(e.target.value)}
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
            {/* <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Return Quantity</th> */}
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Bill Amount</th>
            {/* <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Discount</th> */}
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Receive Amount</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Due Amount</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Created At</th>
            {/* <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Type</th> */}
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Printable</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="13" className="text-center py-4">Loading...</td>
            </tr>
          ) : (
            invoices.slice(0, rowsPerPage).map((invoice, index) => (
              <tr key={invoice.id}>
                <td className="py-2 px-4 border border-gray-200">{index + 1}</td>
                <td className="py-2 px-4 border border-gray-200">{invoice.client.name}</td>
                <td className="py-2 px-4 border border-gray-200">INV-{invoice._id}</td>
                <td className="py-2 px-4 border border-gray-200">{invoice.category.name}</td>
                {/* <td className="py-2 px-4 border border-gray-200">{invoice.returnQuantity || 0}</td> */}
                <td className="py-2 px-4 border border-gray-200">{invoice.billAmount}</td>
                {/* <td className="py-2 px-4 border border-gray-200">{invoice.discount}</td> */}
                <td className="py-2 px-4 border border-gray-200">{invoice.receiveAmount}</td>
                <td className="py-2 px-4 border border-gray-200">{invoice.dueAmount}</td>
                <td className="py-2 px-4 border border-gray-200">{invoice.createdAt}</td>
                {/* <td className="py-2 px-4 border border-gray-200">{invoice.type}</td> */}
                <td className="py-2 px-4 border border-gray-200 text-center">
                  <Button
                  icon={<FaPrint />}
                  text="Printable"
                  bgColor="bg-blue-500"
                  textColor="text-white"
                  onClick={() => handlePrintInvoice(invoice._id)}
                  />
                </td>
                <td className="py-2 px-4 border border-gray-200">
                  <Button
                    icon={<FaTrash />}
                    text="Delete"
                    bgColor="bg-red-500"
                    textColor="text-white"
                    onClick={() => handleDelete(invoice._id)}
                  />

                </td>
              </tr>
            )))} </tbody> </table>
      {/* Totals */}
      <div className="flex justify-end mt-4">
        <div className="p-4">
          <h3 className="text-lg font-bold">Total Bill Amount: {totalBillAmount}</h3>
          {/* <h3 className="text-lg font-bold">Total Discount: {totalDiscount}</h3> */}
          <h3 className="text-lg font-bold">Total Receive Amount: {totalReceiveAmount}</h3>
          <h3 className="text-lg font-bold">Total Due Amount: {totalDueAmount}</h3>
        </div>
      </div>
    </div>
  );
};


export default InvoiceList;