"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _stringCompare = _interopRequireDefault(require("../stringCompare"));

var _delete = _interopRequireDefault(require("../operation/delete"));

var _types = require("../types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
                if ((0, _stringCompare["default"])(rho.string, tau.string)) {
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
      deleteOperation = _delete["default"].fromLengthAndPosition(length, position);
      return deleteOperation;
    }
  }, {
    key: "right",
    value: function right(deleteOperation) {
      var length = deleteOperation.length,
          position = deleteOperation.position;
      length = length - this.position + position;
      position = this.position;
      deleteOperation = _delete["default"].fromLengthAndPosition(length, position);
      return deleteOperation;
    }
  }], [{
    key: "fromStringAndPosition",
    value: function fromStringAndPosition(string, position) {
      var type = _types.insertType,
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

exports["default"] = InsertOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluc2VydC5qcyJdLCJuYW1lcyI6WyJJbnNlcnRPcGVyYXRpb24iLCJ0eXBlIiwic3RyaW5nIiwicG9zaXRpb24iLCJmcm9tU3RyaW5nQW5kUG9zaXRpb24iLCJqc29uIiwib3BlcmF0aW9uIiwidGF1IiwicmhvIiwiY2xvbmUiLCJzaGlmdCIsImxlbmd0aCIsImxlZnQiLCJyaWdodCIsImNvbnRlbnQiLCJzdWJzdHJpbmciLCJzZWxlY3Rpb24iLCJ0cmFuc2Zvcm1lZFNlbGVjdGlvbiIsInN0YXJ0UG9zaXRpb24iLCJzZWxlY3Rpb25TdGFydFBvc2l0aW9uIiwiZ2V0U3RhcnRQb3NpdGlvbiIsInNlbGVjdGlvbkVuZFBvc2l0aW9uIiwiZ2V0RW5kUG9zaXRpb24iLCJvZmZzZXQiLCJlbmRPZmZzZXQiLCJzaGlmdGVkIiwiZW5kUG9zaXRpb25TaGlmdGVkIiwiaW5zZXJ0T3BlcmF0aW9uIiwic2hpZnRlZE9wZXJhdGlvbiIsImRlbGV0ZU9wZXJhdGlvbiIsIkRlbGV0ZU9wZXJhdGlvbiIsImZyb21MZW5ndGhBbmRQb3NpdGlvbiIsImluc2VydFR5cGUiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7SUFFcUJBLGU7QUFDbkIsMkJBQVlDLElBQVosRUFBa0JDLE1BQWxCLEVBQTBCQyxRQUExQixFQUFvQztBQUFBOztBQUNuQyxTQUFLRixJQUFMLEdBQVlBLElBQVo7QUFDQyxTQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNEOzs7OzRCQUVPO0FBQ04sYUFBT0gsZUFBZSxDQUFDSSxxQkFBaEIsQ0FBc0MsS0FBS0YsTUFBM0MsRUFBbUQsS0FBS0MsUUFBeEQsQ0FBUDtBQUNEOzs7NkJBRVE7QUFDUCxVQUFNRSxJQUFJLEdBQUc7QUFDTixnQkFBUSxLQUFLSixJQURQO0FBRUwsa0JBQVUsS0FBS0MsTUFGVjtBQUdMLG9CQUFZLEtBQUtDO0FBSFosT0FBYjtBQU1BLGFB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dHJpY3RcIjtcclxuXHJcbmltcG9ydCBzdHJpbmdDb21wYXJlIGZyb20gXCIuLi9zdHJpbmdDb21wYXJlXCI7XHJcbmltcG9ydCBEZWxldGVPcGVyYXRpb24gZnJvbSBcIi4uL29wZXJhdGlvbi9kZWxldGVcIjtcclxuXHJcbmltcG9ydCB7IGluc2VydFR5cGUgfSBmcm9tIFwiLi4vdHlwZXNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluc2VydE9wZXJhdGlvbiB7XHJcbiAgY29uc3RydWN0b3IodHlwZSwgc3RyaW5nLCBwb3NpdGlvbikge1xyXG5cdCAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIHRoaXMuc3RyaW5nID0gc3RyaW5nO1xyXG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gIH1cclxuXHJcbiAgY2xvbmUoKSB7XHJcbiAgICByZXR1cm4gSW5zZXJ0T3BlcmF0aW9uLmZyb21TdHJpbmdBbmRQb3NpdGlvbih0aGlzLnN0cmluZywgdGhpcy5wb3NpdGlvbik7XHJcbiAgfVxyXG5cclxuICB0b0pTT04oKSB7XHJcbiAgICBjb25zdCBqc29uID0ge1xyXG5cdCAgICAgICAgICBcInR5cGVcIjogdGhpcy50eXBlLFxyXG4gICAgICAgICAgICBcInN0cmluZ1wiOiB0aGlzLnN0cmluZyxcclxuICAgICAgICAgICAgXCJwb3NpdGlvblwiOiB0aGlzLnBvc2l0aW9uXHJcbiAgICAgICAgICB9O1xyXG4gICAgXHJcbiAgICByZXR1cm4ganNvbjtcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybU9wZXJhdGlvbihvcGVyYXRpb24pIHtcclxuICAgIHN3aXRjaCAob3BlcmF0aW9uLnR5cGUpIHtcclxuICAgICAgY2FzZSBcImluc2VydFwiOlxyXG4gICAgICAgIHJldHVybiAoKHRhdSwgcmhvKSA9PiB7XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA8IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gW3RhdS5jbG9uZSgpXTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uID09PSByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgaWYgKHRhdS5zdHJpbmcgPT09IHJoby5zdHJpbmcpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW3RhdS5jbG9uZSgpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGF1LnN0cmluZyAhPT0gcmhvLnN0cmluZykge1xyXG4gICAgICAgICAgICAgIGlmIChzdHJpbmdDb21wYXJlKHJoby5zdHJpbmcsIHRhdS5zdHJpbmcpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW3Joby5zaGlmdCh0YXUpXTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFt0YXUuY2xvbmUoKV07XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA+IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gW3Joby5zaGlmdCh0YXUpXTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSkob3BlcmF0aW9uLCB0aGlzKTtcclxuXHJcbiAgICAgIGNhc2UgXCJkZWxldGVcIjpcclxuICAgICAgICByZXR1cm4gKCh0YXUsIHJobykgPT4ge1xyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gKyB0YXUubGVuZ3RoIDw9IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gW3RhdS5jbG9uZSgpXTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uIDwgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbcmhvLmxlZnQodGF1KSwgcmhvLmxlZnQodGF1KS5zaGlmdChyaG8uc2hpZnQocmhvLnJpZ2h0KHRhdSkpKV07XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA+PSByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtyaG8uc2hpZnQodGF1KV07XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pKG9wZXJhdGlvbiwgdGhpcyk7XHJcblxyXG4gICAgICBjYXNlIFwiZW1wdHlcIjpcclxuICAgICAgICByZXR1cm4gKCh0YXUsIHJobykgPT4ge1xyXG5cclxuICAgICAgICAgIHJldHVybiBbdGF1LmNsb25lKCldO1xyXG5cclxuICAgICAgICB9KShvcGVyYXRpb24sIHRoaXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtQ29udGVudChjb250ZW50KSB7XHJcbiAgICByZXR1cm4gY29udGVudC5zdWJzdHJpbmcoMCwgdGhpcy5wb3NpdGlvbikgKyB0aGlzLnN0cmluZyArIGNvbnRlbnQuc3Vic3RyaW5nKHRoaXMucG9zaXRpb24pO1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtU2VsZWN0aW9uKHNlbGVjdGlvbikge1xyXG4gICAgbGV0IHRyYW5zZm9ybWVkU2VsZWN0aW9uO1xyXG5cclxuICAgIGNvbnN0IHN0YXJ0UG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uLCAvLy9cclxuICAgICAgICAgIGxlbmd0aCA9IHRoaXMuc3RyaW5nLmxlbmd0aCxcclxuICAgICAgICAgIHNlbGVjdGlvblN0YXJ0UG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0U3RhcnRQb3NpdGlvbigpLFxyXG4gICAgICAgICAgc2VsZWN0aW9uRW5kUG9zaXRpb24gPSBzZWxlY3Rpb24uZ2V0RW5kUG9zaXRpb24oKSxcclxuICAgICAgICAgIG9mZnNldCA9IGxlbmd0aCwgIC8vL1xyXG4gICAgICAgICAgZW5kT2Zmc2V0ID0gb2Zmc2V0OyAvLy9cclxuXHJcbiAgICBpZiAoZmFsc2UpIHtcclxuXHJcbiAgICB9IGVsc2UgaWYgKHNlbGVjdGlvblN0YXJ0UG9zaXRpb24gPj0gc3RhcnRQb3NpdGlvbikge1xyXG4gICAgICB0cmFuc2Zvcm1lZFNlbGVjdGlvbiA9IHNlbGVjdGlvbi5zaGlmdGVkKG9mZnNldCk7XHJcbiAgICB9IGVsc2UgaWYgKHNlbGVjdGlvbkVuZFBvc2l0aW9uID4gc3RhcnRQb3NpdGlvbikge1xyXG4gICAgICB0cmFuc2Zvcm1lZFNlbGVjdGlvbiA9IHNlbGVjdGlvbi5lbmRQb3NpdGlvblNoaWZ0ZWQoZW5kT2Zmc2V0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRyYW5zZm9ybWVkU2VsZWN0aW9uID0gc2VsZWN0aW9uLmNsb25lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRyYW5zZm9ybWVkU2VsZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgc2hpZnRlZChvZmZzZXQpIHtcclxuICAgIGNvbnN0IHN0cmluZyA9IHRoaXMuc3RyaW5nLFxyXG4gICAgICAgICAgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uICsgb2Zmc2V0LFxyXG4gICAgICAgICAgaW5zZXJ0T3BlcmF0aW9uID0gSW5zZXJ0T3BlcmF0aW9uLmZyb21TdHJpbmdBbmRQb3NpdGlvbihzdHJpbmcsIHBvc2l0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gaW5zZXJ0T3BlcmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgc2hpZnQob3BlcmF0aW9uKSB7XHJcbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLnN0cmluZy5sZW5ndGgsXHJcblx0XHRcdFx0ICBvZmZzZXQgPSBsZW5ndGgsICAvLy9cclxuICAgICAgICAgIHNoaWZ0ZWRPcGVyYXRpb24gPSBvcGVyYXRpb24uc2hpZnRlZChvZmZzZXQpO1xyXG5cclxuICAgIHJldHVybiBzaGlmdGVkT3BlcmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgbGVmdChkZWxldGVPcGVyYXRpb24pIHtcclxuICAgIGNvbnN0IHBvc2l0aW9uID0gZGVsZXRlT3BlcmF0aW9uLnBvc2l0aW9uLFxyXG4gICAgICAgICAgbGVuZ3RoID0gdGhpcy5wb3NpdGlvbiAtIHBvc2l0aW9uO1xyXG5cclxuICAgIGRlbGV0ZU9wZXJhdGlvbiA9IERlbGV0ZU9wZXJhdGlvbi5mcm9tTGVuZ3RoQW5kUG9zaXRpb24obGVuZ3RoLCBwb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIGRlbGV0ZU9wZXJhdGlvbjtcclxuICB9XHJcblxyXG4gIHJpZ2h0KGRlbGV0ZU9wZXJhdGlvbikge1xyXG4gICAgbGV0IGxlbmd0aCA9IGRlbGV0ZU9wZXJhdGlvbi5sZW5ndGgsXHJcbiAgICAgICAgcG9zaXRpb24gPSBkZWxldGVPcGVyYXRpb24ucG9zaXRpb247XHJcblxyXG4gICAgbGVuZ3RoID0gbGVuZ3RoIC0gdGhpcy5wb3NpdGlvbiArIHBvc2l0aW9uO1xyXG4gICAgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uO1xyXG5cclxuICAgIGRlbGV0ZU9wZXJhdGlvbiA9IERlbGV0ZU9wZXJhdGlvbi5mcm9tTGVuZ3RoQW5kUG9zaXRpb24obGVuZ3RoLCBwb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIGRlbGV0ZU9wZXJhdGlvbjtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tU3RyaW5nQW5kUG9zaXRpb24oc3RyaW5nLCBwb3NpdGlvbikge1xyXG4gICAgY29uc3QgdHlwZSA9IGluc2VydFR5cGUsICAvLy9cclxuICAgICAgICAgIGluc2VydE9wZXJhdGlvbiA9IG5ldyBJbnNlcnRPcGVyYXRpb24odHlwZSwgc3RyaW5nLCBwb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIGluc2VydE9wZXJhdGlvbjtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XHJcbiAgICBjb25zdCB0eXBlID0ganNvbltcInR5cGVcIl0sXHJcbiAgICAgICAgICBzdHJpbmcgPSBqc29uW1wic3RyaW5nXCJdLFxyXG4gICAgICAgICAgcG9zaXRpb24gPSBqc29uW1wicG9zaXRpb25cIl0sXHJcbiAgICAgICAgICBpbnNlcnRPcGVyYXRpb24gPSBuZXcgSW5zZXJ0T3BlcmF0aW9uKHR5cGUsIHN0cmluZywgcG9zaXRpb24pO1xyXG5cclxuICAgIHJldHVybiBpbnNlcnRPcGVyYXRpb247XHJcbiAgfVxyXG59XHJcbiJdfQ==