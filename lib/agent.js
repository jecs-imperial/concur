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
      var _this = this;

      this.client.initialise(function (content, userIdentifier, sessionIdentifier) {
        _this.userIdentifier = userIdentifier;
        _this.sessionIdentifier = sessionIdentifier;

        _this.startUpdates();

        callback(content);
      });
    }
  }, {
    key: 'setDocument',
    value: function setDocument(document) {
      this.document = document;
    }
  }, {
    key: 'update',
    value: function update() {
      var immediately = true;

      this.deferUpdate(immediately);
    }
  }, {
    key: 'startUpdates',
    value: function startUpdates() {
      var immediately = false;

      this.deferUpdate(immediately);
    }
  }, {
    key: 'deferUpdate',
    value: function deferUpdate(immediately) {
      var _this2 = this;

      var delay = immediately ? 0 : ///
      UPDATE_DELAY;

      cancel(this.timeout);

      this.timeout = defer(function () {
        return _this2.deferredUpdate();
      }, delay);
    }
  }, {
    key: 'deferredUpdate',
    value: function deferredUpdate() {
      var _this3 = this;

      var workingContent = this.document.getWorkingContent(),
          editableContent = this.document.getEditableContent();

      var success = this.client.updateDocument(this.userIdentifier, this.sessionIdentifier, workingContent, editableContent, function (sessionExpired, pendingOperations) {
        if (sessionExpired) {
          alert('The session has expired. Please refresh!');

          return;
        }

        var upToDate = _this3.document.update(pendingOperations),
            immediately = !upToDate;

        _this3.deferUpdate(immediately);
      });

      if (success) {
        this.document.reset();
      } else {
        var immediately = false;

        this.deferUpdate(immediately);
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

function defer(method, delay) {
  var timeout = setTimeout(method, delay);

  return timeout;
}

function cancel(timeout) {
  if (timeout !== null) {
    clearTimeout(timeout);

    timeout = null;
  }

  return timeout;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9hZ2VudC5qcyJdLCJuYW1lcyI6WyJDbGllbnQiLCJyZXF1aXJlIiwiY29uc3RhbnRzIiwiVVBEQVRFX0RFTEFZIiwiQWdlbnQiLCJjbGllbnQiLCJ0aW1lb3V0IiwiZG9jdW1lbnQiLCJ1c2VySWRlbnRpZmllciIsInNlc3Npb25JZGVudGlmaWVyIiwiY2FsbGJhY2siLCJpbml0aWFsaXNlIiwiY29udGVudCIsInN0YXJ0VXBkYXRlcyIsImltbWVkaWF0ZWx5IiwiZGVmZXJVcGRhdGUiLCJkZWxheSIsImNhbmNlbCIsImRlZmVyIiwiZGVmZXJyZWRVcGRhdGUiLCJ3b3JraW5nQ29udGVudCIsImdldFdvcmtpbmdDb250ZW50IiwiZWRpdGFibGVDb250ZW50IiwiZ2V0RWRpdGFibGVDb250ZW50Iiwic3VjY2VzcyIsInVwZGF0ZURvY3VtZW50Iiwic2Vzc2lvbkV4cGlyZWQiLCJwZW5kaW5nT3BlcmF0aW9ucyIsImFsZXJ0IiwidXBUb0RhdGUiLCJ1cGRhdGUiLCJyZXNldCIsImZyb21Ob3RoaW5nIiwiYWdlbnQiLCJtb2R1bGUiLCJleHBvcnRzIiwibWV0aG9kIiwic2V0VGltZW91dCIsImNsZWFyVGltZW91dCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBLElBQU1BLFNBQVNDLFFBQVEsVUFBUixDQUFmO0FBQUEsSUFDTUMsWUFBWUQsUUFBUSxhQUFSLENBRGxCOztJQUdRRSxZLEdBQWlCRCxTLENBQWpCQyxZOztJQUVGQyxLO0FBQ0osaUJBQVlDLE1BQVosRUFBb0JDLE9BQXBCLEVBQTZCQyxRQUE3QixFQUF1Q0MsY0FBdkMsRUFBdURDLGlCQUF2RCxFQUEwRTtBQUFBOztBQUN4RSxTQUFLSixNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLQyxPQUFMLEdBQWVBLE9BQWY7QUFDQSxTQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtDLGNBQUwsR0FBc0JBLGNBQXRCO0FBQ0EsU0FBS0MsaUJBQUwsR0FBeUJBLGlCQUF6QjtBQUNEOzs7OytCQUVVQyxRLEVBQVU7QUFBQTs7QUFDbkIsV0FBS0wsTUFBTCxDQUFZTSxVQUFaLENBQXVCLFVBQUNDLE9BQUQsRUFBVUosY0FBVixFQUEwQkMsaUJBQTFCLEVBQWdEO0FBQ3JFLGNBQUtELGNBQUwsR0FBc0JBLGNBQXRCO0FBQ0EsY0FBS0MsaUJBQUwsR0FBeUJBLGlCQUF6Qjs7QUFFQSxjQUFLSSxZQUFMOztBQUVBSCxpQkFBU0UsT0FBVDtBQUNELE9BUEQ7QUFRRDs7O2dDQUVXTCxRLEVBQVU7QUFDcEIsV0FBS0EsUUFBTCxHQUFnQkEsUUFBaEI7QUFDRDs7OzZCQUVRO0FBQ1AsVUFBTU8sY0FBYyxJQUFwQjs7QUFFQSxXQUFLQyxXQUFMLENBQWlCRCxXQUFqQjtBQUNEOzs7bUNBRWM7QUFDYixVQUFNQSxjQUFjLEtBQXBCOztBQUVBLFdBQUtDLFdBQUwsQ0FBaUJELFdBQWpCO0FBQ0Q7OztnQ0FFV0EsVyxFQUFhO0FBQUE7O0FBQ3ZCLFVBQU1FLFFBQVFGLGNBQ0UsQ0FERixHQUNNO0FBQ0ZYLGtCQUZsQjs7QUFJQWMsYUFBTyxLQUFLWCxPQUFaOztBQUVBLFdBQUtBLE9BQUwsR0FBZVksTUFBTTtBQUFBLGVBQU0sT0FBS0MsY0FBTCxFQUFOO0FBQUEsT0FBTixFQUFtQ0gsS0FBbkMsQ0FBZjtBQUNEOzs7cUNBRWdCO0FBQUE7O0FBQ2YsVUFBTUksaUJBQWlCLEtBQUtiLFFBQUwsQ0FBY2MsaUJBQWQsRUFBdkI7QUFBQSxVQUNNQyxrQkFBa0IsS0FBS2YsUUFBTCxDQUFjZ0Isa0JBQWQsRUFEeEI7O0FBR0EsVUFBTUMsVUFBVSxLQUFLbkIsTUFBTCxDQUFZb0IsY0FBWixDQUEyQixLQUFLakIsY0FBaEMsRUFBZ0QsS0FBS0MsaUJBQXJELEVBQXdFVyxjQUF4RSxFQUF3RkUsZUFBeEYsRUFBeUcsVUFBQ0ksY0FBRCxFQUFpQkMsaUJBQWpCLEVBQXVDO0FBQy9KLFlBQUlELGNBQUosRUFBb0I7QUFDckJFLGdCQUFNLDBDQUFOOztBQUVBO0FBQ0E7O0FBRUUsWUFBTUMsV0FBVyxPQUFLdEIsUUFBTCxDQUFjdUIsTUFBZCxDQUFxQkgsaUJBQXJCLENBQWpCO0FBQUEsWUFDTWIsY0FBYyxDQUFDZSxRQURyQjs7QUFHQSxlQUFLZCxXQUFMLENBQWlCRCxXQUFqQjtBQUNILE9BWGlCLENBQWhCOztBQWFBLFVBQUlVLE9BQUosRUFBYTtBQUNYLGFBQUtqQixRQUFMLENBQWN3QixLQUFkO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsWUFBTWpCLGNBQWMsS0FBcEI7O0FBRUEsYUFBS0MsV0FBTCxDQUFpQkQsV0FBakI7QUFDRDtBQUNGOzs7a0NBRW9CO0FBQ25CLFVBQU1ULFNBQVNMLE9BQU9nQyxXQUFQLEVBQWY7QUFBQSxVQUNNMUIsVUFBVSxJQURoQjtBQUFBLFVBQ3NCO0FBQ2hCQyxpQkFBVyxJQUZqQjtBQUFBLFVBRXdCO0FBQ2xCQyx1QkFBaUIsSUFIdkI7QUFBQSxVQUc4QjtBQUM3QkMsMEJBQW9CLElBSnJCO0FBQUEsVUFJMkI7QUFDckJ3QixjQUFRLElBQUk3QixLQUFKLENBQVVDLE1BQVYsRUFBa0JDLE9BQWxCLEVBQTJCQyxRQUEzQixFQUFxQ0MsY0FBckMsRUFBcURDLGlCQUFyRCxDQUxkOztBQU9BLGFBQU93QixLQUFQO0FBQ0Q7Ozs7OztBQUdIQyxPQUFPQyxPQUFQLEdBQWlCL0IsS0FBakI7O0FBRUEsU0FBU2MsS0FBVCxDQUFla0IsTUFBZixFQUF1QnBCLEtBQXZCLEVBQThCO0FBQzVCLE1BQU1WLFVBQVUrQixXQUFXRCxNQUFYLEVBQW1CcEIsS0FBbkIsQ0FBaEI7O0FBRUEsU0FBT1YsT0FBUDtBQUNEOztBQUVELFNBQVNXLE1BQVQsQ0FBZ0JYLE9BQWhCLEVBQXlCO0FBQ3ZCLE1BQUlBLFlBQVksSUFBaEIsRUFBc0I7QUFDcEJnQyxpQkFBYWhDLE9BQWI7O0FBRUFBLGNBQVUsSUFBVjtBQUNEOztBQUVELFNBQU9BLE9BQVA7QUFDRCIsImZpbGUiOiJhZ2VudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgQ2xpZW50ID0gcmVxdWlyZSgnLi9jbGllbnQnKSxcbiAgICAgIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG5cbmNvbnN0IHsgVVBEQVRFX0RFTEFZIH0gPSBjb25zdGFudHM7XG5cbmNsYXNzIEFnZW50IHtcbiAgY29uc3RydWN0b3IoY2xpZW50LCB0aW1lb3V0LCBkb2N1bWVudCwgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyKSB7XG4gICAgdGhpcy5jbGllbnQgPSBjbGllbnQ7XG4gICAgdGhpcy50aW1lb3V0ID0gdGltZW91dDtcbiAgICB0aGlzLmRvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgdGhpcy51c2VySWRlbnRpZmllciA9IHVzZXJJZGVudGlmaWVyO1xuICAgIHRoaXMuc2Vzc2lvbklkZW50aWZpZXIgPSBzZXNzaW9uSWRlbnRpZmllcjtcbiAgfVxuXG4gIGluaXRpYWxpc2UoY2FsbGJhY2spIHtcbiAgICB0aGlzLmNsaWVudC5pbml0aWFsaXNlKChjb250ZW50LCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpID0+IHtcbiAgICAgIHRoaXMudXNlcklkZW50aWZpZXIgPSB1c2VySWRlbnRpZmllcjtcbiAgICAgIHRoaXMuc2Vzc2lvbklkZW50aWZpZXIgPSBzZXNzaW9uSWRlbnRpZmllcjtcblxuICAgICAgdGhpcy5zdGFydFVwZGF0ZXMoKTtcblxuICAgICAgY2FsbGJhY2soY29udGVudCk7XG4gICAgfSk7XG4gIH1cblxuICBzZXREb2N1bWVudChkb2N1bWVudCkge1xuICAgIHRoaXMuZG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBjb25zdCBpbW1lZGlhdGVseSA9IHRydWU7XG5cbiAgICB0aGlzLmRlZmVyVXBkYXRlKGltbWVkaWF0ZWx5KTtcbiAgfVxuXG4gIHN0YXJ0VXBkYXRlcygpIHtcbiAgICBjb25zdCBpbW1lZGlhdGVseSA9IGZhbHNlO1xuXG4gICAgdGhpcy5kZWZlclVwZGF0ZShpbW1lZGlhdGVseSk7XG4gIH1cblxuICBkZWZlclVwZGF0ZShpbW1lZGlhdGVseSkge1xuICAgIGNvbnN0IGRlbGF5ID0gaW1tZWRpYXRlbHkgP1xuICAgICAgICAgICAgICAgICAgICAwIDogLy8vXG4gICAgICAgICAgICAgICAgICAgICAgVVBEQVRFX0RFTEFZO1xuXG4gICAgY2FuY2VsKHRoaXMudGltZW91dCk7XG5cbiAgICB0aGlzLnRpbWVvdXQgPSBkZWZlcigoKSA9PiB0aGlzLmRlZmVycmVkVXBkYXRlKCksIGRlbGF5KTtcbiAgfVxuXG4gIGRlZmVycmVkVXBkYXRlKCkge1xuICAgIGNvbnN0IHdvcmtpbmdDb250ZW50ID0gdGhpcy5kb2N1bWVudC5nZXRXb3JraW5nQ29udGVudCgpLFxuICAgICAgICAgIGVkaXRhYmxlQ29udGVudCA9IHRoaXMuZG9jdW1lbnQuZ2V0RWRpdGFibGVDb250ZW50KCk7XG5cbiAgICBjb25zdCBzdWNjZXNzID0gdGhpcy5jbGllbnQudXBkYXRlRG9jdW1lbnQodGhpcy51c2VySWRlbnRpZmllciwgdGhpcy5zZXNzaW9uSWRlbnRpZmllciwgd29ya2luZ0NvbnRlbnQsIGVkaXRhYmxlQ29udGVudCwgKHNlc3Npb25FeHBpcmVkLCBwZW5kaW5nT3BlcmF0aW9ucykgPT4ge1xuICAgIFx0aWYgKHNlc3Npb25FeHBpcmVkKSB7XG5cdFx0XHRcdGFsZXJ0KCdUaGUgc2Vzc2lvbiBoYXMgZXhwaXJlZC4gUGxlYXNlIHJlZnJlc2ghJyk7XG5cblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG4gICAgICBjb25zdCB1cFRvRGF0ZSA9IHRoaXMuZG9jdW1lbnQudXBkYXRlKHBlbmRpbmdPcGVyYXRpb25zKSxcbiAgICAgICAgICAgIGltbWVkaWF0ZWx5ID0gIXVwVG9EYXRlO1xuXG4gICAgICB0aGlzLmRlZmVyVXBkYXRlKGltbWVkaWF0ZWx5KTtcblx0XHR9KTtcblxuICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICB0aGlzLmRvY3VtZW50LnJlc2V0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGltbWVkaWF0ZWx5ID0gZmFsc2U7XG5cbiAgICAgIHRoaXMuZGVmZXJVcGRhdGUoaW1tZWRpYXRlbHkpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmcm9tTm90aGluZygpIHtcbiAgICBjb25zdCBjbGllbnQgPSBDbGllbnQuZnJvbU5vdGhpbmcoKSxcbiAgICAgICAgICB0aW1lb3V0ID0gbnVsbCwgLy8vXG4gICAgICAgICAgZG9jdW1lbnQgPSBudWxsLCAgLy8vXG4gICAgICAgICAgdXNlcklkZW50aWZpZXIgPSBudWxsLCAgLy8vXG5cdFx0XHRcdFx0c2Vzc2lvbklkZW50aWZpZXIgPSBudWxsLFx0Ly8vXG4gICAgICAgICAgYWdlbnQgPSBuZXcgQWdlbnQoY2xpZW50LCB0aW1lb3V0LCBkb2N1bWVudCwgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyKTtcblxuICAgIHJldHVybiBhZ2VudDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEFnZW50O1xuXG5mdW5jdGlvbiBkZWZlcihtZXRob2QsIGRlbGF5KSB7XG4gIGNvbnN0IHRpbWVvdXQgPSBzZXRUaW1lb3V0KG1ldGhvZCwgZGVsYXkpO1xuXG4gIHJldHVybiB0aW1lb3V0O1xufVxuXG5mdW5jdGlvbiBjYW5jZWwodGltZW91dCkge1xuICBpZiAodGltZW91dCAhPT0gbnVsbCkge1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblxuICAgIHRpbWVvdXQgPSBudWxsO1xuICB9XG5cbiAgcmV0dXJuIHRpbWVvdXQ7XG59XG4iXX0=