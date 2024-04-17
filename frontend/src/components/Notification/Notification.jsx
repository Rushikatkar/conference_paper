import React, { useState, useEffect } from 'react';

const Notification = ({ message, bgColor, textColor }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000); // Hide notification after 3 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md shadow-md ${isVisible ? 'block' : 'hidden'}`} style={{ backgroundColor: bgColor, color: textColor }}>
            {message}
        </div>
    );
};

export default Notification;
