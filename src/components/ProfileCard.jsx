import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileCard = ({ novel, id, handleDelete }) => {
    const navigate = useNavigate();
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img className="rounded-t-lg" src={novel.imgUrls[0]} alt="" />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {novel.name}
                    </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{novel.description}</p>
                <div className="flex">
                    <button
                        type="button"
                        onClick={(e) => navigate(`/editnovel/${id}`)}
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        onClick={(e) => handleDelete(id)}
                        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
