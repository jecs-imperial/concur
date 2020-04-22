"use strict";

var _client = _interopRequireDefault(require("./client"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
      var interval = _constants.UPDATE_INTERVAL;
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
          alert("The session has expired. Please refresh!");
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
      var client = _client["default"].fromNothing(),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFnZW50LmpzIl0sIm5hbWVzIjpbIkFnZW50IiwiY2xpZW50IiwiYnVzeSIsImRvY3VtZW50IiwidXNlcklkZW50aWZpZXIiLCJzZXNzaW9uSWRlbnRpZmllciIsImludGVydmFsSWRlbnRpZmllciIsImNhbGxiYWNrIiwiaW5pdGlhbGlzZSIsImNvbnRlbnQiLCJzdGFydFVwZGF0ZXMiLCJyZXNldFVwZGF0ZXMiLCJpbnRlcnZhbCIsIlVQREFURV9JTlRFUlZBTCIsInNldEludGVydmFsIiwidXBkYXRlIiwiY2xlYXJJbnRlcnZhbCIsIndvcmtpbmdDb250ZW50IiwiZ2V0V29ya2luZ0NvbnRlbnQiLCJlZGl0YWJsZUNvbnRlbnQiLCJnZXRFZGl0YWJsZUNvbnRlbnQiLCJzdWNjZXNzIiwidXBkYXRlRG9jdW1lbnQiLCJzZXNzaW9uRXhwaXJlZCIsInBlbmRpbmdPcGVyYXRpb25zIiwiYWxlcnQiLCJzeW5jaHJvbmlzZVdvcmtpbmdDb250ZW50IiwiQ2xpZW50IiwiZnJvbU5vdGhpbmciLCJhZ2VudCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOztBQUVBOzs7Ozs7Ozs7O0lBRU1BLEs7QUFDSixpQkFBWUMsTUFBWixFQUFvQkMsSUFBcEIsRUFBMEJDLFFBQTFCLEVBQW9DQyxjQUFwQyxFQUFvREMsaUJBQXBELEVBQXVFQyxrQkFBdkUsRUFBMkY7QUFBQTs7QUFDekYsU0FBS0osSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0QsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsU0FBS0UsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLQyxjQUFMLEdBQXNCQSxjQUF0QjtBQUNBLFNBQUtDLGlCQUFMLEdBQXlCQSxpQkFBekI7QUFDQSxTQUFLQyxrQkFBTCxHQUEwQkEsa0JBQTFCO0FBQ0Q7Ozs7K0JBRVVDLFEsRUFBVTtBQUFBOztBQUNuQixXQUFLTixNQUFMLENBQVlPLFVBQVosQ0FBdUIsVUFBQ0MsT0FBRCxFQUFVTCxjQUFWLEVBQTBCQyxpQkFBMUIsRUFBZ0Q7QUFDckUsUUFBQSxLQUFJLENBQUNELGNBQUwsR0FBc0JBLGNBQXRCO0FBRUEsUUFBQSxLQUFJLENBQUNDLGlCQUFMLEdBQXlCQSxpQkFBekI7O0FBRUEsUUFBQSxLQUFJLENBQUNLLFlBQUw7O0FBRUFILFFBQUFBLFFBQVEsQ0FBQ0UsT0FBRCxDQUFSO0FBQ0QsT0FSRDtBQVNEOzs7Z0NBRVdOLFEsRUFBVTtBQUNwQixXQUFLQSxRQUFMLEdBQWdCQSxRQUFoQjtBQUNEOzs7bUNBRWM7QUFBQTs7QUFDYixXQUFLUSxZQUFMO0FBRUEsVUFBTUMsUUFBUSxHQUFHQywwQkFBakI7QUFFQSxXQUFLUCxrQkFBTCxHQUEwQlEsV0FBVyxDQUFDO0FBQUEsZUFBTSxNQUFJLENBQUNDLE1BQUwsRUFBTjtBQUFBLE9BQUQsRUFBc0JILFFBQXRCLENBQXJDO0FBQ0Q7OztrQ0FFYTtBQUNaLFdBQUtELFlBQUw7QUFDRDs7O21DQUVjO0FBQ2IsVUFBSSxLQUFLTCxrQkFBTCxLQUE0QixJQUFoQyxFQUFzQztBQUNwQ1UsUUFBQUEsYUFBYSxDQUFDLEtBQUtWLGtCQUFOLENBQWI7QUFFQSxhQUFLQSxrQkFBTCxHQUEwQixJQUExQjtBQUNEO0FBQ0Y7Ozs2QkFFUTtBQUFBOztBQUNQLFVBQUksS0FBS0osSUFBVCxFQUFlO0FBQ2I7QUFDRDs7QUFFRCxVQUFNZSxjQUFjLEdBQUcsS0FBS2QsUUFBTCxDQUFjZSxpQkFBZCxFQUF2QjtBQUFBLFVBQ01DLGVBQWUsR0FBRyxLQUFLaEIsUUFBTCxDQUFjaUIsa0JBQWQsRUFEeEI7QUFHQSxXQUFLbEIsSUFBTCxHQUFZLElBQVo7QUFFQSxVQUFNbUIsT0FBTyxHQUFHLEtBQUtwQixNQUFMLENBQVlxQixjQUFaLENBQTJCLEtBQUtsQixjQUFoQyxFQUFnRCxLQUFLQyxpQkFBckQsRUFBd0VZLGNBQXhFLEVBQXdGRSxlQUF4RixFQUF5RyxVQUFDSSxjQUFELEVBQWlCQyxpQkFBakIsRUFBdUM7QUFDL0osWUFBSUQsY0FBSixFQUFvQjtBQUNyQkUsVUFBQUEsS0FBSyxDQUFDLDBDQUFELENBQUw7QUFFQTtBQUNBOztBQUVFLFFBQUEsTUFBSSxDQUFDdEIsUUFBTCxDQUFjWSxNQUFkLENBQXFCUyxpQkFBckI7O0FBRUQsUUFBQSxNQUFJLENBQUN0QixJQUFMLEdBQVksS0FBWjtBQUNGLE9BVmlCLENBQWhCOztBQVlBLFVBQUltQixPQUFKLEVBQWE7QUFDWCxhQUFLbEIsUUFBTCxDQUFjdUIseUJBQWQ7QUFDRCxPQUZELE1BRU87QUFDTCxhQUFLeEIsSUFBTCxHQUFZLEtBQVo7QUFDRDtBQUNGOzs7a0NBRW9CO0FBQ25CLFVBQU1ELE1BQU0sR0FBRzBCLG1CQUFPQyxXQUFQLEVBQWY7QUFBQSxVQUNNMUIsSUFBSSxHQUFHLEtBRGI7QUFBQSxVQUVNQyxRQUFRLEdBQUcsSUFGakI7QUFBQSxVQUV3QjtBQUNsQkMsTUFBQUEsY0FBYyxHQUFHLElBSHZCO0FBQUEsVUFHOEI7QUFDN0JDLE1BQUFBLGlCQUFpQixHQUFHLElBSnJCO0FBQUEsVUFJMkI7QUFDckJDLE1BQUFBLGtCQUFrQixHQUFHLElBTDNCO0FBQUEsVUFLaUM7QUFDM0J1QixNQUFBQSxLQUFLLEdBQUcsSUFBSTdCLEtBQUosQ0FBVUMsTUFBVixFQUFrQkMsSUFBbEIsRUFBd0JDLFFBQXhCLEVBQWtDQyxjQUFsQyxFQUFrREMsaUJBQWxELEVBQXFFQyxrQkFBckUsQ0FOZDs7QUFRQSxhQUFPdUIsS0FBUDtBQUNEOzs7Ozs7QUFHSEMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCL0IsS0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IENsaWVudCBmcm9tIFwiLi9jbGllbnRcIjtcblxuaW1wb3J0IHsgVVBEQVRFX0lOVEVSVkFMIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5cbmNsYXNzIEFnZW50IHtcbiAgY29uc3RydWN0b3IoY2xpZW50LCBidXN5LCBkb2N1bWVudCwgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyLCBpbnRlcnZhbElkZW50aWZpZXIpIHtcbiAgICB0aGlzLmJ1c3kgPSBidXN5O1xuICAgIHRoaXMuY2xpZW50ID0gY2xpZW50O1xuICAgIHRoaXMuZG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgICB0aGlzLnVzZXJJZGVudGlmaWVyID0gdXNlcklkZW50aWZpZXI7XG4gICAgdGhpcy5zZXNzaW9uSWRlbnRpZmllciA9IHNlc3Npb25JZGVudGlmaWVyO1xuICAgIHRoaXMuaW50ZXJ2YWxJZGVudGlmaWVyID0gaW50ZXJ2YWxJZGVudGlmaWVyO1xuICB9XG5cbiAgaW5pdGlhbGlzZShjYWxsYmFjaykge1xuICAgIHRoaXMuY2xpZW50LmluaXRpYWxpc2UoKGNvbnRlbnQsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllcikgPT4ge1xuICAgICAgdGhpcy51c2VySWRlbnRpZmllciA9IHVzZXJJZGVudGlmaWVyO1xuXG4gICAgICB0aGlzLnNlc3Npb25JZGVudGlmaWVyID0gc2Vzc2lvbklkZW50aWZpZXI7XG5cbiAgICAgIHRoaXMuc3RhcnRVcGRhdGVzKCk7XG5cbiAgICAgIGNhbGxiYWNrKGNvbnRlbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0RG9jdW1lbnQoZG9jdW1lbnQpIHtcbiAgICB0aGlzLmRvY3VtZW50ID0gZG9jdW1lbnQ7XG4gIH1cblxuICBzdGFydFVwZGF0ZXMoKSB7XG4gICAgdGhpcy5yZXNldFVwZGF0ZXMoKTtcblxuICAgIGNvbnN0IGludGVydmFsID0gVVBEQVRFX0lOVEVSVkFMO1xuXG4gICAgdGhpcy5pbnRlcnZhbElkZW50aWZpZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLnVwZGF0ZSgpLCBpbnRlcnZhbCk7XG4gIH1cblxuICBzdG9wVXBkYXRlcygpIHtcbiAgICB0aGlzLnJlc2V0VXBkYXRlcygpO1xuICB9XG5cbiAgcmVzZXRVcGRhdGVzKCkge1xuICAgIGlmICh0aGlzLmludGVydmFsSWRlbnRpZmllciAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSWRlbnRpZmllcik7XG5cbiAgICAgIHRoaXMuaW50ZXJ2YWxJZGVudGlmaWVyID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuYnVzeSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHdvcmtpbmdDb250ZW50ID0gdGhpcy5kb2N1bWVudC5nZXRXb3JraW5nQ29udGVudCgpLFxuICAgICAgICAgIGVkaXRhYmxlQ29udGVudCA9IHRoaXMuZG9jdW1lbnQuZ2V0RWRpdGFibGVDb250ZW50KCk7XG5cbiAgICB0aGlzLmJ1c3kgPSB0cnVlO1xuXG4gICAgY29uc3Qgc3VjY2VzcyA9IHRoaXMuY2xpZW50LnVwZGF0ZURvY3VtZW50KHRoaXMudXNlcklkZW50aWZpZXIsIHRoaXMuc2Vzc2lvbklkZW50aWZpZXIsIHdvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnQsIChzZXNzaW9uRXhwaXJlZCwgcGVuZGluZ09wZXJhdGlvbnMpID0+IHtcbiAgICBcdGlmIChzZXNzaW9uRXhwaXJlZCkge1xuXHRcdFx0XHRhbGVydChcIlRoZSBzZXNzaW9uIGhhcyBleHBpcmVkLiBQbGVhc2UgcmVmcmVzaCFcIik7XG5cblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG4gICAgICB0aGlzLmRvY3VtZW50LnVwZGF0ZShwZW5kaW5nT3BlcmF0aW9ucyk7XG5cbiAgICBcdHRoaXMuYnVzeSA9IGZhbHNlO1xuXHRcdH0pO1xuXG4gICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgIHRoaXMuZG9jdW1lbnQuc3luY2hyb25pc2VXb3JraW5nQ29udGVudCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJ1c3kgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZnJvbU5vdGhpbmcoKSB7XG4gICAgY29uc3QgY2xpZW50ID0gQ2xpZW50LmZyb21Ob3RoaW5nKCksXG4gICAgICAgICAgYnVzeSA9IGZhbHNlLFxuICAgICAgICAgIGRvY3VtZW50ID0gbnVsbCwgIC8vL1xuICAgICAgICAgIHVzZXJJZGVudGlmaWVyID0gbnVsbCwgIC8vL1xuXHRcdFx0XHRcdHNlc3Npb25JZGVudGlmaWVyID0gbnVsbCxcdC8vL1xuICAgICAgICAgIGludGVydmFsSWRlbnRpZmllciA9IG51bGwsIC8vL1xuICAgICAgICAgIGFnZW50ID0gbmV3IEFnZW50KGNsaWVudCwgYnVzeSwgZG9jdW1lbnQsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllciwgaW50ZXJ2YWxJZGVudGlmaWVyKTtcblxuICAgIHJldHVybiBhZ2VudDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEFnZW50O1xuIl19