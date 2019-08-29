let express= require('express');
let app= express();

let bodyParser= require('body-parser'); //used to parse the payload of the incoming POST requests. 
app.use(bodyParser.urlencoded({extended:false})); //allow Express to understand the urlencoded format

app.engine('html', require('ejs').renderFile);
app.set('view engine','html');

app.use(express.static('funcss'));
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
    res.render('indexfun.html');
})

app.get('/fun2', function (req, res){
    res.render('fun2.html');
})

app.get('/fun1', function (req,res){
    res.render('fun1.html', {task: db});
})

app.get('/fun3', function (req,res){
    res.render('fun3.html', {task: db});
})

app.get('/fun4', function (req,res){
    res.render('fun4.html', {task: db});
})

//console.log(db);

app.listen(8080);