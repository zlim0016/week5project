//express
let express= require('express');
let app= express();

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
})

//bodyParser
let bodyParser= require('body-parser'); //used to parse the payload of the incoming POST requests. 
app.use(bodyParser.urlencoded({extended:false})); //allow Express to understand the urlencoded format

app.engine('html', require('ejs').renderFile);
app.set('view engine','html');

app.use(express.static('img'));
app.use(express.static('views'));
app.use(express.static('css'));



app.get('/', function (req, res){
    res.render('index5.html');
})

app.get('/addtask', function (req, res){
    res.render('addtask.html');
})

app.get('/deletetask', function (req, res){
    res.render('deletetask.html');
})

app.get('/updatetask', function (req, res){
    res.render('updatetask.html');
})

app.get('/listtask', function (req,res){
    db.collection('week5table').find({}).toArray(function (err, data){
        res.render('listtask.html', {task: data});
    })
    
})

app.get('/deleteOldComplete', function (req, res){

    
    db.collection('week5table').deleteMany({taskStatus: 'Complete', taskDue: { $gte: new Date('09-03-2019') } } , function (err, obj) {
        console.log(obj.result);
    })

    db.collection('week5table').find({}).toArray(function (err, data){
        res.render('listtask.html', {task: data});
    })
   
    
})


app.post('/newTask', function (req, res){
    let task= req.body;
    task.taskDue= new Date(task.taskDue);
    db.collection('week5table').insertOne(task);
    db.collection('week5table').find({}).toArray(function (err, data){
        res.render('listtask.html', {task: data});
    })
    
})


app.post('/deleteTask', function (req, res){
    let id= req.body._id

    
    db.collection('week5table').deleteOne({_id: new mongodb.ObjectID(id)}, function (err, obj) {
        console.log(obj.result);
    });
    db.collection('week5table').find({}).toArray(function (err, data){
        res.render('listtask.html', {task: data});
    })
   
    
})

app.post('/updateTask', function (req, res){
    let id= req.body._id;
    let status= req.body.newStatus;
    console.log(status,id);
    db.collection('week5table').updateOne({_id: new mongodb.ObjectID(id)}, {$set: {taskStatus: status}}, { upsert: false},function (err, obj) {
    });

    db.collection('week5table').deleteMany({taskStatus: 'Complete'}, function (err, obj) {
        console.log(obj.result);
    }); //delete all completed tasks

    db.collection('week5table').find({}).toArray(function (err, data){
        res.render('listtask.html', {task: data});
    })
   
    
})

app.listen(8080);