const express = require('express');
const app = express();
const fs = require('fs');
const hostname = 'localhost';
const port = 3001;
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'public/img/');
    },

    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

const imageFilter = (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

// ใส่ค่าตามที่เราตั้งไว้ใน mysql
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Chamin-480054",
    database: "assign12"
})

con.connect(err => {
    if(err) throw(err);
    else{
        console.log("MySQL connected");
    }
})

const queryDB = (sql) => {
    return new Promise((resolve,reject) => {
        // query method
        con.query(sql, (err,result, fields) => {
            if (err) reject(err);
            else
                resolve(result)
        })
    })
}

app.post('/regisDB', async (req,res) => {
    let sql = "CREATE TABLE IF NOT EXISTS userinfo (id INT AUTO_INCREMENT PRIMARY KEY, reg_date TIMESTAMP, username VARCHAR(255), password VARCHAR(100), img VARCHAR(100))";
    let result = await queryDB(sql);
    let checkpassword = req.body.password;
    let recheckpassword = req.body.repassword;
    // ตรวจ password
    if(checkpassword != recheckpassword){
        return res.redirect('register.html');
    }
    sql = `INSERT INTO userinfo (username, password, img) VALUES ("${req.body.username}", "${req.body.password}", "avatar.png")`;
    result = await queryDB(sql);
    console.log("New record created successfullyone");
    return res.redirect('login.html');

})

//ทำให้สมบูรณ์
app.get('/logout', (req,res) => {
    res.clearCookie('username')
    res.clearCookie('img')
    return res.redirect('login.html');
})

//ทำให้สมบูรณ์
app.get('/createPost', async (req,res) => {
    let sql = "CREATE TABLE IF NOT EXISTS post1db (id INT AUTO_INCREMENT PRIMARY KEY, reg_date TIMESTAMP, username VARCHAR(255), post VARCHAR(100))";
    let result = await queryDB(sql);
    sql = "CREATE TABLE IF NOT EXISTS post2db (id INT AUTO_INCREMENT PRIMARY KEY, reg_date TIMESTAMP, username VARCHAR(255), post VARCHAR(100))";
    result = await queryDB(sql);
    sql = "CREATE TABLE IF NOT EXISTS post3db (id INT AUTO_INCREMENT PRIMARY KEY, reg_date TIMESTAMP, username VARCHAR(255), post VARCHAR(100))";
    result = await queryDB(sql);
    sql = "CREATE TABLE IF NOT EXISTS post4db (id INT AUTO_INCREMENT PRIMARY KEY, reg_date TIMESTAMP, username VARCHAR(255), post VARCHAR(100))";
    result = await queryDB(sql);
    sql = "CREATE TABLE IF NOT EXISTS post5db (id INT AUTO_INCREMENT PRIMARY KEY, reg_date TIMESTAMP, username VARCHAR(255), post VARCHAR(100))";
    result = await queryDB(sql);
})

app.get('/readPost1', async (req,res) => {
    let sql = "CREATE TABLE IF NOT EXISTS post1db (id INT AUTO_INCREMENT PRIMARY KEY, reg_date TIMESTAMP, username VARCHAR(255), post VARCHAR(100))";
    let result = await queryDB(sql);
    sql = `SELECT username, post FROM post1db`; 
    result = await queryDB(sql);
    result = Object.assign({},result);
    console.log(result);
    res.send(result);
})

app.get('/readPost2', async (req,res) => {
    let sql = "CREATE TABLE IF NOT EXISTS post2db (id INT AUTO_INCREMENT PRIMARY KEY, reg_date TIMESTAMP, username VARCHAR(255), post VARCHAR(100))";
    let result = await queryDB(sql);
    sql = `SELECT username, post FROM post2db`; 
    result = await queryDB(sql);
    result = Object.assign({},result);
    console.log(result);
    res.send(result);
})

app.get('/readPost3', async (req,res) => {
    let sql = "CREATE TABLE IF NOT EXISTS post3db (id INT AUTO_INCREMENT PRIMARY KEY, reg_date TIMESTAMP, username VARCHAR(255), post VARCHAR(100))";
    let result = await queryDB(sql);
    sql = `SELECT username, post FROM post3db`; 
    result = await queryDB(sql);
    result = Object.assign({},result);
    console.log(result);
    res.send(result);
})

app.get('/readPost4', async (req,res) => {
    let sql = "CREATE TABLE IF NOT EXISTS post4db (id INT AUTO_INCREMENT PRIMARY KEY, reg_date TIMESTAMP, username VARCHAR(255), post VARCHAR(100))";
    let result = await queryDB(sql);
    sql = `SELECT username, post FROM post4db`; 
    result = await queryDB(sql);
    result = Object.assign({},result);
    console.log(result);
    res.send(result);
})

app.get('/readPost5', async (req,res) => {
    let sql = "CREATE TABLE IF NOT EXISTS post5db (id INT AUTO_INCREMENT PRIMARY KEY, reg_date TIMESTAMP, username VARCHAR(255), post VARCHAR(100))";
    let result = await queryDB(sql);
    sql = `SELECT username, post FROM post5db`; 
    result = await queryDB(sql);
    result = Object.assign({},result);
    console.log(result);
    res.send(result);
})

//ทำให้สมบูรณ์
app.post('/writePost',async (req,res) => {
    let getPost = req.body.message;
    let sql = `INSERT INTO ${req.body.table} (username, post) VALUES ("${req.body.user}", "${getPost}")`;
    let result = await queryDB(sql);
    sql = `SELECT username, post FROM ${req.body.table}`;
    result = await queryDB(sql);
    result = Object.assign({},result);
    console.log(result);
    res.send(result);
})

app.get('/readScore', async (req,res) => {
    let sql = "CREATE TABLE IF NOT EXISTS scoredb (id INT AUTO_INCREMENT PRIMARY KEY, reg_date TIMESTAMP, username VARCHAR(255), score INT, likes INT)";
    let result = await queryDB(sql);
    sql = `SELECT id, username, score, likes FROM scoredb ORDER BY SCORE DESC`;
    result = await queryDB(sql);
    result = Object.assign({},result);
    console.log(result);
    res.send(result);
})

app.post('/writeScore',async (req,res) => {
    let getScore = req.body.score;
    let sql = `INSERT INTO scoredb (username, score, likes) VALUES ("${req.body.user}", "${getScore}", "${0}")`;
    let result = await queryDB(sql);
    sql = `SELECT username, score, likes FROM scoredb ORDER BY SCORE DESC`;
    result = await queryDB(sql);
    result = Object.assign({},result);
    console.log(result);
    res.send(result);
})

//ทำให้สมบูรณ์
app.post('/checkLogin',async (req,res) => {
    let userForm = req.body.username;
    let passForm = req.body.password;
    let sql = `SELECT * FROM userinfo WHERE username = '${userForm}' AND password = '${passForm}'`
    let result = await queryDB(sql);
    if(result.length == 0){
        console.log("False")
        return res.redirect('login.html?error=1')
    }
    else if(userForm == result[0].username && passForm == result[0].password){
        res.cookie('username', userForm)
        res.cookie('img', result[0].img)
        console.log("Now, You are Log in")
        return res.redirect('homepage.html');
    }
    console.log(result)
})

app.post('/writeLikes',async (req,res) => {
    let sql = `UPDATE scoredb 
    SET likes = '${req.body.like}' 
    WHERE id = '${req.body.id}'`;
    result = await queryDB(sql);
    res.send({succes:true});
})

app.get('/comment1', (req,res) => {
    res.cookie('comment', 1);
    return res.redirect('comment.html');
})

app.get('/comment2', (req,res) => {
    res.cookie('comment', 2);
    return res.redirect('comment.html');
})

app.get('/comment3', (req,res) => {
    res.cookie('comment', 3);
    return res.redirect('comment.html');
})

app.get('/comment4', (req,res) => {
    res.cookie('comment', 4);
    return res.redirect('comment.html');
})

app.get('/comment5', (req,res) => {
    res.cookie('comment', 5);
    return res.redirect('comment.html');
})

app.listen(port, hostname, () => {
        console.log(`Server running at   http://${hostname}:${port}/login.html`);
});
