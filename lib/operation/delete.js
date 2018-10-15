'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EmptyOperation = require('./empty');

var type = 'delete';

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

        return selection.shifted(offset);
      }

      if (selectionStartPosition >= startPosition) {
        if (selectionEndPosition > endPosition) {
          offset = startPosition - selectionStartPosition;
          endOffset = selectionStartPosition - endPosition;

          return selection.shifted(offset).endPositionShifted(endOffset);
        } else {
          var Selection = selection.constructor; ///

          return new Selection(startPosition, startPosition);
        }
      }

      if (selectionEndPosition > endPosition) {
        endOffset = -length;

        return selection.endPositionShifted(endOffset);
      }

      if (selectionEndPosition > startPosition) {
        endOffset = startPosition - selectionEndPosition;

        return selection.endPositionShifted(endOffset);
      }

      return selection.clone();
    }
  }, {
    key: 'shifted',
    value: function shifted(offset) {
      var length = this.length,
          position = this.position + offset;

      return DeleteOperation.fromLengthAndPosition(length, position);
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

        return DeleteOperation.fromLengthAndPosition(length, position);
      }

      if (this.position <= position && this.length + this.position < length + position) {
        length = length + position - this.position - this.length;
        position = this.length + this.position;

        return DeleteOperation.fromLengthAndPosition(length, position);
      }
    }
  }, {
    key: 'split',
    value: function split(deleteOperation) {
      var length = deleteOperation.length,
          position = deleteOperation.position;

      length = length - this.length;

      return DeleteOperation.fromLengthAndPosition(length, position);
    }
  }], [{
    key: 'fromLengthAndPosition',
    value: function fromLengthAndPosition(length, position) {
      return new DeleteOperation(type, length, position);
    }
  }, {
    key: 'fromJSON',
    value: function fromJSON(json) {
      var type = json["type"],
          length = json["length"],
          position = json["position"];

      return new DeleteOperation(type, length, position);
    }
  }]);

  return DeleteOperation;
}();

Object.assign(DeleteOperation, {
  type: type
});

module.exports = DeleteOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9vcGVyYXRpb24vZGVsZXRlLmpzIl0sIm5hbWVzIjpbIkVtcHR5T3BlcmF0aW9uIiwicmVxdWlyZSIsInR5cGUiLCJEZWxldGVPcGVyYXRpb24iLCJsZW5ndGgiLCJwb3NpdGlvbiIsImZyb21MZW5ndGhBbmRQb3NpdGlvbiIsImpzb24iLCJvcGVyYXRpb24iLCJ0YXUiLCJyaG8iLCJjbG9uZSIsImxlZnQiLCJzaGlmdCIsInRha2VuRnJvbSIsInNwbGl0IiwiZnJvbU5vdGhpbmciLCJjb250ZW50Iiwic3Vic3RyaW5nIiwic2VsZWN0aW9uIiwic3RhcnRQb3NpdGlvbiIsImVuZFBvc2l0aW9uIiwic2VsZWN0aW9uU3RhcnRQb3NpdGlvbiIsImdldFN0YXJ0UG9zaXRpb24iLCJzZWxlY3Rpb25FbmRQb3NpdGlvbiIsImdldEVuZFBvc2l0aW9uIiwib2Zmc2V0IiwiZW5kT2Zmc2V0Iiwic2hpZnRlZCIsImVuZFBvc2l0aW9uU2hpZnRlZCIsIlNlbGVjdGlvbiIsImNvbnN0cnVjdG9yIiwiZGVsZXRlT3BlcmF0aW9uIiwiT2JqZWN0IiwiYXNzaWduIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBLElBQU1BLGlCQUFpQkMsUUFBUSxTQUFSLENBQXZCOztBQUVBLElBQU1DLE9BQU8sUUFBYjs7SUFFTUMsZTtBQUNKLDJCQUFZRCxJQUFaLEVBQWtCRSxNQUFsQixFQUEwQkMsUUFBMUIsRUFBb0M7QUFBQTs7QUFDbkMsU0FBS0gsSUFBTCxHQUFZQSxJQUFaO0FBQ0MsU0FBS0UsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDRDs7Ozs0QkFFTztBQUNOLGFBQU9GLGdCQUFnQkcscUJBQWhCLENBQXNDLEtBQUtGLE1BQTNDLEVBQW1ELEtBQUtDLFFBQXhELENBQVA7QUFDRDs7OzZCQUVRO0FBQ1AsVUFBTUUsT0FBTztBQUNOLGdCQUFRLEtBQUtMLElBRFA7QUFFTCxrQkFB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c3RyaWN0JztcclxuXHJcbmNvbnN0IEVtcHR5T3BlcmF0aW9uID0gcmVxdWlyZSgnLi9lbXB0eScpO1xyXG5cclxuY29uc3QgdHlwZSA9ICdkZWxldGUnO1xyXG5cclxuY2xhc3MgRGVsZXRlT3BlcmF0aW9uIHtcclxuICBjb25zdHJ1Y3Rvcih0eXBlLCBsZW5ndGgsIHBvc2l0aW9uKSB7XHJcblx0ICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgfVxyXG5cclxuICBjbG9uZSgpIHtcclxuICAgIHJldHVybiBEZWxldGVPcGVyYXRpb24uZnJvbUxlbmd0aEFuZFBvc2l0aW9uKHRoaXMubGVuZ3RoLCB0aGlzLnBvc2l0aW9uKTtcclxuICB9XHJcblxyXG4gIHRvSlNPTigpIHtcclxuICAgIGNvbnN0IGpzb24gPSB7XHJcblx0ICAgICAgICAgIFwidHlwZVwiOiB0aGlzLnR5cGUsXHJcbiAgICAgICAgICAgIFwibGVuZ3RoXCI6IHRoaXMubGVuZ3RoLFxyXG4gICAgICAgICAgICBcInBvc2l0aW9uXCI6IHRoaXMucG9zaXRpb24sXHJcbiAgICAgICAgICB9O1xyXG4gICAgXHJcbiAgICByZXR1cm4ganNvbjtcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybU9wZXJhdGlvbihvcGVyYXRpb24pIHtcclxuICAgIHN3aXRjaCAob3BlcmF0aW9uLnR5cGUpIHtcclxuICAgICAgY2FzZSAnaW5zZXJ0JzpcclxuICAgICAgICByZXR1cm4gKGZ1bmN0aW9uKHRhdSwgcmhvKSB7XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA8PSByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIChbdGF1LmNsb25lKCldKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uID4gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPCByaG8ubGVuZ3RoICsgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIChbdGF1LmxlZnQocmhvKS5zaGlmdCh0YXUpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA+PSByaG8ubGVuZ3RoICsgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIChbcmhvLnNoaWZ0KHRhdSldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KShvcGVyYXRpb24sIHRoaXMpO1xyXG5cclxuICAgICAgY2FzZSAnZGVsZXRlJzpcclxuICAgICAgICByZXR1cm4gKGZ1bmN0aW9uKHRhdSwgcmhvKSB7XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA8IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICBpZiAodGF1Lmxlbmd0aCArIHRhdS5wb3NpdGlvbiA8PSByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gKFt0YXUuY2xvbmUoKV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0YXUubGVuZ3RoICsgdGF1LnBvc2l0aW9uIDw9IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gKFtyaG8udGFrZW5Gcm9tKHRhdSldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGF1Lmxlbmd0aCArIHRhdS5wb3NpdGlvbiA+IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gKFtyaG8uc3BsaXQodGF1KV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA9PT0gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICh0YXUubGVuZ3RoICsgdGF1LnBvc2l0aW9uIDw9IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gKFtFbXB0eU9wZXJhdGlvbi5mcm9tTm90aGluZygpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRhdS5sZW5ndGggKyB0YXUucG9zaXRpb24gPiByaG8ubGVuZ3RoICsgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIChbcmhvLnNoaWZ0KHJoby50YWtlbkZyb20odGF1KSldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPj0gcmhvLmxlbmd0aCArIHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gKFtyaG8uc2hpZnQodGF1KV0pO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPiByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgaWYgKHRhdS5sZW5ndGggKyB0YXUucG9zaXRpb24gPD0gcmhvLmxlbmd0aCArIHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgIHJldHVybiAoW0VtcHR5T3BlcmF0aW9uLmZyb21Ob3RoaW5nKCldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGF1Lmxlbmd0aCArIHRhdS5wb3NpdGlvbiA+IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gKFtyaG8uc2hpZnQocmhvLnRha2VuRnJvbSh0YXUpKV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pKG9wZXJhdGlvbiwgdGhpcyk7XHJcblxyXG4gICAgICBjYXNlICdlbXB0eSc6XHJcbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbih0YXUsIHJobykge1xyXG5cclxuICAgICAgICAgIHJldHVybiBbdGF1LmNsb25lKCldO1xyXG5cclxuICAgICAgICB9KShvcGVyYXRpb24sIHRoaXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtQ29udGVudChjb250ZW50KSB7XHJcbiAgICByZXR1cm4gY29udGVudC5zdWJzdHJpbmcoMCwgdGhpcy5wb3NpdGlvbikgKyBjb250ZW50LnN1YnN0cmluZyh0aGlzLmxlbmd0aCArIHRoaXMucG9zaXRpb24pO1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtU2VsZWN0aW9uKHNlbGVjdGlvbikge1xyXG4gICAgY29uc3QgbGVuZ3RoID0gdGhpcy5sZW5ndGgsICAvLy9cclxuICAgICAgICAgIHN0YXJ0UG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uLCAvLy9cclxuICAgICAgICAgIGVuZFBvc2l0aW9uID0gc3RhcnRQb3NpdGlvbiArIGxlbmd0aCxcclxuICAgICAgICAgIHNlbGVjdGlvblN0YXJ0UG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0U3RhcnRQb3NpdGlvbigpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kUG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0RW5kUG9zaXRpb24oKTtcclxuXHJcbiAgICBsZXQgb2Zmc2V0LFxyXG4gICAgICAgIGVuZE9mZnNldDtcclxuXHJcbiAgICBpZiAoc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiA+PSBlbmRQb3NpdGlvbikge1xyXG4gICAgICBvZmZzZXQgPSAtbGVuZ3RoO1xyXG5cclxuICAgICAgcmV0dXJuIHNlbGVjdGlvbi5zaGlmdGVkKG9mZnNldCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNlbGVjdGlvblN0YXJ0UG9zaXRpb24gPj0gc3RhcnRQb3NpdGlvbikge1xyXG4gICAgICBpZiAoc2VsZWN0aW9uRW5kUG9zaXRpb24gPiBlbmRQb3NpdGlvbikge1xyXG4gICAgICAgIG9mZnNldCA9IHN0YXJ0UG9zaXRpb24gLSBzZWxlY3Rpb25TdGFydFBvc2l0aW9uO1xyXG4gICAgICAgIGVuZE9mZnNldCA9IHNlbGVjdGlvblN0YXJ0UG9zaXRpb24gLSBlbmRQb3NpdGlvbjtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbi5zaGlmdGVkKG9mZnNldCkuZW5kUG9zaXRpb25TaGlmdGVkKGVuZE9mZnNldCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgU2VsZWN0aW9uID0gc2VsZWN0aW9uLmNvbnN0cnVjdG9yOyAgLy8vXHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgU2VsZWN0aW9uKHN0YXJ0UG9zaXRpb24sIHN0YXJ0UG9zaXRpb24pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNlbGVjdGlvbkVuZFBvc2l0aW9uID4gZW5kUG9zaXRpb24pIHtcclxuICAgICAgZW5kT2Zmc2V0ID0gLWxlbmd0aDtcclxuXHJcbiAgICAgIHJldHVybiBzZWxlY3Rpb24uZW5kUG9zaXRpb25TaGlmdGVkKGVuZE9mZnNldCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNlbGVjdGlvbkVuZFBvc2l0aW9uID4gc3RhcnRQb3NpdGlvbikge1xyXG4gICAgICBlbmRPZmZzZXQgPSBzdGFydFBvc2l0aW9uIC0gc2VsZWN0aW9uRW5kUG9zaXRpb247XHJcblxyXG4gICAgICByZXR1cm4gc2VsZWN0aW9uLmVuZFBvc2l0aW9uU2hpZnRlZChlbmRPZmZzZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzZWxlY3Rpb24uY2xvbmUoKTtcclxuICB9XHJcblxyXG4gIHNoaWZ0ZWQob2Zmc2V0KSB7XHJcbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLmxlbmd0aCxcclxuICAgICAgICAgIHBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbiArIG9mZnNldDtcclxuXHJcbiAgICByZXR1cm4gRGVsZXRlT3BlcmF0aW9uLmZyb21MZW5ndGhBbmRQb3NpdGlvbihsZW5ndGgsIHBvc2l0aW9uKTtcclxuICB9XHJcblxyXG4gIHNoaWZ0KG9wZXJhdGlvbikge1xyXG4gICAgY29uc3Qgb2Zmc2V0ID0gLXRoaXMubGVuZ3RoO1xyXG5cclxuICAgIHJldHVybiAob3BlcmF0aW9uLnNoaWZ0ZWQob2Zmc2V0KSk7XHJcbiAgfVxyXG5cclxuICB0YWtlbkZyb20oZGVsZXRlT3BlcmF0aW9uKSB7XHJcbiAgICBsZXQgbGVuZ3RoID0gZGVsZXRlT3BlcmF0aW9uLmxlbmd0aCxcclxuICAgICAgICBwb3NpdGlvbiA9IGRlbGV0ZU9wZXJhdGlvbi5wb3NpdGlvbjtcclxuXHJcbiAgICBpZiAodGhpcy5wb3NpdGlvbiA+IHBvc2l0aW9uICYmIHRoaXMubGVuZ3RoICsgdGhpcy5wb3NpdGlvbiA+PSBsZW5ndGggKyBwb3NpdGlvbikge1xyXG4gICAgICBsZW5ndGggPSB0aGlzLnBvc2l0aW9uIC0gcG9zaXRpb247XHJcblxyXG4gICAgICByZXR1cm4gRGVsZXRlT3BlcmF0aW9uLmZyb21MZW5ndGhBbmRQb3NpdGlvbihsZW5ndGgsIHBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5wb3NpdGlvbiA8PSBwb3NpdGlvbiAmJiB0aGlzLmxlbmd0aCArIHRoaXMucG9zaXRpb24gPCBsZW5ndGggKyBwb3NpdGlvbikge1xyXG4gICAgICBsZW5ndGggPSBsZW5ndGggKyBwb3NpdGlvbiAtIHRoaXMucG9zaXRpb24gLSB0aGlzLmxlbmd0aDtcclxuICAgICAgcG9zaXRpb24gPSB0aGlzLmxlbmd0aCArIHRoaXMucG9zaXRpb247XHJcblxyXG4gICAgICByZXR1cm4gRGVsZXRlT3BlcmF0aW9uLmZyb21MZW5ndGhBbmRQb3NpdGlvbihsZW5ndGgsIHBvc2l0aW9uKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNwbGl0KGRlbGV0ZU9wZXJhdGlvbikge1xyXG4gICAgbGV0IGxlbmd0aCA9IGRlbGV0ZU9wZXJhdGlvbi5sZW5ndGgsXHJcbiAgICAgICAgcG9zaXRpb24gPSBkZWxldGVPcGVyYXRpb24ucG9zaXRpb247XHJcblxyXG4gICAgbGVuZ3RoID0gbGVuZ3RoIC0gdGhpcy5sZW5ndGg7XHJcblxyXG4gICAgcmV0dXJuIERlbGV0ZU9wZXJhdGlvbi5mcm9tTGVuZ3RoQW5kUG9zaXRpb24obGVuZ3RoLCBwb3NpdGlvbik7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbUxlbmd0aEFuZFBvc2l0aW9uKGxlbmd0aCwgcG9zaXRpb24pIHtcclxuICAgIHJldHVybiBuZXcgRGVsZXRlT3BlcmF0aW9uKHR5cGUsIGxlbmd0aCwgcG9zaXRpb24pO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcclxuICAgIGNvbnN0IHR5cGUgPSBqc29uW1widHlwZVwiXSxcclxuICAgICAgICAgIGxlbmd0aCA9IGpzb25bXCJsZW5ndGhcIl0sXHJcbiAgICAgICAgICBwb3NpdGlvbiA9IGpzb25bXCJwb3NpdGlvblwiXTtcclxuXHJcbiAgICByZXR1cm4gbmV3IERlbGV0ZU9wZXJhdGlvbih0eXBlLCBsZW5ndGgsIHBvc2l0aW9uKTtcclxuICB9XHJcbn1cclxuXHJcbk9iamVjdC5hc3NpZ24oRGVsZXRlT3BlcmF0aW9uLCB7XHJcbiAgdHlwZVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRGVsZXRlT3BlcmF0aW9uO1xyXG4iXX0=