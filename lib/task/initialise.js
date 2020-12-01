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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaXRpYWxpc2UuanMiXSwibmFtZXMiOlsiSW5pdGlhbGlzZVRhc2siLCJjYWxsYmFjayIsImFzeW5jaHJvbm91c01ldGhvZCIsIkFzeW5jaHJvbm91c1Rhc2siLCJpbml0aWFsaXNlUmVxdWVzdCIsIkluaXRpYWxpc2VSZXF1ZXN0IiwiZnJvbU5vdGhpbmciLCJqc29uIiwidG9KU09OIiwiaW5pdGlhbGlzZVJlc3BvbnNlIiwiSW5pdGlhbGlzZVJlc3BvbnNlIiwiZnJvbUpTT04iLCJjb250ZW50IiwiZ2V0Q29udGVudCIsInVzZXJJZGVudGlmaWVyIiwiZ2V0VXNlcklkZW50aWZpZXIiLCJzZXNzaW9uSWRlbnRpZmllciIsImdldFNlc3Npb25JZGVudGlmaWVyIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUVBOztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLGM7Ozs7O0FBQ25CLDBCQUFZQyxRQUFaLEVBQXNCO0FBQUE7O0FBQUEsNkJBQ2RDLGtCQURjLEVBQ01ELFFBRE47QUFFckI7OztFQUh5Q0UsNEI7Ozs7QUFNNUMsU0FBU0Qsa0JBQVQsQ0FBNEJELFFBQTVCLEVBQXNDO0FBQ3BDLE1BQU1HLGlCQUFpQixHQUFHQyx1QkFBa0JDLFdBQWxCLEVBQTFCO0FBQUEsTUFDTUMsSUFBSSxHQUFHSCxpQkFBaUIsQ0FBQ0ksTUFBbEIsRUFEYjs7QUFHQSw4QkFBZUQsSUFBZixFQUFxQixVQUFDQSxJQUFELEVBQVU7QUFDN0IsUUFBTUUsa0JBQWtCLEdBQUdDLHdCQUFtQkMsUUFBbkIsQ0FBNEJKLElBQTVCLENBQTNCO0FBQUEsUUFDTUssT0FBTyxHQUFHSCxrQkFBa0IsQ0FBQ0ksVUFBbkIsRUFEaEI7QUFBQSxRQUVNQyxjQUFjLEdBQUdMLGtCQUFrQixDQUFDTSxpQkFBbkIsRUFGdkI7QUFBQSxRQUdDQyxpQkFBaUIsR0FBR1Asa0JBQWtCLENBQUNRLG9CQUFuQixFQUhyQjs7QUFLQWhCLElBQUFBLFFBQVEsQ0FBQ1csT0FBRCxFQUFVRSxjQUFWLEVBQTBCRSxpQkFBMUIsQ0FBUjtBQUNELEdBUEQ7QUFRRCIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBBc3luY2hyb25vdXNUYXNrIH0gZnJvbSBcInN1ZmZpY2llbnRcIjtcblxuaW1wb3J0IEluaXRpYWxpc2VSZXF1ZXN0IGZyb20gXCIuLi9yZXF1ZXN0L2luaXRpYWxpc2VcIjtcbmltcG9ydCBJbml0aWFsaXNlUmVzcG9uc2UgZnJvbSBcIi4uL3Jlc3BvbnNlL2luaXRpYWxpc2VcIjtcblxuaW1wb3J0IHsgaW5pdGlhbGlzZVBvc3QgfSBmcm9tIFwiLi4vcG9zdGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluaXRpYWxpc2VUYXNrIGV4dGVuZHMgQXN5bmNocm9ub3VzVGFzayB7XG4gIGNvbnN0cnVjdG9yKGNhbGxiYWNrKSB7XG4gICAgc3VwZXIoYXN5bmNocm9ub3VzTWV0aG9kLCBjYWxsYmFjaylcbiAgfVxufVxuXG5mdW5jdGlvbiBhc3luY2hyb25vdXNNZXRob2QoY2FsbGJhY2spIHtcbiAgY29uc3QgaW5pdGlhbGlzZVJlcXVlc3QgPSBJbml0aWFsaXNlUmVxdWVzdC5mcm9tTm90aGluZygpLFxuICAgICAgICBqc29uID0gaW5pdGlhbGlzZVJlcXVlc3QudG9KU09OKCk7XG5cbiAgaW5pdGlhbGlzZVBvc3QoanNvbiwgKGpzb24pID0+IHtcbiAgICBjb25zdCBpbml0aWFsaXNlUmVzcG9uc2UgPSBJbml0aWFsaXNlUmVzcG9uc2UuZnJvbUpTT04oanNvbiksXG4gICAgICAgICAgY29udGVudCA9IGluaXRpYWxpc2VSZXNwb25zZS5nZXRDb250ZW50KCksXG4gICAgICAgICAgdXNlcklkZW50aWZpZXIgPSBpbml0aWFsaXNlUmVzcG9uc2UuZ2V0VXNlcklkZW50aWZpZXIoKSxcblx0XHRcdFx0XHRzZXNzaW9uSWRlbnRpZmllciA9IGluaXRpYWxpc2VSZXNwb25zZS5nZXRTZXNzaW9uSWRlbnRpZmllcigpO1xuXG4gICAgY2FsbGJhY2soY29udGVudCwgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyKTtcbiAgfSk7XG59XG4iXX0=