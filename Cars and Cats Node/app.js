"use strict";
var http = require('http');
var fs = require('fs');
var port = 7077;

var server = http.createServer(function(request,response){
    var splitURL = request.url.split('/');
    var fileType = splitURL[1];
    var file = splitURL[2];

    var file;

    switch (fileType) {
        case "styles":
        serveCSS(file,response);
        break;

        case "images":
        serveJPG(file,response);
        break;

        default:
            switch(fileType) {
                case "cars":
                if(file === "new"){
                    serveHTML('new.HTML',response);
                } else {
                    serveHTML('cars.html', response);
                }
                break;
                
                case "cats":
                    serveHTML('cats.html',response);
                    break;

                default:
                    serve404(response);
            }
    }
});

function serveHTML(filename, response) {
    fs.readFile('views/'.concat(filename), 'utf8',function(error, contents){
        if(error) {
            return serve404(response);
        }
        response.writeHead(200, {
            "Content-type":'text/html'
        });
        response.write(contents);
        response.end();
    });
}

function serveCSS(filename,response) {
    fs.readFile('stylesheets/'.concat(filename),'utf8',function(error,contents){
        if(error) {
            return serve404(response);
        }
        response.writeHead(200, {
            "Content-type" : "text/css"
        });
        response.write(contents);
        response.end();
    });
}

function serveJPG(filename, response) {
    fs.readFile('images/${filename}', function(error,contents){
        if(error){
            return serve404(response);
        }
        response.writeHead(200, {
            "Content-type":'image/jpg'
        });
        response.write(contents);
        response.end();
    });
}

function serve404(response){
    response.writeHead(404);
    response.end("File Not Found");
}

server.listen(port);
console.log("running on ", port);