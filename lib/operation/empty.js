'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EmptyOperation = function () {
  function EmptyOperation() {
    _classCallCheck(this, EmptyOperation);

    this.type = EmptyOperation.type;
  }

  _createClass(EmptyOperation, [{
    key: 'clone',
    value: function clone() {
      return new EmptyOperation();
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
    key: 'shift',
    value: function shift(operation) {
      var offset = 0;

      return operation.shifted(offset);
    }
  }], [{
    key: 'fromJSON',
    value: function fromJSON(json) {
      return new EmptyOperation();
    }
  }]);

  return EmptyOperation;
}();

Object.assign(EmptyOperation, {
  type: 'empty'
});

module.exports = EmptyOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9vcGVyYXRpb24vZW1wdHkuanMiXSwibmFtZXMiOlsiRW1wdHlPcGVyYXRpb24iLCJ0eXBlIiwianNvbiIsIm9wZXJhdGlvbiIsInRhdSIsInJobyIsImNsb25lIiwiY29udGVudCIsIm9mZnNldCIsInNoaWZ0ZWQiLCJPYmplY3QiLCJhc3NpZ24iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0lBSU1BLGM7QUFDSiw0QkFBYztBQUFBOztBQUNaLFNBQUtDLElBQUwsR0FBWUQsZUFBZUMsSUFBM0I7QUFDRDs7Ozs0QkFFTztBQUNOLGFBQU8sSUFBSUQsY0FBSixFQUFQO0FBQ0Q7Ozs2QkFFUTtBQUNQLFVBQU1FLE9BQU87QUFDTCxnQkFBUSxLQUFLRDtBQURSLE9BQWI7O0FBSUEsYUFBT0MsSUFBUDtBQUNEOzs7dUNBRWtCQyxTLEVBQVc7QUFDNUIsYUFBUSxVQUFTQyxHQUFULEVBQWNDLEdBQWQsRUFBbUI7QUFDekIsZUFBTyxDQUFDRCxJQUFJRSxLQUFKLEVBQUQsQ0FBUDtBQUNELE9BRk0sQ0FFSkgsU0FGSSxFQUVPLElBRlAsQ0FBUDtBQUdEOzs7cUNBRWdCSSxPLEVBQVM7QUFDeEIsYUFBT0EsT0FBUDtBQUNEOzs7MEJBRUtKLFMsRUFBVztBQUNoQixVQUFNSyxTQUFTLENBQWY7O0FBRUMsYUFBUUwsVUFBVU0sT0FBVixDQUFrQkQsTUFBbEIsQ0FBUjtBQUNEOzs7NkJBRWVOLEksRUFBTTtBQUNwQixhQUFPLElBQUlGLGNBQUosRUFBUDtBQUNEOzs7Ozs7QUFHSFUsT0FBT0MsTUFBUCxDQUFjWCxjQUFkLEVBQThCO0FBQzVCQyxRQUFNO0FBRHNCLENBQTlCOztBQUlBVyxPQUFPQyxPQUFQLEdBQWlCYixjQUFqQiIsImZpbGUiOiJlbXB0eS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcblxyXG5cclxuY2xhc3MgRW1wdHlPcGVyYXRpb24ge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy50eXBlID0gRW1wdHlPcGVyYXRpb24udHlwZTtcclxuICB9XHJcblxyXG4gIGNsb25lKCkge1xyXG4gICAgcmV0dXJuIG5ldyBFbXB0eU9wZXJhdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgdG9KU09OKCkge1xyXG4gICAgY29uc3QganNvbiA9IHtcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IHRoaXMudHlwZVxyXG4gICAgICAgICAgfTtcclxuICAgIFxyXG4gICAgcmV0dXJuIGpzb247XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1PcGVyYXRpb24ob3BlcmF0aW9uKSB7XHJcbiAgICByZXR1cm4gKGZ1bmN0aW9uKHRhdSwgcmhvKSB7XHJcbiAgICAgIHJldHVybiBbdGF1LmNsb25lKCldO1xyXG4gICAgfSkob3BlcmF0aW9uLCB0aGlzKTtcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybUNvbnRlbnQoY29udGVudCkge1xyXG4gICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgfVxyXG5cclxuICBzaGlmdChvcGVyYXRpb24pIHtcclxuICBcdGNvbnN0IG9mZnNldCA9IDA7XHJcblxyXG4gICAgcmV0dXJuIChvcGVyYXRpb24uc2hpZnRlZChvZmZzZXQpKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XHJcbiAgICByZXR1cm4gbmV3IEVtcHR5T3BlcmF0aW9uKCk7XHJcbiAgfVxyXG59XHJcblxyXG5PYmplY3QuYXNzaWduKEVtcHR5T3BlcmF0aW9uLCB7XHJcbiAgdHlwZTogJ2VtcHR5J1xyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRW1wdHlPcGVyYXRpb247XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIl19