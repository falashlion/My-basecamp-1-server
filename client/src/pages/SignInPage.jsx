import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import LogoLayout from '../layouts/LogoLayout';

const SignInPage = ({ onSignIn }) => {

  useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        onSignIn(data.data.user.token);
        toast.success('Login successful!');
        navigate('/home'); // Redirect to home page after successful sign-in
      } else {
        toast.error('Sign-in failed. Please check your email and password.');
        console.error('Sign-in failed');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
      console.error('An error occurred:', error);
    }
  };
  
  return (
    <>   
      <ToastContainer />
      <Helmet>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/motion-tailwind/motion-tailwind.css" />
      </Helmet>
      <body className="bg-white py-5"> 
        <div className="container flex flex-col mx-auto bg-white bg-opacity-60 backdrop-blur-sm rounded-lg pt-12 my-5 px-5">
          <LogoLayout />
          <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5">
            <div className="flex items-center justify-center w-full lg:p-12">
              <div className="flex items-center xl:p-10 border border-grey-300 bg-grey-100 rounded-3xl p-5 lg:p-8 xl:p-10">
                <form className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl p-4 md:p-6 lg:p-8 xl:p-10" onSubmit={handleSubmit}>
                  <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Sign In</h3>
                  <p className="mb-4 text-grey-700">Enter your email and password</p>
                  <div className="flex items-center mb-3">
                    <hr className="h-0 border-b border-solid border-grey-500 grow"/>
                    <p className="mx-4 text-grey-600"></p>
                    <hr className="h-0 border-b border-solid border-grey-500 grow"/>
                  </div>
                  <label htmlFor="email" className="mb-2 text-sm text-start text-grey-900">Email*</label>
                  <input id="email" type="email" placeholder="mail@loopple.com" value={email} onChange={(e) => setEmail(e.target.value)} className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"/>
                  <label htmlFor="password" className="mb-2 text-sm text-start text-grey-900">Password*</label>
                  <input id="password" type="password" placeholder="Enter a password" value={password} onChange={(e) => setPassword(e.target.value)} className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"/>
                  <div className="flex flex-row justify-between mb-8">
                    <label className="relative inline-flex items-center mr-3 cursor-pointer select-none">
                      <input type="checkbox" className="sr-only peer"/>
                      {/* <div className="w-5 h-5 bg-white border-2 rounded-sm border-grey-500 peer peer-checked:border-0 peer-checked:bg-purple-blue-500">
                        {/* <img className="" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/icons/check.png" alt="tick"/> */}
                      {/* </div>  */}
                      {/* <span className="ml-3 text-sm font-normal text-grey-900">Keep me logged in</span> */}
                    </label>
                    <a href="javascript:void(0)" className="mr-4 text-sm font-medium text-purple-blue-500">Forget password?</a>
                  </div>
                  <button 
                    className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500">
                    Sign In
                  </button>
                  <p className="text-sm leading-relaxed text-grey-900">Not registered yet? <Link to="/signup" className="mr-4 text-sm font-medium text-purple-blue-500">Sign Up</Link></p>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 my-5">
          <div className="w-full max-w-full sm:w-3/4 mx-auto text-center">
            <p className="text-sm text-grey-700">© 2024 MyBaseCamp by Fochu . All rights reserved.</p>
          </div>
        </div>
      </body>
    </>
  );
}

export default SignInPage;
