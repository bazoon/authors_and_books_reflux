// React
var React = require('react');


var Actions = require('./actions/actions');
var AppComponent = require('./components/app_component');
React.render(React.createElement(AppComponent, null), document.getElementById('app'));

// var authorsLoader = require('./authors/authors_loader');

Actions.loadAuthors();
Actions.loadPopularAuthors();
Actions.authorSelected(1);

