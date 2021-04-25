"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _transform = _interopRequireDefault(require("./operations/transform"));
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
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var identifier = 0;
var User = function() {
    function User(identifier1, pendingOperations) {
        _classCallCheck(this, User);
        this.identifier = identifier1;
        this.pendingOperations = pendingOperations;
    }
    _createClass(User, [
        {
            key: "getIdentifier",
            value: function getIdentifier() {
                return this.identifier;
            }
        },
        {
            key: "getPendingOperations",
            value: function getPendingOperations() {
                return this.pendingOperations;
            }
        },
        {
            key: "reset",
            value: function reset() {
                this.pendingOperations = [];
            }
        },
        {
            key: "update",
            value: function update(transformedOperations) {
                this.pendingOperations = this.pendingOperations.concat(transformedOperations);
            }
        },
        {
            key: "transformOperations",
            value: function transformOperations(operations) {
                var transformedOperations = (0, _transform).default(operations, this.pendingOperations);
                return transformedOperations;
            }
        },
        {
            key: "transformedPendingOperations",
            value: function transformedPendingOperations(operations) {
                var transformedPendingOperations1 = (0, _transform).default(this.pendingOperations, operations);
                return transformedPendingOperations1;
            }
        }
    ], [
        {
            key: "fromNothing",
            value: function fromNothing() {
                var pendingOperations = [], user = new User(identifier++, pendingOperations);
                return user;
            }
        }
    ]);
    return User;
}();
exports.default = User;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91c2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHRyYW5zZm9ybU9wZXJhdGlvbnMgZnJvbSBcIi4vb3BlcmF0aW9ucy90cmFuc2Zvcm1cIjtcclxuXHJcbmxldCBpZGVudGlmaWVyID0gMDtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXIge1xyXG4gIGNvbnN0cnVjdG9yKGlkZW50aWZpZXIsIHBlbmRpbmdPcGVyYXRpb25zKSB7XHJcbiAgICB0aGlzLmlkZW50aWZpZXIgPSBpZGVudGlmaWVyO1xyXG4gICAgdGhpcy5wZW5kaW5nT3BlcmF0aW9ucyA9IHBlbmRpbmdPcGVyYXRpb25zO1xyXG4gIH1cclxuXHJcbiAgZ2V0SWRlbnRpZmllcigpIHtcclxuICAgIHJldHVybiB0aGlzLmlkZW50aWZpZXI7XHJcbiAgfVxyXG5cclxuICBnZXRQZW5kaW5nT3BlcmF0aW9ucygpIHtcclxuICAgIHJldHVybiB0aGlzLnBlbmRpbmdPcGVyYXRpb25zO1xyXG4gIH1cclxuXHJcbiAgcmVzZXQoKSB7XHJcbiAgICB0aGlzLnBlbmRpbmdPcGVyYXRpb25zID0gW107XHJcbiAgfVxyXG5cclxuICB1cGRhdGUodHJhbnNmb3JtZWRPcGVyYXRpb25zKSB7XHJcbiAgICB0aGlzLnBlbmRpbmdPcGVyYXRpb25zID0gdGhpcy5wZW5kaW5nT3BlcmF0aW9ucy5jb25jYXQodHJhbnNmb3JtZWRPcGVyYXRpb25zKTtcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybU9wZXJhdGlvbnMob3BlcmF0aW9ucykge1xyXG4gICAgY29uc3QgdHJhbnNmb3JtZWRPcGVyYXRpb25zID0gdHJhbnNmb3JtT3BlcmF0aW9ucyhvcGVyYXRpb25zLCB0aGlzLnBlbmRpbmdPcGVyYXRpb25zKTtcclxuXHJcbiAgICByZXR1cm4gdHJhbnNmb3JtZWRPcGVyYXRpb25zO1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtZWRQZW5kaW5nT3BlcmF0aW9ucyhvcGVyYXRpb25zKSB7XHJcbiAgICBjb25zdCB0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zID0gdHJhbnNmb3JtT3BlcmF0aW9ucyh0aGlzLnBlbmRpbmdPcGVyYXRpb25zLCBvcGVyYXRpb25zKTtcclxuXHJcbiAgICByZXR1cm4gdHJhbnNmb3JtZWRQZW5kaW5nT3BlcmF0aW9ucztcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tTm90aGluZygpIHtcclxuICAgIGNvbnN0IHBlbmRpbmdPcGVyYXRpb25zID0gW10sXHJcbiAgICAgICAgICB1c2VyID0gbmV3IFVzZXIoaWRlbnRpZmllcisrLCBwZW5kaW5nT3BlcmF0aW9ucyk7XHJcblxyXG4gICAgcmV0dXJuIHVzZXI7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQ0FBQSxVQUFZOzs7OztJQUVvQixVQUF3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVwRCxVQUFVLEdBQUcsQ0FBQztJQUVHLElBQUk7YUFBSixJQUFJLENBQ1gsV0FBVSxFQUFFLGlCQUFpQjs4QkFEdEIsSUFBSTthQUVoQixVQUFVLEdBQUcsV0FBVTthQUN2QixpQkFBaUIsR0FBRyxpQkFBaUI7O2lCQUh6QixJQUFJOztZQU12QixHQUFhLEdBQWIsYUFBYTs0QkFBYixhQUFhOzRCQUNDLFVBQVU7Ozs7WUFHeEIsR0FBb0IsR0FBcEIsb0JBQW9COzRCQUFwQixvQkFBb0I7NEJBQ04saUJBQWlCOzs7O1lBRy9CLEdBQUssR0FBTCxLQUFLOzRCQUFMLEtBQUs7cUJBQ0UsaUJBQWlCOzs7O1lBR3hCLEdBQU0sR0FBTixNQUFNOzRCQUFOLE1BQU0sQ0FBQyxxQkFBcUI7cUJBQ3JCLGlCQUFpQixRQUFRLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxxQkFBcUI7Ozs7WUFHOUUsR0FBbUIsR0FBbkIsbUJBQW1COzRCQUFuQixtQkFBbUIsQ0FBQyxVQUFVO29CQUN0QixxQkFBcUIsT0EzQkMsVUFBd0IsVUEyQkYsVUFBVSxPQUFPLGlCQUFpQjt1QkFFN0UscUJBQXFCOzs7O1lBRzlCLEdBQTRCLEdBQTVCLDRCQUE0Qjs0QkFBNUIsNEJBQTRCLENBQUMsVUFBVTtvQkFDL0IsNkJBQTRCLE9BakNOLFVBQXdCLGVBaUNVLGlCQUFpQixFQUFFLFVBQVU7dUJBRXBGLDZCQUE0Qjs7Ozs7WUFHOUIsR0FBVyxHQUFYLFdBQVc7NEJBQVgsV0FBVztvQkFDVixpQkFBaUIsT0FDakIsSUFBSSxPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksaUJBQWlCO3VCQUU5QyxJQUFJOzs7O1dBdENNLElBQUk7O2tCQUFKLElBQUkifQ==