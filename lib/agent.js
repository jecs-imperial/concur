"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _client = _interopRequireDefault(require("./client"));
var _constants = require("./constants");
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
var Agent = /*#__PURE__*/ function() {
    function Agent(client, busy, document, userIdentifier, sessionIdentifier, intervalIdentifier) {
        _classCallCheck(this, Agent);
        this.busy = busy;
        this.client = client;
        this.document = document;
        this.userIdentifier = userIdentifier;
        this.sessionIdentifier = sessionIdentifier;
        this.intervalIdentifier = intervalIdentifier;
    }
    _createClass(Agent, [
        {
            key: "initialise",
            value: function initialise(callback) {
                this.client.initialise((function(content, userIdentifier, sessionIdentifier) {
                    this.userIdentifier = userIdentifier;
                    this.sessionIdentifier = sessionIdentifier;
                    this.startUpdates();
                    callback(content);
                }).bind(this));
            }
        },
        {
            key: "setDocument",
            value: function setDocument(document) {
                this.document = document;
            }
        },
        {
            key: "startUpdates",
            value: function startUpdates() {
                this.resetUpdates();
                var interval = _constants.UPDATE_INTERVAL;
                this.intervalIdentifier = setInterval((function() {
                    return this.update();
                }).bind(this), interval);
            }
        },
        {
            key: "stopUpdates",
            value: function stopUpdates() {
                this.resetUpdates();
            }
        },
        {
            key: "resetUpdates",
            value: function resetUpdates() {
                if (this.intervalIdentifier !== null) {
                    clearInterval(this.intervalIdentifier);
                    this.intervalIdentifier = null;
                }
            }
        },
        {
            key: "update",
            value: function update() {
                if (this.busy) {
                    return;
                }
                var workingContent = this.document.getWorkingContent(), editableContent = this.document.getEditableContent();
                this.busy = true;
                var success = this.client.updateDocument(this.userIdentifier, this.sessionIdentifier, workingContent, editableContent, (function(sessionExpired, pendingOperations) {
                    if (sessionExpired) {
                        alert("The session has expired. Please refresh!");
                        return;
                    }
                    this.document.update(pendingOperations);
                    this.busy = false;
                }).bind(this));
                if (success) {
                    this.document.synchroniseWorkingContent();
                } else {
                    this.busy = false;
                }
            }
        }
    ], [
        {
            key: "fromNothing",
            value: function fromNothing() {
                var client = _client.default.fromNothing(), busy = false, document = null, userIdentifier = null, sessionIdentifier = null, intervalIdentifier = null, agent = new Agent(client, busy, document, userIdentifier, sessionIdentifier, intervalIdentifier);
                return agent;
            }
        }
    ]);
    return Agent;
}();
exports.default = Agent;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hZ2VudC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IENsaWVudCBmcm9tIFwiLi9jbGllbnRcIjtcblxuaW1wb3J0IHsgVVBEQVRFX0lOVEVSVkFMIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFnZW50IHtcbiAgY29uc3RydWN0b3IoY2xpZW50LCBidXN5LCBkb2N1bWVudCwgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyLCBpbnRlcnZhbElkZW50aWZpZXIpIHtcbiAgICB0aGlzLmJ1c3kgPSBidXN5O1xuICAgIHRoaXMuY2xpZW50ID0gY2xpZW50O1xuICAgIHRoaXMuZG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgICB0aGlzLnVzZXJJZGVudGlmaWVyID0gdXNlcklkZW50aWZpZXI7XG4gICAgdGhpcy5zZXNzaW9uSWRlbnRpZmllciA9IHNlc3Npb25JZGVudGlmaWVyO1xuICAgIHRoaXMuaW50ZXJ2YWxJZGVudGlmaWVyID0gaW50ZXJ2YWxJZGVudGlmaWVyO1xuICB9XG5cbiAgaW5pdGlhbGlzZShjYWxsYmFjaykge1xuICAgIHRoaXMuY2xpZW50LmluaXRpYWxpc2UoKGNvbnRlbnQsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllcikgPT4ge1xuICAgICAgdGhpcy51c2VySWRlbnRpZmllciA9IHVzZXJJZGVudGlmaWVyO1xuXG4gICAgICB0aGlzLnNlc3Npb25JZGVudGlmaWVyID0gc2Vzc2lvbklkZW50aWZpZXI7XG5cbiAgICAgIHRoaXMuc3RhcnRVcGRhdGVzKCk7XG5cbiAgICAgIGNhbGxiYWNrKGNvbnRlbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0RG9jdW1lbnQoZG9jdW1lbnQpIHtcbiAgICB0aGlzLmRvY3VtZW50ID0gZG9jdW1lbnQ7XG4gIH1cblxuICBzdGFydFVwZGF0ZXMoKSB7XG4gICAgdGhpcy5yZXNldFVwZGF0ZXMoKTtcblxuICAgIGNvbnN0IGludGVydmFsID0gVVBEQVRFX0lOVEVSVkFMO1xuXG4gICAgdGhpcy5pbnRlcnZhbElkZW50aWZpZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLnVwZGF0ZSgpLCBpbnRlcnZhbCk7XG4gIH1cblxuICBzdG9wVXBkYXRlcygpIHtcbiAgICB0aGlzLnJlc2V0VXBkYXRlcygpO1xuICB9XG5cbiAgcmVzZXRVcGRhdGVzKCkge1xuICAgIGlmICh0aGlzLmludGVydmFsSWRlbnRpZmllciAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSWRlbnRpZmllcik7XG5cbiAgICAgIHRoaXMuaW50ZXJ2YWxJZGVudGlmaWVyID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuYnVzeSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHdvcmtpbmdDb250ZW50ID0gdGhpcy5kb2N1bWVudC5nZXRXb3JraW5nQ29udGVudCgpLFxuICAgICAgICAgIGVkaXRhYmxlQ29udGVudCA9IHRoaXMuZG9jdW1lbnQuZ2V0RWRpdGFibGVDb250ZW50KCk7XG5cbiAgICB0aGlzLmJ1c3kgPSB0cnVlO1xuXG4gICAgY29uc3Qgc3VjY2VzcyA9IHRoaXMuY2xpZW50LnVwZGF0ZURvY3VtZW50KHRoaXMudXNlcklkZW50aWZpZXIsIHRoaXMuc2Vzc2lvbklkZW50aWZpZXIsIHdvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnQsIChzZXNzaW9uRXhwaXJlZCwgcGVuZGluZ09wZXJhdGlvbnMpID0+IHtcbiAgICBcdGlmIChzZXNzaW9uRXhwaXJlZCkge1xuXHRcdFx0XHRhbGVydChcIlRoZSBzZXNzaW9uIGhhcyBleHBpcmVkLiBQbGVhc2UgcmVmcmVzaCFcIik7XG5cblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG4gICAgICB0aGlzLmRvY3VtZW50LnVwZGF0ZShwZW5kaW5nT3BlcmF0aW9ucyk7XG5cbiAgICBcdHRoaXMuYnVzeSA9IGZhbHNlO1xuXHRcdH0pO1xuXG4gICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgIHRoaXMuZG9jdW1lbnQuc3luY2hyb25pc2VXb3JraW5nQ29udGVudCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJ1c3kgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZnJvbU5vdGhpbmcoKSB7XG4gICAgY29uc3QgY2xpZW50ID0gQ2xpZW50LmZyb21Ob3RoaW5nKCksXG4gICAgICAgICAgYnVzeSA9IGZhbHNlLFxuICAgICAgICAgIGRvY3VtZW50ID0gbnVsbCwgIC8vL1xuICAgICAgICAgIHVzZXJJZGVudGlmaWVyID0gbnVsbCwgIC8vL1xuXHRcdFx0XHRcdHNlc3Npb25JZGVudGlmaWVyID0gbnVsbCxcdC8vL1xuICAgICAgICAgIGludGVydmFsSWRlbnRpZmllciA9IG51bGwsIC8vL1xuICAgICAgICAgIGFnZW50ID0gbmV3IEFnZW50KGNsaWVudCwgYnVzeSwgZG9jdW1lbnQsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllciwgaW50ZXJ2YWxJZGVudGlmaWVyKTtcblxuICAgIHJldHVybiBhZ2VudDtcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJDQUFBLFVBQVk7Ozs7O0FBRU8sR0FBVSxDQUFWLE9BQVU7QUFFRyxHQUFhLENBQWIsVUFBYTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUV4QixLQUFLO2FBQUwsS0FBSyxDQUNaLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxrQkFBa0I7OEJBRHRFLEtBQUs7YUFFakIsSUFBSSxHQUFHLElBQUk7YUFDWCxNQUFNLEdBQUcsTUFBTTthQUNmLFFBQVEsR0FBRyxRQUFRO2FBQ25CLGNBQWMsR0FBRyxjQUFjO2FBQy9CLGlCQUFpQixHQUFHLGlCQUFpQjthQUNyQyxrQkFBa0IsR0FBRyxrQkFBa0I7O2lCQVAzQixL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