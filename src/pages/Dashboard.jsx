import React, { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Modal from '../ui/Modal';
import { Outlet, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useProvider } from '../components/PostProvider';

const USER_URL = import.meta.env.VITE_USER_PROFILE;



function Dashboard({ username }) {
    const navigate = useNavigate();
    const { fectchUsername, dispatch } = useProvider()
    const checkTokenExpiration = () => {
        const token = sessionStorage.getItem("session");
        if (!token) {
            navigate('/login'); // 🔥 Redirect if no token
            return true;
        }

        try {
            // Decode token (JWT is Base64 encoded)
            const payload = JSON.parse(atob(token.split(".")[1]));
            const expirationTime = payload.exp * 1000; // Convert to milliseconds
            const currentTime = Date.now();

            if (currentTime >= expirationTime) {
                sessionStorage.removeItem("session");
                localStorage.removeItem("userId");

                Swal.fire({
                    title: 'Session Expired! Please log in again',
                    icon: 'error',
                    confirmButtonText: 'Continue'
                }).then(result => {
                    if (result.isConfirmed) {
                        navigate('/login');
                    }
                });
                return true;
            }
            return false;
        } catch (error) {
            sessionStorage.removeItem("session");
            localStorage.removeItem("userId");

            Swal.fire({
                title: 'Invalid session. Please log in again.',
                icon: 'error',
                confirmButtonText: 'Continue'
            }).then(result => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
            return true;
        }
    };

    const fetchUser = async () => {
        const token = sessionStorage.getItem("session");
        const userId = localStorage.getItem("userId");

        try {
            const response = await fetch(`${USER_URL}/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                navigate('/login');
                throw new Error(`Failed to fetch user: ${response.status}`);
            }

            const data = await response.json();
            username = data.data.username
            dispatch({ type: "fectchUsername", fectchUsername: username });
        } catch (error) {
            console.error("User Fetch Error:", error);
        }
    };

    useEffect(() => {
        if (checkTokenExpiration()) return; // 🔥 Prevent fetching if session expired
        fetchUser();
    }, []);

    return (
        <div className='w-full h-screen flex gap-2.5' style={{ backgroundColor: "var(--background-color)" }}>
            <Sidebar />
            <Outlet />
            <Modal />
        </div>
    );
}

export default Dashboard;
