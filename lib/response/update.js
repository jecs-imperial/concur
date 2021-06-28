"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _toJSON = _interopRequireDefault(require("../operations/toJSON"));
var _fromJSON = _interopRequireDefault(require("../operations/fromJSON"));
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
var UpdateResponse = /*#__PURE__*/ function() {
    function UpdateResponse(sessionExpired, pendingOperations) {
        _classCallCheck(this, UpdateResponse);
        this.sessionExpired = sessionExpired;
        this.pendingOperations = pendingOperations;
    }
    _createClass(UpdateResponse, [
        {
            key: "getSessionExpired",
            value: function getSessionExpired() {
                return this.sessionExpired;
            }
        },
        {
            key: "getPendingOperations",
            value: function getPendingOperations() {
                return this.pendingOperations;
            }
        },
        {
            key: "toJSON",
            value: function toJSON() {
                var pendingOperationsJSON = (0, _toJSON).default(this.pendingOperations), pendingOperations = pendingOperationsJSON, json = {
                    "sessionExpired": this.sessionExpired,
                    "pendingOperations": pendingOperations
                };
                return json;
            }
        }
    ], [
        {
            key: "fromJSON",
            value: function fromJSON(json) {
                var sessionExpiredJSON = json["sessionExpired"], pendingOperationsJSON = json["pendingOperations"], sessionExpired = sessionExpiredJSON, pendingOperations = (0, _fromJSON).default(pendingOperationsJSON), updateResponse = new UpdateResponse(sessionExpired, pendingOperations);
                return updateResponse;
            }
        },
        {
            key: "fromSessionExpiredAndPendingOperations",
            value: function fromSessionExpiredAndPendingOperations(sessionExpired, pendingOperations) {
                var updateResponse = new UpdateResponse(sessionExpired, pendingOperations);
                return updateResponse;
            }
        }
    ]);
    return UpdateResponse;
}();
exports.default = UpdateResponse;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNwb25zZS91cGRhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBvcGVyYXRpb25zVG9KU09OIGZyb20gXCIuLi9vcGVyYXRpb25zL3RvSlNPTlwiO1xuaW1wb3J0IG9wZXJhdGlvbnNGcm9tSlNPTiBmcm9tIFwiLi4vb3BlcmF0aW9ucy9mcm9tSlNPTlwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVcGRhdGVSZXNwb25zZSB7XG4gIGNvbnN0cnVjdG9yKHNlc3Npb25FeHBpcmVkLCBwZW5kaW5nT3BlcmF0aW9ucykge1xuICBcdHRoaXMuc2Vzc2lvbkV4cGlyZWQgPSBzZXNzaW9uRXhwaXJlZDtcbiAgICB0aGlzLnBlbmRpbmdPcGVyYXRpb25zID0gcGVuZGluZ09wZXJhdGlvbnM7XG4gIH1cblxuICBnZXRTZXNzaW9uRXhwaXJlZCgpIHtcbiAgXHRyZXR1cm4gdGhpcy5zZXNzaW9uRXhwaXJlZDtcblx0fVxuXG4gIGdldFBlbmRpbmdPcGVyYXRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLnBlbmRpbmdPcGVyYXRpb25zO1xuICB9XG5cbiAgdG9KU09OKCkge1xuICAgIGNvbnN0IHBlbmRpbmdPcGVyYXRpb25zSlNPTiA9IG9wZXJhdGlvbnNUb0pTT04odGhpcy5wZW5kaW5nT3BlcmF0aW9ucyksXG4gICAgICAgICAgcGVuZGluZ09wZXJhdGlvbnMgPSBwZW5kaW5nT3BlcmF0aW9uc0pTT04sICAvLy9cbiAgICAgICAgICBqc29uID0ge1xuICAgIFx0XHRcdFx0XCJzZXNzaW9uRXhwaXJlZFwiOiB0aGlzLnNlc3Npb25FeHBpcmVkLFxuICAgICAgICAgICAgXCJwZW5kaW5nT3BlcmF0aW9uc1wiOiBwZW5kaW5nT3BlcmF0aW9uc1xuICAgICAgICAgIH07XG5cbiAgICByZXR1cm4ganNvbjtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XG4gICAgY29uc3Qgc2Vzc2lvbkV4cGlyZWRKU09OID0ganNvbltcInNlc3Npb25FeHBpcmVkXCJdLFxuXHRcdFx0XHRcdHBlbmRpbmdPcGVyYXRpb25zSlNPTiA9IGpzb25bXCJwZW5kaW5nT3BlcmF0aW9uc1wiXSxcblx0XHRcdFx0XHRzZXNzaW9uRXhwaXJlZCA9IHNlc3Npb25FeHBpcmVkSlNPTixcdC8vL1xuXHRcdFx0XHRcdHBlbmRpbmdPcGVyYXRpb25zID0gb3BlcmF0aW9uc0Zyb21KU09OKHBlbmRpbmdPcGVyYXRpb25zSlNPTiksXG4gICAgICAgICAgdXBkYXRlUmVzcG9uc2UgPSBuZXcgVXBkYXRlUmVzcG9uc2Uoc2Vzc2lvbkV4cGlyZWQsIHBlbmRpbmdPcGVyYXRpb25zKTtcblxuICAgIHJldHVybiB1cGRhdGVSZXNwb25zZTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tU2Vzc2lvbkV4cGlyZWRBbmRQZW5kaW5nT3BlcmF0aW9ucyhzZXNzaW9uRXhwaXJlZCwgcGVuZGluZ09wZXJhdGlvbnMpIHtcbiAgICBjb25zdCB1cGRhdGVSZXNwb25zZSA9IG5ldyBVcGRhdGVSZXNwb25zZShzZXNzaW9uRXhwaXJlZCwgcGVuZGluZ09wZXJhdGlvbnMpO1xuXG4gICAgcmV0dXJuIHVwZGF0ZVJlc3BvbnNlO1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkNBQUEsVUFBWTs7Ozs7QUFFaUIsR0FBc0IsQ0FBdEIsT0FBc0I7QUFDcEIsR0FBd0IsQ0FBeEIsU0FBd0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFbEMsY0FBYzthQUFkLGNBQWMsQ0FDckIsY0FBYyxFQUFFLGlCQUFpQjs4QkFEMUIsY0FBYzthQUUzQixjQUFjLEdBQUcsY0FBYzthQUM5QixpQkFBaUIsR0FBRyxpQkFBaUI7O2lCQUh6QixjQUFjOztZQU1qQyxHQUFpQixHQUFqQixpQkFBaUI7NEJBQWpCLGlCQUFpQixHQUFHLENBQUM7NEJBQ1IsY0FBYztZQUM1QixDQUFDOzs7WUFFQSxHQUFvQixHQUFwQixvQkFBb0I7NEJBQXBCLG9CQUFvQixHQUFHLENBQUM7NEJBQ1YsaUJBQWlCO1lBQy9CLENBQUM7OztZQUVELEdBQU0sR0FBTixNQUFNOzRCQUFOLE1BQU0sR0FBRyxDQUFDO2dCQUNSLEdBQUssQ0FBQyxxQkFBcUIsT0FsQkYsT0FBc0IsZUFrQkssaUJBQWlCLEdBQy9ELGlCQUFpQixHQUFHLHFCQUFxQixFQUN6QyxJQUFJO3FCQUNOLGNBQWdCLFFBQU8sY0FBYztxQkFDakMsaUJBQW1CLEdBQUUsaUJBQWlCOzt1QkFHdkMsSUFBSTtZQUNiLENBQUM7Ozs7WUFFTSxHQUFRLEdBQVIsUUFBUTs0QkFBUixRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3JCLEdBQUssQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLEVBQUMsY0FBZ0IsSUFDL0MscUJBQXFCLEdBQUcsSUFBSSxFQUFDLGlCQUFtQixJQUNoRCxjQUFjLEdBQUcsa0JBQWtCLEVBQ25DLGlCQUFpQixPQS9CUyxTQUF3QixVQStCWCxxQkFBcUIsR0FDdkQsY0FBYyxHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLGlCQUFpQjt1QkFFcEUsY0FBYztZQUN2QixDQUFDOzs7WUFFTSxHQUFzQyxHQUF0QyxzQ0FBc0M7NEJBQXRDLHNDQUFzQyxDQUFDLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxDQUFDO2dCQUNoRixHQUFLLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLGlCQUFpQjt1QkFFcEUsY0FBYztZQUN2QixDQUFDOzs7V0F2Q2tCLGNBQWM7O2tCQUFkLGNBQWMifQ==