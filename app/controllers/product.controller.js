const db = require('../config/db.config.js');
const Product = db.product;


exports.findAll = (req, res,next) => {
  const products= Product.findAll().then(()=>{
        res.status(200).json({
            products:products
        });
    })
	
};

exports.post = (req, res,next) => {
    Product.create({
        name:req.body.name,
        quantity:req.body.quantity,
        price:req.body.price
    }).then(product =>{
        console.log(product);
        res.status(200).json({
            message:'Product Added'
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
           error:err
        });
    });
	
};

exports.productget = (req, res,next) => {
    const id = req.params.productId;
    if(id ==='special'){
        res.status(200).json({
            message:'you discovered the specila id',
            id:id
        });
    }else{
        res.status(200).json({
            message:'you passed an id'
        });
    }
	
};