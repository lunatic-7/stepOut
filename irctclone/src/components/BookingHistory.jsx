import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { motion } from 'framer-motion';

const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookingHistory = async () => {
            try {
                const response = await axios.get('/booking_history/');
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching booking history:', error);
            }
        };

        fetchBookingHistory();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div 
                className="max-w-3xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600">
                    <h2 className="text-2xl font-bold text-white">Booking History</h2>
                </div>
                <div className="p-6">
                    {bookings.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {bookings.map((booking, index) => (
                                <motion.li 
                                    key={booking.id} 
                                    className="py-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <div className="space-y-2">
                                        <p className="text-lg font-semibold text-indigo-600">Booking ID: {booking.id}</p>
                                        <p className="text-gray-600"><span className="font-medium">Train:</span> {booking.train.name} ({booking.train.train_number})</p>
                                        <p className="text-gray-600"><span className="font-medium">Route:</span> {booking.train.departure_station} to {booking.train.arrival_station}</p>
                                        <p className="text-gray-600"><span className="font-medium">Departure:</span> {booking.train.departure_time} on {booking.train.date}</p>
                                        <p className="text-gray-600"><span className="font-medium">Arrival:</span> {booking.train.arrival_time}</p>
                                        <p className="text-gray-600"><span className="font-medium">Seats:</span> {booking.seat_numbers.join(', ')}</p>
                                        
                                        <div className="mt-4">
                                            <h3 className="text-lg font-semibold text-gray-900">Passengers</h3>
                                            <ul className="mt-2 divide-y divide-gray-200">
                                                {booking.passengers.map((passenger, pIndex) => (
                                                    <li key={pIndex} className="py-2">
                                                        <p className="text-sm text-gray-600">{passenger.name} - {passenger.age} years, {passenger.gender}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </motion.li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600 text-center py-4">No booking history available.</p>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default BookingHistory;