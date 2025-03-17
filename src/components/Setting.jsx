import React, { useState } from "react";
import { motion } from "framer-motion";
import ConnectedDevices from "./connectedDevice/ConnectedDevices";
import UserUpdate from "./updateUserProfile/UserUpdate";
import Logout from "./Logout";
import DeleteAccount from "./DeleteAccount";
import GetAPIKEY from "./GetAPIKEY";

function Setting() {
    const [currency, setCurrency] = useState("USD");

    return (
        <motion.div
            className="w-full h-full p-6 overflow-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <motion.h2
                className="text-3xl font-semibold text-white mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                ⚙️ Settings
            </motion.h2>

            <motion.div
                className="max-w-full w-full mx-auto bg-white shadow-lg rounded-lg p-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                {/* Account Management */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <h3 className="text-2xl font-bold text-gray-700 mb-4">Account Management</h3>
                    <UserUpdate />
                    {/* Connected Devices */}
                    <ConnectedDevices />
                    <GetAPIKEY />


                    {/* Logout & Delete Account */}
                    <div className="flex justify-between">
                        <Logout />

                        <DeleteAccount />
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default Setting;
