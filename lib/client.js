'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sufficient = require('sufficient');

var UpdateAsynchronousTask = require('./task/asynchronous/update'),
    InitialiseAsynchronousTask = require('./task/asynchronous/initialise');

var Scheduler = sufficient.Scheduler;

var Client = function () {
  function Client(host, scheduler, userIdentifier) {
    _classCallCheck(this, Client);

    this.host = host;
    this.scheduler = scheduler;
    this.userIdentifier = userIdentifier;
  }

  _createClass(Client, [{
    key: 'update',
    value: function update(content, previousContent, callback) {
      var updateAsynchronousTask = new UpdateAsynchronousTask(this.host, this.userIdentifier, content, previousContent, function (pendingOperations) {
        callback(pendingOperations);
      }.bind(this));

      var success = this.scheduler.executeTaskImmediately(updateAsynchronousTask);

      return success;
    }
  }, {
    key: 'initialise',
    value: function initialise(done) {
      var initialiseAsynchronousTask = new InitialiseAsynchronousTask(this.host, function (userIdentifier) {
        this.userIdentifier = userIdentifier;

        done();
      }.bind(this));

      this.scheduler.addTaskToQueue(initialiseAsynchronousTask);
    }
  }], [{
    key: 'fromNothing',
    value: function fromNothing() {
      var host = '',
          ///
      scheduler = Scheduler.fromNothing(),
          userIdentifier = null,
          ///
      client = new Client(host, scheduler, userIdentifier);

      return client;
    }
  }]);

  return Client;
}();

var client = Client.fromNothing();

module.exports = client;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9jbGllbnQuanMiXSwibmFtZXMiOlsic3VmZmljaWVudCIsInJlcXVpcmUiLCJVcGRhdGVBc3luY2hyb25vdXNUYXNrIiwiSW5pdGlhbGlzZUFzeW5jaHJvbm91c1Rhc2siLCJTY2hlZHVsZXIiLCJDbGllbnQiLCJob3N0Iiwic2NoZWR1bGVyIiwidXNlcklkZW50aWZpZXIiLCJjb250ZW50IiwicHJldmlvdXNDb250ZW50IiwiY2FsbGJhY2siLCJ1cGRhdGVBc3luY2hyb25vdXNUYXNrIiwicGVuZGluZ09wZXJhdGlvbnMiLCJiaW5kIiwic3VjY2VzcyIsImV4ZWN1dGVUYXNrSW1tZWRpYXRlbHkiLCJkb25lIiwiaW5pdGlhbGlzZUFzeW5jaHJvbm91c1Rhc2siLCJhZGRUYXNrVG9RdWV1ZSIsImZyb21Ob3RoaW5nIiwiY2xpZW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBLElBQU1BLGFBQWFDLFFBQVEsWUFBUixDQUFuQjs7QUFFQSxJQUFNQyx5QkFBeUJELFFBQVEsNEJBQVIsQ0FBL0I7QUFBQSxJQUNNRSw2QkFBNkJGLFFBQVEsZ0NBQVIsQ0FEbkM7O0lBR1FHLFMsR0FBY0osVSxDQUFkSSxTOztJQUVGQyxNO0FBQ0osa0JBQVlDLElBQVosRUFBa0JDLFNBQWxCLEVBQTZCQyxjQUE3QixFQUE2QztBQUFBOztBQUMzQyxTQUFLRixJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLQyxTQUFMLEdBQWlCQSxTQUFqQjtBQUNBLFNBQUtDLGNBQUwsR0FBc0JBLGNBQXRCO0FBQ0Q7Ozs7MkJBRU1DLE8sRUFBU0MsZSxFQUFpQkMsUSxFQUFVO0FBQ3pDLFVBQU1DLHlCQUF5QixJQUFJVixzQkFBSixDQUEyQixLQUFLSSxJQUFoQyxFQUFzQyxLQUFLRSxjQUEzQyxFQUEyREMsT0FBM0QsRUFBb0VDLGVBQXBFLEVBQXFGLFVBQVNHLGlCQUFULEVBQTRCO0FBQzlJRixpQkFBU0UsaUJBQVQ7QUFDRCxPQUZtSCxDQUVsSEMsSUFGa0gsQ0FFN0csSUFGNkcsQ0FBckYsQ0FBL0I7O0FBSUEsVUFBTUMsVUFBVSxLQUFLUixTQUFMLENBQWVTLHNCQUFmLENBQXNDSixzQkFBdEMsQ0FBaEI7O0FBRUEsYUFBT0csT0FBUDtBQUNEOzs7K0JBRVVFLEksRUFBTTtBQUNmLFVBQU1DLDZCQUE2QixJQUFJZiwwQkFBSixDQUErQixLQUFLRyxJQUFwQyxFQUEwQyxVQUFTRSxjQUFULEVBQXlCO0FBQ3BHLGFBQUtBLGNBQUwsR0FBc0JBLGNBQXRCOztBQUVBUztBQUNELE9BSjRFLENBSTNFSCxJQUoyRSxDQUl0RSxJQUpzRSxDQUExQyxDQUFuQzs7QUFNQSxXQUFLUCxTQUFMLENBQWVZLGNBQWYsQ0FBOEJELDBCQUE5QjtBQUNEOzs7a0NBRW9CO0FBQ25CLFVBQU1aLE9BQU8sRUFBYjtBQUFBLFVBQWtCO0FBQ1pDLGtCQUFZSCxVQUFVZ0IsV0FBVixFQURsQjtBQUFBLFVBRU1aLGlCQUFpQixJQUZ2QjtBQUFBLFVBRThCO0FBQ3hCYSxlQUFTLElBQUloQixNQUFKLENBQVdDLElBQVgsRUFBaUJDLFNBQWpCLEVBQTRCQyxjQUE1QixDQUhmOztBQUtBLGFBQU9hLE1BQVA7QUFDRDs7Ozs7O0FBR0gsSUFBTUEsU0FBU2hCLE9BQU9lLFdBQVAsRUFBZjs7QUFFQUUsT0FBT0MsT0FBUCxHQUFpQkYsTUFBakIiLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBzdWZmaWNpZW50ID0gcmVxdWlyZSgnc3VmZmljaWVudCcpO1xuXG5jb25zdCBVcGRhdGVBc3luY2hyb25vdXNUYXNrID0gcmVxdWlyZSgnLi90YXNrL2FzeW5jaHJvbm91cy91cGRhdGUnKSxcbiAgICAgIEluaXRpYWxpc2VBc3luY2hyb25vdXNUYXNrID0gcmVxdWlyZSgnLi90YXNrL2FzeW5jaHJvbm91cy9pbml0aWFsaXNlJyk7XG5cbmNvbnN0IHsgU2NoZWR1bGVyIH0gPSBzdWZmaWNpZW50O1xuXG5jbGFzcyBDbGllbnQge1xuICBjb25zdHJ1Y3Rvcihob3N0LCBzY2hlZHVsZXIsIHVzZXJJZGVudGlmaWVyKSB7XG4gICAgdGhpcy5ob3N0ID0gaG9zdDtcbiAgICB0aGlzLnNjaGVkdWxlciA9IHNjaGVkdWxlcjtcbiAgICB0aGlzLnVzZXJJZGVudGlmaWVyID0gdXNlcklkZW50aWZpZXI7XG4gIH1cblxuICB1cGRhdGUoY29udGVudCwgcHJldmlvdXNDb250ZW50LCBjYWxsYmFjaykge1xuICAgIGNvbnN0IHVwZGF0ZUFzeW5jaHJvbm91c1Rhc2sgPSBuZXcgVXBkYXRlQXN5bmNocm9ub3VzVGFzayh0aGlzLmhvc3QsIHRoaXMudXNlcklkZW50aWZpZXIsIGNvbnRlbnQsIHByZXZpb3VzQ29udGVudCwgZnVuY3Rpb24ocGVuZGluZ09wZXJhdGlvbnMpIHtcbiAgICAgIGNhbGxiYWNrKHBlbmRpbmdPcGVyYXRpb25zKVxuICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICBjb25zdCBzdWNjZXNzID0gdGhpcy5zY2hlZHVsZXIuZXhlY3V0ZVRhc2tJbW1lZGlhdGVseSh1cGRhdGVBc3luY2hyb25vdXNUYXNrKTtcblxuICAgIHJldHVybiBzdWNjZXNzO1xuICB9XG5cbiAgaW5pdGlhbGlzZShkb25lKSB7XG4gICAgY29uc3QgaW5pdGlhbGlzZUFzeW5jaHJvbm91c1Rhc2sgPSBuZXcgSW5pdGlhbGlzZUFzeW5jaHJvbm91c1Rhc2sodGhpcy5ob3N0LCBmdW5jdGlvbih1c2VySWRlbnRpZmllcikge1xuICAgICAgdGhpcy51c2VySWRlbnRpZmllciA9IHVzZXJJZGVudGlmaWVyO1xuXG4gICAgICBkb25lKCk7XG4gICAgfS5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMuc2NoZWR1bGVyLmFkZFRhc2tUb1F1ZXVlKGluaXRpYWxpc2VBc3luY2hyb25vdXNUYXNrKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tTm90aGluZygpIHtcbiAgICBjb25zdCBob3N0ID0gJycsICAvLy9cbiAgICAgICAgICBzY2hlZHVsZXIgPSBTY2hlZHVsZXIuZnJvbU5vdGhpbmcoKSxcbiAgICAgICAgICB1c2VySWRlbnRpZmllciA9IG51bGwsICAvLy9cbiAgICAgICAgICBjbGllbnQgPSBuZXcgQ2xpZW50KGhvc3QsIHNjaGVkdWxlciwgdXNlcklkZW50aWZpZXIpO1xuXG4gICAgcmV0dXJuIGNsaWVudDtcbiAgfVxufVxuXG5jb25zdCBjbGllbnQgPSBDbGllbnQuZnJvbU5vdGhpbmcoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGllbnQ7XG4iXX0=