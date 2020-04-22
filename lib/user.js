"use strict";

var _transform = _interopRequireDefault(require("./operations/transform"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
      var transformedOperations = (0, _transform["default"])(operations, this.pendingOperations);
      return transformedOperations;
    }
  }, {
    key: "transformedPendingOperations",
    value: function transformedPendingOperations(operations) {
      var transformedPendingOperations = (0, _transform["default"])(this.pendingOperations, operations);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiaWRlbnRpZmllciIsIlVzZXIiLCJwZW5kaW5nT3BlcmF0aW9ucyIsInRyYW5zZm9ybWVkT3BlcmF0aW9ucyIsImNvbmNhdCIsIm9wZXJhdGlvbnMiLCJ0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zIiwidXNlciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOzs7Ozs7Ozs7O0FBRUEsSUFBSUEsVUFBVSxHQUFHLENBQWpCOztJQUVNQyxJO0FBQ0osZ0JBQVlELFVBQVosRUFBd0JFLGlCQUF4QixFQUEyQztBQUFBOztBQUN6QyxTQUFLRixVQUFMLEdBQWtCQSxVQUFsQjtBQUNBLFNBQUtFLGlCQUFMLEdBQXlCQSxpQkFBekI7QUFDRDs7OztvQ0FFZTtBQUNkLGFBQU8sS0FBS0YsVUFBWjtBQUNEOzs7MkNBRXNCO0FBQ3JCLGFBQU8sS0FBS0UsaUJBQVo7QUFDRDs7OzRCQUVPO0FBQ04sV0FBS0EsaUJBQUwsR0FBeUIsRUFBekI7QUFDRDs7OzJCQUVNQyxxQixFQUF1QjtBQUM1QixXQUFLRCxpQkFBTCxHQUF5QixLQUFLQSxpQkFBTCxDQUF1QkUsTUFBdkIsQ0FBOEJELHFCQUE5QixDQUF6QjtBQUNEOzs7d0NBRW1CRSxVLEVBQVk7QUFDOUIsVUFBTUYscUJBQXFCLEdBQUcsMkJBQW9CRSxVQUFwQixFQUFnQyxLQUFLSCxpQkFBckMsQ0FBOUI7QUFFQSxhQUFPQyxxQkFBUDtBQUNEOzs7aURBRTRCRSxVLEVBQVk7QUFDdkMsVUFBTUMsNEJBQTRCLEdBQUcsMkJBQW9CLEtBQUtKLGlCQUF6QixFQUE0Q0csVUFBNUMsQ0FBckM7QUFFQSxhQUFPQyw0QkFBUDtBQUNEOzs7a0NBRW9CO0FBQ25CLFVBQU1KLGlCQUFpQixHQUFHLEVBQTFCO0FBQUEsVUFDTUssSUFBSSxHQUFHLElBQUlOLElBQUosQ0FBU0QsVUFBVSxFQUFuQixFQUF1QkUsaUJBQXZCLENBRGI7QUFHQSxhQUFPSyxJQUFQO0FBQ0Q7Ozs7OztBQUdIQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJSLElBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5pbXBvcnQgdHJhbnNmb3JtT3BlcmF0aW9ucyBmcm9tIFwiLi9vcGVyYXRpb25zL3RyYW5zZm9ybVwiO1xyXG5cclxubGV0IGlkZW50aWZpZXIgPSAwO1xyXG5cclxuY2xhc3MgVXNlciB7XHJcbiAgY29uc3RydWN0b3IoaWRlbnRpZmllciwgcGVuZGluZ09wZXJhdGlvbnMpIHtcclxuICAgIHRoaXMuaWRlbnRpZmllciA9IGlkZW50aWZpZXI7XHJcbiAgICB0aGlzLnBlbmRpbmdPcGVyYXRpb25zID0gcGVuZGluZ09wZXJhdGlvbnM7XHJcbiAgfVxyXG5cclxuICBnZXRJZGVudGlmaWVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaWRlbnRpZmllcjtcclxuICB9XHJcblxyXG4gIGdldFBlbmRpbmdPcGVyYXRpb25zKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucGVuZGluZ09wZXJhdGlvbnM7XHJcbiAgfVxyXG5cclxuICByZXNldCgpIHtcclxuICAgIHRoaXMucGVuZGluZ09wZXJhdGlvbnMgPSBbXTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSh0cmFuc2Zvcm1lZE9wZXJhdGlvbnMpIHtcclxuICAgIHRoaXMucGVuZGluZ09wZXJhdGlvbnMgPSB0aGlzLnBlbmRpbmdPcGVyYXRpb25zLmNvbmNhdCh0cmFuc2Zvcm1lZE9wZXJhdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtT3BlcmF0aW9ucyhvcGVyYXRpb25zKSB7XHJcbiAgICBjb25zdCB0cmFuc2Zvcm1lZE9wZXJhdGlvbnMgPSB0cmFuc2Zvcm1PcGVyYXRpb25zKG9wZXJhdGlvbnMsIHRoaXMucGVuZGluZ09wZXJhdGlvbnMpO1xyXG5cclxuICAgIHJldHVybiB0cmFuc2Zvcm1lZE9wZXJhdGlvbnM7XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zKG9wZXJhdGlvbnMpIHtcclxuICAgIGNvbnN0IHRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMgPSB0cmFuc2Zvcm1PcGVyYXRpb25zKHRoaXMucGVuZGluZ09wZXJhdGlvbnMsIG9wZXJhdGlvbnMpO1xyXG5cclxuICAgIHJldHVybiB0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21Ob3RoaW5nKCkge1xyXG4gICAgY29uc3QgcGVuZGluZ09wZXJhdGlvbnMgPSBbXSxcclxuICAgICAgICAgIHVzZXIgPSBuZXcgVXNlcihpZGVudGlmaWVyKyssIHBlbmRpbmdPcGVyYXRpb25zKTtcclxuXHJcbiAgICByZXR1cm4gdXNlcjtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVXNlcjtcclxuIl19