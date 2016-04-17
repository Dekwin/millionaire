/**
 * Created by dekst on 15.04.2016.
 */


var domain = require('domain');
var config = require('config');


var mainDomain = domain.create();


mainDomain.on("error",function (err) {
   console.log("mainDomain error: "+err);
});

mainDomain.run(function() {

    var http = require('http');
    var vkApi = require('./node_modules/askans/VKApi');

    vkApi.initApi(function (error, access_token) {
        if(error){

            var server = http.createServer(function (req,res) {
               // var utils = require('util');
                res.end("Unable to connect!");
            });
            server.listen(config.get('port'), config.get('host'), function (err) {
                console.log("Main listening : http://" + config.get('host') + ":" + config.get('port') + "/");
            });
        }
        else {
            config.set('access_token', access_token.access_token);
            var server = http.createServer(main);
            server.listen(config.get('port'), config.get('host'), function (err) {
                console.log("Main listening : http://" + config.get('host') + ":" + config.get('port') + "/");
            });
        }
    });


});

function main(req,res) {
    var mainHandler = require('./mainHandler');
    console.log("handler");
    var appDomain = domain.create();
    appDomain.add(req);
    appDomain.add(res);
    appDomain.on("error",function (err) {
        console.log("appDomain error: "+err);
    });
    appDomain.run(function(){mainHandler(req,res)});
}
