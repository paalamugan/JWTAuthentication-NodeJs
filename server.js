var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())
 
const db = require('./app/config/db.config.js');
  
db.sequelize.sync({ force:true }).then(() => {
 console.log('Drop and Resync with { force: true }');
});
 
require('./app/routes/customer.route.js')(app);
require('./app/routes/product.route.js')(app);
require('./app/routes/user.route.js')(app);
 
// Create a Server
var server = app.listen(8000, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port)
})