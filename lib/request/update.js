"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var operationsToJSON = require("../operations/toJSON"),
    operationsFromJSON = require("../operations/fromJSON");

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
      var operationsJSON = operationsToJSON(this.operations),
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
          operations = operationsFromJSON(operationsJSON),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVwZGF0ZS5qcyJdLCJuYW1lcyI6WyJvcGVyYXRpb25zVG9KU09OIiwicmVxdWlyZSIsIm9wZXJhdGlvbnNGcm9tSlNPTiIsIlVwZGF0ZVJlcXVlc3QiLCJvcGVyYXRpb25zIiwidXNlcklkZW50aWZpZXIiLCJzZXNzaW9uSWRlbnRpZmllciIsIm9wZXJhdGlvbnNKU09OIiwianNvbiIsInVzZXJJZGVudGlmaWVySlNPTiIsInNlc3Npb25JZGVudGlmaWVySlNPTiIsInVwZGF0ZVJlcXVlc3QiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFFQSxJQUFNQSxnQkFBZ0IsR0FBR0MsT0FBTyxDQUFDLHNCQUFELENBQWhDO0FBQUEsSUFDTUMsa0JBQWtCLEdBQUdELE9BQU8sQ0FBQyx3QkFBRCxDQURsQzs7SUFHTUUsYTtBQUNKLHlCQUFZQyxVQUFaLEVBQXdCQyxjQUF4QixFQUF3Q0MsaUJBQXhDLEVBQTJEO0FBQUE7O0FBQ3pELFNBQUtGLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0EsU0FBS0MsY0FBTCxHQUFzQkEsY0FBdEI7QUFDQSxTQUFLQyxpQkFBTCxHQUF5QkEsaUJBQXpCO0FBQ0Q7Ozs7b0NBRWU7QUFDZCxhQUFPLEtBQUtGLFVBQVo7QUFDRDs7O3dDQUVtQjtBQUNsQixhQUFPLEtBQUtDLGNBQVo7QUFDRDs7OzJDQUVzQjtBQUN0QixhQUFPLEtBQUtDLGlCQUFaO0FBQ0Q7Ozs2QkFFUztBQUNQLFVBQU1DLGNBQWMsR0FBR1AsZ0JBQWdCLENBQUMsS0FBS0ksVUFBTixDQUF2QztBQUFBLFVBQ01BLFVBQVUsR0FBR0csY0FEbkI7QUFBQSxVQUNvQztBQUM5QkMsTUFBQUEsSUFBSSxHQUFHO0FBQ0wsc0JBQWNKLFVBRFQ7QUFFTCwwQkFBa0IsS0FBS0MsY0FGbEI7QUFHWCw2QkFBcUIsS0FBS0M7QUFIZixPQUZiO0FBUUEsYUFBT0UsSUFBUDtBQUNEOzs7NkJBRWVBLEksRUFBTTtBQUNwQixVQUFNRCxjQUFjLEdBQUdDLElBQUksQ0FBQyxZQUFELENBQTNCO0FBQUEsVUFDTUMsa0JBQWtCLEdBQUdELElBQUksQ0FBQyxnQkFBRCxDQUQvQjtBQUFBLFVBRUNFLHFCQUFxQixHQUFHRixJQUFJLENBQUMsbUJBQUQsQ0FGN0I7QUFBQSxVQUdNSixVQUFVLEdBQUdGLGtCQUFrQixDQUFDSyxjQUFELENBSHJDO0FBQUEsVUFJTUYsY0FBYyxHQUFHSSxrQkFKdkI7QUFBQSxVQUk0QztBQUMzQ0gsTUFBQUEsaUJBQWlCLEdBQUdJLHFCQUxyQjtBQUFBLFVBSzZDO0FBQ3ZDQyxNQUFBQSxhQUFhLEdBQUcsSUFBSVIsYUFBSixDQUFrQkMsVUFBbEIsRUFBOEJDLGNBQTlCLEVBQThDQyxpQkFBOUMsQ0FOdEI7QUFRQSxhQUFPSyxhQUFQO0FBQ0Q7OztxRUFFdURQLFUsRUFBWUMsYyxFQUFnQkMsaUIsRUFBbUI7QUFDckcsVUFBTUssYUFBYSxHQUFHLElBQUlSLGFBQUosQ0FBa0JDLFVBQWxCLEVBQThCQyxjQUE5QixFQUE4Q0MsaUJBQTlDLENBQXRCO0FBRUEsYUFBT0ssYUFBUDtBQUNEOzs7Ozs7QUFHSEMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCVixhQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBvcGVyYXRpb25zVG9KU09OID0gcmVxdWlyZShcIi4uL29wZXJhdGlvbnMvdG9KU09OXCIpLFxuICAgICAgb3BlcmF0aW9uc0Zyb21KU09OID0gcmVxdWlyZShcIi4uL29wZXJhdGlvbnMvZnJvbUpTT05cIik7XG5cbmNsYXNzIFVwZGF0ZVJlcXVlc3Qge1xuICBjb25zdHJ1Y3RvcihvcGVyYXRpb25zLCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpIHtcbiAgICB0aGlzLm9wZXJhdGlvbnMgPSBvcGVyYXRpb25zO1xuICAgIHRoaXMudXNlcklkZW50aWZpZXIgPSB1c2VySWRlbnRpZmllcjtcbiAgICB0aGlzLnNlc3Npb25JZGVudGlmaWVyID0gc2Vzc2lvbklkZW50aWZpZXI7XG4gIH1cblxuICBnZXRPcGVyYXRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLm9wZXJhdGlvbnM7XG4gIH1cblxuICBnZXRVc2VySWRlbnRpZmllcigpIHtcbiAgICByZXR1cm4gdGhpcy51c2VySWRlbnRpZmllcjtcbiAgfVxuXG4gIGdldFNlc3Npb25JZGVudGlmaWVyKCkge1xuICBcdHJldHVybiB0aGlzLnNlc3Npb25JZGVudGlmaWVyO1xuXHR9XG5cbiAgdG9KU09OKCkge1xuICAgIGNvbnN0IG9wZXJhdGlvbnNKU09OID0gb3BlcmF0aW9uc1RvSlNPTih0aGlzLm9wZXJhdGlvbnMpLFxuICAgICAgICAgIG9wZXJhdGlvbnMgPSBvcGVyYXRpb25zSlNPTiwgIC8vL1xuICAgICAgICAgIGpzb24gPSB7XG4gICAgICAgICAgICBcIm9wZXJhdGlvbnNcIjogb3BlcmF0aW9ucyxcbiAgICAgICAgICAgIFwidXNlcklkZW50aWZpZXJcIjogdGhpcy51c2VySWRlbnRpZmllcixcblx0XHRcdFx0XHRcdFwic2Vzc2lvbklkZW50aWZpZXJcIjogdGhpcy5zZXNzaW9uSWRlbnRpZmllclxuICAgICAgICAgIH07XG5cbiAgICByZXR1cm4ganNvbjtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XG4gICAgY29uc3Qgb3BlcmF0aW9uc0pTT04gPSBqc29uW1wib3BlcmF0aW9uc1wiXSxcbiAgICAgICAgICB1c2VySWRlbnRpZmllckpTT04gPSBqc29uW1widXNlcklkZW50aWZpZXJcIl0sXG5cdFx0XHRcdFx0c2Vzc2lvbklkZW50aWZpZXJKU09OID0ganNvbltcInNlc3Npb25JZGVudGlmaWVyXCJdLFxuICAgICAgICAgIG9wZXJhdGlvbnMgPSBvcGVyYXRpb25zRnJvbUpTT04ob3BlcmF0aW9uc0pTT04pLFxuICAgICAgICAgIHVzZXJJZGVudGlmaWVyID0gdXNlcklkZW50aWZpZXJKU09OLCAgLy8vXG5cdFx0XHRcdFx0c2Vzc2lvbklkZW50aWZpZXIgPSBzZXNzaW9uSWRlbnRpZmllckpTT04sICAvLy9cbiAgICAgICAgICB1cGRhdGVSZXF1ZXN0ID0gbmV3IFVwZGF0ZVJlcXVlc3Qob3BlcmF0aW9ucywgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyKTtcblxuICAgIHJldHVybiB1cGRhdGVSZXF1ZXN0O1xuICB9XG5cbiAgc3RhdGljIGZyb21PcGVyYXRpb25zVXNlcklkZW50aWZpZXJBbmRTZXNzaW9uSWRlbnRpZmllcihvcGVyYXRpb25zLCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpIHtcbiAgICBjb25zdCB1cGRhdGVSZXF1ZXN0ID0gbmV3IFVwZGF0ZVJlcXVlc3Qob3BlcmF0aW9ucywgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyKTtcblxuICAgIHJldHVybiB1cGRhdGVSZXF1ZXN0O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVXBkYXRlUmVxdWVzdDtcbiJdfQ==