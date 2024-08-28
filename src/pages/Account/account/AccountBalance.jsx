import { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import { fetchAllAccount } from '../../../services/api';

const AccountBalance = () => {
  const [accounts, setAccounts] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const { data } = await fetchAllAccount();
        setAccounts(data);
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchAccountData();
  }, [])

  const filteredAccounts = accounts.filter(
    (account) =>
      account.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.account.includes(searchTerm)
  );

  const totalBalance = filteredAccounts.reduce((sum, account) => sum + account.initialBalance, 0);

  return (
    <div className="mx-auto p-4 mt-10 mb-4 overflow-y-auto">
      {/* header section */}
      <div className="flex justify-between items-center bg-[#5D5B10] p-4">
        <h2 className="text-2xl font-bold text-white">Account Balance List</h2>
        <Button
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

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">ID</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Title</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Account</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Balance</th>
          </tr>
        </thead>
        <tbody>
          {filteredAccounts.slice(0, rowsPerPage).map((account) => (
            <tr key={account.id}>
              <td className="py-2 px-4 border border-gray-200">{account._id.slice(0, 6)}</td>
              <td className="py-2 px-4 border border-gray-200">{account.title}</td>
              <td className="py-2 px-4 border border-gray-200">{account.accountNumber}</td>
              <td className="py-2 px-4 border border-gray-200">{account.initialBalance}</td>
            </tr>
          ))}
          <tr>
            <td className="py-2 px-4 border border-gray-200 font-bold" colSpan={3}>TOTAL</td>
            <td className="py-2 px-4 border border-gray-200 font-bold">{totalBalance}</td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-6 p-4">
        <span className="text-gray-700 text-sm">
          Showing 1 to {Math.min(rowsPerPage, filteredAccounts.length)} of {filteredAccounts.length} entries
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

export default AccountBalance;
