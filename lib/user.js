"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _transformOperations = require("./operations/transform");

var identifier = 0;

var User = /*#__PURE__*/function () {
  function User(identifier, pendingOperations) {
    _classCallCheck(this, User);

    this.identifier = identifier;
    this.pendingOperations = pendingOperations;
  }

  _createClass(User, [{
    key: "getIdentifier",
    value: function getIdentifier() {
      return this.identifier;
    }
  }, {
    key: "getPendingOperations",
    value: function getPendingOperations() {
      return this.pendingOperations;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.pendingOperations = [];
    }
  }, {
    key: "update",
    value: function update(transformedOperations) {
      this.pendingOperations = this.pendingOperations.concat(transformedOperations);
    }
  }, {
    key: "transformOperations",
    value: function transformOperations(operations) {
      var transformedOperations = _transformOperations(operations, this.pendingOperations);

      return transformedOperations;
    }
  }, {
    key: "transformedPendingOperations",
    value: function transformedPendingOperations(operations) {
      var transformedPendingOperations = _transformOperations(this.pendingOperations, operations);

      return transformedPendingOperations;
    }
  }], [{
    key: "fromNothing",
    value: function fromNothing() {
      var pendingOperations = [],
          user = new User(identifier++, pendingOperations);
      return user;
    }
  }]);

  return User;
}();

module.exports = User;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsidHJhbnNmb3JtT3BlcmF0aW9ucyIsInJlcXVpcmUiLCJpZGVudGlmaWVyIiwiVXNlciIsInBlbmRpbmdPcGVyYXRpb25zIiwidHJhbnNmb3JtZWRPcGVyYXRpb25zIiwiY29uY2F0Iiwib3BlcmF0aW9ucyIsInRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMiLCJ1c2VyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBRUEsSUFBTUEsb0JBQW1CLEdBQUdDLE9BQU8sQ0FBQyx3QkFBRCxDQUFuQzs7QUFFQSxJQUFJQyxVQUFVLEdBQUcsQ0FBakI7O0lBRU1DLEk7QUFDSixnQkFBWUQsVUFBWixFQUF3QkUsaUJBQXhCLEVBQTJDO0FBQUE7O0FBQ3pDLFNBQUtGLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0EsU0FBS0UsaUJBQUwsR0FBeUJBLGlCQUF6QjtBQUNEOzs7O29DQUVlO0FBQ2QsYUFBTyxLQUFLRixVQUFaO0FBQ0Q7OzsyQ0FFc0I7QUFDckIsYUFBTyxLQUFLRSxpQkFBWjtBQUNEOzs7NEJBRU87QUFDTixXQUFLQSxpQkFBTCxHQUF5QixFQUF6QjtBQUNEOzs7MkJBRU1DLHFCLEVBQXVCO0FBQzVCLFdBQUtELGlCQUFMLEdBQXlCLEtBQUtBLGlCQUFMLENBQXVCRSxNQUF2QixDQUE4QkQscUJBQTlCLENBQXpCO0FBQ0Q7Ozt3Q0FFbUJFLFUsRUFBWTtBQUM5QixVQUFNRixxQkFBcUIsR0FBR0wsb0JBQW1CLENBQUNPLFVBQUQsRUFBYSxLQUFLSCxpQkFBbEIsQ0FBakQ7O0FBRUEsYUFBT0MscUJBQVA7QUFDRDs7O2lEQUU0QkUsVSxFQUFZO0FBQ3ZDLFVBQU1DLDRCQUE0QixHQUFHUixvQkFBbUIsQ0FBQyxLQUFLSSxpQkFBTixFQUF5QkcsVUFBekIsQ0FBeEQ7O0FBRUEsYUFBT0MsNEJBQVA7QUFDRDs7O2tDQUVvQjtBQUNuQixVQUFNSixpQkFBaUIsR0FBRyxFQUExQjtBQUFBLFVBQ01LLElBQUksR0FBRyxJQUFJTixJQUFKLENBQVNELFVBQVUsRUFBbkIsRUFBdUJFLGlCQUF2QixDQURiO0FBR0EsYUFBT0ssSUFBUDtBQUNEOzs7Ozs7QUFHSEMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCUixJQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5cclxuY29uc3QgdHJhbnNmb3JtT3BlcmF0aW9ucyA9IHJlcXVpcmUoXCIuL29wZXJhdGlvbnMvdHJhbnNmb3JtXCIpO1xyXG5cclxubGV0IGlkZW50aWZpZXIgPSAwO1xyXG5cclxuY2xhc3MgVXNlciB7XHJcbiAgY29uc3RydWN0b3IoaWRlbnRpZmllciwgcGVuZGluZ09wZXJhdGlvbnMpIHtcclxuICAgIHRoaXMuaWRlbnRpZmllciA9IGlkZW50aWZpZXI7XHJcbiAgICB0aGlzLnBlbmRpbmdPcGVyYXRpb25zID0gcGVuZGluZ09wZXJhdGlvbnM7XHJcbiAgfVxyXG5cclxuICBnZXRJZGVudGlmaWVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaWRlbnRpZmllcjtcclxuICB9XHJcblxyXG4gIGdldFBlbmRpbmdPcGVyYXRpb25zKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucGVuZGluZ09wZXJhdGlvbnM7XHJcbiAgfVxyXG5cclxuICByZXNldCgpIHtcclxuICAgIHRoaXMucGVuZGluZ09wZXJhdGlvbnMgPSBbXTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSh0cmFuc2Zvcm1lZE9wZXJhdGlvbnMpIHtcclxuICAgIHRoaXMucGVuZGluZ09wZXJhdGlvbnMgPSB0aGlzLnBlbmRpbmdPcGVyYXRpb25zLmNvbmNhdCh0cmFuc2Zvcm1lZE9wZXJhdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtT3BlcmF0aW9ucyhvcGVyYXRpb25zKSB7XHJcbiAgICBjb25zdCB0cmFuc2Zvcm1lZE9wZXJhdGlvbnMgPSB0cmFuc2Zvcm1PcGVyYXRpb25zKG9wZXJhdGlvbnMsIHRoaXMucGVuZGluZ09wZXJhdGlvbnMpO1xyXG5cclxuICAgIHJldHVybiB0cmFuc2Zvcm1lZE9wZXJhdGlvbnM7XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zKG9wZXJhdGlvbnMpIHtcclxuICAgIGNvbnN0IHRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMgPSB0cmFuc2Zvcm1PcGVyYXRpb25zKHRoaXMucGVuZGluZ09wZXJhdGlvbnMsIG9wZXJhdGlvbnMpO1xyXG5cclxuICAgIHJldHVybiB0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21Ob3RoaW5nKCkge1xyXG4gICAgY29uc3QgcGVuZGluZ09wZXJhdGlvbnMgPSBbXSxcclxuICAgICAgICAgIHVzZXIgPSBuZXcgVXNlcihpZGVudGlmaWVyKyssIHBlbmRpbmdPcGVyYXRpb25zKTtcclxuXHJcbiAgICByZXR1cm4gdXNlcjtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVXNlcjtcclxuIl19