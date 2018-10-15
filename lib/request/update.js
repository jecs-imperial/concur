'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var generateOperations = require('../operations/generate'),
    serialiseOperations = require('../operations/serialise');

var _toJSON = serialiseOperations.toJSON,
    _fromJSON = serialiseOperations.fromJSON;

var UpdateRequest = function () {
  function UpdateRequest(userIdentifier, operations) {
    _classCallCheck(this, UpdateRequest);

    this.operations = operations;
    this.userIdentifier = userIdentifier;
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
    key: 'toJSON',
    value: function toJSON() {
      var operationsJSON = _toJSON(this.operations),
          operations = operationsJSON,
          ///
      json = {
        "operations": operations,
        "userIdentifier": this.userIdentifier
      };

      return json;
    }
  }], [{
    key: 'fromJSON',
    value: function fromJSON(json) {
      var operationsJSON = json["operations"],
          userIdentifierJSON = json["userIdentifier"],
          operations = _fromJSON(operationsJSON),
          userIdentifier = userIdentifierJSON,
          ///
      updateRequest = new UpdateRequest(operations, userIdentifier);

      return updateRequest;
    }
  }, {
    key: 'fromUserIdentifierContentAndPreviousContent',
    value: function fromUserIdentifierContentAndPreviousContent(userIdentifier, content, previousContent) {
      var operations = generateOperations(content, previousContent),
          ///
      updateRequest = new UpdateRequest(userIdentifier, operations);

      return updateRequest;
    }
  }]);

  return UpdateRequest;
}();

module.exports = UpdateRequest;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9yZXF1ZXN0L3VwZGF0ZS5qcyJdLCJuYW1lcyI6WyJnZW5lcmF0ZU9wZXJhdGlvbnMiLCJyZXF1aXJlIiwic2VyaWFsaXNlT3BlcmF0aW9ucyIsInRvSlNPTiIsImZyb21KU09OIiwiVXBkYXRlUmVxdWVzdCIsInVzZXJJZGVudGlmaWVyIiwib3BlcmF0aW9ucyIsIm9wZXJhdGlvbnNKU09OIiwianNvbiIsInVzZXJJZGVudGlmaWVySlNPTiIsInVwZGF0ZVJlcXVlc3QiLCJjb250ZW50IiwicHJldmlvdXNDb250ZW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBLElBQU1BLHFCQUFxQkMsUUFBUSx3QkFBUixDQUEzQjtBQUFBLElBQ01DLHNCQUFzQkQsUUFBUSx5QkFBUixDQUQ1Qjs7SUFHUUUsTyxHQUFxQkQsbUIsQ0FBckJDLE07SUFBUUMsUyxHQUFhRixtQixDQUFiRSxROztJQUVWQyxhO0FBQ0oseUJBQVlDLGNBQVosRUFBNEJDLFVBQTVCLEVBQXdDO0FBQUE7O0FBQ3RDLFNBQUtBLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0EsU0FBS0QsY0FBTCxHQUFzQkEsY0FBdEI7QUFDRDs7OztvQ0FFZTtBQUNkLGFBQU8sS0FBS0MsVUFBWjtBQUNEOzs7d0NBRW1CO0FBQ2xCLGFBQU8sS0FBS0QsY0FBWjtBQUNEOzs7NkJBRVE7QUFDUCxVQUFNRSxpQkFBaUJMLFFBQU8sS0FBS0ksVUFBWixDQUF2QjtBQUFBLFVBQ01BLGFBQWFDLGNBRG5CO0FBQUEsVUFDb0M7QUFDOUJDLGFBQU87QUFDTCxzQkFBY0YsVUFEVDtBQUVMLDBCQUFrQixLQUFLRDtBQUZsQixPQUZiOztBQU9BLGFBQU9HLElBQVA7QUFDRDs7OzZCQUVlQSxJLEVBQU07QUFDcEIsVUFBTUQsaUJBQWlCQyxLQUFLLFlBQUwsQ0FBdkI7QUFBQSxVQUNNQyxxQkFBcUJELEtBQUssZ0JBQUwsQ0FEM0I7QUFBQSxVQUVNRixhQUFhSCxVQUFTSSxjQUFULENBRm5CO0FBQUEsVUFHTUYsaUJBQWlCSSxrQkFIdkI7QUFBQSxVQUc0QztBQUN0Q0Msc0JBQWdCLElBQUlOLGFBQUosQ0FBa0JFLFVBQWxCLEVBQThCRCxjQUE5QixDQUp0Qjs7QUFNQSxhQUFPSyxhQUFQO0FBQ0Q7OztnRUFFa0RMLGMsRUFBZ0JNLE8sRUFBU0MsZSxFQUFpQjtBQUMzRixVQUFNTixhQUFhUCxtQkFBbUJZLE9BQW5CLEVBQTRCQyxlQUE1QixDQUFuQjtBQUFBLFVBQWtFO0FBQzVERixzQkFBZ0IsSUFBSU4sYUFBSixDQUFrQkMsY0FBbEIsRUFBa0NDLFVBQWxDLENBRHRCOztBQUdBLGFBQU9JLGFBQVA7QUFDRDs7Ozs7O0FBR0hHLE9BQU9DLE9BQVAsR0FBaUJWLGFBQWpCIiwiZmlsZSI6InVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZ2VuZXJhdGVPcGVyYXRpb25zID0gcmVxdWlyZSgnLi4vb3BlcmF0aW9ucy9nZW5lcmF0ZScpLFxuICAgICAgc2VyaWFsaXNlT3BlcmF0aW9ucyA9IHJlcXVpcmUoJy4uL29wZXJhdGlvbnMvc2VyaWFsaXNlJyk7XG5cbmNvbnN0IHsgdG9KU09OLCBmcm9tSlNPTiB9ID0gc2VyaWFsaXNlT3BlcmF0aW9ucztcblxuY2xhc3MgVXBkYXRlUmVxdWVzdCB7XG4gIGNvbnN0cnVjdG9yKHVzZXJJZGVudGlmaWVyLCBvcGVyYXRpb25zKSB7XG4gICAgdGhpcy5vcGVyYXRpb25zID0gb3BlcmF0aW9ucztcbiAgICB0aGlzLnVzZXJJZGVudGlmaWVyID0gdXNlcklkZW50aWZpZXI7XG4gIH1cblxuICBnZXRPcGVyYXRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLm9wZXJhdGlvbnM7XG4gIH1cblxuICBnZXRVc2VySWRlbnRpZmllcigpIHtcbiAgICByZXR1cm4gdGhpcy51c2VySWRlbnRpZmllcjtcbiAgfVxuXG4gIHRvSlNPTigpIHtcbiAgICBjb25zdCBvcGVyYXRpb25zSlNPTiA9IHRvSlNPTih0aGlzLm9wZXJhdGlvbnMpLFxuICAgICAgICAgIG9wZXJhdGlvbnMgPSBvcGVyYXRpb25zSlNPTiwgIC8vL1xuICAgICAgICAgIGpzb24gPSB7XG4gICAgICAgICAgICBcIm9wZXJhdGlvbnNcIjogb3BlcmF0aW9ucyxcbiAgICAgICAgICAgIFwidXNlcklkZW50aWZpZXJcIjogdGhpcy51c2VySWRlbnRpZmllclxuICAgICAgICAgIH07XG5cbiAgICByZXR1cm4ganNvbjtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XG4gICAgY29uc3Qgb3BlcmF0aW9uc0pTT04gPSBqc29uW1wib3BlcmF0aW9uc1wiXSxcbiAgICAgICAgICB1c2VySWRlbnRpZmllckpTT04gPSBqc29uW1widXNlcklkZW50aWZpZXJcIl0sXG4gICAgICAgICAgb3BlcmF0aW9ucyA9IGZyb21KU09OKG9wZXJhdGlvbnNKU09OKSxcbiAgICAgICAgICB1c2VySWRlbnRpZmllciA9IHVzZXJJZGVudGlmaWVySlNPTiwgIC8vL1xuICAgICAgICAgIHVwZGF0ZVJlcXVlc3QgPSBuZXcgVXBkYXRlUmVxdWVzdChvcGVyYXRpb25zLCB1c2VySWRlbnRpZmllcik7XG5cbiAgICByZXR1cm4gdXBkYXRlUmVxdWVzdDtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tVXNlcklkZW50aWZpZXJDb250ZW50QW5kUHJldmlvdXNDb250ZW50KHVzZXJJZGVudGlmaWVyLCBjb250ZW50LCBwcmV2aW91c0NvbnRlbnQpIHtcbiAgICBjb25zdCBvcGVyYXRpb25zID0gZ2VuZXJhdGVPcGVyYXRpb25zKGNvbnRlbnQsIHByZXZpb3VzQ29udGVudCksICAvLy9cbiAgICAgICAgICB1cGRhdGVSZXF1ZXN0ID0gbmV3IFVwZGF0ZVJlcXVlc3QodXNlcklkZW50aWZpZXIsIG9wZXJhdGlvbnMpO1xuXG4gICAgcmV0dXJuIHVwZGF0ZVJlcXVlc3Q7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBVcGRhdGVSZXF1ZXN0O1xuIl19