"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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

exports["default"] = User;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiaWRlbnRpZmllciIsIlVzZXIiLCJwZW5kaW5nT3BlcmF0aW9ucyIsInRyYW5zZm9ybWVkT3BlcmF0aW9ucyIsImNvbmNhdCIsIm9wZXJhdGlvbnMiLCJ0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zIiwidXNlciJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7Ozs7Ozs7OztBQUVBLElBQUlBLFVBQVUsR0FBRyxDQUFqQjs7SUFFcUJDLEk7QUFDbkIsZ0JBQVlELFVBQVosRUFBd0JFLGlCQUF4QixFQUEyQztBQUFBOztBQUN6QyxTQUFLRixVQUFMLEdBQWtCQSxVQUFsQjtBQUNBLFNBQUtFLGlCQUFMLEdBQXlCQSxpQkFBekI7QUFDRDs7OztvQ0FFZTtBQUNkLGFBQU8sS0FBS0YsVUFBWjtBQUNEOzs7MkNBRXNCO0FBQ3JCLGFBQU8sS0FBS0UsaUJBQVo7QUFDRDs7OzRCQUVPO0FBQ04sV0FBS0EsaUJBQUwsR0FBeUIsRUFBekI7QUFDRDs7OzJCQUVNQyxxQixFQUF1QjtBQUM1QixXQUFLRCxpQkFBTCxHQUF5QixLQUFLQSxpQkFBTCxDQUF1QkUsTUFBdkIsQ0FBOEJELHFCQUE5QixDQUF6QjtBQUNEOzs7d0NBRW1CRSxVLEVBQVk7QUFDOUIsVUFBTUYscUJBQXFCLEdBQUcsMkJBQW9CRSxVQUFwQixFQUFnQyxLQUFLSCxpQkFBckMsQ0FBOUI7QUFFQSxhQUFPQyxxQkFBUDtBQUNEOzs7aURBRTRCRSxVLEVBQVk7QUFDdkMsVUFBTUMsNEJBQTRCLEdBQUcsMkJBQW9CLEtBQUtKLGlCQUF6QixFQUE0Q0csVUFBNUMsQ0FBckM7QUFFQSxhQUFPQyw0QkFBUDtBQUNEOzs7a0NBRW9CO0FBQ25CLFVBQU1KLGlCQUFpQixHQUFHLEVBQTFCO0FBQUEsVUFDTUssSUFBSSxHQUFHLElBQUlOLElBQUosQ0FBU0QsVUFBVSxFQUFuQixFQUF1QkUsaUJBQXZCLENBRGI7QUFHQSxhQUFPSyxJQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmltcG9ydCB0cmFuc2Zvcm1PcGVyYXRpb25zIGZyb20gXCIuL29wZXJhdGlvbnMvdHJhbnNmb3JtXCI7XHJcblxyXG5sZXQgaWRlbnRpZmllciA9IDA7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyIHtcclxuICBjb25zdHJ1Y3RvcihpZGVudGlmaWVyLCBwZW5kaW5nT3BlcmF0aW9ucykge1xyXG4gICAgdGhpcy5pZGVudGlmaWVyID0gaWRlbnRpZmllcjtcclxuICAgIHRoaXMucGVuZGluZ09wZXJhdGlvbnMgPSBwZW5kaW5nT3BlcmF0aW9ucztcclxuICB9XHJcblxyXG4gIGdldElkZW50aWZpZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5pZGVudGlmaWVyO1xyXG4gIH1cclxuXHJcbiAgZ2V0UGVuZGluZ09wZXJhdGlvbnMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wZW5kaW5nT3BlcmF0aW9ucztcclxuICB9XHJcblxyXG4gIHJlc2V0KCkge1xyXG4gICAgdGhpcy5wZW5kaW5nT3BlcmF0aW9ucyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKHRyYW5zZm9ybWVkT3BlcmF0aW9ucykge1xyXG4gICAgdGhpcy5wZW5kaW5nT3BlcmF0aW9ucyA9IHRoaXMucGVuZGluZ09wZXJhdGlvbnMuY29uY2F0KHRyYW5zZm9ybWVkT3BlcmF0aW9ucyk7XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1PcGVyYXRpb25zKG9wZXJhdGlvbnMpIHtcclxuICAgIGNvbnN0IHRyYW5zZm9ybWVkT3BlcmF0aW9ucyA9IHRyYW5zZm9ybU9wZXJhdGlvbnMob3BlcmF0aW9ucywgdGhpcy5wZW5kaW5nT3BlcmF0aW9ucyk7XHJcblxyXG4gICAgcmV0dXJuIHRyYW5zZm9ybWVkT3BlcmF0aW9ucztcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMob3BlcmF0aW9ucykge1xyXG4gICAgY29uc3QgdHJhbnNmb3JtZWRQZW5kaW5nT3BlcmF0aW9ucyA9IHRyYW5zZm9ybU9wZXJhdGlvbnModGhpcy5wZW5kaW5nT3BlcmF0aW9ucywgb3BlcmF0aW9ucyk7XHJcblxyXG4gICAgcmV0dXJuIHRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnM7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbU5vdGhpbmcoKSB7XHJcbiAgICBjb25zdCBwZW5kaW5nT3BlcmF0aW9ucyA9IFtdLFxyXG4gICAgICAgICAgdXNlciA9IG5ldyBVc2VyKGlkZW50aWZpZXIrKywgcGVuZGluZ09wZXJhdGlvbnMpO1xyXG5cclxuICAgIHJldHVybiB1c2VyO1xyXG4gIH1cclxufVxyXG4iXX0=