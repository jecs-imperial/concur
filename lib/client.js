"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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

exports["default"] = Client;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC5qcyJdLCJuYW1lcyI6WyJDbGllbnQiLCJzY2hlZHVsZXIiLCJ1c2VySWRlbnRpZmllciIsInNlc3Npb25JZGVudGlmaWVyIiwid29ya2luZ0NvbnRlbnQiLCJlZGl0YWJsZUNvbnRlbnQiLCJjYWxsYmFjayIsInVwZGF0ZVRhc2siLCJVcGRhdGVUYXNrIiwic3VjY2VzcyIsImV4ZWN1dGVUYXNrSW1tZWRpYXRlbHkiLCJpbml0aWFsaXNlVGFzayIsIkluaXRpYWxpc2VUYXNrIiwiYWRkVGFza1RvUXVldWUiLCJTY2hlZHVsZXIiLCJmcm9tTm90aGluZyIsImNsaWVudCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEsTTtBQUNuQixrQkFBWUMsU0FBWixFQUF1QjtBQUFBOztBQUNyQixTQUFLQSxTQUFMLEdBQWlCQSxTQUFqQjtBQUNEOzs7O21DQUVjQyxjLEVBQWdCQyxpQixFQUFtQkMsYyxFQUFnQkMsZSxFQUFpQkMsUSxFQUFVO0FBQzNGLFVBQU1DLFVBQVUsR0FBRyxJQUFJQyxrQkFBSixDQUFlTixjQUFmLEVBQStCQyxpQkFBL0IsRUFBa0RDLGNBQWxELEVBQWtFQyxlQUFsRSxFQUFtRkMsUUFBbkYsQ0FBbkI7QUFFQSxVQUFNRyxPQUFPLEdBQUcsS0FBS1IsU0FBTCxDQUFlUyxzQkFBZixDQUFzQ0gsVUFBdEMsQ0FBaEI7QUFFQSxhQUFPRSxPQUFQO0FBQ0Q7OzsrQkFFVUgsUSxFQUFVO0FBQ25CLFVBQU1LLGNBQWMsR0FBRyxJQUFJQyxzQkFBSixDQUFtQk4sUUFBbkIsQ0FBdkI7QUFFQSxXQUFLTCxTQUFMLENBQWVZLGNBQWYsQ0FBOEJGLGNBQTlCO0FBQ0Q7OztrQ0FFb0I7QUFDbkIsVUFBTVYsU0FBUyxHQUFHYSxzQkFBVUMsV0FBVixFQUFsQjtBQUFBLFVBQ01DLE1BQU0sR0FBRyxJQUFJaEIsTUFBSixDQUFXQyxTQUFYLENBRGY7O0FBR0EsYUFBT2UsTUFBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IFNjaGVkdWxlciB9IGZyb20gXCJzdWZmaWNpZW50XCI7XG5cbmltcG9ydCBVcGRhdGVUYXNrIGZyb20gXCIuL3Rhc2svdXBkYXRlXCI7XG5pbXBvcnQgSW5pdGlhbGlzZVRhc2sgZnJvbSBcIi4vdGFzay9pbml0aWFsaXNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsaWVudCB7XG4gIGNvbnN0cnVjdG9yKHNjaGVkdWxlcikge1xuICAgIHRoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyO1xuICB9XG5cbiAgdXBkYXRlRG9jdW1lbnQodXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyLCB3b3JraW5nQ29udGVudCwgZWRpdGFibGVDb250ZW50LCBjYWxsYmFjaykge1xuICAgIGNvbnN0IHVwZGF0ZVRhc2sgPSBuZXcgVXBkYXRlVGFzayh1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIsIHdvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnQsIGNhbGxiYWNrKTtcblxuICAgIGNvbnN0IHN1Y2Nlc3MgPSB0aGlzLnNjaGVkdWxlci5leGVjdXRlVGFza0ltbWVkaWF0ZWx5KHVwZGF0ZVRhc2spO1xuXG4gICAgcmV0dXJuIHN1Y2Nlc3M7XG4gIH1cblxuICBpbml0aWFsaXNlKGNhbGxiYWNrKSB7XG4gICAgY29uc3QgaW5pdGlhbGlzZVRhc2sgPSBuZXcgSW5pdGlhbGlzZVRhc2soY2FsbGJhY2spO1xuXG4gICAgdGhpcy5zY2hlZHVsZXIuYWRkVGFza1RvUXVldWUoaW5pdGlhbGlzZVRhc2spO1xuICB9XG5cbiAgc3RhdGljIGZyb21Ob3RoaW5nKCkge1xuICAgIGNvbnN0IHNjaGVkdWxlciA9IFNjaGVkdWxlci5mcm9tTm90aGluZygpLFxuICAgICAgICAgIGNsaWVudCA9IG5ldyBDbGllbnQoc2NoZWR1bGVyKTtcblxuICAgIHJldHVybiBjbGllbnQ7XG4gIH1cbn1cbiJdfQ==