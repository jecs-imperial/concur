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
      } else {
        transformedSelection = selection.clone();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9vcGVyYXRpb24vZGVsZXRlLmpzIl0sIm5hbWVzIjpbInR5cGVzIiwicmVxdWlyZSIsIkVtcHR5T3BlcmF0aW9uIiwiZGVsZXRlVHlwZSIsIkRlbGV0ZU9wZXJhdGlvbiIsInR5cGUiLCJsZW5ndGgiLCJwb3NpdGlvbiIsImZyb21MZW5ndGhBbmRQb3NpdGlvbiIsImpzb24iLCJvcGVyYXRpb24iLCJ0YXUiLCJyaG8iLCJjbG9uZSIsImxlZnQiLCJzaGlmdCIsInRha2VuRnJvbSIsInNwbGl0IiwiZnJvbU5vdGhpbmciLCJjb250ZW50Iiwic3Vic3RyaW5nIiwic2VsZWN0aW9uIiwidHJhbnNmb3JtZWRTZWxlY3Rpb24iLCJzdGFydFBvc2l0aW9uIiwiZW5kUG9zaXRpb24iLCJzZWxlY3Rpb25TdGFydFBvc2l0aW9uIiwiZ2V0U3RhcnRQb3NpdGlvbiIsInNlbGVjdGlvbkVuZFBvc2l0aW9uIiwiZ2V0RW5kUG9zaXRpb24iLCJvZmZzZXQiLCJlbmRPZmZzZXQiLCJzaGlmdGVkIiwiZW5kUG9zaXRpb25TaGlmdGVkIiwiU2VsZWN0aW9uIiwiY29uc3RydWN0b3IiLCJkZWxldGVPcGVyYXRpb24iLCJzaGlmdGVkT3BlcmF0aW9uIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBLElBQU1BLFFBQVFDLFFBQVEsVUFBUixDQUFkO0FBQUEsSUFDTUMsaUJBQWlCRCxRQUFRLG9CQUFSLENBRHZCOztJQUdRRSxVLEdBQWVILEssQ0FBZkcsVTs7SUFFRkMsZTtBQUNKLDJCQUFZQyxJQUFaLEVBQWtCQyxNQUFsQixFQUEwQkMsUUFBMUIsRUFBb0M7QUFBQTs7QUFDbkMsU0FBS0YsSUFBTCxHQUFZQSxJQUFaO0FBQ0MsU0FBS0MsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDRDs7Ozs0QkFFTztBQUNOLGFBQU9ILGdCQUFnQkkscUJBQWhCLENBQXNDLEtBQUtGLE1BQTNDLEVB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QixFQUFrQ0MsUUFBbEMsQ0FEeEI7O0FBR0EsYUFBTzRCLGVBQVA7QUFDRDs7OzZCQUVlMUIsSSxFQUFNO0FBQ3BCLFVBQU1KLE9BQU9JLEtBQUssTUFBTCxDQUFiO0FBQUEsVUFDTUgsU0FBU0csS0FBSyxRQUFMLENBRGY7QUFBQSxVQUVNRixXQUFXRSxLQUFLLFVBQUwsQ0FGakI7QUFBQSxVQUdNMEIsa0JBQWtCLElBQUkvQixlQUFKLENBQW9CQyxJQUFwQixFQUEwQkMsTUFBMUIsRUFBa0NDLFFBQWxDLENBSHhCOztBQUtBLGFBQU80QixlQUFQO0FBQ0Q7Ozs7OztBQUdIRSxPQUFPQyxPQUFQLEdBQWlCbEMsZUFBakIiLCJmaWxlIjoiZGVsZXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgdHlwZXMgPSByZXF1aXJlKCcuLi90eXBlcycpLFxyXG4gICAgICBFbXB0eU9wZXJhdGlvbiA9IHJlcXVpcmUoJy4uL29wZXJhdGlvbi9lbXB0eScpO1xyXG5cclxuY29uc3QgeyBkZWxldGVUeXBlIH0gPSB0eXBlcztcclxuXHJcbmNsYXNzIERlbGV0ZU9wZXJhdGlvbiB7XHJcbiAgY29uc3RydWN0b3IodHlwZSwgbGVuZ3RoLCBwb3NpdGlvbikge1xyXG5cdCAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gIH1cclxuXHJcbiAgY2xvbmUoKSB7XHJcbiAgICByZXR1cm4gRGVsZXRlT3BlcmF0aW9uLmZyb21MZW5ndGhBbmRQb3NpdGlvbih0aGlzLmxlbmd0aCwgdGhpcy5wb3NpdGlvbik7XHJcbiAgfVxyXG5cclxuICB0b0pTT04oKSB7XHJcbiAgICBjb25zdCBqc29uID0ge1xyXG5cdCAgICAgICAgICBcInR5cGVcIjogdGhpcy50eXBlLFxyXG4gICAgICAgICAgICBcImxlbmd0aFwiOiB0aGlzLmxlbmd0aCxcclxuICAgICAgICAgICAgXCJwb3NpdGlvblwiOiB0aGlzLnBvc2l0aW9uLFxyXG4gICAgICAgICAgfTtcclxuICAgIFxyXG4gICAgcmV0dXJuIGpzb247XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1PcGVyYXRpb24ob3BlcmF0aW9uKSB7XHJcbiAgICBzd2l0Y2ggKG9wZXJhdGlvbi50eXBlKSB7XHJcbiAgICAgIGNhc2UgJ2luc2VydCc6XHJcbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbih0YXUsIHJobykge1xyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPD0gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbdGF1LmNsb25lKCldO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPiByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA8IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW3RhdS5sZWZ0KHJobykuc2hpZnQodGF1KV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA+PSByaG8ubGVuZ3RoICsgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFtyaG8uc2hpZnQodGF1KV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSkob3BlcmF0aW9uLCB0aGlzKTtcclxuXHJcbiAgICAgIGNhc2UgJ2RlbGV0ZSc6XHJcbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbih0YXUsIHJobykge1xyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPCByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgaWYgKHRhdS5sZW5ndGggKyB0YXUucG9zaXRpb24gPD0gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFt0YXUuY2xvbmUoKV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRhdS5sZW5ndGggKyB0YXUucG9zaXRpb24gPD0gcmhvLmxlbmd0aCArIHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgIHJldHVybiBbcmhvLnRha2VuRnJvbSh0YXUpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGF1Lmxlbmd0aCArIHRhdS5wb3NpdGlvbiA+IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW3Joby5zcGxpdCh0YXUpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPT09IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICBpZiAodGF1Lmxlbmd0aCArIHRhdS5wb3NpdGlvbiA8PSByaG8ubGVuZ3RoICsgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFtFbXB0eU9wZXJhdGlvbi5mcm9tTm90aGluZygpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGF1Lmxlbmd0aCArIHRhdS5wb3NpdGlvbiA+IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW3Joby5zaGlmdChyaG8udGFrZW5Gcm9tKHRhdSkpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPj0gcmhvLmxlbmd0aCArIHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gW3Joby5zaGlmdCh0YXUpXTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uID4gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICh0YXUubGVuZ3RoICsgdGF1LnBvc2l0aW9uIDw9IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW0VtcHR5T3BlcmF0aW9uLmZyb21Ob3RoaW5nKCldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0YXUubGVuZ3RoICsgdGF1LnBvc2l0aW9uID4gcmhvLmxlbmd0aCArIHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgIHJldHVybiBbcmhvLnNoaWZ0KHJoby50YWtlbkZyb20odGF1KSldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pKG9wZXJhdGlvbiwgdGhpcyk7XHJcblxyXG4gICAgICBjYXNlICdlbXB0eSc6XHJcbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbih0YXUsIHJobykge1xyXG5cclxuICAgICAgICAgIHJldHVybiBbdGF1LmNsb25lKCldO1xyXG5cclxuICAgICAgICB9KShvcGVyYXRpb24sIHRoaXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtQ29udGVudChjb250ZW50KSB7XHJcbiAgICByZXR1cm4gY29udGVudC5zdWJzdHJpbmcoMCwgdGhpcy5wb3NpdGlvbikgKyBjb250ZW50LnN1YnN0cmluZyh0aGlzLmxlbmd0aCArIHRoaXMucG9zaXRpb24pO1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtU2VsZWN0aW9uKHNlbGVjdGlvbikge1xyXG4gICAgbGV0IHRyYW5zZm9ybWVkU2VsZWN0aW9uO1xyXG5cclxuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMubGVuZ3RoLCAgLy8vXHJcbiAgICAgICAgICBzdGFydFBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbiwgLy8vXHJcbiAgICAgICAgICBlbmRQb3NpdGlvbiA9IHN0YXJ0UG9zaXRpb24gKyBsZW5ndGgsXHJcbiAgICAgICAgICBzZWxlY3Rpb25TdGFydFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldFN0YXJ0UG9zaXRpb24oKSxcclxuICAgICAgICAgIHNlbGVjdGlvbkVuZFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldEVuZFBvc2l0aW9uKCk7XHJcblxyXG4gICAgbGV0IG9mZnNldCxcclxuICAgICAgICBlbmRPZmZzZXQ7XHJcblxyXG4gICAgaWYgKGZhbHNlKSB7XHJcblxyXG4gICAgfSBlbHNlIGlmIChzZWxlY3Rpb25TdGFydFBvc2l0aW9uID49IGVuZFBvc2l0aW9uKSB7XHJcbiAgICAgIG9mZnNldCA9IC1sZW5ndGg7XHJcblxyXG4gICAgICB0cmFuc2Zvcm1lZFNlbGVjdGlvbiA9IHNlbGVjdGlvbi5zaGlmdGVkKG9mZnNldCk7XHJcbiAgICB9IGVsc2UgaWYgKHNlbGVjdGlvblN0YXJ0UG9zaXRpb24gPj0gc3RhcnRQb3NpdGlvbikge1xyXG4gICAgICBpZiAoc2VsZWN0aW9uRW5kUG9zaXRpb24gPiBlbmRQb3NpdGlvbikge1xyXG4gICAgICAgIG9mZnNldCA9IHN0YXJ0UG9zaXRpb24gLSBzZWxlY3Rpb25TdGFydFBvc2l0aW9uO1xyXG4gICAgICAgIGVuZE9mZnNldCA9IHNlbGVjdGlvblN0YXJ0UG9zaXRpb24gLSBlbmRQb3NpdGlvbjtcclxuXHJcbiAgICAgICAgdHJhbnNmb3JtZWRTZWxlY3Rpb24gPSBzZWxlY3Rpb24uc2hpZnRlZChvZmZzZXQpLmVuZFBvc2l0aW9uU2hpZnRlZChlbmRPZmZzZXQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IFNlbGVjdGlvbiA9IHNlbGVjdGlvbi5jb25zdHJ1Y3RvcjsgIC8vL1xyXG5cclxuICAgICAgICB0cmFuc2Zvcm1lZFNlbGVjdGlvbiA9IG5ldyBTZWxlY3Rpb24oc3RhcnRQb3NpdGlvbiwgc3RhcnRQb3NpdGlvbik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoc2VsZWN0aW9uRW5kUG9zaXRpb24gPiBlbmRQb3NpdGlvbikge1xyXG4gICAgICBlbmRPZmZzZXQgPSAtbGVuZ3RoO1xyXG5cclxuICAgICAgdHJhbnNmb3JtZWRTZWxlY3Rpb24gPSBzZWxlY3Rpb24uZW5kUG9zaXRpb25TaGlmdGVkKGVuZE9mZnNldCk7XHJcbiAgICB9IGVsc2UgaWYgKHNlbGVjdGlvbkVuZFBvc2l0aW9uID4gc3RhcnRQb3NpdGlvbikge1xyXG4gICAgICBlbmRPZmZzZXQgPSBzdGFydFBvc2l0aW9uIC0gc2VsZWN0aW9uRW5kUG9zaXRpb247XHJcblxyXG4gICAgICB0cmFuc2Zvcm1lZFNlbGVjdGlvbiA9IHNlbGVjdGlvbi5lbmRQb3NpdGlvblNoaWZ0ZWQoZW5kT2Zmc2V0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRyYW5zZm9ybWVkU2VsZWN0aW9uID0gc2VsZWN0aW9uLmNsb25lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRyYW5zZm9ybWVkU2VsZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgc2hpZnRlZChvZmZzZXQpIHtcclxuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMubGVuZ3RoLFxyXG4gICAgICAgICAgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uICsgb2Zmc2V0LFxyXG4gICAgICAgICAgZGVsZXRlT3BlcmF0aW9uID0gRGVsZXRlT3BlcmF0aW9uLmZyb21MZW5ndGhBbmRQb3NpdGlvbihsZW5ndGgsIHBvc2l0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gZGVsZXRlT3BlcmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgc2hpZnQob3BlcmF0aW9uKSB7XHJcbiAgICBjb25zdCBvZmZzZXQgPSAtdGhpcy5sZW5ndGgsXHJcbiAgICAgICAgICBzaGlmdGVkT3BlcmF0aW9uID0gb3BlcmF0aW9uLnNoaWZ0ZWQob2Zmc2V0KTtcclxuXHJcbiAgICByZXR1cm4gc2hpZnRlZE9wZXJhdGlvblxyXG4gIH1cclxuXHJcbiAgdGFrZW5Gcm9tKGRlbGV0ZU9wZXJhdGlvbikge1xyXG4gICAgbGV0IGxlbmd0aCA9IGRlbGV0ZU9wZXJhdGlvbi5sZW5ndGgsXHJcbiAgICAgICAgcG9zaXRpb24gPSBkZWxldGVPcGVyYXRpb24ucG9zaXRpb247XHJcblxyXG4gICAgaWYgKHRoaXMucG9zaXRpb24gPiBwb3NpdGlvbiAmJiB0aGlzLmxlbmd0aCArIHRoaXMucG9zaXRpb24gPj0gbGVuZ3RoICsgcG9zaXRpb24pIHtcclxuICAgICAgbGVuZ3RoID0gdGhpcy5wb3NpdGlvbiAtIHBvc2l0aW9uO1xyXG5cclxuICAgICAgZGVsZXRlT3BlcmF0aW9uID0gRGVsZXRlT3BlcmF0aW9uLmZyb21MZW5ndGhBbmRQb3NpdGlvbihsZW5ndGgsIHBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5wb3NpdGlvbiA8PSBwb3NpdGlvbiAmJiB0aGlzLmxlbmd0aCArIHRoaXMucG9zaXRpb24gPCBsZW5ndGggKyBwb3NpdGlvbikge1xyXG4gICAgICBsZW5ndGggPSBsZW5ndGggKyBwb3NpdGlvbiAtIHRoaXMucG9zaXRpb24gLSB0aGlzLmxlbmd0aDtcclxuICAgICAgcG9zaXRpb24gPSB0aGlzLmxlbmd0aCArIHRoaXMucG9zaXRpb247XHJcblxyXG4gICAgICBkZWxldGVPcGVyYXRpb24gPSBEZWxldGVPcGVyYXRpb24uZnJvbUxlbmd0aEFuZFBvc2l0aW9uKGxlbmd0aCwgcG9zaXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkZWxldGVPcGVyYXRpb247XHJcbiAgfVxyXG5cclxuICBzcGxpdChkZWxldGVPcGVyYXRpb24pIHtcclxuICAgIGxldCBsZW5ndGggPSBkZWxldGVPcGVyYXRpb24ubGVuZ3RoLFxyXG4gICAgICAgIHBvc2l0aW9uID0gZGVsZXRlT3BlcmF0aW9uLnBvc2l0aW9uO1xyXG5cclxuICAgIGxlbmd0aCA9IGxlbmd0aCAtIHRoaXMubGVuZ3RoO1xyXG5cclxuICAgIGRlbGV0ZU9wZXJhdGlvbiA9IERlbGV0ZU9wZXJhdGlvbi5mcm9tTGVuZ3RoQW5kUG9zaXRpb24obGVuZ3RoLCBwb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIGRlbGV0ZU9wZXJhdGlvbjtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tTGVuZ3RoQW5kUG9zaXRpb24obGVuZ3RoLCBwb3NpdGlvbikge1xyXG4gICAgY29uc3QgdHlwZSA9IGRlbGV0ZVR5cGUsIC8vL1xyXG4gICAgICAgICAgZGVsZXRlT3BlcmF0aW9uID0gbmV3IERlbGV0ZU9wZXJhdGlvbih0eXBlLCBsZW5ndGgsIHBvc2l0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gZGVsZXRlT3BlcmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcclxuICAgIGNvbnN0IHR5cGUgPSBqc29uW1widHlwZVwiXSxcclxuICAgICAgICAgIGxlbmd0aCA9IGpzb25bXCJsZW5ndGhcIl0sXHJcbiAgICAgICAgICBwb3NpdGlvbiA9IGpzb25bXCJwb3NpdGlvblwiXSxcclxuICAgICAgICAgIGRlbGV0ZU9wZXJhdGlvbiA9IG5ldyBEZWxldGVPcGVyYXRpb24odHlwZSwgbGVuZ3RoLCBwb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIGRlbGV0ZU9wZXJhdGlvbjtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRGVsZXRlT3BlcmF0aW9uO1xyXG4iXX0=