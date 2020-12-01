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

function _createSuper(Derived) {
  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVwZGF0ZS5qcyJdLCJuYW1lcyI6WyJVcGRhdGVUYXNrIiwidXNlcklkZW50aWZpZXIiLCJzZXNzaW9uSWRlbnRpZmllciIsIndvcmtpbmdDb250ZW50IiwiZWRpdGFibGVDb250ZW50IiwiY2FsbGJhY2siLCJhc3luY2hyb25vdXNNZXRob2QiLCJBc3luY2hyb25vdXNUYXNrIiwib3BlcmF0aW9ucyIsInVwZGF0ZVJlcXVlc3QiLCJVcGRhdGVSZXF1ZXN0IiwiZnJvbU9wZXJhdGlvbnNVc2VySWRlbnRpZmllckFuZFNlc3Npb25JZGVudGlmaWVyIiwianNvbiIsInRvSlNPTiIsInVwZGF0ZVJlc3BvbnNlIiwiVXBkYXRlUmVzcG9uc2UiLCJmcm9tSlNPTiIsInNlc3Npb25FeHBpcmVkIiwiZ2V0U2Vzc2lvbkV4cGlyZWQiLCJwZW5kaW5nT3BlcmF0aW9ucyIsImdldFBlbmRpbmdPcGVyYXRpb25zIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUVBOztBQUNBOztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLFU7Ozs7O0FBQ25CLHNCQUFZQyxjQUFaLEVBQTRCQyxpQkFBNUIsRUFBK0NDLGNBQS9DLEVBQStEQyxlQUEvRCxFQUFnRkMsUUFBaEYsRUFBMEY7QUFBQTs7QUFBQSw2QkFDbEZDLGtCQURrRixFQUM5REwsY0FEOEQsRUFDOUNDLGlCQUQ4QyxFQUMzQkMsY0FEMkIsRUFDWEMsZUFEVyxFQUNNQyxRQUROO0FBRXpGOzs7RUFIcUNFLDRCOzs7O0FBTXhDLFNBQVNELGtCQUFULENBQTRCTCxjQUE1QixFQUE0Q0MsaUJBQTVDLEVBQStEQyxjQUEvRCxFQUErRUMsZUFBL0UsRUFBZ0dDLFFBQWhHLEVBQTBHO0FBQ3hHLE1BQU1HLFVBQVUsR0FBRywwQkFBbUJMLGNBQW5CLEVBQW1DQyxlQUFuQyxDQUFuQjtBQUFBLE1BQ01LLGFBQWEsR0FBR0MsbUJBQWNDLGdEQUFkLENBQStESCxVQUEvRCxFQUEyRVAsY0FBM0UsRUFBMkZDLGlCQUEzRixDQUR0QjtBQUFBLE1BRU1VLElBQUksR0FBR0gsYUFBYSxDQUFDSSxNQUFkLEVBRmI7O0FBSUEsMEJBQVdELElBQVgsRUFBaUIsVUFBQ0EsSUFBRCxFQUFVO0FBQ3pCLFFBQU1FLGNBQWMsR0FBR0Msb0JBQWVDLFFBQWYsQ0FBd0JKLElBQXhCLENBQXZCO0FBQUEsUUFDQ0ssY0FBYyxHQUFHSCxjQUFjLENBQUNJLGlCQUFmLEVBRGxCO0FBQUEsUUFFTUMsaUJBQWlCLEdBQUdMLGNBQWMsQ0FBQ00sb0JBQWYsRUFGMUI7O0FBSUFmLElBQUFBLFFBQVEsQ0FBQ1ksY0FBRCxFQUFpQkUsaUJBQWpCLENBQVI7QUFDRCxHQU5EO0FBT0QiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgQXN5bmNocm9ub3VzVGFzayB9IGZyb20gXCJzdWZmaWNpZW50XCI7XG5cbmltcG9ydCBVcGRhdGVSZXF1ZXN0IGZyb20gXCIuLi9yZXF1ZXN0L3VwZGF0ZVwiO1xuaW1wb3J0IFVwZGF0ZVJlc3BvbnNlIGZyb20gXCIuLi9yZXNwb25zZS91cGRhdGVcIjtcbmltcG9ydCBnZW5lcmF0ZU9wZXJhdGlvbnMgZnJvbSBcIi4uL29wZXJhdGlvbnMvZ2VuZXJhdGVcIjtcblxuaW1wb3J0IHsgdXBkYXRlUG9zdCB9IGZyb20gXCIuLi9wb3N0ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXBkYXRlVGFzayBleHRlbmRzIEFzeW5jaHJvbm91c1Rhc2sge1xuICBjb25zdHJ1Y3Rvcih1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIsIHdvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnQsIGNhbGxiYWNrKSB7XG4gICAgc3VwZXIoYXN5bmNocm9ub3VzTWV0aG9kLCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIsIHdvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnQsIGNhbGxiYWNrKVxuICB9XG59XG5cbmZ1bmN0aW9uIGFzeW5jaHJvbm91c01ldGhvZCh1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIsIHdvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnQsIGNhbGxiYWNrKSB7XG4gIGNvbnN0IG9wZXJhdGlvbnMgPSBnZW5lcmF0ZU9wZXJhdGlvbnMod29ya2luZ0NvbnRlbnQsIGVkaXRhYmxlQ29udGVudCksXG4gICAgICAgIHVwZGF0ZVJlcXVlc3QgPSBVcGRhdGVSZXF1ZXN0LmZyb21PcGVyYXRpb25zVXNlcklkZW50aWZpZXJBbmRTZXNzaW9uSWRlbnRpZmllcihvcGVyYXRpb25zLCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpLFxuICAgICAgICBqc29uID0gdXBkYXRlUmVxdWVzdC50b0pTT04oKTtcblxuICB1cGRhdGVQb3N0KGpzb24sIChqc29uKSA9PiB7XG4gICAgY29uc3QgdXBkYXRlUmVzcG9uc2UgPSBVcGRhdGVSZXNwb25zZS5mcm9tSlNPTihqc29uKSxcblx0XHRcdFx0XHRzZXNzaW9uRXhwaXJlZCA9IHVwZGF0ZVJlc3BvbnNlLmdldFNlc3Npb25FeHBpcmVkKCksXG4gICAgICAgICAgcGVuZGluZ09wZXJhdGlvbnMgPSB1cGRhdGVSZXNwb25zZS5nZXRQZW5kaW5nT3BlcmF0aW9ucygpO1xuXG4gICAgY2FsbGJhY2soc2Vzc2lvbkV4cGlyZWQsIHBlbmRpbmdPcGVyYXRpb25zKTtcbiAgfSk7XG59XG4iXX0=