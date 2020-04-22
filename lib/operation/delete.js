"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var types = require("../types"),
    EmptyOperation = require("../operation/empty");

var deleteType = types.deleteType;

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
                return [EmptyOperation.fromNothing()];
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
                return [EmptyOperation.fromNothing()];
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
      var type = deleteType,
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

module.exports = DeleteOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbGV0ZS5qcyJdLCJuYW1lcyI6WyJ0eXBlcyIsInJlcXVpcmUiLCJFbXB0eU9wZXJhdGlvbiIsImRlbGV0ZVR5cGUiLCJEZWxldGVPcGVyYXRpb24iLCJ0eXBlIiwibGVuZ3RoIiwicG9zaXRpb24iLCJmcm9tTGVuZ3RoQW5kUG9zaXRpb24iLCJqc29uIiwib3BlcmF0aW9uIiwidGF1IiwicmhvIiwiY2xvbmUiLCJsZWZ0Iiwic2hpZnQiLCJ0YWtlbkZyb20iLCJzcGxpdCIsImZyb21Ob3RoaW5nIiwiY29udGVudCIsInN1YnN0cmluZyIsInNlbGVjdGlvbiIsInRyYW5zZm9ybWVkU2VsZWN0aW9uIiwic3RhcnRQb3NpdGlvbiIsImVuZFBvc2l0aW9uIiwic2VsZWN0aW9uU3RhcnRQb3NpdGlvbiIsImdldFN0YXJ0UG9zaXRpb24iLCJzZWxlY3Rpb25FbmRQb3NpdGlvbiIsImdldEVuZFBvc2l0aW9uIiwib2Zmc2V0IiwiZW5kT2Zmc2V0Iiwic2hpZnRlZCIsImVuZFBvc2l0aW9uU2hpZnRlZCIsIlNlbGVjdGlvbiIsImNvbnN0cnVjdG9yIiwiZGVsZXRlT3BlcmF0aW9uIiwic2hpZnRlZE9wZXJhdGlvbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQUVBLElBQU1BLEtBQUssR0FBR0MsT0FBTyxDQUFDLFVBQUQsQ0FBckI7QUFBQSxJQUNNQyxjQUFjLEdBQUdELE9BQU8sQ0FBQyxvQkFBRCxDQUQ5Qjs7SUFHUUUsVSxHQUFlSCxLLENBQWZHLFU7O0lBRUZDLGU7QUFDSiwyQkFBWUMsSUFBWixFQUFrQkMsTUFBbEIsRUFBMEJDLFFBQTFCLEVBQW9DO0FBQUE7O0FBQ25DLFNBQUtGLElBQUwsR0FBWUEsSUFBWjtBQUNDLFNBQUtDLE1BQUwsR0FBY0EsTUFBZDtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0Q7Ozs7NEJBRU87QUFDTixhQUFPSCxlQUFlLENBQUNJLHFCQUFoQixDQUFzQyxLQUFLRixNQUEz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O0FBQUEsVUFHTTBCLGVBQWUsR0FBRyxJQUFJL0IsZUFBSixDQUFvQkMsSUFBcEIsRUFBMEJDLE1BQTFCLEVBQWtDQyxRQUFsQyxDQUh4QjtBQUtBLGFBQU80QixlQUFQO0FBQ0Q7Ozs7OztBQUdIRSxNQUFNLENBQUNDLE9BQVAsR0FBaUJsQyxlQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5cclxuY29uc3QgdHlwZXMgPSByZXF1aXJlKFwiLi4vdHlwZXNcIiksXHJcbiAgICAgIEVtcHR5T3BlcmF0aW9uID0gcmVxdWlyZShcIi4uL29wZXJhdGlvbi9lbXB0eVwiKTtcclxuXHJcbmNvbnN0IHsgZGVsZXRlVHlwZSB9ID0gdHlwZXM7XHJcblxyXG5jbGFzcyBEZWxldGVPcGVyYXRpb24ge1xyXG4gIGNvbnN0cnVjdG9yKHR5cGUsIGxlbmd0aCwgcG9zaXRpb24pIHtcclxuXHQgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICB9XHJcblxyXG4gIGNsb25lKCkge1xyXG4gICAgcmV0dXJuIERlbGV0ZU9wZXJhdGlvbi5mcm9tTGVuZ3RoQW5kUG9zaXRpb24odGhpcy5sZW5ndGgsIHRoaXMucG9zaXRpb24pO1xyXG4gIH1cclxuXHJcbiAgdG9KU09OKCkge1xyXG4gICAgY29uc3QganNvbiA9IHtcclxuXHQgICAgICAgICAgXCJ0eXBlXCI6IHRoaXMudHlwZSxcclxuICAgICAgICAgICAgXCJsZW5ndGhcIjogdGhpcy5sZW5ndGgsXHJcbiAgICAgICAgICAgIFwicG9zaXRpb25cIjogdGhpcy5wb3NpdGlvbixcclxuICAgICAgICAgIH07XHJcbiAgICBcclxuICAgIHJldHVybiBqc29uO1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtT3BlcmF0aW9uKG9wZXJhdGlvbikge1xyXG4gICAgc3dpdGNoIChvcGVyYXRpb24udHlwZSkge1xyXG4gICAgICBjYXNlIFwiaW5zZXJ0XCI6XHJcbiAgICAgICAgcmV0dXJuICgodGF1LCByaG8pID0+IHtcclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uIDw9IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gW3RhdS5jbG9uZSgpXTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uID4gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPCByaG8ubGVuZ3RoICsgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFt0YXUubGVmdChyaG8pLnNoaWZ0KHRhdSldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPj0gcmhvLmxlbmd0aCArIHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgIHJldHVybiBbcmhvLnNoaWZ0KHRhdSldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pKG9wZXJhdGlvbiwgdGhpcyk7XHJcblxyXG4gICAgICBjYXNlIFwiZGVsZXRlXCI6XHJcbiAgICAgICAgcmV0dXJuICgodGF1LCByaG8pID0+IHtcclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uIDwgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICh0YXUubGVuZ3RoICsgdGF1LnBvc2l0aW9uIDw9IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgIHJldHVybiBbdGF1LmNsb25lKCldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0YXUubGVuZ3RoICsgdGF1LnBvc2l0aW9uIDw9IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW3Joby50YWtlbkZyb20odGF1KV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRhdS5sZW5ndGggKyB0YXUucG9zaXRpb24gPiByaG8ubGVuZ3RoICsgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFtyaG8uc3BsaXQodGF1KV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uID09PSByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgaWYgKHRhdS5sZW5ndGggKyB0YXUucG9zaXRpb24gPD0gcmhvLmxlbmd0aCArIHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgIHJldHVybiBbRW1wdHlPcGVyYXRpb24uZnJvbU5vdGhpbmcoKV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRhdS5sZW5ndGggKyB0YXUucG9zaXRpb24gPiByaG8ubGVuZ3RoICsgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFtyaG8uc2hpZnQocmhvLnRha2VuRnJvbSh0YXUpKV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uID49IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtyaG8uc2hpZnQodGF1KV07XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA+IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICBpZiAodGF1Lmxlbmd0aCArIHRhdS5wb3NpdGlvbiA8PSByaG8ubGVuZ3RoICsgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFtFbXB0eU9wZXJhdGlvbi5mcm9tTm90aGluZygpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGF1Lmxlbmd0aCArIHRhdS5wb3NpdGlvbiA+IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW3Joby5zaGlmdChyaG8udGFrZW5Gcm9tKHRhdSkpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KShvcGVyYXRpb24sIHRoaXMpO1xyXG5cclxuICAgICAgY2FzZSBcImVtcHR5XCI6XHJcbiAgICAgICAgcmV0dXJuICgodGF1LCByaG8pID0+IHtcclxuXHJcbiAgICAgICAgICByZXR1cm4gW3RhdS5jbG9uZSgpXTtcclxuXHJcbiAgICAgICAgfSkob3BlcmF0aW9uLCB0aGlzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybUNvbnRlbnQoY29udGVudCkge1xyXG4gICAgcmV0dXJuIGNvbnRlbnQuc3Vic3RyaW5nKDAsIHRoaXMucG9zaXRpb24pICsgY29udGVudC5zdWJzdHJpbmcodGhpcy5sZW5ndGggKyB0aGlzLnBvc2l0aW9uKTtcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybVNlbGVjdGlvbihzZWxlY3Rpb24pIHtcclxuICAgIGxldCB0cmFuc2Zvcm1lZFNlbGVjdGlvbjtcclxuXHJcbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLmxlbmd0aCwgIC8vL1xyXG4gICAgICAgICAgc3RhcnRQb3NpdGlvbiA9IHRoaXMucG9zaXRpb24sIC8vL1xyXG4gICAgICAgICAgZW5kUG9zaXRpb24gPSBzdGFydFBvc2l0aW9uICsgbGVuZ3RoLFxyXG4gICAgICAgICAgc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRTdGFydFBvc2l0aW9uKCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRFbmRQb3NpdGlvbigpO1xyXG5cclxuICAgIGxldCBvZmZzZXQsXHJcbiAgICAgICAgZW5kT2Zmc2V0O1xyXG5cclxuICAgIGlmIChmYWxzZSkge1xyXG5cclxuICAgIH0gZWxzZSBpZiAoc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiA+PSBlbmRQb3NpdGlvbikge1xyXG4gICAgICBvZmZzZXQgPSAtbGVuZ3RoO1xyXG5cclxuICAgICAgdHJhbnNmb3JtZWRTZWxlY3Rpb24gPSBzZWxlY3Rpb24uc2hpZnRlZChvZmZzZXQpO1xyXG4gICAgfSBlbHNlIGlmIChzZWxlY3Rpb25TdGFydFBvc2l0aW9uID49IHN0YXJ0UG9zaXRpb24pIHtcclxuICAgICAgaWYgKHNlbGVjdGlvbkVuZFBvc2l0aW9uID4gZW5kUG9zaXRpb24pIHtcclxuICAgICAgICBvZmZzZXQgPSBzdGFydFBvc2l0aW9uIC0gc2VsZWN0aW9uU3RhcnRQb3NpdGlvbjtcclxuICAgICAgICBlbmRPZmZzZXQgPSBzZWxlY3Rpb25TdGFydFBvc2l0aW9uIC0gZW5kUG9zaXRpb247XHJcblxyXG4gICAgICAgIHRyYW5zZm9ybWVkU2VsZWN0aW9uID0gc2VsZWN0aW9uLnNoaWZ0ZWQob2Zmc2V0KS5lbmRQb3NpdGlvblNoaWZ0ZWQoZW5kT2Zmc2V0KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBTZWxlY3Rpb24gPSBzZWxlY3Rpb24uY29uc3RydWN0b3I7ICAvLy9cclxuXHJcbiAgICAgICAgdHJhbnNmb3JtZWRTZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uKHN0YXJ0UG9zaXRpb24sIHN0YXJ0UG9zaXRpb24pO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHNlbGVjdGlvbkVuZFBvc2l0aW9uID4gZW5kUG9zaXRpb24pIHtcclxuICAgICAgZW5kT2Zmc2V0ID0gLWxlbmd0aDtcclxuXHJcbiAgICAgIHRyYW5zZm9ybWVkU2VsZWN0aW9uID0gc2VsZWN0aW9uLmVuZFBvc2l0aW9uU2hpZnRlZChlbmRPZmZzZXQpO1xyXG4gICAgfSBlbHNlIGlmIChzZWxlY3Rpb25FbmRQb3NpdGlvbiA+IHN0YXJ0UG9zaXRpb24pIHtcclxuICAgICAgZW5kT2Zmc2V0ID0gc3RhcnRQb3NpdGlvbiAtIHNlbGVjdGlvbkVuZFBvc2l0aW9uO1xyXG5cclxuICAgICAgdHJhbnNmb3JtZWRTZWxlY3Rpb24gPSBzZWxlY3Rpb24uZW5kUG9zaXRpb25TaGlmdGVkKGVuZE9mZnNldCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0cmFuc2Zvcm1lZFNlbGVjdGlvbiA9IHNlbGVjdGlvbi5jbG9uZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cmFuc2Zvcm1lZFNlbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIHNoaWZ0ZWQob2Zmc2V0KSB7XHJcbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLmxlbmd0aCxcclxuICAgICAgICAgIHBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbiArIG9mZnNldCxcclxuICAgICAgICAgIGRlbGV0ZU9wZXJhdGlvbiA9IERlbGV0ZU9wZXJhdGlvbi5mcm9tTGVuZ3RoQW5kUG9zaXRpb24obGVuZ3RoLCBwb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIGRlbGV0ZU9wZXJhdGlvbjtcclxuICB9XHJcblxyXG4gIHNoaWZ0KG9wZXJhdGlvbikge1xyXG4gICAgY29uc3Qgb2Zmc2V0ID0gLXRoaXMubGVuZ3RoLFxyXG4gICAgICAgICAgc2hpZnRlZE9wZXJhdGlvbiA9IG9wZXJhdGlvbi5zaGlmdGVkKG9mZnNldCk7XHJcblxyXG4gICAgcmV0dXJuIHNoaWZ0ZWRPcGVyYXRpb25cclxuICB9XHJcblxyXG4gIHRha2VuRnJvbShkZWxldGVPcGVyYXRpb24pIHtcclxuICAgIGxldCBsZW5ndGggPSBkZWxldGVPcGVyYXRpb24ubGVuZ3RoLFxyXG4gICAgICAgIHBvc2l0aW9uID0gZGVsZXRlT3BlcmF0aW9uLnBvc2l0aW9uO1xyXG5cclxuICAgIGlmICh0aGlzLnBvc2l0aW9uID4gcG9zaXRpb24gJiYgdGhpcy5sZW5ndGggKyB0aGlzLnBvc2l0aW9uID49IGxlbmd0aCArIHBvc2l0aW9uKSB7XHJcbiAgICAgIGxlbmd0aCA9IHRoaXMucG9zaXRpb24gLSBwb3NpdGlvbjtcclxuXHJcbiAgICAgIGRlbGV0ZU9wZXJhdGlvbiA9IERlbGV0ZU9wZXJhdGlvbi5mcm9tTGVuZ3RoQW5kUG9zaXRpb24obGVuZ3RoLCBwb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMucG9zaXRpb24gPD0gcG9zaXRpb24gJiYgdGhpcy5sZW5ndGggKyB0aGlzLnBvc2l0aW9uIDwgbGVuZ3RoICsgcG9zaXRpb24pIHtcclxuICAgICAgbGVuZ3RoID0gbGVuZ3RoICsgcG9zaXRpb24gLSB0aGlzLnBvc2l0aW9uIC0gdGhpcy5sZW5ndGg7XHJcbiAgICAgIHBvc2l0aW9uID0gdGhpcy5sZW5ndGggKyB0aGlzLnBvc2l0aW9uO1xyXG5cclxuICAgICAgZGVsZXRlT3BlcmF0aW9uID0gRGVsZXRlT3BlcmF0aW9uLmZyb21MZW5ndGhBbmRQb3NpdGlvbihsZW5ndGgsIHBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGVsZXRlT3BlcmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgc3BsaXQoZGVsZXRlT3BlcmF0aW9uKSB7XHJcbiAgICBsZXQgbGVuZ3RoID0gZGVsZXRlT3BlcmF0aW9uLmxlbmd0aCxcclxuICAgICAgICBwb3NpdGlvbiA9IGRlbGV0ZU9wZXJhdGlvbi5wb3NpdGlvbjtcclxuXHJcbiAgICBsZW5ndGggPSBsZW5ndGggLSB0aGlzLmxlbmd0aDtcclxuXHJcbiAgICBkZWxldGVPcGVyYXRpb24gPSBEZWxldGVPcGVyYXRpb24uZnJvbUxlbmd0aEFuZFBvc2l0aW9uKGxlbmd0aCwgcG9zaXRpb24pO1xyXG5cclxuICAgIHJldHVybiBkZWxldGVPcGVyYXRpb247XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbUxlbmd0aEFuZFBvc2l0aW9uKGxlbmd0aCwgcG9zaXRpb24pIHtcclxuICAgIGNvbnN0IHR5cGUgPSBkZWxldGVUeXBlLCAvLy9cclxuICAgICAgICAgIGRlbGV0ZU9wZXJhdGlvbiA9IG5ldyBEZWxldGVPcGVyYXRpb24odHlwZSwgbGVuZ3RoLCBwb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIGRlbGV0ZU9wZXJhdGlvbjtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XHJcbiAgICBjb25zdCB0eXBlID0ganNvbltcInR5cGVcIl0sXHJcbiAgICAgICAgICBsZW5ndGggPSBqc29uW1wibGVuZ3RoXCJdLFxyXG4gICAgICAgICAgcG9zaXRpb24gPSBqc29uW1wicG9zaXRpb25cIl0sXHJcbiAgICAgICAgICBkZWxldGVPcGVyYXRpb24gPSBuZXcgRGVsZXRlT3BlcmF0aW9uKHR5cGUsIGxlbmd0aCwgcG9zaXRpb24pO1xyXG5cclxuICAgIHJldHVybiBkZWxldGVPcGVyYXRpb247XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERlbGV0ZU9wZXJhdGlvbjtcclxuIl19