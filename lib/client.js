'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var sufficient = require('sufficient');

var UpdateTask = require('./task/update'),
    InitialiseTask = require('./task/initialise');

var Scheduler = sufficient.Scheduler;

var Client = /*#__PURE__*/function () {
  function Client(scheduler) {
    _classCallCheck(this, Client);

    this.scheduler = scheduler;
  }

  _createClass(Client, [{
    key: "updateDocument",
    value: function updateDocument(userIdentifier, sessionIdentifier, workingContent, editableContent, callback) {
      var updateTask = new UpdateTask(userIdentifier, sessionIdentifier, workingContent, editableContent, callback);
      var success = this.scheduler.executeTaskImmediately(updateTask);
      return success;
    }
  }, {
    key: "initialise",
    value: function initialise(callback) {
      var initialiseTask = new InitialiseTask(callback);
      this.scheduler.addTaskToQueue(initialiseTask);
    }
  }], [{
    key: "fromNothing",
    value: function fromNothing() {
      var scheduler = Scheduler.fromNothing(),
          client = new Client(scheduler);
      return client;
    }
  }]);

  return Client;
}();

module.exports = Client;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC5qcyJdLCJuYW1lcyI6WyJzdWZmaWNpZW50IiwicmVxdWlyZSIsIlVwZGF0ZVRhc2siLCJJbml0aWFsaXNlVGFzayIsIlNjaGVkdWxlciIsIkNsaWVudCIsInNjaGVkdWxlciIsInVzZXJJZGVudGlmaWVyIiwic2Vzc2lvbklkZW50aWZpZXIiLCJ3b3JraW5nQ29udGVudCIsImVkaXRhYmxlQ29udGVudCIsImNhbGxiYWNrIiwidXBkYXRlVGFzayIsInN1Y2Nlc3MiLCJleGVjdXRlVGFza0ltbWVkaWF0ZWx5IiwiaW5pdGlhbGlzZVRhc2siLCJhZGRUYXNrVG9RdWV1ZSIsImZyb21Ob3RoaW5nIiwiY2xpZW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBRUEsSUFBTUEsVUFBVSxHQUFHQyxPQUFPLENBQUMsWUFBRCxDQUExQjs7QUFFQSxJQUFNQyxVQUFVLEdBQUdELE9BQU8sQ0FBQyxlQUFELENBQTFCO0FBQUEsSUFDTUUsY0FBYyxHQUFHRixPQUFPLENBQUMsbUJBQUQsQ0FEOUI7O0lBR1FHLFMsR0FBY0osVSxDQUFkSSxTOztJQUVGQyxNO0FBQ0osa0JBQVlDLFNBQVosRUFBdUI7QUFBQTs7QUFDckIsU0FBS0EsU0FBTCxHQUFpQkEsU0FBakI7QUFDRDs7OzttQ0FFY0MsYyxFQUFnQkMsaUIsRUFBbUJDLGMsRUFBZ0JDLGUsRUFBaUJDLFEsRUFBVTtBQUMzRixVQUFNQyxVQUFVLEdBQUcsSUFBSVYsVUFBSixDQUFlSyxjQUFmLEVBQStCQyxpQkFBL0IsRUFBa0RDLGNBQWxELEVBQWtFQyxlQUFsRSxFQUFtRkMsUUFBbkYsQ0FBbkI7QUFFQSxVQUFNRSxPQUFPLEdBQUcsS0FBS1AsU0FBTCxDQUFlUSxzQkFBZixDQUFzQ0YsVUFBdEMsQ0FBaEI7QUFFQSxhQUFPQyxPQUFQO0FBQ0Q7OzsrQkFFVUYsUSxFQUFVO0FBQ25CLFVBQU1JLGNBQWMsR0FBRyxJQUFJWixjQUFKLENBQW1CUSxRQUFuQixDQUF2QjtBQUVBLFdBQUtMLFNBQUwsQ0FBZVUsY0FBZixDQUE4QkQsY0FBOUI7QUFDRDs7O2tDQUVvQjtBQUNuQixVQUFNVCxTQUFTLEdBQUdGLFNBQVMsQ0FBQ2EsV0FBVixFQUFsQjtBQUFBLFVBQ01DLE1BQU0sR0FBRyxJQUFJYixNQUFKLENBQVdDLFNBQVgsQ0FEZjtBQUdBLGFBQU9ZLE1BQVA7QUFDRDs7Ozs7O0FBR0hDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmYsTUFBakIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHN1ZmZpY2llbnQgPSByZXF1aXJlKCdzdWZmaWNpZW50Jyk7XG5cbmNvbnN0IFVwZGF0ZVRhc2sgPSByZXF1aXJlKCcuL3Rhc2svdXBkYXRlJyksXG4gICAgICBJbml0aWFsaXNlVGFzayA9IHJlcXVpcmUoJy4vdGFzay9pbml0aWFsaXNlJyk7XG5cbmNvbnN0IHsgU2NoZWR1bGVyIH0gPSBzdWZmaWNpZW50O1xuXG5jbGFzcyBDbGllbnQge1xuICBjb25zdHJ1Y3RvcihzY2hlZHVsZXIpIHtcbiAgICB0aGlzLnNjaGVkdWxlciA9IHNjaGVkdWxlcjtcbiAgfVxuXG4gIHVwZGF0ZURvY3VtZW50KHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllciwgd29ya2luZ0NvbnRlbnQsIGVkaXRhYmxlQ29udGVudCwgY2FsbGJhY2spIHtcbiAgICBjb25zdCB1cGRhdGVUYXNrID0gbmV3IFVwZGF0ZVRhc2sodXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyLCB3b3JraW5nQ29udGVudCwgZWRpdGFibGVDb250ZW50LCBjYWxsYmFjayk7XG5cbiAgICBjb25zdCBzdWNjZXNzID0gdGhpcy5zY2hlZHVsZXIuZXhlY3V0ZVRhc2tJbW1lZGlhdGVseSh1cGRhdGVUYXNrKTtcblxuICAgIHJldHVybiBzdWNjZXNzO1xuICB9XG5cbiAgaW5pdGlhbGlzZShjYWxsYmFjaykge1xuICAgIGNvbnN0IGluaXRpYWxpc2VUYXNrID0gbmV3IEluaXRpYWxpc2VUYXNrKGNhbGxiYWNrKTtcblxuICAgIHRoaXMuc2NoZWR1bGVyLmFkZFRhc2tUb1F1ZXVlKGluaXRpYWxpc2VUYXNrKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tTm90aGluZygpIHtcbiAgICBjb25zdCBzY2hlZHVsZXIgPSBTY2hlZHVsZXIuZnJvbU5vdGhpbmcoKSxcbiAgICAgICAgICBjbGllbnQgPSBuZXcgQ2xpZW50KHNjaGVkdWxlcik7XG5cbiAgICByZXR1cm4gY2xpZW50O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ2xpZW50O1xuIl19