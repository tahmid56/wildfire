import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { db } from '../utils/firebaseConfig';

const Contact = () => {
    const [info, setInfo] = useState({ name: '', email: '', msg: '' });
    const handleSubmit = async () => {
        if ((info.name || info.email || info.msg) === '') {
            toast.error('Some fields are missing');
            return;
        }
        try {
            const docRef = await addDoc(collection(db, 'comments'), info);
            console.log('Document written with ID: ', docRef.id);
            toast.success('Your comment have been sent!');
            setInfo({ name: '', email: '', msg: '' });
        } catch (error) {
            toast.error('Some Error Occured!', error.message);
        }
    };
    return (
        <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Contact Us</h1>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                    Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify.
                </p>
            </div>

            <div className="lg:w-1/2 md:w-2/3 mx-auto">
                <div className="flex flex-wrap -m-2">
                    <div className="p-2 w-1/2">
                        <div className="relative">
                            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={info.name}
                                onChange={(e) => {
                                    setInfo({ ...info, name: e.target.value });
                                }}
                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                    </div>
                    <div className="p-2 w-1/2">
                        <div className="relative">
                            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={info.email}
                                onChange={(e) => {
                                    setInfo({ ...info, email: e.target.value });
                                }}
                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                    </div>
                    <div className="p-2 w-full">
                        <div className="relative">
                            <label htmlFor="message" className="leading-7 text-sm text-gray-600">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={info.msg}
                                onChange={(e) => {
                                    setInfo({ ...info, msg: e.target.value });
                                }}
                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                    </div>
                    <div className="p-2 w-full">
                        <button
                            onClick={handleSubmit}
                            className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
