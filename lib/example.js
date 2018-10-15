'use strict';

require('juxtapose');

var easy = require('easy');

var client = require('./client'),
    ContentTextarea = require('./example/textarea/content');

var Body = easy.Body;


client.initialise(function () {
  var body = new Body();

  body.append(React.createElement(
    'section',
    null,
    React.createElement(
      'h1',
      null,
      'Concur example'
    ),
    React.createElement(ContentTextarea, { onChange: function onChange(content, previousContent) {

        var success = client.update(content, previousContent, function (pendingOperations) {
          ///
        });

        return success;
      }
    })
  ));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leGFtcGxlLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJlYXN5IiwiY2xpZW50IiwiQ29udGVudFRleHRhcmVhIiwiQm9keSIsImluaXRpYWxpc2UiLCJib2R5IiwiYXBwZW5kIiwiY29udGVudCIsInByZXZpb3VzQ29udGVudCIsInN1Y2Nlc3MiLCJ1cGRhdGUiLCJwZW5kaW5nT3BlcmF0aW9ucyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUFBLFFBQVEsV0FBUjs7QUFFQSxJQUFNQyxPQUFPRCxRQUFRLE1BQVIsQ0FBYjs7QUFFQSxJQUFNRSxTQUFTRixRQUFRLFVBQVIsQ0FBZjtBQUFBLElBQ01HLGtCQUFrQkgsUUFBUSw0QkFBUixDQUR4Qjs7SUFHUUksSSxHQUFTSCxJLENBQVRHLEk7OztBQUVSRixPQUFPRyxVQUFQLENBQWtCLFlBQVc7QUFDM0IsTUFBTUMsT0FBTyxJQUFJRixJQUFKLEVBQWI7O0FBRUFFLE9BQUtDLE1BQUwsQ0FFRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBREY7QUFFRSx3QkFBQyxlQUFELElBQWlCLFVBQVUsa0JBQVNDLE9BQVQsRUFBa0JDLGVBQWxCLEVBQW1DOztBQUUzQyxZQUFNQyxVQUFVUixPQUFPUyxNQUFQLENBQWNILE9BQWQsRUFBdUJDLGVBQXZCLEVBQXdDLFVBQVNHLGlCQUFULEVBQTRCO0FBQ2xGO0FBQ0QsU0FGZSxDQUFoQjs7QUFJQSxlQUFPRixPQUFQO0FBRUQ7QUFSbEI7QUFGRixHQUZGO0FBaUJELENBcEJEIiwiZmlsZSI6ImV4YW1wbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnJlcXVpcmUoJ2p1eHRhcG9zZScpO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xuXG5jb25zdCBjbGllbnQgPSByZXF1aXJlKCcuL2NsaWVudCcpLFxuICAgICAgQ29udGVudFRleHRhcmVhID0gcmVxdWlyZSgnLi9leGFtcGxlL3RleHRhcmVhL2NvbnRlbnQnKTtcblxuY29uc3QgeyBCb2R5IH0gPSBlYXN5O1xuXG5jbGllbnQuaW5pdGlhbGlzZShmdW5jdGlvbigpIHtcbiAgY29uc3QgYm9keSA9IG5ldyBCb2R5KCk7XG5cbiAgYm9keS5hcHBlbmQoXG5cbiAgICA8c2VjdGlvbj5cbiAgICAgIDxoMT5Db25jdXIgZXhhbXBsZTwvaDE+XG4gICAgICA8Q29udGVudFRleHRhcmVhIG9uQ2hhbmdlPXtmdW5jdGlvbihjb250ZW50LCBwcmV2aW91c0NvbnRlbnQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1Y2Nlc3MgPSBjbGllbnQudXBkYXRlKGNvbnRlbnQsIHByZXZpb3VzQ29udGVudCwgZnVuY3Rpb24ocGVuZGluZ09wZXJhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vL1xuICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1Y2Nlc3M7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgPC9zZWN0aW9uPlxuXG4gICk7XG59KTtcbiJdfQ==