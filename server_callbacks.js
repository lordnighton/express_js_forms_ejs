var http = require('http');
var fs = require('fs');

http.createServer(function(request, response) {
    fs.readFile('template.html', function(error, data) {
        if (error) {
            console.error("Cannot read template.html file");
            response.writeHead(500, {'Content-Type':'text/html'});
            response.end('Server error');
        } else {
            fs.readFile('posts.json', function(errorPosts, dataPosts) {
                if (errorPosts) {
                    console.error("Cannot read posts.json file");
                    response.writeHead(500, {'Content-Type':'text/html'});
                    response.end('Server error');
                } else {
                    var posts = JSON.parse(dataPosts.toString());
                    var templateContents = data.toString();
                    var html = templateContents.replace("%", posts);
                    response.writeHead(200, {'Content-Type':'text/html'});
                    response.end(html);
                }    
            });
        }
    });
}).listen(8000,"127.0.0.1");

console.log("Server started at localhost:8000");