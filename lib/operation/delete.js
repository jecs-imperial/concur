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
var DeleteOperation = function() {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVyYXRpb24vZGVsZXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IEVtcHR5T3BlcmF0aW9uIGZyb20gXCIuLi9vcGVyYXRpb24vZW1wdHlcIjtcclxuXHJcbmltcG9ydCB7IGRlbGV0ZVR5cGUgfSBmcm9tIFwiLi4vdHlwZXNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlbGV0ZU9wZXJhdGlvbiB7XHJcbiAgY29uc3RydWN0b3IodHlwZSwgbGVuZ3RoLCBwb3NpdGlvbikge1xyXG5cdCAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gIH1cclxuXHJcbiAgY2xvbmUoKSB7XHJcbiAgICByZXR1cm4gRGVsZXRlT3BlcmF0aW9uLmZyb21MZW5ndGhBbmRQb3NpdGlvbih0aGlzLmxlbmd0aCwgdGhpcy5wb3NpdGlvbik7XHJcbiAgfVxyXG5cclxuICB0b0pTT04oKSB7XHJcbiAgICBjb25zdCBqc29uID0ge1xyXG5cdCAgICAgICAgICBcInR5cGVcIjogdGhpcy50eXBlLFxyXG4gICAgICAgICAgICBcImxlbmd0aFwiOiB0aGlzLmxlbmd0aCxcclxuICAgICAgICAgICAgXCJwb3NpdGlvblwiOiB0aGlzLnBvc2l0aW9uLFxyXG4gICAgICAgICAgfTtcclxuICAgIFxyXG4gICAgcmV0dXJuIGpzb247XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1PcGVyYXRpb24ob3BlcmF0aW9uKSB7XHJcbiAgICBzd2l0Y2ggKG9wZXJhdGlvbi50eXBlKSB7XHJcbiAgICAgIGNhc2UgXCJpbnNlcnRcIjpcclxuICAgICAgICByZXR1cm4gKCh0YXUsIHJobykgPT4ge1xyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPD0gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbdGF1LmNsb25lKCldO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPiByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA8IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW3RhdS5sZWZ0KHJobykuc2hpZnQodGF1KV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA+PSByaG8ubGVuZ3RoICsgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFtyaG8uc2hpZnQodGF1KV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSkob3BlcmF0aW9uLCB0aGlzKTtcclxuXHJcbiAgICAgIGNhc2UgXCJkZWxldGVcIjpcclxuICAgICAgICByZXR1cm4gKCh0YXUsIHJobykgPT4ge1xyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPCByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgaWYgKHRhdS5sZW5ndGggKyB0YXUucG9zaXRpb24gPD0gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFt0YXUuY2xvbmUoKV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRhdS5sZW5ndGggKyB0YXUucG9zaXRpb24gPD0gcmhvLmxlbmd0aCArIHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgIHJldHVybiBbcmhvLnRha2VuRnJvbSh0YXUpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGF1Lmxlbmd0aCArIHRhdS5wb3NpdGlvbiA+IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW3Joby5zcGxpdCh0YXUpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPT09IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICBpZiAodGF1Lmxlbmd0aCArIHRhdS5wb3NpdGlvbiA8PSByaG8ubGVuZ3RoICsgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFtFbXB0eU9wZXJhdGlvbi5mcm9tTm90aGluZygpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGF1Lmxlbmd0aCArIHRhdS5wb3NpdGlvbiA+IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW3Joby5zaGlmdChyaG8udGFrZW5Gcm9tKHRhdSkpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPj0gcmhvLmxlbmd0aCArIHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gW3Joby5zaGlmdCh0YXUpXTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uID4gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICh0YXUubGVuZ3RoICsgdGF1LnBvc2l0aW9uIDw9IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW0VtcHR5T3BlcmF0aW9uLmZyb21Ob3RoaW5nKCldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0YXUubGVuZ3RoICsgdGF1LnBvc2l0aW9uID4gcmhvLmxlbmd0aCArIHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgIHJldHVybiBbcmhvLnNoaWZ0KHJoby50YWtlbkZyb20odGF1KSldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pKG9wZXJhdGlvbiwgdGhpcyk7XHJcblxyXG4gICAgICBjYXNlIFwiZW1wdHlcIjpcclxuICAgICAgICByZXR1cm4gKCh0YXUsIHJobykgPT4ge1xyXG5cclxuICAgICAgICAgIHJldHVybiBbdGF1LmNsb25lKCldO1xyXG5cclxuICAgICAgICB9KShvcGVyYXRpb24sIHRoaXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtQ29udGVudChjb250ZW50KSB7XHJcbiAgICByZXR1cm4gY29udGVudC5zdWJzdHJpbmcoMCwgdGhpcy5wb3NpdGlvbikgKyBjb250ZW50LnN1YnN0cmluZyh0aGlzLmxlbmd0aCArIHRoaXMucG9zaXRpb24pO1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtU2VsZWN0aW9uKHNlbGVjdGlvbikge1xyXG4gICAgbGV0IHRyYW5zZm9ybWVkU2VsZWN0aW9uO1xyXG5cclxuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMubGVuZ3RoLCAgLy8vXHJcbiAgICAgICAgICBzdGFydFBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbiwgLy8vXHJcbiAgICAgICAgICBlbmRQb3NpdGlvbiA9IHN0YXJ0UG9zaXRpb24gKyBsZW5ndGgsXHJcbiAgICAgICAgICBzZWxlY3Rpb25TdGFydFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldFN0YXJ0UG9zaXRpb24oKSxcclxuICAgICAgICAgIHNlbGVjdGlvbkVuZFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldEVuZFBvc2l0aW9uKCk7XHJcblxyXG4gICAgbGV0IG9mZnNldCxcclxuICAgICAgICBlbmRPZmZzZXQ7XHJcblxyXG4gICAgaWYgKGZhbHNlKSB7XHJcblxyXG4gICAgfSBlbHNlIGlmIChzZWxlY3Rpb25TdGFydFBvc2l0aW9uID49IGVuZFBvc2l0aW9uKSB7XHJcbiAgICAgIG9mZnNldCA9IC1sZW5ndGg7XHJcblxyXG4gICAgICB0cmFuc2Zvcm1lZFNlbGVjdGlvbiA9IHNlbGVjdGlvbi5zaGlmdGVkKG9mZnNldCk7XHJcbiAgICB9IGVsc2UgaWYgKHNlbGVjdGlvblN0YXJ0UG9zaXRpb24gPj0gc3RhcnRQb3NpdGlvbikge1xyXG4gICAgICBpZiAoc2VsZWN0aW9uRW5kUG9zaXRpb24gPiBlbmRQb3NpdGlvbikge1xyXG4gICAgICAgIG9mZnNldCA9IHN0YXJ0UG9zaXRpb24gLSBzZWxlY3Rpb25TdGFydFBvc2l0aW9uO1xyXG4gICAgICAgIGVuZE9mZnNldCA9IHNlbGVjdGlvblN0YXJ0UG9zaXRpb24gLSBlbmRQb3NpdGlvbjtcclxuXHJcbiAgICAgICAgdHJhbnNmb3JtZWRTZWxlY3Rpb24gPSBzZWxlY3Rpb24uc2hpZnRlZChvZmZzZXQpLmVuZFBvc2l0aW9uU2hpZnRlZChlbmRPZmZzZXQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IFNlbGVjdGlvbiA9IHNlbGVjdGlvbi5jb25zdHJ1Y3RvcjsgIC8vL1xyXG5cclxuICAgICAgICB0cmFuc2Zvcm1lZFNlbGVjdGlvbiA9IG5ldyBTZWxlY3Rpb24oc3RhcnRQb3NpdGlvbiwgc3RhcnRQb3NpdGlvbik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoc2VsZWN0aW9uRW5kUG9zaXRpb24gPiBlbmRQb3NpdGlvbikge1xyXG4gICAgICBlbmRPZmZzZXQgPSAtbGVuZ3RoO1xyXG5cclxuICAgICAgdHJhbnNmb3JtZWRTZWxlY3Rpb24gPSBzZWxlY3Rpb24uZW5kUG9zaXRpb25TaGlmdGVkKGVuZE9mZnNldCk7XHJcbiAgICB9IGVsc2UgaWYgKHNlbGVjdGlvbkVuZFBvc2l0aW9uID4gc3RhcnRQb3NpdGlvbikge1xyXG4gICAgICBlbmRPZmZzZXQgPSBzdGFydFBvc2l0aW9uIC0gc2VsZWN0aW9uRW5kUG9zaXRpb247XHJcblxyXG4gICAgICB0cmFuc2Zvcm1lZFNlbGVjdGlvbiA9IHNlbGVjdGlvbi5lbmRQb3NpdGlvblNoaWZ0ZWQoZW5kT2Zmc2V0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRyYW5zZm9ybWVkU2VsZWN0aW9uID0gc2VsZWN0aW9uLmNsb25lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRyYW5zZm9ybWVkU2VsZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgc2hpZnRlZChvZmZzZXQpIHtcclxuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMubGVuZ3RoLFxyXG4gICAgICAgICAgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uICsgb2Zmc2V0LFxyXG4gICAgICAgICAgZGVsZXRlT3BlcmF0aW9uID0gRGVsZXRlT3BlcmF0aW9uLmZyb21MZW5ndGhBbmRQb3NpdGlvbihsZW5ndGgsIHBvc2l0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gZGVsZXRlT3BlcmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgc2hpZnQob3BlcmF0aW9uKSB7XHJcbiAgICBjb25zdCBvZmZzZXQgPSAtdGhpcy5sZW5ndGgsXHJcbiAgICAgICAgICBzaGlmdGVkT3BlcmF0aW9uID0gb3BlcmF0aW9uLnNoaWZ0ZWQob2Zmc2V0KTtcclxuXHJcbiAgICByZXR1cm4gc2hpZnRlZE9wZXJhdGlvblxyXG4gIH1cclxuXHJcbiAgdGFrZW5Gcm9tKGRlbGV0ZU9wZXJhdGlvbikge1xyXG4gICAgbGV0IGxlbmd0aCA9IGRlbGV0ZU9wZXJhdGlvbi5sZW5ndGgsXHJcbiAgICAgICAgcG9zaXRpb24gPSBkZWxldGVPcGVyYXRpb24ucG9zaXRpb247XHJcblxyXG4gICAgaWYgKHRoaXMucG9zaXRpb24gPiBwb3NpdGlvbiAmJiB0aGlzLmxlbmd0aCArIHRoaXMucG9zaXRpb24gPj0gbGVuZ3RoICsgcG9zaXRpb24pIHtcclxuICAgICAgbGVuZ3RoID0gdGhpcy5wb3NpdGlvbiAtIHBvc2l0aW9uO1xyXG5cclxuICAgICAgZGVsZXRlT3BlcmF0aW9uID0gRGVsZXRlT3BlcmF0aW9uLmZyb21MZW5ndGhBbmRQb3NpdGlvbihsZW5ndGgsIHBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5wb3NpdGlvbiA8PSBwb3NpdGlvbiAmJiB0aGlzLmxlbmd0aCArIHRoaXMucG9zaXRpb24gPCBsZW5ndGggKyBwb3NpdGlvbikge1xyXG4gICAgICBsZW5ndGggPSBsZW5ndGggKyBwb3NpdGlvbiAtIHRoaXMucG9zaXRpb24gLSB0aGlzLmxlbmd0aDtcclxuICAgICAgcG9zaXRpb24gPSB0aGlzLmxlbmd0aCArIHRoaXMucG9zaXRpb247XHJcblxyXG4gICAgICBkZWxldGVPcGVyYXRpb24gPSBEZWxldGVPcGVyYXRpb24uZnJvbUxlbmd0aEFuZFBvc2l0aW9uKGxlbmd0aCwgcG9zaXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkZWxldGVPcGVyYXRpb247XHJcbiAgfVxyXG5cclxuICBzcGxpdChkZWxldGVPcGVyYXRpb24pIHtcclxuICAgIGxldCBsZW5ndGggPSBkZWxldGVPcGVyYXRpb24ubGVuZ3RoLFxyXG4gICAgICAgIHBvc2l0aW9uID0gZGVsZXRlT3BlcmF0aW9uLnBvc2l0aW9uO1xyXG5cclxuICAgIGxlbmd0aCA9IGxlbmd0aCAtIHRoaXMubGVuZ3RoO1xyXG5cclxuICAgIGRlbGV0ZU9wZXJhdGlvbiA9IERlbGV0ZU9wZXJhdGlvbi5mcm9tTGVuZ3RoQW5kUG9zaXRpb24obGVuZ3RoLCBwb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIGRlbGV0ZU9wZXJhdGlvbjtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tTGVuZ3RoQW5kUG9zaXRpb24obGVuZ3RoLCBwb3NpdGlvbikge1xyXG4gICAgY29uc3QgdHlwZSA9IGRlbGV0ZVR5cGUsIC8vL1xyXG4gICAgICAgICAgZGVsZXRlT3BlcmF0aW9uID0gbmV3IERlbGV0ZU9wZXJhdGlvbih0eXBlLCBsZW5ndGgsIHBvc2l0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gZGVsZXRlT3BlcmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcclxuICAgIGNvbnN0IHR5cGUgPSBqc29uW1widHlwZVwiXSxcclxuICAgICAgICAgIGxlbmd0aCA9IGpzb25bXCJsZW5ndGhcIl0sXHJcbiAgICAgICAgICBwb3NpdGlvbiA9IGpzb25bXCJwb3NpdGlvblwiXSxcclxuICAgICAgICAgIGRlbGV0ZU9wZXJhdGlvbiA9IG5ldyBEZWxldGVPcGVyYXRpb24odHlwZSwgbGVuZ3RoLCBwb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIGRlbGV0ZU9wZXJhdGlvbjtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJDQUFBLFVBQVk7Ozs7O0lBRWUsTUFBb0I7SUFFcEIsTUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVoQixlQUFlO2FBQWYsZUFBZSxDQUN0QixJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVE7OEJBRGYsZUFBZTthQUU1QixJQUFJLEdBQUcsSUFBSTthQUNWLE1BQU0sR0FBRyxNQUFNO2FBQ2YsUUFBUSxHQUFHLFFBQVE7O2lCQUpQLGVBQWU7O1lBT2xDLEdBQUssR0FBTCxLQUFLOzRCQUFMLEtBQUs7dUJBQ0ksZUFBZSxDQUFDLHFCQUFxQixNQUFNLE1BQU0sT0FBTyxRQUFROzs7O1lBR3pFLEdBQU0sR0FBTixNQUFNOzRCQUFOLE1BQU07b0JBQ0UsSUFBSTtxQkFDSCxJQUFNLFFBQU8sSUFBSTtxQkFDaEIsTUFBUSxRQUFPLE1BQU07cUJBQ3JCLFFBQVUsUUFBTyxRQUFROzt1QkFHMUIsSUFBSTs7OztZQUdiLEdBQWtCLEdBQWxCLGtCQUFrQjs0QkFBbEIsa0JBQWtCLENBQUMsU0FBUzt1QkFDbEIsU0FBUyxDQUFDLElBQUk7MEJBQ2YsTUFBUTt5Q0FDRixHQUFHLEVBQUUsR0FBRztnQ0FFWCxHQUFHLENBQUMsUUFBUSxJQUFJLEdBQUcsQ0FBQyxRQUFROztvQ0FDdEIsR0FBRyxDQUFDLEtBQUs7OztnQ0FHZixHQUFHLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRO29DQUN6QixHQUFHLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLFFBQVE7O3dDQUNsQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdB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