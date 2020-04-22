"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _session = _interopRequireDefault(require("../session"));

var _initialise = _interopRequireDefault(require("../response/initialise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
      var content = _session["default"].getContent(),
          userIdentifier = _session["default"].createUser(),
          sessionIdentifier = _session["default"].getIdentifier(),
          initialiseResponse = _initialise["default"].fromContentUserIdentifierAndSessionIdentifier(content, userIdentifier, sessionIdentifier),
          initialiseTransaction = new InitialiseTransaction(initialiseResponse);

      return initialiseTransaction;
    }
  }]);

  return InitialiseTransaction;
}();

exports["default"] = InitialiseTransaction;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaXRpYWxpc2UuanMiXSwibmFtZXMiOlsiSW5pdGlhbGlzZVRyYW5zYWN0aW9uIiwiaW5pdGlhbGlzZVJlc3BvbnNlIiwidG9KU09OIiwianNvbiIsImNvbnRlbnQiLCJzZXNzaW9uIiwiZ2V0Q29udGVudCIsInVzZXJJZGVudGlmaWVyIiwiY3JlYXRlVXNlciIsInNlc3Npb25JZGVudGlmaWVyIiwiZ2V0SWRlbnRpZmllciIsIkluaXRpYWxpc2VSZXNwb25zZSIsImZyb21Db250ZW50VXNlcklkZW50aWZpZXJBbmRTZXNzaW9uSWRlbnRpZmllciIsImluaXRpYWxpc2VUcmFuc2FjdGlvbiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEscUI7QUFDbkIsaUNBQVlDLGtCQUFaLEVBQWdDO0FBQUE7O0FBQzlCLFNBQUtBLGtCQUFMLEdBQTBCQSxrQkFBMUI7QUFDRDs7Ozs2QkFFUTtBQUFFLGFBQU8sS0FBS0Esa0JBQUwsQ0FBd0JDLE1BQXhCLEVBQVA7QUFBMEM7Ozs2QkFFckNDLEksRUFBTTtBQUNwQixVQUFNQyxPQUFPLEdBQUdDLG9CQUFRQyxVQUFSLEVBQWhCO0FBQUEsVUFDTUMsY0FBYyxHQUFHRixvQkFBUUcsVUFBUixFQUR2QjtBQUFBLFVBRUNDLGlCQUFpQixHQUFHSixvQkFBUUssYUFBUixFQUZyQjtBQUFBLFVBR01ULGtCQUFrQixHQUFHVSx1QkFBbUJDLDZDQUFuQixDQUFpRVIsT0FBakUsRUFBMEVHLGNBQTFFLEVBQTBGRSxpQkFBMUYsQ0FIM0I7QUFBQSxVQUlNSSxxQkFBcUIsR0FBRyxJQUFJYixxQkFBSixDQUEwQkMsa0JBQTFCLENBSjlCOztBQU1BLGFBQU9ZLHFCQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHNlc3Npb24gZnJvbSBcIi4uL3Nlc3Npb25cIjtcbmltcG9ydCBJbml0aWFsaXNlUmVzcG9uc2UgZnJvbSBcIi4uL3Jlc3BvbnNlL2luaXRpYWxpc2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5pdGlhbGlzZVRyYW5zYWN0aW9uIHtcbiAgY29uc3RydWN0b3IoaW5pdGlhbGlzZVJlc3BvbnNlKSB7XG4gICAgdGhpcy5pbml0aWFsaXNlUmVzcG9uc2UgPSBpbml0aWFsaXNlUmVzcG9uc2U7XG4gIH1cblxuICB0b0pTT04oKSB7IHJldHVybiB0aGlzLmluaXRpYWxpc2VSZXNwb25zZS50b0pTT04oKTsgfVxuXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XG4gICAgY29uc3QgY29udGVudCA9IHNlc3Npb24uZ2V0Q29udGVudCgpLFxuICAgICAgICAgIHVzZXJJZGVudGlmaWVyID0gc2Vzc2lvbi5jcmVhdGVVc2VyKCksXG5cdFx0XHRcdFx0c2Vzc2lvbklkZW50aWZpZXIgPSBzZXNzaW9uLmdldElkZW50aWZpZXIoKSxcbiAgICAgICAgICBpbml0aWFsaXNlUmVzcG9uc2UgPSBJbml0aWFsaXNlUmVzcG9uc2UuZnJvbUNvbnRlbnRVc2VySWRlbnRpZmllckFuZFNlc3Npb25JZGVudGlmaWVyKGNvbnRlbnQsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllciksXG4gICAgICAgICAgaW5pdGlhbGlzZVRyYW5zYWN0aW9uID0gbmV3IEluaXRpYWxpc2VUcmFuc2FjdGlvbihpbml0aWFsaXNlUmVzcG9uc2UpO1xuXG4gICAgcmV0dXJuIGluaXRpYWxpc2VUcmFuc2FjdGlvbjtcbiAgfVxufVxuIl19