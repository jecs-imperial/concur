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
var Session = function() {
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
                    otherUser.update(transformedOperations);
                });
                this.content = _transform.default(this.content, transformedOperations);
                user.reset();
                var pendingOperations = transformedPendingOperations; ///
                return pendingOperations;
            }
        }
    ], [
        {
            key: "fromNothing",
            value: function fromNothing() {
                var map = {
                }, content = "", identifier = _v4.default(), session = new Session(map, content, identifier);
                return session;
            }
        }
    ]);
    return Session;
}();
var session = Session.fromNothing();
var _default = session;
exports.default = _default;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXNzaW9uLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHV1aWRWNCBmcm9tIFwidXVpZC92NFwiO1xyXG5cclxuaW1wb3J0IHsgYXJyYXlVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XHJcblxyXG5pbXBvcnQgVXNlciBmcm9tIFwiLi91c2VyXCI7XHJcbmltcG9ydCB0cmFuc2Zvcm1Db250ZW50IGZyb20gXCIuL2NvbnRlbnQvdHJhbnNmb3JtXCI7XHJcblxyXG5jb25zdCB7IGZpbHRlciB9ID0gYXJyYXlVdGlsaXRpZXM7XHJcblxyXG5jbGFzcyBTZXNzaW9uIHtcclxuXHRjb25zdHJ1Y3RvcihtYXAsIGNvbnRlbnQsIGlkZW50aWZpZXIpIHtcclxuXHRcdHRoaXMubWFwID0gbWFwO1xyXG5cdFx0dGhpcy5jb250ZW50ID0gY29udGVudDtcclxuXHRcdHRoaXMuaWRlbnRpZmllciA9IGlkZW50aWZpZXI7XHJcblx0fVxyXG5cclxuXHRnZXRNYXAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5tYXA7XHJcblx0fVxyXG5cclxuXHRnZXRDb250ZW50KCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuY29udGVudDtcclxuXHR9XHJcblxyXG5cdGdldElkZW50aWZpZXIoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5pZGVudGlmaWVyO1xyXG5cdH1cclxuXHJcblx0Z2V0VXNlcih1c2VySWRlbnRpZmllcikge1xyXG5cdFx0Y29uc3QgdXNlciA9IHRoaXMubWFwW3VzZXJJZGVudGlmaWVyXTtcclxuXHJcblx0XHRyZXR1cm4gdXNlcjtcclxuXHR9XHJcblxyXG5cdGdldE90aGVyVXNlcnModXNlcklkZW50aWZpZXIpIHtcclxuXHRcdGNvbnN0IG90aGVyVXNlcnMgPSBPYmplY3QudmFsdWVzKHRoaXMubWFwKTtcclxuXHJcblx0XHRmaWx0ZXIob3RoZXJVc2VycywgKG90aGVyVXNlcikgPT4ge1xyXG5cdFx0XHRjb25zdCBvdGhlclVzZXJJZGVudGlmaWVyID0gb3RoZXJVc2VyLmdldElkZW50aWZpZXIoKTtcclxuXHJcblx0XHRcdGlmIChvdGhlclVzZXJJZGVudGlmaWVyICE9PSB1c2VySWRlbnRpZmllcikge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gb3RoZXJVc2VycztcclxuXHR9XHJcblxyXG5cdGhhc0V4cGlyZWQoc2Vzc2lvbklkZW50aWZpZXIpIHtcclxuXHRcdGNvbnN0IGV4cGlyZWQgPSAodGhpcy5pZGVudGlmaWVyICE9PSBzZXNzaW9uSWRlbnRpZmllcik7XHJcblxyXG5cdFx0cmV0dXJuIGV4cGlyZWQ7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVVc2VyKCkge1xyXG5cdFx0Y29uc3QgdXNlciA9IFVzZXIuZnJvbU5vdGhpbmcoKSxcclxuXHRcdFx0XHRcdHVzZXJJZGVudGlmaWVyID0gdXNlci5nZXRJZGVudGlmaWVyKCk7XHJcblxyXG5cdFx0dGhpcy5tYXBbdXNlcklkZW50aWZpZXJdID0gdXNlcjtcclxuXHJcblx0XHRyZXR1cm4gdXNlcklkZW50aWZpZXI7XHJcblx0fVxyXG5cclxuXHR1cGRhdGUob3BlcmF0aW9ucywgdXNlcklkZW50aWZpZXIsIHNlc3Npb25FeHBpcmVkKSB7XHJcblx0ICBjb25zdCBwZW5kaW5nT3BlcmF0aW9ucyA9IHNlc3Npb25FeHBpcmVkID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVVzZXJzKG9wZXJhdGlvbnMsIHVzZXJJZGVudGlmaWVyKTtcclxuXHJcblx0XHRyZXR1cm4gcGVuZGluZ09wZXJhdGlvbnM7XHJcblx0fVxyXG5cclxuXHR1cGRhdGVVc2VycyhvcGVyYXRpb25zLCB1c2VySWRlbnRpZmllcikge1xyXG4gICAgY29uc3QgdXNlciA9IHRoaXMuZ2V0VXNlcih1c2VySWRlbnRpZmllciksXHJcbiAgICAgICAgICBvdGhlclVzZXJzID0gdGhpcy5nZXRPdGhlclVzZXJzKHVzZXJJZGVudGlmaWVyKSxcclxuICAgICAgICAgIHRyYW5zZm9ybWVkT3BlcmF0aW9ucyA9IHVzZXIudHJhbnNmb3JtT3BlcmF0aW9ucyhvcGVyYXRpb25zKSxcclxuICAgICAgICAgIHRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMgPSB1c2VyLnRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMob3BlcmF0aW9ucyk7XHJcblxyXG4gICAgb3RoZXJVc2Vycy5mb3JFYWNoKChvdGhlclVzZXIpID0+IHtcclxuICAgICAgb3RoZXJVc2VyLnVwZGF0ZSh0cmFuc2Zvcm1lZE9wZXJhdGlvbnMpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5jb250ZW50ID0gdHJhbnNmb3JtQ29udGVudCh0aGlzLmNvbnRlbnQsIHRyYW5zZm9ybWVkT3BlcmF0aW9ucyk7XHJcblxyXG4gICAgdXNlci5yZXNldCgpO1xyXG5cclxuICAgIGNvbnN0IHBlbmRpbmdPcGVyYXRpb25zID0gdHJhbnNmb3JtZWRQZW5kaW5nT3BlcmF0aW9uczsgLy8vXHJcblxyXG4gICAgcmV0dXJuIHBlbmRpbmdPcGVyYXRpb25zO1xyXG4gIH1cclxuXHJcblx0c3RhdGljIGZyb21Ob3RoaW5nKCkge1xyXG5cdFx0Y29uc3QgbWFwID0ge30sXHJcblx0XHRcdFx0XHRjb250ZW50ID0gXCJcIixcdC8vL1xyXG5cdFx0XHRcdFx0aWRlbnRpZmllciA9IHV1aWRWNCgpLCAgLy8vXHJcblx0XHRcdFx0XHRzZXNzaW9uID0gbmV3IFNlc3Npb24obWFwLCBjb250ZW50LCBpZGVudGlmaWVyKTtcclxuXHJcblx0XHRyZXR1cm4gc2Vzc2lvbjtcclxuXHR9XHJcbn1cclxuXHJcbmNvbnN0IHNlc3Npb24gPSBTZXNzaW9uLmZyb21Ob3RoaW5nKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzZXNzaW9uO1xyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkNBQUEsVUFBQTs7Ozs7SUFFQSxHQUFBO0lBRUEsVUFBQTtJQUVBLEtBQUE7SUFDQSxVQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRUEsTUFBQSxHQUxBLFVBQUEsZ0JBS0EsTUFBQTtJQUVBLE9BQUE7YUFBQSxPQUFBLENBQ0EsR0FBQSxFQUFBLE9BQUEsRUFBQSxVQUFBOzhCQURBLE9BQUE7YUFFQSxHQUFBLEdBQUEsR0FBQTthQUNBLE9BQUEsR0FBQSxPQUFBO2FBQ0EsVUFBQSxHQUFBLFVBQUE7O2lCQUpBLE9BQUE7O0FBT0EsZUFBQSxHQUFBLE1BQUE7NEJBQUEsTUFBQTs0QkFDQSxHQUFBOzs7O0FBR0EsZUFBQSxHQUFBLFVBQUE7NEJBQUEsVUFBQTs0QkFDQSxPQUFBOzs7O0FBR0EsZUFBQSxHQUFBLGFBQUE7NEJBQUEsYUFBQTs0QkFDQSxVQUFBOzs7O0FBR0EsZUFBQSxHQUFBLE9BQUE7NEJBQUEsT0FBQSxDQUFBLGNBQUE7b0JBQ0EsSUFBQSxRQUFBLEdBQUEsQ0FBQSxjQUFBO3VCQUVBLElBQUE7Ozs7QUFHQSxlQUFBLEdBQUEsYUFBQTs0QkFBQSxhQUFBLENBQUEsY0FBQTtvQkFDQSxVQUFBLEdBQUEsTUFBQSxDQUFBLE1BQUEsTUFBQSxHQUFBO0FBRUEsc0JBQUEsQ0FBQSxVQUFBLFdBQUEsU0FBQTt3QkFDQSxtQkFBQSxHQUFBLFNBQUEsQ0FBQSxhQUFBO3dCQUVBLG1CQUFBLEtBQUEsY0FBQTsrQkFDQSxJQUFBOzs7dUJBSUEsVUFBQTs7OztBQUdBLGVBQUEsR0FBQSxVQUFBOzRCQUFBLFVBQUEsQ0FBQSxpQkFBQTtvQkFDQSxPQUFBLFFBQUEsVUFBQSxLQUFBLGlCQUFBO3VCQUVBLE9BQUE7Ozs7QUFHQSxlQUFBLEdBQUEsVUFBQTs0QkFBQSxVQUFBO29CQUNBLElBQUEsR0FuREEsS0FBQSxTQW1EQSxXQUFBLElBQ0EsY0FBQSxHQUFBLElBQUEsQ0FBQSxhQUFBO3FCQUVBLEdBQUEsQ0FBQSxjQUFBLElBQUEsSUFBQTt1QkFFQSxjQUFBOzs7O0FBR0EsZUFBQSxHQUFBLE1BQUE7NEJBQUEsTUFBQSxDQUFBLFVBQUEsRUFBQSxjQUFBLEVBQUEsY0FBQTtvQkFDQSxpQkFBQSxHQUFBLGNBQUEsYUFFQSxXQUFBLENBQUEsVUFBQSxFQUFBLGNBQUE7dUJBRUEsaUJBQUE7Ozs7QUFHQSxlQUFBLEdBQUEsV0FBQTs0QkFBQSxXQUFBLENBQUEsVUFBQSxFQUFBLGNBQUE7b0JBQ0EsSUFBQSxRQUFBLE9BQUEsQ0FBQSxjQUFBLEdBQ0EsVUFBQSxRQUFBLGFBQUEsQ0FBQSxjQUFBLEdBQ0EscUJBQUEsR0FBQSxJQUFBLENBQUEsbUJBQUEsQ0FBQSxVQUFBLEdBQ0EsNEJBQUEsR0FBQSxJQUFBLENBQUEsNEJBQUEsQ0FBQSxVQUFBO0FBRUEsMEJBQUEsQ0FBQSxPQUFBLFVBQUEsU0FBQTtBQUNBLDZCQUFBLENBQUEsTUFBQSxDQUFBLHFCQUFBOztxQkFHQSxPQUFBLEdBNUVBLFVBQUEsY0E0RUEsT0FBQSxFQUFBLHFCQUFBO0FBRUEsb0JBQUEsQ0FBQSxLQUFBO29CQUVBLGlCQUFBLEdBQUEsNEJBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQTt1QkFFQSxpQkFBQTs7Ozs7QUFHQSxlQUFBLEdBQUEsV0FBQTs0QkFBQSxXQUFBO29CQUNBLEdBQUE7bUJBQ0EsT0FBQSxPQUNBLFVBQUEsR0E3RkEsR0FBQSxZQThGQSxPQUFBLE9BQUEsT0FBQSxDQUFBLEdBQUEsRUFBQSxPQUFBLEVBQUEsVUFBQTt1QkFFQSxPQUFBOzs7O1dBdkZBLE9BQUE7O0lBMkZBLE9BQUEsR0FBQSxPQUFBLENBQUEsV0FBQTtlQUVBLE9BQUEifQ==