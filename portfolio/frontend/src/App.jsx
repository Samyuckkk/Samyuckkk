import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Loader from "./components/Loader/Loader";

import "./index.css";

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3200);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <AnimatePresence mode="wait">
                {loading && <Loader />}
            </AnimatePresence>

            <motion.div
                className="hero"
                initial={{ opacity: 0 }}
                animate={{
                    opacity: loading ? 0 : 1,
                }}
                transition={{
                    duration: 1,
                    delay: 0.3,
                }}
            >
                <h1>Hero Section</h1>
            </motion.div>
        </>
    );
}

export default App;