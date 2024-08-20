/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { FaPlus, FaTrashAlt, FaEdit } from 'react-icons/fa';
import Button from '../../../components/Button';

const PurchaseInvoiceList = () => {
  const [searchSupplier, setSearchSupplier] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingInvoice, setEditingInvoice] = useState(null); // Holds the invoice being edited
  const [newInvoice, setNewInvoice] = useState({ id: null, date: '', invoice: '', supplier: '', total: 0 });

  const [invoices, setInvoices] = useState([
    {
      id: 1,
      date: '2024-07-29',
      invoice: 'INV-001',
      supplier: 'Supplier A',
      total: 4000,
    },
    {
      id: 2,
      date: '2024-07-30',
      invoice: 'INV-002',
      supplier: 'Supplier B',
      total: 4500,
    },
    // Add more invoice objects as needed
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

  const totalAmount = invoices.reduce((acc, invoice) => acc + invoice.total, 0);

  const handleEdit = (invoice) => {
    setEditingInvoice(invoice);
    setNewInvoice(invoice);
  };

  const handleDelete = (id) => {
    setInvoices(invoices.filter(invoice => invoice.id !== id));
  };

  const handleSave = () => {
    if (editingInvoice) {
      setInvoices(invoices.map(inv => (inv.id === newInvoice.id ? newInvoice : inv)));
    } else {
      setInvoices([...invoices, { ...newInvoice, id: invoices.length + 1 }]);
    }
    setEditingInvoice(null);
    setNewInvoice({ id: null, date: '', invoice: '', supplier: '', total: 0 });
  };

  const handleCancel = () => {
    setEditingInvoice(null);
    setNewInvoice({ id: null, date: '', invoice: '', supplier: '', total: 0 });
  };

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      {/* Header section */}
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Purchase Invoice List</h2>
        <Button
          icon={<FaPlus />}
          text="Add New"
          bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
          textColor="text-white border border-green-500"
          onClick={() => setEditingInvoice(null)}
        />
      </div>

      {/* Form for Adding/Editing */}
      <div className="p-4 mb-4 border rounded-md bg-gray-100">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Invoice Date</label>
            <input
              type="date"
              value={newInvoice.date}
              onChange={(e) => setNewInvoice({ ...newInvoice, date: e.target.value })}
              className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Invoice Number</label>
            <input
              type="text"
              value={newInvoice.invoice}
              onChange={(e) => setNewInvoice({ ...newInvoice, invoice: e.target.value })}
              className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Supplier</label>
            <select
              value={newInvoice.supplier}
              onChange={(e) => setNewInvoice({ ...newInvoice, supplier: e.target.value })}
              className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Supplier</option>
              {supplierOptions.map(supplier => (
                <option key={supplier.id} value={supplier.name}>{supplier.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Total Amount</label>
            <input
              type="number"
              value={newInvoice.total}
              onChange={(e) => setNewInvoice({ ...newInvoice, total: parseFloat(e.target.value) })}
              className="input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          <Button text="Save" bgColor="bg-blue-500 hover:bg-blue-700" textColor="text-white" onClick={handleSave} />
          {editingInvoice && (
            <Button text="Cancel" bgColor="bg-gray-500 hover:bg-gray-700" textColor="text-white" onClick={handleCancel} />
          )}
        </div>
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
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Invoice</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Supplier</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Total</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {invoices.slice(0, rowsPerPage).map((invoice) => (
            <tr key={invoice.id}>
              <td className="py-2 px-4 border border-gray-200">{invoice.id}</td>
              <td className="py-2 px-4 border border-gray-200">{invoice.date}</td>
              <td className="py-2 px-4 border border-gray-200">{invoice.invoice}</td>
              <td className="py-2 px-4 border border-gray-200">{invoice.supplier}</td>
              <td className="py-2 px-4 border border-gray-200">{invoice.total}</td>
              <td className="py-2 px-4 border border-gray-200 flex space-x-2">
                <button
                  className="px-2 py-1 bg-blue-500 text-white rounded-sm hover:bg-blue-700 transition-colors duration-300"
                  onClick={() => handleEdit(invoice)}
                >
                  <FaEdit />
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded-sm hover:bg-red-700 transition-colors duration-300"
                  onClick={() => handleDelete(invoice.id)}
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
          {/* Totals Row */}
          <tr className="bg-gray-100">
            <td className="py-2 px-4 border border-gray-200" colSpan="4">Total</td>
            <td className="py-2 px-4 border border-gray-200 font-bold">{totalAmount}</td>
            <td className="py-2 px-4 border border-gray-200"></td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-6 p-4">
        <span className="text-gray-700 text-sm">
          Showing 1 to {Math.min(rowsPerPage, invoices.length)} of {invoices.length} entries
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

export default PurchaseInvoiceList;
