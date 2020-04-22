"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _v = _interopRequireDefault(require("uuid/v4"));

var _necessary = require("necessary");

var _user = _interopRequireDefault(require("./user"));

var _transform = _interopRequireDefault(require("./content/transform"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var filter = _necessary.arrayUtilities.filter;

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
      var user = _user["default"].fromNothing(),
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
      this.content = (0, _transform["default"])(this.content, transformedOperations);
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
      identifier = (0, _v["default"])(),
          ///
      session = new Session(map, content, identifier);
      return session;
    }
  }]);

  return Session;
}();

var session = Session.fromNothing();
var _default = session;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlc3Npb24uanMiXSwibmFtZXMiOlsiZmlsdGVyIiwiYXJyYXlVdGlsaXRpZXMiLCJTZXNzaW9uIiwibWFwIiwiY29udGVudCIsImlkZW50aWZpZXIiLCJ1c2VySWRlbnRpZmllciIsInVzZXIiLCJvdGhlclVzZXJzIiwiT2JqZWN0IiwidmFsdWVzIiwib3RoZXJVc2VyIiwib3RoZXJVc2VySWRlbnRpZmllciIsImdldElkZW50aWZpZXIiLCJzZXNzaW9uSWRlbnRpZmllciIsImV4cGlyZWQiLCJVc2VyIiwiZnJvbU5vdGhpbmciLCJvcGVyYXRpb25zIiwic2Vzc2lvbkV4cGlyZWQiLCJwZW5kaW5nT3BlcmF0aW9ucyIsInVwZGF0ZVVzZXJzIiwiZ2V0VXNlciIsImdldE90aGVyVXNlcnMiLCJ0cmFuc2Zvcm1lZE9wZXJhdGlvbnMiLCJ0cmFuc2Zvcm1PcGVyYXRpb25zIiwidHJhbnNmb3JtZWRQZW5kaW5nT3BlcmF0aW9ucyIsImZvckVhY2giLCJ1cGRhdGUiLCJyZXNldCIsInNlc3Npb24iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBRUE7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7SUFFUUEsTSxHQUFXQyx5QixDQUFYRCxNOztJQUVGRSxPO0FBQ0wsbUJBQVlDLEdBQVosRUFBaUJDLE9BQWpCLEVBQTBCQyxVQUExQixFQUFzQztBQUFBOztBQUNyQyxTQUFLRixHQUFMLEdBQVdBLEdBQVg7QUFDQSxTQUFLQyxPQUFMLEdBQWVBLE9BQWY7QUFDQSxTQUFLQyxVQUFMLEdBQWtCQSxVQUFsQjtBQUNBOzs7OzZCQUVRO0FBQ1IsYUFBTyxLQUFLRixHQUFaO0FBQ0E7OztpQ0FFWTtBQUNaLGFBQU8sS0FBS0MsT0FBWjtBQUNBOzs7b0NBRWU7QUFDZixhQUFPLEtBQUtDLFVBQVo7QUFDQTs7OzRCQUVPQyxjLEVBQWdCO0FBQ3ZCLFVBQU1DLElBQUksR0FBRyxLQUFLSixHQUFMLENBQVNHLGNBQVQsQ0FBYjtBQUVBLGFBQU9DLElBQVA7QUFDQTs7O2tDQUVhRCxjLEVBQWdCO0FBQzdCLFVBQU1FLFVBQVUsR0FBR0MsTUFBTSxDQUFDQyxNQUFQLENBQWMsS0FBS1AsR0FBbkIsQ0FBbkI7QUFFQUgsTUFBQUEsTUFBTSxDQUFDUSxVQUFELEVBQWEsVUFBQ0csU0FBRCxFQUFlO0FBQ2pDLFlBQU1DLG1CQUFtQixHQUFHRCxTQUFTLENBQUNFLGFBQVYsRUFBNUI7O0FBRUEsWUFBSUQsbUJBQW1CLEtBQUtOLGNBQTVCLEVBQTRDO0FBQzNDLGlCQUFPLElBQVA7QUFDQTtBQUNELE9BTkssQ0FBTjtBQVFBLGFBQU9FLFVBQVA7QUFDQTs7OytCQUVVTSxpQixFQUFtQjtBQUM3QixVQUFNQyxPQUFPLEdBQUksS0FBS1YsVUFBTCxLQUFvQlMsaUJBQXJDO0FBRUEsYUFBT0MsT0FBUDtBQUNBOzs7aUNBRVk7QUFDWixVQUFNUixJQUFJLEdBQUdTLGlCQUFLQyxXQUFMLEVBQWI7QUFBQSxVQUNHWCxjQUFjLEdBQUdDLElBQUksQ0FBQ00sYUFBTCxFQURwQjs7QUFHQSxXQUFLVixHQUFMLENBQVNHLGNBQVQsSUFBMkJDLElBQTNCO0FBRUEsYUFBT0QsY0FBUDtBQUNBOzs7MkJBRU1ZLFUsRUFBWVosYyxFQUFnQmEsYyxFQUFnQjtBQUNqRCxVQUFNQyxpQkFBaUIsR0FBR0QsY0FBYyxHQUNYLEVBRFcsR0FFVCxLQUFLRSxXQUFMLENBQWlCSCxVQUFqQixFQUE2QlosY0FBN0IsQ0FGL0I7QUFJRCxhQUFPYyxpQkFBUDtBQUNBOzs7Z0NBRVdGLFUsRUFBWVosYyxFQUFnQjtBQUNyQyxVQUFNQyxJQUFJLEdBQUcsS0FBS2UsT0FBTCxDQUFhaEIsY0FBYixDQUFiO0FBQUEsVUFDTUUsVUFBVSxHQUFHLEtBQUtlLGFBQUwsQ0FBbUJqQixjQUFuQixDQURuQjtBQUFBLFVBRU1rQixxQkFBcUIsR0FBR2pCLElBQUksQ0FBQ2tCLG1CQUFMLENBQXlCUCxVQUF6QixDQUY5QjtBQUFBLFVBR01RLDRCQUE0QixHQUFHbkIsSUFBSSxDQUFDbUIsNEJBQUwsQ0FBa0NSLFVBQWxDLENBSHJDO0FBS0FWLE1BQUFBLFVBQVUsQ0FBQ21CLE9BQVgsQ0FBbUIsVUFBQ2hCLFNBQUQsRUFBZTtBQUNoQ0EsUUFBQUEsU0FBUyxDQUFDaUIsTUFBVixDQUFpQkoscUJBQWpCO0FBQ0QsT0FGRDtBQUlBLFdBQUtwQixPQUFMLEdBQWUsMkJBQWlCLEtBQUtBLE9BQXRCLEVBQStCb0IscUJBQS9CLENBQWY7QUFFQWpCLE1BQUFBLElBQUksQ0FBQ3NCLEtBQUw7QUFFQSxVQUFNVCxpQkFBaUIsR0FBR00sNEJBQTFCLENBZHFDLENBY21COztBQUV4RCxhQUFPTixpQkFBUDtBQUNEOzs7a0NBRW1CO0FBQ3BCLFVBQU1qQixHQUFHLEdBQUcsRUFBWjtBQUFBLFVBQ0dDLE9BQU8sR0FBRyxFQURiO0FBQUEsVUFDaUI7QUFDZEMsTUFBQUEsVUFBVSxHQUFHLG9CQUZoQjtBQUFBLFVBRTJCO0FBQ3hCeUIsTUFBQUEsT0FBTyxHQUFHLElBQUk1QixPQUFKLENBQVlDLEdBQVosRUFBaUJDLE9BQWpCLEVBQTBCQyxVQUExQixDQUhiO0FBS0EsYUFBT3lCLE9BQVA7QUFDQTs7Ozs7O0FBR0YsSUFBTUEsT0FBTyxHQUFHNUIsT0FBTyxDQUFDZSxXQUFSLEVBQWhCO2VBRWVhLE8iLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmltcG9ydCB1dWlkVjQgZnJvbSBcInV1aWQvdjRcIjtcclxuXHJcbmltcG9ydCB7IGFycmF5VXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xyXG5cclxuaW1wb3J0IFVzZXIgZnJvbSBcIi4vdXNlclwiO1xyXG5pbXBvcnQgdHJhbnNmb3JtQ29udGVudCBmcm9tIFwiLi9jb250ZW50L3RyYW5zZm9ybVwiO1xyXG5cclxuY29uc3QgeyBmaWx0ZXIgfSA9IGFycmF5VXRpbGl0aWVzO1xyXG5cclxuY2xhc3MgU2Vzc2lvbiB7XHJcblx0Y29uc3RydWN0b3IobWFwLCBjb250ZW50LCBpZGVudGlmaWVyKSB7XHJcblx0XHR0aGlzLm1hcCA9IG1hcDtcclxuXHRcdHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XHJcblx0XHR0aGlzLmlkZW50aWZpZXIgPSBpZGVudGlmaWVyO1xyXG5cdH1cclxuXHJcblx0Z2V0TWFwKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMubWFwO1xyXG5cdH1cclxuXHJcblx0Z2V0Q29udGVudCgpIHtcclxuXHRcdHJldHVybiB0aGlzLmNvbnRlbnQ7XHJcblx0fVxyXG5cclxuXHRnZXRJZGVudGlmaWVyKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaWRlbnRpZmllcjtcclxuXHR9XHJcblxyXG5cdGdldFVzZXIodXNlcklkZW50aWZpZXIpIHtcclxuXHRcdGNvbnN0IHVzZXIgPSB0aGlzLm1hcFt1c2VySWRlbnRpZmllcl07XHJcblxyXG5cdFx0cmV0dXJuIHVzZXI7XHJcblx0fVxyXG5cclxuXHRnZXRPdGhlclVzZXJzKHVzZXJJZGVudGlmaWVyKSB7XHJcblx0XHRjb25zdCBvdGhlclVzZXJzID0gT2JqZWN0LnZhbHVlcyh0aGlzLm1hcCk7XHJcblxyXG5cdFx0ZmlsdGVyKG90aGVyVXNlcnMsIChvdGhlclVzZXIpID0+IHtcclxuXHRcdFx0Y29uc3Qgb3RoZXJVc2VySWRlbnRpZmllciA9IG90aGVyVXNlci5nZXRJZGVudGlmaWVyKCk7XHJcblxyXG5cdFx0XHRpZiAob3RoZXJVc2VySWRlbnRpZmllciAhPT0gdXNlcklkZW50aWZpZXIpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIG90aGVyVXNlcnM7XHJcblx0fVxyXG5cclxuXHRoYXNFeHBpcmVkKHNlc3Npb25JZGVudGlmaWVyKSB7XHJcblx0XHRjb25zdCBleHBpcmVkID0gKHRoaXMuaWRlbnRpZmllciAhPT0gc2Vzc2lvbklkZW50aWZpZXIpO1xyXG5cclxuXHRcdHJldHVybiBleHBpcmVkO1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlVXNlcigpIHtcclxuXHRcdGNvbnN0IHVzZXIgPSBVc2VyLmZyb21Ob3RoaW5nKCksXHJcblx0XHRcdFx0XHR1c2VySWRlbnRpZmllciA9IHVzZXIuZ2V0SWRlbnRpZmllcigpO1xyXG5cclxuXHRcdHRoaXMubWFwW3VzZXJJZGVudGlmaWVyXSA9IHVzZXI7XHJcblxyXG5cdFx0cmV0dXJuIHVzZXJJZGVudGlmaWVyO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlKG9wZXJhdGlvbnMsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uRXhwaXJlZCkge1xyXG5cdCAgY29uc3QgcGVuZGluZ09wZXJhdGlvbnMgPSBzZXNzaW9uRXhwaXJlZCA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW10gOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVVc2VycyhvcGVyYXRpb25zLCB1c2VySWRlbnRpZmllcik7XHJcblxyXG5cdFx0cmV0dXJuIHBlbmRpbmdPcGVyYXRpb25zO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlVXNlcnMob3BlcmF0aW9ucywgdXNlcklkZW50aWZpZXIpIHtcclxuICAgIGNvbnN0IHVzZXIgPSB0aGlzLmdldFVzZXIodXNlcklkZW50aWZpZXIpLFxyXG4gICAgICAgICAgb3RoZXJVc2VycyA9IHRoaXMuZ2V0T3RoZXJVc2Vycyh1c2VySWRlbnRpZmllciksXHJcbiAgICAgICAgICB0cmFuc2Zvcm1lZE9wZXJhdGlvbnMgPSB1c2VyLnRyYW5zZm9ybU9wZXJhdGlvbnMob3BlcmF0aW9ucyksXHJcbiAgICAgICAgICB0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zID0gdXNlci50cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zKG9wZXJhdGlvbnMpO1xyXG5cclxuICAgIG90aGVyVXNlcnMuZm9yRWFjaCgob3RoZXJVc2VyKSA9PiB7XHJcbiAgICAgIG90aGVyVXNlci51cGRhdGUodHJhbnNmb3JtZWRPcGVyYXRpb25zKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuY29udGVudCA9IHRyYW5zZm9ybUNvbnRlbnQodGhpcy5jb250ZW50LCB0cmFuc2Zvcm1lZE9wZXJhdGlvbnMpO1xyXG5cclxuICAgIHVzZXIucmVzZXQoKTtcclxuXHJcbiAgICBjb25zdCBwZW5kaW5nT3BlcmF0aW9ucyA9IHRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnM7IC8vL1xyXG5cclxuICAgIHJldHVybiBwZW5kaW5nT3BlcmF0aW9ucztcclxuICB9XHJcblxyXG5cdHN0YXRpYyBmcm9tTm90aGluZygpIHtcclxuXHRcdGNvbnN0IG1hcCA9IHt9LFxyXG5cdFx0XHRcdFx0Y29udGVudCA9IFwiXCIsXHQvLy9cclxuXHRcdFx0XHRcdGlkZW50aWZpZXIgPSB1dWlkVjQoKSwgIC8vL1xyXG5cdFx0XHRcdFx0c2Vzc2lvbiA9IG5ldyBTZXNzaW9uKG1hcCwgY29udGVudCwgaWRlbnRpZmllcik7XHJcblxyXG5cdFx0cmV0dXJuIHNlc3Npb247XHJcblx0fVxyXG59XHJcblxyXG5jb25zdCBzZXNzaW9uID0gU2Vzc2lvbi5mcm9tTm90aGluZygpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgc2Vzc2lvbjtcclxuIl19