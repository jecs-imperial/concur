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
    value: function update(content, previousContent, callback) {
      var updateAsynchronousTask = new UpdateAsynchronousTask(this.userIdentifier, content, previousContent, callback);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leGFtcGxlL2NsaWVudC5qcyJdLCJuYW1lcyI6WyJzdWZmaWNpZW50IiwicmVxdWlyZSIsIlVwZGF0ZUFzeW5jaHJvbm91c1Rhc2siLCJJbml0aWFsaXNlQXN5bmNocm9ub3VzVGFzayIsIlNjaGVkdWxlciIsIkNsaWVudCIsInNjaGVkdWxlciIsInVzZXJJZGVudGlmaWVyIiwiY29udGVudCIsInByZXZpb3VzQ29udGVudCIsImNhbGxiYWNrIiwidXBkYXRlQXN5bmNocm9ub3VzVGFzayIsInN1Y2Nlc3MiLCJleGVjdXRlVGFza0ltbWVkaWF0ZWx5IiwiaW5pdGlhbGlzZUFzeW5jaHJvbm91c1Rhc2siLCJiaW5kIiwiYWRkVGFza1RvUXVldWUiLCJmcm9tTm90aGluZyIsImNsaWVudCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFFQSxJQUFNQSxhQUFhQyxRQUFRLFlBQVIsQ0FBbkI7O0FBRUEsSUFBTUMseUJBQXlCRCxRQUFRLDRCQUFSLENBQS9CO0FBQUEsSUFDTUUsNkJBQTZCRixRQUFRLGdDQUFSLENBRG5DOztJQUdRRyxTLEdBQWNKLFUsQ0FBZEksUzs7SUFFRkMsTTtBQUNKLGtCQUFZQyxTQUFaLEVBQXVCQyxjQUF2QixFQUF1QztBQUFBOztBQUNyQyxTQUFLRCxTQUFMLEdBQWlCQSxTQUFqQjtBQUNBLFNBQUtDLGNBQUwsR0FBc0JBLGNBQXRCO0FBQ0Q7Ozs7MkJBRU1DLE8sRUFBU0MsZSxFQUFpQkMsUSxFQUFVO0FBQ3pDLFVBQU1DLHlCQUF5QixJQUFJVCxzQkFBSixDQUEyQixLQUFLSyxjQUFoQyxFQUFnREMsT0FBaEQsRUFBeURDLGVBQXpELEVBQTBFQyxRQUExRSxDQUEvQjs7QUFFQSxVQUFNRSxVQUFVLEtBQUtOLFNBQUwsQ0FBZU8sc0JBQWYsQ0FBc0NGLHNCQUF0QyxDQUFoQjs7QUFFQSxhQUFPQyxPQUFQO0FBQ0Q7OzsrQkFFVUYsUSxFQUFVO0FBQ25CLFVBQU1JLDZCQUE2QixJQUFJWCwwQkFBSixDQUErQixVQUFTSyxPQUFULEVBQWtCRCxjQUFsQixFQUFrQztBQUNsRyxhQUFLQSxjQUFMLEdBQXNCQSxjQUF0Qjs7QUFFQUcsaUJBQVNGLE9BQVQ7QUFDRCxPQUppRSxDQUloRU8sSUFKZ0UsQ0FJM0QsSUFKMkQsQ0FBL0IsQ0FBbkM7O0FBTUEsV0FBS1QsU0FBTCxDQUFlVSxjQUFmLENBQThCRiwwQkFBOUI7QUFDRDs7O2tDQUVvQjtBQUNuQixVQUFNUixZQUFZRixVQUFVYSxXQUFWLEVBQWxCO0FBQUEsVUFDTVYsaUJBQWlCLElBRHZCO0FBQUEsVUFDOEI7QUFDeEJXLGVBQVMsSUFBSWIsTUFBSixDQUFXQyxTQUFYLEVBQXNCQyxjQUF0QixDQUZmOztBQUlBLGFBQU9XLE1BQVA7QUFDRDs7Ozs7O0FBR0gsSUFBTUEsU0FBU2IsT0FBT1ksV0FBUCxFQUFmOztBQUVBRSxPQUFPQyxPQUFQLEdBQWlCRixNQUFqQiIsImZpbGUiOiJjbGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHN1ZmZpY2llbnQgPSByZXF1aXJlKCdzdWZmaWNpZW50Jyk7XG5cbmNvbnN0IFVwZGF0ZUFzeW5jaHJvbm91c1Rhc2sgPSByZXF1aXJlKCcuL3Rhc2svYXN5bmNocm9ub3VzL3VwZGF0ZScpLFxuICAgICAgSW5pdGlhbGlzZUFzeW5jaHJvbm91c1Rhc2sgPSByZXF1aXJlKCcuL3Rhc2svYXN5bmNocm9ub3VzL2luaXRpYWxpc2UnKTtcblxuY29uc3QgeyBTY2hlZHVsZXIgfSA9IHN1ZmZpY2llbnQ7XG5cbmNsYXNzIENsaWVudCB7XG4gIGNvbnN0cnVjdG9yKHNjaGVkdWxlciwgdXNlcklkZW50aWZpZXIpIHtcbiAgICB0aGlzLnNjaGVkdWxlciA9IHNjaGVkdWxlcjtcbiAgICB0aGlzLnVzZXJJZGVudGlmaWVyID0gdXNlcklkZW50aWZpZXI7XG4gIH1cblxuICB1cGRhdGUoY29udGVudCwgcHJldmlvdXNDb250ZW50LCBjYWxsYmFjaykge1xuICAgIGNvbnN0IHVwZGF0ZUFzeW5jaHJvbm91c1Rhc2sgPSBuZXcgVXBkYXRlQXN5bmNocm9ub3VzVGFzayh0aGlzLnVzZXJJZGVudGlmaWVyLCBjb250ZW50LCBwcmV2aW91c0NvbnRlbnQsIGNhbGxiYWNrKTtcblxuICAgIGNvbnN0IHN1Y2Nlc3MgPSB0aGlzLnNjaGVkdWxlci5leGVjdXRlVGFza0ltbWVkaWF0ZWx5KHVwZGF0ZUFzeW5jaHJvbm91c1Rhc2spO1xuXG4gICAgcmV0dXJuIHN1Y2Nlc3M7XG4gIH1cblxuICBpbml0aWFsaXNlKGNhbGxiYWNrKSB7XG4gICAgY29uc3QgaW5pdGlhbGlzZUFzeW5jaHJvbm91c1Rhc2sgPSBuZXcgSW5pdGlhbGlzZUFzeW5jaHJvbm91c1Rhc2soZnVuY3Rpb24oY29udGVudCwgdXNlcklkZW50aWZpZXIpIHtcbiAgICAgIHRoaXMudXNlcklkZW50aWZpZXIgPSB1c2VySWRlbnRpZmllcjtcblxuICAgICAgY2FsbGJhY2soY29udGVudCk7XG4gICAgfS5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMuc2NoZWR1bGVyLmFkZFRhc2tUb1F1ZXVlKGluaXRpYWxpc2VBc3luY2hyb25vdXNUYXNrKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tTm90aGluZygpIHtcbiAgICBjb25zdCBzY2hlZHVsZXIgPSBTY2hlZHVsZXIuZnJvbU5vdGhpbmcoKSxcbiAgICAgICAgICB1c2VySWRlbnRpZmllciA9IG51bGwsICAvLy9cbiAgICAgICAgICBjbGllbnQgPSBuZXcgQ2xpZW50KHNjaGVkdWxlciwgdXNlcklkZW50aWZpZXIpO1xuXG4gICAgcmV0dXJuIGNsaWVudDtcbiAgfVxufVxuXG5jb25zdCBjbGllbnQgPSBDbGllbnQuZnJvbU5vdGhpbmcoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGllbnQ7XG4iXX0=