import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider } from "firebase/auth";
import {  createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from './Firebase.config';
import axios from 'axios';

const provider = new GoogleAuthProvider();
export const AuthContext=createContext(null)
const AuthProvider = ({children}) => {
    const [dataloading,setdataloading]=useState(true)
    const [datas,setDatas]=useState([])
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    const [watchData,setWatchData]=useState([])



    useEffect(()=>{
        fetch('https://rentcar-seven.vercel.app/allcars')
        .then(res => res.json())
            .then(data => 
                {setDatas(data)
                
            })
        setdataloading(false)
    },[])

      // register 
      const handelSignup=(email,pass)=>{
        return createUserWithEmailAndPassword(auth,email,pass)
    }
    const handelSignin=(email,pass)=>{
        return signInWithEmailAndPassword(auth, email, pass)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            console.log('CurrentUser -->', currentUser);
            console.log("API URL:", import.meta.env.VITE_API_URL); // ✅ Check if VITE_API_URL is correct
    
            if (currentUser?.email) {
                setUser(currentUser);
                try {
                    const { data } = await axios.post(
                        `${import.meta.env.VITE_API_URL}/jwt`,  // Ensure this is correct
                        { email: currentUser?.email },
                        { withCredentials: true }
                    );
                    console.log("JWT Response:", data); // ✅ Debug API response
                } catch (error) {
                    console.error("JWT Request Error:", error.response?.data || error.message);
                }
            } else {
                setUser(currentUser);
                try {
                    const { data } = await axios.get(
                        `${import.meta.env.VITE_API_URL}/logout`,
                        { withCredentials: true }
                    );
                    console.log("Logout Response:", data);
                } catch (error) {
                    console.error("Logout Request Error:", error.response?.data || error.message);
                }
            }
            setLoading(false);
        });
    
        return () => unsubscribe();
    }, []);
    




    const logout=()=>{
        return signOut(auth)
    }
    const handelUpdateUser=(name,url)=>{
       return updateProfile(auth.currentUser, {
            displayName: name, photoURL: url
          })
    }
    // gogle login 
    const googleSign =()=>{
        return signInWithPopup(auth,provider)
    }




    const data={
        datas,
        loading,
        dataloading,
        handelSignup,
        handelSignin,
        user,
        setDatas,
        logout,
        googleSign,
        handelUpdateUser,
        watchData,
        setWatchData
    }
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;