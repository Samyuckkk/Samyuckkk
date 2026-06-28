import { motion } from "framer-motion";
import "./Loader.css";

function Loader() {
    return (
        <motion.div
            className="loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="circle"
                initial={{ scale: 0 }}
                animate={{ scale: 45 }}
                transition={{
                    delay: 1.5,
                    duration: 1.6,
                    ease: [0.76, 0, 0.24, 1],
                }}
            />

            <motion.div
                className="loader-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                    duration: 0.8,
                }}
            >
                <motion.p
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    Welcome to
                </motion.p>

                <motion.h1
                    initial={{ y: 40 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    MY PORTFOLIO
                </motion.h1>
            </motion.div>
        </motion.div>
    );
}

export default Loader;