//express
let express= require('express');
let app= express();

/*
//mongoDB
let mongodb= require('mongodb');
let MongoClient= mongodb.MongoClient;
let url= 'mongodb://localhost:27017/'
let db;
MongoClient.connect(url, {useNewUrlParser: true}, function (err, client){
    if (err){
        console.log( 'Err  ', err);
    } else {
        console.log('Connected successfully to Mongo server');
        db= client.db('fit2095');
    }
}) */

//Mongoose
let mongoose = require('mongoose');
let Task= require('./models/taskschema');
let Developer= require('./models/developerschema');
let url='mongodb://localhost:27017/fit2095';
mongoose.connect(url, function (err) {});




//bodyParser
let bodyParser= require('body-parser'); //used to parse the payload of the incoming POST requests. 
app.use(bodyParser.urlencoded({extended:false})); //allow Express to understand the urlencoded format

app.engine('html', require('ejs').renderFile);
app.set('view engine','html');

app.use(express.static('img'));
app.use(express.static('views'));
app.use(express.static('css'));


//GET
app.get('/', function (req, res){
    res.render('index5.html');
})

app.get('/addtask', function (req, res){
    res.render('addtask.html');
})

app.get('/deletetask', function (req, res){
    res.render('deletetask.html');
})

app.get('/deletecomplete', function (req, res){
    res.render('deletecomplete.html');
})



app.get('/updatetask', function (req, res){
    res.render('updatetask.html');
})

app.get('/listtask', function (req,res){
    Task.find().exec(function (err, data){
        res.render('listtask.html', {task: data});
    })
    
})

app.get('/listdeveloper', function (req,res){
   Developer.find().exec(function (err, data){
        res.render('listdeveloper.html', {developer: data});
    })
    
})

app.get('/adddeveloper', function (req, res){
    res.render('adddeveloper.html');
})


app.get('/changename/:oldfirstname/:newfirstname', function (req, res){
    oldName= req.params.oldfirstname;
    newName= req.params.newfirstname;
    console.log(oldName);
    console.log(newName);
    Developer.updateMany( {'name.firstName': oldName}, {$set: {'name.firstName': newName}}, function (err, doc){
        console.log(doc);
    });

})


//POST
app.post('/newTask', function (req, res){
    let task= req.body;
    
    let task1= new Task({
        _id: new mongoose.Types.ObjectId(),
        taskName: task.taskName,
        assignTo: task.assignTo,
        dueDate: task.taskDue,
        taskStatus: task.taskStatus,
        taskDescription: task.taskDesc
    })

    task1.save(function (err){
        if (err) throw err;
        console.log('Task successfully added to DB')

        Task.find().exec(function (err, data){
            res.render('listtask.html', {task: data});
        })
    })

    
})

app.post('/newDeveloper', function (req, res){
    let developer= req.body;
    
    let dev= new Developer({
        _id: new mongoose.Types.ObjectId(),
        name: {
            firstName: developer.firstname,
            lastName: developer.lastname
        },
        level: developer.level,
        address: {
            state: developer.state,
            suburb: developer.suburb,
            street: developer.street,
            unit: developer.unit
        }

        
    })

    dev.save(function (err){
        if (err) throw err;
        console.log('Developer successfully added to DB')

        Developer.find().exec(function (err, data){
            res.render('listdeveloper.html', {developer: data});
        })
    })
    
    

})


app.post('/deleteTask', function (req, res){
    let id= req.body._id

    Task.deleteOne({'_id': id}, function (err, doc){
        console.log(doc);
    })
    
    Task.find().exec(function (err, data){
        res.render('listtask.html', {task: data});
    })
   
    
})

app.post('/deleteComplete', function (req, res){
    Task.deleteMany({'taskStatus': 'Complete'}, function (err,doc){
        console.log(doc);
        
        Task.find().exec(function (err, data){
            res.render('listtask.html', {task: data});
        })
    })
   
    
})

app.post('/updateTask', function (req, res){
    let id= req.body._id;
    let status= req.body.newStatus;
    console.log(status,id);
    
    Task.updateOne({'_id': id}, {$set: {'taskStatus': status}}, function (err, doc){
        console.log(doc);

        Task.find().exec(function (err, data){
            res.render('listtask.html', {task: data});
        })
    })
   
    
    
})

app.listen(8080);