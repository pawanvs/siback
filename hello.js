const http = require('http');

const host = '0.0.0.0';
const port = 5000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('si frontend port 5000');
});

server.listen(port, host, () => {
   console.log('Web server running at http://%s:%s',host,port );
});
root@nividhi:/home/usr1/sifront# node hello.js
Web server running at http://0.0.0.0:5000
^C
root@nividhi:/home/usr1/sifront# cat hello.js
const http = require('http');

const host = '0.0.0.0';
const port = 5000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('si backend port 5000');
});

server.listen(port, host, () => {
   console.log('Web server running at http://%s:%s',host,port );
});
