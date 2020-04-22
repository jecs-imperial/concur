"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = operationsFromJSON;

var _empty = _interopRequireDefault(require("../operation/empty"));

var _delete = _interopRequireDefault(require("../operation/delete"));

var _insert = _interopRequireDefault(require("../operation/insert"));

var _types = require("../types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function operationsFromJSON(operationsJSON) {
  var operations = operationsJSON.map(function (operationJSON) {
    var operation;
    var json = operationJSON,
        ///
    type = json["type"];

    switch (type) {
      case _types.emptyType:
        operation = _empty["default"].fromJSON(json);
        break;

      case _types.deleteType:
        operation = _delete["default"].fromJSON(json);
        break;

      case _types.insertType:
        operation = _insert["default"].fromJSON(json);
        break;
    }

    return operation;
  });
  return operations;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZyb21KU09OLmpzIl0sIm5hbWVzIjpbIm9wZXJhdGlvbnNGcm9tSlNPTiIsIm9wZXJhdGlvbnNKU09OIiwib3BlcmF0aW9ucyIsIm1hcCIsIm9wZXJhdGlvbkpTT04iLCJvcGVyYXRpb24iLCJqc29uIiwidHlwZSIsImVtcHR5VHlwZSIsIkVtcHR5T3BlcmF0aW9uIiwiZnJvbUpTT04iLCJkZWxldGVUeXBlIiwiRGVsZXRlT3BlcmF0aW9uIiwiaW5zZXJ0VHlwZSIsIkluc2VydE9wZXJhdGlvbiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUVlLFNBQVNBLGtCQUFULENBQTRCQyxjQUE1QixFQUE0QztBQUN6RCxNQUFNQyxVQUFVLEdBQUdELGNBQWMsQ0FBQ0UsR0FBZixDQUFtQixVQUFDQyxhQUFELEVBQW1CO0FBQ3ZELFFBQUlDLFNBQUo7QUFFQSxRQUFNQyxJQUFJLEdBQUdGLGFBQWI7QUFBQSxRQUE0QjtBQUN0QkcsSUFBQUEsSUFBSSxHQUFHRCxJQUFJLENBQUMsTUFBRCxDQURqQjs7QUFHQSxZQUFRQyxJQUFSO0FBQ0UsV0FBS0MsZ0JBQUw7QUFDRUgsUUFBQUEsU0FBUyxHQUFHSSxrQkFBZUMsUUFBZixDQUF3QkosSUFBeEIsQ0FBWjtBQUNBOztBQUVGLFdBQUtLLGlCQUFMO0FBQ0VOLFFBQUFBLFNBQVMsR0FBR08sbUJBQWdCRixRQUFoQixDQUF5QkosSUFBekIsQ0FBWjtBQUNBOztBQUVGLFdBQUtPLGlCQUFMO0FBQ0VSLFFBQUFBLFNBQVMsR0FBR1MsbUJBQWdCSixRQUFoQixDQUF5QkosSUFBekIsQ0FBWjtBQUNBO0FBWEo7O0FBY0EsV0FBT0QsU0FBUDtBQUNELEdBckJrQixDQUFuQjtBQXVCQSxTQUFPSCxVQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmltcG9ydCBFbXB0eU9wZXJhdGlvbiBmcm9tIFwiLi4vb3BlcmF0aW9uL2VtcHR5XCI7XHJcbmltcG9ydCBEZWxldGVPcGVyYXRpb24gZnJvbSBcIi4uL29wZXJhdGlvbi9kZWxldGVcIjtcclxuaW1wb3J0IEluc2VydE9wZXJhdGlvbiBmcm9tIFwiLi4vb3BlcmF0aW9uL2luc2VydFwiO1xyXG5cclxuaW1wb3J0IHsgZW1wdHlUeXBlLCBkZWxldGVUeXBlLCBpbnNlcnRUeXBlIH0gZnJvbSBcIi4uL3R5cGVzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvcGVyYXRpb25zRnJvbUpTT04ob3BlcmF0aW9uc0pTT04pIHtcclxuICBjb25zdCBvcGVyYXRpb25zID0gb3BlcmF0aW9uc0pTT04ubWFwKChvcGVyYXRpb25KU09OKSA9PiB7XHJcbiAgICBsZXQgb3BlcmF0aW9uO1xyXG5cclxuICAgIGNvbnN0IGpzb24gPSBvcGVyYXRpb25KU09OLCAvLy9cclxuICAgICAgICAgIHR5cGUgPSBqc29uW1widHlwZVwiXTtcclxuXHJcbiAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgY2FzZSBlbXB0eVR5cGU6XHJcbiAgICAgICAgb3BlcmF0aW9uID0gRW1wdHlPcGVyYXRpb24uZnJvbUpTT04oanNvbik7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIGRlbGV0ZVR5cGU6XHJcbiAgICAgICAgb3BlcmF0aW9uID0gRGVsZXRlT3BlcmF0aW9uLmZyb21KU09OKGpzb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSBpbnNlcnRUeXBlOlxyXG4gICAgICAgIG9wZXJhdGlvbiA9IEluc2VydE9wZXJhdGlvbi5mcm9tSlNPTihqc29uKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb3BlcmF0aW9uO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gb3BlcmF0aW9ucztcclxufVxyXG4iXX0=