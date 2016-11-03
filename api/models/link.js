const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const URLSlugs = require('mongoose-url-slugs');

const linkSchema   = new Schema({
    title:{
      type: String,
      required: [true, 'Title field is required']
    },
    type:[String],
    description: {
      type: String,
      required: [true, 'Description field is required']
    },
    URL:{
      type: String,
      required: [true, 'URL field is required']
    },
    image: {
        type: String,
        required: [true, 'Take a picture of your creation']
    }
  },
  {
      timestamps: true
  }
);

linkSchema.plugin(URLSlugs('title'));
linkSchema.plugin(mongoosePaginate);
linkSchema.index({ 
    title: 'text', 
    description: 'text', 
    type: 'text',
}
);

module.exports = mongoose.model('Link', linkSchema);