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
app.post('/profilepic', (req,res) => {
    let upload = multer({storage: storage, fileFilter: imageFilter}).single('avatar');
    let user = req.cookies.username;

    upload(req,res,(err) => {
        if(req.fileValidationError){
            return res.send(req.fileValidationError);
        }
        else if(!req.file){
            return res.send('Please select file to upload');
        }
        else if(err instanceof multer.MulterError){
            return res.send(err);
        }
        else if(err){
            return res.send(err);
        }

        let filename = req.file.filename;
        updateImg(user, filename).then(()=>{
            console.log(filename);
            res.cookie('img', filename);
            console.log('Change Complete');
            return res.redirect('feed.html');
        })
    })
})

const updateImg = async (username, filen) => {
    let sql = `UPDATE userinfo SET img = '${filen}' WHERE username = '${username}'`;
    let result = await queryDB(sql);
}

//ทำให้สมบูรณ์
app.get('/logout', (req,res) => {
    res.clearCookie('username')
    res.clearCookie('img')
    return res.redirect('login.html');
})

//ทำให้สมบูรณ์
app.get('/readPost', async (req,res) => {
    let sql = "CREATE TABLE IF NOT EXISTS postdb (id INT AUTO_INCREMENT PRIMARY KEY, reg_date TIMESTAMP, username VARCHAR(255), post VARCHAR(100))";
    let result = await queryDB(sql);
    sql = `SELECT username, post FROM postdb`;
    result = await queryDB(sql);
    result = Object.assign({},result);
    console.log(result);
    res.send(result);
})

//ทำให้สมบูรณ์
app.post('/writePost',async (req,res) => {
    let getPost = req.body.message;
    let sql = `INSERT INTO postdb (username, post) VALUES ("${req.body.user}", "${getPost}")`;
    let result = await queryDB(sql);
    sql = `SELECT username, post FROM postdb`;
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


app.listen(port, hostname, () => {
        console.log(`Server running at   http://${hostname}:${port}/login.html`);
});
