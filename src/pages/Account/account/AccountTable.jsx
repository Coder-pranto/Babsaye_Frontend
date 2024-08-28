import Button from '../../../components/Button';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AccountTable = ({ accounts, onEdit, onDelete, rowsPerPage }) => {
  return (
    <table className="w-full bg-white rounded shadow-lg">
      <thead className="bg-gray-200">
        <tr>
          <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Account Title</th>
          <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Initial Balance</th>
          <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Account Number</th>
          <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Contact Person</th>
          <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Phone Number</th>
          <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Description</th>
          <th className="bg-primary py-2 px-4 border border-gray-200 text-center text-sm font-semibold text-white">Actions</th>
        </tr>
      </thead>
      <tbody>
        {accounts.length > 0 ? (accounts.slice(0, rowsPerPage).map((account) => (
          <tr key={account._id} className="border-b border-gray-300">
            <td className="p-4 border-r border-gray-300">{account.title}</td>
            <td className="p-4 border-r border-gray-300">{account.initialBalance}</td>
            <td className="p-4 border-r border-gray-300">{account.accountNumber}</td>
            <td className="p-4 border-r border-gray-300">{account.contactPerson}</td>
            <td className="p-4 border-r border-gray-300">{account.phoneNumber}</td>
            <td className="p-4 border-r border-gray-300">{account.description}</td>
            <td className="p-4 space-x-2 text-center">
              <Button
                icon={<FaEdit />}
                text="Edit"
                bgColor="bg-blue-500 hover:bg-blue-600"
                textColor="text-white"
                onClick={() => onEdit(account)}
              />
              <Button
                icon={<FaTrash />}
                text="Delete"
                bgColor="bg-red-500 hover:bg-red-600"
                textColor="text-white"
                onClick={() => onDelete(account._id)}
              />
            </td>
          </tr>
        ))): (
          <tr>
            <td colSpan={7} className="py-4 px-4 text-center text-gray-400">
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </table>




  );
};

export default AccountTable;
