'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var uuidV4 = require('uuid/v4'),
    ///
necessary = require('necessary');

var User = require('./user'),
    transformContent = require('./content/transform');

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
          content = '',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlc3Npb24uanMiXSwibmFtZXMiOlsidXVpZFY0IiwicmVxdWlyZSIsIm5lY2Vzc2FyeSIsIlVzZXIiLCJ0cmFuc2Zvcm1Db250ZW50IiwiYXJyYXlVdGlsaXRpZXMiLCJmaWx0ZXIiLCJTZXNzaW9uIiwibWFwIiwiY29udGVudCIsImlkZW50aWZpZXIiLCJ1c2VySWRlbnRpZmllciIsInVzZXIiLCJvdGhlclVzZXJzIiwiT2JqZWN0IiwidmFsdWVzIiwib3RoZXJVc2VyIiwib3RoZXJVc2VySWRlbnRpZmllciIsImdldElkZW50aWZpZXIiLCJzZXNzaW9uSWRlbnRpZmllciIsImV4cGlyZWQiLCJmcm9tTm90aGluZyIsIm9wZXJhdGlvbnMiLCJzZXNzaW9uRXhwaXJlZCIsInBlbmRpbmdPcGVyYXRpb25zIiwidXBkYXRlVXNlcnMiLCJnZXRVc2VyIiwiZ2V0T3RoZXJVc2VycyIsInRyYW5zZm9ybWVkT3BlcmF0aW9ucyIsInRyYW5zZm9ybU9wZXJhdGlvbnMiLCJ0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zIiwiZm9yRWFjaCIsInVwZGF0ZSIsInJlc2V0Iiwic2Vzc2lvbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQUVBLElBQU1BLE1BQU0sR0FBR0MsT0FBTyxDQUFDLFNBQUQsQ0FBdEI7QUFBQSxJQUFvQztBQUM5QkMsU0FBUyxHQUFHRCxPQUFPLENBQUMsV0FBRCxDQUR6Qjs7QUFHQSxJQUFNRSxJQUFJLEdBQUdGLE9BQU8sQ0FBQyxRQUFELENBQXBCO0FBQUEsSUFDTUcsZ0JBQWdCLEdBQUdILE9BQU8sQ0FBQyxxQkFBRCxDQURoQzs7QUFHTSxJQUFFSSxjQUFGLEdBQXFCSCxTQUFyQixDQUFFRyxjQUFGO0FBQUEsSUFDRUMsTUFERixHQUNhRCxjQURiLENBQ0VDLE1BREY7O0lBR0FDLE87QUFDTCxtQkFBWUMsR0FBWixFQUFpQkMsT0FBakIsRUFBMEJDLFVBQTFCLEVBQXNDO0FBQUE7O0FBQ3JDLFNB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dWlkVjQgPSByZXF1aXJlKCd1dWlkL3Y0JyksICAvLy9cclxuICAgICAgbmVjZXNzYXJ5ID0gcmVxdWlyZSgnbmVjZXNzYXJ5Jyk7XHJcblxyXG5jb25zdCBVc2VyID0gcmVxdWlyZSgnLi91c2VyJyksXHJcbiAgICAgIHRyYW5zZm9ybUNvbnRlbnQgPSByZXF1aXJlKCcuL2NvbnRlbnQvdHJhbnNmb3JtJyk7XHJcblxyXG5jb25zdCB7IGFycmF5VXRpbGl0aWVzIH0gPSBuZWNlc3NhcnksXHJcbiAgICAgIHsgZmlsdGVyIH0gPSBhcnJheVV0aWxpdGllcztcclxuXHJcbmNsYXNzIFNlc3Npb24ge1xyXG5cdGNvbnN0cnVjdG9yKG1hcCwgY29udGVudCwgaWRlbnRpZmllcikge1xyXG5cdFx0dGhpcy5tYXAgPSBtYXA7XHJcblx0XHR0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xyXG5cdFx0dGhpcy5pZGVudGlmaWVyID0gaWRlbnRpZmllcjtcclxuXHR9XHJcblxyXG5cdGdldE1hcCgpIHtcclxuXHRcdHJldHVybiB0aGlzLm1hcDtcclxuXHR9XHJcblxyXG5cdGdldENvbnRlbnQoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5jb250ZW50O1xyXG5cdH1cclxuXHJcblx0Z2V0SWRlbnRpZmllcigpIHtcclxuXHRcdHJldHVybiB0aGlzLmlkZW50aWZpZXI7XHJcblx0fVxyXG5cclxuXHRnZXRVc2VyKHVzZXJJZGVudGlmaWVyKSB7XHJcblx0XHRjb25zdCB1c2VyID0gdGhpcy5tYXBbdXNlcklkZW50aWZpZXJdO1xyXG5cclxuXHRcdHJldHVybiB1c2VyO1xyXG5cdH1cclxuXHJcblx0Z2V0T3RoZXJVc2Vycyh1c2VySWRlbnRpZmllcikge1xyXG5cdFx0Y29uc3Qgb3RoZXJVc2VycyA9IE9iamVjdC52YWx1ZXModGhpcy5tYXApO1xyXG5cclxuXHRcdGZpbHRlcihvdGhlclVzZXJzLCBmdW5jdGlvbihvdGhlclVzZXIpIHtcclxuXHRcdFx0Y29uc3Qgb3RoZXJVc2VySWRlbnRpZmllciA9IG90aGVyVXNlci5nZXRJZGVudGlmaWVyKCk7XHJcblxyXG5cdFx0XHRpZiAob3RoZXJVc2VySWRlbnRpZmllciAhPT0gdXNlcklkZW50aWZpZXIpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIG90aGVyVXNlcnM7XHJcblx0fVxyXG5cclxuXHRoYXNFeHBpcmVkKHNlc3Npb25JZGVudGlmaWVyKSB7XHJcblx0XHRjb25zdCBleHBpcmVkID0gKHRoaXMuaWRlbnRpZmllciAhPT0gc2Vzc2lvbklkZW50aWZpZXIpO1xyXG5cclxuXHRcdHJldHVybiBleHBpcmVkO1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlVXNlcigpIHtcclxuXHRcdGNvbnN0IHVzZXIgPSBVc2VyLmZyb21Ob3RoaW5nKCksXHJcblx0XHRcdFx0XHR1c2VySWRlbnRpZmllciA9IHVzZXIuZ2V0SWRlbnRpZmllcigpO1xyXG5cclxuXHRcdHRoaXMubWFwW3VzZXJJZGVudGlmaWVyXSA9IHVzZXI7XHJcblxyXG5cdFx0cmV0dXJuIHVzZXJJZGVudGlmaWVyO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlKG9wZXJhdGlvbnMsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uRXhwaXJlZCkge1xyXG5cdCAgY29uc3QgcGVuZGluZ09wZXJhdGlvbnMgPSBzZXNzaW9uRXhwaXJlZCA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW10gOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVVc2VycyhvcGVyYXRpb25zLCB1c2VySWRlbnRpZmllcik7XHJcblxyXG5cdFx0cmV0dXJuIHBlbmRpbmdPcGVyYXRpb25zO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlVXNlcnMob3BlcmF0aW9ucywgdXNlcklkZW50aWZpZXIpIHtcclxuICAgIGNvbnN0IHVzZXIgPSB0aGlzLmdldFVzZXIodXNlcklkZW50aWZpZXIpLFxyXG4gICAgICAgICAgb3RoZXJVc2VycyA9IHRoaXMuZ2V0T3RoZXJVc2Vycyh1c2VySWRlbnRpZmllciksXHJcbiAgICAgICAgICB0cmFuc2Zvcm1lZE9wZXJhdGlvbnMgPSB1c2VyLnRyYW5zZm9ybU9wZXJhdGlvbnMob3BlcmF0aW9ucyksXHJcbiAgICAgICAgICB0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zID0gdXNlci50cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zKG9wZXJhdGlvbnMpO1xyXG5cclxuICAgIG90aGVyVXNlcnMuZm9yRWFjaChmdW5jdGlvbihvdGhlclVzZXIpIHtcclxuICAgICAgb3RoZXJVc2VyLnVwZGF0ZSh0cmFuc2Zvcm1lZE9wZXJhdGlvbnMpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5jb250ZW50ID0gdHJhbnNmb3JtQ29udGVudCh0aGlzLmNvbnRlbnQsIHRyYW5zZm9ybWVkT3BlcmF0aW9ucyk7XHJcblxyXG4gICAgdXNlci5yZXNldCgpO1xyXG5cclxuICAgIGNvbnN0IHBlbmRpbmdPcGVyYXRpb25zID0gdHJhbnNmb3JtZWRQZW5kaW5nT3BlcmF0aW9uczsgLy8vXHJcblxyXG4gICAgcmV0dXJuIHBlbmRpbmdPcGVyYXRpb25zO1xyXG4gIH1cclxuXHJcblx0c3RhdGljIGZyb21Ob3RoaW5nKCkge1xyXG5cdFx0Y29uc3QgbWFwID0ge30sXHJcblx0XHRcdFx0XHRjb250ZW50ID0gJycsXHQvLy9cclxuXHRcdFx0XHRcdGlkZW50aWZpZXIgPSB1dWlkVjQoKSwgIC8vL1xyXG5cdFx0XHRcdFx0c2Vzc2lvbiA9IG5ldyBTZXNzaW9uKG1hcCwgY29udGVudCwgaWRlbnRpZmllcik7XHJcblxyXG5cdFx0cmV0dXJuIHNlc3Npb247XHJcblx0fVxyXG59XHJcblxyXG5jb25zdCBzZXNzaW9uID0gU2Vzc2lvbi5mcm9tTm90aGluZygpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBzZXNzaW9uO1xyXG4iXX0=