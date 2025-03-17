import React from 'react'

function Button({ children, onClick }) {
    return (
        <button type='button' onClick={onClick} className='bg-white rounded-sm py-1 my-10 cursor-pointer shadow-gray-800 flex justify-center items-center'>{children}</button>
    )
}



export default Button