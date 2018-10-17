'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var types = require('../types'),
    EmptyOperation = require('../operation/empty');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9vcGVyYXRpb24vZGVsZXRlLmpzIl0sIm5hbWVzIjpbInR5cGVzIiwicmVxdWlyZSIsIkVtcHR5T3BlcmF0aW9uIiwiZGVsZXRlVHlwZSIsIkRlbGV0ZU9wZXJhdGlvbiIsInR5cGUiLCJsZW5ndGgiLCJwb3NpdGlvbiIsImZyb21MZW5ndGhBbmRQb3NpdGlvbiIsImpzb24iLCJvcGVyYXRpb24iLCJ0YXUiLCJyaG8iLCJjbG9uZSIsImxlZnQiLCJzaGlmdCIsInRha2VuRnJvbSIsInNwbGl0IiwiZnJvbU5vdGhpbmciLCJjb250ZW50Iiwic3Vic3RyaW5nIiwic2VsZWN0aW9uIiwidHJhbnNmb3JtZWRTZWxlY3Rpb24iLCJzdGFydFBvc2l0aW9uIiwiZW5kUG9zaXRpb24iLCJzZWxlY3Rpb25TdGFydFBvc2l0aW9uIiwiZ2V0U3RhcnRQb3NpdGlvbiIsInNlbGVjdGlvbkVuZFBvc2l0aW9uIiwiZ2V0RW5kUG9zaXRpb24iLCJvZmZzZXQiLCJlbmRPZmZzZXQiLCJzaGlmdGVkIiwiZW5kUG9zaXRpb25TaGlmdGVkIiwiU2VsZWN0aW9uIiwiY29uc3RydWN0b3IiLCJkZWxldGVPcGVyYXRpb24iLCJzaGlmdGVkT3BlcmF0aW9uIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBLElBQU1BLFFBQVFDLFFBQVEsVUFBUixDQUFkO0FBQUEsSUFDTUMsaUJBQWlCRCxRQUFRLG9CQUFSLENBRHZCOztJQUdRRSxVLEdBQWVILEssQ0FBZkcsVTs7SUFFRkMsZTtBQUNKLDJCQUFZQyxJQUFaLEVBQWtCQyxNQUFsQixFQUEwQkMsUUFBMUIsRUFBb0M7QUFBQTs7QUFDbkMsU0FBS0YsSUFBTCxHQUFZQSxJQUFaO0FBQ0MsU0FBS0MsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDRDs7Ozs0QkFFTztBQUNOLGFBQU9ILGdCQUFnQkkscUJBQWhCLENBQXNDLEtBQUtGLE1BQTNDLEVB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NkJBRWUxQixJLEVBQU07QUFDcEIsVUFBTUosT0FBT0ksS0FBSyxNQUFMLENBQWI7QUFBQSxVQUNNSCxTQUFTRyxLQUFLLFFBQUwsQ0FEZjtBQUFBLFVBRU1GLFdBQVdFLEtBQUssVUFBTCxDQUZqQjtBQUFBLFVBR00wQixrQkFBa0IsSUFBSS9CLGVBQUosQ0FBb0JDLElBQXBCLEVBQTBCQyxNQUExQixFQUFrQ0MsUUFBbEMsQ0FIeEI7O0FBS0EsYUFBTzRCLGVBQVA7QUFDRDs7Ozs7O0FBR0hFLE9BQU9DLE9BQVAsR0FBaUJsQyxlQUFqQiIsImZpbGUiOiJkZWxldGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCB0eXBlcyA9IHJlcXVpcmUoJy4uL3R5cGVzJyksXHJcbiAgICAgIEVtcHR5T3BlcmF0aW9uID0gcmVxdWlyZSgnLi4vb3BlcmF0aW9uL2VtcHR5Jyk7XHJcblxyXG5jb25zdCB7IGRlbGV0ZVR5cGUgfSA9IHR5cGVzO1xyXG5cclxuY2xhc3MgRGVsZXRlT3BlcmF0aW9uIHtcclxuICBjb25zdHJ1Y3Rvcih0eXBlLCBsZW5ndGgsIHBvc2l0aW9uKSB7XHJcblx0ICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgfVxyXG5cclxuICBjbG9uZSgpIHtcclxuICAgIHJldHVybiBEZWxldGVPcGVyYXRpb24uZnJvbUxlbmd0aEFuZFBvc2l0aW9uKHRoaXMubGVuZ3RoLCB0aGlzLnBvc2l0aW9uKTtcclxuICB9XHJcblxyXG4gIHRvSlNPTigpIHtcclxuICAgIGNvbnN0IGpzb24gPSB7XHJcblx0ICAgICAgICAgIFwidHlwZVwiOiB0aGlzLnR5cGUsXHJcbiAgICAgICAgICAgIFwibGVuZ3RoXCI6IHRoaXMubGVuZ3RoLFxyXG4gICAgICAgICAgICBcInBvc2l0aW9uXCI6IHRoaXMucG9zaXRpb24sXHJcbiAgICAgICAgICB9O1xyXG4gICAgXHJcbiAgICByZXR1cm4ganNvbjtcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybU9wZXJhdGlvbihvcGVyYXRpb24pIHtcclxuICAgIHN3aXRjaCAob3BlcmF0aW9uLnR5cGUpIHtcclxuICAgICAgY2FzZSAnaW5zZXJ0JzpcclxuICAgICAgICByZXR1cm4gKGZ1bmN0aW9uKHRhdSwgcmhvKSB7XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA8PSByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIFt0YXUuY2xvbmUoKV07XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA+IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uIDwgcmhvLmxlbmd0aCArIHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgIHJldHVybiBbdGF1LmxlZnQocmhvKS5zaGlmdCh0YXUpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uID49IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW3Joby5zaGlmdCh0YXUpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KShvcGVyYXRpb24sIHRoaXMpO1xyXG5cclxuICAgICAgY2FzZSAnZGVsZXRlJzpcclxuICAgICAgICByZXR1cm4gKGZ1bmN0aW9uKHRhdSwgcmhvKSB7XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA8IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICBpZiAodGF1Lmxlbmd0aCArIHRhdS5wb3NpdGlvbiA8PSByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW3RhdS5jbG9uZSgpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGF1Lmxlbmd0aCArIHRhdS5wb3NpdGlvbiA8PSByaG8ubGVuZ3RoICsgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFtyaG8udGFrZW5Gcm9tKHRhdSldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0YXUubGVuZ3RoICsgdGF1LnBvc2l0aW9uID4gcmhvLmxlbmd0aCArIHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgIHJldHVybiBbcmhvLnNwbGl0KHRhdSldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA9PT0gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICh0YXUubGVuZ3RoICsgdGF1LnBvc2l0aW9uIDw9IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW0VtcHR5T3BlcmF0aW9uLmZyb21Ob3RoaW5nKCldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0YXUubGVuZ3RoICsgdGF1LnBvc2l0aW9uID4gcmhvLmxlbmd0aCArIHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgIHJldHVybiBbcmhvLnNoaWZ0KHJoby50YWtlbkZyb20odGF1KSldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA+PSByaG8ubGVuZ3RoICsgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbcmhvLnNoaWZ0KHRhdSldO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPiByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgaWYgKHRhdS5sZW5ndGggKyB0YXUucG9zaXRpb24gPD0gcmhvLmxlbmd0aCArIHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgIHJldHVybiBbRW1wdHlPcGVyYXRpb24uZnJvbU5vdGhpbmcoKV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRhdS5sZW5ndGggKyB0YXUucG9zaXRpb24gPiByaG8ubGVuZ3RoICsgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFtyaG8uc2hpZnQocmhvLnRha2VuRnJvbSh0YXUpKV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSkob3BlcmF0aW9uLCB0aGlzKTtcclxuXHJcbiAgICAgIGNhc2UgJ2VtcHR5JzpcclxuICAgICAgICByZXR1cm4gKGZ1bmN0aW9uKHRhdSwgcmhvKSB7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIFt0YXUuY2xvbmUoKV07XHJcblxyXG4gICAgICAgIH0pKG9wZXJhdGlvbiwgdGhpcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1Db250ZW50KGNvbnRlbnQpIHtcclxuICAgIHJldHVybiBjb250ZW50LnN1YnN0cmluZygwLCB0aGlzLnBvc2l0aW9uKSArIGNvbnRlbnQuc3Vic3RyaW5nKHRoaXMubGVuZ3RoICsgdGhpcy5wb3NpdGlvbik7XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1TZWxlY3Rpb24oc2VsZWN0aW9uKSB7XHJcbiAgICBsZXQgdHJhbnNmb3JtZWRTZWxlY3Rpb247XHJcblxyXG4gICAgY29uc3QgbGVuZ3RoID0gdGhpcy5sZW5ndGgsICAvLy9cclxuICAgICAgICAgIHN0YXJ0UG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uLCAvLy9cclxuICAgICAgICAgIGVuZFBvc2l0aW9uID0gc3RhcnRQb3NpdGlvbiArIGxlbmd0aCxcclxuICAgICAgICAgIHNlbGVjdGlvblN0YXJ0UG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0U3RhcnRQb3NpdGlvbigpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kUG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0RW5kUG9zaXRpb24oKTtcclxuXHJcbiAgICBsZXQgb2Zmc2V0LFxyXG4gICAgICAgIGVuZE9mZnNldDtcclxuXHJcbiAgICBpZiAoZmFsc2UpIHtcclxuXHJcbiAgICB9IGVsc2UgaWYgKHNlbGVjdGlvblN0YXJ0UG9zaXRpb24gPj0gZW5kUG9zaXRpb24pIHtcclxuICAgICAgb2Zmc2V0ID0gLWxlbmd0aDtcclxuXHJcbiAgICAgIHRyYW5zZm9ybWVkU2VsZWN0aW9uID0gc2VsZWN0aW9uLnNoaWZ0ZWQob2Zmc2V0KTtcclxuICAgIH0gZWxzZSBpZiAoc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiA+PSBzdGFydFBvc2l0aW9uKSB7XHJcbiAgICAgIGlmIChzZWxlY3Rpb25FbmRQb3NpdGlvbiA+IGVuZFBvc2l0aW9uKSB7XHJcbiAgICAgICAgb2Zmc2V0ID0gc3RhcnRQb3NpdGlvbiAtIHNlbGVjdGlvblN0YXJ0UG9zaXRpb247XHJcbiAgICAgICAgZW5kT2Zmc2V0ID0gc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiAtIGVuZFBvc2l0aW9uO1xyXG5cclxuICAgICAgICB0cmFuc2Zvcm1lZFNlbGVjdGlvbiA9IHNlbGVjdGlvbi5zaGlmdGVkKG9mZnNldCkuZW5kUG9zaXRpb25TaGlmdGVkKGVuZE9mZnNldCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgU2VsZWN0aW9uID0gc2VsZWN0aW9uLmNvbnN0cnVjdG9yOyAgLy8vXHJcblxyXG4gICAgICAgIHRyYW5zZm9ybWVkU2VsZWN0aW9uID0gbmV3IFNlbGVjdGlvbihzdGFydFBvc2l0aW9uLCBzdGFydFBvc2l0aW9uKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChzZWxlY3Rpb25FbmRQb3NpdGlvbiA+IGVuZFBvc2l0aW9uKSB7XHJcbiAgICAgIGVuZE9mZnNldCA9IC1sZW5ndGg7XHJcblxyXG4gICAgICB0cmFuc2Zvcm1lZFNlbGVjdGlvbiA9IHNlbGVjdGlvbi5lbmRQb3NpdGlvblNoaWZ0ZWQoZW5kT2Zmc2V0KTtcclxuICAgIH0gZWxzZSBpZiAoc2VsZWN0aW9uRW5kUG9zaXRpb24gPiBzdGFydFBvc2l0aW9uKSB7XHJcbiAgICAgIGVuZE9mZnNldCA9IHN0YXJ0UG9zaXRpb24gLSBzZWxlY3Rpb25FbmRQb3NpdGlvbjtcclxuXHJcbiAgICAgIHRyYW5zZm9ybWVkU2VsZWN0aW9uID0gc2VsZWN0aW9uLmVuZFBvc2l0aW9uU2hpZnRlZChlbmRPZmZzZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cmFuc2Zvcm1lZFNlbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIHNoaWZ0ZWQob2Zmc2V0KSB7XHJcbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLmxlbmd0aCxcclxuICAgICAgICAgIHBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbiArIG9mZnNldCxcclxuICAgICAgICAgIGRlbGV0ZU9wZXJhdGlvbiA9IERlbGV0ZU9wZXJhdGlvbi5mcm9tTGVuZ3RoQW5kUG9zaXRpb24obGVuZ3RoLCBwb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIGRlbGV0ZU9wZXJhdGlvbjtcclxuICB9XHJcblxyXG4gIHNoaWZ0KG9wZXJhdGlvbikge1xyXG4gICAgY29uc3Qgb2Zmc2V0ID0gLXRoaXMubGVuZ3RoLFxyXG4gICAgICAgICAgc2hpZnRlZE9wZXJhdGlvbiA9IG9wZXJhdGlvbi5zaGlmdGVkKG9mZnNldCk7XHJcblxyXG4gICAgcmV0dXJuIHNoaWZ0ZWRPcGVyYXRpb25cclxuICB9XHJcblxyXG4gIHRha2VuRnJvbShkZWxldGVPcGVyYXRpb24pIHtcclxuICAgIGxldCBsZW5ndGggPSBkZWxldGVPcGVyYXRpb24ubGVuZ3RoLFxyXG4gICAgICAgIHBvc2l0aW9uID0gZGVsZXRlT3BlcmF0aW9uLnBvc2l0aW9uO1xyXG5cclxuICAgIGlmICh0aGlzLnBvc2l0aW9uID4gcG9zaXRpb24gJiYgdGhpcy5sZW5ndGggKyB0aGlzLnBvc2l0aW9uID49IGxlbmd0aCArIHBvc2l0aW9uKSB7XHJcbiAgICAgIGxlbmd0aCA9IHRoaXMucG9zaXRpb24gLSBwb3NpdGlvbjtcclxuXHJcbiAgICAgIGRlbGV0ZU9wZXJhdGlvbiA9IERlbGV0ZU9wZXJhdGlvbi5mcm9tTGVuZ3RoQW5kUG9zaXRpb24obGVuZ3RoLCBwb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMucG9zaXRpb24gPD0gcG9zaXRpb24gJiYgdGhpcy5sZW5ndGggKyB0aGlzLnBvc2l0aW9uIDwgbGVuZ3RoICsgcG9zaXRpb24pIHtcclxuICAgICAgbGVuZ3RoID0gbGVuZ3RoICsgcG9zaXRpb24gLSB0aGlzLnBvc2l0aW9uIC0gdGhpcy5sZW5ndGg7XHJcbiAgICAgIHBvc2l0aW9uID0gdGhpcy5sZW5ndGggKyB0aGlzLnBvc2l0aW9uO1xyXG5cclxuICAgICAgZGVsZXRlT3BlcmF0aW9uID0gRGVsZXRlT3BlcmF0aW9uLmZyb21MZW5ndGhBbmRQb3NpdGlvbihsZW5ndGgsIHBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGVsZXRlT3BlcmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgc3BsaXQoZGVsZXRlT3BlcmF0aW9uKSB7XHJcbiAgICBsZXQgbGVuZ3RoID0gZGVsZXRlT3BlcmF0aW9uLmxlbmd0aCxcclxuICAgICAgICBwb3NpdGlvbiA9IGRlbGV0ZU9wZXJhdGlvbi5wb3NpdGlvbjtcclxuXHJcbiAgICBsZW5ndGggPSBsZW5ndGggLSB0aGlzLmxlbmd0aDtcclxuXHJcbiAgICBkZWxldGVPcGVyYXRpb24gPSBEZWxldGVPcGVyYXRpb24uZnJvbUxlbmd0aEFuZFBvc2l0aW9uKGxlbmd0aCwgcG9zaXRpb24pO1xyXG5cclxuICAgIHJldHVybiBkZWxldGVPcGVyYXRpb247XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbUxlbmd0aEFuZFBvc2l0aW9uKGxlbmd0aCwgcG9zaXRpb24pIHtcclxuICAgIGNvbnN0IHR5cGUgPSBkZWxldGVUeXBlLCAvLy9cclxuICAgICAgICAgIGRlbGV0ZU9wZXJhdGlvbiA9IG5ldyBEZWxldGVPcGVyYXRpb24odHlwZSwgbGVuZ3RoLCBwb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIGRlbGV0ZU9wZXJhdGlvbjtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XHJcbiAgICBjb25zdCB0eXBlID0ganNvbltcInR5cGVcIl0sXHJcbiAgICAgICAgICBsZW5ndGggPSBqc29uW1wibGVuZ3RoXCJdLFxyXG4gICAgICAgICAgcG9zaXRpb24gPSBqc29uW1wicG9zaXRpb25cIl0sXHJcbiAgICAgICAgICBkZWxldGVPcGVyYXRpb24gPSBuZXcgRGVsZXRlT3BlcmF0aW9uKHR5cGUsIGxlbmd0aCwgcG9zaXRpb24pO1xyXG5cclxuICAgIHJldHVybiBkZWxldGVPcGVyYXRpb247XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERlbGV0ZU9wZXJhdGlvbjtcclxuIl19