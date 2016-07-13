var express = require('express'),
  router = express.Router(),
  marko = require('marko'),
  mongoose = require('mongoose'),
  Book = mongoose.model('Book');

module.exports = function (app) {
  app.use('/', router);
};

var viewBooksList= marko.load(require.resolve('../views/bookList.marko'));
var addBook= marko.load(require.resolve('../views/addBook.marko'));
var addReview= marko.load(require.resolve('../views/addReview.marko'));
var showReview= marko.load(require.resolve('../views/showReview.marko'));
var updateBook= marko.load(require.resolve('../views/updateBook.marko'));
var searchBook= marko.load(require.resolve('../views/searchBook.marko'));
router.route('/books')
.get(function (req, res, next) {
  Book.find(function (err, booksList) {
    if(err || booksList==""){
        var message="no books to display!"
        viewBooksList.render( {message:message} ,res);
      }
      else{
        var sum;
        var averageRating; 
        var arr = new Array();

        for(var i=0;i<booksList.length;i++)
        {
          
          sum=0;
          for(var j=0;j<booksList[i].reviews.length;j++)
          {
            sum+=booksList[i].reviews[j].rating;

          }
          averageRating=sum/booksList[i].reviews.length;
          booksList[i].averageRating =averageRating.toFixed(1);
        }
        viewBooksList.render( {booksList:booksList} ,res);
        
      }
  });
});
router.route('/addBook')
  .get(function(req, res, next){
    console.log("hello!!!");
    var message="Please Add a book!";
    addBook.render({message:message},res);
    
  })
  .post(function(req, res){
    var title = req.body.title;
    var author = req.body.author;
    var isbn=req.body.isbn;
    var price = req.body.price;
    
    
    mongoose.model('Book').create({
      title: title,
      author: author,
      isbn:isbn,
      price:price,
      
    });
    res.redirect('/books');

  });
  router.route('/delete/:id')
  .post(function(req, res, next){
    mongoose.model('Book').findById(req.params.id, function(err, singleBook){
      if(err){
        res.status = 200
        res.format({
          json: function(){
            res.json({"Message": "Book not found!!"});
          }
        })
      }
      else{
        singleBook.remove(function(err, singleBook){
          if(err){
            res.status = 200
            res.format({
              json: function(){
                res.json({"Message": "Could not delete Book!!"});
              }
            })
          }
          else{
            res.status = 200
            res.format({
              json: function(){
                res.redirect('/books');
              }
            })
          }
        })
      }
    })
    
  });
  router.route('/addReview/:id')
  
    .get(function(req, res, next){
    var message="Please Add a Review!";
    addReview.render({message:message},res);
    
})
  .post(function(req, res, next){
    var bookid = req.params.id;
  var name = req.body.Name;
  var comment = req.body.comment;
  console.log("comment",comment);
  var rating = req.body.rating;
  
  mongoose.model('Book').findById(req.params.id, function(err, book){
   if(err){
    res.status = 200
    res.format({
     json: function(){
      res.json({"Message": "Book not found"});
     }
    })
   }
   else{
    
    book.reviews.push({name: name,comment: comment, rating: rating});
 
    book.save(function (err) {
       if (!err){ 
      res.redirect("/books");
     } else{
      res.send("There was an error !");
        }
          });
        }
      })
  });

router.route('/showReview/:id')
  
    .post(function(req, res, next){
      var reviews;
      mongoose.model('Book').findById(req.params.id,function(err, book){

      if(err || book==""){

        var message="no books to display!";

        showReview.render( {message:message} ,res);
      }
      else if(book.reviews=="")
      {
        var message="No Reviews To Show!!"
        showReview.render({message:message,book:book},res);

      }
      else
      { 
        reviews=book.reviews;
        console.log("Reviews",reviews);
        showReview.render({reviews:reviews,book:book},res);
      }
    });
  
  });

router.route('/searchBook')
    .post(function(req, res, next){
      var searchKey=req.body.searchKey;
       mongoose.model('Book').find({'title':searchKey},function(err, book){
         console.log("SEARCH BOOK:",book);
      if(err || book==""){

        var message="no books to display!"
        searchBook.render( {message:message} ,res);
      }
      else 
      {
        searchBook.render({book:book},res);

      }
    
    })
  });
  router.route('/update/:id')
.get(function(req, res, next){
 mongoose.model('Book').findById(req.params.id, function(err, book){
  console.log("Book", book);
  if(err){
   res.status = 200
   res.format({
    json: function(){
     res.json({"Message": "Book not found"});
    }
   })
  }
  else{
   
   updateBook.render({book:book},res);
  }
 });
})
.post(function(req, res){
 var title = req.body.title;
 var author = req.body.author;
 var isbn = req.body.isbn;
 var price=req.body.price;
 console.log("title isssss",title);
 mongoose.model('Book').findById(req.params.id, function(err, book){
  if(err){
   res.status = 200
   res.format({
    json: function(){
     res.json({"Message": "Book not found"});
    }
   })
  }
   else{
    book.title = title;
    book.author= author;
    book.isbn=isbn;
    book.price=price;
    book.save();
     
     
    }
    
    res.redirect('/books');
   
  })
});