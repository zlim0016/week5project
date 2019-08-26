let express=require('express');
let router= express.Router();
//let url=require('url');

let db=[];

router.get('/newItem/:name/:quantity/:price', function (req,res){
    let newId= Math.round(Math.random()*1000)
    let newItem= {id: newId};
    newItem.name= req.params.name;
    newItem.quantity= parseInt(req.params.quantity);
    newItem.price= parseInt(req.params.price);

    db.push(newItem);
})

router.get('/listAllItems', function (req,res){
    res.send(generateList());
})

router.get('/deleteItem/:id', function (req,res){
    let no= parseInt(req.params.id);
    deleteUser(no);
    res.send(generateList());
})

router.get('/totalValue', function (req,res){
    res.send('Warehouse value is \xa0'+totalValue());
})

module.exports= router; //export router


function generateList() {
    var list='';
    for(let i=0; i<db.length; i++){
        let cost= db[i].quantity*db[i].price;
        list += 'ID: '+ db[i].id + '\xa0\xa0\xa0  NAME: ' + db[i].name  + '\xa0\xa0\xa0  QUANTITY: ' +  db[i].quantity  + '\xa0\xa0\xa0  PRICE: ' +  db[i].price + '\xa0\xa0\xa0  COST: ' + cost + '</br>';
        
    }
    //console.log(list);
    return list;
}

function deleteUser(no){
    for(let i=0; i<db.length; i++){
        //console.log(no);
        //console.log(db[i].id);
        if(db[i].id === no){
            db.splice(i,1); //array.splice(start at which index,howmany to be removed) 
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
    //console.log(total);
    return total.toString();
}

totalValue();