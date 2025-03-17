import React from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import ProfileImage from "../assets/images/download (1).jfif"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IconButton } from '@mui/material';
import { useProvider } from '../components/PostProvider';
import { Person2Rounded } from '@mui/icons-material';
function User() {
    const { fectchUsername } = useProvider()
    return (
        <div className="w-[86px] h-[29px] flex gap-2.5 items-center">
            <IconButton className='relative'>
                <div className="absolute w-[7px] h-[7px] rounded-full top-1 right-1.5 bg-red-700"></div>
                <NotificationsIcon className='text-gray-500' />
            </IconButton>
            <Person2Rounded />
            <p className='text-white text-sm'>{fectchUsername}</p>
        </div>
    )
}

export default User