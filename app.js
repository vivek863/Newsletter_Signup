//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const requst= require("request");
const https = require('https');

const app =express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
  const firstName =req.body.firstName;
  const lastName =req.body.lastName;
const email=req.body.Email;
  const data={
    members: [
      {
        email_address:email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
const jsonData =JSON.stringify(data);

const url= "https://us5.api.mailchimp.com/3.0/lists/8cce32f009";
const options={
  method: "POST",
  auth:"vivek:98520aeda5d0fca70fb65af9e87a98b4-us5"

}

 const request = https.request(url,options,function(response){

  if(response.statusCode===200){
    res.sendFile(__dirname+"/success.html");
  }
  else{
  res.sendFile(__dirname+"/failure.html");}
     response.on("data",function(data){
       console.log(JSON.parse(data));
     })
   })
  request.write(jsonData);
  request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT||3000,function(){
  console.log("server is running on port 3000");
});
// API
// 98520aeda5d0fca70fb65af9e87a98b4-us5
//list // IDEA:
//8cce32f009
