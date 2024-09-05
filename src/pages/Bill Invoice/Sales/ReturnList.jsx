import { useState, useEffect } from 'react';
import { FaEye, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getReturns, getReturnById, deleteReturn } from '../../../services/api';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal'; // Assuming you have a reusable Modal component

const ReturnList = () => {
    const [returns, setReturns] = useState([]);
    const [selectedReturn, setSelectedReturn] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Fetch all returns when the component mounts
        const fetchReturns = async () => {
            try {
                const response = await getReturns();
                setReturns(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Failed to fetch returns:', error.message);
                toast.error('Failed to load returns');
            }
        };

        fetchReturns();
    }, []);

    // Handle viewing return details
    const handleViewReturn = async (returnId) => {
        try {
            const response = await getReturnById(returnId);
            setSelectedReturn(response.data);
            console.log("First : ", response.data);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Failed to fetch return details:', error.message);
            toast.error('Failed to fetch return details');
        }
    };

    // Handle deleting a return
    const handleDeleteReturn = async (returnId) => {
        if (window.confirm('Are you sure you want to delete this return?')) {
            try {
                await deleteReturn(returnId);
                setReturns(returns.filter((ret) => ret._id !== returnId)); // Update the UI
                toast.success('Return deleted successfully');
            } catch (error) {
                console.error('Failed to delete return:', error.message);
                toast.error('Failed to delete return');
            }
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl mx-auto mt-12 p-8">
            <h2 className="text-2xl font-bold mb-6">Return List</h2>
            <table className="min-w-full   border">
                <thead className='text-white'>
                    <tr>
                        <th className="bg-primary py-2 px-4 border">SL</th>
                        <th className="bg-primary py-2 px-4 border">Client</th>
                        <th className="bg-primary py-2 px-4 border">Date</th>
                        <th className="bg-primary py-2 px-4 border">Time</th>
                        <th className="bg-primary py-2 px-4 border">Return Amount</th>
                        <th className="bg-primary py-2 px-4 border">Due Amount</th>
                        <th className="bg-primary py-2 px-4 border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {returns.map((ret, index) => (
                        <tr key={ret._id}>
                            <td className="py-2 px-4 border">{index + 1}</td>
                            <td className="py-2 px-4 border">{ret.client?.name || 'Unknown'}</td>
                            <td className="py-2 px-4 border">{ret.date.slice(0,10)}</td>
                            <td className="py-2 px-4 border">{ret.time}</td>
                            <td className="py-2 px-4 border">{ret.returnAmount}</td>
                            <td className="py-2 px-4 border">{ret.dueAmount}</td>
                            <td className="py-2 px-4 border text-center">
                                <button 
                                    className="text-blue-500 mr-4"
                                    onClick={() => handleViewReturn(ret._id)}
                                >
                                    <FaEye /> View
                                </button>
                                <button
                                    className="text-red-500"
                                    onClick={() => handleDeleteReturn(ret._id)}
                                >
                                    <FaTrashAlt /> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for displaying selected return details */}
            {isModalOpen && selectedReturn && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Return Details">
                    <div className="p-4">
                        <p><strong>Client:</strong> {selectedReturn.client?.name || 'Unknown'}</p>
                        <p><strong>Date:</strong> {selectedReturn.date.slice(0,10)}</p>
                        <p><strong>Time:</strong> {selectedReturn.time}</p>
                        <p><strong>Transport Fare:</strong> {selectedReturn.transportFare}</p>
                        <p><strong>Return Amount:</strong> {selectedReturn.returnAmount}</p>
                        <p><strong>Due Amount:</strong> {selectedReturn.dueAmount}</p>
                        <p><strong>Description:</strong> {selectedReturn.description}</p>
                        <hr className="my-4" />
                        <h3 className="text-lg font-bold mb-2">Returned Products:</h3>
                        <ul>
                            {selectedReturn.products.map((product, index) => (
                                <li key={index}>
                                    <p>Product: {product.product?.productName || 'Unknown'}</p>
                                    <p>Quantity: {product.quantity}</p>
                                    <p>Price: {product.price}</p>
                                    <p>Total: {product.price * product.quantity}</p>
                                    <hr />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-4">
                        <Button onClick={() => setIsModalOpen(false)}>Close</Button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default ReturnList;
