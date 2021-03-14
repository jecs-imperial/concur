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
var UpdateRequest = function() {
    function UpdateRequest(operations, userIdentifier, sessionIdentifier) {
        _classCallCheck(this, UpdateRequest);
        this.operations = operations;
        this.userIdentifier = userIdentifier;
        this.sessionIdentifier = sessionIdentifier;
    }
    _createClass(UpdateRequest, [
        {
            key: "getOperations",
            value: function getOperations() {
                return this.operations;
            }
        },
        {
            key: "getUserIdentifier",
            value: function getUserIdentifier() {
                return this.userIdentifier;
            }
        },
        {
            key: "getSessionIdentifier",
            value: function getSessionIdentifier() {
                return this.sessionIdentifier;
            }
        },
        {
            key: "toJSON",
            value: function toJSON() {
                var operationsJSON = _toJSON.default(this.operations), operations = operationsJSON, json = {
                    "operations": operations,
                    "userIdentifier": this.userIdentifier,
                    "sessionIdentifier": this.sessionIdentifier
                };
                return json;
            }
        }
    ], [
        {
            key: "fromJSON",
            value: function fromJSON(json) {
                var operationsJSON = json["operations"], userIdentifierJSON = json["userIdentifier"], sessionIdentifierJSON = json["sessionIdentifier"], operations = _fromJSON.default(operationsJSON), userIdentifier = userIdentifierJSON, sessionIdentifier = sessionIdentifierJSON, updateRequest = new UpdateRequest(operations, userIdentifier, sessionIdentifier);
                return updateRequest;
            }
        },
        {
            key: "fromOperationsUserIdentifierAndSessionIdentifier",
            value: function fromOperationsUserIdentifierAndSessionIdentifier(operations, userIdentifier, sessionIdentifier) {
                var updateRequest = new UpdateRequest(operations, userIdentifier, sessionIdentifier);
                return updateRequest;
            }
        }
    ]);
    return UpdateRequest;
}();
exports.default = UpdateRequest;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXF1ZXN0L3VwZGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IG9wZXJhdGlvbnNUb0pTT04gZnJvbSBcIi4uL29wZXJhdGlvbnMvdG9KU09OXCI7XG5pbXBvcnQgb3BlcmF0aW9uc0Zyb21KU09OIGZyb20gXCIuLi9vcGVyYXRpb25zL2Zyb21KU09OXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVwZGF0ZVJlcXVlc3Qge1xuICBjb25zdHJ1Y3RvcihvcGVyYXRpb25zLCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpIHtcbiAgICB0aGlzLm9wZXJhdGlvbnMgPSBvcGVyYXRpb25zO1xuICAgIHRoaXMudXNlcklkZW50aWZpZXIgPSB1c2VySWRlbnRpZmllcjtcbiAgICB0aGlzLnNlc3Npb25JZGVudGlmaWVyID0gc2Vzc2lvbklkZW50aWZpZXI7XG4gIH1cblxuICBnZXRPcGVyYXRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLm9wZXJhdGlvbnM7XG4gIH1cblxuICBnZXRVc2VySWRlbnRpZmllcigpIHtcbiAgICByZXR1cm4gdGhpcy51c2VySWRlbnRpZmllcjtcbiAgfVxuXG4gIGdldFNlc3Npb25JZGVudGlmaWVyKCkge1xuICBcdHJldHVybiB0aGlzLnNlc3Npb25JZGVudGlmaWVyO1xuXHR9XG5cbiAgdG9KU09OKCkge1xuICAgIGNvbnN0IG9wZXJhdGlvbnNKU09OID0gb3BlcmF0aW9uc1RvSlNPTih0aGlzLm9wZXJhdGlvbnMpLFxuICAgICAgICAgIG9wZXJhdGlvbnMgPSBvcGVyYXRpb25zSlNPTiwgIC8vL1xuICAgICAgICAgIGpzb24gPSB7XG4gICAgICAgICAgICBcIm9wZXJhdGlvbnNcIjogb3BlcmF0aW9ucyxcbiAgICAgICAgICAgIFwidXNlcklkZW50aWZpZXJcIjogdGhpcy51c2VySWRlbnRpZmllcixcblx0XHRcdFx0XHRcdFwic2Vzc2lvbklkZW50aWZpZXJcIjogdGhpcy5zZXNzaW9uSWRlbnRpZmllclxuICAgICAgICAgIH07XG5cbiAgICByZXR1cm4ganNvbjtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XG4gICAgY29uc3Qgb3BlcmF0aW9uc0pTT04gPSBqc29uW1wib3BlcmF0aW9uc1wiXSxcbiAgICAgICAgICB1c2VySWRlbnRpZmllckpTT04gPSBqc29uW1widXNlcklkZW50aWZpZXJcIl0sXG5cdFx0XHRcdFx0c2Vzc2lvbklkZW50aWZpZXJKU09OID0ganNvbltcInNlc3Npb25JZGVudGlmaWVyXCJdLFxuICAgICAgICAgIG9wZXJhdGlvbnMgPSBvcGVyYXRpb25zRnJvbUpTT04ob3BlcmF0aW9uc0pTT04pLFxuICAgICAgICAgIHVzZXJJZGVudGlmaWVyID0gdXNlcklkZW50aWZpZXJKU09OLCAgLy8vXG5cdFx0XHRcdFx0c2Vzc2lvbklkZW50aWZpZXIgPSBzZXNzaW9uSWRlbnRpZmllckpTT04sICAvLy9cbiAgICAgICAgICB1cGRhdGVSZXF1ZXN0ID0gbmV3IFVwZGF0ZVJlcXVlc3Qob3BlcmF0aW9ucywgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyKTtcblxuICAgIHJldHVybiB1cGRhdGVSZXF1ZXN0O1xuICB9XG5cbiAgc3RhdGljIGZyb21PcGVyYXRpb25zVXNlcklkZW50aWZpZXJBbmRTZXNzaW9uSWRlbnRpZmllcihvcGVyYXRpb25zLCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpIHtcbiAgICBjb25zdCB1cGRhdGVSZXF1ZXN0ID0gbmV3IFVwZGF0ZVJlcXVlc3Qob3BlcmF0aW9ucywgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyKTtcblxuICAgIHJldHVybiB1cGRhdGVSZXF1ZXN0O1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkNBQUEsVUFBQTs7Ozs7SUFFQSxPQUFBO0lBQ0EsU0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVBLGFBQUE7YUFBQSxhQUFBLENBQ0EsVUFBQSxFQUFBLGNBQUEsRUFBQSxpQkFBQTs4QkFEQSxhQUFBO2FBRUEsVUFBQSxHQUFBLFVBQUE7YUFDQSxjQUFBLEdBQUEsY0FBQTthQUNBLGlCQUFBLEdBQUEsaUJBQUE7O2lCQUpBLGFBQUE7O0FBT0EsZUFBQSxHQUFBLGFBQUE7NEJBQUEsYUFBQTs0QkFDQSxVQUFBOzs7O0FBR0EsZUFBQSxHQUFBLGlCQUFBOzRCQUFBLGlCQUFBOzRCQUNBLGNBQUE7Ozs7QUFHQSxlQUFBLEdBQUEsb0JBQUE7NEJBQUEsb0JBQUE7NEJBQ0EsaUJBQUE7Ozs7QUFHQSxlQUFBLEdBQUEsTUFBQTs0QkFBQSxNQUFBO29CQUNBLGNBQUEsR0F2QkEsT0FBQSxjQXVCQSxVQUFBLEdBQ0EsVUFBQSxHQUFBLGNBQUEsRUFDQSxJQUFBO3FCQUNBLFVBQUEsR0FBQSxVQUFBO3FCQUNBLGNBQUEsUUFBQSxjQUFBO3FCQUNBLGlCQUFBLFFBQUEsaUJBQUE7O3VCQUdBLElBQUE7Ozs7O0FBR0EsZUFBQSxHQUFBLFFBQUE7NEJBQUEsUUFBQSxDQUFBLElBQUE7b0JBQ0EsY0FBQSxHQUFBLElBQUEsRUFBQSxVQUFBLElBQ0Esa0JBQUEsR0FBQSxJQUFBLEVBQUEsY0FBQSxJQUNBLHFCQUFBLEdBQUEsSUFBQSxFQUFBLGlCQUFBLElBQ0EsVUFBQSxHQXJDQSxTQUFBLFNBcUNBLGNBQUEsR0FDQSxjQUFBLEdBQUEsa0JBQUEsRUFDQSxpQkFBQSxHQUFBLHFCQUFBLEVBQ0EsYUFBQSxPQUFBLGFBQUEsQ0FBQSxVQUFBLEVBQUEsY0FBQSxFQUFBLGlCQUFBO3VCQUVBLGFBQUE7Ozs7QUFHQSxlQUFBLEdBQUEsZ0RBQUE7NEJBQUEsZ0RBQUEsQ0FBQSxVQUFBLEVBQUEsY0FBQSxFQUFBLGlCQUFBO29CQUNBLGFBQUEsT0FBQSxhQUFBLENBQUEsVUFBQSxFQUFBLGNBQUEsRUFBQSxpQkFBQTt1QkFFQSxhQUFBOzs7O1dBOUNBLGFBQUE7O2tCQUFBLGFBQUEifQ==