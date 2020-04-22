"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var types = require("../types"),
    stringCompare = require("../stringCompare"),
    DeleteOperation = require("../operation/delete");

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
        case "insert":
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

        case "delete":
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

        case "empty":
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluc2VydC5qcyJdLCJuYW1lcyI6WyJ0eXBlcyIsInJlcXVpcmUiLCJzdHJpbmdDb21wYXJlIiwiRGVsZXRlT3BlcmF0aW9uIiwiaW5zZXJ0VHlwZSIsIkluc2VydE9wZXJhdGlvbiIsInR5cGUiLCJzdHJpbmciLCJwb3NpdGlvbiIsImZyb21TdHJpbmdBbmRQb3NpdGlvbiIsImpzb24iLCJvcGVyYXRpb24iLCJ0YXUiLCJyaG8iLCJjbG9uZSIsInNoaWZ0IiwibGVuZ3RoIiwibGVmdCIsInJpZ2h0IiwiY29udGVudCIsInN1YnN0cmluZyIsInNlbGVjdGlvbiIsInRyYW5zZm9ybWVkU2VsZWN0aW9uIiwic3RhcnRQb3NpdGlvbiIsInNlbGVjdGlvblN0YXJ0UG9zaXRpb24iLCJnZXRTdGFydFBvc2l0aW9uIiwic2VsZWN0aW9uRW5kUG9zaXRpb24iLCJnZXRFbmRQb3NpdGlvbiIsIm9mZnNldCIsImVuZE9mZnNldCIsInNoaWZ0ZWQiLCJlbmRQb3NpdGlvblNoaWZ0ZWQiLCJpbnNlcnRPcGVyYXRpb24iLCJzaGlmdGVkT3BlcmF0aW9uIiwiZGVsZXRlT3BlcmF0aW9uIiwiZnJvbUxlbmd0aEFuZFBvc2l0aW9uIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBRUEsSUFBTUEsS0FBSyxHQUFHQyxPQUFPLENBQUMsVUFBRCxDQUFyQjtBQUFBLElBQ01DLGFBQWEsR0FBR0QsT0FBTyxDQUFDLGtCQUFELENBRDdCO0FBQUEsSUFFTUUsZUFBZSxHQUFHRixPQUFPLENBQUMscUJBQUQsQ0FGL0I7O0lBSVFHLFUsR0FBZUosSyxDQUFmSSxVOztJQUVGQyxlO0FBQ0osMkJBQVlDLElBQVosRUFBa0JDLE1BQWxCLEVBQTBCQyxRQUExQixFQUFvQztBQUFBOztBQUNuQyxTQUFLRixJQUFMLEdBQVlBLElBQVo7QUFDQyxTQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNEOzs7OzRCQUVP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QUdHLElBQUksQ0FBQyxRQUFELENBRG5CO0FBQUEsVUFFTUYsUUFBUSxHQUFHRSxJQUFJLENBQUMsVUFBRCxDQUZyQjtBQUFBLFVBR01zQixlQUFlLEdBQUcsSUFBSTNCLGVBQUosQ0FBb0JDLElBQXBCLEVBQTBCQyxNQUExQixFQUFrQ0MsUUFBbEMsQ0FIeEI7QUFLQSxhQUFPd0IsZUFBUDtBQUNEOzs7Ozs7QUFHSEksTUFBTSxDQUFDQyxPQUFQLEdBQWlCaEMsZUFBakIiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmNvbnN0IHR5cGVzID0gcmVxdWlyZShcIi4uL3R5cGVzXCIpLFxyXG4gICAgICBzdHJpbmdDb21wYXJlID0gcmVxdWlyZShcIi4uL3N0cmluZ0NvbXBhcmVcIiksXHJcbiAgICAgIERlbGV0ZU9wZXJhdGlvbiA9IHJlcXVpcmUoXCIuLi9vcGVyYXRpb24vZGVsZXRlXCIpO1xyXG5cclxuY29uc3QgeyBpbnNlcnRUeXBlIH0gPSB0eXBlcztcclxuXHJcbmNsYXNzIEluc2VydE9wZXJhdGlvbiB7XHJcbiAgY29uc3RydWN0b3IodHlwZSwgc3RyaW5nLCBwb3NpdGlvbikge1xyXG5cdCAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIHRoaXMuc3RyaW5nID0gc3RyaW5nO1xyXG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gIH1cclxuXHJcbiAgY2xvbmUoKSB7XHJcbiAgICByZXR1cm4gSW5zZXJ0T3BlcmF0aW9uLmZyb21TdHJpbmdBbmRQb3NpdGlvbih0aGlzLnN0cmluZywgdGhpcy5wb3NpdGlvbik7XHJcbiAgfVxyXG5cclxuICB0b0pTT04oKSB7XHJcbiAgICBjb25zdCBqc29uID0ge1xyXG5cdCAgICAgICAgICBcInR5cGVcIjogdGhpcy50eXBlLFxyXG4gICAgICAgICAgICBcInN0cmluZ1wiOiB0aGlzLnN0cmluZyxcclxuICAgICAgICAgICAgXCJwb3NpdGlvblwiOiB0aGlzLnBvc2l0aW9uXHJcbiAgICAgICAgICB9O1xyXG4gICAgXHJcbiAgICByZXR1cm4ganNvbjtcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybU9wZXJhdGlvbihvcGVyYXRpb24pIHtcclxuICAgIHN3aXRjaCAob3BlcmF0aW9uLnR5cGUpIHtcclxuICAgICAgY2FzZSBcImluc2VydFwiOlxyXG4gICAgICAgIHJldHVybiAoKHRhdSwgcmhvKSA9PiB7XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA8IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gW3RhdS5jbG9uZSgpXTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uID09PSByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgaWYgKHRhdS5zdHJpbmcgPT09IHJoby5zdHJpbmcpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW3RhdS5jbG9uZSgpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGF1LnN0cmluZyAhPT0gcmhvLnN0cmluZykge1xyXG4gICAgICAgICAgICAgIGlmIChzdHJpbmdDb21wYXJlKHJoby5zdHJpbmcsIHRhdS5zdHJpbmcpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW3Joby5zaGlmdCh0YXUpXTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFt0YXUuY2xvbmUoKV07XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA+IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gW3Joby5zaGlmdCh0YXUpXTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSkob3BlcmF0aW9uLCB0aGlzKTtcclxuXHJcbiAgICAgIGNhc2UgXCJkZWxldGVcIjpcclxuICAgICAgICByZXR1cm4gKCh0YXUsIHJobykgPT4ge1xyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gKyB0YXUubGVuZ3RoIDw9IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gW3RhdS5jbG9uZSgpXTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uIDwgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbcmhvLmxlZnQodGF1KSwgcmhvLmxlZnQodGF1KS5zaGlmdChyaG8uc2hpZnQocmhvLnJpZ2h0KHRhdSkpKV07XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA+PSByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtyaG8uc2hpZnQodGF1KV07XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pKG9wZXJhdGlvbiwgdGhpcyk7XHJcblxyXG4gICAgICBjYXNlIFwiZW1wdHlcIjpcclxuICAgICAgICByZXR1cm4gKCh0YXUsIHJobykgPT4ge1xyXG5cclxuICAgICAgICAgIHJldHVybiBbdGF1LmNsb25lKCldO1xyXG5cclxuICAgICAgICB9KShvcGVyYXRpb24sIHRoaXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtQ29udGVudChjb250ZW50KSB7XHJcbiAgICByZXR1cm4gY29udGVudC5zdWJzdHJpbmcoMCwgdGhpcy5wb3NpdGlvbikgKyB0aGlzLnN0cmluZyArIGNvbnRlbnQuc3Vic3RyaW5nKHRoaXMucG9zaXRpb24pO1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtU2VsZWN0aW9uKHNlbGVjdGlvbikge1xyXG4gICAgbGV0IHRyYW5zZm9ybWVkU2VsZWN0aW9uO1xyXG5cclxuICAgIGNvbnN0IHN0YXJ0UG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uLCAvLy9cclxuICAgICAgICAgIGxlbmd0aCA9IHRoaXMuc3RyaW5nLmxlbmd0aCxcclxuICAgICAgICAgIHNlbGVjdGlvblN0YXJ0UG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0U3RhcnRQb3NpdGlvbigpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kUG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0RW5kUG9zaXRpb24oKSxcclxuICAgICAgICAgIG9mZnNldCA9IGxlbmd0aCwgIC8vL1xyXG4gICAgICAgICAgZW5kT2Zmc2V0ID0gb2Zmc2V0OyAvLy9cclxuXHJcbiAgICBpZiAoZmFsc2UpIHtcclxuXHJcbiAgICB9IGVsc2UgaWYgKHNlbGVjdGlvblN0YXJ0UG9zaXRpb24gPj0gc3RhcnRQb3NpdGlvbikge1xyXG4gICAgICB0cmFuc2Zvcm1lZFNlbGVjdGlvbiA9IHNlbGVjdGlvbi5zaGlmdGVkKG9mZnNldCk7XHJcbiAgICB9IGVsc2UgaWYgKHNlbGVjdGlvbkVuZFBvc2l0aW9uID4gc3RhcnRQb3NpdGlvbikge1xyXG4gICAgICB0cmFuc2Zvcm1lZFNlbGVjdGlvbiA9IHNlbGVjdGlvbi5lbmRQb3NpdGlvblNoaWZ0ZWQoZW5kT2Zmc2V0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRyYW5zZm9ybWVkU2VsZWN0aW9uID0gc2VsZWN0aW9uLmNsb25lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRyYW5zZm9ybWVkU2VsZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgc2hpZnRlZChvZmZzZXQpIHtcclxuICAgIGNvbnN0IHN0cmluZyA9IHRoaXMuc3RyaW5nLFxyXG4gICAgICAgICAgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uICsgb2Zmc2V0LFxyXG4gICAgICAgICAgaW5zZXJ0T3BlcmF0aW9uID0gSW5zZXJ0T3BlcmF0aW9uLmZyb21TdHJpbmdBbmRQb3NpdGlvbihzdHJpbmcsIHBvc2l0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gaW5zZXJ0T3BlcmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgc2hpZnQob3BlcmF0aW9uKSB7XHJcbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLnN0cmluZy5sZW5ndGgsXHJcblx0XHRcdFx0ICBvZmZzZXQgPSBsZW5ndGgsICAvLy9cclxuICAgICAgICAgIHNoaWZ0ZWRPcGVyYXRpb24gPSBvcGVyYXRpb24uc2hpZnRlZChvZmZzZXQpO1xyXG5cclxuICAgIHJldHVybiBzaGlmdGVkT3BlcmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgbGVmdChkZWxldGVPcGVyYXRpb24pIHtcclxuICAgIGNvbnN0IHBvc2l0aW9uID0gZGVsZXRlT3BlcmF0aW9uLnBvc2l0aW9uLFxyXG4gICAgICAgICAgbGVuZ3RoID0gdGhpcy5wb3NpdGlvbiAtIHBvc2l0aW9uO1xyXG5cclxuICAgIGRlbGV0ZU9wZXJhdGlvbiA9IERlbGV0ZU9wZXJhdGlvbi5mcm9tTGVuZ3RoQW5kUG9zaXRpb24obGVuZ3RoLCBwb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIGRlbGV0ZU9wZXJhdGlvbjtcclxuICB9XHJcblxyXG4gIHJpZ2h0KGRlbGV0ZU9wZXJhdGlvbikge1xyXG4gICAgbGV0IGxlbmd0aCA9IGRlbGV0ZU9wZXJhdGlvbi5sZW5ndGgsXHJcbiAgICAgICAgcG9zaXRpb24gPSBkZWxldGVPcGVyYXRpb24ucG9zaXRpb247XHJcblxyXG4gICAgbGVuZ3RoID0gbGVuZ3RoIC0gdGhpcy5wb3NpdGlvbiArIHBvc2l0aW9uO1xyXG4gICAgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uO1xyXG5cclxuICAgIGRlbGV0ZU9wZXJhdGlvbiA9IERlbGV0ZU9wZXJhdGlvbi5mcm9tTGVuZ3RoQW5kUG9zaXRpb24obGVuZ3RoLCBwb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIGRlbGV0ZU9wZXJhdGlvbjtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tU3RyaW5nQW5kUG9zaXRpb24oc3RyaW5nLCBwb3NpdGlvbikge1xyXG4gICAgY29uc3QgdHlwZSA9IGluc2VydFR5cGUsICAvLy9cclxuICAgICAgICAgIGluc2VydE9wZXJhdGlvbiA9IG5ldyBJbnNlcnRPcGVyYXRpb24odHlwZSwgc3RyaW5nLCBwb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIGluc2VydE9wZXJhdGlvbjtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XHJcbiAgICBjb25zdCB0eXBlID0ganNvbltcInR5cGVcIl0sXHJcbiAgICAgICAgICBzdHJpbmcgPSBqc29uW1wic3RyaW5nXCJdLFxyXG4gICAgICAgICAgcG9zaXRpb24gPSBqc29uW1wicG9zaXRpb25cIl0sXHJcbiAgICAgICAgICBpbnNlcnRPcGVyYXRpb24gPSBuZXcgSW5zZXJ0T3BlcmF0aW9uKHR5cGUsIHN0cmluZywgcG9zaXRpb24pO1xyXG5cclxuICAgIHJldHVybiBpbnNlcnRPcGVyYXRpb247XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEluc2VydE9wZXJhdGlvbjtcclxuIl19