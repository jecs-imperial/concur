"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _types = require("../types");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EmptyOperation = /*#__PURE__*/function () {
  function EmptyOperation(type) {
    _classCallCheck(this, EmptyOperation);

    this.type = type;
  }

  _createClass(EmptyOperation, [{
    key: "clone",
    value: function clone() {
      return EmptyOperation.fromNothing();
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var json = {
        "type": this.type
      };
      return json;
    }
  }, {
    key: "transformOperation",
    value: function transformOperation(operation) {
      return function (tau, rho) {
        return [tau.clone()];
      }(operation, this);
    }
  }, {
    key: "transformContent",
    value: function transformContent(content) {
      return content;
    }
  }, {
    key: "transformSelection",
    value: function transformSelection(selection) {
      var transformedSelection = selection.clone();
      return transformedSelection;
    }
  }, {
    key: "shift",
    value: function shift(operation) {
      var offset = 0,
          shiftedOperation = operation.shifted(offset);
      return shiftedOperation;
    }
  }], [{
    key: "fromNothing",
    value: function fromNothing() {
      var type = _types.emptyType,
          ///
      emptyOperation = new EmptyOperation(type);
      return emptyOperation;
    }
  }, {
    key: "fromJSON",
    value: function fromJSON(json) {
      var type = json["type"],
          emptyOperation = new EmptyOperation(type);
      return emptyOperation;
    }
  }]);

  return EmptyOperation;
}();

exports["default"] = EmptyOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVtcHR5LmpzIl0sIm5hbWVzIjpbIkVtcHR5T3BlcmF0aW9uIiwidHlwZSIsImZyb21Ob3RoaW5nIiwianNvbiIsIm9wZXJhdGlvbiIsInRhdSIsInJobyIsImNsb25lIiwiY29udGVudCIsInNlbGVjdGlvbiIsInRyYW5zZm9ybWVkU2VsZWN0aW9uIiwib2Zmc2V0Iiwic2hpZnRlZE9wZXJhdGlvbiIsInNoaWZ0ZWQiLCJlbXB0eVR5cGUiLCJlbXB0eU9wZXJhdGlvbiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7Ozs7Ozs7SUFFcUJBLGM7QUFDbkIsMEJBQVlDLElBQVosRUFBa0I7QUFBQTs7QUFDaEIsU0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBR0Q7Ozs7NEJBRU87QUFDTixhQUFPRCxjQUFjLENBQUNFLFdBQWYsRUFBUDtBQUNEOzs7NkJBRVE7QUFDUCxVQUFNQyxJQUFJLEdBQUc7QUFDTCxnQkFBUSxLQUFLRjtBQURSLE9BQWI7QUFNQSxhQUFPRSxJQUFQO0FBQ0Q7Ozt1Q0FFa0JDLFMsRUFBVztBQUM1QixhQUFRLFVBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBRXBCLGVBQU8sQ0FBQ0QsR0FBRyxDQUFDRSxLQUFKLEVBQUQsQ0FBUDtBQUVELE9BSk0sQ0FJSkgsU0FKSSxFQUlPLElBSlAsQ0FBUDtBQUtEOzs7cUNBRWdCSSxPLEVBQVM7QUFDeEIsYUFBT0EsT0FBUDtBQUNEOzs7dUNBRWtCQyxTLEVBQVc7QUFDNUIsVUFBTUMsb0JBQW9CLEdBQUdELFNBQVMsQ0FBQ0YsS0FBVixFQUE3QjtBQUVBLGFBQU9HLG9CQUFQO0FBQ0Q7OzswQkFJS04sUyxFQUFXO0FBQ2hCLFVBQU1PLE1BQU0sR0FBRyxDQUFmO0FBQUEsVUFDT0MsZ0JBQWdCLEdBQUdSLFNBQVMsQ0FBQ1MsT0FBVixDQUFrQkYsTUFBbEIsQ0FEMUI7QUFHQSxhQUFPQyxnQkFBUDtBQUNBOzs7a0NBTW9CO0FBQ25CLFVBQU1YLElBQUksR0FBR2EsZ0JBQWI7QUFBQSxVQUF3QjtBQUNoQkMsTUFBQUEsY0FBYyxHQUFHLElBQUlmLGNBQUosQ0FBbUJDLElBQW5CLENBRHpCO0FBR0EsYUFBT2MsY0FBUDtBQUNEOzs7NkJBRWVaLEksRUFBTTtBQUNwQixVQUFNRixJQUFJLEdBQUdFLElBQUksQ0FBQyxNQUFELENBQWpCO0FBQUEsVUFDTVksY0FBYyxHQUFHLElBQUlmLGNBQUosQ0FBbUJDLElBQW5CLENBRHZCO0FBR0EsYUFBT2MsY0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5pbXBvcnQgeyBlbXB0eVR5cGUgfSBmcm9tIFwiLi4vdHlwZXNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVtcHR5T3BlcmF0aW9uIHtcclxuICBjb25zdHJ1Y3Rvcih0eXBlKSB7XHJcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG5cclxuXHJcbiAgfVxyXG5cclxuICBjbG9uZSgpIHtcclxuICAgIHJldHVybiBFbXB0eU9wZXJhdGlvbi5mcm9tTm90aGluZygpO1xyXG4gIH1cclxuXHJcbiAgdG9KU09OKCkge1xyXG4gICAgY29uc3QganNvbiA9IHtcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IHRoaXMudHlwZVxyXG4gICAgICAgICAgfTtcclxuXHJcblxyXG4gICAgXHJcbiAgICByZXR1cm4ganNvbjtcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybU9wZXJhdGlvbihvcGVyYXRpb24pIHtcclxuICAgIHJldHVybiAoKHRhdSwgcmhvKSA9PiB7XHJcblxyXG4gICAgICByZXR1cm4gW3RhdS5jbG9uZSgpXTtcclxuXHJcbiAgICB9KShvcGVyYXRpb24sIHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtQ29udGVudChjb250ZW50KSB7XHJcbiAgICByZXR1cm4gY29udGVudDtcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybVNlbGVjdGlvbihzZWxlY3Rpb24pIHtcclxuICAgIGNvbnN0IHRyYW5zZm9ybWVkU2VsZWN0aW9uID0gc2VsZWN0aW9uLmNsb25lKCk7XHJcblxyXG4gICAgcmV0dXJuIHRyYW5zZm9ybWVkU2VsZWN0aW9uO1xyXG4gIH1cclxuXHJcblxyXG5cclxuICBzaGlmdChvcGVyYXRpb24pIHtcclxuICBcdGNvbnN0IG9mZnNldCA9IDAsXHJcbiAgICAgICAgICBzaGlmdGVkT3BlcmF0aW9uID0gb3BlcmF0aW9uLnNoaWZ0ZWQob2Zmc2V0KTtcclxuXHJcbiAgXHRyZXR1cm4gc2hpZnRlZE9wZXJhdGlvbjtcclxuICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuICBzdGF0aWMgZnJvbU5vdGhpbmcoKSB7XHJcbiAgICBjb25zdCB0eXBlID0gZW1wdHlUeXBlLCAvLy9cclxuICAgICAgICAgICAgZW1wdHlPcGVyYXRpb24gPSBuZXcgRW1wdHlPcGVyYXRpb24odHlwZSk7XHJcblxyXG4gICAgcmV0dXJuIGVtcHR5T3BlcmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcclxuICAgIGNvbnN0IHR5cGUgPSBqc29uW1widHlwZVwiXSxcclxuICAgICAgICAgIGVtcHR5T3BlcmF0aW9uID0gbmV3IEVtcHR5T3BlcmF0aW9uKHR5cGUpO1xyXG5cclxuICAgIHJldHVybiBlbXB0eU9wZXJhdGlvbjtcclxuICB9XHJcbn1cclxuIl19