'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DeleteOperation = require('./delete');

var type = 'insert';

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
                if (rho.string.localeCompare(tau.string) < 0) {
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
      var startPosition = this.position,
          ///
      length = this.string.length,
          selectionStartPosition = selection.getStartPosition(),
          selectionEndPosition = selection.getEndPosition(),
          offset = length,
          endOffset = offset;

      if (selectionStartPosition >= startPosition) {
        return selection.shifted(offset);
      }

      if (selectionEndPosition > startPosition) {
        return selection.endPositionShifted(endOffset);
      }

      return selection.clone();
    }
  }, {
    key: 'shifted',
    value: function shifted(offset) {
      var string = this.string,
          position = this.position + offset;

      return InsertOperation.fromStringAndPosition(string, position);
    }
  }, {
    key: 'shift',
    value: function shift(operation) {
      var length = this.string.length,
          offset = length; ///

      return operation.shifted(offset);
    }
  }, {
    key: 'left',
    value: function left(deleteOperation) {
      var position = deleteOperation.position,
          length = this.position - position;

      return DeleteOperation.fromLengthAndPosition(length, position);
    }
  }, {
    key: 'right',
    value: function right(deleteOperation) {
      var length = deleteOperation.length,
          position = deleteOperation.position;

      length = length - this.position + position;
      position = this.position;

      return DeleteOperation.fromLengthAndPosition(length, position);
    }
  }], [{
    key: 'fromStringAndPosition',
    value: function fromStringAndPosition(string, position) {
      return new InsertOperation(type, string, position);
    }
  }, {
    key: 'fromJSON',
    value: function fromJSON(json) {
      var type = json["type"],
          string = json["string"],
          position = json["position"];

      return new InsertOperation(type, string, position);
    }
  }]);

  return InsertOperation;
}();

Object.assign(InsertOperation, {
  type: type
});

module.exports = InsertOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9vcGVyYXRpb24vaW5zZXJ0LmpzIl0sIm5hbWVzIjpbIkRlbGV0ZU9wZXJhdGlvbiIsInJlcXVpcmUiLCJ0eXBlIiwiSW5zZXJ0T3BlcmF0aW9uIiwic3RyaW5nIiwicG9zaXRpb24iLCJmcm9tU3RyaW5nQW5kUG9zaXRpb24iLCJqc29uIiwib3BlcmF0aW9uIiwidGF1IiwicmhvIiwiY2xvbmUiLCJsb2NhbGVDb21wYXJlIiwic2hpZnQiLCJsZW5ndGgiLCJsZWZ0IiwicmlnaHQiLCJjb250ZW50Iiwic3Vic3RyaW5nIiwic2VsZWN0aW9uIiwic3RhcnRQb3NpdGlvbiIsInNlbGVjdGlvblN0YXJ0UG9zaXRpb24iLCJnZXRTdGFydFBvc2l0aW9uIiwic2VsZWN0aW9uRW5kUG9zaXRpb24iLCJnZXRFbmRQb3NpdGlvbiIsIm9mZnNldCIsImVuZE9mZnNldCIsInNoaWZ0ZWQiLCJlbmRQb3NpdGlvblNoaWZ0ZWQiLCJkZWxldGVPcGVyYXRpb24iLCJmcm9tTGVuZ3RoQW5kUG9zaXRpb24iLCJPYmplY3QiLCJhc3NpZ24iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBRUEsSUFBTUEsa0JBQWtCQyxRQUFRLFVBQVIsQ0FBeEI7O0FBRUEsSUFBTUMsT0FBTyxRQUFiOztJQUVNQyxlO0FBQ0osMkJBQVlELElBQVosRUFBa0JFLE1BQWxCLEVBQTBCQyxRQUExQixFQUFvQztBQUFBOztBQUNuQyxTQUFLSCxJQUFMLEdBQVlBLElBQVo7QUFDQyxTQUFLRSxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNEOzs7OzRCQUVPO0FBQ04sYUFBT0YsZ0JBQWdCRyxxQkFBaEIsQ0FBc0MsS0FBS0YsTUFBM0MsRUFBbUQsS0FBS0MsUUFBeEQsQ0FBUDtBQUNEOzs7NkJBRVE7QUFDUCxVQUFNRSxPQUFPO0FBQ04sZ0JBQVEsS0FBS0wsSUFEUDtBQUVMLGtCQUFVLEtBQUtFLE1BRlY7QUFH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QUNEOzs7NkJBRWVFLEksRUFBTTtBQUNwQixVQUFNTCxPQUFPSyxLQUFLLE1BQUwsQ0FBYjtBQUFBLFVBQ01ILFNBQVNHLEtBQUssUUFBTCxDQURmO0FBQUEsVUFFTUYsV0FBV0UsS0FBSyxVQUFMLENBRmpCOztBQUlBLGFBQU8sSUFBSUosZUFBSixDQUFvQkQsSUFBcEIsRUFBMEJFLE1BQTFCLEVBQWtDQyxRQUFsQyxDQUFQO0FBQ0Q7Ozs7OztBQUdIMEIsT0FBT0MsTUFBUCxDQUFjN0IsZUFBZCxFQUErQjtBQUM3QkQ7QUFENkIsQ0FBL0I7O0FBSUErQixPQUFPQyxPQUFQLEdBQWlCL0IsZUFBakIiLCJmaWxlIjoiaW5zZXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgRGVsZXRlT3BlcmF0aW9uID0gcmVxdWlyZSgnLi9kZWxldGUnKTtcclxuXHJcbmNvbnN0IHR5cGUgPSAnaW5zZXJ0JztcclxuXHJcbmNsYXNzIEluc2VydE9wZXJhdGlvbiB7XHJcbiAgY29uc3RydWN0b3IodHlwZSwgc3RyaW5nLCBwb3NpdGlvbikge1xyXG5cdCAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIHRoaXMuc3RyaW5nID0gc3RyaW5nO1xyXG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gIH1cclxuXHJcbiAgY2xvbmUoKSB7XHJcbiAgICByZXR1cm4gSW5zZXJ0T3BlcmF0aW9uLmZyb21TdHJpbmdBbmRQb3NpdGlvbih0aGlzLnN0cmluZywgdGhpcy5wb3NpdGlvbik7XHJcbiAgfVxyXG5cclxuICB0b0pTT04oKSB7XHJcbiAgICBjb25zdCBqc29uID0ge1xyXG5cdCAgICAgICAgICBcInR5cGVcIjogdGhpcy50eXBlLFxyXG4gICAgICAgICAgICBcInN0cmluZ1wiOiB0aGlzLnN0cmluZyxcclxuICAgICAgICAgICAgXCJwb3NpdGlvblwiOiB0aGlzLnBvc2l0aW9uXHJcbiAgICAgICAgICB9O1xyXG4gICAgXHJcbiAgICByZXR1cm4ganNvbjtcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybU9wZXJhdGlvbihvcGVyYXRpb24pIHtcclxuICAgIHN3aXRjaCAob3BlcmF0aW9uLnR5cGUpIHtcclxuICAgICAgY2FzZSAnaW5zZXJ0JzpcclxuICAgICAgICByZXR1cm4gKGZ1bmN0aW9uKHRhdSwgcmhvKSB7XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA8IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gKFt0YXUuY2xvbmUoKV0pO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPT09IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICBpZiAodGF1LnN0cmluZyA9PT0gcmhvLnN0cmluZykge1xyXG4gICAgICAgICAgICAgIHJldHVybiAoW3RhdS5jbG9uZSgpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRhdS5zdHJpbmcgIT09IHJoby5zdHJpbmcpIHtcclxuICAgICAgICAgICAgICBpZiAocmhvLnN0cmluZy5sb2NhbGVDb21wYXJlKHRhdS5zdHJpbmcpIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChbcmhvLnNoaWZ0KHRhdSldKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFt0YXUuY2xvbmUoKV0pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPiByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIChbcmhvLnNoaWZ0KHRhdSldKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSkob3BlcmF0aW9uLCB0aGlzKTtcclxuXHJcbiAgICAgIGNhc2UgJ2RlbGV0ZSc6XHJcbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbih0YXUsIHJobykge1xyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gKyB0YXUubGVuZ3RoIDw9IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gKFt0YXUuY2xvbmUoKV0pO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPCByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIChbcmhvLmxlZnQodGF1KSwgcmhvLmxlZnQodGF1KS5zaGlmdChyaG8uc2hpZnQocmhvLnJpZ2h0KHRhdSkpKV0pO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPj0gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoW3Joby5zaGlmdCh0YXUpXSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pKG9wZXJhdGlvbiwgdGhpcyk7XHJcblxyXG4gICAgICBjYXNlICdlbXB0eSc6XHJcbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbih0YXUsIHJobykge1xyXG5cclxuICAgICAgICAgIHJldHVybiBbdGF1LmNsb25lKCldO1xyXG5cclxuICAgICAgICB9KShvcGVyYXRpb24sIHRoaXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtQ29udGVudChjb250ZW50KSB7XHJcbiAgICByZXR1cm4gY29udGVudC5zdWJzdHJpbmcoMCwgdGhpcy5wb3NpdGlvbikgKyB0aGlzLnN0cmluZyArIGNvbnRlbnQuc3Vic3RyaW5nKHRoaXMucG9zaXRpb24pO1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtU2VsZWN0aW9uKHNlbGVjdGlvbikge1xyXG4gICAgY29uc3Qgc3RhcnRQb3NpdGlvbiA9IHRoaXMucG9zaXRpb24sIC8vL1xyXG4gICAgICAgICAgbGVuZ3RoID0gdGhpcy5zdHJpbmcubGVuZ3RoLFxyXG4gICAgICAgICAgc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRTdGFydFBvc2l0aW9uKCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRFbmRQb3NpdGlvbigpLFxyXG4gICAgICAgICAgb2Zmc2V0ID0gbGVuZ3RoLFxyXG4gICAgICAgICAgZW5kT2Zmc2V0ID0gb2Zmc2V0O1xyXG5cclxuICAgIGlmIChzZWxlY3Rpb25TdGFydFBvc2l0aW9uID49IHN0YXJ0UG9zaXRpb24pIHtcclxuICAgICAgcmV0dXJuIHNlbGVjdGlvbi5zaGlmdGVkKG9mZnNldCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNlbGVjdGlvbkVuZFBvc2l0aW9uID4gc3RhcnRQb3NpdGlvbikge1xyXG4gICAgICByZXR1cm4gc2VsZWN0aW9uLmVuZFBvc2l0aW9uU2hpZnRlZChlbmRPZmZzZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzZWxlY3Rpb24uY2xvbmUoKTtcclxuICB9XHJcblxyXG4gIHNoaWZ0ZWQob2Zmc2V0KSB7XHJcbiAgICBjb25zdCBzdHJpbmcgPSB0aGlzLnN0cmluZyxcclxuICAgICAgICAgIHBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbiArIG9mZnNldDtcclxuXHJcbiAgICByZXR1cm4gSW5zZXJ0T3BlcmF0aW9uLmZyb21TdHJpbmdBbmRQb3NpdGlvbihzdHJpbmcsIHBvc2l0aW9uKTtcclxuICB9XHJcblxyXG4gIHNoaWZ0KG9wZXJhdGlvbikge1xyXG4gICAgY29uc3QgbGVuZ3RoID0gdGhpcy5zdHJpbmcubGVuZ3RoLFxyXG5cdFx0XHRcdCAgb2Zmc2V0ID0gbGVuZ3RoOyAgLy8vXHJcblxyXG4gICAgcmV0dXJuIG9wZXJhdGlvbi5zaGlmdGVkKG9mZnNldCk7XHJcbiAgfVxyXG5cclxuICBsZWZ0KGRlbGV0ZU9wZXJhdGlvbikge1xyXG4gICAgY29uc3QgcG9zaXRpb24gPSBkZWxldGVPcGVyYXRpb24ucG9zaXRpb24sXHJcbiAgICAgICAgICBsZW5ndGggPSB0aGlzLnBvc2l0aW9uIC0gcG9zaXRpb247XHJcblxyXG4gICAgcmV0dXJuIERlbGV0ZU9wZXJhdGlvbi5mcm9tTGVuZ3RoQW5kUG9zaXRpb24obGVuZ3RoLCBwb3NpdGlvbik7XHJcbiAgfVxyXG5cclxuICByaWdodChkZWxldGVPcGVyYXRpb24pIHtcclxuICAgIGxldCBsZW5ndGggPSBkZWxldGVPcGVyYXRpb24ubGVuZ3RoLFxyXG4gICAgICAgIHBvc2l0aW9uID0gZGVsZXRlT3BlcmF0aW9uLnBvc2l0aW9uO1xyXG5cclxuICAgIGxlbmd0aCA9IGxlbmd0aCAtIHRoaXMucG9zaXRpb24gKyBwb3NpdGlvbjtcclxuICAgIHBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbjtcclxuXHJcbiAgICByZXR1cm4gRGVsZXRlT3BlcmF0aW9uLmZyb21MZW5ndGhBbmRQb3NpdGlvbihsZW5ndGgsIHBvc2l0aW9uKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tU3RyaW5nQW5kUG9zaXRpb24oc3RyaW5nLCBwb3NpdGlvbikge1xyXG4gICAgcmV0dXJuIG5ldyBJbnNlcnRPcGVyYXRpb24odHlwZSwgc3RyaW5nLCBwb3NpdGlvbik7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xyXG4gICAgY29uc3QgdHlwZSA9IGpzb25bXCJ0eXBlXCJdLFxyXG4gICAgICAgICAgc3RyaW5nID0ganNvbltcInN0cmluZ1wiXSxcclxuICAgICAgICAgIHBvc2l0aW9uID0ganNvbltcInBvc2l0aW9uXCJdO1xyXG5cclxuICAgIHJldHVybiBuZXcgSW5zZXJ0T3BlcmF0aW9uKHR5cGUsIHN0cmluZywgcG9zaXRpb24pO1xyXG4gIH1cclxufVxyXG5cclxuT2JqZWN0LmFzc2lnbihJbnNlcnRPcGVyYXRpb24sIHtcclxuICB0eXBlXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJbnNlcnRPcGVyYXRpb247XHJcbiJdfQ==