import React, { useEffect, useState } from "react";

const SplashScreen = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShow(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex items-center justify-center h-screen bg-white text-center overflow-hidden">
            <h1
                className={`text-5xl font-bold text-black mb-2 transition-all duration-1000 ease-out ${show
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-5 scale-95"
                    }`}
            >
                ChatBoX
            </h1>
        </div>
    );
};

export default SplashScreen;