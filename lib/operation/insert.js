'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DeleteOperation = require('./delete');

var InsertOperation = function () {
  function InsertOperation(string, position) {
    _classCallCheck(this, InsertOperation);

    this.type = InsertOperation.type;
    this.string = string;
    this.position = position;
  }

  _createClass(InsertOperation, [{
    key: 'clone',
    value: function clone() {
      return new InsertOperation(this.string, this.position);
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var json = {
        "type": this.type,
        "string": this.string,
        "position": this.position
      };

      return json;
    }
  }, {
    key: 'transformOperation',
    value: function transformOperation(operation) {
      switch (operation.type) {
        case 'insert':
          return function (tau, rho) {
            if (tau.position < rho.position) {
              return [tau.clone()];
            }
            if (tau.position === rho.position) {
              if (tau.string === rho.string) {
                return [tau.clone()];
              }
              if (tau.string !== rho.string) {
                if (rho.string.localeCompare(tau.string) < 0) {
                  return [rho.shift(tau)];
                } else {
                  return [tau.clone()];
                }
              }
            }
            if (tau.position > rho.position) {
              return [rho.shift(tau)];
            }
          }(operation, this);

        case 'delete':
          return function (tau, rho) {
            if (tau.position + tau.length <= rho.position) {
              return [tau.clone()];
            }
            if (tau.position < rho.position) {
              return [rho.left(tau), rho.left(tau).shift(rho.shift(rho.right(tau)))];
            }
            if (tau.position >= rho.position) {
              return [rho.shift(tau)];
            }
          }(operation, this);

        case 'empty':
          return function (tau, rho) {
            return [tau.clone()];
          }(operation, this);
      }
    }
  }, {
    key: 'transformContent',
    value: function transformContent(content) {
      return content.substring(0, this.position) + this.string + content.substring(this.position);
    }
  }, {
    key: 'shifted',
    value: function shifted(offset) {
      var string = this.string,
          position = this.position + offset;

      return new InsertOperation(string, position);
    }
  }, {
    key: 'shift',
    value: function shift(operation) {
      var length = this.string.length,
          offset = length; ///

      return operation.shifted(offset);
    }
  }, {
    key: 'left',
    value: function left(deleteOperation) {
      var position = deleteOperation.position,
          length = this.position - position;

      return new DeleteOperation(length, position);
    }
  }, {
    key: 'right',
    value: function right(deleteOperation) {
      var length = deleteOperation.length,
          position = deleteOperation.position;

      length = length - this.position + position;
      position = this.position;

      return new DeleteOperation(length, position);
    }
  }], [{
    key: 'fromJSON',
    value: function fromJSON(json) {
      var string = json["string"],
          position = json["position"];

      return new InsertOperation(string, position);
    }
  }]);

  return InsertOperation;
}();

Object.assign(InsertOperation, {
  type: 'insert'
});

module.exports = InsertOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9vcGVyYXRpb24vaW5zZXJ0LmpzIl0sIm5hbWVzIjpbIkRlbGV0ZU9wZXJhdGlvbiIsInJlcXVpcmUiLCJJbnNlcnRPcGVyYXRpb24iLCJzdHJpbmciLCJwb3NpdGlvbiIsInR5cGUiLCJqc29uIiwib3BlcmF0aW9uIiwidGF1IiwicmhvIiwiY2xvbmUiLCJsb2NhbGVDb21wYXJlIiwic2hpZnQiLCJsZW5ndGgiLCJsZWZ0IiwicmlnaHQiLCJjb250ZW50Iiwic3Vic3RyaW5nIiwib2Zmc2V0Iiwic2hpZnRlZCIsImRlbGV0ZU9wZXJhdGlvbiIsIk9iamVjdCIsImFzc2lnbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFFQSxJQUFNQSxrQkFBa0JDLFFBQVEsVUFBUixDQUF4Qjs7SUFFTUMsZTtBQUNKLDJCQUFZQyxNQUFaLEVBQW9CQyxRQUFwQixFQUE4QjtBQUFBOztBQUM3QixTQUFLQyxJQUFMLEdBQVlILGdCQUFnQkcsSUFBNUI7QUFDQyxTQUFLRixNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNEOzs7OzRCQUVPO0FBQ04sYUFBTyxJQUFJRixlQUFKLENBQW9CLEtBQUtDLE1BQXpCLEVBQWlDLEtBQUtDLFFBQXRDLENBQVA7QUFDRDs7OzZCQUVRO0FBQ1AsVUFBTUUsT0FBTztBQUNOLGdCQUFRLEtBQUtELElBRFA7QUFFTCxrQkFBVSxLQUFLRixNQUZWO0FBR0wsb0JBQVksS0FBS0M7QUFIWixPQUFiOztBQU1BLGFBQU9FLElBQVA7QUFDRDs7O3VDQUVrQkMsUyxFQUFXO0FBQzVCLGNBQVFBLFVBQVVGLElBQWxCO0FBQ0UsYUFBSyxRQUFMO0FBQ0UsaUJBQVEsVUFBU0csR0FBVCxFQUFjQyxHQUFkLEVBQW1CO0FBQ3pCLGdCQUFJRCxJQUFJSixRQUFKLEdBQWVLLElBQUlMLFFBQXZCLEVBQWlDO0FBQy9CLHFCQUFRLENBQUNJLElBQUlFLEtBQUosRUFBRCxD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VUFDSVQsV0FBV2dCLGdCQUFnQmhCLFFBRC9COztBQUdBUyxlQUFTQSxTQUFTLEtBQUtULFFBQWQsR0FBeUJBLFFBQWxDO0FBQ0FBLGlCQUFXLEtBQUtBLFFBQWhCOztBQUVBLGFBQU8sSUFBSUosZUFBSixDQUFvQmEsTUFBcEIsRUFBNEJULFFBQTVCLENBQVA7QUFDRDs7OzZCQUVlRSxJLEVBQU07QUFDcEIsVUFBTUgsU0FBU0csS0FBSyxRQUFMLENBQWY7QUFBQSxVQUNNRixXQUFXRSxLQUFLLFVBQUwsQ0FEakI7O0FBR0EsYUFBTyxJQUFJSixlQUFKLENBQW9CQyxNQUFwQixFQUE0QkMsUUFBNUIsQ0FBUDtBQUNEOzs7Ozs7QUFHSGlCLE9BQU9DLE1BQVAsQ0FBY3BCLGVBQWQsRUFBK0I7QUFDN0JHLFFBQU07QUFEdUIsQ0FBL0I7O0FBSUFrQixPQUFPQyxPQUFQLEdBQWlCdEIsZUFBakIiLCJmaWxlIjoiaW5zZXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgRGVsZXRlT3BlcmF0aW9uID0gcmVxdWlyZSgnLi9kZWxldGUnKTtcclxuXHJcbmNsYXNzIEluc2VydE9wZXJhdGlvbiB7XHJcbiAgY29uc3RydWN0b3Ioc3RyaW5nLCBwb3NpdGlvbikge1xyXG5cdCAgdGhpcy50eXBlID0gSW5zZXJ0T3BlcmF0aW9uLnR5cGU7XHJcbiAgICB0aGlzLnN0cmluZyA9IHN0cmluZztcclxuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICB9XHJcblxyXG4gIGNsb25lKCkge1xyXG4gICAgcmV0dXJuIG5ldyBJbnNlcnRPcGVyYXRpb24odGhpcy5zdHJpbmcsIHRoaXMucG9zaXRpb24pO1xyXG4gIH1cclxuXHJcbiAgdG9KU09OKCkge1xyXG4gICAgY29uc3QganNvbiA9IHtcclxuXHQgICAgICAgICAgXCJ0eXBlXCI6IHRoaXMudHlwZSxcclxuICAgICAgICAgICAgXCJzdHJpbmdcIjogdGhpcy5zdHJpbmcsXHJcbiAgICAgICAgICAgIFwicG9zaXRpb25cIjogdGhpcy5wb3NpdGlvblxyXG4gICAgICAgICAgfTtcclxuICAgIFxyXG4gICAgcmV0dXJuIGpzb247XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1PcGVyYXRpb24ob3BlcmF0aW9uKSB7XHJcbiAgICBzd2l0Y2ggKG9wZXJhdGlvbi50eXBlKSB7XHJcbiAgICAgIGNhc2UgJ2luc2VydCc6XHJcbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbih0YXUsIHJobykge1xyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA8IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gKFt0YXUuY2xvbmUoKV0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA9PT0gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICh0YXUuc3RyaW5nID09PSByaG8uc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIChbdGF1LmNsb25lKCldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGF1LnN0cmluZyAhPT0gcmhvLnN0cmluZykge1xyXG4gICAgICAgICAgICAgIGlmIChyaG8uc3RyaW5nLmxvY2FsZUNvbXBhcmUodGF1LnN0cmluZykgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFtyaG8uc2hpZnQodGF1KV0pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoW3RhdS5jbG9uZSgpXSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uID4gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoW3Joby5zaGlmdCh0YXUpXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkob3BlcmF0aW9uLCB0aGlzKTtcclxuXHJcbiAgICAgIGNhc2UgJ2RlbGV0ZSc6XHJcbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbih0YXUsIHJobykge1xyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiArIHRhdS5sZW5ndGggPD0gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoW3RhdS5jbG9uZSgpXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uIDwgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoW3Joby5sZWZ0KHRhdSksIHJoby5sZWZ0KHRhdSkuc2hpZnQocmhvLnNoaWZ0KHJoby5yaWdodCh0YXUpKSldKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPj0gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoW3Joby5zaGlmdCh0YXUpXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkob3BlcmF0aW9uLCB0aGlzKTtcclxuXHJcbiAgICAgIGNhc2UgJ2VtcHR5JzpcclxuICAgICAgICByZXR1cm4gKGZ1bmN0aW9uKHRhdSwgcmhvKSB7XHJcbiAgICAgICAgICByZXR1cm4gW3RhdS5jbG9uZSgpXTtcclxuICAgICAgICB9KShvcGVyYXRpb24sIHRoaXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtQ29udGVudChjb250ZW50KSB7XHJcbiAgICByZXR1cm4gY29udGVudC5zdWJzdHJpbmcoMCwgdGhpcy5wb3NpdGlvbikgKyB0aGlzLnN0cmluZyArIGNvbnRlbnQuc3Vic3RyaW5nKHRoaXMucG9zaXRpb24pO1xyXG4gIH1cclxuXHJcbiAgc2hpZnRlZChvZmZzZXQpIHtcclxuICAgIGNvbnN0IHN0cmluZyA9IHRoaXMuc3RyaW5nLFxyXG4gICAgICAgICAgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uICsgb2Zmc2V0O1xyXG5cclxuICAgIHJldHVybiBuZXcgSW5zZXJ0T3BlcmF0aW9uKHN0cmluZywgcG9zaXRpb24pO1xyXG4gIH1cclxuXHJcbiAgc2hpZnQob3BlcmF0aW9uKSB7XHJcbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLnN0cmluZy5sZW5ndGgsXHJcblx0XHRcdFx0ICBvZmZzZXQgPSBsZW5ndGg7ICAvLy9cclxuXHJcbiAgICByZXR1cm4gb3BlcmF0aW9uLnNoaWZ0ZWQob2Zmc2V0KTtcclxuICB9XHJcblxyXG4gIGxlZnQoZGVsZXRlT3BlcmF0aW9uKSB7XHJcbiAgICBjb25zdCBwb3NpdGlvbiA9IGRlbGV0ZU9wZXJhdGlvbi5wb3NpdGlvbixcclxuICAgICAgICAgIGxlbmd0aCA9IHRoaXMucG9zaXRpb24gLSBwb3NpdGlvbjtcclxuXHJcbiAgICByZXR1cm4gbmV3IERlbGV0ZU9wZXJhdGlvbihsZW5ndGgsIHBvc2l0aW9uKTtcclxuICB9XHJcblxyXG4gIHJpZ2h0KGRlbGV0ZU9wZXJhdGlvbikge1xyXG4gICAgbGV0IGxlbmd0aCA9IGRlbGV0ZU9wZXJhdGlvbi5sZW5ndGgsXHJcbiAgICAgICAgcG9zaXRpb24gPSBkZWxldGVPcGVyYXRpb24ucG9zaXRpb247XHJcblxyXG4gICAgbGVuZ3RoID0gbGVuZ3RoIC0gdGhpcy5wb3NpdGlvbiArIHBvc2l0aW9uO1xyXG4gICAgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uO1xyXG5cclxuICAgIHJldHVybiBuZXcgRGVsZXRlT3BlcmF0aW9uKGxlbmd0aCwgcG9zaXRpb24pO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcclxuICAgIGNvbnN0IHN0cmluZyA9IGpzb25bXCJzdHJpbmdcIl0sXHJcbiAgICAgICAgICBwb3NpdGlvbiA9IGpzb25bXCJwb3NpdGlvblwiXTtcclxuXHJcbiAgICByZXR1cm4gbmV3IEluc2VydE9wZXJhdGlvbihzdHJpbmcsIHBvc2l0aW9uKTtcclxuICB9XHJcbn1cclxuXHJcbk9iamVjdC5hc3NpZ24oSW5zZXJ0T3BlcmF0aW9uLCB7XHJcbiAgdHlwZTogJ2luc2VydCdcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEluc2VydE9wZXJhdGlvbjtcclxuIl19