//Module Dependences

const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const { time } = require('console');
const { getMaxListeners } = require('process');


//List of Variables
const app = express();
const hostname = '127.0.0.1';
const port = process.env.PORT || '80';

app.use(express.urlencoded({ extended: false }));


const MONGODB_URI = 'mongodb+srv://Harshit:Harshit@1209@database-harshit.tdfrn.gcp.mongodb.net/database-harshit?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI || 'mongodb://localhost/database-harshit', {
useNewUrlParser: true,
useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Mongoose is connected!');
});


//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


app.post("/", (req, res) => {
    //Schema
    const Schema = mongoose.Schema;
    const newsletterSchema = new Schema({
        email: String
    });

    //Model
    const newsletter = mongoose.model('newsletter', newsletterSchema);
    var newsletter_email = new newsletter(req.body);

    //Newsletter
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'harshitsharma9270@gmail.com',
            pass: 'Harshit@1209'
        }
    });

    var mailOptions = {
        from: 'harshitsharma9270@gmail.com',
        to: newsletter_email,
        subject: 'Sending Email using Node.js',
        text: 'That was easy! #newsletter'
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.send('Your email has been registered for newsletter!');
});

app.post("/contact",(req,res)=>{
      //Schema
    //   const Schema = mongoose.Schema;
      const contactSchema = new Schema({
          name:String,
          email: String,
          phone:String,
          message:String
      });
  
      //Model
      const contact = mongoose.model('contact', contactSchema);
      var newContact = new contact(req.body);

      newContact.save().then((data) => {
        res.send('Hey, Your message is sent to QuizTown!');
    })
        .catch((error) => {
            res.status(400).send('Oops,Something wrong happened');
        });
});

const home = fs.readFileSync('./views/index.html');
const about = fs.readFileSync('./views/about.html');
const categories = fs.readFileSync('./views/categories.html');
const quizzes = fs.readFileSync('./views/quiz.html');
const quizlevels = fs.readFileSync('./views/quizlevels.html');
// const register = fs.readFileSync('./views/register.html'); 
const contact = fs.readFileSync('./views/contact.html');
// const signin = fs.readFileSync('./views/signin.html');
// const prompt = fs.readFileSync('./views/prompt.html');
const instruction = fs.readFileSync('./views/instruction.html');
const style = fs.readFileSync('./views/index.css');
const phone = fs.readFileSync('./views/phone.css');
const data = fs.readFileSync('./views/data.js');
const setting = fs.readFileSync('./views/settings.js');
const quizScript = fs.readFileSync('./views/quizScript.js');


// For Serving Static Files
app.use('/public', express.static('public'));

//End points

app.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(home);
});
app.get('/about', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(about);
});
app.get('/instruction', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(instruction);
});
// app.get('/prompt', (req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end(prompt);
// });
app.get('/categories', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(categories);
});
app.get('/quiz', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(quizzes);
});
app.get('/quizlevels', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(quizlevels);
});
app.get('/contact', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(contact);
});
// app.get('/register', (req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end(register);
// });
// app.get('/signin', (req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end(signin);
// });
app.get('/index.css', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/css' });
    res.end(style);
});
app.get('/phone.css', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/css' });
    res.end(phone);
});
app.get('/data.js', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    res.end(data);
});
app.get('/settings.js', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    res.end(setting);
});
app.get('/quizScript.js', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    res.end(quizScript);
});


app.listen(port, () => {
    console.log(`Server running at  http://${hostname}:${port}/`);
});
