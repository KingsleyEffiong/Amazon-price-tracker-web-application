import React from 'react'
import { motion } from "framer-motion";
function Logout() {
    const handleLogout = () => {
        sessionStorage.removeItem("session"); // Remove token
        localStorage.removeItem("userId"); // Remove user ID
        window.location.href = "/login"; // Redirect to login page
    };

    return (
        <motion.button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
        >
            Logout
        </motion.button>
    )
}

export default Logout