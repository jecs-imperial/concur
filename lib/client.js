"use strict";

var _sufficient = require("sufficient");

var _update = _interopRequireDefault(require("./task/update"));

var _initialise = _interopRequireDefault(require("./task/initialise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Client = /*#__PURE__*/function () {
  function Client(scheduler) {
    _classCallCheck(this, Client);

    this.scheduler = scheduler;
  }

  _createClass(Client, [{
    key: "updateDocument",
    value: function updateDocument(userIdentifier, sessionIdentifier, workingContent, editableContent, callback) {
      var updateTask = new _update["default"](userIdentifier, sessionIdentifier, workingContent, editableContent, callback);
      var success = this.scheduler.executeTaskImmediately(updateTask);
      return success;
    }
  }, {
    key: "initialise",
    value: function initialise(callback) {
      var initialiseTask = new _initialise["default"](callback);
      this.scheduler.addTaskToQueue(initialiseTask);
    }
  }], [{
    key: "fromNothing",
    value: function fromNothing() {
      var scheduler = _sufficient.Scheduler.fromNothing(),
          client = new Client(scheduler);

      return client;
    }
  }]);

  return Client;
}();

module.exports = Client;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC5qcyJdLCJuYW1lcyI6WyJDbGllbnQiLCJzY2hlZHVsZXIiLCJ1c2VySWRlbnRpZmllciIsInNlc3Npb25JZGVudGlmaWVyIiwid29ya2luZ0NvbnRlbnQiLCJlZGl0YWJsZUNvbnRlbnQiLCJjYWxsYmFjayIsInVwZGF0ZVRhc2siLCJVcGRhdGVUYXNrIiwic3VjY2VzcyIsImV4ZWN1dGVUYXNrSW1tZWRpYXRlbHkiLCJpbml0aWFsaXNlVGFzayIsIkluaXRpYWxpc2VUYXNrIiwiYWRkVGFza1RvUXVldWUiLCJTY2hlZHVsZXIiLCJmcm9tTm90aGluZyIsImNsaWVudCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOztBQUVBOztBQUNBOzs7Ozs7Ozs7O0lBRU1BLE07QUFDSixrQkFBWUMsU0FBWixFQUF1QjtBQUFBOztBQUNyQixTQUFLQSxTQUFMLEdBQWlCQSxTQUFqQjtBQUNEOzs7O21DQUVjQyxjLEVBQWdCQyxpQixFQUFtQkMsYyxFQUFnQkMsZSxFQUFpQkMsUSxFQUFVO0FBQzNGLFVBQU1DLFVBQVUsR0FBRyxJQUFJQyxrQkFBSixDQUFlTixjQUFmLEVBQStCQyxpQkFBL0IsRUFBa0RDLGNBQWxELEVBQWtFQyxlQUFsRSxFQUFtRkMsUUFBbkYsQ0FBbkI7QUFFQSxVQUFNRyxPQUFPLEdBQUcsS0FBS1IsU0FBTCxDQUFlUyxzQkFBZixDQUFzQ0gsVUFBdEMsQ0FBaEI7QUFFQSxhQUFPRSxPQUFQO0FBQ0Q7OzsrQkFFVUgsUSxFQUFVO0FBQ25CLFVBQU1LLGNBQWMsR0FBRyxJQUFJQyxzQkFBSixDQUFtQk4sUUFBbkIsQ0FBdkI7QUFFQSxXQUFLTCxTQUFMLENBQWVZLGNBQWYsQ0FBOEJGLGNBQTlCO0FBQ0Q7OztrQ0FFb0I7QUFDbkIsVUFBTVYsU0FBUyxHQUFHYSxzQkFBVUMsV0FBVixFQUFsQjtBQUFBLFVBQ01DLE1BQU0sR0FBRyxJQUFJaEIsTUFBSixDQUFXQyxTQUFYLENBRGY7O0FBR0EsYUFBT2UsTUFBUDtBQUNEOzs7Ozs7QUFHSEMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCbEIsTUFBakIiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgU2NoZWR1bGVyIH0gZnJvbSBcInN1ZmZpY2llbnRcIjtcblxuaW1wb3J0IFVwZGF0ZVRhc2sgZnJvbSBcIi4vdGFzay91cGRhdGVcIjtcbmltcG9ydCBJbml0aWFsaXNlVGFzayBmcm9tIFwiLi90YXNrL2luaXRpYWxpc2VcIjtcblxuY2xhc3MgQ2xpZW50IHtcbiAgY29uc3RydWN0b3Ioc2NoZWR1bGVyKSB7XG4gICAgdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXI7XG4gIH1cblxuICB1cGRhdGVEb2N1bWVudCh1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIsIHdvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnQsIGNhbGxiYWNrKSB7XG4gICAgY29uc3QgdXBkYXRlVGFzayA9IG5ldyBVcGRhdGVUYXNrKHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllciwgd29ya2luZ0NvbnRlbnQsIGVkaXRhYmxlQ29udGVudCwgY2FsbGJhY2spO1xuXG4gICAgY29uc3Qgc3VjY2VzcyA9IHRoaXMuc2NoZWR1bGVyLmV4ZWN1dGVUYXNrSW1tZWRpYXRlbHkodXBkYXRlVGFzayk7XG5cbiAgICByZXR1cm4gc3VjY2VzcztcbiAgfVxuXG4gIGluaXRpYWxpc2UoY2FsbGJhY2spIHtcbiAgICBjb25zdCBpbml0aWFsaXNlVGFzayA9IG5ldyBJbml0aWFsaXNlVGFzayhjYWxsYmFjayk7XG5cbiAgICB0aGlzLnNjaGVkdWxlci5hZGRUYXNrVG9RdWV1ZShpbml0aWFsaXNlVGFzayk7XG4gIH1cblxuICBzdGF0aWMgZnJvbU5vdGhpbmcoKSB7XG4gICAgY29uc3Qgc2NoZWR1bGVyID0gU2NoZWR1bGVyLmZyb21Ob3RoaW5nKCksXG4gICAgICAgICAgY2xpZW50ID0gbmV3IENsaWVudChzY2hlZHVsZXIpO1xuXG4gICAgcmV0dXJuIGNsaWVudDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENsaWVudDtcbiJdfQ==