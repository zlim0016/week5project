let http= require('http');
//let urlParse= require('url');
let fs=require('fs');
const { parse } = require('querystring');


http.createServer(function (request, response){
   

    //let pathName=request.url
    let m=request.method
    //let queryString=urlParse.parse(pathName,true).query;
    //console.log(queryString);
    

    
   /* fs.readFile('./index.html',function(error,content){
        response.write(content);
        response.end();
    }) */
        
    if (m === 'POST'){
        console.log('YOU GOT A POST!');
        let body='';
        request.on('data',chunk => {
            body += chunk.toString();
        })
        
        request.on('end',()=> {
            let items=parse(body);
            console.log(items.username);
            console.log(items.password);
            if(items.username === 'admin' && items.password === 'pass'){
                fileName='./mainpage.html';
                
                }else{
                    fileName='./accessdenied.html';
                    
                }

                fs.readFile(fileName,function(error,content){
                    response.writeHead(200,{'Content-Type': 'text/html'});
        
                    response.end(content);
                 })
            
        })
        
    } else {
        fs.readFile('./index.html',function(error,content){
            response.write(content);
            response.end();
    })
}
}).listen(8888);

console.log('success!!!!!!!!!');