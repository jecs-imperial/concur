'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var types = require('../types'),
    EmptyOperation = require('./empty');

var deleteType = types.deleteType;

var DeleteOperation = function () {
  function DeleteOperation(type, length, position) {
    _classCallCheck(this, DeleteOperation);

    this.type = type;
    this.length = length;
    this.position = position;
  }

  _createClass(DeleteOperation, [{
    key: 'clone',
    value: function clone() {
      return DeleteOperation.fromLengthAndPosition(this.length, this.position);
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
    key: 'transformSelection',
    value: function transformSelection(selection) {
      var transformedSelection = void 0;

      var length = this.length,
          ///
      startPosition = this.position,
          ///
      endPosition = startPosition + length,
          selectionStartPosition = selection.getStartPosition(),
          selectionEndPosition = selection.getEndPosition();

      var offset = void 0,
          endOffset = void 0;

      if (selectionStartPosition >= endPosition) {
        offset = -length;

        transformedSelection = selection.shifted(offset);
      }

      if (selectionStartPosition >= startPosition) {
        if (selectionEndPosition > endPosition) {
          offset = startPosition - selectionStartPosition;
          endOffset = selectionStartPosition - endPosition;

          transformedSelection = selection.shifted(offset).endPositionShifted(endOffset);
        } else {
          var Selection = selection.constructor; ///

          transformedSelection = new Selection(startPosition, startPosition);
        }
      }

      if (selectionEndPosition > endPosition) {
        endOffset = -length;

        transformedSelection = selection.endPositionShifted(endOffset);
      }

      if (selectionEndPosition > startPosition) {
        endOffset = startPosition - selectionEndPosition;

        transformedSelection = selection.endPositionShifted(endOffset);
      }

      return transformedSelection;
    }
  }, {
    key: 'shifted',
    value: function shifted(offset) {
      var length = this.length,
          position = this.position + offset,
          deleteOperation = DeleteOperation.fromLengthAndPosition(length, position);

      return deleteOperation;
    }
  }, {
    key: 'shift',
    value: function shift(operation) {
      var offset = -this.length,
          shiftedOperation = operation.shifted(offset);

      return shiftedOperation;
    }
  }, {
    key: 'takenFrom',
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
    key: 'split',
    value: function split(deleteOperation) {
      var length = deleteOperation.length,
          position = deleteOperation.position;

      length = length - this.length;

      deleteOperation = DeleteOperation.fromLengthAndPosition(length, position);

      return deleteOperation;
    }
  }], [{
    key: 'fromLengthAndPosition',
    value: function fromLengthAndPosition(length, position) {
      var type = deleteType,
          ///
      deleteOperation = new DeleteOperation(type, length, position);

      return deleteOperation;
    }
  }, {
    key: 'fromJSON',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9vcGVyYXRpb24vZGVsZXRlLmpzIl0sIm5hbWVzIjpbInR5cGVzIiwicmVxdWlyZSIsIkVtcHR5T3BlcmF0aW9uIiwiZGVsZXRlVHlwZSIsIkRlbGV0ZU9wZXJhdGlvbiIsInR5cGUiLCJsZW5ndGgiLCJwb3NpdGlvbiIsImZyb21MZW5ndGhBbmRQb3NpdGlvbiIsImpzb24iLCJvcGVyYXRpb24iLCJ0YXUiLCJyaG8iLCJjbG9uZSIsImxlZnQiLCJzaGlmdCIsInRha2VuRnJvbSIsInNwbGl0IiwiZnJvbU5vdGhpbmciLCJjb250ZW50Iiwic3Vic3RyaW5nIiwic2VsZWN0aW9uIiwidHJhbnNmb3JtZWRTZWxlY3Rpb24iLCJzdGFydFBvc2l0aW9uIiwiZW5kUG9zaXRpb24iLCJzZWxlY3Rpb25TdGFydFBvc2l0aW9uIiwiZ2V0U3RhcnRQb3NpdGlvbiIsInNlbGVjdGlvbkVuZFBvc2l0aW9uIiwiZ2V0RW5kUG9zaXRpb24iLCJvZmZzZXQiLCJlbmRPZmZzZXQiLCJzaGlmdGVkIiwiZW5kUG9zaXRpb25TaGlmdGVkIiwiU2VsZWN0aW9uIiwiY29uc3RydWN0b3IiLCJkZWxldGVPcGVyYXRpb24iLCJzaGlmdGVkT3BlcmF0aW9uIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBLElBQU1BLFFBQVFDLFFBQVEsVUFBUixDQUFkO0FBQUEsSUFDTUMsaUJBQWlCRCxRQUFRLFNBQVIsQ0FEdkI7O0lBR1FFLFUsR0FBZUgsSyxDQUFmRyxVOztJQUVGQyxlO0FBQ0osMkJBQVlDLElBQVosRUFBa0JDLE1BQWxCLEVBQTBCQyxRQUExQixFQUFvQztBQUFBOztBQUNuQyxTQUFLRixJQUFMLEdBQVlBLElBQVo7QUFDQyxTQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNEOzs7OzRCQUVPO0FBQ04sYUFBT0gsZ0JBQWdCSSxxQkFBaEIsQ0FBc0MsS0FBS0YsTUFBM0MsRUFB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Q0FBYjtBQUFBLFVBQ01ILFNBQVNHLEtBQUssUUFBTCxDQURmO0FBQUEsVUFFTUYsV0FBV0UsS0FBSyxVQUFMLENBRmpCO0FBQUEsVUFHTTBCLGtCQUFrQixJQUFJL0IsZUFBSixDQUFvQkMsSUFBcEIsRUFBMEJDLE1BQTFCLEVBQWtDQyxRQUFsQyxDQUh4Qjs7QUFLQSxhQUFPNEIsZUFBUDtBQUNEOzs7Ozs7QUFHSEUsT0FBT0MsT0FBUCxHQUFpQmxDLGVBQWpCIiwiZmlsZSI6ImRlbGV0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IHR5cGVzID0gcmVxdWlyZSgnLi4vdHlwZXMnKSxcclxuICAgICAgRW1wdHlPcGVyYXRpb24gPSByZXF1aXJlKCcuL2VtcHR5Jyk7XHJcblxyXG5jb25zdCB7IGRlbGV0ZVR5cGUgfSA9IHR5cGVzO1xyXG5cclxuY2xhc3MgRGVsZXRlT3BlcmF0aW9uIHtcclxuICBjb25zdHJ1Y3Rvcih0eXBlLCBsZW5ndGgsIHBvc2l0aW9uKSB7XHJcblx0ICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgfVxyXG5cclxuICBjbG9uZSgpIHtcclxuICAgIHJldHVybiBEZWxldGVPcGVyYXRpb24uZnJvbUxlbmd0aEFuZFBvc2l0aW9uKHRoaXMubGVuZ3RoLCB0aGlzLnBvc2l0aW9uKTtcclxuICB9XHJcblxyXG4gIHRvSlNPTigpIHtcclxuICAgIGNvbnN0IGpzb24gPSB7XHJcblx0ICAgICAgICAgIFwidHlwZVwiOiB0aGlzLnR5cGUsXHJcbiAgICAgICAgICAgIFwibGVuZ3RoXCI6IHRoaXMubGVuZ3RoLFxyXG4gICAgICAgICAgICBcInBvc2l0aW9uXCI6IHRoaXMucG9zaXRpb24sXHJcbiAgICAgICAgICB9O1xyXG4gICAgXHJcbiAgICByZXR1cm4ganNvbjtcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybU9wZXJhdGlvbihvcGVyYXRpb24pIHtcclxuICAgIHN3aXRjaCAob3BlcmF0aW9uLnR5cGUpIHtcclxuICAgICAgY2FzZSAnaW5zZXJ0JzpcclxuICAgICAgICByZXR1cm4gKGZ1bmN0aW9uKHRhdSwgcmhvKSB7XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA8PSByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIFt0YXUuY2xvbmUoKV07XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA+IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uIDwgcmhvLmxlbmd0aCArIHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgIHJldHVybiBbdGF1LmxlZnQocmhvKS5zaGlmdCh0YXUpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uID49IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW3Joby5zaGlmdCh0YXUpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KShvcGVyYXRpb24sIHRoaXMpO1xyXG5cclxuICAgICAgY2FzZSAnZGVsZXRlJzpcclxuICAgICAgICByZXR1cm4gKGZ1bmN0aW9uKHRhdSwgcmhvKSB7XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA8IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICBpZiAodGF1Lmxlbmd0aCArIHRhdS5wb3NpdGlvbiA8PSByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW3RhdS5jbG9uZSgpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGF1Lmxlbmd0aCArIHRhdS5wb3NpdGlvbiA8PSByaG8ubGVuZ3RoICsgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFtyaG8udGFrZW5Gcm9tKHRhdSldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0YXUubGVuZ3RoICsgdGF1LnBvc2l0aW9uID4gcmhvLmxlbmd0aCArIHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgIHJldHVybiBbcmhvLnNwbGl0KHRhdSldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA9PT0gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICh0YXUubGVuZ3RoICsgdGF1LnBvc2l0aW9uIDw9IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW0VtcHR5T3BlcmF0aW9uLmZyb21Ob3RoaW5nKCldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0YXUubGVuZ3RoICsgdGF1LnBvc2l0aW9uID4gcmhvLmxlbmd0aCArIHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgIHJldHVybiBbcmhvLnNoaWZ0KHJoby50YWtlbkZyb20odGF1KSldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA+PSByaG8ubGVuZ3RoICsgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbcmhvLnNoaWZ0KHRhdSldO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPiByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgaWYgKHRhdS5sZW5ndGggKyB0YXUucG9zaXRpb24gPD0gcmhvLmxlbmd0aCArIHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgIHJldHVybiBbRW1wdHlPcGVyYXRpb24uZnJvbU5vdGhpbmcoKV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRhdS5sZW5ndGggKyB0YXUucG9zaXRpb24gPiByaG8ubGVuZ3RoICsgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFtyaG8uc2hpZnQocmhvLnRha2VuRnJvbSh0YXUpKV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSkob3BlcmF0aW9uLCB0aGlzKTtcclxuXHJcbiAgICAgIGNhc2UgJ2VtcHR5JzpcclxuICAgICAgICByZXR1cm4gKGZ1bmN0aW9uKHRhdSwgcmhvKSB7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIFt0YXUuY2xvbmUoKV07XHJcblxyXG4gICAgICAgIH0pKG9wZXJhdGlvbiwgdGhpcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1Db250ZW50KGNvbnRlbnQpIHtcclxuICAgIHJldHVybiBjb250ZW50LnN1YnN0cmluZygwLCB0aGlzLnBvc2l0aW9uKSArIGNvbnRlbnQuc3Vic3RyaW5nKHRoaXMubGVuZ3RoICsgdGhpcy5wb3NpdGlvbik7XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1TZWxlY3Rpb24oc2VsZWN0aW9uKSB7XHJcbiAgICBsZXQgdHJhbnNmb3JtZWRTZWxlY3Rpb247XHJcblxyXG4gICAgY29uc3QgbGVuZ3RoID0gdGhpcy5sZW5ndGgsICAvLy9cclxuICAgICAgICAgIHN0YXJ0UG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uLCAvLy9cclxuICAgICAgICAgIGVuZFBvc2l0aW9uID0gc3RhcnRQb3NpdGlvbiArIGxlbmd0aCxcclxuICAgICAgICAgIHNlbGVjdGlvblN0YXJ0UG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0U3RhcnRQb3NpdGlvbigpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kUG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0RW5kUG9zaXRpb24oKTtcclxuXHJcbiAgICBsZXQgb2Zmc2V0LFxyXG4gICAgICAgIGVuZE9mZnNldDtcclxuXHJcbiAgICBpZiAoc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiA+PSBlbmRQb3NpdGlvbikge1xyXG4gICAgICBvZmZzZXQgPSAtbGVuZ3RoO1xyXG5cclxuICAgICAgdHJhbnNmb3JtZWRTZWxlY3Rpb24gPSBzZWxlY3Rpb24uc2hpZnRlZChvZmZzZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzZWxlY3Rpb25TdGFydFBvc2l0aW9uID49IHN0YXJ0UG9zaXRpb24pIHtcclxuICAgICAgaWYgKHNlbGVjdGlvbkVuZFBvc2l0aW9uID4gZW5kUG9zaXRpb24pIHtcclxuICAgICAgICBvZmZzZXQgPSBzdGFydFBvc2l0aW9uIC0gc2VsZWN0aW9uU3RhcnRQb3NpdGlvbjtcclxuICAgICAgICBlbmRPZmZzZXQgPSBzZWxlY3Rpb25TdGFydFBvc2l0aW9uIC0gZW5kUG9zaXRpb247XHJcblxyXG4gICAgICAgIHRyYW5zZm9ybWVkU2VsZWN0aW9uID0gc2VsZWN0aW9uLnNoaWZ0ZWQob2Zmc2V0KS5lbmRQb3NpdGlvblNoaWZ0ZWQoZW5kT2Zmc2V0KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBTZWxlY3Rpb24gPSBzZWxlY3Rpb24uY29uc3RydWN0b3I7ICAvLy9cclxuXHJcbiAgICAgICAgdHJhbnNmb3JtZWRTZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uKHN0YXJ0UG9zaXRpb24sIHN0YXJ0UG9zaXRpb24pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNlbGVjdGlvbkVuZFBvc2l0aW9uID4gZW5kUG9zaXRpb24pIHtcclxuICAgICAgZW5kT2Zmc2V0ID0gLWxlbmd0aDtcclxuXHJcbiAgICAgIHRyYW5zZm9ybWVkU2VsZWN0aW9uID0gc2VsZWN0aW9uLmVuZFBvc2l0aW9uU2hpZnRlZChlbmRPZmZzZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzZWxlY3Rpb25FbmRQb3NpdGlvbiA+IHN0YXJ0UG9zaXRpb24pIHtcclxuICAgICAgZW5kT2Zmc2V0ID0gc3RhcnRQb3NpdGlvbiAtIHNlbGVjdGlvbkVuZFBvc2l0aW9uO1xyXG5cclxuICAgICAgdHJhbnNmb3JtZWRTZWxlY3Rpb24gPSBzZWxlY3Rpb24uZW5kUG9zaXRpb25TaGlmdGVkKGVuZE9mZnNldCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRyYW5zZm9ybWVkU2VsZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgc2hpZnRlZChvZmZzZXQpIHtcclxuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMubGVuZ3RoLFxyXG4gICAgICAgICAgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uICsgb2Zmc2V0LFxyXG4gICAgICAgICAgZGVsZXRlT3BlcmF0aW9uID0gRGVsZXRlT3BlcmF0aW9uLmZyb21MZW5ndGhBbmRQb3NpdGlvbihsZW5ndGgsIHBvc2l0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gZGVsZXRlT3BlcmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgc2hpZnQob3BlcmF0aW9uKSB7XHJcbiAgICBjb25zdCBvZmZzZXQgPSAtdGhpcy5sZW5ndGgsXHJcbiAgICAgICAgICBzaGlmdGVkT3BlcmF0aW9uID0gb3BlcmF0aW9uLnNoaWZ0ZWQob2Zmc2V0KTtcclxuXHJcbiAgICByZXR1cm4gc2hpZnRlZE9wZXJhdGlvblxyXG4gIH1cclxuXHJcbiAgdGFrZW5Gcm9tKGRlbGV0ZU9wZXJhdGlvbikge1xyXG4gICAgbGV0IGxlbmd0aCA9IGRlbGV0ZU9wZXJhdGlvbi5sZW5ndGgsXHJcbiAgICAgICAgcG9zaXRpb24gPSBkZWxldGVPcGVyYXRpb24ucG9zaXRpb247XHJcblxyXG4gICAgaWYgKHRoaXMucG9zaXRpb24gPiBwb3NpdGlvbiAmJiB0aGlzLmxlbmd0aCArIHRoaXMucG9zaXRpb24gPj0gbGVuZ3RoICsgcG9zaXRpb24pIHtcclxuICAgICAgbGVuZ3RoID0gdGhpcy5wb3NpdGlvbiAtIHBvc2l0aW9uO1xyXG5cclxuICAgICAgZGVsZXRlT3BlcmF0aW9uID0gRGVsZXRlT3BlcmF0aW9uLmZyb21MZW5ndGhBbmRQb3NpdGlvbihsZW5ndGgsIHBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5wb3NpdGlvbiA8PSBwb3NpdGlvbiAmJiB0aGlzLmxlbmd0aCArIHRoaXMucG9zaXRpb24gPCBsZW5ndGggKyBwb3NpdGlvbikge1xyXG4gICAgICBsZW5ndGggPSBsZW5ndGggKyBwb3NpdGlvbiAtIHRoaXMucG9zaXRpb24gLSB0aGlzLmxlbmd0aDtcclxuICAgICAgcG9zaXRpb24gPSB0aGlzLmxlbmd0aCArIHRoaXMucG9zaXRpb247XHJcblxyXG4gICAgICBkZWxldGVPcGVyYXRpb24gPSBEZWxldGVPcGVyYXRpb24uZnJvbUxlbmd0aEFuZFBvc2l0aW9uKGxlbmd0aCwgcG9zaXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkZWxldGVPcGVyYXRpb247XHJcbiAgfVxyXG5cclxuICBzcGxpdChkZWxldGVPcGVyYXRpb24pIHtcclxuICAgIGxldCBsZW5ndGggPSBkZWxldGVPcGVyYXRpb24ubGVuZ3RoLFxyXG4gICAgICAgIHBvc2l0aW9uID0gZGVsZXRlT3BlcmF0aW9uLnBvc2l0aW9uO1xyXG5cclxuICAgIGxlbmd0aCA9IGxlbmd0aCAtIHRoaXMubGVuZ3RoO1xyXG5cclxuICAgIGRlbGV0ZU9wZXJhdGlvbiA9IERlbGV0ZU9wZXJhdGlvbi5mcm9tTGVuZ3RoQW5kUG9zaXRpb24obGVuZ3RoLCBwb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIGRlbGV0ZU9wZXJhdGlvbjtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tTGVuZ3RoQW5kUG9zaXRpb24obGVuZ3RoLCBwb3NpdGlvbikge1xyXG4gICAgY29uc3QgdHlwZSA9IGRlbGV0ZVR5cGUsIC8vL1xyXG4gICAgICAgICAgZGVsZXRlT3BlcmF0aW9uID0gbmV3IERlbGV0ZU9wZXJhdGlvbih0eXBlLCBsZW5ndGgsIHBvc2l0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gZGVsZXRlT3BlcmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcclxuICAgIGNvbnN0IHR5cGUgPSBqc29uW1widHlwZVwiXSxcclxuICAgICAgICAgIGxlbmd0aCA9IGpzb25bXCJsZW5ndGhcIl0sXHJcbiAgICAgICAgICBwb3NpdGlvbiA9IGpzb25bXCJwb3NpdGlvblwiXSxcclxuICAgICAgICAgIGRlbGV0ZU9wZXJhdGlvbiA9IG5ldyBEZWxldGVPcGVyYXRpb24odHlwZSwgbGVuZ3RoLCBwb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIGRlbGV0ZU9wZXJhdGlvbjtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRGVsZXRlT3BlcmF0aW9uO1xyXG4iXX0=