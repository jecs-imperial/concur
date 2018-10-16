'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = require('./client');

var Agent = function () {
  function Agent(client, userIdentifier) {
    _classCallCheck(this, Agent);

    this.client = client;
    this.userIdentifier = userIdentifier;
  }

  _createClass(Agent, [{
    key: 'update',
    value: function update(workingContent, editableContent, callback) {
      var success = this.client.update(this.userIdentifier, workingContent, editableContent, callback);

      return success;
    }
  }, {
    key: 'initialise',
    value: function initialise(callback) {
      this.client.initialise(function (content, userIdentifier) {
        this.userIdentifier = userIdentifier;

        callback(content);
      }.bind(this));
    }
  }], [{
    key: 'fromNothing',
    value: function fromNothing() {
      var client = Client.fromNothing(),
          userIdentifier = null,
          ///
      agent = new Agent(client, userIdentifier);

      return agent;
    }
  }]);

  return Agent;
}();

module.exports = Agent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leGFtcGxlL2FnZW50LmpzIl0sIm5hbWVzIjpbIkNsaWVudCIsInJlcXVpcmUiLCJBZ2VudCIsImNsaWVudCIsInVzZXJJZGVudGlmaWVyIiwid29ya2luZ0NvbnRlbnQiLCJlZGl0YWJsZUNvbnRlbnQiLCJjYWxsYmFjayIsInN1Y2Nlc3MiLCJ1cGRhdGUiLCJpbml0aWFsaXNlIiwiY29udGVudCIsImJpbmQiLCJmcm9tTm90aGluZyIsImFnZW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBLElBQU1BLFNBQVNDLFFBQVEsVUFBUixDQUFmOztJQUVNQyxLO0FBQ0osaUJBQVlDLE1BQVosRUFBb0JDLGNBQXBCLEVBQW9DO0FBQUE7O0FBQ2xDLFNBQUtELE1BQUwsR0FBY0EsTUFBZDtBQUNBLFNBQUtDLGNBQUwsR0FBc0JBLGNBQXRCO0FBQ0Q7Ozs7MkJBRU1DLGMsRUFBZ0JDLGUsRUFBaUJDLFEsRUFBVTtBQUNoRCxVQUFNQyxVQUFVLEtBQUtMLE1BQUwsQ0FBWU0sTUFBWixDQUFtQixLQUFLTCxjQUF4QixFQUF3Q0MsY0FBeEMsRUFBd0RDLGVBQXhELEVBQXlFQyxRQUF6RSxDQUFoQjs7QUFFQSxhQUFPQyxPQUFQO0FBQ0Q7OzsrQkFFVUQsUSxFQUFVO0FBQ25CLFdBQUtKLE1BQUwsQ0FBWU8sVUFBWixDQUF1QixVQUFTQyxPQUFULEVBQWtCUCxjQUFsQixFQUFrQztBQUN2RCxhQUFLQSxjQUFMLEdBQXNCQSxjQUF0Qjs7QUFFQUcsaUJBQVNJLE9BQVQ7QUFDRCxPQUpzQixDQUlyQkMsSUFKcUIsQ0FJaEIsSUFKZ0IsQ0FBdkI7QUFLRDs7O2tDQUVvQjtBQUNuQixVQUFNVCxTQUFTSCxPQUFPYSxXQUFQLEVBQWY7QUFBQSxVQUNNVCxpQkFBaUIsSUFEdkI7QUFBQSxVQUM4QjtBQUN4QlUsY0FBUSxJQUFJWixLQUFKLENBQVVDLE1BQVYsRUFBa0JDLGNBQWxCLENBRmQ7O0FBSUEsYUFBT1UsS0FBUDtBQUNEOzs7Ozs7QUFHSEMsT0FBT0MsT0FBUCxHQUFpQmQsS0FBakIiLCJmaWxlIjoiYWdlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IENsaWVudCA9IHJlcXVpcmUoJy4vY2xpZW50Jyk7XG5cbmNsYXNzIEFnZW50IHtcbiAgY29uc3RydWN0b3IoY2xpZW50LCB1c2VySWRlbnRpZmllcikge1xuICAgIHRoaXMuY2xpZW50ID0gY2xpZW50O1xuICAgIHRoaXMudXNlcklkZW50aWZpZXIgPSB1c2VySWRlbnRpZmllcjtcbiAgfVxuXG4gIHVwZGF0ZSh3b3JraW5nQ29udGVudCwgZWRpdGFibGVDb250ZW50LCBjYWxsYmFjaykge1xuICAgIGNvbnN0IHN1Y2Nlc3MgPSB0aGlzLmNsaWVudC51cGRhdGUodGhpcy51c2VySWRlbnRpZmllciwgd29ya2luZ0NvbnRlbnQsIGVkaXRhYmxlQ29udGVudCwgY2FsbGJhY2spO1xuXG4gICAgcmV0dXJuIHN1Y2Nlc3M7XG4gIH1cblxuICBpbml0aWFsaXNlKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5jbGllbnQuaW5pdGlhbGlzZShmdW5jdGlvbihjb250ZW50LCB1c2VySWRlbnRpZmllcikge1xuICAgICAgdGhpcy51c2VySWRlbnRpZmllciA9IHVzZXJJZGVudGlmaWVyO1xuXG4gICAgICBjYWxsYmFjayhjb250ZW50KTtcbiAgICB9LmJpbmQodGhpcykpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Ob3RoaW5nKCkge1xuICAgIGNvbnN0IGNsaWVudCA9IENsaWVudC5mcm9tTm90aGluZygpLFxuICAgICAgICAgIHVzZXJJZGVudGlmaWVyID0gbnVsbCwgIC8vL1xuICAgICAgICAgIGFnZW50ID0gbmV3IEFnZW50KGNsaWVudCwgdXNlcklkZW50aWZpZXIpO1xuXG4gICAgcmV0dXJuIGFnZW50O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQWdlbnQ7XG4iXX0=