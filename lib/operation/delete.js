'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EmptyOperation = require('./empty');

var DeleteOperation = function () {
  function DeleteOperation(length, position) {
    _classCallCheck(this, DeleteOperation);

    this.type = DeleteOperation.type;
    this.length = length;
    this.position = position;
  }

  _createClass(DeleteOperation, [{
    key: 'clone',
    value: function clone() {
      return new DeleteOperation(this.length, this.position);
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var json = {
        "type": this.type,
        "length": this.length,
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
            if (tau.position <= rho.position) {
              return [tau.clone()];
            }
            if (tau.position > rho.position) {
              if (tau.position < rho.length + rho.position) {
                return [tau.left(rho).shift(tau)];
              }
              if (tau.position >= rho.length + rho.position) {
                return [rho.shift(tau)];
              }
            }
          }(operation, this);

        case 'delete':
          return function (tau, rho) {
            if (tau.position < rho.position) {
              if (tau.length + tau.position <= rho.position) {
                return [tau.clone()];
              }
              if (tau.length + tau.position <= rho.length + rho.position) {
                return [rho.takenFrom(tau)];
              }
              if (tau.length + tau.position > rho.length + rho.position) {
                return [rho.split(tau)];
              }
            }
            if (tau.position === rho.position) {
              if (tau.length + tau.position <= rho.length + rho.position) {
                return [new EmptyOperation()];
              }
              if (tau.length + tau.position > rho.length + rho.position) {
                return [rho.shift(rho.takenFrom(tau))];
              }
            }
            if (tau.position >= rho.length + rho.position) {
              return [rho.shift(tau)];
            }
            if (tau.position > rho.position) {
              if (tau.length + tau.position <= rho.length + rho.position) {
                return [new EmptyOperation()];
              }
              if (tau.length + tau.position > rho.length + rho.position) {
                return [rho.shift(rho.takenFrom(tau))];
              }
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
      return content.substring(0, this.position) + content.substring(this.length + this.position);
    }
  }, {
    key: 'shifted',
    value: function shifted(offset) {
      var length = this.length,
          position = this.position + offset;

      return new DeleteOperation(length, position);
    }
  }, {
    key: 'shift',
    value: function shift(operation) {
      var offset = -this.length;

      return operation.shifted(offset);
    }
  }, {
    key: 'takenFrom',
    value: function takenFrom(deleteOperation) {
      var length = deleteOperation.length,
          position = deleteOperation.position;

      if (this.position > position && this.length + this.position >= length + position) {
        length = this.position - position;

        return new DeleteOperation(length, position);
      }

      if (this.position <= position && this.length + this.position < length + position) {
        length = length + position - this.position - this.length;
        position = this.length + this.position;

        return new DeleteOperation(length, position);
      }
    }
  }, {
    key: 'split',
    value: function split(deleteOperation) {
      var length = deleteOperation.length,
          position = deleteOperation.position;

      length = length - this.length;

      return new DeleteOperation(length, position);
    }
  }], [{
    key: 'fromJSON',
    value: function fromJSON(json) {
      var length = json["length"],
          position = json["position"];

      return new DeleteOperation(length, position);
    }
  }]);

  return DeleteOperation;
}();

Object.assign(DeleteOperation, {
  type: 'delete'
});

module.exports = DeleteOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9vcGVyYXRpb24vZGVsZXRlLmpzIl0sIm5hbWVzIjpbIkVtcHR5T3BlcmF0aW9uIiwicmVxdWlyZSIsIkRlbGV0ZU9wZXJhdGlvbiIsImxlbmd0aCIsInBvc2l0aW9uIiwidHlwZSIsImpzb24iLCJvcGVyYXRpb24iLCJ0YXUiLCJyaG8iLCJjbG9uZSIsImxlZnQiLCJzaGlmdCIsInRha2VuRnJvbSIsInNwbGl0IiwiY29udGVudCIsInN1YnN0cmluZyIsIm9mZnNldCIsInNoaWZ0ZWQiLCJkZWxldGVPcGVyYXRpb24iLCJPYmplY3QiLCJhc3NpZ24iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBRUEsSUFBTUEsaUJBQWlCQyxRQUFRLFNBQVIsQ0FBdkI7O0lBRU1DLGU7QUFDSiwyQkFBWUMsTUFBWixFQUFvQkMsUUFBcEIsRUFBOEI7QUFBQTs7QUFDN0IsU0FBS0MsSUFBTCxHQUFZSCxnQkFBZ0JHLElBQTVCO0FBQ0MsU0FBS0YsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDRDs7Ozs0QkFFTztBQUNOLGFBQU8sSUFBSUYsZUFBSixDQUFvQixLQUFLQyxNQUF6QixFQUFpQyxLQUFLQyxRQUF0QyxDQUFQO0FBQ0Q7Ozs2QkFFUTtBQUNQLFVBQU1FLE9BQU87QUFDTixnQkFBUSxLQUFLRCxJQURQO0FBRUwsa0JBQVUsS0FBS0YsTUFGVjtBQUdMLG9CQUFZLEtBQUtDO0FBSFosT0FBYjs7QUFNQSxhQUFPRSxJQUFQO0FBQ0Q7Ozt1Q0FFa0JDLFMsRUFBVztBQUM1QixjQUFRQSxVQUFVRixJQUFsQjtBQUNFLGFBQUssUUFBTDtBQUNFLGlCQUFRLFVBQVNHLEdBQVQsRUFBY0MsR0FBZCxFQUFtQjtBQUN6QixnQkFBSUQsSUFBSUosUUFBSixJQUFnQkssSUFBSUwsUUFBeEIsRUFBa0M7QUFDaEMscUJBQVEsQ0FBQ0ksSUFBSUUsS0FBSixFQUFELENBQVI7QUFDRDtBQUNE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QTRCQyxRQUE1QixDQUFQO0FBQ0Q7QUFDRjs7OzBCQUVLZSxlLEVBQWlCO0FBQ3JCLFVBQUloQixTQUFTZ0IsZ0JBQWdCaEIsTUFBN0I7QUFBQSxVQUNJQyxXQUFXZSxnQkFBZ0JmLFFBRC9COztBQUdBRCxlQUFTQSxTQUFTLEtBQUtBLE1BQXZCOztBQUVBLGFBQU8sSUFBSUQsZUFBSixDQUFvQkMsTUFBcEIsRUFBNEJDLFFBQTVCLENBQVA7QUFDRDs7OzZCQUVlRSxJLEVBQU07QUFDcEIsVUFBTUgsU0FBU0csS0FBSyxRQUFMLENBQWY7QUFBQSxVQUNNRixXQUFXRSxLQUFLLFVBQUwsQ0FEakI7O0FBR0EsYUFBTyxJQUFJSixlQUFKLENBQW9CQyxNQUFwQixFQUE0QkMsUUFBNUIsQ0FBUDtBQUNEOzs7Ozs7QUFHSGdCLE9BQU9DLE1BQVAsQ0FBY25CLGVBQWQsRUFBK0I7QUFDN0JHLFFBQU07QUFEdUIsQ0FBL0I7O0FBSUFpQixPQUFPQyxPQUFQLEdBQWlCckIsZUFBakIiLCJmaWxlIjoiZGVsZXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgRW1wdHlPcGVyYXRpb24gPSByZXF1aXJlKCcuL2VtcHR5Jyk7XHJcblxyXG5jbGFzcyBEZWxldGVPcGVyYXRpb24ge1xyXG4gIGNvbnN0cnVjdG9yKGxlbmd0aCwgcG9zaXRpb24pIHtcclxuXHQgIHRoaXMudHlwZSA9IERlbGV0ZU9wZXJhdGlvbi50eXBlO1xyXG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgfVxyXG5cclxuICBjbG9uZSgpIHtcclxuICAgIHJldHVybiBuZXcgRGVsZXRlT3BlcmF0aW9uKHRoaXMubGVuZ3RoLCB0aGlzLnBvc2l0aW9uKTtcclxuICB9XHJcblxyXG4gIHRvSlNPTigpIHtcclxuICAgIGNvbnN0IGpzb24gPSB7XHJcblx0ICAgICAgICAgIFwidHlwZVwiOiB0aGlzLnR5cGUsXHJcbiAgICAgICAgICAgIFwibGVuZ3RoXCI6IHRoaXMubGVuZ3RoLFxyXG4gICAgICAgICAgICBcInBvc2l0aW9uXCI6IHRoaXMucG9zaXRpb24sXHJcbiAgICAgICAgICB9O1xyXG4gICAgXHJcbiAgICByZXR1cm4ganNvbjtcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybU9wZXJhdGlvbihvcGVyYXRpb24pIHtcclxuICAgIHN3aXRjaCAob3BlcmF0aW9uLnR5cGUpIHtcclxuICAgICAgY2FzZSAnaW5zZXJ0JzpcclxuICAgICAgICByZXR1cm4gKGZ1bmN0aW9uKHRhdSwgcmhvKSB7XHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uIDw9IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gKFt0YXUuY2xvbmUoKV0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA+IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uIDwgcmhvLmxlbmd0aCArIHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgIHJldHVybiAoW3RhdS5sZWZ0KHJobykuc2hpZnQodGF1KV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPj0gcmhvLmxlbmd0aCArIHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgIHJldHVybiAoW3Joby5zaGlmdCh0YXUpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KShvcGVyYXRpb24sIHRoaXMpO1xyXG5cclxuICAgICAgY2FzZSAnZGVsZXRlJzpcclxuICAgICAgICByZXR1cm4gKGZ1bmN0aW9uKHRhdSwgcmhvKSB7XHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uIDwgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICh0YXUubGVuZ3RoICsgdGF1LnBvc2l0aW9uIDw9IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgIHJldHVybiAoW3RhdS5jbG9uZSgpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRhdS5sZW5ndGggKyB0YXUucG9zaXRpb24gPD0gcmhvLmxlbmd0aCArIHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgIHJldHVybiAoW3Joby50YWtlbkZyb20odGF1KV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0YXUubGVuZ3RoICsgdGF1LnBvc2l0aW9uID4gcmhvLmxlbmd0aCArIHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgIHJldHVybiAoW3Joby5zcGxpdCh0YXUpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPT09IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICBpZiAodGF1Lmxlbmd0aCArIHRhdS5wb3NpdGlvbiA8PSByaG8ubGVuZ3RoICsgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIChbbmV3IEVtcHR5T3BlcmF0aW9uKCldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGF1Lmxlbmd0aCArIHRhdS5wb3NpdGlvbiA+IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gKFtyaG8uc2hpZnQocmhvLnRha2VuRnJvbSh0YXUpKV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uID49IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIChbcmhvLnNoaWZ0KHRhdSldKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPiByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgaWYgKHRhdS5sZW5ndGggKyB0YXUucG9zaXRpb24gPD0gcmhvLmxlbmd0aCArIHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgIHJldHVybiAoW25ldyBFbXB0eU9wZXJhdGlvbigpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRhdS5sZW5ndGggKyB0YXUucG9zaXRpb24gPiByaG8ubGVuZ3RoICsgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIChbcmhvLnNoaWZ0KHJoby50YWtlbkZyb20odGF1KSldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pKG9wZXJhdGlvbiwgdGhpcyk7XHJcblxyXG4gICAgICBjYXNlICdlbXB0eSc6XHJcbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbih0YXUsIHJobykge1xyXG4gICAgICAgICAgcmV0dXJuIFt0YXUuY2xvbmUoKV07XHJcbiAgICAgICAgfSkob3BlcmF0aW9uLCB0aGlzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybUNvbnRlbnQoY29udGVudCkge1xyXG4gICAgcmV0dXJuIGNvbnRlbnQuc3Vic3RyaW5nKDAsIHRoaXMucG9zaXRpb24pICsgY29udGVudC5zdWJzdHJpbmcodGhpcy5sZW5ndGggKyB0aGlzLnBvc2l0aW9uKTtcclxuICB9XHJcblxyXG4gIHNoaWZ0ZWQob2Zmc2V0KSB7XHJcbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLmxlbmd0aCxcclxuICAgICAgICAgIHBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbiArIG9mZnNldDtcclxuXHJcbiAgICByZXR1cm4gbmV3IERlbGV0ZU9wZXJhdGlvbihsZW5ndGgsIHBvc2l0aW9uKTtcclxuICB9XHJcblxyXG4gIHNoaWZ0KG9wZXJhdGlvbikge1xyXG4gICAgY29uc3Qgb2Zmc2V0ID0gLXRoaXMubGVuZ3RoO1xyXG5cclxuICAgIHJldHVybiAob3BlcmF0aW9uLnNoaWZ0ZWQob2Zmc2V0KSk7XHJcbiAgfVxyXG5cclxuICB0YWtlbkZyb20oZGVsZXRlT3BlcmF0aW9uKSB7XHJcbiAgICBsZXQgbGVuZ3RoID0gZGVsZXRlT3BlcmF0aW9uLmxlbmd0aCxcclxuICAgICAgICBwb3NpdGlvbiA9IGRlbGV0ZU9wZXJhdGlvbi5wb3NpdGlvbjtcclxuXHJcbiAgICBpZiAodGhpcy5wb3NpdGlvbiA+IHBvc2l0aW9uICYmIHRoaXMubGVuZ3RoICsgdGhpcy5wb3NpdGlvbiA+PSBsZW5ndGggKyBwb3NpdGlvbikge1xyXG4gICAgICBsZW5ndGggPSB0aGlzLnBvc2l0aW9uIC0gcG9zaXRpb247XHJcblxyXG4gICAgICByZXR1cm4gbmV3IERlbGV0ZU9wZXJhdGlvbihsZW5ndGgsIHBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5wb3NpdGlvbiA8PSBwb3NpdGlvbiAmJiB0aGlzLmxlbmd0aCArIHRoaXMucG9zaXRpb24gPCBsZW5ndGggKyBwb3NpdGlvbikge1xyXG4gICAgICBsZW5ndGggPSBsZW5ndGggKyBwb3NpdGlvbiAtIHRoaXMucG9zaXRpb24gLSB0aGlzLmxlbmd0aDtcclxuICAgICAgcG9zaXRpb24gPSB0aGlzLmxlbmd0aCArIHRoaXMucG9zaXRpb247XHJcblxyXG4gICAgICByZXR1cm4gbmV3IERlbGV0ZU9wZXJhdGlvbihsZW5ndGgsIHBvc2l0aW9uKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNwbGl0KGRlbGV0ZU9wZXJhdGlvbikge1xyXG4gICAgbGV0IGxlbmd0aCA9IGRlbGV0ZU9wZXJhdGlvbi5sZW5ndGgsXHJcbiAgICAgICAgcG9zaXRpb24gPSBkZWxldGVPcGVyYXRpb24ucG9zaXRpb247XHJcblxyXG4gICAgbGVuZ3RoID0gbGVuZ3RoIC0gdGhpcy5sZW5ndGg7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBEZWxldGVPcGVyYXRpb24obGVuZ3RoLCBwb3NpdGlvbik7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xyXG4gICAgY29uc3QgbGVuZ3RoID0ganNvbltcImxlbmd0aFwiXSxcclxuICAgICAgICAgIHBvc2l0aW9uID0ganNvbltcInBvc2l0aW9uXCJdO1xyXG5cclxuICAgIHJldHVybiBuZXcgRGVsZXRlT3BlcmF0aW9uKGxlbmd0aCwgcG9zaXRpb24pO1xyXG4gIH1cclxufVxyXG5cclxuT2JqZWN0LmFzc2lnbihEZWxldGVPcGVyYXRpb24sIHtcclxuICB0eXBlOiAnZGVsZXRlJ1xyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRGVsZXRlT3BlcmF0aW9uO1xyXG4iXX0=