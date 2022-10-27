const mongoose = require('mongoose');
const { stringify } = require('querystring')
const Schema = mongoose.Schema;
const employee_detail = new Schema({
    name: String,
    location: String,
    position: String,
    salary: Number
})

const EmployeeData = mongoose.model('employeelist', employee_detail);
module.exports = EmployeeData;