(function () {
  var React = require('react');
  var Authors = require('./authors_component');
  var PopularAuthors = require('./popular_authors_component');
  var Books = require('./books_component');
  var authorsStore = require('../authors/authors_store');
  var popularAuthorsStore = require('../authors/popular_authors_store');
  var booksStore = require('../books/books_store');
  var Actions = require("../actions/actions");
  var Reflux = require('reflux');


  function getAppState () {
    return {
      authors: authorsStore.getAuthors(),
      selectedAuthor: authorsStore.getSelected(),
      books: booksStore.getBooks(),
      selectedBook: booksStore.selectedBook(),
      selectedBookIndex: booksStore.getSelected(),
      popularAuthors: popularAuthorsStore.getAuthors()
    };
  }

  var BookApp = React.createClass({
    mixins: [Reflux.ListenerMixin],
    
    hint: function () {
      var author = this.state.authors[+this.state.selectedAuthor-1];
      var book = this.state.selectedBook;
      if (author && book) {
        return author.name + ' написал ' + book.name;
      }
    },


    getInitialState: function () {
      console.log(getAppState());
      return getAppState();
    },

    onStatusChange: function (r) {
      console.log('onStatusChange', r);
      this.setState(getAppState());
    },

     componentDidMount: function() {
        this.listenTo(authorsStore, this.onStatusChange);
        this.listenTo(booksStore, this.onStatusChange);
        this.listenTo(popularAuthorsStore, this.onStatusChange);
      },
      
    render: function () {

      return (
        React.createElement('div', null,
          React.createElement('button', { className: 'btn btn-primary',onClick: this.randomAuthorBook }, "Мне повезет"),
          React.createElement('br', null),
          React.createElement(Authors, { authors: this.state.authors, selected: this.state.selectedAuthor }),
          React.createElement('br', null),
          React.createElement(Books, { books: this.state.books, selected: this.state.selectedBookIndex }),
          React.createElement('div', null, this.hint()),
          React.createElement(PopularAuthors, { authors: this.state.popularAuthors })
        )  

        
      );
    },

  randomAuthorBook: function () {
    Actions.randomAuthor();
  }

    

  });

  module.exports = BookApp;
})();