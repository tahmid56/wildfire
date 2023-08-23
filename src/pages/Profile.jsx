import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const [section, setSection] = useState(1);
    return (
        <main className="w-auto sm:mx-[5vw] h-full">
            <div className="flex flex-row-reverse sm:mr-[15vw] mb-6">
                <button
                    type="button"
                    onClick={(e)=> {navigate("/addnovel")}}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                    Publish a New Novel
                </button>
            </div>
            <nav className="bg-gray-50 dark:bg-gray-700 sm:mx-[15vw]">
                <div className="max-w-screen-xl  mx-auto">
                    <div className="flex items-center">
                        <div
                            onClick={(e) => setSection(1)}
                            className={
                                section === 1
                                    ? 'text-gray-900 dark:text-white hover:underline bg-lime-500 py-3 px-3'
                                    : 'text-gray-900 dark:text-white hover:underline py-3 px-3'
                            }
                        >
                            Published
                        </div>
                        <div
                            onClick={(e) => setSection(2)}
                            className={
                                section === 2
                                    ? 'text-gray-900 dark:text-white hover:underline bg-lime-500 py-3 px-3'
                                    : 'text-gray-900 dark:text-white hover:underline py-3 px-3'
                            }
                        >
                            Unpublished
                        </div>
                    </div>
                </div>
            </nav>
            
        </main>
    );
};

export default Profile;
