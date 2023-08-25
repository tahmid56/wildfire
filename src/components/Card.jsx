import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ novel, id, handleViewsClick }) => {
    const navigate = useNavigate();
    return (
        <div
            onClick={(e) => handleViewsClick(id)}
            className="h-full w-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden"
        >
            <img
                className="lg:h-128 md:h-[50vh] w-full object-contain object-center"
                src={novel.imgUrls[0]}
                alt="blog"
            />
            <div className="p-6">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{novel.category}</h2>
                <h1 className="title-font text-lg font-medium text-gray-900">{novel.name}</h1>
                <h1 className="text-sm mb-3 text-gray-500">{novel.authorName}</h1>
                <p className="leading-relaxed mb-3">{novel.description}</p>
                <div className="flex items-center flex-wrap ">
                    <a className="text-blue-500 inline-flex items-center md:mb-2 lg:mb-0">
                        Learn More
                        <svg
                            className="w-4 h-4 ml-2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                        </svg>
                    </a>
                    <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                        <svg
                            className="w-4 h-4 mr-1"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                        >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        {novel.views}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Card;
