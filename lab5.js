let express= require('express');
let app= express();

let bodyParser= require('body-parser'); //used to parse the payload of the incoming POST requests. 
app.use(bodyParser.urlencoded({extended:false})); //allow Express to understand the urlencoded format

app.engine('html', require('ejs').renderFile);
app.set('view engine','html');

app.use(express.static('img'));
app.use(express.static('views'));
app.use(express.static('css'));


let db=[];
example1={
    taskName: 'e-Business',
    taskDue: '12/12/2019',
    taskDesc: 'Oral Presentation'
}
db.push(example1);

app.get('/', function (req, res){
    res.render('index5.html');
})

app.get('/addtask', function (req, res){
    res.render('addtask.html');
})

app.get('/listtask', function (req,res){
    res.render('listtask.html', {task: db});
})

app.post('/newTask', function (req, res){
    db.push(req.body);
    res.render('listtask.html', {task: db});
    
})
//console.log(db);

app.listen(8080);