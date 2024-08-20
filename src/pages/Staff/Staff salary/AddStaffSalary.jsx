import { useState } from 'react';

const AddStaffSalary = () => {
  // Sample staff data
  const [staffList, setStaffList] = useState([
    { id: 1, name: 'Md. Shamsul Alam Sajib', salary: 0 },
    { id: 2, name: 'Jane Doe', salary: 0 },
    { id: 3, name: 'John Smith', salary: 0 },
    // Add more staff members as needed
  ]);

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const handleSalaryChange = (id, newSalary) => {
    setStaffList(staffList.map(staff => 
      staff.id === id ? { ...staff, salary: newSalary } : staff
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ month, year, staffSalaries: staffList });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit}>
        {/* Month and Year Selection */}
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
        </div>

        {/* Staff Salary Table */}
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-[#5D5B10] text-white">
              <th className="py-3 px-4 text-left">Staff Name</th>
              <th className="py-3 px-4 text-left">Salary</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map(staff => (
              <tr key={staff.id} className="border-b border-gray-200">
                <td className="py-2 px-4">{staff.name}</td>
                <td className="py-2 px-4">
                  <input
                    type="number"
                    value={staff.salary}
                    onChange={(e) => handleSalaryChange(staff.id, Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Submit Button */}
        <div className="text-center mt-6">
          <button
            type="submit"
            className="bg-[#5D5B10] text-white font-semibold py-2 px-6 rounded hover:bg-[#5D5B00] transition duration-300"
          >
            Salary Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStaffSalary;

