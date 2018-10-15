'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var serialiseOperations = require('../../operations/serialise');

var _toJSON = serialiseOperations.toJSON,
    _fromJSON = serialiseOperations.fromJSON;

var UpdateRequest = function () {
  function UpdateRequest(operations, userIdentifier) {
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
    key: 'fromOperationsAndUserIdentifier',
    value: function fromOperationsAndUserIdentifier(operations, userIdentifier) {
      var updateRequest = new UpdateRequest(operations, userIdentifier);

      return updateRequest;
    }
  }]);

  return UpdateRequest;
}();

module.exports = UpdateRequest;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leGFtcGxlL3JlcXVlc3QvdXBkYXRlLmpzIl0sIm5hbWVzIjpbInNlcmlhbGlzZU9wZXJhdGlvbnMiLCJyZXF1aXJlIiwidG9KU09OIiwiZnJvbUpTT04iLCJVcGRhdGVSZXF1ZXN0Iiwib3BlcmF0aW9ucyIsInVzZXJJZGVudGlmaWVyIiwib3BlcmF0aW9uc0pTT04iLCJqc29uIiwidXNlcklkZW50aWZpZXJKU09OIiwidXBkYXRlUmVxdWVzdCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFFQSxJQUFNQSxzQkFBc0JDLFFBQVEsNEJBQVIsQ0FBNUI7O0lBRVFDLE8sR0FBcUJGLG1CLENBQXJCRSxNO0lBQVFDLFMsR0FBYUgsbUIsQ0FBYkcsUTs7SUFFVkMsYTtBQUNKLHlCQUFZQyxVQUFaLEVBQXdCQyxjQUF4QixFQUF3QztBQUFBOztBQUN0QyxTQUFLRCxVQUFMLEdBQWtCQSxVQUFsQjtBQUNBLFNBQUtDLGNBQUwsR0FBc0JBLGNBQXRCO0FBQ0Q7Ozs7b0NBRWU7QUFDZCxhQUFPLEtBQUtELFVBQVo7QUFDRDs7O3dDQUVtQjtBQUNsQixhQUFPLEtBQUtDLGNBQVo7QUFDRDs7OzZCQUVRO0FBQ1AsVUFBTUMsaUJBQWlCTCxRQUFPLEtBQUtHLFVBQVosQ0FBdkI7QUFBQSxVQUNNQSxhQUFhRSxjQURuQjtBQUFBLFVBQ29DO0FBQzlCQyxhQUFPO0FBQ0wsc0JBQWNILFVBRFQ7QUFFTCwwQkFBa0IsS0FBS0M7QUFGbEIsT0FGYjs7QUFPQSxhQUFPRSxJQUFQO0FBQ0Q7Ozs2QkFFZUEsSSxFQUFNO0FBQ3BCLFVBQU1ELGlCQUFpQkMsS0FBSyxZQUFMLENBQXZCO0FBQUEsVUFDTUMscUJBQXFCRCxLQUFLLGdCQUFMLENBRDNCO0FBQUEsVUFFTUgsYUFBYUYsVUFBU0ksY0FBVCxDQUZuQjtBQUFBLFVBR01ELGlCQUFpQkcsa0JBSHZCO0FBQUEsVUFHNEM7QUFDdENDLHNCQUFnQixJQUFJTixhQUFKLENBQWtCQyxVQUFsQixFQUE4QkMsY0FBOUIsQ0FKdEI7O0FBTUEsYUFBT0ksYUFBUDtBQUNEOzs7b0RBRXNDTCxVLEVBQVlDLGMsRUFBZ0I7QUFDakUsVUFBTUksZ0JBQWdCLElBQUlOLGFBQUosQ0FBa0JDLFVBQWxCLEVBQThCQyxjQUE5QixDQUF0Qjs7QUFFQSxhQUFPSSxhQUFQO0FBQ0Q7Ozs7OztBQUdIQyxPQUFPQyxPQUFQLEdBQWlCUixhQUFqQiIsImZpbGUiOiJ1cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHNlcmlhbGlzZU9wZXJhdGlvbnMgPSByZXF1aXJlKCcuLi8uLi9vcGVyYXRpb25zL3NlcmlhbGlzZScpO1xuXG5jb25zdCB7IHRvSlNPTiwgZnJvbUpTT04gfSA9IHNlcmlhbGlzZU9wZXJhdGlvbnM7XG5cbmNsYXNzIFVwZGF0ZVJlcXVlc3Qge1xuICBjb25zdHJ1Y3RvcihvcGVyYXRpb25zLCB1c2VySWRlbnRpZmllcikge1xuICAgIHRoaXMub3BlcmF0aW9ucyA9IG9wZXJhdGlvbnM7XG4gICAgdGhpcy51c2VySWRlbnRpZmllciA9IHVzZXJJZGVudGlmaWVyO1xuICB9XG5cbiAgZ2V0T3BlcmF0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5vcGVyYXRpb25zO1xuICB9XG5cbiAgZ2V0VXNlcklkZW50aWZpZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMudXNlcklkZW50aWZpZXI7XG4gIH1cblxuICB0b0pTT04oKSB7XG4gICAgY29uc3Qgb3BlcmF0aW9uc0pTT04gPSB0b0pTT04odGhpcy5vcGVyYXRpb25zKSxcbiAgICAgICAgICBvcGVyYXRpb25zID0gb3BlcmF0aW9uc0pTT04sICAvLy9cbiAgICAgICAgICBqc29uID0ge1xuICAgICAgICAgICAgXCJvcGVyYXRpb25zXCI6IG9wZXJhdGlvbnMsXG4gICAgICAgICAgICBcInVzZXJJZGVudGlmaWVyXCI6IHRoaXMudXNlcklkZW50aWZpZXJcbiAgICAgICAgICB9O1xuXG4gICAgcmV0dXJuIGpzb247XG4gIH1cblxuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xuICAgIGNvbnN0IG9wZXJhdGlvbnNKU09OID0ganNvbltcIm9wZXJhdGlvbnNcIl0sXG4gICAgICAgICAgdXNlcklkZW50aWZpZXJKU09OID0ganNvbltcInVzZXJJZGVudGlmaWVyXCJdLFxuICAgICAgICAgIG9wZXJhdGlvbnMgPSBmcm9tSlNPTihvcGVyYXRpb25zSlNPTiksXG4gICAgICAgICAgdXNlcklkZW50aWZpZXIgPSB1c2VySWRlbnRpZmllckpTT04sICAvLy9cbiAgICAgICAgICB1cGRhdGVSZXF1ZXN0ID0gbmV3IFVwZGF0ZVJlcXVlc3Qob3BlcmF0aW9ucywgdXNlcklkZW50aWZpZXIpO1xuXG4gICAgcmV0dXJuIHVwZGF0ZVJlcXVlc3Q7XG4gIH1cblxuICBzdGF0aWMgZnJvbU9wZXJhdGlvbnNBbmRVc2VySWRlbnRpZmllcihvcGVyYXRpb25zLCB1c2VySWRlbnRpZmllcikge1xuICAgIGNvbnN0IHVwZGF0ZVJlcXVlc3QgPSBuZXcgVXBkYXRlUmVxdWVzdChvcGVyYXRpb25zLCB1c2VySWRlbnRpZmllcik7XG5cbiAgICByZXR1cm4gdXBkYXRlUmVxdWVzdDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFVwZGF0ZVJlcXVlc3Q7XG4iXX0=