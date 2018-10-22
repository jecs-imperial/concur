'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var operationsToJSON = require('../../operations/toJSON'),
    operationsFromJSON = require('../../operations/fromJSON');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leGFtcGxlL3JlcXVlc3QvdXBkYXRlLmpzIl0sIm5hbWVzIjpbIm9wZXJhdGlvbnNUb0pTT04iLCJyZXF1aXJlIiwib3BlcmF0aW9uc0Zyb21KU09OIiwiVXBkYXRlUmVxdWVzdCIsIm9wZXJhdGlvbnMiLCJ1c2VySWRlbnRpZmllciIsInNlc3Npb25JZGVudGlmaWVyIiwib3BlcmF0aW9uc0pTT04iLCJqc29uIiwidXNlcklkZW50aWZpZXJKU09OIiwic2Vzc2lvbklkZW50aWZpZXJKU09OIiwidXBkYXRlUmVxdWVzdCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFFQSxJQUFNQSxtQkFBbUJDLFFBQVEseUJBQVIsQ0FBekI7QUFBQSxJQUNNQyxxQkFBcUJELFFBQVEsMkJBQVIsQ0FEM0I7O0lBR01FLGE7QUFDSix5QkFBWUMsVUFBWixFQUF3QkMsY0FBeEIsRUFBd0NDLGlCQUF4QyxFQUEyRDtBQUFBOztBQUN6RCxTQUFLRixVQUFMLEdBQWtCQSxVQUFsQjtBQUNBLFNBQUtDLGNBQUwsR0FBc0JBLGNBQXRCO0FBQ0EsU0FBS0MsaUJBQUwsR0FBeUJBLGlCQUF6QjtBQUNEOzs7O29DQUVlO0FBQ2QsYUFBTyxLQUFLRixVQUFaO0FBQ0Q7Ozt3Q0FFbUI7QUFDbEIsYUFBTyxLQUFLQyxjQUFaO0FBQ0Q7OzsyQ0FFc0I7QUFDdEIsYUFBTyxLQUFLQyxpQkFBWjtBQUNEOzs7NkJBRVM7QUFDUCxVQUFNQyxpQkFBaUJQLGlCQUFpQixLQUFLSSxVQUF0QixDQUF2QjtBQUFBLFVBQ01BLGFBQWFHLGNBRG5CO0FBQUEsVUFDb0M7QUFDOUJDLGFBQU87QUFDTCxzQkFBY0osVUFEVDtBQUVMLDBCQUFrQixLQUFLQyxjQUZsQjtBQUdYLDZCQUFxQixLQUFLQztBQUhmLE9BRmI7O0FBUUEsYUFBT0UsSUFBUDtBQUNEOzs7NkJBRWVBLEksRUFBTTtBQUNwQixVQUFNRCxpQkFBaUJDLEtBQUssWUFBTCxDQUF2QjtBQUFBLFVBQ01DLHFCQUFxQkQsS0FBSyxnQkFBTCxDQUQzQjtBQUFBLFVBRUNFLHdCQUF3QkYsS0FBSyxtQkFBTCxDQUZ6QjtBQUFBLFVBR01KLGFBQWFGLG1CQUFtQkssY0FBbkIsQ0FIbkI7QUFBQSxVQUlNRixpQkFBaUJJLGtCQUp2QjtBQUFBLFVBSTRDO0FBQzNDSCwwQkFBb0JJLHFCQUxyQjtBQUFBLFVBSzZDO0FBQ3ZDQyxzQkFBZ0IsSUFBSVIsYUFBSixDQUFrQkMsVUFBbEIsRUFBOEJDLGNBQTlCLEVBQThDQyxpQkFBOUMsQ0FOdEI7O0FBUUEsYUFBT0ssYUFBUDtBQUNEOzs7cUVBRXVEUCxVLEVBQVlDLGMsRUFBZ0JDLGlCLEVBQW1CO0FBQ3JHLFVBQU1LLGdCQUFnQixJQUFJUixhQUFKLENBQWtCQyxVQUFsQixFQUE4QkMsY0FBOUIsRUFBOENDLGlCQUE5QyxDQUF0Qjs7QUFFQSxhQUFPSyxhQUFQO0FBQ0Q7Ozs7OztBQUdIQyxPQUFPQyxPQUFQLEdBQWlCVixhQUFqQiIsImZpbGUiOiJ1cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IG9wZXJhdGlvbnNUb0pTT04gPSByZXF1aXJlKCcuLi8uLi9vcGVyYXRpb25zL3RvSlNPTicpLFxuICAgICAgb3BlcmF0aW9uc0Zyb21KU09OID0gcmVxdWlyZSgnLi4vLi4vb3BlcmF0aW9ucy9mcm9tSlNPTicpO1xuXG5jbGFzcyBVcGRhdGVSZXF1ZXN0IHtcbiAgY29uc3RydWN0b3Iob3BlcmF0aW9ucywgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyKSB7XG4gICAgdGhpcy5vcGVyYXRpb25zID0gb3BlcmF0aW9ucztcbiAgICB0aGlzLnVzZXJJZGVudGlmaWVyID0gdXNlcklkZW50aWZpZXI7XG4gICAgdGhpcy5zZXNzaW9uSWRlbnRpZmllciA9IHNlc3Npb25JZGVudGlmaWVyO1xuICB9XG5cbiAgZ2V0T3BlcmF0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5vcGVyYXRpb25zO1xuICB9XG5cbiAgZ2V0VXNlcklkZW50aWZpZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMudXNlcklkZW50aWZpZXI7XG4gIH1cblxuICBnZXRTZXNzaW9uSWRlbnRpZmllcigpIHtcbiAgXHRyZXR1cm4gdGhpcy5zZXNzaW9uSWRlbnRpZmllcjtcblx0fVxuXG4gIHRvSlNPTigpIHtcbiAgICBjb25zdCBvcGVyYXRpb25zSlNPTiA9IG9wZXJhdGlvbnNUb0pTT04odGhpcy5vcGVyYXRpb25zKSxcbiAgICAgICAgICBvcGVyYXRpb25zID0gb3BlcmF0aW9uc0pTT04sICAvLy9cbiAgICAgICAgICBqc29uID0ge1xuICAgICAgICAgICAgXCJvcGVyYXRpb25zXCI6IG9wZXJhdGlvbnMsXG4gICAgICAgICAgICBcInVzZXJJZGVudGlmaWVyXCI6IHRoaXMudXNlcklkZW50aWZpZXIsXG5cdFx0XHRcdFx0XHRcInNlc3Npb25JZGVudGlmaWVyXCI6IHRoaXMuc2Vzc2lvbklkZW50aWZpZXJcbiAgICAgICAgICB9O1xuXG4gICAgcmV0dXJuIGpzb247XG4gIH1cblxuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xuICAgIGNvbnN0IG9wZXJhdGlvbnNKU09OID0ganNvbltcIm9wZXJhdGlvbnNcIl0sXG4gICAgICAgICAgdXNlcklkZW50aWZpZXJKU09OID0ganNvbltcInVzZXJJZGVudGlmaWVyXCJdLFxuXHRcdFx0XHRcdHNlc3Npb25JZGVudGlmaWVySlNPTiA9IGpzb25bXCJzZXNzaW9uSWRlbnRpZmllclwiXSxcbiAgICAgICAgICBvcGVyYXRpb25zID0gb3BlcmF0aW9uc0Zyb21KU09OKG9wZXJhdGlvbnNKU09OKSxcbiAgICAgICAgICB1c2VySWRlbnRpZmllciA9IHVzZXJJZGVudGlmaWVySlNPTiwgIC8vL1xuXHRcdFx0XHRcdHNlc3Npb25JZGVudGlmaWVyID0gc2Vzc2lvbklkZW50aWZpZXJKU09OLCAgLy8vXG4gICAgICAgICAgdXBkYXRlUmVxdWVzdCA9IG5ldyBVcGRhdGVSZXF1ZXN0KG9wZXJhdGlvbnMsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllcik7XG5cbiAgICByZXR1cm4gdXBkYXRlUmVxdWVzdDtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tT3BlcmF0aW9uc1VzZXJJZGVudGlmaWVyQW5kU2Vzc2lvbklkZW50aWZpZXIob3BlcmF0aW9ucywgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyKSB7XG4gICAgY29uc3QgdXBkYXRlUmVxdWVzdCA9IG5ldyBVcGRhdGVSZXF1ZXN0KG9wZXJhdGlvbnMsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllcik7XG5cbiAgICByZXR1cm4gdXBkYXRlUmVxdWVzdDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFVwZGF0ZVJlcXVlc3Q7XG4iXX0=