/**
 * Created by dekst on 15.04.2016.
 */


var domain = require('domain');


var mainDomain = domain.create();

var port = 8080;
var host = '192.168.1.110';

mainDomain.on("error",function (err) {
   console.log("mainDomain error: "+err);
});

mainDomain.run(function() {
    var http = require('http');
    var server = http.createServer(main);
    server.listen(port,host,function (err) {
        console.log("Main listening : http://"+host+":"+port+"/");
    });
});

function main(req,res) {
    var mainHandler = require('./mainHandler');
    
    var appDomain = domain.create();
    appDomain.add(req);
    appDomain.add(res);
    appDomain.on("error",function (err) {
        console.log("appDomain error: "+err);
    });
    appDomain.run(function(){mainHandler(req,res)});
}
