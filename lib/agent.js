"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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

exports["default"] = Agent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFnZW50LmpzIl0sIm5hbWVzIjpbIkFnZW50IiwiY2xpZW50IiwiYnVzeSIsImRvY3VtZW50IiwidXNlcklkZW50aWZpZXIiLCJzZXNzaW9uSWRlbnRpZmllciIsImludGVydmFsSWRlbnRpZmllciIsImNhbGxiYWNrIiwiaW5pdGlhbGlzZSIsImNvbnRlbnQiLCJzdGFydFVwZGF0ZXMiLCJyZXNldFVwZGF0ZXMiLCJpbnRlcnZhbCIsIlVQREFURV9JTlRFUlZBTCIsInNldEludGVydmFsIiwidXBkYXRlIiwiY2xlYXJJbnRlcnZhbCIsIndvcmtpbmdDb250ZW50IiwiZ2V0V29ya2luZ0NvbnRlbnQiLCJlZGl0YWJsZUNvbnRlbnQiLCJnZXRFZGl0YWJsZUNvbnRlbnQiLCJzdWNjZXNzIiwidXBkYXRlRG9jdW1lbnQiLCJzZXNzaW9uRXhwaXJlZCIsInBlbmRpbmdPcGVyYXRpb25zIiwiYWxlcnQiLCJzeW5jaHJvbmlzZVdvcmtpbmdDb250ZW50IiwiQ2xpZW50IiwiZnJvbU5vdGhpbmciLCJhZ2VudCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7QUFFQTs7Ozs7Ozs7OztJQUVxQkEsSztBQUNuQixpQkFBWUMsTUFBWixFQUFvQkMsSUFBcEIsRUFBMEJDLFFBQTFCLEVBQW9DQyxjQUFwQyxFQUFvREMsaUJBQXBELEVBQXVFQyxrQkFBdkUsRUFBMkY7QUFBQTs7QUFDekYsU0FBS0osSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0QsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsU0FBS0UsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLQyxjQUFMLEdBQXNCQSxjQUF0QjtBQUNBLFNBQUtDLGlCQUFMLEdBQXlCQSxpQkFBekI7QUFDQSxTQUFLQyxrQkFBTCxHQUEwQkEsa0JBQTFCO0FBQ0Q7Ozs7K0JBRVVDLFEsRUFBVTtBQUFBOztBQUNuQixXQUFLTixNQUFMLENBQVlPLFVBQVosQ0FBdUIsVUFBQ0MsT0FBRCxFQUFVTCxjQUFWLEVBQTBCQyxpQkFBMUIsRUFBZ0Q7QUFDckUsUUFBQSxLQUFJLENBQUNELGNBQUwsR0FBc0JBLGNBQXRCO0FBRUEsUUFBQSxLQUFJLENBQUNDLGlCQUFMLEdBQXlCQSxpQkFBekI7O0FBRUEsUUFBQSxLQUFJLENBQUNLLFlBQUw7O0FBRUFILFFBQUFBLFFBQVEsQ0FBQ0UsT0FBRCxDQUFSO0FBQ0QsT0FSRDtBQVNEOzs7Z0NBRVdOLFEsRUFBVTtBQUNwQixXQUFLQSxRQUFMLEdBQWdCQSxRQUFoQjtBQUNEOzs7bUNBRWM7QUFBQTs7QUFDYixXQUFLUSxZQUFMO0FBRUEsVUFBTUMsUUFBUSxHQUFHQywwQkFBakI7QUFFQSxXQUFLUCxrQkFBTCxHQUEwQlEsV0FBVyxDQUFDO0FBQUEsZUFBTSxNQUFJLENBQUNDLE1BQUwsRUFBTjtBQUFBLE9BQUQsRUFBc0JILFFBQXRCLENBQXJDO0FBQ0Q7OztrQ0FFYTtBQUNaLFdBQUtELFlBQUw7QUFDRDs7O21DQUVjO0FBQ2IsVUFBSSxLQUFLTCxrQkFBTCxLQUE0QixJQUFoQyxFQUFzQztBQUNwQ1UsUUFBQUEsYUFBYSxDQUFDLEtBQUtWLGtCQUFOLENBQWI7QUFFQSxhQUFLQSxrQkFBTCxHQUEwQixJQUExQjtBQUNEO0FBQ0Y7Ozs2QkFFUTtBQUFBOztBQUNQLFVBQUksS0FBS0osSUFBVCxFQUFlO0FBQ2I7QUFDRDs7QUFFRCxVQUFNZSxjQUFjLEdBQUcsS0FBS2QsUUFBTCxDQUFjZSxpQkFBZCxFQUF2QjtBQUFBLFVBQ01DLGVBQWUsR0FBRyxLQUFLaEIsUUFBTCxDQUFjaUIsa0JBQWQsRUFEeEI7QUFHQSxXQUFLbEIsSUFBTCxHQUFZLElBQVo7QUFFQSxVQUFNbUIsT0FBTyxHQUFHLEtBQUtwQixNQUFMLENBQVlxQixjQUFaLENBQTJCLEtBQUtsQixjQUFoQyxFQUFnRCxLQUFLQyxpQkFBckQsRUFBd0VZLGNBQXhFLEVBQXdGRSxlQUF4RixFQUF5RyxVQUFDSSxjQUFELEVBQWlCQyxpQkFBakIsRUFBdUM7QUFDL0osWUFBSUQsY0FBSixFQUFvQjtBQUNyQkUsVUFBQUEsS0FBSyxDQUFDLDBDQUFELENBQUw7QUFFQTtBQUNBOztBQUVFLFFBQUEsTUFBSSxDQUFDdEIsUUFBTCxDQUFjWSxNQUFkLENBQXFCUyxpQkFBckI7O0FBRUQsUUFBQSxNQUFJLENBQUN0QixJQUFMLEdBQVksS0FBWjtBQUNGLE9BVmlCLENBQWhCOztBQVlBLFVBQUltQixPQUFKLEVBQWE7QUFDWCxhQUFLbEIsUUFBTCxDQUFjdUIseUJBQWQ7QUFDRCxPQUZELE1BRU87QUFDTCxhQUFLeEIsSUFBTCxHQUFZLEtBQVo7QUFDRDtBQUNGOzs7a0NBRW9CO0FBQ25CLFVBQU1ELE1BQU0sR0FBRzBCLG1CQUFPQyxXQUFQLEVBQWY7QUFBQSxVQUNNMUIsSUFBSSxHQUFHLEtBRGI7QUFBQSxVQUVNQyxRQUFRLEdBQUcsSUFGakI7QUFBQSxVQUV3QjtBQUNsQkMsTUFBQUEsY0FBYyxHQUFHLElBSHZCO0FBQUEsVUFHOEI7QUFDN0JDLE1BQUFBLGlCQUFpQixHQUFHLElBSnJCO0FBQUEsVUFJMkI7QUFDckJDLE1BQUFBLGtCQUFrQixHQUFHLElBTDNCO0FBQUEsVUFLaUM7QUFDM0J1QixNQUFBQSxLQUFLLEdBQUcsSUFBSTdCLEtBQUosQ0FBVUMsTUFBVixFQUFrQkMsSUFBbEIsRUFBd0JDLFFBQXhCLEVBQWtDQyxjQUFsQyxFQUFrREMsaUJBQWxELEVBQXFFQyxrQkFBckUsQ0FOZDs7QUFRQSxhQUFPdUIsS0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBDbGllbnQgZnJvbSBcIi4vY2xpZW50XCI7XG5cbmltcG9ydCB7IFVQREFURV9JTlRFUlZBTCB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZ2VudCB7XG4gIGNvbnN0cnVjdG9yKGNsaWVudCwgYnVzeSwgZG9jdW1lbnQsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllciwgaW50ZXJ2YWxJZGVudGlmaWVyKSB7XG4gICAgdGhpcy5idXN5ID0gYnVzeTtcbiAgICB0aGlzLmNsaWVudCA9IGNsaWVudDtcbiAgICB0aGlzLmRvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgdGhpcy51c2VySWRlbnRpZmllciA9IHVzZXJJZGVudGlmaWVyO1xuICAgIHRoaXMuc2Vzc2lvbklkZW50aWZpZXIgPSBzZXNzaW9uSWRlbnRpZmllcjtcbiAgICB0aGlzLmludGVydmFsSWRlbnRpZmllciA9IGludGVydmFsSWRlbnRpZmllcjtcbiAgfVxuXG4gIGluaXRpYWxpc2UoY2FsbGJhY2spIHtcbiAgICB0aGlzLmNsaWVudC5pbml0aWFsaXNlKChjb250ZW50LCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpID0+IHtcbiAgICAgIHRoaXMudXNlcklkZW50aWZpZXIgPSB1c2VySWRlbnRpZmllcjtcblxuICAgICAgdGhpcy5zZXNzaW9uSWRlbnRpZmllciA9IHNlc3Npb25JZGVudGlmaWVyO1xuXG4gICAgICB0aGlzLnN0YXJ0VXBkYXRlcygpO1xuXG4gICAgICBjYWxsYmFjayhjb250ZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldERvY3VtZW50KGRvY3VtZW50KSB7XG4gICAgdGhpcy5kb2N1bWVudCA9IGRvY3VtZW50O1xuICB9XG5cbiAgc3RhcnRVcGRhdGVzKCkge1xuICAgIHRoaXMucmVzZXRVcGRhdGVzKCk7XG5cbiAgICBjb25zdCBpbnRlcnZhbCA9IFVQREFURV9JTlRFUlZBTDtcblxuICAgIHRoaXMuaW50ZXJ2YWxJZGVudGlmaWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy51cGRhdGUoKSwgaW50ZXJ2YWwpO1xuICB9XG5cbiAgc3RvcFVwZGF0ZXMoKSB7XG4gICAgdGhpcy5yZXNldFVwZGF0ZXMoKTtcbiAgfVxuXG4gIHJlc2V0VXBkYXRlcygpIHtcbiAgICBpZiAodGhpcy5pbnRlcnZhbElkZW50aWZpZXIgIT09IG51bGwpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElkZW50aWZpZXIpO1xuXG4gICAgICB0aGlzLmludGVydmFsSWRlbnRpZmllciA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIGlmICh0aGlzLmJ1c3kpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB3b3JraW5nQ29udGVudCA9IHRoaXMuZG9jdW1lbnQuZ2V0V29ya2luZ0NvbnRlbnQoKSxcbiAgICAgICAgICBlZGl0YWJsZUNvbnRlbnQgPSB0aGlzLmRvY3VtZW50LmdldEVkaXRhYmxlQ29udGVudCgpO1xuXG4gICAgdGhpcy5idXN5ID0gdHJ1ZTtcblxuICAgIGNvbnN0IHN1Y2Nlc3MgPSB0aGlzLmNsaWVudC51cGRhdGVEb2N1bWVudCh0aGlzLnVzZXJJZGVudGlmaWVyLCB0aGlzLnNlc3Npb25JZGVudGlmaWVyLCB3b3JraW5nQ29udGVudCwgZWRpdGFibGVDb250ZW50LCAoc2Vzc2lvbkV4cGlyZWQsIHBlbmRpbmdPcGVyYXRpb25zKSA9PiB7XG4gICAgXHRpZiAoc2Vzc2lvbkV4cGlyZWQpIHtcblx0XHRcdFx0YWxlcnQoXCJUaGUgc2Vzc2lvbiBoYXMgZXhwaXJlZC4gUGxlYXNlIHJlZnJlc2ghXCIpO1xuXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuICAgICAgdGhpcy5kb2N1bWVudC51cGRhdGUocGVuZGluZ09wZXJhdGlvbnMpO1xuXG4gICAgXHR0aGlzLmJ1c3kgPSBmYWxzZTtcblx0XHR9KTtcblxuICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICB0aGlzLmRvY3VtZW50LnN5bmNocm9uaXNlV29ya2luZ0NvbnRlbnQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5idXN5ID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZyb21Ob3RoaW5nKCkge1xuICAgIGNvbnN0IGNsaWVudCA9IENsaWVudC5mcm9tTm90aGluZygpLFxuICAgICAgICAgIGJ1c3kgPSBmYWxzZSxcbiAgICAgICAgICBkb2N1bWVudCA9IG51bGwsICAvLy9cbiAgICAgICAgICB1c2VySWRlbnRpZmllciA9IG51bGwsICAvLy9cblx0XHRcdFx0XHRzZXNzaW9uSWRlbnRpZmllciA9IG51bGwsXHQvLy9cbiAgICAgICAgICBpbnRlcnZhbElkZW50aWZpZXIgPSBudWxsLCAvLy9cbiAgICAgICAgICBhZ2VudCA9IG5ldyBBZ2VudChjbGllbnQsIGJ1c3ksIGRvY3VtZW50LCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIsIGludGVydmFsSWRlbnRpZmllcik7XG5cbiAgICByZXR1cm4gYWdlbnQ7XG4gIH1cbn1cbiJdfQ==