'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var necessary = require('necessary'),
    sufficient = require('sufficient');

var uris = require('../../uris'),
    UpdateRequest = require('../../request/update'),
    UpdateResponse = require('../../response/update');

var miscellaneousUtilities = necessary.miscellaneousUtilities,
    AsynchronousTask = sufficient.AsynchronousTask,
    post = miscellaneousUtilities.post,
    UPDATE_URI = uris.UPDATE_URI;

var UpdateAsynchronousTask = function (_AsynchronousTask) {
      _inherits(UpdateAsynchronousTask, _AsynchronousTask);

      function UpdateAsynchronousTask(host, userIdentifier, content, previousContent, callback) {
            _classCallCheck(this, UpdateAsynchronousTask);

            return _possibleConstructorReturn(this, (UpdateAsynchronousTask.__proto__ || Object.getPrototypeOf(UpdateAsynchronousTask)).call(this, asynchronousMethod, host, userIdentifier, content, previousContent, callback));
      }

      return UpdateAsynchronousTask;
}(AsynchronousTask);

module.exports = UpdateAsynchronousTask;

function asynchronousMethod(host, userIdentifier, content, previousContent, callback) {
      var updateRequest = UpdateRequest.fromUserIdentifierContentAndPreviousContent(userIdentifier, content, previousContent),
          uri = UPDATE_URI,
          json = updateRequest.toJSON();

      post(host, uri, json, function (json) {
            var updateResponse = UpdateResponse.fromJSON(json),
                pendingOperations = updateResponse.getPendingOperations();

            callback(pendingOperations);
      });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi90YXNrL2FzeW5jaHJvbm91cy91cGRhdGUuanMiXSwibmFtZXMiOlsibmVjZXNzYXJ5IiwicmVxdWlyZSIsInN1ZmZpY2llbnQiLCJ1cmlzIiwiVXBkYXRlUmVxdWVzdCIsIlVwZGF0ZVJlc3BvbnNlIiwibWlzY2VsbGFuZW91c1V0aWxpdGllcyIsIkFzeW5jaHJvbm91c1Rhc2siLCJwb3N0IiwiVVBEQVRFX1VSSSIsIlVwZGF0ZUFzeW5jaHJvbm91c1Rhc2siLCJob3N0IiwidXNlcklkZW50aWZpZXIiLCJjb250ZW50IiwicHJldmlvdXNDb250ZW50IiwiY2FsbGJhY2siLCJhc3luY2hyb25vdXNNZXRob2QiLCJtb2R1bGUiLCJleHBvcnRzIiwidXBkYXRlUmVxdWVzdCIsImZyb21Vc2VySWRlbnRpZmllckNvbnRlbnRBbmRQcmV2aW91c0NvbnRlbnQiLCJ1cmkiLCJqc29uIiwidG9KU09OIiwidXBkYXRlUmVzcG9uc2UiLCJmcm9tSlNPTiIsInBlbmRpbmdPcGVyYXRpb25zIiwiZ2V0UGVuZGluZ09wZXJhdGlvbnMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQUVBLElBQU1BLFlBQVlDLFFBQVEsV0FBUixDQUFsQjtBQUFBLElBQ01DLGFBQWFELFFBQVEsWUFBUixDQURuQjs7QUFHQSxJQUFNRSxPQUFPRixRQUFRLFlBQVIsQ0FBYjtBQUFBLElBQ01HLGdCQUFnQkgsUUFBUSxzQkFBUixDQUR0QjtBQUFBLElBRU1JLGlCQUFpQkosUUFBUSx1QkFBUixDQUZ2Qjs7QUFJTSxJQUFFSyxzQkFBRixHQUE2Qk4sU0FBN0IsQ0FBRU0sc0JBQUY7QUFBQSxJQUNFQyxnQkFERixHQUN1QkwsVUFEdkIsQ0FDRUssZ0JBREY7QUFBQSxJQUVFQyxJQUZGLEdBRVdGLHNCQUZYLENBRUVFLElBRkY7QUFBQSxJQUdFQyxVQUhGLEdBR2lCTixJQUhqQixDQUdFTSxVQUhGOztJQUtBQyxzQjs7O0FBQ0osc0NBQVlDLElBQVosRUFBa0JDLGNBQWxCLEVBQWtDQyxPQUFsQyxFQUEyQ0MsZUFBM0MsRUFBNERDLFFBQTVELEVBQXNFO0FBQUE7O0FBQUEsbUpBQzlEQyxrQkFEOEQsRUFDMUNMLElBRDBDLEVBQ3BDQyxjQURvQyxFQUNwQkMsT0FEb0IsRUFDWEMsZUFEVyxFQUNNQyxRQUROO0FBRXJFOzs7RUFIa0NSLGdCOztBQU1yQ1UsT0FBT0MsT0FBUCxHQUFpQlIsc0JBQWpCOztBQUVBLFNBQVNNLGtCQUFULENBQTRCTCxJQUE1QixFQUFrQ0MsY0FBbEMsRUFBa0RDLE9BQWxELEVBQTJEQyxlQUEzRCxFQUE0RUMsUUFBNUUsRUFBc0Y7QUFDcEYsVUFBTUksZ0JBQWdCZixjQUFjZ0IsMkNBQWQsQ0FBMERSLGNBQTFELEVBQTBFQyxPQUExRSxFQUFtRkMsZUFBbkYsQ0FBdEI7QUFBQSxVQUNNTyxNQUFNWixVQURaO0FBQUEsVUFFTWEsT0FBT0gsY0FBY0ksTUFBZCxFQUZiOztBQUlBZixXQUFLRyxJQUFMLEVBQVdVLEdBQVgsRUFBZ0JDLElBQWhCLEVBQXNCLFVBQVNBLElBQVQsRUFBZTtBQUNuQyxnQkFBTUUsaUJBQWlCbkIsZUFBZW9CLFFBQWYsQ0FBd0JILElBQXhCLENBQXZCO0FBQUEsZ0JBQ01JLG9CQUFvQkYsZUFBZUcsb0JBQWYsRUFEMUI7O0FBR0FaLHFCQUFTVyxpQkFBVDtBQUNELE9BTEQ7QUFNRCIsImZpbGUiOiJ1cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IG5lY2Vzc2FyeSA9IHJlcXVpcmUoJ25lY2Vzc2FyeScpLFxuICAgICAgc3VmZmljaWVudCA9IHJlcXVpcmUoJ3N1ZmZpY2llbnQnKTtcblxuY29uc3QgdXJpcyA9IHJlcXVpcmUoJy4uLy4uL3VyaXMnKSxcbiAgICAgIFVwZGF0ZVJlcXVlc3QgPSByZXF1aXJlKCcuLi8uLi9yZXF1ZXN0L3VwZGF0ZScpLFxuICAgICAgVXBkYXRlUmVzcG9uc2UgPSByZXF1aXJlKCcuLi8uLi9yZXNwb25zZS91cGRhdGUnKTtcblxuY29uc3QgeyBtaXNjZWxsYW5lb3VzVXRpbGl0aWVzIH0gPSBuZWNlc3NhcnksXG4gICAgICB7IEFzeW5jaHJvbm91c1Rhc2sgfSA9IHN1ZmZpY2llbnQsXG4gICAgICB7IHBvc3QgfSA9IG1pc2NlbGxhbmVvdXNVdGlsaXRpZXMsXG4gICAgICB7IFVQREFURV9VUkkgfSA9IHVyaXM7XG5cbmNsYXNzIFVwZGF0ZUFzeW5jaHJvbm91c1Rhc2sgZXh0ZW5kcyBBc3luY2hyb25vdXNUYXNrIHtcbiAgY29uc3RydWN0b3IoaG9zdCwgdXNlcklkZW50aWZpZXIsIGNvbnRlbnQsIHByZXZpb3VzQ29udGVudCwgY2FsbGJhY2spIHtcbiAgICBzdXBlcihhc3luY2hyb25vdXNNZXRob2QsIGhvc3QsIHVzZXJJZGVudGlmaWVyLCBjb250ZW50LCBwcmV2aW91c0NvbnRlbnQsIGNhbGxiYWNrKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVXBkYXRlQXN5bmNocm9ub3VzVGFzaztcblxuZnVuY3Rpb24gYXN5bmNocm9ub3VzTWV0aG9kKGhvc3QsIHVzZXJJZGVudGlmaWVyLCBjb250ZW50LCBwcmV2aW91c0NvbnRlbnQsIGNhbGxiYWNrKSB7XG4gIGNvbnN0IHVwZGF0ZVJlcXVlc3QgPSBVcGRhdGVSZXF1ZXN0LmZyb21Vc2VySWRlbnRpZmllckNvbnRlbnRBbmRQcmV2aW91c0NvbnRlbnQodXNlcklkZW50aWZpZXIsIGNvbnRlbnQsIHByZXZpb3VzQ29udGVudCksXG4gICAgICAgIHVyaSA9IFVQREFURV9VUkksXG4gICAgICAgIGpzb24gPSB1cGRhdGVSZXF1ZXN0LnRvSlNPTigpO1xuXG4gIHBvc3QoaG9zdCwgdXJpLCBqc29uLCBmdW5jdGlvbihqc29uKSB7XG4gICAgY29uc3QgdXBkYXRlUmVzcG9uc2UgPSBVcGRhdGVSZXNwb25zZS5mcm9tSlNPTihqc29uKSxcbiAgICAgICAgICBwZW5kaW5nT3BlcmF0aW9ucyA9IHVwZGF0ZVJlc3BvbnNlLmdldFBlbmRpbmdPcGVyYXRpb25zKCk7XG5cbiAgICBjYWxsYmFjayhwZW5kaW5nT3BlcmF0aW9ucyk7XG4gIH0pO1xufVxuIl19