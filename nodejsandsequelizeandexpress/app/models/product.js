module.exports = (sequelize, Sequelize) => {
	const Product = sequelize.define('product', {
	  name: {
		type: Sequelize.STRING
	  },
	  quantity: {
		type: Sequelize.STRING
	  },
	  price: {
		  type: Sequelize.STRING
	  }
	});
	
	return Product;
}