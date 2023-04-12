//import
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2')
const app = express();

//configuration
app.use(cors());
app.use(express.json());
const PORT = 3000 ;


//connect to Database 
const dbConnection = mysql.createConnection({
    host : "localhost",
    user: "root",
    password: "root",
    database: "todoApp",
    port: "9999"
}) ;

dbConnection.connect((err)=>{
    if(err) {
        console.log(err);
        console.log("Error connecting to Database");
    }
    else {
        console.log("Connect to Database successfully");
    }
})

//Routes

app.get('/',(req,res)=>{
    res.send("Welcome to Backend")
})


//CREATE
app.post('/tasks', (req,res)=>{
    const {title} = req.body ; 

    try {
        dbConnection.query(
            "INSERT INTO tasks(title) VALUES (?)",
            [title],
            (err,result) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send()
                }
                res.status(200).json({message: "new user Succesfully created"});
            }
        )
    }
    catch(err) {
        console.log(err);
        return res.status(410).send();
    }
})

//READ
app.get('/tasks',(req,res)=>{
    try {
        dbConnection.query(
            "select * from tasks",
            (err,result) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                return res.status(200).json(result);
            }
        )
    }
    catch{
        console.log(err);
        return res.status(405).send();
    }
})

//DELETE
app.delete('/tasks/:id',(req,res)=>{
    const id = req.params.id ;
    try {
        dbConnection.query(
            "delete from tasks where id = ?",[id],
            (err,result) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                if (result.affectedRows === 0) {
                    res.status(400).json({message : "No user with that ID"}) ;
                }
                return res.status(200).json({message : "User deleted Successfully"})
            }
        )
    }
    catch (error) {
        console.log(error);
        return res.status(500).send();
    }
})

app.patch('/tasks', (req,res)=>{
    const {title, id} = req.body ; 

    try {
        dbConnection.query(
            "UPDATE tasks SET title = ? WHERE id = ?",
            [title,id],
            (err,result)=>{
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                return res.status(200).json({message : "update succesfully"});
            }
        )
    }
    catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})
