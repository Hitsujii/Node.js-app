const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 3000;

// import routes
const orderRoutes = require('./routes/orderRoutes');
const menuRoutes = require('./routes/menuRoutes');


const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.use('/', menuRoutes);
app.use('/', orderRoutes);
app.get('/', (req, res) => {
    res.render('homePage');
});

app.use(bodyParser.json());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
