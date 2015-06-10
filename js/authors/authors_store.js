(function () {

  var Actions = require('../actions/actions');
  var _ = require('underscore');
  var authorsLoader = require('./authors_loader');
  var Reflux = require('reflux');

  
  var _authors = [], _selected_author = null;
  
  authorsStore =  Reflux.createStore({
    
    init: function () {
      console.log('init authors_store.js');
      this.listenTo(Actions.loadAuthors, this.loadAuthorsData);
      this.listenTo(Actions.authorSelected, this.setSelected);
      this.listenTo(Actions.randomAuthor, this.randomAuthor);

    },

    loadAuthorsData: function () {
      var that = this;
      return authorsLoader.loadAuthors().then(function (response) {
        _authors = response;
        console.log('loaded authors');
        that.trigger('LOAD AUTHORS!!!');
      });
    },

    getAuthors: function() {
      return _authors;
    },
    
    getSelected: function() {
      return _selected_author;
    },

    setSelected: function(index) {
      console.log('authors_store.js: setSelected', index);
      _selected_author = index;
    },

    selectedAuthor: function () {
      return _authors[_selected_author - 1];
    },

    randomAuthor: function () {
      var randomIndex = _.random(1, _authors.length);
      authorsStore.setSelected(randomIndex);
      this.trigger('randomAuthor', randomIndex);
    }

  });

  
  module.exports = authorsStore;

}());



