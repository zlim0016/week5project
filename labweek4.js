let express=require('express');
let app=express();
//let url=require('url');

let db=[];

let exp={
    id:1,
    name:'example1',
    quantity:1,
    price:2,
    cost:2
}

let exp2={
    id:3,
    name:'example2',
    quantity:1,
    price:10,
    cost:2
}

db.push(exp); 
db.push(exp2);

app.get('/newItem/:name/:quantity/:price', function (req,res){
    let newId= Math.round(Math.random()*1000)
    let newItem= {id: newId};
    newItem.name= req.params.name;
    newItem.quantity= parseInt(req.params.quantity);
    newItem.price= parseInt(req.params.price);

    db.push(newItem);
})

app.get('/listAllItems', function (req,res){
    res.send(generateList());
})

app.get('/deleteItem/:id', function (req,res){
    let no= parseInt(req.params.id);
    deleteUser(no);
    res.send(generateList());
})

app.get('/totalValue', function (req,res){
    res.send(totalValue());
})

app.listen(8080);


function generateList() {
    var list='';
    for(let i=0; i<db.length; i++){
        let cost= db[i].quantity*db[i].price;
        list += 'ID: '+ db[i].id + '\xa0\xa0\xa0  NAME: ' + db[i].name  + '\xa0\xa0\xa0  QUANTITY: ' +  db[i].quantity  + '\xa0\xa0\xa0  PRICE: ' +  db[i].price + '\xa0\xa0\xa0  COST: ' + cost + '</br>';
        
    }
    return list;
}

function deleteUser(no){
    for(let i=0; i<db.length; i++){
        if(db[i].id === no){
            db.splice(i);
        }
    }
}



function totalValue(){
    var total=0;
    for(let i=0; i<db.length; i++){
        let quantity= db[i].quantity;
        let price= db[i].price;
        let value= quantity*price;
        total += value;
    }
    return total;
}

totalValue();