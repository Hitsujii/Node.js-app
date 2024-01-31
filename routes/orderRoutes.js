const express = require('express');
const router = express.Router();
const { getAllOrders, placeOrder, updateOrder, deleteOrder } = require('../controllers/ordersController');
const { loadDataFromFile } = require('../data/jsonHandler');

router.get('/orders', getAllOrders);

router.get('/orders/new', (req, res) => {
    const items = loadDataFromFile('./menu.json');
    res.render('addOrderForm', { items });
});

router.post('/orders/add', placeOrder);

router.get('/orders/edit/:id', (req, res) => {
    const orderId = req.params.id;
    const orders = loadDataFromFile('./orders.json');
    const menuItems = loadDataFromFile('./menu.json');

    const order = orders.find(order => order.id.toString() === orderId);
    if (!order) {
        return res.status(404).send('Order not found.');
    }

    
    const matchedItems = order.items.map(itemId => 
        menuItems.find(item => item.id === itemId));

    order.items = matchedItems;

    res.render('editOrderForm', { order, items: menuItems });
});

router.post('/orders/update/:id', updateOrder);

router.get('/orders/delete/:id', deleteOrder);

module.exports = router;
