"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _types = require("../types");
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
var EmptyOperation = /*#__PURE__*/ function() {
    function EmptyOperation(type) {
        _classCallCheck(this, EmptyOperation);
        this.type = type;
    }
    _createClass(EmptyOperation, [
        {
            key: "clone",
            value: function clone() {
                return EmptyOperation.fromNothing();
            }
        },
        {
            key: "toJSON",
            value: function toJSON() {
                var json = {
                    "type": this.type
                };
                return json;
            }
        },
        {
            key: "transformOperation",
            value: function transformOperation(operation) {
                return (function(tau, rho) {
                    return [
                        tau.clone()
                    ];
                })(operation, this);
            }
        },
        {
            key: "transformContent",
            value: function transformContent(content) {
                return content;
            }
        },
        {
            key: "transformSelection",
            value: function transformSelection(selection) {
                var transformedSelection = selection.clone();
                return transformedSelection;
            }
        },
        {
            key: "shift",
            value: function shift(operation) {
                var offset = 0, shiftedOperation = operation.shifted(offset);
                return shiftedOperation;
            }
        }
    ], [
        {
            key: "fromNothing",
            value: function fromNothing() {
                var type = _types.emptyType, emptyOperation = new EmptyOperation(type);
                return emptyOperation;
            }
        },
        {
            key: "fromJSON",
            value: function fromJSON(json) {
                var type = json["type"], emptyOperation = new EmptyOperation(type);
                return emptyOperation;
            }
        }
    ]);
    return EmptyOperation;
}();
exports.default = EmptyOperation;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVyYXRpb24vZW1wdHkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5pbXBvcnQgeyBlbXB0eVR5cGUgfSBmcm9tIFwiLi4vdHlwZXNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVtcHR5T3BlcmF0aW9uIHtcclxuICBjb25zdHJ1Y3Rvcih0eXBlKSB7XHJcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG5cclxuXHJcbiAgfVxyXG5cclxuICBjbG9uZSgpIHtcclxuICAgIHJldHVybiBFbXB0eU9wZXJhdGlvbi5mcm9tTm90aGluZygpO1xyXG4gIH1cclxuXHJcbiAgdG9KU09OKCkge1xyXG4gICAgY29uc3QganNvbiA9IHtcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IHRoaXMudHlwZVxyXG4gICAgICAgICAgfTtcclxuXHJcblxyXG4gICAgXHJcbiAgICByZXR1cm4ganNvbjtcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybU9wZXJhdGlvbihvcGVyYXRpb24pIHtcclxuICAgIHJldHVybiAoKHRhdSwgcmhvKSA9PiB7XHJcblxyXG4gICAgICByZXR1cm4gW3RhdS5jbG9uZSgpXTtcclxuXHJcbiAgICB9KShvcGVyYXRpb24sIHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtQ29udGVudChjb250ZW50KSB7XHJcbiAgICByZXR1cm4gY29udGVudDtcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybVNlbGVjdGlvbihzZWxlY3Rpb24pIHtcclxuICAgIGNvbnN0IHRyYW5zZm9ybWVkU2VsZWN0aW9uID0gc2VsZWN0aW9uLmNsb25lKCk7XHJcblxyXG4gICAgcmV0dXJuIHRyYW5zZm9ybWVkU2VsZWN0aW9uO1xyXG4gIH1cclxuXHJcblxyXG5cclxuICBzaGlmdChvcGVyYXRpb24pIHtcclxuICBcdGNvbnN0IG9mZnNldCA9IDAsXHJcbiAgICAgICAgICBzaGlmdGVkT3BlcmF0aW9uID0gb3BlcmF0aW9uLnNoaWZ0ZWQob2Zmc2V0KTtcclxuXHJcbiAgXHRyZXR1cm4gc2hpZnRlZE9wZXJhdGlvbjtcclxuICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuICBzdGF0aWMgZnJvbU5vdGhpbmcoKSB7XHJcbiAgICBjb25zdCB0eXBlID0gZW1wdHlUeXBlLCAvLy9cclxuICAgICAgICAgIGVtcHR5T3BlcmF0aW9uID0gbmV3IEVtcHR5T3BlcmF0aW9uKHR5cGUpO1xyXG5cclxuICAgIHJldHVybiBlbXB0eU9wZXJhdGlvbjtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XHJcbiAgICBjb25zdCB0eXBlID0ganNvbltcInR5cGVcIl0sXHJcbiAgICAgICAgICBlbXB0eU9wZXJhdGlvbiA9IG5ldyBFbXB0eU9wZXJhdGlvbih0eXBlKTtcclxuXHJcbiAgICByZXR1cm4gZW1wdHlPcGVyYXRpb247XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQ0FBQSxVQUFZOzs7OztBQUVjLEdBQVUsQ0FBVixNQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVmLGNBQWM7YUFBZCxjQUFjLENBQ3JCLElBQUk7OEJBREcsY0FBYzthQUUxQixJQUFJLEdBQUcsSUFBSTs7aUJBRkMsY0FBYzs7WUFPakMsR0FBSyxHQUFMLEtBQUs7NEJBQUwsS0FBSyxHQUFHLENBQUM7dUJBQ0EsY0FBYyxDQUFDLFdBQVc7WUFDbkMsQ0FBQzs7O1lBRUQsR0FBTSxHQUFOLE1BQU07NEJBQU4sTUFBTSxHQUFHLENBQUM7Z0JBQ1IsR0FBSyxDQUFDLElBQUk7cUJBQ0YsSUFBTSxRQUFPLElBQUk7O3VCQUtsQixJQUFJO1lBQ2IsQ0FBQzs7O1lBRUQsR0FBa0IsR0FBbEIsa0JBQWtCOzRCQUFsQixrQkFBa0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQztpQ0FDcEIsR0FBRyxFQUFFLEdBQUcsRUFBSyxDQUFDOzt3QkFFYixHQUFHLENBQUMsS0FBSzs7Z0JBRW5CLENBQUMsRUFBRSxTQUFTO1lBQ2QsQ0FBQzs7O1lBRUQsR0FBZ0IsR0FBaEIsZ0JBQWdCOzRCQUFoQixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQzt1QkFDbEIsT0FBTztZQUNoQixDQUFDOzs7WUFFRCxHQUFrQixHQUFsQixrQkFBa0I7NEJBQWxCLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUM3QixHQUFLLENBQUMsb0JBQW9CLEdBQUcsU0FBUyxDQUFDLEtBQUs7dUJBRXJDLG9CQUFvQjtZQUM3QixDQUFDOzs7WUFJRCxHQUFLLEdBQUwsS0FBSzs0QkFBTCxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2pCLEdBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUNULGdCQUFnQixHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTTt1QkFFM0MsZ0JBQWdCO1lBQ3hCLENBQUM7Ozs7WUFNTSxHQUFXLEdBQVgsV0FBVzs0QkFBWCxXQUFXLEdBQUcsQ0FBQztnQkFDcEIsR0FBSyxDQUFDLElBQUksR0F2RFksTUFBVSxZQXdEMUIsY0FBYyxHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSTt1QkFFdkMsY0FBYztZQUN2QixDQUFDOzs7WUFFTSxHQUFRLEdBQVIsUUFBUTs0QkFBUixRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3JCLEdBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxFQUFDLElBQU0sSUFDbEIsY0FBYyxHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSTt1QkFFdkMsY0FBYztZQUN2QixDQUFDOzs7V0FoRWtCLGNBQWM7O2tCQUFkLGNBQWMifQ==