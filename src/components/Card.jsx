import React from 'react';

const Card = ({ anime }) => {
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img className="rounded-t-lg" src={anime.imgUrl} alt="pic" />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-md sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {anime.name}
                    </h5>
                </a>
                <p className="mb-3 text-sm sm:text-md font-normal text-gray-500 dark:text-gray-400">
                    {anime.description}
                </p>
            </div>
        </div>
    );
};

export default Card;
