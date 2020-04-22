"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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

exports["default"] = InitialiseTask;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaXRpYWxpc2UuanMiXSwibmFtZXMiOlsiSW5pdGlhbGlzZVRhc2siLCJjYWxsYmFjayIsImFzeW5jaHJvbm91c01ldGhvZCIsIkFzeW5jaHJvbm91c1Rhc2siLCJpbml0aWFsaXNlUmVxdWVzdCIsIkluaXRpYWxpc2VSZXF1ZXN0IiwiZnJvbU5vdGhpbmciLCJqc29uIiwidG9KU09OIiwiaW5pdGlhbGlzZVJlc3BvbnNlIiwiSW5pdGlhbGlzZVJlc3BvbnNlIiwiZnJvbUpTT04iLCJjb250ZW50IiwiZ2V0Q29udGVudCIsInVzZXJJZGVudGlmaWVyIiwiZ2V0VXNlcklkZW50aWZpZXIiLCJzZXNzaW9uSWRlbnRpZmllciIsImdldFNlc3Npb25JZGVudGlmaWVyIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUVBOztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxjOzs7OztBQUNuQiwwQkFBWUMsUUFBWixFQUFzQjtBQUFBOztBQUFBLDZCQUNkQyxrQkFEYyxFQUNNRCxRQUROO0FBRXJCOzs7RUFIeUNFLDRCOzs7O0FBTTVDLFNBQVNELGtCQUFULENBQTRCRCxRQUE1QixFQUFzQztBQUNwQyxNQUFNRyxpQkFBaUIsR0FBR0MsdUJBQWtCQyxXQUFsQixFQUExQjtBQUFBLE1BQ01DLElBQUksR0FBR0gsaUJBQWlCLENBQUNJLE1BQWxCLEVBRGI7O0FBR0EsOEJBQWVELElBQWYsRUFBcUIsVUFBQ0EsSUFBRCxFQUFVO0FBQzdCLFFBQU1FLGtCQUFrQixHQUFHQyx3QkFBbUJDLFFBQW5CLENBQTRCSixJQUE1QixDQUEzQjtBQUFBLFFBQ01LLE9BQU8sR0FBR0gsa0JBQWtCLENBQUNJLFVBQW5CLEVBRGhCO0FBQUEsUUFFTUMsY0FBYyxHQUFHTCxrQkFBa0IsQ0FBQ00saUJBQW5CLEVBRnZCO0FBQUEsUUFHQ0MsaUJBQWlCLEdBQUdQLGtCQUFrQixDQUFDUSxvQkFBbkIsRUFIckI7O0FBS0FoQixJQUFBQSxRQUFRLENBQUNXLE9BQUQsRUFBVUUsY0FBVixFQUEwQkUsaUJBQTFCLENBQVI7QUFDRCxHQVBEO0FBUUQiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgQXN5bmNocm9ub3VzVGFzayB9IGZyb20gXCJzdWZmaWNpZW50XCI7XG5cbmltcG9ydCBJbml0aWFsaXNlUmVxdWVzdCBmcm9tIFwiLi4vcmVxdWVzdC9pbml0aWFsaXNlXCI7XG5pbXBvcnQgSW5pdGlhbGlzZVJlc3BvbnNlIGZyb20gXCIuLi9yZXNwb25zZS9pbml0aWFsaXNlXCI7XG5cbmltcG9ydCB7IGluaXRpYWxpc2VQb3N0IH0gZnJvbSBcIi4uL3Bvc3RlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbml0aWFsaXNlVGFzayBleHRlbmRzIEFzeW5jaHJvbm91c1Rhc2sge1xuICBjb25zdHJ1Y3RvcihjYWxsYmFjaykge1xuICAgIHN1cGVyKGFzeW5jaHJvbm91c01ldGhvZCwgY2FsbGJhY2spXG4gIH1cbn1cblxuZnVuY3Rpb24gYXN5bmNocm9ub3VzTWV0aG9kKGNhbGxiYWNrKSB7XG4gIGNvbnN0IGluaXRpYWxpc2VSZXF1ZXN0ID0gSW5pdGlhbGlzZVJlcXVlc3QuZnJvbU5vdGhpbmcoKSxcbiAgICAgICAganNvbiA9IGluaXRpYWxpc2VSZXF1ZXN0LnRvSlNPTigpO1xuXG4gIGluaXRpYWxpc2VQb3N0KGpzb24sIChqc29uKSA9PiB7XG4gICAgY29uc3QgaW5pdGlhbGlzZVJlc3BvbnNlID0gSW5pdGlhbGlzZVJlc3BvbnNlLmZyb21KU09OKGpzb24pLFxuICAgICAgICAgIGNvbnRlbnQgPSBpbml0aWFsaXNlUmVzcG9uc2UuZ2V0Q29udGVudCgpLFxuICAgICAgICAgIHVzZXJJZGVudGlmaWVyID0gaW5pdGlhbGlzZVJlc3BvbnNlLmdldFVzZXJJZGVudGlmaWVyKCksXG5cdFx0XHRcdFx0c2Vzc2lvbklkZW50aWZpZXIgPSBpbml0aWFsaXNlUmVzcG9uc2UuZ2V0U2Vzc2lvbklkZW50aWZpZXIoKTtcblxuICAgIGNhbGxiYWNrKGNvbnRlbnQsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllcik7XG4gIH0pO1xufVxuIl19