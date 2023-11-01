
import { AppContext } from "../App";
import {AiFillEdit} from "react-icons/ai"
import {AiFillDelete} from "react-icons/ai"
import React , {useContext , useState , useEffect} from 'react'
import { db } from "../firebase";
import { addNewTask, getTask , updateTask} from "../firebase/taskController";

export default function TaskList() {
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

    }

     useEffect (()=>{
            getTask()
             .then((t) =>setTasks([...t]))
             .catch((e) =>console.log(e))

     }, [tasks]);

  return (
    <div> 
        <h1 className="text-sky-700 font-semibold text-1g"
        
        > Estas en Task List </h1>
        <div className="flex flex-col gap-4">
            <h2>Nueva Tarea</h2>
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
                            onClick={ () => {deleteTask(task.id)}}
                        > <AiFillDelete/> </button>
                     </div>
                </div>)}
            </div>
           
        </div>
   </div>
  )
}