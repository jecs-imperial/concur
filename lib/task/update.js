"use strict";

var _sufficient = require("sufficient");

var _update = _interopRequireDefault(require("../request/update"));

var _update2 = _interopRequireDefault(require("../response/update"));

var _generate = _interopRequireDefault(require("../operations/generate"));

var _poster = require("../poster");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var UpdateTask = /*#__PURE__*/function (_AsynchronousTask) {
  _inherits(UpdateTask, _AsynchronousTask);

  var _super = _createSuper(UpdateTask);

  function UpdateTask(userIdentifier, sessionIdentifier, workingContent, editableContent, callback) {
    _classCallCheck(this, UpdateTask);

    return _super.call(this, asynchronousMethod, userIdentifier, sessionIdentifier, workingContent, editableContent, callback);
  }

  return UpdateTask;
}(_sufficient.AsynchronousTask);

module.exports = UpdateTask;

function asynchronousMethod(userIdentifier, sessionIdentifier, workingContent, editableContent, callback) {
  var operations = (0, _generate["default"])(workingContent, editableContent),
      updateRequest = _update["default"].fromOperationsUserIdentifierAndSessionIdentifier(operations, userIdentifier, sessionIdentifier),
      json = updateRequest.toJSON();

  (0, _poster.updatePost)(json, function (json) {
    var updateResponse = _update2["default"].fromJSON(json),
        sessionExpired = updateResponse.getSessionExpired(),
        pendingOperations = updateResponse.getPendingOperations();

    callback(sessionExpired, pendingOperations);
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVwZGF0ZS5qcyJdLCJuYW1lcyI6WyJVcGRhdGVUYXNrIiwidXNlcklkZW50aWZpZXIiLCJzZXNzaW9uSWRlbnRpZmllciIsIndvcmtpbmdDb250ZW50IiwiZWRpdGFibGVDb250ZW50IiwiY2FsbGJhY2siLCJhc3luY2hyb25vdXNNZXRob2QiLCJBc3luY2hyb25vdXNUYXNrIiwibW9kdWxlIiwiZXhwb3J0cyIsIm9wZXJhdGlvbnMiLCJ1cGRhdGVSZXF1ZXN0IiwiVXBkYXRlUmVxdWVzdCIsImZyb21PcGVyYXRpb25zVXNlcklkZW50aWZpZXJBbmRTZXNzaW9uSWRlbnRpZmllciIsImpzb24iLCJ0b0pTT04iLCJ1cGRhdGVSZXNwb25zZSIsIlVwZGF0ZVJlc3BvbnNlIiwiZnJvbUpTT04iLCJzZXNzaW9uRXhwaXJlZCIsImdldFNlc3Npb25FeHBpcmVkIiwicGVuZGluZ09wZXJhdGlvbnMiLCJnZXRQZW5kaW5nT3BlcmF0aW9ucyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFTUEsVTs7Ozs7QUFDSixzQkFBWUMsY0FBWixFQUE0QkMsaUJBQTVCLEVBQStDQyxjQUEvQyxFQUErREMsZUFBL0QsRUFBZ0ZDLFFBQWhGLEVBQTBGO0FBQUE7O0FBQUEsNkJBQ2xGQyxrQkFEa0YsRUFDOURMLGNBRDhELEVBQzlDQyxpQkFEOEMsRUFDM0JDLGNBRDJCLEVBQ1hDLGVBRFcsRUFDTUMsUUFETjtBQUV6Rjs7O0VBSHNCRSw0Qjs7QUFNekJDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQlQsVUFBakI7O0FBRUEsU0FBU00sa0JBQVQsQ0FBNEJMLGNBQTVCLEVBQTRDQyxpQkFBNUMsRUFBK0RDLGNBQS9ELEVBQStFQyxlQUEvRSxFQUFnR0MsUUFBaEcsRUFBMEc7QUFDeEcsTUFBTUssVUFBVSxHQUFHLDBCQUFtQlAsY0FBbkIsRUFBbUNDLGVBQW5DLENBQW5CO0FBQUEsTUFDTU8sYUFBYSxHQUFHQyxtQkFBY0MsZ0RBQWQsQ0FBK0RILFVBQS9ELEVBQTJFVCxjQUEzRSxFQUEyRkMsaUJBQTNGLENBRHRCO0FBQUEsTUFFTVksSUFBSSxHQUFHSCxhQUFhLENBQUNJLE1BQWQsRUFGYjs7QUFJQSwwQkFBV0QsSUFBWCxFQUFpQixVQUFDQSxJQUFELEVBQVU7QUFDekIsUUFBTUUsY0FBYyxHQUFHQyxvQkFBZUMsUUFBZixDQUF3QkosSUFBeEIsQ0FBdkI7QUFBQSxRQUNDSyxjQUFjLEdBQUdILGNBQWMsQ0FBQ0ksaUJBQWYsRUFEbEI7QUFBQSxRQUVNQyxpQkFBaUIsR0FBR0wsY0FBYyxDQUFDTSxvQkFBZixFQUYxQjs7QUFJQWpCLElBQUFBLFFBQVEsQ0FBQ2MsY0FBRCxFQUFpQkUsaUJBQWpCLENBQVI7QUFDRCxHQU5EO0FBT0QiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgQXN5bmNocm9ub3VzVGFzayB9IGZyb20gXCJzdWZmaWNpZW50XCI7XG5cbmltcG9ydCBVcGRhdGVSZXF1ZXN0IGZyb20gXCIuLi9yZXF1ZXN0L3VwZGF0ZVwiO1xuaW1wb3J0IFVwZGF0ZVJlc3BvbnNlIGZyb20gXCIuLi9yZXNwb25zZS91cGRhdGVcIjtcbmltcG9ydCBnZW5lcmF0ZU9wZXJhdGlvbnMgZnJvbSBcIi4uL29wZXJhdGlvbnMvZ2VuZXJhdGVcIjtcblxuaW1wb3J0IHsgdXBkYXRlUG9zdCB9IGZyb20gXCIuLi9wb3N0ZXJcIjtcblxuY2xhc3MgVXBkYXRlVGFzayBleHRlbmRzIEFzeW5jaHJvbm91c1Rhc2sge1xuICBjb25zdHJ1Y3Rvcih1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIsIHdvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnQsIGNhbGxiYWNrKSB7XG4gICAgc3VwZXIoYXN5bmNocm9ub3VzTWV0aG9kLCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIsIHdvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnQsIGNhbGxiYWNrKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVXBkYXRlVGFzaztcblxuZnVuY3Rpb24gYXN5bmNocm9ub3VzTWV0aG9kKHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllciwgd29ya2luZ0NvbnRlbnQsIGVkaXRhYmxlQ29udGVudCwgY2FsbGJhY2spIHtcbiAgY29uc3Qgb3BlcmF0aW9ucyA9IGdlbmVyYXRlT3BlcmF0aW9ucyh3b3JraW5nQ29udGVudCwgZWRpdGFibGVDb250ZW50KSxcbiAgICAgICAgdXBkYXRlUmVxdWVzdCA9IFVwZGF0ZVJlcXVlc3QuZnJvbU9wZXJhdGlvbnNVc2VySWRlbnRpZmllckFuZFNlc3Npb25JZGVudGlmaWVyKG9wZXJhdGlvbnMsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllciksXG4gICAgICAgIGpzb24gPSB1cGRhdGVSZXF1ZXN0LnRvSlNPTigpO1xuXG4gIHVwZGF0ZVBvc3QoanNvbiwgKGpzb24pID0+IHtcbiAgICBjb25zdCB1cGRhdGVSZXNwb25zZSA9IFVwZGF0ZVJlc3BvbnNlLmZyb21KU09OKGpzb24pLFxuXHRcdFx0XHRcdHNlc3Npb25FeHBpcmVkID0gdXBkYXRlUmVzcG9uc2UuZ2V0U2Vzc2lvbkV4cGlyZWQoKSxcbiAgICAgICAgICBwZW5kaW5nT3BlcmF0aW9ucyA9IHVwZGF0ZVJlc3BvbnNlLmdldFBlbmRpbmdPcGVyYXRpb25zKCk7XG5cbiAgICBjYWxsYmFjayhzZXNzaW9uRXhwaXJlZCwgcGVuZGluZ09wZXJhdGlvbnMpO1xuICB9KTtcbn1cbiJdfQ==