
import {readLoginData} from '../utils/fileReader.js';

const users = readLoginData('loginData.txt');

users.forEach(user =>{
    console.log(`testing User  >>> Email: ${user.email}, >>> Password: ${user.password}, >>> Role: ${user.role}`);
})





