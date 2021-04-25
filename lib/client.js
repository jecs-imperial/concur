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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbGllbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IFNjaGVkdWxlciB9IGZyb20gXCJzdWZmaWNpZW50XCI7XG5cbmltcG9ydCBVcGRhdGVUYXNrIGZyb20gXCIuL3Rhc2svdXBkYXRlXCI7XG5pbXBvcnQgSW5pdGlhbGlzZVRhc2sgZnJvbSBcIi4vdGFzay9pbml0aWFsaXNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsaWVudCB7XG4gIGNvbnN0cnVjdG9yKHNjaGVkdWxlcikge1xuICAgIHRoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyO1xuICB9XG5cbiAgdXBkYXRlRG9jdW1lbnQodXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyLCB3b3JraW5nQ29udGVudCwgZWRpdGFibGVDb250ZW50LCBjYWxsYmFjaykge1xuICAgIGNvbnN0IHVwZGF0ZVRhc2sgPSBuZXcgVXBkYXRlVGFzayh1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIsIHdvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnQsIGNhbGxiYWNrKTtcblxuICAgIGNvbnN0IHN1Y2Nlc3MgPSB0aGlzLnNjaGVkdWxlci5leGVjdXRlVGFza0ltbWVkaWF0ZWx5KHVwZGF0ZVRhc2spO1xuXG4gICAgcmV0dXJuIHN1Y2Nlc3M7XG4gIH1cblxuICBpbml0aWFsaXNlKGNhbGxiYWNrKSB7XG4gICAgY29uc3QgaW5pdGlhbGlzZVRhc2sgPSBuZXcgSW5pdGlhbGlzZVRhc2soY2FsbGJhY2spO1xuXG4gICAgdGhpcy5zY2hlZHVsZXIuYWRkVGFza1RvUXVldWUoaW5pdGlhbGlzZVRhc2spO1xuICB9XG5cbiAgc3RhdGljIGZyb21Ob3RoaW5nKCkge1xuICAgIGNvbnN0IHNjaGVkdWxlciA9IFNjaGVkdWxlci5mcm9tTm90aGluZygpLFxuICAgICAgICAgIGNsaWVudCA9IG5ldyBDbGllbnQoc2NoZWR1bGVyKTtcblxuICAgIHJldHVybiBjbGllbnQ7XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQ0FBQSxVQUFZOzs7OztJQUVjLFdBQVk7SUFFZixPQUFlO0lBQ1gsV0FBbUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFekIsTUFBTTthQUFOLE1BQU0sQ0FDYixTQUFTOzhCQURGLE1BQU07YUFFbEIsU0FBUyxHQUFHLFNBQVM7O2lCQUZULE1BQU07O1lBS3pCLEdBQWMsR0FBZCxjQUFjOzRCQUFkLGNBQWMsQ0FBQyxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxRQUFRO29CQUNuRixVQUFVLE9BVEcsT0FBZSxTQVNBLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLFFBQVE7b0JBRXhHLE9BQU8sUUFBUSxTQUFTLENBQUMsc0JBQXNCLENBQUMsVUFBVTt1QkFFekQsT0FBTzs7OztZQUdoQixHQUFVLEdBQVYsVUFBVTs0QkFBVixVQUFVLENBQUMsUUFBUTtvQkFDWCxjQUFjLE9BaEJHLFdBQW1CLFNBZ0JBLFFBQVE7cUJBRTdDLFNBQVMsQ0FBQyxjQUFjLENBQUMsY0FBYzs7Ozs7WUFHdkMsR0FBVyxHQUFYLFdBQVc7NEJBQVgsV0FBVztvQkFDVixTQUFTLEdBekJPLFdBQVksV0F5Qk4sV0FBVyxJQUNqQyxNQUFNLE9BQU8sTUFBTSxDQUFDLFNBQVM7dUJBRTVCLE1BQU07Ozs7V0F2QkksTUFBTTs7a0JBQU4sTUFBTSJ9