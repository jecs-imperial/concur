'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var types = require('../types');

var emptyType = types.emptyType;

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
      var transformedSelection = selection.clone();

      return transformedSelection;
    }
  }, {
    key: 'shift',
    value: function shift(operation) {
      var offset = 0,
          shiftedOperation = operation.shifted(offset);

      return shiftedOperation;
    }
  }], [{
    key: 'fromNothing',
    value: function fromNothing() {
      var type = emptyType,
          ///
      emptyOperation = new EmptyOperation(type);

      return emptyOperation;
    }
  }, {
    key: 'fromJSON',
    value: function fromJSON(json) {
      var type = json["type"],
          emptyOperation = new EmptyOperation(type);

      return emptyOperation;
    }
  }]);

  return EmptyOperation;
}();

module.exports = EmptyOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9vcGVyYXRpb24vZW1wdHkuanMiXSwibmFtZXMiOlsidHlwZXMiLCJyZXF1aXJlIiwiZW1wdHlUeXBlIiwiRW1wdHlPcGVyYXRpb24iLCJ0eXBlIiwiZnJvbU5vdGhpbmciLCJqc29uIiwib3BlcmF0aW9uIiwidGF1IiwicmhvIiwiY2xvbmUiLCJjb250ZW50Iiwic2VsZWN0aW9uIiwidHJhbnNmb3JtZWRTZWxlY3Rpb24iLCJvZmZzZXQiLCJzaGlmdGVkT3BlcmF0aW9uIiwic2hpZnRlZCIsImVtcHR5T3BlcmF0aW9uIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBLElBQU1BLFFBQVFDLFFBQVEsVUFBUixDQUFkOztJQUVRQyxTLEdBQWNGLEssQ0FBZEUsUzs7SUFFRkMsYztBQUNKLDBCQUFZQyxJQUFaLEVBQWtCO0FBQUE7O0FBQ2hCLFNBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUdEOzs7OzRCQUVPO0FBQ04sYUFBT0QsZUFBZUUsV0FBZixFQUFQO0FBQ0Q7Ozs2QkFFUTtBQUNQLFVBQU1DLE9BQU87QUFDTCxnQkFBUSxLQUFLRjtBQURSLE9BQWI7O0FBTUEsYUFBT0UsSUFBUDtBQUNEOzs7dUNBRWtCQyxTLEVBQVc7QUFDNUIsYUFBUSxVQUFTQyxHQUFULEVBQWNDLEdBQWQsRUFBbUI7O0FBRXpCLGVBQU8sQ0FBQ0QsSUFBSUUsS0FBSixFQUFELENBQVA7QUFFRCxPQUpNLENBSUpILFNBSkksRUFJTyxJQUpQLENBQVA7QUFLRDs7O3FDQUVnQkksTyxFQUFTO0FBQ3hCLGFBQU9BLE9BQVA7QUFDRDs7O3VDQUVrQkMsUyxFQUFXO0FBQzVCLFVBQU1DLHVCQUF1QkQsVUFBVUYsS0FBVixFQUE3Qjs7QUFFQSxhQUFPRyxvQkFBUDtBQUNEOzs7MEJBSUtOLFMsRUFBVztBQUNoQixVQUFNTyxTQUFTLENBQWY7QUFBQSxVQUNPQyxtQkFBbUJSLFVBQVVTLE9BQVYsQ0FBa0JGLE1BQWxCLENBRDFCOztBQUdBLGFBQU9DLGdCQUFQO0FBQ0E7OztrQ0FNb0I7QUFDbkIsVUFBTVgsT0FBT0YsU0FBYjtBQUFBLFVBQXdCO0FBQ2hCZSx1QkFBaUIsSUFBSWQsY0FBSixDQUFtQkMsSUFBbkIsQ0FEekI7O0FBR0EsYUFBT2EsY0FBUDtBQUNEOzs7NkJBRWVYLEksRUFBTTtBQUNwQixVQUFNRixPQUFPRSxLQUFLLE1BQUwsQ0FBYjtBQUFBLFVBQ01XLGlCQUFpQixJQUFJZCxjQUFKLENBQW1CQyxJQUFuQixDQUR2Qjs7QUFHQSxhQUFPYSxjQUFQO0FBQ0Q7Ozs7OztBQUdIQyxPQUFPQyxPQUFQLEdBQWlCaEIsY0FBakIiLCJmaWxlIjoiZW1wdHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCB0eXBlcyA9IHJlcXVpcmUoJy4uL3R5cGVzJyk7XHJcblxyXG5jb25zdCB7IGVtcHR5VHlwZSB9ID0gdHlwZXM7XHJcblxyXG5jbGFzcyBFbXB0eU9wZXJhdGlvbiB7XHJcbiAgY29uc3RydWN0b3IodHlwZSkge1xyXG4gICAgdGhpcy50eXBlID0gdHlwZTtcclxuXHJcblxyXG4gIH1cclxuXHJcbiAgY2xvbmUoKSB7XHJcbiAgICByZXR1cm4gRW1wdHlPcGVyYXRpb24uZnJvbU5vdGhpbmcoKTtcclxuICB9XHJcblxyXG4gIHRvSlNPTigpIHtcclxuICAgIGNvbnN0IGpzb24gPSB7XHJcbiAgICAgICAgICAgIFwidHlwZVwiOiB0aGlzLnR5cGVcclxuICAgICAgICAgIH07XHJcblxyXG5cclxuICAgIFxyXG4gICAgcmV0dXJuIGpzb247XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1PcGVyYXRpb24ob3BlcmF0aW9uKSB7XHJcbiAgICByZXR1cm4gKGZ1bmN0aW9uKHRhdSwgcmhvKSB7XHJcblxyXG4gICAgICByZXR1cm4gW3RhdS5jbG9uZSgpXTtcclxuXHJcbiAgICB9KShvcGVyYXRpb24sIHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtQ29udGVudChjb250ZW50KSB7XHJcbiAgICByZXR1cm4gY29udGVudDtcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybVNlbGVjdGlvbihzZWxlY3Rpb24pIHtcclxuICAgIGNvbnN0IHRyYW5zZm9ybWVkU2VsZWN0aW9uID0gc2VsZWN0aW9uLmNsb25lKCk7XHJcblxyXG4gICAgcmV0dXJuIHRyYW5zZm9ybWVkU2VsZWN0aW9uO1xyXG4gIH1cclxuXHJcblxyXG5cclxuICBzaGlmdChvcGVyYXRpb24pIHtcclxuICBcdGNvbnN0IG9mZnNldCA9IDAsXHJcbiAgICAgICAgICBzaGlmdGVkT3BlcmF0aW9uID0gb3BlcmF0aW9uLnNoaWZ0ZWQob2Zmc2V0KTtcclxuXHJcbiAgXHRyZXR1cm4gc2hpZnRlZE9wZXJhdGlvbjtcclxuICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuICBzdGF0aWMgZnJvbU5vdGhpbmcoKSB7XHJcbiAgICBjb25zdCB0eXBlID0gZW1wdHlUeXBlLCAvLy9cclxuICAgICAgICAgICAgZW1wdHlPcGVyYXRpb24gPSBuZXcgRW1wdHlPcGVyYXRpb24odHlwZSk7XHJcblxyXG4gICAgcmV0dXJuIGVtcHR5T3BlcmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcclxuICAgIGNvbnN0IHR5cGUgPSBqc29uW1widHlwZVwiXSxcclxuICAgICAgICAgIGVtcHR5T3BlcmF0aW9uID0gbmV3IEVtcHR5T3BlcmF0aW9uKHR5cGUpO1xyXG5cclxuICAgIHJldHVybiBlbXB0eU9wZXJhdGlvbjtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRW1wdHlPcGVyYXRpb247XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIl19