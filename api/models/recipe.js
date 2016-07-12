const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const URLSlugs = require('mongoose-url-slugs');



const recipeSchema   = new Schema({
    title:{
    	type: String,
    	required: [true, 'Title field is required']
    },
    description: {
    	type: String,
    	required: [true, 'Tell us about it']
    },
    author:{
    	type: String,
    	required: [true, 'whats your name']
    },
    image: {
        type: String,
        required: [true, 'Take a picture of your creation']
    },
    ingredients:[{
	    name     : String,
	    quantity      : String
	}],
	steps:[String],
    categories:[String]
});

recipeSchema.plugin(URLSlugs('title'));

module.exports = mongoose.model('Recipe', recipeSchema);