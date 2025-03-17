import React from "react";
import { motion } from "framer-motion";
// import video from "../assets/video/AMAZON TRACKING PRODUCT VIDEO.mp4"
function Video() {
    return (
        <motion.div
            className="flex justify-center items-center h-full w-full p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <motion.video
                className="w-full max-w-3xl rounded-lg shadow-xl shadow-black/50 transition-all duration-300 cursor-pointer"
                src={video}
                controls
                loop
                muted
                whileHover={{ scale: 1.05 }}
            />
        </motion.div>
    );
}

export default Video;
