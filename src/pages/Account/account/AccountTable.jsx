const AccountTable = ({ accounts }) => {
    return (
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Account Title</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Initial Balance</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Account Number</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Contact Person</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Phone Number</th>
            <th className="bg-primary py-2 px-4 border border-gray-200 text-left text-sm font-semibold text-white">Description</th>
          </tr>
        </thead>
        <tbody>
            {accounts.length > 0 ? (accounts.map((account,idx) => (
                <tr key={idx}>
                    <td className="py-2 px-4 border  border-gray-200">{account.accountTitle}</td>
                    <td className="py-2 px-4 border border-gray-200">{account.initialBalance}</td>
                    <td className="py-2 px-4 border border-gray-200">{account.accountNumber}</td>
                    <td className="py-2 px-4 border border-gray-200">{account.contactPerson}</td>
                    <td className="py-2 px-4 border border-gray-200">{account.phoneNumber}</td>
                    <td className="py-2 px-4 border border-gray-200">{account.description}</td>
                </tr>
            ))) : (
            <tr>
                <td colSpan={6} className="py-4 px-4 text-center text-gray-400">
                    No data available
                </td>
            </tr>)}
        </tbody>
      </table>
    );
  };
  
  export default AccountTable;
  