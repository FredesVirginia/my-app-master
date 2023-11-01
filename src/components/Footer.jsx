
import {IoHomeSharp} from "react-icons/io5";
import {Bs0CircleFill ,  BsList} from "react-icons/bs";
import { AppContext } from "../App";

import React , {useContext} from 'react'

export default function Footer() {
    const {setRoute} = useContext(AppContext)
  return (
    <div className="fixed h-16 w-full  bg-blue-400 bottom-0 flex justify-evenly
    item-center
   ">
    
       <div className="bg-blue-300 text-3xl p-2 m-2 rounded-full text-pink-500 cursor-pointer
        hover:bg-sky-50  transition"
           onClick={() => setRoute("home")}
       >
       <IoHomeSharp />
       </div>

       <div className="bg-blue-300 text-3xl p-2 m-2 rounded-full text-pink-500 cursor-pointer
       hover:bg-sky-50  transition" 
           onClick={() => setRoute("shooping")}
       >
       <Bs0CircleFill />
       </div>

       <div className="bg-blue-300 text-3xl p-2 m-2 rounded-full text-pink-500 cursor-pointer
       hover:bg-sky-50  transition" 
           onClick={() => setRoute("taskList")}
       >
       <BsList />
       </div>
   </div>
  )
}

