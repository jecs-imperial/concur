"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _v4 = _interopRequireDefault(require("uuid/v4"));
var _necessary = require("necessary");
var _user = _interopRequireDefault(require("./user"));
var _transform = _interopRequireDefault(require("./content/transform"));
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
var filter = _necessary.arrayUtilities.filter;
var Session = /*#__PURE__*/ function() {
    function Session(map, content, identifier) {
        _classCallCheck(this, Session);
        this.map = map;
        this.content = content;
        this.identifier = identifier;
    }
    _createClass(Session, [
        {
            key: "getMap",
            value: function getMap() {
                return this.map;
            }
        },
        {
            key: "getContent",
            value: function getContent() {
                return this.content;
            }
        },
        {
            key: "getIdentifier",
            value: function getIdentifier() {
                return this.identifier;
            }
        },
        {
            key: "getUser",
            value: function getUser(userIdentifier) {
                var user = this.map[userIdentifier];
                return user;
            }
        },
        {
            key: "getOtherUsers",
            value: function getOtherUsers(userIdentifier) {
                var otherUsers = Object.values(this.map);
                filter(otherUsers, function(otherUser) {
                    var otherUserIdentifier = otherUser.getIdentifier();
                    if (otherUserIdentifier !== userIdentifier) {
                        return true;
                    }
                });
                return otherUsers;
            }
        },
        {
            key: "hasExpired",
            value: function hasExpired(sessionIdentifier) {
                var expired = this.identifier !== sessionIdentifier;
                return expired;
            }
        },
        {
            key: "createUser",
            value: function createUser() {
                var user = _user.default.fromNothing(), userIdentifier = user.getIdentifier();
                this.map[userIdentifier] = user;
                return userIdentifier;
            }
        },
        {
            key: "update",
            value: function update(operations, userIdentifier, sessionExpired) {
                var pendingOperations = sessionExpired ? [] : this.updateUsers(operations, userIdentifier);
                return pendingOperations;
            }
        },
        {
            key: "updateUsers",
            value: function updateUsers(operations, userIdentifier) {
                var user = this.getUser(userIdentifier), otherUsers = this.getOtherUsers(userIdentifier), transformedOperations = user.transformOperations(operations), transformedPendingOperations = user.transformedPendingOperations(operations);
                otherUsers.forEach(function(otherUser) {
                    otherUser.updatePendingOperations(transformedOperations);
                });
                this.content = (0, _transform).default(this.content, transformedOperations);
                user.resetPendingOperations();
                var pendingOperations = transformedPendingOperations; ///
                return pendingOperations;
            }
        }
    ], [
        {
            key: "fromNothing",
            value: function fromNothing() {
                var map = {
                }, content = "", identifier = (0, _v4).default(), session = new Session(map, content, identifier);
                return session;
            }
        }
    ]);
    return Session;
}();
var session = Session.fromNothing();
var _default = session;
exports.default = _default;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXNzaW9uLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHV1aWRWNCBmcm9tIFwidXVpZC92NFwiO1xyXG5cclxuaW1wb3J0IHsgYXJyYXlVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XHJcblxyXG5pbXBvcnQgVXNlciBmcm9tIFwiLi91c2VyXCI7XHJcbmltcG9ydCB0cmFuc2Zvcm1Db250ZW50IGZyb20gXCIuL2NvbnRlbnQvdHJhbnNmb3JtXCI7XHJcblxyXG5jb25zdCB7IGZpbHRlciB9ID0gYXJyYXlVdGlsaXRpZXM7XHJcblxyXG5jbGFzcyBTZXNzaW9uIHtcclxuXHRjb25zdHJ1Y3RvcihtYXAsIGNvbnRlbnQsIGlkZW50aWZpZXIpIHtcclxuXHRcdHRoaXMubWFwID0gbWFwO1xyXG5cdFx0dGhpcy5jb250ZW50ID0gY29udGVudDtcclxuXHRcdHRoaXMuaWRlbnRpZmllciA9IGlkZW50aWZpZXI7XHJcblx0fVxyXG5cclxuXHRnZXRNYXAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5tYXA7XHJcblx0fVxyXG5cclxuXHRnZXRDb250ZW50KCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuY29udGVudDtcclxuXHR9XHJcblxyXG5cdGdldElkZW50aWZpZXIoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5pZGVudGlmaWVyO1xyXG5cdH1cclxuXHJcblx0Z2V0VXNlcih1c2VySWRlbnRpZmllcikge1xyXG5cdFx0Y29uc3QgdXNlciA9IHRoaXMubWFwW3VzZXJJZGVudGlmaWVyXTtcclxuXHJcblx0XHRyZXR1cm4gdXNlcjtcclxuXHR9XHJcblxyXG5cdGdldE90aGVyVXNlcnModXNlcklkZW50aWZpZXIpIHtcclxuXHRcdGNvbnN0IG90aGVyVXNlcnMgPSBPYmplY3QudmFsdWVzKHRoaXMubWFwKTtcclxuXHJcblx0XHRmaWx0ZXIob3RoZXJVc2VycywgKG90aGVyVXNlcikgPT4ge1xyXG5cdFx0XHRjb25zdCBvdGhlclVzZXJJZGVudGlmaWVyID0gb3RoZXJVc2VyLmdldElkZW50aWZpZXIoKTtcclxuXHJcblx0XHRcdGlmIChvdGhlclVzZXJJZGVudGlmaWVyICE9PSB1c2VySWRlbnRpZmllcikge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gb3RoZXJVc2VycztcclxuXHR9XHJcblxyXG5cdGhhc0V4cGlyZWQoc2Vzc2lvbklkZW50aWZpZXIpIHtcclxuXHRcdGNvbnN0IGV4cGlyZWQgPSAodGhpcy5pZGVudGlmaWVyICE9PSBzZXNzaW9uSWRlbnRpZmllcik7XHJcblxyXG5cdFx0cmV0dXJuIGV4cGlyZWQ7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVVc2VyKCkge1xyXG5cdFx0Y29uc3QgdXNlciA9IFVzZXIuZnJvbU5vdGhpbmcoKSxcclxuXHRcdFx0XHRcdHVzZXJJZGVudGlmaWVyID0gdXNlci5nZXRJZGVudGlmaWVyKCk7XHJcblxyXG5cdFx0dGhpcy5tYXBbdXNlcklkZW50aWZpZXJdID0gdXNlcjtcclxuXHJcblx0XHRyZXR1cm4gdXNlcklkZW50aWZpZXI7XHJcblx0fVxyXG5cclxuXHR1cGRhdGUob3BlcmF0aW9ucywgdXNlcklkZW50aWZpZXIsIHNlc3Npb25FeHBpcmVkKSB7XHJcblx0ICBjb25zdCBwZW5kaW5nT3BlcmF0aW9ucyA9IHNlc3Npb25FeHBpcmVkID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVVzZXJzKG9wZXJhdGlvbnMsIHVzZXJJZGVudGlmaWVyKTtcclxuXHJcblx0XHRyZXR1cm4gcGVuZGluZ09wZXJhdGlvbnM7XHJcblx0fVxyXG5cclxuXHR1cGRhdGVVc2VycyhvcGVyYXRpb25zLCB1c2VySWRlbnRpZmllcikge1xyXG4gICAgY29uc3QgdXNlciA9IHRoaXMuZ2V0VXNlcih1c2VySWRlbnRpZmllciksXHJcbiAgICAgICAgICBvdGhlclVzZXJzID0gdGhpcy5nZXRPdGhlclVzZXJzKHVzZXJJZGVudGlmaWVyKSxcclxuICAgICAgICAgIHRyYW5zZm9ybWVkT3BlcmF0aW9ucyA9IHVzZXIudHJhbnNmb3JtT3BlcmF0aW9ucyhvcGVyYXRpb25zKSxcclxuICAgICAgICAgIHRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMgPSB1c2VyLnRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMob3BlcmF0aW9ucyk7XHJcblxyXG4gICAgb3RoZXJVc2Vycy5mb3JFYWNoKChvdGhlclVzZXIpID0+IHtcclxuICAgICAgb3RoZXJVc2VyLnVwZGF0ZVBlbmRpbmdPcGVyYXRpb25zKHRyYW5zZm9ybWVkT3BlcmF0aW9ucyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmNvbnRlbnQgPSB0cmFuc2Zvcm1Db250ZW50KHRoaXMuY29udGVudCwgdHJhbnNmb3JtZWRPcGVyYXRpb25zKTtcclxuXHJcbiAgICB1c2VyLnJlc2V0UGVuZGluZ09wZXJhdGlvbnMoKTtcclxuXHJcbiAgICBjb25zdCBwZW5kaW5nT3BlcmF0aW9ucyA9IHRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnM7IC8vL1xyXG5cclxuICAgIHJldHVybiBwZW5kaW5nT3BlcmF0aW9ucztcclxuICB9XHJcblxyXG5cdHN0YXRpYyBmcm9tTm90aGluZygpIHtcclxuXHRcdGNvbnN0IG1hcCA9IHt9LFxyXG5cdFx0XHRcdFx0Y29udGVudCA9IFwiXCIsXHQvLy9cclxuXHRcdFx0XHRcdGlkZW50aWZpZXIgPSB1dWlkVjQoKSwgIC8vL1xyXG5cdFx0XHRcdFx0c2Vzc2lvbiA9IG5ldyBTZXNzaW9uKG1hcCwgY29udGVudCwgaWRlbnRpZmllcik7XHJcblxyXG5cdFx0cmV0dXJuIHNlc3Npb247XHJcblx0fVxyXG59XHJcblxyXG5jb25zdCBzZXNzaW9uID0gU2Vzc2lvbi5mcm9tTm90aGluZygpO1xyXG5cclxu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