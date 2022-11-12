
//project 3:  make dance website 

// const { stringify } = require("querystring")

// const { addListener } = require("process");

// node js file

// cd to this file path and write this three line inn cmd(vs code)
    // 1-> npm install express
    // 2-> npm install nodemon
    // 3->npm install  pug


const express= require("express");
const path= require("path");
const fs=require("fs");
const app=express();
const  mongoose=require("mongoose");
const bodyparser=require("body-parser");
const mysql=require('mysql');
const { userInfo } = require("os");



// mongoose.connect('mongodb://localhost/contactDance',{useNewUrlParser:true,useUnifiedTopology: true});
const port= process.env.PORT ||  3000;

//TUT_88 MONGOOSE STUFF

      


      
    // define mongoose schema
    //    var contactSchema=new mongoose.Schema({
    //     name: String,
    //     phone: String,
    //     email: String,
    //     message: String


    //    });

    //    var Contact= mongoose.model('Contact1',contactSchema);

  
        // + cmd and write : mongod
       // + cmd and write : mongosh
                     //      use contactSchema
                     //      show collections   
       // write in this directory vscode cmd
       // npm install mongoose
       // npm install body-parser



// express stuff to link static files (css,js files)
// app.use('/static',express.static('static'))
              // OR 
app.use('/static',express.static(path.join(__dirname,'static')));

app.use(express.urlencoded());


// linking pug
app.set('view engine','pug');
app.set('views', path.join(__dirname,'views'));


//create connection to mysql

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'test'

});
db.connect((err)=>{
console.log("database connected");
})


// get post requests 

app.get('/',(req,res)=>{

    //  res.status(200).render('index.pug');      //1

    res.status(200).render('home.pug');      // tut 79

});


app.get('/home',(req,res)=>{                   // tut 79   
    res.status(200).render('home.pug');      
   });

app.get('/contact',(req,res)=>{                   // tut 79   
     res.status(200).render('contact.pug');      
    });

 
   
   

app.post('/contactpost',(req,res)=>{      // same as '/contact' in contact.pug form action

       //tut_79       database is file

                // name=req.body.name1;
                // phone=req.body.phone1;
                // email=req.body.email1;
                // message=req.body.message1;

                // let text=`name ${name}  email: ${email}   phone: ${phone} \n`

                // fs.appendFile('abcd.txt',text,()=>{
                // // document.getElementById('submited').innerHTML="your form submitted sucssesfully"
                // console.log("\n \n your form submitted sucssesfully");
                // });

                // res.status(200).render('contact.pug');



    //tut_88   database is mongodb     

// console.log(req.body);


               
              var  name1=req.body.name1;
             var   phone=req.body.phone1;
             var   email=req.body.email1;
             var   message=req.body.message1;
        var sql1=`INSERT INTO customer (name,email) VALUES('${name1}','${email}') `;
        var sql2=`  INSERT INTO customer (name,phone,email,message) VALUES('${name1}','${phone}','${email}','${message}')`;
             db.query(sql2,(err,result)=>{
                  
                console.log("data inseted !");
              
             

             });

             res.send("data submited we will contact you soon");
     res.redirect('/home');
     

});


app.get('/getgarba',(req,res)=>{

    var db=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'mydb'
    });
    db.connect((err)=>{
    
        console.log("database connected");
    
    });

    var sql5="SELECT * FROM customer";

    db.query(sql5,(err,result)=>{

        res.status(200).render('home.pug');

        // console.log(result);

       document.getElementById('data').innerHTML=result;
    // res.send(result);


    });

  


});
    
     

app.get('/getdata:id',(req,res)=>{

    var db=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'mydb'
    });
    db.connect((err)=>{
    
        console.log("database connected");
    
    });

    // var idis= req.params.id;

    var sql6=  ` SELECT * FROM customer`;
    
    db.query(sql6,(err,result)=>{
    //     res.send(result);

   console.log(result);
   res.send(`${result}`);

    })
    
    
    
    });     

          

         
  


//listen on 
app.listen(port,()=>{
    console.log(`app is sucessfully started on port ${port}`);
});
