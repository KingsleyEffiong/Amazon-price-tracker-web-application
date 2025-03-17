import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputField from '../ui/InputField'
import Button from '../ui/Button'
import { useProvider } from '../components/PostProvider'
import EmailIcon from '@mui/icons-material/Email';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Loader from "../assets/images/Triple intersection.gif"
import Swal from 'sweetalert2'
import { saveDeviceLogin } from '../components/connectedDevice/saveDeviceLogin'


const SIGNIN_URL = import.meta.env.VITE_SIGNIN_URL;
function Login() {
    const { email, password, errors, dispatch, userId } = useProvider();
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            dispatch({ type: 'ERRORS', errors: 'Please fill all fields' });
            return;
        }
        setLoading(true);

        try {
            const response = await fetch(`${SIGNIN_URL}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            let data;
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else {
                throw new Error(`Unexpected response format. Status: ${response.status}`);
            }

            if (!response.ok) {
                throw new Error(data?.error || `Login failed with status: ${response.status}`);
            }

            // ✅ Store token safely
            if (data.data.token) {
                sessionStorage.setItem("session", data.data.token);
                console.log("Stored Token:", sessionStorage.getItem("session"));
                localStorage.setItem("userId", data.data.user._id);
                saveDeviceLogin(data.data.user._id)
            } else {
                throw new Error("No token received from server");
            }
            dispatch({ type: 'USERNAME', user: '' });
            dispatch({ type: 'EMAIL', userEmail: '' });
            dispatch({ type: 'ERRORS', errors: '' });

            Swal.fire({
                title: 'Login Successful!',
                icon: 'success',
                confirmButtonText: 'Continue'
            }).then(result => {
                if (result.isConfirmed) {
                    navigate('/');
                }
            });

        } catch (error) {
            console.error("Login Error:", error);
            dispatch({ type: 'ERRORS', errors: error.message });
        } finally {
            setLoading(false);
        }
    };



    return (
        <form action='' className='w-[350px] h-auto rounded-lg px-4 py-2.5 flex flex-col justify-center align-items-center text-center shadow-2xl shadow-[#afa1a1]' style={{
            backgroundColor: "var(--background-color)",
        }}>
            <div className="h-40 w-full flex flex-col justify-center items-center">
                <h1>LOGIN</h1>
                <p>Dont have an account yet?
                    <Link to='/sign-up' className='underline' onClick={() => dispatch({ type: 'ERRORS', errors: null })}> Sign up</Link>
                </p>
            </div>
            <div className="relative">
                <EmailIcon className='absolute left-2 top-4' />
                <InputField type="email" value={email} onChange={(e) => dispatch({ type: 'EMAIL', userEmail: e.target.value })} placeholder="email" />
            </div>
            <div className="relative">
                <EnhancedEncryptionIcon className="absolute left-2 top-4" />
                <InputField
                    type={visible ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => dispatch({ type: 'PASSWORD', pass: e.target.value })}
                    placeholder="Password"
                />
                <div>
                    {visible ? (
                        <RemoveRedEyeIcon
                            className="absolute right-2 top-4 cursor-pointer"
                            onClick={() => setVisible(false)}
                        />
                    ) : (
                        <VisibilityOffIcon
                            className="absolute right-2 top-4 cursor-pointer"
                            onClick={() => setVisible(true)}
                        />
                    )}
                </div>
            </div>
            {errors && <p className='text-red-800 text-sm text-left'>{errors.toString()}</p>}
            <Button onClick={handleLogin}>
                {loading ? (
                    <img src={Loader} className='w-10' alt="" />
                ) : (
                    <p className='text-[var(--background-color)]'>Login</p>
                )}
            </Button>
        </form>
    )
}

export default Login