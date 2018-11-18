'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _transformOperations = require('./operations/transform');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi91c2VyLmpzIl0sIm5hbWVzIjpbInRyYW5zZm9ybU9wZXJhdGlvbnMiLCJyZXF1aXJlIiwiaWRlbnRpZmllciIsIlVzZXIiLCJwZW5kaW5nT3BlcmF0aW9ucyIsInRyYW5zZm9ybWVkT3BlcmF0aW9ucyIsImNvbmNhdCIsIm9wZXJhdGlvbnMiLCJ0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zIiwidXNlciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFFQSxJQUFNQSx1QkFBc0JDLFFBQVEsd0JBQVIsQ0FBNUI7O0FBRUEsSUFBSUMsYUFBYSxDQUFqQjs7SUFFTUMsSTtBQUNKLGdCQUFZRCxVQUFaLEVBQXdCRSxpQkFBeEIsRUFBMkM7QUFBQTs7QUFDekMsU0FBS0YsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSxTQUFLRSxpQkFBTCxHQUF5QkEsaUJBQXpCO0FBQ0Q7Ozs7b0NBRWU7QUFDZCxhQUFPLEtBQUtGLFVBQVo7QUFDRDs7OzJDQUVzQjtBQUNyQixhQUFPLEtBQUtFLGlCQUFaO0FBQ0Q7Ozs0QkFFTztBQUNOLFdBQUtBLGlCQUFMLEdBQXlCLEVBQXpCO0FBQ0Q7OzsyQkFFTUMscUIsRUFBdUI7QUFDNUIsV0FBS0QsaUJBQUwsR0FBeUIsS0FBS0EsaUJBQUwsQ0FBdUJFLE1BQXZCLENBQThCRCxxQkFBOUIsQ0FBekI7QUFDRDs7O3dDQUVtQkUsVSxFQUFZO0FBQzlCLFVBQU1GLHdCQUF3QkwscUJBQW9CTyxVQUFwQixFQUFnQyxLQUFLSCxpQkFBckMsQ0FBOUI7O0FBRUEsYUFBT0MscUJBQVA7QUFDRDs7O2lEQUU0QkUsVSxFQUFZO0FBQ3ZDLFVBQU1DLCtCQUErQlIscUJBQW9CLEtBQUtJLGlCQUF6QixFQUE0Q0csVUFBNUMsQ0FBckM7O0FBRUEsYUFBT0MsNEJBQVA7QUFDRDs7O2tDQUVvQjtBQUNuQixVQUFNSixvQkFBb0IsRUFBMUI7QUFBQSxVQUNNSyxPQUFPLElBQUlOLElBQUosQ0FBU0QsWUFBVCxFQUF1QkUsaUJBQXZCLENBRGI7O0FBR0EsYUFBT0ssSUFBUDtBQUNEOzs7Ozs7QUFHSEMsT0FBT0MsT0FBUCxHQUFpQlIsSUFBakIiLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IHRyYW5zZm9ybU9wZXJhdGlvbnMgPSByZXF1aXJlKCcuL29wZXJhdGlvbnMvdHJhbnNmb3JtJyk7XHJcblxyXG5sZXQgaWRlbnRpZmllciA9IDA7XHJcblxyXG5jbGFzcyBVc2VyIHtcclxuICBjb25zdHJ1Y3RvcihpZGVudGlmaWVyLCBwZW5kaW5nT3BlcmF0aW9ucykge1xyXG4gICAgdGhpcy5pZGVudGlmaWVyID0gaWRlbnRpZmllcjtcclxuICAgIHRoaXMucGVuZGluZ09wZXJhdGlvbnMgPSBwZW5kaW5nT3BlcmF0aW9ucztcclxuICB9XHJcblxyXG4gIGdldElkZW50aWZpZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5pZGVudGlmaWVyO1xyXG4gIH1cclxuXHJcbiAgZ2V0UGVuZGluZ09wZXJhdGlvbnMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wZW5kaW5nT3BlcmF0aW9ucztcclxuICB9XHJcblxyXG4gIHJlc2V0KCkge1xyXG4gICAgdGhpcy5wZW5kaW5nT3BlcmF0aW9ucyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKHRyYW5zZm9ybWVkT3BlcmF0aW9ucykge1xyXG4gICAgdGhpcy5wZW5kaW5nT3BlcmF0aW9ucyA9IHRoaXMucGVuZGluZ09wZXJhdGlvbnMuY29uY2F0KHRyYW5zZm9ybWVkT3BlcmF0aW9ucyk7XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1PcGVyYXRpb25zKG9wZXJhdGlvbnMpIHtcclxuICAgIGNvbnN0IHRyYW5zZm9ybWVkT3BlcmF0aW9ucyA9IHRyYW5zZm9ybU9wZXJhdGlvbnMob3BlcmF0aW9ucywgdGhpcy5wZW5kaW5nT3BlcmF0aW9ucyk7XHJcblxyXG4gICAgcmV0dXJuIHRyYW5zZm9ybWVkT3BlcmF0aW9ucztcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMob3BlcmF0aW9ucykge1xyXG4gICAgY29uc3QgdHJhbnNmb3JtZWRQZW5kaW5nT3BlcmF0aW9ucyA9IHRyYW5zZm9ybU9wZXJhdGlvbnModGhpcy5wZW5kaW5nT3BlcmF0aW9ucywgb3BlcmF0aW9ucyk7XHJcblxyXG4gICAgcmV0dXJuIHRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnM7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbU5vdGhpbmcoKSB7XHJcbiAgICBjb25zdCBwZW5kaW5nT3BlcmF0aW9ucyA9IFtdLFxyXG4gICAgICAgICAgdXNlciA9IG5ldyBVc2VyKGlkZW50aWZpZXIrKywgcGVuZGluZ09wZXJhdGlvbnMpO1xyXG5cclxuICAgIHJldHVybiB1c2VyO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBVc2VyO1xyXG4iXX0=