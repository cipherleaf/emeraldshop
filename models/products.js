const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	stocks:{
		type: Number,
		required: true
	},
	price:{
		type: Number,
		required: true
	},
	imglinks: {
		type: String,
		required: true
	}
});

const Product = module.exports = mongoose.model('Product', ProductSchema);
