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

      var success = this.client.update(this.userIdentifier, this.sessionIdentifier, workingContent, editableContent, function (sessionExpired, pendingOperations) {
        if (sessionExpired) {
          alert('The session has expired. Please refresh!');

          return;
        }

        _this2.updateDocument(pendingOperations);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leGFtcGxlL2FnZW50LmpzIl0sIm5hbWVzIjpbIkNsaWVudCIsInJlcXVpcmUiLCJjb25zdGFudHMiLCJVUERBVEVfREVMQVkiLCJBZ2VudCIsImNsaWVudCIsInRpbWVvdXQiLCJkb2N1bWVudCIsInVzZXJJZGVudGlmaWVyIiwic2Vzc2lvbklkZW50aWZpZXIiLCJjYWxsYmFjayIsImluaXRpYWxpc2UiLCJjb250ZW50IiwiYmluZCIsImltbWVkaWF0ZWx5Iiwic2NoZWR1bGVVcGRhdGUiLCJkZWxheSIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJ1cGRhdGUiLCJwZW5kaW5nT3BlcmF0aW9ucyIsInVwVG9EYXRlIiwid29ya2luZ0NvbnRlbnQiLCJnZXRXb3JraW5nQ29udGVudCIsImVkaXRhYmxlQ29udGVudCIsImdldEVkaXRhYmxlQ29udGVudCIsInN1Y2Nlc3MiLCJzZXNzaW9uRXhwaXJlZCIsImFsZXJ0IiwidXBkYXRlRG9jdW1lbnQiLCJzeW5jaHJvbmlzZVdvcmtpbmdDb250ZW50IiwiZnJvbU5vdGhpbmciLCJhZ2VudCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFFQSxJQUFNQSxTQUFTQyxRQUFRLFVBQVIsQ0FBZjtBQUFBLElBQ01DLFlBQVlELFFBQVEsYUFBUixDQURsQjs7SUFHUUUsWSxHQUFpQkQsUyxDQUFqQkMsWTs7SUFFRkMsSztBQUNKLGlCQUFZQyxNQUFaLEVBQW9CQyxPQUFwQixFQUE2QkMsUUFBN0IsRUFBdUNDLGNBQXZDLEVBQXVEQyxpQkFBdkQsRUFBMEU7QUFBQTs7QUFDeEUsU0FBS0osTUFBTCxHQUFjQSxNQUFkO0FBQ0EsU0FBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLQyxjQUFMLEdBQXNCQSxjQUF0QjtBQUNBLFNBQUtDLGlCQUFMLEdBQXlCQSxpQkFBekI7QUFDRDs7OzsrQkFFVUMsUSxFQUFVO0FBQ25CLFdBQUtMLE1BQUwsQ0FBWU0sVUFBWixDQUF1QixVQUFTQyxPQUFULEVBQWtCSixjQUFsQixFQUFrQ0MsaUJBQWxDLEVBQXFEO0FBQzFFLGFBQUtELGNBQUwsR0FBc0JBLGNBQXRCO0FBQ0EsYUFBS0MsaUJBQUwsR0FBeUJBLGlCQUF6Qjs7QUFFQUMsaUJBQVNFLE9BQVQ7QUFDRCxPQUxzQixDQUtyQkMsSUFMcUIsQ0FLaEIsSUFMZ0IsQ0FBdkI7QUFNRDs7O2dDQUVXTixRLEVBQVU7QUFDcEIsV0FBS0EsUUFBTCxHQUFnQkEsUUFBaEI7QUFDRDs7O21DQUVjO0FBQ2IsVUFBTU8sY0FBYyxLQUFwQjs7QUFFQSxXQUFLQyxjQUFMLENBQW9CRCxXQUFwQjtBQUNEOzs7bUNBRWNBLFcsRUFBYTtBQUFBOztBQUMxQixVQUFNRSxRQUFRRixjQUNFLENBREYsR0FDTTtBQUNGWCxrQkFGbEI7O0FBSUEsVUFBSSxLQUFLRyxPQUFMLEtBQWlCLElBQXJCLEVBQTJCO0FBQ3pCVyxxQkFBYSxLQUFLWCxPQUFsQjtBQUNEOztBQUVELFdBQUtBLE9BQUwsR0FBZVksV0FBVztBQUFBLGVBQU0sTUFBS0MsTUFBTCxFQUFOO0FBQUEsT0FBWCxFQUFnQ0gsS0FBaEMsQ0FBZjtBQUNEOzs7bUNBRWNJLGlCLEVBQW1CO0FBQ2hDLFVBQU1DLFdBQVcsS0FBS2QsUUFBTCxDQUFjWSxNQUFkLENBQXFCQyxpQkFBckIsQ0FBakI7QUFBQSxVQUNNTixjQUFjLENBQUNPLFFBRHJCOztBQUdBLFdBQUtOLGNBQUwsQ0FBb0JELFdBQXBCO0FBQ0Q7Ozs2QkFFUTtBQUFBOztBQUNQLFVBQU1RLGlCQUFpQixLQUFLZixRQUFMLENBQWNnQixpQkFBZCxFQUF2QjtBQUFBLFVBQ01DLGtCQUFrQixLQUFLakIsUUFBTCxDQUFja0Isa0JBQWQsRUFEeEI7O0FBR0EsVUFBTUMsVUFBVSxLQUFLckIsTUFBTCxDQUFZYyxNQUFaLENBQW1CLEtBQUtYLGNBQXhCLEVBQXdDLEtBQUtDLGlCQUE3QyxFQUFnRWEsY0FBaEUsRUFBZ0ZFLGVBQWhGLEVBQWlHLFVBQUNHLGNBQUQsRUFBaUJQLGlCQUFqQixFQUF1QztBQUN2SixZQUFJTyxjQUFKLEVBQW9CO0FBQ3JCQyxnQkFBTSwwQ0FBTjs7QUFFQTtBQUNBOztBQUVELGVBQUtDLGNBQUwsQ0FBb0JULGlCQUFwQjtBQUNBLE9BUmlCLENBQWhCOztBQVVBLFVBQUlNLE9BQUosRUFBYTtBQUNYLGFBQUtuQixRQUFMLENBQWN1Qix5QkFBZDtBQUNEO0FBQ0Y7OztrQ0FFb0I7QUFDbkIsVUFBTXpCLFNBQVNMLE9BQU8rQixXQUFQLEVBQWY7QUFBQSxVQUNNekIsVUFBVSxJQURoQjtBQUFBLFVBQ3NCO0FBQ2hCQyxpQkFBVyxJQUZqQjtBQUFBLFVBRXdCO0FBQ2xCQyx1QkFBaUIsSUFIdkI7QUFBQSxVQUc4QjtBQUM3QkMsMEJBQW9CLElBSnJCO0FBQUEsVUFJMkI7QUFDckJ1QixjQUFRLElBQUk1QixLQUFKLENBQVVDLE1BQVYsRUFBa0JDLE9BQWxCLEVBQTJCQyxRQUEzQixFQUFxQ0MsY0FBckMsRUFBcURDLGlCQUFyRCxDQUxkOztBQU9BLGFBQU91QixLQUFQO0FBQ0Q7Ozs7OztBQUdIQyxPQUFPQyxPQUFQLEdBQWlCOUIsS0FBakIiLCJmaWxlIjoiYWdlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IENsaWVudCA9IHJlcXVpcmUoJy4vY2xpZW50JyksXG4gICAgICBjb25zdGFudHMgPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuXG5jb25zdCB7IFVQREFURV9ERUxBWSB9ID0gY29uc3RhbnRzO1xuXG5jbGFzcyBBZ2VudCB7XG4gIGNvbnN0cnVjdG9yKGNsaWVudCwgdGltZW91dCwgZG9jdW1lbnQsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllcikge1xuICAgIHRoaXMuY2xpZW50ID0gY2xpZW50O1xuICAgIHRoaXMudGltZW91dCA9IHRpbWVvdXQ7XG4gICAgdGhpcy5kb2N1bWVudCA9IGRvY3VtZW50O1xuICAgIHRoaXMudXNlcklkZW50aWZpZXIgPSB1c2VySWRlbnRpZmllcjtcbiAgICB0aGlzLnNlc3Npb25JZGVudGlmaWVyID0gc2Vzc2lvbklkZW50aWZpZXI7XG4gIH1cblxuICBpbml0aWFsaXNlKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5jbGllbnQuaW5pdGlhbGlzZShmdW5jdGlvbihjb250ZW50LCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpIHtcbiAgICAgIHRoaXMudXNlcklkZW50aWZpZXIgPSB1c2VySWRlbnRpZmllcjtcbiAgICAgIHRoaXMuc2Vzc2lvbklkZW50aWZpZXIgPSBzZXNzaW9uSWRlbnRpZmllcjtcblxuICAgICAgY2FsbGJhY2soY29udGVudCk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHNldERvY3VtZW50KGRvY3VtZW50KSB7XG4gICAgdGhpcy5kb2N1bWVudCA9IGRvY3VtZW50O1xuICB9XG5cbiAgc3RhcnRVcGRhdGVzKCkge1xuICAgIGNvbnN0IGltbWVkaWF0ZWx5ID0gZmFsc2U7XG5cbiAgICB0aGlzLnNjaGVkdWxlVXBkYXRlKGltbWVkaWF0ZWx5KTtcbiAgfVxuXG4gIHNjaGVkdWxlVXBkYXRlKGltbWVkaWF0ZWx5KSB7XG4gICAgY29uc3QgZGVsYXkgPSBpbW1lZGlhdGVseSA/XG4gICAgICAgICAgICAgICAgICAgIDAgOiAvLy9cbiAgICAgICAgICAgICAgICAgICAgICBVUERBVEVfREVMQVk7XG5cbiAgICBpZiAodGhpcy50aW1lb3V0ICE9PSBudWxsKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICB9XG5cbiAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlKCksIGRlbGF5KTtcbiAgfVxuXG4gIHVwZGF0ZURvY3VtZW50KHBlbmRpbmdPcGVyYXRpb25zKSB7XG4gICAgY29uc3QgdXBUb0RhdGUgPSB0aGlzLmRvY3VtZW50LnVwZGF0ZShwZW5kaW5nT3BlcmF0aW9ucyksXG4gICAgICAgICAgaW1tZWRpYXRlbHkgPSAhdXBUb0RhdGU7XG5cbiAgICB0aGlzLnNjaGVkdWxlVXBkYXRlKGltbWVkaWF0ZWx5KTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBjb25zdCB3b3JraW5nQ29udGVudCA9IHRoaXMuZG9jdW1lbnQuZ2V0V29ya2luZ0NvbnRlbnQoKSxcbiAgICAgICAgICBlZGl0YWJsZUNvbnRlbnQgPSB0aGlzLmRvY3VtZW50LmdldEVkaXRhYmxlQ29udGVudCgpO1xuXG4gICAgY29uc3Qgc3VjY2VzcyA9IHRoaXMuY2xpZW50LnVwZGF0ZSh0aGlzLnVzZXJJZGVudGlmaWVyLCB0aGlzLnNlc3Npb25JZGVudGlmaWVyLCB3b3JraW5nQ29udGVudCwgZWRpdGFibGVDb250ZW50LCAoc2Vzc2lvbkV4cGlyZWQsIHBlbmRpbmdPcGVyYXRpb25zKSA9PiB7XG4gICAgXHRpZiAoc2Vzc2lvbkV4cGlyZWQpIHtcblx0XHRcdFx0YWxlcnQoJ1RoZSBzZXNzaW9uIGhhcyBleHBpcmVkLiBQbGVhc2UgcmVmcmVzaCEnKTtcblxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMudXBkYXRlRG9jdW1lbnQocGVuZGluZ09wZXJhdGlvbnMpO1xuXHRcdH0pO1xuXG4gICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgIHRoaXMuZG9jdW1lbnQuc3luY2hyb25pc2VXb3JraW5nQ29udGVudCgpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmcm9tTm90aGluZygpIHtcbiAgICBjb25zdCBjbGllbnQgPSBDbGllbnQuZnJvbU5vdGhpbmcoKSxcbiAgICAgICAgICB0aW1lb3V0ID0gbnVsbCwgLy8vXG4gICAgICAgICAgZG9jdW1lbnQgPSBudWxsLCAgLy8vXG4gICAgICAgICAgdXNlcklkZW50aWZpZXIgPSBudWxsLCAgLy8vXG5cdFx0XHRcdFx0c2Vzc2lvbklkZW50aWZpZXIgPSBudWxsLFx0Ly8vXG4gICAgICAgICAgYWdlbnQgPSBuZXcgQWdlbnQoY2xpZW50LCB0aW1lb3V0LCBkb2N1bWVudCwgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyKTtcblxuICAgIHJldHVybiBhZ2VudDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEFnZW50O1xuIl19