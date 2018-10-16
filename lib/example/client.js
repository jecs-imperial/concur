'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sufficient = require('sufficient');

var UpdateAsynchronousTask = require('./task/asynchronous/update'),
    InitialiseAsynchronousTask = require('./task/asynchronous/initialise');

var Scheduler = sufficient.Scheduler;

var Client = function () {
  function Client(scheduler) {
    _classCallCheck(this, Client);

    this.scheduler = scheduler;
  }

  _createClass(Client, [{
    key: 'update',
    value: function update(userIdentifier, workingContent, editableContent, callback) {
      var updateAsynchronousTask = new UpdateAsynchronousTask(userIdentifier, workingContent, editableContent, callback);

      var success = this.scheduler.executeTaskImmediately(updateAsynchronousTask);

      return success;
    }
  }, {
    key: 'initialise',
    value: function initialise(callback) {
      var initialiseAsynchronousTask = new InitialiseAsynchronousTask(callback);

      this.scheduler.addTaskToQueue(initialiseAsynchronousTask);
    }
  }], [{
    key: 'fromNothing',
    value: function fromNothing() {
      var scheduler = Scheduler.fromNothing(),
          client = new Client(scheduler);

      return client;
    }
  }]);

  return Client;
}();

module.exports = Client;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leGFtcGxlL2NsaWVudC5qcyJdLCJuYW1lcyI6WyJzdWZmaWNpZW50IiwicmVxdWlyZSIsIlVwZGF0ZUFzeW5jaHJvbm91c1Rhc2siLCJJbml0aWFsaXNlQXN5bmNocm9ub3VzVGFzayIsIlNjaGVkdWxlciIsIkNsaWVudCIsInNjaGVkdWxlciIsInVzZXJJZGVudGlmaWVyIiwid29ya2luZ0NvbnRlbnQiLCJlZGl0YWJsZUNvbnRlbnQiLCJjYWxsYmFjayIsInVwZGF0ZUFzeW5jaHJvbm91c1Rhc2siLCJzdWNjZXNzIiwiZXhlY3V0ZVRhc2tJbW1lZGlhdGVseSIsImluaXRpYWxpc2VBc3luY2hyb25vdXNUYXNrIiwiYWRkVGFza1RvUXVldWUiLCJmcm9tTm90aGluZyIsImNsaWVudCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFFQSxJQUFNQSxhQUFhQyxRQUFRLFlBQVIsQ0FBbkI7O0FBRUEsSUFBTUMseUJBQXlCRCxRQUFRLDRCQUFSLENBQS9CO0FBQUEsSUFDTUUsNkJBQTZCRixRQUFRLGdDQUFSLENBRG5DOztJQUdRRyxTLEdBQWNKLFUsQ0FBZEksUzs7SUFFRkMsTTtBQUNKLGtCQUFZQyxTQUFaLEVBQXVCO0FBQUE7O0FBQ3JCLFNBQUtBLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0Q7Ozs7MkJBRU1DLGMsRUFBZ0JDLGMsRUFBZ0JDLGUsRUFBaUJDLFEsRUFBVTtBQUNoRSxVQUFNQyx5QkFBeUIsSUFBSVQsc0JBQUosQ0FBMkJLLGNBQTNCLEVBQTJDQyxjQUEzQyxFQUEyREMsZUFBM0QsRUFBNEVDLFFBQTVFLENBQS9COztBQUVBLFVBQU1FLFVBQVUsS0FBS04sU0FBTCxDQUFlTyxzQkFBZixDQUFzQ0Ysc0JBQXRDLENBQWhCOztBQUVBLGFBQU9DLE9BQVA7QUFDRDs7OytCQUVVRixRLEVBQVU7QUFDbkIsVUFBTUksNkJBQTZCLElBQUlYLDBCQUFKLENBQStCTyxRQUEvQixDQUFuQzs7QUFFQSxXQUFLSixTQUFMLENBQWVTLGNBQWYsQ0FBOEJELDBCQUE5QjtBQUNEOzs7a0NBRW9CO0FBQ25CLFVBQU1SLFlBQVlGLFVBQVVZLFdBQVYsRUFBbEI7QUFBQSxVQUNNQyxTQUFTLElBQUlaLE1BQUosQ0FBV0MsU0FBWCxDQURmOztBQUdBLGFBQU9XLE1BQVA7QUFDRDs7Ozs7O0FBR0hDLE9BQU9DLE9BQVAsR0FBaUJkLE1BQWpCIiwiZmlsZSI6ImNsaWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3Qgc3VmZmljaWVudCA9IHJlcXVpcmUoJ3N1ZmZpY2llbnQnKTtcblxuY29uc3QgVXBkYXRlQXN5bmNocm9ub3VzVGFzayA9IHJlcXVpcmUoJy4vdGFzay9hc3luY2hyb25vdXMvdXBkYXRlJyksXG4gICAgICBJbml0aWFsaXNlQXN5bmNocm9ub3VzVGFzayA9IHJlcXVpcmUoJy4vdGFzay9hc3luY2hyb25vdXMvaW5pdGlhbGlzZScpO1xuXG5jb25zdCB7IFNjaGVkdWxlciB9ID0gc3VmZmljaWVudDtcblxuY2xhc3MgQ2xpZW50IHtcbiAgY29uc3RydWN0b3Ioc2NoZWR1bGVyKSB7XG4gICAgdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXI7XG4gIH1cblxuICB1cGRhdGUodXNlcklkZW50aWZpZXIsIHdvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnQsIGNhbGxiYWNrKSB7XG4gICAgY29uc3QgdXBkYXRlQXN5bmNocm9ub3VzVGFzayA9IG5ldyBVcGRhdGVBc3luY2hyb25vdXNUYXNrKHVzZXJJZGVudGlmaWVyLCB3b3JraW5nQ29udGVudCwgZWRpdGFibGVDb250ZW50LCBjYWxsYmFjayk7XG5cbiAgICBjb25zdCBzdWNjZXNzID0gdGhpcy5zY2hlZHVsZXIuZXhlY3V0ZVRhc2tJbW1lZGlhdGVseSh1cGRhdGVBc3luY2hyb25vdXNUYXNrKTtcblxuICAgIHJldHVybiBzdWNjZXNzO1xuICB9XG5cbiAgaW5pdGlhbGlzZShjYWxsYmFjaykge1xuICAgIGNvbnN0IGluaXRpYWxpc2VBc3luY2hyb25vdXNUYXNrID0gbmV3IEluaXRpYWxpc2VBc3luY2hyb25vdXNUYXNrKGNhbGxiYWNrKTtcblxuICAgIHRoaXMuc2NoZWR1bGVyLmFkZFRhc2tUb1F1ZXVlKGluaXRpYWxpc2VBc3luY2hyb25vdXNUYXNrKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tTm90aGluZygpIHtcbiAgICBjb25zdCBzY2hlZHVsZXIgPSBTY2hlZHVsZXIuZnJvbU5vdGhpbmcoKSxcbiAgICAgICAgICBjbGllbnQgPSBuZXcgQ2xpZW50KHNjaGVkdWxlcik7XG5cbiAgICByZXR1cm4gY2xpZW50O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ2xpZW50O1xuIl19