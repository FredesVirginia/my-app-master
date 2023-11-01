import React , {useContext , useEffect} from 'react'
import {SiFirebase} from "react-icons/si";
import {AppContext} from "../App";
import { getAuth, signOut } from "firebase/auth";
import toast from 'react-hot-toast';
import app from "../firebase/index"

export default function Header() {

    const {route , setRoute , user , setUser} = useContext(AppContext);
    
      const auth = getAuth(); // Initialize auth inside useEffect
  
    const hazLogAuth = ()=>{
    // eslint-disable-next-line no-undef
    signOut(auth)
      .then(()=>{
        setRoute("login");
        setUser(null);
        toast("Logout Exitoso");
      })
      .catch((e) => toast("Ocurrio un Error"))
    }



  return (
    <header className="h-20 w-full bg-gray-100 shadow-lg flex items-center justify-between px-8 fixed top-0">
        <div 
        className = "flex items-center gap-2 cursor-poiter"
        onClick={() =>setRoute("home")}
        >
          <SiFirebase className= "text-2x1 text-pink-600" />
          <span className= "text-xl font-bold text-pink-600" >FireShooping</span>
        </div>
        
       <div className= "flex items-center justify-between">
        {user ?( <>
          <button
           className="bg-green-950 text-white py-3 px-6 rounded-full hover:bg-sky-700 transition" 
           onClick={hazLogAuth}
           >
            LogOut
          </button>
        </>)
        : (
        <>
          <button 
        className="bg-sky-500 text-white py-3 px-6 rounded-full hover:bg-sky-700 transition"
        onClick={() => setRoute("login")}
        >Login
        </button>

         <button 
        className="bg-sky-500 text-white py-3 px-6 rounded-full hover:bg-sky-700 transition"
        onClick={() => setRoute("register")}
        > Register
        </button>
        </>
        
        )}
       </div>

      </header>
  )
}
