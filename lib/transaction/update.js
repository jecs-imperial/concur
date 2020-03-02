'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var session = require('../session'),
    UpdateRequest = require('../request/update'),
    UpdateResponse = require('../response/update');

var UpdateTransaction = /*#__PURE__*/function () {
  function UpdateTransaction(updateResponse) {
    _classCallCheck(this, UpdateTransaction);

    this.updateResponse = updateResponse;
  }

  _createClass(UpdateTransaction, [{
    key: "toJSON",
    value: function toJSON() {
      return this.updateResponse.toJSON();
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(json) {
      var updateRequest = UpdateRequest.fromJSON(json),
          operations = updateRequest.getOperations(),
          userIdentifier = updateRequest.getUserIdentifier(),
          sessionIdentifier = updateRequest.getSessionIdentifier(),
          sessionExpired = session.hasExpired(sessionIdentifier),
          pendingOperations = session.update(operations, userIdentifier, sessionExpired),
          updateResponse = UpdateResponse.fromSessionExpiredAndPendingOperations(sessionExpired, pendingOperations),
          updateTransaction = new UpdateTransaction(updateResponse);
      return updateTransaction;
    }
  }]);

  return UpdateTransaction;
}();

module.exports = UpdateTransaction;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVwZGF0ZS5qcyJdLCJuYW1lcyI6WyJzZXNzaW9uIiwicmVxdWlyZSIsIlVwZGF0ZVJlcXVlc3QiLCJVcGRhdGVSZXNwb25zZSIsIlVwZGF0ZVRyYW5zYWN0aW9uIiwidXBkYXRlUmVzcG9uc2UiLCJ0b0pTT04iLCJqc29uIiwidXBkYXRlUmVxdWVzdCIsImZyb21KU09OIiwib3BlcmF0aW9ucyIsImdldE9wZXJhdGlvbnMiLCJ1c2VySWRlbnRpZmllciIsImdldFVzZXJJZGVudGlmaWVyIiwic2Vzc2lvbklkZW50aWZpZXIiLCJnZXRTZXNzaW9uSWRlbnRpZmllciIsInNlc3Npb25FeHBpcmVkIiwiaGFzRXhwaXJlZCIsInBlbmRpbmdPcGVyYXRpb25zIiwidXBkYXRlIiwiZnJvbVNlc3Npb25FeHBpcmVkQW5kUGVuZGluZ09wZXJhdGlvbnMiLCJ1cGRhdGVUcmFuc2FjdGlvbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQUVBLElBQU1BLE9BQU8sR0FBR0MsT0FBTyxDQUFDLFlBQUQsQ0FBdkI7QUFBQSxJQUNNQyxhQUFhLEdBQUdELE9BQU8sQ0FBQyxtQkFBRCxDQUQ3QjtBQUFBLElBRU1FLGNBQWMsR0FBR0YsT0FBTyxDQUFDLG9CQUFELENBRjlCOztJQUlNRyxpQjtBQUNKLDZCQUFZQyxjQUFaLEVBQTRCO0FBQUE7O0FBQzFCLFNBQUtBLGNBQUwsR0FBc0JBLGNBQXRCO0FBQ0Q7Ozs7NkJBRVE7QUFBRSxhQUFPLEtBQUtBLGNBQUwsQ0FBb0JDLE1BQXBCLEVBQVA7QUFBc0M7Ozs2QkFFakNDLEksRUFBTTtBQUNwQixVQUFNQyxhQUFhLEdBQUdOLGFBQWEsQ0FBQ08sUUFBZCxDQUF1QkYsSUFBdkIsQ0FBdEI7QUFBQSxVQUNNRyxVQUFVLEdBQUdGLGFBQWEsQ0FBQ0csYUFBZCxFQURuQjtBQUFBLFVBRU1DLGNBQWMsR0FBR0osYUFBYSxDQUFDSyxpQkFBZCxFQUZ2QjtBQUFBLFVBR0NDLGlCQUFpQixHQUFHTixhQUFhLENBQUNPLG9CQUFkLEVBSHJCO0FBQUEsVUFJQ0MsY0FBYyxHQUFHaEIsT0FBTyxDQUFDaUIsVUFBUixDQUFtQkgsaUJBQW5CLENBSmxCO0FBQUEsVUFLQ0ksaUJBQWlCLEdBQUdsQixPQUFPLENBQUNtQixNQUFSLENBQWVULFVBQWYsRUFBMkJFLGNBQTNCLEVBQTJDSSxjQUEzQyxDQUxyQjtBQUFBLFVBTU1YLGNBQWMsR0FBR0YsY0FBYyxDQUFDaUIsc0NBQWYsQ0FBc0RKLGNBQXRELEVBQXNFRSxpQkFBdEUsQ0FOdkI7QUFBQSxVQU9NRyxpQkFBaUIsR0FBRyxJQUFJakIsaUJBQUosQ0FBc0JDLGNBQXRCLENBUDFCO0FBU0EsYUFBT2dCLGlCQUFQO0FBQ0Q7Ozs7OztBQUdIQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJuQixpQkFBakIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHNlc3Npb24gPSByZXF1aXJlKCcuLi9zZXNzaW9uJyksXG4gICAgICBVcGRhdGVSZXF1ZXN0ID0gcmVxdWlyZSgnLi4vcmVxdWVzdC91cGRhdGUnKSxcbiAgICAgIFVwZGF0ZVJlc3BvbnNlID0gcmVxdWlyZSgnLi4vcmVzcG9uc2UvdXBkYXRlJyk7XG5cbmNsYXNzIFVwZGF0ZVRyYW5zYWN0aW9uIHtcbiAgY29uc3RydWN0b3IodXBkYXRlUmVzcG9uc2UpIHtcbiAgICB0aGlzLnVwZGF0ZVJlc3BvbnNlID0gdXBkYXRlUmVzcG9uc2U7XG4gIH1cblxuICB0b0pTT04oKSB7IHJldHVybiB0aGlzLnVwZGF0ZVJlc3BvbnNlLnRvSlNPTigpOyB9XG5cbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcbiAgICBjb25zdCB1cGRhdGVSZXF1ZXN0ID0gVXBkYXRlUmVxdWVzdC5mcm9tSlNPTihqc29uKSxcbiAgICAgICAgICBvcGVyYXRpb25zID0gdXBkYXRlUmVxdWVzdC5nZXRPcGVyYXRpb25zKCksXG4gICAgICAgICAgdXNlcklkZW50aWZpZXIgPSB1cGRhdGVSZXF1ZXN0LmdldFVzZXJJZGVudGlmaWVyKCksXG5cdFx0XHRcdFx0c2Vzc2lvbklkZW50aWZpZXIgPSB1cGRhdGVSZXF1ZXN0LmdldFNlc3Npb25JZGVudGlmaWVyKCksXG5cdFx0XHRcdFx0c2Vzc2lvbkV4cGlyZWQgPSBzZXNzaW9uLmhhc0V4cGlyZWQoc2Vzc2lvbklkZW50aWZpZXIpLFxuXHRcdFx0XHRcdHBlbmRpbmdPcGVyYXRpb25zID0gc2Vzc2lvbi51cGRhdGUob3BlcmF0aW9ucywgdXNlcklkZW50aWZpZXIsIHNlc3Npb25FeHBpcmVkKSxcbiAgICAgICAgICB1cGRhdGVSZXNwb25zZSA9IFVwZGF0ZVJlc3BvbnNlLmZyb21TZXNzaW9uRXhwaXJlZEFuZFBlbmRpbmdPcGVyYXRpb25zKHNlc3Npb25FeHBpcmVkLCBwZW5kaW5nT3BlcmF0aW9ucyksXG4gICAgICAgICAgdXBkYXRlVHJhbnNhY3Rpb24gPSBuZXcgVXBkYXRlVHJhbnNhY3Rpb24odXBkYXRlUmVzcG9uc2UpO1xuXG4gICAgcmV0dXJuIHVwZGF0ZVRyYW5zYWN0aW9uO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVXBkYXRlVHJhbnNhY3Rpb247XG4iXX0=