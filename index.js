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

            var server = http.createServer(main);
            server.listen(config.get('port'), function (err) {
                console.log("Main listening : http://" + config.get('host') + ":" + config.get('port') + "/");
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
