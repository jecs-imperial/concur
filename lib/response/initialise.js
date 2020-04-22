"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var InitialiseResponse = /*#__PURE__*/function () {
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

exports["default"] = InitialiseResponse;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaXRpYWxpc2UuanMiXSwibmFtZXMiOlsiSW5pdGlhbGlzZVJlc3BvbnNlIiwiY29udGVudCIsInVzZXJJZGVudGlmaWVyIiwic2Vzc2lvbklkZW50aWZpZXIiLCJqc29uIiwiY29udGVudEpTT04iLCJ1c2VySWRlbnRpZmllckpTT04iLCJzZXNzaW9uSWRlbnRpZmllckpTT04iLCJpbml0aWFsaXNlUmVzcG9uc2UiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7O0lBRXFCQSxrQjtBQUNuQiw4QkFBWUMsT0FBWixFQUFxQkMsY0FBckIsRUFBcUNDLGlCQUFyQyxFQUF3RDtBQUFBOztBQUN0RCxTQUFLRixPQUFMLEdBQWVBLE9BQWY7QUFDQSxTQUFLQyxjQUFMLEdBQXNCQSxjQUF0QjtBQUNBLFNBQUtDLGlCQUFMLEdBQXlCQSxpQkFBekI7QUFDRDs7OztpQ0FFWTtBQUNYLGFBQU8sS0FBS0YsT0FBWjtBQUNEOzs7d0NBRW1CO0FBQ2xCLGFBQU8sS0FBS0MsY0FBWjtBQUNEOzs7MkNBRXNCO0FBQ3RCLGFBQU8sS0FBS0MsaUJBQVo7QUFDRDs7OzZCQUVTO0FBQ1AsVUFBTUMsSUFBSSxHQUFHO0FBQ1gsbUJBQVcsS0FBS0gsT0FETDtBQUVYLDBCQUFrQixLQUFLQyxjQUZaO0FBR2QsNkJBQXFCLEtBQUtDO0FBSFosT0FBYjtBQU1BLGFBQU9DLElBQVA7QUFDRDs7OzZCQUVlQSxJLEVBQU07QUFDcEIsVUFBTUMsV0FBVyxHQUFHRCxJQUFJLENBQUMsU0FBRCxDQUF4QjtBQUFBLFVBQ01FLGtCQUFrQixHQUFHRixJQUFJLENBQUMsZ0JBQUQsQ0FEL0I7QUFBQSxVQUVDRyxxQkFBcUIsR0FBR0gsSUFBSSxDQUFDLG1CQUFELENBRjdCO0FBQUEsVUFHTUgsT0FBTyxHQUFHSSxXQUhoQjtBQUFBLFVBRzhCO0FBQ3hCSCxNQUFBQSxjQUFjLEdBQUdJLGtCQUp2QjtBQUFBLFVBSTRDO0FBQzNDSCxNQUFBQSxpQkFBaUIsR0FBR0kscUJBTHJCO0FBQUEsVUFLNkM7QUFDdkNDLE1BQUFBLGtCQUFrQixHQUFHLElBQUlSLGtCQUFKLENBQXVCQyxPQUF2QixFQUFnQ0MsY0FBaEMsRUFBZ0RDLGlCQUFoRCxDQU4zQjtBQVFBLGFBQU9LLGtCQUFQO0FBQ0Q7OztrRUFFb0RQLE8sRUFBU0MsYyxFQUFnQkMsaUIsRUFBbUI7QUFDL0YsVUFBTUssa0JBQWtCLEdBQUcsSUFBSVIsa0JBQUosQ0FBdUJDLE9BQXZCLEVBQWdDQyxjQUFoQyxFQUFnREMsaUJBQWhELENBQTNCO0FBRUEsYUFBT0ssa0JBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbml0aWFsaXNlUmVzcG9uc2Uge1xuICBjb25zdHJ1Y3Rvcihjb250ZW50LCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpIHtcbiAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICAgIHRoaXMudXNlcklkZW50aWZpZXIgPSB1c2VySWRlbnRpZmllcjtcbiAgICB0aGlzLnNlc3Npb25JZGVudGlmaWVyID0gc2Vzc2lvbklkZW50aWZpZXI7XG4gIH1cblxuICBnZXRDb250ZW50KCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnQ7XG4gIH1cblxuICBnZXRVc2VySWRlbnRpZmllcigpIHtcbiAgICByZXR1cm4gdGhpcy51c2VySWRlbnRpZmllcjtcbiAgfVxuXG4gIGdldFNlc3Npb25JZGVudGlmaWVyKCkge1xuICBcdHJldHVybiB0aGlzLnNlc3Npb25JZGVudGlmaWVyO1xuXHR9XG5cbiAgdG9KU09OKCkge1xuICAgIGNvbnN0IGpzb24gPSB7XG4gICAgICBcImNvbnRlbnRcIjogdGhpcy5jb250ZW50LFxuICAgICAgXCJ1c2VySWRlbnRpZmllclwiOiB0aGlzLnVzZXJJZGVudGlmaWVyLFxuXHRcdFx0XCJzZXNzaW9uSWRlbnRpZmllclwiOiB0aGlzLnNlc3Npb25JZGVudGlmaWVyXG4gICAgfTtcblxuICAgIHJldHVybiBqc29uO1xuICB9XG5cbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcbiAgICBjb25zdCBjb250ZW50SlNPTiA9IGpzb25bXCJjb250ZW50XCJdLFxuICAgICAgICAgIHVzZXJJZGVudGlmaWVySlNPTiA9IGpzb25bXCJ1c2VySWRlbnRpZmllclwiXSxcblx0XHRcdFx0XHRzZXNzaW9uSWRlbnRpZmllckpTT04gPSBqc29uW1wic2Vzc2lvbklkZW50aWZpZXJcIl0sXG4gICAgICAgICAgY29udGVudCA9IGNvbnRlbnRKU09OLCAgLy8vXG4gICAgICAgICAgdXNlcklkZW50aWZpZXIgPSB1c2VySWRlbnRpZmllckpTT04sICAvLy9cblx0XHRcdFx0XHRzZXNzaW9uSWRlbnRpZmllciA9IHNlc3Npb25JZGVudGlmaWVySlNPTiwgIC8vL1xuICAgICAgICAgIGluaXRpYWxpc2VSZXNwb25zZSA9IG5ldyBJbml0aWFsaXNlUmVzcG9uc2UoY29udGVudCwgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyKTtcblxuICAgIHJldHVybiBpbml0aWFsaXNlUmVzcG9uc2U7XG4gIH1cblxuICBzdGF0aWMgZnJvbUNvbnRlbnRVc2VySWRlbnRpZmllckFuZFNlc3Npb25JZGVudGlmaWVyKGNvbnRlbnQsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllcikge1xuICAgIGNvbnN0IGluaXRpYWxpc2VSZXNwb25zZSA9IG5ldyBJbml0aWFsaXNlUmVzcG9uc2UoY29udGVudCwgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyKTtcblxuICAgIHJldHVybiBpbml0aWFsaXNlUmVzcG9uc2U7XG4gIH1cbn1cbiJdfQ==