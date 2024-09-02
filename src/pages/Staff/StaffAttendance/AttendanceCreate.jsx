

import { useState, useEffect } from "react";
import { fetchStaff, createAttendance } from '../../../services/api'; 
import { toast } from "react-toastify";

const AttendanceCreate = () => {
  const [staffOptions, setStaffOptions] = useState([]);
  const currentDate = new Date().toISOString().slice(0, 10);

  const [date, setDate] = useState(currentDate);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [inTime, setInTime] = useState({ hour: "", minute: "", period: "AM" });
  const [outTime, setOutTime] = useState({ hour: "", minute: "", period: "AM" });
  const [attendance, setAttendance] = useState("Absent");

  useEffect(() => {
    const loadStaff = async () => {
      try {
        const response = await fetchStaff();
        setStaffOptions(response.data);
        setSelectedStaff(response.data[0]);
      } catch (error) {
        console.error("Failed to fetch staff data", error.message);
      }
    };

    loadStaff();
  }, []);

  const handleTimeChange = (timeSetter, field) => (e) => {
    timeSetter((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleStaffChange = (e) => {
    const selectedStaff = staffOptions.find(staff => staff._id === e.target.value);
    
    setSelectedStaff(selectedStaff);
  };

  const handleSubmit = async () => {
    const attendanceData = {
      date,
      staffId: selectedStaff._id,
      inTime: `${inTime.hour}:${inTime.minute} ${inTime.period}`,
      outTime: `${outTime.hour}:${outTime.minute} ${outTime.period}`,
      status: attendance,
    };

    try {
      await createAttendance(attendanceData);
      toast.success("Attendance successfully created")
    } catch (error) {
      console.error("Failed to create attendance", error.message);
      toast.error("Failed to create attendance");
    }
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
          {selectedStaff && (
            <tr>
              <td className="border border-gray-300 p-2">
                <select
                  className="w-full border-2 border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={selectedStaff._id}
                  onChange={handleStaffChange}
                >
                  {staffOptions.map((staff) => (
                    <option key={staff._id} value={staff._id}>
                      {staff.name}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="text"
                  className="w-full border-2 border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={selectedStaff.phone}
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
          )}
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
