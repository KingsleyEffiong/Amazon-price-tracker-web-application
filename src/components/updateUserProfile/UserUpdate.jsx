import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Ensure navigate is available
import Swal from "sweetalert2"; // Ensure Swal is imported

const UPDATE_USER_PROFILE = import.meta.env.VITE_UPDATE_USER_PROFILE;
const USER_URL = import.meta.env.VITE_USER_PROFILE;

function UserUpdate() {
    const navigate = useNavigate();

    // State variables
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    // Check session expiration
    const checkTokenExpiration = () => {
        const token = sessionStorage.getItem("session");
        if (!token) {
            navigate("/login"); // 🔥 Redirect if no token
            return true;
        }

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const expirationTime = payload.exp * 1000;
            const currentTime = Date.now();

            if (currentTime >= expirationTime) {
                sessionStorage.removeItem("session");
                localStorage.removeItem("userId");

                Swal.fire({
                    title: "Session Expired! Please log in again",
                    icon: "error",
                    confirmButtonText: "Continue",
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/login");
                    }
                });
                return true;
            }
            return false;
        } catch (error) {
            sessionStorage.removeItem("session");
            localStorage.removeItem("userId");

            Swal.fire({
                title: "Invalid session. Please log in again.",
                icon: "error",
                confirmButtonText: "Continue",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login");
                }
            });
            return true;
        }
    };

    // Fetch user data
    const fetchUser = async () => {
        const token = sessionStorage.getItem("session");
        const userId = localStorage.getItem("userId");

        try {
            const response = await fetch(`${USER_URL}/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                navigate("/login");
                throw new Error(`Failed to fetch user: ${response.status}`);
            }

            const data = await response.json();
            setName(data.data.username);
            setEmail(data.data.email);
        } catch (error) {
            console.error("User Fetch Error:", error);
        }
    };

    useEffect(() => {
        if (checkTokenExpiration()) return;
        fetchUser();
    }, []);



    async function updateUserProfile() {
        const token = sessionStorage.getItem("session");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
            console.error("User not authenticated");
            return;
        }

        // 🔥 Validate email format before making the API request
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            Swal.fire({
                title: "Invalid Email!",
                text: "Please enter a valid email address.",
                icon: "warning",
                confirmButtonText: "OK"
            });
            return;
        }

        try {
            const response = await fetch(`${UPDATE_USER_PROFILE}/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    username: name,
                    email: email,
                    password: password
                })
            });

            if (!response.ok) {
                throw new Error(`Failed to update profile: ${response.status}`);
            }

            const data = await response.json();
            console.log("User profile updated:", data);

            Swal.fire({
                title: "Profile Updated!",
                text: "Your changes have been saved.",
                icon: "success",
                confirmButtonText: "OK"
            });

        } catch (error) {
            console.error("Update Error:", error);

            Swal.fire({
                title: "Error!",
                text: "Something went wrong. Please try again.",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    }


    return (
        <div className="mb-6">
            <label className="block text-gray-600 font-medium mb-1">Name</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring focus:ring-[#16A085] outline-none"
            />

            <label className="block text-gray-600 font-medium mt-4 mb-1">Email</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring focus:ring-[#16A085] outline-none"
            />

            <label className="block text-gray-600 font-medium mt-4 mb-1">New Password</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring focus:ring-[#16A085] outline-none"
            />

            <motion.button
                onClick={updateUserProfile} // 🔥 Call function on click
                className="mt-4 bg-[#16A085] text-white px-4 py-2 rounded-md hover:bg-[#12876F] transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Save Changes
            </motion.button>

        </div>
    );
}

export default UserUpdate;
