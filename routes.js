const express = require('express');
const bodyParser = require('body-parser');
const mongo=require("mongoose");
const jwt= require("jsonwebtoken");
const jwtPassword="123456";
const app = express();
const cors = require('cors');
const multer = require('multer');



const upload = multer();
app.use(cors());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


  mongo.connect(url)
  let user_schema= mongo.Schema({
      username: String,
      password:String,
  
  })
  let todo_schema= mongo.Schema({
    _id: Number,
    username: String,
    todo: String,
    due:Date,
})

const id=1;
  
  model_username=mongo.model("model_username",user_schema,"user_rec");
  model_todo=    mongo.model("model_todo",todo_schema,"todo_rec");

app.post("/signin/add",upload.none(),function(req, res){
  const Username = req.body["username"];
  const Password = req.body["password"];

  console.log(Username,Password);
  console.log(req.body);
  console.log("request to add user received");
try{
  let new_user= user_schema({username:Username, password:Password});
  new_user.save();
  console.log("new user added");
  req.json({
    msg:"New User is added successfully, Retry again to Login",
  });
}
catch(error){
  req.json({
    msg:"Inapporiate UserName/ Password",
  })
  console.log(error);

}
 
});
  
app.post("/signin", upload.none(),function (req, res) {
    const Username = req.body["username"];
    const Password = req.body["password"];
  
    console.log(Username,Password);
    console.log(req.body);
    console.log("request received");
  
    model_username.find({username:{$eq : Username}}).
    then((user)=>{
      if (user.length==0){
        req.json({
          msg:"user not found"
        })
      }
        if(user.length >0 && user[0]["password"]==Password){
        var token = jwt.sign({username: Username },jwtPassword );
        console.log(token);
        res.status(200).json({
            msg:"sign in Successfull",
            token: token,
            });
        }
        else{
          console.log("password is invalid");
            res.status(404).json({
                msg:"password is invalid",
                });
        }
    })
    .catch(()=>{
        
    })
  });



app.post("/add", upload.none(),async function (req, res) {
    
    const todo= req.body['todo'];
    const id= req.body['id'];
    const due= req.body['due'];
    const tok= req.headers['authorization'];

    console.log(req.body,tok);
    console.log("request received");

    try{ 
      
     let user= jwt.verify(tok,jwtPassword);
      let a= (user)=>{
        const Username=user.username;
        let todo_add= model_todo({_id:id,username:Username,todo:todo,due:due});
        todo_add.save();
        console.log('saving');
        res.status(200).json({
          id:id,
        });
      }
      a(user);
    }

    catch(error){
      console.log(error)
      res.status(404).json({
        msg:`${error}`,
      });
    } 
  });


  app.get('/todos',(req,res)=>{
    console.log("request received");
    const tok= req.headers['authorization'];
    try{ 
      console.log("entered try");
      let user= jwt.verify(tok,jwtPassword);
      console.log(user);
      let func_user= (user)=>{
        const Username=user.username;
        console.log(Username);
        model_todo.find({username:{$eq : Username}}).then
        ((todo)=>{
          console.log("the todos are : ", todo)
          res.json({
              todo:todo
          })
        })
      .catch((error)=>{
        console.log("error occured  ",error);
      })
    }
    func_user(user);
    }
    catch(error){
      console.log(error);
      res.status(404);
      
    } 
  });
 
  app.delete('/todos',(req,res)=>{
    console.log("request to delete received");
    console.log(req.body);
    const ID = req.body.id;
    // after verification only 

    model_todo.deleteOne(
        { _id:ID} ,
    ).then
    ((todo)=>{
        console.log("item deleted");
        console.log(todo);
        res.status(200).json({
            msg:"ok, deleted"
        })
        
    })
    .catch((error)=>{
        res.json({
           msg: '404 Not Found ',
        })
        console.log("error occured  ",error);
    })
})

    

app.use((req, res, next) => {
    res.status(404).send("wrong path");
  });

app.listen(3000);
