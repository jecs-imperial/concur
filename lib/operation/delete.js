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
                        return function(tau, rho) {
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
                        }(operation, this);
                    case "delete":
                        return function(tau, rho) {
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
                        }(operation, this);
                    case "empty":
                        return function(tau, rho) {
                            return [
                                tau.clone()
                            ];
                        }(operation, this);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVyYXRpb24vZGVsZXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IEVtcHR5T3BlcmF0aW9uIGZyb20gXCIuLi9vcGVyYXRpb24vZW1wdHlcIjtcclxuXHJcbmltcG9ydCB7IGRlbGV0ZVR5cGUgfSBmcm9tIFwiLi4vdHlwZXNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlbGV0ZU9wZXJhdGlvbiB7XHJcbiAgY29uc3RydWN0b3IodHlwZSwgbGVuZ3RoLCBwb3NpdGlvbikge1xyXG5cdCAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gIH1cclxuXHJcbiAgY2xvbmUoKSB7XHJcbiAgICByZXR1cm4gRGVsZXRlT3BlcmF0aW9uLmZyb21MZW5ndGhBbmRQb3NpdGlvbih0aGlzLmxlbmd0aCwgdGhpcy5wb3NpdGlvbik7XHJcbiAgfVxyXG5cclxuICB0b0pTT04oKSB7XHJcbiAgICBjb25zdCBqc29uID0ge1xyXG5cdCAgICAgICAgICBcInR5cGVcIjogdGhpcy50eXBlLFxyXG4gICAgICAgICAgICBcImxlbmd0aFwiOiB0aGlzLmxlbmd0aCxcclxuICAgICAgICAgICAgXCJwb3NpdGlvblwiOiB0aGlzLnBvc2l0aW9uLFxyXG4gICAgICAgICAgfTtcclxuICAgIFxyXG4gICAgcmV0dXJuIGpzb247XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1PcGVyYXRpb24ob3BlcmF0aW9uKSB7XHJcbiAgICBzd2l0Y2ggKG9wZXJhdGlvbi50eXBlKSB7XHJcbiAgICAgIGNhc2UgXCJpbnNlcnRcIjpcclxuICAgICAgICByZXR1cm4gKCh0YXUsIHJobykgPT4ge1xyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPD0gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbdGF1LmNsb25lKCldO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPiByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA8IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW3RhdS5sZWZ0KHJobykuc2hpZnQodGF1KV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA+PSByaG8ubGVuZ3RoICsgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFtyaG8uc2hpZnQodGF1KV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSkob3BlcmF0aW9uLCB0aGlzKTtcclxuXHJcbiAgICAgIGNhc2UgXCJkZWxldGVcIjpcclxuICAgICAgICByZXR1cm4gKCh0YXUsIHJobykgPT4ge1xyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPCByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgaWYgKHRhdS5sZW5ndGggKyB0YXUucG9zaXRpb24gPD0gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFt0YXUuY2xvbmUoKV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRhdS5sZW5ndGggKyB0YXUucG9zaXRpb24gPD0gcmhvLmxlbmd0aCArIHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgIHJldHVybiBbcmhvLnRha2VuRnJvbSh0YXUpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGF1Lmxlbmd0aCArIHRhdS5wb3NpdGlvbiA+IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW3Joby5zcGxpdCh0YXUpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPT09IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICBpZiAodGF1Lmxlbmd0aCArIHRhdS5wb3NpdGlvbiA8PSByaG8ubGVuZ3RoICsgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFtFbXB0eU9wZXJhdGlvbi5mcm9tTm90aGluZygpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGF1Lmxlbmd0aCArIHRhdS5wb3NpdGlvbiA+IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW3Joby5zaGlmdChyaG8udGFrZW5Gcm9tKHRhdSkpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPj0gcmhvLmxlbmd0aCArIHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gW3Joby5zaGlmdCh0YXUpXTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uID4gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICh0YXUubGVuZ3RoICsgdGF1LnBvc2l0aW9uIDw9IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW0VtcHR5T3BlcmF0aW9uLmZyb21Ob3RoaW5nKCldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0YXUubGVuZ3RoICsgdGF1LnBvc2l0aW9uID4gcmhvLmxlbmd0aCArIHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgIHJldHVybiBbcmhvLnNoaWZ0KHJoby50YWtlbkZyb20odGF1KSldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pKG9wZXJhdGlvbiwgdGhpcyk7XHJcblxyXG4gICAgICBjYXNlIFwiZW1wdHlcIjpcclxuICAgICAgICByZXR1cm4gKCh0YXUsIHJobykgPT4ge1xyXG5cclxuICAgICAgICAgIHJldHVybiBbdGF1LmNsb25lKCldO1xyXG5cclxuICAgICAgICB9KShvcGVyYXRpb24sIHRoaXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtQ29udGVudChjb250ZW50KSB7XHJcbiAgICByZXR1cm4gY29udGVudC5zdWJzdHJpbmcoMCwgdGhpcy5wb3NpdGlvbikgKyBjb250ZW50LnN1YnN0cmluZyh0aGlzLmxlbmd0aCArIHRoaXMucG9zaXRpb24pO1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtU2VsZWN0aW9uKHNlbGVjdGlvbikge1xyXG4gICAgbGV0IHRyYW5zZm9ybWVkU2VsZWN0aW9uO1xyXG5cclxuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMubGVuZ3RoLCAgLy8vXHJcbiAgICAgICAgICBzdGFydFBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbiwgLy8vXHJcbiAgICAgICAgICBlbmRQb3NpdGlvbiA9IHN0YXJ0UG9zaXRpb24gKyBsZW5ndGgsXHJcbiAgICAgICAgICBzZWxlY3Rpb25TdGFydFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldFN0YXJ0UG9zaXRpb24oKSxcclxuICAgICAgICAgIHNlbGVjdGlvbkVuZFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldEVuZFBvc2l0aW9uKCk7XHJcblxyXG4gICAgbGV0IG9mZnNldCxcclxuICAgICAgICBlbmRPZmZzZXQ7XHJcblxyXG4gICAgaWYgKGZhbHNlKSB7XHJcblxyXG4gICAgfSBlbHNlIGlmIChzZWxlY3Rpb25TdGFydFBvc2l0aW9uID49IGVuZFBvc2l0aW9uKSB7XHJcbiAgICAgIG9mZnNldCA9IC1sZW5ndGg7XHJcblxyXG4gICAgICB0cmFuc2Zvcm1lZFNlbGVjdGlvbiA9IHNlbGVjdGlvbi5zaGlmdGVkKG9mZnNldCk7XHJcbiAgICB9IGVsc2UgaWYgKHNlbGVjdGlvblN0YXJ0UG9zaXRpb24gPj0gc3RhcnRQb3NpdGlvbikge1xyXG4gICAgICBpZiAoc2VsZWN0aW9uRW5kUG9zaXRpb24gPiBlbmRQb3NpdGlvbikge1xyXG4gICAgICAgIG9mZnNldCA9IHN0YXJ0UG9zaXRpb24gLSBzZWxlY3Rpb25TdGFydFBvc2l0aW9uO1xyXG4gICAgICAgIGVuZE9mZnNldCA9IHNlbGVjdGlvblN0YXJ0UG9zaXRpb24gLSBlbmRQb3NpdGlvbjtcclxuXHJcbiAgICAgICAgdHJhbnNmb3JtZWRTZWxlY3Rpb24gPSBzZWxlY3Rpb24uc2hpZnRlZChvZmZzZXQpLmVuZFBvc2l0aW9uU2hpZnRlZChlbmRPZmZzZXQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IFNlbGVjdGlvbiA9IHNlbGVjdGlvbi5jb25zdHJ1Y3RvcjsgIC8vL1xyXG5cclxuICAgICAgICB0cmFuc2Zvcm1lZFNlbGVjdGlvbiA9IG5ldyBTZWxlY3Rpb24oc3RhcnRQb3NpdGlvbiwgc3RhcnRQb3NpdGlvbik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoc2VsZWN0aW9uRW5kUG9zaXRpb24gPiBlbmRQb3NpdGlvbikge1xyXG4gICAgICBlbmRPZmZzZXQgPSAtbGVuZ3RoO1xyXG5cclxuICAgICAgdHJhbnNmb3JtZWRTZWxlY3Rpb24gPSBzZWxlY3Rpb24uZW5kUG9zaXRpb25TaGlmdGVkKGVuZE9mZnNldCk7XHJcbiAgICB9IGVsc2UgaWYgKHNlbGVjdGlvbkVuZFBvc2l0aW9uID4gc3RhcnRQb3NpdGlvbikge1xyXG4gICAgICBlbmRPZmZzZXQgPSBzdGFydFBvc2l0aW9uIC0gc2VsZWN0aW9uRW5kUG9zaXRpb247XHJcblxyXG4gICAgICB0cmFuc2Zvcm1lZFNlbGVjdGlvbiA9IHNlbGVjdGlvbi5lbmRQb3NpdGlvblNoaWZ0ZWQoZW5kT2Zmc2V0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRyYW5zZm9ybWVkU2VsZWN0aW9uID0gc2VsZWN0aW9uLmNsb25lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRyYW5zZm9ybWVkU2VsZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgc2hpZnRlZChvZmZzZXQpIHtcclxuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMubGVuZ3RoLFxyXG4gICAgICAgICAgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uICsgb2Zmc2V0LFxyXG4gICAgICAgICAgZGVsZXRlT3BlcmF0aW9uID0gRGVsZXRlT3BlcmF0aW9uLmZyb21MZW5ndGhBbmRQb3NpdGlvbihsZW5ndGgsIHBvc2l0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gZGVsZXRlT3BlcmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgc2hpZnQob3BlcmF0aW9uKSB7XHJcbiAgICBjb25zdCBvZmZzZXQgPSAtdGhpcy5sZW5ndGgsXHJcbiAgICAgICAgICBzaGlmdGVkT3BlcmF0aW9uID0gb3BlcmF0aW9uLnNoaWZ0ZWQob2Zmc2V0KTtcclxuXHJcbiAgICByZXR1cm4gc2hpZnRlZE9wZXJhdGlvblxyXG4gIH1cclxuXHJcbiAgdGFrZW5Gcm9tKGRlbGV0ZU9wZXJhdGlvbikge1xyXG4gICAgbGV0IGxlbmd0aCA9IGRlbGV0ZU9wZXJhdGlvbi5sZW5ndGgsXHJcbiAgICAgICAgcG9zaXRpb24gPSBkZWxldGVPcGVyYXRpb24ucG9zaXRpb247XHJcblxyXG4gICAgaWYgKHRoaXMucG9zaXRpb24gPiBwb3NpdGlvbiAmJiB0aGlzLmxlbmd0aCArIHRoaXMucG9zaXRpb24gPj0gbGVuZ3RoICsgcG9zaXRpb24pIHtcclxuICAgICAgbGVuZ3RoID0gdGhpcy5wb3NpdGlvbiAtIHBvc2l0aW9uO1xyXG5cclxuICAgICAgZGVsZXRlT3BlcmF0aW9uID0gRGVsZXRlT3BlcmF0aW9uLmZyb21MZW5ndGhBbmRQb3NpdGlvbihsZW5ndGgsIHBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5wb3NpdGlvbiA8PSBwb3NpdGlvbiAmJiB0aGlzLmxlbmd0aCArIHRoaXMucG9zaXRpb24gPCBsZW5ndGggKyBwb3NpdGlvbikge1xyXG4gICAgICBsZW5ndGggPSBsZW5ndGggKyBwb3NpdGlvbiAtIHRoaXMucG9zaXRpb24gLSB0aGlzLmxlbmd0aDtcclxuICAgICAgcG9zaXRpb24gPSB0aGlzLmxlbmd0aCArIHRoaXMucG9zaXRpb247XHJcblxyXG4gICAgICBkZWxldGVPcGVyYXRpb24gPSBEZWxldGVPcGVyYXRpb24uZnJvbUxlbmd0aEFuZFBvc2l0aW9uKGxlbmd0aCwgcG9zaXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkZWxldGVPcGVyYXRpb247XHJcbiAgfVxyXG5cclxuICBzcGxpdChkZWxldGVPcGVyYXRpb24pIHtcclxuICAgIGxldCBsZW5ndGggPSBkZWxldGVPcGVyYXRpb24ubGVuZ3RoLFxyXG4gICAgICAgIHBvc2l0aW9uID0gZGVsZXRlT3BlcmF0aW9uLnBvc2l0aW9uO1xyXG5cclxuICAgIGxlbmd0aCA9IGxlbmd0aCAtIHRoaXMubGVuZ3RoO1xyXG5cclxuICAgIGRlbGV0ZU9wZXJhdGlvbiA9IERlbGV0ZU9wZXJhdGlvbi5mcm9tTGVuZ3RoQW5kUG9zaXRpb24obGVuZ3RoLCBwb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIGRlbGV0ZU9wZXJhdGlvbjtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tTGVuZ3RoQW5kUG9zaXRpb24obGVuZ3RoLCBwb3NpdGlvbikge1xyXG4gICAgY29uc3QgdHlwZSA9IGRlbGV0ZVR5cGUsIC8vL1xyXG4gICAgICAgICAgZGVsZXRlT3BlcmF0aW9uID0gbmV3IERlbGV0ZU9wZXJhdGlvbih0eXBlLCBsZW5ndGgsIHBvc2l0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gZGVsZXRlT3BlcmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcclxuICAgIGNvbnN0IHR5cGUgPSBqc29uW1widHlwZVwiXSxcclxuICAgICAgICAgIGxlbmd0aCA9IGpzb25bXCJsZW5ndGhcIl0sXHJcbiAgICAgICAgICBwb3NpdGlvbiA9IGpzb25bXCJwb3NpdGlvblwiXSxcclxuICAgICAgICAgIGRlbGV0ZU9wZXJhdGlvbiA9IG5ldyBEZWxldGVPcGVyYXRpb24odHlwZSwgbGVuZ3RoLCBwb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIGRlbGV0ZU9wZXJhdGlvbjtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJDQUFBLFVBQUE7Ozs7O0lBRUEsTUFBQTtJQUVBLE1BQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFQSxlQUFBO2FBQUEsZUFBQSxDQUNBLElBQUEsRUFBQSxNQUFBLEVBQUEsUUFBQTs4QkFEQSxlQUFBO2FBRUEsSUFBQSxHQUFBLElBQUE7YUFDQSxNQUFBLEdBQUEsTUFBQTthQUNBLFFBQUEsR0FBQSxRQUFBOztpQkFKQSxlQUFBOztBQU9BLGVBQUEsR0FBQSxLQUFBOzRCQUFBLEtBQUE7dUJBQ0EsZUFBQSxDQUFBLHFCQUFBLE1BQUEsTUFBQSxPQUFBLFFBQUE7Ozs7QUFHQSxlQUFBLEdBQUEsTUFBQTs0QkFBQSxNQUFBO29CQUNBLElBQUE7cUJBQ0EsSUFBQSxRQUFBLElBQUE7cUJBQ0EsTUFBQSxRQUFBLE1BQUE7cUJBQ0EsUUFBQSxRQUFBLFFBQUE7O3VCQUdBLElBQUE7Ozs7QUFHQSxlQUFBLEdBQUEsa0JBQUE7NEJBQUEsa0JBQUEsQ0FBQSxTQUFBO3VCQUNBLFNBQUEsQ0FBQSxJQUFBOzBCQUNBLE1BQUE7d0NBQ0EsR0FBQSxFQUFBLEdBQUE7Z0NBRUEsR0FBQSxDQUFBLFFBQUEsSUFBQSxHQUFBLENBQUEsUUFBQTs7QUFDQSx1Q0FBQSxDQUFBLEtBQUE7OztnQ0FHQSxHQUFBLENBQUEsUUFBQSxHQUFBLEdBQUEsQ0FBQSxRQUFBO29DQUNBLEdBQUEsQ0FBQSxRQUFBLEdBQUEsR0FBQSxDQUFBLE1BQUEsR0FBQSxHQUFBLENBQUEsUUFBQTs7QUFDQSwyQ0FBQSxDQUFBLElBQUEsQ0FBQSxHQUFBLEVBQUEsS0FBQSxDQUFBLEdBQUE7OztvQ0FFQSxHQUFBLENBQUEsUUFBQSxJQUFBLEdBQUEsQ0FBQSxNQUFBLEdBQUEsR0FBQSxDQUFBLFFBQUE7O0FBQ0EsMkNBQUEsQ0FBQSxLQUFBLENBQUEsR0FBQTs7OzswQkFJQSxTQUFBOzBCQUVBLE1BQUE7d0NBQ0EsR0FBQSxFQUFBLEdBQUE7Z0NBRUEsR0FBQSxDQUFBLFFBQUEsR0FBQSxHQUFBLENBQUEsUUFBQTtvQ0FDQSxHQUFBLENBQUEsTUFBQSxHQUFBLEdBQUEsQ0FBQSxRQUFBLElBQUEsR0FBQSxDQUFBLFFBQUE7O0FBQ0EsMkNBQUEsQ0FBQSxLQUFBOzs7b0NBRUEsR0FBQSxDQUFBLE1BQUEsR0FBQSxHQUFBLENBQUEsUUFBQSxJQUFBLEdBQUEsQ0FBQSxNQUFBLEdBQUEsR0FBQSxDQUFBLFFBQUE7O0FBQ0EsMkNBQUEsQ0FBQSxTQUFBLENBQUEsR0FBQTs7O29DQUVBLEdBQUEsQ0FBQSxNQUFBLEdBQUEsR0FBQSxDQUFBLFFBQUEsR0FBQSxHQUFBLENBQUEsTUFBQSxHQUFBLEdBQUEsQ0FBQSxRQUFBOztBQUNBLDJDQUFBLENBQUEsS0FBQSxDQUFBLEdBQUE7Ozs7Z0NBSUEsR0FBQSxDQUFBLFFBQUEsS0FBQSxHQUFBLENBQUEsUUFBQTtvQ0FDQSxHQUFBLENBQUEsTUFBQSxHQUFBLEdBQUEsQ0FBQSxRQUFBLElBQUEsR0FBQSxDQUFBLE1BQUEsR0FBQSxHQUFBLENBQUEsUUFBQTs7QUE3REEsOENBQUEsU0E4REEsV0FBQTs7O29DQUVBLEdBQUEsQ0FBQSxNQUFBLEdBQUEsR0FBQSxDQUFBLFFBQUEsR0FBQSxHQUFBLENBQUEsTUFBQSxHQUFBLEdBQUEsQ0FBQSxRQUFBOztBQUNBLDJDQUFBLENBQUEsS0FBQSxDQUFBLEdBQUEsQ0FBQSxTQUFBLENBQUEsR0FBQTs7OztnQ0FJQSxHQUFBLENBQUEsUUFBQSxJQUFBLEdBQUEsQ0FBQSxNQUFBLEdBQUEsR0FBQSxDQUFBLFFBQUE7O0FBQ0EsdUNBQUEsQ0FBQSxLQUFBLENBQUEsR0FBQTs7O2dDQUdBLEdBQUEsQ0FBQSxRQUFB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