module.exports = function(app) {
    const CheckAuth=require('../middleware/check-auth');
    const products = require('../controllers/product.controller.js');

    app.get('/products', products.findAll);
    app.post('/products', (CheckAuth),products.post);
    app.get('/products/:productId', products.productget);
}