'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _transformOperations = require('../operations/transform');

var identifier = 0;

var User = function () {
  function User(identifier, pendingOperations) {
    _classCallCheck(this, User);

    this.identifier = identifier;
    this.pendingOperations = pendingOperations;
  }

  _createClass(User, [{
    key: 'getIdentifier',
    value: function getIdentifier() {
      return this.identifier;
    }
  }, {
    key: 'getPendingOperations',
    value: function getPendingOperations() {
      return this.pendingOperations;
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.pendingOperations = [];
    }
  }, {
    key: 'update',
    value: function update(transformedOperations) {
      this.pendingOperations = this.pendingOperations.concat(transformedOperations);
    }
  }, {
    key: 'transformOperations',
    value: function transformOperations(operations) {
      var transformedOperations = _transformOperations(operations, this.pendingOperations);

      return transformedOperations;
    }
  }, {
    key: 'transformedPendingOperations',
    value: function transformedPendingOperations(operations) {
      var transformedPendingOperations = _transformOperations(this.pendingOperations, operations);

      return transformedPendingOperations;
    }
  }], [{
    key: 'fromNothing',
    value: function fromNothing() {
      var pendingOperations = [],
          user = new User(identifier++, pendingOperations);

      return user;
    }
  }]);

  return User;
}();

module.exports = User;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leGFtcGxlL3VzZXIuanMiXSwibmFtZXMiOlsidHJhbnNmb3JtT3BlcmF0aW9ucyIsInJlcXVpcmUiLCJpZGVudGlmaWVyIiwiVXNlciIsInBlbmRpbmdPcGVyYXRpb25zIiwidHJhbnNmb3JtZWRPcGVyYXRpb25zIiwiY29uY2F0Iiwib3BlcmF0aW9ucyIsInRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMiLCJ1c2VyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBLElBQU1BLHVCQUFzQkMsUUFBUSx5QkFBUixDQUE1Qjs7QUFFQSxJQUFJQyxhQUFhLENBQWpCOztJQUVNQyxJO0FBQ0osZ0JBQVlELFVBQVosRUFBd0JFLGlCQUF4QixFQUEyQztBQUFBOztBQUN6QyxTQUFLRixVQUFMLEdBQWtCQSxVQUFsQjtBQUNBLFNBQUtFLGlCQUFMLEdBQXlCQSxpQkFBekI7QUFDRDs7OztvQ0FFZTtBQUNkLGFBQU8sS0FBS0YsVUFBWjtBQUNEOzs7MkNBRXNCO0FBQ3JCLGFBQU8sS0FBS0UsaUJBQVo7QUFDRDs7OzRCQUVPO0FBQ04sV0FBS0EsaUJBQUwsR0FBeUIsRUFBekI7QUFDRDs7OzJCQUVNQyxxQixFQUF1QjtBQUM1QixXQUFLRCxpQkFBTCxHQUF5QixLQUFLQSxpQkFBTCxDQUF1QkUsTUFBdkIsQ0FBOEJELHFCQUE5QixDQUF6QjtBQUNEOzs7d0NBRW1CRSxVLEVBQVk7QUFDOUIsVUFBTUYsd0JBQXdCTCxxQkFBb0JPLFVBQXBCLEVBQWdDLEtBQUtILGlCQUFyQyxDQUE5Qjs7QUFFQSxhQUFPQyxxQkFBUDtBQUNEOzs7aURBRTRCRSxVLEVBQVk7QUFDdkMsVUFBTUMsK0JBQStCUixxQkFBb0IsS0FBS0ksaUJBQXpCLEVBQTRDRyxVQUE1QyxDQUFyQzs7QUFFQSxhQUFPQyw0QkFBUDtBQUNEOzs7a0NBRW9CO0FBQ25CLFVBQU1KLG9CQUFvQixFQUExQjtBQUFBLFVBQ01LLE9BQU8sSUFBSU4sSUFBSixDQUFTRCxZQUFULEVBQXVCRSxpQkFBdkIsQ0FEYjs7QUFHQSxhQUFPSyxJQUFQO0FBQ0Q7Ozs7OztBQUdIQyxPQUFPQyxPQUFQLEdBQWlCUixJQUFqQiIsImZpbGUiOiJ1c2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgdHJhbnNmb3JtT3BlcmF0aW9ucyA9IHJlcXVpcmUoJy4uL29wZXJhdGlvbnMvdHJhbnNmb3JtJyk7XHJcblxyXG5sZXQgaWRlbnRpZmllciA9IDA7XHJcblxyXG5jbGFzcyBVc2VyIHtcclxuICBjb25zdHJ1Y3RvcihpZGVudGlmaWVyLCBwZW5kaW5nT3BlcmF0aW9ucykge1xyXG4gICAgdGhpcy5pZGVudGlmaWVyID0gaWRlbnRpZmllcjtcclxuICAgIHRoaXMucGVuZGluZ09wZXJhdGlvbnMgPSBwZW5kaW5nT3BlcmF0aW9ucztcclxuICB9XHJcblxyXG4gIGdldElkZW50aWZpZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5pZGVudGlmaWVyO1xyXG4gIH1cclxuXHJcbiAgZ2V0UGVuZGluZ09wZXJhdGlvbnMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wZW5kaW5nT3BlcmF0aW9ucztcclxuICB9XHJcblxyXG4gIHJlc2V0KCkge1xyXG4gICAgdGhpcy5wZW5kaW5nT3BlcmF0aW9ucyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKHRyYW5zZm9ybWVkT3BlcmF0aW9ucykge1xyXG4gICAgdGhpcy5wZW5kaW5nT3BlcmF0aW9ucyA9IHRoaXMucGVuZGluZ09wZXJhdGlvbnMuY29uY2F0KHRyYW5zZm9ybWVkT3BlcmF0aW9ucyk7XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1PcGVyYXRpb25zKG9wZXJhdGlvbnMpIHtcclxuICAgIGNvbnN0IHRyYW5zZm9ybWVkT3BlcmF0aW9ucyA9IHRyYW5zZm9ybU9wZXJhdGlvbnMob3BlcmF0aW9ucywgdGhpcy5wZW5kaW5nT3BlcmF0aW9ucyk7XHJcblxyXG4gICAgcmV0dXJuIHRyYW5zZm9ybWVkT3BlcmF0aW9ucztcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMob3BlcmF0aW9ucykge1xyXG4gICAgY29uc3QgdHJhbnNmb3JtZWRQZW5kaW5nT3BlcmF0aW9ucyA9IHRyYW5zZm9ybU9wZXJhdGlvbnModGhpcy5wZW5kaW5nT3BlcmF0aW9ucywgb3BlcmF0aW9ucyk7XHJcblxyXG4gICAgcmV0dXJuIHRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnM7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbU5vdGhpbmcoKSB7XHJcbiAgICBjb25zdCBwZW5kaW5nT3BlcmF0aW9ucyA9IFtdLFxyXG4gICAgICAgICAgdXNlciA9IG5ldyBVc2VyKGlkZW50aWZpZXIrKywgcGVuZGluZ09wZXJhdGlvbnMpO1xyXG5cclxuICAgIHJldHVybiB1c2VyO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBVc2VyO1xyXG4iXX0=