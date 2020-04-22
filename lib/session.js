"use strict";

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
module.exports = session;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlc3Npb24uanMiXSwibmFtZXMiOlsiZmlsdGVyIiwiYXJyYXlVdGlsaXRpZXMiLCJTZXNzaW9uIiwibWFwIiwiY29udGVudCIsImlkZW50aWZpZXIiLCJ1c2VySWRlbnRpZmllciIsInVzZXIiLCJvdGhlclVzZXJzIiwiT2JqZWN0IiwidmFsdWVzIiwib3RoZXJVc2VyIiwib3RoZXJVc2VySWRlbnRpZmllciIsImdldElkZW50aWZpZXIiLCJzZXNzaW9uSWRlbnRpZmllciIsImV4cGlyZWQiLCJVc2VyIiwiZnJvbU5vdGhpbmciLCJvcGVyYXRpb25zIiwic2Vzc2lvbkV4cGlyZWQiLCJwZW5kaW5nT3BlcmF0aW9ucyIsInVwZGF0ZVVzZXJzIiwiZ2V0VXNlciIsImdldE90aGVyVXNlcnMiLCJ0cmFuc2Zvcm1lZE9wZXJhdGlvbnMiLCJ0cmFuc2Zvcm1PcGVyYXRpb25zIiwidHJhbnNmb3JtZWRQZW5kaW5nT3BlcmF0aW9ucyIsImZvckVhY2giLCJ1cGRhdGUiLCJyZXNldCIsInNlc3Npb24iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7OztJQUVRQSxNLEdBQVdDLHlCLENBQVhELE07O0lBRUZFLE87QUFDTCxtQkFBWUMsR0FBWixFQUFpQkMsT0FBakIsRUFBMEJDLFVBQTFCLEVBQXNDO0FBQUE7O0FBQ3JDLFNBQUtGLEdBQUwsR0FBV0EsR0FBWDtBQUNBLFNBQUtDLE9BQUwsR0FBZUEsT0FBZjtBQUNBLFNBQUtDLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0E7Ozs7NkJBRVE7QUFDUixhQUFPLEtBQUtGLEdBQVo7QUFDQTs7O2lDQUVZO0FBQ1osYUFBTyxLQUFLQyxPQUFaO0FBQ0E7OztvQ0FFZTtBQUNmLGFBQU8sS0FBS0MsVUFBWjtBQUNBOzs7NEJBRU9DLGMsRUFBZ0I7QUFDdkIsVUFBTUMsSUFBSSxHQUFHLEtBQUtKLEdBQUwsQ0FBU0csY0FBVCxDQUFiO0FBRUEsYUFBT0MsSUFBUDtBQUNBOzs7a0NBRWFELGMsRUFBZ0I7QUFDN0IsVUFBTUUsVUFBVSxHQUFHQyxNQUFNLENBQUNDLE1BQVAsQ0FBYyxLQUFLUCxHQUFuQixDQUFuQjtBQUVBSCxNQUFBQSxNQUFNLENBQUNRLFVBQUQsRUFBYSxVQUFDRyxTQUFELEVBQWU7QUFDakMsWUFBTUMsbUJBQW1CLEdBQUdELFNBQVMsQ0FBQ0UsYUFBVixFQUE1Qjs7QUFFQSxZQUFJRCxtQkFBbUIsS0FBS04sY0FBNUIsRUFBNEM7QUFDM0MsaUJBQU8sSUFBUDtBQUNBO0FBQ0QsT0FOSyxDQUFOO0FBUUEsYUFBT0UsVUFBUDtBQUNBOzs7K0JBRVVNLGlCLEVBQW1CO0FBQzdCLFVBQU1DLE9BQU8sR0FBSSxLQUFLVixVQUFMLEtBQW9CUyxpQkFBckM7QUFFQSxhQUFPQyxPQUFQO0FBQ0E7OztpQ0FFWTtBQUNaLFVBQU1SLElBQUksR0FBR1MsaUJBQUtDLFdBQUwsRUFBYjtBQUFBLFVBQ0dYLGNBQWMsR0FBR0MsSUFBSSxDQUFDTSxhQUFMLEVBRHBCOztBQUdBLFdBQUtWLEdBQUwsQ0FBU0csY0FBVCxJQUEyQkMsSUFBM0I7QUFFQSxhQUFPRCxjQUFQO0FBQ0E7OzsyQkFFTVksVSxFQUFZWixjLEVBQWdCYSxjLEVBQWdCO0FBQ2pELFVBQU1DLGlCQUFpQixHQUFHRCxjQUFjLEdBQ1gsRUFEVyxHQUVULEtBQUtFLFdBQUwsQ0FBaUJILFVBQWpCLEVBQTZCWixjQUE3QixDQUYvQjtBQUlELGFBQU9jLGlCQUFQO0FBQ0E7OztnQ0FFV0YsVSxFQUFZWixjLEVBQWdCO0FBQ3JDLFVBQU1DLElBQUksR0FBRyxLQUFLZSxPQUFMLENBQWFoQixjQUFiLENBQWI7QUFBQSxVQUNNRSxVQUFVLEdBQUcsS0FBS2UsYUFBTCxDQUFtQmpCLGNBQW5CLENBRG5CO0FBQUEsVUFFTWtCLHFCQUFxQixHQUFHakIsSUFBSSxDQUFDa0IsbUJBQUwsQ0FBeUJQLFVBQXpCLENBRjlCO0FBQUEsVUFHTVEsNEJBQTRCLEdBQUduQixJQUFJLENBQUNtQiw0QkFBTCxDQUFrQ1IsVUFBbEMsQ0FIckM7QUFLQVYsTUFBQUEsVUFBVSxDQUFDbUIsT0FBWCxDQUFtQixVQUFDaEIsU0FBRCxFQUFlO0FBQ2hDQSxRQUFBQSxTQUFTLENBQUNpQixNQUFWLENBQWlCSixxQkFBakI7QUFDRCxPQUZEO0FBSUEsV0FBS3BCLE9BQUwsR0FBZSwyQkFBaUIsS0FBS0EsT0FBdEIsRUFBK0JvQixxQkFBL0IsQ0FBZjtBQUVBakIsTUFBQUEsSUFBSSxDQUFDc0IsS0FBTDtBQUVBLFVBQU1ULGlCQUFpQixHQUFHTSw0QkFBMUIsQ0FkcUMsQ0FjbUI7O0FBRXhELGFBQU9OLGlCQUFQO0FBQ0Q7OztrQ0FFbUI7QUFDcEIsVUFBTWpCLEdBQUcsR0FBRyxFQUFaO0FBQUEsVUFDR0MsT0FBTyxHQUFHLEVBRGI7QUFBQSxVQUNpQjtBQUNkQyxNQUFBQSxVQUFVLEdBQUcsb0JBRmhCO0FBQUEsVUFFMkI7QUFDeEJ5QixNQUFBQSxPQUFPLEdBQUcsSUFBSTVCLE9BQUosQ0FBWUMsR0FBWixFQUFpQkMsT0FBakIsRUFBMEJDLFVBQTFCLENBSGI7QUFLQSxhQUFPeUIsT0FBUDtBQUNBOzs7Ozs7QUFHRixJQUFNQSxPQUFPLEdBQUc1QixPQUFPLENBQUNlLFdBQVIsRUFBaEI7QUFFQWMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCRixPQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHV1aWRWNCBmcm9tIFwidXVpZC92NFwiO1xyXG5cclxuaW1wb3J0IHsgYXJyYXlVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XHJcblxyXG5pbXBvcnQgVXNlciBmcm9tIFwiLi91c2VyXCI7XHJcbmltcG9ydCB0cmFuc2Zvcm1Db250ZW50IGZyb20gXCIuL2NvbnRlbnQvdHJhbnNmb3JtXCI7XHJcblxyXG5jb25zdCB7IGZpbHRlciB9ID0gYXJyYXlVdGlsaXRpZXM7XHJcblxyXG5jbGFzcyBTZXNzaW9uIHtcclxuXHRjb25zdHJ1Y3RvcihtYXAsIGNvbnRlbnQsIGlkZW50aWZpZXIpIHtcclxuXHRcdHRoaXMubWFwID0gbWFwO1xyXG5cdFx0dGhpcy5jb250ZW50ID0gY29udGVudDtcclxuXHRcdHRoaXMuaWRlbnRpZmllciA9IGlkZW50aWZpZXI7XHJcblx0fVxyXG5cclxuXHRnZXRNYXAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5tYXA7XHJcblx0fVxyXG5cclxuXHRnZXRDb250ZW50KCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuY29udGVudDtcclxuXHR9XHJcblxyXG5cdGdldElkZW50aWZpZXIoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5pZGVudGlmaWVyO1xyXG5cdH1cclxuXHJcblx0Z2V0VXNlcih1c2VySWRlbnRpZmllcikge1xyXG5cdFx0Y29uc3QgdXNlciA9IHRoaXMubWFwW3VzZXJJZGVudGlmaWVyXTtcclxuXHJcblx0XHRyZXR1cm4gdXNlcjtcclxuXHR9XHJcblxyXG5cdGdldE90aGVyVXNlcnModXNlcklkZW50aWZpZXIpIHtcclxuXHRcdGNvbnN0IG90aGVyVXNlcnMgPSBPYmplY3QudmFsdWVzKHRoaXMubWFwKTtcclxuXHJcblx0XHRmaWx0ZXIob3RoZXJVc2VycywgKG90aGVyVXNlcikgPT4ge1xyXG5cdFx0XHRjb25zdCBvdGhlclVzZXJJZGVudGlmaWVyID0gb3RoZXJVc2VyLmdldElkZW50aWZpZXIoKTtcclxuXHJcblx0XHRcdGlmIChvdGhlclVzZXJJZGVudGlmaWVyICE9PSB1c2VySWRlbnRpZmllcikge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gb3RoZXJVc2VycztcclxuXHR9XHJcblxyXG5cdGhhc0V4cGlyZWQoc2Vzc2lvbklkZW50aWZpZXIpIHtcclxuXHRcdGNvbnN0IGV4cGlyZWQgPSAodGhpcy5pZGVudGlmaWVyICE9PSBzZXNzaW9uSWRlbnRpZmllcik7XHJcblxyXG5cdFx0cmV0dXJuIGV4cGlyZWQ7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVVc2VyKCkge1xyXG5cdFx0Y29uc3QgdXNlciA9IFVzZXIuZnJvbU5vdGhpbmcoKSxcclxuXHRcdFx0XHRcdHVzZXJJZGVudGlmaWVyID0gdXNlci5nZXRJZGVudGlmaWVyKCk7XHJcblxyXG5cdFx0dGhpcy5tYXBbdXNlcklkZW50aWZpZXJdID0gdXNlcjtcclxuXHJcblx0XHRyZXR1cm4gdXNlcklkZW50aWZpZXI7XHJcblx0fVxyXG5cclxuXHR1cGRhdGUob3BlcmF0aW9ucywgdXNlcklkZW50aWZpZXIsIHNlc3Npb25FeHBpcmVkKSB7XHJcblx0ICBjb25zdCBwZW5kaW5nT3BlcmF0aW9ucyA9IHNlc3Npb25FeHBpcmVkID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVVzZXJzKG9wZXJhdGlvbnMsIHVzZXJJZGVudGlmaWVyKTtcclxuXHJcblx0XHRyZXR1cm4gcGVuZGluZ09wZXJhdGlvbnM7XHJcblx0fVxyXG5cclxuXHR1cGRhdGVVc2VycyhvcGVyYXRpb25zLCB1c2VySWRlbnRpZmllcikge1xyXG4gICAgY29uc3QgdXNlciA9IHRoaXMuZ2V0VXNlcih1c2VySWRlbnRpZmllciksXHJcbiAgICAgICAgICBvdGhlclVzZXJzID0gdGhpcy5nZXRPdGhlclVzZXJzKHVzZXJJZGVudGlmaWVyKSxcclxuICAgICAgICAgIHRyYW5zZm9ybWVkT3BlcmF0aW9ucyA9IHVzZXIudHJhbnNmb3JtT3BlcmF0aW9ucyhvcGVyYXRpb25zKSxcclxuICAgICAgICAgIHRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMgPSB1c2VyLnRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMob3BlcmF0aW9ucyk7XHJcblxyXG4gICAgb3RoZXJVc2Vycy5mb3JFYWNoKChvdGhlclVzZXIpID0+IHtcclxuICAgICAgb3RoZXJVc2VyLnVwZGF0ZSh0cmFuc2Zvcm1lZE9wZXJhdGlvbnMpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5jb250ZW50ID0gdHJhbnNmb3JtQ29udGVudCh0aGlzLmNvbnRlbnQsIHRyYW5zZm9ybWVkT3BlcmF0aW9ucyk7XHJcblxyXG4gICAgdXNlci5yZXNldCgpO1xyXG5cclxuICAgIGNvbnN0IHBlbmRpbmdPcGVyYXRpb25zID0gdHJhbnNmb3JtZWRQZW5kaW5nT3BlcmF0aW9uczsgLy8vXHJcblxyXG4gICAgcmV0dXJuIHBlbmRpbmdPcGVyYXRpb25zO1xyXG4gIH1cclxuXHJcblx0c3RhdGljIGZyb21Ob3RoaW5nKCkge1xyXG5cdFx0Y29uc3QgbWFwID0ge30sXHJcblx0XHRcdFx0XHRjb250ZW50ID0gXCJcIixcdC8vL1xyXG5cdFx0XHRcdFx0aWRlbnRpZmllciA9IHV1aWRWNCgpLCAgLy8vXHJcblx0XHRcdFx0XHRzZXNzaW9uID0gbmV3IFNlc3Npb24obWFwLCBjb250ZW50LCBpZGVudGlmaWVyKTtcclxuXHJcblx0XHRyZXR1cm4gc2Vzc2lvbjtcclxuXHR9XHJcbn1cclxuXHJcbmNvbnN0IHNlc3Npb24gPSBTZXNzaW9uLmZyb21Ob3RoaW5nKCk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHNlc3Npb247XHJcbiJdfQ==