/**
 * Created by dekst on 16.04.2016.
 */
var askans = require('askans');
var config = require('config');



function mainHandler(req,res) {

    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    switch (req.url){
        case '/':
             askans.createTestPostsTable();
             askans.createTestUsersTable();
            console.log("token: "+config.get('access_token'));
            res.end("main");
            break;

        case '/users':
            askans.getUsers([88],function (result) {

                res.end("users: "+JSON.stringify(result));
            });
            break;

        case '/posts':


            var entities = require('./node_modules/askans/node_modules/entities');
            var user = new entities.User('1','kjhkh',67756576);

            console.log(user.id+" userid!!!!");
            askans.getUserPosts(user,null, null, function (err,result) {
                if(err){
                    res.end("posts error: "+err);
                }
                    else
                res.end("posts json: "+JSON.stringify(result));
            });
            //res.end("posts");


            break;

        case '/vk':

         
            console.log("auth");

            break;
        default:

            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end("Page Not Found");
            break;
    }


}


module.exports = mainHandler;