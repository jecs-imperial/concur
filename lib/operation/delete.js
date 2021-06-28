"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _empty = _interopRequireDefault(require("../operation/empty"));
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
var DeleteOperation = /*#__PURE__*/ function() {
    function DeleteOperation(type, length, position) {
        _classCallCheck(this, DeleteOperation);
        this.type = type;
        this.length = length;
        this.position = position;
    }
    _createClass(DeleteOperation, [
        {
            key: "clone",
            value: function clone() {
                return DeleteOperation.fromLengthAndPosition(this.length, this.position);
            }
        },
        {
            key: "toJSON",
            value: function toJSON() {
                var json = {
                    "type": this.type,
                    "length": this.length,
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
                            if (tau.position <= rho.position) {
                                return [
                                    tau.clone()
                                ];
                            }
                            if (tau.position > rho.position) {
                                if (tau.position < rho.length + rho.position) {
                                    return [
                                        tau.left(rho).shift(tau)
                                    ];
                                }
                                if (tau.position >= rho.length + rho.position) {
                                    return [
                                        rho.shift(tau)
                                    ];
                                }
                            }
                        })(operation, this);
                    case "delete":
                        return (function(tau, rho) {
                            if (tau.position < rho.position) {
                                if (tau.length + tau.position <= rho.position) {
                                    return [
                                        tau.clone()
                                    ];
                                }
                                if (tau.length + tau.position <= rho.length + rho.position) {
                                    return [
                                        rho.takenFrom(tau)
                                    ];
                                }
                                if (tau.length + tau.position > rho.length + rho.position) {
                                    return [
                                        rho.split(tau)
                                    ];
                                }
                            }
                            if (tau.position === rho.position) {
                                if (tau.length + tau.position <= rho.length + rho.position) {
                                    return [
                                        _empty.default.fromNothing()
                                    ];
                                }
                                if (tau.length + tau.position > rho.length + rho.position) {
                                    return [
                                        rho.shift(rho.takenFrom(tau))
                                    ];
                                }
                            }
                            if (tau.position >= rho.length + rho.position) {
                                return [
                                    rho.shift(tau)
                                ];
                            }
                            if (tau.position > rho.position) {
                                if (tau.length + tau.position <= rho.length + rho.position) {
                                    return [
                                        _empty.default.fromNothing()
                                    ];
                                }
                                if (tau.length + tau.position > rho.length + rho.position) {
                                    return [
                                        rho.shift(rho.takenFrom(tau))
                                    ];
                                }
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
                return content.substring(0, this.position) + content.substring(this.length + this.position);
            }
        },
        {
            key: "transformSelection",
            value: function transformSelection(selection) {
                var transformedSelection;
                var length = this.length, startPosition = this.position, endPosition = startPosition + length, selectionStartPosition = selection.getStartPosition(), selectionEndPosition = selection.getEndPosition();
                var offset, endOffset;
                if (false) {
                } else if (selectionStartPosition >= endPosition) {
                    offset = -length;
                    transformedSelection = selection.shifted(offset);
                } else if (selectionStartPosition >= startPosition) {
                    if (selectionEndPosition > endPosition) {
                        offset = startPosition - selectionStartPosition;
                        endOffset = selectionStartPosition - endPosition;
                        transformedSelection = selection.shifted(offset).endPositionShifted(endOffset);
                    } else {
                        var Selection1 = selection.constructor; ///
                        transformedSelection = new Selection1(startPosition, startPosition);
                    }
                } else if (selectionEndPosition > endPosition) {
                    endOffset = -length;
                    transformedSelection = selection.endPositionShifted(endOffset);
                } else if (selectionEndPosition > startPosition) {
                    endOffset = startPosition - selectionEndPosition;
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
                var length = this.length, position = this.position + offset, deleteOperation = DeleteOperation.fromLengthAndPosition(length, position);
                return deleteOperation;
            }
        },
        {
            key: "shift",
            value: function shift(operation) {
                var offset = -this.length, shiftedOperation = operation.shifted(offset);
                return shiftedOperation;
            }
        },
        {
            key: "takenFrom",
            value: function takenFrom(deleteOperation) {
                var length = deleteOperation.length, position = deleteOperation.position;
                if (this.position > position && this.length + this.position >= length + position) {
                    length = this.position - position;
                    deleteOperation = DeleteOperation.fromLengthAndPosition(length, position);
                }
                if (this.position <= position && this.length + this.position < length + position) {
                    length = length + position - this.position - this.length;
                    position = this.length + this.position;
                    deleteOperation = DeleteOperation.fromLengthAndPosition(length, position);
                }
                return deleteOperation;
            }
        },
        {
            key: "split",
            value: function split(deleteOperation) {
                var length = deleteOperation.length, position = deleteOperation.position;
                length = length - this.length;
                deleteOperation = DeleteOperation.fromLengthAndPosition(length, position);
                return deleteOperation;
            }
        }
    ], [
        {
            key: "fromLengthAndPosition",
            value: function fromLengthAndPosition(length, position) {
                var type = _types.deleteType, deleteOperation = new DeleteOperation(type, length, position);
                return deleteOperation;
            }
        },
        {
            key: "fromJSON",
            value: function fromJSON(json) {
                var type = json["type"], length = json["length"], position = json["position"], deleteOperation = new DeleteOperation(type, length, position);
                return deleteOperation;
            }
        }
    ]);
    return DeleteOperation;
}();
exports.default = DeleteOperation;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVyYXRpb24vZGVsZXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IEVtcHR5T3BlcmF0aW9uIGZyb20gXCIuLi9vcGVyYXRpb24vZW1wdHlcIjtcclxuXHJcbmltcG9ydCB7IGRlbGV0ZVR5cGUgfSBmcm9tIFwiLi4vdHlwZXNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlbGV0ZU9wZXJhdGlvbiB7XHJcbiAgY29uc3RydWN0b3IodHlwZSwgbGVuZ3RoLCBwb3NpdGlvbikge1xyXG5cdCAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gIH1cclxuXHJcbiAgY2xvbmUoKSB7XHJcbiAgICByZXR1cm4gRGVsZXRlT3BlcmF0aW9uLmZyb21MZW5ndGhBbmRQb3NpdGlvbih0aGlzLmxlbmd0aCwgdGhpcy5wb3NpdGlvbik7XHJcbiAgfVxyXG5cclxuICB0b0pTT04oKSB7XHJcbiAgICBjb25zdCBqc29uID0ge1xyXG5cdCAgICAgICAgICBcInR5cGVcIjogdGhpcy50eXBlLFxyXG4gICAgICAgICAgICBcImxlbmd0aFwiOiB0aGlzLmxlbmd0aCxcclxuICAgICAgICAgICAgXCJwb3NpdGlvblwiOiB0aGlzLnBvc2l0aW9uLFxyXG4gICAgICAgICAgfTtcclxuICAgIFxyXG4gICAgcmV0dXJuIGpzb247XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1PcGVyYXRpb24ob3BlcmF0aW9uKSB7XHJcbiAgICBzd2l0Y2ggKG9wZXJhdGlvbi50eXBlKSB7XHJcbiAgICAgIGNhc2UgXCJpbnNlcnRcIjpcclxuICAgICAgICByZXR1cm4gKCh0YXUsIHJobykgPT4ge1xyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPD0gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbdGF1LmNsb25lKCldO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPiByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA8IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW3RhdS5sZWZ0KHJobykuc2hpZnQodGF1KV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA+PSByaG8ubGVuZ3RoICsgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFtyaG8uc2hpZnQodGF1KV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSkob3BlcmF0aW9uLCB0aGlzKTtcclxuXHJcbiAgICAgIGNhc2UgXCJkZWxldGVcIjpcclxuICAgICAgICByZXR1cm4gKCh0YXUsIHJobykgPT4ge1xyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPCByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgaWYgKHRhdS5sZW5ndGggKyB0YXUucG9zaXRpb24gPD0gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFt0YXUuY2xvbmUoKV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRhdS5sZW5ndGggKyB0YXUucG9zaXRpb24gPD0gcmhvLmxlbmd0aCArIHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgIHJldHVybiBbcmhvLnRha2VuRnJvbSh0YXUpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGF1Lmxlbmd0aCArIHRhdS5wb3NpdGlvbiA+IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW3Joby5zcGxpdCh0YXUpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPT09IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICBpZiAodGF1Lmxlbmd0aCArIHRhdS5wb3NpdGlvbiA8PSByaG8ubGVuZ3RoICsgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFtFbXB0eU9wZXJhdGlvbi5mcm9tTm90aGluZygpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGF1Lmxlbmd0aCArIHRhdS5wb3NpdGlvbiA+IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW3Joby5zaGlmdChyaG8udGFrZW5Gcm9tKHRhdSkpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPj0gcmhvLmxlbmd0aCArIHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gW3Joby5zaGlmdCh0YXUpXTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uID4gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICh0YXUubGVuZ3RoICsgdGF1LnBvc2l0aW9uIDw9IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW0VtcHR5T3BlcmF0aW9uLmZyb21Ob3RoaW5nKCldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0YXUubGVuZ3RoICsgdGF1LnBvc2l0aW9uID4gcmhvLmxlbmd0aCArIHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgIHJldHVybiBbcmhvLnNoaWZ0KHJoby50YWtlbkZyb20odGF1KSldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pKG9wZXJhdGlvbiwgdGhpcyk7XHJcblxyXG4gICAgICBjYXNlIFwiZW1wdHlcIjpcclxuICAgICAgICByZXR1cm4gKCh0YXUsIHJobykgPT4ge1xyXG5cclxuICAgICAgICAgIHJldHVybiBbdGF1LmNsb25lKCldO1xyXG5cclxuICAgICAgICB9KShvcGVyYXRpb24sIHRoaXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtQ29udGVudChjb250ZW50KSB7XHJcbiAgICByZXR1cm4gY29udGVudC5zdWJzdHJpbmcoMCwgdGhpcy5wb3NpdGlvbikgKyBjb250ZW50LnN1YnN0cmluZyh0aGlzLmxlbmd0aCArIHRoaXMucG9zaXRpb24pO1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtU2VsZWN0aW9uKHNlbGVjdGlvbikge1xyXG4gICAgbGV0IHRyYW5zZm9ybWVkU2VsZWN0aW9uO1xyXG5cclxuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMubGVuZ3RoLCAgLy8vXHJcbiAgICAgICAgICBzdGFydFBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbiwgLy8vXHJcbiAgICAgICAgICBlbmRQb3NpdGlvbiA9IHN0YXJ0UG9zaXRpb24gKyBsZW5ndGgsXHJcbiAgICAgICAgICBzZWxlY3Rpb25TdGFydFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldFN0YXJ0UG9zaXRpb24oKSxcclxuICAgICAgICAgIHNlbGVjdGlvbkVuZFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldEVuZFBvc2l0aW9uKCk7XHJcblxyXG4gICAgbGV0IG9mZnNldCxcclxuICAgICAgICBlbmRPZmZzZXQ7XHJcblxyXG4gICAgaWYgKGZhbHNlKSB7XHJcblxyXG4gICAgfSBlbHNlIGlmIChzZWxlY3Rpb25TdGFydFBvc2l0aW9uID49IGVuZFBvc2l0aW9uKSB7XHJcbiAgICAgIG9mZnNldCA9IC1sZW5ndGg7XHJcblxyXG4gICAgICB0cmFuc2Zvcm1lZFNlbGVjdGlvbiA9IHNlbGVjdGlvbi5zaGlmdGVkKG9mZnNldCk7XHJcbiAgICB9IGVsc2UgaWYgKHNlbGVjdGlvblN0YXJ0UG9zaXRpb24gPj0gc3RhcnRQb3NpdGlvbikge1xyXG4gICAgICBpZiAoc2VsZWN0aW9uRW5kUG9zaXRpb24gPiBlbmRQb3NpdGlvbikge1xyXG4gICAgICAgIG9mZnNldCA9IHN0YXJ0UG9zaXRpb24gLSBzZWxlY3Rpb25TdGFydFBvc2l0aW9uO1xyXG4gICAgICAgIGVuZE9mZnNldCA9IHNlbGVjdGlvblN0YXJ0UG9zaXRpb24gLSBlbmRQb3NpdGlvbjtcclxuXHJcbiAgICAgICAgdHJhbnNmb3JtZWRTZWxlY3Rpb24gPSBzZWxlY3Rpb24uc2hpZnRlZChvZmZzZXQpLmVuZFBvc2l0aW9uU2hpZnRlZChlbmRPZmZzZXQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IFNlbGVjdGlvbiA9IHNlbGVjdGlvbi5jb25zdHJ1Y3RvcjsgIC8vL1xyXG5cclxuICAgICAgICB0cmFuc2Zvcm1lZFNlbGVjdGlvbiA9IG5ldyBTZWxlY3Rpb24oc3RhcnRQb3NpdGlvbiwgc3RhcnRQb3NpdGlvbik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoc2VsZWN0aW9uRW5kUG9zaXRpb24gPiBlbmRQb3NpdGlvbikge1xyXG4gICAgICBlbmRPZmZzZXQgPSAtbGVuZ3RoO1xyXG5cclxuICAgICAgdHJhbnNmb3JtZWRTZWxlY3Rpb24gPSBzZWxlY3Rpb24uZW5kUG9zaXRpb25TaGlmdGVkKGVuZE9mZnNldCk7XHJcbiAgICB9IGVsc2UgaWYgKHNlbGVjdGlvbkVuZFBvc2l0aW9uID4gc3RhcnRQb3NpdGlvbikge1xyXG4gICAgICBlbmRPZmZzZXQgPSBzdGFydFBvc2l0aW9uIC0gc2VsZWN0aW9uRW5kUG9zaXRpb247XHJcblxyXG4gICAgICB0cmFuc2Zvcm1lZFNlbGVjdGlvbiA9IHNlbGVjdGlvbi5lbmRQb3NpdGlvblNoaWZ0ZWQoZW5kT2Zmc2V0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRyYW5zZm9ybWVkU2VsZWN0aW9uID0gc2VsZWN0aW9uLmNsb25lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRyYW5zZm9ybWVkU2VsZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgc2hpZnRlZChvZmZzZXQpIHtcclxuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMubGVuZ3RoLFxyXG4gICAgICAgICAgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uICsgb2Zmc2V0LFxyXG4gICAgICAgICAgZGVsZXRlT3BlcmF0aW9uID0gRGVsZXRlT3BlcmF0aW9uLmZyb21MZW5ndGhBbmRQb3NpdGlvbihsZW5ndGgsIHBvc2l0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gZGVsZXRlT3BlcmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgc2hpZnQob3BlcmF0aW9uKSB7XHJcbiAgICBjb25zdCBvZmZzZXQgPSAtdGhpcy5sZW5ndGgsXHJcbiAgICAgICAgICBzaGlmdGVkT3BlcmF0aW9uID0gb3BlcmF0aW9uLnNoaWZ0ZWQob2Zmc2V0KTtcclxuXHJcbiAgICByZXR1cm4gc2hpZnRlZE9wZXJhdGlvblxyXG4gIH1cclxuXHJcbiAgdGFrZW5Gcm9tKGRlbGV0ZU9wZXJhdGlvbikge1xyXG4gICAgbGV0IGxlbmd0aCA9IGRlbGV0ZU9wZXJhdGlvbi5sZW5ndGgsXHJcbiAgICAgICAgcG9zaXRpb24gPSBkZWxldGVPcGVyYXRpb24ucG9zaXRpb247XHJcblxyXG4gICAgaWYgKHRoaXMucG9zaXRpb24gPiBwb3NpdGlvbiAmJiB0aGlzLmxlbmd0aCArIHRoaXMucG9zaXRpb24gPj0gbGVuZ3RoICsgcG9zaXRpb24pIHtcclxuICAgICAgbGVuZ3RoID0gdGhpcy5wb3NpdGlvbiAtIHBvc2l0aW9uO1xyXG5cclxuICAgICAgZGVsZXRlT3BlcmF0aW9uID0gRGVsZXRlT3BlcmF0aW9uLmZyb21MZW5ndGhBbmRQb3NpdGlvbihsZW5ndGgsIHBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5wb3NpdGlvbiA8PSBwb3NpdGlvbiAmJiB0aGlzLmxlbmd0aCArIHRoaXMucG9zaXRpb24gPCBsZW5ndGggKyBwb3NpdGlvbikge1xyXG4gICAgICBsZW5ndGggPSBsZW5ndGggKyBwb3NpdGlvbiAtIHRoaXMucG9zaXRpb24gLSB0aGlzLmxlbmd0aDtcclxuICAgICAgcG9zaXRpb24gPSB0aGlzLmxlbmd0aCArIHRoaXMucG9zaXRpb247XHJcblxyXG4gICAgICBkZWxldGVPcGVyYXRpb24gPSBEZWxldGVPcGVyYXRpb24uZnJvbUxlbmd0aEFuZFBvc2l0aW9uKGxlbmd0aCwgcG9zaXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkZWxldGVPcGVyYXRpb247XHJcbiAgfVxyXG5cclxuICBzcGxpdChkZWxldGVPcGVyYXRpb24pIHtcclxuICAgIGxldCBsZW5ndGggPSBkZWxldGVPcGVyYXRpb24ubGVuZ3RoLFxyXG4gICAgICAgIHBvc2l0aW9uID0gZGVsZXRlT3BlcmF0aW9uLnBvc2l0aW9uO1xyXG5cclxuICAgIGxlbmd0aCA9IGxlbmd0aCAtIHRoaXMubGVuZ3RoO1xyXG5cclxuICAgIGRlbGV0ZU9wZXJhdGlvbiA9IERlbGV0ZU9wZXJhdGlvbi5mcm9tTGVuZ3RoQW5kUG9zaXRpb24obGVuZ3RoLCBwb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIGRlbGV0ZU9wZXJhdGlvbjtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tTGVuZ3RoQW5kUG9zaXRpb24obGVuZ3RoLCBwb3NpdGlvbikge1xyXG4gICAgY29uc3QgdHlwZSA9IGRlbGV0ZVR5cGUsIC8vL1xyXG4gICAgICAgICAgZGVsZXRlT3BlcmF0aW9uID0gbmV3IERlbGV0ZU9wZXJhdGlvbih0eXBlLCBsZW5ndGgsIHBvc2l0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gZGVsZXRlT3BlcmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcclxuICAgIGNvbnN0IHR5cGUgPSBqc29uW1widHlwZVwiXSxcclxuICAgICAgICAgIGxlbmd0aCA9IGpzb25bXCJsZW5ndGhcIl0sXHJcbiAgICAgICAgICBwb3NpdGlvbiA9IGpzb25bXCJwb3NpdGlvblwiXSxcclxuICAgICAgICAgIGRlbGV0ZU9wZXJhdGlvbiA9IG5ldyBEZWxldGVPcGVyYXRpb24odHlwZSwgbGVuZ3RoLCBwb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIGRlbGV0ZU9wZXJhdGlvbjtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJDQUFBLFVBQVk7Ozs7O0FBRWUsR0FBb0IsQ0FBcEIsTUFBb0I7QUFFcEIsR0FBVSxDQUFWLE1BQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFaEIsZUFBZTthQUFmLGVBQWUsQ0FDdEIsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFROzhCQURmLGVBQWU7YUFFNUIsSUFBSSxHQUFHLElBQUk7YUFDVixNQUFNLEdBQUcsTUFBTTthQUNmLFFBQVEsR0FBRyxRQUFROztpQkFKUCxlQUFlOztZQU9sQyxHQUFLLEdBQUwsS0FBSzs0QkFBTCxLQUFLLEdBQUcsQ0FBQzt1QkFDQSxlQUFlLENBQUMscUJBQXFCLE1BQU0sTUFBTSxPQUFPLFFBQVE7WUFDekUsQ0FBQzs7O1lBRUQsR0FBTSxHQUFOLE1BQU07NEJBQU4sTUFBTSxHQUFHLENBQUM7Z0JBQ1IsR0FBSyxDQUFDLElBQUk7cUJBQ0gsSUFBTSxRQUFPLElBQUk7cUJBQ2hCLE1BQVEsUUFBTyxNQUFNO3FCQUNyQixRQUFVLFFBQU8sUUFBUTs7dUJBRzFCLElBQUk7WUFDYixDQUFDOzs7WUFFRCxHQUFrQixHQUFsQixrQkFBa0I7NEJBQWxCLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxDQUFDO3VCQUNyQixTQUFTLENBQUMsSUFBSTswQkFDZixNQUFRO3lDQUNGLEdBQUcsRUFBRSxHQUFHLEVBQUssQ0FBQzs0QkFFckIsRUFBRSxFQUFFLEdBQUcsQ0FBQyxRQUFRLElBQUksR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDOztvQ0FDekIsR0FBRyxDQUFDLEtBQUs7OzRCQUNuQixDQUFDOzRCQUVELEVBQUUsRUFBRSxHQUFHLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQ0FDaEMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7O3dDQUNyQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRzs7Z0NBQ2pDLENBQUM7Z0NBQ0QsRUFBRSxFQUFFLEdBQUcsQ0FBQyxRQUFRLElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7O3dDQUN0QyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUc7O2dDQUN2QixDQUFDOzRCQUNILENBQUM7d0JBRUgsQ0FBQyxFQUFFLFNBQVM7MEJBRVQsTUFBUTt5Q0FDRixHQUFHLEVBQUUsR0FBRyxFQUFLLENBQUM7NEJBRXJCLEVBQUUsRUFBRSxHQUFHLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQ0FDaEMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLFFBQVEsSUFBSSxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7O3dDQUN0QyxHQUFHLENBQUMsS0FBSzs7Z0NBQ25CLENBQUM7Z0NBQ0QsRUFBRSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLFFBQVEsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7d0NBQ25ELEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRzs7Z0NBQzNCLENBQUM7Z0NBQ0QsRUFBRSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7d0NBQ2xELEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRzs7Z0NBQ3ZCLENBQUM7NEJBQ0gsQ0FBQzs0QkFFRCxFQUFFLEVBQUUsR0FBRyxDQUFDLFFBQVEsS0FBSyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7Z0NBQ2xDLEVBQUUsRUFBRSxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxRQUFRLElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7O3dDQTdEOUMsTUFBb0IsU0E4RFYsV0FBVzs7Z0NBQ3BDLENBQUM7Z0NBQ0QsRUFBRSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7d0NBQ2xELEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHOztnQ0FDckMsQ0FBQzs0QkFDSCxDQUFDOzRCQUVELEVBQUUsRUFBRSxHQUFHLENBQUMsUUFBUSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDOztvQ0FDdEMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHOzs0QkFDdkIsQ0FBQzs0QkFFRCxFQUFFLEVBQUUsR0FBRyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7Z0NBQ2hDLEVBQUUsRUFBRSxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxRQUFRLElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7O3dDQTFFOUMsTUFBb0IsU0EyRVYsV0FBVzs7Z0NBQ3BDLENBQUM7Z0NBQ0QsRUFBRSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7d0NBQ2xELEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHOztnQ0FDckMsQ0FBQzs0QkFDSCxDQUFDO3dCQUVILENBQUMsRUFBRSxTQUFTOzBCQUVULEtB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