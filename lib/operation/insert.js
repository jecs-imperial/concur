'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var types = require('../types'),
    stringCompare = require('../stringCompare'),
    DeleteOperation = require('../operation/delete');

var insertType = types.insertType;

var InsertOperation = /*#__PURE__*/function () {
  function InsertOperation(type, string, position) {
    _classCallCheck(this, InsertOperation);

    this.type = type;
    this.string = string;
    this.position = position;
  }

  _createClass(InsertOperation, [{
    key: "clone",
    value: function clone() {
      return InsertOperation.fromStringAndPosition(this.string, this.position);
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var json = {
        "type": this.type,
        "string": this.string,
        "position": this.position
      };
      return json;
    }
  }, {
    key: "transformOperation",
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
    key: "transformContent",
    value: function transformContent(content) {
      return content.substring(0, this.position) + this.string + content.substring(this.position);
    }
  }, {
    key: "transformSelection",
    value: function transformSelection(selection) {
      var transformedSelection;
      var startPosition = this.position,
          ///
      length = this.string.length,
          selectionStartPosition = selection.getStartPosition(),
          selectionEndPosition = selection.getEndPosition(),
          offset = length,
          ///
      endOffset = offset; ///

      if (false) {} else if (selectionStartPosition >= startPosition) {
        transformedSelection = selection.shifted(offset);
      } else if (selectionEndPosition > startPosition) {
        transformedSelection = selection.endPositionShifted(endOffset);
      } else {
        transformedSelection = selection.clone();
      }

      return transformedSelection;
    }
  }, {
    key: "shifted",
    value: function shifted(offset) {
      var string = this.string,
          position = this.position + offset,
          insertOperation = InsertOperation.fromStringAndPosition(string, position);
      return insertOperation;
    }
  }, {
    key: "shift",
    value: function shift(operation) {
      var length = this.string.length,
          offset = length,
          ///
      shiftedOperation = operation.shifted(offset);
      return shiftedOperation;
    }
  }, {
    key: "left",
    value: function left(deleteOperation) {
      var position = deleteOperation.position,
          length = this.position - position;
      deleteOperation = DeleteOperation.fromLengthAndPosition(length, position);
      return deleteOperation;
    }
  }, {
    key: "right",
    value: function right(deleteOperation) {
      var length = deleteOperation.length,
          position = deleteOperation.position;
      length = length - this.position + position;
      position = this.position;
      deleteOperation = DeleteOperation.fromLengthAndPosition(length, position);
      return deleteOperation;
    }
  }], [{
    key: "fromStringAndPosition",
    value: function fromStringAndPosition(string, position) {
      var type = insertType,
          ///
      insertOperation = new InsertOperation(type, string, position);
      return insertOperation;
    }
  }, {
    key: "fromJSON",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluc2VydC5qcyJdLCJuYW1lcyI6WyJ0eXBlcyIsInJlcXVpcmUiLCJzdHJpbmdDb21wYXJlIiwiRGVsZXRlT3BlcmF0aW9uIiwiaW5zZXJ0VHlwZSIsIkluc2VydE9wZXJhdGlvbiIsInR5cGUiLCJzdHJpbmciLCJwb3NpdGlvbiIsImZyb21TdHJpbmdBbmRQb3NpdGlvbiIsImpzb24iLCJvcGVyYXRpb24iLCJ0YXUiLCJyaG8iLCJjbG9uZSIsInNoaWZ0IiwibGVuZ3RoIiwibGVmdCIsInJpZ2h0IiwiY29udGVudCIsInN1YnN0cmluZyIsInNlbGVjdGlvbiIsInRyYW5zZm9ybWVkU2VsZWN0aW9uIiwic3RhcnRQb3NpdGlvbiIsInNlbGVjdGlvblN0YXJ0UG9zaXRpb24iLCJnZXRTdGFydFBvc2l0aW9uIiwic2VsZWN0aW9uRW5kUG9zaXRpb24iLCJnZXRFbmRQb3NpdGlvbiIsIm9mZnNldCIsImVuZE9mZnNldCIsInNoaWZ0ZWQiLCJlbmRQb3NpdGlvblNoaWZ0ZWQiLCJpbnNlcnRPcGVyYXRpb24iLCJzaGlmdGVkT3BlcmF0aW9uIiwiZGVsZXRlT3BlcmF0aW9uIiwiZnJvbUxlbmd0aEFuZFBvc2l0aW9uIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBRUEsSUFBTUEsS0FBSyxHQUFHQyxPQUFPLENBQUMsVUFBRCxDQUFyQjtBQUFBLElBQ01DLGFBQWEsR0FBR0QsT0FBTyxDQUFDLGtCQUFELENBRDdCO0FBQUEsSUFFTUUsZUFBZSxHQUFHRixPQUFPLENBQUMscUJBQUQsQ0FGL0I7O0lBSVFHLFUsR0FBZUosSyxDQUFmSSxVOztJQUVGQyxlO0FBQ0osMkJBQVlDLElBQVosRUFBa0JDLE1BQWxCLEVBQTBCQyxRQUExQixFQUFvQztBQUFBOztBQUNuQyxTQUFLRixJQUFMLEdBQVlBLElBQVo7QUFDQyxTQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNEOzs7OzRCQUVP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LEdBQUdHLElBQUksQ0FBQyxRQUFELENBRG5CO0FBQUEsVUFFTUYsUUFBUSxHQUFHRSxJQUFJLENBQUMsVUFBRCxDQUZyQjtBQUFBLFVBR01zQixlQUFlLEdBQUcsSUFBSTNCLGVBQUosQ0FBb0JDLElBQXBCLEVBQTBCQyxNQUExQixFQUFrQ0MsUUFBbEMsQ0FIeEI7QUFLQSxhQUFPd0IsZUFBUDtBQUNEOzs7Ozs7QUFHSEksTUFBTSxDQUFDQyxPQUFQLEdBQWlCaEMsZUFBakIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCB0eXBlcyA9IHJlcXVpcmUoJy4uL3R5cGVzJyksXHJcbiAgICAgIHN0cmluZ0NvbXBhcmUgPSByZXF1aXJlKCcuLi9zdHJpbmdDb21wYXJlJyksXHJcbiAgICAgIERlbGV0ZU9wZXJhdGlvbiA9IHJlcXVpcmUoJy4uL29wZXJhdGlvbi9kZWxldGUnKTtcclxuXHJcbmNvbnN0IHsgaW5zZXJ0VHlwZSB9ID0gdHlwZXM7XHJcblxyXG5jbGFzcyBJbnNlcnRPcGVyYXRpb24ge1xyXG4gIGNvbnN0cnVjdG9yKHR5cGUsIHN0cmluZywgcG9zaXRpb24pIHtcclxuXHQgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICB0aGlzLnN0cmluZyA9IHN0cmluZztcclxuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICB9XHJcblxyXG4gIGNsb25lKCkge1xyXG4gICAgcmV0dXJuIEluc2VydE9wZXJhdGlvbi5mcm9tU3RyaW5nQW5kUG9zaXRpb24odGhpcy5zdHJpbmcsIHRoaXMucG9zaXRpb24pO1xyXG4gIH1cclxuXHJcbiAgdG9KU09OKCkge1xyXG4gICAgY29uc3QganNvbiA9IHtcclxuXHQgICAgICAgICAgXCJ0eXBlXCI6IHRoaXMudHlwZSxcclxuICAgICAgICAgICAgXCJzdHJpbmdcIjogdGhpcy5zdHJpbmcsXHJcbiAgICAgICAgICAgIFwicG9zaXRpb25cIjogdGhpcy5wb3NpdGlvblxyXG4gICAgICAgICAgfTtcclxuICAgIFxyXG4gICAgcmV0dXJuIGpzb247XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1PcGVyYXRpb24ob3BlcmF0aW9uKSB7XHJcbiAgICBzd2l0Y2ggKG9wZXJhdGlvbi50eXBlKSB7XHJcbiAgICAgIGNhc2UgJ2luc2VydCc6XHJcbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbih0YXUsIHJobykge1xyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPCByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIFt0YXUuY2xvbmUoKV07XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA9PT0gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICh0YXUuc3RyaW5nID09PSByaG8uc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFt0YXUuY2xvbmUoKV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRhdS5zdHJpbmcgIT09IHJoby5zdHJpbmcpIHtcclxuICAgICAgICAgICAgICBpZiAoc3RyaW5nQ29tcGFyZShyaG8uc3RyaW5nLCB0YXUuc3RyaW5nKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtyaG8uc2hpZnQodGF1KV07XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbdGF1LmNsb25lKCldO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPiByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtyaG8uc2hpZnQodGF1KV07XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pKG9wZXJhdGlvbiwgdGhpcyk7XHJcblxyXG4gICAgICBjYXNlICdkZWxldGUnOlxyXG4gICAgICAgIHJldHVybiAoZnVuY3Rpb24odGF1LCByaG8pIHtcclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uICsgdGF1Lmxlbmd0aCA8PSByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIFt0YXUuY2xvbmUoKV07XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA8IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gW3Joby5sZWZ0KHRhdSksIHJoby5sZWZ0KHRhdSkuc2hpZnQocmhvLnNoaWZ0KHJoby5yaWdodCh0YXUpKSldO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPj0gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbcmhvLnNoaWZ0KHRhdSldO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KShvcGVyYXRpb24sIHRoaXMpO1xyXG5cclxuICAgICAgY2FzZSAnZW1wdHknOlxyXG4gICAgICAgIHJldHVybiAoZnVuY3Rpb24odGF1LCByaG8pIHtcclxuXHJcbiAgICAgICAgICByZXR1cm4gW3RhdS5jbG9uZSgpXTtcclxuXHJcbiAgICAgICAgfSkob3BlcmF0aW9uLCB0aGlzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybUNvbnRlbnQoY29udGVudCkge1xyXG4gICAgcmV0dXJuIGNvbnRlbnQuc3Vic3RyaW5nKDAsIHRoaXMucG9zaXRpb24pICsgdGhpcy5zdHJpbmcgKyBjb250ZW50LnN1YnN0cmluZyh0aGlzLnBvc2l0aW9uKTtcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybVNlbGVjdGlvbihzZWxlY3Rpb24pIHtcclxuICAgIGxldCB0cmFuc2Zvcm1lZFNlbGVjdGlvbjtcclxuXHJcbiAgICBjb25zdCBzdGFydFBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbiwgLy8vXHJcbiAgICAgICAgICBsZW5ndGggPSB0aGlzLnN0cmluZy5sZW5ndGgsXHJcbiAgICAgICAgICBzZWxlY3Rpb25TdGFydFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldFN0YXJ0UG9zaXRpb24oKSxcclxuICAgICAgICAgIHNlbGVjdGlvbkVuZFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldEVuZFBvc2l0aW9uKCksXHJcbiAgICAgICAgICBvZmZzZXQgPSBsZW5ndGgsICAvLy9cclxuICAgICAgICAgIGVuZE9mZnNldCA9IG9mZnNldDsgLy8vXHJcblxyXG4gICAgaWYgKGZhbHNlKSB7XHJcblxyXG4gICAgfSBlbHNlIGlmIChzZWxlY3Rpb25TdGFydFBvc2l0aW9uID49IHN0YXJ0UG9zaXRpb24pIHtcclxuICAgICAgdHJhbnNmb3JtZWRTZWxlY3Rpb24gPSBzZWxlY3Rpb24uc2hpZnRlZChvZmZzZXQpO1xyXG4gICAgfSBlbHNlIGlmIChzZWxlY3Rpb25FbmRQb3NpdGlvbiA+IHN0YXJ0UG9zaXRpb24pIHtcclxuICAgICAgdHJhbnNmb3JtZWRTZWxlY3Rpb24gPSBzZWxlY3Rpb24uZW5kUG9zaXRpb25TaGlmdGVkKGVuZE9mZnNldCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0cmFuc2Zvcm1lZFNlbGVjdGlvbiA9IHNlbGVjdGlvbi5jbG9uZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cmFuc2Zvcm1lZFNlbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIHNoaWZ0ZWQob2Zmc2V0KSB7XHJcbiAgICBjb25zdCBzdHJpbmcgPSB0aGlzLnN0cmluZyxcclxuICAgICAgICAgIHBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbiArIG9mZnNldCxcclxuICAgICAgICAgIGluc2VydE9wZXJhdGlvbiA9IEluc2VydE9wZXJhdGlvbi5mcm9tU3RyaW5nQW5kUG9zaXRpb24oc3RyaW5nLCBwb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIGluc2VydE9wZXJhdGlvbjtcclxuICB9XHJcblxyXG4gIHNoaWZ0KG9wZXJhdGlvbikge1xyXG4gICAgY29uc3QgbGVuZ3RoID0gdGhpcy5zdHJpbmcubGVuZ3RoLFxyXG5cdFx0XHRcdCAgb2Zmc2V0ID0gbGVuZ3RoLCAgLy8vXHJcbiAgICAgICAgICBzaGlmdGVkT3BlcmF0aW9uID0gb3BlcmF0aW9uLnNoaWZ0ZWQob2Zmc2V0KTtcclxuXHJcbiAgICByZXR1cm4gc2hpZnRlZE9wZXJhdGlvbjtcclxuICB9XHJcblxyXG4gIGxlZnQoZGVsZXRlT3BlcmF0aW9uKSB7XHJcbiAgICBjb25zdCBwb3NpdGlvbiA9IGRlbGV0ZU9wZXJhdGlvbi5wb3NpdGlvbixcclxuICAgICAgICAgIGxlbmd0aCA9IHRoaXMucG9zaXRpb24gLSBwb3NpdGlvbjtcclxuXHJcbiAgICBkZWxldGVPcGVyYXRpb24gPSBEZWxldGVPcGVyYXRpb24uZnJvbUxlbmd0aEFuZFBvc2l0aW9uKGxlbmd0aCwgcG9zaXRpb24pO1xyXG5cclxuICAgIHJldHVybiBkZWxldGVPcGVyYXRpb247XHJcbiAgfVxyXG5cclxuICByaWdodChkZWxldGVPcGVyYXRpb24pIHtcclxuICAgIGxldCBsZW5ndGggPSBkZWxldGVPcGVyYXRpb24ubGVuZ3RoLFxyXG4gICAgICAgIHBvc2l0aW9uID0gZGVsZXRlT3BlcmF0aW9uLnBvc2l0aW9uO1xyXG5cclxuICAgIGxlbmd0aCA9IGxlbmd0aCAtIHRoaXMucG9zaXRpb24gKyBwb3NpdGlvbjtcclxuICAgIHBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbjtcclxuXHJcbiAgICBkZWxldGVPcGVyYXRpb24gPSBEZWxldGVPcGVyYXRpb24uZnJvbUxlbmd0aEFuZFBvc2l0aW9uKGxlbmd0aCwgcG9zaXRpb24pO1xyXG5cclxuICAgIHJldHVybiBkZWxldGVPcGVyYXRpb247XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbVN0cmluZ0FuZFBvc2l0aW9uKHN0cmluZywgcG9zaXRpb24pIHtcclxuICAgIGNvbnN0IHR5cGUgPSBpbnNlcnRUeXBlLCAgLy8vXHJcbiAgICAgICAgICBpbnNlcnRPcGVyYXRpb24gPSBuZXcgSW5zZXJ0T3BlcmF0aW9uKHR5cGUsIHN0cmluZywgcG9zaXRpb24pO1xyXG5cclxuICAgIHJldHVybiBpbnNlcnRPcGVyYXRpb247XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xyXG4gICAgY29uc3QgdHlwZSA9IGpzb25bXCJ0eXBlXCJdLFxyXG4gICAgICAgICAgc3RyaW5nID0ganNvbltcInN0cmluZ1wiXSxcclxuICAgICAgICAgIHBvc2l0aW9uID0ganNvbltcInBvc2l0aW9uXCJdLFxyXG4gICAgICAgICAgaW5zZXJ0T3BlcmF0aW9uID0gbmV3IEluc2VydE9wZXJhdGlvbih0eXBlLCBzdHJpbmcsIHBvc2l0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gaW5zZXJ0T3BlcmF0aW9uO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJbnNlcnRPcGVyYXRpb247XHJcbiJdfQ==