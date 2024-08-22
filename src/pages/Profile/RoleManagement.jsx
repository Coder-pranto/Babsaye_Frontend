import { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
// import { fetchRoles, addRole, updateRole, deleteRole } from '../../services/api'; 
import Modal from '../../components/Modal';
import FormInput from '../../components/FormInputs/FormInput';
import useFormInput from '../../hooks/useFormInput';

const Role = () => {
    const [roles, setRoles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentRole, setCurrentRole] = useState(null);
    const roleName = useFormInput('');

    // Fetch roles data when the component mounts
    useEffect(() => {
        const fetchAllRoles = async () => {
            try {
                const res = {};
                // const res = await fetchRoles();
                setRoles(res.data.data);
            } catch (error) {
                console.error('Failed to fetch roles:', error.message);
            }
        };

        fetchAllRoles();
    }, []);

    const handleAddRole = async () => {
        try {
            const res = {};
            // const res = await addRole({ name: roleName.value });
            setRoles([...roles, res.data.data]);
            toast.success('Role added successfully');
            setIsModalOpen(false);
        } catch (error) {
            toast.error('Failed to add role');
        }
    };

    const handleEditRole = async () => {
        try {
            const res = {};
            // const res = await updateRole(currentRole._id, { name: roleName.value });
            const updatedRoles = roles.map(role => 
                role._id === currentRole._id ? res.data.data : role
            );
            setRoles(updatedRoles);
            toast.success('Role updated successfully');
            setIsModalOpen(false);
            setIsEditing(false);
        } catch (error) {
            toast.error('Failed to update role');
        }
    };

    const handleDeleteRole = async (roleId) => {
        try {
            await {}
            // await deleteRole(roleId);
            const filteredRoles = roles.filter(role => role._id !== roleId);
            setRoles(filteredRoles);
            toast.success('Role deleted successfully');
        } catch (error) {
            toast.error('Failed to delete role');
        }
    };

    const openAddRoleModal = () => {
        // setRoleName('');
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const openEditRoleModal = (role) => {
        // setRoleName(role.name);
        setCurrentRole(role);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    return (
        <div className="bg-white rounded shadow-lg w-full max-w-6xl mx-auto mt-12">
            <div className="h-16 flex justify-between items-center text-2xl font-bold bg-[#5D5B10] text-white px-8">
                <span>Role Management</span>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded flex items-center"
                    onClick={openAddRoleModal}
                >
                    <FaPlus className="mr-2" /> Add Role
                </button>
            </div>
            <div className="p-8">
                {roles.length > 0 ? (
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2">Role Name</th>
                                <th className="px-4 py-2 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map((role) => (
                                <tr key={role._id} className="border-b">
                                    <td className="px-4 py-2">{role.name}</td>
                                    <td className="px-4 py-2 text-right space-x-4">
                                        <button
                                            className="text-yellow-500 hover:text-yellow-700"
                                            onClick={() => openEditRoleModal(role)}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => handleDeleteRole(role._id)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No roles found. Start by adding a new role.</p>
                )}
            </div>

            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <div className="p-6">
                        <h2 className="text-xl font-bold mb-4">
                            {isEditing ? 'Edit Role' : 'Add Role'}
                        </h2>
                        <FormInput label="Role Name" {...roleName} />
                        <div className="mt-6 text-right">
                            <button
                                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded mr-2"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                                onClick={isEditing ? handleEditRole : handleAddRole}
                            >
                                {isEditing ? 'Update Role' : 'Add Role'}
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Role;
