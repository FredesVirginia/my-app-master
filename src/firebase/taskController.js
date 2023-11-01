//Archivo de toda la logica de base de datos CRUD
import { db } from ".";
import {collection , addDoc , getDocs, setDoc , doc, deleteDoc } from "firebase/firestore";

//AQUI ESTAMOS DICIENDO QUE AGREGE UNA NUEVO DOCUMENTO CON NOMBRE tasks,
//NO IMPORTA SI EL DOCUMENTO NO EXITE, FIREBASE NOS LO CREA 
//ADD DOC, TIENE DOS PARAMETROS, LA RERECIA, EN ESTE CASO UNA COLLECION Y EL PARAMETROS A INTRODUCIR, ES DECIR task
export const addNewTask = async (task)=>{
   try {
    const result = await addDoc(collection(db , "tasks") , task);
    console.log("La nueva tareas agregada fue  = " , result);
   }catch(error){
    console.error("OOh ocurrio un error en addNewTask = " , task)
   }
}


export const getTask = async () =>{

    try{
        const querySnap = await getDocs(collection(db , "tasks"));    
       
        const tasks = querySnap.docs.map(doc => {
            return { ...doc.data() , id : doc.id}
        });

        return tasks;
    
    }catch(error) {
        console.log("Ocurrio un error en get Task" , error)
    }

}





export const updateTask = async (task) => {
    if (!task.id) {
        console.error("El ID del documento es nulo o vacío.");
        return;
    }

    const taskRef = doc(collection(db, "tasks"), task.id);
    await setDoc(taskRef, {
        title: task.title,
        description: task.description
    });
    console.log("La tarea editada es ", task);
}

export const removeTask = async (id) =>{
    try{
        await deleteDoc(doc(db , "tasks" , id))
    }catch(error){
        console.log("El error es " , error)
    }
}
