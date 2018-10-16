'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var serialiseOperations = require('../../operations/serialise');

var _toJSON = serialiseOperations.toJSON,
    _fromJSON = serialiseOperations.fromJSON;

var UpdateRequest = function () {
  function UpdateRequest(operations, userIdentifier, sessionIdentifier) {
    _classCallCheck(this, UpdateRequest);

    this.operations = operations;
    this.userIdentifier = userIdentifier;
    this.sessionIdentifier = sessionIdentifier;
  }

  _createClass(UpdateRequest, [{
    key: 'getOperations',
    value: function getOperations() {
      return this.operations;
    }
  }, {
    key: 'getUserIdentifier',
    value: function getUserIdentifier() {
      return this.userIdentifier;
    }
  }, {
    key: 'getSessionIdentifier',
    value: function getSessionIdentifier() {
      return this.sessionIdentifier;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var operationsJSON = _toJSON(this.operations),
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
    key: 'fromJSON',
    value: function fromJSON(json) {
      var operationsJSON = json["operations"],
          userIdentifierJSON = json["userIdentifier"],
          sessionIdentifierJSON = json["sessionIdentifier"],
          operations = _fromJSON(operationsJSON),
          userIdentifier = userIdentifierJSON,
          ///
      sessionIdentifier = sessionIdentifierJSON,
          ///
      updateRequest = new UpdateRequest(operations, userIdentifier, sessionIdentifier);

      return updateRequest;
    }
  }, {
    key: 'fromOperationsUserIdentifierAndSessionIdentifier',
    value: function fromOperationsUserIdentifierAndSessionIdentifier(operations, userIdentifier, sessionIdentifier) {
      var updateRequest = new UpdateRequest(operations, userIdentifier, sessionIdentifier);

      return updateRequest;
    }
  }]);

  return UpdateRequest;
}();

module.exports = UpdateRequest;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leGFtcGxlL3JlcXVlc3QvdXBkYXRlLmpzIl0sIm5hbWVzIjpbInNlcmlhbGlzZU9wZXJhdGlvbnMiLCJyZXF1aXJlIiwidG9KU09OIiwiZnJvbUpTT04iLCJVcGRhdGVSZXF1ZXN0Iiwib3BlcmF0aW9ucyIsInVzZXJJZGVudGlmaWVyIiwic2Vzc2lvbklkZW50aWZpZXIiLCJvcGVyYXRpb25zSlNPTiIsImpzb24iLCJ1c2VySWRlbnRpZmllckpTT04iLCJzZXNzaW9uSWRlbnRpZmllckpTT04iLCJ1cGRhdGVSZXF1ZXN0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBLElBQU1BLHNCQUFzQkMsUUFBUSw0QkFBUixDQUE1Qjs7SUFFUUMsTyxHQUFxQkYsbUIsQ0FBckJFLE07SUFBUUMsUyxHQUFhSCxtQixDQUFiRyxROztJQUVWQyxhO0FBQ0oseUJBQVlDLFVBQVosRUFBd0JDLGNBQXhCLEVBQXdDQyxpQkFBeEMsRUFBMkQ7QUFBQTs7QUFDekQsU0FBS0YsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSxTQUFLQyxjQUFMLEdBQXNCQSxjQUF0QjtBQUNBLFNBQUtDLGlCQUFMLEdBQXlCQSxpQkFBekI7QUFDRDs7OztvQ0FFZTtBQUNkLGFBQU8sS0FBS0YsVUFBWjtBQUNEOzs7d0NBRW1CO0FBQ2xCLGFBQU8sS0FBS0MsY0FBWjtBQUNEOzs7MkNBRXNCO0FBQ3RCLGFBQU8sS0FBS0MsaUJBQVo7QUFDRDs7OzZCQUVTO0FBQ1AsVUFBTUMsaUJBQWlCTixRQUFPLEtBQUtHLFVBQVosQ0FBdkI7QUFBQSxVQUNNQSxhQUFhRyxjQURuQjtBQUFBLFVBQ29DO0FBQzlCQyxhQUFPO0FBQ0wsc0JBQWNKLFVBRFQ7QUFFTCwwQkFBa0IsS0FBS0MsY0FGbEI7QUFHWCw2QkFBcUIsS0FBS0M7QUFIZixPQUZiOztBQVFBLGFBQU9FLElBQVA7QUFDRDs7OzZCQUVlQSxJLEVBQU07QUFDcEIsVUFBTUQsaUJBQWlCQyxLQUFLLFlBQUwsQ0FBdkI7QUFBQSxVQUNNQyxxQkFBcUJELEtBQUssZ0JBQUwsQ0FEM0I7QUFBQSxVQUVDRSx3QkFBd0JGLEtBQUssbUJBQUwsQ0FGekI7QUFBQSxVQUdNSixhQUFhRixVQUFTSyxjQUFULENBSG5CO0FBQUEsVUFJTUYsaUJBQWlCSSxrQkFKdkI7QUFBQSxVQUk0QztBQUMzQ0gsMEJBQW9CSSxxQkFMckI7QUFBQSxVQUs2QztBQUN2Q0Msc0JBQWdCLElBQUlSLGFBQUosQ0FBa0JDLFVBQWxCLEVBQThCQyxjQUE5QixFQUE4Q0MsaUJBQTlDLENBTnRCOztBQVFBLGFBQU9LLGFBQVA7QUFDRDs7O3FFQUV1RFAsVSxFQUFZQyxjLEVBQWdCQyxpQixFQUFtQjtBQUNyRyxVQUFNSyxnQkFBZ0IsSUFBSVIsYUFBSixDQUFrQkMsVUFBbEIsRUFBOEJDLGNBQTlCLEVBQThDQyxpQkFBOUMsQ0FBdEI7O0FBRUEsYUFBT0ssYUFBUDtBQUNEOzs7Ozs7QUFHSEMsT0FBT0MsT0FBUCxHQUFpQlYsYUFBakIiLCJmaWxlIjoidXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBzZXJpYWxpc2VPcGVyYXRpb25zID0gcmVxdWlyZSgnLi4vLi4vb3BlcmF0aW9ucy9zZXJpYWxpc2UnKTtcblxuY29uc3QgeyB0b0pTT04sIGZyb21KU09OIH0gPSBzZXJpYWxpc2VPcGVyYXRpb25zO1xuXG5jbGFzcyBVcGRhdGVSZXF1ZXN0IHtcbiAgY29uc3RydWN0b3Iob3BlcmF0aW9ucywgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyKSB7XG4gICAgdGhpcy5vcGVyYXRpb25zID0gb3BlcmF0aW9ucztcbiAgICB0aGlzLnVzZXJJZGVudGlmaWVyID0gdXNlcklkZW50aWZpZXI7XG4gICAgdGhpcy5zZXNzaW9uSWRlbnRpZmllciA9IHNlc3Npb25JZGVudGlmaWVyO1xuICB9XG5cbiAgZ2V0T3BlcmF0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5vcGVyYXRpb25zO1xuICB9XG5cbiAgZ2V0VXNlcklkZW50aWZpZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMudXNlcklkZW50aWZpZXI7XG4gIH1cblxuICBnZXRTZXNzaW9uSWRlbnRpZmllcigpIHtcbiAgXHRyZXR1cm4gdGhpcy5zZXNzaW9uSWRlbnRpZmllcjtcblx0fVxuXG4gIHRvSlNPTigpIHtcbiAgICBjb25zdCBvcGVyYXRpb25zSlNPTiA9IHRvSlNPTih0aGlzLm9wZXJhdGlvbnMpLFxuICAgICAgICAgIG9wZXJhdGlvbnMgPSBvcGVyYXRpb25zSlNPTiwgIC8vL1xuICAgICAgICAgIGpzb24gPSB7XG4gICAgICAgICAgICBcIm9wZXJhdGlvbnNcIjogb3BlcmF0aW9ucyxcbiAgICAgICAgICAgIFwidXNlcklkZW50aWZpZXJcIjogdGhpcy51c2VySWRlbnRpZmllcixcblx0XHRcdFx0XHRcdFwic2Vzc2lvbklkZW50aWZpZXJcIjogdGhpcy5zZXNzaW9uSWRlbnRpZmllclxuICAgICAgICAgIH07XG5cbiAgICByZXR1cm4ganNvbjtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XG4gICAgY29uc3Qgb3BlcmF0aW9uc0pTT04gPSBqc29uW1wib3BlcmF0aW9uc1wiXSxcbiAgICAgICAgICB1c2VySWRlbnRpZmllckpTT04gPSBqc29uW1widXNlcklkZW50aWZpZXJcIl0sXG5cdFx0XHRcdFx0c2Vzc2lvbklkZW50aWZpZXJKU09OID0ganNvbltcInNlc3Npb25JZGVudGlmaWVyXCJdLFxuICAgICAgICAgIG9wZXJhdGlvbnMgPSBmcm9tSlNPTihvcGVyYXRpb25zSlNPTiksXG4gICAgICAgICAgdXNlcklkZW50aWZpZXIgPSB1c2VySWRlbnRpZmllckpTT04sICAvLy9cblx0XHRcdFx0XHRzZXNzaW9uSWRlbnRpZmllciA9IHNlc3Npb25JZGVudGlmaWVySlNPTiwgIC8vL1xuICAgICAgICAgIHVwZGF0ZVJlcXVlc3QgPSBuZXcgVXBkYXRlUmVxdWVzdChvcGVyYXRpb25zLCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpO1xuXG4gICAgcmV0dXJuIHVwZGF0ZVJlcXVlc3Q7XG4gIH1cblxuICBzdGF0aWMgZnJvbU9wZXJhdGlvbnNVc2VySWRlbnRpZmllckFuZFNlc3Npb25JZGVudGlmaWVyKG9wZXJhdGlvbnMsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllcikge1xuICAgIGNvbnN0IHVwZGF0ZVJlcXVlc3QgPSBuZXcgVXBkYXRlUmVxdWVzdChvcGVyYXRpb25zLCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpO1xuXG4gICAgcmV0dXJuIHVwZGF0ZVJlcXVlc3Q7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBVcGRhdGVSZXF1ZXN0O1xuIl19