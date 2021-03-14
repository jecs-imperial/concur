"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _sufficient = require("sufficient");
var _update = _interopRequireDefault(require("./task/update"));
var _initialise = _interopRequireDefault(require("./task/initialise"));
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var Client = function() {
    function Client(scheduler) {
        _classCallCheck(this, Client);
        this.scheduler = scheduler;
    }
    _createClass(Client, [
        {
            key: "updateDocument",
            value: function updateDocument(userIdentifier, sessionIdentifier, workingContent, editableContent, callback) {
                var updateTask = new _update.default(userIdentifier, sessionIdentifier, workingContent, editableContent, callback);
                var success = this.scheduler.executeTaskImmediately(updateTask);
                return success;
            }
        },
        {
            key: "initialise",
            value: function initialise(callback) {
                var initialiseTask = new _initialise.default(callback);
                this.scheduler.addTaskToQueue(initialiseTask);
            }
        }
    ], [
        {
            key: "fromNothing",
            value: function fromNothing() {
                var scheduler = _sufficient.Scheduler.fromNothing(), client = new Client(scheduler);
                return client;
            }
        }
    ]);
    return Client;
}();
exports.default = Client;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbGllbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IFNjaGVkdWxlciB9IGZyb20gXCJzdWZmaWNpZW50XCI7XG5cbmltcG9ydCBVcGRhdGVUYXNrIGZyb20gXCIuL3Rhc2svdXBkYXRlXCI7XG5pbXBvcnQgSW5pdGlhbGlzZVRhc2sgZnJvbSBcIi4vdGFzay9pbml0aWFsaXNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsaWVudCB7XG4gIGNvbnN0cnVjdG9yKHNjaGVkdWxlcikge1xuICAgIHRoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyO1xuICB9XG5cbiAgdXBkYXRlRG9jdW1lbnQodXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyLCB3b3JraW5nQ29udGVudCwgZWRpdGFibGVDb250ZW50LCBjYWxsYmFjaykge1xuICAgIGNvbnN0IHVwZGF0ZVRhc2sgPSBuZXcgVXBkYXRlVGFzayh1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIsIHdvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnQsIGNhbGxiYWNrKTtcblxuICAgIGNvbnN0IHN1Y2Nlc3MgPSB0aGlzLnNjaGVkdWxlci5leGVjdXRlVGFza0ltbWVkaWF0ZWx5KHVwZGF0ZVRhc2spO1xuXG4gICAgcmV0dXJuIHN1Y2Nlc3M7XG4gIH1cblxuICBpbml0aWFsaXNlKGNhbGxiYWNrKSB7XG4gICAgY29uc3QgaW5pdGlhbGlzZVRhc2sgPSBuZXcgSW5pdGlhbGlzZVRhc2soY2FsbGJhY2spO1xuXG4gICAgdGhpcy5zY2hlZHVsZXIuYWRkVGFza1RvUXVldWUoaW5pdGlhbGlzZVRhc2spO1xuICB9XG5cbiAgc3RhdGljIGZyb21Ob3RoaW5nKCkge1xuICAgIGNvbnN0IHNjaGVkdWxlciA9IFNjaGVkdWxlci5mcm9tTm90aGluZygpLFxuICAgICAgICAgIGNsaWVudCA9IG5ldyBDbGllbnQoc2NoZWR1bGVyKTtcblxuICAgIHJldHVybiBjbGllbnQ7XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQ0FBQSxVQUFBOzs7OztJQUVBLFdBQUE7SUFFQSxPQUFBO0lBQ0EsV0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVBLE1BQUE7YUFBQSxNQUFBLENBQ0EsU0FBQTs4QkFEQSxNQUFBO2FBRUEsU0FBQSxHQUFBLFNBQUE7O2lCQUZBLE1BQUE7O0FBS0EsZUFBQSxHQUFBLGNBQUE7NEJBQUEsY0FBQSxDQUFBLGNBQUEsRUFBQSxpQkFBQSxFQUFBLGNBQUEsRUFBQSxlQUFBLEVBQUEsUUFBQTtvQkFDQSxVQUFBLE9BVEEsT0FBQSxTQVNBLGNBQUEsRUFBQSxpQkFBQSxFQUFBLGNBQUEsRUFBQSxlQUFBLEVBQUEsUUFBQTtvQkFFQSxPQUFBLFFBQUEsU0FBQSxDQUFBLHNCQUFBLENBQUEsVUFBQTt1QkFFQSxPQUFBOzs7O0FBR0EsZUFBQSxHQUFBLFVBQUE7NEJBQUEsVUFBQSxDQUFBLFFBQUE7b0JBQ0EsY0FBQSxPQWhCQSxXQUFBLFNBZ0JBLFFBQUE7cUJBRUEsU0FBQSxDQUFBLGNBQUEsQ0FBQSxjQUFBOzs7OztBQUdBLGVBQUEsR0FBQSxXQUFBOzRCQUFBLFdBQUE7b0JBQ0EsU0FBQSxHQXpCQSxXQUFBLFdBeUJBLFdBQUEsSUFDQSxNQUFBLE9BQUEsTUFBQSxDQUFBLFNBQUE7dUJBRUEsTUFBQTs7OztXQXZCQSxNQUFBOztrQkFBQSxNQUFBIn0=