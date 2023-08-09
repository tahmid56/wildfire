import React, { useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const Home = () => {
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
    const [selectedNav, setSelectedNav] = useState(new Date().getDay());
    console.log(selectedNav);
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
                            ? 'h-full w-[14.2%] bg-lime-500 items-center justify-center flex text-white font-bold'
                            : 'font-bold'
                    }
                >
                    MON
                </div>
                <div
                    onClick={() => setSelectedNav(2)}
                    className={
                        selectedNav === 2
                            ? 'h-full w-[14.2%] bg-lime-500 items-center justify-center flex text-white font-bold'
                            : 'font-bold'
                    }
                >
                    TUE
                </div>
                <div
                    onClick={() => setSelectedNav(3)}
                    className={
                        selectedNav === 3
                            ? 'h-full w-[14.2%] bg-lime-500 items-center justify-center flex text-white font-bold'
                            : 'font-bold'
                    }
                >
                    WED
                </div>
                <div
                    onClick={() => setSelectedNav(4)}
                    className={
                        selectedNav === 4
                            ? 'h-full w-[14.2%] bg-lime-500 items-center justify-center flex text-white font-bold'
                            : 'font-bold'
                    }
                >
                    THU
                </div>
                <div
                    onClick={() => setSelectedNav(5)}
                    className={
                        selectedNav === 5
                            ? 'h-full w-[14.2%] bg-lime-500 items-center justify-center flex text-white font-bold'
                            : 'font-bold'
                    }
                >
                    FRI
                </div>
                <div
                    onClick={() => setSelectedNav(6)}
                    className={
                        selectedNav === 6
                            ? 'h-full w-[14.2%] bg-lime-500 items-center justify-center flex text-white font-bold'
                            : 'font-bold'
                    }
                >
                    SAT
                </div>
                <div
                    onClick={() => setSelectedNav(0)}
                    className={
                        selectedNav === 0
                            ? 'h-full w-[14%] bg-lime-500 items-center justify-center flex text-white font-bold'
                            : 'font-bold'
                    }
                >
                    SUN
                </div>
            </nav>
            <div className="mx-0 sm:mx-[10vw] flex justify-center items-center">
                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 ">
                    <div
                        className="h-[200px] w-[200px] bg-black my-2 mx-4 hover:bg-red"
                        style={{ backgroundImage: `url(${slides[currentIndex].imgUrl})` }}
                    ></div>
                    <div className="h-[200px] w-[200px] bg-black my-2 mx-4"></div>
                    <div className="h-[200px] w-[200px] bg-black my-2 mx-4"></div>
                    <div className="h-[200px] w-[200px] bg-black my-2 mx-4"></div>
                    <div className="h-[200px] w-[200px] bg-black my-2 mx-4"></div>
                    <div className="h-[200px] w-[200px] bg-black my-2 mx-4"></div>
                </div>
            </div>
        </main>
    );
};

export default Home;
