import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SearchResults = () => {
    const location = useLocation();
    const { searchResults } = location.state || { searchResults: [] };
    const navigate = useNavigate();

    const handleBookNow = (train) => {
        navigate('/book-ticket', { state: { train } });
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <header className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                        Search Results
                    </h1>
                    <Link to="/" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                        Back to Search
                    </Link>
                </div>
            </header>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {searchResults.length > 0 ? (
                    <motion.div 
                        className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {searchResults.map((train, index) => (
                            <motion.div 
                                key={index} 
                                className="bg-white shadow-lg rounded-lg overflow-hidden"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="p-6">
                                    <h2 className="text-xl font-bold mb-2 text-indigo-600">{train.name} ({train.train_number})</h2>
                                    <p className="mb-2"><span className="font-semibold">From:</span> {train.departure_station}</p>
                                    <p className="mb-2"><span className="font-semibold">To:</span> {train.arrival_station}</p>
                                    <p className="mb-2"><span className="font-semibold">Date:</span> {train.date}</p>
                                    <p className="mb-2"><span className="font-semibold">Departure:</span> {train.departure_time}</p>
                                    <p className="mb-2"><span className="font-semibold">Arrival:</span> {train.arrival_time}</p>
                                    <p className="mb-4"><span className="font-semibold">Seats Available:</span> {train.seat_availability}</p>
                                    {train.seat_availability > 0 ? (
                                        <motion.button
                                            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                                            onClick={() => handleBookNow(train)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Book Now
                                        </motion.button>
                                    ) : (
                                        <p className="text-red-500 font-bold text-center">Train Full</p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.p 
                        className="text-center text-white text-lg mt-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        No trains found for the selected route and date.
                    </motion.p>
                )}
            </main>
        </div>
    );
};

export default SearchResults;