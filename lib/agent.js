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
var Agent = function() {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hZ2VudC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IENsaWVudCBmcm9tIFwiLi9jbGllbnRcIjtcblxuaW1wb3J0IHsgVVBEQVRFX0lOVEVSVkFMIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFnZW50IHtcbiAgY29uc3RydWN0b3IoY2xpZW50LCBidXN5LCBkb2N1bWVudCwgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyLCBpbnRlcnZhbElkZW50aWZpZXIpIHtcbiAgICB0aGlzLmJ1c3kgPSBidXN5O1xuICAgIHRoaXMuY2xpZW50ID0gY2xpZW50O1xuICAgIHRoaXMuZG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgICB0aGlzLnVzZXJJZGVudGlmaWVyID0gdXNlcklkZW50aWZpZXI7XG4gICAgdGhpcy5zZXNzaW9uSWRlbnRpZmllciA9IHNlc3Npb25JZGVudGlmaWVyO1xuICAgIHRoaXMuaW50ZXJ2YWxJZGVudGlmaWVyID0gaW50ZXJ2YWxJZGVudGlmaWVyO1xuICB9XG5cbiAgaW5pdGlhbGlzZShjYWxsYmFjaykge1xuICAgIHRoaXMuY2xpZW50LmluaXRpYWxpc2UoKGNvbnRlbnQsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllcikgPT4ge1xuICAgICAgdGhpcy51c2VySWRlbnRpZmllciA9IHVzZXJJZGVudGlmaWVyO1xuXG4gICAgICB0aGlzLnNlc3Npb25JZGVudGlmaWVyID0gc2Vzc2lvbklkZW50aWZpZXI7XG5cbiAgICAgIHRoaXMuc3RhcnRVcGRhdGVzKCk7XG5cbiAgICAgIGNhbGxiYWNrKGNvbnRlbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0RG9jdW1lbnQoZG9jdW1lbnQpIHtcbiAgICB0aGlzLmRvY3VtZW50ID0gZG9jdW1lbnQ7XG4gIH1cblxuICBzdGFydFVwZGF0ZXMoKSB7XG4gICAgdGhpcy5yZXNldFVwZGF0ZXMoKTtcblxuICAgIGNvbnN0IGludGVydmFsID0gVVBEQVRFX0lOVEVSVkFMO1xuXG4gICAgdGhpcy5pbnRlcnZhbElkZW50aWZpZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLnVwZGF0ZSgpLCBpbnRlcnZhbCk7XG4gIH1cblxuICBzdG9wVXBkYXRlcygpIHtcbiAgICB0aGlzLnJlc2V0VXBkYXRlcygpO1xuICB9XG5cbiAgcmVzZXRVcGRhdGVzKCkge1xuICAgIGlmICh0aGlzLmludGVydmFsSWRlbnRpZmllciAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSWRlbnRpZmllcik7XG5cbiAgICAgIHRoaXMuaW50ZXJ2YWxJZGVudGlmaWVyID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuYnVzeSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHdvcmtpbmdDb250ZW50ID0gdGhpcy5kb2N1bWVudC5nZXRXb3JraW5nQ29udGVudCgpLFxuICAgICAgICAgIGVkaXRhYmxlQ29udGVudCA9IHRoaXMuZG9jdW1lbnQuZ2V0RWRpdGFibGVDb250ZW50KCk7XG5cbiAgICB0aGlzLmJ1c3kgPSB0cnVlO1xuXG4gICAgY29uc3Qgc3VjY2VzcyA9IHRoaXMuY2xpZW50LnVwZGF0ZURvY3VtZW50KHRoaXMudXNlcklkZW50aWZpZXIsIHRoaXMuc2Vzc2lvbklkZW50aWZpZXIsIHdvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnQsIChzZXNzaW9uRXhwaXJlZCwgcGVuZGluZ09wZXJhdGlvbnMpID0+IHtcbiAgICBcdGlmIChzZXNzaW9uRXhwaXJlZCkge1xuXHRcdFx0XHRhbGVydChcIlRoZSBzZXNzaW9uIGhhcyBleHBpcmVkLiBQbGVhc2UgcmVmcmVzaCFcIik7XG5cblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG4gICAgICB0aGlzLmRvY3VtZW50LnVwZGF0ZShwZW5kaW5nT3BlcmF0aW9ucyk7XG5cbiAgICBcdHRoaXMuYnVzeSA9IGZhbHNlO1xuXHRcdH0pO1xuXG4gICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgIHRoaXMuZG9jdW1lbnQuc3luY2hyb25pc2VXb3JraW5nQ29udGVudCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJ1c3kgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZnJvbU5vdGhpbmcoKSB7XG4gICAgY29uc3QgY2xpZW50ID0gQ2xpZW50LmZyb21Ob3RoaW5nKCksXG4gICAgICAgICAgYnVzeSA9IGZhbHNlLFxuICAgICAgICAgIGRvY3VtZW50ID0gbnVsbCwgIC8vL1xuICAgICAgICAgIHVzZXJJZGVudGlmaWVyID0gbnVsbCwgIC8vL1xuXHRcdFx0XHRcdHNlc3Npb25JZGVudGlmaWVyID0gbnVsbCxcdC8vL1xuICAgICAgICAgIGludGVydmFsSWRlbnRpZmllciA9IG51bGwsIC8vL1xuICAgICAgICAgIGFnZW50ID0gbmV3IEFnZW50KGNsaWVudCwgYnVzeSwgZG9jdW1lbnQsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllciwgaW50ZXJ2YWxJZGVudGlmaWVyKTtcblxuICAgIHJldHVybiBhZ2VudDtcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJDQUFBLFVBQVk7Ozs7O0lBRU8sT0FBVTtJQUVHLFVBQWE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFeEIsS0FBSzthQUFMLEtBQUssQ0FDWixNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsa0JBQWtCOzhCQUR0RSxLQUFLO2FBRWpCLElBQUksR0FBRyxJQUFJO2FBQ1gsTUFBTSxHQUFHLE1BQU07YUFDZixRQUFRLEdBQUcsUUFBUTthQUNuQixjQUFjLEdBQUcsY0FBYzthQUMvQixpQkFBaUIsR0FBRyxpQkFBaUI7YUFDckMsa0JBQWtCLEdBQUcsa0JBQWtCOztpQkFQM0IsS0FBSzs7WUFVeEIsR0FBVSxHQUFWLFVBQVU7NEJBQVYsVUFBVSxDQUFDLFFBQVE7cUJBQ1osTUFBTSxDQUFDLFVBQVUsV0FBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLGlCQUFpQjt5QkFDM0QsY0FBYyxHQUFHLGNBQWM7eUJBRS9CLGlCQUFpQixHQUFHLGlCQUFpQjt5QkFFckMsWUFBWTtvQkFFakIsUUFBUSxDQUFDLE9BQU87Ozs7O1lBSXBCLEdBQVcsR0FBWCxXQUFXOzRCQUFYLFdBQVcsQ0FBQyxRQUFRO3FCQUNiLFFBQVEsR0FBRyxRQUFROzs7O1lBRzFCLEdBQVksR0FBWixZQUFZOzRCQUFaLFlBQVk7cUJBQ0wsWUFBWTtvQkFFWCxRQUFRLEdBL0JjLFVBQWE7cUJBaUNwQyxrQkFBa0IsR0FBRyxXQUFXO2dDQUFZLE1BQU07K0JBQUksUUFBUTs7OztZQUdyRSxHQUFXLEdBQVgsV0FBVzs0QkFBWCxXQUFXO3FCQUNKLFlBQVk7Ozs7WUFHbkIsR0FBWSxHQUFaLFlBQVk7NEJBQVosWUFBWTt5QkFDRCxrQkFBa0IsS0FBSyxJQUFJO29CQUNsQyxhQUFhLE1BQU0sa0JBQWtCO3lCQUVoQyxrQkFBa0IsR0FBRyxJQUFJOzs7OztZQUlsQyxHQUFNLEdBQU4sTUFBTTs0QkFBTixNQUFNO3lCQUNLLElBQUk7OztvQkFJUCxjQUFjLFFBQVEsUUFBUSxDQUFDLGlCQUFpQixJQUNoRCxlQUFlLFFBQVEsUUFBUSxDQUFDLGtCQUFrQjtxQkFFbkQsSUFBSSxHQUFHLElBQUk7b0JBRVYsT0FBTyxRQUFRLE1BQU0sQ0FBQyxjQUFjLE1BQU0sY0FBYyxPQUFPLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxlQUFlLFlBQUcsY0FBYyxFQUFFLGlCQUFpQjt3QkFDdEosY0FBYzt3QkFDbkIsS0FBSyxFQUFDLHdDQUEwQzs7O3lCQUt6QyxRQUFRLENBQUMsTUFBTSxDQUFDLGlCQUFpQjt5QkFFbEMsSUFBSSxHQUFHLEtBQUs7O29CQUdkLE9BQU87eUJBQ0osUUFBUSxDQUFDLHlCQUF5Qjs7eUJBRWxDLElBQUksR0FBRyxLQUFLOzs7Ozs7WUFJZCxHQUFXLEdBQVgsV0FBVzs0QkFBWCxXQUFXO29CQUNWLE1BQU0sR0FoRkcsT0FBVSxTQWdGSCxXQUFXLElBQzNCLElBQUksR0FBRyxLQUFLLEVBQ1osUUFBUSxHQUFHLElBQUksRUFDZixjQUFjLEdBQUcsSUFBSSxFQUMxQixpQkFBaUIsR0FBRyxJQUFJLEVBQ25CLGtCQUFrQixHQUFHLElBQUksRUFDekIsS0FBSyxPQUFPLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsa0JBQWtCO3VCQUU5RixLQUFLOzs7O1dBcEZLLEtBQUs7O2tCQUFMLEtBQUsifQ==