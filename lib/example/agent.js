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

      var success = this.client.update(this.userIdentifier, this.sessionIdentifier, workingContent, editableContent, function (pendingOperations) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leGFtcGxlL2FnZW50LmpzIl0sIm5hbWVzIjpbIkNsaWVudCIsInJlcXVpcmUiLCJjb25zdGFudHMiLCJVUERBVEVfREVMQVkiLCJBZ2VudCIsImNsaWVudCIsInRpbWVvdXQiLCJkb2N1bWVudCIsInVzZXJJZGVudGlmaWVyIiwic2Vzc2lvbklkZW50aWZpZXIiLCJjYWxsYmFjayIsImluaXRpYWxpc2UiLCJjb250ZW50IiwiYmluZCIsImltbWVkaWF0ZWx5Iiwic2NoZWR1bGVVcGRhdGUiLCJkZWxheSIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJ1cGRhdGUiLCJwZW5kaW5nT3BlcmF0aW9ucyIsInVwVG9EYXRlIiwid29ya2luZ0NvbnRlbnQiLCJnZXRXb3JraW5nQ29udGVudCIsImVkaXRhYmxlQ29udGVudCIsImdldEVkaXRhYmxlQ29udGVudCIsInN1Y2Nlc3MiLCJ1cGRhdGVEb2N1bWVudCIsInN5bmNocm9uaXNlV29ya2luZ0NvbnRlbnQiLCJmcm9tTm90aGluZyIsImFnZW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBLElBQU1BLFNBQVNDLFFBQVEsVUFBUixDQUFmO0FBQUEsSUFDTUMsWUFBWUQsUUFBUSxhQUFSLENBRGxCOztJQUdRRSxZLEdBQWlCRCxTLENBQWpCQyxZOztJQUVGQyxLO0FBQ0osaUJBQVlDLE1BQVosRUFBb0JDLE9BQXBCLEVBQTZCQyxRQUE3QixFQUF1Q0MsY0FBdkMsRUFBdURDLGlCQUF2RCxFQUEwRTtBQUFBOztBQUN4RSxTQUFLSixNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLQyxPQUFMLEdBQWVBLE9BQWY7QUFDQSxTQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtDLGNBQUwsR0FBc0JBLGNBQXRCO0FBQ0EsU0FBS0MsaUJBQUwsR0FBeUJBLGlCQUF6QjtBQUNEOzs7OytCQUVVQyxRLEVBQVU7QUFDbkIsV0FBS0wsTUFBTCxDQUFZTSxVQUFaLENBQXVCLFVBQVNDLE9BQVQsRUFBa0JKLGNBQWxCLEVBQWtDQyxpQkFBbEMsRUFBcUQ7QUFDMUUsYUFBS0QsY0FBTCxHQUFzQkEsY0FBdEI7QUFDQSxhQUFLQyxpQkFBTCxHQUF5QkEsaUJBQXpCOztBQUVBQyxpQkFBU0UsT0FBVDtBQUNELE9BTHNCLENBS3JCQyxJQUxxQixDQUtoQixJQUxnQixDQUF2QjtBQU1EOzs7Z0NBRVdOLFEsRUFBVTtBQUNwQixXQUFLQSxRQUFMLEdBQWdCQSxRQUFoQjtBQUNEOzs7bUNBRWM7QUFDYixVQUFNTyxjQUFjLEtBQXBCOztBQUVBLFdBQUtDLGNBQUwsQ0FBb0JELFdBQXBCO0FBQ0Q7OzttQ0FFY0EsVyxFQUFhO0FBQUE7O0FBQzFCLFVBQU1FLFFBQVFGLGNBQ0UsQ0FERixHQUNNO0FBQ0ZYLGtCQUZsQjs7QUFJQSxVQUFJLEtBQUtHLE9BQUwsS0FBaUIsSUFBckIsRUFBMkI7QUFDekJXLHFCQUFhLEtBQUtYLE9BQWxCO0FBQ0Q7O0FBRUQsV0FBS0EsT0FBTCxHQUFlWSxXQUFXO0FBQUEsZUFBTSxNQUFLQyxNQUFMLEVBQU47QUFBQSxPQUFYLEVBQWdDSCxLQUFoQyxDQUFmO0FBQ0Q7OzttQ0FFY0ksaUIsRUFBbUI7QUFDaEMsVUFBTUMsV0FBVyxLQUFLZCxRQUFMLENBQWNZLE1BQWQsQ0FBcUJDLGlCQUFyQixDQUFqQjtBQUFBLFVBQ01OLGNBQWMsQ0FBQ08sUUFEckI7O0FBR0EsV0FBS04sY0FBTCxDQUFvQkQsV0FBcEI7QUFDRDs7OzZCQUVRO0FBQUE7O0FBQ1AsVUFBTVEsaUJBQWlCLEtBQUtmLFFBQUwsQ0FBY2dCLGlCQUFkLEVBQXZCO0FBQUEsVUFDTUMsa0JBQWtCLEtBQUtqQixRQUFMLENBQWNrQixrQkFBZCxFQUR4Qjs7QUFHQSxVQUFNQyxVQUFVLEtBQUtyQixNQUFMLENBQVljLE1BQVosQ0FBbUIsS0FBS1gsY0FBeEIsRUFBd0MsS0FBS0MsaUJBQTdDLEVBQWdFYSxjQUFoRSxFQUFnRkUsZUFBaEYsRUFBaUc7QUFBQSxlQUFxQixPQUFLRyxjQUFMLENBQW9CUCxpQkFBcEIsQ0FBckI7QUFBQSxPQUFqRyxDQUFoQjs7QUFFQSxVQUFJTSxPQUFKLEVBQWE7QUFDWCxhQUFLbkIsUUFBTCxDQUFjcUIseUJBQWQ7QUFDRDtBQUNGOzs7a0NBRW9CO0FBQ25CLFVBQU12QixTQUFTTCxPQUFPNkIsV0FBUCxFQUFmO0FBQUEsVUFDTXZCLFVBQVUsSUFEaEI7QUFBQSxVQUNzQjtBQUNoQkMsaUJBQVcsSUFGakI7QUFBQSxVQUV3QjtBQUNsQkMsdUJBQWlCLElBSHZCO0FBQUEsVUFHOEI7QUFDN0JDLDBCQUFvQixJQUpyQjtBQUFBLFVBSTJCO0FBQ3JCcUIsY0FBUSxJQUFJMUIsS0FBSixDQUFVQyxNQUFWLEVBQWtCQyxPQUFsQixFQUEyQkMsUUFBM0IsRUFBcUNDLGNBQXJDLEVBQXFEQyxpQkFBckQsQ0FMZDs7QUFPQSxhQUFPcUIsS0FBUDtBQUNEOzs7Ozs7QUFHSEMsT0FBT0MsT0FBUCxHQUFpQjVCLEtBQWpCIiwiZmlsZSI6ImFnZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBDbGllbnQgPSByZXF1aXJlKCcuL2NsaWVudCcpLFxuICAgICAgY29uc3RhbnRzID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcblxuY29uc3QgeyBVUERBVEVfREVMQVkgfSA9IGNvbnN0YW50cztcblxuY2xhc3MgQWdlbnQge1xuICBjb25zdHJ1Y3RvcihjbGllbnQsIHRpbWVvdXQsIGRvY3VtZW50LCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpIHtcbiAgICB0aGlzLmNsaWVudCA9IGNsaWVudDtcbiAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0O1xuICAgIHRoaXMuZG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgICB0aGlzLnVzZXJJZGVudGlmaWVyID0gdXNlcklkZW50aWZpZXI7XG4gICAgdGhpcy5zZXNzaW9uSWRlbnRpZmllciA9IHNlc3Npb25JZGVudGlmaWVyO1xuICB9XG5cbiAgaW5pdGlhbGlzZShjYWxsYmFjaykge1xuICAgIHRoaXMuY2xpZW50LmluaXRpYWxpc2UoZnVuY3Rpb24oY29udGVudCwgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyKSB7XG4gICAgICB0aGlzLnVzZXJJZGVudGlmaWVyID0gdXNlcklkZW50aWZpZXI7XG4gICAgICB0aGlzLnNlc3Npb25JZGVudGlmaWVyID0gc2Vzc2lvbklkZW50aWZpZXI7XG5cbiAgICAgIGNhbGxiYWNrKGNvbnRlbnQpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH1cblxuICBzZXREb2N1bWVudChkb2N1bWVudCkge1xuICAgIHRoaXMuZG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgfVxuXG4gIHN0YXJ0VXBkYXRlcygpIHtcbiAgICBjb25zdCBpbW1lZGlhdGVseSA9IGZhbHNlO1xuXG4gICAgdGhpcy5zY2hlZHVsZVVwZGF0ZShpbW1lZGlhdGVseSk7XG4gIH1cblxuICBzY2hlZHVsZVVwZGF0ZShpbW1lZGlhdGVseSkge1xuICAgIGNvbnN0IGRlbGF5ID0gaW1tZWRpYXRlbHkgP1xuICAgICAgICAgICAgICAgICAgICAwIDogLy8vXG4gICAgICAgICAgICAgICAgICAgICAgVVBEQVRFX0RFTEFZO1xuXG4gICAgaWYgKHRoaXMudGltZW91dCAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgfVxuXG4gICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZSgpLCBkZWxheSk7XG4gIH1cblxuICB1cGRhdGVEb2N1bWVudChwZW5kaW5nT3BlcmF0aW9ucykge1xuICAgIGNvbnN0IHVwVG9EYXRlID0gdGhpcy5kb2N1bWVudC51cGRhdGUocGVuZGluZ09wZXJhdGlvbnMpLFxuICAgICAgICAgIGltbWVkaWF0ZWx5ID0gIXVwVG9EYXRlO1xuXG4gICAgdGhpcy5zY2hlZHVsZVVwZGF0ZShpbW1lZGlhdGVseSk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgY29uc3Qgd29ya2luZ0NvbnRlbnQgPSB0aGlzLmRvY3VtZW50LmdldFdvcmtpbmdDb250ZW50KCksXG4gICAgICAgICAgZWRpdGFibGVDb250ZW50ID0gdGhpcy5kb2N1bWVudC5nZXRFZGl0YWJsZUNvbnRlbnQoKTtcblxuICAgIGNvbnN0IHN1Y2Nlc3MgPSB0aGlzLmNsaWVudC51cGRhdGUodGhpcy51c2VySWRlbnRpZmllciwgdGhpcy5zZXNzaW9uSWRlbnRpZmllciwgd29ya2luZ0NvbnRlbnQsIGVkaXRhYmxlQ29udGVudCwgcGVuZGluZ09wZXJhdGlvbnMgPT4gdGhpcy51cGRhdGVEb2N1bWVudChwZW5kaW5nT3BlcmF0aW9ucykpO1xuXG4gICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgIHRoaXMuZG9jdW1lbnQuc3luY2hyb25pc2VXb3JraW5nQ29udGVudCgpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmcm9tTm90aGluZygpIHtcbiAgICBjb25zdCBjbGllbnQgPSBDbGllbnQuZnJvbU5vdGhpbmcoKSxcbiAgICAgICAgICB0aW1lb3V0ID0gbnVsbCwgLy8vXG4gICAgICAgICAgZG9jdW1lbnQgPSBudWxsLCAgLy8vXG4gICAgICAgICAgdXNlcklkZW50aWZpZXIgPSBudWxsLCAgLy8vXG5cdFx0XHRcdFx0c2Vzc2lvbklkZW50aWZpZXIgPSBudWxsLFx0Ly8vXG4gICAgICAgICAgYWdlbnQgPSBuZXcgQWdlbnQoY2xpZW50LCB0aW1lb3V0LCBkb2N1bWVudCwgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyKTtcblxuICAgIHJldHVybiBhZ2VudDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEFnZW50O1xuIl19