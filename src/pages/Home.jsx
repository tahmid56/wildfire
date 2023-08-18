import React, { useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import Card from '../components/Card';

const Home = () => {
    const animeList = [
        {
            name: 'Hello There',
            imgUrl: 'https://safebooru.org//samples/4286/sample_61bff1549a835a39fa4f229de18dd6ee53b5cb62.jpg?4475165',
            description: 'Lorem ipsum tor es dinos men tro',
        },
        {
            name: 'Hello There 2',
            imgUrl: 'https://safebooru.org//images/4287/7a6502e9d7d861418d12eb69eebfc495be56e741.png?4475262',
            description: 'Lorem ipsum tor es dinos men tro',
        },
        {
            name: 'Hello There 3',
            imgUrl: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80',
            description: 'Lorem ipsum tor es dinos men tro',
        },
        {
            name: 'Hello There 4',
            imgUrl: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80',
            description: 'Lorem ipsum tor es dinos men tro',
        },
        {
            name: 'Hello There 5',
            imgUrl: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80',
            description: 'Lorem ipsum tor es dinos men tro',
        },
        {
            name: 'Hello There 6',
            imgUrl: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80',
            description: 'Lorem ipsum tor es dinos men tro',
        },
        {
            name: 'Hello There 7',
            imgUrl: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80',
            description: 'Lorem ipsum tor es dinos men tro',
        },
    ];
    const slides = [
        {
            imgUrl: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80',
        },
        {
            imgUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        },
        {
            imgUrl: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        },
        {
            imgUrl: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80',
        },
        {
            imgUrl: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80',
        },
    ];
    const [selectedNav, setSelectedNav] = useState(1);

    const [currentIndex, setCurrentIndex] = useState(0);
    const handlePrevSlideClick = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };
    const handleNextSlideClick = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };
    return (
        <main className="max-w-full">
            <div className="max-w-full bg-blue h-[380px] sm:h-[480px] m-auto relative">
                <div
                    style={{ backgroundImage: `url(${slides[currentIndex].imgUrl})` }}
                    className="w-full h-full bg-center bg-cover duration-500"
                ></div>
                <div
                    className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 rounded-full p-2"
                    onClick={handlePrevSlideClick}
                >
                    <AiOutlineLeft />
                </div>
                <div
                    className="absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 rounded-full p-2"
                    onClick={handleNextSlideClick}
                >
                    <AiOutlineRight />
                </div>
            </div>

            <nav className="mx-0 sm:mx-[20vw] h-[10vh] flex justify-around items-center">
                <div
                    onClick={() => setSelectedNav(1)}
                    className={
                        selectedNav === 1
                            ? 'h-full w-[33.3%] bg-lime-500 items-center justify-center flex text-white font-bold'
                            : 'font-bold'
                    }
                >
                    POPULAR
                </div>
                <div
                    onClick={() => setSelectedNav(2)}
                    className={
                        selectedNav === 2
                            ? 'h-full w-[33.3%] bg-lime-500 items-center justify-center flex text-white font-bold'
                            : 'font-bold'
                    }
                >
                    ORIGINAL
                </div>
                <div
                    onClick={() => setSelectedNav(3)}
                    className={
                        selectedNav === 3
                            ? 'h-full w-[33.3%] bg-lime-500 items-center justify-center flex text-white font-bold animation active:scale-125'
                            : 'font-bold'
                    }
                >
                    FANMADE
                </div>
            </nav>
            <div className="mx-1 sm:mx-[10vw] flex justify-center items-center">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 space-x-3 space-y-3">
                    {animeList && animeList.map((anime, index) => <Card anime={anime} key={index} />)}
                </div>
            </div>
        </main>
    );
};

export default Home;
