
const express= require("express");
const path= require("path");
const fs=require("fs");
const app=express();
const  mongoose=require("mongoose");
const bodyparser=require("body-parser");
const mysql=require('mysql');
const { userInfo } = require("os");

const hbs=require('hbs');
const port=3000;





// app.use('/static',express.static('static'));
//or
app.use('/static', express.static(path.join(__dirname, 'static_main/static')));
//OR
// app.use(express.static(path.join(__dirname,'static')));


// linking pug
app.set('view engine','hbs');
app.set('views', path.join(__dirname,'/view_main/views'));
// app.set('views', path.join(__dirname,'views'));

//create connection to mysql




// get post requests 

app.get('/',(req,res)=>{

     res.status(200).render('home.pug');      //1

    // res.status(200).render('test.hbs');      // tut 79

});


app.get('/home',(req,res)=>{                   // tut 79   
    res.status(200).render('home.pug');      
   });

app.get('/contact',(req,res)=>{                   // tut 79   
     res.status(200).render('contact.pug');      
    });


    app.post('/contactpost',(req,res)=>{  

        
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'test'

});
db.connect((err)=>{
console.log("database connected");
})

        var  name=req.body.name;
        var   phone=req.body.phone;
        var   email=req.body.email;
        var   message=req.body.message;
//    var sql1=`INSERT INTO customer (name,email) VALUES('${name1}','${email}') `;

// console.log(`${name},${phone},${email},${message}`);

//    var sql2=`  INSERT INTO customer (name,phone,email,message) VALUES('${name1}','${phone}','${email}','${message}')`;
//         db.query(sql2,(err,result)=>{
             
//            console.log("data inseted !");
      // });

// res.redirect('/home');


});


app.get('/getgarba',(req,res)=>{

    var db=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'test'
    });
    db.connect((err)=>{
    
        console.log("database connected");
    
    });

    var sql5="SELECT * FROM customer";

    db.query(sql5,(err,result)=>{

        // res.status(200).render('getgarba.pug');

        // console.log(result);

        // res.json('getgarba.pug');
        res.render('getgarba.pug');

       document.getElementById('data').innerHTML=`${result}`;
    // res.send(result);


    });


});


app.get('/createdb',(req,res)=>{

    var db= mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
    })
    db.connect((err)=>{
        console.log('database connected');
    })


var sql6=  ` CREATE DATABASE test`;

db.query(sql6,(err,result)=>{
    // res.send(result);
    res.send("database created ");
})

});


app.get('/createtable',(req,res)=>{

    var db= mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'test'
    })
    db.connect((err)=>{
        
        console.log('database connected');
    })


var sql7=  ` CREATE TABLE customer(name VARCHAR(30),phone INT(15),email VARCHAR(55),message VARCHAR(255))`;

db.query(sql7,(err,result)=>{
    res.send('table created');
})

});


app.post('/contactpost2',(req,res)=>{

var name2= req.body.name2;

var sql7=  ` INSERT INTO customer (name) VALUES('${name1}') `;

db.query(sql7,(err,result)=>{


    res.send('data inserted');


});

});


app.listen(port,()=>{
    console.log(`app is sucessfully started on port ${port}`);
});



