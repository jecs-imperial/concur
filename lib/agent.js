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

      var workingContent = this.document.getWorkingContent(),
          editableContent = this.document.getEditableContent();

      this.busy = true;

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
      } else {
        this.busy = false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9hZ2VudC5qcyJdLCJuYW1lcyI6WyJDbGllbnQiLCJyZXF1aXJlIiwiY29uc3RhbnRzIiwiVVBEQVRFX0lOVEVSVkFMIiwiQWdlbnQiLCJjbGllbnQiLCJidXN5IiwiZG9jdW1lbnQiLCJ1c2VySWRlbnRpZmllciIsInNlc3Npb25JZGVudGlmaWVyIiwiaW50ZXJ2YWxJZGVudGlmaWVyIiwiY2FsbGJhY2siLCJpbml0aWFsaXNlIiwiY29udGVudCIsInN0YXJ0VXBkYXRlcyIsInJlc2V0VXBkYXRlcyIsImludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJ1cGRhdGUiLCJjbGVhckludGVydmFsIiwid29ya2luZ0NvbnRlbnQiLCJnZXRXb3JraW5nQ29udGVudCIsImVkaXRhYmxlQ29udGVudCIsImdldEVkaXRhYmxlQ29udGVudCIsInN1Y2Nlc3MiLCJ1cGRhdGVEb2N1bWVudCIsInNlc3Npb25FeHBpcmVkIiwicGVuZGluZ09wZXJhdGlvbnMiLCJhbGVydCIsInN5bmNocm9uaXNlV29ya2luZ0NvbnRlbnQiLCJmcm9tTm90aGluZyIsImFnZW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBLElBQU1BLFNBQVNDLFFBQVEsVUFBUixDQUFmO0FBQUEsSUFDTUMsWUFBWUQsUUFBUSxhQUFSLENBRGxCOztJQUdRRSxlLEdBQW9CRCxTLENBQXBCQyxlOztJQUVGQyxLO0FBQ0osaUJBQVlDLE1BQVosRUFBb0JDLElBQXBCLEVBQTBCQyxRQUExQixFQUFvQ0MsY0FBcEMsRUFBb0RDLGlCQUFwRCxFQUF1RUMsa0JBQXZFLEVBQTJGO0FBQUE7O0FBQ3pGLFNBQUtKLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtELE1BQUwsR0FBY0EsTUFBZDtBQUNBLFNBQUtFLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS0MsY0FBTCxHQUFzQkEsY0FBdEI7QUFDQSxTQUFLQyxpQkFBTCxHQUF5QkEsaUJBQXpCO0FBQ0EsU0FBS0Msa0JBQUwsR0FBMEJBLGtCQUExQjtBQUNEOzs7OytCQUVVQyxRLEVBQVU7QUFBQTs7QUFDbkIsV0FBS04sTUFBTCxDQUFZTyxVQUFaLENBQXVCLFVBQUNDLE9BQUQsRUFBVUwsY0FBVixFQUEwQkMsaUJBQTFCLEVBQWdEO0FBQ3JFLGNBQUtELGNBQUwsR0FBc0JBLGNBQXRCOztBQUVBLGNBQUtDLGlCQUFMLEdBQXlCQSxpQkFBekI7O0FBRUEsY0FBS0ssWUFBTDs7QUFFQUgsaUJBQVNFLE9BQVQ7QUFDRCxPQVJEO0FBU0Q7OztnQ0FFV04sUSxFQUFVO0FBQ3BCLFdBQUtBLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0Q7OzttQ0FFYztBQUFBOztBQUNiLFdBQUtRLFlBQUw7O0FBRUEsVUFBTUMsV0FBV2IsZUFBakI7O0FBRUEsV0FBS08sa0JBQUwsR0FBMEJPLFlBQVk7QUFBQSxlQUFNLE9BQUtDLE1BQUwsRUFBTjtBQUFBLE9BQVosRUFBaUNGLFFBQWpDLENBQTFCO0FBQ0Q7OztrQ0FFYTtBQUNaLFdBQUtELFlBQUw7QUFDRDs7O21DQUVjO0FBQ2IsVUFBSSxLQUFLTCxrQkFBTCxLQUE0QixJQUFoQyxFQUFzQztBQUNwQ1Msc0JBQWMsS0FBS1Qsa0JBQW5COztBQUVBLGFBQUtBLGtCQUFMLEdBQTBCLElBQTFCO0FBQ0Q7QUFDRjs7OzZCQUVRO0FBQUE7O0FBQ1AsVUFBSSxLQUFLSixJQUFULEVBQWU7QUFDYjtBQUNEOztBQUVELFVBQU1jLGlCQUFpQixLQUFLYixRQUFMLENBQWNjLGlCQUFkLEVBQXZCO0FBQUEsVUFDTUMsa0JBQWtCLEtBQUtmLFFBQUwsQ0FBY2dCLGtCQUFkLEVBRHhCOztBQUdBLFdBQUtqQixJQUFMLEdBQVksSUFBWjs7QUFFQSxVQUFNa0IsVUFBVSxLQUFLbkIsTUFBTCxDQUFZb0IsY0FBWixDQUEyQixLQUFLakIsY0FBaEMsRUFBZ0QsS0FBS0MsaUJBQXJELEVBQXdFVyxjQUF4RSxFQUF3RkUsZUFBeEYsRUFBeUcsVUFBQ0ksY0FBRCxFQUFpQkMsaUJBQWpCLEVBQXVDO0FBQy9KLFlBQUlELGNBQUosRUFBb0I7QUFDckJFLGdCQUFNLDBDQUFOOztBQUVBO0FBQ0E7O0FBRUUsZUFBS3JCLFFBQUwsQ0FBY1csTUFBZCxDQUFxQlMsaUJBQXJCOztBQUVELGVBQUtyQixJQUFMLEdBQVksS0FBWjtBQUNGLE9BVmlCLENBQWhCOztBQVlBLFVBQUlrQixPQUFKLEVBQWE7QUFDWCxhQUFLakIsUUFBTCxDQUFjc0IseUJBQWQ7QUFDRCxPQUZELE1BRU87QUFDTCxhQUFLdkIsSUFBTCxHQUFZLEtBQVo7QUFDRDtBQUNGOzs7a0NBRW9CO0FBQ25CLFVBQU1ELFNBQVNMLE9BQU84QixXQUFQLEVBQWY7QUFBQSxVQUNNeEIsT0FBTyxLQURiO0FBQUEsVUFFTUMsV0FBVyxJQUZqQjtBQUFBLFVBRXdCO0FBQ2xCQyx1QkFBaUIsSUFIdkI7QUFBQSxVQUc4QjtBQUM3QkMsMEJBQW9CLElBSnJCO0FBQUEsVUFJMkI7QUFDckJDLDJCQUFxQixJQUwzQjtBQUFBLFVBS2lDO0FBQzNCcUIsY0FBUSxJQUFJM0IsS0FBSixDQUFVQyxNQUFWLEVBQWtCQyxJQUFsQixFQUF3QkMsUUFBeEIsRUFBa0NDLGNBQWxDLEVBQWtEQyxpQkFBbEQsRUFBcUVDLGtCQUFyRSxDQU5kOztBQVFBLGFBQU9xQixLQUFQO0FBQ0Q7Ozs7OztBQUdIQyxPQUFPQyxPQUFQLEdBQWlCN0IsS0FBakIiLCJmaWxlIjoiYWdlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IENsaWVudCA9IHJlcXVpcmUoJy4vY2xpZW50JyksXG4gICAgICBjb25zdGFudHMgPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuXG5jb25zdCB7IFVQREFURV9JTlRFUlZBTCB9ID0gY29uc3RhbnRzO1xuXG5jbGFzcyBBZ2VudCB7XG4gIGNvbnN0cnVjdG9yKGNsaWVudCwgYnVzeSwgZG9jdW1lbnQsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllciwgaW50ZXJ2YWxJZGVudGlmaWVyKSB7XG4gICAgdGhpcy5idXN5ID0gYnVzeTtcbiAgICB0aGlzLmNsaWVudCA9IGNsaWVudDtcbiAgICB0aGlzLmRvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgdGhpcy51c2VySWRlbnRpZmllciA9IHVzZXJJZGVudGlmaWVyO1xuICAgIHRoaXMuc2Vzc2lvbklkZW50aWZpZXIgPSBzZXNzaW9uSWRlbnRpZmllcjtcbiAgICB0aGlzLmludGVydmFsSWRlbnRpZmllciA9IGludGVydmFsSWRlbnRpZmllcjtcbiAgfVxuXG4gIGluaXRpYWxpc2UoY2FsbGJhY2spIHtcbiAgICB0aGlzLmNsaWVudC5pbml0aWFsaXNlKChjb250ZW50LCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpID0+IHtcbiAgICAgIHRoaXMudXNlcklkZW50aWZpZXIgPSB1c2VySWRlbnRpZmllcjtcblxuICAgICAgdGhpcy5zZXNzaW9uSWRlbnRpZmllciA9IHNlc3Npb25JZGVudGlmaWVyO1xuXG4gICAgICB0aGlzLnN0YXJ0VXBkYXRlcygpO1xuXG4gICAgICBjYWxsYmFjayhjb250ZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldERvY3VtZW50KGRvY3VtZW50KSB7XG4gICAgdGhpcy5kb2N1bWVudCA9IGRvY3VtZW50O1xuICB9XG5cbiAgc3RhcnRVcGRhdGVzKCkge1xuICAgIHRoaXMucmVzZXRVcGRhdGVzKCk7XG5cbiAgICBjb25zdCBpbnRlcnZhbCA9IFVQREFURV9JTlRFUlZBTDtcblxuICAgIHRoaXMuaW50ZXJ2YWxJZGVudGlmaWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy51cGRhdGUoKSwgaW50ZXJ2YWwpO1xuICB9XG5cbiAgc3RvcFVwZGF0ZXMoKSB7XG4gICAgdGhpcy5yZXNldFVwZGF0ZXMoKTtcbiAgfVxuXG4gIHJlc2V0VXBkYXRlcygpIHtcbiAgICBpZiAodGhpcy5pbnRlcnZhbElkZW50aWZpZXIgIT09IG51bGwpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElkZW50aWZpZXIpO1xuXG4gICAgICB0aGlzLmludGVydmFsSWRlbnRpZmllciA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIGlmICh0aGlzLmJ1c3kpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB3b3JraW5nQ29udGVudCA9IHRoaXMuZG9jdW1lbnQuZ2V0V29ya2luZ0NvbnRlbnQoKSxcbiAgICAgICAgICBlZGl0YWJsZUNvbnRlbnQgPSB0aGlzLmRvY3VtZW50LmdldEVkaXRhYmxlQ29udGVudCgpO1xuXG4gICAgdGhpcy5idXN5ID0gdHJ1ZTtcblxuICAgIGNvbnN0IHN1Y2Nlc3MgPSB0aGlzLmNsaWVudC51cGRhdGVEb2N1bWVudCh0aGlzLnVzZXJJZGVudGlmaWVyLCB0aGlzLnNlc3Npb25JZGVudGlmaWVyLCB3b3JraW5nQ29udGVudCwgZWRpdGFibGVDb250ZW50LCAoc2Vzc2lvbkV4cGlyZWQsIHBlbmRpbmdPcGVyYXRpb25zKSA9PiB7XG4gICAgXHRpZiAoc2Vzc2lvbkV4cGlyZWQpIHtcblx0XHRcdFx0YWxlcnQoJ1RoZSBzZXNzaW9uIGhhcyBleHBpcmVkLiBQbGVhc2UgcmVmcmVzaCEnKTtcblxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cbiAgICAgIHRoaXMuZG9jdW1lbnQudXBkYXRlKHBlbmRpbmdPcGVyYXRpb25zKTtcblxuICAgIFx0dGhpcy5idXN5ID0gZmFsc2U7XG5cdFx0fSk7XG5cbiAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgdGhpcy5kb2N1bWVudC5zeW5jaHJvbmlzZVdvcmtpbmdDb250ZW50KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYnVzeSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmcm9tTm90aGluZygpIHtcbiAgICBjb25zdCBjbGllbnQgPSBDbGllbnQuZnJvbU5vdGhpbmcoKSxcbiAgICAgICAgICBidXN5ID0gZmFsc2UsXG4gICAgICAgICAgZG9jdW1lbnQgPSBudWxsLCAgLy8vXG4gICAgICAgICAgdXNlcklkZW50aWZpZXIgPSBudWxsLCAgLy8vXG5cdFx0XHRcdFx0c2Vzc2lvbklkZW50aWZpZXIgPSBudWxsLFx0Ly8vXG4gICAgICAgICAgaW50ZXJ2YWxJZGVudGlmaWVyID0gbnVsbCwgLy8vXG4gICAgICAgICAgYWdlbnQgPSBuZXcgQWdlbnQoY2xpZW50LCBidXN5LCBkb2N1bWVudCwgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyLCBpbnRlcnZhbElkZW50aWZpZXIpO1xuXG4gICAgcmV0dXJuIGFnZW50O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQWdlbnQ7XG4iXX0=