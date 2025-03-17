import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useProvider } from "./PostProvider";

const ChartProduct = () => {
    const { chartData } = useProvider();

    // Process chart data
    const processedData = useMemo(() => {
        if (!chartData || !Array.isArray(chartData)) return [];

        return chartData.map(item => ({
            shortDate: new Date(item.timestamp).toLocaleString("en-US", {
                day: "2-digit", month: "short"
            }), // Example: "01 Jan"
            fullDate: new Date(item.timestamp).toLocaleString("en-US", {
                day: "2-digit", month: "short", year: "numeric",
                hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true
            }), // Example: "01 Jan 2024, 12:30:45 PM"
            price: item.price || 0, // Ensure price exists
        }));
    }, [chartData]);

    // Custom Tooltip Component
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-gray-800 text-white p-2 rounded-md shadow-md">
                    <p className="text-sm">{payload[0].payload.fullDate}</p> {/* Full Date & Time */}
                    <p className="text-lg font-semibold">Price: ${payload[0].value}</p>
                </div>
            );
        }
        return null;
    };

    // Fade-in effect
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        setTimeout(() => setIsVisible(true), 300);
    }, []);

    return (
        <motion.div
            className="bg-[#191c24] p-4 rounded-lg shadow-lg overflow-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={processedData} width={600}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="shortDate" stroke="#ddd" className="text-xs" /> {/* Shows only "01 Jan" */}
                    <YAxis stroke="#ddd" />
                    <Tooltip content={<CustomTooltip />} /> {/* Custom Tooltip */}
                    <Line type="monotone" dataKey="price" stroke="#00c3ff" strokeWidth={3} dot={{ r: 6, fill: "#00c3ff" }} />
                </LineChart>
            </ResponsiveContainer>
        </motion.div>
    );
};

export default ChartProduct;
