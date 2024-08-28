
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Button from '../../../components/Button';
import Modal from './Modal';
import AccountTable from './AccountTable'; // Import the AccountTable component
import { fetchAllAccount, deleteAccount, updateAccount } from '../../../services/api';

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchAccountData = async () => {
    try {
      const { data } = await fetchAllAccount();
      setAccounts(data);
      // console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (accountId) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      try {
        await deleteAccount(accountId);
        setAccounts(accounts.filter(account => account._id !== accountId));
        console.log('Account deleted successfully');
      } catch (error) {
        console.log('Failed to delete account:', error.message);
      }
    }
  };

  const handleEdit = (account) => {
    setCurrentAccount(account);
    setModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateAccount(currentAccount._id, currentAccount);
      setAccounts(accounts.map(account =>
        account._id === currentAccount._id ? currentAccount : account
      ));
      setModalOpen(false);
      console.log('Account updated successfully');
    } catch (error) {
      console.log('Failed to update account:', error.message);
    }
  };

  useEffect(() => {
    fetchAccountData();
  }, []);

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      {/* header section */}
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Account List</h2>
        <Button
          icon={<FaPlus />}
          text="Add New"
          bgColor="bg-[#5D5B10] hover:bg-[#5D5B00]"
          textColor="text-white border border-green-500"
          to='/account_create'
        />
      </div>

      {/* Dropdown for number of rows */}
      <div className="flex justify-between my-4">
        <div>
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

        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Account Table */}
      <AccountTable
        accounts={accounts.filter(account => 
          account.title.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        onEdit={handleEdit}
        onDelete={handleDelete}
        rowsPerPage={rowsPerPage}
      />

      <div className="flex justify-between items-center mt-6 p-4">
        <span className="text-gray-700 text-sm">
          Showing 1 to {Math.min(rowsPerPage, accounts.length)} of {accounts.length} entries
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

      {/* Modal for editing account */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleUpdate}
        account={currentAccount}
        setAccount={setCurrentAccount}
      />
    </div>
  );
};

export default AccountList;
