const express = require('express');
const router = express.Router();
const { addMenuItem, getAllMenuItems, updateMenuItem, deleteMenuItem } = require('../controllers/menuController');
const { loadDataFromFile } = require('../data/jsonHandler');

router.get('/menu/new', (req, res) => {
    res.render('addForm');
});

router.get('/menu/edit/:id', (req, res) => {
    const items = loadDataFromFile('../data/menu.json');
    const item = items.find(item => item.id == req.params.id);
    if (item) {
        res.render('editForm', { item });
    } else {
        res.status(404).send("Menu item with the given ID not found.");
    }
});

router.post('/menu/add', addMenuItem);
router.get('/menu', getAllMenuItems);

router.post('/menu/update/:id', updateMenuItem);
router.get('/menu/delete/:id', deleteMenuItem);

module.exports = router;
