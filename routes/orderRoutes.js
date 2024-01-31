const express = require('express');
const router = express.Router();
const { getAllOrders, placeOrder, updateOrder, deleteOrder } = require('../controllers/ordersController'); // Translated function names
const { loadDataFromFile } = require('../data/jsonHandler'); // Translated function name

router.get('/orders', getAllOrders); // Translated route

router.get('/orders/new', (req, res) => {
    const items = loadDataFromFile('./menu.json'); // Make sure the file path is correct
    res.render('addOrderForm', { items }); // Translated view name
});

router.post('/orders/add', placeOrder); // Translated route

router.get('/orders/edit/:id', (req, res) => {
    const orderId = req.params.id;
    const orders = loadDataFromFile('./orders.json');
    const menuItems = loadDataFromFile('./menu.json');

    const order = orders.find(order => order.id.toString() === orderId);
    if (!order) {
        return res.status(404).send('Order not found.'); // Translated message
    }

    // Match order items to full menu item details
    const matchedItems = order.items.map(itemId => 
        menuItems.find(item => item.id === itemId));

    order.items = matchedItems;

    res.render('editOrderForm', { order, items: menuItems }); // Translated view name
});

router.post('/orders/update/:id', updateOrder); // Translated route

router.get('/orders/delete/:id', deleteOrder); // Translated route

module.exports = router;
