import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';
import { db } from '../utils/firebaseConfig';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router';

export default function OAuth() {
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp(),
                });
            }
            navigate('/');
        } catch (error) {
            toast.error('Could Not Authorize With Google!');
            console.log(error);
        }
    };
    return (
        <button
            type="button"
            onClick={handleGoogleClick}
            className="flex items-center justify-center w-full bg-red-700 text-white px-7 py-3 uppercase text-sm font-medium hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out rounded"
        >
            <FcGoogle className="text-2xl bg-white rounded-full mr-2" />
            Continue with Google
        </button>
    );
}
