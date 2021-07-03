const client = require('./connection.js')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.listen(5000, ()=>{
    console.log("Sever is now listening at port 5000");
})

client.connect();

// load user data by email
app.post('/user', (req, res)=>{
    client.query(`Select * from users where email='${req.body.email}'`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

// check sign in user
app.post('/signIn', (req, res)=>{
    const signInQuery = `Select * from users where email='${req.body.email}' AND password='${req.body.password}'`;
    client.query(signInQuery, (err, result)=>{
        res.send(result.rows.length > 0);
    });
    client.end;
})

// insert user data
app.post('/addUser', (req, res)=> {
    const user = req.body;
    let insertQuery = `insert into users(email, name, dob, profession, password) 
                       values('${user.email}', '${user.name}', '${user.dob}', '${user.profession}', '${user.password}')`

    client.query(insertQuery, (err, result)=>{
        res.send(result.rowCount > 0);
    })
    client.end;
})

// delete user
app.delete('/deleteUser', (req, res)=> {
    let deleteQuery = `delete from users where email='${req.body.email}'`;

    client.query(deleteQuery, (err, result)=>{
        res.send(result.rowCount > 0);
    })
    client.end;
})

// update user data by id
app.put('/updateUser', (req, res)=> {
    let user = req.body;
    let updateQuery = `update users
                       set name = '${user.name}',
                       dob = '${user.dob}',
                       profession = '${user.profession}'
                       where id = ${user.id}`

    client.query(updateQuery, (err, result)=>{
        res.send(result.rowCount > 0);
    })
    client.end;
})