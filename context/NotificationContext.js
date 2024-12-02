"use client";

import React, { createContext, useState, useContext } from 'react';


const NotificationContext = createContext({
    notifications: [],
    addNotification: () => {},
    removeNotification: () => {}
});

export const useNotificationContext = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);


    const addNotification = (message, type = 'info') => {
        setNotifications(prev => [...prev, { message, type }]);
    };


    const removeNotification = (index) => {
        setNotifications(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
            {children}
            {}
            <div className="notification-container">
                {notifications.map((notification, index) => (
                    <div key={index} className={`notification ${notification.type}`}>
                        <p>{notification.message}</p>
                        <button onClick={() => removeNotification(index)}>✖</button>
                    </div>
                ))}
            </div>
        </NotificationContext.Provider>
    );
};
