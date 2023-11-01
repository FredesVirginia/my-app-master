import React , {useState , useContext , useEffect} from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import toast from 'react-hot-toast';
import {AppContext} from "../App";



const Register = () => {
   
      const auth = getAuth(); // Initialize auth inside useEffect
    
    const [email , setEmail] = useState("");
    const [ password , setPassword]= useState("");
    const {setRoute , setUser} = useContext(AppContext);
    const registro = ()=> {
        
        // eslint-disable-next-line no-undef
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            console.log(user);
            toast(`!Usuario ${email} registrado correctamente`);
           
            setRoute("login");
        
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        registro();
    }


    return (
        <div className="flex flex-col gap-4 items-center">
            <h1 className="text-sky-600 font-bold text-center">
                Bienvenido al Registro 


             </h1>
             <form onSubmit={handleSubmit} className= "flex flex-col gap-2 max-w-sm" >
                <input
                    className = "border border-gray-500 rounded py-1 px-2 outline-none"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}

                 />

                <input
                    className = "border border-gray-500 rounded py-1 px-2 outline-none"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}

                 />
                <button 
                    className="bg-sky-400 py-1 text-white rounded shadow"
                >
                    Registrarse
                </button>
            
             </form>
            
        </div>
    );
}

export default Register;
