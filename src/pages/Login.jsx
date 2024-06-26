import React, { useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';
import wildfireLogo from '../assets/images/Logo_background.jpg';

export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            if (userCredential.user) {
                navigate('/');
            }
        } catch (error) {
            toast.error('Bad User Credentials');
            console.log(error);
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
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white  border-gray-300 rounded-xl transition ease-in-out"
                        />
                        <div className="relative mb-6">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-4 py-2 text-xl text-gray-700 bg-white  border-gray-300 rounded-xl transition ease-in-out"
                            />
                            {showPassword ? (
                                <AiFillEyeInvisible
                                    className="absolute right-3 top-3 text-xl cursor-pointer"
                                    onClick={() => setShowPassword((state) => !state)}
                                />
                            ) : (
                                <AiFillEye
                                    className="absolute right-3 top-3 text-xl cursor-pointer"
                                    onClick={() => setShowPassword((state) => !state)}
                                />
                            )}
                        </div>
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
                                    to="/forgot-password"
                                    className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
                                >
                                    Forgot Password?
                                </Link>
                            </p>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
                        >
                            Sign In
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
