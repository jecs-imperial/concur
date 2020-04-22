"use strict";

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

module.exports = EmptyOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVtcHR5LmpzIl0sIm5hbWVzIjpbIkVtcHR5T3BlcmF0aW9uIiwidHlwZSIsImZyb21Ob3RoaW5nIiwianNvbiIsIm9wZXJhdGlvbiIsInRhdSIsInJobyIsImNsb25lIiwiY29udGVudCIsInNlbGVjdGlvbiIsInRyYW5zZm9ybWVkU2VsZWN0aW9uIiwib2Zmc2V0Iiwic2hpZnRlZE9wZXJhdGlvbiIsInNoaWZ0ZWQiLCJlbXB0eVR5cGUiLCJlbXB0eU9wZXJhdGlvbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOzs7Ozs7OztJQUVNQSxjO0FBQ0osMEJBQVlDLElBQVosRUFBa0I7QUFBQTs7QUFDaEIsU0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBR0Q7Ozs7NEJBRU87QUFDTixhQUFPRCxjQUFjLENBQUNFLFdBQWYsRUFBUDtBQUNEOzs7NkJBRVE7QUFDUCxVQUFNQyxJQUFJLEdBQUc7QUFDTCxnQkFBUSxLQUFLRjtBQURSLE9BQWI7QUFNQSxhQUFPRSxJQUFQO0FBQ0Q7Ozt1Q0FFa0JDLFMsRUFBVztBQUM1QixhQUFRLFVBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBRXBCLGVBQU8sQ0FBQ0QsR0FBRyxDQUFDRSxLQUFKLEVBQUQsQ0FBUDtBQUVELE9BSk0sQ0FJSkgsU0FKSSxFQUlPLElBSlAsQ0FBUDtBQUtEOzs7cUNBRWdCSSxPLEVBQVM7QUFDeEIsYUFBT0EsT0FBUDtBQUNEOzs7dUNBRWtCQyxTLEVBQVc7QUFDNUIsVUFBTUMsb0JBQW9CLEdBQUdELFNBQVMsQ0FBQ0YsS0FBVixFQUE3QjtBQUVBLGFBQU9HLG9CQUFQO0FBQ0Q7OzswQkFJS04sUyxFQUFXO0FBQ2hCLFVBQU1PLE1BQU0sR0FBRyxDQUFmO0FBQUEsVUFDT0MsZ0JBQWdCLEdBQUdSLFNBQVMsQ0FBQ1MsT0FBVixDQUFrQkYsTUFBbEIsQ0FEMUI7QUFHQSxhQUFPQyxnQkFBUDtBQUNBOzs7a0NBTW9CO0FBQ25CLFVBQU1YLElBQUksR0FBR2EsZ0JBQWI7QUFBQSxVQUF3QjtBQUNoQkMsTUFBQUEsY0FBYyxHQUFHLElBQUlmLGNBQUosQ0FBbUJDLElBQW5CLENBRHpCO0FBR0EsYUFBT2MsY0FBUDtBQUNEOzs7NkJBRWVaLEksRUFBTTtBQUNwQixVQUFNRixJQUFJLEdBQUdFLElBQUksQ0FBQyxNQUFELENBQWpCO0FBQUEsVUFDTVksY0FBYyxHQUFHLElBQUlmLGNBQUosQ0FBbUJDLElBQW5CLENBRHZCO0FBR0EsYUFBT2MsY0FBUDtBQUNEOzs7Ozs7QUFHSEMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCakIsY0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmltcG9ydCB7IGVtcHR5VHlwZSB9IGZyb20gXCIuLi90eXBlc1wiO1xyXG5cclxuY2xhc3MgRW1wdHlPcGVyYXRpb24ge1xyXG4gIGNvbnN0cnVjdG9yKHR5cGUpIHtcclxuICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcblxyXG5cclxuICB9XHJcblxyXG4gIGNsb25lKCkge1xyXG4gICAgcmV0dXJuIEVtcHR5T3BlcmF0aW9uLmZyb21Ob3RoaW5nKCk7XHJcbiAgfVxyXG5cclxuICB0b0pTT04oKSB7XHJcbiAgICBjb25zdCBqc29uID0ge1xyXG4gICAgICAgICAgICBcInR5cGVcIjogdGhpcy50eXBlXHJcbiAgICAgICAgICB9O1xyXG5cclxuXHJcbiAgICBcclxuICAgIHJldHVybiBqc29uO1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtT3BlcmF0aW9uKG9wZXJhdGlvbikge1xyXG4gICAgcmV0dXJuICgodGF1LCByaG8pID0+IHtcclxuXHJcbiAgICAgIHJldHVybiBbdGF1LmNsb25lKCldO1xyXG5cclxuICAgIH0pKG9wZXJhdGlvbiwgdGhpcyk7XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1Db250ZW50KGNvbnRlbnQpIHtcclxuICAgIHJldHVybiBjb250ZW50O1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtU2VsZWN0aW9uKHNlbGVjdGlvbikge1xyXG4gICAgY29uc3QgdHJhbnNmb3JtZWRTZWxlY3Rpb24gPSBzZWxlY3Rpb24uY2xvbmUoKTtcclxuXHJcbiAgICByZXR1cm4gdHJhbnNmb3JtZWRTZWxlY3Rpb247XHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIHNoaWZ0KG9wZXJhdGlvbikge1xyXG4gIFx0Y29uc3Qgb2Zmc2V0ID0gMCxcclxuICAgICAgICAgIHNoaWZ0ZWRPcGVyYXRpb24gPSBvcGVyYXRpb24uc2hpZnRlZChvZmZzZXQpO1xyXG5cclxuICBcdHJldHVybiBzaGlmdGVkT3BlcmF0aW9uO1xyXG4gIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG4gIHN0YXRpYyBmcm9tTm90aGluZygpIHtcclxuICAgIGNvbnN0IHR5cGUgPSBlbXB0eVR5cGUsIC8vL1xyXG4gICAgICAgICAgICBlbXB0eU9wZXJhdGlvbiA9IG5ldyBFbXB0eU9wZXJhdGlvbih0eXBlKTtcclxuXHJcbiAgICByZXR1cm4gZW1wdHlPcGVyYXRpb247XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xyXG4gICAgY29uc3QgdHlwZSA9IGpzb25bXCJ0eXBlXCJdLFxyXG4gICAgICAgICAgZW1wdHlPcGVyYXRpb24gPSBuZXcgRW1wdHlPcGVyYXRpb24odHlwZSk7XHJcblxyXG4gICAgcmV0dXJuIGVtcHR5T3BlcmF0aW9uO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBFbXB0eU9wZXJhdGlvbjtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=