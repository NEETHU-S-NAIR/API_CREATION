// Task1: initiate app and run server at 3000
const express = require('express');
const app =new express();

const PORT=3000
const path=require('path');
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection

const mongoose = require('mongoose');
const EmployeeData = require('./models/employee');
mongoose.connect('mongodb+srv://neethuS115:sureshN115@cluster0.k7axd0h.mongodb.net/CaseStudyDB?retryWrites=true&w=majority')
    .then(() => {
        console.log("my mongodb connected successfully");
    })
    .catch(error => {
        console.log("error")
    })

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist', (req,res) => {
    EmployeeData.find().then(function(data){
        res.send(data);
    })
 })
//TODO: get single data from db  using api '/api/employeelist/:id'
app.get('/api/employeelist/:id', (req, res) => {
    try{
        EmployeeData.findOne({"_id": req.params.id }).then(function(data) {
            res.send(data);
        })  
    } catch (error) {
        console.log(error);
    }
})

//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist', async(req,res) => {
    try{
        let item = req.body;
        console.log(item);
        const user = new EmployeeData(item);
        const savedUser = user.save();
        console.log('saved data:', savedUser);
        res.send(savedUser);
    } catch (error) {
        console.log(error);
    } 
})
//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id', (req,res) => {
    let id = req.params.id;
    EmployeeData.findByIdAndDelete({"_id": id})
    .then(() => {
        console.log('success')
        res.send();
    })
})

//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist', (req, res) => {
    let id = req.body._id;
    EmployeeName = req.body.name,
    EmployeeLocation = req.body.location,
    EmployeePosition = req.body.position,
    EmployeeSalary = req.body.salary,
    EmployeeData.findByIdAndUpdate({"_id": id},{
        $set: {
            "name": EmployeerName,
            "location": EmployeerLocation,
            "position": EmployeerPosition,
            "salary": EmployeerSalary
        }
    })
    .then(function() {
        res.send();
    })
})

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

app.listen(PORT,(req,res) => {
    console.log("The app is listening to port 3000");
});



