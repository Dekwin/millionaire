/**
 * Created by dekst on 16.04.2016.
 */

var config = require('config');
var qs = require('querystring');

function Client(ip,syncDate,expired) {
    this.ip = ip;
    this.syncDate = syncDate;
    this.expired = expired;
}

var clients = [];
clients.setRemoveTimer = function (client) {

   setTimeout(function () {
      // console.log("client deleted");
        clients.splice(clients.indexOf(client), 1);
    },10000);
}

setTimeout(function () {
    console.log("clients in array: "+clients.length)
},15000)

var date = new Date();

config.set('lastSyncTime',10078798);

function encrypt(date) {
    var hash = date+config.get('mobileAppKey');
    return hash;
}

function findByIP(ip) {
var itemFound = null;
    clients.forEach(function(item, i, arr) {
        console.log(item.ip)
        if(item.ip == ip) {
          //  console.log("ip found : "+ip)
            itemFound = item;
        }
    });

    return itemFound;
}

function mainHandler(req,res) {


    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    switch (req.url){
        case '/':
            
           
            res.end("main");
            break;

        case '/millionaire/sync':
            if(req.method == 'POST'){

                var body='';
                req.on('data', function (data) {
                    body +=data;
                });
                req.on('end',function(){
                    var postParams =  qs.parse(body);

                    if("date" in postParams) {
                        var clientSyncDate = postParams["date"];


                        console.log("client: "+clientSyncDate+" lastSncTime: "+config.get('lastSyncTime'));
                    

                    if(clientSyncDate<config.get('lastSyncTime')&&findByIP(req.connection.remoteAddress)==null) {
                        var timeMills = date.getTime();

                        var client = new Client(req.connection.remoteAddress, clientSyncDate, timeMills);

                        clients.push(client);
                        clients.setRemoveTimer(client);

                        res.end("{\"date\":"+timeMills+"}")

                    }else {
                        res.end("{}");
                    }
                    }else 
                    if("hash" in postParams){
                        var clientHash = postParams["hash"];

                        console.log("client hash: "+clientHash)

                        var client =  findByIP(req.connection.remoteAddress);
                        if (client!=null){

                            console.log("client hash = "+ clientHash+" serv "+encrypt(client.expired))
                        if(clientHash == encrypt(client.expired)){

                         //   clients.splice(clients.indexOf(client),1);
                            res.end("{\"response\":\"true\"}");

                        }else {
                            //clients.splice(clients.indexOf(client),1);
                            res.end("{\"response\":\"not eq\"}");
                          //  res.end("{not eq}");

                        }
                        }else {

                            res.end("{\"response\":\"client not found\"}");

                        }

                        
                    }else {
                        res.end("{\"response\":\"not hash\"}");
                    }
                        

                });
                
                

               // var client = new Client(req.connection.remoteAddress,);

                //console.log(req.headers);
                console.log("ip: "+req.connection.remoteAddress);
              //  console.log(body);



             //   res.end(" {\"firstName\":\"John\", \"lastName\":\"Doe\"} ");
            }

            break;

        case '/users':


            break;

        case '/posts':




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

/*
// Configure the request
var options = {
    url: 'https://oauth.vk.com/access_token',
    method: 'GET',
    headers: headers,
    qs: {
        'client_id': clientId,
        'client_secret': clientSecret,
        'v': '5.50',
        'grant_type': 'client_credentials'
    }
}

request.get(options,function (error,response,body) {
    if(error) {

        callback(new Error(error), null);
    }else {

        callback(null, body);

    }
})*/

module.exports = mainHandler;