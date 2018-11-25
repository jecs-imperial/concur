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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi91c2VyLmpzIl0sIm5hbWVzIjpbInRyYW5zZm9ybU9wZXJhdGlvbnMiLCJyZXF1aXJlIiwiaWRlbnRpZmllciIsIlVzZXIiLCJwZW5kaW5nT3BlcmF0aW9ucyIsInRyYW5zZm9ybWVkT3BlcmF0aW9ucyIsImNvbmNhdCIsIm9wZXJhdGlvbnMiLCJ0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zIiwidXNlciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFFQSxJQUFNQSx1QkFBc0JDLFFBQVEseUJBQVIsQ0FBNUI7O0FBRUEsSUFBSUMsYUFBYSxDQUFqQjs7SUFFTUMsSTtBQUNKLGdCQUFZRCxVQUFaLEVBQXdCRSxpQkFBeEIsRUFBMkM7QUFBQTs7QUFDekMsU0FBS0YsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSxTQUFLRSxpQkFBTCxHQUF5QkEsaUJBQXpCO0FBQ0Q7Ozs7b0NBRWU7QUFDZCxhQUFPLEtBQUtGLFVBQVo7QUFDRDs7OzJDQUVzQjtBQUNyQixhQUFPLEtBQUtFLGlCQUFaO0FBQ0Q7Ozs0QkFFTztBQUNOLFdBQUtBLGlCQUFMLEdBQXlCLEVBQXpCO0FBQ0Q7OzsyQkFFTUMscUIsRUFBdUI7QUFDNUIsV0FBS0QsaUJBQUwsR0FBeUIsS0FBS0EsaUJBQUwsQ0FBdUJFLE1BQXZCLENBQThCRCxxQkFBOUIsQ0FBekI7QUFDRDs7O3dDQUVtQkUsVSxFQUFZO0FBQzlCLFVBQU1GLHdCQUF3QkwscUJBQW9CTyxVQUFwQixFQUFnQyxLQUFLSCxpQkFBckMsQ0FBOUI7O0FBRUEsYUFBT0MscUJBQVA7QUFDRDs7O2lEQUU0QkUsVSxFQUFZO0FBQ3ZDLFVBQU1DLCtCQUErQlIscUJBQW9CLEtBQUtJLGlCQUF6QixFQUE0Q0csVUFBNUMsQ0FBckM7O0FBRUEsYUFBT0MsNEJBQVA7QUFDRDs7O2tDQUVvQjtBQUNuQixVQUFNSixvQkFBb0IsRUFBMUI7QUFBQSxVQUNNSyxPQUFPLElBQUlOLElBQUosQ0FBU0QsWUFBVCxFQUF1QkUsaUJBQXZCLENBRGI7O0FBR0EsYUFBT0ssSUFBUDtBQUNEOzs7Ozs7QUFHSEMsT0FBT0MsT0FBUCxHQUFpQlIsSUFBakIiLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IHRyYW5zZm9ybU9wZXJhdGlvbnMgPSByZXF1aXJlKCcuLi9vcGVyYXRpb25zL3RyYW5zZm9ybScpO1xyXG5cclxubGV0IGlkZW50aWZpZXIgPSAwO1xyXG5cclxuY2xhc3MgVXNlciB7XHJcbiAgY29uc3RydWN0b3IoaWRlbnRpZmllciwgcGVuZGluZ09wZXJhdGlvbnMpIHtcclxuICAgIHRoaXMuaWRlbnRpZmllciA9IGlkZW50aWZpZXI7XHJcbiAgICB0aGlzLnBlbmRpbmdPcGVyYXRpb25zID0gcGVuZGluZ09wZXJhdGlvbnM7XHJcbiAgfVxyXG5cclxuICBnZXRJZGVudGlmaWVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaWRlbnRpZmllcjtcclxuICB9XHJcblxyXG4gIGdldFBlbmRpbmdPcGVyYXRpb25zKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucGVuZGluZ09wZXJhdGlvbnM7XHJcbiAgfVxyXG5cclxuICByZXNldCgpIHtcclxuICAgIHRoaXMucGVuZGluZ09wZXJhdGlvbnMgPSBbXTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSh0cmFuc2Zvcm1lZE9wZXJhdGlvbnMpIHtcclxuICAgIHRoaXMucGVuZGluZ09wZXJhdGlvbnMgPSB0aGlzLnBlbmRpbmdPcGVyYXRpb25zLmNvbmNhdCh0cmFuc2Zvcm1lZE9wZXJhdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtT3BlcmF0aW9ucyhvcGVyYXRpb25zKSB7XHJcbiAgICBjb25zdCB0cmFuc2Zvcm1lZE9wZXJhdGlvbnMgPSB0cmFuc2Zvcm1PcGVyYXRpb25zKG9wZXJhdGlvbnMsIHRoaXMucGVuZGluZ09wZXJhdGlvbnMpO1xyXG5cclxuICAgIHJldHVybiB0cmFuc2Zvcm1lZE9wZXJhdGlvbnM7XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zKG9wZXJhdGlvbnMpIHtcclxuICAgIGNvbnN0IHRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMgPSB0cmFuc2Zvcm1PcGVyYXRpb25zKHRoaXMucGVuZGluZ09wZXJhdGlvbnMsIG9wZXJhdGlvbnMpO1xyXG5cclxuICAgIHJldHVybiB0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21Ob3RoaW5nKCkge1xyXG4gICAgY29uc3QgcGVuZGluZ09wZXJhdGlvbnMgPSBbXSxcclxuICAgICAgICAgIHVzZXIgPSBuZXcgVXNlcihpZGVudGlmaWVyKyssIHBlbmRpbmdPcGVyYXRpb25zKTtcclxuXHJcbiAgICByZXR1cm4gdXNlcjtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVXNlcjtcclxuIl19