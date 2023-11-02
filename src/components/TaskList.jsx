
import { AppContext } from "../App";
import {AiFillEdit} from "react-icons/ai"
import {AiFillDelete} from "react-icons/ai"
import React , {useContext , useState , useEffect} from 'react'
import { db } from "../firebase";
import { addNewTask, getTask , removeTask, updateTask} from "../firebase/taskController";
import { ToastContainer} from 'react-toastify';
import toast from 'react-hot-toast';


import 'react-toastify/dist/ReactToastify.css';

export default function TaskList() {
 
  const {user} = useContext(AppContext);
    const {setRoute} = useContext(AppContext);
    const [task , setTask] = useState({
        title: "" , 
        description : ""
    })

    const [tasks , setTasks] = useState([]);
    const [mode , setMode] = useState("add");

    const createNewTask = async () =>{
        console.log(task);
       
          await addNewTask(task);
          setTask({title : "" , description :""});
       
    }

    const deleteTaskWithConfirmation = (id) => {
        toast.warning(
          <div className="text-center p-2">
            <p>¿Estás seguro de que deseas borrar esta tarea?</p>
            <button
              onClick={() => {
                deleteTask(id); // Elimina la tarea cuando se hace clic en el botón de confirmación
                toast.dismiss(); // Cierra el toast
              }}
              className="bg-red-500 text-white py-2 px-4 rounded-md m-2"
            >
              Sí
            </button>
            <button
              onClick={() => toast.dismiss()} // Cierra el toast sin borrar la tarea
              className="bg-blue-500 text-white py-2 px-4 rounded-md m-2"
            >
              No
            </button>
          </div>,
          {
            position: "top-center",
            autoClose: false,
            closeOnClick: false,
            closeButton: false,
            draggable: false,
            progress: undefined,
            pauseOnHover: false,
          }
        );
      };
    

    const editTask = async (id) =>{
            setMode("update");
            const taskUpdate = tasks.find((t) => t.id === id);
            setTask({...taskUpdate});
           console.log("La task a actaliza es " , taskUpdate);
          

    }

    const operarTask = async  () =>{
            if(mode === "add"){
                await createNewTask(task);
            }
            if (mode === "update"){
                await updateTask(task);
                setTask({title : "" , description :""});
            }
    }

    const deleteTask = async (id) =>{
       await removeTask(id);
    }

    

     useEffect (()=>{
            getTask()
             .then((t) =>setTasks([...t]))
             .catch((e) =>console.log(e))

     }, [tasks]);


     useEffect(() => {
      // Verificar si el usuario está logueado
      if (!user) {
        toast(` Necesitas Loguearte`);
        console.log("NO SE LOGEO");
      } else {
        toast("PUEDES CREAR TAREAS");
      }
    }, [user]);




  return (
    <div> 
        <h1 className="text-sky-700 font-semibold text-1g"
        
        > Estas en Task List </h1>
        <div className="flex flex-col gap-4">
            <h2>Nueva Tareaaaaaa</h2>
            <input type = "text"
            placeholder="Titulo"
            className="border shadow outline-none focus:ring ring-sky-200 rounded px-2 py-1 w-full"
            value={task.title}
            onChange={(e) => setTask({...task , title : e.target.value})}
            />
            <textarea
                placeholder="Descripciom"
                className="border shadow outline-none focus:ring ring-sky-200 rounded px-2 py-1 w-full"
                value={task.description}
                onChange={(e) => setTask({...task , description : e.target.value})}
            >

            </textarea>
             {user ? ( 
                <>
                
                <button
                onClick={operarTask}
                className="bg-sky-400 text-white rounded shadow py-1 hover:bg-sky-500 transition font-semibold"
                >  

               {mode === "add" ? "Añadir" : "Editar"}
                
                </button>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4"> 
                {tasks.map (task =>  <div key = {task.id} className="rounded-lg border border-sky-300 p-4 flex flex-col gap-2">
                    <h1 className="font-semibold">{task.title}</h1>
                    <div className="border-t border-sky-300"></div>
                    <p>{task.description}</p>
                    <div className="flex justify-between">
                        <button 
                            className="text-2xl hover:bg-sky-300  hover:text-black transition p-2 text-sky-700"
                            onClick={ () => {editTask(task.id)}}
                        > <AiFillEdit/> </button>
                        
                        <button 
                        className="text-2xl hover:bg-sky-300  hover:text-black transition p-2 text-red-800"
                        onClick={() => deleteTaskWithConfirmation(task.id)}
                        > <AiFillDelete/> </button>
                         <ToastContainer />
                     </div>
                </div>)}
            </div>
                </>
                
                
                
                
                ) : 
               ( 
                 <button 
                  className=" bg-orange-400 text-white text-bold hover:bg-orange-600  transition"
                 onClick={() => setRoute("login")}>Login</button>
              
               )
                
                }

            
           
        </div>
   </div>
  )
}