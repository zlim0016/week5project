let express = require('express');
let app= express();

app.engine('html',require('ejs').renderFile);
app.set('view engine','html');

/*let bodyparser= require('body-parser');
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyParser.json())*/

var filePath= _dirname + '/views/';
app.use(express.static('public/img'));

app.get('/',function(req,res){
    let fileName= 'index.html';
    res.renderFile(fileName);

});

app.get('/addCustomer', function(req,res){
    let fileName= filePath + 'addcustomer.html';
    res.renderFile(fileName);

});

app.listen(8080);