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
var User = /*#__PURE__*/ function() {
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
            key: "resetPendingOperations",
            value: function resetPendingOperations() {
                this.pendingOperations = [];
            }
        },
        {
            key: "updatePendingOperations",
            value: function updatePendingOperations(transformedOperations) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91c2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHRyYW5zZm9ybU9wZXJhdGlvbnMgZnJvbSBcIi4vb3BlcmF0aW9ucy90cmFuc2Zvcm1cIjtcclxuXHJcbmxldCBpZGVudGlmaWVyID0gMDtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXIge1xyXG4gIGNvbnN0cnVjdG9yKGlkZW50aWZpZXIsIHBlbmRpbmdPcGVyYXRpb25zKSB7XHJcbiAgICB0aGlzLmlkZW50aWZpZXIgPSBpZGVudGlmaWVyO1xyXG4gICAgdGhpcy5wZW5kaW5nT3BlcmF0aW9ucyA9IHBlbmRpbmdPcGVyYXRpb25zO1xyXG4gIH1cclxuXHJcbiAgZ2V0SWRlbnRpZmllcigpIHtcclxuICAgIHJldHVybiB0aGlzLmlkZW50aWZpZXI7XHJcbiAgfVxyXG5cclxuICBnZXRQZW5kaW5nT3BlcmF0aW9ucygpIHtcclxuICAgIHJldHVybiB0aGlzLnBlbmRpbmdPcGVyYXRpb25zO1xyXG4gIH1cclxuXHJcbiAgcmVzZXRQZW5kaW5nT3BlcmF0aW9ucygpIHtcclxuICAgIHRoaXMucGVuZGluZ09wZXJhdGlvbnMgPSBbXTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVBlbmRpbmdPcGVyYXRpb25zKHRyYW5zZm9ybWVkT3BlcmF0aW9ucykge1xyXG4gICAgdGhpcy5wZW5kaW5nT3BlcmF0aW9ucyA9IHRoaXMucGVuZGluZ09wZXJhdGlvbnMuY29uY2F0KHRyYW5zZm9ybWVkT3BlcmF0aW9ucyk7XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1PcGVyYXRpb25zKG9wZXJhdGlvbnMpIHtcclxuICAgIGNvbnN0IHRyYW5zZm9ybWVkT3BlcmF0aW9ucyA9IHRyYW5zZm9ybU9wZXJhdGlvbnMob3BlcmF0aW9ucywgdGhpcy5wZW5kaW5nT3BlcmF0aW9ucyk7XHJcblxyXG4gICAgcmV0dXJuIHRyYW5zZm9ybWVkT3BlcmF0aW9ucztcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMob3BlcmF0aW9ucykge1xyXG4gICAgY29uc3QgdHJhbnNmb3JtZWRQZW5kaW5nT3BlcmF0aW9ucyA9IHRyYW5zZm9ybU9wZXJhdGlvbnModGhpcy5wZW5kaW5nT3BlcmF0aW9ucywgb3BlcmF0aW9ucyk7XHJcblxyXG4gICAgcmV0dXJuIHRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnM7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbU5vdGhpbmcoKSB7XHJcbiAgICBjb25zdCBwZW5kaW5nT3BlcmF0aW9ucyA9IFtdLFxyXG4gICAgICAgICAgdXNlciA9IG5ldyBVc2VyKGlkZW50aWZpZXIrKywgcGVuZGluZ09wZXJhdGlvbnMpO1xyXG5cclxuICAgIHJldHVybiB1c2VyO1xyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkNBQUEsVUFBWTs7Ozs7QUFFb0IsR0FBd0IsQ0FBeEIsVUFBd0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFeEQsR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDO0lBRUcsSUFBSTthQUFKLElBQUksQ0FDWCxXQUFVLEVBQUUsaUJBQWlCOzhCQUR0QixJQUFJO2FBRWhCLFVBQVUsR0FBRyxXQUFVO2FBQ3ZCLGlCQUFpQixHQUFHLGlCQUFpQjs7aUJBSHpCLElBQUk7O1lBTXZCLEdBQWEsR0FBYixhQUFhOzRCQUFiLGFBQWEsR0FBRyxDQUFDOzRCQUNILFVBQVU7WUFDeEIsQ0FBQzs7O1lBRUQsR0FBb0IsR0FBcEIsb0JBQW9COzRCQUFwQixvQkFBb0IsR0FBRyxDQUFDOzRCQUNWLGlCQUFpQjtZQUMvQixDQUFDOzs7WUFFRCxHQUFzQixHQUF0QixzQkFBc0I7NEJBQXRCLHNCQUFzQixHQUFHLENBQUM7cUJBQ25CLGlCQUFpQjtZQUN4QixDQUFDOzs7WUFFRCxHQUF1QixHQUF2Qix1QkFBdUI7NEJBQXZCLHVCQUF1QixDQUFDLHFCQUFxQixFQUFFLENBQUM7cUJBQ3pDLGlCQUFpQixRQUFRLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxxQkFBcUI7WUFDOUUsQ0FBQzs7O1lBRUQsR0FBbUIsR0FBbkIsbUJBQW1COzRCQUFuQixtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDL0IsR0FBSyxDQUFDLHFCQUFxQixPQTNCQyxVQUF3QixVQTJCRixVQUFVLE9BQU8saUJBQWlCO3VCQUU3RSxxQkFBcUI7WUFDOUIsQ0FBQzs7O1lBRUQsR0FBNEIsR0FBNUIsNEJBQTRCOzRCQUE1Qiw0QkFBNEIsQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDeEMsR0FBSyxDQUFDLDZCQUE0QixPQWpDTixVQUF3QixlQWlDVSxpQkFBaUIsRUFBRSxVQUFVO3VCQUVwRiw2QkFBNEI7WUFDckMsQ0FBQzs7OztZQUVNLEdBQVcsR0FBWCxXQUFXOzRCQUFYLFdBQVcsR0FBRyxDQUFDO2dCQUNwQixHQUFLLENBQUMsaUJBQWlCLE9BQ2pCLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxpQkFBaUI7dUJBRTlDLElBQUk7WUFDYixDQUFDOzs7V0F2Q2tCLElBQUk7O2tCQUFKLElBQUkifQ==