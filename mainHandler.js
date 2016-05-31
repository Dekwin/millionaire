/**
 * Created by dekst on 16.04.2016.
 */

var config = require('config');
var qs = require('querystring');
var routing = require('routing');
var dbModule = require('dbmodule');
var website = require('website')(dbModule);
var gameApi = require('millionaire-game-api');

//dbModule.createTestQuestionsTable();
dbModule.updateTimeUpdateAndAdd();
dbModule.createTestUsersTable();







function mainHandler(req,res) {

    console.log("handler");

    res.setHeader('Content-Type', 'text/html; charset=utf-8');



    var response = routing.router({ req: req, res: res }) + '';
    if(response != 'undefined') {
        res.end(response);
    }
    //routing.router({ req: req, res: res })

//     switch (req.url){
//
//         case "/millionaire/*":
//
//             website.routing(req,res,"/millionaire/");
//             break;
//
//         // case '/':
//         //     website.index(res);
//         //    // res.end("main");
//         //
//         //     break;
//         //
//         //
//         //
//         // case '/millionaire/auth':
//         //     website.authorization(req,res);
//         //
//         //     break;
//
//             /*
//          case '/millionaire/adminpanel':
//              website.questionsList(req,res);
//              break;
//
//
//         case '/millionaire/sync':
//             if(req.method == 'POST'){
//                 var body='';
//                 req.on('data', function (data) {
//                     body +=data;
//                 });
//                 req.on('end',function(){
//
//                     gameApi.clientSync(body,req.connection.remoteAddress,function (result) {
//                         res.end(result);
//                     });
//
//
//                 });
//
//                // var client = new Client(req.connection.remoteAddress,);
//
//                 //console.log(req.headers);
//                 console.log("ip: "+req.connection.remoteAddress);
//               //  console.log(body);
//
//
//
//              //   res.end(" {\"firstName\":\"John\", \"lastName\":\"Doe\"} ");
//             }else {
//                 res.end("Access denied.");
//             }
//
//             break;
// */
//
//
//         default:
//
//             break;
//     }
//
//


}


module.exports = mainHandler;