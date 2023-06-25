var express = require('express');
var http = require('http');
var path = require('path');
var nodemailer = require('nodemailer');
var app = express();
var server = http.Server(app);
var port = 500;
require('dotenv').config({ path: './config.env' });
var user=process.env.AUTH_EMAIL;
var pass=process.env.AUTH_PASSWORD;

app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/index.html")));


app.get("/", function (req, response) {
    response.sendFile(path.join(__dirname, "page/index.html"));
}); 

app.post("/send-email", function(req,response){
    var from=req.body.from;
    var to=req.body.to;
    var subject=req.body.subject;
    var message=req.body.message;

    var transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:`${user}`,
            pass:`${pass}`
        }
    });

    var mailOptions={
        from:from,
        to:to,
        subject:subject,
        text:message

    }

    transporter.sendMail(mailOptions, function(err,info){
        if(err){
            console.log(err)
        }
        else{
            console.log("email send:" + info.response);
        }

        response.redirect("/");
    }); 


});

server.listen(port, function(){
     console.log("starting server on port: "+port); 
})
