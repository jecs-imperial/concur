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
var InsertOperation = /*#__PURE__*/ function() {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVyYXRpb24vaW5zZXJ0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHN0cmluZ0NvbXBhcmUgZnJvbSBcIi4uL3N0cmluZ0NvbXBhcmVcIjtcclxuaW1wb3J0IERlbGV0ZU9wZXJhdGlvbiBmcm9tIFwiLi4vb3BlcmF0aW9uL2RlbGV0ZVwiO1xyXG5cclxuaW1wb3J0IHsgaW5zZXJ0VHlwZSB9IGZyb20gXCIuLi90eXBlc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5zZXJ0T3BlcmF0aW9uIHtcclxuICBjb25zdHJ1Y3Rvcih0eXBlLCBzdHJpbmcsIHBvc2l0aW9uKSB7XHJcblx0ICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgdGhpcy5zdHJpbmcgPSBzdHJpbmc7XHJcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgfVxyXG5cclxuICBjbG9uZSgpIHtcclxuICAgIHJldHVybiBJbnNlcnRPcGVyYXRpb24uZnJvbVN0cmluZ0FuZFBvc2l0aW9uKHRoaXMuc3RyaW5nLCB0aGlzLnBvc2l0aW9uKTtcclxuICB9XHJcblxyXG4gIHRvSlNPTigpIHtcclxuICAgIGNvbnN0IGpzb24gPSB7XHJcblx0ICAgICAgICAgIFwidHlwZVwiOiB0aGlzLnR5cGUsXHJcbiAgICAgICAgICAgIFwic3RyaW5nXCI6IHRoaXMuc3RyaW5nLFxyXG4gICAgICAgICAgICBcInBvc2l0aW9uXCI6IHRoaXMucG9zaXRpb25cclxuICAgICAgICAgIH07XHJcbiAgICBcclxuICAgIHJldHVybiBqc29uO1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtT3BlcmF0aW9uKG9wZXJhdGlvbikge1xyXG4gICAgc3dpdGNoIChvcGVyYXRpb24udHlwZSkge1xyXG4gICAgICBjYXNlIFwiaW5zZXJ0XCI6XHJcbiAgICAgICAgcmV0dXJuICgodGF1LCByaG8pID0+IHtcclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uIDwgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbdGF1LmNsb25lKCldO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPT09IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICBpZiAodGF1LnN0cmluZyA9PT0gcmhvLnN0cmluZykge1xyXG4gICAgICAgICAgICAgIHJldHVybiBbdGF1LmNsb25lKCldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0YXUuc3RyaW5nICE9PSByaG8uc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHN0cmluZ0NvbXBhcmUocmhvLnN0cmluZywgdGF1LnN0cmluZykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbcmhvLnNoaWZ0KHRhdSldO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW3RhdS5jbG9uZSgpXTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uID4gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbcmhvLnNoaWZ0KHRhdSldO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KShvcGVyYXRpb24sIHRoaXMpO1xyXG5cclxuICAgICAgY2FzZSBcImRlbGV0ZVwiOlxyXG4gICAgICAgIHJldHVybiAoKHRhdSwgcmhvKSA9PiB7XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiArIHRhdS5sZW5ndGggPD0gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbdGF1LmNsb25lKCldO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPCByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtyaG8ubGVmdCh0YXUpLCByaG8ubGVmdCh0YXUpLnNoaWZ0KHJoby5zaGlmdChyaG8ucmlnaHQodGF1KSkpXTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uID49IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gW3Joby5zaGlmdCh0YXUpXTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSkob3BlcmF0aW9uLCB0aGlzKTtcclxuXHJcbiAgICAgIGNhc2UgXCJlbXB0eVwiOlxyXG4gICAgICAgIHJldHVybiAoKHRhdSwgcmhvKSA9PiB7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIFt0YXUuY2xvbmUoKV07XHJcblxyXG4gICAgICAgIH0pKG9wZXJhdGlvbiwgdGhpcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1Db250ZW50KGNvbnRlbnQpIHtcclxuICAgIHJldHVybiBjb250ZW50LnN1YnN0cmluZygwLCB0aGlzLnBvc2l0aW9uKSArIHRoaXMuc3RyaW5nICsgY29udGVudC5zdWJzdHJpbmcodGhpcy5wb3NpdGlvbik7XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1TZWxlY3Rpb24oc2VsZWN0aW9uKSB7XHJcbiAgICBsZXQgdHJhbnNmb3JtZWRTZWxlY3Rpb247XHJcblxyXG4gICAgY29uc3Qgc3RhcnRQb3NpdGlvbiA9IHRoaXMucG9zaXRpb24sIC8vL1xyXG4gICAgICAgICAgbGVuZ3RoID0gdGhpcy5zdHJpbmcubGVuZ3RoLFxyXG4gICAgICAgICAgc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRTdGFydFBvc2l0aW9uKCksXHJcbiAgICAgICAgICBzZWxlY3Rpb25FbmRQb3NpdGlvbiA9IHNlbGVjdGlvbi5nZXRFbmRQb3NpdGlvbigpLFxyXG4gICAgICAgICAgb2Zmc2V0ID0gbGVuZ3RoLCAgLy8vXHJcbiAgICAgICAgICBlbmRPZmZzZXQgPSBvZmZzZXQ7IC8vL1xyXG5cclxuICAgIGlmIChmYWxzZSkge1xyXG5cclxuICAgIH0gZWxzZSBpZiAoc2VsZWN0aW9uU3RhcnRQb3NpdGlvbiA+PSBzdGFydFBvc2l0aW9uKSB7XHJcbiAgICAgIHRyYW5zZm9ybWVkU2VsZWN0aW9uID0gc2VsZWN0aW9uLnNoaWZ0ZWQob2Zmc2V0KTtcclxuICAgIH0gZWxzZSBpZiAoc2VsZWN0aW9uRW5kUG9zaXRpb24gPiBzdGFydFBvc2l0aW9uKSB7XHJcbiAgICAgIHRyYW5zZm9ybWVkU2VsZWN0aW9uID0gc2VsZWN0aW9uLmVuZFBvc2l0aW9uU2hpZnRlZChlbmRPZmZzZXQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdHJhbnNmb3JtZWRTZWxlY3Rpb24gPSBzZWxlY3Rpb24uY2xvbmUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJhbnNmb3JtZWRTZWxlY3Rpb247XHJcbiAgfVxyXG5cclxuICBzaGlmdGVkKG9mZnNldCkge1xyXG4gICAgY29uc3Qgc3RyaW5nID0gdGhpcy5zdHJpbmcsXHJcbiAgICAgICAgICBwb3NpdGlvbiA9IHRoaXMucG9zaXRpb24gKyBvZmZzZXQsXHJcbiAgICAgICAgICBpbnNlcnRPcGVyYXRpb24gPSBJbnNlcnRPcGVyYXRpb24uZnJvbVN0cmluZ0FuZFBvc2l0aW9uKHN0cmluZywgcG9zaXRpb24pO1xyXG5cclxuICAgIHJldHVybiBpbnNlcnRPcGVyYXRpb247XHJcbiAgfVxyXG5cclxuICBzaGlmdChvcGVyYXRpb24pIHtcclxuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMuc3RyaW5nLmxlbmd0aCxcclxuXHRcdFx0XHQgIG9mZnNldCA9IGxlbmd0aCwgIC8vL1xyXG4gICAgICAgICAgc2hpZnRlZE9wZXJhdGlvbiA9IG9wZXJhdGlvbi5zaGlmdGVkKG9mZnNldCk7XHJcblxyXG4gICAgcmV0dXJuIHNoaWZ0ZWRPcGVyYXRpb247XHJcbiAgfVxyXG5cclxuICBsZWZ0KGRlbGV0ZU9wZXJhdGlvbikge1xyXG4gICAgY29uc3QgcG9zaXRpb24gPSBkZWxldGVPcGVyYXRpb24ucG9zaXRpb24sXHJcbiAgICAgICAgICBsZW5ndGggPSB0aGlzLnBvc2l0aW9uIC0gcG9zaXRpb247XHJcblxyXG4gICAgZGVsZXRlT3BlcmF0aW9uID0gRGVsZXRlT3BlcmF0aW9uLmZyb21MZW5ndGhBbmRQb3NpdGlvbihsZW5ndGgsIHBvc2l0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gZGVsZXRlT3BlcmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgcmlnaHQoZGVsZXRlT3BlcmF0aW9uKSB7XHJcbiAgICBsZXQgbGVuZ3RoID0gZGVsZXRlT3BlcmF0aW9uLmxlbmd0aCxcclxuICAgICAgICBwb3NpdGlvbiA9IGRlbGV0ZU9wZXJhdGlvbi5wb3NpdGlvbjtcclxuXHJcbiAgICBsZW5ndGggPSBsZW5ndGggLSB0aGlzLnBvc2l0aW9uICsgcG9zaXRpb247XHJcbiAgICBwb3NpdGlvbiA9IHRoaXMucG9zaXRpb247XHJcblxyXG4gICAgZGVsZXRlT3BlcmF0aW9uID0gRGVsZXRlT3BlcmF0aW9uLmZyb21MZW5ndGhBbmRQb3NpdGlvbihsZW5ndGgsIHBvc2l0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gZGVsZXRlT3BlcmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21TdHJpbmdBbmRQb3NpdGlvbihzdHJpbmcsIHBvc2l0aW9uKSB7XHJcbiAgICBjb25zdCB0eXBlID0gaW5zZXJ0VHlwZSwgIC8vL1xyXG4gICAgICAgICAgaW5zZXJ0T3BlcmF0aW9uID0gbmV3IEluc2VydE9wZXJhdGlvbih0eXBlLCBzdHJpbmcsIHBvc2l0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gaW5zZXJ0T3BlcmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcclxuICAgIGNvbnN0IHR5cGUgPSBqc29uW1widHlwZVwiXSxcclxuICAgICAgICAgIHN0cmluZyA9IGpzb25bXCJzdHJpbmdcIl0sXHJcbiAgICAgICAgICBwb3NpdGlvbiA9IGpzb25bXCJwb3NpdGlvblwiXSxcclxuICAgICAgICAgIGluc2VydE9wZXJhdGlvbiA9IG5ldyBJbnNlcnRPcGVyYXRpb24odHlwZSwgc3RyaW5nLCBwb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIGluc2VydE9wZXJhdGlvbjtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJDQUFBLFVBQVk7Ozs7O0FBRWMsR0FBa0IsQ0FBbEIsY0FBa0I7QUFDaEIsR0FBcUIsQ0FBckIsT0FBcUI7QUFFdEIsR0FBVSxDQUFWLE1BQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFaEIsZUFBZTthQUFmLGVBQWUsQ0FDdEIsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFROzhCQURmLGVBQWU7YUFFNUIsSUFBSSxHQUFHLElBQUk7YUFDVixNQUFNLEdBQUcsTUFBTTthQUNmLFFBQVEsR0FBRyxRQUFROztpQkFKUCxlQUFlOztZQU9sQyxHQUFLLEdBQUwsS0FBSzs0QkFBTCxLQUFLLEdBQUcsQ0FBQzt1QkFDQSxlQUFlLENBQUMscUJBQXFCLE1BQU0sTUFBTSxPQUFPLFFBQVE7WUFDekUsQ0FBQzs7O1lBRUQsR0FBTSxHQUFOLE1BQU07NEJBQU4sTUFBTSxHQUFHLENBQUM7Z0JBQ1IsR0FBSyxDQUFDLElBQUk7cUJBQ0gsSUFBTSxRQUFPLElBQUk7cUJBQ2hCLE1BQVEsUUFBTyxNQUFNO3FCQUNyQixRQUFVLFFBQU8sUUFBUTs7dUJBRzFCLElBQUk7WUFDYixDQUFDOzs7WUFFRCxHQUFrQixHQUFsQixrQkFBa0I7NEJBQWxCLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxDQUFDO3VCQUNyQixTQUFTLENBQUMsSUFBSTswQkFDZixNQUFRO3lDQUNGLEdBQUcsRUFBRSxHQUFHLEVBQUssQ0FBQzs0QkFFckIsRUFBRSxFQUFFLEdBQUcsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDOztvQ0FDeEIsR0FBRyxDQUFDLEtBQUs7OzRCQUNuQixDQUFDOzRC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