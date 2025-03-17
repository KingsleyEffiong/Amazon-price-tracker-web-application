import React from 'react'
import SearchBar from '../ui/SearchBar'
import User from '../ui/User'


function Navbar() {
    return (
        <div className='flex justify-end items-center w-full h-[70px] pr-40 pb-2.5'>
            {/* <SearchBar /> */}
            <User />
        </div>
    )
}

export default Navbar