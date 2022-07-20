const mongoose = require('mongoose');

const ProductCartSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	quantity:{
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

const ProductCart = module.exports = mongoose.model('ProductCart', ProductCartSchema);
