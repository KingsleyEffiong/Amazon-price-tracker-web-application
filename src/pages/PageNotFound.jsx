import React from 'react'
import { useNavigate } from "react-router-dom"
import Button from '../ui/Button'

function PageNotFound() {
    const navigate = useNavigate()
    return (
        <div className=''>
            <p>Page Not Found 🤢</p>
            <button className='bg-[#16A085] w-28 rounded-full cursor-pointer' onClick={() => navigate('/login')}>Login</button>
        </div>
    )
}

export default PageNotFound