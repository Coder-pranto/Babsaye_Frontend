import { useState } from "react";

const AttendanceCreate = () => {
  // Dummy data for staff names and their corresponding phone numbers
  const staffOptions = [
    { id: 1, name: "John Doe", phoneNumber: "123-456-7890" },
    { id: 2, name: "Jane Smith", phoneNumber: "234-567-8901" },
    { id: 3, name: "Michael Johnson", phoneNumber: "345-678-9012" },
    { id: 4, name: "Emily Davis", phoneNumber: "456-789-0123" },
  ];
   const currentDate = new Date().toISOString().slice(0, 10); 

  const [date, setDate] = useState(currentDate);
  const [selectedStaff, setSelectedStaff] = useState(staffOptions[0]); // Initialize with the first staff
  const [inTime, setInTime] = useState({ hour: "", minute: "", period: "AM" });
  const [outTime, setOutTime] = useState({ hour: "", minute: "", period: "AM" });
  const [attendance, setAttendance] = useState("Absent");

  const handleTimeChange = (timeSetter, field) => (e) => {
    timeSetter((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleStaffChange = (e) => {
    const selectedStaff = staffOptions.find(staff => staff.name === e.target.value);
    setSelectedStaff(selectedStaff);
  };

  const handleSubmit = () => {
    const attendanceData = {
      date,
      staffName: selectedStaff.name,
      phoneNumber: selectedStaff.phoneNumber,
      inTime: `${inTime.hour}:${inTime.minute} ${inTime.period}`,
      outTime: `${outTime.hour}:${outTime.minute} ${outTime.period}`,
      attendance,
    };

    console.log("Attendance Data Submitted: ", attendanceData);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <div className="flex justify-center mb-4">
        <div>
          <label className="block text-sm font-bold text-secondary mb-1">Date</label>
          <input
            type="date"
            className="border-2 border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-primary text-white">
            <th className="border border-gray-300 p-2">STAFF NAME</th>
            <th className="border border-gray-300 p-2">PHONE NUMBER</th>
            <th className="border border-gray-300 p-2">IN TIME</th>
            <th className="border border-gray-300 p-2">OUT TIME</th>
            <th className="border border-gray-300 p-2">ATTENDANCE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 p-2">
              <select
                className="w-full border-2 border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={selectedStaff.name}
                onChange={handleStaffChange}
              >
                {staffOptions.map((staff) => (
                  <option key={staff.id} value={staff.name}>
                    {staff.name}
                  </option>
                ))}
              </select>
            </td>
            <td className="border border-gray-300 p-2">
              <input
                type="text"
                className="w-full border-2 border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={selectedStaff.phoneNumber}
                readOnly
              />
            </td>
            <td className="border border-gray-300 p-2">
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="HH"
                  className="w-1/4 border-2 border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={inTime.hour}
                  onChange={handleTimeChange(setInTime, "hour")}
                />
                <input
                  type="number"
                  placeholder="MM"
                  className="w-1/4 border-2 border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={inTime.minute}
                  onChange={handleTimeChange(setInTime, "minute")}
                />
                <select
                  className="w-1/4 border-2 border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={inTime.period}
                  onChange={handleTimeChange(setInTime, "period")}
                >
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
            </td>
            <td className="border border-gray-300 p-2">
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="HH"
                  className="w-1/4 border-2 border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={outTime.hour}
                  onChange={handleTimeChange(setOutTime, "hour")}
                />
                <input
                  type="number"
                  placeholder="MM"
                  className="w-1/4 border-2 border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={outTime.minute}
                  onChange={handleTimeChange(setOutTime, "minute")}
                />
                <select
                  className="w-1/4 border-2 border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={outTime.period}
                  onChange={handleTimeChange(setOutTime, "period")}
                >
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
            </td>
            <td className="border border-gray-300 p-2">
              <select
                className="w-full border-2 border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={attendance}
                onChange={(e) => setAttendance(e.target.value)}
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Late">Late</option>
                <option value="Leave">Leave</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        <button
          className="bg-green-800 text-white p-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={handleSubmit}
        >
          Attendance Create
        </button>
      </div>
    </div>
  );
};

export default AttendanceCreate;

