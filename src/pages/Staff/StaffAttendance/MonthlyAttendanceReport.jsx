import { useState, useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaTimesCircle, FaCalendarAlt } from 'react-icons/fa';
import { fetchStaff, getMonthlyAttendance } from '../../../services/api'; 

const MonthlyAttendanceReport = () => {
  const [staffOptions, setStaffOptions] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth() + 1); 
  const [year, setYear] = useState(new Date().getFullYear());
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [totals, setTotals] = useState({ totalPresent: 0, totalLate: 0, totalAbsent: 0, totalLeave: 0 });

  useEffect(() => {
    const fetchStaffOptions = async () => {
      try {
        const response = await fetchStaff(); 
        setStaffOptions(response.data);
        setSelectedStaff(response.data[0]);
      } catch (error) {
        console.error('Error fetching staff options:', error.message);
      }
    };

    fetchStaffOptions();
  }, []);

  const handleSearch = async () => {
    if (!selectedStaff) return;

    try {
      const response = await getMonthlyAttendance(selectedStaff._id, month, year);
      setAttendanceRecords(response.data.attendanceRecords);
      setTotals(response.data.totals);
    } catch (error) {
      console.error('Error fetching attendance data:', error.message);
      setAttendanceRecords([]);
      setTotals({ totalPresent: 0, totalLate: 0, totalAbsent: 0, totalLeave: 0 });
    }
  };

  const handleReset = () => {
    setSelectedStaff(staffOptions[0]);
    setMonth(new Date().getMonth() + 1);
    setYear(new Date().getFullYear());
    setAttendanceRecords([]);
    setTotals({ totalPresent: 0, totalLate: 0, totalAbsent: 0, totalLeave: 0 });
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <div className="flex justify-between mb-4">
        <select
          className="border-2 border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={selectedStaff?._id || ''}
          onChange={(e) => setSelectedStaff(staffOptions.find(staff => staff._id === e.target.value))}
        >
          {staffOptions.map((staff) => (
            <option key={staff._id} value={staff._id}>
              {staff.name}
            </option>
          ))}
        </select>

        <select
          className="border-2 border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value))}
        >
          <option value={1}>January</option>
          <option value={2}>February</option>
          <option value={3}>March</option>
          <option value={4}>April</option>
          <option value={5}>May</option>
          <option value={6}>June</option>
          <option value={7}>July</option>
          <option value={8}>August</option>
          <option value={9}>September</option>
          <option value={10}>October</option>
          <option value={11}>November</option>
          <option value={12}>December</option>
        </select>

        <input
          type="number"
          placeholder="YYYY"
          className="border-2 border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
        />

        <button
          className="bg-primary text-white p-2 rounded hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={handleSearch}
        >
          Filter
        </button>
        <button
          className="bg-primary text-white p-2 rounded hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-white"
          onClick={handleReset}
        >
          Clear filter
        </button>
      </div>

      <div className="text-center mb-4">
        <h2 className="text-lg font-bold">{selectedStaff?.name}</h2>
        <p>{selectedStaff?.phone}</p>
        <p className="text-gray-500">Attendance Report</p>
      </div>

      <table className="w-full table-auto border-collapse border border-gray-300 mb-4">
        <thead>
          <tr className="bg-primary text-white">
            <th className="border border-gray-300 p-2">SL</th>
            <th className="border border-gray-300 p-2">DATE</th>
            <th className="border border-gray-300 p-2">IN TIME</th>
            <th className="border border-gray-300 p-2">OUT TIME</th>
            <th className="border border-gray-300 p-2">ATTENDANCE</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.length > 0 ? (
            attendanceRecords.map((record, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
                <td className="border border-gray-300 p-2 text-center">{record.date.slice(0,10)}</td>
                <td className="border border-gray-300 p-2 text-center">{record.inTime}</td>
                <td className="border border-gray-300 p-2 text-center">{record.outTime}</td>
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
              <td colSpan="5" className="text-center p-4 text-gray-500">
                No data available in table
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-between mb-4 p-4 bg-gray-100 rounded-lg shadow-sm">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <div className="bg-green-200 p-2 rounded-full">
              <FaCheckCircle className="w-5 h-5 text-green-700" />
            </div>
            <p className="text-lg font-semibold text-gray-700">Total Present: {totals.Present}</p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="bg-yellow-200 p-2 rounded-full">
              <FaExclamationCircle className="w-5 h-5 text-yellow-700" />
            </div>
            <p className="text-lg font-semibold text-gray-700">Total Late: {totals.Late}</p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="bg-red-200 p-2 rounded-full">
              <FaTimesCircle className="w-5 h-5 text-red-700" />
            </div>
            <p className="text-lg font-semibold text-gray-700">Total Absence: {totals.Absent}</p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="bg-blue-200 p-2 rounded-full">
              <FaCalendarAlt className="w-5 h-5 text-blue-700" />
            </div>
            <p className="text-lg font-semibold text-gray-700">Total Leave: {totals.Leave}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyAttendanceReport;
