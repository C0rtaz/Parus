const express = require('express')
const mysql = require('mysql2');
const app = express()
const cors = require('cors');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  
    if (req.method === 'OPTIONS') {
      res.sendStatus(204);
    } else {
      next();
    }
  });

const port = 5000;
// app.listen(port, () => { console.log('Server is up') })

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root'
  });

  app.use(express.json());
  app.get('/auth', (req, res) => {
    // Здесь ваш код для обработки POST-запроса на /auth
    // Например, проверка учетных данных пользователя
    const { login, password } = req.body;
    if (login === 'admin' && password === 'secret') {
      // Авторизуйте пользователя
      // ...
      res.status(200).send({ message: 'User authenticated.' });
    } else {
      // Неверные учетные данные
      res.status(401).send({ message: 'Invalid credentials.' });
    }
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
// app.get('/auth', (req, res) => { 

//     console.log(req.body);
//     // const { logInput, passInput } = req.body;
//     // connection.query('SELECT * FROM web.users WHERE login = ? and password = ?', [logInput, passInput], function (error, results, fields) {
//     // if (error) {
//     //     res.send({ express: error }); 
//     //     return;
//     // }
//     // res.send({ results });
//     // console.log(results);
//   //});
    
//  });

  
  