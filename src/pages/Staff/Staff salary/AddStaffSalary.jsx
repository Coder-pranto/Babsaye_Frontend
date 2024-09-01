import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchStaff, fetchSalariesByMonthAndYear, createOrUpdateSalary } from '../../../services/api';

const AddStaffSalary = () => {
    const [staffList, setStaffList] = useState([]);
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const loadData = async () => {
            try {
                const { data } = await fetchStaff();
                setStaffList(data);
                fetchAndSetSalaries(month, year, data);
            } catch (error) {
                console.error("Error in fetching staff.", error.message);
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        fetchAndSetSalaries(month, year, staffList);
    }, [month, year]);

    const fetchAndSetSalaries = async (selectedMonth, selectedYear, staff) => {
        try {
            const { data } = await fetchSalariesByMonthAndYear(selectedMonth, selectedYear);
            const updatedStaffList = staff.map(staffMember => {
                const salaryRecord = data.find(s => s.staff._id === staffMember._id);
                return {
                    ...staffMember,
                    salary: salaryRecord ? salaryRecord.salary : 0, // Set to existing salary or 0
                };
            });
            setStaffList(updatedStaffList);
        } catch (error) {
            console.error('Error fetching salaries:', error.message);
        }
    };

    const handleSalaryChange = (id, newSalary) => {
        setStaffList(staffList.map(staff =>
            staff._id === id ? { ...staff, salary: Number(newSalary) } : staff
        ));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const promises = staffList.map(staff => 
                createOrUpdateSalary({
                    staffId: staff._id,
                    month,
                    year,
                    salary: staff.salary,
                })
            );
            await Promise.all(promises);
            toast.success('Salaries created/updated successfully');
        } catch (error) {
            console.error('Failed to create/update salaries:', error.message);
            toast.error('Failed to create/update salaries');
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
            <form onSubmit={handleSubmit}>
                <div className="flex justify-center items-center space-x-4 mb-6">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-600 mb-2" htmlFor="month">Month</label>
                        <select
                            id="month"
                            value={month}
                            onChange={(e) => setMonth(Number(e.target.value))}
                            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {Array.from({ length: 12 }).map((_, index) => (
                                <option key={index} value={index}>{new Date(0, index).toLocaleString('default', { month: 'long' })}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-600 mb-2" htmlFor="year">Year</label>
                        <select
                            id="year"
                            value={year}
                            onChange={(e) => setYear(Number(e.target.value))}
                            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {[2023, 2024, 2025, 2026].map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                    <thead>
                        <tr className="bg-[#5D5B10] text-white">
                            <th className="py-3 px-4 text-left">Staff Name</th>
                            <th className="py-3 px-4 text-left">Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staffList?.map(staff => (
                            <tr key={staff._id} className="border-b border-gray-200">
                                <td className="py-2 px-4">{staff.name}</td>
                                <td className="py-2 px-4">
                                    <input
                                        type="number"
                                        value={staff.salary}
                                        onChange={(e) => handleSalaryChange(staff._id, e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="text-center mt-6">
                    <button
                        type="submit"
                        className="bg-[#5D5B10] text-white font-semibold py-2 px-6 rounded hover:bg-[#5D5B00] transition duration-300"
                    >
                        Create Salary
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddStaffSalary;

