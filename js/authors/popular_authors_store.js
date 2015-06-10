(function () {

  
  var Actions = require('../actions/actions');
  var _ = require('underscore');
  var authorsLoader = require('./authors_loader');
  var Reflux = require('reflux');
  
  var _authors = [], _selected_author = null;
  
  
  popularAuthorsStore =  Reflux.createStore({
    
    init: function () {
      this.listenTo(Actions.authorSelected, this.setSelected);
      this.listenTo(Actions.loadPopularAuthors, this.loadPopularAuthorsData);
    },

    loadPopularAuthorsData: function () {
      var that = this;
      
      return authorsLoader.loadPopularAuthors().then(function (response) {
        _authors = response;
        that.trigger('load popular_authors_store.js');
      });
    },

    getAuthors: function() {
      return _authors;
    },
    
    getSelected: function() {
      return _selected_author;
    },

    setSelected: function(index) {
      _selected_author = index;
    },

    selectedAuthor: function () {
      return _authors[_selected_author - 1];
    }

  });

  
  module.exports = popularAuthorsStore;

}());



