import Axios from 'axios'
const BaseUrl = "http://localhost:3000/tasks";

//get all to do
async function fetchData(setTasks) {
    try {
        const response = await Axios.get("http://localhost:3000/tasks");
        const data = response.data;
        setTasks(data);
        // console.log(tasks);
    }
    catch(error) {
        console.log(error);
    }
}

function addData(e,title,setTitle,setTasks,tasks) {
    e.preventDefault();
    Axios.post('http://localhost:3000/tasks',
        {title : title},
    ).
    then(()=>{
        setTasks([...tasks,{title : title}]) ;
    })
    setTitle('');
}

function deleteData(e,id,setTasks) {
    e.preventDefault();
    Axios.delete(`http://localhost:3000/tasks/${id}`)
        .then(setTasks((prevTasks)=>{
            return prevTasks.filter((task)=>{
                return task.id != id
            })
        }))        

}

function updateData(e,id,title,setTitle,setTasks,tasks,setIsUpdating) {
    e.preventDefault();
    Axios.patch(`http://localhost:3000/tasks`,{id : id , title : title})
        .then(setTasks(()=>{
            return (
                tasks.map((task)=>{
                    if (task.id === id) {
                        task.title = title ;
                    }
                    return task ;
                })
            )
        }))
    setTitle('');
    setIsUpdating(false);
}



export {fetchData, addData, deleteData, updateData}
