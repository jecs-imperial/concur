'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = require('./client'),
    constants = require('./constants');

var UPDATE_INTERVAL = constants.UPDATE_INTERVAL;

var Agent = function () {
  function Agent(client, busy, document, userIdentifier, sessionIdentifier, intervalIdentifier) {
    _classCallCheck(this, Agent);

    this.busy = busy;
    this.client = client;
    this.document = document;
    this.userIdentifier = userIdentifier;
    this.sessionIdentifier = sessionIdentifier;
    this.intervalIdentifier = intervalIdentifier;
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
    key: 'startUpdates',
    value: function startUpdates() {
      var _this2 = this;

      this.resetUpdates();

      var interval = UPDATE_INTERVAL;

      this.intervalIdentifier = setInterval(function () {
        return _this2.update();
      }, interval);
    }
  }, {
    key: 'stopUpdates',
    value: function stopUpdates() {
      this.resetUpdates();
    }
  }, {
    key: 'resetUpdates',
    value: function resetUpdates() {
      if (this.intervalIdentifier !== null) {
        clearInterval(this.intervalIdentifier);

        this.intervalIdentifier = null;
      }
    }
  }, {
    key: 'update',
    value: function update() {
      var _this3 = this;

      if (this.busy) {
        return;
      }

      this.busy = true;

      var workingContent = this.document.getWorkingContent(),
          editableContent = this.document.getEditableContent();

      var success = this.client.updateDocument(this.userIdentifier, this.sessionIdentifier, workingContent, editableContent, function (sessionExpired, pendingOperations) {
        if (sessionExpired) {
          alert('The session has expired. Please refresh!');

          return;
        }

        _this3.document.update(pendingOperations);

        _this3.busy = false;
      });

      if (success) {
        this.document.synchroniseWorkingContent();
      }
    }
  }], [{
    key: 'fromNothing',
    value: function fromNothing() {
      var client = Client.fromNothing(),
          busy = false,
          document = null,
          ///
      userIdentifier = null,
          ///
      sessionIdentifier = null,
          ///
      intervalIdentifier = null,
          ///
      agent = new Agent(client, busy, document, userIdentifier, sessionIdentifier, intervalIdentifier);

      return agent;
    }
  }]);

  return Agent;
}();

module.exports = Agent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9hZ2VudC5qcyJdLCJuYW1lcyI6WyJDbGllbnQiLCJyZXF1aXJlIiwiY29uc3RhbnRzIiwiVVBEQVRFX0lOVEVSVkFMIiwiQWdlbnQiLCJjbGllbnQiLCJidXN5IiwiZG9jdW1lbnQiLCJ1c2VySWRlbnRpZmllciIsInNlc3Npb25JZGVudGlmaWVyIiwiaW50ZXJ2YWxJZGVudGlmaWVyIiwiY2FsbGJhY2siLCJpbml0aWFsaXNlIiwiY29udGVudCIsInN0YXJ0VXBkYXRlcyIsInJlc2V0VXBkYXRlcyIsImludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJ1cGRhdGUiLCJjbGVhckludGVydmFsIiwid29ya2luZ0NvbnRlbnQiLCJnZXRXb3JraW5nQ29udGVudCIsImVkaXRhYmxlQ29udGVudCIsImdldEVkaXRhYmxlQ29udGVudCIsInN1Y2Nlc3MiLCJ1cGRhdGVEb2N1bWVudCIsInNlc3Npb25FeHBpcmVkIiwicGVuZGluZ09wZXJhdGlvbnMiLCJhbGVydCIsInN5bmNocm9uaXNlV29ya2luZ0NvbnRlbnQiLCJmcm9tTm90aGluZyIsImFnZW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBLElBQU1BLFNBQVNDLFFBQVEsVUFBUixDQUFmO0FBQUEsSUFDTUMsWUFBWUQsUUFBUSxhQUFSLENBRGxCOztJQUdRRSxlLEdBQW9CRCxTLENBQXBCQyxlOztJQUVGQyxLO0FBQ0osaUJBQVlDLE1BQVosRUFBb0JDLElBQXBCLEVBQTBCQyxRQUExQixFQUFvQ0MsY0FBcEMsRUFBb0RDLGlCQUFwRCxFQUF1RUMsa0JBQXZFLEVBQTJGO0FBQUE7O0FBQ3pGLFNBQUtKLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtELE1BQUwsR0FBY0EsTUFBZDtBQUNBLFNBQUtFLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS0MsY0FBTCxHQUFzQkEsY0FBdEI7QUFDQSxTQUFLQyxpQkFBTCxHQUF5QkEsaUJBQXpCO0FBQ0EsU0FBS0Msa0JBQUwsR0FBMEJBLGtCQUExQjtBQUNEOzs7OytCQUVVQyxRLEVBQVU7QUFBQTs7QUFDbkIsV0FBS04sTUFBTCxDQUFZTyxVQUFaLENBQXVCLFVBQUNDLE9BQUQsRUFBVUwsY0FBVixFQUEwQkMsaUJBQTFCLEVBQWdEO0FBQ3JFLGNBQUtELGNBQUwsR0FBc0JBLGNBQXRCOztBQUVBLGNBQUtDLGlCQUFMLEdBQXlCQSxpQkFBekI7O0FBRUEsY0FBS0ssWUFBTDs7QUFFQUgsaUJBQVNFLE9BQVQ7QUFDRCxPQVJEO0FBU0Q7OztnQ0FFV04sUSxFQUFVO0FBQ3BCLFdBQUtBLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0Q7OzttQ0FFYztBQUFBOztBQUNiLFdBQUtRLFlBQUw7O0FBRUEsVUFBTUMsV0FBV2IsZUFBakI7O0FBRUEsV0FBS08sa0JBQUwsR0FBMEJPLFlBQVk7QUFBQSxlQUFNLE9BQUtDLE1BQUwsRUFBTjtBQUFBLE9BQVosRUFBaUNGLFFBQWpDLENBQTFCO0FBQ0Q7OztrQ0FFYTtBQUNaLFdBQUtELFlBQUw7QUFDRDs7O21DQUVjO0FBQ2IsVUFBSSxLQUFLTCxrQkFBTCxLQUE0QixJQUFoQyxFQUFzQztBQUNwQ1Msc0JBQWMsS0FBS1Qsa0JBQW5COztBQUVBLGFBQUtBLGtCQUFMLEdBQTBCLElBQTFCO0FBQ0Q7QUFDRjs7OzZCQUVRO0FBQUE7O0FBQ1AsVUFBSSxLQUFLSixJQUFULEVBQWU7QUFDYjtBQUNEOztBQUVELFdBQUtBLElBQUwsR0FBWSxJQUFaOztBQUVBLFVBQU1jLGlCQUFpQixLQUFLYixRQUFMLENBQWNjLGlCQUFkLEVBQXZCO0FBQUEsVUFDTUMsa0JBQWtCLEtBQUtmLFFBQUwsQ0FBY2dCLGtCQUFkLEVBRHhCOztBQUdBLFVBQU1DLFVBQVUsS0FBS25CLE1BQUwsQ0FBWW9CLGNBQVosQ0FBMkIsS0FBS2pCLGNBQWhDLEVBQWdELEtBQUtDLGlCQUFyRCxFQUF3RVcsY0FBeEUsRUFBd0ZFLGVBQXhGLEVBQXlHLFVBQUNJLGNBQUQsRUFBaUJDLGlCQUFqQixFQUF1QztBQUMvSixZQUFJRCxjQUFKLEVBQW9CO0FBQ3JCRSxnQkFBTSwwQ0FBTjs7QUFFQTtBQUNBOztBQUVFLGVBQUtyQixRQUFMLENBQWNXLE1BQWQsQ0FBcUJTLGlCQUFyQjs7QUFFRCxlQUFLckIsSUFBTCxHQUFZLEtBQVo7QUFDRixPQVZpQixDQUFoQjs7QUFZQSxVQUFJa0IsT0FBSixFQUFhO0FBQ1gsYUFBS2pCLFFBQUwsQ0FBY3NCLHlCQUFkO0FBQ0Q7QUFDRjs7O2tDQUVvQjtBQUNuQixVQUFNeEIsU0FBU0wsT0FBTzhCLFdBQVAsRUFBZjtBQUFBLFVBQ014QixPQUFPLEtBRGI7QUFBQSxVQUVNQyxXQUFXLElBRmpCO0FBQUEsVUFFd0I7QUFDbEJDLHVCQUFpQixJQUh2QjtBQUFBLFVBRzhCO0FBQzdCQywwQkFBb0IsSUFKckI7QUFBQSxVQUkyQjtBQUNyQkMsMkJBQXFCLElBTDNCO0FBQUEsVUFLaUM7QUFDM0JxQixjQUFRLElBQUkzQixLQUFKLENBQVVDLE1BQVYsRUFBa0JDLElBQWxCLEVBQXdCQyxRQUF4QixFQUFrQ0MsY0FBbEMsRUFBa0RDLGlCQUFsRCxFQUFxRUMsa0JBQXJFLENBTmQ7O0FBUUEsYUFBT3FCLEtBQVA7QUFDRDs7Ozs7O0FBR0hDLE9BQU9DLE9BQVAsR0FBaUI3QixLQUFqQiIsImZpbGUiOiJhZ2VudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgQ2xpZW50ID0gcmVxdWlyZSgnLi9jbGllbnQnKSxcbiAgICAgIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG5cbmNvbnN0IHsgVVBEQVRFX0lOVEVSVkFMIH0gPSBjb25zdGFudHM7XG5cbmNsYXNzIEFnZW50IHtcbiAgY29uc3RydWN0b3IoY2xpZW50LCBidXN5LCBkb2N1bWVudCwgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyLCBpbnRlcnZhbElkZW50aWZpZXIpIHtcbiAgICB0aGlzLmJ1c3kgPSBidXN5O1xuICAgIHRoaXMuY2xpZW50ID0gY2xpZW50O1xuICAgIHRoaXMuZG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgICB0aGlzLnVzZXJJZGVudGlmaWVyID0gdXNlcklkZW50aWZpZXI7XG4gICAgdGhpcy5zZXNzaW9uSWRlbnRpZmllciA9IHNlc3Npb25JZGVudGlmaWVyO1xuICAgIHRoaXMuaW50ZXJ2YWxJZGVudGlmaWVyID0gaW50ZXJ2YWxJZGVudGlmaWVyO1xuICB9XG5cbiAgaW5pdGlhbGlzZShjYWxsYmFjaykge1xuICAgIHRoaXMuY2xpZW50LmluaXRpYWxpc2UoKGNvbnRlbnQsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllcikgPT4ge1xuICAgICAgdGhpcy51c2VySWRlbnRpZmllciA9IHVzZXJJZGVudGlmaWVyO1xuXG4gICAgICB0aGlzLnNlc3Npb25JZGVudGlmaWVyID0gc2Vzc2lvbklkZW50aWZpZXI7XG5cbiAgICAgIHRoaXMuc3RhcnRVcGRhdGVzKCk7XG5cbiAgICAgIGNhbGxiYWNrKGNvbnRlbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0RG9jdW1lbnQoZG9jdW1lbnQpIHtcbiAgICB0aGlzLmRvY3VtZW50ID0gZG9jdW1lbnQ7XG4gIH1cblxuICBzdGFydFVwZGF0ZXMoKSB7XG4gICAgdGhpcy5yZXNldFVwZGF0ZXMoKTtcblxuICAgIGNvbnN0IGludGVydmFsID0gVVBEQVRFX0lOVEVSVkFMO1xuXG4gICAgdGhpcy5pbnRlcnZhbElkZW50aWZpZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLnVwZGF0ZSgpLCBpbnRlcnZhbCk7XG4gIH1cblxuICBzdG9wVXBkYXRlcygpIHtcbiAgICB0aGlzLnJlc2V0VXBkYXRlcygpO1xuICB9XG5cbiAgcmVzZXRVcGRhdGVzKCkge1xuICAgIGlmICh0aGlzLmludGVydmFsSWRlbnRpZmllciAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSWRlbnRpZmllcik7XG5cbiAgICAgIHRoaXMuaW50ZXJ2YWxJZGVudGlmaWVyID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuYnVzeSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuYnVzeSA9IHRydWU7XG5cbiAgICBjb25zdCB3b3JraW5nQ29udGVudCA9IHRoaXMuZG9jdW1lbnQuZ2V0V29ya2luZ0NvbnRlbnQoKSxcbiAgICAgICAgICBlZGl0YWJsZUNvbnRlbnQgPSB0aGlzLmRvY3VtZW50LmdldEVkaXRhYmxlQ29udGVudCgpO1xuXG4gICAgY29uc3Qgc3VjY2VzcyA9IHRoaXMuY2xpZW50LnVwZGF0ZURvY3VtZW50KHRoaXMudXNlcklkZW50aWZpZXIsIHRoaXMuc2Vzc2lvbklkZW50aWZpZXIsIHdvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnQsIChzZXNzaW9uRXhwaXJlZCwgcGVuZGluZ09wZXJhdGlvbnMpID0+IHtcbiAgICBcdGlmIChzZXNzaW9uRXhwaXJlZCkge1xuXHRcdFx0XHRhbGVydCgnVGhlIHNlc3Npb24gaGFzIGV4cGlyZWQuIFBsZWFzZSByZWZyZXNoIScpO1xuXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuICAgICAgdGhpcy5kb2N1bWVudC51cGRhdGUocGVuZGluZ09wZXJhdGlvbnMpO1xuXG4gICAgXHR0aGlzLmJ1c3kgPSBmYWxzZTtcblx0XHR9KTtcblxuICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICB0aGlzLmRvY3VtZW50LnN5bmNocm9uaXNlV29ya2luZ0NvbnRlbnQoKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZnJvbU5vdGhpbmcoKSB7XG4gICAgY29uc3QgY2xpZW50ID0gQ2xpZW50LmZyb21Ob3RoaW5nKCksXG4gICAgICAgICAgYnVzeSA9IGZhbHNlLFxuICAgICAgICAgIGRvY3VtZW50ID0gbnVsbCwgIC8vL1xuICAgICAgICAgIHVzZXJJZGVudGlmaWVyID0gbnVsbCwgIC8vL1xuXHRcdFx0XHRcdHNlc3Npb25JZGVudGlmaWVyID0gbnVsbCxcdC8vL1xuICAgICAgICAgIGludGVydmFsSWRlbnRpZmllciA9IG51bGwsIC8vL1xuICAgICAgICAgIGFnZW50ID0gbmV3IEFnZW50KGNsaWVudCwgYnVzeSwgZG9jdW1lbnQsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllciwgaW50ZXJ2YWxJZGVudGlmaWVyKTtcblxuICAgIHJldHVybiBhZ2VudDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEFnZW50O1xuIl19