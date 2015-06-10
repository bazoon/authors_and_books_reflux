(function () {

  var Actions = require('../actions/actions');
  var _ = require('underscore');
  var booksLoader = require('../books/books_loader');
  var authorsStore = require('../authors/authors_store');
  var Reflux = require('reflux');

  
  var _books = [], _selected_book = null;
  
  
  booksStore = Reflux.createStore({
    
    init: function () {
      console.log('init authors_store.js');
      this.listenTo(Actions.bookSelected, this.setSelected);
      this.listenTo(Actions.authorSelected, this.loadBooksData);
      this.listenTo(authorsStore, this.authorsStoreChanged);
    },

    loadBooksData: function (authorId) {
      var that = this;
      return booksLoader.loadBooks(authorId).then(function (response) {
        _books = response;
        _selected_book = 1;
        that.trigger('Load books!');
      });
    },

    getBooks: function() {
      return _books || [];
    },
    
    getSelected: function() {
      return _selected_book;
    },

    setSelected: function(index) {
      _selected_book = index;
      this.trigger('setSelected book', index);
    },

    selectedBook: function () {
      console.log('selectedBook', _books, _selected_book);
      return _books[_selected_book - 1];
    },

    randomBook: function (authorId) {
      var that = this;
      booksStore.loadBooksData(authorId).then(function (response) {
        var randomBookIndex = _.random(1, _books.length);
        booksStore.setSelected(randomBookIndex); 
          that.trigger();
        });
    },

    authorsStoreChanged: function (status, payload) {
      if (status === "randomAuthor") {
        booksStore.randomBook(payload);
      }
    }
    

  });

  



  module.exports = booksStore;

}());



