import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';

const Novel = () => {
    const auth = getAuth();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [formData, setFormData] = useState({});
    const [time, setTime] = useState('');
    const [novelImages, setNovelImages] = useState([]);

    const onSubmit = async () => {
        if (auth.currentUser) {
            const commentInfo = {};
            commentInfo.username = auth.currentUser.displayName;
            commentInfo.timestamp = serverTimestamp();
            commentInfo.content = comment;
            commentInfo.novelId = id;
            await addDoc(collection(db, 'novelComments'), commentInfo).then(() => toast.success('Comment posted!'));
            fetchCommentData();
            setComment("")
        } else {
            toast.error('Login first to comment!');
        }
    };

    async function fetchNovelData() {
        setLoading(true);
        const novelRef = doc(db, 'novels', id);
        const docSnap = await getDoc(novelRef);

        setFormData(docSnap.data());
        let timeStamp = docSnap.data().timestamp.seconds;
        setTime(new Date(timeStamp * 1000).toLocaleDateString('en-US'));
        setNovelImages(docSnap.data().imgUrls);
        setLoading(false);
    }
    async function fetchCommentData() {
        const commentRef = collection(db, 'novelComments');
        const q = query(commentRef, where('novelId', '==', id));
        const querySnap = await getDocs(q);
        let commentData = [];
        querySnap.forEach((doc) => commentData.push(doc.data()));
        setComments(commentData);
    }
    useEffect(() => {
        fetchNovelData();
        fetchCommentData();
    }, []);
    return (
        <div className="mx-[10vw] sm:mx-[25vw] rounded-2xl border p-3">
            <div className="px-5">
                <h1>
                    <span className="font-bold text-[32px]">{formData.name}</span>
                </h1>
                <span className="text-sm text-gray-400">{formData.authorName}</span>
                <h1 className="text-sm text-gray-400">{time}</h1>

                <h1 className="mt-6">{formData.description}</h1>
            </div>
            <div className="flex flex-col justify-center items-center space-x-3">
                {novelImages &&
                    novelImages.map((image) => (
                        <div key={image}>
                            <img src={image} alt="" />
                        </div>
                    ))}
            </div>

            <div className="mt-6">
                <label htmlFor="default-input" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                    Comments
                </label>
                <textarea
                    id="description"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows="4"
                    className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out`}
                    placeholder="Please login to leave a comment..."
                />
                {comment && (
                    <div className="flex flex-row-reverse">
                        <button
                            type="button"
                            onClick={onSubmit}
                            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                            Post
                        </button>
                    </div>
                )}
                {auth.currentUser && (
                    <div className="border mt-6 bg-gray-100">
                        {comments &&
                            comments.map((comment) => (
                                <>
                                    <div className="p-3">
                                        <div className="flex items-center justify-between">
                                            <h1 className="text-lg">{comment.username}</h1>
                                            <h1 className="text-sm">
                                                {new Date(comment.timestamp.seconds * 1000).toLocaleDateString('en-US')}
                                            </h1>
                                        </div>
                                        <h1 className="text-md">{comment.content}</h1>
                                    </div>
                                    <hr />
                                </>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Novel;
