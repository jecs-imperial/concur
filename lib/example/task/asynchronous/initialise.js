'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var sufficient = require('sufficient');

var poster = require('../../poster'),
    InitialiseRequest = require('../../request/initialise'),
    InitialiseResponse = require('../../response/initialise');

var initialisePost = poster.initialisePost,
    AsynchronousTask = sufficient.AsynchronousTask;

var InitialiseAsynchronousTask = function (_AsynchronousTask) {
  _inherits(InitialiseAsynchronousTask, _AsynchronousTask);

  function InitialiseAsynchronousTask(callback) {
    _classCallCheck(this, InitialiseAsynchronousTask);

    return _possibleConstructorReturn(this, (InitialiseAsynchronousTask.__proto__ || Object.getPrototypeOf(InitialiseAsynchronousTask)).call(this, asynchronousMethod, callback));
  }

  return InitialiseAsynchronousTask;
}(AsynchronousTask);

module.exports = InitialiseAsynchronousTask;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2VzNi9leGFtcGxlL3Rhc2svYXN5bmNocm9ub3VzL2luaXRpYWxpc2UuanMiXSwibmFtZXMiOlsic3VmZmljaWVudCIsInJlcXVpcmUiLCJwb3N0ZXIiLCJJbml0aWFsaXNlUmVxdWVzdCIsIkluaXRpYWxpc2VSZXNwb25zZSIsImluaXRpYWxpc2VQb3N0IiwiQXN5bmNocm9ub3VzVGFzayIsIkluaXRpYWxpc2VBc3luY2hyb25vdXNUYXNrIiwiY2FsbGJhY2siLCJhc3luY2hyb25vdXNNZXRob2QiLCJtb2R1bGUiLCJleHBvcnRzIiwiaW5pdGlhbGlzZVJlcXVlc3QiLCJmcm9tTm90aGluZyIsImpzb24iLCJ0b0pTT04iLCJpbml0aWFsaXNlUmVzcG9uc2UiLCJmcm9tSlNPTiIsImNvbnRlbnQiLCJnZXRDb250ZW50IiwidXNlcklkZW50aWZpZXIiLCJnZXRVc2VySWRlbnRpZmllciIsInNlc3Npb25JZGVudGlmaWVyIiwiZ2V0U2Vzc2lvbklkZW50aWZpZXIiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQUVBLElBQU1BLGFBQWFDLFFBQVEsWUFBUixDQUFuQjs7QUFFQSxJQUFNQyxTQUFTRCxRQUFRLGNBQVIsQ0FBZjtBQUFBLElBQ01FLG9CQUFvQkYsUUFBUSwwQkFBUixDQUQxQjtBQUFBLElBRU1HLHFCQUFxQkgsUUFBUSwyQkFBUixDQUYzQjs7QUFJTSxJQUFFSSxjQUFGLEdBQXFCSCxNQUFyQixDQUFFRyxjQUFGO0FBQUEsSUFDRUMsZ0JBREYsR0FDdUJOLFVBRHZCLENBQ0VNLGdCQURGOztJQUdBQywwQjs7O0FBQ0osc0NBQVlDLFFBQVosRUFBc0I7QUFBQTs7QUFBQSxtSkFDZEMsa0JBRGMsRUFDTUQsUUFETjtBQUVyQjs7O0VBSHNDRixnQjs7QUFNekNJLE9BQU9DLE9BQVAsR0FBaUJKLDBCQUFqQjs7QUFFQSxTQUFTRSxrQkFBVCxDQUE0QkQsUUFBNUIsRUFBc0M7QUFDcEMsTUFBTUksb0JBQW9CVCxrQkFBa0JVLFdBQWxCLEVBQTFCO0FBQUEsTUFDTUMsT0FBT0Ysa0JBQWtCRyxNQUFsQixFQURiOztBQUdBVixpQkFBZVMsSUFBZixFQUFxQixVQUFTQSxJQUFULEVBQWU7QUFDbEMsUUFBTUUscUJBQXFCWixtQkFBbUJhLFFBQW5CLENBQTRCSCxJQUE1QixDQUEzQjtBQUFBLFFBQ01JLFVBQVVGLG1CQUFtQkcsVUFBbkIsRUFEaEI7QUFBQSxRQUVNQyxpQkFBaUJKLG1CQUFtQkssaUJBQW5CLEVBRnZCO0FBQUEsUUFHQ0Msb0JBQW9CTixtQkFBbUJPLG9CQUFuQixFQUhyQjs7QUFLQWYsYUFBU1UsT0FBVCxFQUFrQkUsY0FBbEIsRUFBa0NFLGlCQUFsQztBQUNELEdBUEQ7QUFRRCIsImZpbGUiOiJpbml0aWFsaXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBzdWZmaWNpZW50ID0gcmVxdWlyZSgnc3VmZmljaWVudCcpO1xuXG5jb25zdCBwb3N0ZXIgPSByZXF1aXJlKCcuLi8uLi9wb3N0ZXInKSxcbiAgICAgIEluaXRpYWxpc2VSZXF1ZXN0ID0gcmVxdWlyZSgnLi4vLi4vcmVxdWVzdC9pbml0aWFsaXNlJyksXG4gICAgICBJbml0aWFsaXNlUmVzcG9uc2UgPSByZXF1aXJlKCcuLi8uLi9yZXNwb25zZS9pbml0aWFsaXNlJyk7XG5cbmNvbnN0IHsgaW5pdGlhbGlzZVBvc3QgfSA9IHBvc3RlcixcbiAgICAgIHsgQXN5bmNocm9ub3VzVGFzayB9ID0gc3VmZmljaWVudDtcblxuY2xhc3MgSW5pdGlhbGlzZUFzeW5jaHJvbm91c1Rhc2sgZXh0ZW5kcyBBc3luY2hyb25vdXNUYXNrIHtcbiAgY29uc3RydWN0b3IoY2FsbGJhY2spIHtcbiAgICBzdXBlcihhc3luY2hyb25vdXNNZXRob2QsIGNhbGxiYWNrKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSW5pdGlhbGlzZUFzeW5jaHJvbm91c1Rhc2s7XG5cbmZ1bmN0aW9uIGFzeW5jaHJvbm91c01ldGhvZChjYWxsYmFjaykge1xuICBjb25zdCBpbml0aWFsaXNlUmVxdWVzdCA9IEluaXRpYWxpc2VSZXF1ZXN0LmZyb21Ob3RoaW5nKCksXG4gICAgICAgIGpzb24gPSBpbml0aWFsaXNlUmVxdWVzdC50b0pTT04oKTtcblxuICBpbml0aWFsaXNlUG9zdChqc29uLCBmdW5jdGlvbihqc29uKSB7XG4gICAgY29uc3QgaW5pdGlhbGlzZVJlc3BvbnNlID0gSW5pdGlhbGlzZVJlc3BvbnNlLmZyb21KU09OKGpzb24pLFxuICAgICAgICAgIGNvbnRlbnQgPSBpbml0aWFsaXNlUmVzcG9uc2UuZ2V0Q29udGVudCgpLFxuICAgICAgICAgIHVzZXJJZGVudGlmaWVyID0gaW5pdGlhbGlzZVJlc3BvbnNlLmdldFVzZXJJZGVudGlmaWVyKCksXG5cdFx0XHRcdFx0c2Vzc2lvbklkZW50aWZpZXIgPSBpbml0aWFsaXNlUmVzcG9uc2UuZ2V0U2Vzc2lvbklkZW50aWZpZXIoKTtcblxuICAgIGNhbGxiYWNrKGNvbnRlbnQsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllcik7XG4gIH0pO1xufVxuIl19