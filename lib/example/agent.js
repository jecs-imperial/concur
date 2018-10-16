'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = require('./client'),
    constants = require('./constants');

var UPDATE_DELAY = constants.UPDATE_DELAY;

var Agent = function () {
  function Agent(client, timeout, document, userIdentifier) {
    _classCallCheck(this, Agent);

    this.client = client;
    this.timeout = timeout;
    this.document = document;
    this.userIdentifier = userIdentifier;
  }

  _createClass(Agent, [{
    key: 'initialise',
    value: function initialise(callback) {
      this.client.initialise(function (content, userIdentifier) {
        this.userIdentifier = userIdentifier;

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

      var success = this.client.update(this.userIdentifier, workingContent, editableContent, function (pendingOperations) {
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
      agent = new Agent(client, timeout, document, userIdentifier);

      return agent;
    }
  }]);

  return Agent;
}();

module.exports = Agent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leGFtcGxlL2FnZW50LmpzIl0sIm5hbWVzIjpbIkNsaWVudCIsInJlcXVpcmUiLCJjb25zdGFudHMiLCJVUERBVEVfREVMQVkiLCJBZ2VudCIsImNsaWVudCIsInRpbWVvdXQiLCJkb2N1bWVudCIsInVzZXJJZGVudGlmaWVyIiwiY2FsbGJhY2siLCJpbml0aWFsaXNlIiwiY29udGVudCIsImJpbmQiLCJpbW1lZGlhdGVseSIsInNjaGVkdWxlVXBkYXRlIiwiZGVsYXkiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwidXBkYXRlIiwicGVuZGluZ09wZXJhdGlvbnMiLCJ1cFRvRGF0ZSIsIndvcmtpbmdDb250ZW50IiwiZ2V0V29ya2luZ0NvbnRlbnQiLCJlZGl0YWJsZUNvbnRlbnQiLCJnZXRFZGl0YWJsZUNvbnRlbnQiLCJzdWNjZXNzIiwidXBkYXRlRG9jdW1lbnQiLCJzeW5jaHJvbmlzZVdvcmtpbmdDb250ZW50IiwiZnJvbU5vdGhpbmciLCJhZ2VudCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFFQSxJQUFNQSxTQUFTQyxRQUFRLFVBQVIsQ0FBZjtBQUFBLElBQ01DLFlBQVlELFFBQVEsYUFBUixDQURsQjs7SUFHUUUsWSxHQUFpQkQsUyxDQUFqQkMsWTs7SUFFRkMsSztBQUNKLGlCQUFZQyxNQUFaLEVBQW9CQyxPQUFwQixFQUE2QkMsUUFBN0IsRUFBdUNDLGNBQXZDLEVBQXVEO0FBQUE7O0FBQ3JELFNBQUtILE1BQUwsR0FBY0EsTUFBZDtBQUNBLFNBQUtDLE9BQUwsR0FBZUEsT0FBZjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS0MsY0FBTCxHQUFzQkEsY0FBdEI7QUFDRDs7OzsrQkFFVUMsUSxFQUFVO0FBQ25CLFdBQUtKLE1BQUwsQ0FBWUssVUFBWixDQUF1QixVQUFTQyxPQUFULEVBQWtCSCxjQUFsQixFQUFrQztBQUN2RCxhQUFLQSxjQUFMLEdBQXNCQSxjQUF0Qjs7QUFFQUMsaUJBQVNFLE9BQVQ7QUFDRCxPQUpzQixDQUlyQkMsSUFKcUIsQ0FJaEIsSUFKZ0IsQ0FBdkI7QUFLRDs7O2dDQUVXTCxRLEVBQVU7QUFDcEIsV0FBS0EsUUFBTCxHQUFnQkEsUUFBaEI7QUFDRDs7O21DQUVjO0FBQ2IsVUFBTU0sY0FBYyxLQUFwQjs7QUFFQSxXQUFLQyxjQUFMLENBQW9CRCxXQUFwQjtBQUNEOzs7bUNBRWNBLFcsRUFBYTtBQUFBOztBQUMxQixVQUFNRSxRQUFRRixjQUNFLENBREYsR0FDTTtBQUNGVixrQkFGbEI7O0FBSUEsVUFBSSxLQUFLRyxPQUFMLEtBQWlCLElBQXJCLEVBQTJCO0FBQ3pCVSxxQkFBYSxLQUFLVixPQUFsQjtBQUNEOztBQUVELFdBQUtBLE9BQUwsR0FBZVcsV0FBVztBQUFBLGVBQU0sTUFBS0MsTUFBTCxFQUFOO0FBQUEsT0FBWCxFQUFnQ0gsS0FBaEMsQ0FBZjtBQUNEOzs7bUNBRWNJLGlCLEVBQW1CO0FBQ2hDLFVBQU1DLFdBQVcsS0FBS2IsUUFBTCxDQUFjVyxNQUFkLENBQXFCQyxpQkFBckIsQ0FBakI7QUFBQSxVQUNNTixjQUFjLENBQUNPLFFBRHJCOztBQUdBLFdBQUtOLGNBQUwsQ0FBb0JELFdBQXBCO0FBQ0Q7Ozs2QkFFUTtBQUFBOztBQUNQLFVBQU1RLGlCQUFpQixLQUFLZCxRQUFMLENBQWNlLGlCQUFkLEVBQXZCO0FBQUEsVUFDTUMsa0JBQWtCLEtBQUtoQixRQUFMLENBQWNpQixrQkFBZCxFQUR4Qjs7QUFHQSxVQUFNQyxVQUFVLEtBQUtwQixNQUFMLENBQVlhLE1BQVosQ0FBbUIsS0FBS1YsY0FBeEIsRUFBd0NhLGNBQXhDLEVBQXdERSxlQUF4RCxFQUF5RTtBQUFBLGVBQXFCLE9BQUtHLGNBQUwsQ0FBb0JQLGlCQUFwQixDQUFyQjtBQUFBLE9BQXpFLENBQWhCOztBQUVBLFVBQUlNLE9BQUosRUFBYTtBQUNYLGFBQUtsQixRQUFMLENBQWNvQix5QkFBZDtBQUNEO0FBQ0Y7OztrQ0FFb0I7QUFDbkIsVUFBTXRCLFNBQVNMLE9BQU80QixXQUFQLEVBQWY7QUFBQSxVQUNNdEIsVUFBVSxJQURoQjtBQUFBLFVBQ3NCO0FBQ2hCQyxpQkFBVyxJQUZqQjtBQUFBLFVBRXdCO0FBQ2xCQyx1QkFBaUIsSUFIdkI7QUFBQSxVQUc4QjtBQUN4QnFCLGNBQVEsSUFBSXpCLEtBQUosQ0FBVUMsTUFBVixFQUFrQkMsT0FBbEIsRUFBMkJDLFFBQTNCLEVBQXFDQyxjQUFyQyxDQUpkOztBQU1BLGFBQU9xQixLQUFQO0FBQ0Q7Ozs7OztBQUdIQyxPQUFPQyxPQUFQLEdBQWlCM0IsS0FBakIiLCJmaWxlIjoiYWdlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IENsaWVudCA9IHJlcXVpcmUoJy4vY2xpZW50JyksXG4gICAgICBjb25zdGFudHMgPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuXG5jb25zdCB7IFVQREFURV9ERUxBWSB9ID0gY29uc3RhbnRzO1xuXG5jbGFzcyBBZ2VudCB7XG4gIGNvbnN0cnVjdG9yKGNsaWVudCwgdGltZW91dCwgZG9jdW1lbnQsIHVzZXJJZGVudGlmaWVyKSB7XG4gICAgdGhpcy5jbGllbnQgPSBjbGllbnQ7XG4gICAgdGhpcy50aW1lb3V0ID0gdGltZW91dDtcbiAgICB0aGlzLmRvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgdGhpcy51c2VySWRlbnRpZmllciA9IHVzZXJJZGVudGlmaWVyO1xuICB9XG5cbiAgaW5pdGlhbGlzZShjYWxsYmFjaykge1xuICAgIHRoaXMuY2xpZW50LmluaXRpYWxpc2UoZnVuY3Rpb24oY29udGVudCwgdXNlcklkZW50aWZpZXIpIHtcbiAgICAgIHRoaXMudXNlcklkZW50aWZpZXIgPSB1c2VySWRlbnRpZmllcjtcblxuICAgICAgY2FsbGJhY2soY29udGVudCk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHNldERvY3VtZW50KGRvY3VtZW50KSB7XG4gICAgdGhpcy5kb2N1bWVudCA9IGRvY3VtZW50O1xuICB9XG5cbiAgc3RhcnRVcGRhdGVzKCkge1xuICAgIGNvbnN0IGltbWVkaWF0ZWx5ID0gZmFsc2U7XG5cbiAgICB0aGlzLnNjaGVkdWxlVXBkYXRlKGltbWVkaWF0ZWx5KTtcbiAgfVxuXG4gIHNjaGVkdWxlVXBkYXRlKGltbWVkaWF0ZWx5KSB7XG4gICAgY29uc3QgZGVsYXkgPSBpbW1lZGlhdGVseSA/XG4gICAgICAgICAgICAgICAgICAgIDAgOiAvLy9cbiAgICAgICAgICAgICAgICAgICAgICBVUERBVEVfREVMQVk7XG5cbiAgICBpZiAodGhpcy50aW1lb3V0ICE9PSBudWxsKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICB9XG5cbiAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlKCksIGRlbGF5KTtcbiAgfVxuXG4gIHVwZGF0ZURvY3VtZW50KHBlbmRpbmdPcGVyYXRpb25zKSB7XG4gICAgY29uc3QgdXBUb0RhdGUgPSB0aGlzLmRvY3VtZW50LnVwZGF0ZShwZW5kaW5nT3BlcmF0aW9ucyksXG4gICAgICAgICAgaW1tZWRpYXRlbHkgPSAhdXBUb0RhdGU7XG5cbiAgICB0aGlzLnNjaGVkdWxlVXBkYXRlKGltbWVkaWF0ZWx5KTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBjb25zdCB3b3JraW5nQ29udGVudCA9IHRoaXMuZG9jdW1lbnQuZ2V0V29ya2luZ0NvbnRlbnQoKSxcbiAgICAgICAgICBlZGl0YWJsZUNvbnRlbnQgPSB0aGlzLmRvY3VtZW50LmdldEVkaXRhYmxlQ29udGVudCgpO1xuXG4gICAgY29uc3Qgc3VjY2VzcyA9IHRoaXMuY2xpZW50LnVwZGF0ZSh0aGlzLnVzZXJJZGVudGlmaWVyLCB3b3JraW5nQ29udGVudCwgZWRpdGFibGVDb250ZW50LCBwZW5kaW5nT3BlcmF0aW9ucyA9PiB0aGlzLnVwZGF0ZURvY3VtZW50KHBlbmRpbmdPcGVyYXRpb25zKSk7XG5cbiAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgdGhpcy5kb2N1bWVudC5zeW5jaHJvbmlzZVdvcmtpbmdDb250ZW50KCk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZyb21Ob3RoaW5nKCkge1xuICAgIGNvbnN0IGNsaWVudCA9IENsaWVudC5mcm9tTm90aGluZygpLFxuICAgICAgICAgIHRpbWVvdXQgPSBudWxsLCAvLy9cbiAgICAgICAgICBkb2N1bWVudCA9IG51bGwsICAvLy9cbiAgICAgICAgICB1c2VySWRlbnRpZmllciA9IG51bGwsICAvLy9cbiAgICAgICAgICBhZ2VudCA9IG5ldyBBZ2VudChjbGllbnQsIHRpbWVvdXQsIGRvY3VtZW50LCB1c2VySWRlbnRpZmllcik7XG5cbiAgICByZXR1cm4gYWdlbnQ7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBBZ2VudDtcbiJdfQ==