import './App.css'
import Axios from 'axios';
import { useEffect, useState } from 'react';
import Card from './components/Card';
import  {fetchData , deleteData , updateData , addData} from './utils/HandleApi' ;


function App() {

    const [tasks, setTasks] = useState([]);
    const [title, setTitle] =  useState('');
    const [isUpdating, setIsUpdating] = useState(false); 
    const [updateId, setUpdateId] = useState(-1) ;


    useEffect(()=>{
        fetchData(setTasks);
    },[]);
    

    function handleButton(e) {
        if (!isUpdating) {
            addData(e,title,setTitle,setTasks,tasks);
        }
        else {
            updateData(e,updateId,title,setTitle,setTasks,tasks);
        }
    }
    
    function updateMode(e,id) {
        e.preventDefault() ;

        if (isUpdating) {
            return setIsUpdating(false)
        }
        setUpdateId(id) ; 
        return setIsUpdating(true);
    }

    const cardElements = tasks.map((task)=>{
        return (
            <Card 
                id = {task.id}
                title = {task.title}
                deleteData = {(e)=>{deleteData(e,task.id,setTasks)}}
                updateMode={(e)=>{updateMode(e,task.id)}}
            />
            )
        })

    return (
        <div className='flex justify-center py-16 '>
            <div className='p-4 w-9/12'>
                <h2 className='tracking-wider text-3xl text-center font-bold '>TO DO 🏀</h2>
                <div className='flex gap-3 text-xl'>
                    <input type="text" value={title} className='border-b-2 border-cc1 w-full px-2 focus:outline-none bg-transparent  font-semibold' onChange={(e)=>{setTitle(e.target.value)}}/>
                    <button className='px-4 py-1 bg-cc1 text-cc4 font-semibold rounded-xl' onClick={handleButton}>{isUpdating ? "UPDATE" : "ADD"}</button>
                </div>

                <div className='flex flex-col gap-2 my-4'>
                    {cardElements}
                </div>
            
            </div>
        </div>
    )
}

export default App
