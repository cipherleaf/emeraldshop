const express = require('express');
const router = express.Router();

const ProductCart = require('../models/cart');
const Products = require('../models/products');

// PRODUCT ROUTERS
// Retrieving all products
router.get('/products', (req, res, next)=>{
	Products.find(function(err, products){
		console.info('PRODUCTS LIST ==>', JSON.stringify(products, null, 2))
		res.json(products);
	})
});

// Get product by ID
router.get('/products/:id', (req, res, next)=>{
	Products.findOne({_id: req.params.id}, function(err, result){
		if(err){
			res.json(err);
		}else{
			res.json(result)
		}
	})
})

// Adding new products
router.post('/products', (req, res, next)=>{
	let newProducts = new Products({
		name: req.body.name,
		stocks: req.body.stocks,
		price: req.body.price,
		imglinks: req.body.imglinks
	});

	newProducts.save((err, products)=>{
		if(err){
			res.json({msg: 'Failed to add new products!'+err});
		}else{
			res.json({msg: 'Product added succesfully!'})
		}
	})
});

// Deleting products
router.delete('/products/:id', (req, res, next)=>{
	Products.deleteOne({_id: req.params.id}, function(err, result){
		if(err){
			res.json(err);
		}else{
			res.json(result)
		}
	})
});


// CART ROUTERS
// Retrieving all products on cart
router.get('/cart', (req, res, next)=>{
	ProductCart.find(function(err, cart){
		res.json(cart);
	})
});

// Adding new products to cart
router.post('/cart', (req, res, next) => {
    let newProductCart = new ProductCart({
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
        imglinks: req.body.imglinks
    });

    newProductCart.save((err, cart) => {
        if (err) {
            res.json({ msg: 'Failed to add to the cart!' + err });
        } else {
            // Return the actual saved document so frontend can render it
			console.info('products added to card:', cart)
            res.json(cart); 
        }
    });
});

// Removing products to the cart
router.delete('/cart/:id', (req, res, next)=>{
	ProductCart.deleteOne({_id: req.params.id}, function(err, result){
		if(err){
			res.json(err);
		}else{
			res.json(result)
		}
	})
});

module.exports = router;