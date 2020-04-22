"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var uuidV4 = require("uuid/v4"),
    ///
necessary = require("necessary");

var User = require("./user"),
    transformContent = require("./content/transform");

var arrayUtilities = necessary.arrayUtilities,
    filter = arrayUtilities.filter;

var Session = /*#__PURE__*/function () {
  function Session(map, content, identifier) {
    _classCallCheck(this, Session);

    this.map = map;
    this.content = content;
    this.identifier = identifier;
  }

  _createClass(Session, [{
    key: "getMap",
    value: function getMap() {
      return this.map;
    }
  }, {
    key: "getContent",
    value: function getContent() {
      return this.content;
    }
  }, {
    key: "getIdentifier",
    value: function getIdentifier() {
      return this.identifier;
    }
  }, {
    key: "getUser",
    value: function getUser(userIdentifier) {
      var user = this.map[userIdentifier];
      return user;
    }
  }, {
    key: "getOtherUsers",
    value: function getOtherUsers(userIdentifier) {
      var otherUsers = Object.values(this.map);
      filter(otherUsers, function (otherUser) {
        var otherUserIdentifier = otherUser.getIdentifier();

        if (otherUserIdentifier !== userIdentifier) {
          return true;
        }
      });
      return otherUsers;
    }
  }, {
    key: "hasExpired",
    value: function hasExpired(sessionIdentifier) {
      var expired = this.identifier !== sessionIdentifier;
      return expired;
    }
  }, {
    key: "createUser",
    value: function createUser() {
      var user = User.fromNothing(),
          userIdentifier = user.getIdentifier();
      this.map[userIdentifier] = user;
      return userIdentifier;
    }
  }, {
    key: "update",
    value: function update(operations, userIdentifier, sessionExpired) {
      var pendingOperations = sessionExpired ? [] : this.updateUsers(operations, userIdentifier);
      return pendingOperations;
    }
  }, {
    key: "updateUsers",
    value: function updateUsers(operations, userIdentifier) {
      var user = this.getUser(userIdentifier),
          otherUsers = this.getOtherUsers(userIdentifier),
          transformedOperations = user.transformOperations(operations),
          transformedPendingOperations = user.transformedPendingOperations(operations);
      otherUsers.forEach(function (otherUser) {
        otherUser.update(transformedOperations);
      });
      this.content = transformContent(this.content, transformedOperations);
      user.reset();
      var pendingOperations = transformedPendingOperations; ///

      return pendingOperations;
    }
  }], [{
    key: "fromNothing",
    value: function fromNothing() {
      var map = {},
          content = "",
          ///
      identifier = uuidV4(),
          ///
      session = new Session(map, content, identifier);
      return session;
    }
  }]);

  return Session;
}();

var session = Session.fromNothing();
module.exports = session;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlc3Npb24uanMiXSwibmFtZXMiOlsidXVpZFY0IiwicmVxdWlyZSIsIm5lY2Vzc2FyeSIsIlVzZXIiLCJ0cmFuc2Zvcm1Db250ZW50IiwiYXJyYXlVdGlsaXRpZXMiLCJmaWx0ZXIiLCJTZXNzaW9uIiwibWFwIiwiY29udGVudCIsImlkZW50aWZpZXIiLCJ1c2VySWRlbnRpZmllciIsInVzZXIiLCJvdGhlclVzZXJzIiwiT2JqZWN0IiwidmFsdWVzIiwib3RoZXJVc2VyIiwib3RoZXJVc2VySWRlbnRpZmllciIsImdldElkZW50aWZpZXIiLCJzZXNzaW9uSWRlbnRpZmllciIsImV4cGlyZWQiLCJmcm9tTm90aGluZyIsIm9wZXJhdGlvbnMiLCJzZXNzaW9uRXhwaXJlZCIsInBlbmRpbmdPcGVyYXRpb25zIiwidXBkYXRlVXNlcnMiLCJnZXRVc2VyIiwiZ2V0T3RoZXJVc2VycyIsInRyYW5zZm9ybWVkT3BlcmF0aW9ucyIsInRyYW5zZm9ybU9wZXJhdGlvbnMiLCJ0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zIiwiZm9yRWFjaCIsInVwZGF0ZSIsInJlc2V0Iiwic2Vzc2lvbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQUVBLElBQU1BLE1BQU0sR0FBR0MsT0FBTyxDQUFDLFNBQUQsQ0FBdEI7QUFBQSxJQUFvQztBQUM5QkMsU0FBUyxHQUFHRCxPQUFPLENBQUMsV0FBRCxDQUR6Qjs7QUFHQSxJQUFNRSxJQUFJLEdBQUdGLE9BQU8sQ0FBQyxRQUFELENBQXBCO0FBQUEsSUFDTUcsZ0JBQWdCLEdBQUdILE9BQU8sQ0FBQyxxQkFBRCxDQURoQzs7QUFHTSxJQUFFSSxjQUFGLEdBQXFCSCxTQUFyQixDQUFFRyxjQUFGO0FBQUEsSUFDRUMsTUFERixHQUNhRCxjQURiLENBQ0VDLE1BREY7O0lBR0FDLE87QUFDTCxtQkFBWUMsR0FBWixFQUFpQkMsT0FBakIsRUFBMEJDLFVBQTFCLEVBQXNDO0FBQUE7O0FBQ3JDLFNB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IHV1aWRWNCA9IHJlcXVpcmUoXCJ1dWlkL3Y0XCIpLCAgLy8vXHJcbiAgICAgIG5lY2Vzc2FyeSA9IHJlcXVpcmUoXCJuZWNlc3NhcnlcIik7XHJcblxyXG5jb25zdCBVc2VyID0gcmVxdWlyZShcIi4vdXNlclwiKSxcclxuICAgICAgdHJhbnNmb3JtQ29udGVudCA9IHJlcXVpcmUoXCIuL2NvbnRlbnQvdHJhbnNmb3JtXCIpO1xyXG5cclxuY29uc3QgeyBhcnJheVV0aWxpdGllcyB9ID0gbmVjZXNzYXJ5LFxyXG4gICAgICB7IGZpbHRlciB9ID0gYXJyYXlVdGlsaXRpZXM7XHJcblxyXG5jbGFzcyBTZXNzaW9uIHtcclxuXHRjb25zdHJ1Y3RvcihtYXAsIGNvbnRlbnQsIGlkZW50aWZpZXIpIHtcclxuXHRcdHRoaXMubWFwID0gbWFwO1xyXG5cdFx0dGhpcy5jb250ZW50ID0gY29udGVudDtcclxuXHRcdHRoaXMuaWRlbnRpZmllciA9IGlkZW50aWZpZXI7XHJcblx0fVxyXG5cclxuXHRnZXRNYXAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5tYXA7XHJcblx0fVxyXG5cclxuXHRnZXRDb250ZW50KCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuY29udGVudDtcclxuXHR9XHJcblxyXG5cdGdldElkZW50aWZpZXIoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5pZGVudGlmaWVyO1xyXG5cdH1cclxuXHJcblx0Z2V0VXNlcih1c2VySWRlbnRpZmllcikge1xyXG5cdFx0Y29uc3QgdXNlciA9IHRoaXMubWFwW3VzZXJJZGVudGlmaWVyXTtcclxuXHJcblx0XHRyZXR1cm4gdXNlcjtcclxuXHR9XHJcblxyXG5cdGdldE90aGVyVXNlcnModXNlcklkZW50aWZpZXIpIHtcclxuXHRcdGNvbnN0IG90aGVyVXNlcnMgPSBPYmplY3QudmFsdWVzKHRoaXMubWFwKTtcclxuXHJcblx0XHRmaWx0ZXIob3RoZXJVc2VycywgZnVuY3Rpb24ob3RoZXJVc2VyKSB7XHJcblx0XHRcdGNvbnN0IG90aGVyVXNlcklkZW50aWZpZXIgPSBvdGhlclVzZXIuZ2V0SWRlbnRpZmllcigpO1xyXG5cclxuXHRcdFx0aWYgKG90aGVyVXNlcklkZW50aWZpZXIgIT09IHVzZXJJZGVudGlmaWVyKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBvdGhlclVzZXJzO1xyXG5cdH1cclxuXHJcblx0aGFzRXhwaXJlZChzZXNzaW9uSWRlbnRpZmllcikge1xyXG5cdFx0Y29uc3QgZXhwaXJlZCA9ICh0aGlzLmlkZW50aWZpZXIgIT09IHNlc3Npb25JZGVudGlmaWVyKTtcclxuXHJcblx0XHRyZXR1cm4gZXhwaXJlZDtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZVVzZXIoKSB7XHJcblx0XHRjb25zdCB1c2VyID0gVXNlci5mcm9tTm90aGluZygpLFxyXG5cdFx0XHRcdFx0dXNlcklkZW50aWZpZXIgPSB1c2VyLmdldElkZW50aWZpZXIoKTtcclxuXHJcblx0XHR0aGlzLm1hcFt1c2VySWRlbnRpZmllcl0gPSB1c2VyO1xyXG5cclxuXHRcdHJldHVybiB1c2VySWRlbnRpZmllcjtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZShvcGVyYXRpb25zLCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbkV4cGlyZWQpIHtcclxuXHQgIGNvbnN0IHBlbmRpbmdPcGVyYXRpb25zID0gc2Vzc2lvbkV4cGlyZWQgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtdIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVXNlcnMob3BlcmF0aW9ucywgdXNlcklkZW50aWZpZXIpO1xyXG5cclxuXHRcdHJldHVybiBwZW5kaW5nT3BlcmF0aW9ucztcclxuXHR9XHJcblxyXG5cdHVwZGF0ZVVzZXJzKG9wZXJhdGlvbnMsIHVzZXJJZGVudGlmaWVyKSB7XHJcbiAgICBjb25zdCB1c2VyID0gdGhpcy5nZXRVc2VyKHVzZXJJZGVudGlmaWVyKSxcclxuICAgICAgICAgIG90aGVyVXNlcnMgPSB0aGlzLmdldE90aGVyVXNlcnModXNlcklkZW50aWZpZXIpLFxyXG4gICAgICAgICAgdHJhbnNmb3JtZWRPcGVyYXRpb25zID0gdXNlci50cmFuc2Zvcm1PcGVyYXRpb25zKG9wZXJhdGlvbnMpLFxyXG4gICAgICAgICAgdHJhbnNmb3JtZWRQZW5kaW5nT3BlcmF0aW9ucyA9IHVzZXIudHJhbnNmb3JtZWRQZW5kaW5nT3BlcmF0aW9ucyhvcGVyYXRpb25zKTtcclxuXHJcbiAgICBvdGhlclVzZXJzLmZvckVhY2goZnVuY3Rpb24ob3RoZXJVc2VyKSB7XHJcbiAgICAgIG90aGVyVXNlci51cGRhdGUodHJhbnNmb3JtZWRPcGVyYXRpb25zKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuY29udGVudCA9IHRyYW5zZm9ybUNvbnRlbnQodGhpcy5jb250ZW50LCB0cmFuc2Zvcm1lZE9wZXJhdGlvbnMpO1xyXG5cclxuICAgIHVzZXIucmVzZXQoKTtcclxuXHJcbiAgICBjb25zdCBwZW5kaW5nT3BlcmF0aW9ucyA9IHRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnM7IC8vL1xyXG5cclxuICAgIHJldHVybiBwZW5kaW5nT3BlcmF0aW9ucztcclxuICB9XHJcblxyXG5cdHN0YXRpYyBmcm9tTm90aGluZygpIHtcclxuXHRcdGNvbnN0IG1hcCA9IHt9LFxyXG5cdFx0XHRcdFx0Y29udGVudCA9IFwiXCIsXHQvLy9cclxuXHRcdFx0XHRcdGlkZW50aWZpZXIgPSB1dWlkVjQoKSwgIC8vL1xyXG5cdFx0XHRcdFx0c2Vzc2lvbiA9IG5ldyBTZXNzaW9uKG1hcCwgY29udGVudCwgaWRlbnRpZmllcik7XHJcblxyXG5cdFx0cmV0dXJuIHNlc3Npb247XHJcblx0fVxyXG59XHJcblxyXG5jb25zdCBzZXNzaW9uID0gU2Vzc2lvbi5mcm9tTm90aGluZygpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBzZXNzaW9uO1xyXG4iXX0=