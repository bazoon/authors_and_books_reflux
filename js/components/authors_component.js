(function () {
  var React = require('react');
  var Actions = require('../actions/actions');

  var Authors = React.createClass({

    selectAuthor: function(event) {
      Actions.authorSelected(event.target.value);
    },

    render: function() {
      
      return (
        
        React.createElement('select', { onChange: this.selectAuthor, value: this.props.selected },
          this.props.authors.map(function (authorObject) {
            return React.createElement('option', { key: authorObject.id, value: authorObject.id}, authorObject.name);
          })));
      
    }

    

    

  });

  module.exports = Authors;
})();