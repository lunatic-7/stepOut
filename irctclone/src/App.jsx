import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainPage from './components/MainPage';
import Signup from './components/Signup';
import Login from './components/Login';
import SearchResults from './components/SearchResults';
import AdminPage from './components/AdminPage';
import BookTicket from './components/BookTicket';
import BookingDetails from './components/BookingDetails'
import BookingHistory from './components/BookingHistory';
import axios from './api/axios';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        axios.get('/set-csrf/')
            .then(response => console.log('CSRF token set'))
            .catch(error => console.error('Error setting CSRF token:', error));
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage isAuthenticated={isAuthenticated} onLogout={handleLogout} />} />
                <Route path="/search-results" element={<SearchResults />} />
                <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup onSignup={handleLogin} />} />
                <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
                <Route path="/admin/add-train" element={isAuthenticated ? <AdminPage /> : <Navigate to="/login" />} />
                <Route path="/book-ticket" element={isAuthenticated ? <BookTicket /> : <Navigate to="/login" />} />
                <Route path="/booking-details" element={isAuthenticated ? <BookingDetails /> : <Navigate to="/login" />} />
                <Route path="/booking-history" element={isAuthenticated ? <BookingHistory /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
