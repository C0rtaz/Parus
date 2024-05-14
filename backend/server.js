const express = require('express')
const mysql = require('mysql2');
const app = express()
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

app.post('/auth', (req, res) => { 
    const login =  req.body.log;
    const password =  req.body.pass;
    const user = [login, password];
    //res.status(200).json({ message: user });
    connection.query('SELECT * FROM web.users where login = ? and password = ?', user, function (error, results, fields) {
            if (error) {
                res.send({ express: error }); 
                return;
            }
            res.status(200).json({ message: results, status: "returned from query result" }); 
        });
  }); 
app.post('/user/getStudent',(req, res) =>{
  const userID = req.body.id;
  connection.query('SELECT * FROM web.student WHERE userID = ?', userID, function (error, results, fields) {
    if (error) {
        res.send({ express: error }); 
        return;
    }
    res.status(200).json({ results }); 
});
});
app.post('/shedule/get',(req, res) =>{
  const userID = req.body.id;
  connection.query('SELECT sh.id, s.nameService, sh.serviceID, sh.timeStart, sh.timeEnd, sh.teacherName, st.id as studentID, st.name as studentName, st.surname as studentSurname, st.secsurname as studentSecsurname FROM web.services s JOIN web.servicesstudent ss ON s.id = ss.serviceID JOIN web.student st ON ss.studentID = st.id join web.schedule sh on sh.serviceID = s.id WHERE ss.isActive = 1 AND st.userID = ?', userID, function (error, results, fields) {
    if (error) {
        res.send({ express: error }); 
        return;
    }
    res.status(200).json({ results }); 
});
});
app.post('/shedule/user/get',(req, res) =>{
  const data = [req.body.userID, req.body.serviceID];
  connection.query('select s.*, ser.nameService from web.student s join web.users u on u.id = s.userID join web.servicesstudent ss on ss.studentID = s.id join web.schedule sh on sh.serviceID = ss.serviceID join web.services ser on ser.id = ss.serviceID where ss.isActive = 1 and u.id = ? and ser.id = ?', data, function (error, results, fields) {
    if (error) {
        res.send({ express: error }); 
        return;
    }
    console.log(results);
    res.status(200).json({ results }); 
});
});

  app.post('/addUser',(req, res) => { 
    const user = [
      req.body.name,
      req.body.surname, 
      req.body.secsurname,
      req.body.phone,
      req.body.login, 
      req.body.password,
      req.body.roleID
    ]
    const query = 'INSERT INTO web.users (name, surname, secsurname, phone, login, password, roleID) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, user, function (error, results, fields) {
            if (error) {
                res.send({ express: error }); 
                return;
            }
            res.status(200).json({ message: "success" });
            
        });
    
    
  });
  
  app.post('/addSchedule',(req, res) => { 
    const schedule = [
      req.body.serviceID,
      req.body.timeStart, 
      req.body.timeEnd,
      req.body.teacherName,
    ]
    const query = 'INSERT INTO web.schedule (serviceID, timeStart, timeEnd, teacherName) VALUES (?, ?, ?, ?)';
    connection.query(query, schedule, function (error, results, fields) {
            if (error) {
                res.send({ express: error }); 
                return;
            }
            res.status(200).json({ message: "success" });
            
        });
    
    
  }); 
  app.post('/addStudent',(req, res) => { 
    const student = [
      req.body.userID,
      req.body.name, 
      req.body.surname,
      req.body.secsurname,
    ]

    const query = 'INSERT INTO web.student (userID, name, surname, secsurname) VALUES (?, ?, ?, ?)';
    connection.query(query, student, function (error, results, fields) {
            if (error) {
                res.send({ express: error }); 
                return;
            }
            res.status(200).json({ message: "success" });
            
        });
    
    
  }); 
  app.get('/news/get',(req, res) => {
    const query = 'SELECT * FROM web.news';
    connection.query(query, function (error, results, fields){
      if (error) {
        res.send({ express: error }); 
        return;
      }
      res.status(200).json({ results });
    });
  });

  app.get('/news/add',(req, res) => {
    const data = req.body;
    const query = 'INSERT INTO web.news (title, descript, img) VALUES (?, ?, ?)';
    connection.query(query, data, function (error, results, fields){
      if (error) {
        res.send({ express: error }); 
        return;
      }
      res.status(200).json("success");
    });
  });
  app.get('/services/get',(req, res) => {
    const query = 'SELECT * FROM web.services';
    connection.query(query, function (error, results, fields){
      if (error) {
        res.send({ express: error }); 
        return;
      }
      res.status(200).json({ results });
    });
  });

  app.get('/services/add',(req, res) => {
    const data = req.body;
    const query = 'INSERT INTO web.news (title, descript, img) VALUES (?, ?, ?)';
    connection.query(query, data, function (error, results, fields){
      if (error) {
        res.send({ express: error }); 
        return;
      }
      res.status(200).json("success");
    });
  });
  app.get('/sheduleInfo/get',(req, res) => {
    const query = 'SELECT * FROM web.schedule';
    connection.query(query, function (error, results, fields){
      if (error) {
        res.send({ express: error }); 
        return;
      }
      res.status(200).json({ results });
    });
  });