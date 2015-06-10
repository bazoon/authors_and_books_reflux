(function() {
    'use strict';
    var Reflux = require('reflux');

    var TodoActions = Reflux.createActions([
        "authorSelected",
        "bookSelected",
        'randomAuthor',
        'loadAuthors',
        'loadBooks',
        'randomBook',
        'loadPopularAuthors'
    ]);

    module.exports = TodoActions;

})();