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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlc3Npb24uanMiXSwibmFtZXMiOlsidXVpZFY0IiwicmVxdWlyZSIsIm5lY2Vzc2FyeSIsIlVzZXIiLCJ0cmFuc2Zvcm1Db250ZW50IiwiYXJyYXlVdGlsaXRpZXMiLCJmaWx0ZXIiLCJTZXNzaW9uIiwibWFwIiwiY29udGVudCIsImlkZW50aWZpZXIiLCJ1c2VySWRlbnRpZmllciIsInVzZXIiLCJvdGhlclVzZXJzIiwiT2JqZWN0IiwidmFsdWVzIiwib3RoZXJVc2VyIiwib3RoZXJVc2VySWRlbnRpZmllciIsImdldElkZW50aWZpZXIiLCJzZXNzaW9uSWRlbnRpZmllciIsImV4cGlyZWQiLCJmcm9tTm90aGluZyIsIm9wZXJhdGlvbnMiLCJzZXNzaW9uRXhwaXJlZCIsInBlbmRpbmdPcGVyYXRpb25zIiwidXBkYXRlVXNlcnMiLCJnZXRVc2VyIiwiZ2V0T3RoZXJVc2VycyIsInRyYW5zZm9ybWVkT3BlcmF0aW9ucyIsInRyYW5zZm9ybU9wZXJhdGlvbnMiLCJ0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zIiwiZm9yRWFjaCIsInVwZGF0ZSIsInJlc2V0Iiwic2Vzc2lvbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQUVBLElBQU1BLE1BQU0sR0FBR0MsT0FBTyxDQUFDLFNBQUQsQ0FBdEI7QUFBQSxJQUFvQztBQUM5QkMsU0FBUyxHQUFHRCxPQUFPLENBQUMsV0FBRCxDQUR6Qjs7QUFHQSxJQUFNRSxJQUFJLEdBQUdGLE9BQU8sQ0FBQyxRQUFELENBQXBCO0FBQUEsSUFDTUcsZ0JBQWdCLEdBQUdILE9BQU8sQ0FBQyxxQkFBRCxDQURoQzs7QUFHTSxJQUFFSSxjQUFGLEdBQXFCSCxTQUFyQixDQUFFRyxjQUFGO0FBQUEsSUFDRUMsTUFERixHQUNhRCxjQURiLENBQ0VDLE1BREY7O0lBR0FDLE87QUFDTCxtQkFBWUMsR0FBWixFQUFpQkMsT0FBakIsRUFBMEJDLFVBQTFCLEVBQXNDO0FBQUE7O0FBQ3JDLFNB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dWlkVjQgPSByZXF1aXJlKFwidXVpZC92NFwiKSwgIC8vL1xyXG4gICAgICBuZWNlc3NhcnkgPSByZXF1aXJlKFwibmVjZXNzYXJ5XCIpO1xyXG5cclxuY29uc3QgVXNlciA9IHJlcXVpcmUoXCIuL3VzZXJcIiksXHJcbiAgICAgIHRyYW5zZm9ybUNvbnRlbnQgPSByZXF1aXJlKFwiLi9jb250ZW50L3RyYW5zZm9ybVwiKTtcclxuXHJcbmNvbnN0IHsgYXJyYXlVdGlsaXRpZXMgfSA9IG5lY2Vzc2FyeSxcclxuICAgICAgeyBmaWx0ZXIgfSA9IGFycmF5VXRpbGl0aWVzO1xyXG5cclxuY2xhc3MgU2Vzc2lvbiB7XHJcblx0Y29uc3RydWN0b3IobWFwLCBjb250ZW50LCBpZGVudGlmaWVyKSB7XHJcblx0XHR0aGlzLm1hcCA9IG1hcDtcclxuXHRcdHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XHJcblx0XHR0aGlzLmlkZW50aWZpZXIgPSBpZGVudGlmaWVyO1xyXG5cdH1cclxuXHJcblx0Z2V0TWFwKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMubWFwO1xyXG5cdH1cclxuXHJcblx0Z2V0Q29udGVudCgpIHtcclxuXHRcdHJldHVybiB0aGlzLmNvbnRlbnQ7XHJcblx0fVxyXG5cclxuXHRnZXRJZGVudGlmaWVyKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaWRlbnRpZmllcjtcclxuXHR9XHJcblxyXG5cdGdldFVzZXIodXNlcklkZW50aWZpZXIpIHtcclxuXHRcdGNvbnN0IHVzZXIgPSB0aGlzLm1hcFt1c2VySWRlbnRpZmllcl07XHJcblxyXG5cdFx0cmV0dXJuIHVzZXI7XHJcblx0fVxyXG5cclxuXHRnZXRPdGhlclVzZXJzKHVzZXJJZGVudGlmaWVyKSB7XHJcblx0XHRjb25zdCBvdGhlclVzZXJzID0gT2JqZWN0LnZhbHVlcyh0aGlzLm1hcCk7XHJcblxyXG5cdFx0ZmlsdGVyKG90aGVyVXNlcnMsIChvdGhlclVzZXIpID0+IHtcclxuXHRcdFx0Y29uc3Qgb3RoZXJVc2VySWRlbnRpZmllciA9IG90aGVyVXNlci5nZXRJZGVudGlmaWVyKCk7XHJcblxyXG5cdFx0XHRpZiAob3RoZXJVc2VySWRlbnRpZmllciAhPT0gdXNlcklkZW50aWZpZXIpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIG90aGVyVXNlcnM7XHJcblx0fVxyXG5cclxuXHRoYXNFeHBpcmVkKHNlc3Npb25JZGVudGlmaWVyKSB7XHJcblx0XHRjb25zdCBleHBpcmVkID0gKHRoaXMuaWRlbnRpZmllciAhPT0gc2Vzc2lvbklkZW50aWZpZXIpO1xyXG5cclxuXHRcdHJldHVybiBleHBpcmVkO1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlVXNlcigpIHtcclxuXHRcdGNvbnN0IHVzZXIgPSBVc2VyLmZyb21Ob3RoaW5nKCksXHJcblx0XHRcdFx0XHR1c2VySWRlbnRpZmllciA9IHVzZXIuZ2V0SWRlbnRpZmllcigpO1xyXG5cclxuXHRcdHRoaXMubWFwW3VzZXJJZGVudGlmaWVyXSA9IHVzZXI7XHJcblxyXG5cdFx0cmV0dXJuIHVzZXJJZGVudGlmaWVyO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlKG9wZXJhdGlvbnMsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uRXhwaXJlZCkge1xyXG5cdCAgY29uc3QgcGVuZGluZ09wZXJhdGlvbnMgPSBzZXNzaW9uRXhwaXJlZCA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW10gOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVVc2VycyhvcGVyYXRpb25zLCB1c2VySWRlbnRpZmllcik7XHJcblxyXG5cdFx0cmV0dXJuIHBlbmRpbmdPcGVyYXRpb25zO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlVXNlcnMob3BlcmF0aW9ucywgdXNlcklkZW50aWZpZXIpIHtcclxuICAgIGNvbnN0IHVzZXIgPSB0aGlzLmdldFVzZXIodXNlcklkZW50aWZpZXIpLFxyXG4gICAgICAgICAgb3RoZXJVc2VycyA9IHRoaXMuZ2V0T3RoZXJVc2Vycyh1c2VySWRlbnRpZmllciksXHJcbiAgICAgICAgICB0cmFuc2Zvcm1lZE9wZXJhdGlvbnMgPSB1c2VyLnRyYW5zZm9ybU9wZXJhdGlvbnMob3BlcmF0aW9ucyksXHJcbiAgICAgICAgICB0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zID0gdXNlci50cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zKG9wZXJhdGlvbnMpO1xyXG5cclxuICAgIG90aGVyVXNlcnMuZm9yRWFjaCgob3RoZXJVc2VyKSA9PiB7XHJcbiAgICAgIG90aGVyVXNlci51cGRhdGUodHJhbnNmb3JtZWRPcGVyYXRpb25zKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuY29udGVudCA9IHRyYW5zZm9ybUNvbnRlbnQodGhpcy5jb250ZW50LCB0cmFuc2Zvcm1lZE9wZXJhdGlvbnMpO1xyXG5cclxuICAgIHVzZXIucmVzZXQoKTtcclxuXHJcbiAgICBjb25zdCBwZW5kaW5nT3BlcmF0aW9ucyA9IHRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnM7IC8vL1xyXG5cclxuICAgIHJldHVybiBwZW5kaW5nT3BlcmF0aW9ucztcclxuICB9XHJcblxyXG5cdHN0YXRpYyBmcm9tTm90aGluZygpIHtcclxuXHRcdGNvbnN0IG1hcCA9IHt9LFxyXG5cdFx0XHRcdFx0Y29udGVudCA9IFwiXCIsXHQvLy9cclxuXHRcdFx0XHRcdGlkZW50aWZpZXIgPSB1dWlkVjQoKSwgIC8vL1xyXG5cdFx0XHRcdFx0c2Vzc2lvbiA9IG5ldyBTZXNzaW9uKG1hcCwgY29udGVudCwgaWRlbnRpZmllcik7XHJcblxyXG5cdFx0cmV0dXJuIHNlc3Npb247XHJcblx0fVxyXG59XHJcblxyXG5jb25zdCBzZXNzaW9uID0gU2Vzc2lvbi5mcm9tTm90aGluZygpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBzZXNzaW9uO1xyXG4iXX0=