'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sufficient = require('sufficient');

var UpdateAsynchronousTask = require('./task/asynchronous/update'),
    InitialiseAsynchronousTask = require('./task/asynchronous/initialise');

var Scheduler = sufficient.Scheduler;

var Client = function () {
  function Client(scheduler, userIdentifier) {
    _classCallCheck(this, Client);

    this.scheduler = scheduler;
    this.userIdentifier = userIdentifier;
  }

  _createClass(Client, [{
    key: 'update',
    value: function update(workingContent, editableContent, callback) {
      var updateAsynchronousTask = new UpdateAsynchronousTask(this.userIdentifier, workingContent, editableContent, callback);

      var success = this.scheduler.executeTaskImmediately(updateAsynchronousTask);

      return success;
    }
  }, {
    key: 'initialise',
    value: function initialise(callback) {
      var initialiseAsynchronousTask = new InitialiseAsynchronousTask(function (content, userIdentifier) {
        this.userIdentifier = userIdentifier;

        callback(content);
      }.bind(this));

      this.scheduler.addTaskToQueue(initialiseAsynchronousTask);
    }
  }], [{
    key: 'fromNothing',
    value: function fromNothing() {
      var scheduler = Scheduler.fromNothing(),
          userIdentifier = null,
          ///
      client = new Client(scheduler, userIdentifier);

      return client;
    }
  }]);

  return Client;
}();

var client = Client.fromNothing();

module.exports = client;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leGFtcGxlL2NsaWVudC5qcyJdLCJuYW1lcyI6WyJzdWZmaWNpZW50IiwicmVxdWlyZSIsIlVwZGF0ZUFzeW5jaHJvbm91c1Rhc2siLCJJbml0aWFsaXNlQXN5bmNocm9ub3VzVGFzayIsIlNjaGVkdWxlciIsIkNsaWVudCIsInNjaGVkdWxlciIsInVzZXJJZGVudGlmaWVyIiwid29ya2luZ0NvbnRlbnQiLCJlZGl0YWJsZUNvbnRlbnQiLCJjYWxsYmFjayIsInVwZGF0ZUFzeW5jaHJvbm91c1Rhc2siLCJzdWNjZXNzIiwiZXhlY3V0ZVRhc2tJbW1lZGlhdGVseSIsImluaXRpYWxpc2VBc3luY2hyb25vdXNUYXNrIiwiY29udGVudCIsImJpbmQiLCJhZGRUYXNrVG9RdWV1ZSIsImZyb21Ob3RoaW5nIiwiY2xpZW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBLElBQU1BLGFBQWFDLFFBQVEsWUFBUixDQUFuQjs7QUFFQSxJQUFNQyx5QkFBeUJELFFBQVEsNEJBQVIsQ0FBL0I7QUFBQSxJQUNNRSw2QkFBNkJGLFFBQVEsZ0NBQVIsQ0FEbkM7O0lBR1FHLFMsR0FBY0osVSxDQUFkSSxTOztJQUVGQyxNO0FBQ0osa0JBQVlDLFNBQVosRUFBdUJDLGNBQXZCLEVBQXVDO0FBQUE7O0FBQ3JDLFNBQUtELFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0EsU0FBS0MsY0FBTCxHQUFzQkEsY0FBdEI7QUFDRDs7OzsyQkFFTUMsYyxFQUFnQkMsZSxFQUFpQkMsUSxFQUFVO0FBQ2hELFVBQU1DLHlCQUF5QixJQUFJVCxzQkFBSixDQUEyQixLQUFLSyxjQUFoQyxFQUFnREMsY0FBaEQsRUFBZ0VDLGVBQWhFLEVBQWlGQyxRQUFqRixDQUEvQjs7QUFFQSxVQUFNRSxVQUFVLEtBQUtOLFNBQUwsQ0FBZU8sc0JBQWYsQ0FBc0NGLHNCQUF0QyxDQUFoQjs7QUFFQSxhQUFPQyxPQUFQO0FBQ0Q7OzsrQkFFVUYsUSxFQUFVO0FBQ25CLFVBQU1JLDZCQUE2QixJQUFJWCwwQkFBSixDQUErQixVQUFTWSxPQUFULEVBQWtCUixjQUFsQixFQUFrQztBQUNsRyxhQUFLQSxjQUFMLEdBQXNCQSxjQUF0Qjs7QUFFQUcsaUJBQVNLLE9BQVQ7QUFDRCxPQUppRSxDQUloRUMsSUFKZ0UsQ0FJM0QsSUFKMkQsQ0FBL0IsQ0FBbkM7O0FBTUEsV0FBS1YsU0FBTCxDQUFlVyxjQUFmLENBQThCSCwwQkFBOUI7QUFDRDs7O2tDQUVvQjtBQUNuQixVQUFNUixZQUFZRixVQUFVYyxXQUFWLEVBQWxCO0FBQUEsVUFDTVgsaUJBQWlCLElBRHZCO0FBQUEsVUFDOEI7QUFDeEJZLGVBQVMsSUFBSWQsTUFBSixDQUFXQyxTQUFYLEVBQXNCQyxjQUF0QixDQUZmOztBQUlBLGFBQU9ZLE1BQVA7QUFDRDs7Ozs7O0FBR0gsSUFBTUEsU0FBU2QsT0FBT2EsV0FBUCxFQUFmOztBQUVBRSxPQUFPQyxPQUFQLEdBQWlCRixNQUFqQiIsImZpbGUiOiJjbGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHN1ZmZpY2llbnQgPSByZXF1aXJlKCdzdWZmaWNpZW50Jyk7XG5cbmNvbnN0IFVwZGF0ZUFzeW5jaHJvbm91c1Rhc2sgPSByZXF1aXJlKCcuL3Rhc2svYXN5bmNocm9ub3VzL3VwZGF0ZScpLFxuICAgICAgSW5pdGlhbGlzZUFzeW5jaHJvbm91c1Rhc2sgPSByZXF1aXJlKCcuL3Rhc2svYXN5bmNocm9ub3VzL2luaXRpYWxpc2UnKTtcblxuY29uc3QgeyBTY2hlZHVsZXIgfSA9IHN1ZmZpY2llbnQ7XG5cbmNsYXNzIENsaWVudCB7XG4gIGNvbnN0cnVjdG9yKHNjaGVkdWxlciwgdXNlcklkZW50aWZpZXIpIHtcbiAgICB0aGlzLnNjaGVkdWxlciA9IHNjaGVkdWxlcjtcbiAgICB0aGlzLnVzZXJJZGVudGlmaWVyID0gdXNlcklkZW50aWZpZXI7XG4gIH1cblxuICB1cGRhdGUod29ya2luZ0NvbnRlbnQsIGVkaXRhYmxlQ29udGVudCwgY2FsbGJhY2spIHtcbiAgICBjb25zdCB1cGRhdGVBc3luY2hyb25vdXNUYXNrID0gbmV3IFVwZGF0ZUFzeW5jaHJvbm91c1Rhc2sodGhpcy51c2VySWRlbnRpZmllciwgd29ya2luZ0NvbnRlbnQsIGVkaXRhYmxlQ29udGVudCwgY2FsbGJhY2spO1xuXG4gICAgY29uc3Qgc3VjY2VzcyA9IHRoaXMuc2NoZWR1bGVyLmV4ZWN1dGVUYXNrSW1tZWRpYXRlbHkodXBkYXRlQXN5bmNocm9ub3VzVGFzayk7XG5cbiAgICByZXR1cm4gc3VjY2VzcztcbiAgfVxuXG4gIGluaXRpYWxpc2UoY2FsbGJhY2spIHtcbiAgICBjb25zdCBpbml0aWFsaXNlQXN5bmNocm9ub3VzVGFzayA9IG5ldyBJbml0aWFsaXNlQXN5bmNocm9ub3VzVGFzayhmdW5jdGlvbihjb250ZW50LCB1c2VySWRlbnRpZmllcikge1xuICAgICAgdGhpcy51c2VySWRlbnRpZmllciA9IHVzZXJJZGVudGlmaWVyO1xuXG4gICAgICBjYWxsYmFjayhjb250ZW50KTtcbiAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy5zY2hlZHVsZXIuYWRkVGFza1RvUXVldWUoaW5pdGlhbGlzZUFzeW5jaHJvbm91c1Rhc2spO1xuICB9XG5cbiAgc3RhdGljIGZyb21Ob3RoaW5nKCkge1xuICAgIGNvbnN0IHNjaGVkdWxlciA9IFNjaGVkdWxlci5mcm9tTm90aGluZygpLFxuICAgICAgICAgIHVzZXJJZGVudGlmaWVyID0gbnVsbCwgIC8vL1xuICAgICAgICAgIGNsaWVudCA9IG5ldyBDbGllbnQoc2NoZWR1bGVyLCB1c2VySWRlbnRpZmllcik7XG5cbiAgICByZXR1cm4gY2xpZW50O1xuICB9XG59XG5cbmNvbnN0IGNsaWVudCA9IENsaWVudC5mcm9tTm90aGluZygpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsaWVudDtcbiJdfQ==