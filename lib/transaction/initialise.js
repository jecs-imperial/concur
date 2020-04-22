"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var session = require("../session"),
    InitialiseResponse = require("../response/initialise");

var InitialiseTransaction = /*#__PURE__*/function () {
  function InitialiseTransaction(initialiseResponse) {
    _classCallCheck(this, InitialiseTransaction);

    this.initialiseResponse = initialiseResponse;
  }

  _createClass(InitialiseTransaction, [{
    key: "toJSON",
    value: function toJSON() {
      return this.initialiseResponse.toJSON();
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(json) {
      var content = session.getContent(),
          userIdentifier = session.createUser(),
          sessionIdentifier = session.getIdentifier(),
          initialiseResponse = InitialiseResponse.fromContentUserIdentifierAndSessionIdentifier(content, userIdentifier, sessionIdentifier),
          initialiseTransaction = new InitialiseTransaction(initialiseResponse);
      return initialiseTransaction;
    }
  }]);

  return InitialiseTransaction;
}();

module.exports = InitialiseTransaction;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaXRpYWxpc2UuanMiXSwibmFtZXMiOlsic2Vzc2lvbiIsInJlcXVpcmUiLCJJbml0aWFsaXNlUmVzcG9uc2UiLCJJbml0aWFsaXNlVHJhbnNhY3Rpb24iLCJpbml0aWFsaXNlUmVzcG9uc2UiLCJ0b0pTT04iLCJqc29uIiwiY29udGVudCIsImdldENvbnRlbnQiLCJ1c2VySWRlbnRpZmllciIsImNyZWF0ZVVzZXIiLCJzZXNzaW9uSWRlbnRpZmllciIsImdldElkZW50aWZpZXIiLCJmcm9tQ29udGVudFVzZXJJZGVudGlmaWVyQW5kU2Vzc2lvbklkZW50aWZpZXIiLCJpbml0aWFsaXNlVHJhbnNhY3Rpb24iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPLEdBQUdDLE9BQU8sQ0FBQyxZQUFELENBQXZCO0FBQUEsSUFDTUMsa0JBQWtCLEdBQUdELE9BQU8sQ0FBQyx3QkFBRCxDQURsQzs7SUFHTUUscUI7QUFDSixpQ0FBWUMsa0JBQVosRUFBZ0M7QUFBQTs7QUFDOUIsU0FBS0Esa0JBQUwsR0FBMEJBLGtCQUExQjtBQUNEOzs7OzZCQUVRO0FBQUUsYUFBTyxLQUFLQSxrQkFBTCxDQUF3QkMsTUFBeEIsRUFBUDtBQUEwQzs7OzZCQUVyQ0MsSSxFQUFNO0FBQ3BCLFVBQU1DLE9BQU8sR0FBR1AsT0FBTyxDQUFDUSxVQUFSLEVBQWhCO0FBQUEsVUFDTUMsY0FBYyxHQUFHVCxPQUFPLENBQUNVLFVBQVIsRUFEdkI7QUFBQSxVQUVDQyxpQkFBaUIsR0FBR1gsT0FBTyxDQUFDWSxhQUFSLEVBRnJCO0FBQUEsVUFHTVIsa0JBQWtCLEdBQUdGLGtCQUFrQixDQUFDVyw2Q0FBbkIsQ0FBaUVOLE9BQWpFLEVBQTBFRSxjQUExRSxFQUEwRkUsaUJBQTFGLENBSDNCO0FBQUEsVUFJTUcscUJBQXFCLEdBQUcsSUFBSVgscUJBQUosQ0FBMEJDLGtCQUExQixDQUo5QjtBQU1BLGFBQU9VLHFCQUFQO0FBQ0Q7Ozs7OztBQUdIQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJiLHFCQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBzZXNzaW9uID0gcmVxdWlyZShcIi4uL3Nlc3Npb25cIiksXG4gICAgICBJbml0aWFsaXNlUmVzcG9uc2UgPSByZXF1aXJlKFwiLi4vcmVzcG9uc2UvaW5pdGlhbGlzZVwiKTtcblxuY2xhc3MgSW5pdGlhbGlzZVRyYW5zYWN0aW9uIHtcbiAgY29uc3RydWN0b3IoaW5pdGlhbGlzZVJlc3BvbnNlKSB7XG4gICAgdGhpcy5pbml0aWFsaXNlUmVzcG9uc2UgPSBpbml0aWFsaXNlUmVzcG9uc2U7XG4gIH1cblxuICB0b0pTT04oKSB7IHJldHVybiB0aGlzLmluaXRpYWxpc2VSZXNwb25zZS50b0pTT04oKTsgfVxuXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XG4gICAgY29uc3QgY29udGVudCA9IHNlc3Npb24uZ2V0Q29udGVudCgpLFxuICAgICAgICAgIHVzZXJJZGVudGlmaWVyID0gc2Vzc2lvbi5jcmVhdGVVc2VyKCksXG5cdFx0XHRcdFx0c2Vzc2lvbklkZW50aWZpZXIgPSBzZXNzaW9uLmdldElkZW50aWZpZXIoKSxcbiAgICAgICAgICBpbml0aWFsaXNlUmVzcG9uc2UgPSBJbml0aWFsaXNlUmVzcG9uc2UuZnJvbUNvbnRlbnRVc2VySWRlbnRpZmllckFuZFNlc3Npb25JZGVudGlmaWVyKGNvbnRlbnQsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllciksXG4gICAgICAgICAgaW5pdGlhbGlzZVRyYW5zYWN0aW9uID0gbmV3IEluaXRpYWxpc2VUcmFuc2FjdGlvbihpbml0aWFsaXNlUmVzcG9uc2UpO1xuXG4gICAgcmV0dXJuIGluaXRpYWxpc2VUcmFuc2FjdGlvbjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEluaXRpYWxpc2VUcmFuc2FjdGlvbjtcbiJdfQ==