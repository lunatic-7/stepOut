import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { motion } from 'framer-motion';

const BookTicket = () => {
    const location = useLocation();
    const { train } = location.state || {};
    const [passengers, setPassengers] = useState([{ name: '', age: '', gender: '' }]);
    const navigate = useNavigate();

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const newPassengers = [...passengers];
        newPassengers[index][name] = value;
        setPassengers(newPassengers);
    };

    const addPassenger = () => {
        if (passengers.length < 6) {
            setPassengers([...passengers, { name: '', age: '', gender: '' }]);
        }
    };

    const removePassenger = (index) => {
        const newPassengers = passengers.filter((_, i) => i !== index);
        setPassengers(newPassengers);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/book_ticket/', {
                train_id: train.train_number,
                user_id: localStorage.getItem('user_id'),
                no_of_seats: passengers.length,
                passengers: passengers
            });
            navigate('/booking-details', { state: { bookingDetails: response.data } });
        } catch (error) {
            console.error('Error booking ticket:', error);
            alert('Failed to book ticket');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                    Book Ticket for {train.name} ({train.train_number})
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {passengers.map((passenger, index) => (
                        <motion.div
                            key={index}
                            className="bg-gray-50 p-4 rounded-lg shadow"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <h3 className="text-lg font-semibold mb-2 text-indigo-600">Passenger {index + 1}</h3>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <input
                                    type="text"
                                    name="name"
                                    value={passenger.name}
                                    onChange={(e) => handleChange(index, e)}
                                    className="input-field"
                                    placeholder="Name"
                                    required
                                />
                                <input
                                    type="number"
                                    name="age"
                                    value={passenger.age}
                                    onChange={(e) => handleChange(index, e)}
                                    className="input-field"
                                    placeholder="Age"
                                    required
                                />
                                <select
                                    name="gender"
                                    value={passenger.gender}
                                    onChange={(e) => handleChange(index, e)}
                                    className="input-field"
                                    required
                                >
                                    <option value="" disabled>Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            {index > 0 && (
                                <motion.button
                                    type="button"
                                    className="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                                    onClick={() => removePassenger(index)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Remove Passenger
                                </motion.button>
                            )}
                        </motion.div>
                    ))}
                    {passengers.length < 6 && (
                        <motion.button
                            type="button"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                            onClick={addPassenger}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Add Passenger
                        </motion.button>
                    )}
                    <motion.button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Book Ticket
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default BookTicket;