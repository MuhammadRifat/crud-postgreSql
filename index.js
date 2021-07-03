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

app.get('/users', (req, res)=>{
    client.query(`Select * from users`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/user/:id', (req, res)=>{
    client.query(`Select * from users where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.post('/addUser', (req, res)=> {
    const user = req.body;
    let insertQuery = `insert into users(email, name, dob, profession) 
                       values('${user.email}', '${user.name}', '${user.dob}', '${user.profession}')`

    client.query(insertQuery, (err, result)=>{
        res.send(result.rowCount > 0);
    })
    client.end;
})