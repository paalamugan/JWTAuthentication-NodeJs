const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
 define:{
   timestamps: false
 },
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }

});

const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
//Models/tables
db.customer = require('../models/customer.js')(sequelize, Sequelize);
db.company = require('../models/company.js')(sequelize, Sequelize);
db.user = require('../models/user.js')(sequelize, Sequelize);
db.product = require('../models/product.js')(sequelize, Sequelize);
 
///kjhghgfcvhb
db.company.belongsTo(db.customer, {foreignKey: 'customerid'});
db.customer.hasMany(db.company, {foreignKey: 'customerid'});
//db.customer.belongsTo(db.company, {foreignKey: 'companid', targetKey: 'id'});

// var Profile = sequelize.define('profile', {
// 	someData: Sequelize.STRING
// });

// var User = sequelize.define('user', {
// 	email: Sequelize.STRING
// });


// User.hasOne(Profile);
// Profile.belongsTo(User);

// sequelize.sync({
// 	force: true
// }).then(function() {
// 	var user;

// 	User.create({
// 		email: 'andrew@example.com'
// 	}).then(function(u) {
// 		user = u;
		
// 		return Profile.findAll({
// 			//someData: 'data here'
// 		});
// 	}).then(function(profile) {
// 		user.setProfile(profile)
// 	})
// });
// sequelize.sync({
// 	force: true
// }).then(function() {
// 	var profile;

// 	Profile.create({
// 		someData: 'andrew@example.com'
// 	}).then(function(u) {
// 		profile = u;
		
// 		return User.findById(1);
// 	}).then(function(user) {
// 		profile.setUser(user)
// 	})
// });
module.exports = db;