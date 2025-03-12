const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true, 
  },
  nom: {
    type: String,
    required: true, 
  },
  prix: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '', 
  },
  image: {
    type: String, 
    default: '',
  },
});

module.exports = mongoose.model('Product', ProductSchema);
