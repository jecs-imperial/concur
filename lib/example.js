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

          var success = client.update(content, previousContent, function (pendingOperations) {
            ///
          });

          return success;
        }
      },
      content
    )
  ));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leGFtcGxlLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJlYXN5IiwiQ29udGVudFRleHRhcmVhIiwiY2xpZW50IiwiQm9keSIsImluaXRpYWxpc2UiLCJjb250ZW50IiwiYm9keSIsImFwcGVuZCIsInByZXZpb3VzQ29udGVudCIsInN1Y2Nlc3MiLCJ1cGRhdGUiLCJwZW5kaW5nT3BlcmF0aW9ucyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUFBLFFBQVEsV0FBUjs7QUFFQSxJQUFNQyxPQUFPRCxRQUFRLE1BQVIsQ0FBYjs7QUFFQSxJQUFNRSxrQkFBa0JGLFFBQVEsNEJBQVIsQ0FBeEI7QUFBQSxJQUNNRyxTQUFTSCxRQUFRLGtCQUFSLENBRGY7O0lBR1FJLEksR0FBU0gsSSxDQUFURyxJOzs7QUFFUkQsT0FBT0UsVUFBUCxDQUFrQixVQUFTQyxPQUFULEVBQWtCO0FBQ2xDLE1BQU1DLE9BQU8sSUFBSUgsSUFBSixFQUFiOztBQUVBRyxPQUFLQyxNQUFMLENBRUU7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQURGO0FBRUU7QUFBQyxxQkFBRDtBQUFBLFFBQWlCLFVBQVUsa0JBQVNGLE9BQVQsRUFBa0JHLGVBQWxCLEVBQW1DOztBQUUzQyxjQUFNQyxVQUFVUCxPQUFPUSxNQUFQLENBQWNMLE9BQWQsRUFBdUJHLGVBQXZCLEVBQXdDLFVBQVNHLGlCQUFULEVBQTRCO0FBQ2xGO0FBQ0QsV0FGZSxDQUFoQjs7QUFJQSxpQkFBT0YsT0FBUDtBQUVEO0FBUmxCO0FBVUdKO0FBVkg7QUFGRixHQUZGO0FBbUJELENBdEJEIiwiZmlsZSI6ImV4YW1wbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnJlcXVpcmUoJ2p1eHRhcG9zZScpO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xuXG5jb25zdCBDb250ZW50VGV4dGFyZWEgPSByZXF1aXJlKCcuL2V4YW1wbGUvdGV4dGFyZWEvY29udGVudCcpLFxuICAgICAgY2xpZW50ID0gcmVxdWlyZSgnLi9leGFtcGxlL2NsaWVudCcpO1xuXG5jb25zdCB7IEJvZHkgfSA9IGVhc3k7XG5cbmNsaWVudC5pbml0aWFsaXNlKGZ1bmN0aW9uKGNvbnRlbnQpIHtcbiAgY29uc3QgYm9keSA9IG5ldyBCb2R5KCk7XG5cbiAgYm9keS5hcHBlbmQoXG5cbiAgICA8c2VjdGlvbj5cbiAgICAgIDxoMT5Db25jdXIgZXhhbXBsZTwvaDE+XG4gICAgICA8Q29udGVudFRleHRhcmVhIG9uQ2hhbmdlPXtmdW5jdGlvbihjb250ZW50LCBwcmV2aW91c0NvbnRlbnQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1Y2Nlc3MgPSBjbGllbnQudXBkYXRlKGNvbnRlbnQsIHByZXZpb3VzQ29udGVudCwgZnVuY3Rpb24ocGVuZGluZ09wZXJhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vL1xuICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1Y2Nlc3M7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2NvbnRlbnR9XG4gICAgICA8L0NvbnRlbnRUZXh0YXJlYT5cbiAgICA8L3NlY3Rpb24+XG5cbiAgKTtcbn0pO1xuIl19