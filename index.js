const { faker } = require('@faker-js/faker');
const mysql=require('mysql2');
const express=require("express");
const app=express();
const path=require("path");
const methodOverride=require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));


const connection =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: 'Nirmalbaba13@'
  });

  
// Fetching user detial in home.js HOME ROUTE
  app.get("/",(req,res)=>{
    let q=`SELECT count(*) FROM user`;
        try{
    connection.query(q, (err,result)=>{
        if(err) throw err;
        let count=(result[0]["count(*)"]);
    res.render("home.ejs",{count});
      });
    
  }catch(err){
    console.log(err);
    res.send("somethong went wrong");
  }
  }); 

// 2-fetching details for user details SHOW ROUTE

  app.get("/user",(req,res)=>{
   let q="SELECT *FROM user";
   try{
    connection.query(q, (err,users)=>{
        if(err) throw err;
        res.render("user.ejs",{users});
      });
    
  }catch(err){
    console.log(err);
    res.send("somethong went wrong");
  }
  });

//   EDIT ROUTE
app.get("/user/:id/edit",(req,res)=>{
    let {id}=req.params;
    let q=`SELECT *FROM user WHERE id= '${id}'`;
    try{
        connection.query(q, (err,result)=>{
            if(err) throw err;
            let user=result[0];
            res.render("edit.ejs",{user});
          });
        
      }catch(err){
        console.log(err);
        res.send("somethong went wrong");
      }

});

// UPDATE ROUTE
app.patch("/user/:id",(req,res) => {
    let {id}=req.params;
    let {password: formPassword,username: newUsername}= req.body;
    let q=`SELECT *FROM user WHERE id= '${id}'`;
    try{
        connection.query(q, (err,result)=>{
            if(err) throw err;
            let user=result[0];
            if(formPassword!= user.password){
            res.send("wrong password");
     } else{
        let q2=`UPDATE user SET name='${newUsername}'WHERE id='${id}'`;
        connection.query(q2,(err,result)=>{
            if (err) throw err;
            res.redirect("/user");
        });
    }
});
     }catch(err){
        console.log(err);
        res.result("Some error in DB")
     }
    });
        

  app.listen("3000",()=>{
    console.log("Server is listening on port 3000")
  });



 

