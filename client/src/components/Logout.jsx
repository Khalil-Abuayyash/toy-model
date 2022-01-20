import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { navigate } from '@reach/router';

// logout should render nothing, just logging out using useEffect

const Logout = () => {

    const logout = () => {
        const response = axiosInstance.post('user/logout/blacklist/', {
			refresh_token: localStorage.getItem('refresh_token'),
		});
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		axiosInstance.defaults.headers['Authorization'] = null;
		navigate('/login');
    }

    return (
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Logout
