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
          userIdentifier = null,
          ///
      client = new Client(scheduler, userIdentifier);

      return client;
    }
  }]);

  return Client;
}();

module.exports = Client;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leGFtcGxlL2NsaWVudC5qcyJdLCJuYW1lcyI6WyJzdWZmaWNpZW50IiwicmVxdWlyZSIsIlVwZGF0ZUFzeW5jaHJvbm91c1Rhc2siLCJJbml0aWFsaXNlQXN5bmNocm9ub3VzVGFzayIsIlNjaGVkdWxlciIsIkNsaWVudCIsInNjaGVkdWxlciIsInVzZXJJZGVudGlmaWVyIiwid29ya2luZ0NvbnRlbnQiLCJlZGl0YWJsZUNvbnRlbnQiLCJjYWxsYmFjayIsInVwZGF0ZUFzeW5jaHJvbm91c1Rhc2siLCJzdWNjZXNzIiwiZXhlY3V0ZVRhc2tJbW1lZGlhdGVseSIsImluaXRpYWxpc2VBc3luY2hyb25vdXNUYXNrIiwiYWRkVGFza1RvUXVldWUiLCJmcm9tTm90aGluZyIsImNsaWVudCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFFQSxJQUFNQSxhQUFhQyxRQUFRLFlBQVIsQ0FBbkI7O0FBRUEsSUFBTUMseUJBQXlCRCxRQUFRLDRCQUFSLENBQS9CO0FBQUEsSUFDTUUsNkJBQTZCRixRQUFRLGdDQUFSLENBRG5DOztJQUdRRyxTLEdBQWNKLFUsQ0FBZEksUzs7SUFFRkMsTTtBQUNKLGtCQUFZQyxTQUFaLEVBQXVCO0FBQUE7O0FBQ3JCLFNBQUtBLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0Q7Ozs7MkJBRU1DLGMsRUFBZ0JDLGMsRUFBZ0JDLGUsRUFBaUJDLFEsRUFBVTtBQUNoRSxVQUFNQyx5QkFBeUIsSUFBSVQsc0JBQUosQ0FBMkJLLGNBQTNCLEVBQTJDQyxjQUEzQyxFQUEyREMsZUFBM0QsRUFBNEVDLFFBQTVFLENBQS9COztBQUVBLFVBQU1FLFVBQVUsS0FBS04sU0FBTCxDQUFlTyxzQkFBZixDQUFzQ0Ysc0JBQXRDLENBQWhCOztBQUVBLGFBQU9DLE9BQVA7QUFDRDs7OytCQUVVRixRLEVBQVU7QUFDbkIsVUFBTUksNkJBQTZCLElBQUlYLDBCQUFKLENBQStCTyxRQUEvQixDQUFuQzs7QUFFQSxXQUFLSixTQUFMLENBQWVTLGNBQWYsQ0FBOEJELDBCQUE5QjtBQUNEOzs7a0NBRW9CO0FBQ25CLFVBQU1SLFlBQVlGLFVBQVVZLFdBQVYsRUFBbEI7QUFBQSxVQUNNVCxpQkFBaUIsSUFEdkI7QUFBQSxVQUM4QjtBQUN4QlUsZUFBUyxJQUFJWixNQUFKLENBQVdDLFNBQVgsRUFBc0JDLGNBQXRCLENBRmY7O0FBSUEsYUFBT1UsTUFBUDtBQUNEOzs7Ozs7QUFHSEMsT0FBT0MsT0FBUCxHQUFpQmQsTUFBakIiLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBzdWZmaWNpZW50ID0gcmVxdWlyZSgnc3VmZmljaWVudCcpO1xuXG5jb25zdCBVcGRhdGVBc3luY2hyb25vdXNUYXNrID0gcmVxdWlyZSgnLi90YXNrL2FzeW5jaHJvbm91cy91cGRhdGUnKSxcbiAgICAgIEluaXRpYWxpc2VBc3luY2hyb25vdXNUYXNrID0gcmVxdWlyZSgnLi90YXNrL2FzeW5jaHJvbm91cy9pbml0aWFsaXNlJyk7XG5cbmNvbnN0IHsgU2NoZWR1bGVyIH0gPSBzdWZmaWNpZW50O1xuXG5jbGFzcyBDbGllbnQge1xuICBjb25zdHJ1Y3RvcihzY2hlZHVsZXIpIHtcbiAgICB0aGlzLnNjaGVkdWxlciA9IHNjaGVkdWxlcjtcbiAgfVxuXG4gIHVwZGF0ZSh1c2VySWRlbnRpZmllciwgd29ya2luZ0NvbnRlbnQsIGVkaXRhYmxlQ29udGVudCwgY2FsbGJhY2spIHtcbiAgICBjb25zdCB1cGRhdGVBc3luY2hyb25vdXNUYXNrID0gbmV3IFVwZGF0ZUFzeW5jaHJvbm91c1Rhc2sodXNlcklkZW50aWZpZXIsIHdvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnQsIGNhbGxiYWNrKTtcblxuICAgIGNvbnN0IHN1Y2Nlc3MgPSB0aGlzLnNjaGVkdWxlci5leGVjdXRlVGFza0ltbWVkaWF0ZWx5KHVwZGF0ZUFzeW5jaHJvbm91c1Rhc2spO1xuXG4gICAgcmV0dXJuIHN1Y2Nlc3M7XG4gIH1cblxuICBpbml0aWFsaXNlKGNhbGxiYWNrKSB7XG4gICAgY29uc3QgaW5pdGlhbGlzZUFzeW5jaHJvbm91c1Rhc2sgPSBuZXcgSW5pdGlhbGlzZUFzeW5jaHJvbm91c1Rhc2soY2FsbGJhY2spO1xuXG4gICAgdGhpcy5zY2hlZHVsZXIuYWRkVGFza1RvUXVldWUoaW5pdGlhbGlzZUFzeW5jaHJvbm91c1Rhc2spO1xuICB9XG5cbiAgc3RhdGljIGZyb21Ob3RoaW5nKCkge1xuICAgIGNvbnN0IHNjaGVkdWxlciA9IFNjaGVkdWxlci5mcm9tTm90aGluZygpLFxuICAgICAgICAgIHVzZXJJZGVudGlmaWVyID0gbnVsbCwgIC8vL1xuICAgICAgICAgIGNsaWVudCA9IG5ldyBDbGllbnQoc2NoZWR1bGVyLCB1c2VySWRlbnRpZmllcik7XG5cbiAgICByZXR1cm4gY2xpZW50O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ2xpZW50O1xuIl19