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
        this.document.synchroniseWorkingContent();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leGFtcGxlL2FnZW50LmpzIl0sIm5hbWVzIjpbIkNsaWVudCIsInJlcXVpcmUiLCJjb25zdGFudHMiLCJVUERBVEVfREVMQVkiLCJBZ2VudCIsImNsaWVudCIsInRpbWVvdXQiLCJkb2N1bWVudCIsInVzZXJJZGVudGlmaWVyIiwic2Vzc2lvbklkZW50aWZpZXIiLCJjYWxsYmFjayIsImluaXRpYWxpc2UiLCJjb250ZW50Iiwic3RhcnRVcGRhdGVzIiwiaW1tZWRpYXRlbHkiLCJkZWZlclVwZGF0ZSIsImRlbGF5IiwiY2FuY2VsIiwiZGVmZXIiLCJkZWZlcnJlZFVwZGF0ZSIsIndvcmtpbmdDb250ZW50IiwiZ2V0V29ya2luZ0NvbnRlbnQiLCJlZGl0YWJsZUNvbnRlbnQiLCJnZXRFZGl0YWJsZUNvbnRlbnQiLCJzdWNjZXNzIiwidXBkYXRlRG9jdW1lbnQiLCJzZXNzaW9uRXhwaXJlZCIsInBlbmRpbmdPcGVyYXRpb25zIiwiYWxlcnQiLCJ1cFRvRGF0ZSIsInVwZGF0ZSIsInN5bmNocm9uaXNlV29ya2luZ0NvbnRlbnQiLCJmcm9tTm90aGluZyIsImFnZW50IiwibW9kdWxlIiwiZXhwb3J0cyIsIm1ldGhvZCIsInNldFRpbWVvdXQiLCJjbGVhclRpbWVvdXQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFFQSxJQUFNQSxTQUFTQyxRQUFRLFVBQVIsQ0FBZjtBQUFBLElBQ01DLFlBQVlELFFBQVEsYUFBUixDQURsQjs7SUFHUUUsWSxHQUFpQkQsUyxDQUFqQkMsWTs7SUFFRkMsSztBQUNKLGlCQUFZQyxNQUFaLEVBQW9CQyxPQUFwQixFQUE2QkMsUUFBN0IsRUFBdUNDLGNBQXZDLEVBQXVEQyxpQkFBdkQsRUFBMEU7QUFBQTs7QUFDeEUsU0FBS0osTUFBTCxHQUFjQSxNQUFkO0FBQ0EsU0FBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLQyxjQUFMLEdBQXNCQSxjQUF0QjtBQUNB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XG5jb25zdCBDbGllbnQgPSByZXF1aXJlKCcuL2NsaWVudCcpLFxuICAgICAgY29uc3RhbnRzID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcblxuY29uc3QgeyBVUERBVEVfREVMQVkgfSA9IGNvbnN0YW50cztcblxuY2xhc3MgQWdlbnQge1xuICBjb25zdHJ1Y3RvcihjbGllbnQsIHRpbWVvdXQsIGRvY3VtZW50LCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpIHtcbiAgICB0aGlzLmNsaWVudCA9IGNsaWVudDtcbiAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0O1xuICAgIHRoaXMuZG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgICB0aGlzLnVzZXJJZGVudGlmaWVyID0gdXNlcklkZW50aWZpZXI7XG4gICAgdGhpcy5zZXNzaW9uSWRlbnRpZmllciA9IHNlc3Npb25JZGVudGlmaWVyO1xuICB9XG5cbiAgaW5pdGlhbGlzZShjYWxsYmFjaykge1xuICAgIHRoaXMuY2xpZW50LmluaXRpYWxpc2UoKGNvbnRlbnQsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllcikgPT4ge1xuICAgICAgdGhpcy51c2VySWRlbnRpZmllciA9IHVzZXJJZGVudGlmaWVyO1xuICAgICAgdGhpcy5zZXNzaW9uSWRlbnRpZmllciA9IHNlc3Npb25JZGVudGlmaWVyO1xuXG4gICAgICB0aGlzLnN0YXJ0VXBkYXRlcygpO1xuXG4gICAgICBjYWxsYmFjayhjb250ZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldERvY3VtZW50KGRvY3VtZW50KSB7XG4gICAgdGhpcy5kb2N1bWVudCA9IGRvY3VtZW50O1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIGNvbnN0IGltbWVkaWF0ZWx5ID0gdHJ1ZTtcblxuICAgIHRoaXMuZGVmZXJVcGRhdGUoaW1tZWRpYXRlbHkpO1xuICB9XG5cbiAgc3RhcnRVcGRhdGVzKCkge1xuICAgIGNvbnN0IGltbWVkaWF0ZWx5ID0gZmFsc2U7XG5cbiAgICB0aGlzLmRlZmVyVXBkYXRlKGltbWVkaWF0ZWx5KTtcbiAgfVxuXG4gIGRlZmVyVXBkYXRlKGltbWVkaWF0ZWx5KSB7XG4gICAgY29uc3QgZGVsYXkgPSBpbW1lZGlhdGVseSA/XG4gICAgICAgICAgICAgICAgICAgIDAgOiAvLy9cbiAgICAgICAgICAgICAgICAgICAgICBVUERBVEVfREVMQVk7XG5cbiAgICBjYW5jZWwodGhpcy50aW1lb3V0KTtcblxuICAgIHRoaXMudGltZW91dCA9IGRlZmVyKCgpID0+IHRoaXMuZGVmZXJyZWRVcGRhdGUoKSwgZGVsYXkpO1xuICB9XG5cbiAgZGVmZXJyZWRVcGRhdGUoKSB7XG4gICAgY29uc3Qgd29ya2luZ0NvbnRlbnQgPSB0aGlzLmRvY3VtZW50LmdldFdvcmtpbmdDb250ZW50KCksXG4gICAgICAgICAgZWRpdGFibGVDb250ZW50ID0gdGhpcy5kb2N1bWVudC5nZXRFZGl0YWJsZUNvbnRlbnQoKTtcblxuICAgIGNvbnN0IHN1Y2Nlc3MgPSB0aGlzLmNsaWVudC51cGRhdGVEb2N1bWVudCh0aGlzLnVzZXJJZGVudGlmaWVyLCB0aGlzLnNlc3Npb25JZGVudGlmaWVyLCB3b3JraW5nQ29udGVudCwgZWRpdGFibGVDb250ZW50LCAoc2Vzc2lvbkV4cGlyZWQsIHBlbmRpbmdPcGVyYXRpb25zKSA9PiB7XG4gICAgXHRpZiAoc2Vzc2lvbkV4cGlyZWQpIHtcblx0XHRcdFx0YWxlcnQoJ1RoZSBzZXNzaW9uIGhhcyBleHBpcmVkLiBQbGVhc2UgcmVmcmVzaCEnKTtcblxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cbiAgICAgIGNvbnN0IHVwVG9EYXRlID0gdGhpcy5kb2N1bWVudC51cGRhdGUocGVuZGluZ09wZXJhdGlvbnMpLFxuICAgICAgICAgICAgaW1tZWRpYXRlbHkgPSAhdXBUb0RhdGU7XG5cbiAgICAgIHRoaXMuZGVmZXJVcGRhdGUoaW1tZWRpYXRlbHkpO1xuXHRcdH0pO1xuXG4gICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgIHRoaXMuZG9jdW1lbnQuc3luY2hyb25pc2VXb3JraW5nQ29udGVudCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpbW1lZGlhdGVseSA9IGZhbHNlO1xuXG4gICAgICB0aGlzLmRlZmVyVXBkYXRlKGltbWVkaWF0ZWx5KTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZnJvbU5vdGhpbmcoKSB7XG4gICAgY29uc3QgY2xpZW50ID0gQ2xpZW50LmZyb21Ob3RoaW5nKCksXG4gICAgICAgICAgdGltZW91dCA9IG51bGwsIC8vL1xuICAgICAgICAgIGRvY3VtZW50ID0gbnVsbCwgIC8vL1xuICAgICAgICAgIHVzZXJJZGVudGlmaWVyID0gbnVsbCwgIC8vL1xuXHRcdFx0XHRcdHNlc3Npb25JZGVudGlmaWVyID0gbnVsbCxcdC8vL1xuICAgICAgICAgIGFnZW50ID0gbmV3IEFnZW50KGNsaWVudCwgdGltZW91dCwgZG9jdW1lbnQsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllcik7XG5cbiAgICByZXR1cm4gYWdlbnQ7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBBZ2VudDtcblxuZnVuY3Rpb24gZGVmZXIobWV0aG9kLCBkZWxheSkge1xuICBjb25zdCB0aW1lb3V0ID0gc2V0VGltZW91dChtZXRob2QsIGRlbGF5KTtcblxuICByZXR1cm4gdGltZW91dDtcbn1cblxuZnVuY3Rpb24gY2FuY2VsKHRpbWVvdXQpIHtcbiAgaWYgKHRpbWVvdXQgIT09IG51bGwpIHtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG5cbiAgICB0aW1lb3V0ID0gbnVsbDtcbiAgfVxuXG4gIHJldHVybiB0aW1lb3V0O1xufVxuIl19