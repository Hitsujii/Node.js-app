const express = require('express');
const ordersController = require('../controllers/ordersController');
const jsonHandler = require('../data/jsonHandler');

class OrderRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/orders', ordersController.getAllOrders);

        this.router.get('/orders/new', (req, res) => {
            const items = jsonHandler.loadDataFromFile('./menu.json');
            res.render('addOrderForm', { items });
        });

        this.router.post('/orders/add', ordersController.placeOrder);

        this.router.get('/orders/edit/:id', (req, res) => {
            const orderId = req.params.id;
            const orders = jsonHandler.loadDataFromFile('./orders.json');
            const menuItems = jsonHandler.loadDataFromFile('./menu.json');
        
            const order = orders.find(order => order.id.toString() === orderId);
            if (!order) {
                return res.status(404).send('Order not found.');
            }
        
            const matchedItems = [];
            for (const itemId of order.items) {
                const menuItem = menuItems.find(item => item.id === itemId);
                if (menuItem) {
                    matchedItems.push(menuItem);
                }
            }
        
            order.items = matchedItems;
            console.log(matchedItems);
            res.render('editOrderForm', { order, items: menuItems });
        });
        
        

        this.router.post('/orders/update/:id', ordersController.updateOrder);
        this.router.get('/orders/delete/:id', ordersController.deleteOrder);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new OrderRoutes().getRouter();
