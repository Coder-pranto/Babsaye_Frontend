const Modal = ({ isOpen, onClose, onSubmit, account, setAccount }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount({ ...account, [name]: value });
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Edit Account</h2>
        <form onSubmit={onSubmit}>
          <label className="block mb-2">
            <span className="text-gray-700">Account Title</span>
            <input
              type="text"
              name="title"
              value={account?.title || ''}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">Initial Balance</span>
            <input
              type="number"
              name="initialBalance"
              value={account?.initialBalance || ''}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">Account Number</span>
            <input
              type="text"
              name="accountNumber"
              value={account?.accountNumber || ''}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">Contact Person</span>
            <input
              type="text"
              name="contactPerson"
              value={account?.contactPerson || ''}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">Phone Number</span>
            <input
              type="text"
              name="phoneNumber"
              value={account?.phoneNumber || ''}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">Description</span>
            <textarea
              name="description"
              value={account?.description || ''}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </label>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
