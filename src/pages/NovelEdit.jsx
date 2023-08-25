import { collection, doc, getDoc, query, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../utils/firebaseConfig';
import Spinner from '../components/Spinner';

const NovelEdit = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [formData, setFormData] = useState({});
    const [formDataCopy, setFormDataCopy] = useState({});
    const [novelImages, setNovelImages] = useState([]);
    const { id } = useParams();
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };
    const handleApplyChanges = async () => {
        if (JSON.stringify(formDataCopy) !== JSON.stringify(formData)) {
            setLoading(true);
            const novelRef = doc(db, 'novels', id);
            await updateDoc(novelRef, {
                name: formData.name,
                description: formData.description,
                publish: formData.publish,
            })
                .then((data) => {
                    console.log(data);
                    toast.success('Update Successful');
                    setCanEdit(false);
                    setLoading(false);
                    fetchNovelData();
                })
                .catch((e) => {
                    console.log(e);
                    toast.error('Something went wrong');
                    setCanEdit(false);
                    setLoading(false);
                });
        }
    };
    async function fetchNovelData() {
        setLoading(true);
        const novelRef = doc(db, 'novels', id);
        const docSnap = await getDoc(novelRef);
        console.log(docSnap.data());
        setFormData(docSnap.data());
        setFormDataCopy(docSnap.data());
        setNovelImages(docSnap.data().imgUrls);
        setLoading(false);
    }
    useEffect(() => {
        fetchNovelData();
    }, []);
    if (loading) {
        return <Spinner />;
    }
    return (
        <div className="mx-[5vw] sm:mx-[20vw] rounded-2xl border p-3">
            <div className="flex flex-row-reverse">
                {canEdit ? (
                    <button
                        type="button"
                        onClick={handleApplyChanges}
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                        Apply Changes
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={(e) => setCanEdit(true)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        Edit
                    </button>
                )}
            </div>
            <section className="w-full flex justify-center items-center flex-col">
                <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
                {formData && (
                    <div className="w-[80vw] sm:w-[40vw] mt-6 px-3">
                        <form>
                            <label
                                htmlFor="default-input"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Novel Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                disabled={!canEdit}
                                onChange={onChange}
                                className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${
                                    canEdit && 'bg-red-200 focus:bg-red-200'
                                }`}
                            />
                            <label
                                htmlFor="default-input"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Novel Description
                            </label>
                            <textarea
                                id="description"
                                rows="4"
                                value={formData.description}
                                onChange={onChange}
                                className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${
                                    canEdit && 'bg-red-200 focus:bg-red-200'
                                }`}
                                placeholder="Write the description here..."
                            />
                            <div class="flex items-center">
                                <input
                                    checked={formData.publish}
                                    disabled={!canEdit}
                                    id="publish"
                                    type="checkbox"
                                    value={formData.publish}
                                    onClick={(e) => {
                                        setFormData((prevState) => ({ ...prevState, publish: !prevState.publish }));
                                    }}
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    for="checked-checkbox"
                                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Publish
                                </label>
                            </div>
                            {novelImages.map((image, index) => (
                                <div className="flex flex-col justify-center items-center">
                                    <img src={image} alt="" className="my-2" key={index} />
                                </div>
                            ))}
                        </form>
                    </div>
                )}
            </section>
        </div>
    );
};

export default NovelEdit;
