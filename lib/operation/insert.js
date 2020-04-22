"use strict";

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

module.exports = InsertOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluc2VydC5qcyJdLCJuYW1lcyI6WyJJbnNlcnRPcGVyYXRpb24iLCJ0eXBlIiwic3RyaW5nIiwicG9zaXRpb24iLCJmcm9tU3RyaW5nQW5kUG9zaXRpb24iLCJqc29uIiwib3BlcmF0aW9uIiwidGF1IiwicmhvIiwiY2xvbmUiLCJzaGlmdCIsImxlbmd0aCIsImxlZnQiLCJyaWdodCIsImNvbnRlbnQiLCJzdWJzdHJpbmciLCJzZWxlY3Rpb24iLCJ0cmFuc2Zvcm1lZFNlbGVjdGlvbiIsInN0YXJ0UG9zaXRpb24iLCJzZWxlY3Rpb25TdGFydFBvc2l0aW9uIiwiZ2V0U3RhcnRQb3NpdGlvbiIsInNlbGVjdGlvbkVuZFBvc2l0aW9uIiwiZ2V0RW5kUG9zaXRpb24iLCJvZmZzZXQiLCJlbmRPZmZzZXQiLCJzaGlmdGVkIiwiZW5kUG9zaXRpb25TaGlmdGVkIiwiaW5zZXJ0T3BlcmF0aW9uIiwic2hpZnRlZE9wZXJhdGlvbiIsImRlbGV0ZU9wZXJhdGlvbiIsIkRlbGV0ZU9wZXJhdGlvbiIsImZyb21MZW5ndGhBbmRQb3NpdGlvbiIsImluc2VydFR5cGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7OztJQUVNQSxlO0FBQ0osMkJBQVlDLElBQVosRUFBa0JDLE1BQWxCLEVBQTBCQyxRQUExQixFQUFvQztBQUFBOztBQUNuQyxTQUFLRixJQUFMLEdBQVlBLElBQVo7QUFDQyxTQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNEOzs7OzRCQUVPO0FBQ04sYUFBT0gsZUFBZSxDQUFDSSxxQkFBaEIsQ0FBc0MsS0FBS0YsTUFBM0MsRUFBbUQsS0FBS0MsUUFBeEQsQ0FBUDtBQUNEOzs7NkJBRVE7QUFDUCxVQUFNRSxJQUFJLEdBQUc7QUFDTixnQkFBUSxLQUFLSixJQURQO0FBRUwsa0JBQVUsS0FBS0MsTUFGVjtBQUdMLG9CQUFZLEtBQUtDO0FBSFosT0FBYjtBQU1BLGFBQU9FLElBQVA7QUFDRDs7O3VDQUVrQkMsUyxFQUFXO0FBQzVCLGNBQVFBLFNBQVMsQ0FBQ0wsSUFBbEI7QUFDRSxhQUFLLFFBQUw7QUFDRSxpQkFBUSxVQUFDTSxHQUFELEVBQU1DLEdBQU4sRUFBYztBQUVwQixnQkFBSUQsR0FBRyxDQUFDSixRQUFKLEdBQWVLLEdBQUcsQ0FBQ0wsUUFBdkIsRUFBaUM7QUFDL0IscUJBQU8sQ0FBQ0ksR0FBRyxDQUFDRSxLQUFKLEVBQUQsQ0FBUDtBQUNEOztBQUVELGdCQUFJRixHQUFHLENBQUNKLFFBQUosS0FBaUJLLEdBQUcsQ0FBQ0wsUUFBekIsRUFBbUM7QUFDakMsa0JBQUlJLEdBQUcsQ0FBQ0wsTUFBSixLQUFlTSxHQUFHLENBQUNOLE1BQXZCLEVBQStCO0FBQzdCLHVCQUFPLENBQUNLLEdBQUcsQ0FBQ0UsS0FBSixFQUFELENBQVA7QUFDRDs7QUFDRCxrQkFBSUYsR0FBRyxDQUFDTCxNQUFKLEtBQWVNLEdBQUcsQ0FBQ04sTUFBdkIsRUFBK0I7QUFDN0Isb0JBQUksK0JBQWNNLEdBQUcsQ0FBQ04sTUFBbEIsRUFBMEJLLEdBQUcsQ0FBQ0wsTUFBOUIsQ0FBSixFQUEyQztBQUN6Qyx5QkFBTyxDQUFDTSxHQUFHLENBQUNFLEtBQUosQ0FBVUgsR0FBVixDQUFELENBQVA7QUFDRCxpQkFGRCxNQUVPO0FBQ0wseUJBQU8sQ0FBQ0EsR0FBRyxDQUFDRSxLQUFKLEVBQUQsQ0FBUDtBQUNEO0FBQ0Y7QUFDRjs7QUFFRCxnQkFBSUYsR0FBRyxDQUFDSixRQUFKLEdBQWVLLEdBQUcsQ0FBQ0wsUUFBdkIsRUFBaUM7QUFDL0IscUJBQU8sQ0FBQ0ssR0FBRyxDQUFDRSxLQUFKLENBQVVILEdBQVYsQ0FBRCxDQUFQO0FBQ0Q7QUFFRixXQXZCTSxDQXVCSkQsU0F2QkksRUF1Qk8sSUF2QlAsQ0FBUDs7QUF5QkYsYUFBSyxRQUFMO0FBQ0UsaUJBQVEsVUFBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFFcEIsZ0JBQUlELEdBQUcsQ0FBQ0osUUFBSixHQUFlSSxHQUFHLENBQUNJLE1BQW5CLElBQTZCSCxHQUFHLENBQUNMLFFBQXJDLEVBQStDO0FBQzdDLHFCQUFPLENBQUNJLEdBQUcsQ0FBQ0UsS0FBSixFQUFELENBQVA7QUFDRDs7QUFFRCxnQkFBSUYsR0FBRyxDQUFDSixRQUFKLEdBQWVLLEdBQUcsQ0FBQ0wsUUFBdkIsRUFBaUM7QUFDL0IscUJBQU8sQ0FBQ0ssR0FBRyxDQUFDSSxJQUFKLENBQVNMLEdBQVQsQ0FBRCxFQUFnQkMsR0FBRyxDQUFDSSxJQUFKLENBQVNMLEdBQVQsRUFBY0csS0FBZCxDQUFvQkYsR0FBRyxDQUFDRSxLQUFKLENBQVVGLEdBQUcsQ0FBQ0ssS0FBSixDQUFVTixHQUFWLENBQVYsQ0FBcEIsQ0FBaEIsQ0FBUDtBQUNEOztBQUVELGdCQUFJQSxHQUFHLENBQUNKLFFBQUosSUFBZ0JLLEdBQUcsQ0FBQ0wsUUFBeEIsRUFBa0M7QUFDaEMscUJBQU8sQ0FBQ0ssR0FBRyxDQUFDRSxLQUFKLENBQVVILEdBQVYsQ0FBRCxDQUFQO0FBQ0Q7QUFFRixXQWRNLENBY0pELFNBZEksRUFjTyxJQWRQLENBQVA7O0FBZ0JGLGFBQUssT0FBTDtBQUNFLGlCQUFRLFVBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBRXBCLG1CQUFPLENBQUNELEdBQUcsQ0FBQ0UsS0FBSixFQUFELENBQVA7QUFFRCxXQUpNLENBSUpILFNBSkksRUFJTyxJQUpQLENBQVA7QUE3Q0o7QUFtREQ7OztxQ0FFZ0JRLE8sRUFBUztBQUN4QixhQUFPQSxPQUFPLENBQUNDLFNBQVIsQ0FBa0IsQ0FBbEIsRUFBcUIsS0FBS1osUUFBMUIsSUFBc0MsS0FBS0QsTUFBM0MsR0FBb0RZLE9BQU8sQ0FBQ0MsU0FBUixDQUFrQixLQUFLWixRQUF2QixDQUEzRDtBQUNEOzs7dUNBRWtCYSxTLEVBQVc7QUFDNUIsVUFBSUMsb0JBQUo7QUFFQSxVQUFNQyxhQUFhLEdBQUcsS0FBS2YsUUFBM0I7QUFBQSxVQUFxQztBQUMvQlEsTUFBQUEsTUFBTSxHQUFHLEtBQUtULE1BQUwsQ0FBWVMsTUFEM0I7QUFBQSxVQUVNUSxzQkFBc0IsR0FBR0gsU0FBUyxDQUFDSSxnQkFBVixFQUYvQjtBQUFBLFVBR01DLG9CQUFvQixHQUFHTCxTQUFTLENBQUNNLGNBQVYsRUFIN0I7QUFBQSxVQUlNQyxNQUFNLEdBQUdaLE1BSmY7QUFBQSxVQUl3QjtBQUNsQmEsTUFBQUEsU0FBUyxHQUFHRCxNQUxsQixDQUg0QixDQVFGOztBQUUxQixVQUFJLEtBQUosRUFBVyxDQUVWLENBRkQsTUFFTyxJQUFJSixzQkFBc0IsSUFBSUQsYUFBOUIsRUFBNkM7QUFDbERELFFBQUFBLG9CQUFvQixHQUFHRCxTQUFTLENBQUNTLE9BQVYsQ0FBa0JGLE1BQWxCLENBQXZCO0FBQ0QsT0FGTSxNQUVBLElBQUlGLG9CQUFvQixHQUFHSCxhQUEzQixFQUEwQztBQUMvQ0QsUUFBQUEsb0JBQW9CLEdBQUdELFNBQVMsQ0FBQ1Usa0JBQVYsQ0FBNkJGLFNBQTdCLENBQXZCO0FBQ0QsT0FGTSxNQUVBO0FBQ0xQLFFBQUFBLG9CQUFvQixHQUFHRCxTQUFTLENBQUNQLEtBQVYsRUFBdkI7QUFDRDs7QUFFRCxhQUFPUSxvQkFBUDtBQUNEOzs7NEJBRU9NLE0sRUFBUTtBQUNkLFVBQU1yQixNQUFNLEdBQUcsS0FBS0EsTUFBcEI7QUFBQSxVQUNNQyxRQUFRLEdBQUcsS0FBS0EsUUFBTCxHQUFnQm9CLE1BRGpDO0FBQUEsVUFFTUksZUFBZSxHQUFHM0IsZUFBZSxDQUFDSSxxQkFBaEIsQ0FBc0NGLE1BQXRDLEVBQThDQyxRQUE5QyxDQUZ4QjtBQUlBLGFBQU93QixlQUFQO0FBQ0Q7OzswQkFFS3JCLFMsRUFBVztBQUNmLFVBQU1LLE1BQU0sR0FBRyxLQUFLVCxNQUFMLENBQVlTLE1BQTNCO0FBQUEsVUFDRVksTUFBTSxHQUFHWixNQURYO0FBQUEsVUFDb0I7QUFDZGlCLE1BQUFBLGdCQUFnQixHQUFHdEIsU0FBUyxDQUFDbUIsT0FBVixDQUFrQkYsTUFBbEIsQ0FGekI7QUFJQSxhQUFPSyxnQkFBUDtBQUNEOzs7eUJBRUlDLGUsRUFBaUI7QUFDcEIsVUFBTTFCLFFBQVEsR0FBRzBCLGVBQWUsQ0FBQzFCLFFBQWpDO0FBQUEsVUFDTVEsTUFBTSxHQUFHLEtBQUtSLFFBQUwsR0FBZ0JBLFFBRC9CO0FBR0EwQixNQUFBQSxlQUFlLEdBQUdDLG1CQUFnQkMscUJBQWhCLENBQXNDcEIsTUFBdEMsRUFBOENSLFFBQTlDLENBQWxCO0FBRUEsYUFBTzBCLGVBQVA7QUFDRDs7OzBCQUVLQSxlLEVBQWlCO0FBQ3JCLFVBQUlsQixNQUFNLEdBQUdrQixlQUFlLENBQUNsQixNQUE3QjtBQUFBLFVBQ0lSLFFBQVEsR0FBRzBCLGVBQWUsQ0FBQzFCLFFBRC9CO0FBR0FRLE1BQUFBLE1BQU0sR0FBR0EsTUFBTSxHQUFHLEtBQUtSLFFBQWQsR0FBeUJBLFFBQWxDO0FBQ0FBLE1BQUFBLFFBQVEsR0FBRyxLQUFLQSxRQUFoQjtBQUVBMEIsTUFBQUEsZUFBZSxHQUFHQyxtQkFBZ0JDLHFCQUFoQixDQUFzQ3BCLE1BQXRDLEVBQThDUixRQUE5QyxDQUFsQjtBQUVBLGFBQU8wQixlQUFQO0FBQ0Q7OzswQ0FFNEIzQixNLEVBQVFDLFEsRUFBVTtBQUM3QyxVQUFNRixJQUFJLEdBQUcrQixpQkFBYjtBQUFBLFVBQTBCO0FBQ3BCTCxNQUFBQSxlQUFlLEdBQUcsSUFBSTNCLGVBQUosQ0FBb0JDLElBQXBCLEVBQTBCQyxNQUExQixFQUFrQ0MsUUFBbEMsQ0FEeEI7QUFHQSxhQUFPd0IsZUFBUDtBQUNEOzs7NkJBRWV0QixJLEVBQU07QUFDcEIsVUFBTUosSUFBSSxHQUFHSSxJQUFJLENBQUMsTUFBRCxDQUFqQjtBQUFBLFVBQ01ILE1BQU0sR0FBR0csSUFBSSxDQUFDLFFBQUQsQ0FEbkI7QUFBQSxVQUVNRixRQUFRLEdBQUdFLElBQUksQ0FBQyxVQUFELENBRnJCO0FBQUEsVUFHTXNCLGVBQWUsR0FBRyxJQUFJM0IsZUFBSixDQUFvQkMsSUFBcEIsRUFBMEJDLE1BQTFCLEVBQWtDQyxRQUFsQyxDQUh4QjtBQUtBLGFBQU93QixlQUFQO0FBQ0Q7Ozs7OztBQUdITSxNQUFNLENBQUNDLE9BQVAsR0FBaUJsQyxlQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHN0cmluZ0NvbXBhcmUgZnJvbSBcIi4uL3N0cmluZ0NvbXBhcmVcIjtcclxuaW1wb3J0IERlbGV0ZU9wZXJhdGlvbiBmcm9tIFwiLi4vb3BlcmF0aW9uL2RlbGV0ZVwiO1xyXG5cclxuaW1wb3J0IHsgaW5zZXJ0VHlwZSB9IGZyb20gXCIuLi90eXBlc1wiO1xyXG5cclxuY2xhc3MgSW5zZXJ0T3BlcmF0aW9uIHtcclxuICBjb25zdHJ1Y3Rvcih0eXBlLCBzdHJpbmcsIHBvc2l0aW9uKSB7XHJcblx0ICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgdGhpcy5zdHJpbmcgPSBzdHJpbmc7XHJcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgfVxyXG5cclxuICBjbG9uZSgpIHtcclxuICAgIHJldHVybiBJbnNlcnRPcGVyYXRpb24uZnJvbVN0cmluZ0FuZFBvc2l0aW9uKHRoaXMuc3RyaW5nLCB0aGlzLnBvc2l0aW9uKTtcclxuICB9XHJcblxyXG4gIHRvSlNPTigpIHtcclxuICAgIGNvbnN0IGpzb24gPSB7XHJcblx0ICAgICAgICAgIFwidHlwZVwiOiB0aGlzLnR5cGUsXHJcbiAgICAgICAgICAgIFwic3RyaW5nXCI6IHRoaXMuc3RyaW5nLFxyXG4gICAgICAgICAgICBcInBvc2l0aW9uXCI6IHRoaXMucG9zaXRpb25cclxuICAgICAgICAgIH07XHJcbiAgICBcclxuICAgIHJldHVybiBqc29uO1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtT3BlcmF0aW9uKG9wZXJhdGlvbikge1xyXG4gICAgc3dpdGNoIChvcGVyYXRpb24udHlwZSkge1xyXG4gICAgICBjYXNlIFwiaW5zZXJ0XCI6XHJcbiAgICAgICAgcmV0dXJuICgodGF1LCByaG8pID0+IHtcclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uIDwgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbdGF1LmNsb25lKCldO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPT09IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICBpZiAodGF1LnN0cmluZyA9PT0gcmhvLnN0cmluZykge1xyXG4gICAgICAgICAgICAgIHJldHVybiBbdGF1LmNsb25lKCldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0YXUuc3RyaW5nICE9PSByaG8uc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHN0cmluZ0NvbXBhcmUocmhvLnN0cmluZywgdGF1LnN0cmluZykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbcmhvLnNoaWZ0KHRhdSldO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW3RhdS5jbG9uZSgpXTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uID4gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbcmhvLnNoaWZ0KHRhdSldO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KShvcGVyYXRpb24sIHRoaXMpO1xyXG5cclxuICAgICAgY2FzZSBcImRlbGV0ZVwiOlxyXG4gICAgICAgIHJldHVybiAoKHRhdSwgcmhvKSA9PiB7XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiArIHRhdS5sZW5ndGggPD0gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbdGF1LmNsb25lKCldO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPCByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtyaG8ubGVmdCh0YXUpLCByaG8ubGVmdCh0YXUpLnNoaWZ0KHJoby5zaGlmdChyaG8ucmlnaHQodGF1KSkpXTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uID49IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gW3Joby5zaGlmdCh0YXUpXTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSkob3BlcmF0aW9uLCB0aGlzKTtcclxuXHJcbiAgICAgIGNhc2UgXCJlbXB0eVwiOlxyXG4gICAgICAgIHJldHVybiAoKHRhdSwgcmhvKSA9PiB7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIFt0YXUuY2xvbmUoKV07XHJcblxyXG4gICAgICAgIH0pKG9wZXJhdGlvbiwgdGhpcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1Db250ZW50KGNvbnRlbnQpIHtcclxuICAgIHJldHVybiBjb250ZW50LnN1YnN0cmluZygwLCB0aGlzLnBvc2l0aW9uKSArIHRoaXMuc3RyaW5nICsgY29udGVudC5zdWJzdHJpbmcodGhpcy5wb3NpdGlvbik7XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1TZWxlY3Rpb24oc2VsZWN0aW9uKSB7XHJcbiAgICBsZXQgdHJhbnNmb3JtZWRTZWxlY3Rpb247XHJcblxyXG4gICAgY29uc3Qgc3RhcnRQb3NpdGlvbiA9IHRoaXMucG9zaXRpb24sIC8vL1xyXG4gICAgICAgICAgbGVuZ3RoID0gdGhpcy5zdHJpbmcubGVuZ3RoLFxyXG4gICAgICAgICAgc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRTdGFydFBvc2l0aW9uKCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRFbmRQb3NpdGlvbigpLFxyXG4gICAgICAgICAgb2Zmc2V0ID0gbGVuZ3RoLCAgLy8vXHJcbiAgICAgICAgICBlbmRPZmZzZXQgPSBvZmZzZXQ7IC8vL1xyXG5cclxuICAgIGlmIChmYWxzZSkge1xyXG5cclxuICAgIH0gZWxzZSBpZiAoc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiA+PSBzdGFydFBvc2l0aW9uKSB7XHJcbiAgICAgIHRyYW5zZm9ybWVkU2VsZWN0aW9uID0gc2VsZWN0aW9uLnNoaWZ0ZWQob2Zmc2V0KTtcclxuICAgIH0gZWxzZSBpZiAoc2VsZWN0aW9uRW5kUG9zaXRpb24gPiBzdGFydFBvc2l0aW9uKSB7XHJcbiAgICAgIHRyYW5zZm9ybWVkU2VsZWN0aW9uID0gc2VsZWN0aW9uLmVuZFBvc2l0aW9uU2hpZnRlZChlbmRPZmZzZXQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdHJhbnNmb3JtZWRTZWxlY3Rpb24gPSBzZWxlY3Rpb24uY2xvbmUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJhbnNmb3JtZWRTZWxlY3Rpb247XHJcbiAgfVxyXG5cclxuICBzaGlmdGVkKG9mZnNldCkge1xyXG4gICAgY29uc3Qgc3RyaW5nID0gdGhpcy5zdHJpbmcsXHJcbiAgICAgICAgICBwb3NpdGlvbiA9IHRoaXMucG9zaXRpb24gKyBvZmZzZXQsXHJcbiAgICAgICAgICBpbnNlcnRPcGVyYXRpb24gPSBJbnNlcnRPcGVyYXRpb24uZnJvbVN0cmluZ0FuZFBvc2l0aW9uKHN0cmluZywgcG9zaXRpb24pO1xyXG5cclxuICAgIHJldHVybiBpbnNlcnRPcGVyYXRpb247XHJcbiAgfVxyXG5cclxuICBzaGlmdChvcGVyYXRpb24pIHtcclxuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMuc3RyaW5nLmxlbmd0aCxcclxuXHRcdFx0XHQgIG9mZnNldCA9IGxlbmd0aCwgIC8vL1xyXG4gICAgICAgICAgc2hpZnRlZE9wZXJhdGlvbiA9IG9wZXJhdGlvbi5zaGlmdGVkKG9mZnNldCk7XHJcblxyXG4gICAgcmV0dXJuIHNoaWZ0ZWRPcGVyYXRpb247XHJcbiAgfVxyXG5cclxuICBsZWZ0KGRlbGV0ZU9wZXJhdGlvbikge1xyXG4gICAgY29uc3QgcG9zaXRpb24gPSBkZWxldGVPcGVyYXRpb24ucG9zaXRpb24sXHJcbiAgICAgICAgICBsZW5ndGggPSB0aGlzLnBvc2l0aW9uIC0gcG9zaXRpb247XHJcblxyXG4gICAgZGVsZXRlT3BlcmF0aW9uID0gRGVsZXRlT3BlcmF0aW9uLmZyb21MZW5ndGhBbmRQb3NpdGlvbihsZW5ndGgsIHBvc2l0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gZGVsZXRlT3BlcmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgcmlnaHQoZGVsZXRlT3BlcmF0aW9uKSB7XHJcbiAgICBsZXQgbGVuZ3RoID0gZGVsZXRlT3BlcmF0aW9uLmxlbmd0aCxcclxuICAgICAgICBwb3NpdGlvbiA9IGRlbGV0ZU9wZXJhdGlvbi5wb3NpdGlvbjtcclxuXHJcbiAgICBsZW5ndGggPSBsZW5ndGggLSB0aGlzLnBvc2l0aW9uICsgcG9zaXRpb247XHJcbiAgICBwb3NpdGlvbiA9IHRoaXMucG9zaXRpb247XHJcblxyXG4gICAgZGVsZXRlT3BlcmF0aW9uID0gRGVsZXRlT3BlcmF0aW9uLmZyb21MZW5ndGhBbmRQb3NpdGlvbihsZW5ndGgsIHBvc2l0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gZGVsZXRlT3BlcmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21TdHJpbmdBbmRQb3NpdGlvbihzdHJpbmcsIHBvc2l0aW9uKSB7XHJcbiAgICBjb25zdCB0eXBlID0gaW5zZXJ0VHlwZSwgIC8vL1xyXG4gICAgICAgICAgaW5zZXJ0T3BlcmF0aW9uID0gbmV3IEluc2VydE9wZXJhdGlvbih0eXBlLCBzdHJpbmcsIHBvc2l0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gaW5zZXJ0T3BlcmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcclxuICAgIGNvbnN0IHR5cGUgPSBqc29uW1widHlwZVwiXSxcclxuICAgICAgICAgIHN0cmluZyA9IGpzb25bXCJzdHJpbmdcIl0sXHJcbiAgICAgICAgICBwb3NpdGlvbiA9IGpzb25bXCJwb3NpdGlvblwiXSxcclxuICAgICAgICAgIGluc2VydE9wZXJhdGlvbiA9IG5ldyBJbnNlcnRPcGVyYXRpb24odHlwZSwgc3RyaW5nLCBwb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIGluc2VydE9wZXJhdGlvbjtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSW5zZXJ0T3BlcmF0aW9uO1xyXG4iXX0=