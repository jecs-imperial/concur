'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var session = require('../session'),
    UpdateRequest = require('../request/update'),
    UpdateResponse = require('../response/update');

var UpdateTransaction = function () {
  function UpdateTransaction(updateResponse) {
    _classCallCheck(this, UpdateTransaction);

    this.updateResponse = updateResponse;
  }

  _createClass(UpdateTransaction, [{
    key: 'toJSON',
    value: function toJSON() {
      return this.updateResponse.toJSON();
    }
  }], [{
    key: 'fromJSON',
    value: function fromJSON(json) {
      var updateRequest = UpdateRequest.fromJSON(json),
          operations = updateRequest.getOperations(),
          userIdentifier = updateRequest.getUserIdentifier(),
          sessionIdentifier = updateRequest.getSessionIdentifier(),
          sessionExpired = session.hasExpired(sessionIdentifier),
          pendingOperations = sessionExpired ? [] : session.update(operations, userIdentifier),
          updateResponse = UpdateResponse.fromSessionExpiredAndPendingOperations(sessionExpired, pendingOperations),
          updateTransaction = new UpdateTransaction(updateResponse);

      return updateTransaction;
    }
  }]);

  return UpdateTransaction;
}();

module.exports = UpdateTransaction;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leGFtcGxlL3RyYW5zYWN0aW9uL3VwZGF0ZS5qcyJdLCJuYW1lcyI6WyJzZXNzaW9uIiwicmVxdWlyZSIsIlVwZGF0ZVJlcXVlc3QiLCJVcGRhdGVSZXNwb25zZSIsIlVwZGF0ZVRyYW5zYWN0aW9uIiwidXBkYXRlUmVzcG9uc2UiLCJ0b0pTT04iLCJqc29uIiwidXBkYXRlUmVxdWVzdCIsImZyb21KU09OIiwib3BlcmF0aW9ucyIsImdldE9wZXJhdGlvbnMiLCJ1c2VySWRlbnRpZmllciIsImdldFVzZXJJZGVudGlmaWVyIiwic2Vzc2lvbklkZW50aWZpZXIiLCJnZXRTZXNzaW9uSWRlbnRpZmllciIsInNlc3Npb25FeHBpcmVkIiwiaGFzRXhwaXJlZCIsInBlbmRpbmdPcGVyYXRpb25zIiwidXBkYXRlIiwiZnJvbVNlc3Npb25FeHBpcmVkQW5kUGVuZGluZ09wZXJhdGlvbnMiLCJ1cGRhdGVUcmFuc2FjdGlvbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFFQSxJQUFNQSxVQUFVQyxRQUFRLFlBQVIsQ0FBaEI7QUFBQSxJQUNNQyxnQkFBZ0JELFFBQVEsbUJBQVIsQ0FEdEI7QUFBQSxJQUVNRSxpQkFBaUJGLFFBQVEsb0JBQVIsQ0FGdkI7O0lBSU1HLGlCO0FBQ0osNkJBQVlDLGNBQVosRUFBNEI7QUFBQTs7QUFDMUIsU0FBS0EsY0FBTCxHQUFzQkEsY0FBdEI7QUFDRDs7Ozs2QkFFUTtBQUFFLGFBQU8sS0FBS0EsY0FBTCxDQUFvQkMsTUFBcEIsRUFBUDtBQUFzQzs7OzZCQUVqQ0MsSSxFQUFNO0FBQ3BCLFVBQU1DLGdCQUFnQk4sY0FBY08sUUFBZCxDQUF1QkYsSUFBdkIsQ0FBdEI7QUFBQSxVQUNNRyxhQUFhRixjQUFjRyxhQUFkLEVBRG5CO0FBQUEsVUFFTUMsaUJBQWlCSixjQUFjSyxpQkFBZCxFQUZ2QjtBQUFBLFVBR0NDLG9CQUFvQk4sY0FBY08sb0JBQWQsRUFIckI7QUFBQSxVQUlDQyxpQkFBaUJoQixRQUFRaUIsVUFBUixDQUFtQkgsaUJBQW5CLENBSmxCO0FBQUEsVUFLQ0ksb0JBQW9CRixpQkFDVCxFQURTLEdBRVJoQixRQUFRbUIsTUFBUixDQUFlVCxVQUFmLEVBQTJCRSxjQUEzQixDQVBiO0FBQUEsVUFRTVAsaUJBQWlCRixlQUFlaUIsc0NBQWYsQ0FBc0RKLGNBQXRELEVBQXNFRSxpQkFBdEUsQ0FSdkI7QUFBQSxVQVNNRyxvQkFBb0IsSUFBSWpCLGlCQUFKLENBQXNCQyxjQUF0QixDQVQxQjs7QUFXQSxhQUFPZ0IsaUJBQVA7QUFDRDs7Ozs7O0FBR0hDLE9BQU9DLE9BQVAsR0FBaUJuQixpQkFBakIiLCJmaWxlIjoidXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBzZXNzaW9uID0gcmVxdWlyZSgnLi4vc2Vzc2lvbicpLFxuICAgICAgVXBkYXRlUmVxdWVzdCA9IHJlcXVpcmUoJy4uL3JlcXVlc3QvdXBkYXRlJyksXG4gICAgICBVcGRhdGVSZXNwb25zZSA9IHJlcXVpcmUoJy4uL3Jlc3BvbnNlL3VwZGF0ZScpO1xuXG5jbGFzcyBVcGRhdGVUcmFuc2FjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHVwZGF0ZVJlc3BvbnNlKSB7XG4gICAgdGhpcy51cGRhdGVSZXNwb25zZSA9IHVwZGF0ZVJlc3BvbnNlO1xuICB9XG5cbiAgdG9KU09OKCkgeyByZXR1cm4gdGhpcy51cGRhdGVSZXNwb25zZS50b0pTT04oKTsgfVxuXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XG4gICAgY29uc3QgdXBkYXRlUmVxdWVzdCA9IFVwZGF0ZVJlcXVlc3QuZnJvbUpTT04oanNvbiksXG4gICAgICAgICAgb3BlcmF0aW9ucyA9IHVwZGF0ZVJlcXVlc3QuZ2V0T3BlcmF0aW9ucygpLFxuICAgICAgICAgIHVzZXJJZGVudGlmaWVyID0gdXBkYXRlUmVxdWVzdC5nZXRVc2VySWRlbnRpZmllcigpLFxuXHRcdFx0XHRcdHNlc3Npb25JZGVudGlmaWVyID0gdXBkYXRlUmVxdWVzdC5nZXRTZXNzaW9uSWRlbnRpZmllcigpLFxuXHRcdFx0XHRcdHNlc3Npb25FeHBpcmVkID0gc2Vzc2lvbi5oYXNFeHBpcmVkKHNlc3Npb25JZGVudGlmaWVyKSxcblx0XHRcdFx0XHRwZW5kaW5nT3BlcmF0aW9ucyA9IHNlc3Npb25FeHBpcmVkID9cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0W10gOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNlc3Npb24udXBkYXRlKG9wZXJhdGlvbnMsIHVzZXJJZGVudGlmaWVyKSxcbiAgICAgICAgICB1cGRhdGVSZXNwb25zZSA9IFVwZGF0ZVJlc3BvbnNlLmZyb21TZXNzaW9uRXhwaXJlZEFuZFBlbmRpbmdPcGVyYXRpb25zKHNlc3Npb25FeHBpcmVkLCBwZW5kaW5nT3BlcmF0aW9ucyksXG4gICAgICAgICAgdXBkYXRlVHJhbnNhY3Rpb24gPSBuZXcgVXBkYXRlVHJhbnNhY3Rpb24odXBkYXRlUmVzcG9uc2UpO1xuXG4gICAgcmV0dXJuIHVwZGF0ZVRyYW5zYWN0aW9uO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVXBkYXRlVHJhbnNhY3Rpb247XG4iXX0=