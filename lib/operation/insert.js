"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _stringCompare = _interopRequireDefault(require("../stringCompare"));
var _delete = _interopRequireDefault(require("../operation/delete"));
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
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var InsertOperation = function() {
    function InsertOperation(type, string, position) {
        _classCallCheck(this, InsertOperation);
        this.type = type;
        this.string = string;
        this.position = position;
    }
    _createClass(InsertOperation, [
        {
            key: "clone",
            value: function clone() {
                return InsertOperation.fromStringAndPosition(this.string, this.position);
            }
        },
        {
            key: "toJSON",
            value: function toJSON() {
                var json = {
                    "type": this.type,
                    "string": this.string,
                    "position": this.position
                };
                return json;
            }
        },
        {
            key: "transformOperation",
            value: function transformOperation(operation) {
                switch(operation.type){
                    case "insert":
                        return (function(tau, rho) {
                            if (tau.position < rho.position) {
                                return [
                                    tau.clone()
                                ];
                            }
                            if (tau.position === rho.position) {
                                if (tau.string === rho.string) {
                                    return [
                                        tau.clone()
                                    ];
                                }
                                if (tau.string !== rho.string) {
                                    if ((0, _stringCompare).default(rho.string, tau.string)) {
                                        return [
                                            rho.shift(tau)
                                        ];
                                    } else {
                                        return [
                                            tau.clone()
                                        ];
                                    }
                                }
                            }
                            if (tau.position > rho.position) {
                                return [
                                    rho.shift(tau)
                                ];
                            }
                        })(operation, this);
                    case "delete":
                        return (function(tau, rho) {
                            if (tau.position + tau.length <= rho.position) {
                                return [
                                    tau.clone()
                                ];
                            }
                            if (tau.position < rho.position) {
                                return [
                                    rho.left(tau),
                                    rho.left(tau).shift(rho.shift(rho.right(tau)))
                                ];
                            }
                            if (tau.position >= rho.position) {
                                return [
                                    rho.shift(tau)
                                ];
                            }
                        })(operation, this);
                    case "empty":
                        return (function(tau, rho) {
                            return [
                                tau.clone()
                            ];
                        })(operation, this);
                }
            }
        },
        {
            key: "transformContent",
            value: function transformContent(content) {
                return content.substring(0, this.position) + this.string + content.substring(this.position);
            }
        },
        {
            key: "transformSelection",
            value: function transformSelection(selection) {
                var transformedSelection;
                var startPosition = this.position, length = this.string.length, selectionStartPosition = selection.getStartPosition(), selectionEndPosition = selection.getEndPosition(), offset = length, endOffset = offset; ///
                if (false) {
                } else if (selectionStartPosition >= startPosition) {
                    transformedSelection = selection.shifted(offset);
                } else if (selectionEndPosition > startPosition) {
                    transformedSelection = selection.endPositionShifted(endOffset);
                } else {
                    transformedSelection = selection.clone();
                }
                return transformedSelection;
            }
        },
        {
            key: "shifted",
            value: function shifted(offset) {
                var string = this.string, position = this.position + offset, insertOperation = InsertOperation.fromStringAndPosition(string, position);
                return insertOperation;
            }
        },
        {
            key: "shift",
            value: function shift(operation) {
                var length = this.string.length, offset = length, shiftedOperation = operation.shifted(offset);
                return shiftedOperation;
            }
        },
        {
            key: "left",
            value: function left(deleteOperation) {
                var position = deleteOperation.position, length = this.position - position;
                deleteOperation = _delete.default.fromLengthAndPosition(length, position);
                return deleteOperation;
            }
        },
        {
            key: "right",
            value: function right(deleteOperation) {
                var length = deleteOperation.length, position = deleteOperation.position;
                length = length - this.position + position;
                position = this.position;
                deleteOperation = _delete.default.fromLengthAndPosition(length, position);
                return deleteOperation;
            }
        }
    ], [
        {
            key: "fromStringAndPosition",
            value: function fromStringAndPosition(string, position) {
                var type = _types.insertType, insertOperation = new InsertOperation(type, string, position);
                return insertOperation;
            }
        },
        {
            key: "fromJSON",
            value: function fromJSON(json) {
                var type = json["type"], string = json["string"], position = json["position"], insertOperation = new InsertOperation(type, string, position);
                return insertOperation;
            }
        }
    ]);
    return InsertOperation;
}();
exports.default = InsertOperation;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVyYXRpb24vaW5zZXJ0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHN0cmluZ0NvbXBhcmUgZnJvbSBcIi4uL3N0cmluZ0NvbXBhcmVcIjtcclxuaW1wb3J0IERlbGV0ZU9wZXJhdGlvbiBmcm9tIFwiLi4vb3BlcmF0aW9uL2RlbGV0ZVwiO1xyXG5cclxuaW1wb3J0IHsgaW5zZXJ0VHlwZSB9IGZyb20gXCIuLi90eXBlc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5zZXJ0T3BlcmF0aW9uIHtcclxuICBjb25zdHJ1Y3Rvcih0eXBlLCBzdHJpbmcsIHBvc2l0aW9uKSB7XHJcblx0ICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgdGhpcy5zdHJpbmcgPSBzdHJpbmc7XHJcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgfVxyXG5cclxuICBjbG9uZSgpIHtcclxuICAgIHJldHVybiBJbnNlcnRPcGVyYXRpb24uZnJvbVN0cmluZ0FuZFBvc2l0aW9uKHRoaXMuc3RyaW5nLCB0aGlzLnBvc2l0aW9uKTtcclxuICB9XHJcblxyXG4gIHRvSlNPTigpIHtcclxuICAgIGNvbnN0IGpzb24gPSB7XHJcblx0ICAgICAgICAgIFwidHlwZVwiOiB0aGlzLnR5cGUsXHJcbiAgICAgICAgICAgIFwic3RyaW5nXCI6IHRoaXMuc3RyaW5nLFxyXG4gICAgICAgICAgICBcInBvc2l0aW9uXCI6IHRoaXMucG9zaXRpb25cclxuICAgICAgICAgIH07XHJcbiAgICBcclxuICAgIHJldHVybiBqc29uO1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtT3BlcmF0aW9uKG9wZXJhdGlvbikge1xyXG4gICAgc3dpdGNoIChvcGVyYXRpb24udHlwZSkge1xyXG4gICAgICBjYXNlIFwiaW5zZXJ0XCI6XHJcbiAgICAgICAgcmV0dXJuICgodGF1LCByaG8pID0+IHtcclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uIDwgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbdGF1LmNsb25lKCldO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPT09IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICBpZiAodGF1LnN0cmluZyA9PT0gcmhvLnN0cmluZykge1xyXG4gICAgICAgICAgICAgIHJldHVybiBbdGF1LmNsb25lKCldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0YXUuc3RyaW5nICE9PSByaG8uc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHN0cmluZ0NvbXBhcmUocmhvLnN0cmluZywgdGF1LnN0cmluZykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbcmhvLnNoaWZ0KHRhdSldO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW3RhdS5jbG9uZSgpXTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uID4gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbcmhvLnNoaWZ0KHRhdSldO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KShvcGVyYXRpb24sIHRoaXMpO1xyXG5cclxuICAgICAgY2FzZSBcImRlbGV0ZVwiOlxyXG4gICAgICAgIHJldHVybiAoKHRhdSwgcmhvKSA9PiB7XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiArIHRhdS5sZW5ndGggPD0gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbdGF1LmNsb25lKCldO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPCByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtyaG8ubGVmdCh0YXUpLCByaG8ubGVmdCh0YXUpLnNoaWZ0KHJoby5zaGlmdChyaG8ucmlnaHQodGF1KSkpXTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uID49IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gW3Joby5zaGlmdCh0YXUpXTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSkob3BlcmF0aW9uLCB0aGlzKTtcclxuXHJcbiAgICAgIGNhc2UgXCJlbXB0eVwiOlxyXG4gICAgICAgIHJldHVybiAoKHRhdSwgcmhvKSA9PiB7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIFt0YXUuY2xvbmUoKV07XHJcblxyXG4gICAgICAgIH0pKG9wZXJhdGlvbiwgdGhpcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1Db250ZW50KGNvbnRlbnQpIHtcclxuICAgIHJldHVybiBjb250ZW50LnN1YnN0cmluZygwLCB0aGlzLnBvc2l0aW9uKSArIHRoaXMuc3RyaW5nICsgY29udGVudC5zdWJzdHJpbmcodGhpcy5wb3NpdGlvbik7XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1TZWxlY3Rpb24oc2VsZWN0aW9uKSB7XHJcbiAgICBsZXQgdHJhbnNmb3JtZWRTZWxlY3Rpb247XHJcblxyXG4gICAgY29uc3Qgc3RhcnRQb3NpdGlvbiA9IHRoaXMucG9zaXRpb24sIC8vL1xyXG4gICAgICAgICAgbGVuZ3RoID0gdGhpcy5zdHJpbmcubGVuZ3RoLFxyXG4gICAgICAgICAgc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRTdGFydFBvc2l0aW9uKCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRFbmRQb3NpdGlvbigpLFxyXG4gICAgICAgICAgb2Zmc2V0ID0gbGVuZ3RoLCAgLy8vXHJcbiAgICAgICAgICBlbmRPZmZzZXQgPSBvZmZzZXQ7IC8vL1xyXG5cclxuICAgIGlmIChmYWxzZSkge1xyXG5cclxuICAgIH0gZWxzZSBpZiAoc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiA+PSBzdGFydFBvc2l0aW9uKSB7XHJcbiAgICAgIHRyYW5zZm9ybWVkU2VsZWN0aW9uID0gc2VsZWN0aW9uLnNoaWZ0ZWQob2Zmc2V0KTtcclxuICAgIH0gZWxzZSBpZiAoc2VsZWN0aW9uRW5kUG9zaXRpb24gPiBzdGFydFBvc2l0aW9uKSB7XHJcbiAgICAgIHRyYW5zZm9ybWVkU2VsZWN0aW9uID0gc2VsZWN0aW9uLmVuZFBvc2l0aW9uU2hpZnRlZChlbmRPZmZzZXQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdHJhbnNmb3JtZWRTZWxlY3Rpb24gPSBzZWxlY3Rpb24uY2xvbmUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJhbnNmb3JtZWRTZWxlY3Rpb247XHJcbiAgfVxyXG5cclxuICBzaGlmdGVkKG9mZnNldCkge1xyXG4gICAgY29uc3Qgc3RyaW5nID0gdGhpcy5zdHJpbmcsXHJcbiAgICAgICAgICBwb3NpdGlvbiA9IHRoaXMucG9zaXRpb24gKyBvZmZzZXQsXHJcbiAgICAgICAgICBpbnNlcnRPcGVyYXRpb24gPSBJbnNlcnRPcGVyYXRpb24uZnJvbVN0cmluZ0FuZFBvc2l0aW9uKHN0cmluZywgcG9zaXRpb24pO1xyXG5cclxuICAgIHJldHVybiBpbnNlcnRPcGVyYXRpb247XHJcbiAgfVxyXG5cclxuICBzaGlmdChvcGVyYXRpb24pIHtcclxuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMuc3RyaW5nLmxlbmd0aCxcclxuXHRcdFx0XHQgIG9mZnNldCA9IGxlbmd0aCwgIC8vL1xyXG4gICAgICAgICAgc2hpZnRlZE9wZXJhdGlvbiA9IG9wZXJhdGlvbi5zaGlmdGVkKG9mZnNldCk7XHJcblxyXG4gICAgcmV0dXJuIHNoaWZ0ZWRPcGVyYXRpb247XHJcbiAgfVxyXG5cclxuICBsZWZ0KGRlbGV0ZU9wZXJhdGlvbikge1xyXG4gICAgY29uc3QgcG9zaXRpb24gPSBkZWxldGVPcGVyYXRpb24ucG9zaXRpb24sXHJcbiAgICAgICAgICBsZW5ndGggPSB0aGlzLnBvc2l0aW9uIC0gcG9zaXRpb247XHJcblxyXG4gICAgZGVsZXRlT3BlcmF0aW9uID0gRGVsZXRlT3BlcmF0aW9uLmZyb21MZW5ndGhBbmRQb3NpdGlvbihsZW5ndGgsIHBvc2l0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gZGVsZXRlT3BlcmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgcmlnaHQoZGVsZXRlT3BlcmF0aW9uKSB7XHJcbiAgICBsZXQgbGVuZ3RoID0gZGVsZXRlT3BlcmF0aW9uLmxlbmd0aCxcclxuICAgICAgICBwb3NpdGlvbiA9IGRlbGV0ZU9wZXJhdGlvbi5wb3NpdGlvbjtcclxuXHJcbiAgICBsZW5ndGggPSBsZW5ndGggLSB0aGlzLnBvc2l0aW9uICsgcG9zaXRpb247XHJcbiAgICBwb3NpdGlvbiA9IHRoaXMucG9zaXRpb247XHJcblxyXG4gICAgZGVsZXRlT3BlcmF0aW9uID0gRGVsZXRlT3BlcmF0aW9uLmZyb21MZW5ndGhBbmRQb3NpdGlvbihsZW5ndGgsIHBvc2l0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gZGVsZXRlT3BlcmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21TdHJpbmdBbmRQb3NpdGlvbihzdHJpbmcsIHBvc2l0aW9uKSB7XHJcbiAgICBjb25zdCB0eXBlID0gaW5zZXJ0VHlwZSwgIC8vL1xyXG4gICAgICAgICAgaW5zZXJ0T3BlcmF0aW9uID0gbmV3IEluc2VydE9wZXJhdGlvbih0eXBlLCBzdHJpbmcsIHBvc2l0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gaW5zZXJ0T3BlcmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcclxuICAgIGNvbnN0IHR5cGUgPSBqc29uW1widHlwZVwiXSxcclxuICAgICAgICAgIHN0cmluZyA9IGpzb25bXCJzdHJpbmdcIl0sXHJcbiAgICAgICAgICBwb3NpdGlvbiA9IGpzb25bXCJwb3NpdGlvblwiXSxcclxuICAgICAgICAgIGluc2VydE9wZXJhdGlvbiA9IG5ldyBJbnNlcnRPcGVyYXRpb24odHlwZSwgc3RyaW5nLCBwb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIGluc2VydE9wZXJhdGlvbjtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJDQUFBLFVBQVk7Ozs7O0lBRWMsY0FBa0I7SUFDaEIsT0FBcUI7SUFFdEIsTUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVoQixlQUFlO2FBQWYsZUFBZSxDQUN0QixJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVE7OEJBRGYsZUFBZTthQUU1QixJQUFJLEdBQUcsSUFBSTthQUNWLE1BQU0sR0FBRyxNQUFNO2FBQ2YsUUFBUSxHQUFHLFFBQVE7O2lCQUpQLGVBQWU7O1lBT2xDLEdBQUssR0FBTCxLQUFLOzRCQUFMLEtBQUs7dUJBQ0ksZUFBZSxDQUFDLHFCQUFxQixNQUFNLE1BQU0sT0FBTyxRQUFROzs7O1lBR3pFLEdBQU0sR0FBTixNQUFNOzRCQUFOLE1BQU07b0JBQ0UsSUFBSTtxQkFDSCxJQUFNLFFBQU8sSUFBSTtxQkFDaEIsTUFBUSxRQUFPLE1BQU07cUJBQ3JCLFFBQVUsUUFBTyxRQUFROzt1QkFHMUIsSUFBSTs7OztZQUdiLEdBQWtCLEdBQWxCLGtCQUFrQjs0QkFBbEIsa0JBQWtCLENBQUMsU0FBUzt1QkFDbEIsU0FBUyxDQUFDLElBQUk7MEJBQ2YsTUFBUTt5Q0FDRixHQUFHLEVBQUUsR0FBRztnQ0FFWCxHQUFHLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFROztvQ0FDckIsR0FBRyxDQUFDLEtBQUs7OztnQ0FHZixHQUFHLENBQUMsUUFBUSxLQUFLLEdBQUcsQ0FBQyxRQUFRO29DQUMzQixHQUFHLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxNQUFNOzt3Q0FDbkIsR0FBRyxDQUFDLEtBQUs7OztvQ0FFZixHQUFHLENBQUMsTUFBTSxLQUFLLEdB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