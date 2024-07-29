import React, { useState } from 'react';
import axios from '../api/axios';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPage = () => {
    const [trainData, setTrainData] = useState({
        name: '',
        departure_station: '',
        arrival_station: '',
        seat_availability: 0,
        departure_time: '',
        arrival_time: '',
        date: ''
    });

    const handleChange = (e) => {
        setTrainData({ ...trainData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('add_train/', trainData);
            toast.success(response.data.message);
            setTrainData({
                name: '',
                departure_station: '',
                arrival_station: '',
                seat_availability: 0,
                departure_time: '',
                arrival_time: '',
                date: ''
            });
        } catch (error) {
            toast.error('Error adding train');
            console.error(error);
        }
    };

    return (
        <motion.div 
            className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <ToastContainer position="top-right" autoClose={3000} />
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Add New Train</h1>
                </div>
            </header>
            <main className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
                <motion.div 
                    className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <form onSubmit={handleSubmit}>
                        {Object.entries(trainData).map(([key, value], index) => (
                            <motion.div 
                                key={key} 
                                className="mb-4"
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={key}>
                                    {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out hover:border-blue-500"
                                    id={key}
                                    name={key}
                                    type={key === 'date' ? 'date' : key === 'seat_availability' ? 'number' : key.includes('time') ? 'time' : 'text'}
                                    value={value}
                                    onChange={handleChange}
                                    required
                                />
                            </motion.div>
                        ))}
                        <motion.div 
                            className="flex items-center justify-between"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                        >
                            <motion.button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                                type="submit"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Add Train
                            </motion.button>
                        </motion.div>
                    </form>
                </motion.div>
            </main>
        </motion.div>
    );
};

export default AdminPage;