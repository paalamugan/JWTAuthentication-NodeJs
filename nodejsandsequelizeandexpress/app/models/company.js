module.exports = (sequelize, Sequelize) => {
	const Company = sequelize.define('company', {
	  name: {
		  type: Sequelize.STRING
	  },
	  street: {
		  type: Sequelize.STRING
	  },
	  phone: {
		  type: Sequelize.STRING
	  }
	});
	
	return Company;
}