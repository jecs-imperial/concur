'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Client = require('./client'),
    constants = require('./constants');

var UPDATE_INTERVAL = constants.UPDATE_INTERVAL;

var Agent = /*#__PURE__*/function () {
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
    key: "initialise",
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
    key: "setDocument",
    value: function setDocument(document) {
      this.document = document;
    }
  }, {
    key: "startUpdates",
    value: function startUpdates() {
      var _this2 = this;

      this.resetUpdates();
      var interval = UPDATE_INTERVAL;
      this.intervalIdentifier = setInterval(function () {
        return _this2.update();
      }, interval);
    }
  }, {
    key: "stopUpdates",
    value: function stopUpdates() {
      this.resetUpdates();
    }
  }, {
    key: "resetUpdates",
    value: function resetUpdates() {
      if (this.intervalIdentifier !== null) {
        clearInterval(this.intervalIdentifier);
        this.intervalIdentifier = null;
      }
    }
  }, {
    key: "update",
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
    key: "fromNothing",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFnZW50LmpzIl0sIm5hbWVzIjpbIkNsaWVudCIsInJlcXVpcmUiLCJjb25zdGFudHMiLCJVUERBVEVfSU5URVJWQUwiLCJBZ2VudCIsImNsaWVudCIsImJ1c3kiLCJkb2N1bWVudCIsInVzZXJJZGVudGlmaWVyIiwic2Vzc2lvbklkZW50aWZpZXIiLCJpbnRlcnZhbElkZW50aWZpZXIiLCJjYWxsYmFjayIsImluaXRpYWxpc2UiLCJjb250ZW50Iiwic3RhcnRVcGRhdGVzIiwicmVzZXRVcGRhdGVzIiwiaW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsInVwZGF0ZSIsImNsZWFySW50ZXJ2YWwiLCJ3b3JraW5nQ29udGVudCIsImdldFdvcmtpbmdDb250ZW50IiwiZWRpdGFibGVDb250ZW50IiwiZ2V0RWRpdGFibGVDb250ZW50Iiwic3VjY2VzcyIsInVwZGF0ZURvY3VtZW50Iiwic2Vzc2lvbkV4cGlyZWQiLCJwZW5kaW5nT3BlcmF0aW9ucyIsImFsZXJ0Iiwic3luY2hyb25pc2VXb3JraW5nQ29udGVudCIsImZyb21Ob3RoaW5nIiwiYWdlbnQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFFQSxJQUFNQSxNQUFNLEdBQUdDLE9BQU8sQ0FBQyxVQUFELENBQXRCO0FBQUEsSUFDTUMsU0FBUyxHQUFHRCxPQUFPLENBQUMsYUFBRCxDQUR6Qjs7SUFHUUUsZSxHQUFvQkQsUyxDQUFwQkMsZTs7SUFFRkMsSztBQUNKLGlCQUFZQyxNQUFaLEVBQW9CQyxJQUFwQixFQUEwQkMsUUFBMUIsRUFBb0NDLGNBQXBDLEVBQW9EQyxpQkFBcEQsRUFBdUVDLGtCQUF2RSxFQUEyRjtBQUFBOztBQUN6RixTQUFLSixJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLRCxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLRSxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtDLGNBQUwsR0FBc0JBLGNBQXRCO0FBQ0EsU0FBS0MsaUJBQUwsR0FBeUJBLGlCQUF6QjtBQUNBLFNBQUtDLGtCQUFMLEdBQTBCQSxrQkFBMUI7QUFDRDs7OzsrQkFFVUMsUSxFQUFVO0FBQUE7O0FBQ25CLFdBQUtOLE1BQUwsQ0FBWU8sVUFBWixDQUF1QixVQUFDQyxPQUFELEVBQVVMLGNBQVYsRUFBMEJDLGlCQUExQixFQUFnRDtBQUNyRSxRQUFBLEtBQUksQ0FBQ0QsY0FBTCxHQUFzQkEsY0FBdEI7QUFFQSxRQUFBLEtBQUksQ0FBQ0MsaUJBQUwsR0FBeUJBLGlCQUF6Qjs7QUFFQSxRQUFBLEtBQUksQ0FBQ0ssWUFBTDs7QUFFQUgsUUFBQUEsUUFBUSxDQUFDRSxPQUFELENBQVI7QUFDRCxPQVJEO0FBU0Q7OztnQ0FFV04sUSxFQUFVO0FBQ3BCLFdBQUtBLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0Q7OzttQ0FFYztBQUFBOztBQUNiLFdBQUtRLFlBQUw7QUFFQSxVQUFNQyxRQUFRLEdBQUdiLGVBQWpCO0FBRUEsV0FBS08sa0JBQUwsR0FBMEJPLFdBQVcsQ0FBQztBQUFBLGVBQU0sTUFBSSxDQUFDQyxNQUFMLEVBQU47QUFBQSxPQUFELEVBQXNCRixRQUF0QixDQUFyQztBQUNEOzs7a0NBRWE7QUFDWixXQUFLRCxZQUFMO0FBQ0Q7OzttQ0FFYztBQUNiLFVBQUksS0FBS0wsa0JBQUwsS0FBNEIsSUFBaEMsRUFBc0M7QUFDcENTLFFBQUFBLGFBQWEsQ0FBQyxLQUFLVCxrQkFBTixDQUFiO0FBRUEsYUFBS0Esa0JBQUwsR0FBMEIsSUFBMUI7QUFDRDtBQUNGOzs7NkJBRVE7QUFBQTs7QUFDUCxVQUFJLEtBQUtKLElBQVQsRUFBZTtBQUNiO0FBQ0Q7O0FBRUQsVUFBTWMsY0FBYyxHQUFHLEtBQUtiLFFBQUwsQ0FBY2MsaUJBQWQsRUFBdkI7QUFBQSxVQUNNQyxlQUFlLEdBQUcsS0FBS2YsUUFBTCxDQUFjZ0Isa0JBQWQsRUFEeEI7QUFHQSxXQUFLakIsSUFBTCxHQUFZLElBQVo7QUFFQSxVQUFNa0IsT0FBTyxHQUFHLEtBQUtuQixNQUFMLENBQVlvQixjQUFaLENBQTJCLEtBQUtqQixjQUFoQyxFQUFnRCxLQUFLQyxpQkFBckQsRUFBd0VXLGNBQXhFLEVBQXdGRSxlQUF4RixFQUF5RyxVQUFDSSxjQUFELEVBQWlCQyxpQkFBakIsRUFBdUM7QUFDL0osWUFBSUQsY0FBSixFQUFvQjtBQUNyQkUsVUFBQUEsS0FBSyxDQUFDLDBDQUFELENBQUw7QUFFQTtBQUNBOztBQUVFLFFBQUEsTUFBSSxDQUFDckIsUUFBTCxDQUFjVyxNQUFkLENBQXFCUyxpQkFBckI7O0FBRUQsUUFBQSxNQUFJLENBQUNyQixJQUFMLEdBQVksS0FBWjtBQUNGLE9BVmlCLENBQWhCOztBQVlBLFVBQUlrQixPQUFKLEVBQWE7QUFDWCxhQUFLakIsUUFBTCxDQUFjc0IseUJBQWQ7QUFDRCxPQUZELE1BRU87QUFDTCxhQUFLdkIsSUFBTCxHQUFZLEtBQVo7QUFDRDtBQUNGOzs7a0NBRW9CO0FBQ25CLFVBQU1ELE1BQU0sR0FBR0wsTUFBTSxDQUFDOEIsV0FBUCxFQUFmO0FBQUEsVUFDTXhCLElBQUksR0FBRyxLQURiO0FBQUEsVUFFTUMsUUFBUSxHQUFHLElBRmpCO0FBQUEsVUFFd0I7QUFDbEJDLE1BQUFBLGNBQWMsR0FBRyxJQUh2QjtBQUFBLFVBRzhCO0FBQzdCQyxNQUFBQSxpQkFBaUIsR0FBRyxJQUpyQjtBQUFBLFVBSTJCO0FBQ3JCQyxNQUFBQSxrQkFBa0IsR0FBRyxJQUwzQjtBQUFBLFVBS2lDO0FBQzNCcUIsTUFBQUEsS0FBSyxHQUFHLElBQUkzQixLQUFKLENBQVVDLE1BQVYsRUFBa0JDLElBQWxCLEVBQXdCQyxRQUF4QixFQUFrQ0MsY0FBbEMsRUFBa0RDLGlCQUFsRCxFQUFxRUMsa0JBQXJFLENBTmQ7QUFRQSxhQUFPcUIsS0FBUDtBQUNEOzs7Ozs7QUFHSEMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCN0IsS0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IENsaWVudCA9IHJlcXVpcmUoJy4vY2xpZW50JyksXG4gICAgICBjb25zdGFudHMgPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuXG5jb25zdCB7IFVQREFURV9JTlRFUlZBTCB9ID0gY29uc3RhbnRzO1xuXG5jbGFzcyBBZ2VudCB7XG4gIGNvbnN0cnVjdG9yKGNsaWVudCwgYnVzeSwgZG9jdW1lbnQsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllciwgaW50ZXJ2YWxJZGVudGlmaWVyKSB7XG4gICAgdGhpcy5idXN5ID0gYnVzeTtcbiAgICB0aGlzLmNsaWVudCA9IGNsaWVudDtcbiAgICB0aGlzLmRvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgdGhpcy51c2VySWRlbnRpZmllciA9IHVzZXJJZGVudGlmaWVyO1xuICAgIHRoaXMuc2Vzc2lvbklkZW50aWZpZXIgPSBzZXNzaW9uSWRlbnRpZmllcjtcbiAgICB0aGlzLmludGVydmFsSWRlbnRpZmllciA9IGludGVydmFsSWRlbnRpZmllcjtcbiAgfVxuXG4gIGluaXRpYWxpc2UoY2FsbGJhY2spIHtcbiAgICB0aGlzLmNsaWVudC5pbml0aWFsaXNlKChjb250ZW50LCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpID0+IHtcbiAgICAgIHRoaXMudXNlcklkZW50aWZpZXIgPSB1c2VySWRlbnRpZmllcjtcblxuICAgICAgdGhpcy5zZXNzaW9uSWRlbnRpZmllciA9IHNlc3Npb25JZGVudGlmaWVyO1xuXG4gICAgICB0aGlzLnN0YXJ0VXBkYXRlcygpO1xuXG4gICAgICBjYWxsYmFjayhjb250ZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldERvY3VtZW50KGRvY3VtZW50KSB7XG4gICAgdGhpcy5kb2N1bWVudCA9IGRvY3VtZW50O1xuICB9XG5cbiAgc3RhcnRVcGRhdGVzKCkge1xuICAgIHRoaXMucmVzZXRVcGRhdGVzKCk7XG5cbiAgICBjb25zdCBpbnRlcnZhbCA9IFVQREFURV9JTlRFUlZBTDtcblxuICAgIHRoaXMuaW50ZXJ2YWxJZGVudGlmaWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy51cGRhdGUoKSwgaW50ZXJ2YWwpO1xuICB9XG5cbiAgc3RvcFVwZGF0ZXMoKSB7XG4gICAgdGhpcy5yZXNldFVwZGF0ZXMoKTtcbiAgfVxuXG4gIHJlc2V0VXBkYXRlcygpIHtcbiAgICBpZiAodGhpcy5pbnRlcnZhbElkZW50aWZpZXIgIT09IG51bGwpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElkZW50aWZpZXIpO1xuXG4gICAgICB0aGlzLmludGVydmFsSWRlbnRpZmllciA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIGlmICh0aGlzLmJ1c3kpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB3b3JraW5nQ29udGVudCA9IHRoaXMuZG9jdW1lbnQuZ2V0V29ya2luZ0NvbnRlbnQoKSxcbiAgICAgICAgICBlZGl0YWJsZUNvbnRlbnQgPSB0aGlzLmRvY3VtZW50LmdldEVkaXRhYmxlQ29udGVudCgpO1xuXG4gICAgdGhpcy5idXN5ID0gdHJ1ZTtcblxuICAgIGNvbnN0IHN1Y2Nlc3MgPSB0aGlzLmNsaWVudC51cGRhdGVEb2N1bWVudCh0aGlzLnVzZXJJZGVudGlmaWVyLCB0aGlzLnNlc3Npb25JZGVudGlmaWVyLCB3b3JraW5nQ29udGVudCwgZWRpdGFibGVDb250ZW50LCAoc2Vzc2lvbkV4cGlyZWQsIHBlbmRpbmdPcGVyYXRpb25zKSA9PiB7XG4gICAgXHRpZiAoc2Vzc2lvbkV4cGlyZWQpIHtcblx0XHRcdFx0YWxlcnQoJ1RoZSBzZXNzaW9uIGhhcyBleHBpcmVkLiBQbGVhc2UgcmVmcmVzaCEnKTtcblxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cbiAgICAgIHRoaXMuZG9jdW1lbnQudXBkYXRlKHBlbmRpbmdPcGVyYXRpb25zKTtcblxuICAgIFx0dGhpcy5idXN5ID0gZmFsc2U7XG5cdFx0fSk7XG5cbiAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgdGhpcy5kb2N1bWVudC5zeW5jaHJvbmlzZVdvcmtpbmdDb250ZW50KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYnVzeSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmcm9tTm90aGluZygpIHtcbiAgICBjb25zdCBjbGllbnQgPSBDbGllbnQuZnJvbU5vdGhpbmcoKSxcbiAgICAgICAgICBidXN5ID0gZmFsc2UsXG4gICAgICAgICAgZG9jdW1lbnQgPSBudWxsLCAgLy8vXG4gICAgICAgICAgdXNlcklkZW50aWZpZXIgPSBudWxsLCAgLy8vXG5cdFx0XHRcdFx0c2Vzc2lvbklkZW50aWZpZXIgPSBudWxsLFx0Ly8vXG4gICAgICAgICAgaW50ZXJ2YWxJZGVudGlmaWVyID0gbnVsbCwgLy8vXG4gICAgICAgICAgYWdlbnQgPSBuZXcgQWdlbnQoY2xpZW50LCBidXN5LCBkb2N1bWVudCwgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyLCBpbnRlcnZhbElkZW50aWZpZXIpO1xuXG4gICAgcmV0dXJuIGFnZW50O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQWdlbnQ7XG4iXX0=