"use strict";

var _sufficient = require("sufficient");

var _initialise = _interopRequireDefault(require("../request/initialise"));

var _initialise2 = _interopRequireDefault(require("../response/initialise"));

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

var InitialiseTask = /*#__PURE__*/function (_AsynchronousTask) {
  _inherits(InitialiseTask, _AsynchronousTask);

  var _super = _createSuper(InitialiseTask);

  function InitialiseTask(callback) {
    _classCallCheck(this, InitialiseTask);

    return _super.call(this, asynchronousMethod, callback);
  }

  return InitialiseTask;
}(_sufficient.AsynchronousTask);

module.exports = InitialiseTask;

function asynchronousMethod(callback) {
  var initialiseRequest = _initialise["default"].fromNothing(),
      json = initialiseRequest.toJSON();

  (0, _poster.initialisePost)(json, function (json) {
    var initialiseResponse = _initialise2["default"].fromJSON(json),
        content = initialiseResponse.getContent(),
        userIdentifier = initialiseResponse.getUserIdentifier(),
        sessionIdentifier = initialiseResponse.getSessionIdentifier();

    callback(content, userIdentifier, sessionIdentifier);
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaXRpYWxpc2UuanMiXSwibmFtZXMiOlsiSW5pdGlhbGlzZVRhc2siLCJjYWxsYmFjayIsImFzeW5jaHJvbm91c01ldGhvZCIsIkFzeW5jaHJvbm91c1Rhc2siLCJtb2R1bGUiLCJleHBvcnRzIiwiaW5pdGlhbGlzZVJlcXVlc3QiLCJJbml0aWFsaXNlUmVxdWVzdCIsImZyb21Ob3RoaW5nIiwianNvbiIsInRvSlNPTiIsImluaXRpYWxpc2VSZXNwb25zZSIsIkluaXRpYWxpc2VSZXNwb25zZSIsImZyb21KU09OIiwiY29udGVudCIsImdldENvbnRlbnQiLCJ1c2VySWRlbnRpZmllciIsImdldFVzZXJJZGVudGlmaWVyIiwic2Vzc2lvbklkZW50aWZpZXIiLCJnZXRTZXNzaW9uSWRlbnRpZmllciJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFTUEsYzs7Ozs7QUFDSiwwQkFBWUMsUUFBWixFQUFzQjtBQUFBOztBQUFBLDZCQUNkQyxrQkFEYyxFQUNNRCxRQUROO0FBRXJCOzs7RUFIMEJFLDRCOztBQU03QkMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCTCxjQUFqQjs7QUFFQSxTQUFTRSxrQkFBVCxDQUE0QkQsUUFBNUIsRUFBc0M7QUFDcEMsTUFBTUssaUJBQWlCLEdBQUdDLHVCQUFrQkMsV0FBbEIsRUFBMUI7QUFBQSxNQUNNQyxJQUFJLEdBQUdILGlCQUFpQixDQUFDSSxNQUFsQixFQURiOztBQUdBLDhCQUFlRCxJQUFmLEVBQXFCLFVBQUNBLElBQUQsRUFBVTtBQUM3QixRQUFNRSxrQkFBa0IsR0FBR0Msd0JBQW1CQyxRQUFuQixDQUE0QkosSUFBNUIsQ0FBM0I7QUFBQSxRQUNNSyxPQUFPLEdBQUdILGtCQUFrQixDQUFDSSxVQUFuQixFQURoQjtBQUFBLFFBRU1DLGNBQWMsR0FBR0wsa0JBQWtCLENBQUNNLGlCQUFuQixFQUZ2QjtBQUFBLFFBR0NDLGlCQUFpQixHQUFHUCxrQkFBa0IsQ0FBQ1Esb0JBQW5CLEVBSHJCOztBQUtBbEIsSUFBQUEsUUFBUSxDQUFDYSxPQUFELEVBQVVFLGNBQVYsRUFBMEJFLGlCQUExQixDQUFSO0FBQ0QsR0FQRDtBQVFEIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IEFzeW5jaHJvbm91c1Rhc2sgfSBmcm9tIFwic3VmZmljaWVudFwiO1xuXG5pbXBvcnQgSW5pdGlhbGlzZVJlcXVlc3QgZnJvbSBcIi4uL3JlcXVlc3QvaW5pdGlhbGlzZVwiO1xuaW1wb3J0IEluaXRpYWxpc2VSZXNwb25zZSBmcm9tIFwiLi4vcmVzcG9uc2UvaW5pdGlhbGlzZVwiO1xuXG5pbXBvcnQgeyBpbml0aWFsaXNlUG9zdCB9IGZyb20gXCIuLi9wb3N0ZXJcIjtcblxuY2xhc3MgSW5pdGlhbGlzZVRhc2sgZXh0ZW5kcyBBc3luY2hyb25vdXNUYXNrIHtcbiAgY29uc3RydWN0b3IoY2FsbGJhY2spIHtcbiAgICBzdXBlcihhc3luY2hyb25vdXNNZXRob2QsIGNhbGxiYWNrKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSW5pdGlhbGlzZVRhc2s7XG5cbmZ1bmN0aW9uIGFzeW5jaHJvbm91c01ldGhvZChjYWxsYmFjaykge1xuICBjb25zdCBpbml0aWFsaXNlUmVxdWVzdCA9IEluaXRpYWxpc2VSZXF1ZXN0LmZyb21Ob3RoaW5nKCksXG4gICAgICAgIGpzb24gPSBpbml0aWFsaXNlUmVxdWVzdC50b0pTT04oKTtcblxuICBpbml0aWFsaXNlUG9zdChqc29uLCAoanNvbikgPT4ge1xuICAgIGNvbnN0IGluaXRpYWxpc2VSZXNwb25zZSA9IEluaXRpYWxpc2VSZXNwb25zZS5mcm9tSlNPTihqc29uKSxcbiAgICAgICAgICBjb250ZW50ID0gaW5pdGlhbGlzZVJlc3BvbnNlLmdldENvbnRlbnQoKSxcbiAgICAgICAgICB1c2VySWRlbnRpZmllciA9IGluaXRpYWxpc2VSZXNwb25zZS5nZXRVc2VySWRlbnRpZmllcigpLFxuXHRcdFx0XHRcdHNlc3Npb25JZGVudGlmaWVyID0gaW5pdGlhbGlzZVJlc3BvbnNlLmdldFNlc3Npb25JZGVudGlmaWVyKCk7XG5cbiAgICBjYWxsYmFjayhjb250ZW50LCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpO1xuICB9KTtcbn1cbiJdfQ==