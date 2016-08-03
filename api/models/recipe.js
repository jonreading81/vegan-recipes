const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
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
    difficulty: {
        type: String,
        required: [true, 'How difficult is it?']
    },
    ingredients:[{
	    name     : String,
	    quantity      : String
	}],
    yields: {
        type: String,
        required: [true, 'How many people can eat it']
    },
    preperationTime: {
        type: String,
        required: [true, 'How long does it take to prepare']
    },
    cookingTime: {
        type: String,
        required: [true, 'How long does it take to cook']
    },
    totalTime: {
        type: String,
        required: [true, 'How long does it take in total to make']
    },
    sourceURL: {
        type: String,
    },
	steps:[String],
    categories:[String],
    dietarySuitability:[String]
});

recipeSchema.plugin(URLSlugs('title'));
recipeSchema.plugin(mongoosePaginate);
recipeSchema.index({ 
    title: 'text', 
    description: 'text', 
    'ingredients.name': 'text',
    categories: 'text',
    author : 'text' ,
}
);

module.exports = mongoose.model('Recipe', recipeSchema);