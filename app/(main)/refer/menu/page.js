/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Formik } from 'formik';
import { Card, Metric } from '@tremor/react';
import Cookies from 'js-cookie';
import { KCVLUserAccess, saveUserAccess, withAuth, setLogin} from '../../../api/kcvl'; // Adjust path as per your project structure

const MenuPage = ({ initialUserId }) => {
    const toast = useRef(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searching, setSearching] = useState(false);
    const [isDirty, setIsDirty] = useState(false); // Track if user access data has changed
    const [userNotFound, setUserNotFound] = useState(false); // Track if user does not exist

    useEffect(() => {
        // Load initial user data if available
        if (initialUserId) {
            handleSearchUser(initialUserId);
        }
    }, [initialUserId]);

    const fetchUserDetails = async (UserID) => {
        try {
            const user = await KCVLUserAccess(UserID);
            if (user.data.length > 0) {
                setSelectedUser(user.data[0]);
                setUserNotFound(false);
            } else {
                setSelectedUser(null);
                setUserNotFound(true);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            setUserNotFound(true);
        } finally {
            setSearching(false);
        }
    };

    const handleSearchUser = async (searchTerm) => {
        if (searchTerm.trim() !== '') {
            setSearching(true);
            fetchUserDetails(searchTerm);
        } else {
            alert('Please enter a valid search term');
        }
    };

    const handleCheckboxChange = (key) => {
        setSelectedUser(prevUser => {
            const updatedValue = prevUser[key] === '1' ? '0' : '1'; // Toggle between '0' and '1'

            // Only update if there's a change
            if (updatedValue !== prevUser[key]) {
                setIsDirty(true); // Mark user access data as changed
                return {
                    ...prevUser,
                    [key]: updatedValue,
                };
            }

            return prevUser; // No change, return the previous state
        });
    };

    const actionSaveUser = () => {
        const _paramNEW = {
            UserID: selectedUser.UserID,
            UserName: selectedUser.UserName,
            Department: selectedUser.Department,
            UserLevel: selectedUser.UserLevel,
            MenuHome: selectedUser.MenuHome,
            MenuMonitor0: selectedUser.MenuMonitor0,
            MenuMonitor1: selectedUser.MenuMonitor1,
            MenuMonitor2: selectedUser.MenuMonitor2,
            MenuMonitor3: selectedUser.MenuMonitor3,
            MenuMonitor4: selectedUser.MenuMonitor4,
            MenuWirebreak: selectedUser.MenuWirebreak,
            MenuCordtype: selectedUser.MenuCordtype,
            MenuTwbnwrcp: selectedUser.MenuTwbnwrcp,
            MenuFdtool: selectedUser.MenuFdtool,
            MenuLle: selectedUser.MenuLle,
        };

        console.log('actionSaveUser _paramNEW:', _paramNEW); // Check _paramNEW contents
        handleSaveUserAccess(_paramNEW);
    };

    const handleSaveUserAccess = async (params) => {
        try {
            const updatedUser = await saveUserAccess(params);
            if(selectedUser.UserID === Cookies.get('KCVL_UserID')){
            setLogin(params);
            }

            console.log('Updated user:', updatedUser); // Check the result from saveUserAccess

            // Update selectedUser with the updated data from the backend if necessary
            // setSelectedUser(updatedUser.data[0]);

            // Show success message
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'User access saved successfully.', life: 3000 });

            // Reset dirty flag after successful save
            setIsDirty(false);

        } catch (error) {
            // Handle error case
            console.error('Error saving user access:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to save user access.', life: 3000 });
        }
    };

    const renderUserInfo = () => {
        if (selectedUser) {
            const menuItems = [
                { name: 'Dashboard', key: 'MenuHome' },
                { name: 'Wire Break Rate & Production Monitoring', key: 'MenuMonitor0' },
                { name: 'Cord Type Check Monitoring', key: 'MenuMonitor1' },
                { name: 'TWBN-WRCP Tool Monitoring', key: 'MenuMonitor2' },
                { name: 'FD Tool Monitoring', key: 'MenuMonitor3' },
                { name: 'LLE Monitoring', key: 'MenuMonitor4' },
                { name: 'Wire Break Rate & Production Data', key: 'MenuWirebreak' },
                { name: 'Cord Type Check Data', key: 'MenuCordtype' },
                { name: 'TWBN-WRCP Tool Data', key: 'MenuTwbnwrcp' },
                { name: 'FD Tool Data', key: 'MenuFdtool' },
                { name: 'LLE Data', key: 'MenuLle' },
            ];

            return (
                <div className="container mx-auto">
                    {/* <h1 className="text-3xl font-semibold mb-4">User Information</h1> */}
                    
                    <Card className="mb-4 p-4 shadow-lg bg-blue-50 border border-blue-200">
                        <h2 className="text-2xl font-semibold mb-2 text-blue-600">User Details</h2>
                        <p><strong>User Name:</strong> {selectedUser.UserName}</p>
                        <p><strong>User Level:</strong> {selectedUser.UserLevel}</p>
                        <p><strong>User Department:</strong> {selectedUser.Department}</p>
                    </Card>
        
                    <h2 className="text-2xl font-semibold mb-4">Menu Access</h2>
        
                    <Card className="shadow-lg bg-green-50 border border-green-200">
                        <table className="table-auto w-full">
                            <thead className="bg-green-100">
                                <tr>
                                    <th className="px-4 py-2 text-left text-green-700">Menu Item</th>
                                    <th className="px-4 py-2 text-left text-green-700">Access</th>
                                </tr>
                            </thead>
                            <tbody>
                                {menuItems.map((item) => (
                                    <tr key={item.key} className="bg-white border-b last:border-b-0 hover:bg-green-50">
                                        <td className="border px-4 py-2 text-green-700">{item.name}</td>
                                        <td className="border px-4 py-2 text-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedUser[item.key] === '1'}
                                                onChange={() => handleCheckboxChange(item.key)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
        
                    {isDirty && (
                        <Button
                            label="Save User Access"
                            icon="pi pi-save"
                            className="mt-4 bg-green-500 hover:bg-green-600 text-white"
                            onClick={actionSaveUser}
                        />
                    )}
                </div>
            );
        } else if (userNotFound) {
            return (
                <div className="container mx-auto">
                    {/* <h1 className="text-3xl font-semibold mb-4">User Information</h1> */}
                    <p className="text-red-500">User not found. Please try again.</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="container mx-auto">
            <Toast ref={toast} />
            <div className="col-12 xl:col-12">
                <div className="card">
                    <div className="flex align-items-center justify-content-center">
                        <div className="flex flex-column align-items-center justify-content-center">
                            <div className="w-full surface-card py-8 px-6" style={{ borderRadius: '12px' }}>
                                <div className="text-center mb-5">
                                    <div className="text-900 text-3xl font-medium mb-3">Menu Management</div>
                                    
                                </div>
                                <Formik
                                    initialValues={{ searchTerm: '' }}
                                    onSubmit={(values, { setSubmitting }) => {
                                        setSubmitting(true);
                                        handleSearchUser(values.searchTerm);
                                        setSubmitting(false);
                                    }}
                                >
                                    {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                                        <form onSubmit={handleSubmit}>
                                            <label htmlFor="searchTerm" className="block text-900 font-medium text-xl mb-2">
                                                Search User
                                            </label>
                                            <InputText
                                                id="searchTerm"
                                                name="searchTerm"
                                                value={values.searchTerm}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className="w-full mb-3"
                                                placeholder="Enter User ID"
                                                autoComplete="off"
                                            />
                                            <Button
                                                label={searching ? 'Searching...' : 'Search'}
                                                icon="pi pi-search"
                                                type="submit"
                                                className="w-full p-3 text-xl"
                                                disabled={isSubmitting || searching}
                                            />
                                        </form>
                                    )}
                                </Formik>
                                {renderUserInfo()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withAuth(MenuPage);
