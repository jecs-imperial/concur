'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = require('./client'),
    constants = require('./constants');

var UPDATE_DELAY = constants.UPDATE_DELAY;

var Agent = function () {
  function Agent(client, timeout, document, userIdentifier, sessionIdentifier) {
    _classCallCheck(this, Agent);

    this.client = client;
    this.timeout = timeout;
    this.document = document;
    this.userIdentifier = userIdentifier;
    this.sessionIdentifier = sessionIdentifier;
  }

  _createClass(Agent, [{
    key: 'initialise',
    value: function initialise(callback) {
      this.client.initialise(function (content, userIdentifier, sessionIdentifier) {
        this.userIdentifier = userIdentifier;
        this.sessionIdentifier = sessionIdentifier;

        callback(content);
      }.bind(this));
    }
  }, {
    key: 'setDocument',
    value: function setDocument(document) {
      this.document = document;
    }
  }, {
    key: 'startUpdates',
    value: function startUpdates() {
      var immediately = false;

      this.scheduleUpdate(immediately);
    }
  }, {
    key: 'scheduleUpdate',
    value: function scheduleUpdate(immediately) {
      var _this = this;

      var delay = immediately ? 0 : ///
      UPDATE_DELAY;

      if (this.timeout !== null) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(function () {
        return _this.update();
      }, delay);
    }
  }, {
    key: 'updateDocument',
    value: function updateDocument(pendingOperations) {
      var upToDate = this.document.update(pendingOperations),
          immediately = !upToDate;

      this.scheduleUpdate(immediately);
    }
  }, {
    key: 'update',
    value: function update() {
      var _this2 = this;

      var workingContent = this.document.getWorkingContent(),
          editableContent = this.document.getEditableContent();

      var success = this.client.update(this.userIdentifier, workingContent, editableContent, function (pendingOperations) {
        return _this2.updateDocument(pendingOperations);
      });

      if (success) {
        this.document.synchroniseWorkingContent();
      }
    }
  }], [{
    key: 'fromNothing',
    value: function fromNothing() {
      var client = Client.fromNothing(),
          timeout = null,
          ///
      document = null,
          ///
      userIdentifier = null,
          ///
      sessionIdentifier = null,
          ///
      agent = new Agent(client, timeout, document, userIdentifier, sessionIdentifier);

      return agent;
    }
  }]);

  return Agent;
}();

module.exports = Agent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leGFtcGxlL2FnZW50LmpzIl0sIm5hbWVzIjpbIkNsaWVudCIsInJlcXVpcmUiLCJjb25zdGFudHMiLCJVUERBVEVfREVMQVkiLCJBZ2VudCIsImNsaWVudCIsInRpbWVvdXQiLCJkb2N1bWVudCIsInVzZXJJZGVudGlmaWVyIiwic2Vzc2lvbklkZW50aWZpZXIiLCJjYWxsYmFjayIsImluaXRpYWxpc2UiLCJjb250ZW50IiwiYmluZCIsImltbWVkaWF0ZWx5Iiwic2NoZWR1bGVVcGRhdGUiLCJkZWxheSIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJ1cGRhdGUiLCJwZW5kaW5nT3BlcmF0aW9ucyIsInVwVG9EYXRlIiwid29ya2luZ0NvbnRlbnQiLCJnZXRXb3JraW5nQ29udGVudCIsImVkaXRhYmxlQ29udGVudCIsImdldEVkaXRhYmxlQ29udGVudCIsInN1Y2Nlc3MiLCJ1cGRhdGVEb2N1bWVudCIsInN5bmNocm9uaXNlV29ya2luZ0NvbnRlbnQiLCJmcm9tTm90aGluZyIsImFnZW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBLElBQU1BLFNBQVNDLFFBQVEsVUFBUixDQUFmO0FBQUEsSUFDTUMsWUFBWUQsUUFBUSxhQUFSLENBRGxCOztJQUdRRSxZLEdBQWlCRCxTLENBQWpCQyxZOztJQUVGQyxLO0FBQ0osaUJBQVlDLE1BQVosRUFBb0JDLE9BQXBCLEVBQTZCQyxRQUE3QixFQUF1Q0MsY0FBdkMsRUFBdURDLGlCQUF2RCxFQUEwRTtBQUFBOztBQUN4RSxTQUFLSixNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLQyxPQUFMLEdBQWVBLE9BQWY7QUFDQSxTQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtDLGNBQUwsR0FBc0JBLGNBQXRCO0FBQ0EsU0FBS0MsaUJBQUwsR0FBeUJBLGlCQUF6QjtBQUNEOzs7OytCQUVVQyxRLEVBQVU7QUFDbkIsV0FBS0wsTUFBTCxDQUFZTSxVQUFaLENBQXVCLFVBQVNDLE9BQVQsRUFBa0JKLGNBQWxCLEVBQWtDQyxpQkFBbEMsRUFBcUQ7QUFDMUUsYUFBS0QsY0FBTCxHQUFzQkEsY0FBdEI7QUFDQSxhQUFLQyxpQkFBTCxHQUF5QkEsaUJBQXpCOztBQUVBQyxpQkFBU0UsT0FBVDtBQUNELE9BTHNCLENBS3JCQyxJQUxxQixDQUtoQixJQUxnQixDQUF2QjtBQU1EOzs7Z0NBRVdOLFEsRUFBVTtBQUNwQixXQUFLQSxRQUFMLEdBQWdCQSxRQUFoQjtBQUNEOzs7bUNBRWM7QUFDYixVQUFNTyxjQUFjLEtBQXBCOztBQUVBLFdBQUtDLGNBQUwsQ0FBb0JELFdBQXBCO0FBQ0Q7OzttQ0FFY0EsVyxFQUFhO0FBQUE7O0FBQzFCLFVBQU1FLFFBQVFGLGNBQ0UsQ0FERixHQUNNO0FBQ0ZYLGtCQUZsQjs7QUFJQSxVQUFJLEtBQUtHLE9BQUwsS0FBaUIsSUFBckIsRUFBMkI7QUFDekJXLHFCQUFhLEtBQUtYLE9BQWxCO0FBQ0Q7O0FBRUQsV0FBS0EsT0FBTCxHQUFlWSxXQUFXO0FBQUEsZUFBTSxNQUFLQyxNQUFMLEVBQU47QUFBQSxPQUFYLEVBQWdDSCxLQUFoQyxDQUFmO0FBQ0Q7OzttQ0FFY0ksaUIsRUFBbUI7QUFDaEMsVUFBTUMsV0FBVyxLQUFLZCxRQUFMLENBQWNZLE1BQWQsQ0FBcUJDLGlCQUFyQixDQUFqQjtBQUFBLFVBQ01OLGNBQWMsQ0FBQ08sUUFEckI7O0FBR0EsV0FBS04sY0FBTCxDQUFvQkQsV0FBcEI7QUFDRDs7OzZCQUVRO0FBQUE7O0FBQ1AsVUFBTVEsaUJBQWlCLEtBQUtmLFFBQUwsQ0FBY2dCLGlCQUFkLEVBQXZCO0FBQUEsVUFDTUMsa0JBQWtCLEtBQUtqQixRQUFMLENBQWNrQixrQkFBZCxFQUR4Qjs7QUFHQSxVQUFNQyxVQUFVLEtBQUtyQixNQUFMLENBQVljLE1BQVosQ0FBbUIsS0FBS1gsY0FBeEIsRUFBd0NjLGNBQXhDLEVBQXdERSxlQUF4RCxFQUF5RTtBQUFBLGVBQXFCLE9BQUtHLGNBQUwsQ0FBb0JQLGlCQUFwQixDQUFyQjtBQUFBLE9BQXpFLENBQWhCOztBQUVBLFVBQUlNLE9BQUosRUFBYTtBQUNYLGFBQUtuQixRQUFMLENBQWNxQix5QkFBZDtBQUNEO0FBQ0Y7OztrQ0FFb0I7QUFDbkIsVUFBTXZCLFNBQVNMLE9BQU82QixXQUFQLEVBQWY7QUFBQSxVQUNNdkIsVUFBVSxJQURoQjtBQUFBLFVBQ3NCO0FBQ2hCQyxpQkFBVyxJQUZqQjtBQUFBLFVBRXdCO0FBQ2xCQyx1QkFBaUIsSUFIdkI7QUFBQSxVQUc4QjtBQUM3QkMsMEJBQW9CLElBSnJCO0FBQUEsVUFJMkI7QUFDckJxQixjQUFRLElBQUkxQixLQUFKLENBQVVDLE1BQVYsRUFBa0JDLE9BQWxCLEVBQTJCQyxRQUEzQixFQUFxQ0MsY0FBckMsRUFBcURDLGlCQUFyRCxDQUxkOztBQU9BLGFBQU9xQixLQUFQO0FBQ0Q7Ozs7OztBQUdIQyxPQUFPQyxPQUFQLEdBQWlCNUIsS0FBakIiLCJmaWxlIjoiYWdlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IENsaWVudCA9IHJlcXVpcmUoJy4vY2xpZW50JyksXG4gICAgICBjb25zdGFudHMgPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuXG5jb25zdCB7IFVQREFURV9ERUxBWSB9ID0gY29uc3RhbnRzO1xuXG5jbGFzcyBBZ2VudCB7XG4gIGNvbnN0cnVjdG9yKGNsaWVudCwgdGltZW91dCwgZG9jdW1lbnQsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllcikge1xuICAgIHRoaXMuY2xpZW50ID0gY2xpZW50O1xuICAgIHRoaXMudGltZW91dCA9IHRpbWVvdXQ7XG4gICAgdGhpcy5kb2N1bWVudCA9IGRvY3VtZW50O1xuICAgIHRoaXMudXNlcklkZW50aWZpZXIgPSB1c2VySWRlbnRpZmllcjtcbiAgICB0aGlzLnNlc3Npb25JZGVudGlmaWVyID0gc2Vzc2lvbklkZW50aWZpZXI7XG4gIH1cblxuICBpbml0aWFsaXNlKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5jbGllbnQuaW5pdGlhbGlzZShmdW5jdGlvbihjb250ZW50LCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpIHtcbiAgICAgIHRoaXMudXNlcklkZW50aWZpZXIgPSB1c2VySWRlbnRpZmllcjtcbiAgICAgIHRoaXMuc2Vzc2lvbklkZW50aWZpZXIgPSBzZXNzaW9uSWRlbnRpZmllcjtcblxuICAgICAgY2FsbGJhY2soY29udGVudCk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHNldERvY3VtZW50KGRvY3VtZW50KSB7XG4gICAgdGhpcy5kb2N1bWVudCA9IGRvY3VtZW50O1xuICB9XG5cbiAgc3RhcnRVcGRhdGVzKCkge1xuICAgIGNvbnN0IGltbWVkaWF0ZWx5ID0gZmFsc2U7XG5cbiAgICB0aGlzLnNjaGVkdWxlVXBkYXRlKGltbWVkaWF0ZWx5KTtcbiAgfVxuXG4gIHNjaGVkdWxlVXBkYXRlKGltbWVkaWF0ZWx5KSB7XG4gICAgY29uc3QgZGVsYXkgPSBpbW1lZGlhdGVseSA/XG4gICAgICAgICAgICAgICAgICAgIDAgOiAvLy9cbiAgICAgICAgICAgICAgICAgICAgICBVUERBVEVfREVMQVk7XG5cbiAgICBpZiAodGhpcy50aW1lb3V0ICE9PSBudWxsKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICB9XG5cbiAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlKCksIGRlbGF5KTtcbiAgfVxuXG4gIHVwZGF0ZURvY3VtZW50KHBlbmRpbmdPcGVyYXRpb25zKSB7XG4gICAgY29uc3QgdXBUb0RhdGUgPSB0aGlzLmRvY3VtZW50LnVwZGF0ZShwZW5kaW5nT3BlcmF0aW9ucyksXG4gICAgICAgICAgaW1tZWRpYXRlbHkgPSAhdXBUb0RhdGU7XG5cbiAgICB0aGlzLnNjaGVkdWxlVXBkYXRlKGltbWVkaWF0ZWx5KTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBjb25zdCB3b3JraW5nQ29udGVudCA9IHRoaXMuZG9jdW1lbnQuZ2V0V29ya2luZ0NvbnRlbnQoKSxcbiAgICAgICAgICBlZGl0YWJsZUNvbnRlbnQgPSB0aGlzLmRvY3VtZW50LmdldEVkaXRhYmxlQ29udGVudCgpO1xuXG4gICAgY29uc3Qgc3VjY2VzcyA9IHRoaXMuY2xpZW50LnVwZGF0ZSh0aGlzLnVzZXJJZGVudGlmaWVyLCB3b3JraW5nQ29udGVudCwgZWRpdGFibGVDb250ZW50LCBwZW5kaW5nT3BlcmF0aW9ucyA9PiB0aGlzLnVwZGF0ZURvY3VtZW50KHBlbmRpbmdPcGVyYXRpb25zKSk7XG5cbiAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgdGhpcy5kb2N1bWVudC5zeW5jaHJvbmlzZVdvcmtpbmdDb250ZW50KCk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZyb21Ob3RoaW5nKCkge1xuICAgIGNvbnN0IGNsaWVudCA9IENsaWVudC5mcm9tTm90aGluZygpLFxuICAgICAgICAgIHRpbWVvdXQgPSBudWxsLCAvLy9cbiAgICAgICAgICBkb2N1bWVudCA9IG51bGwsICAvLy9cbiAgICAgICAgICB1c2VySWRlbnRpZmllciA9IG51bGwsICAvLy9cblx0XHRcdFx0XHRzZXNzaW9uSWRlbnRpZmllciA9IG51bGwsXHQvLy9cbiAgICAgICAgICBhZ2VudCA9IG5ldyBBZ2VudChjbGllbnQsIHRpbWVvdXQsIGRvY3VtZW50LCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpO1xuXG4gICAgcmV0dXJuIGFnZW50O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQWdlbnQ7XG4iXX0=