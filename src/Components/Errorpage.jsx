import React from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';

const Errorpage = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen ">
            <img
                src="/pngwing.com.png" 
                alt="404 Error"
                className="mb-8 max-w-96 "
            />
            <h1 className="text-4xl font-bold text-primary mb-4">Oops! Something Went Wrong</h1>
            <p className="text-lg  mb-4 text-center">
                {error.statusText || error.message || "An unexpected error occurred."}
            </p>
            <button
                onClick={handleGoBack}
                className="px-6 py-3 bg-primary text-white rounded-lg  transition duration-200"
            >
                Go Back to Homepage
            </button>
        </div>
    );
};

export default Errorpage;
