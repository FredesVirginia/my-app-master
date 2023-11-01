import React , {useState  , useContext , useEffect} from 'react' ;
import {GoogleAuthProvider} from "firebase/auth";
import {getAuth , signInWithPopup , signInWithEmailAndPassword} from "firebase/auth";
import toast from 'react-hot-toast';
import {AppContext} from "../App";


const Login = () => {
    const provider = new GoogleAuthProvider();

   
      const auth = getAuth(); // Initialize auth inside useEffect
    
    const [email , setEmail] = useState("");
    const [ password , setPassword]= useState("");
    const {setRoute , setUser} = useContext(AppContext);
   
    const hazLogin = () =>{
       
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            toast(`!Usuario  login correctamente`);
            setUser(user)
             setRoute("home");
            

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });

    }

    const login = e =>{
        e.preventDefault();
        
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            toast(`!Usuario  login correctamente`);
           setUser(user);
           setRoute("home");
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });

    }
    return (
        <div className="flex flex-col gap-4 items-center">
            <h1 className="text-xl font-bold text-sky-700" >
            Este es el Login
            </h1>
            <p className="text-sm">
                Haz Click para Logearte
            </p>

            <div className= "flex flex-col">
            <form onSubmit={login} className= "flex flex-col gap-2 max-w-sm" >
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
                   Login
                </button>
                <button 
                     onClick={hazLogin}
                    className="bg-sky-400 py-1 text-white rounded shadow"
                >
                   o Login con Gooble
                </button>
            
             </form>

             
            </div>
        </div>
    );
}

export default Login;

