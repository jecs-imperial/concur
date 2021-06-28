"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _session = _interopRequireDefault(require("../session"));
var _update = _interopRequireDefault(require("../request/update"));
var _update1 = _interopRequireDefault(require("../response/update"));
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
var UpdateTransaction = /*#__PURE__*/ function() {
    function UpdateTransaction(updateResponse) {
        _classCallCheck(this, UpdateTransaction);
        this.updateResponse = updateResponse;
    }
    _createClass(UpdateTransaction, [
        {
            key: "toJSON",
            value: function toJSON() {
                return this.updateResponse.toJSON();
            }
        }
    ], [
        {
            key: "fromJSON",
            value: function fromJSON(json) {
                var updateRequest = _update.default.fromJSON(json), operations = updateRequest.getOperations(), userIdentifier = updateRequest.getUserIdentifier(), sessionIdentifier = updateRequest.getSessionIdentifier(), sessionExpired = _session.default.hasExpired(sessionIdentifier), pendingOperations = _session.default.update(operations, userIdentifier, sessionExpired), updateResponse = _update1.default.fromSessionExpiredAndPendingOperations(sessionExpired, pendingOperations), updateTransaction = new UpdateTransaction(updateResponse);
                return updateTransaction;
            }
        }
    ]);
    return UpdateTransaction;
}();
exports.default = UpdateTransaction;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmFuc2FjdGlvbi91cGRhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBzZXNzaW9uIGZyb20gXCIuLi9zZXNzaW9uXCI7XG5pbXBvcnQgVXBkYXRlUmVxdWVzdCBmcm9tIFwiLi4vcmVxdWVzdC91cGRhdGVcIjtcbmltcG9ydCBVcGRhdGVSZXNwb25zZSBmcm9tIFwiLi4vcmVzcG9uc2UvdXBkYXRlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVwZGF0ZVRyYW5zYWN0aW9uIHtcbiAgY29uc3RydWN0b3IodXBkYXRlUmVzcG9uc2UpIHtcbiAgICB0aGlzLnVwZGF0ZVJlc3BvbnNlID0gdXBkYXRlUmVzcG9uc2U7XG4gIH1cblxuICB0b0pTT04oKSB7IHJldHVybiB0aGlzLnVwZGF0ZVJlc3BvbnNlLnRvSlNPTigpOyB9XG5cbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcbiAgICBjb25zdCB1cGRhdGVSZXF1ZXN0ID0gVXBkYXRlUmVxdWVzdC5mcm9tSlNPTihqc29uKSxcbiAgICAgICAgICBvcGVyYXRpb25zID0gdXBkYXRlUmVxdWVzdC5nZXRPcGVyYXRpb25zKCksXG4gICAgICAgICAgdXNlcklkZW50aWZpZXIgPSB1cGRhdGVSZXF1ZXN0LmdldFVzZXJJZGVudGlmaWVyKCksXG5cdFx0XHRcdFx0c2Vzc2lvbklkZW50aWZpZXIgPSB1cGRhdGVSZXF1ZXN0LmdldFNlc3Npb25JZGVudGlmaWVyKCksXG5cdFx0XHRcdFx0c2Vzc2lvbkV4cGlyZWQgPSBzZXNzaW9uLmhhc0V4cGlyZWQoc2Vzc2lvbklkZW50aWZpZXIpLFxuXHRcdFx0XHRcdHBlbmRpbmdPcGVyYXRpb25zID0gc2Vzc2lvbi51cGRhdGUob3BlcmF0aW9ucywgdXNlcklkZW50aWZpZXIsIHNlc3Npb25FeHBpcmVkKSxcbiAgICAgICAgICB1cGRhdGVSZXNwb25zZSA9IFVwZGF0ZVJlc3BvbnNlLmZyb21TZXNzaW9uRXhwaXJlZEFuZFBlbmRpbmdPcGVyYXRpb25zKHNlc3Npb25FeHBpcmVkLCBwZW5kaW5nT3BlcmF0aW9ucyksXG4gICAgICAgICAgdXBkYXRlVHJhbnNhY3Rpb24gPSBuZXcgVXBkYXRlVHJhbnNhY3Rpb24odXBkYXRlUmVzcG9uc2UpO1xuXG4gICAgcmV0dXJuIHVwZGF0ZVRyYW5zYWN0aW9uO1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkNBQUEsVUFBWTs7Ozs7QUFFUSxHQUFZLENBQVosUUFBWTtBQUNOLEdBQW1CLENBQW5CLE9BQW1CO0FBQ2xCLEdBQW9CLENBQXBCLFFBQW9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRTFCLGlCQUFpQjthQUFqQixpQkFBaUIsQ0FDeEIsY0FBYzs4QkFEUCxpQkFBaUI7YUFFN0IsY0FBYyxHQUFHLGNBQWM7O2lCQUZuQixpQkFBaUI7O1lBS3BDLEdBQU0sR0FBTixNQUFNOzRCQUFOLE1BQU0sR0FBRyxDQUFDOzRCQUFhLGNBQWMsQ0FBQyxNQUFNO1lBQUksQ0FBQzs7OztZQUUxQyxHQUFRLEdBQVIsUUFBUTs0QkFBUixRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3JCLEdBQUssQ0FBQyxhQUFhLEdBWEcsT0FBbUIsU0FXTCxRQUFRLENBQUMsSUFBSSxHQUMzQyxVQUFVLEdBQUcsYUFBYSxDQUFDLGFBQWEsSUFDeEMsY0FBYyxHQUFHLGFBQWEsQ0FBQyxpQkFBaUIsSUFDckQsaUJBQWlCLEdBQUcsYUFBYSxDQUFDLG9CQUFvQixJQUN0RCxjQUFjLEdBaEJDLFFBQVksU0FnQkYsVUFBVSxDQUFDLGlCQUFpQixHQUNyRCxpQkFBaUIsR0FqQkYsUUFBWSxTQWlCQyxNQUFNLENBQUMsVUFBVSxFQUFFLGNBQWMsRUFBRSxjQUFjLEdBQ3hFLGNBQWMsR0FoQkcsUUFBb0IsU0FnQkwsc0NBQXNDLENBQUMsY0FBYyxFQUFFLGlCQUFpQixHQUN4RyxpQkFBaUIsR0FBRyxHQUFHLENBQUMsaUJBQWlCLENBQUMsY0FBYzt1QkFFdkQsaUJBQWlCO1lBQzFCLENBQUM7OztXQWxCa0IsaUJBQWlCOztrQkFBakIsaUJBQWlCIn0=