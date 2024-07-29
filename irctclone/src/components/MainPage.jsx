import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const MainPage = ({ isAuthenticated, onLogout }) => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');
    const [stations, setStations] = useState([]);
    const [filteredFromStations, setFilteredFromStations] = useState([]);
    const [filteredToStations, setFilteredToStations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStations = async () => {
            try {
                const response = await axios.get(`/stations/`);
                setStations(response.data);
            } catch (error) {
                console.error('Error fetching stations:', error);
            }
        };

        fetchStations();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`/search/`, {
                params: { from, to, date }
            });
            navigate('/search-results', { state: { searchResults: response.data } });
        } catch (error) {
            console.error('Error searching for trains:', error);
        }
    };

    const handleFromChange = (e) => {
        const input = e.target.value;
        setFrom(input);
        if (input) {
            setFilteredFromStations(stations.filter(station => station.toLowerCase().includes(input.toLowerCase())));
        } else {
            setFilteredFromStations([]);
        }
    };

    const handleToChange = (e) => {
        const input = e.target.value;
        setTo(input);
        if (input) {
            setFilteredToStations(stations.filter(station => station.toLowerCase().includes(input.toLowerCase())));
        } else {
            setFilteredToStations([]);
        }
    };

    const handleFromSelect = (station) => {
        setFrom(station);
        setFilteredFromStations([]);
    };

    const handleToSelect = (station) => {
        setTo(station);
        setFilteredToStations([]);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token
        localStorage.removeItem('user_id');
        onLogout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
            <header className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <motion.h1
                        className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Train Ticket Booking
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {isAuthenticated ? (
                            <div className="space-x-2">
                                <button
                                    onClick={handleLogout}
                                    className="btn-primary bg-red-500 hover:bg-red-600"
                                >
                                    Logout
                                </button>
                                <Link to="/admin/add-train" className="btn-primary bg-green-500 hover:bg-green-600">
                                    Add Train
                                </Link>
                                <Link to="/booking-history" className="btn-primary bg-blue-500 hover:bg-blue-600">
                                    Booking History
                                </Link>
                            </div>
                        ) : (
                            <div className="space-x-2">
                                <Link to="/login" className="btn-primary bg-blue-500 hover:bg-blue-600">
                                    Login
                                </Link>
                                <Link to="/signup" className="btn-primary bg-green-500 hover:bg-green-600">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <motion.div
                    className="max-w-md mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <form onSubmit={handleSearch} className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="from">
                                From
                            </label>
                            <input
                                className="input-field"
                                id="from"
                                type="text"
                                placeholder="Departure Station"
                                value={from}
                                onChange={handleFromChange}
                                required
                            />
                            {filteredFromStations.length > 0 && (
                                <ul className="dropdown-list">
                                    {filteredFromStations.map((station, index) => (
                                        <li
                                            key={index}
                                            className="dropdown-item"
                                            onClick={() => handleFromSelect(station)}
                                        >
                                            {station}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="to">
                                To
                            </label>
                            <input
                                className="input-field"
                                id="to"
                                type="text"
                                placeholder="Arrival Station"
                                value={to}
                                onChange={handleToChange}
                                required
                            />
                            {filteredToStations.length > 0 && (
                                <ul className="dropdown-list">
                                    {filteredToStations.map((station, index) => (
                                        <li
                                            key={index}
                                            className="dropdown-item"
                                            onClick={() => handleToSelect(station)}
                                        >
                                            {station}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                                Date
                            </label>
                            <input
                                className="input-field"
                                id="date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <motion.button
                                className="btn-primary bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                                type="submit"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Search Trains
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </main>
        </div>
    );
};

export default MainPage;
