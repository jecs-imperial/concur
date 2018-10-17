'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var types = require('../types'),
    stringCompare = require('../stringCompare'),
    DeleteOperation = require('../operation/delete');

var insertType = types.insertType;

var InsertOperation = function () {
  function InsertOperation(type, string, position) {
    _classCallCheck(this, InsertOperation);

    this.type = type;
    this.string = string;
    this.position = position;
  }

  _createClass(InsertOperation, [{
    key: 'clone',
    value: function clone() {
      return InsertOperation.fromStringAndPosition(this.string, this.position);
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
                if (stringCompare(rho.string, tau.string)) {
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
    key: 'transformSelection',
    value: function transformSelection(selection) {
      var transformedSelection = void 0;

      var startPosition = this.position,
          ///
      length = this.string.length,
          selectionStartPosition = selection.getStartPosition(),
          selectionEndPosition = selection.getEndPosition(),
          offset = length,
          endOffset = offset;

      if (selectionStartPosition >= startPosition) {
        transformedSelection = selection.shifted(offset);
      }

      if (selectionEndPosition > startPosition) {
        transformedSelection = selection.endPositionShifted(endOffset);
      }

      return transformedSelection;
    }
  }, {
    key: 'shifted',
    value: function shifted(offset) {
      var string = this.string,
          position = this.position + offset,
          insertOperation = InsertOperation.fromStringAndPosition(string, position);

      return insertOperation;
    }
  }, {
    key: 'shift',
    value: function shift(operation) {
      var length = this.string.length,
          offset = length,
          ///
      shiftedOperation = operation.shifted(offset);

      return shiftedOperation;
    }
  }, {
    key: 'left',
    value: function left(deleteOperation) {
      var position = deleteOperation.position,
          length = this.position - position;

      deleteOperation = DeleteOperation.fromLengthAndPosition(length, position);

      return deleteOperation;
    }
  }, {
    key: 'right',
    value: function right(deleteOperation) {
      var length = deleteOperation.length,
          position = deleteOperation.position;

      length = length - this.position + position;
      position = this.position;

      deleteOperation = DeleteOperation.fromLengthAndPosition(length, position);

      return deleteOperation;
    }
  }], [{
    key: 'fromStringAndPosition',
    value: function fromStringAndPosition(string, position) {
      var type = insertType,
          ///
      insertOperation = new InsertOperation(type, string, position);

      return insertOperation;
    }
  }, {
    key: 'fromJSON',
    value: function fromJSON(json) {
      var type = json["type"],
          string = json["string"],
          position = json["position"],
          insertOperation = new InsertOperation(type, string, position);

      return insertOperation;
    }
  }]);

  return InsertOperation;
}();

module.exports = InsertOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9vcGVyYXRpb24vaW5zZXJ0LmpzIl0sIm5hbWVzIjpbInR5cGVzIiwicmVxdWlyZSIsInN0cmluZ0NvbXBhcmUiLCJEZWxldGVPcGVyYXRpb24iLCJpbnNlcnRUeXBlIiwiSW5zZXJ0T3BlcmF0aW9uIiwidHlwZSIsInN0cmluZyIsInBvc2l0aW9uIiwiZnJvbVN0cmluZ0FuZFBvc2l0aW9uIiwianNvbiIsIm9wZXJhdGlvbiIsInRhdSIsInJobyIsImNsb25lIiwic2hpZnQiLCJsZW5ndGgiLCJsZWZ0IiwicmlnaHQiLCJjb250ZW50Iiwic3Vic3RyaW5nIiwic2VsZWN0aW9uIiwidHJhbnNmb3JtZWRTZWxlY3Rpb24iLCJzdGFydFBvc2l0aW9uIiwic2VsZWN0aW9uU3RhcnRQb3NpdGlvbiIsImdldFN0YXJ0UG9zaXRpb24iLCJzZWxlY3Rpb25FbmRQb3NpdGlvbiIsImdldEVuZFBvc2l0aW9uIiwib2Zmc2V0IiwiZW5kT2Zmc2V0Iiwic2hpZnRlZCIsImVuZFBvc2l0aW9uU2hpZnRlZCIsImluc2VydE9wZXJhdGlvbiIsInNoaWZ0ZWRPcGVyYXRpb24iLCJkZWxldGVPcGVyYXRpb24iLCJmcm9tTGVuZ3RoQW5kUG9zaXRpb24iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBRUEsSUFBTUEsUUFBUUMsUUFBUSxVQUFSLENBQWQ7QUFBQSxJQUNNQyxnQkFBZ0JELFFBQVEsa0JBQVIsQ0FEdEI7QUFBQSxJQUVNRSxrQkFBa0JGLFFBQVEscUJBQVIsQ0FGeEI7O0lBSVFHLFUsR0FBZUosSyxDQUFmSSxVOztJQUVGQyxlO0FBQ0osMkJBQVlDLElBQVosRUFBa0JDLE1BQWxCLEVBQTBCQyxRQUExQixFQUFvQztBQUFBOztBQUNuQyxTQUFLRixJQUFMLEdBQVlBLElBQVo7QUFDQyxTQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNEOzs7OzRCQUVPO0FBQ04sYUFB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ZUFBU0EsU0FBUyxLQUFLUixRQUFkLEdBQXlCQSxRQUFsQztBQUNBQSxpQkFBVyxLQUFLQSxRQUFoQjs7QUFFQTBCLHdCQUFrQi9CLGdCQUFnQmdDLHFCQUFoQixDQUFzQ25CLE1BQXRDLEVBQThDUixRQUE5QyxDQUFsQjs7QUFFQSxhQUFPMEIsZUFBUDtBQUNEOzs7MENBRTRCM0IsTSxFQUFRQyxRLEVBQVU7QUFDN0MsVUFBTUYsT0FBT0YsVUFBYjtBQUFBLFVBQTBCO0FBQ3BCNEIsd0JBQWtCLElBQUkzQixlQUFKLENBQW9CQyxJQUFwQixFQUEwQkMsTUFBMUIsRUFBa0NDLFFBQWxDLENBRHhCOztBQUdBLGFBQU93QixlQUFQO0FBQ0Q7Ozs2QkFFZXRCLEksRUFBTTtBQUNwQixVQUFNSixPQUFPSSxLQUFLLE1BQUwsQ0FBYjtBQUFBLFVBQ01ILFNBQVNHLEtBQUssUUFBTCxDQURmO0FBQUEsVUFFTUYsV0FBV0UsS0FBSyxVQUFMLENBRmpCO0FBQUEsVUFHTXNCLGtCQUFrQixJQUFJM0IsZUFBSixDQUFvQkMsSUFBcEIsRUFBMEJDLE1BQTFCLEVBQWtDQyxRQUFsQyxDQUh4Qjs7QUFLQSxhQUFPd0IsZUFBUDtBQUNEOzs7Ozs7QUFHSEksT0FBT0MsT0FBUCxHQUFpQmhDLGVBQWpCIiwiZmlsZSI6Imluc2VydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IHR5cGVzID0gcmVxdWlyZSgnLi4vdHlwZXMnKSxcclxuICAgICAgc3RyaW5nQ29tcGFyZSA9IHJlcXVpcmUoJy4uL3N0cmluZ0NvbXBhcmUnKSxcclxuICAgICAgRGVsZXRlT3BlcmF0aW9uID0gcmVxdWlyZSgnLi4vb3BlcmF0aW9uL2RlbGV0ZScpO1xyXG5cclxuY29uc3QgeyBpbnNlcnRUeXBlIH0gPSB0eXBlcztcclxuXHJcbmNsYXNzIEluc2VydE9wZXJhdGlvbiB7XHJcbiAgY29uc3RydWN0b3IodHlwZSwgc3RyaW5nLCBwb3NpdGlvbikge1xyXG5cdCAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIHRoaXMuc3RyaW5nID0gc3RyaW5nO1xyXG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gIH1cclxuXHJcbiAgY2xvbmUoKSB7XHJcbiAgICByZXR1cm4gSW5zZXJ0T3BlcmF0aW9uLmZyb21TdHJpbmdBbmRQb3NpdGlvbih0aGlzLnN0cmluZywgdGhpcy5wb3NpdGlvbik7XHJcbiAgfVxyXG5cclxuICB0b0pTT04oKSB7XHJcbiAgICBjb25zdCBqc29uID0ge1xyXG5cdCAgICAgICAgICBcInR5cGVcIjogdGhpcy50eXBlLFxyXG4gICAgICAgICAgICBcInN0cmluZ1wiOiB0aGlzLnN0cmluZyxcclxuICAgICAgICAgICAgXCJwb3NpdGlvblwiOiB0aGlzLnBvc2l0aW9uXHJcbiAgICAgICAgICB9O1xyXG4gICAgXHJcbiAgICByZXR1cm4ganNvbjtcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybU9wZXJhdGlvbihvcGVyYXRpb24pIHtcclxuICAgIHN3aXRjaCAob3BlcmF0aW9uLnR5cGUpIHtcclxuICAgICAgY2FzZSAnaW5zZXJ0JzpcclxuICAgICAgICByZXR1cm4gKGZ1bmN0aW9uKHRhdSwgcmhvKSB7XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA8IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gW3RhdS5jbG9uZSgpXTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uID09PSByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgaWYgKHRhdS5zdHJpbmcgPT09IHJoby5zdHJpbmcpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW3RhdS5jbG9uZSgpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGF1LnN0cmluZyAhPT0gcmhvLnN0cmluZykge1xyXG4gICAgICAgICAgICAgIGlmIChzdHJpbmdDb21wYXJlKHJoby5zdHJpbmcsIHRhdS5zdHJpbmcpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW3Joby5zaGlmdCh0YXUpXTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFt0YXUuY2xvbmUoKV07XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA+IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gW3Joby5zaGlmdCh0YXUpXTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSkob3BlcmF0aW9uLCB0aGlzKTtcclxuXHJcbiAgICAgIGNhc2UgJ2RlbGV0ZSc6XHJcbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbih0YXUsIHJobykge1xyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gKyB0YXUubGVuZ3RoIDw9IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gW3RhdS5jbG9uZSgpXTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uIDwgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbcmhvLmxlZnQodGF1KSwgcmhvLmxlZnQodGF1KS5zaGlmdChyaG8uc2hpZnQocmhvLnJpZ2h0KHRhdSkpKV07XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA+PSByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtyaG8uc2hpZnQodGF1KV07XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pKG9wZXJhdGlvbiwgdGhpcyk7XHJcblxyXG4gICAgICBjYXNlICdlbXB0eSc6XHJcbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbih0YXUsIHJobykge1xyXG5cclxuICAgICAgICAgIHJldHVybiBbdGF1LmNsb25lKCldO1xyXG5cclxuICAgICAgICB9KShvcGVyYXRpb24sIHRoaXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtQ29udGVudChjb250ZW50KSB7XHJcbiAgICByZXR1cm4gY29udGVudC5zdWJzdHJpbmcoMCwgdGhpcy5wb3NpdGlvbikgKyB0aGlzLnN0cmluZyArIGNvbnRlbnQuc3Vic3RyaW5nKHRoaXMucG9zaXRpb24pO1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtU2VsZWN0aW9uKHNlbGVjdGlvbikge1xyXG4gICAgbGV0IHRyYW5zZm9ybWVkU2VsZWN0aW9uO1xyXG5cclxuICAgIGNvbnN0IHN0YXJ0UG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uLCAvLy9cclxuICAgICAgICAgIGxlbmd0aCA9IHRoaXMuc3RyaW5nLmxlbmd0aCxcclxuICAgICAgICAgIHNlbGVjdGlvblN0YXJ0UG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0U3RhcnRQb3NpdGlvbigpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kUG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0RW5kUG9zaXRpb24oKSxcclxuICAgICAgICAgIG9mZnNldCA9IGxlbmd0aCxcclxuICAgICAgICAgIGVuZE9mZnNldCA9IG9mZnNldDtcclxuXHJcbiAgICBpZiAoc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiA+PSBzdGFydFBvc2l0aW9uKSB7XHJcbiAgICAgIHRyYW5zZm9ybWVkU2VsZWN0aW9uID0gc2VsZWN0aW9uLnNoaWZ0ZWQob2Zmc2V0KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc2VsZWN0aW9uRW5kUG9zaXRpb24gPiBzdGFydFBvc2l0aW9uKSB7XHJcbiAgICAgIHRyYW5zZm9ybWVkU2VsZWN0aW9uID0gc2VsZWN0aW9uLmVuZFBvc2l0aW9uU2hpZnRlZChlbmRPZmZzZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cmFuc2Zvcm1lZFNlbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIHNoaWZ0ZWQob2Zmc2V0KSB7XHJcbiAgICBjb25zdCBzdHJpbmcgPSB0aGlzLnN0cmluZyxcclxuICAgICAgICAgIHBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbiArIG9mZnNldCxcclxuICAgICAgICAgIGluc2VydE9wZXJhdGlvbiA9IEluc2VydE9wZXJhdGlvbi5mcm9tU3RyaW5nQW5kUG9zaXRpb24oc3RyaW5nLCBwb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIGluc2VydE9wZXJhdGlvbjtcclxuICB9XHJcblxyXG4gIHNoaWZ0KG9wZXJhdGlvbikge1xyXG4gICAgY29uc3QgbGVuZ3RoID0gdGhpcy5zdHJpbmcubGVuZ3RoLFxyXG5cdFx0XHRcdCAgb2Zmc2V0ID0gbGVuZ3RoLCAgLy8vXHJcbiAgICAgICAgICBzaGlmdGVkT3BlcmF0aW9uID0gb3BlcmF0aW9uLnNoaWZ0ZWQob2Zmc2V0KTtcclxuXHJcbiAgICByZXR1cm4gc2hpZnRlZE9wZXJhdGlvbjtcclxuICB9XHJcblxyXG4gIGxlZnQoZGVsZXRlT3BlcmF0aW9uKSB7XHJcbiAgICBjb25zdCBwb3NpdGlvbiA9IGRlbGV0ZU9wZXJhdGlvbi5wb3NpdGlvbixcclxuICAgICAgICAgIGxlbmd0aCA9IHRoaXMucG9zaXRpb24gLSBwb3NpdGlvbjtcclxuXHJcbiAgICBkZWxldGVPcGVyYXRpb24gPSBEZWxldGVPcGVyYXRpb24uZnJvbUxlbmd0aEFuZFBvc2l0aW9uKGxlbmd0aCwgcG9zaXRpb24pO1xyXG5cclxuICAgIHJldHVybiBkZWxldGVPcGVyYXRpb247XHJcbiAgfVxyXG5cclxuICByaWdodChkZWxldGVPcGVyYXRpb24pIHtcclxuICAgIGxldCBsZW5ndGggPSBkZWxldGVPcGVyYXRpb24ubGVuZ3RoLFxyXG4gICAgICAgIHBvc2l0aW9uID0gZGVsZXRlT3BlcmF0aW9uLnBvc2l0aW9uO1xyXG5cclxuICAgIGxlbmd0aCA9IGxlbmd0aCAtIHRoaXMucG9zaXRpb24gKyBwb3NpdGlvbjtcclxuICAgIHBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbjtcclxuXHJcbiAgICBkZWxldGVPcGVyYXRpb24gPSBEZWxldGVPcGVyYXRpb24uZnJvbUxlbmd0aEFuZFBvc2l0aW9uKGxlbmd0aCwgcG9zaXRpb24pO1xyXG5cclxuICAgIHJldHVybiBkZWxldGVPcGVyYXRpb247XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbVN0cmluZ0FuZFBvc2l0aW9uKHN0cmluZywgcG9zaXRpb24pIHtcclxuICAgIGNvbnN0IHR5cGUgPSBpbnNlcnRUeXBlLCAgLy8vXHJcbiAgICAgICAgICBpbnNlcnRPcGVyYXRpb24gPSBuZXcgSW5zZXJ0T3BlcmF0aW9uKHR5cGUsIHN0cmluZywgcG9zaXRpb24pO1xyXG5cclxuICAgIHJldHVybiBpbnNlcnRPcGVyYXRpb247XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xyXG4gICAgY29uc3QgdHlwZSA9IGpzb25bXCJ0eXBlXCJdLFxyXG4gICAgICAgICAgc3RyaW5nID0ganNvbltcInN0cmluZ1wiXSxcclxuICAgICAgICAgIHBvc2l0aW9uID0ganNvbltcInBvc2l0aW9uXCJdLFxyXG4gICAgICAgICAgaW5zZXJ0T3BlcmF0aW9uID0gbmV3IEluc2VydE9wZXJhdGlvbih0eXBlLCBzdHJpbmcsIHBvc2l0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gaW5zZXJ0T3BlcmF0aW9uO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJbnNlcnRPcGVyYXRpb247XHJcbiJdfQ==