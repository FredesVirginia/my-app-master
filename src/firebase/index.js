// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


import { getMessaging , getToken} from "firebase/messaging";



const firebaseConfig = {
  apiKey: "AIzaSyA_CE84Bo8bies8EjQwhzCMYaPBwqIFHjY",
  authDomain: "firefise-shooping.firebaseapp.com",
  projectId: "firefise-shooping",
  storageBucket: "firefise-shooping.appspot.com",
  messagingSenderId: "208414627162",
  appId: "1:208414627162:web:4601b305106d94df1d8f63",
  measurementId: "G-5S463MWX1P"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging =  getMessaging(app);
 export const tokeen =  async ()=>{
  console.log("LLAMANDO A L A FUNCION desde index.js firebase")
  const permission = await Notification.requestPermission();
  if(permission === "granted"){
    console.log("POR EL PERMITIDO")
        //Generate Token
    const token = await getToken(messaging , {vapidKey : "BETlaoi-RhzF7UspHOJl2sUvah9xQh_hWJtulY9x8mleV_Kgmh8pQkg6HxoOUZLXFTF_qqVgh7ko6NGd0TWGUhc"})
      console.log("EL TOKEN ES " , token);
      sendTokenServer(token);
  
  }else if(permission === "denied"){
    alert("YOU DENIED FOR THE NOTIFICATION")
  }
 }


 export const sendTokenServer = token =>{
    if(localStorage.getItem("Toekn")) return

    localStorage.setItem("Token" , token);
 }