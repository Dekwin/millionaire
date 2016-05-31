/**
 * Created by dekst on 15.04.2016.
 */


var domain = require('domain');
var config = require('config');


var mainDomain = domain.create();


mainDomain.on("error",function (err) {
   console.log("mainDomain error: "+err);
});

/*
mainDomain.run(function() {
    var http = require('http');

            var server = http.createServer(main);
            server.listen(config.get('port'), function (err) {
                console.log("Main listening : http://" + config.get('host') + ":" + config.get('port') + "/");
            });

});
*/


mainDomain.run(function() {
    console.log("main")
    var http = require('http');


    var mainHandler = require('./mainHandler');

    // var appDomain = domain.create();
    //  appDomain.add(req);
    //  appDomain.add(res);
    //   appDomain.on("error",function (err) {
    //       console.log("appDomain error: "+err);
    //   });

    var server = http.createServer(mainHandler);
    server.listen(config.get('port'), function (err) {
        console.log("Main listening : http://" + config.get('host') + ":" + config.get('port') + "/");
    });
    /*
     appDomain.run(function(){

     mainHandler(req,res);
     });
     */
});

function main(req,res) {
    console.log("main")
    var mainHandler = require('./mainHandler');

    var appDomain = domain.create();
    appDomain.add(req);
    appDomain.add(res);
    appDomain.on("error",function (err) {
        console.log("appDomain error: "+err);
    });
    appDomain.run(function(){

        mainHandler(req,res);
    });
}

