import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import SegmentIcon from '@mui/icons-material/Segment';
import { IconButton } from '@mui/material';

function Sidebar() {
    const [toggle, setToggle] = useState(true);
    const navigate = useNavigate();
    const location = useLocation(); // Get current route

    function handleToggle() {
        setToggle((prev) => !prev);
    }


    const menuItems = [
        { path: '/', icon: <DashboardIcon />, label: 'Dashboard' },
        { path: 'notification', icon: <NotificationsIcon />, label: 'Notification' },
        { path: 'setting', icon: <SettingsIcon />, label: 'Setting' }
    ];

    return (
        <div className="position left-0 top-0">
            <div className={`${toggle ? 'w-[60px]' : 'w-[260px]'} h-full border-r border-r-[#2C2D33] relative`}>
                <IconButton className="fixed top-1.5 left-1 text-[#16A085]" onClick={handleToggle}>
                    <SegmentIcon className="bg-[#16A085] rounded-sm" sx={{ fontSize: 30 }} />
                </IconButton>

                <ul className="flex flex-col justify-center gap-10 items-start mt-32">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path; // Check if it's the active route
                        return (
                            <li
                                key={item.path}
                                className={`flex gap-3 items-center px-3 py-7 rounded-l cursor-pointer shadow-lg shadow-[black]
                                transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-[#0a2c24] hover:bg-[white] hover:text-[#0a2c24]
                                ${toggle
                                        ? isActive
                                            ? 'border-r border-r-[#16A085] bg-transparent min-w-[50px]'
                                            : 'bg-transparent border-r border-r-[#2C2D33] min-w-[50px]'
                                        : isActive
                                            ? 'bg-[#12876D] text-white min-w-full rounded-full'
                                            : 'bg-transparent min-w-full rounded-full'
                                    }`}
                                onClick={() => navigate(item.path)}
                            >
                                {item.icon}
                                <p
                                    className={`transition-[opacity,max-width] duration-200 ease-in-out overflow-hidden
                                    ${toggle ? 'opacity-0 max-w-0' : 'opacity-100 max-w-[200px]'}`}
                                >
                                    {item.label}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
