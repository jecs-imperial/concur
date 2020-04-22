"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _empty = _interopRequireDefault(require("../operation/empty"));

var _types = require("../types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DeleteOperation = /*#__PURE__*/function () {
  function DeleteOperation(type, length, position) {
    _classCallCheck(this, DeleteOperation);

    this.type = type;
    this.length = length;
    this.position = position;
  }

  _createClass(DeleteOperation, [{
    key: "clone",
    value: function clone() {
      return DeleteOperation.fromLengthAndPosition(this.length, this.position);
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var json = {
        "type": this.type,
        "length": this.length,
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

        case "delete":
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
                return [_empty["default"].fromNothing()];
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
                return [_empty["default"].fromNothing()];
              }

              if (tau.length + tau.position > rho.length + rho.position) {
                return [rho.shift(rho.takenFrom(tau))];
              }
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
      return content.substring(0, this.position) + content.substring(this.length + this.position);
    }
  }, {
    key: "transformSelection",
    value: function transformSelection(selection) {
      var transformedSelection;
      var length = this.length,
          ///
      startPosition = this.position,
          ///
      endPosition = startPosition + length,
          selectionStartPosition = selection.getStartPosition(),
          selectionEndPosition = selection.getEndPosition();
      var offset, endOffset;

      if (false) {} else if (selectionStartPosition >= endPosition) {
        offset = -length;
        transformedSelection = selection.shifted(offset);
      } else if (selectionStartPosition >= startPosition) {
        if (selectionEndPosition > endPosition) {
          offset = startPosition - selectionStartPosition;
          endOffset = selectionStartPosition - endPosition;
          transformedSelection = selection.shifted(offset).endPositionShifted(endOffset);
        } else {
          var Selection = selection.constructor; ///

          transformedSelection = new Selection(startPosition, startPosition);
        }
      } else if (selectionEndPosition > endPosition) {
        endOffset = -length;
        transformedSelection = selection.endPositionShifted(endOffset);
      } else if (selectionEndPosition > startPosition) {
        endOffset = startPosition - selectionEndPosition;
        transformedSelection = selection.endPositionShifted(endOffset);
      } else {
        transformedSelection = selection.clone();
      }

      return transformedSelection;
    }
  }, {
    key: "shifted",
    value: function shifted(offset) {
      var length = this.length,
          position = this.position + offset,
          deleteOperation = DeleteOperation.fromLengthAndPosition(length, position);
      return deleteOperation;
    }
  }, {
    key: "shift",
    value: function shift(operation) {
      var offset = -this.length,
          shiftedOperation = operation.shifted(offset);
      return shiftedOperation;
    }
  }, {
    key: "takenFrom",
    value: function takenFrom(deleteOperation) {
      var length = deleteOperation.length,
          position = deleteOperation.position;

      if (this.position > position && this.length + this.position >= length + position) {
        length = this.position - position;
        deleteOperation = DeleteOperation.fromLengthAndPosition(length, position);
      }

      if (this.position <= position && this.length + this.position < length + position) {
        length = length + position - this.position - this.length;
        position = this.length + this.position;
        deleteOperation = DeleteOperation.fromLengthAndPosition(length, position);
      }

      return deleteOperation;
    }
  }, {
    key: "split",
    value: function split(deleteOperation) {
      var length = deleteOperation.length,
          position = deleteOperation.position;
      length = length - this.length;
      deleteOperation = DeleteOperation.fromLengthAndPosition(length, position);
      return deleteOperation;
    }
  }], [{
    key: "fromLengthAndPosition",
    value: function fromLengthAndPosition(length, position) {
      var type = _types.deleteType,
          ///
      deleteOperation = new DeleteOperation(type, length, position);
      return deleteOperation;
    }
  }, {
    key: "fromJSON",
    value: function fromJSON(json) {
      var type = json["type"],
          length = json["length"],
          position = json["position"],
          deleteOperation = new DeleteOperation(type, length, position);
      return deleteOperation;
    }
  }]);

  return DeleteOperation;
}();

exports["default"] = DeleteOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbGV0ZS5qcyJdLCJuYW1lcyI6WyJEZWxldGVPcGVyYXRpb24iLCJ0eXBlIiwibGVuZ3RoIiwicG9zaXRpb24iLCJmcm9tTGVuZ3RoQW5kUG9zaXRpb24iLCJqc29uIiwib3BlcmF0aW9uIiwidGF1IiwicmhvIiwiY2xvbmUiLCJsZWZ0Iiwic2hpZnQiLCJ0YWtlbkZyb20iLCJzcGxpdCIsIkVtcHR5T3BlcmF0aW9uIiwiZnJvbU5vdGhpbmciLCJjb250ZW50Iiwic3Vic3RyaW5nIiwic2VsZWN0aW9uIiwidHJhbnNmb3JtZWRTZWxlY3Rpb24iLCJzdGFydFBvc2l0aW9uIiwiZW5kUG9zaXRpb24iLCJzZWxlY3Rpb25TdGFydFBvc2l0aW9uIiwiZ2V0U3RhcnRQb3NpdGlvbiIsInNlbGVjdGlvbkVuZFBvc2l0aW9uIiwiZ2V0RW5kUG9zaXRpb24iLCJvZmZzZXQiLCJlbmRPZmZzZXQiLCJzaGlmdGVkIiwiZW5kUG9zaXRpb25TaGlmdGVkIiwiU2VsZWN0aW9uIiwiY29uc3RydWN0b3IiLCJkZWxldGVPcGVyYXRpb24iLCJzaGlmdGVkT3BlcmF0aW9uIiwiZGVsZXRlVHlwZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7QUFFQTs7Ozs7Ozs7OztJQUVxQkEsZTtBQUNuQiwyQkFBWUMsSUFBWixFQUFrQkMsTUFBbEIsRUFBMEJDLFFBQTFCLEVBQW9DO0FBQUE7O0FBQ25DLFNBQUtGLElBQUwsR0FBWUEsSUFBWjtBQUNDLFNBQUtDLE1BQUwsR0FBY0EsTUFBZDtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0Q7Ozs7NEJBRU87QUFDTixhQUFPSCxlQUFlLENBQUNJLHFCQUFoQixDQUFzQyxLQUFLRixNQUEzQyxFQUFtRCxLQUFLQyxRQUF4RCxDQUFQO0FBQ0Q7Ozs2QkFFUTtBQUNQLFVBQU1FLElBQUksR0FBRztBQUNOLGdCQUFRLEtBQUtKLElBRFA7QUFFTCxrQkFBVSxLQUFLQyxNQUZWO0FBR0wsb0JBQVksS0FBS0M7QUFIWixPQUFi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clxuXHJcbmltcG9ydCBFbXB0eU9wZXJhdGlvbiBmcm9tIFwiLi4vb3BlcmF0aW9uL2VtcHR5XCI7XHJcblxyXG5pbXBvcnQgeyBkZWxldGVUeXBlIH0gZnJvbSBcIi4uL3R5cGVzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWxldGVPcGVyYXRpb24ge1xyXG4gIGNvbnN0cnVjdG9yKHR5cGUsIGxlbmd0aCwgcG9zaXRpb24pIHtcclxuXHQgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICB9XHJcblxyXG4gIGNsb25lKCkge1xyXG4gICAgcmV0dXJuIERlbGV0ZU9wZXJhdGlvbi5mcm9tTGVuZ3RoQW5kUG9zaXRpb24odGhpcy5sZW5ndGgsIHRoaXMucG9zaXRpb24pO1xyXG4gIH1cclxuXHJcbiAgdG9KU09OKCkge1xyXG4gICAgY29uc3QganNvbiA9IHtcclxuXHQgICAgICAgICAgXCJ0eXBlXCI6IHRoaXMudHlwZSxcclxuICAgICAgICAgICAgXCJsZW5ndGhcIjogdGhpcy5sZW5ndGgsXHJcbiAgICAgICAgICAgIFwicG9zaXRpb25cIjogdGhpcy5wb3NpdGlvbixcclxuICAgICAgICAgIH07XHJcbiAgICBcclxuICAgIHJldHVybiBqc29uO1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtT3BlcmF0aW9uKG9wZXJhdGlvbikge1xyXG4gICAgc3dpdGNoIChvcGVyYXRpb24udHlwZSkge1xyXG4gICAgICBjYXNlIFwiaW5zZXJ0XCI6XHJcbiAgICAgICAgcmV0dXJuICgodGF1LCByaG8pID0+IHtcclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uIDw9IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gW3RhdS5jbG9uZSgpXTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uID4gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPCByaG8ubGVuZ3RoICsgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFt0YXUubGVmdChyaG8pLnNoaWZ0KHRhdSldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPj0gcmhvLmxlbmd0aCArIHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgIHJldHVybiBbcmhvLnNoaWZ0KHRhdSldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pKG9wZXJhdGlvbiwgdGhpcyk7XHJcblxyXG4gICAgICBjYXNlIFwiZGVsZXRlXCI6XHJcbiAgICAgICAgcmV0dXJuICgodGF1LCByaG8pID0+IHtcclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uIDwgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICh0YXUubGVuZ3RoICsgdGF1LnBvc2l0aW9uIDw9IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgIHJldHVybiBbdGF1LmNsb25lKCldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0YXUubGVuZ3RoICsgdGF1LnBvc2l0aW9uIDw9IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW3Joby50YWtlbkZyb20odGF1KV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRhdS5sZW5ndGggKyB0YXUucG9zaXRpb24gPiByaG8ubGVuZ3RoICsgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFtyaG8uc3BsaXQodGF1KV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uID09PSByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgaWYgKHRhdS5sZW5ndGggKyB0YXUucG9zaXRpb24gPD0gcmhvLmxlbmd0aCArIHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgIHJldHVybiBbRW1wdHlPcGVyYXRpb24uZnJvbU5vdGhpbmcoKV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRhdS5sZW5ndGggKyB0YXUucG9zaXRpb24gPiByaG8ubGVuZ3RoICsgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFtyaG8uc2hpZnQocmhvLnRha2VuRnJvbSh0YXUpKV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uID49IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtyaG8uc2hpZnQodGF1KV07XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA+IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICBpZiAodGF1Lmxlbmd0aCArIHRhdS5wb3NpdGlvbiA8PSByaG8ubGVuZ3RoICsgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFtFbXB0eU9wZXJhdGlvbi5mcm9tTm90aGluZygpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGF1Lmxlbmd0aCArIHRhdS5wb3NpdGlvbiA+IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW3Joby5zaGlmdChyaG8udGFrZW5Gcm9tKHRhdSkpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KShvcGVyYXRpb24sIHRoaXMpO1xyXG5cclxuICAgICAgY2FzZSBcImVtcHR5XCI6XHJcbiAgICAgICAgcmV0dXJuICgodGF1LCByaG8pID0+IHtcclxuXHJcbiAgICAgICAgICByZXR1cm4gW3RhdS5jbG9uZSgpXTtcclxuXHJcbiAgICAgICAgfSkob3BlcmF0aW9uLCB0aGlzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybUNvbnRlbnQoY29udGVudCkge1xyXG4gICAgcmV0dXJuIGNvbnRlbnQuc3Vic3RyaW5nKDAsIHRoaXMucG9zaXRpb24pICsgY29udGVudC5zdWJzdHJpbmcodGhpcy5sZW5ndGggKyB0aGlzLnBvc2l0aW9uKTtcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybVNlbGVjdGlvbihzZWxlY3Rpb24pIHtcclxuICAgIGxldCB0cmFuc2Zvcm1lZFNlbGVjdGlvbjtcclxuXHJcbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLmxlbmd0aCwgIC8vL1xyXG4gICAgICAgICAgc3RhcnRQb3NpdGlvbiA9IHRoaXMucG9zaXRpb24sIC8vL1xyXG4gICAgICAgICAgZW5kUG9zaXRpb24gPSBzdGFydFBvc2l0aW9uICsgbGVuZ3RoLFxyXG4gICAgICAgICAgc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRTdGFydFBvc2l0aW9uKCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRFbmRQb3NpdGlvbigpO1xyXG5cclxuICAgIGxldCBvZmZzZXQsXHJcbiAgICAgICAgZW5kT2Zmc2V0O1xyXG5cclxuICAgIGlmIChmYWxzZSkge1xyXG5cclxuICAgIH0gZWxzZSBpZiAoc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiA+PSBlbmRQb3NpdGlvbikge1xyXG4gICAgICBvZmZzZXQgPSAtbGVuZ3RoO1xyXG5cclxuICAgICAgdHJhbnNmb3JtZWRTZWxlY3Rpb24gPSBzZWxlY3Rpb24uc2hpZnRlZChvZmZzZXQpO1xyXG4gICAgfSBlbHNlIGlmIChzZWxlY3Rpb25TdGFydFBvc2l0aW9uID49IHN0YXJ0UG9zaXRpb24pIHtcclxuICAgICAgaWYgKHNlbGVjdGlvbkVuZFBvc2l0aW9uID4gZW5kUG9zaXRpb24pIHtcclxuICAgICAgICBvZmZzZXQgPSBzdGFydFBvc2l0aW9uIC0gc2VsZWN0aW9uU3RhcnRQb3NpdGlvbjtcclxuICAgICAgICBlbmRPZmZzZXQgPSBzZWxlY3Rpb25TdGFydFBvc2l0aW9uIC0gZW5kUG9zaXRpb247XHJcblxyXG4gICAgICAgIHRyYW5zZm9ybWVkU2VsZWN0aW9uID0gc2VsZWN0aW9uLnNoaWZ0ZWQob2Zmc2V0KS5lbmRQb3NpdGlvblNoaWZ0ZWQoZW5kT2Zmc2V0KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBTZWxlY3Rpb24gPSBzZWxlY3Rpb24uY29uc3RydWN0b3I7ICAvLy9cclxuXHJcbiAgICAgICAgdHJhbnNmb3JtZWRTZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uKHN0YXJ0UG9zaXRpb24sIHN0YXJ0UG9zaXRpb24pO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHNlbGVjdGlvbkVuZFBvc2l0aW9uID4gZW5kUG9zaXRpb24pIHtcclxuICAgICAgZW5kT2Zmc2V0ID0gLWxlbmd0aDtcclxuXHJcbiAgICAgIHRyYW5zZm9ybWVkU2VsZWN0aW9uID0gc2VsZWN0aW9uLmVuZFBvc2l0aW9uU2hpZnRlZChlbmRPZmZzZXQpO1xyXG4gICAgfSBlbHNlIGlmIChzZWxlY3Rpb25FbmRQb3NpdGlvbiA+IHN0YXJ0UG9zaXRpb24pIHtcclxuICAgICAgZW5kT2Zmc2V0ID0gc3RhcnRQb3NpdGlvbiAtIHNlbGVjdGlvbkVuZFBvc2l0aW9uO1xyXG5cclxuICAgICAgdHJhbnNmb3JtZWRTZWxlY3Rpb24gPSBzZWxlY3Rpb24uZW5kUG9zaXRpb25TaGlmdGVkKGVuZE9mZnNldCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0cmFuc2Zvcm1lZFNlbGVjdGlvbiA9IHNlbGVjdGlvbi5jbG9uZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cmFuc2Zvcm1lZFNlbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIHNoaWZ0ZWQob2Zmc2V0KSB7XHJcbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLmxlbmd0aCxcclxuICAgICAgICAgIHBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbiArIG9mZnNldCxcclxuICAgICAgICAgIGRlbGV0ZU9wZXJhdGlvbiA9IERlbGV0ZU9wZXJhdGlvbi5mcm9tTGVuZ3RoQW5kUG9zaXRpb24obGVuZ3RoLCBwb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIGRlbGV0ZU9wZXJhdGlvbjtcclxuICB9XHJcblxyXG4gIHNoaWZ0KG9wZXJhdGlvbikge1xyXG4gICAgY29uc3Qgb2Zmc2V0ID0gLXRoaXMubGVuZ3RoLFxyXG4gICAgICAgICAgc2hpZnRlZE9wZXJhdGlvbiA9IG9wZXJhdGlvbi5zaGlmdGVkKG9mZnNldCk7XHJcblxyXG4gICAgcmV0dXJuIHNoaWZ0ZWRPcGVyYXRpb25cclxuICB9XHJcblxyXG4gIHRha2VuRnJvbShkZWxldGVPcGVyYXRpb24pIHtcclxuICAgIGxldCBsZW5ndGggPSBkZWxldGVPcGVyYXRpb24ubGVuZ3RoLFxyXG4gICAgICAgIHBvc2l0aW9uID0gZGVsZXRlT3BlcmF0aW9uLnBvc2l0aW9uO1xyXG5cclxuICAgIGlmICh0aGlzLnBvc2l0aW9uID4gcG9zaXRpb24gJiYgdGhpcy5sZW5ndGggKyB0aGlzLnBvc2l0aW9uID49IGxlbmd0aCArIHBvc2l0aW9uKSB7XHJcbiAgICAgIGxlbmd0aCA9IHRoaXMucG9zaXRpb24gLSBwb3NpdGlvbjtcclxuXHJcbiAgICAgIGRlbGV0ZU9wZXJhdGlvbiA9IERlbGV0ZU9wZXJhdGlvbi5mcm9tTGVuZ3RoQW5kUG9zaXRpb24obGVuZ3RoLCBwb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMucG9zaXRpb24gPD0gcG9zaXRpb24gJiYgdGhpcy5sZW5ndGggKyB0aGlzLnBvc2l0aW9uIDwgbGVuZ3RoICsgcG9zaXRpb24pIHtcclxuICAgICAgbGVuZ3RoID0gbGVuZ3RoICsgcG9zaXRpb24gLSB0aGlzLnBvc2l0aW9uIC0gdGhpcy5sZW5ndGg7XHJcbiAgICAgIHBvc2l0aW9uID0gdGhpcy5sZW5ndGggKyB0aGlzLnBvc2l0aW9uO1xyXG5cclxuICAgICAgZGVsZXRlT3BlcmF0aW9uID0gRGVsZXRlT3BlcmF0aW9uLmZyb21MZW5ndGhBbmRQb3NpdGlvbihsZW5ndGgsIHBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGVsZXRlT3BlcmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgc3BsaXQoZGVsZXRlT3BlcmF0aW9uKSB7XHJcbiAgICBsZXQgbGVuZ3RoID0gZGVsZXRlT3BlcmF0aW9uLmxlbmd0aCxcclxuICAgICAgICBwb3NpdGlvbiA9IGRlbGV0ZU9wZXJhdGlvbi5wb3NpdGlvbjtcclxuXHJcbiAgICBsZW5ndGggPSBsZW5ndGggLSB0aGlzLmxlbmd0aDtcclxuXHJcbiAgICBkZWxldGVPcGVyYXRpb24gPSBEZWxldGVPcGVyYXRpb24uZnJvbUxlbmd0aEFuZFBvc2l0aW9uKGxlbmd0aCwgcG9zaXRpb24pO1xyXG5cclxuICAgIHJldHVybiBkZWxldGVPcGVyYXRpb247XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbUxlbmd0aEFuZFBvc2l0aW9uKGxlbmd0aCwgcG9zaXRpb24pIHtcclxuICAgIGNvbnN0IHR5cGUgPSBkZWxldGVUeXBlLCAvLy9cclxuICAgICAgICAgIGRlbGV0ZU9wZXJhdGlvbiA9IG5ldyBEZWxldGVPcGVyYXRpb24odHlwZSwgbGVuZ3RoLCBwb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIGRlbGV0ZU9wZXJhdGlvbjtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XHJcbiAgICBjb25zdCB0eXBlID0ganNvbltcInR5cGVcIl0sXHJcbiAgICAgICAgICBsZW5ndGggPSBqc29uW1wibGVuZ3RoXCJdLFxyXG4gICAgICAgICAgcG9zaXRpb24gPSBqc29uW1wicG9zaXRpb25cIl0sXHJcbiAgICAgICAgICBkZWxldGVPcGVyYXRpb24gPSBuZXcgRGVsZXRlT3BlcmF0aW9uKHR5cGUsIGxlbmd0aCwgcG9zaXRpb24pO1xyXG5cclxuICAgIHJldHVybiBkZWxldGVPcGVyYXRpb247XHJcbiAgfVxyXG59XHJcbiJdfQ==