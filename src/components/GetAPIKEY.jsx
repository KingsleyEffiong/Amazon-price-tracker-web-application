import React, { useEffect, useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function GetAPIKEY() {
    const [apiKey, setApiKey] = useState(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const API = localStorage.getItem('userId');
        if (API) {
            setApiKey(`AMAZON_${API}`);
        }
    }, []);

    const copyToClipboard = () => {
        if (apiKey) {
            navigator.clipboard.writeText(apiKey).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // Hide tick after 2 sec
            });
        }
    };

    if (!apiKey) {
        return <h1>Please login to access the API</h1>;
    }

    return (
        <div
            className="flex flex-col w-fit md:flex-row items-center space-x-2 mb-5 md:mb-0  bg-gray-200 px-4 py-2 md:rounded-full cursor-pointer hover:bg-gray-300 transition"
            onClick={copyToClipboard}
        >
            <h2 className='text-red-700'>Your Amazon traking key: </h2>
            <p className="text-gray-800 font-medium">{apiKey}</p>
            {copied &&
                <CheckCircleIcon className="text-green-500" />
            }
        </div>
    );
}

export default GetAPIKEY;
