'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var sufficient = require('sufficient');

var poster = require('../poster'),
    InitialiseRequest = require('../request/initialise'),
    InitialiseResponse = require('../response/initialise');

var initialisePost = poster.initialisePost,
    AsynchronousTask = sufficient.AsynchronousTask;

var InitialiseTask = /*#__PURE__*/function (_AsynchronousTask) {
  _inherits(InitialiseTask, _AsynchronousTask);

  function InitialiseTask(callback) {
    _classCallCheck(this, InitialiseTask);

    return _possibleConstructorReturn(this, _getPrototypeOf(InitialiseTask).call(this, asynchronousMethod, callback));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaXRpYWxpc2UuanMiXSwibmFtZXMiOlsic3VmZmljaWVudCIsInJlcXVpcmUiLCJwb3N0ZXIiLCJJbml0aWFsaXNlUmVxdWVzdCIsIkluaXRpYWxpc2VSZXNwb25zZSIsImluaXRpYWxpc2VQb3N0IiwiQXN5bmNocm9ub3VzVGFzayIsIkluaXRpYWxpc2VUYXNrIiwiY2FsbGJhY2siLCJhc3luY2hyb25vdXNNZXRob2QiLCJtb2R1bGUiLCJleHBvcnRzIiwiaW5pdGlhbGlzZVJlcXVlc3QiLCJmcm9tTm90aGluZyIsImpzb24iLCJ0b0pTT04iLCJpbml0aWFsaXNlUmVzcG9uc2UiLCJmcm9tSlNPTiIsImNvbnRlbnQiLCJnZXRDb250ZW50IiwidXNlcklkZW50aWZpZXIiLCJnZXRVc2VySWRlbnRpZmllciIsInNlc3Npb25JZGVudGlmaWVyIiwiZ2V0U2Vzc2lvbklkZW50aWZpZXIiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsVUFBVSxHQUFHQyxPQUFPLENBQUMsWUFBRCxDQUExQjs7QUFFQSxJQUFNQyxNQUFNLEdBQUdELE9BQU8sQ0FBQyxXQUFELENBQXRCO0FBQUEsSUFDTUUsaUJBQWlCLEdBQUdGLE9BQU8sQ0FBQyx1QkFBRCxDQURqQztBQUFBLElBRU1HLGtCQUFrQixHQUFHSCxPQUFPLENBQUMsd0JBQUQsQ0FGbEM7O0FBSU0sSUFBRUksY0FBRixHQUFxQkgsTUFBckIsQ0FBRUcsY0FBRjtBQUFBLElBQ0VDLGdCQURGLEdBQ3VCTixVQUR2QixDQUNFTSxnQkFERjs7SUFHQUMsYzs7O0FBQ0osMEJBQVlDLFFBQVosRUFBc0I7QUFBQTs7QUFBQSx1RkFDZEMsa0JBRGMsRUFDTUQsUUFETjtBQUVyQjs7O0VBSDBCRixnQjs7QUFNN0JJLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQkosY0FBakI7O0FBRUEsU0FBU0Usa0JBQVQsQ0FBNEJELFFBQTVCLEVBQXNDO0FBQ3BDLE1BQU1JLGlCQUFpQixHQUFHVCxpQkFBaUIsQ0FBQ1UsV0FBbEIsRUFBMUI7QUFBQSxNQUNNQyxJQUFJLEdBQUdGLGlCQUFpQixDQUFDRyxNQUFsQixFQURiO0FBR0FWLEVBQUFBLGNBQWMsQ0FBQ1MsSUFBRCxFQUFPLFVBQVNBLElBQVQsRUFBZTtBQUNsQyxRQUFNRSxrQkFBa0IsR0FBR1osa0JBQWtCLENBQUNhLFFBQW5CLENBQTRCSCxJQUE1QixDQUEzQjtBQUFBLFFBQ01JLE9BQU8sR0FBR0Ysa0JBQWtCLENBQUNHLFVBQW5CLEVBRGhCO0FBQUEsUUFFTUMsY0FBYyxHQUFHSixrQkFBa0IsQ0FBQ0ssaUJBQW5CLEVBRnZCO0FBQUEsUUFHQ0MsaUJBQWlCLEdBQUdOLGtCQUFrQixDQUFDTyxvQkFBbkIsRUFIckI7QUFLQWYsSUFBQUEsUUFBUSxDQUFDVSxPQUFELEVBQVVFLGNBQVYsRUFBMEJFLGlCQUExQixDQUFSO0FBQ0QsR0FQYSxDQUFkO0FBUUQiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHN1ZmZpY2llbnQgPSByZXF1aXJlKCdzdWZmaWNpZW50Jyk7XG5cbmNvbnN0IHBvc3RlciA9IHJlcXVpcmUoJy4uL3Bvc3RlcicpLFxuICAgICAgSW5pdGlhbGlzZVJlcXVlc3QgPSByZXF1aXJlKCcuLi9yZXF1ZXN0L2luaXRpYWxpc2UnKSxcbiAgICAgIEluaXRpYWxpc2VSZXNwb25zZSA9IHJlcXVpcmUoJy4uL3Jlc3BvbnNlL2luaXRpYWxpc2UnKTtcblxuY29uc3QgeyBpbml0aWFsaXNlUG9zdCB9ID0gcG9zdGVyLFxuICAgICAgeyBBc3luY2hyb25vdXNUYXNrIH0gPSBzdWZmaWNpZW50O1xuXG5jbGFzcyBJbml0aWFsaXNlVGFzayBleHRlbmRzIEFzeW5jaHJvbm91c1Rhc2sge1xuICBjb25zdHJ1Y3RvcihjYWxsYmFjaykge1xuICAgIHN1cGVyKGFzeW5jaHJvbm91c01ldGhvZCwgY2FsbGJhY2spXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBJbml0aWFsaXNlVGFzaztcblxuZnVuY3Rpb24gYXN5bmNocm9ub3VzTWV0aG9kKGNhbGxiYWNrKSB7XG4gIGNvbnN0IGluaXRpYWxpc2VSZXF1ZXN0ID0gSW5pdGlhbGlzZVJlcXVlc3QuZnJvbU5vdGhpbmcoKSxcbiAgICAgICAganNvbiA9IGluaXRpYWxpc2VSZXF1ZXN0LnRvSlNPTigpO1xuXG4gIGluaXRpYWxpc2VQb3N0KGpzb24sIGZ1bmN0aW9uKGpzb24pIHtcbiAgICBjb25zdCBpbml0aWFsaXNlUmVzcG9uc2UgPSBJbml0aWFsaXNlUmVzcG9uc2UuZnJvbUpTT04oanNvbiksXG4gICAgICAgICAgY29udGVudCA9IGluaXRpYWxpc2VSZXNwb25zZS5nZXRDb250ZW50KCksXG4gICAgICAgICAgdXNlcklkZW50aWZpZXIgPSBpbml0aWFsaXNlUmVzcG9uc2UuZ2V0VXNlcklkZW50aWZpZXIoKSxcblx0XHRcdFx0XHRzZXNzaW9uSWRlbnRpZmllciA9IGluaXRpYWxpc2VSZXNwb25zZS5nZXRTZXNzaW9uSWRlbnRpZmllcigpO1xuXG4gICAgY2FsbGJhY2soY29udGVudCwgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyKTtcbiAgfSk7XG59XG4iXX0=