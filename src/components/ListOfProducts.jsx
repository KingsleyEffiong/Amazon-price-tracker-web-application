import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
// import { db } from "../firebase";
import { db } from "../firebase.utiil";
import { doc, getDoc } from "firebase/firestore";
import { useProvider } from "./PostProvider";
import { Box, Button, LinearProgress } from "@mui/material";
import Loader from "../assets/images/Triple intersection.gif"
import CircularProgress from '@mui/material/CircularProgress';
import SwalModal from "../ui/SwalModal";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
function ListOfProducts() {
    const [data, setData] = useState([]);
    const { dispatch } = useProvider();
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [linearLoading, setLinearLoading] = useState(false)
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => (prev >= 100 ? 100 : prev + 10));
        }, 500);

        setTimeout(() => {
            setLoading(false);
            clearInterval(interval);
        }, 5000); // Simulates a 5-second loading process

        return () => clearInterval(interval);
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            const userId = localStorage.getItem("userId");

            if (!userId) return;
            setLoading(true);
            try {
                const userRef = doc(db, "saveProduct", userId);
                const userSnapshot = await getDoc(userRef);

                if (userSnapshot.exists()) {
                    const userData = userSnapshot.data();
                    setData(userData.products || []);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setMessage(error.message);
                if (error.message.includes('Failed to get document because the client is offline.')) {
                    Swal.fire({
                        title: 'Poor or no internet connection, please check your internet connection and refresh the page',
                        icon: "error",
                        draggable: true
                    });
                }
                else {
                    Swal.fire({
                        title: error.message,
                        icon: "error",
                        draggable: true
                    });
                }
            }
            finally {
                setLoading(false)
            }
        };

        fetchData();
    }, []);

    async function handleShowChart(url) {
        const userId = localStorage.getItem("userId");
        if (!userId) return;
        setLinearLoading(true)
        try {
            const userRef = doc(db, "saveProduct", userId);
            const userSnapshot = await getDoc(userRef);

            if (userSnapshot.exists()) {
                const userData = userSnapshot.data();
                const product = userData.products.find((item) => item.url === url);

                if (product?.priceHistory) {
                    dispatch({ type: "CHARTDATA", chart: product.priceHistory });
                    dispatch({ type: "url", url });
                    dispatch({ type: "CHARTMODAL", modal: true });
                } else {
                    // alert("No available chart for this product");
                    Swal.fire({
                        title: 'No available chart for this product',
                        icon: "warning",
                        draggable: true
                    });
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setMessage(error.message);
            Swal.fire({
                title: error.message,
                icon: "error",
                draggable: true
            });

        } finally {
            setLinearLoading(false)
        }
    }

    if (linearLoading)
        return (
            <Box sx={{ width: '100%', position: "fixed", top: 0, left: 0 }}>
                <LinearProgress sx={{ backgroundColor: "white", "& .MuiLinearProgress-bar": { backgroundColor: "#16A085" } }} />
            </Box>
        );

    if (loading)
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-gray-900">
                <CircularProgress
                    variant="determinate"
                    value={progress}
                    size={60}
                    thickness={5}
                    sx={{ color: "#3B82F6" }} // Custom color (blue-500)
                />
                <p className="text-xl text-white mt-3">{progress}%</p>
            </div>
        );

    if (data.length === 0)
        return (
            <div className="m-auto">
                <p>No product found. Please save the price of the product you want to track.</p>
                <a href="https://www.amazon.com" className="underline" target="_blank" rel="noopener noreferrer">
                    Visit Amazon.com
                </a>
                <p>and save a product for tracking.</p>
            </div>
        )

    return (
        <div className="min-h-screen flex flex-col items-center px-1py-12">
            <h2 className="text-lg font-bold text-center text-white mb-8">Your Tracked Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8 w-full">
                {data.map((product, index) => (
                    <motion.div
                        key={index}
                        className="relative backdrop-blur-lg w-full bg-opacity-70 shadow-lg shadow-[#141518] rounded-2xl p-4 overflow-hidden"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="relative overflow-hidden rounded-lg">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-48 object-cover rounded-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
                            />
                        </div>
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-white truncate">{product.title}</h3>
                            <div className="flex flex-col">

                                <p className="text-sm font-semibold text-white truncate">Amazon Price: {product.priceSymbol
                                }{product.price}.{product.pricePercentage}</p>
                                <p className="text-sm font-semibold text-white truncate">Your estimated budget: {product.priceSymbol
                                }{product.userPrice}.00</p>
                            </div>
                        </div>
                        <div className="flex justify-center mt-4">
                            <motion.button
                                onClick={() => handleShowChart(product.url)}
                                className="bg-[#16A085] text-black font-bold py-2 px-5 rounded-lg shadow-md transition-all duration-300 cursor-pointer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Show Chart
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default ListOfProducts;
