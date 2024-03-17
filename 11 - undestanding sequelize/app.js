const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');



app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
    User.findByPk(1).then(user => {
        req.user = user; //undefnied by default if no user
        next();
    }).catch(err => console.log(err));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize
    .sync()
    .then(() => {
        return User.findByPk(1).then()
    }).then((user) => {
        if (!user) {
            return User.create({ id: 1, name: 'Max', email: 'maxuelinson@gmail.com' })
        }
        return user;
    }).then((user) => {
        app.listen(3000);
    }).catch(err => console.log(err));

