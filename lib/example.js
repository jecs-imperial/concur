'use strict';

require('juxtapose');

var easy = require('easy');

var ContentTextarea = require('./example/textarea/content'),
    client = require('./example/client');

var Body = easy.Body;


client.initialise(function (content) {
  var body = new Body();

  body.append(React.createElement(
    'section',
    null,
    React.createElement(
      'h1',
      null,
      'Concur example'
    ),
    React.createElement(
      ContentTextarea,
      { onChange: function onChange(content, previousContent) {
          var _this = this;

          var success = client.update(content, previousContent, function (pendingOperations) {
            return _this.update(pendingOperations);
          });

          return success;
        }
      },
      content
    )
  ));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leGFtcGxlLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJlYXN5IiwiQ29udGVudFRleHRhcmVhIiwiY2xpZW50IiwiQm9keSIsImluaXRpYWxpc2UiLCJjb250ZW50IiwiYm9keSIsImFwcGVuZCIsInByZXZpb3VzQ29udGVudCIsInN1Y2Nlc3MiLCJ1cGRhdGUiLCJwZW5kaW5nT3BlcmF0aW9ucyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUFBLFFBQVEsV0FBUjs7QUFFQSxJQUFNQyxPQUFPRCxRQUFRLE1BQVIsQ0FBYjs7QUFFQSxJQUFNRSxrQkFBa0JGLFFBQVEsNEJBQVIsQ0FBeEI7QUFBQSxJQUNNRyxTQUFTSCxRQUFRLGtCQUFSLENBRGY7O0lBR1FJLEksR0FBU0gsSSxDQUFURyxJOzs7QUFFUkQsT0FBT0UsVUFBUCxDQUFrQixVQUFTQyxPQUFULEVBQWtCO0FBQ2xDLE1BQU1DLE9BQU8sSUFBSUgsSUFBSixFQUFiOztBQUVBRyxPQUFLQyxNQUFMLENBRUU7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQURGO0FBRUU7QUFBQyxxQkFBRDtBQUFBLFFBQWlCLFVBQVUsa0JBQVNGLE9BQVQsRUFBa0JHLGVBQWxCLEVBQW1DO0FBQUE7O0FBRTNDLGNBQU1DLFVBQVVQLE9BQU9RLE1BQVAsQ0FBY0wsT0FBZCxFQUF1QkcsZUFBdkIsRUFBd0M7QUFBQSxtQkFBcUIsTUFBS0UsTUFBTCxDQUFZQyxpQkFBWixDQUFyQjtBQUFBLFdBQXhDLENBQWhCOztBQUVBLGlCQUFPRixPQUFQO0FBRUQ7QUFObEI7QUFRR0o7QUFSSDtBQUZGLEdBRkY7QUFpQkQsQ0FwQkQiLCJmaWxlIjoiZXhhbXBsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnanV4dGFwb3NlJyk7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5Jyk7XG5cbmNvbnN0IENvbnRlbnRUZXh0YXJlYSA9IHJlcXVpcmUoJy4vZXhhbXBsZS90ZXh0YXJlYS9jb250ZW50JyksXG4gICAgICBjbGllbnQgPSByZXF1aXJlKCcuL2V4YW1wbGUvY2xpZW50Jyk7XG5cbmNvbnN0IHsgQm9keSB9ID0gZWFzeTtcblxuY2xpZW50LmluaXRpYWxpc2UoZnVuY3Rpb24oY29udGVudCkge1xuICBjb25zdCBib2R5ID0gbmV3IEJvZHkoKTtcblxuICBib2R5LmFwcGVuZChcblxuICAgIDxzZWN0aW9uPlxuICAgICAgPGgxPkNvbmN1ciBleGFtcGxlPC9oMT5cbiAgICAgIDxDb250ZW50VGV4dGFyZWEgb25DaGFuZ2U9e2Z1bmN0aW9uKGNvbnRlbnQsIHByZXZpb3VzQ29udGVudCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3VjY2VzcyA9IGNsaWVudC51cGRhdGUoY29udGVudCwgcHJldmlvdXNDb250ZW50LCBwZW5kaW5nT3BlcmF0aW9ucyA9PiB0aGlzLnVwZGF0ZShwZW5kaW5nT3BlcmF0aW9ucykpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1Y2Nlc3M7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2NvbnRlbnR9XG4gICAgICA8L0NvbnRlbnRUZXh0YXJlYT5cbiAgICA8L3NlY3Rpb24+XG5cbiAgKTtcbn0pO1xuIl19