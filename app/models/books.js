var mongoose=require('mongoose');
var Review= new mongoose.Schema({  
  name: String,
  comment:String,
  rating:Number
});

var Books= new mongoose.Schema({  
  title: String,
  author: String,
  isbn:Number,
  price:String,
  reviews: [Review],
  averageRating:Number
});
mongoose.model('Book', Books);


