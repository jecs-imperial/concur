'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var sufficient = require('sufficient');

var post = require('../../post'),
    InitialiseRequest = require('../../request/initialise'),
    InitialiseResponse = require('../../response/initialise');

var postInitialise = post.postInitialise,
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

  postInitialise(json, function (json) {
    var initialiseResponse = InitialiseResponse.fromJSON(json),
        content = initialiseResponse.getContent(),
        userIdentifier = initialiseResponse.getUserIdentifier(),
        sessionIdentifier = initialiseResponse.getSessionIdentifier();

    callback(content, userIdentifier, sessionIdentifier);
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2VzNi9leGFtcGxlL3Rhc2svYXN5bmNocm9ub3VzL2luaXRpYWxpc2UuanMiXSwibmFtZXMiOlsic3VmZmljaWVudCIsInJlcXVpcmUiLCJwb3N0IiwiSW5pdGlhbGlzZVJlcXVlc3QiLCJJbml0aWFsaXNlUmVzcG9uc2UiLCJwb3N0SW5pdGlhbGlzZSIsIkFzeW5jaHJvbm91c1Rhc2siLCJJbml0aWFsaXNlQXN5bmNocm9ub3VzVGFzayIsImNhbGxiYWNrIiwiYXN5bmNocm9ub3VzTWV0aG9kIiwibW9kdWxlIiwiZXhwb3J0cyIsImluaXRpYWxpc2VSZXF1ZXN0IiwiZnJvbU5vdGhpbmciLCJqc29uIiwidG9KU09OIiwiaW5pdGlhbGlzZVJlc3BvbnNlIiwiZnJvbUpTT04iLCJjb250ZW50IiwiZ2V0Q29udGVudCIsInVzZXJJZGVudGlmaWVyIiwiZ2V0VXNlcklkZW50aWZpZXIiLCJzZXNzaW9uSWRlbnRpZmllciIsImdldFNlc3Npb25JZGVudGlmaWVyIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFFQSxJQUFNQSxhQUFhQyxRQUFRLFlBQVIsQ0FBbkI7O0FBRUEsSUFBTUMsT0FBT0QsUUFBUSxZQUFSLENBQWI7QUFBQSxJQUNNRSxvQkFBb0JGLFFBQVEsMEJBQVIsQ0FEMUI7QUFBQSxJQUVNRyxxQkFBcUJILFFBQVEsMkJBQVIsQ0FGM0I7O0FBSU0sSUFBRUksY0FBRixHQUFxQkgsSUFBckIsQ0FBRUcsY0FBRjtBQUFBLElBQ0VDLGdCQURGLEdBQ3VCTixVQUR2QixDQUNFTSxnQkFERjs7SUFHQUMsMEI7OztBQUNKLHNDQUFZQyxRQUFaLEVBQXNCO0FBQUE7O0FBQUEsbUpBQ2RDLGtCQURjLEVBQ01ELFFBRE47QUFFckI7OztFQUhzQ0YsZ0I7O0FBTXpDSSxPQUFPQyxPQUFQLEdBQWlCSiwwQkFBakI7O0FBRUEsU0FBU0Usa0JBQVQsQ0FBNEJELFFBQTVCLEVBQXNDO0FBQ3BDLE1BQU1JLG9CQUFvQlQsa0JBQWtCVSxXQUFsQixFQUExQjtBQUFBLE1BQ01DLE9BQU9GLGtCQUFrQkcsTUFBbEIsRUFEYjs7QUFHQVYsaUJBQWVTLElBQWYsRUFBcUIsVUFBU0EsSUFBVCxFQUFlO0FBQ2xDLFFBQU1FLHFCQUFxQlosbUJBQW1CYSxRQUFuQixDQUE0QkgsSUFBNUIsQ0FBM0I7QUFBQSxRQUNNSSxVQUFVRixtQkFBbUJHLFVBQW5CLEVBRGhCO0FBQUEsUUFFTUMsaUJBQWlCSixtQkFBbUJLLGlCQUFuQixFQUZ2QjtBQUFBLFFBR0NDLG9CQUFvQk4sbUJBQW1CTyxvQkFBbkIsRUFIckI7O0FBS0FmLGFBQVNVLE9BQVQsRUFBa0JFLGNBQWxCLEVBQWtDRSxpQkFBbEM7QUFDRCxHQVBEO0FBUUQiLCJmaWxlIjoiaW5pdGlhbGlzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3Qgc3VmZmljaWVudCA9IHJlcXVpcmUoJ3N1ZmZpY2llbnQnKTtcblxuY29uc3QgcG9zdCA9IHJlcXVpcmUoJy4uLy4uL3Bvc3QnKSxcbiAgICAgIEluaXRpYWxpc2VSZXF1ZXN0ID0gcmVxdWlyZSgnLi4vLi4vcmVxdWVzdC9pbml0aWFsaXNlJyksXG4gICAgICBJbml0aWFsaXNlUmVzcG9uc2UgPSByZXF1aXJlKCcuLi8uLi9yZXNwb25zZS9pbml0aWFsaXNlJyk7XG5cbmNvbnN0IHsgcG9zdEluaXRpYWxpc2UgfSA9IHBvc3QsXG4gICAgICB7IEFzeW5jaHJvbm91c1Rhc2sgfSA9IHN1ZmZpY2llbnQ7XG5cbmNsYXNzIEluaXRpYWxpc2VBc3luY2hyb25vdXNUYXNrIGV4dGVuZHMgQXN5bmNocm9ub3VzVGFzayB7XG4gIGNvbnN0cnVjdG9yKGNhbGxiYWNrKSB7XG4gICAgc3VwZXIoYXN5bmNocm9ub3VzTWV0aG9kLCBjYWxsYmFjaylcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEluaXRpYWxpc2VBc3luY2hyb25vdXNUYXNrO1xuXG5mdW5jdGlvbiBhc3luY2hyb25vdXNNZXRob2QoY2FsbGJhY2spIHtcbiAgY29uc3QgaW5pdGlhbGlzZVJlcXVlc3QgPSBJbml0aWFsaXNlUmVxdWVzdC5mcm9tTm90aGluZygpLFxuICAgICAgICBqc29uID0gaW5pdGlhbGlzZVJlcXVlc3QudG9KU09OKCk7XG5cbiAgcG9zdEluaXRpYWxpc2UoanNvbiwgZnVuY3Rpb24oanNvbikge1xuICAgIGNvbnN0IGluaXRpYWxpc2VSZXNwb25zZSA9IEluaXRpYWxpc2VSZXNwb25zZS5mcm9tSlNPTihqc29uKSxcbiAgICAgICAgICBjb250ZW50ID0gaW5pdGlhbGlzZVJlc3BvbnNlLmdldENvbnRlbnQoKSxcbiAgICAgICAgICB1c2VySWRlbnRpZmllciA9IGluaXRpYWxpc2VSZXNwb25zZS5nZXRVc2VySWRlbnRpZmllcigpLFxuXHRcdFx0XHRcdHNlc3Npb25JZGVudGlmaWVyID0gaW5pdGlhbGlzZVJlc3BvbnNlLmdldFNlc3Npb25JZGVudGlmaWVyKCk7XG5cbiAgICBjYWxsYmFjayhjb250ZW50LCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpO1xuICB9KTtcbn1cbiJdfQ==