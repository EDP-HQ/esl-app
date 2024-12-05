'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faSave, faTimes, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Card, Metric } from '@tremor/react';
import { KCVLUserAccess, KCVLUserList, KCVLModifyUserList, KCVLDeleteUser } from '../../../api/kcvl'; // Adjust path as per your project structure
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

const UserPage = () => {
    const toast = useRef(null);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formMode, setFormMode] = useState('add'); // Mode 'add' or 'edit'
    const [formData, setFormData] = useState({
        UserID: '',
        UserName: '',
        Department: '',
        UserLevel: '',
        UserPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);

    // Fetch user data from API
    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const userList = await KCVLUserList();
            setUsers(userList);
        } catch (error) {
            console.error('Error fetching users:', error.response ? error.response.data : error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Function to handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Function to handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        const isExistingUser = users.some((user) => user.UserID === formData.UserID);
    
        try {
            if (formMode === 'add') {
                if (isExistingUser) {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'User ID already exists.', life: 3000 });
                } else {
                    await KCVLModifyUserList(formData);
                    toast.current.show({ severity: 'success', summary: 'Success', detail: 'User added successfully.', life: 3000 });
                }
            } else if (formMode === 'edit') {
                await KCVLModifyUserList(formData);
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'User updated successfully.', life: 3000 });
            }
    
            setShowForm(false);
            setFormData({
                UserID: '',
                UserName: '',
                Department: '',
                UserLevel: '',
                UserPassword: '',
            });
            fetchUsers();
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to save user.', life: 3000 });
        }
    };
    
    // Function to handle editing a user
    const handleEditUser = (user) => {
        if (user.UserLevel === '1') {
            toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Admin users cannot be edited.', life: 3000 });
        } else {
            setFormMode('edit');
            setFormData(user);
            setShowForm(true);
        }
    };
    

// Function to handle deleting a user
// Function to handle deleting a user
const handleDeleteUser = async () => {
    try {
        // Fetch user details to delete
        const userToDelete = await KCVLUserAccess(deleteUserId);

        // Log userToDelete for debugging
        //console.log('User to delete:', userToDelete.data[0].UserLevel);

        // Check if the user is an admin
        if (userToDelete.data[0].UserLevel === '1') {
            toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Admin users cannot be deleted.', life: 3000 });
            setDeleteConfirmation(false); // Close the confirmation dialog
            return;
        } else {
            // Proceed with deletion if not an admin
            await KCVLDeleteUser({ UserID: deleteUserId });
            fetchUsers();
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'User deleted successfully.', life: 3000 });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error deleting user.', life: 3000 });
    } finally {
        setDeleteConfirmation(false); // Close the confirmation dialog
    }
};

    // Toggle Add User form
    const toggleAddForm = () => {
        setFormMode('add');
        setFormData({
            UserID: '',
            UserName: '',
            Department: '',
            UserLevel: '',
            UserPassword: '',
        });
        setShowForm(!showForm);
    };

    // Function to confirm and delete user
    const confirmDeleteUser = (userId) => {
        setDeleteUserId(userId);
        setDeleteConfirmation(true);
    };

    return (
        <>
            <Card className="mx-auto" decoration="top" decorationColor="lime">
                <Metric>USER MANAGEMENT</Metric>
                <div className="mt-4 flex items-center space-x-4">
                    <button
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 flex items-center"
                        onClick={toggleAddForm}
                    >
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Add User
                    </button>
                </div>
                {showForm && (
                    <form className="mt-4 space-y-4" onSubmit={handleFormSubmit}>
                        <div className="flex space-x-4">
                            <input
                                type="text"
                                name="UserID"
                                value={formData.UserID}
                                onChange={handleInputChange}
                                placeholder="User ID"
                                className="border p-2 rounded w-full"
                                required
                                disabled={formMode === 'edit'} // Disable UserID field in edit mode
                            />
                            <input
                                type="text"
                                name="UserName"
                                value={formData.UserName}
                                onChange={handleInputChange}
                                placeholder="User Name"
                                className="border p-2 rounded w-full"
                                required
                            />
                            <input
                                type="text"
                                name="Department"
                                value={formData.Department}
                                onChange={handleInputChange}
                                placeholder="Department"
                                className="border p-2 rounded w-full"
                                required
                            />
                            <select
                                name="UserLevel"
                                value={formData.UserLevel}
                                onChange={handleInputChange}
                                className="border p-2 rounded w-full"
                                required
                            >
                                <option value="" disabled>
                                    Select Level
                                </option>
                                <option value="1">Admin</option>
                                <option value="0">User</option>
                            </select>
                            <div className="relative w-full">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="UserPassword"
                                    value={formData.UserPassword}
                                    onChange={handleInputChange}
                                    placeholder="Password"
                                    className="border p-2 rounded w-full pr-10"
                                    required
                                />
                                <span
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </span>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center"
                            >
                                <FontAwesomeIcon icon={faSave} className="mr-2" />
                                Save
                            </button>
                            <button
                                type="button"
                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 flex items-center"
                                onClick={() => setShowForm(false)}
                            >
                                <FontAwesomeIcon icon={faTimes} className="mr-2" />
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
                <div className="mt-4">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">User ID</th>
                                <th className="py-2 px-4 border-b">User Name</th>
                                <th className="py-2 px-4 border-b">Department</th>
                                <th className="py-2 px-4 border-b">Level</th>
                                <th className="py-2 px-4 border-b">Password</th>
                                <th className="py-2 px-4 border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">
                                        Loading...
                                    </td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.UserID}>
                                        <td className="py-2 px-4 border-b">{user.UserID}</td>
                                        <td className="py-2 px-4 border-b">{user.UserName}</td>
                                        <td className="py-2 px-4 border-b">{user.Department}</td>
                                        <td className="py-2 px-4 border-b">{user.UserLevel === '1' ? 'Admin' : 'User'}</td>
                                        <td className="py-2 px-4 border-b">{user.UserPassword}</td>
                                        <td className="py-2 px-4 border-b">
                                            <FontAwesomeIcon
                                                icon={faEdit}
                                                className="cursor-pointer text-blue-500"
                                                onClick={() => handleEditUser(user)}
                                            />
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                                className="cursor-pointer text-red-500 ml-2"
                                                onClick={() => confirmDeleteUser(user.UserID)}
                                            />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <Dialog
                    visible={deleteConfirmation}
                    style={{ width: '450px' }}
                    header="Confirm Delete"
                    modal
                    footer={
                        <>
                            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteConfirmation(false)} />
                            <Button
                                label="Delete"
                                icon="pi pi-check"
                                className="p-button-text"
                                onClick={handleDeleteUser}
                            />
                        </>
                    }
                    onHide={() => setDeleteConfirmation(false)}
                >
                    <div className="confirmation-content">
                        <p>Are you sure you want to delete this user?</p>
                    </div>
                </Dialog>
                <Toast ref={toast} />
            </Card>
        </>
    );
};

export default UserPage;
