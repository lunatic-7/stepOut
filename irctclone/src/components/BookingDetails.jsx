import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const BookingDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { bookingDetails } = location.state || {};
    const booking_details = bookingDetails?.booking_details;
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    console.log('Booking Details:', booking_details);

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center justify-center p-4">
            <motion.div
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                variants={containerVariants}
            >
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Booking Details</h2>
                {booking_details ? (
                    <div className="space-y-4">
                        <motion.div className="bg-blue-50 p-4 rounded-md" variants={itemVariants}>
                            <p><strong>Booking ID:</strong> {booking_details.id}</p>
                            <p><strong>Train:</strong> {booking_details.train.name} ({booking_details.train.train_number})</p>
                        </motion.div>
                        <motion.div className="bg-purple-50 p-4 rounded-md" variants={itemVariants}>
                            <p><strong>Departure:</strong> {booking_details.train.departure_station} at {booking_details.train.departure_time}</p>
                            <p><strong>Arrival:</strong> {booking_details.train.arrival_station} at {booking_details.train.arrival_time}</p>
                        </motion.div>
                        <motion.div className="bg-green-50 p-4 rounded-md" variants={itemVariants}>
                            <p><strong>Date:</strong> {booking_details.train.date}</p>
                            <p><strong>Seats:</strong> {booking_details.seat_numbers.join(', ')}</p>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <h3 className="text-2xl font-bold mt-6 mb-4 text-purple-600">Passengers</h3>
                            {booking_details.passengers.map((passenger, index) => (
                                <motion.div 
                                    key={index} 
                                    className="bg-yellow-50 p-4 rounded-md mb-2"
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <p><strong>Name:</strong> {passenger.name}</p>
                                    <p><strong>Age:</strong> {passenger.age}</p>
                                    <p><strong>Gender:</strong> {passenger.gender}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                ) : (
                    <p className="text-red-500 text-center">No booking details available.</p>
                )}
                <motion.button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6 w-full transition-colors duration-300 ease-in-out"
                    onClick={() => navigate('/')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Go to MainPage
                </motion.button>
            </motion.div>
        </div>
    );
};

export default BookingDetails;