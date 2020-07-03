var db = require('../db/config');
//var bcrypt = require('bcryptjs');
const shortId = require('shortid')

exports.shrink = async function(req,res){
   //const password = req.body.password;
 const genshortid = shortId.generate();
   var urls = {
       "fullurl" : req.body.fullurl,
       "shorturl" :genshortid
   }
   //console.log(urls.fullurl);
   //console.log(urls.shorturl);
   db.connection.query('SELECT * FROM urlmap where fullurl= ?',[urls.fullurl],function(error,rows){
       if(error){
           res.json({
               "code" : 400,
               "failed" : "error occurred 1st query"
           })
       }
       if(!rows.length){
           db.connection.query('Insert into urlmap SET ?', urls, function(error,results,fields){
               //console.log(results);
               if(error){
                   res.json({
                       "code" : 400,
                       "failed" : "error occurred"
                   })
               }else{
                res.render('../views/index', {data: genshortid});

                   /*res.json({
                       "code" : 200,
                       "success" : "URL inserted successfully"
                   }); */
               }
           });

       }
       else {
           db.connection.query('SELECT shorturl FROM urlmap where fullurl = ?',[urls.fullurl],function(error,rows){
            if(error){
                res.json({
                    "code" : 400,
                    "failed" : "error occurred 1st query"
                })
            }
            else{
                res.render('../views/index', {data: rows[0].shorturl});
            }
           })
           /*res.json({
               "code" : 400,
               "failed" : "Email already exists, Please login"
           }); */
       }
   })
   
}
exports.expand = async function(req,res){
    var click = req.params.shortUrl;
    //console.log(req.params.shortUrl);
    db.connection.query('SELECT fullurl FROM urlmap where shortUrl = ?',[click],function(error,rows){
        if(error){
            res.json({
                "code" : 400,
                "failed" : "error occurred in click query"
            })
        }
        else{
            //res.render('../views/index', {data: rows[0].shorturl});
            res.redirect(rows[0].fullurl);
        }
       })
} 