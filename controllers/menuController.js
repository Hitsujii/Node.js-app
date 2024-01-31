const jsonHandler = require('../data/jsonHandler');

class MenuController {
    addMenuItem(req, res) {
        const items = jsonHandler.loadDataFromFile('../data/menu.json');
        const highestId = items.reduce((maxId, item) => Math.max(maxId, item.id), 0);
        const newItem = {
            id: highestId + 1, // Simple way of generating ID, better to use a more advanced ID generator
            name: req.body.name,
            description: req.body.description,
            price: parseFloat(req.body.price)
        };
        items.push(newItem);
        jsonHandler.saveDataToFile('../data/menu.json', items);
        res.redirect('/menu');
    }

    getAllMenuItems(req, res) {
        const items = jsonHandler.loadDataFromFile('../data/menu.json');
        res.render('listOfItems', { items });
    }

    updateMenuItem(req, res) {
        const items = jsonHandler.loadDataFromFile('../data/menu.json');
        const index = items.findIndex(item => item.id == req.params.id);
        if (index !== -1) {
            items[index].name = req.body.name;
            items[index].description = req.body.description;
            items[index].price = parseFloat(req.body.price);
            jsonHandler.saveDataToFile('../data/menu.json', items);
            res.redirect('/menu');
        } else {
            res.status(404).send("Menu item with the given ID not found.");
        }
    }

    deleteMenuItem(req, res) {
        const items = jsonHandler.loadDataFromFile('../data/menu.json');
        const newItems = items.filter(item => item.id != req.params.id);
        if (items.length !== newItems.length) {
            jsonHandler.saveDataToFile('../data/menu.json', newItems);
            res.redirect('/menu');
        } else {
            res.status(404).send("Menu item with the given ID not found.");
        }
    }
}

module.exports = new MenuController();
