import React, { useEffect, useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import Card from '../components/Card';
import demo from '../assets/images/demo.png';
import coverPic1 from '../assets/images/coverPic1.jpg';
import coverPic2 from '../assets/images/coverPic2.png';
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Home = () => {
    const navigate = useNavigate();
    const [novelList, setNovelList] = useState([]);
    const slides = [
        {
            imgUrl: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80',
        },
        {
            imgUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        },
        {
            imgUrl: coverPic1,
        },
        {
            imgUrl: coverPic2,
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
    const handleViewsClick = async (id) => {
        const novelToUpdate = novelList.find((novel) => novel.id === id);
        const novelRef = doc(db, 'novels', id);
        let viewCount = novelToUpdate.data.views;
        viewCount = String(Number(viewCount) + 1);
        await updateDoc(novelRef, {
            views: viewCount,
        });
        navigate(`/novel/${id}`);
    };
    useEffect(() => {
        async function fetchNovelData() {
            const novelRef = collection(db, 'novels');
            const q = query(
                novelRef,
                where('publish', '==', true),
                where('category', '==', selectedNav == 1 ? 'popular' : selectedNav == 2 ? 'original' : 'fanmade')
            );
            const querySnap = await getDocs(q);
            let newNovels = [];
            querySnap.forEach((doc) => {
                return newNovels.push({ id: doc.id, data: doc.data() });
            });

            setNovelList(newNovels);
        }
        fetchNovelData();
    }, [selectedNav]);
    return (
        <main className="max-w-full">
            <div className="max-w-full sm:w-[90vw] bg-blue h-[380px] sm:h-[480px]  m-auto relative">
                <div
                    style={{ backgroundImage: `url(${slides[currentIndex].imgUrl})` }}
                    className="w-full h-full bg-contain sm:bg-cover bg-no-repeat bg-center duration-500 "
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
            <div className="mt-3 mx-[10vw] sm:mx-[15vw] md:mx-[35vw]  flex flex-col justify-center items-center space-y-3">
                {novelList &&
                    novelList.map((novel, index) => (
                        <Card novel={novel.data} id={novel.id} key={index} handleViewsClick={handleViewsClick} />
                    ))}
            </div>
            {/* <Footer /> */}
        </main>
    );
};

export default Home;
