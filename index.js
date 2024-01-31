const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const orderRoutes = require('./routes/orderRoutes');
const menuRoutes = require('./routes/menuRoutes');

class App {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    initializeMiddlewares() {
        this.app.set('view engine', 'ejs');
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
    }

    initializeRoutes() {
        this.app.use('/', menuRoutes);
        this.app.use('/', orderRoutes);
        this.app.get('/', (req, res) => {
            res.render('homePage');
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

const server = new App();
server.listen();
