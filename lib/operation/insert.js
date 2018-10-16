'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var types = require('../types'),
    DeleteOperation = require('./delete');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9vcGVyYXRpb24vaW5zZXJ0LmpzIl0sIm5hbWVzIjpbInR5cGVzIiwicmVxdWlyZSIsIkRlbGV0ZU9wZXJhdGlvbiIsImluc2VydFR5cGUiLCJJbnNlcnRPcGVyYXRpb24iLCJ0eXBlIiwic3RyaW5nIiwicG9zaXRpb24iLCJmcm9tU3RyaW5nQW5kUG9zaXRpb24iLCJqc29uIiwib3BlcmF0aW9uIiwidGF1IiwicmhvIiwiY2xvbmUiLCJsb2NhbGVDb21wYXJlIiwic2hpZnQiLCJsZW5ndGgiLCJsZWZ0IiwicmlnaHQiLCJjb250ZW50Iiwic3Vic3RyaW5nIiwic2VsZWN0aW9uIiwidHJhbnNmb3JtZWRTZWxlY3Rpb24iLCJzdGFydFBvc2l0aW9uIiwic2VsZWN0aW9uU3RhcnRQb3NpdGlvbiIsImdldFN0YXJ0UG9zaXRpb24iLCJzZWxlY3Rpb25FbmRQb3NpdGlvbiIsImdldEVuZFBvc2l0aW9uIiwib2Zmc2V0IiwiZW5kT2Zmc2V0Iiwic2hpZnRlZCIsImVuZFBvc2l0aW9uU2hpZnRlZCIsImluc2VydE9wZXJhdGlvbiIsInNoaWZ0ZWRPcGVyYXRpb24iLCJkZWxldGVPcGVyYXRpb24iLCJmcm9tTGVuZ3RoQW5kUG9zaXRpb24iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBRUEsSUFBTUEsUUFBUUMsUUFBUSxVQUFSLENBQWQ7QUFBQSxJQUNNQyxrQkFBa0JELFFBQVEsVUFBUixDQUR4Qjs7SUFHUUUsVSxHQUFlSCxLLENBQWZHLFU7O0lBRUZDLGU7QUFDSiwyQkFBWUMsSUFBWixFQUFrQkMsTUFBbEIsRUFBMEJDLFFBQTFCLEVBQW9DO0FBQUE7O0FBQ25DLFNBQUtGLElBQUwsR0FBWUEsSUFBWjtBQUNDLFNBQUtDLE1BQUwsR0FBY0EsTUFBZDtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0Q7Ozs7NEJBRU87QUFDTixhQUFPSCxnQkFBZ0JJLHFCQUFoQixDQUFzQyxLQUFLRixNQUEzQyxF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eUJBLFFBQWxDO0FBQ0FBLGlCQUFXLEtBQUtBLFFBQWhCOztBQUVBMkIsd0JBQWtCaEMsZ0JBQWdCaUMscUJBQWhCLENBQXNDbkIsTUFBdEMsRUFBOENULFFBQTlDLENBQWxCOztBQUVBLGFBQU8yQixlQUFQO0FBQ0Q7OzswQ0FFNEI1QixNLEVBQVFDLFEsRUFBVTtBQUM3QyxVQUFNRixPQUFPRixVQUFiO0FBQUEsVUFBMEI7QUFDcEI2Qix3QkFBa0IsSUFBSTVCLGVBQUosQ0FBb0JDLElBQXBCLEVBQTBCQyxNQUExQixFQUFrQ0MsUUFBbEMsQ0FEeEI7O0FBR0EsYUFBT3lCLGVBQVA7QUFDRDs7OzZCQUVldkIsSSxFQUFNO0FBQ3BCLFVBQU1KLE9BQU9JLEtBQUssTUFBTCxDQUFiO0FBQUEsVUFDTUgsU0FBU0csS0FBSyxRQUFMLENBRGY7QUFBQSxVQUVNRixXQUFXRSxLQUFLLFVBQUwsQ0FGakI7QUFBQSxVQUdNdUIsa0JBQWtCLElBQUk1QixlQUFKLENBQW9CQyxJQUFwQixFQUEwQkMsTUFBMUIsRUFBa0NDLFFBQWxDLENBSHhCOztBQUtBLGFBQU95QixlQUFQO0FBQ0Q7Ozs7OztBQUdISSxPQUFPQyxPQUFQLEdBQWlCakMsZUFBakIiLCJmaWxlIjoiaW5zZXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgdHlwZXMgPSByZXF1aXJlKCcuLi90eXBlcycpLFxyXG4gICAgICBEZWxldGVPcGVyYXRpb24gPSByZXF1aXJlKCcuL2RlbGV0ZScpO1xyXG5cclxuY29uc3QgeyBpbnNlcnRUeXBlIH0gPSB0eXBlcztcclxuXHJcbmNsYXNzIEluc2VydE9wZXJhdGlvbiB7XHJcbiAgY29uc3RydWN0b3IodHlwZSwgc3RyaW5nLCBwb3NpdGlvbikge1xyXG5cdCAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIHRoaXMuc3RyaW5nID0gc3RyaW5nO1xyXG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gIH1cclxuXHJcbiAgY2xvbmUoKSB7XHJcbiAgICByZXR1cm4gSW5zZXJ0T3BlcmF0aW9uLmZyb21TdHJpbmdBbmRQb3NpdGlvbih0aGlzLnN0cmluZywgdGhpcy5wb3NpdGlvbik7XHJcbiAgfVxyXG5cclxuICB0b0pTT04oKSB7XHJcbiAgICBjb25zdCBqc29uID0ge1xyXG5cdCAgICAgICAgICBcInR5cGVcIjogdGhpcy50eXBlLFxyXG4gICAgICAgICAgICBcInN0cmluZ1wiOiB0aGlzLnN0cmluZyxcclxuICAgICAgICAgICAgXCJwb3NpdGlvblwiOiB0aGlzLnBvc2l0aW9uXHJcbiAgICAgICAgICB9O1xyXG4gICAgXHJcbiAgICByZXR1cm4ganNvbjtcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybU9wZXJhdGlvbihvcGVyYXRpb24pIHtcclxuICAgIHN3aXRjaCAob3BlcmF0aW9uLnR5cGUpIHtcclxuICAgICAgY2FzZSAnaW5zZXJ0JzpcclxuICAgICAgICByZXR1cm4gKGZ1bmN0aW9uKHRhdSwgcmhvKSB7XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA8IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gW3RhdS5jbG9uZSgpXTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uID09PSByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgaWYgKHRhdS5zdHJpbmcgPT09IHJoby5zdHJpbmcpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW3RhdS5jbG9uZSgpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGF1LnN0cmluZyAhPT0gcmhvLnN0cmluZykge1xyXG4gICAgICAgICAgICAgIGlmIChyaG8uc3RyaW5nLmxvY2FsZUNvbXBhcmUodGF1LnN0cmluZykgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW3Joby5zaGlmdCh0YXUpXTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW3RhdS5jbG9uZSgpXTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uID4gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbcmhvLnNoaWZ0KHRhdSldO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KShvcGVyYXRpb24sIHRoaXMpO1xyXG5cclxuICAgICAgY2FzZSAnZGVsZXRlJzpcclxuICAgICAgICByZXR1cm4gKGZ1bmN0aW9uKHRhdSwgcmhvKSB7XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiArIHRhdS5sZW5ndGggPD0gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbdGF1LmNsb25lKCldO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPCByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtyaG8ubGVmdCh0YXUpLCByaG8ubGVmdCh0YXUpLnNoaWZ0KHJoby5zaGlmdChyaG8ucmlnaHQodGF1KSkpXTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uID49IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gW3Joby5zaGlmdCh0YXUpXTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSkob3BlcmF0aW9uLCB0aGlzKTtcclxuXHJcbiAgICAgIGNhc2UgJ2VtcHR5JzpcclxuICAgICAgICByZXR1cm4gKGZ1bmN0aW9uKHRhdSwgcmhvKSB7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIFt0YXUuY2xvbmUoKV07XHJcblxyXG4gICAgICAgIH0pKG9wZXJhdGlvbiwgdGhpcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1Db250ZW50KGNvbnRlbnQpIHtcclxuICAgIHJldHVybiBjb250ZW50LnN1YnN0cmluZygwLCB0aGlzLnBvc2l0aW9uKSArIHRoaXMuc3RyaW5nICsgY29udGVudC5zdWJzdHJpbmcodGhpcy5wb3NpdGlvbik7XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1TZWxlY3Rpb24oc2VsZWN0aW9uKSB7XHJcbiAgICBsZXQgdHJhbnNmb3JtZWRTZWxlY3Rpb247XHJcblxyXG4gICAgY29uc3Qgc3RhcnRQb3NpdGlvbiA9IHRoaXMucG9zaXRpb24sIC8vL1xyXG4gICAgICAgICAgbGVuZ3RoID0gdGhpcy5zdHJpbmcubGVuZ3RoLFxyXG4gICAgICAgICAgc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRTdGFydFBvc2l0aW9uKCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRFbmRQb3NpdGlvbigpLFxyXG4gICAgICAgICAgb2Zmc2V0ID0gbGVuZ3RoLFxyXG4gICAgICAgICAgZW5kT2Zmc2V0ID0gb2Zmc2V0O1xyXG5cclxuICAgIGlmIChzZWxlY3Rpb25TdGFydFBvc2l0aW9uID49IHN0YXJ0UG9zaXRpb24pIHtcclxuICAgICAgdHJhbnNmb3JtZWRTZWxlY3Rpb24gPSBzZWxlY3Rpb24uc2hpZnRlZChvZmZzZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzZWxlY3Rpb25FbmRQb3NpdGlvbiA+IHN0YXJ0UG9zaXRpb24pIHtcclxuICAgICAgdHJhbnNmb3JtZWRTZWxlY3Rpb24gPSBzZWxlY3Rpb24uZW5kUG9zaXRpb25TaGlmdGVkKGVuZE9mZnNldCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRyYW5zZm9ybWVkU2VsZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgc2hpZnRlZChvZmZzZXQpIHtcclxuICAgIGNvbnN0IHN0cmluZyA9IHRoaXMuc3RyaW5nLFxyXG4gICAgICAgICAgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uICsgb2Zmc2V0LFxyXG4gICAgICAgICAgaW5zZXJ0T3BlcmF0aW9uID0gSW5zZXJ0T3BlcmF0aW9uLmZyb21TdHJpbmdBbmRQb3NpdGlvbihzdHJpbmcsIHBvc2l0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gaW5zZXJ0T3BlcmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgc2hpZnQob3BlcmF0aW9uKSB7XHJcbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLnN0cmluZy5sZW5ndGgsXHJcblx0XHRcdFx0ICBvZmZzZXQgPSBsZW5ndGgsICAvLy9cclxuICAgICAgICAgIHNoaWZ0ZWRPcGVyYXRpb24gPSBvcGVyYXRpb24uc2hpZnRlZChvZmZzZXQpO1xyXG5cclxuICAgIHJldHVybiBzaGlmdGVkT3BlcmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgbGVmdChkZWxldGVPcGVyYXRpb24pIHtcclxuICAgIGNvbnN0IHBvc2l0aW9uID0gZGVsZXRlT3BlcmF0aW9uLnBvc2l0aW9uLFxyXG4gICAgICAgICAgbGVuZ3RoID0gdGhpcy5wb3NpdGlvbiAtIHBvc2l0aW9uO1xyXG5cclxuICAgIGRlbGV0ZU9wZXJhdGlvbiA9IERlbGV0ZU9wZXJhdGlvbi5mcm9tTGVuZ3RoQW5kUG9zaXRpb24obGVuZ3RoLCBwb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIGRlbGV0ZU9wZXJhdGlvbjtcclxuICB9XHJcblxyXG4gIHJpZ2h0KGRlbGV0ZU9wZXJhdGlvbikge1xyXG4gICAgbGV0IGxlbmd0aCA9IGRlbGV0ZU9wZXJhdGlvbi5sZW5ndGgsXHJcbiAgICAgICAgcG9zaXRpb24gPSBkZWxldGVPcGVyYXRpb24ucG9zaXRpb247XHJcblxyXG4gICAgbGVuZ3RoID0gbGVuZ3RoIC0gdGhpcy5wb3NpdGlvbiArIHBvc2l0aW9uO1xyXG4gICAgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uO1xyXG5cclxuICAgIGRlbGV0ZU9wZXJhdGlvbiA9IERlbGV0ZU9wZXJhdGlvbi5mcm9tTGVuZ3RoQW5kUG9zaXRpb24obGVuZ3RoLCBwb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIGRlbGV0ZU9wZXJhdGlvbjtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tU3RyaW5nQW5kUG9zaXRpb24oc3RyaW5nLCBwb3NpdGlvbikge1xyXG4gICAgY29uc3QgdHlwZSA9IGluc2VydFR5cGUsICAvLy9cclxuICAgICAgICAgIGluc2VydE9wZXJhdGlvbiA9IG5ldyBJbnNlcnRPcGVyYXRpb24odHlwZSwgc3RyaW5nLCBwb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIGluc2VydE9wZXJhdGlvbjtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XHJcbiAgICBjb25zdCB0eXBlID0ganNvbltcInR5cGVcIl0sXHJcbiAgICAgICAgICBzdHJpbmcgPSBqc29uW1wic3RyaW5nXCJdLFxyXG4gICAgICAgICAgcG9zaXRpb24gPSBqc29uW1wicG9zaXRpb25cIl0sXHJcbiAgICAgICAgICBpbnNlcnRPcGVyYXRpb24gPSBuZXcgSW5zZXJ0T3BlcmF0aW9uKHR5cGUsIHN0cmluZywgcG9zaXRpb24pO1xyXG5cclxuICAgIHJldHVybiBpbnNlcnRPcGVyYXRpb247XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEluc2VydE9wZXJhdGlvbjtcclxuIl19