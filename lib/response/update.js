"use strict";

var _toJSON = _interopRequireDefault(require("../operations/toJSON"));

var _fromJSON = _interopRequireDefault(require("../operations/fromJSON"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UpdateResponse = /*#__PURE__*/function () {
  function UpdateResponse(sessionExpired, pendingOperations) {
    _classCallCheck(this, UpdateResponse);

    this.sessionExpired = sessionExpired;
    this.pendingOperations = pendingOperations;
  }

  _createClass(UpdateResponse, [{
    key: "getSessionExpired",
    value: function getSessionExpired() {
      return this.sessionExpired;
    }
  }, {
    key: "getPendingOperations",
    value: function getPendingOperations() {
      return this.pendingOperations;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var pendingOperationsJSON = (0, _toJSON["default"])(this.pendingOperations),
          pendingOperations = pendingOperationsJSON,
          ///
      json = {
        "sessionExpired": this.sessionExpired,
        "pendingOperations": pendingOperations
      };
      return json;
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(json) {
      var sessionExpiredJSON = json["sessionExpired"],
          pendingOperationsJSON = json["pendingOperations"],
          sessionExpired = sessionExpiredJSON,
          ///
      pendingOperations = (0, _fromJSON["default"])(pendingOperationsJSON),
          updateResponse = new UpdateResponse(sessionExpired, pendingOperations);
      return updateResponse;
    }
  }, {
    key: "fromSessionExpiredAndPendingOperations",
    value: function fromSessionExpiredAndPendingOperations(sessionExpired, pendingOperations) {
      var updateResponse = new UpdateResponse(sessionExpired, pendingOperations);
      return updateResponse;
    }
  }]);

  return UpdateResponse;
}();

module.exports = UpdateResponse;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVwZGF0ZS5qcyJdLCJuYW1lcyI6WyJVcGRhdGVSZXNwb25zZSIsInNlc3Npb25FeHBpcmVkIiwicGVuZGluZ09wZXJhdGlvbnMiLCJwZW5kaW5nT3BlcmF0aW9uc0pTT04iLCJqc29uIiwic2Vzc2lvbkV4cGlyZWRKU09OIiwidXBkYXRlUmVzcG9uc2UiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7OztJQUVNQSxjO0FBQ0osMEJBQVlDLGNBQVosRUFBNEJDLGlCQUE1QixFQUErQztBQUFBOztBQUM5QyxTQUFLRCxjQUFMLEdBQXNCQSxjQUF0QjtBQUNDLFNBQUtDLGlCQUFMLEdBQXlCQSxpQkFBekI7QUFDRDs7Ozt3Q0FFbUI7QUFDbkIsYUFBTyxLQUFLRCxjQUFaO0FBQ0Q7OzsyQ0FFdUI7QUFDckIsYUFBTyxLQUFLQyxpQkFBWjtBQUNEOzs7NkJBRVE7QUFDUCxVQUFNQyxxQkFBcUIsR0FBRyx3QkFBaUIsS0FBS0QsaUJBQXRCLENBQTlCO0FBQUEsVUFDTUEsaUJBQWlCLEdBQUdDLHFCQUQxQjtBQUFBLFVBQ2tEO0FBQzVDQyxNQUFBQSxJQUFJLEdBQUc7QUFDVCwwQkFBa0IsS0FBS0gsY0FEZDtBQUVMLDZCQUFxQkM7QUFGaEIsT0FGYjtBQU9BLGFBQU9FLElBQVA7QUFDRDs7OzZCQUVlQSxJLEVBQU07QUFDcEIsVUFBTUMsa0JBQWtCLEdBQUdELElBQUksQ0FBQyxnQkFBRCxDQUEvQjtBQUFBLFVBQ0NELHFCQUFxQixHQUFHQyxJQUFJLENBQUMsbUJBQUQsQ0FEN0I7QUFBQSxVQUVDSCxjQUFjLEdBQUdJLGtCQUZsQjtBQUFBLFVBRXNDO0FBQ3JDSCxNQUFBQSxpQkFBaUIsR0FBRywwQkFBbUJDLHFCQUFuQixDQUhyQjtBQUFBLFVBSU1HLGNBQWMsR0FBRyxJQUFJTixjQUFKLENBQW1CQyxjQUFuQixFQUFtQ0MsaUJBQW5DLENBSnZCO0FBTUEsYUFBT0ksY0FBUDtBQUNEOzs7MkRBRTZDTCxjLEVBQWdCQyxpQixFQUFtQjtBQUMvRSxVQUFNSSxjQUFjLEdBQUcsSUFBSU4sY0FBSixDQUFtQkMsY0FBbkIsRUFBbUNDLGlCQUFuQyxDQUF2QjtBQUVBLGFBQU9JLGNBQVA7QUFDRDs7Ozs7O0FBR0hDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQlIsY0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IG9wZXJhdGlvbnNUb0pTT04gZnJvbSBcIi4uL29wZXJhdGlvbnMvdG9KU09OXCI7XG5pbXBvcnQgb3BlcmF0aW9uc0Zyb21KU09OIGZyb20gXCIuLi9vcGVyYXRpb25zL2Zyb21KU09OXCI7XG5cbmNsYXNzIFVwZGF0ZVJlc3BvbnNlIHtcbiAgY29uc3RydWN0b3Ioc2Vzc2lvbkV4cGlyZWQsIHBlbmRpbmdPcGVyYXRpb25zKSB7XG4gIFx0dGhpcy5zZXNzaW9uRXhwaXJlZCA9IHNlc3Npb25FeHBpcmVkO1xuICAgIHRoaXMucGVuZGluZ09wZXJhdGlvbnMgPSBwZW5kaW5nT3BlcmF0aW9ucztcbiAgfVxuXG4gIGdldFNlc3Npb25FeHBpcmVkKCkge1xuICBcdHJldHVybiB0aGlzLnNlc3Npb25FeHBpcmVkO1xuXHR9XG5cbiAgZ2V0UGVuZGluZ09wZXJhdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMucGVuZGluZ09wZXJhdGlvbnM7XG4gIH1cblxuICB0b0pTT04oKSB7XG4gICAgY29uc3QgcGVuZGluZ09wZXJhdGlvbnNKU09OID0gb3BlcmF0aW9uc1RvSlNPTih0aGlzLnBlbmRpbmdPcGVyYXRpb25zKSxcbiAgICAgICAgICBwZW5kaW5nT3BlcmF0aW9ucyA9IHBlbmRpbmdPcGVyYXRpb25zSlNPTiwgIC8vL1xuICAgICAgICAgIGpzb24gPSB7XG4gICAgXHRcdFx0XHRcInNlc3Npb25FeHBpcmVkXCI6IHRoaXMuc2Vzc2lvbkV4cGlyZWQsXG4gICAgICAgICAgICBcInBlbmRpbmdPcGVyYXRpb25zXCI6IHBlbmRpbmdPcGVyYXRpb25zXG4gICAgICAgICAgfTtcblxuICAgIHJldHVybiBqc29uO1xuICB9XG5cbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcbiAgICBjb25zdCBzZXNzaW9uRXhwaXJlZEpTT04gPSBqc29uW1wic2Vzc2lvbkV4cGlyZWRcIl0sXG5cdFx0XHRcdFx0cGVuZGluZ09wZXJhdGlvbnNKU09OID0ganNvbltcInBlbmRpbmdPcGVyYXRpb25zXCJdLFxuXHRcdFx0XHRcdHNlc3Npb25FeHBpcmVkID0gc2Vzc2lvbkV4cGlyZWRKU09OLFx0Ly8vXG5cdFx0XHRcdFx0cGVuZGluZ09wZXJhdGlvbnMgPSBvcGVyYXRpb25zRnJvbUpTT04ocGVuZGluZ09wZXJhdGlvbnNKU09OKSxcbiAgICAgICAgICB1cGRhdGVSZXNwb25zZSA9IG5ldyBVcGRhdGVSZXNwb25zZShzZXNzaW9uRXhwaXJlZCwgcGVuZGluZ09wZXJhdGlvbnMpO1xuXG4gICAgcmV0dXJuIHVwZGF0ZVJlc3BvbnNlO1xuICB9XG5cbiAgc3RhdGljIGZyb21TZXNzaW9uRXhwaXJlZEFuZFBlbmRpbmdPcGVyYXRpb25zKHNlc3Npb25FeHBpcmVkLCBwZW5kaW5nT3BlcmF0aW9ucykge1xuICAgIGNvbnN0IHVwZGF0ZVJlc3BvbnNlID0gbmV3IFVwZGF0ZVJlc3BvbnNlKHNlc3Npb25FeHBpcmVkLCBwZW5kaW5nT3BlcmF0aW9ucyk7XG5cbiAgICByZXR1cm4gdXBkYXRlUmVzcG9uc2U7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBVcGRhdGVSZXNwb25zZTtcbiJdfQ==