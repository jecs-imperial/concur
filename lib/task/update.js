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
    UpdateRequest = require("../request/update"),
    UpdateResponse = require("../response/update"),
    generateOperations = require("../operations/generate");

var updatePost = poster.updatePost,
    AsynchronousTask = sufficient.AsynchronousTask;

var UpdateTask = /*#__PURE__*/function (_AsynchronousTask) {
  _inherits(UpdateTask, _AsynchronousTask);

  var _super = _createSuper(UpdateTask);

  function UpdateTask(userIdentifier, sessionIdentifier, workingContent, editableContent, callback) {
    _classCallCheck(this, UpdateTask);

    return _super.call(this, asynchronousMethod, userIdentifier, sessionIdentifier, workingContent, editableContent, callback);
  }

  return UpdateTask;
}(AsynchronousTask);

module.exports = UpdateTask;

function asynchronousMethod(userIdentifier, sessionIdentifier, workingContent, editableContent, callback) {
  var operations = generateOperations(workingContent, editableContent),
      updateRequest = UpdateRequest.fromOperationsUserIdentifierAndSessionIdentifier(operations, userIdentifier, sessionIdentifier),
      json = updateRequest.toJSON();
  updatePost(json, function (json) {
    var updateResponse = UpdateResponse.fromJSON(json),
        sessionExpired = updateResponse.getSessionExpired(),
        pendingOperations = updateResponse.getPendingOperations();
    callback(sessionExpired, pendingOperations);
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVwZGF0ZS5qcyJdLCJuYW1lcyI6WyJzdWZmaWNpZW50IiwicmVxdWlyZSIsInBvc3RlciIsIlVwZGF0ZVJlcXVlc3QiLCJVcGRhdGVSZXNwb25zZSIsImdlbmVyYXRlT3BlcmF0aW9ucyIsInVwZGF0ZVBvc3QiLCJBc3luY2hyb25vdXNUYXNrIiwiVXBkYXRlVGFzayIsInVzZXJJZGVudGlmaWVyIiwic2Vzc2lvbklkZW50aWZpZXIiLCJ3b3JraW5nQ29udGVudCIsImVkaXRhYmxlQ29udGVudCIsImNhbGxiYWNrIiwiYXN5bmNocm9ub3VzTWV0aG9kIiwibW9kdWxlIiwiZXhwb3J0cyIsIm9wZXJhdGlvbnMiLCJ1cGRhdGVSZXF1ZXN0IiwiZnJvbU9wZXJhdGlvbnNVc2VySWRlbnRpZmllckFuZFNlc3Npb25JZGVudGlmaWVyIiwianNvbiIsInRvSlNPTiIsInVwZGF0ZVJlc3BvbnNlIiwiZnJvbUpTT04iLCJzZXNzaW9uRXhwaXJlZCIsImdldFNlc3Npb25FeHBpcmVkIiwicGVuZGluZ09wZXJhdGlvbnMiLCJnZXRQZW5kaW5nT3BlcmF0aW9ucyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsVUFBVSxHQUFHQyxPQUFPLENBQUMsWUFBRCxDQUExQjs7QUFFQSxJQUFNQyxNQUFNLEdBQUdELE9BQU8sQ0FBQyxXQUFELENBQXRCO0FBQUEsSUFDTUUsYUFBYSxHQUFHRixPQUFPLENBQUMsbUJBQUQsQ0FEN0I7QUFBQSxJQUVNRyxjQUFjLEdBQUdILE9BQU8sQ0FBQyxvQkFBRCxDQUY5QjtBQUFBLElBR01JLGtCQUFrQixHQUFHSixPQUFPLENBQUMsd0JBQUQsQ0FIbEM7O0FBS00sSUFBRUssVUFBRixHQUFpQkosTUFBakIsQ0FBRUksVUFBRjtBQUFBLElBQ0VDLGdCQURGLEdBQ3VCUCxVQUR2QixDQUNFTyxnQkFERjs7SUFHQUMsVTs7Ozs7QUFDSixzQkFBWUMsY0FBWixFQUE0QkMsaUJBQTVCLEVBQStDQyxjQUEvQyxFQUErREMsZUFBL0QsRUFBZ0ZDLFFBQWhGLEVBQTBGO0FBQUE7O0FBQUEsNkJBQ2xGQyxrQkFEa0YsRUFDOURMLGNBRDhELEVBQzlDQyxpQkFEOEMsRUFDM0JDLGNBRDJCLEVBQ1hDLGVBRFcsRUFDTUMsUUFETjtBQUV6Rjs7O0VBSHNCTixnQjs7QUFNekJRLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQlIsVUFBakI7O0FBRUEsU0FBU00sa0JBQVQsQ0FBNEJMLGNBQTVCLEVBQTRDQyxpQkFBNUMsRUFBK0RDLGNBQS9ELEVBQStFQyxlQUEvRSxFQUFnR0MsUUFBaEcsRUFBMEc7QUFDeEcsTUFBTUksVUFBVSxHQUFHWixrQkFBa0IsQ0FBQ00sY0FBRCxFQUFpQkMsZUFBakIsQ0FBckM7QUFBQSxNQUNNTSxhQUFhLEdBQUdmLGFBQWEsQ0FBQ2dCLGdEQUFkLENBQStERixVQUEvRCxFQUEyRVIsY0FBM0UsRUFBMkZDLGlCQUEzRixDQUR0QjtBQUFBLE1BRU1VLElBQUksR0FBR0YsYUFBYSxDQUFDRyxNQUFkLEVBRmI7QUFJQWYsRUFBQUEsVUFBVSxDQUFDYyxJQUFELEVBQU8sVUFBU0EsSUFBVCxFQUFlO0FBQzlCLFFBQU1FLGNBQWMsR0FBR2xCLGNBQWMsQ0FBQ21CLFFBQWYsQ0FBd0JILElBQXhCLENBQXZCO0FBQUEsUUFDQ0ksY0FBYyxHQUFHRixjQUFjLENBQUNHLGlCQUFmLEVBRGxCO0FBQUEsUUFFTUMsaUJBQWlCLEdBQUdKLGNBQWMsQ0FBQ0ssb0JBQWYsRUFGMUI7QUFJQWQsSUFBQUEsUUFBUSxDQUFDVyxjQUFELEVBQWlCRSxpQkFBakIsQ0FBUjtBQUNELEdBTlMsQ0FBVjtBQU9EIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IHN1ZmZpY2llbnQgPSByZXF1aXJlKFwic3VmZmljaWVudFwiKTtcblxuY29uc3QgcG9zdGVyID0gcmVxdWlyZShcIi4uL3Bvc3RlclwiKSxcbiAgICAgIFVwZGF0ZVJlcXVlc3QgPSByZXF1aXJlKFwiLi4vcmVxdWVzdC91cGRhdGVcIiksXG4gICAgICBVcGRhdGVSZXNwb25zZSA9IHJlcXVpcmUoXCIuLi9yZXNwb25zZS91cGRhdGVcIiksXG4gICAgICBnZW5lcmF0ZU9wZXJhdGlvbnMgPSByZXF1aXJlKFwiLi4vb3BlcmF0aW9ucy9nZW5lcmF0ZVwiKTtcblxuY29uc3QgeyB1cGRhdGVQb3N0IH0gPSBwb3N0ZXIsXG4gICAgICB7IEFzeW5jaHJvbm91c1Rhc2sgfSA9IHN1ZmZpY2llbnQ7XG5cbmNsYXNzIFVwZGF0ZVRhc2sgZXh0ZW5kcyBBc3luY2hyb25vdXNUYXNrIHtcbiAgY29uc3RydWN0b3IodXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyLCB3b3JraW5nQ29udGVudCwgZWRpdGFibGVDb250ZW50LCBjYWxsYmFjaykge1xuICAgIHN1cGVyKGFzeW5jaHJvbm91c01ldGhvZCwgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyLCB3b3JraW5nQ29udGVudCwgZWRpdGFibGVDb250ZW50LCBjYWxsYmFjaylcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFVwZGF0ZVRhc2s7XG5cbmZ1bmN0aW9uIGFzeW5jaHJvbm91c01ldGhvZCh1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIsIHdvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnQsIGNhbGxiYWNrKSB7XG4gIGNvbnN0IG9wZXJhdGlvbnMgPSBnZW5lcmF0ZU9wZXJhdGlvbnMod29ya2luZ0NvbnRlbnQsIGVkaXRhYmxlQ29udGVudCksXG4gICAgICAgIHVwZGF0ZVJlcXVlc3QgPSBVcGRhdGVSZXF1ZXN0LmZyb21PcGVyYXRpb25zVXNlcklkZW50aWZpZXJBbmRTZXNzaW9uSWRlbnRpZmllcihvcGVyYXRpb25zLCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpLFxuICAgICAgICBqc29uID0gdXBkYXRlUmVxdWVzdC50b0pTT04oKTtcblxuICB1cGRhdGVQb3N0KGpzb24sIGZ1bmN0aW9uKGpzb24pIHtcbiAgICBjb25zdCB1cGRhdGVSZXNwb25zZSA9IFVwZGF0ZVJlc3BvbnNlLmZyb21KU09OKGpzb24pLFxuXHRcdFx0XHRcdHNlc3Npb25FeHBpcmVkID0gdXBkYXRlUmVzcG9uc2UuZ2V0U2Vzc2lvbkV4cGlyZWQoKSxcbiAgICAgICAgICBwZW5kaW5nT3BlcmF0aW9ucyA9IHVwZGF0ZVJlc3BvbnNlLmdldFBlbmRpbmdPcGVyYXRpb25zKCk7XG5cbiAgICBjYWxsYmFjayhzZXNzaW9uRXhwaXJlZCwgcGVuZGluZ09wZXJhdGlvbnMpO1xuICB9KTtcbn1cbiJdfQ==