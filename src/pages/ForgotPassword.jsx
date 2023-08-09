import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { toast } from 'react-toastify';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import wildfireLogo from '../assets/images/Logo_background.jpg';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email);
            toast.success('Email was sent!');
        } catch (error) {
            toast.error("Couldn't send reset password");
        }
    };
    return (
        <section>
            <h1 className="text-3xl font-bold  text-center mt-6">Sign In</h1>
            <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
                <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
                    <img src={wildfireLogo} alt="key image" className="w-full rounded-2xl" />
                </div>
                <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white  border-gray-300 rounded-xl transition ease-in-out"
                        />

                        <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
                            <p className="mb-6">
                                Don't have an Account?
                                <Link
                                    to="/register"
                                    className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
                                >
                                    Register
                                </Link>
                            </p>
                            <p>
                                <Link
                                    to="/login"
                                    className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
                                >
                                    Sign in instead
                                </Link>
                            </p>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
                        >
                            Send Reset Password
                        </button>
                        <div className="flex items-center my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
                            <p className="text-center font-semibold mx-4">OR</p>
                        </div>
                        <OAuth />
                    </form>
                </div>
            </div>
        </section>
    );
}
