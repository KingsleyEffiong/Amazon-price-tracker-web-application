import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { Box, LinearProgress } from '@mui/material';

function Notification() {
    const [notifications, setNotifications] = useState([]);
    const [linearLoading, setLinearLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                console.warn("⚠️ No userId found in localStorage.");
                return;
            }

            setLinearLoading(true);
            try {
                const userRef = doc(db, "saveProduct", userId);
                const userSnapshot = await getDoc(userRef);

                if (userSnapshot.exists()) {
                    const userData = userSnapshot.data();
                    const notifications = userData.notifications?.map(noti => ({
                        ...noti,
                        timestamp: noti.timestamp?.seconds ? noti.timestamp.seconds * 1000 : null, // Convert Firestore timestamp
                    })) || [];

                    setNotifications(notifications);
                }
            } catch (error) {
                console.error("❌ Error fetching notifications:", error);
            } finally {
                setLinearLoading(false);
            }
        };

        fetchData();
    }, []);

    if (linearLoading)
        return (
            <Box sx={{ width: '100%', position: "fixed", top: 0, left: 0 }}>
                <LinearProgress sx={{ backgroundColor: "white", "& .MuiLinearProgress-bar": { backgroundColor: "#16A085" } }} />
            </Box>
        );

    if (notifications.length === 0)
        return (
            <p className="text-center text-gray-600">No new notifications found.</p>
        );

    return (
        <div className="w-[97%] mx-auto h-screen overflow-auto px-2 py-1.5">
            <h2 className="text-xl font-semibold text-amber-50 mb-4">🔔 Notifications</h2>
            <div className="space-y-4">
                <AnimatePresence>
                    {notifications
                        .filter((noti) => noti.timestamp) // Ensure valid timestamps
                        .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)) // Sort by newest first
                        .map((notification, index) => (
                            <motion.div
                                key={notification.timestamp || index}
                                className="p-4 bg-white shadow-lg rounded-lg border-l-4 border-[#16A085] cursor-pointer transition-all"
                            >
                                <h3>{notification.title}</h3>
                                <p className="text-gray-600">{notification.message}</p>
                                <small className="text-gray-400">
                                    {notification.timestamp
                                        ? new Date(notification.timestamp).toLocaleString()
                                        : "Timestamp not available"}
                                </small>
                            </motion.div>
                        ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default Notification;
