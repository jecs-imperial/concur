'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sufficient = require('sufficient');

var UpdateTask = require('./task/update'),
    InitialiseTask = require('./task/initialise');

var Scheduler = sufficient.Scheduler;

var Client = function () {
  function Client(scheduler) {
    _classCallCheck(this, Client);

    this.scheduler = scheduler;
  }

  _createClass(Client, [{
    key: 'updateDocument',
    value: function updateDocument(userIdentifier, sessionIdentifier, workingContent, editableContent, callback) {
      var updateTask = new UpdateTask(userIdentifier, sessionIdentifier, workingContent, editableContent, callback);

      var success = this.scheduler.executeTaskImmediately(updateTask);

      return success;
    }
  }, {
    key: 'initialise',
    value: function initialise(callback) {
      var initialiseTask = new InitialiseTask(callback);

      this.scheduler.addTaskToQueue(initialiseTask);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9jbGllbnQuanMiXSwibmFtZXMiOlsic3VmZmljaWVudCIsInJlcXVpcmUiLCJVcGRhdGVUYXNrIiwiSW5pdGlhbGlzZVRhc2siLCJTY2hlZHVsZXIiLCJDbGllbnQiLCJzY2hlZHVsZXIiLCJ1c2VySWRlbnRpZmllciIsInNlc3Npb25JZGVudGlmaWVyIiwid29ya2luZ0NvbnRlbnQiLCJlZGl0YWJsZUNvbnRlbnQiLCJjYWxsYmFjayIsInVwZGF0ZVRhc2siLCJzdWNjZXNzIiwiZXhlY3V0ZVRhc2tJbW1lZGlhdGVseSIsImluaXRpYWxpc2VUYXNrIiwiYWRkVGFza1RvUXVldWUiLCJmcm9tTm90aGluZyIsImNsaWVudCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFFQSxJQUFNQSxhQUFhQyxRQUFRLFlBQVIsQ0FBbkI7O0FBRUEsSUFBTUMsYUFBYUQsUUFBUSxlQUFSLENBQW5CO0FBQUEsSUFDTUUsaUJBQWlCRixRQUFRLG1CQUFSLENBRHZCOztJQUdRRyxTLEdBQWNKLFUsQ0FBZEksUzs7SUFFRkMsTTtBQUNKLGtCQUFZQyxTQUFaLEVBQXVCO0FBQUE7O0FBQ3JCLFNBQUtBLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0Q7Ozs7bUNBRWNDLGMsRUFBZ0JDLGlCLEVBQW1CQyxjLEVBQWdCQyxlLEVBQWlCQyxRLEVBQVU7QUFDM0YsVUFBTUMsYUFBYSxJQUFJVixVQUFKLENBQWVLLGNBQWYsRUFBK0JDLGlCQUEvQixFQUFrREMsY0FBbEQsRUFBa0VDLGVBQWxFLEVBQW1GQyxRQUFuRixDQUFuQjs7QUFFQSxVQUFNRSxVQUFVLEtBQUtQLFNBQUwsQ0FBZVEsc0JBQWYsQ0FBc0NGLFVBQXRDLENBQWhCOztBQUVBLGFBQU9DLE9BQVA7QUFDRDs7OytCQUVVRixRLEVBQVU7QUFDbkIsVUFBTUksaUJBQWlCLElBQUlaLGNBQUosQ0FBbUJRLFFBQW5CLENBQXZCOztBQUVBLFdBQUtMLFNBQUwsQ0FBZVUsY0FBZixDQUE4QkQsY0FBOUI7QUFDRDs7O2tDQUVvQjtBQUNuQixVQUFNVCxZQUFZRixVQUFVYSxXQUFWLEVBQWxCO0FBQUEsVUFDTUMsU0FBUyxJQUFJYixNQUFKLENBQVdDLFNBQVgsQ0FEZjs7QUFHQSxhQUFPWSxNQUFQO0FBQ0Q7Ozs7OztBQUdIQyxPQUFPQyxPQUFQLEdBQWlCZixNQUFqQiIsImZpbGUiOiJjbGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHN1ZmZpY2llbnQgPSByZXF1aXJlKCdzdWZmaWNpZW50Jyk7XG5cbmNvbnN0IFVwZGF0ZVRhc2sgPSByZXF1aXJlKCcuL3Rhc2svdXBkYXRlJyksXG4gICAgICBJbml0aWFsaXNlVGFzayA9IHJlcXVpcmUoJy4vdGFzay9pbml0aWFsaXNlJyk7XG5cbmNvbnN0IHsgU2NoZWR1bGVyIH0gPSBzdWZmaWNpZW50O1xuXG5jbGFzcyBDbGllbnQge1xuICBjb25zdHJ1Y3RvcihzY2hlZHVsZXIpIHtcbiAgICB0aGlzLnNjaGVkdWxlciA9IHNjaGVkdWxlcjtcbiAgfVxuXG4gIHVwZGF0ZURvY3VtZW50KHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllciwgd29ya2luZ0NvbnRlbnQsIGVkaXRhYmxlQ29udGVudCwgY2FsbGJhY2spIHtcbiAgICBjb25zdCB1cGRhdGVUYXNrID0gbmV3IFVwZGF0ZVRhc2sodXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyLCB3b3JraW5nQ29udGVudCwgZWRpdGFibGVDb250ZW50LCBjYWxsYmFjayk7XG5cbiAgICBjb25zdCBzdWNjZXNzID0gdGhpcy5zY2hlZHVsZXIuZXhlY3V0ZVRhc2tJbW1lZGlhdGVseSh1cGRhdGVUYXNrKTtcblxuICAgIHJldHVybiBzdWNjZXNzO1xuICB9XG5cbiAgaW5pdGlhbGlzZShjYWxsYmFjaykge1xuICAgIGNvbnN0IGluaXRpYWxpc2VUYXNrID0gbmV3IEluaXRpYWxpc2VUYXNrKGNhbGxiYWNrKTtcblxuICAgIHRoaXMuc2NoZWR1bGVyLmFkZFRhc2tUb1F1ZXVlKGluaXRpYWxpc2VUYXNrKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tTm90aGluZygpIHtcbiAgICBjb25zdCBzY2hlZHVsZXIgPSBTY2hlZHVsZXIuZnJvbU5vdGhpbmcoKSxcbiAgICAgICAgICBjbGllbnQgPSBuZXcgQ2xpZW50KHNjaGVkdWxlcik7XG5cbiAgICByZXR1cm4gY2xpZW50O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ2xpZW50O1xuIl19