var express = require('express');
var {mongoose} = require('./db/mongoose');

var {Person} = require('./models/person'); 
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');
var bodyParser = require('body-parser'); 
var path = require('path');
var app = express();

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.static(__dirname + "/public"));

//TODO ADD THIS
mongoose.set('useCreateIndex', true);

const port = 8000;

app.get('/', (req, res)=>{
    //res.send({response: "Hello UCode Developer", port: 8000});

    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', authenticate, (req, res)=>{
    try{
        res.sendFile(path.join(__dirname, 'about.html'));
    }catch(e){
        res.send(e);
    }
    
});

app.post('/person', async (req, res)=>{

    console.log(req.body);

    var person = new Person({
        name: req.body.name,
        age: req.body.age,
        isFun: req.body.isFun
    });

    await person.save(); 

    res.status(200).send(person); 
});

app.post('/user/create', async (req, res)=>{

    console.log(req.body); 

    var user = new User({
        email: req.body.email,
        password: req.body.password
    });

    try{
        const savedUser = await user.save(); 
        res.status(200).send(savedUser);
    }
    catch(e){
        res.status(404).send(e);
    }
    

});

app.post('/users/login', async (req,res)=>{

    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);

        const createdToken = await user.generateAuthToken();

        res.status(200).header('x-auth', createdToken).send(user);
    }catch(e)
    {
        res.status(400).send({errorMsg: e});
    } 
    
});

app.patch('/person/:name', async (req, res)=>{

    console.log(req.params.name); 

    await Person.findOneAndUpdate({name: req.params.name},
        {
            age: req.body.age,
            isFun: req.body.isFun
        });

    res.status(200).send(`Updated: ${req.params.name}`); 

}); 

app.delete('/person/:name', async (req, res)=>{

    console.log(req.params.name);

    await Person.findOneAndDelete({name: req.params.name});

    res.status(200).send(`Deleted: ${req.params.name}`); 

});

app.listen(port, ()=>{
    console.log(`Server re-started on ${port}`);
})