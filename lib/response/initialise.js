"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
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
var InitialiseResponse = /*#__PURE__*/ function() {
    function InitialiseResponse(content, userIdentifier, sessionIdentifier) {
        _classCallCheck(this, InitialiseResponse);
        this.content = content;
        this.userIdentifier = userIdentifier;
        this.sessionIdentifier = sessionIdentifier;
    }
    _createClass(InitialiseResponse, [
        {
            key: "getContent",
            value: function getContent() {
                return this.content;
            }
        },
        {
            key: "getUserIdentifier",
            value: function getUserIdentifier() {
                return this.userIdentifier;
            }
        },
        {
            key: "getSessionIdentifier",
            value: function getSessionIdentifier() {
                return this.sessionIdentifier;
            }
        },
        {
            key: "toJSON",
            value: function toJSON() {
                var json = {
                    "content": this.content,
                    "userIdentifier": this.userIdentifier,
                    "sessionIdentifier": this.sessionIdentifier
                };
                return json;
            }
        }
    ], [
        {
            key: "fromJSON",
            value: function fromJSON(json) {
                var contentJSON = json["content"], userIdentifierJSON = json["userIdentifier"], sessionIdentifierJSON = json["sessionIdentifier"], content = contentJSON, userIdentifier = userIdentifierJSON, sessionIdentifier = sessionIdentifierJSON, initialiseResponse = new InitialiseResponse(content, userIdentifier, sessionIdentifier);
                return initialiseResponse;
            }
        },
        {
            key: "fromContentUserIdentifierAndSessionIdentifier",
            value: function fromContentUserIdentifierAndSessionIdentifier(content, userIdentifier, sessionIdentifier) {
                var initialiseResponse = new InitialiseResponse(content, userIdentifier, sessionIdentifier);
                return initialiseResponse;
            }
        }
    ]);
    return InitialiseResponse;
}();
exports.default = InitialiseResponse;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNwb25zZS9pbml0aWFsaXNlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbml0aWFsaXNlUmVzcG9uc2Uge1xuICBjb25zdHJ1Y3Rvcihjb250ZW50LCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpIHtcbiAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICAgIHRoaXMudXNlcklkZW50aWZpZXIgPSB1c2VySWRlbnRpZmllcjtcbiAgICB0aGlzLnNlc3Npb25JZGVudGlmaWVyID0gc2Vzc2lvbklkZW50aWZpZXI7XG4gIH1cblxuICBnZXRDb250ZW50KCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnQ7XG4gIH1cblxuICBnZXRVc2VySWRlbnRpZmllcigpIHtcbiAgICByZXR1cm4gdGhpcy51c2VySWRlbnRpZmllcjtcbiAgfVxuXG4gIGdldFNlc3Npb25JZGVudGlmaWVyKCkge1xuICBcdHJldHVybiB0aGlzLnNlc3Npb25JZGVudGlmaWVyO1xuXHR9XG5cbiAgdG9KU09OKCkge1xuICAgIGNvbnN0IGpzb24gPSB7XG4gICAgICBcImNvbnRlbnRcIjogdGhpcy5jb250ZW50LFxuICAgICAgXCJ1c2VySWRlbnRpZmllclwiOiB0aGlzLnVzZXJJZGVudGlmaWVyLFxuXHRcdFx0XCJzZXNzaW9uSWRlbnRpZmllclwiOiB0aGlzLnNlc3Npb25JZGVudGlmaWVyXG4gICAgfTtcblxuICAgIHJldHVybiBqc29uO1xuICB9XG5cbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcbiAgICBjb25zdCBjb250ZW50SlNPTiA9IGpzb25bXCJjb250ZW50XCJdLFxuICAgICAgICAgIHVzZXJJZGVudGlmaWVySlNPTiA9IGpzb25bXCJ1c2VySWRlbnRpZmllclwiXSxcblx0XHRcdFx0XHRzZXNzaW9uSWRlbnRpZmllckpTT04gPSBqc29uW1wic2Vzc2lvbklkZW50aWZpZXJcIl0sXG4gICAgICAgICAgY29udGVudCA9IGNvbnRlbnRKU09OLCAgLy8vXG4gICAgICAgICAgdXNlcklkZW50aWZpZXIgPSB1c2VySWRlbnRpZmllckpTT04sICAvLy9cblx0XHRcdFx0XHRzZXNzaW9uSWRlbnRpZmllciA9IHNlc3Npb25JZGVudGlmaWVySlNPTiwgIC8vL1xuICAgICAgICAgIGluaXRpYWxpc2VSZXNwb25zZSA9IG5ldyBJbml0aWFsaXNlUmVzcG9uc2UoY29udGVudCwgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyKTtcblxuICAgIHJldHVybiBpbml0aWFsaXNlUmVzcG9uc2U7XG4gIH1cblxuICBzdGF0aWMgZnJvbUNvbnRlbnRVc2VySWRlbnRpZmllckFuZFNlc3Npb25JZGVudGlmaWVyKGNvbnRlbnQsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllcikge1xuICAgIGNvbnN0IGluaXRpYWxpc2VSZXNwb25zZSA9IG5ldyBJbml0aWFsaXNlUmVzcG9uc2UoY29udGVudCwgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyKTtcblxuICAgIHJldHVybiBpbml0aWFsaXNlUmVzcG9uc2U7XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQ0FBQSxVQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFUyxrQkFBa0I7YUFBbEIsa0JBQWtCLENBQ3pCLE9BQU8sRUFBRSxjQUFjLEVBQUUsaUJBQWlCOzhCQURuQyxrQkFBa0I7YUFFOUIsT0FBTyxHQUFHLE9BQU87YUFDakIsY0FBYyxHQUFHLGNBQWM7YUFDL0IsaUJBQWlCLEdBQUcsaUJBQWlCOztpQkFKekIsa0JBQWtCOztZQU9yQyxHQUFVLEdBQVYsVUFBVTs0QkFBVixVQUFVLEdBQUcsQ0FBQzs0QkFDQSxPQUFPO1lBQ3JCLENBQUM7OztZQUVELEdBQWlCLEdBQWpCLGlCQUFpQjs0QkFBakIsaUJBQWlCLEdBQUcsQ0FBQzs0QkFDUCxjQUFjO1lBQzVCLENBQUM7OztZQUVELEdBQW9CLEdBQXBCLG9CQUFvQjs0QkFBcEIsb0JBQW9CLEdBQUcsQ0FBQzs0QkFDWCxpQkFBaUI7WUFDL0IsQ0FBQzs7O1lBRUEsR0FBTSxHQUFOLE1BQU07NEJBQU4sTUFBTSxHQUFHLENBQUM7Z0JBQ1IsR0FBSyxDQUFDLElBQUk7cUJBQ1IsT0FBUyxRQUFPLE9BQU87cUJBQ3ZCLGNBQWdCLFFBQU8sY0FBYztxQkFDeEMsaUJBQW1CLFFBQU8saUJBQWlCOzt1QkFHbkMsSUFBSTtZQUNiLENBQUM7Ozs7WUFFTSxHQUFRLEdBQVIsUUFBUTs0QkFBUixRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3JCLEdBQUssQ0FBQyxXQUFXLEdBQUcsSUFBSSxFQUFDLE9BQVMsSUFDNUIsa0JBQWtCLEdBQUcsSUFBSSxFQUFDLGNBQWdCLElBQy9DLHFCQUFxQixHQUFHLElBQUksRUFBQyxpQkFBbUIsSUFDM0MsT0FBTyxHQUFHLFdBQVcsRUFDckIsY0FBYyxHQUFHLGtCQUFrQixFQUN4QyxpQkFBaUIsR0FBRyxxQkFBcUIsRUFDcEMsa0JBQWtCLEdBQUcsR0FBRyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsaUJBQWlCO3VCQUVyRixrQkFBa0I7WUFDM0IsQ0FBQzs7O1lBRU0sR0FBNkMsR0FBN0MsNkNBQTZDOzRCQUE3Qyw2Q0FBNkMsQ0FBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixFQUFFLENBQUM7Z0JBQ2hHLEdBQUssQ0FBQyxrQkFBa0IsR0FBRyxHQUFHLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxpQkFBaUI7dUJBRXJGLGtCQUFrQjtZQUMzQixDQUFDOzs7V0E3Q2tCLGtCQUFrQjs7a0JBQWxCLGtCQUFrQiJ9