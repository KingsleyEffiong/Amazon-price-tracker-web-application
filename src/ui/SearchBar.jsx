import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
    return (
        <div className="relative w-fit h-fit">
            <SearchIcon className="absolute left-1 top-3 text-gray-500" />
            <input type='text' className='bg-[#21222D] w-[504px] h-[44px] text-amber-50 px-9 rounded-sm outline-1 outline-[#333444]' placeholder='Search here ......' />
        </div>
    )
}

export default SearchBar