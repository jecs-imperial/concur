"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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

exports["default"] = UpdateResponse;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVwZGF0ZS5qcyJdLCJuYW1lcyI6WyJVcGRhdGVSZXNwb25zZSIsInNlc3Npb25FeHBpcmVkIiwicGVuZGluZ09wZXJhdGlvbnMiLCJwZW5kaW5nT3BlcmF0aW9uc0pTT04iLCJqc29uIiwic2Vzc2lvbkV4cGlyZWRKU09OIiwidXBkYXRlUmVzcG9uc2UiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLGM7QUFDbkIsMEJBQVlDLGNBQVosRUFBNEJDLGlCQUE1QixFQUErQztBQUFBOztBQUM5QyxTQUFLRCxjQUFMLEdBQXNCQSxjQUF0QjtBQUNDLFNBQUtDLGlCQUFMLEdBQXlCQSxpQkFBekI7QUFDRDs7Ozt3Q0FFbUI7QUFDbkIsYUFBTyxLQUFLRCxjQUFaO0FBQ0Q7OzsyQ0FFdUI7QUFDckIsYUFBTyxLQUFLQyxpQkFBWjtBQUNEOzs7NkJBRVE7QUFDUCxVQUFNQyxxQkFBcUIsR0FBRyx3QkFBaUIsS0FBS0QsaUJBQXRCLENBQTlCO0FBQUEsVUFDTUEsaUJBQWlCLEdBQUdDLHFCQUQxQjtBQUFBLFVBQ2tEO0FBQzVDQyxNQUFBQSxJQUFJLEdBQUc7QUFDVCwwQkFBa0IsS0FBS0gsY0FEZDtBQUVMLDZCQUFxQkM7QUFGaEIsT0FGYjtBQU9BLGFBQU9FLElBQVA7QUFDRDs7OzZCQUVlQSxJLEVBQU07QUFDcEIsVUFBTUMsa0JBQWtCLEdBQUdELElBQUksQ0FBQyxnQkFBRCxDQUEvQjtBQUFBLFVBQ0NELHFCQUFxQixHQUFHQyxJQUFJLENBQUMsbUJBQUQsQ0FEN0I7QUFBQSxVQUVDSCxjQUFjLEdBQUdJLGtCQUZsQjtBQUFBLFVBRXNDO0FBQ3JDSCxNQUFBQSxpQkFBaUIsR0FBRywwQkFBbUJDLHFCQUFuQixDQUhyQjtBQUFBLFVBSU1HLGNBQWMsR0FBRyxJQUFJTixjQUFKLENBQW1CQyxjQUFuQixFQUFtQ0MsaUJBQW5DLENBSnZCO0FBTUEsYUFBT0ksY0FBUDtBQUNEOzs7MkRBRTZDTCxjLEVBQWdCQyxpQixFQUFtQjtBQUMvRSxVQUFNSSxjQUFjLEdBQUcsSUFBSU4sY0FBSixDQUFtQkMsY0FBbkIsRUFBbUNDLGlCQUFuQyxDQUF2QjtBQUVBLGFBQU9JLGNBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgb3BlcmF0aW9uc1RvSlNPTiBmcm9tIFwiLi4vb3BlcmF0aW9ucy90b0pTT05cIjtcbmltcG9ydCBvcGVyYXRpb25zRnJvbUpTT04gZnJvbSBcIi4uL29wZXJhdGlvbnMvZnJvbUpTT05cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXBkYXRlUmVzcG9uc2Uge1xuICBjb25zdHJ1Y3RvcihzZXNzaW9uRXhwaXJlZCwgcGVuZGluZ09wZXJhdGlvbnMpIHtcbiAgXHR0aGlzLnNlc3Npb25FeHBpcmVkID0gc2Vzc2lvbkV4cGlyZWQ7XG4gICAgdGhpcy5wZW5kaW5nT3BlcmF0aW9ucyA9IHBlbmRpbmdPcGVyYXRpb25zO1xuICB9XG5cbiAgZ2V0U2Vzc2lvbkV4cGlyZWQoKSB7XG4gIFx0cmV0dXJuIHRoaXMuc2Vzc2lvbkV4cGlyZWQ7XG5cdH1cblxuICBnZXRQZW5kaW5nT3BlcmF0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5wZW5kaW5nT3BlcmF0aW9ucztcbiAgfVxuXG4gIHRvSlNPTigpIHtcbiAgICBjb25zdCBwZW5kaW5nT3BlcmF0aW9uc0pTT04gPSBvcGVyYXRpb25zVG9KU09OKHRoaXMucGVuZGluZ09wZXJhdGlvbnMpLFxuICAgICAgICAgIHBlbmRpbmdPcGVyYXRpb25zID0gcGVuZGluZ09wZXJhdGlvbnNKU09OLCAgLy8vXG4gICAgICAgICAganNvbiA9IHtcbiAgICBcdFx0XHRcdFwic2Vzc2lvbkV4cGlyZWRcIjogdGhpcy5zZXNzaW9uRXhwaXJlZCxcbiAgICAgICAgICAgIFwicGVuZGluZ09wZXJhdGlvbnNcIjogcGVuZGluZ09wZXJhdGlvbnNcbiAgICAgICAgICB9O1xuXG4gICAgcmV0dXJuIGpzb247XG4gIH1cblxuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xuICAgIGNvbnN0IHNlc3Npb25FeHBpcmVkSlNPTiA9IGpzb25bXCJzZXNzaW9uRXhwaXJlZFwiXSxcblx0XHRcdFx0XHRwZW5kaW5nT3BlcmF0aW9uc0pTT04gPSBqc29uW1wicGVuZGluZ09wZXJhdGlvbnNcIl0sXG5cdFx0XHRcdFx0c2Vzc2lvbkV4cGlyZWQgPSBzZXNzaW9uRXhwaXJlZEpTT04sXHQvLy9cblx0XHRcdFx0XHRwZW5kaW5nT3BlcmF0aW9ucyA9IG9wZXJhdGlvbnNGcm9tSlNPTihwZW5kaW5nT3BlcmF0aW9uc0pTT04pLFxuICAgICAgICAgIHVwZGF0ZVJlc3BvbnNlID0gbmV3IFVwZGF0ZVJlc3BvbnNlKHNlc3Npb25FeHBpcmVkLCBwZW5kaW5nT3BlcmF0aW9ucyk7XG5cbiAgICByZXR1cm4gdXBkYXRlUmVzcG9uc2U7XG4gIH1cblxuICBzdGF0aWMgZnJvbVNlc3Npb25FeHBpcmVkQW5kUGVuZGluZ09wZXJhdGlvbnMoc2Vzc2lvbkV4cGlyZWQsIHBlbmRpbmdPcGVyYXRpb25zKSB7XG4gICAgY29uc3QgdXBkYXRlUmVzcG9uc2UgPSBuZXcgVXBkYXRlUmVzcG9uc2Uoc2Vzc2lvbkV4cGlyZWQsIHBlbmRpbmdPcGVyYXRpb25zKTtcblxuICAgIHJldHVybiB1cGRhdGVSZXNwb25zZTtcbiAgfVxufVxuIl19