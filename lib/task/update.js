"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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

exports["default"] = UpdateTask;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVwZGF0ZS5qcyJdLCJuYW1lcyI6WyJVcGRhdGVUYXNrIiwidXNlcklkZW50aWZpZXIiLCJzZXNzaW9uSWRlbnRpZmllciIsIndvcmtpbmdDb250ZW50IiwiZWRpdGFibGVDb250ZW50IiwiY2FsbGJhY2siLCJhc3luY2hyb25vdXNNZXRob2QiLCJBc3luY2hyb25vdXNUYXNrIiwib3BlcmF0aW9ucyIsInVwZGF0ZVJlcXVlc3QiLCJVcGRhdGVSZXF1ZXN0IiwiZnJvbU9wZXJhdGlvbnNVc2VySWRlbnRpZmllckFuZFNlc3Npb25JZGVudGlmaWVyIiwianNvbiIsInRvSlNPTiIsInVwZGF0ZVJlc3BvbnNlIiwiVXBkYXRlUmVzcG9uc2UiLCJmcm9tSlNPTiIsInNlc3Npb25FeHBpcmVkIiwiZ2V0U2Vzc2lvbkV4cGlyZWQiLCJwZW5kaW5nT3BlcmF0aW9ucyIsImdldFBlbmRpbmdPcGVyYXRpb25zIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUVBOztBQUNBOztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxVOzs7OztBQUNuQixzQkFBWUMsY0FBWixFQUE0QkMsaUJBQTVCLEVBQStDQyxjQUEvQyxFQUErREMsZUFBL0QsRUFBZ0ZDLFFBQWhGLEVBQTBGO0FBQUE7O0FBQUEsNkJBQ2xGQyxrQkFEa0YsRUFDOURMLGNBRDhELEVBQzlDQyxpQkFEOEMsRUFDM0JDLGNBRDJCLEVBQ1hDLGVBRFcsRUFDTUMsUUFETjtBQUV6Rjs7O0VBSHFDRSw0Qjs7OztBQU14QyxTQUFTRCxrQkFBVCxDQUE0QkwsY0FBNUIsRUFBNENDLGlCQUE1QyxFQUErREMsY0FBL0QsRUFBK0VDLGVBQS9FLEVBQWdHQyxRQUFoRyxFQUEwRztBQUN4RyxNQUFNRyxVQUFVLEdBQUcsMEJBQW1CTCxjQUFuQixFQUFtQ0MsZUFBbkMsQ0FBbkI7QUFBQSxNQUNNSyxhQUFhLEdBQUdDLG1CQUFjQyxnREFBZCxDQUErREgsVUFBL0QsRUFBMkVQLGNBQTNFLEVBQTJGQyxpQkFBM0YsQ0FEdEI7QUFBQSxNQUVNVSxJQUFJLEdBQUdILGFBQWEsQ0FBQ0ksTUFBZCxFQUZiOztBQUlBLDBCQUFXRCxJQUFYLEVBQWlCLFVBQUNBLElBQUQsRUFBVTtBQUN6QixRQUFNRSxjQUFjLEdBQUdDLG9CQUFlQyxRQUFmLENBQXdCSixJQUF4QixDQUF2QjtBQUFBLFFBQ0NLLGNBQWMsR0FBR0gsY0FBYyxDQUFDSSxpQkFBZixFQURsQjtBQUFBLFFBRU1DLGlCQUFpQixHQUFHTCxjQUFjLENBQUNNLG9CQUFmLEVBRjFCOztBQUlBZixJQUFBQSxRQUFRLENBQUNZLGNBQUQsRUFBaUJFLGlCQUFqQixDQUFSO0FBQ0QsR0FORDtBQU9EIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IEFzeW5jaHJvbm91c1Rhc2sgfSBmcm9tIFwic3VmZmljaWVudFwiO1xuXG5pbXBvcnQgVXBkYXRlUmVxdWVzdCBmcm9tIFwiLi4vcmVxdWVzdC91cGRhdGVcIjtcbmltcG9ydCBVcGRhdGVSZXNwb25zZSBmcm9tIFwiLi4vcmVzcG9uc2UvdXBkYXRlXCI7XG5pbXBvcnQgZ2VuZXJhdGVPcGVyYXRpb25zIGZyb20gXCIuLi9vcGVyYXRpb25zL2dlbmVyYXRlXCI7XG5cbmltcG9ydCB7IHVwZGF0ZVBvc3QgfSBmcm9tIFwiLi4vcG9zdGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVwZGF0ZVRhc2sgZXh0ZW5kcyBBc3luY2hyb25vdXNUYXNrIHtcbiAgY29uc3RydWN0b3IodXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyLCB3b3JraW5nQ29udGVudCwgZWRpdGFibGVDb250ZW50LCBjYWxsYmFjaykge1xuICAgIHN1cGVyKGFzeW5jaHJvbm91c01ldGhvZCwgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyLCB3b3JraW5nQ29udGVudCwgZWRpdGFibGVDb250ZW50LCBjYWxsYmFjaylcbiAgfVxufVxuXG5mdW5jdGlvbiBhc3luY2hyb25vdXNNZXRob2QodXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyLCB3b3JraW5nQ29udGVudCwgZWRpdGFibGVDb250ZW50LCBjYWxsYmFjaykge1xuICBjb25zdCBvcGVyYXRpb25zID0gZ2VuZXJhdGVPcGVyYXRpb25zKHdvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnQpLFxuICAgICAgICB1cGRhdGVSZXF1ZXN0ID0gVXBkYXRlUmVxdWVzdC5mcm9tT3BlcmF0aW9uc1VzZXJJZGVudGlmaWVyQW5kU2Vzc2lvbklkZW50aWZpZXIob3BlcmF0aW9ucywgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyKSxcbiAgICAgICAganNvbiA9IHVwZGF0ZVJlcXVlc3QudG9KU09OKCk7XG5cbiAgdXBkYXRlUG9zdChqc29uLCAoanNvbikgPT4ge1xuICAgIGNvbnN0IHVwZGF0ZVJlc3BvbnNlID0gVXBkYXRlUmVzcG9uc2UuZnJvbUpTT04oanNvbiksXG5cdFx0XHRcdFx0c2Vzc2lvbkV4cGlyZWQgPSB1cGRhdGVSZXNwb25zZS5nZXRTZXNzaW9uRXhwaXJlZCgpLFxuICAgICAgICAgIHBlbmRpbmdPcGVyYXRpb25zID0gdXBkYXRlUmVzcG9uc2UuZ2V0UGVuZGluZ09wZXJhdGlvbnMoKTtcblxuICAgIGNhbGxiYWNrKHNlc3Npb25FeHBpcmVkLCBwZW5kaW5nT3BlcmF0aW9ucyk7XG4gIH0pO1xufVxuIl19