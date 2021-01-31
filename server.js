const http = require('http');
const port = 7777;

http.createServer((request, response) => {
    const { headers, method, url } = request;
    let body = [];
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
        // BEGINING OF NEW STUFF 

    }).on('end', () => {
        body = Buffer.concat(body).toString();
        // At this point, we have the headers, method, url and body, and can now
        // do whatever we need to in order to respond to this request.

        // BEGINING OF NEW STUFF
       
        response.on('error', (err) => {
            console.error(err);
        });

        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        // Note: the 2 lines above could be replaced with this next one:
        // response.writeHead(200, {'Content-Type': 'application/json'})

        const responseBody = { headers, method, url, body };
        response.write(JSON.stringify(responseBody));

        response.end();
        // END OF NEW STUFF

    });

}).listen(port); // Activates this server, listening on port 7777.
console.log('Server listening on port 7777')
