const express = require("express")
const app = express()
const mysql = require("mysql")
const cors = require("cors")
const db_connection = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"password",
    database:"CRUD_database"
})

app.use(cors())

app.use(express.urlencoded())
app.use(express.json())





app.get("/",(req,res)=>{
    res.send("<pre>CRUD</pre>")
})


app.get("/api/data/",(req,res)=>{

    const query = "SELECT * FROM movie_review;";
    db_connection.query(query,(err,result)=>{
        res.send(result)
    })

})

app.post("/api/insert/",(req,res)=>{
     const name = req.body["name"];
     const review = req.body["review"];

     if(name.length<3 && review.length<5){
        return res.json("Error")

     }
     
     const query = "INSERT INTO movie_review(movie_name,review) VALUES(?,?);";
     
     db_connection.query(query,[name,review],(err,result)=>{   
       
        return res.json("Sucessful")
     
     })

})

app.delete("/api/vanish/:ID",(req,res)=>{
    const id = req.params["ID"];
    const query = "DELETE FROM movie_review WHERE (`id` = ?);"
    db_connection.query(query,[id],(err,result)=>{
        if(err){
            console.log(err);
        }
        console.log(result);
    })

    res.send(id)
})
 
app.put("/api/update/:ID",(req,res)=>{
    const id = req.params["ID"];
    const review = req.body["review"];
    const query = "UPDATE movie_review SET review = ? WHERE (id = ?);"
    db_connection.query(query,[review,id],(err,result)=>{
        if(err){
            res.json(err);
        }
    res.json(result);
    })

})

app.listen(3001,()=>{
    console.log("Server running on 3001 port")
})


