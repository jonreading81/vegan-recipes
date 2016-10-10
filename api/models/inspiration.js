const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const URLSlugs = require('mongoose-url-slugs');
const random = require('mongoose-random');

const inspirationSchema   = new Schema(
  {
    title:{
      type: String,
      required: [true, 'Title field is required']
    },
    image: {
        type: String
    },
    author:{
      type: String
    },
    quoteAuthor:{
      type: String
    },
    quote: {
        type: String
    },
  },
  {
    timestamps: true
  }
);

inspirationSchema.plugin(URLSlugs('title'));
inspirationSchema.plugin(random);
inspirationSchema.plugin(mongoosePaginate);
inspirationSchema.index({ 
    title: 'text', 
    quoteAuthor: 'text',
    quote: 'text'
}
);

module.exports = mongoose.model('Inspiration', inspirationSchema);