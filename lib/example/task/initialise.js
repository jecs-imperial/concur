'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var sufficient = require('sufficient');

var poster = require('../poster'),
    InitialiseRequest = require('../request/initialise'),
    InitialiseResponse = require('../response/initialise');

var initialisePost = poster.initialisePost,
    AsynchronousTask = sufficient.AsynchronousTask;

var InitialiseTask = function (_AsynchronousTask) {
  _inherits(InitialiseTask, _AsynchronousTask);

  function InitialiseTask(callback) {
    _classCallCheck(this, InitialiseTask);

    return _possibleConstructorReturn(this, (InitialiseTask.__proto__ || Object.getPrototypeOf(InitialiseTask)).call(this, asynchronousMethod, callback));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leGFtcGxlL3Rhc2svaW5pdGlhbGlzZS5qcyJdLCJuYW1lcyI6WyJzdWZmaWNpZW50IiwicmVxdWlyZSIsInBvc3RlciIsIkluaXRpYWxpc2VSZXF1ZXN0IiwiSW5pdGlhbGlzZVJlc3BvbnNlIiwiaW5pdGlhbGlzZVBvc3QiLCJBc3luY2hyb25vdXNUYXNrIiwiSW5pdGlhbGlzZVRhc2siLCJjYWxsYmFjayIsImFzeW5jaHJvbm91c01ldGhvZCIsIm1vZHVsZSIsImV4cG9ydHMiLCJpbml0aWFsaXNlUmVxdWVzdCIsImZyb21Ob3RoaW5nIiwianNvbiIsInRvSlNPTiIsImluaXRpYWxpc2VSZXNwb25zZSIsImZyb21KU09OIiwiY29udGVudCIsImdldENvbnRlbnQiLCJ1c2VySWRlbnRpZmllciIsImdldFVzZXJJZGVudGlmaWVyIiwic2Vzc2lvbklkZW50aWZpZXIiLCJnZXRTZXNzaW9uSWRlbnRpZmllciJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBRUEsSUFBTUEsYUFBYUMsUUFBUSxZQUFSLENBQW5COztBQUVBLElBQU1DLFNBQVNELFFBQVEsV0FBUixDQUFmO0FBQUEsSUFDTUUsb0JBQW9CRixRQUFRLHVCQUFSLENBRDFCO0FBQUEsSUFFTUcscUJBQXFCSCxRQUFRLHdCQUFSLENBRjNCOztBQUlNLElBQUVJLGNBQUYsR0FBcUJILE1BQXJCLENBQUVHLGNBQUY7QUFBQSxJQUNFQyxnQkFERixHQUN1Qk4sVUFEdkIsQ0FDRU0sZ0JBREY7O0lBR0FDLGM7OztBQUNKLDBCQUFZQyxRQUFaLEVBQXNCO0FBQUE7O0FBQUEsMkhBQ2RDLGtCQURjLEVBQ01ELFFBRE47QUFFckI7OztFQUgwQkYsZ0I7O0FBTTdCSSxPQUFPQyxPQUFQLEdBQWlCSixjQUFqQjs7QUFFQSxTQUFTRSxrQkFBVCxDQUE0QkQsUUFBNUIsRUFBc0M7QUFDcEMsTUFBTUksb0JBQW9CVCxrQkFBa0JVLFdBQWxCLEVBQTFCO0FBQUEsTUFDTUMsT0FBT0Ysa0JBQWtCRyxNQUFsQixFQURiOztBQUdBVixpQkFBZVMsSUFBZixFQUFxQixVQUFTQSxJQUFULEVBQWU7QUFDbEMsUUFBTUUscUJBQXFCWixtQkFBbUJhLFFBQW5CLENBQTRCSCxJQUE1QixDQUEzQjtBQUFBLFFBQ01JLFVBQVVGLG1CQUFtQkcsVUFBbkIsRUFEaEI7QUFBQSxRQUVNQyxpQkFBaUJKLG1CQUFtQkssaUJBQW5CLEVBRnZCO0FBQUEsUUFHQ0Msb0JBQW9CTixtQkFBbUJPLG9CQUFuQixFQUhyQjs7QUFLQWYsYUFBU1UsT0FBVCxFQUFrQkUsY0FBbEIsRUFBa0NFLGlCQUFsQztBQUNELEdBUEQ7QUFRRCIsImZpbGUiOiJpbml0aWFsaXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBzdWZmaWNpZW50ID0gcmVxdWlyZSgnc3VmZmljaWVudCcpO1xuXG5jb25zdCBwb3N0ZXIgPSByZXF1aXJlKCcuLi9wb3N0ZXInKSxcbiAgICAgIEluaXRpYWxpc2VSZXF1ZXN0ID0gcmVxdWlyZSgnLi4vcmVxdWVzdC9pbml0aWFsaXNlJyksXG4gICAgICBJbml0aWFsaXNlUmVzcG9uc2UgPSByZXF1aXJlKCcuLi9yZXNwb25zZS9pbml0aWFsaXNlJyk7XG5cbmNvbnN0IHsgaW5pdGlhbGlzZVBvc3QgfSA9IHBvc3RlcixcbiAgICAgIHsgQXN5bmNocm9ub3VzVGFzayB9ID0gc3VmZmljaWVudDtcblxuY2xhc3MgSW5pdGlhbGlzZVRhc2sgZXh0ZW5kcyBBc3luY2hyb25vdXNUYXNrIHtcbiAgY29uc3RydWN0b3IoY2FsbGJhY2spIHtcbiAgICBzdXBlcihhc3luY2hyb25vdXNNZXRob2QsIGNhbGxiYWNrKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSW5pdGlhbGlzZVRhc2s7XG5cbmZ1bmN0aW9uIGFzeW5jaHJvbm91c01ldGhvZChjYWxsYmFjaykge1xuICBjb25zdCBpbml0aWFsaXNlUmVxdWVzdCA9IEluaXRpYWxpc2VSZXF1ZXN0LmZyb21Ob3RoaW5nKCksXG4gICAgICAgIGpzb24gPSBpbml0aWFsaXNlUmVxdWVzdC50b0pTT04oKTtcblxuICBpbml0aWFsaXNlUG9zdChqc29uLCBmdW5jdGlvbihqc29uKSB7XG4gICAgY29uc3QgaW5pdGlhbGlzZVJlc3BvbnNlID0gSW5pdGlhbGlzZVJlc3BvbnNlLmZyb21KU09OKGpzb24pLFxuICAgICAgICAgIGNvbnRlbnQgPSBpbml0aWFsaXNlUmVzcG9uc2UuZ2V0Q29udGVudCgpLFxuICAgICAgICAgIHVzZXJJZGVudGlmaWVyID0gaW5pdGlhbGlzZVJlc3BvbnNlLmdldFVzZXJJZGVudGlmaWVyKCksXG5cdFx0XHRcdFx0c2Vzc2lvbklkZW50aWZpZXIgPSBpbml0aWFsaXNlUmVzcG9uc2UuZ2V0U2Vzc2lvbklkZW50aWZpZXIoKTtcblxuICAgIGNhbGxiYWNrKGNvbnRlbnQsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllcik7XG4gIH0pO1xufVxuIl19