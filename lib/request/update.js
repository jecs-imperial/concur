"use strict";

var _toJSON = _interopRequireDefault(require("../operations/toJSON"));

var _fromJSON = _interopRequireDefault(require("../operations/fromJSON"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UpdateRequest = /*#__PURE__*/function () {
  function UpdateRequest(operations, userIdentifier, sessionIdentifier) {
    _classCallCheck(this, UpdateRequest);

    this.operations = operations;
    this.userIdentifier = userIdentifier;
    this.sessionIdentifier = sessionIdentifier;
  }

  _createClass(UpdateRequest, [{
    key: "getOperations",
    value: function getOperations() {
      return this.operations;
    }
  }, {
    key: "getUserIdentifier",
    value: function getUserIdentifier() {
      return this.userIdentifier;
    }
  }, {
    key: "getSessionIdentifier",
    value: function getSessionIdentifier() {
      return this.sessionIdentifier;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var operationsJSON = (0, _toJSON["default"])(this.operations),
          operations = operationsJSON,
          ///
      json = {
        "operations": operations,
        "userIdentifier": this.userIdentifier,
        "sessionIdentifier": this.sessionIdentifier
      };
      return json;
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(json) {
      var operationsJSON = json["operations"],
          userIdentifierJSON = json["userIdentifier"],
          sessionIdentifierJSON = json["sessionIdentifier"],
          operations = (0, _fromJSON["default"])(operationsJSON),
          userIdentifier = userIdentifierJSON,
          ///
      sessionIdentifier = sessionIdentifierJSON,
          ///
      updateRequest = new UpdateRequest(operations, userIdentifier, sessionIdentifier);
      return updateRequest;
    }
  }, {
    key: "fromOperationsUserIdentifierAndSessionIdentifier",
    value: function fromOperationsUserIdentifierAndSessionIdentifier(operations, userIdentifier, sessionIdentifier) {
      var updateRequest = new UpdateRequest(operations, userIdentifier, sessionIdentifier);
      return updateRequest;
    }
  }]);

  return UpdateRequest;
}();

module.exports = UpdateRequest;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVwZGF0ZS5qcyJdLCJuYW1lcyI6WyJVcGRhdGVSZXF1ZXN0Iiwib3BlcmF0aW9ucyIsInVzZXJJZGVudGlmaWVyIiwic2Vzc2lvbklkZW50aWZpZXIiLCJvcGVyYXRpb25zSlNPTiIsImpzb24iLCJ1c2VySWRlbnRpZmllckpTT04iLCJzZXNzaW9uSWRlbnRpZmllckpTT04iLCJ1cGRhdGVSZXF1ZXN0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7SUFFTUEsYTtBQUNKLHlCQUFZQyxVQUFaLEVBQXdCQyxjQUF4QixFQUF3Q0MsaUJBQXhDLEVBQTJEO0FBQUE7O0FBQ3pELFNBQUtGLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0EsU0FBS0MsY0FBTCxHQUFzQkEsY0FBdEI7QUFDQSxTQUFLQyxpQkFBTCxHQUF5QkEsaUJBQXpCO0FBQ0Q7Ozs7b0NBRWU7QUFDZCxhQUFPLEtBQUtGLFVBQVo7QUFDRDs7O3dDQUVtQjtBQUNsQixhQUFPLEtBQUtDLGNBQVo7QUFDRDs7OzJDQUVzQjtBQUN0QixhQUFPLEtBQUtDLGlCQUFaO0FBQ0Q7Ozs2QkFFUztBQUNQLFVBQU1DLGNBQWMsR0FBRyx3QkFBaUIsS0FBS0gsVUFBdEIsQ0FBdkI7QUFBQSxVQUNNQSxVQUFVLEdBQUdHLGNBRG5CO0FBQUEsVUFDb0M7QUFDOUJDLE1BQUFBLElBQUksR0FBRztBQUNMLHNCQUFjSixVQURUO0FBRUwsMEJBQWtCLEtBQUtDLGNBRmxCO0FBR1gsNkJBQXFCLEtBQUtDO0FBSGYsT0FGYjtBQVFBLGFBQU9FLElBQVA7QUFDRDs7OzZCQUVlQSxJLEVBQU07QUFDcEIsVUFBTUQsY0FBYyxHQUFHQyxJQUFJLENBQUMsWUFBRCxDQUEzQjtBQUFBLFVBQ01DLGtCQUFrQixHQUFHRCxJQUFJLENBQUMsZ0JBQUQsQ0FEL0I7QUFBQSxVQUVDRSxxQkFBcUIsR0FBR0YsSUFBSSxDQUFDLG1CQUFELENBRjdCO0FBQUEsVUFHTUosVUFBVSxHQUFHLDBCQUFtQkcsY0FBbkIsQ0FIbkI7QUFBQSxVQUlNRixjQUFjLEdBQUdJLGtCQUp2QjtBQUFBLFVBSTRDO0FBQzNDSCxNQUFBQSxpQkFBaUIsR0FBR0kscUJBTHJCO0FBQUEsVUFLNkM7QUFDdkNDLE1BQUFBLGFBQWEsR0FBRyxJQUFJUixhQUFKLENBQWtCQyxVQUFsQixFQUE4QkMsY0FBOUIsRUFBOENDLGlCQUE5QyxDQU50QjtBQVFBLGFBQU9LLGFBQVA7QUFDRDs7O3FFQUV1RFAsVSxFQUFZQyxjLEVBQWdCQyxpQixFQUFtQjtBQUNyRyxVQUFNSyxhQUFhLEdBQUcsSUFBSVIsYUFBSixDQUFrQkMsVUFBbEIsRUFBOEJDLGNBQTlCLEVBQThDQyxpQkFBOUMsQ0FBdEI7QUFFQSxhQUFPSyxhQUFQO0FBQ0Q7Ozs7OztBQUdIQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJWLGFBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBvcGVyYXRpb25zVG9KU09OIGZyb20gXCIuLi9vcGVyYXRpb25zL3RvSlNPTlwiO1xuaW1wb3J0IG9wZXJhdGlvbnNGcm9tSlNPTiBmcm9tIFwiLi4vb3BlcmF0aW9ucy9mcm9tSlNPTlwiO1xuXG5jbGFzcyBVcGRhdGVSZXF1ZXN0IHtcbiAgY29uc3RydWN0b3Iob3BlcmF0aW9ucywgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyKSB7XG4gICAgdGhpcy5vcGVyYXRpb25zID0gb3BlcmF0aW9ucztcbiAgICB0aGlzLnVzZXJJZGVudGlmaWVyID0gdXNlcklkZW50aWZpZXI7XG4gICAgdGhpcy5zZXNzaW9uSWRlbnRpZmllciA9IHNlc3Npb25JZGVudGlmaWVyO1xuICB9XG5cbiAgZ2V0T3BlcmF0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5vcGVyYXRpb25zO1xuICB9XG5cbiAgZ2V0VXNlcklkZW50aWZpZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMudXNlcklkZW50aWZpZXI7XG4gIH1cblxuICBnZXRTZXNzaW9uSWRlbnRpZmllcigpIHtcbiAgXHRyZXR1cm4gdGhpcy5zZXNzaW9uSWRlbnRpZmllcjtcblx0fVxuXG4gIHRvSlNPTigpIHtcbiAgICBjb25zdCBvcGVyYXRpb25zSlNPTiA9IG9wZXJhdGlvbnNUb0pTT04odGhpcy5vcGVyYXRpb25zKSxcbiAgICAgICAgICBvcGVyYXRpb25zID0gb3BlcmF0aW9uc0pTT04sICAvLy9cbiAgICAgICAgICBqc29uID0ge1xuICAgICAgICAgICAgXCJvcGVyYXRpb25zXCI6IG9wZXJhdGlvbnMsXG4gICAgICAgICAgICBcInVzZXJJZGVudGlmaWVyXCI6IHRoaXMudXNlcklkZW50aWZpZXIsXG5cdFx0XHRcdFx0XHRcInNlc3Npb25JZGVudGlmaWVyXCI6IHRoaXMuc2Vzc2lvbklkZW50aWZpZXJcbiAgICAgICAgICB9O1xuXG4gICAgcmV0dXJuIGpzb247XG4gIH1cblxuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xuICAgIGNvbnN0IG9wZXJhdGlvbnNKU09OID0ganNvbltcIm9wZXJhdGlvbnNcIl0sXG4gICAgICAgICAgdXNlcklkZW50aWZpZXJKU09OID0ganNvbltcInVzZXJJZGVudGlmaWVyXCJdLFxuXHRcdFx0XHRcdHNlc3Npb25JZGVudGlmaWVySlNPTiA9IGpzb25bXCJzZXNzaW9uSWRlbnRpZmllclwiXSxcbiAgICAgICAgICBvcGVyYXRpb25zID0gb3BlcmF0aW9uc0Zyb21KU09OKG9wZXJhdGlvbnNKU09OKSxcbiAgICAgICAgICB1c2VySWRlbnRpZmllciA9IHVzZXJJZGVudGlmaWVySlNPTiwgIC8vL1xuXHRcdFx0XHRcdHNlc3Npb25JZGVudGlmaWVyID0gc2Vzc2lvbklkZW50aWZpZXJKU09OLCAgLy8vXG4gICAgICAgICAgdXBkYXRlUmVxdWVzdCA9IG5ldyBVcGRhdGVSZXF1ZXN0KG9wZXJhdGlvbnMsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllcik7XG5cbiAgICByZXR1cm4gdXBkYXRlUmVxdWVzdDtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tT3BlcmF0aW9uc1VzZXJJZGVudGlmaWVyQW5kU2Vzc2lvbklkZW50aWZpZXIob3BlcmF0aW9ucywgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyKSB7XG4gICAgY29uc3QgdXBkYXRlUmVxdWVzdCA9IG5ldyBVcGRhdGVSZXF1ZXN0KG9wZXJhdGlvbnMsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllcik7XG5cbiAgICByZXR1cm4gdXBkYXRlUmVxdWVzdDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFVwZGF0ZVJlcXVlc3Q7XG4iXX0=