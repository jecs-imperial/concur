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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi90YXNrL2luaXRpYWxpc2UuanMiXSwibmFtZXMiOlsic3VmZmljaWVudCIsInJlcXVpcmUiLCJwb3N0ZXIiLCJJbml0aWFsaXNlUmVxdWVzdCIsIkluaXRpYWxpc2VSZXNwb25zZSIsImluaXRpYWxpc2VQb3N0IiwiQXN5bmNocm9ub3VzVGFzayIsIkluaXRpYWxpc2VUYXNrIiwiY2FsbGJhY2siLCJhc3luY2hyb25vdXNNZXRob2QiLCJtb2R1bGUiLCJleHBvcnRzIiwiaW5pdGlhbGlzZVJlcXVlc3QiLCJmcm9tTm90aGluZyIsImpzb24iLCJ0b0pTT04iLCJpbml0aWFsaXNlUmVzcG9uc2UiLCJmcm9tSlNPTiIsImNvbnRlbnQiLCJnZXRDb250ZW50IiwidXNlcklkZW50aWZpZXIiLCJnZXRVc2VySWRlbnRpZmllciIsInNlc3Npb25JZGVudGlmaWVyIiwiZ2V0U2Vzc2lvbklkZW50aWZpZXIiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQUVBLElBQU1BLGFBQWFDLFFBQVEsWUFBUixDQUFuQjs7QUFFQSxJQUFNQyxTQUFTRCxRQUFRLFdBQVIsQ0FBZjtBQUFBLElBQ01FLG9CQUFvQkYsUUFBUSx1QkFBUixDQUQxQjtBQUFBLElBRU1HLHFCQUFxQkgsUUFBUSx3QkFBUixDQUYzQjs7QUFJTSxJQUFFSSxjQUFGLEdBQXFCSCxNQUFyQixDQUFFRyxjQUFGO0FBQUEsSUFDRUMsZ0JBREYsR0FDdUJOLFVBRHZCLENBQ0VNLGdCQURGOztJQUdBQyxjOzs7QUFDSiwwQkFBWUMsUUFBWixFQUFzQjtBQUFBOztBQUFBLDJIQUNkQyxrQkFEYyxFQUNNRCxRQUROO0FBRXJCOzs7RUFIMEJGLGdCOztBQU03QkksT0FBT0MsT0FBUCxHQUFpQkosY0FBakI7O0FBRUEsU0FBU0Usa0JBQVQsQ0FBNEJELFFBQTVCLEVBQXNDO0FBQ3BDLE1BQU1JLG9CQUFvQlQsa0JBQWtCVSxXQUFsQixFQUExQjtBQUFBLE1BQ01DLE9BQU9GLGtCQUFrQkcsTUFBbEIsRUFEYjs7QUFHQVYsaUJBQWVTLElBQWYsRUFBcUIsVUFBU0EsSUFBVCxFQUFlO0FBQ2xDLFFBQU1FLHFCQUFxQlosbUJBQW1CYSxRQUFuQixDQUE0QkgsSUFBNUIsQ0FBM0I7QUFBQSxRQUNNSSxVQUFVRixtQkFBbUJHLFVBQW5CLEVBRGhCO0FBQUEsUUFFTUMsaUJBQWlCSixtQkFBbUJLLGlCQUFuQixFQUZ2QjtBQUFBLFFBR0NDLG9CQUFvQk4sbUJBQW1CTyxvQkFBbkIsRUFIckI7O0FBS0FmLGFBQVNVLE9BQVQsRUFBa0JFLGNBQWxCLEVBQWtDRSxpQkFBbEM7QUFDRCxHQVBEO0FBUUQiLCJmaWxlIjoiaW5pdGlhbGlzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3Qgc3VmZmljaWVudCA9IHJlcXVpcmUoJ3N1ZmZpY2llbnQnKTtcblxuY29uc3QgcG9zdGVyID0gcmVxdWlyZSgnLi4vcG9zdGVyJyksXG4gICAgICBJbml0aWFsaXNlUmVxdWVzdCA9IHJlcXVpcmUoJy4uL3JlcXVlc3QvaW5pdGlhbGlzZScpLFxuICAgICAgSW5pdGlhbGlzZVJlc3BvbnNlID0gcmVxdWlyZSgnLi4vcmVzcG9uc2UvaW5pdGlhbGlzZScpO1xuXG5jb25zdCB7IGluaXRpYWxpc2VQb3N0IH0gPSBwb3N0ZXIsXG4gICAgICB7IEFzeW5jaHJvbm91c1Rhc2sgfSA9IHN1ZmZpY2llbnQ7XG5cbmNsYXNzIEluaXRpYWxpc2VUYXNrIGV4dGVuZHMgQXN5bmNocm9ub3VzVGFzayB7XG4gIGNvbnN0cnVjdG9yKGNhbGxiYWNrKSB7XG4gICAgc3VwZXIoYXN5bmNocm9ub3VzTWV0aG9kLCBjYWxsYmFjaylcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEluaXRpYWxpc2VUYXNrO1xuXG5mdW5jdGlvbiBhc3luY2hyb25vdXNNZXRob2QoY2FsbGJhY2spIHtcbiAgY29uc3QgaW5pdGlhbGlzZVJlcXVlc3QgPSBJbml0aWFsaXNlUmVxdWVzdC5mcm9tTm90aGluZygpLFxuICAgICAgICBqc29uID0gaW5pdGlhbGlzZVJlcXVlc3QudG9KU09OKCk7XG5cbiAgaW5pdGlhbGlzZVBvc3QoanNvbiwgZnVuY3Rpb24oanNvbikge1xuICAgIGNvbnN0IGluaXRpYWxpc2VSZXNwb25zZSA9IEluaXRpYWxpc2VSZXNwb25zZS5mcm9tSlNPTihqc29uKSxcbiAgICAgICAgICBjb250ZW50ID0gaW5pdGlhbGlzZVJlc3BvbnNlLmdldENvbnRlbnQoKSxcbiAgICAgICAgICB1c2VySWRlbnRpZmllciA9IGluaXRpYWxpc2VSZXNwb25zZS5nZXRVc2VySWRlbnRpZmllcigpLFxuXHRcdFx0XHRcdHNlc3Npb25JZGVudGlmaWVyID0gaW5pdGlhbGlzZVJlc3BvbnNlLmdldFNlc3Npb25JZGVudGlmaWVyKCk7XG5cbiAgICBjYWxsYmFjayhjb250ZW50LCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpO1xuICB9KTtcbn1cbiJdfQ==