const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

/*the express router supports this route end point. On the route end point,
 you simply specify the end point on which this router is going to work.
  And then, the get put portion delete method, this simply chained into that.*/
dishRouter
  .route('/')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next(); //pass the paramenter to get
  })

  .get((req, res, next) => {
    res.end('Will send all the dishes to you!');
  })

  .post((req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
  })

  .put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
  })

  .delete((req, res, next) => {
    res.end('Deleting all the dishes!');
  });

module.exports = dishRouter;
