import  { useState } from 'react';
import { dummyAttendanceData } from './dummyData'; 
import { FaCheckCircle, FaExclamationCircle, FaTimesCircle, FaCalendarAlt } from 'react-icons/fa';
const MonthlyAttendanceReport = () => {
  const staffOptions = [
    { id: 1, name: "Md. Shamsul Alam Sajib", phoneNumber: "01537570379" },
    // Add more staff options as needed
  ];

  const [selectedStaff, setSelectedStaff] = useState(staffOptions[0]);
  const [month, setMonth] = useState(new Date().getMonth()); // 0-indexed month
  const [year, setYear] = useState(new Date().getFullYear());
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  const handleSearch = () => {
    const filteredData = dummyAttendanceData.find(
      (data) =>
        data.staffId === selectedStaff.id &&
        data.year === year &&
        data.month === month
    );

    if (filteredData) {
      setAttendanceRecords(filteredData.attendance);
    } else {
      setAttendanceRecords([]);
    }
  };

  const handleReset = () => {
    setSelectedStaff(staffOptions[0]);
    setMonth(new Date().getMonth());
    setYear(new Date().getFullYear());
    setAttendanceRecords([]);
  };

  const calculateTotals = () => {
    let totalPresent = 0;
    let totalLate = 0;
    let totalAbsent = 0;
    let totalLeave = 0;

    attendanceRecords.forEach((record) => {
      if (record.status === "Present") totalPresent++;
      if (record.status === "Late") totalLate++;
      if (record.status === "Absent") totalAbsent++;
      if (record.status === "Leave") totalLeave++;
    });

    return { totalPresent, totalLate, totalAbsent, totalLeave };
  };

  const { totalPresent, totalLate, totalAbsent, totalLeave } = calculateTotals();

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <div className="flex justify-between mb-4">
        <select
          className="border-2 border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={selectedStaff.name}
          onChange={(e) => setSelectedStaff(staffOptions.find(staff => staff.name === e.target.value))}
        >
          {staffOptions.map((staff) => (
            <option key={staff.id} value={staff.name}>
              {staff.name}
            </option>
          ))}
        </select>

        <select
          className="border-2 border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value))}
        >
          <option value={0}>January</option>
          <option value={1}>February</option>
          <option value={2}>March</option>
          <option value={3}>April</option>
          <option value={4}>May</option>
          <option value={5}>June</option>
          <option value={6}>July</option>
          <option value={7}>August</option>
          <option value={8}>September</option>
          <option value={9}>October</option>
          <option value={10}>November</option>
          <option value={11}>December</option>
        </select>

        <div>
          <input
            type="number"
            placeholder="YYYY"
            className="border-2 border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
          />
        </div>

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
        <h2 className="text-lg font-bold">{selectedStaff.name}</h2>
        <p>{selectedStaff.phoneNumber}</p>
        <p className="text-gray-500">Salary Report</p>
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
                <td className="border border-gray-300 p-2 text-center">{record.date}</td>
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


{/* calculation start */}
<div className="flex justify-between mb-4 p-4 bg-gray-100 rounded-lg shadow-sm">
  <div className="grid grid-cols-2 gap-4">
    <div className="flex items-center space-x-2">
      <div className="bg-green-200 p-2 rounded-full">
        <FaCheckCircle className="w-5 h-5 text-green-700" />
      </div>
      <p className="text-lg font-semibold text-gray-700">Total Present: {totalPresent}</p>
    </div>

    <div className="flex items-center space-x-2">
      <div className="bg-yellow-200 p-2 rounded-full">
        <FaExclamationCircle className="w-5 h-5 text-yellow-700" />
      </div>
      <p className="text-lg font-semibold text-gray-700">Total Late: {totalLate}</p>
    </div>

    <div className="flex items-center space-x-2">
      <div className="bg-red-200 p-2 rounded-full">
        <FaTimesCircle className="w-5 h-5 text-red-700" />
      </div>
      <p className="text-lg font-semibold text-gray-700">Total Absence: {totalAbsent}</p>
    </div>

    <div className="flex items-center space-x-2">
      <div className="bg-blue-200 p-2 rounded-full">
        <FaCalendarAlt className="w-5 h-5 text-blue-700" />
      </div>
      <p className="text-lg font-semibold text-gray-700">Total Leave: {totalLeave}</p>
    </div>
  </div>
</div>

{/* calculation end */}

    </div>
  );
};

export default MonthlyAttendanceReport;
