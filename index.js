const express = require('express');
const http = require('http');
const morgan = require('morgan'); //morgan is used to log information to the screen
const bodyParser = require('body-parser');

const dishRouter = require('./routes/dishRouter');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/dishes', dishRouter);
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
