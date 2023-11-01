
import {IoHomeSharp} from "react-icons/io5";
import {Bs0CircleFill} from "react-icons/bs";
import { AppContext } from "../App";

import React , {useContext} from 'react'

export default function Footer() {
    const {setRoute} = useContext(AppContext)
  return (
    <div className="fixed h-16 w-full  bg-blue-400 bottom-0 flex justify-evenly
    item-center
   ">
       <h1>Hola soy un Footer</h1>
       <div className="bg-blue-300 text-4xl p-2 rounded-full text-pink-500"
           onClick={() => setRoute("home")}
       >
       <IoHomeSharp />
       </div>

       <div className="bg-blue-300 text-4xl p-2 rounded-full text-pink-500" 
           onClick={() => setRoute("shooping")}
       >
       <Bs0CircleFill />
       </div>
   </div>
  )
}

