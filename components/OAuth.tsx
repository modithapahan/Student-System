import { useRouter } from "next/router";
import {FcGoogle} from 'react-icons/fc'
import { toast } from "react-toastify";
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import { doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './../firebase';
import { setDoc } from 'firebase/firestore';

const OAuth = () => {

  const navigate = useRouter();

  const onGoogleClick = async () => {
  
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      auth.languageCode = 'it';
      const result = await signInWithPopup(auth, provider)
      const user = result.user;
      
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
  
      if(!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          created: serverTimestamp()
        })
      } 
      toast.success('Sign in successfully!')
      navigate.push('/');
  
    } catch (error) {
      toast.error('Could not authorize with Google')
    }
  }

  return (
    <button type='button' onClick={onGoogleClick} className='flex justify-center items-center bg-red-700 text-white w-full px-7 py-3 uppercase text-sm font-medium hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out rounded'>
      <FcGoogle className='text-2xl bg-white rounded-full mr-2'/>
      Continue with Google
    </button>
  )
};

export default OAuth;
