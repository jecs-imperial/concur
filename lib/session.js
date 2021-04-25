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
                this.content = (0, _transform).default(this.content, transformedOperations);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXNzaW9uLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHV1aWRWNCBmcm9tIFwidXVpZC92NFwiO1xyXG5cclxuaW1wb3J0IHsgYXJyYXlVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XHJcblxyXG5pbXBvcnQgVXNlciBmcm9tIFwiLi91c2VyXCI7XHJcbmltcG9ydCB0cmFuc2Zvcm1Db250ZW50IGZyb20gXCIuL2NvbnRlbnQvdHJhbnNmb3JtXCI7XHJcblxyXG5jb25zdCB7IGZpbHRlciB9ID0gYXJyYXlVdGlsaXRpZXM7XHJcblxyXG5jbGFzcyBTZXNzaW9uIHtcclxuXHRjb25zdHJ1Y3RvcihtYXAsIGNvbnRlbnQsIGlkZW50aWZpZXIpIHtcclxuXHRcdHRoaXMubWFwID0gbWFwO1xyXG5cdFx0dGhpcy5jb250ZW50ID0gY29udGVudDtcclxuXHRcdHRoaXMuaWRlbnRpZmllciA9IGlkZW50aWZpZXI7XHJcblx0fVxyXG5cclxuXHRnZXRNYXAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5tYXA7XHJcblx0fVxyXG5cclxuXHRnZXRDb250ZW50KCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuY29udGVudDtcclxuXHR9XHJcblxyXG5cdGdldElkZW50aWZpZXIoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5pZGVudGlmaWVyO1xyXG5cdH1cclxuXHJcblx0Z2V0VXNlcih1c2VySWRlbnRpZmllcikge1xyXG5cdFx0Y29uc3QgdXNlciA9IHRoaXMubWFwW3VzZXJJZGVudGlmaWVyXTtcclxuXHJcblx0XHRyZXR1cm4gdXNlcjtcclxuXHR9XHJcblxyXG5cdGdldE90aGVyVXNlcnModXNlcklkZW50aWZpZXIpIHtcclxuXHRcdGNvbnN0IG90aGVyVXNlcnMgPSBPYmplY3QudmFsdWVzKHRoaXMubWFwKTtcclxuXHJcblx0XHRmaWx0ZXIob3RoZXJVc2VycywgKG90aGVyVXNlcikgPT4ge1xyXG5cdFx0XHRjb25zdCBvdGhlclVzZXJJZGVudGlmaWVyID0gb3RoZXJVc2VyLmdldElkZW50aWZpZXIoKTtcclxuXHJcblx0XHRcdGlmIChvdGhlclVzZXJJZGVudGlmaWVyICE9PSB1c2VySWRlbnRpZmllcikge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gb3RoZXJVc2VycztcclxuXHR9XHJcblxyXG5cdGhhc0V4cGlyZWQoc2Vzc2lvbklkZW50aWZpZXIpIHtcclxuXHRcdGNvbnN0IGV4cGlyZWQgPSAodGhpcy5pZGVudGlmaWVyICE9PSBzZXNzaW9uSWRlbnRpZmllcik7XHJcblxyXG5cdFx0cmV0dXJuIGV4cGlyZWQ7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVVc2VyKCkge1xyXG5cdFx0Y29uc3QgdXNlciA9IFVzZXIuZnJvbU5vdGhpbmcoKSxcclxuXHRcdFx0XHRcdHVzZXJJZGVudGlmaWVyID0gdXNlci5nZXRJZGVudGlmaWVyKCk7XHJcblxyXG5cdFx0dGhpcy5tYXBbdXNlcklkZW50aWZpZXJdID0gdXNlcjtcclxuXHJcblx0XHRyZXR1cm4gdXNlcklkZW50aWZpZXI7XHJcblx0fVxyXG5cclxuXHR1cGRhdGUob3BlcmF0aW9ucywgdXNlcklkZW50aWZpZXIsIHNlc3Npb25FeHBpcmVkKSB7XHJcblx0ICBjb25zdCBwZW5kaW5nT3BlcmF0aW9ucyA9IHNlc3Npb25FeHBpcmVkID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVVzZXJzKG9wZXJhdGlvbnMsIHVzZXJJZGVudGlmaWVyKTtcclxuXHJcblx0XHRyZXR1cm4gcGVuZGluZ09wZXJhdGlvbnM7XHJcblx0fVxyXG5cclxuXHR1cGRhdGVVc2VycyhvcGVyYXRpb25zLCB1c2VySWRlbnRpZmllcikge1xyXG4gICAgY29uc3QgdXNlciA9IHRoaXMuZ2V0VXNlcih1c2VySWRlbnRpZmllciksXHJcbiAgICAgICAgICBvdGhlclVzZXJzID0gdGhpcy5nZXRPdGhlclVzZXJzKHVzZXJJZGVudGlmaWVyKSxcclxuICAgICAgICAgIHRyYW5zZm9ybWVkT3BlcmF0aW9ucyA9IHVzZXIudHJhbnNmb3JtT3BlcmF0aW9ucyhvcGVyYXRpb25zKSxcclxuICAgICAgICAgIHRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMgPSB1c2VyLnRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMob3BlcmF0aW9ucyk7XHJcblxyXG4gICAgb3RoZXJVc2Vycy5mb3JFYWNoKChvdGhlclVzZXIpID0+IHtcclxuICAgICAgb3RoZXJVc2VyLnVwZGF0ZSh0cmFuc2Zvcm1lZE9wZXJhdGlvbnMpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5jb250ZW50ID0gdHJhbnNmb3JtQ29udGVudCh0aGlzLmNvbnRlbnQsIHRyYW5zZm9ybWVkT3BlcmF0aW9ucyk7XHJcblxyXG4gICAgdXNlci5yZXNldCgpO1xyXG5cclxuICAgIGNvbnN0IHBlbmRpbmdPcGVyYXRpb25zID0gdHJhbnNmb3JtZWRQZW5kaW5nT3BlcmF0aW9uczsgLy8vXHJcblxyXG4gICAgcmV0dXJuIHBlbmRpbmdPcGVyYXRpb25zO1xyXG4gIH1cclxuXHJcblx0c3RhdGljIGZyb21Ob3RoaW5nKCkge1xyXG5cdFx0Y29uc3QgbWFwID0ge30sXHJcblx0XHRcdFx0XHRjb250ZW50ID0gXCJcIixcdC8vL1xyXG5cdFx0XHRcdFx0aWRlbnRpZmllciA9IHV1aWRWNCgpLCAgLy8vXHJcblx0XHRcdFx0XHRzZXNzaW9uID0gbmV3IFNlc3Npb24obWFwLCBjb250ZW50LCBpZGVudGlmaWVyKTtcclxuXHJcblx0XHRyZXR1cm4gc2Vzc2lvbjtcclxuXHR9XHJcbn1cclxuXHJcbmNvbnN0IHNlc3Npb24gPSBTZXNzaW9uLmZyb21Ob3RoaW5nKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzZXNzaW9uO1xyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkNBQUEsVUFBWTs7Ozs7SUFFTyxHQUFTO0lBRUcsVUFBVztJQUV6QixLQUFRO0lBQ0ksVUFBcUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFMUMsTUFBTSxHQUxpQixVQUFXLGdCQUtsQyxNQUFNO0lBRVIsT0FBTzthQUFQLE9BQU8sQ0FDQSxHQUFHLEVBQUUsT0FBTyxFQUFFLFVBQVU7OEJBRC9CLE9BQU87YUFFTixHQUFHLEdBQUcsR0FBRzthQUNULE9BQU8sR0FBRyxPQUFPO2FBQ2pCLFVBQVUsR0FBRyxVQUFVOztpQkFKeEIsT0FBTzs7WUFPWixHQUFNLEdBQU4sTUFBTTs0QkFBTixNQUFNOzRCQUNPLEdBQUc7Ozs7WUFHaEIsR0FBVSxHQUFWLFVBQVU7NEJBQVYsVUFBVTs0QkFDRyxPQUFPOzs7O1lBR3BCLEdBQWEsR0FBYixhQUFhOzRCQUFiLGFBQWE7NEJBQ0EsVUFBVTs7OztZQUd2QixHQUFPLEdBQVAsT0FBTzs0QkFBUCxPQUFPLENBQUMsY0FBYztvQkFDZixJQUFJLFFBQVEsR0FBRyxDQUFDLGNBQWM7dUJBRTdCLElBQUk7Ozs7WUFHWixHQUFhLEdBQWIsYUFBYTs0QkFBYixhQUFhLENBQUMsY0FBYztvQkFDckIsVUFBVSxHQUFHLE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBRztnQkFFekMsTUFBTSxDQUFDLFVBQVUsV0FBRyxTQUFTO3dCQUN0QixtQkFBbUIsR0FBRyxTQUFTLENBQUMsYUFBYTt3QkFFL0MsbUJBQW1CLEtBQUssY0FBYzsrQkFDbEMsSUFBSTs7O3VCQUlOLFVBQVU7Ozs7WUFHbEIsR0FBVSxHQUFWLFVBQVU7NEJBQVYsVUFBVSxDQUFDLGlCQUFpQjtvQkFDckIsT0FBTyxRQUFTLFVBQVUsS0FBSyxpQkFBaUI7dUJBRS9DLE9BQU87Ozs7WUFHZixHQUFVLEdBQVYsVUFBVTs0QkFBVixVQUFVO29CQUNILElBQUksR0FuREssS0FBUSxTQW1ETCxXQUFXLElBQzFCLGNBQWMsR0FBRyxJQUFJLENBQUMsYUFBYTtxQkFFakMsR0FBRyxDQUFDLGNBQWMsSUFBSSxJQUFJO3VCQUV4QixjQUFjOzs7O1lBR3RCLEdBQU0sR0FBTixNQUFNOzRCQUFOLE1BQU0sQ0FBQyxVQUFVLEVBQUUsY0FBYyxFQUFFLGNBQWM7b0JBQ3pDLGlCQUFpQixHQUFHLGNBQWMsYUFFSixXQUFXLENBQUMsVUFBVSxFQUFFLGNBQWM7dUJBRXBFLGlCQUFpQjs7OztZQUd6QixHQUFXLEdBQVgsV0FBVzs0QkFBWCxXQUFXLENBQUMsVUFBVSxFQUFFLGNBQWM7b0JBQzdCLElBQUksUUFBUSxPQUFPLENBQUMsY0FBYyxHQUNsQyxVQUFVLFFBQVEsYUFBYSxDQUFDLGNBQWMsR0FDOUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsR0FDM0QsNEJBQTRCLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixDQUFDLFVBQVU7Z0JBRWpGLFVBQVUsQ0FBQyxPQUFPLFVBQUUsU0FBUztvQkFDM0IsU0FBUyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUI7O3FCQUduQyxPQUFPLE9BNUVhLFVBQXFCLGVBNEVULE9BQU8sRUFBRSxxQkFBcUI7Z0JBRW5FLElBQUksQ0FBQyxLQUFLO29CQUVKLGlCQUFpQixHQUFHLDRCQUE0QixDQUFFLENBQUcsQUFBSCxFQUFHLEFBQUgsQ0FBRzt1QkFFcEQsaUJBQWlCOzs7OztZQUdwQixHQUFXLEdBQVgsV0FBVzs0QkFBWCxXQUFXO29CQUNYLEdBQUc7bUJBQ04sT0FBTyxPQUNQLFVBQVUsT0E3RkksR0FBUyxhQThGdkIsT0FBTyxPQUFPLE9BQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLFVBQVU7dUJBRTFDLE9BQU87Ozs7V0F2RlYsT0FBTzs7SUEyRlAsT0FBTyxHQUFHLE9BQU8sQ0FBQyxXQUFXO2VBRXBCLE9BQU8ifQ==