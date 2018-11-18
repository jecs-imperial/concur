'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var operationsToJSON = require('../operations/toJSON'),
    operationsFromJSON = require('../operations/fromJSON');

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
    key: 'fromJSON',
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
    key: 'fromOperationsUserIdentifierAndSessionIdentifier',
    value: function fromOperationsUserIdentifierAndSessionIdentifier(operations, userIdentifier, sessionIdentifier) {
      var updateRequest = new UpdateRequest(operations, userIdentifier, sessionIdentifier);

      return updateRequest;
    }
  }]);

  return UpdateRequest;
}();

module.exports = UpdateRequest;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9yZXF1ZXN0L3VwZGF0ZS5qcyJdLCJuYW1lcyI6WyJvcGVyYXRpb25zVG9KU09OIiwicmVxdWlyZSIsIm9wZXJhdGlvbnNGcm9tSlNPTiIsIlVwZGF0ZVJlcXVlc3QiLCJvcGVyYXRpb25zIiwidXNlcklkZW50aWZpZXIiLCJzZXNzaW9uSWRlbnRpZmllciIsIm9wZXJhdGlvbnNKU09OIiwianNvbiIsInVzZXJJZGVudGlmaWVySlNPTiIsInNlc3Npb25JZGVudGlmaWVySlNPTiIsInVwZGF0ZVJlcXVlc3QiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBRUEsSUFBTUEsbUJBQW1CQyxRQUFRLHNCQUFSLENBQXpCO0FBQUEsSUFDTUMscUJBQXFCRCxRQUFRLHdCQUFSLENBRDNCOztJQUdNRSxhO0FBQ0oseUJBQVlDLFVBQVosRUFBd0JDLGNBQXhCLEVBQXdDQyxpQkFBeEMsRUFBMkQ7QUFBQTs7QUFDekQsU0FBS0YsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSxTQUFLQyxjQUFMLEdBQXNCQSxjQUF0QjtBQUNBLFNBQUtDLGlCQUFMLEdBQXlCQSxpQkFBekI7QUFDRDs7OztvQ0FFZTtBQUNkLGFBQU8sS0FBS0YsVUFBWjtBQUNEOzs7d0NBRW1CO0FBQ2xCLGFBQU8sS0FBS0MsY0FBWjtBQUNEOzs7MkNBRXNCO0FBQ3RCLGFBQU8sS0FBS0MsaUJBQVo7QUFDRDs7OzZCQUVTO0FBQ1AsVUFBTUMsaUJBQWlCUCxpQkFBaUIsS0FBS0ksVUFBdEIsQ0FBdkI7QUFBQSxVQUNNQSxhQUFhRyxjQURuQjtBQUFBLFVBQ29DO0FBQzlCQyxhQUFPO0FBQ0wsc0JBQWNKLFVBRFQ7QUFFTCwwQkFBa0IsS0FBS0MsY0FGbEI7QUFHWCw2QkFBcUIsS0FBS0M7QUFIZixPQUZiOztBQVFBLGFBQU9FLElBQVA7QUFDRDs7OzZCQUVlQSxJLEVBQU07QUFDcEIsVUFBTUQsaUJBQWlCQyxLQUFLLFlBQUwsQ0FBdkI7QUFBQSxVQUNNQyxxQkFBcUJELEtBQUssZ0JBQUwsQ0FEM0I7QUFBQSxVQUVDRSx3QkFBd0JGLEtBQUssbUJBQUwsQ0FGekI7QUFBQSxVQUdNSixhQUFhRixtQkFBbUJLLGNBQW5CLENBSG5CO0FBQUEsVUFJTUYsaUJBQWlCSSxrQkFKdkI7QUFBQSxVQUk0QztBQUMzQ0gsMEJBQW9CSSxxQkFMckI7QUFBQSxVQUs2QztBQUN2Q0Msc0JBQWdCLElBQUlSLGFBQUosQ0FBa0JDLFVBQWxCLEVBQThCQyxjQUE5QixFQUE4Q0MsaUJBQTlDLENBTnRCOztBQVFBLGFBQU9LLGFBQVA7QUFDRDs7O3FFQUV1RFAsVSxFQUFZQyxjLEVBQWdCQyxpQixFQUFtQjtBQUNyRyxVQUFNSyxnQkFBZ0IsSUFBSVIsYUFBSixDQUFrQkMsVUFBbEIsRUFBOEJDLGNBQTlCLEVBQThDQyxpQkFBOUMsQ0FBdEI7O0FBRUEsYUFBT0ssYUFBUDtBQUNEOzs7Ozs7QUFHSEMsT0FBT0MsT0FBUCxHQUFpQlYsYUFBakIiLCJmaWxlIjoidXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBvcGVyYXRpb25zVG9KU09OID0gcmVxdWlyZSgnLi4vb3BlcmF0aW9ucy90b0pTT04nKSxcbiAgICAgIG9wZXJhdGlvbnNGcm9tSlNPTiA9IHJlcXVpcmUoJy4uL29wZXJhdGlvbnMvZnJvbUpTT04nKTtcblxuY2xhc3MgVXBkYXRlUmVxdWVzdCB7XG4gIGNvbnN0cnVjdG9yKG9wZXJhdGlvbnMsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllcikge1xuICAgIHRoaXMub3BlcmF0aW9ucyA9IG9wZXJhdGlvbnM7XG4gICAgdGhpcy51c2VySWRlbnRpZmllciA9IHVzZXJJZGVudGlmaWVyO1xuICAgIHRoaXMuc2Vzc2lvbklkZW50aWZpZXIgPSBzZXNzaW9uSWRlbnRpZmllcjtcbiAgfVxuXG4gIGdldE9wZXJhdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMub3BlcmF0aW9ucztcbiAgfVxuXG4gIGdldFVzZXJJZGVudGlmaWVyKCkge1xuICAgIHJldHVybiB0aGlzLnVzZXJJZGVudGlmaWVyO1xuICB9XG5cbiAgZ2V0U2Vzc2lvbklkZW50aWZpZXIoKSB7XG4gIFx0cmV0dXJuIHRoaXMuc2Vzc2lvbklkZW50aWZpZXI7XG5cdH1cblxuICB0b0pTT04oKSB7XG4gICAgY29uc3Qgb3BlcmF0aW9uc0pTT04gPSBvcGVyYXRpb25zVG9KU09OKHRoaXMub3BlcmF0aW9ucyksXG4gICAgICAgICAgb3BlcmF0aW9ucyA9IG9wZXJhdGlvbnNKU09OLCAgLy8vXG4gICAgICAgICAganNvbiA9IHtcbiAgICAgICAgICAgIFwib3BlcmF0aW9uc1wiOiBvcGVyYXRpb25zLFxuICAgICAgICAgICAgXCJ1c2VySWRlbnRpZmllclwiOiB0aGlzLnVzZXJJZGVudGlmaWVyLFxuXHRcdFx0XHRcdFx0XCJzZXNzaW9uSWRlbnRpZmllclwiOiB0aGlzLnNlc3Npb25JZGVudGlmaWVyXG4gICAgICAgICAgfTtcblxuICAgIHJldHVybiBqc29uO1xuICB9XG5cbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcbiAgICBjb25zdCBvcGVyYXRpb25zSlNPTiA9IGpzb25bXCJvcGVyYXRpb25zXCJdLFxuICAgICAgICAgIHVzZXJJZGVudGlmaWVySlNPTiA9IGpzb25bXCJ1c2VySWRlbnRpZmllclwiXSxcblx0XHRcdFx0XHRzZXNzaW9uSWRlbnRpZmllckpTT04gPSBqc29uW1wic2Vzc2lvbklkZW50aWZpZXJcIl0sXG4gICAgICAgICAgb3BlcmF0aW9ucyA9IG9wZXJhdGlvbnNGcm9tSlNPTihvcGVyYXRpb25zSlNPTiksXG4gICAgICAgICAgdXNlcklkZW50aWZpZXIgPSB1c2VySWRlbnRpZmllckpTT04sICAvLy9cblx0XHRcdFx0XHRzZXNzaW9uSWRlbnRpZmllciA9IHNlc3Npb25JZGVudGlmaWVySlNPTiwgIC8vL1xuICAgICAgICAgIHVwZGF0ZVJlcXVlc3QgPSBuZXcgVXBkYXRlUmVxdWVzdChvcGVyYXRpb25zLCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpO1xuXG4gICAgcmV0dXJuIHVwZGF0ZVJlcXVlc3Q7XG4gIH1cblxuICBzdGF0aWMgZnJvbU9wZXJhdGlvbnNVc2VySWRlbnRpZmllckFuZFNlc3Npb25JZGVudGlmaWVyKG9wZXJhdGlvbnMsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllcikge1xuICAgIGNvbnN0IHVwZGF0ZVJlcXVlc3QgPSBuZXcgVXBkYXRlUmVxdWVzdChvcGVyYXRpb25zLCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpO1xuXG4gICAgcmV0dXJuIHVwZGF0ZVJlcXVlc3Q7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBVcGRhdGVSZXF1ZXN0O1xuIl19