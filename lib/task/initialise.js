"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var sufficient = require("sufficient");

var poster = require("../poster"),
    InitialiseRequest = require("../request/initialise"),
    InitialiseResponse = require("../response/initialise");

var initialisePost = poster.initialisePost,
    AsynchronousTask = sufficient.AsynchronousTask;

var InitialiseTask = /*#__PURE__*/function (_AsynchronousTask) {
  _inherits(InitialiseTask, _AsynchronousTask);

  var _super = _createSuper(InitialiseTask);

  function InitialiseTask(callback) {
    _classCallCheck(this, InitialiseTask);

    return _super.call(this, asynchronousMethod, callback);
  }

  return InitialiseTask;
}(AsynchronousTask);

module.exports = InitialiseTask;

function asynchronousMethod(callback) {
  var initialiseRequest = InitialiseRequest.fromNothing(),
      json = initialiseRequest.toJSON();
  initialisePost(json, function (json) {
    var initialiseResponse = InitialiseResponse.fromJSON(json),
        content = initialiseResponse.getContent(),
        userIdentifier = initialiseResponse.getUserIdentifier(),
        sessionIdentifier = initialiseResponse.getSessionIdentifier();
    callback(content, userIdentifier, sessionIdentifier);
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaXRpYWxpc2UuanMiXSwibmFtZXMiOlsic3VmZmljaWVudCIsInJlcXVpcmUiLCJwb3N0ZXIiLCJJbml0aWFsaXNlUmVxdWVzdCIsIkluaXRpYWxpc2VSZXNwb25zZSIsImluaXRpYWxpc2VQb3N0IiwiQXN5bmNocm9ub3VzVGFzayIsIkluaXRpYWxpc2VUYXNrIiwiY2FsbGJhY2siLCJhc3luY2hyb25vdXNNZXRob2QiLCJtb2R1bGUiLCJleHBvcnRzIiwiaW5pdGlhbGlzZVJlcXVlc3QiLCJmcm9tTm90aGluZyIsImpzb24iLCJ0b0pTT04iLCJpbml0aWFsaXNlUmVzcG9uc2UiLCJmcm9tSlNPTiIsImNvbnRlbnQiLCJnZXRDb250ZW50IiwidXNlcklkZW50aWZpZXIiLCJnZXRVc2VySWRlbnRpZmllciIsInNlc3Npb25JZGVudGlmaWVyIiwiZ2V0U2Vzc2lvbklkZW50aWZpZXIiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFVBQVUsR0FBR0MsT0FBTyxDQUFDLFlBQUQsQ0FBMUI7O0FBRUEsSUFBTUMsTUFBTSxHQUFHRCxPQUFPLENBQUMsV0FBRCxDQUF0QjtBQUFBLElBQ01FLGlCQUFpQixHQUFHRixPQUFPLENBQUMsdUJBQUQsQ0FEakM7QUFBQSxJQUVNRyxrQkFBa0IsR0FBR0gsT0FBTyxDQUFDLHdCQUFELENBRmxDOztBQUlNLElBQUVJLGNBQUYsR0FBcUJILE1BQXJCLENBQUVHLGNBQUY7QUFBQSxJQUNFQyxnQkFERixHQUN1Qk4sVUFEdkIsQ0FDRU0sZ0JBREY7O0lBR0FDLGM7Ozs7O0FBQ0osMEJBQVlDLFFBQVosRUFBc0I7QUFBQTs7QUFBQSw2QkFDZEMsa0JBRGMsRUFDTUQsUUFETjtBQUVyQjs7O0VBSDBCRixnQjs7QUFNN0JJLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQkosY0FBakI7O0FBRUEsU0FBU0Usa0JBQVQsQ0FBNEJELFFBQTVCLEVBQXNDO0FBQ3BDLE1BQU1JLGlCQUFpQixHQUFHVCxpQkFBaUIsQ0FBQ1UsV0FBbEIsRUFBMUI7QUFBQSxNQUNNQyxJQUFJLEdBQUdGLGlCQUFpQixDQUFDRyxNQUFsQixFQURiO0FBR0FWLEVBQUFBLGNBQWMsQ0FBQ1MsSUFBRCxFQUFPLFVBQUNBLElBQUQsRUFBVTtBQUM3QixRQUFNRSxrQkFBa0IsR0FBR1osa0JBQWtCLENBQUNhLFFBQW5CLENBQTRCSCxJQUE1QixDQUEzQjtBQUFBLFFBQ01JLE9BQU8sR0FBR0Ysa0JBQWtCLENBQUNHLFVBQW5CLEVBRGhCO0FBQUEsUUFFTUMsY0FBYyxHQUFHSixrQkFBa0IsQ0FBQ0ssaUJBQW5CLEVBRnZCO0FBQUEsUUFHQ0MsaUJBQWlCLEdBQUdOLGtCQUFrQixDQUFDTyxvQkFBbkIsRUFIckI7QUFLQWYsSUFBQUEsUUFBUSxDQUFDVSxPQUFELEVBQVVFLGNBQVYsRUFBMEJFLGlCQUExQixDQUFSO0FBQ0QsR0FQYSxDQUFkO0FBUUQiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuY29uc3Qgc3VmZmljaWVudCA9IHJlcXVpcmUoXCJzdWZmaWNpZW50XCIpO1xuXG5jb25zdCBwb3N0ZXIgPSByZXF1aXJlKFwiLi4vcG9zdGVyXCIpLFxuICAgICAgSW5pdGlhbGlzZVJlcXVlc3QgPSByZXF1aXJlKFwiLi4vcmVxdWVzdC9pbml0aWFsaXNlXCIpLFxuICAgICAgSW5pdGlhbGlzZVJlc3BvbnNlID0gcmVxdWlyZShcIi4uL3Jlc3BvbnNlL2luaXRpYWxpc2VcIik7XG5cbmNvbnN0IHsgaW5pdGlhbGlzZVBvc3QgfSA9IHBvc3RlcixcbiAgICAgIHsgQXN5bmNocm9ub3VzVGFzayB9ID0gc3VmZmljaWVudDtcblxuY2xhc3MgSW5pdGlhbGlzZVRhc2sgZXh0ZW5kcyBBc3luY2hyb25vdXNUYXNrIHtcbiAgY29uc3RydWN0b3IoY2FsbGJhY2spIHtcbiAgICBzdXBlcihhc3luY2hyb25vdXNNZXRob2QsIGNhbGxiYWNrKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSW5pdGlhbGlzZVRhc2s7XG5cbmZ1bmN0aW9uIGFzeW5jaHJvbm91c01ldGhvZChjYWxsYmFjaykge1xuICBjb25zdCBpbml0aWFsaXNlUmVxdWVzdCA9IEluaXRpYWxpc2VSZXF1ZXN0LmZyb21Ob3RoaW5nKCksXG4gICAgICAgIGpzb24gPSBpbml0aWFsaXNlUmVxdWVzdC50b0pTT04oKTtcblxuICBpbml0aWFsaXNlUG9zdChqc29uLCAoanNvbikgPT4ge1xuICAgIGNvbnN0IGluaXRpYWxpc2VSZXNwb25zZSA9IEluaXRpYWxpc2VSZXNwb25zZS5mcm9tSlNPTihqc29uKSxcbiAgICAgICAgICBjb250ZW50ID0gaW5pdGlhbGlzZVJlc3BvbnNlLmdldENvbnRlbnQoKSxcbiAgICAgICAgICB1c2VySWRlbnRpZmllciA9IGluaXRpYWxpc2VSZXNwb25zZS5nZXRVc2VySWRlbnRpZmllcigpLFxuXHRcdFx0XHRcdHNlc3Npb25JZGVudGlmaWVyID0gaW5pdGlhbGlzZVJlc3BvbnNlLmdldFNlc3Npb25JZGVudGlmaWVyKCk7XG5cbiAgICBjYWxsYmFjayhjb250ZW50LCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpO1xuICB9KTtcbn1cbiJdfQ==