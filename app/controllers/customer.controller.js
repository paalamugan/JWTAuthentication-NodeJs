const db = require('../config/db.config.js');
const Customer = db.customer;
const Company = db.company;



exports.init = (req, res) => {	
	Customer.create({ 
			firstname: req.body.firstname, 
			lastname:  req.body.lastname, 
			age:  req.body.age,
			
		}).then((customer) => {	
			const companies=req.body.companies;
			companies.forEach(element => {
			Company.create({ 
					name: element.name, 
					street: element.street, 
					phone:  element.phone,
					customerid:customer.id
					});
			});
			res.send("Done!");
			
		});
	// Apple company
	// Customer.create({ 
	// 	firstname: 'paala', 
	// 	lastname: 'Cupertino, CA 95014', 
	// 	age: '1-408-996-1010',
	// 	companies:[{
	// 		name: "A-121",
	// 		street: "Iphone7",phone
	// 		phone: "Price: 649.00 USD & FREE shipping"
	// 		},
	// 	{
	// 		name: 'A-122', 
	// 		street: 'Seocho District, Seoul, South Korea', 
	// 		phone: '+82-2-2053-3000',
	// 	},
	// 	{
	// 		name: 'A-120', 
	// 		street: 'Seocho District, Seoul, South Korea', 
	// 		phone: '+82-2-2053-3000',
	// 	}]
	// },{
	// 	include:[Company]
	// }).then((customer) => {	
	// 	console.log(customer.id);	
	// 	res.send("Done!");
	// });

	// companies:{
	// 	name: req.body.companies.name,
	// 	street: req.body.companies.street,
	// 	phone: req.body.companies.phone,
	// }
	// 	console.log("-----------> Apple is created");
		
	// 	Company.create({ 
	// 		name: 'Samsung', 
	// 		street: 'Seocho District, Seoul, South Korea', 
	// 		phone: '+82-2-2053-3000',
	// 		customers: [
	// 			// GalaxyJ7 
	// 			{
	// 				firstname: "S-012",
	// 				lastname: "GalaxyJ7",
	// 				age: "Price: 219.00 USD & FREE shipping"
	// 			},
	// 			// GalaxyTabA
	// 			{
	// 				firstname: "S-456",
	// 				lastname: "GalaxyTabA",
	// 				age: "Price: 299.99 USD & FREE shipping"
	// 			}
	// 		]
	// 	}, {
	// 		include: [ Customer ]
	// 	}).then(() => {		
	// 		console.log("-----------> Samsung is created");
	// 	})
	// }).then(() => {
	// 	res.send("Done!");
	// })
};

exports.findAll = (req, res) => {
	Company.findAll({
		attributes: ['customerId', 'name', 'street', 'phone'],
		include: [{
			model: Customer,
			where: { fk_customerid: db.Sequelize.col('customerid') },
			attributes: ['firstname', 'lastname', 'age']
		}]
	}).then(companies => {
	   res.send(companies);
	});
};
// Post a Customer
// exports.create = (req, res) => {	
// 	// Save to MySQL database
// 	Customer.create({  
// 	  firstname: req.body.firstname,
// 	  lastname: req.body.lastname,
// 	  age: req.body.age
// 	}).then(customer => {		
// 		// Send created customer to client
// 		res.send(customer);
// 	});
// };
 
// // FETCH all Customers
// exports.findAll = (req, res) => {
// 	Customer.findAll().then(customers => {
// 	  // Send all customers to Client
// 	  res.send(customers);
// 	});
// };
 
// // Find a Customer by Id
// exports.findById = (req, res) => {	
// 	Customer.findById(req.params.customerId).then(customer => {
// 		res.send(customer);
// 	})
// };
 
// // Update a Customer
// exports.update = (req, res) => {
// 	const id = req.params.customerId;
// 	Customer.update( { firstname: req.body.firstname, lastname: req.body.lastname, age: req.body.age }, 
// 					 { where: {id: req.params.customerId} }
// 				   ).then(() => {
// 					 res.status(200).send("updated successfully a customer with id = " + id);
// 				   });
// };
 
// // Delete a Customer by Id
// exports.delete = (req, res) => {
// 	const id = req.params.customerId;
// 	Customer.destroy({
// 	  where: { id: id }
// 	}).then(() => {
// 	  res.status(200).send('deleted successfully a customer with id = ' + id);
// 	});
// };