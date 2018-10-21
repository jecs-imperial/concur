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

        this.startUpdates();

        callback(content);
      }.bind(this));
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

      this.scheduleUpdate(immediately);
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
        return _this.scheduledUpdate();
      }, delay);
    }
  }, {
    key: 'scheduledUpdate',
    value: function scheduledUpdate() {
      var _this2 = this;

      var workingContent = this.document.getWorkingContent(),
          editableContent = this.document.getEditableContent();

      var success = this.client.update(this.userIdentifier, this.sessionIdentifier, workingContent, editableContent, function (sessionExpired, pendingOperations) {
        if (sessionExpired) {
          alert('The session has expired. Please refresh!');

          return;
        }

        _this2.updateDocument(pendingOperations);
      });

      if (success) {
        this.document.synchroniseWorkingContent();
      }
    }
  }, {
    key: 'updateDocument',
    value: function updateDocument(pendingOperations) {
      var upToDate = this.document.update(pendingOperations),
          immediately = !upToDate;

      this.scheduleUpdate(immediately);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leGFtcGxlL2FnZW50LmpzIl0sIm5hbWVzIjpbIkNsaWVudCIsInJlcXVpcmUiLCJjb25zdGFudHMiLCJVUERBVEVfREVMQVkiLCJBZ2VudCIsImNsaWVudCIsInRpbWVvdXQiLCJkb2N1bWVudCIsInVzZXJJZGVudGlmaWVyIiwic2Vzc2lvbklkZW50aWZpZXIiLCJjYWxsYmFjayIsImluaXRpYWxpc2UiLCJjb250ZW50Iiwic3RhcnRVcGRhdGVzIiwiYmluZCIsImltbWVkaWF0ZWx5Iiwic2NoZWR1bGVVcGRhdGUiLCJkZWxheSIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJzY2hlZHVsZWRVcGRhdGUiLCJ3b3JraW5nQ29udGVudCIsImdldFdvcmtpbmdDb250ZW50IiwiZWRpdGFibGVDb250ZW50IiwiZ2V0RWRpdGFibGVDb250ZW50Iiwic3VjY2VzcyIsInVwZGF0ZSIsInNlc3Npb25FeHBpcmVkIiwicGVuZGluZ09wZXJhdGlvbnMiLCJhbGVydCIsInVwZGF0ZURvY3VtZW50Iiwic3luY2hyb25pc2VXb3JraW5nQ29udGVudCIsInVwVG9EYXRlIiwiZnJvbU5vdGhpbmciLCJhZ2VudCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFFQSxJQUFNQSxTQUFTQyxRQUFRLFVBQVIsQ0FBZjtBQUFBLElBQ01DLFlBQVlELFFBQVEsYUFBUixDQURsQjs7SUFHUUUsWSxHQUFpQkQsUyxDQUFqQkMsWTs7SUFFRkMsSztBQUNKLGlCQUFZQyxNQUFaLEVBQW9CQyxPQUFwQixFQUE2QkMsUUFBN0IsRUFBdUNDLGNBQXZDLEVBQXVEQyxpQkFBdkQsRUFBMEU7QUFBQTs7QUFDeEUsU0FBS0osTUFBTCxHQUFjQSxNQUFkO0FBQ0EsU0FBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLQyxjQUFMLEdBQXNCQSxjQUF0QjtBQUNBLFNBQUtDLGlCQUFMLEdBQXlCQSxpQkFBekI7QUFDRDs7OzsrQkFFVUMsUSxFQUFVO0FBQ25CLFdBQUtMLE1BQUwsQ0FBWU0sVUFBWixDQUF1QixVQUFTQyxPQUFULEVBQWtCSixjQUFsQixFQUFrQ0MsaUJBQWxDLEVBQXFEO0FBQzFFLGFBQUtELGNBQUwsR0FBc0JBLGNBQXRCO0FBQ0EsYUFBS0MsaUJBQUwsR0FBeUJBLGlCQUF6Qjs7QUFFQSxhQUFLSSxZQUFMOztBQUVBSCxpQkFBU0UsT0FBVDtBQUNELE9BUHNCLENBT3JCRSxJQVBxQixDQU9oQixJQVBnQixDQUF2QjtBQVFEOzs7Z0NBRVdQLFEsRUFBVTtBQUNwQixXQUFLQSxRQUFMLEdBQWdCQSxRQUFoQjtBQUNEOzs7NkJBRVE7QUFDUCxVQUFNUSxjQUFjLElBQXBCOztBQUVBLFdBQUtDLGNBQUwsQ0FBb0JELFdBQXBCO0FBQ0Q7OzttQ0FFYztBQUNiLFVBQU1BLGNBQWMsS0FBcEI7O0FBRUEsV0FBS0MsY0FBTCxDQUFvQkQsV0FBcEI7QUFDRDs7O21DQUVjQSxXLEVBQWE7QUFBQTs7QUFDMUIsVUFBTUUsUUFBUUYsY0FDRSxDQURGLEdBQ007QUFDRlosa0JBRmxCOztBQUlBLFVBQUksS0FBS0csT0FBTCxLQUFpQixJQUFyQixFQUEyQjtBQUN6QlkscUJBQWEsS0FBS1osT0FBbEI7QUFDRDs7QUFFRCxXQUFLQSxPQUFMLEdBQWVhLFdBQVc7QUFBQSxlQUFNLE1BQUtDLGVBQUwsRUFBTjtBQUFBLE9BQVgsRUFBeUNILEtBQXpDLENBQWY7QUFDRDs7O3NDQUVpQjtBQUFBOztBQUNoQixVQUFNSSxpQkFBaUIsS0FBS2QsUUFBTCxDQUFjZSxpQkFBZCxFQUF2QjtBQUFBLFVBQ01DLGtCQUFrQixLQUFLaEIsUUFBTCxDQUFjaUIsa0JBQWQsRUFEeEI7O0FBR0EsVUFBTUMsVUFBVSxLQUFLcEIsTUFBTCxDQUFZcUIsTUFBWixDQUFtQixLQUFLbEIsY0FBeEIsRUFBd0MsS0FBS0MsaUJBQTdDLEVBQWdFWSxjQUFoRSxFQUFnRkUsZUFBaEYsRUFBaUcsVUFBQ0ksY0FBRCxFQUFpQkMsaUJBQWpCLEVBQXVDO0FBQ3ZKLFlBQUlELGNBQUosRUFBb0I7QUFDckJFLGdCQUFNLDBDQUFOOztBQUVBO0FBQ0E7O0FBRUQsZUFBS0MsY0FBTCxDQUFvQkYsaUJBQXBCO0FBQ0EsT0FSaUIsQ0FBaEI7O0FBVUEsVUFBSUgsT0FBSixFQUFhO0FBQ1gsYUFBS2xCLFFBQUwsQ0FBY3dCLHlCQUFkO0FBQ0Q7QUFDRjs7O21DQUVjSCxpQixFQUFtQjtBQUNoQyxVQUFNSSxXQUFXLEtBQUt6QixRQUFMLENBQWNtQixNQUFkLENBQXFCRSxpQkFBckIsQ0FBakI7QUFBQSxVQUNNYixjQUFjLENBQUNpQixRQURyQjs7QUFHQSxXQUFLaEIsY0FBTCxDQUFvQkQsV0FBcEI7QUFDRDs7O2tDQUVvQjtBQUNuQixVQUFNVixTQUFTTCxPQUFPaUMsV0FBUCxFQUFmO0FBQUEsVUFDTTNCLFVBQVUsSUFEaEI7QUFBQSxVQUNzQjtBQUNoQkMsaUJBQVcsSUFGakI7QUFBQSxVQUV3QjtBQUNsQkMsdUJBQWlCLElBSHZCO0FBQUEsVUFHOEI7QUFDN0JDLDBCQUFvQixJQUpyQjtBQUFBLFVBSTJCO0FBQ3JCeUIsY0FBUSxJQUFJOUIsS0FBSixDQUFVQyxNQUFWLEVBQWtCQyxPQUFsQixFQUEyQkMsUUFBM0IsRUFBcUNDLGNBQXJDLEVBQXFEQyxpQkFBckQsQ0FMZDs7QUFPQSxhQUFPeUIsS0FBUDtBQUNEOzs7Ozs7QUFHSEMsT0FBT0MsT0FBUCxHQUFpQmhDLEtBQWpCIiwiZmlsZSI6ImFnZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBDbGllbnQgPSByZXF1aXJlKCcuL2NsaWVudCcpLFxuICAgICAgY29uc3RhbnRzID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcblxuY29uc3QgeyBVUERBVEVfREVMQVkgfSA9IGNvbnN0YW50cztcblxuY2xhc3MgQWdlbnQge1xuICBjb25zdHJ1Y3RvcihjbGllbnQsIHRpbWVvdXQsIGRvY3VtZW50LCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpIHtcbiAgICB0aGlzLmNsaWVudCA9IGNsaWVudDtcbiAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0O1xuICAgIHRoaXMuZG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgICB0aGlzLnVzZXJJZGVudGlmaWVyID0gdXNlcklkZW50aWZpZXI7XG4gICAgdGhpcy5zZXNzaW9uSWRlbnRpZmllciA9IHNlc3Npb25JZGVudGlmaWVyO1xuICB9XG5cbiAgaW5pdGlhbGlzZShjYWxsYmFjaykge1xuICAgIHRoaXMuY2xpZW50LmluaXRpYWxpc2UoZnVuY3Rpb24oY29udGVudCwgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyKSB7XG4gICAgICB0aGlzLnVzZXJJZGVudGlmaWVyID0gdXNlcklkZW50aWZpZXI7XG4gICAgICB0aGlzLnNlc3Npb25JZGVudGlmaWVyID0gc2Vzc2lvbklkZW50aWZpZXI7XG5cbiAgICAgIHRoaXMuc3RhcnRVcGRhdGVzKCk7XG5cbiAgICAgIGNhbGxiYWNrKGNvbnRlbnQpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH1cblxuICBzZXREb2N1bWVudChkb2N1bWVudCkge1xuICAgIHRoaXMuZG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBjb25zdCBpbW1lZGlhdGVseSA9IHRydWU7XG5cbiAgICB0aGlzLnNjaGVkdWxlVXBkYXRlKGltbWVkaWF0ZWx5KTtcbiAgfVxuXG4gIHN0YXJ0VXBkYXRlcygpIHtcbiAgICBjb25zdCBpbW1lZGlhdGVseSA9IGZhbHNlO1xuXG4gICAgdGhpcy5zY2hlZHVsZVVwZGF0ZShpbW1lZGlhdGVseSk7XG4gIH1cblxuICBzY2hlZHVsZVVwZGF0ZShpbW1lZGlhdGVseSkge1xuICAgIGNvbnN0IGRlbGF5ID0gaW1tZWRpYXRlbHkgP1xuICAgICAgICAgICAgICAgICAgICAwIDogLy8vXG4gICAgICAgICAgICAgICAgICAgICAgVVBEQVRFX0RFTEFZO1xuXG4gICAgaWYgKHRoaXMudGltZW91dCAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgfVxuXG4gICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLnNjaGVkdWxlZFVwZGF0ZSgpLCBkZWxheSk7XG4gIH1cblxuICBzY2hlZHVsZWRVcGRhdGUoKSB7XG4gICAgY29uc3Qgd29ya2luZ0NvbnRlbnQgPSB0aGlzLmRvY3VtZW50LmdldFdvcmtpbmdDb250ZW50KCksXG4gICAgICAgICAgZWRpdGFibGVDb250ZW50ID0gdGhpcy5kb2N1bWVudC5nZXRFZGl0YWJsZUNvbnRlbnQoKTtcblxuICAgIGNvbnN0IHN1Y2Nlc3MgPSB0aGlzLmNsaWVudC51cGRhdGUodGhpcy51c2VySWRlbnRpZmllciwgdGhpcy5zZXNzaW9uSWRlbnRpZmllciwgd29ya2luZ0NvbnRlbnQsIGVkaXRhYmxlQ29udGVudCwgKHNlc3Npb25FeHBpcmVkLCBwZW5kaW5nT3BlcmF0aW9ucykgPT4ge1xuICAgIFx0aWYgKHNlc3Npb25FeHBpcmVkKSB7XG5cdFx0XHRcdGFsZXJ0KCdUaGUgc2Vzc2lvbiBoYXMgZXhwaXJlZC4gUGxlYXNlIHJlZnJlc2ghJyk7XG5cblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnVwZGF0ZURvY3VtZW50KHBlbmRpbmdPcGVyYXRpb25zKTtcblx0XHR9KTtcblxuICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICB0aGlzLmRvY3VtZW50LnN5bmNocm9uaXNlV29ya2luZ0NvbnRlbnQoKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVEb2N1bWVudChwZW5kaW5nT3BlcmF0aW9ucykge1xuICAgIGNvbnN0IHVwVG9EYXRlID0gdGhpcy5kb2N1bWVudC51cGRhdGUocGVuZGluZ09wZXJhdGlvbnMpLFxuICAgICAgICAgIGltbWVkaWF0ZWx5ID0gIXVwVG9EYXRlO1xuXG4gICAgdGhpcy5zY2hlZHVsZVVwZGF0ZShpbW1lZGlhdGVseSk7XG4gIH1cblxuICBzdGF0aWMgZnJvbU5vdGhpbmcoKSB7XG4gICAgY29uc3QgY2xpZW50ID0gQ2xpZW50LmZyb21Ob3RoaW5nKCksXG4gICAgICAgICAgdGltZW91dCA9IG51bGwsIC8vL1xuICAgICAgICAgIGRvY3VtZW50ID0gbnVsbCwgIC8vL1xuICAgICAgICAgIHVzZXJJZGVudGlmaWVyID0gbnVsbCwgIC8vL1xuXHRcdFx0XHRcdHNlc3Npb25JZGVudGlmaWVyID0gbnVsbCxcdC8vL1xuICAgICAgICAgIGFnZW50ID0gbmV3IEFnZW50KGNsaWVudCwgdGltZW91dCwgZG9jdW1lbnQsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllcik7XG5cbiAgICByZXR1cm4gYWdlbnQ7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBBZ2VudDtcbiJdfQ==