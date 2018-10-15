'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var type = 'empty';

var EmptyOperation = function () {
  function EmptyOperation(type) {
    _classCallCheck(this, EmptyOperation);

    this.type = type;
  }

  _createClass(EmptyOperation, [{
    key: 'clone',
    value: function clone() {
      return EmptyOperation.fromNothing();
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var json = {
        "type": this.type
      };

      return json;
    }
  }, {
    key: 'transformOperation',
    value: function transformOperation(operation) {
      return function (tau, rho) {
        return [tau.clone()];
      }(operation, this);
    }
  }, {
    key: 'transformContent',
    value: function transformContent(content) {
      return content;
    }
  }, {
    key: 'transformSelection',
    value: function transformSelection(selection) {
      return selection.clone();
    }
  }, {
    key: 'shift',
    value: function shift(operation) {
      var offset = 0;

      return operation.shifted(offset);
    }
  }], [{
    key: 'fromNothing',
    value: function fromNothing() {
      return new EmptyOperation(type);
    }
  }, {
    key: 'fromJSON',
    value: function fromJSON(json) {
      var type = json["type"];

      return new EmptyOperation(type);
    }
  }]);

  return EmptyOperation;
}();

Object.assign(EmptyOperation, {
  type: type
});

module.exports = EmptyOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9vcGVyYXRpb24vZW1wdHkuanMiXSwibmFtZXMiOlsidHlwZSIsIkVtcHR5T3BlcmF0aW9uIiwiZnJvbU5vdGhpbmciLCJqc29uIiwib3BlcmF0aW9uIiwidGF1IiwicmhvIiwiY2xvbmUiLCJjb250ZW50Iiwic2VsZWN0aW9uIiwib2Zmc2V0Iiwic2hpZnRlZCIsIk9iamVjdCIsImFzc2lnbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFJQSxJQUFNQSxPQUFPLE9BQWI7O0lBRU1DLGM7QUFDSiwwQkFBWUQsSUFBWixFQUFrQjtBQUFBOztBQUNoQixTQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFHRDs7Ozs0QkFFTztBQUNOLGFBQU9DLGVBQWVDLFdBQWYsRUFBUDtBQUNEOzs7NkJBRVE7QUFDUCxVQUFNQyxPQUFPO0FBQ0wsZ0JBQVEsS0FBS0g7QUFEUixPQUFiOztBQU1BLGFBQU9HLElBQVA7QUFDRDs7O3VDQUVrQkMsUyxFQUFXO0FBQzVCLGFBQVEsVUFBU0MsR0FBVCxFQUFjQyxHQUFkLEVBQW1CO0FBQ3pCLGVBQU8sQ0FBQ0QsSUFBSUUsS0FBSixFQUFELENBQVA7QUFDRCxPQUZNLENBRUpILFNBRkksRUFFTyxJQUZQLENBQVA7QUFHRDs7O3FDQUVnQkksTyxFQUFTO0FBQ3hCLGFBQU9BLE9BQVA7QUFDRDs7O3VDQUVrQkMsUyxFQUFXO0FBQzVCLGFBQU9BLFVBQVVGLEtBQVYsRUFBUDtBQUNEOzs7MEJBSUtILFMsRUFBVztBQUNoQixVQUFNTSxTQUFTLENBQWY7O0FBRUMsYUFBUU4sVUFBVU8sT0FBVixDQUFrQkQsTUFBbEIsQ0FBUjtBQUNEOzs7a0NBTW9CO0FBQ25CLGFBQU8sSUFBSVQsY0FBSixDQUFtQkQsSUFBbkIsQ0FBUDtBQUNEOzs7NkJBRWVHLEksRUFBTTtBQUNwQixVQUFNSCxPQUFPRyxLQUFLLE1BQUwsQ0FBYjs7QUFFQSxhQUFPLElBQUlGLGNBQUosQ0FBbUJELElBQW5CLENBQVA7QUFDRDs7Ozs7O0FBR0hZLE9BQU9DLE1BQVAsQ0FBY1osY0FBZCxFQUE4QjtBQUM1QkQ7QUFENEIsQ0FBOUI7O0FBSUFjLE9BQU9DLE9BQVAsR0FBaUJkLGNBQWpCIiwiZmlsZSI6ImVtcHR5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcblxyXG5jb25zdCB0eXBlID0gJ2VtcHR5JztcclxuXHJcbmNsYXNzIEVtcHR5T3BlcmF0aW9uIHtcclxuICBjb25zdHJ1Y3Rvcih0eXBlKSB7XHJcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG5cclxuXHJcbiAgfVxyXG5cclxuICBjbG9uZSgpIHtcclxuICAgIHJldHVybiBFbXB0eU9wZXJhdGlvbi5mcm9tTm90aGluZygpO1xyXG4gIH1cclxuXHJcbiAgdG9KU09OKCkge1xyXG4gICAgY29uc3QganNvbiA9IHtcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IHRoaXMudHlwZVxyXG4gICAgICAgICAgfTtcclxuXHJcblxyXG4gICAgXHJcbiAgICByZXR1cm4ganNvbjtcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybU9wZXJhdGlvbihvcGVyYXRpb24pIHtcclxuICAgIHJldHVybiAoZnVuY3Rpb24odGF1LCByaG8pIHtcclxuICAgICAgcmV0dXJuIFt0YXUuY2xvbmUoKV07XHJcbiAgICB9KShvcGVyYXRpb24sIHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtQ29udGVudChjb250ZW50KSB7XHJcbiAgICByZXR1cm4gY29udGVudDtcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybVNlbGVjdGlvbihzZWxlY3Rpb24pIHtcclxuICAgIHJldHVybiBzZWxlY3Rpb24uY2xvbmUoKTtcclxuICB9XHJcblxyXG5cclxuXHJcbiAgc2hpZnQob3BlcmF0aW9uKSB7XHJcbiAgXHRjb25zdCBvZmZzZXQgPSAwO1xyXG5cclxuICAgIHJldHVybiAob3BlcmF0aW9uLnNoaWZ0ZWQob2Zmc2V0KSk7XHJcbiAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgc3RhdGljIGZyb21Ob3RoaW5nKCkge1xyXG4gICAgcmV0dXJuIG5ldyBFbXB0eU9wZXJhdGlvbih0eXBlKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XHJcbiAgICBjb25zdCB0eXBlID0ganNvbltcInR5cGVcIl07XHJcblxyXG4gICAgcmV0dXJuIG5ldyBFbXB0eU9wZXJhdGlvbih0eXBlKTtcclxuICB9XHJcbn1cclxuXHJcbk9iamVjdC5hc3NpZ24oRW1wdHlPcGVyYXRpb24sIHtcclxuICB0eXBlXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBFbXB0eU9wZXJhdGlvbjtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=