import React from 'react';
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import LogoLayout from '../layouts/LogoLayout';
import { useEffect } from 'react';

const SignUpPage = ({ onSignUp }) => {

    useEffect(() => {
        localStorage.removeItem('token');
      }, []);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Implement sign-up logic here, e.g., call an API to create a new user
        const res = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, email, password }),
        });

        if (res.ok) {
            const data = await res.json();
            onSignUp(data.token);
            toast.success('Signup successful!');
            return navigate('/signin'); // Redirect to home page after successful sign-up
        } else {
            // Handle sign-up error
            toast.error('Sign-up failed. Please check your Information.');
            console.error('Sign-up failed');
        }
    };

    return (
        <>  
            
            < ToastContainer />
            <Helmet>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/motion-tailwind/motion-tailwind.css" />
            </Helmet>
            <body className="bg-white py-5">
                <div className="container flex flex-col mx-auto bg-white bg-opacity-60 backdrop-blur-sm rounded-lg pt-12 my-2 px-5">
                < LogoLayout />
                    <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5">
                        <div className="flex items-center justify-center w-full lg:p-12">
                            <div className="flex items-center xl:p-10 border border-grey-300 bg-grey-100 rounded-3xl p-5 lg:p-8 xl:p-10">
                                <form className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl p-4 md:p-6 lg:p-8 xl:p-10" onSubmit={handleSubmit}>
                                    <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Sign Up</h3>
                                    <p className="mb-4 text-grey-700">Enter your Information</p>
                                    <div className="flex items-center mb-3">
                                        <hr className="h-0 border-b border-solid border-grey-500 grow" />
                                        <p className="mx-4 text-grey-600"></p>
                                        <hr className="h-0 border-b border-solid border-grey-500 grow" />
                                    </div>
                                    <label htmlFor="firstName" className="mb-2 text-sm text-start text-grey-900">First Name*</label>
                                    <input id="firstName" type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl" />
                                    <label htmlFor="lastName" className="mb-2 text-sm text-start text-grey-900">Last Name*</label>
                                    <input id="lastName" type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl" />
                                    <label htmlFor="email" className="mb-2 text-sm text-start text-grey-900">Email*</label>
                                    <input id="email" type="email" placeholder="mail@loopple.com" value={email} onChange={(e) => setEmail(e.target.value)} className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl" />
                                    <label htmlFor="password" className="mb-2 text-sm text-start text-grey-900">Password*</label>
                                    <input id="password" type="password" placeholder="Enter a password" value={password} onChange={(e) => setPassword(e.target.value)} className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl" />
                                    <div className="flex flex-row justify-between mb-8">
                                        <label className="relative inline-flex items-center mr-3 cursor-pointer select-none">
                                            <input type="checkbox" className="sr-only peer" />
                                        </label>
                                    </div>
                                    <button className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500">
                                        Sign Up
                                    </button>
                                    <p className="text-sm leading-relaxed text-grey-900">Already have an account? <Link to="/signin" className="mr-4 text-sm font-medium text-purple-blue-500">Sign In</Link></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 my-5">
                    <div className="w-full max-w-full sm:w-3/4 mx-auto text-center">
                        <p className="text-sm text-grey-700">© 2024 MyBaseCamp by Fochu. All rights reserved.</p>
                    </div>
                </div>
            </body>
        </>
    );
};

export default SignUpPage;
