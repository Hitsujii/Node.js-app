const jsonHandler = require('../data/jsonHandler');

class OrderController {
    placeOrder(req, res) {
        const orders = jsonHandler.loadDataFromFile('./orders.json');
        const menuItems = jsonHandler.loadDataFromFile('./menu.json');

        const selectedItems = req.body.items || [];
        const selectedItemsIds = Array.isArray(selectedItems) ? selectedItems : [selectedItems];
        const orderItems = menuItems.filter(item => selectedItemsIds.includes(item.id.toString()));

        const totalPrice = orderItems.reduce((acc, item) => acc + item.price, 0);

        const highestId = orders.reduce((maxId, order) => Math.max(maxId, order.id), 0);

        const newOrder = {
            id: highestId + 1, // Simple ID generation method, more advanced method recommended in production
            items: orderItems.map(item => item.id),
            orderDate: new Date().toISOString().split('T')[0],
            status: 'new',
            totalPrice: totalPrice
        };

        orders.push(newOrder);
        jsonHandler.saveDataToFile('./orders.json', orders);

        res.redirect('/orders');
    }

    getAllOrders(req, res) {
        const orders = jsonHandler.loadDataFromFile('./orders.json');
        const items = jsonHandler.loadDataFromFile('./menu.json');

        orders.forEach(order => {
            const matchedItems = order.items.map(itemId =>
                items.find(item => item.id === itemId));
            order.items = matchedItems;
        });

        res.render('orderList', { orders });
    }

    updateOrder(req, res) {
        const orderId = req.params.id;
        const orders = jsonHandler.loadDataFromFile('./orders.json');
        const menuItems = jsonHandler.loadDataFromFile('./menu.json');
        const index = orders.findIndex(order => order.id.toString() === orderId);

        if (index === -1) {
            return res.status(404).send('Order not found.');
        }

        const selectedItemsIds = Array.isArray(req.body.items) ? req.body.items.map(Number) : [Number(req.body.items)];
        orders[index].items = selectedItemsIds;

        const totalPrice = selectedItemsIds.reduce((acc, itemId) => {
            const item = menuItems.find(p => p.id === itemId);
            return acc + (item ? item.price : 0);
        }, 0);

        orders[index].totalPrice = totalPrice;
        orders[index].status = req.body.status;

        jsonHandler.saveDataToFile('./orders.json', orders);

        res.redirect('/orders');
    }

    deleteOrder(req, res) {
        const orderId = req.params.id;
        let orders = jsonHandler.loadDataFromFile('./orders.json');

        const orderExists = orders.some(order => order.id.toString() === orderId);
        if (!orderExists) {
            return res.status(404).send('Order not found.');
        }

        orders = orders.filter(order => order.id.toString() !== orderId);

        jsonHandler.saveDataToFile('./orders.json', orders);

        res.redirect('/orders');
    }
}

module.exports = new OrderController();
