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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leGFtcGxlL2NsaWVudC5qcyJdLCJuYW1lcyI6WyJzdWZmaWNpZW50IiwicmVxdWlyZSIsIlVwZGF0ZVRhc2siLCJJbml0aWFsaXNlVGFzayIsIlNjaGVkdWxlciIsIkNsaWVudCIsInNjaGVkdWxlciIsInVzZXJJZGVudGlmaWVyIiwic2Vzc2lvbklkZW50aWZpZXIiLCJ3b3JraW5nQ29udGVudCIsImVkaXRhYmxlQ29udGVudCIsImNhbGxiYWNrIiwidXBkYXRlVGFzayIsInN1Y2Nlc3MiLCJleGVjdXRlVGFza0ltbWVkaWF0ZWx5IiwiaW5pdGlhbGlzZVRhc2siLCJhZGRUYXNrVG9RdWV1ZSIsImZyb21Ob3RoaW5nIiwiY2xpZW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBLElBQU1BLGFBQWFDLFFBQVEsWUFBUixDQUFuQjs7QUFFQSxJQUFNQyxhQUFhRCxRQUFRLGVBQVIsQ0FBbkI7QUFBQSxJQUNNRSxpQkFBaUJGLFFBQVEsbUJBQVIsQ0FEdkI7O0lBR1FHLFMsR0FBY0osVSxDQUFkSSxTOztJQUVGQyxNO0FBQ0osa0JBQVlDLFNBQVosRUFBdUI7QUFBQTs7QUFDckIsU0FBS0EsU0FBTCxHQUFpQkEsU0FBakI7QUFDRDs7OzttQ0FFY0MsYyxFQUFnQkMsaUIsRUFBbUJDLGMsRUFBZ0JDLGUsRUFBaUJDLFEsRUFBVTtBQUMzRixVQUFNQyxhQUFhLElBQUlWLFVBQUosQ0FBZUssY0FBZixFQUErQkMsaUJBQS9CLEVBQWtEQyxjQUFsRCxFQUFrRUMsZUFBbEUsRUFBbUZDLFFBQW5GLENBQW5COztBQUVBLFVBQU1FLFVBQVUsS0FBS1AsU0FBTCxDQUFlUSxzQkFBZixDQUFzQ0YsVUFBdEMsQ0FBaEI7O0FBRUEsYUFBT0MsT0FBUDtBQUNEOzs7K0JBRVVGLFEsRUFBVTtBQUNuQixVQUFNSSxpQkFBaUIsSUFBSVosY0FBSixDQUFtQlEsUUFBbkIsQ0FBdkI7O0FBRUEsV0FBS0wsU0FBTCxDQUFlVSxjQUFmLENBQThCRCxjQUE5QjtBQUNEOzs7a0NBRW9CO0FBQ25CLFVBQU1ULFlBQVlGLFVBQVVhLFdBQVYsRUFBbEI7QUFBQSxVQUNNQyxTQUFTLElBQUliLE1BQUosQ0FBV0MsU0FBWCxDQURmOztBQUdBLGFBQU9ZLE1BQVA7QUFDRDs7Ozs7O0FBR0hDLE9BQU9DLE9BQVAsR0FBaUJmLE1BQWpCIiwiZmlsZSI6ImNsaWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3Qgc3VmZmljaWVudCA9IHJlcXVpcmUoJ3N1ZmZpY2llbnQnKTtcblxuY29uc3QgVXBkYXRlVGFzayA9IHJlcXVpcmUoJy4vdGFzay91cGRhdGUnKSxcbiAgICAgIEluaXRpYWxpc2VUYXNrID0gcmVxdWlyZSgnLi90YXNrL2luaXRpYWxpc2UnKTtcblxuY29uc3QgeyBTY2hlZHVsZXIgfSA9IHN1ZmZpY2llbnQ7XG5cbmNsYXNzIENsaWVudCB7XG4gIGNvbnN0cnVjdG9yKHNjaGVkdWxlcikge1xuICAgIHRoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyO1xuICB9XG5cbiAgdXBkYXRlRG9jdW1lbnQodXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyLCB3b3JraW5nQ29udGVudCwgZWRpdGFibGVDb250ZW50LCBjYWxsYmFjaykge1xuICAgIGNvbnN0IHVwZGF0ZVRhc2sgPSBuZXcgVXBkYXRlVGFzayh1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIsIHdvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnQsIGNhbGxiYWNrKTtcblxuICAgIGNvbnN0IHN1Y2Nlc3MgPSB0aGlzLnNjaGVkdWxlci5leGVjdXRlVGFza0ltbWVkaWF0ZWx5KHVwZGF0ZVRhc2spO1xuXG4gICAgcmV0dXJuIHN1Y2Nlc3M7XG4gIH1cblxuICBpbml0aWFsaXNlKGNhbGxiYWNrKSB7XG4gICAgY29uc3QgaW5pdGlhbGlzZVRhc2sgPSBuZXcgSW5pdGlhbGlzZVRhc2soY2FsbGJhY2spO1xuXG4gICAgdGhpcy5zY2hlZHVsZXIuYWRkVGFza1RvUXVldWUoaW5pdGlhbGlzZVRhc2spO1xuICB9XG5cbiAgc3RhdGljIGZyb21Ob3RoaW5nKCkge1xuICAgIGNvbnN0IHNjaGVkdWxlciA9IFNjaGVkdWxlci5mcm9tTm90aGluZygpLFxuICAgICAgICAgIGNsaWVudCA9IG5ldyBDbGllbnQoc2NoZWR1bGVyKTtcblxuICAgIHJldHVybiBjbGllbnQ7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDbGllbnQ7XG4iXX0=