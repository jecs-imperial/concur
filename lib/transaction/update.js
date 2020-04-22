"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _session = _interopRequireDefault(require("../session"));

var _update = _interopRequireDefault(require("../request/update"));

var _update2 = _interopRequireDefault(require("../response/update"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
      var updateRequest = _update["default"].fromJSON(json),
          operations = updateRequest.getOperations(),
          userIdentifier = updateRequest.getUserIdentifier(),
          sessionIdentifier = updateRequest.getSessionIdentifier(),
          sessionExpired = _session["default"].hasExpired(sessionIdentifier),
          pendingOperations = _session["default"].update(operations, userIdentifier, sessionExpired),
          updateResponse = _update2["default"].fromSessionExpiredAndPendingOperations(sessionExpired, pendingOperations),
          updateTransaction = new UpdateTransaction(updateResponse);

      return updateTransaction;
    }
  }]);

  return UpdateTransaction;
}();

exports["default"] = UpdateTransaction;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVwZGF0ZS5qcyJdLCJuYW1lcyI6WyJVcGRhdGVUcmFuc2FjdGlvbiIsInVwZGF0ZVJlc3BvbnNlIiwidG9KU09OIiwianNvbiIsInVwZGF0ZVJlcXVlc3QiLCJVcGRhdGVSZXF1ZXN0IiwiZnJvbUpTT04iLCJvcGVyYXRpb25zIiwiZ2V0T3BlcmF0aW9ucyIsInVzZXJJZGVudGlmaWVyIiwiZ2V0VXNlcklkZW50aWZpZXIiLCJzZXNzaW9uSWRlbnRpZmllciIsImdldFNlc3Npb25JZGVudGlmaWVyIiwic2Vzc2lvbkV4cGlyZWQiLCJzZXNzaW9uIiwiaGFzRXhwaXJlZCIsInBlbmRpbmdPcGVyYXRpb25zIiwidXBkYXRlIiwiVXBkYXRlUmVzcG9uc2UiLCJmcm9tU2Vzc2lvbkV4cGlyZWRBbmRQZW5kaW5nT3BlcmF0aW9ucyIsInVwZGF0ZVRyYW5zYWN0aW9uIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBRXFCQSxpQjtBQUNuQiw2QkFBWUMsY0FBWixFQUE0QjtBQUFBOztBQUMxQixTQUFLQSxjQUFMLEdBQXNCQSxjQUF0QjtBQUNEOzs7OzZCQUVRO0FBQUUsYUFBTyxLQUFLQSxjQUFMLENBQW9CQyxNQUFwQixFQUFQO0FBQXNDOzs7NkJBRWpDQyxJLEVBQU07QUFDcEIsVUFBTUMsYUFBYSxHQUFHQyxtQkFBY0MsUUFBZCxDQUF1QkgsSUFBdkIsQ0FBdEI7QUFBQSxVQUNNSSxVQUFVLEdBQUdILGFBQWEsQ0FBQ0ksYUFBZCxFQURuQjtBQUFBLFVBRU1DLGNBQWMsR0FBR0wsYUFBYSxDQUFDTSxpQkFBZCxFQUZ2QjtBQUFBLFVBR0NDLGlCQUFpQixHQUFHUCxhQUFhLENBQUNRLG9CQUFkLEVBSHJCO0FBQUEsVUFJQ0MsY0FBYyxHQUFHQyxvQkFBUUMsVUFBUixDQUFtQkosaUJBQW5CLENBSmxCO0FBQUEsVUFLQ0ssaUJBQWlCLEdBQUdGLG9CQUFRRyxNQUFSLENBQWVWLFVBQWYsRUFBMkJFLGNBQTNCLEVBQTJDSSxjQUEzQyxDQUxyQjtBQUFBLFVBTU1aLGNBQWMsR0FBR2lCLG9CQUFlQyxzQ0FBZixDQUFzRE4sY0FBdEQsRUFBc0VHLGlCQUF0RSxDQU52QjtBQUFBLFVBT01JLGlCQUFpQixHQUFHLElBQUlwQixpQkFBSixDQUFzQkMsY0FBdEIsQ0FQMUI7O0FBU0EsYUFBT21CLGlCQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHNlc3Npb24gZnJvbSBcIi4uL3Nlc3Npb25cIjtcbmltcG9ydCBVcGRhdGVSZXF1ZXN0IGZyb20gXCIuLi9yZXF1ZXN0L3VwZGF0ZVwiO1xuaW1wb3J0IFVwZGF0ZVJlc3BvbnNlIGZyb20gXCIuLi9yZXNwb25zZS91cGRhdGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXBkYXRlVHJhbnNhY3Rpb24ge1xuICBjb25zdHJ1Y3Rvcih1cGRhdGVSZXNwb25zZSkge1xuICAgIHRoaXMudXBkYXRlUmVzcG9uc2UgPSB1cGRhdGVSZXNwb25zZTtcbiAgfVxuXG4gIHRvSlNPTigpIHsgcmV0dXJuIHRoaXMudXBkYXRlUmVzcG9uc2UudG9KU09OKCk7IH1cblxuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xuICAgIGNvbnN0IHVwZGF0ZVJlcXVlc3QgPSBVcGRhdGVSZXF1ZXN0LmZyb21KU09OKGpzb24pLFxuICAgICAgICAgIG9wZXJhdGlvbnMgPSB1cGRhdGVSZXF1ZXN0LmdldE9wZXJhdGlvbnMoKSxcbiAgICAgICAgICB1c2VySWRlbnRpZmllciA9IHVwZGF0ZVJlcXVlc3QuZ2V0VXNlcklkZW50aWZpZXIoKSxcblx0XHRcdFx0XHRzZXNzaW9uSWRlbnRpZmllciA9IHVwZGF0ZVJlcXVlc3QuZ2V0U2Vzc2lvbklkZW50aWZpZXIoKSxcblx0XHRcdFx0XHRzZXNzaW9uRXhwaXJlZCA9IHNlc3Npb24uaGFzRXhwaXJlZChzZXNzaW9uSWRlbnRpZmllciksXG5cdFx0XHRcdFx0cGVuZGluZ09wZXJhdGlvbnMgPSBzZXNzaW9uLnVwZGF0ZShvcGVyYXRpb25zLCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbkV4cGlyZWQpLFxuICAgICAgICAgIHVwZGF0ZVJlc3BvbnNlID0gVXBkYXRlUmVzcG9uc2UuZnJvbVNlc3Npb25FeHBpcmVkQW5kUGVuZGluZ09wZXJhdGlvbnMoc2Vzc2lvbkV4cGlyZWQsIHBlbmRpbmdPcGVyYXRpb25zKSxcbiAgICAgICAgICB1cGRhdGVUcmFuc2FjdGlvbiA9IG5ldyBVcGRhdGVUcmFuc2FjdGlvbih1cGRhdGVSZXNwb25zZSk7XG5cbiAgICByZXR1cm4gdXBkYXRlVHJhbnNhY3Rpb247XG4gIH1cbn1cbiJdfQ==