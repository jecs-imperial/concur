"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var session = require("../session"),
    UpdateRequest = require("../request/update"),
    UpdateResponse = require("../response/update");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVwZGF0ZS5qcyJdLCJuYW1lcyI6WyJzZXNzaW9uIiwicmVxdWlyZSIsIlVwZGF0ZVJlcXVlc3QiLCJVcGRhdGVSZXNwb25zZSIsIlVwZGF0ZVRyYW5zYWN0aW9uIiwidXBkYXRlUmVzcG9uc2UiLCJ0b0pTT04iLCJqc29uIiwidXBkYXRlUmVxdWVzdCIsImZyb21KU09OIiwib3BlcmF0aW9ucyIsImdldE9wZXJhdGlvbnMiLCJ1c2VySWRlbnRpZmllciIsImdldFVzZXJJZGVudGlmaWVyIiwic2Vzc2lvbklkZW50aWZpZXIiLCJnZXRTZXNzaW9uSWRlbnRpZmllciIsInNlc3Npb25FeHBpcmVkIiwiaGFzRXhwaXJlZCIsInBlbmRpbmdPcGVyYXRpb25zIiwidXBkYXRlIiwiZnJvbVNlc3Npb25FeHBpcmVkQW5kUGVuZGluZ09wZXJhdGlvbnMiLCJ1cGRhdGVUcmFuc2FjdGlvbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQUVBLElBQU1BLE9BQU8sR0FBR0MsT0FBTyxDQUFDLFlBQUQsQ0FBdkI7QUFBQSxJQUNNQyxhQUFhLEdBQUdELE9BQU8sQ0FBQyxtQkFBRCxDQUQ3QjtBQUFBLElBRU1FLGNBQWMsR0FBR0YsT0FBTyxDQUFDLG9CQUFELENBRjlCOztJQUlNRyxpQjtBQUNKLDZCQUFZQyxjQUFaLEVBQTRCO0FBQUE7O0FBQzFCLFNBQUtBLGNBQUwsR0FBc0JBLGNBQXRCO0FBQ0Q7Ozs7NkJBRVE7QUFBRSxhQUFPLEtBQUtBLGNBQUwsQ0FBb0JDLE1BQXBCLEVBQVA7QUFBc0M7Ozs2QkFFakNDLEksRUFBTTtBQUNwQixVQUFNQyxhQUFhLEdBQUdOLGFBQWEsQ0FBQ08sUUFBZCxDQUF1QkYsSUFBdkIsQ0FBdEI7QUFBQSxVQUNNRyxVQUFVLEdBQUdGLGFBQWEsQ0FBQ0csYUFBZCxFQURuQjtBQUFBLFVBRU1DLGNBQWMsR0FBR0osYUFBYSxDQUFDSyxpQkFBZCxFQUZ2QjtBQUFBLFVBR0NDLGlCQUFpQixHQUFHTixhQUFhLENBQUNPLG9CQUFkLEVBSHJCO0FBQUEsVUFJQ0MsY0FBYyxHQUFHaEIsT0FBTyxDQUFDaUIsVUFBUixDQUFtQkgsaUJBQW5CLENBSmxCO0FBQUEsVUFLQ0ksaUJBQWlCLEdBQUdsQixPQUFPLENBQUNtQixNQUFSLENBQWVULFVBQWYsRUFBMkJFLGNBQTNCLEVBQTJDSSxjQUEzQyxDQUxyQjtBQUFBLFVBTU1YLGNBQWMsR0FBR0YsY0FBYyxDQUFDaUIsc0NBQWYsQ0FBc0RKLGNBQXRELEVBQXNFRSxpQkFBdEUsQ0FOdkI7QUFBQSxVQU9NRyxpQkFBaUIsR0FBRyxJQUFJakIsaUJBQUosQ0FBc0JDLGNBQXRCLENBUDFCO0FBU0EsYUFBT2dCLGlCQUFQO0FBQ0Q7Ozs7OztBQUdIQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJuQixpQkFBakIiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuY29uc3Qgc2Vzc2lvbiA9IHJlcXVpcmUoXCIuLi9zZXNzaW9uXCIpLFxuICAgICAgVXBkYXRlUmVxdWVzdCA9IHJlcXVpcmUoXCIuLi9yZXF1ZXN0L3VwZGF0ZVwiKSxcbiAgICAgIFVwZGF0ZVJlc3BvbnNlID0gcmVxdWlyZShcIi4uL3Jlc3BvbnNlL3VwZGF0ZVwiKTtcblxuY2xhc3MgVXBkYXRlVHJhbnNhY3Rpb24ge1xuICBjb25zdHJ1Y3Rvcih1cGRhdGVSZXNwb25zZSkge1xuICAgIHRoaXMudXBkYXRlUmVzcG9uc2UgPSB1cGRhdGVSZXNwb25zZTtcbiAgfVxuXG4gIHRvSlNPTigpIHsgcmV0dXJuIHRoaXMudXBkYXRlUmVzcG9uc2UudG9KU09OKCk7IH1cblxuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xuICAgIGNvbnN0IHVwZGF0ZVJlcXVlc3QgPSBVcGRhdGVSZXF1ZXN0LmZyb21KU09OKGpzb24pLFxuICAgICAgICAgIG9wZXJhdGlvbnMgPSB1cGRhdGVSZXF1ZXN0LmdldE9wZXJhdGlvbnMoKSxcbiAgICAgICAgICB1c2VySWRlbnRpZmllciA9IHVwZGF0ZVJlcXVlc3QuZ2V0VXNlcklkZW50aWZpZXIoKSxcblx0XHRcdFx0XHRzZXNzaW9uSWRlbnRpZmllciA9IHVwZGF0ZVJlcXVlc3QuZ2V0U2Vzc2lvbklkZW50aWZpZXIoKSxcblx0XHRcdFx0XHRzZXNzaW9uRXhwaXJlZCA9IHNlc3Npb24uaGFzRXhwaXJlZChzZXNzaW9uSWRlbnRpZmllciksXG5cdFx0XHRcdFx0cGVuZGluZ09wZXJhdGlvbnMgPSBzZXNzaW9uLnVwZGF0ZShvcGVyYXRpb25zLCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbkV4cGlyZWQpLFxuICAgICAgICAgIHVwZGF0ZVJlc3BvbnNlID0gVXBkYXRlUmVzcG9uc2UuZnJvbVNlc3Npb25FeHBpcmVkQW5kUGVuZGluZ09wZXJhdGlvbnMoc2Vzc2lvbkV4cGlyZWQsIHBlbmRpbmdPcGVyYXRpb25zKSxcbiAgICAgICAgICB1cGRhdGVUcmFuc2FjdGlvbiA9IG5ldyBVcGRhdGVUcmFuc2FjdGlvbih1cGRhdGVSZXNwb25zZSk7XG5cbiAgICByZXR1cm4gdXBkYXRlVHJhbnNhY3Rpb247XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBVcGRhdGVUcmFuc2FjdGlvbjtcbiJdfQ==