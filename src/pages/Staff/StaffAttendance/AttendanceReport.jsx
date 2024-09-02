import { useState, useEffect } from "react";
import { getAttendanceByDate, getStaffsByMonthAndYear } from '../../../services/api'; 

const AttendanceReport = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [specificDate, setSpecificDate] = useState(new Date().toISOString().slice(0, 10));
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    handleMonthYearFilter();
  }, []);

  const handleMonthYearFilter = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getStaffsByMonthAndYear(month, year);

      if (response && response.data && response.data.attendanceRecords) {
        setFilteredRecords(response.data.attendanceRecords);
      } else {
        setFilteredRecords([]);
      }
    } catch (error) {
      setError("Failed to load attendance records by month and year");
    } finally {
      setLoading(false);
    }
  };

  const handleDateFilter = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getAttendanceByDate(specificDate);

      if (response && response.data && response.data.attendanceRecords) {
        setFilteredRecords(response.data.attendanceRecords);
      } else {
        setFilteredRecords([]);
      }
    } catch (error) {
      setError("Failed to load attendance records by specific date");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMonth(new Date().getMonth() + 1);
    setYear(new Date().getFullYear());
    setSpecificDate(new Date().toISOString().slice(0, 10));
    setFilteredRecords([]);
    handleMonthYearFilter(); // Reset to current month/year data
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <div className="flex justify-between mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
          <select
            className="border-2 border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="">Select Month</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
          <input
            type="number"
            placeholder="YYYY"
            className="border-2 border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Specific Date</label>
          <input
            type="date"
            className="border-2 border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={specificDate}
            onChange={(e) => setSpecificDate(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-center mt-4 mb-4">
        <button
          className="bg-secondary text-white p-2 rounded hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-white mr-2"
          onClick={handleMonthYearFilter}
        >
          {loading ? "Loading..." : "Search by Month/Year"}
        </button>
        <button
          className="bg-secondary text-white p-2 rounded hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-white"
          onClick={handleDateFilter}
        >
          {loading ? "Loading..." : "Search by Specific Date"}
        </button>
      </div>

      <div className="flex justify-end mt-4 mb-4">
        <button
          className="bg-secondary text-white p-2 rounded hover:bg-primary focus:outline-none focus:ring-2 focus:ring-white"
          onClick={handleReset}
        >
          Clear filter
        </button>
      </div>

      {error && (
        <div className="text-red-500 text-center mb-4">
          {error}
        </div>
      )}

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-primary text-white">
            <th className="border border-gray-300 p-2">DATE</th>
            <th className="border border-gray-300 p-2">STAFF NAME</th>
            <th className="border border-gray-300 p-2">PHONE NUMBER</th>
            <th className="border border-gray-300 p-2">IN TIME</th>
            <th className="border border-gray-300 p-2">OUT TIME</th>
            <th className="border border-gray-300 p-2">ATTENDANCE</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record) => (
              <tr key={record._id}>
                <td className="border border-gray-300 p-2">{record.date.slice(0, 10)}</td>
                <td className="border border-gray-300 p-2">{record.staff.name}</td>
                <td className="border border-gray-300 p-2">{record.staff.phone}</td>
                <td className="border border-gray-300 p-2">{record.inTime}</td>
                <td className="border border-gray-300 p-2">{record.outTime}</td>
                <td
                  className={`border border-gray-300 p-2 text-center ${record.status === "Present" ? "bg-green-200" :
                    record.status === "Late" ? "bg-yellow-200" :
                      record.status === "Absent" ? "bg-red-200" :
                        record.status === "Leave" ? "bg-blue-200" :
                          ""
                    }`}
                >
                  {record.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-4 text-gray-500">
                No records found for the selected criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceReport;

