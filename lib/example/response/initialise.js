'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InitialiseResponse = function () {
  function InitialiseResponse(content, userIdentifier, sessionIdentifier) {
    _classCallCheck(this, InitialiseResponse);

    this.content = content;
    this.userIdentifier = userIdentifier;
    this.sessionIdentifier = sessionIdentifier;
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
    key: "getSessionIdentifier",
    value: function getSessionIdentifier() {
      return this.sessionIdentifier;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var json = {
        "content": this.content,
        "userIdentifier": this.userIdentifier,
        "sessionIdentifier": this.sessionIdentifier
      };

      return json;
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(json) {
      var contentJSON = json["content"],
          userIdentifierJSON = json["userIdentifier"],
          sessionIdentifierJSON = json["sessionIdentifier"],
          content = contentJSON,
          ///
      userIdentifier = userIdentifierJSON,
          ///
      sessionIdentifier = sessionIdentifierJSON,
          ///
      initialiseResponse = new InitialiseResponse(content, userIdentifier, sessionIdentifier);

      return initialiseResponse;
    }
  }, {
    key: "fromContentUserIdentifierAndSessionIdentifier",
    value: function fromContentUserIdentifierAndSessionIdentifier(content, userIdentifier, sessionIdentifier) {
      var initialiseResponse = new InitialiseResponse(content, userIdentifier, sessionIdentifier);

      return initialiseResponse;
    }
  }]);

  return InitialiseResponse;
}();

module.exports = InitialiseResponse;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leGFtcGxlL3Jlc3BvbnNlL2luaXRpYWxpc2UuanMiXSwibmFtZXMiOlsiSW5pdGlhbGlzZVJlc3BvbnNlIiwiY29udGVudCIsInVzZXJJZGVudGlmaWVyIiwic2Vzc2lvbklkZW50aWZpZXIiLCJqc29uIiwiY29udGVudEpTT04iLCJ1c2VySWRlbnRpZmllckpTT04iLCJzZXNzaW9uSWRlbnRpZmllckpTT04iLCJpbml0aWFsaXNlUmVzcG9uc2UiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0lBRU1BLGtCO0FBQ0osOEJBQVlDLE9BQVosRUFBcUJDLGNBQXJCLEVBQXFDQyxpQkFBckMsRUFBd0Q7QUFBQTs7QUFDdEQsU0FBS0YsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsU0FBS0MsY0FBTCxHQUFzQkEsY0FBdEI7QUFDQSxTQUFLQyxpQkFBTCxHQUF5QkEsaUJBQXpCO0FBQ0Q7Ozs7aUNBRVk7QUFDWCxhQUFPLEtBQUtGLE9BQVo7QUFDRDs7O3dDQUVtQjtBQUNsQixhQUFPLEtBQUtDLGNBQVo7QUFDRDs7OzJDQUVzQjtBQUN0QixhQUFPLEtBQUtDLGlCQUFaO0FBQ0Q7Ozs2QkFFUztBQUNQLFVBQU1DLE9BQU87QUFDWCxtQkFBVyxLQUFLSCxPQURMO0FBRVgsMEJBQWtCLEtBQUtDLGNBRlo7QUFHZCw2QkFBcUIsS0FBS0M7QUFIWixPQUFiOztBQU1BLGFBQU9DLElBQVA7QUFDRDs7OzZCQUVlQSxJLEVBQU07QUFDcEIsVUFBTUMsY0FBY0QsS0FBSyxTQUFMLENBQXBCO0FBQUEsVUFDTUUscUJBQXFCRixLQUFLLGdCQUFMLENBRDNCO0FBQUEsVUFFQ0csd0JBQXdCSCxLQUFLLG1CQUFMLENBRnpCO0FBQUEsVUFHTUgsVUFBVUksV0FIaEI7QUFBQSxVQUc4QjtBQUN4QkgsdUJBQWlCSSxrQkFKdkI7QUFBQSxVQUk0QztBQUMzQ0gsMEJBQW9CSSxxQkFMckI7QUFBQSxVQUs2QztBQUN2Q0MsMkJBQXFCLElBQUlSLGtCQUFKLENBQXVCQyxPQUF2QixFQUFnQ0MsY0FBaEMsRUFBZ0RDLGlCQUFoRCxDQU4zQjs7QUFRQSxhQUFPSyxrQkFBUDtBQUNEOzs7a0VBRW9EUCxPLEVBQVNDLGMsRUFBZ0JDLGlCLEVBQW1CO0FBQy9GLFVBQU1LLHFCQUFxQixJQUFJUixrQkFBSixDQUF1QkMsT0FBdkIsRUFBZ0NDLGNBQWhDLEVBQWdEQyxpQkFBaEQsQ0FBM0I7O0FBRUEsYUFBT0ssa0JBQVA7QUFDRDs7Ozs7O0FBR0hDLE9BQU9DLE9BQVAsR0FBaUJWLGtCQUFqQiIsImZpbGUiOiJpbml0aWFsaXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBJbml0aWFsaXNlUmVzcG9uc2Uge1xuICBjb25zdHJ1Y3Rvcihjb250ZW50LCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpIHtcbiAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICAgIHRoaXMudXNlcklkZW50aWZpZXIgPSB1c2VySWRlbnRpZmllcjtcbiAgICB0aGlzLnNlc3Npb25JZGVudGlmaWVyID0gc2Vzc2lvbklkZW50aWZpZXI7XG4gIH1cblxuICBnZXRDb250ZW50KCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnQ7XG4gIH1cblxuICBnZXRVc2VySWRlbnRpZmllcigpIHtcbiAgICByZXR1cm4gdGhpcy51c2VySWRlbnRpZmllcjtcbiAgfVxuXG4gIGdldFNlc3Npb25JZGVudGlmaWVyKCkge1xuICBcdHJldHVybiB0aGlzLnNlc3Npb25JZGVudGlmaWVyO1xuXHR9XG5cbiAgdG9KU09OKCkge1xuICAgIGNvbnN0IGpzb24gPSB7XG4gICAgICBcImNvbnRlbnRcIjogdGhpcy5jb250ZW50LFxuICAgICAgXCJ1c2VySWRlbnRpZmllclwiOiB0aGlzLnVzZXJJZGVudGlmaWVyLFxuXHRcdFx0XCJzZXNzaW9uSWRlbnRpZmllclwiOiB0aGlzLnNlc3Npb25JZGVudGlmaWVyXG4gICAgfTtcblxuICAgIHJldHVybiBqc29uO1xuICB9XG5cbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcbiAgICBjb25zdCBjb250ZW50SlNPTiA9IGpzb25bXCJjb250ZW50XCJdLFxuICAgICAgICAgIHVzZXJJZGVudGlmaWVySlNPTiA9IGpzb25bXCJ1c2VySWRlbnRpZmllclwiXSxcblx0XHRcdFx0XHRzZXNzaW9uSWRlbnRpZmllckpTT04gPSBqc29uW1wic2Vzc2lvbklkZW50aWZpZXJcIl0sXG4gICAgICAgICAgY29udGVudCA9IGNvbnRlbnRKU09OLCAgLy8vXG4gICAgICAgICAgdXNlcklkZW50aWZpZXIgPSB1c2VySWRlbnRpZmllckpTT04sICAvLy9cblx0XHRcdFx0XHRzZXNzaW9uSWRlbnRpZmllciA9IHNlc3Npb25JZGVudGlmaWVySlNPTiwgIC8vL1xuICAgICAgICAgIGluaXRpYWxpc2VSZXNwb25zZSA9IG5ldyBJbml0aWFsaXNlUmVzcG9uc2UoY29udGVudCwgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyKTtcblxuICAgIHJldHVybiBpbml0aWFsaXNlUmVzcG9uc2U7XG4gIH1cblxuICBzdGF0aWMgZnJvbUNvbnRlbnRVc2VySWRlbnRpZmllckFuZFNlc3Npb25JZGVudGlmaWVyKGNvbnRlbnQsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllcikge1xuICAgIGNvbnN0IGluaXRpYWxpc2VSZXNwb25zZSA9IG5ldyBJbml0aWFsaXNlUmVzcG9uc2UoY29udGVudCwgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyKTtcblxuICAgIHJldHVybiBpbml0aWFsaXNlUmVzcG9uc2U7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBJbml0aWFsaXNlUmVzcG9uc2U7XG4iXX0=