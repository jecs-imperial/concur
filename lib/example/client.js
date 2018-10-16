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
    value: function update(userIdentifier, sessionIdentifier, workingContent, editableContent, callback) {
      var updateAsynchronousTask = new UpdateAsynchronousTask(userIdentifier, sessionIdentifier, workingContent, editableContent, callback);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leGFtcGxlL2NsaWVudC5qcyJdLCJuYW1lcyI6WyJzdWZmaWNpZW50IiwicmVxdWlyZSIsIlVwZGF0ZUFzeW5jaHJvbm91c1Rhc2siLCJJbml0aWFsaXNlQXN5bmNocm9ub3VzVGFzayIsIlNjaGVkdWxlciIsIkNsaWVudCIsInNjaGVkdWxlciIsInVzZXJJZGVudGlmaWVyIiwic2Vzc2lvbklkZW50aWZpZXIiLCJ3b3JraW5nQ29udGVudCIsImVkaXRhYmxlQ29udGVudCIsImNhbGxiYWNrIiwidXBkYXRlQXN5bmNocm9ub3VzVGFzayIsInN1Y2Nlc3MiLCJleGVjdXRlVGFza0ltbWVkaWF0ZWx5IiwiaW5pdGlhbGlzZUFzeW5jaHJvbm91c1Rhc2siLCJhZGRUYXNrVG9RdWV1ZSIsImZyb21Ob3RoaW5nIiwiY2xpZW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBLElBQU1BLGFBQWFDLFFBQVEsWUFBUixDQUFuQjs7QUFFQSxJQUFNQyx5QkFBeUJELFFBQVEsNEJBQVIsQ0FBL0I7QUFBQSxJQUNNRSw2QkFBNkJGLFFBQVEsZ0NBQVIsQ0FEbkM7O0lBR1FHLFMsR0FBY0osVSxDQUFkSSxTOztJQUVGQyxNO0FBQ0osa0JBQVlDLFNBQVosRUFBdUI7QUFBQTs7QUFDckIsU0FBS0EsU0FBTCxHQUFpQkEsU0FBakI7QUFDRDs7OzsyQkFFTUMsYyxFQUFnQkMsaUIsRUFBbUJDLGMsRUFBZ0JDLGUsRUFBaUJDLFEsRUFBVTtBQUNuRixVQUFNQyx5QkFBeUIsSUFBSVYsc0JBQUosQ0FBMkJLLGNBQTNCLEVBQTJDQyxpQkFBM0MsRUFBOERDLGNBQTlELEVBQThFQyxlQUE5RSxFQUErRkMsUUFBL0YsQ0FBL0I7O0FBRUEsVUFBTUUsVUFBVSxLQUFLUCxTQUFMLENBQWVRLHNCQUFmLENBQXNDRixzQkFBdEMsQ0FBaEI7O0FBRUEsYUFBT0MsT0FBUDtBQUNEOzs7K0JBRVVGLFEsRUFBVTtBQUNuQixVQUFNSSw2QkFBNkIsSUFBSVosMEJBQUosQ0FBK0JRLFFBQS9CLENBQW5DOztBQUVBLFdBQUtMLFNBQUwsQ0FBZVUsY0FBZixDQUE4QkQsMEJBQTlCO0FBQ0Q7OztrQ0FFb0I7QUFDbkIsVUFBTVQsWUFBWUYsVUFBVWEsV0FBVixFQUFsQjtBQUFBLFVBQ01DLFNBQVMsSUFBSWIsTUFBSixDQUFXQyxTQUFYLENBRGY7O0FBR0EsYUFBT1ksTUFBUDtBQUNEOzs7Ozs7QUFHSEMsT0FBT0MsT0FBUCxHQUFpQmYsTUFBakIiLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBzdWZmaWNpZW50ID0gcmVxdWlyZSgnc3VmZmljaWVudCcpO1xuXG5jb25zdCBVcGRhdGVBc3luY2hyb25vdXNUYXNrID0gcmVxdWlyZSgnLi90YXNrL2FzeW5jaHJvbm91cy91cGRhdGUnKSxcbiAgICAgIEluaXRpYWxpc2VBc3luY2hyb25vdXNUYXNrID0gcmVxdWlyZSgnLi90YXNrL2FzeW5jaHJvbm91cy9pbml0aWFsaXNlJyk7XG5cbmNvbnN0IHsgU2NoZWR1bGVyIH0gPSBzdWZmaWNpZW50O1xuXG5jbGFzcyBDbGllbnQge1xuICBjb25zdHJ1Y3RvcihzY2hlZHVsZXIpIHtcbiAgICB0aGlzLnNjaGVkdWxlciA9IHNjaGVkdWxlcjtcbiAgfVxuXG4gIHVwZGF0ZSh1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIsIHdvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnQsIGNhbGxiYWNrKSB7XG4gICAgY29uc3QgdXBkYXRlQXN5bmNocm9ub3VzVGFzayA9IG5ldyBVcGRhdGVBc3luY2hyb25vdXNUYXNrKHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllciwgd29ya2luZ0NvbnRlbnQsIGVkaXRhYmxlQ29udGVudCwgY2FsbGJhY2spO1xuXG4gICAgY29uc3Qgc3VjY2VzcyA9IHRoaXMuc2NoZWR1bGVyLmV4ZWN1dGVUYXNrSW1tZWRpYXRlbHkodXBkYXRlQXN5bmNocm9ub3VzVGFzayk7XG5cbiAgICByZXR1cm4gc3VjY2VzcztcbiAgfVxuXG4gIGluaXRpYWxpc2UoY2FsbGJhY2spIHtcbiAgICBjb25zdCBpbml0aWFsaXNlQXN5bmNocm9ub3VzVGFzayA9IG5ldyBJbml0aWFsaXNlQXN5bmNocm9ub3VzVGFzayhjYWxsYmFjayk7XG5cbiAgICB0aGlzLnNjaGVkdWxlci5hZGRUYXNrVG9RdWV1ZShpbml0aWFsaXNlQXN5bmNocm9ub3VzVGFzayk7XG4gIH1cblxuICBzdGF0aWMgZnJvbU5vdGhpbmcoKSB7XG4gICAgY29uc3Qgc2NoZWR1bGVyID0gU2NoZWR1bGVyLmZyb21Ob3RoaW5nKCksXG4gICAgICAgICAgY2xpZW50ID0gbmV3IENsaWVudChzY2hlZHVsZXIpO1xuXG4gICAgcmV0dXJuIGNsaWVudDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENsaWVudDtcbiJdfQ==