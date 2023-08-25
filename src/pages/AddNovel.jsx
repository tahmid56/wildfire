import React, { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../utils/firebaseConfig';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

const AddNovel = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const [loading, setLoading] = useState(false);
    const [novelInfo, setNovelInfo] = useState({ name: '', description: '', publish: false, images: {} });

    const handleImageChange = (event) => {
        if (event.target.files) {
            setNovelInfo({ ...novelInfo, images: event.target.files });
            console.log(event.target.files);
        }
    };
    const handleSave = async () => {
        setLoading(true);
        async function storeImage(image) {
            return new Promise((resolve, reject) => {
                const storage = getStorage();
                const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
                const storageRef = ref(storage, filename);
                const uploadTask = uploadBytesResumable(storageRef, image);
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                        }
                    },
                    (error) => {
                        // Handle unsuccessful uploads
                        reject(error);
                    },
                    () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            resolve(downloadURL);
                        });
                    }
                );
            });
        }

        const imgUrls = await Promise.all([...novelInfo.images].map((image) => storeImage(image))).catch((error) => {
            setLoading(false);
            toast.error('Images not uploaded');
            return;
        });

        const formDataCopy = {
            ...novelInfo,
            imgUrls,
            category: 'fanmade',
            timestamp: serverTimestamp(),
            userRef: auth.currentUser.uid,
            authorName: auth.currentUser.displayName,
            views: "0"
        };

        delete formDataCopy.images;
        const docRef = await addDoc(collection(db, 'novels'), formDataCopy);
        setLoading(false);
        toast.success('Novel Created');
        navigate('/profile');
    };
    if (loading) {
        return <Spinner />;
    }
    return (
        <div className="mx-[5vw] sm:mx-[30vw] rounded-2xl border p-3">
            <div className="mb-6 ">
                <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Novel Name
                </label>
                <input
                    type="text"
                    id="default-input"
                    value={novelInfo.name}
                    onChange={(e) => setNovelInfo({ ...novelInfo, name: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Decription
                </label>
                <textarea
                    id="message"
                    rows="4"
                    value={novelInfo.description}
                    onChange={(e) => setNovelInfo({ ...novelInfo, description: e.target.value })}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write the description here..."
                />
            </div>
            <label className="relative inline-flex items-center cursor-pointer mt-6">
                <input
                    type="checkbox"
                    value={novelInfo.publish}
                    onChange={(e) => setNovelInfo({ ...novelInfo, publish: !novelInfo.publish })}
                    className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Publish</span>
            </label>
            <div className="w-fullflex flex-col justify-center items-center my-2">
                <div className="flex items-center rounded-2xl border p-3 my-1 justify-between">
                    <label>
                        <input
                            type="file"
                            multiple
                            className="text-sm text-grey-500
                        file:mr-5 file:py-2 file:px-6
                        file:rounded-full file:border-0
                        file:text-sm file:font-medium
                        file:bg-blue-50 file:text-blue-700
                        hover:file:cursor-pointer hover:file:bg-amber-50
                        hover:file:text-amber-700
                        
                      "
                            accept=".jpg, .png, .jpeg"
                            onChange={handleImageChange}
                        />
                    </label>
                </div>
            </div>

            <button
                type="button"
                onClick={handleSave}
                className="mt-3 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
                Submit
            </button>
        </div>
    );
};

export default AddNovel;
