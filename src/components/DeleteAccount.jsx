import React from "react";
import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const DELETE_USER = import.meta.env.VITE_DELETE_USER;

function DeleteAccount() {
    const navigate = useNavigate();



    async function handleDeleteUser() {
        const userId = localStorage.getItem("userId");
        const token = sessionStorage.getItem("session");

        if (!userId) {
            Swal.fire("Error", "User ID not found", "error");
            return;
        }

        if (!token) {
            Swal.fire("Error", "No session token found. Please log in again.", "error");
            return;
        }

        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        });

        if (!confirm.isConfirmed) return;

        try {
            console.log("Deleting user with ID:", userId);
            console.log("Token being sent:", token);

            // Delete user from MongoDB
            const response = await fetch(`${DELETE_USER}/${userId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // Fix here
                },
            });

            const data = await response.json();
            console.log("Response:", data);

            if (!response.ok) throw new Error(data.message || "Failed to delete user from MongoDB");

            // Delete user from Firestore
            await deleteDoc(doc(db, "saveProduct", userId));
            console.log("User deleted from Firestore");

            Swal.fire("Deleted!", "Your account has been deleted.", "success");

            // Clear storage and redirect
            localStorage.clear();
            sessionStorage.clear();
            navigate("/sign-up");
        } catch (error) {
            console.error("Error deleting account:", error);
            Swal.fire("Error", error.message || "Could not delete account", "error");
        }
    }

    return (
        <motion.button
            className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDeleteUser}
        >
            Delete Account
        </motion.button>
    );
}

export default DeleteAccount;
