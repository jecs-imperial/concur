'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InitialiseResponse = function () {
  function InitialiseResponse(content, userIdentifier) {
    _classCallCheck(this, InitialiseResponse);

    this.content = content;
    this.userIdentifier = userIdentifier;
  }

  _createClass(InitialiseResponse, [{
    key: "getContent",
    value: function getContent() {
      return this.content;
    }
  }, {
    key: "getUserIdentifier",
    value: function getUserIdentifier() {
      return this.userIdentifier;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var json = {
        "content": this.content,
        "userIdentifier": this.userIdentifier
      };

      return json;
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(json) {
      var contentJSON = json["content"],
          userIdentifierJSON = json["userIdentifier"],
          content = contentJSON,
          ///
      userIdentifier = userIdentifierJSON,
          ///
      initialiseResponse = new InitialiseResponse(content, userIdentifier);

      return initialiseResponse;
    }
  }, {
    key: "fromContentAndUserIdentifier",
    value: function fromContentAndUserIdentifier(content, userIdentifier) {
      var initialiseResponse = new InitialiseResponse(content, userIdentifier);

      return initialiseResponse;
    }
  }]);

  return InitialiseResponse;
}();

module.exports = InitialiseResponse;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leGFtcGxlL3Jlc3BvbnNlL2luaXRpYWxpc2UuanMiXSwibmFtZXMiOlsiSW5pdGlhbGlzZVJlc3BvbnNlIiwiY29udGVudCIsInVzZXJJZGVudGlmaWVyIiwianNvbiIsImNvbnRlbnRKU09OIiwidXNlcklkZW50aWZpZXJKU09OIiwiaW5pdGlhbGlzZVJlc3BvbnNlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztJQUVNQSxrQjtBQUNKLDhCQUFZQyxPQUFaLEVBQXFCQyxjQUFyQixFQUFxQztBQUFBOztBQUNuQyxTQUFLRCxPQUFMLEdBQWVBLE9BQWY7QUFDQSxTQUFLQyxjQUFMLEdBQXNCQSxjQUF0QjtBQUNEOzs7O2lDQUVZO0FBQ1gsYUFBTyxLQUFLRCxPQUFaO0FBQ0Q7Ozt3Q0FFbUI7QUFDbEIsYUFBTyxLQUFLQyxjQUFaO0FBQ0Q7Ozs2QkFFUTtBQUNQLFVBQU1DLE9BQU87QUFDWCxtQkFBVyxLQUFLRixPQURMO0FBRVgsMEJBQWtCLEtBQUtDO0FBRlosT0FBYjs7QUFLQSxhQUFPQyxJQUFQO0FBQ0Q7Ozs2QkFFZUEsSSxFQUFNO0FBQ3BCLFVBQU1DLGNBQWNELEtBQUssU0FBTCxDQUFwQjtBQUFBLFVBQ01FLHFCQUFxQkYsS0FBSyxnQkFBTCxDQUQzQjtBQUFBLFVBRU1GLFVBQVVHLFdBRmhCO0FBQUEsVUFFOEI7QUFDeEJGLHVCQUFpQkcsa0JBSHZCO0FBQUEsVUFHNEM7QUFDdENDLDJCQUFxQixJQUFJTixrQkFBSixDQUF1QkMsT0FBdkIsRUFBZ0NDLGNBQWhDLENBSjNCOztBQU1BLGFBQU9JLGtCQUFQO0FBQ0Q7OztpREFFbUNMLE8sRUFBU0MsYyxFQUFnQjtBQUMzRCxVQUFNSSxxQkFBcUIsSUFBSU4sa0JBQUosQ0FBdUJDLE9BQXZCLEVBQWdDQyxjQUFoQyxDQUEzQjs7QUFFQSxhQUFPSSxrQkFBUDtBQUNEOzs7Ozs7QUFHSEMsT0FBT0MsT0FBUCxHQUFpQlIsa0JBQWpCIiwiZmlsZSI6ImluaXRpYWxpc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNsYXNzIEluaXRpYWxpc2VSZXNwb25zZSB7XG4gIGNvbnN0cnVjdG9yKGNvbnRlbnQsIHVzZXJJZGVudGlmaWVyKSB7XG4gICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcbiAgICB0aGlzLnVzZXJJZGVudGlmaWVyID0gdXNlcklkZW50aWZpZXI7XG4gIH1cblxuICBnZXRDb250ZW50KCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnQ7XG4gIH1cblxuICBnZXRVc2VySWRlbnRpZmllcigpIHtcbiAgICByZXR1cm4gdGhpcy51c2VySWRlbnRpZmllcjtcbiAgfVxuXG4gIHRvSlNPTigpIHtcbiAgICBjb25zdCBqc29uID0ge1xuICAgICAgXCJjb250ZW50XCI6IHRoaXMuY29udGVudCxcbiAgICAgIFwidXNlcklkZW50aWZpZXJcIjogdGhpcy51c2VySWRlbnRpZmllclxuICAgIH07XG5cbiAgICByZXR1cm4ganNvbjtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XG4gICAgY29uc3QgY29udGVudEpTT04gPSBqc29uW1wiY29udGVudFwiXSxcbiAgICAgICAgICB1c2VySWRlbnRpZmllckpTT04gPSBqc29uW1widXNlcklkZW50aWZpZXJcIl0sXG4gICAgICAgICAgY29udGVudCA9IGNvbnRlbnRKU09OLCAgLy8vXG4gICAgICAgICAgdXNlcklkZW50aWZpZXIgPSB1c2VySWRlbnRpZmllckpTT04sICAvLy9cbiAgICAgICAgICBpbml0aWFsaXNlUmVzcG9uc2UgPSBuZXcgSW5pdGlhbGlzZVJlc3BvbnNlKGNvbnRlbnQsIHVzZXJJZGVudGlmaWVyKTtcblxuICAgIHJldHVybiBpbml0aWFsaXNlUmVzcG9uc2U7XG4gIH1cblxuICBzdGF0aWMgZnJvbUNvbnRlbnRBbmRVc2VySWRlbnRpZmllcihjb250ZW50LCB1c2VySWRlbnRpZmllcikge1xuICAgIGNvbnN0IGluaXRpYWxpc2VSZXNwb25zZSA9IG5ldyBJbml0aWFsaXNlUmVzcG9uc2UoY29udGVudCwgdXNlcklkZW50aWZpZXIpO1xuXG4gICAgcmV0dXJuIGluaXRpYWxpc2VSZXNwb25zZTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEluaXRpYWxpc2VSZXNwb25zZTtcbiJdfQ==