"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var types = require("../types");

var emptyType = types.emptyType;

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
      var type = emptyType,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVtcHR5LmpzIl0sIm5hbWVzIjpbInR5cGVzIiwicmVxdWlyZSIsImVtcHR5VHlwZSIsIkVtcHR5T3BlcmF0aW9uIiwidHlwZSIsImZyb21Ob3RoaW5nIiwianNvbiIsIm9wZXJhdGlvbiIsInRhdSIsInJobyIsImNsb25lIiwiY29udGVudCIsInNlbGVjdGlvbiIsInRyYW5zZm9ybWVkU2VsZWN0aW9uIiwib2Zmc2V0Iiwic2hpZnRlZE9wZXJhdGlvbiIsInNoaWZ0ZWQiLCJlbXB0eU9wZXJhdGlvbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQUVBLElBQU1BLEtBQUssR0FBR0MsT0FBTyxDQUFDLFVBQUQsQ0FBckI7O0lBRVFDLFMsR0FBY0YsSyxDQUFkRSxTOztJQUVGQyxjO0FBQ0osMEJBQVlDLElBQVosRUFBa0I7QUFBQTs7QUFDaEIsU0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBR0Q7Ozs7NEJBRU87QUFDTixhQUFPRCxjQUFjLENBQUNFLFdBQWYsRUFBUDtBQUNEOzs7NkJBRVE7QUFDUCxVQUFNQyxJQUFJLEdBQUc7QUFDTCxnQkFBUSxLQUFLRjtBQURSLE9BQWI7QUFNQSxhQUFPRSxJQUFQO0FBQ0Q7Ozt1Q0FFa0JDLFMsRUFBVztBQUM1QixhQUFRLFVBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBRXBCLGVBQU8sQ0FBQ0QsR0FBRyxDQUFDRSxLQUFKLEVBQUQsQ0FBUDtBQUVELE9BSk0sQ0FJSkgsU0FKSSxFQUlPLElBSlAsQ0FBUDtBQUtEOzs7cUNBRWdCSSxPLEVBQVM7QUFDeEIsYUFBT0EsT0FBUDtBQUNEOzs7dUNBRWtCQyxTLEVBQVc7QUFDNUIsVUFBTUMsb0JBQW9CLEdBQUdELFNBQVMsQ0FBQ0YsS0FBVixFQUE3QjtBQUVBLGFBQU9HLG9CQUFQO0FBQ0Q7OzswQkFJS04sUyxFQUFXO0FBQ2hCLFVBQU1PLE1BQU0sR0FBRyxDQUFmO0FBQUEsVUFDT0MsZ0JBQWdCLEdBQUdSLFNBQVMsQ0FBQ1MsT0FBVixDQUFrQkYsTUFBbEIsQ0FEMUI7QUFHQSxhQUFPQyxnQkFBUDtBQUNBOzs7a0NBTW9CO0FBQ25CLFVBQU1YLElBQUksR0FBR0YsU0FBYjtBQUFBLFVBQXdCO0FBQ2hCZSxNQUFBQSxjQUFjLEdBQUcsSUFBSWQsY0FBSixDQUFtQkMsSUFBbkIsQ0FEekI7QUFHQSxhQUFPYSxjQUFQO0FBQ0Q7Ozs2QkFFZVgsSSxFQUFNO0FBQ3BCLFVBQU1GLElBQUksR0FBR0UsSUFBSSxDQUFDLE1BQUQsQ0FBakI7QUFBQSxVQUNNVyxjQUFjLEdBQUcsSUFBSWQsY0FBSixDQUFtQkMsSUFBbkIsQ0FEdkI7QUFHQSxhQUFPYSxjQUFQO0FBQ0Q7Ozs7OztBQUdIQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJoQixjQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5cclxuY29uc3QgdHlwZXMgPSByZXF1aXJlKFwiLi4vdHlwZXNcIik7XHJcblxyXG5jb25zdCB7IGVtcHR5VHlwZSB9ID0gdHlwZXM7XHJcblxyXG5jbGFzcyBFbXB0eU9wZXJhdGlvbiB7XHJcbiAgY29uc3RydWN0b3IodHlwZSkge1xyXG4gICAgdGhpcy50eXBlID0gdHlwZTtcclxuXHJcblxyXG4gIH1cclxuXHJcbiAgY2xvbmUoKSB7XHJcbiAgICByZXR1cm4gRW1wdHlPcGVyYXRpb24uZnJvbU5vdGhpbmcoKTtcclxuICB9XHJcblxyXG4gIHRvSlNPTigpIHtcclxuICAgIGNvbnN0IGpzb24gPSB7XHJcbiAgICAgICAgICAgIFwidHlwZVwiOiB0aGlzLnR5cGVcclxuICAgICAgICAgIH07XHJcblxyXG5cclxuICAgIFxyXG4gICAgcmV0dXJuIGpzb247XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1PcGVyYXRpb24ob3BlcmF0aW9uKSB7XHJcbiAgICByZXR1cm4gKCh0YXUsIHJobykgPT4ge1xyXG5cclxuICAgICAgcmV0dXJuIFt0YXUuY2xvbmUoKV07XHJcblxyXG4gICAgfSkob3BlcmF0aW9uLCB0aGlzKTtcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybUNvbnRlbnQoY29udGVudCkge1xyXG4gICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1TZWxlY3Rpb24oc2VsZWN0aW9uKSB7XHJcbiAgICBjb25zdCB0cmFuc2Zvcm1lZFNlbGVjdGlvbiA9IHNlbGVjdGlvbi5jbG9uZSgpO1xyXG5cclxuICAgIHJldHVybiB0cmFuc2Zvcm1lZFNlbGVjdGlvbjtcclxuICB9XHJcblxyXG5cclxuXHJcbiAgc2hpZnQob3BlcmF0aW9uKSB7XHJcbiAgXHRjb25zdCBvZmZzZXQgPSAwLFxyXG4gICAgICAgICAgc2hpZnRlZE9wZXJhdGlvbiA9IG9wZXJhdGlvbi5zaGlmdGVkKG9mZnNldCk7XHJcblxyXG4gIFx0cmV0dXJuIHNoaWZ0ZWRPcGVyYXRpb247XHJcbiAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgc3RhdGljIGZyb21Ob3RoaW5nKCkge1xyXG4gICAgY29uc3QgdHlwZSA9IGVtcHR5VHlwZSwgLy8vXHJcbiAgICAgICAgICAgIGVtcHR5T3BlcmF0aW9uID0gbmV3IEVtcHR5T3BlcmF0aW9uKHR5cGUpO1xyXG5cclxuICAgIHJldHVybiBlbXB0eU9wZXJhdGlvbjtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XHJcbiAgICBjb25zdCB0eXBlID0ganNvbltcInR5cGVcIl0sXHJcbiAgICAgICAgICBlbXB0eU9wZXJhdGlvbiA9IG5ldyBFbXB0eU9wZXJhdGlvbih0eXBlKTtcclxuXHJcbiAgICByZXR1cm4gZW1wdHlPcGVyYXRpb247XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEVtcHR5T3BlcmF0aW9uO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==