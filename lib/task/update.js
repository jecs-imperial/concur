"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _sufficient = require("sufficient");
var _update = _interopRequireDefault(require("../request/update"));
var _update1 = _interopRequireDefault(require("../response/update"));
var _generate = _interopRequireDefault(require("../operations/generate"));
var _poster = require("../poster");
function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
var _typeof = function(obj) {
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
var UpdateTask = function(AsynchronousTask) {
    _inherits(UpdateTask, _sufficient.AsynchronousTask);
    function UpdateTask(userIdentifier, sessionIdentifier, workingContent, editableContent, callback) {
        _classCallCheck(this, UpdateTask);
        return _possibleConstructorReturn(this, _getPrototypeOf(UpdateTask).call(this, asynchronousMethod, userIdentifier, sessionIdentifier, workingContent, editableContent, callback));
    }
    return UpdateTask;
}(_sufficient.AsynchronousTask);
exports.default = UpdateTask;
function asynchronousMethod(userIdentifier, sessionIdentifier, workingContent, editableContent, callback) {
    var operations = _generate.default(workingContent, editableContent), updateRequest = _update.default.fromOperationsUserIdentifierAndSessionIdentifier(operations, userIdentifier, sessionIdentifier), json = updateRequest.toJSON();
    _poster.updatePost(json, function(json1) {
        var updateResponse = _update1.default.fromJSON(json1), sessionExpired = updateResponse.getSessionExpired(), pendingOperations = updateResponse.getPendingOperations();
        callback(sessionExpired, pendingOperations);
    });
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrL3VwZGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgQXN5bmNocm9ub3VzVGFzayB9IGZyb20gXCJzdWZmaWNpZW50XCI7XG5cbmltcG9ydCBVcGRhdGVSZXF1ZXN0IGZyb20gXCIuLi9yZXF1ZXN0L3VwZGF0ZVwiO1xuaW1wb3J0IFVwZGF0ZVJlc3BvbnNlIGZyb20gXCIuLi9yZXNwb25zZS91cGRhdGVcIjtcbmltcG9ydCBnZW5lcmF0ZU9wZXJhdGlvbnMgZnJvbSBcIi4uL29wZXJhdGlvbnMvZ2VuZXJhdGVcIjtcblxuaW1wb3J0IHsgdXBkYXRlUG9zdCB9IGZyb20gXCIuLi9wb3N0ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXBkYXRlVGFzayBleHRlbmRzIEFzeW5jaHJvbm91c1Rhc2sge1xuICBjb25zdHJ1Y3Rvcih1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIsIHdvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnQsIGNhbGxiYWNrKSB7XG4gICAgc3VwZXIoYXN5bmNocm9ub3VzTWV0aG9kLCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIsIHdvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnQsIGNhbGxiYWNrKVxuICB9XG59XG5cbmZ1bmN0aW9uIGFzeW5jaHJvbm91c01ldGhvZCh1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIsIHdvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnQsIGNhbGxiYWNrKSB7XG4gIGNvbnN0IG9wZXJhdGlvbnMgPSBnZW5lcmF0ZU9wZXJhdGlvbnMod29ya2luZ0NvbnRlbnQsIGVkaXRhYmxlQ29udGVudCksXG4gICAgICAgIHVwZGF0ZVJlcXVlc3QgPSBVcGRhdGVSZXF1ZXN0LmZyb21PcGVyYXRpb25zVXNlcklkZW50aWZpZXJBbmRTZXNzaW9uSWRlbnRpZmllcihvcGVyYXRpb25zLCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpLFxuICAgICAgICBqc29uID0gdXBkYXRlUmVxdWVzdC50b0pTT04oKTtcblxuICB1cGRhdGVQb3N0KGpzb24sIChqc29uKSA9PiB7XG4gICAgY29uc3QgdXBkYXRlUmVzcG9uc2UgPSBVcGRhdGVSZXNwb25zZS5mcm9tSlNPTihqc29uKSxcblx0XHRcdFx0XHRzZXNzaW9uRXhwaXJlZCA9IHVwZGF0ZVJlc3BvbnNlLmdldFNlc3Npb25FeHBpcmVkKCksXG4gICAgICAgICAgcGVuZGluZ09wZXJhdGlvbnMgPSB1cGRhdGVSZXNwb25zZS5nZXRQZW5kaW5nT3BlcmF0aW9ucygpO1xuXG4gICAgY2FsbGJhY2soc2Vzc2lvbkV4cGlyZWQsIHBlbmRpbmdPcGVyYXRpb25zKTtcbiAgfSk7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkNBQUEsVUFBQTs7Ozs7SUFFQSxXQUFBO0lBRUEsT0FBQTtJQUNBLFFBQUE7SUFDQSxTQUFBO0lBRUEsT0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVBLFVBQUEsWUFBQSxnQkFBQTtjQUFBLFVBQUEsRUFSQSxXQUFBO2FBUUEsVUFBQSxDQUNBLGNBQUEsRUFBQSxpQkFBQSxFQUFBLGNBQUEsRUFBQSxlQUFBLEVBQUEsUUFBQTs4QkFEQSxVQUFBO2dFQUFBLFVBQUEsYUFFQSxrQkFBQSxFQUFBLGNBQUEsRUFBQSxpQkFBQSxFQUFBLGNBQUEsRUFBQSxlQUFBLEVBQUEsUUFBQTs7V0FGQSxVQUFBO0VBUkEsV0FBQTtrQkFRQSxVQUFBO1NBTUEsa0JBQUEsQ0FBQSxjQUFBLEVBQUEsaUJBQUEsRUFBQSxjQUFBLEVBQUEsZUFBQSxFQUFBLFFBQUE7UUFDQSxVQUFBLEdBWEEsU0FBQSxTQVdBLGNBQUEsRUFBQSxlQUFBLEdBQ0EsYUFBQSxHQWRBLE9BQUEsU0FjQSxnREFBQSxDQUFBLFVBQUEsRUFBQSxjQUFBLEVBQUEsaUJBQUEsR0FDQSxJQUFBLEdBQUEsYUFBQSxDQUFBLE1BQUE7QUFYQSxXQUFBLFlBYUEsSUFBQSxXQUFBLEtBQUE7WUFDQSxjQUFBLEdBakJBLFFBQUEsU0FpQkEsUUFBQSxDQUFBLEtBQUEsR0FDQSxjQUFBLEdBQUEsY0FBQSxDQUFBLGlCQUFBLElBQ0EsaUJBQUEsR0FBQSxjQUFBLENBQUEsb0JBQUE7QUFFQSxnQkFBQSxDQUFBLGNBQUEsRUFBQSxpQkFBQSJ9