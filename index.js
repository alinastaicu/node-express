const express = require('express');
const http = require('http');
const morgan = require('morgan'); //morgan is used to log information to the screen
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.all('/dishes', (req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next(); //pass the paramenter to get
});

app.get('/dishes', (req, res, next) => {
  res.end('Will send all the dishes to you!');
});

app.post('/dishes', (req, res, next) => {
  res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.put('/dishes', (req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /dishes');
});

app.delete('/dishes', (req, res, next) => {
  res.end('Deleting all the dishes!');
});

app.get('/dishes/:dishId', (req, res, next) => {
  res.end('Will send details of the dish:' + req.params.dishId + ' to you!');
});

app.post('/dishes/:dishId', (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /dishes/' + req.params.dishId);
});

app.put('/dishes/:dishId', (req, res, next) => {
  res.write('Updating the dish: ' + req.params.dishId + '\n');
  res.end('Will update the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.delete('/dishes/:dishId', (req, res, next) => {
  res.end('Deleting dish: ' + req.params.dishId);
});

/* This tells Express to serve up the static files from double underscore dirname. 
This says the root of this project and they will find those files in double_dirname, 
plus/ public. So, recall that we created the public folder in the node Express folder.
So, this is informing Express that you will look at this particular folder in the root 
folder of this project and inside the public folder.
 */
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

const server = http.createServer(app);
server.listen(port, hostname, () => {
  console.log(`Sever running at http://${hostname}:${port}`);
});
