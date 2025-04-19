var express=require('express');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var path = require('path');

const app=express()

app.use(bodyParser.json())
app.use(express.static('views'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'));
app.use.express.static(__dirname+'/pages/login/views')
app.use(express.static(path.join(__dirname, 'views')));
mongoose.connect("mongodb://localhost:27017/userDB")
var db=mongoose.connection
db.on("error",()=> console.log("Error in connecting to database"))
db.once("open",()=> console.log("Connected to database"))   

app.post("/Sign_up",(req,res)=>{
    var name = req.body.name
    var email = req.body.email
    var password = req.body.password
    var phonenumber = req.body.phonenumber

    var data={
        "name": name,
        "email": email,
        "password": password,
        "phonenumber": phonenumber

    }
    db.collection('users').insertOne(data,(err, collection)=>{
        if(err) {
            throw err;
        }
        console.log("Record inserted successfully")
    })
    return res.sendFile(__dirname + '/views/signup_successful.html');
})
app.post("/Sign_up", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var phonenumber = req.body.phonenumber;

    // MongoDB la email check pannudhu
    db.collection('users').findOne({ email: email }, (err, existingUser) => {
        if (err) throw err;

        if (existingUser) {
            // Already user irukkaan
            return res.send(`<h2>User already registered with this email.</h2>`);
        } else {
            // Pudhu user ah insert pannudhu
            var data = {
                name,
                email,
                password,
                phonenumber
            };

            db.collection('users').insertOne(data, (err, collection) => {
                if (err) throw err;
                console.log("New user registered");
                return res.sendFile(__dirname + '/views/signup_successful.html');
            });
        }
    });
});
app.post("/userLogin", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    db.collection('users').findOne({ email: email }, (err, user) => {
        if (err) throw err;

        if (!user) {
            // User not found
            return res.send("<h2>User not found. Please sign up first.</h2>");
        }

        if (user.password === password) {
            // Password match - Login success
            return res.sendFile(__dirname + "/views/dashboard.html"); // or dashboard
        } else {
            // Wrong password
            return res.send("<h2>Invalid password. Try again.</h2>");
        }
    });
});


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.sendFile(__dirname + '/views/login.html');
}).listen(3000);

console.log("Server is running on port 3000");
