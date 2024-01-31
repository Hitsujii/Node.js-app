const express = require('express');
const menuController = require('../controllers/menuController');
const jsonHandler = require('../data/jsonHandler');

class MenuRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/menu/new', (req, res) => {
            res.render('addForm');
        });

        this.router.get('/menu/edit/:id', (req, res) => {
            const items = jsonHandler.loadDataFromFile('../data/menu.json');
            const item = items.find(item => item.id == req.params.id);
            if (item) {
                res.render('editForm', { item });
            } else {
                res.status(404).send("Menu item with the given ID not found.");
            }
        });

        this.router.post('/menu/add', menuController.addMenuItem);
        this.router.get('/menu', menuController.getAllMenuItems);
        this.router.post('/menu/update/:id', menuController.updateMenuItem);
        this.router.get('/menu/delete/:id', menuController.deleteMenuItem);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new MenuRoutes().getRouter();
