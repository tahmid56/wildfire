import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';
import Card from '../components/Card';
import ProfileCard from '../components/ProfileCard';
import { toast } from 'react-toastify';
import { deleteObject, getStorage, ref } from 'firebase/storage';
const Profile = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [novels, setNovels] = useState([]);
    const [section, setSection] = useState(1);
    const onLogoutClick = () => {
        auth.signOut();
        navigate('/');
    };
    const handleDelete = async (id) => {
        const storage = getStorage();
        const novelToDel = novels.find((novel) => (novel.id = id));
        console.log(novelToDel);
        novelToDel.data.imgUrls.map((img) => {
            const imageRef = ref(storage, img);
            deleteObject(imageRef).catch((error) => {
                toast.error('An error occured');
                console.log(error);
            });
        });
        await deleteDoc(doc(db, 'novels', id))
            .then(() => {
                toast.success('Novel deleted');
                fetchUserNovel();
            })
            .catch((error) => {
                toast.error('An error occured');
                console.log(error);
            });
    };
    async function fetchUserNovel() {
        const novelRef = collection(db, 'novels');
        const q = query(
            novelRef,
            where('userRef', '==', auth.currentUser.uid),
            where('publish', '==', section === 1 ? true : false)
        );
        const querySnap = await getDocs(q);
        let newNovels = [];
        querySnap.forEach((doc) => {
            return newNovels.push({ id: doc.id, data: doc.data() });
        });
        console.log(newNovels);
        setNovels(newNovels);
        setLoading(false);
    }
    useEffect(() => {
        fetchUserNovel();
    }, [auth.currentUser.uid, section]);
    return (
        <main className="w-auto sm:mx-[5vw] h-full">
            <div className="flex justify-between sm:mx-[15vw] my-6">
                <button
                    type="button"
                    onClick={(e) => {
                        navigate('/addnovel');
                    }}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                    Publish a New Novel
                </button>
                <button
                    type="button"
                    onClick={onLogoutClick}
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                    Logout
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
            <div className="max-w-6xl px-3 mt-6 mx-[15vw]">
                {!loading && novels.length > 0 && (
                    <>
                        <h2 className="text-2xl text-center font-semibold mb-6">My Novels</h2>
                        <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 space-x-3">
                            {novels.map((novel) => (
                                <ProfileCard
                                    novel={novel.data}
                                    id={novel.id}
                                    key={novel.id}
                                    handleDelete={handleDelete}
                                />
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </main>
    );
};

export default Profile;
