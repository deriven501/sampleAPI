//David Nghiem
//Assessment 3
//Assessment NodeAPI and ES6 - 01-May-2024

//1. Create a setup for Express Web Server
//2. Configure a route name - Student
//3. Create a express app and configure in server.js to delegate routes with - "Student"
//4. Create API's in default setup - getStudentDetails - Pass Student info like - Name, Age, Address, Session as query string
//5. Save this information received in #4  to a file named studentIfo using fs module async way

//importing express top class and then creating express server

console.log("In server js")
let fs = require("fs")
const express = require('express') //express class constructor
const app = express() //invoking the class to create express app server
const StudentRouter = require("./Routers/StudentRoute")

const port = 9000;

app.use("/Student", StudentRouter)

app.get('/', function(req, res) {
    res.send('Hello World')
});

app.get('/getStudentDetails', function(req, res) {
    let queryString = req.query

    res.json(queryString)
    
    fs.readFile('Text.json','utf8',(err, fileData)=>{
        console.log("information" + fileData)
        let writerStream = fs.createWriteStream("Text.json","utf8");
        if (fileData) {           
            let oldData = JSON.parse(fileData)    
            console.log(oldData)
            writerStream.write(JSON.stringify([...oldData, queryString]));
            writerStream.end();
        }else{
            writerStream.write(JSON.stringify([
                { name : queryString.name,
                age : queryString.age,
                address : queryString.address,
                session : queryString.session
            }]));
            writerStream.end();
        }
    })

})

app.listen(port)
