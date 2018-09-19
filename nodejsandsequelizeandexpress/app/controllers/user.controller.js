const db = require('../config/db.config.js');
const User = db.user;
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('../config/env.js');
exports.signup = (req, res,next) => {
    User.findOne({where:
       { email:req.body.email}
    })
    .then(user =>{
        if(user){
            return res.status(401).json({
                message:'Mail Already Exists'
            })
        }else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    });
                }else{
                   const user= User.create({ 
                        email: req.body.email, 
                        password: hash
                    });
                    user.then(result =>{
                        console.log(result);
                        res.status(201).json({
                            message:'User Created'
                        });
                    })
                    .catch(err=>{
                        console.log(err);
                        res.status(500).json({
                           error:err
                        });
                    });
                } });} 
            });	
	
};
exports.login = (req,res,next)=>{
User.findOne({where:{email:req.body.email}})
.then(user =>{
if(!user){
    return res.status(404).json({
        message:'Auth Failed'
    });
}else{
bcrypt.compare(req.body.password,user.password,(err,result)=>{
    if(err){
        return res.status(401).json({
            message:'Auth Failed'
        });
    }
    if(result){
       const token =jwt.sign({
            email:user.email,
            user:user.id
        },
        env.JWT_KEY,
        {
            expiresIn:"1h"
        }
        );
        return res.status(200).json({
            message:'Auth successfull',
            token:token,
            user:user
        });
    }
    return res.status(401).json({
        message:'Auth Failed'
    });
});
}
})
.catch(err=>{
    console.log(err);
    res.status(500).json({
       error:err
    })
});
};
exports.Deleteuser = (req,res,next)=>{
    const Id = req.params.userId;
    User.findOne({where:{id:Id}})
    .then(id =>{
        if(!id){
            return res.status(401).json({
                message:'User Not Exists'
            })
        }else{
           
            User.destroy({
                where:{id: Id}
            })
            .then(result =>{
               
                res.status(200).json({
                    message:'User Deleted'
                });
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json({
                   error:err
                })
            });
        }
    });
   
};