"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = operationsFromJSON;
var _empty = _interopRequireDefault(require("../operation/empty"));
var _delete = _interopRequireDefault(require("../operation/delete"));
var _insert = _interopRequireDefault(require("../operation/insert"));
var _types = require("../types");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function operationsFromJSON(operationsJSON) {
    var operations = operationsJSON.map(function(operationJSON) {
        var operation;
        var json = operationJSON, type = json["type"];
        switch(type){
            case _types.emptyType:
                operation = _empty.default.fromJSON(json);
                break;
            case _types.deleteType:
                operation = _delete.default.fromJSON(json);
                break;
            case _types.insertType:
                operation = _insert.default.fromJSON(json);
                break;
        }
        return operation;
    });
    return operations;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVyYXRpb25zL2Zyb21KU09OLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IEVtcHR5T3BlcmF0aW9uIGZyb20gXCIuLi9vcGVyYXRpb24vZW1wdHlcIjtcclxuaW1wb3J0IERlbGV0ZU9wZXJhdGlvbiBmcm9tIFwiLi4vb3BlcmF0aW9uL2RlbGV0ZVwiO1xyXG5pbXBvcnQgSW5zZXJ0T3BlcmF0aW9uIGZyb20gXCIuLi9vcGVyYXRpb24vaW5zZXJ0XCI7XHJcblxyXG5pbXBvcnQgeyBlbXB0eVR5cGUsIGRlbGV0ZVR5cGUsIGluc2VydFR5cGUgfSBmcm9tIFwiLi4vdHlwZXNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9wZXJhdGlvbnNGcm9tSlNPTihvcGVyYXRpb25zSlNPTikge1xyXG4gIGNvbnN0IG9wZXJhdGlvbnMgPSBvcGVyYXRpb25zSlNPTi5tYXAoKG9wZXJhdGlvbkpTT04pID0+IHtcclxuICAgIGxldCBvcGVyYXRpb247XHJcblxyXG4gICAgY29uc3QganNvbiA9IG9wZXJhdGlvbkpTT04sIC8vL1xyXG4gICAgICAgICAgdHlwZSA9IGpzb25bXCJ0eXBlXCJdO1xyXG5cclxuICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICBjYXNlIGVtcHR5VHlwZTpcclxuICAgICAgICBvcGVyYXRpb24gPSBFbXB0eU9wZXJhdGlvbi5mcm9tSlNPTihqc29uKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgZGVsZXRlVHlwZTpcclxuICAgICAgICBvcGVyYXRpb24gPSBEZWxldGVPcGVyYXRpb24uZnJvbUpTT04oanNvbik7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIGluc2VydFR5cGU6XHJcbiAgICAgICAgb3BlcmF0aW9uID0gSW5zZXJ0T3BlcmF0aW9uLmZyb21KU09OKGpzb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvcGVyYXRpb247XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBvcGVyYXRpb25zO1xyXG59XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQ0FBQSxVQUFZOzs7O2tCQVFZLGtCQUFrQjtBQU5mLEdBQW9CLENBQXBCLE1BQW9CO0FBQ25CLEdBQXFCLENBQXJCLE9BQXFCO0FBQ3JCLEdBQXFCLENBQXJCLE9BQXFCO0FBRUMsR0FBVSxDQUFWLE1BQVU7Ozs7OztTQUVwQyxrQkFBa0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxRCxHQUFLLENBQUMsVUFBVSxHQUFHLGNBQWMsQ0FBQyxHQUFHLFVBQUUsYUFBYSxFQUFLLENBQUM7UUFDeEQsR0FBRyxDQUFDLFNBQVM7UUFFYixHQUFLLENBQUMsSUFBSSxHQUFHLGFBQWEsRUFDcEIsSUFBSSxHQUFHLElBQUksRUFBQyxJQUFNO2VBRWhCLElBQUk7aUJBVGtDLE1BQVU7Z0JBV3BELFNBQVMsR0FmVSxNQUFvQixTQWVaLFFBQVEsQ0FBQyxJQUFJOztpQkFYRSxNQUFVO2dCQWVwRCxTQUFTLEdBbEJXLE9BQXFCLFNBa0JiLFFBQVEsQ0FBQyxJQUFJOztpQkFmQyxNQUFVO2dCQW1CcEQsU0FBUyxHQXJCVyxPQUFxQixTQXFCYixRQUFRLENBQUMsSUFBSTs7O2VBSXRDLFNBQVM7SUFDbEIsQ0FBQztXQUVNLFVBQVU7QUFDbkIsQ0FBQyJ9