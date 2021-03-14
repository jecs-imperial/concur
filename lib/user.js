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
                var transformedOperations = _transform.default(operations, this.pendingOperations);
                return transformedOperations;
            }
        },
        {
            key: "transformedPendingOperations",
            value: function transformedPendingOperations(operations) {
                var transformedPendingOperations1 = _transform.default(this.pendingOperations, operations);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91c2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHRyYW5zZm9ybU9wZXJhdGlvbnMgZnJvbSBcIi4vb3BlcmF0aW9ucy90cmFuc2Zvcm1cIjtcclxuXHJcbmxldCBpZGVudGlmaWVyID0gMDtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXIge1xyXG4gIGNvbnN0cnVjdG9yKGlkZW50aWZpZXIsIHBlbmRpbmdPcGVyYXRpb25zKSB7XHJcbiAgICB0aGlzLmlkZW50aWZpZXIgPSBpZGVudGlmaWVyO1xyXG4gICAgdGhpcy5wZW5kaW5nT3BlcmF0aW9ucyA9IHBlbmRpbmdPcGVyYXRpb25zO1xyXG4gIH1cclxuXHJcbiAgZ2V0SWRlbnRpZmllcigpIHtcclxuICAgIHJldHVybiB0aGlzLmlkZW50aWZpZXI7XHJcbiAgfVxyXG5cclxuICBnZXRQZW5kaW5nT3BlcmF0aW9ucygpIHtcclxuICAgIHJldHVybiB0aGlzLnBlbmRpbmdPcGVyYXRpb25zO1xyXG4gIH1cclxuXHJcbiAgcmVzZXQoKSB7XHJcbiAgICB0aGlzLnBlbmRpbmdPcGVyYXRpb25zID0gW107XHJcbiAgfVxyXG5cclxuICB1cGRhdGUodHJhbnNmb3JtZWRPcGVyYXRpb25zKSB7XHJcbiAgICB0aGlzLnBlbmRpbmdPcGVyYXRpb25zID0gdGhpcy5wZW5kaW5nT3BlcmF0aW9ucy5jb25jYXQodHJhbnNmb3JtZWRPcGVyYXRpb25zKTtcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybU9wZXJhdGlvbnMob3BlcmF0aW9ucykge1xyXG4gICAgY29uc3QgdHJhbnNmb3JtZWRPcGVyYXRpb25zID0gdHJhbnNmb3JtT3BlcmF0aW9ucyhvcGVyYXRpb25zLCB0aGlzLnBlbmRpbmdPcGVyYXRpb25zKTtcclxuXHJcbiAgICByZXR1cm4gdHJhbnNmb3JtZWRPcGVyYXRpb25zO1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtZWRQZW5kaW5nT3BlcmF0aW9ucyhvcGVyYXRpb25zKSB7XHJcbiAgICBjb25zdCB0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zID0gdHJhbnNmb3JtT3BlcmF0aW9ucyh0aGlzLnBlbmRpbmdPcGVyYXRpb25zLCBvcGVyYXRpb25zKTtcclxuXHJcbiAgICByZXR1cm4gdHJhbnNmb3JtZWRQZW5kaW5nT3BlcmF0aW9ucztcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tTm90aGluZygpIHtcclxuICAgIGNvbnN0IHBlbmRpbmdPcGVyYXRpb25zID0gW10sXHJcbiAgICAgICAgICB1c2VyID0gbmV3IFVzZXIoaWRlbnRpZmllcisrLCBwZW5kaW5nT3BlcmF0aW9ucyk7XHJcblxyXG4gICAgcmV0dXJuIHVzZXI7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQ0FBQSxVQUFBOzs7OztJQUVBLFVBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFQSxVQUFBLEdBQUEsQ0FBQTtJQUVBLElBQUE7YUFBQSxJQUFBLENBQ0EsV0FBQSxFQUFBLGlCQUFBOzhCQURBLElBQUE7YUFFQSxVQUFBLEdBQUEsV0FBQTthQUNBLGlCQUFBLEdBQUEsaUJBQUE7O2lCQUhBLElBQUE7O0FBTUEsZUFBQSxHQUFBLGFBQUE7NEJBQUEsYUFBQTs0QkFDQSxVQUFBOzs7O0FBR0EsZUFBQSxHQUFBLG9CQUFBOzRCQUFBLG9CQUFBOzRCQUNBLGlCQUFBOzs7O0FBR0EsZUFBQSxHQUFBLEtBQUE7NEJBQUEsS0FBQTtxQkFDQSxpQkFBQTs7OztBQUdBLGVBQUEsR0FBQSxNQUFBOzRCQUFBLE1BQUEsQ0FBQSxxQkFBQTtxQkFDQSxpQkFBQSxRQUFBLGlCQUFBLENBQUEsTUFBQSxDQUFBLHFCQUFBOzs7O0FBR0EsZUFBQSxHQUFBLG1CQUFBOzRCQUFBLG1CQUFBLENBQUEsVUFBQTtvQkFDQSxxQkFBQSxHQTNCQSxVQUFBLFNBMkJBLFVBQUEsT0FBQSxpQkFBQTt1QkFFQSxxQkFBQTs7OztBQUdBLGVBQUEsR0FBQSw0QkFBQTs0QkFBQSw0QkFBQSxDQUFBLFVBQUE7b0JBQ0EsNkJBQUEsR0FqQ0EsVUFBQSxjQWlDQSxpQkFBQSxFQUFBLFVBQUE7dUJBRUEsNkJBQUE7Ozs7O0FBR0EsZUFBQSxHQUFBLFdBQUE7NEJBQUEsV0FBQTtvQkFDQSxpQkFBQSxPQUNBLElBQUEsT0FBQSxJQUFBLENBQUEsVUFBQSxJQUFBLGlCQUFBO3VCQUVBLElBQUE7Ozs7V0F0Q0EsSUFBQTs7a0JBQUEsSUFBQSJ9