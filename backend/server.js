const express = require('express')
const mysql = require('mysql2');
const app = express()
// const cors = require('cors');
// app.use(cors());



//app.use(express.static("public"))
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  
//     if (req.method === 'OPTIONS') {
//       res.sendStatus(204);
//     } else {
//       next();
//     }
//   });
app.use(express.json());
const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root'
  });

  async function runQuery(query, params) {
    try {
      // Подготавливаем запрос
      const preparedStatement = connection.prepare(query);
      // Выполняем подготовленный запрос с параметрами
      const [results] = await preparedStatement.execute(params);
      // Закрываем подготовленный запрос
      preparedStatement.finalize();
      return results;
    } catch (error) {
      // Обработка ошибок
      console.error('Ошибка при выполнении запроса:', error);
      throw error;
    }
  }
app.post('/auth', (req, res) => { 
    const login =  req.body.log;
    const password =  req.body.pass;
    const user = [login, password];
    //res.status(200).json({ message: user });
    connection.query('SELECT * FROM web.users', function (error, results, fields) {

            if (error) {
                res.send({ express: error }); 
                return;
            }
            res.status(200).json({ message: results, status: "returned from query result" });
            
        });
    
    
  }); 




//   app.get('/auth', (req, res) => {
//     res.send("ok");
//     res.json('message: kill me');
//     const { login, password } = req.body;
    //res.status(200).send({ message: 'User authenticated.', body: req.body });
    
    // const { login, password } = req.body;
    // if (login === 'admin' && password === 'secret') {
    //   // Авторизуйте пользователя
    //   // ...
    //   res.status(200).send({ message: 'User authenticated.' });
    // } else {
    //   // Неверные учетные данные
    //   res.status(401).send({ message: 'Invalid credentials.' });
    // }
 // });
  

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

  
  