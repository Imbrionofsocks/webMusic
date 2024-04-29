const express = require('express');
const server = express();
const port = 3000;
const controller = require('./controller/viewController');


server.use(express.json());

server.use(express.urlencoded({extended: false}));

server.use(express.static('./out'))

server.use('/', controller);



server.listen(port, () => {
    console.log(`Server running at  http://localhost:${port}/mainPage`);
});
