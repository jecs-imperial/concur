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
        sessionExpired ? alert('The session has expired. Please refresh!') : _this2.updateDocument(pendingOperations);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leGFtcGxlL2FnZW50LmpzIl0sIm5hbWVzIjpbIkNsaWVudCIsInJlcXVpcmUiLCJjb25zdGFudHMiLCJVUERBVEVfREVMQVkiLCJBZ2VudCIsImNsaWVudCIsInRpbWVvdXQiLCJkb2N1bWVudCIsInVzZXJJZGVudGlmaWVyIiwic2Vzc2lvbklkZW50aWZpZXIiLCJjYWxsYmFjayIsImluaXRpYWxpc2UiLCJjb250ZW50IiwiYmluZCIsImltbWVkaWF0ZWx5Iiwic2NoZWR1bGVVcGRhdGUiLCJkZWxheSIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJ1cGRhdGUiLCJwZW5kaW5nT3BlcmF0aW9ucyIsInVwVG9EYXRlIiwid29ya2luZ0NvbnRlbnQiLCJnZXRXb3JraW5nQ29udGVudCIsImVkaXRhYmxlQ29udGVudCIsImdldEVkaXRhYmxlQ29udGVudCIsInN1Y2Nlc3MiLCJzZXNzaW9uRXhwaXJlZCIsImFsZXJ0IiwidXBkYXRlRG9jdW1lbnQiLCJzeW5jaHJvbmlzZVdvcmtpbmdDb250ZW50IiwiZnJvbU5vdGhpbmciLCJhZ2VudCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFFQSxJQUFNQSxTQUFTQyxRQUFRLFVBQVIsQ0FBZjtBQUFBLElBQ01DLFlBQVlELFFBQVEsYUFBUixDQURsQjs7SUFHUUUsWSxHQUFpQkQsUyxDQUFqQkMsWTs7SUFFRkMsSztBQUNKLGlCQUFZQyxNQUFaLEVBQW9CQyxPQUFwQixFQUE2QkMsUUFBN0IsRUFBdUNDLGNBQXZDLEVBQXVEQyxpQkFBdkQsRUFBMEU7QUFBQTs7QUFDeEUsU0FBS0osTUFBTCxHQUFjQSxNQUFkO0FBQ0EsU0FBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLQyxjQUFMLEdBQXNCQSxjQUF0QjtBQUNBLFNBQUtDLGlCQUFMLEdBQXlCQSxpQkFBekI7QUFDRDs7OzsrQkFFVUMsUSxFQUFVO0FBQ25CLFdBQUtMLE1BQUwsQ0FBWU0sVUFBWixDQUF1QixVQUFTQyxPQUFULEVBQWtCSixjQUFsQixFQUFrQ0MsaUJBQWxDLEVBQXFEO0FBQzFFLGFBQUtELGNBQUwsR0FBc0JBLGNBQXRCO0FBQ0EsYUFBS0MsaUJBQUwsR0FBeUJBLGlCQUF6Qjs7QUFFQUMsaUJBQVNFLE9BQVQ7QUFDRCxPQUxzQixDQUtyQkMsSUFMcUIsQ0FLaEIsSUFMZ0IsQ0FBdkI7QUFNRDs7O2dDQUVXTixRLEVBQVU7QUFDcEIsV0FBS0EsUUFBTCxHQUFnQkEsUUFBaEI7QUFDRDs7O21DQUVjO0FBQ2IsVUFBTU8sY0FBYyxLQUFwQjs7QUFFQSxXQUFLQyxjQUFMLENBQW9CRCxXQUFwQjtBQUNEOzs7bUNBRWNBLFcsRUFBYTtBQUFBOztBQUMxQixVQUFNRSxRQUFRRixjQUNFLENBREYsR0FDTTtBQUNGWCxrQkFGbEI7O0FBSUEsVUFBSSxLQUFLRyxPQUFMLEtBQWlCLElBQXJCLEVBQTJCO0FBQ3pCVyxxQkFBYSxLQUFLWCxPQUFsQjtBQUNEOztBQUVELFdBQUtBLE9BQUwsR0FBZVksV0FBVztBQUFBLGVBQU0sTUFBS0MsTUFBTCxFQUFOO0FBQUEsT0FBWCxFQUFnQ0gsS0FBaEMsQ0FBZjtBQUNEOzs7bUNBRWNJLGlCLEVBQW1CO0FBQ2hDLFVBQU1DLFdBQVcsS0FBS2QsUUFBTCxDQUFjWSxNQUFkLENBQXFCQyxpQkFBckIsQ0FBakI7QUFBQSxVQUNNTixjQUFjLENBQUNPLFFBRHJCOztBQUdBLFdBQUtOLGNBQUwsQ0FBb0JELFdBQXBCO0FBQ0Q7Ozs2QkFFUTtBQUFBOztBQUNQLFVBQU1RLGlCQUFpQixLQUFLZixRQUFMLENBQWNnQixpQkFBZCxFQUF2QjtBQUFBLFVBQ01DLGtCQUFrQixLQUFLakIsUUFBTCxDQUFja0Isa0JBQWQsRUFEeEI7O0FBR0EsVUFBTUMsVUFBVSxLQUFLckIsTUFBTCxDQUFZYyxNQUFaLENBQW1CLEtBQUtYLGNBQXhCLEVBQXdDLEtBQUtDLGlCQUE3QyxFQUFnRWEsY0FBaEUsRUFBZ0ZFLGVBQWhGLEVBQWlHLFVBQUNHLGNBQUQsRUFBaUJQLGlCQUFqQixFQUF1QztBQUN2Sk8seUJBQ0RDLE1BQU0sMENBQU4sQ0FEQyxHQUVBLE9BQUtDLGNBQUwsQ0FBb0JULGlCQUFwQixDQUZBO0FBR0YsT0FKaUIsQ0FBaEI7O0FBTUEsVUFBSU0sT0FBSixFQUFhO0FBQ1gsYUFBS25CLFFBQUwsQ0FBY3VCLHlCQUFkO0FBQ0Q7QUFDRjs7O2tDQUVvQjtBQUNuQixVQUFNekIsU0FBU0wsT0FBTytCLFdBQVAsRUFBZjtBQUFBLFVBQ016QixVQUFVLElBRGhCO0FBQUEsVUFDc0I7QUFDaEJDLGlCQUFXLElBRmpCO0FBQUEsVUFFd0I7QUFDbEJDLHVCQUFpQixJQUh2QjtBQUFBLFVBRzhCO0FBQzdCQywwQkFBb0IsSUFKckI7QUFBQSxVQUkyQjtBQUNyQnVCLGNBQVEsSUFBSTVCLEtBQUosQ0FBVUMsTUFBVixFQUFrQkMsT0FBbEIsRUFBMkJDLFFBQTNCLEVBQXFDQyxjQUFyQyxFQUFxREMsaUJBQXJELENBTGQ7O0FBT0EsYUFBT3VCLEtBQVA7QUFDRDs7Ozs7O0FBR0hDLE9BQU9DLE9BQVAsR0FBaUI5QixLQUFqQiIsImZpbGUiOiJhZ2VudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgQ2xpZW50ID0gcmVxdWlyZSgnLi9jbGllbnQnKSxcbiAgICAgIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG5cbmNvbnN0IHsgVVBEQVRFX0RFTEFZIH0gPSBjb25zdGFudHM7XG5cbmNsYXNzIEFnZW50IHtcbiAgY29uc3RydWN0b3IoY2xpZW50LCB0aW1lb3V0LCBkb2N1bWVudCwgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyKSB7XG4gICAgdGhpcy5jbGllbnQgPSBjbGllbnQ7XG4gICAgdGhpcy50aW1lb3V0ID0gdGltZW91dDtcbiAgICB0aGlzLmRvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgdGhpcy51c2VySWRlbnRpZmllciA9IHVzZXJJZGVudGlmaWVyO1xuICAgIHRoaXMuc2Vzc2lvbklkZW50aWZpZXIgPSBzZXNzaW9uSWRlbnRpZmllcjtcbiAgfVxuXG4gIGluaXRpYWxpc2UoY2FsbGJhY2spIHtcbiAgICB0aGlzLmNsaWVudC5pbml0aWFsaXNlKGZ1bmN0aW9uKGNvbnRlbnQsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllcikge1xuICAgICAgdGhpcy51c2VySWRlbnRpZmllciA9IHVzZXJJZGVudGlmaWVyO1xuICAgICAgdGhpcy5zZXNzaW9uSWRlbnRpZmllciA9IHNlc3Npb25JZGVudGlmaWVyO1xuXG4gICAgICBjYWxsYmFjayhjb250ZW50KTtcbiAgICB9LmJpbmQodGhpcykpO1xuICB9XG5cbiAgc2V0RG9jdW1lbnQoZG9jdW1lbnQpIHtcbiAgICB0aGlzLmRvY3VtZW50ID0gZG9jdW1lbnQ7XG4gIH1cblxuICBzdGFydFVwZGF0ZXMoKSB7XG4gICAgY29uc3QgaW1tZWRpYXRlbHkgPSBmYWxzZTtcblxuICAgIHRoaXMuc2NoZWR1bGVVcGRhdGUoaW1tZWRpYXRlbHkpO1xuICB9XG5cbiAgc2NoZWR1bGVVcGRhdGUoaW1tZWRpYXRlbHkpIHtcbiAgICBjb25zdCBkZWxheSA9IGltbWVkaWF0ZWx5ID9cbiAgICAgICAgICAgICAgICAgICAgMCA6IC8vL1xuICAgICAgICAgICAgICAgICAgICAgIFVQREFURV9ERUxBWTtcblxuICAgIGlmICh0aGlzLnRpbWVvdXQgIT09IG51bGwpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgIH1cblxuICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGUoKSwgZGVsYXkpO1xuICB9XG5cbiAgdXBkYXRlRG9jdW1lbnQocGVuZGluZ09wZXJhdGlvbnMpIHtcbiAgICBjb25zdCB1cFRvRGF0ZSA9IHRoaXMuZG9jdW1lbnQudXBkYXRlKHBlbmRpbmdPcGVyYXRpb25zKSxcbiAgICAgICAgICBpbW1lZGlhdGVseSA9ICF1cFRvRGF0ZTtcblxuICAgIHRoaXMuc2NoZWR1bGVVcGRhdGUoaW1tZWRpYXRlbHkpO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIGNvbnN0IHdvcmtpbmdDb250ZW50ID0gdGhpcy5kb2N1bWVudC5nZXRXb3JraW5nQ29udGVudCgpLFxuICAgICAgICAgIGVkaXRhYmxlQ29udGVudCA9IHRoaXMuZG9jdW1lbnQuZ2V0RWRpdGFibGVDb250ZW50KCk7XG5cbiAgICBjb25zdCBzdWNjZXNzID0gdGhpcy5jbGllbnQudXBkYXRlKHRoaXMudXNlcklkZW50aWZpZXIsIHRoaXMuc2Vzc2lvbklkZW50aWZpZXIsIHdvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnQsIChzZXNzaW9uRXhwaXJlZCwgcGVuZGluZ09wZXJhdGlvbnMpID0+IHtcbiAgICBcdHNlc3Npb25FeHBpcmVkID9cblx0XHRcdFx0YWxlcnQoJ1RoZSBzZXNzaW9uIGhhcyBleHBpcmVkLiBQbGVhc2UgcmVmcmVzaCEnKSA6XG5cdFx0XHRcdFx0dGhpcy51cGRhdGVEb2N1bWVudChwZW5kaW5nT3BlcmF0aW9ucyk7XG5cdFx0fSk7XG5cbiAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgdGhpcy5kb2N1bWVudC5zeW5jaHJvbmlzZVdvcmtpbmdDb250ZW50KCk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZyb21Ob3RoaW5nKCkge1xuICAgIGNvbnN0IGNsaWVudCA9IENsaWVudC5mcm9tTm90aGluZygpLFxuICAgICAgICAgIHRpbWVvdXQgPSBudWxsLCAvLy9cbiAgICAgICAgICBkb2N1bWVudCA9IG51bGwsICAvLy9cbiAgICAgICAgICB1c2VySWRlbnRpZmllciA9IG51bGwsICAvLy9cblx0XHRcdFx0XHRzZXNzaW9uSWRlbnRpZmllciA9IG51bGwsXHQvLy9cbiAgICAgICAgICBhZ2VudCA9IG5ldyBBZ2VudChjbGllbnQsIHRpbWVvdXQsIGRvY3VtZW50LCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpO1xuXG4gICAgcmV0dXJuIGFnZW50O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQWdlbnQ7XG4iXX0=