import { useState } from 'react';

const StaffSalaryReport = () => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [searchTerm, setSearchTerm] = useState("");
  const [salaryData, setSalaryData] = useState(data);

  const toggleStatus = (id) => {
    setSalaryData(salaryData.map(item =>
      item.id === id ? { ...item, status: item.status === 'Paid' ? 'Not Paid' : 'Paid' } : item
    ));
  };

  // Function to handle filter reset
  const handleReset = () => {
    setMonth(currentMonth);
    setYear(currentYear);
    setSearchTerm("");
  };

  // Filter salary data based on search term and date
  const filteredData = salaryData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    item.date.getMonth() === parseInt(month) &&
    item.date.getFullYear() === parseInt(year)
  );


  return (
    <div className="p-4">
      {/* Filters */}
      <div className="flex justify-center items-center space-x-4 mb-6">
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-2" htmlFor="month">Month</label>
          <select
            id="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="0">January</option>
            <option value="1">February</option>
            <option value="2">March</option>
            <option value="3">April</option>
            <option value="4">May</option>
            <option value="5">June</option>
            <option value="6">July</option>
            <option value="7">August</option>
            <option value="8">September</option>
            <option value="9">October</option>
            <option value="10">November</option>
            <option value="11">December</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-2" htmlFor="year">Year</label>
          <select
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
        </div>

        <div className="flex justify-end items-center space-x-4 mt-6">
          <button className="bg-secondary text-white p-2 rounded-md">Search</button>
          <button onClick={handleReset} className="bg-secondary text-white p-2 rounded-md">Clear filter</button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2  border border-gray-300 rounded-lg w-[25%]"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-primary text-white">
            <tr>
              <th className="px-4 py-2">ID No</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Salary</th>
              <th className="px-4 py-2">Payment</th>
              <th className="px-4 py-2">Will Get</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Signature</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-2 text-center">{item.id}</td>
                <td className="px-4 py-2 text-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full mx-auto"
                  />
                </td>
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2 text-right">{item.salary.toFixed(2)}</td>
                <td className="px-4 py-2 text-right">{item.payment.toFixed(2)}</td>
                <td className="px-4 py-2 text-right">{item.willGet.toFixed(2)}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    className={`px-4 py-2 rounded-md ${
                      item.status === 'Paid' ? 'bg-green-500' : 'bg-red-500'
                    } text-white`}
                    onClick={() => toggleStatus(item.id)}
                  >
                    {item.status}
                  </button>
                </td>
                <td className="px-4 py-2"></td>
              </tr>
            ))}
            <tr className="font-bold border-t">
              <td colSpan="3" className="px-4 py-2 text-center">Total</td>
              <td className="px-4 py-2 text-right">
                {filteredData.reduce((sum, item) => sum + item.salary, 0).toFixed(2)}
              </td>
              <td className="px-4 py-2 text-right">
                {filteredData.reduce((sum, item) => sum + item.payment, 0).toFixed(2)}
              </td>
              <td className="px-4 py-2 text-right">
                {filteredData.reduce((sum, item) => sum + item.willGet, 0).toFixed(2)}
              </td>
              <td className="px-4 py-2"></td>
              <td className="px-4 py-2"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffSalaryReport;


const data = [
  {
    id: 1,
    image: 'https://via.placeholder.com/50',
    name: 'Md. Shamsul Alam Sajib',
    salary: 123333.00,
    payment: 0,
    willGet: 123333.00,
    status: 'Not Paid',
    date: new Date(2024, 7, 10),
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/50',
    name: 'Jane Doe',
    salary: 95000.00,
    payment: 5000.00,
    willGet: 90000.00,
    status: 'Partially Paid',
    date: new Date(2024, 7, 15),
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/50',
    name: 'John Smith',
    salary: 78000.00,
    payment: 78000.00,
    willGet: 0.00,
    status: 'Paid',
    date: new Date(2024, 6, 20),
  },
  {
    id: 4,
    image: 'https://via.placeholder.com/50',
    name: 'Alice Johnson',
    salary: 105000.00,
    payment: 20000.00,
    willGet: 85000.00,
    status: 'Partially Paid',
    date: new Date(2024, 8, 5),
  },
  {
    id: 5,
    image: 'https://via.placeholder.com/50',
    name: 'Bob Brown',
    salary: 89000.00,
    payment: 89000.00,
    willGet: 0.00,
    status: 'Paid',
    date: new Date(2024, 5, 30),
  },
]