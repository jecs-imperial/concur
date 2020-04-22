"use strict";

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

module.exports = InitialiseResponse;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaXRpYWxpc2UuanMiXSwibmFtZXMiOlsiSW5pdGlhbGlzZVJlc3BvbnNlIiwiY29udGVudCIsInVzZXJJZGVudGlmaWVyIiwic2Vzc2lvbklkZW50aWZpZXIiLCJqc29uIiwiY29udGVudEpTT04iLCJ1c2VySWRlbnRpZmllckpTT04iLCJzZXNzaW9uSWRlbnRpZmllckpTT04iLCJpbml0aWFsaXNlUmVzcG9uc2UiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7SUFFTUEsa0I7QUFDSiw4QkFBWUMsT0FBWixFQUFxQkMsY0FBckIsRUFBcUNDLGlCQUFyQyxFQUF3RDtBQUFBOztBQUN0RCxTQUFLRixPQUFMLEdBQWVBLE9BQWY7QUFDQSxTQUFLQyxjQUFMLEdBQXNCQSxjQUF0QjtBQUNBLFNBQUtDLGlCQUFMLEdBQXlCQSxpQkFBekI7QUFDRDs7OztpQ0FFWTtBQUNYLGFBQU8sS0FBS0YsT0FBWjtBQUNEOzs7d0NBRW1CO0FBQ2xCLGFBQU8sS0FBS0MsY0FBWjtBQUNEOzs7MkNBRXNCO0FBQ3RCLGFBQU8sS0FBS0MsaUJBQVo7QUFDRDs7OzZCQUVTO0FBQ1AsVUFBTUMsSUFBSSxHQUFHO0FBQ1gsbUJBQVcsS0FBS0gsT0FETDtBQUVYLDBCQUFrQixLQUFLQyxjQUZaO0FBR2QsNkJBQXFCLEtBQUtDO0FBSFosT0FBYjtBQU1BLGFBQU9DLElBQVA7QUFDRDs7OzZCQUVlQSxJLEVBQU07QUFDcEIsVUFBTUMsV0FBVyxHQUFHRCxJQUFJLENBQUMsU0FBRCxDQUF4QjtBQUFBLFVBQ01FLGtCQUFrQixHQUFHRixJQUFJLENBQUMsZ0JBQUQsQ0FEL0I7QUFBQSxVQUVDRyxxQkFBcUIsR0FBR0gsSUFBSSxDQUFDLG1CQUFELENBRjdCO0FBQUEsVUFHTUgsT0FBTyxHQUFHSSxXQUhoQjtBQUFBLFVBRzhCO0FBQ3hCSCxNQUFBQSxjQUFjLEdBQUdJLGtCQUp2QjtBQUFBLFVBSTRDO0FBQzNDSCxNQUFBQSxpQkFBaUIsR0FBR0kscUJBTHJCO0FBQUEsVUFLNkM7QUFDdkNDLE1BQUFBLGtCQUFrQixHQUFHLElBQUlSLGtCQUFKLENBQXVCQyxPQUF2QixFQUFnQ0MsY0FBaEMsRUFBZ0RDLGlCQUFoRCxDQU4zQjtBQVFBLGFBQU9LLGtCQUFQO0FBQ0Q7OztrRUFFb0RQLE8sRUFBU0MsYyxFQUFnQkMsaUIsRUFBbUI7QUFDL0YsVUFBTUssa0JBQWtCLEdBQUcsSUFBSVIsa0JBQUosQ0FBdUJDLE9BQXZCLEVBQWdDQyxjQUFoQyxFQUFnREMsaUJBQWhELENBQTNCO0FBRUEsYUFBT0ssa0JBQVA7QUFDRDs7Ozs7O0FBR0hDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQlYsa0JBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNsYXNzIEluaXRpYWxpc2VSZXNwb25zZSB7XG4gIGNvbnN0cnVjdG9yKGNvbnRlbnQsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllcikge1xuICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgdGhpcy51c2VySWRlbnRpZmllciA9IHVzZXJJZGVudGlmaWVyO1xuICAgIHRoaXMuc2Vzc2lvbklkZW50aWZpZXIgPSBzZXNzaW9uSWRlbnRpZmllcjtcbiAgfVxuXG4gIGdldENvbnRlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGVudDtcbiAgfVxuXG4gIGdldFVzZXJJZGVudGlmaWVyKCkge1xuICAgIHJldHVybiB0aGlzLnVzZXJJZGVudGlmaWVyO1xuICB9XG5cbiAgZ2V0U2Vzc2lvbklkZW50aWZpZXIoKSB7XG4gIFx0cmV0dXJuIHRoaXMuc2Vzc2lvbklkZW50aWZpZXI7XG5cdH1cblxuICB0b0pTT04oKSB7XG4gICAgY29uc3QganNvbiA9IHtcbiAgICAgIFwiY29udGVudFwiOiB0aGlzLmNvbnRlbnQsXG4gICAgICBcInVzZXJJZGVudGlmaWVyXCI6IHRoaXMudXNlcklkZW50aWZpZXIsXG5cdFx0XHRcInNlc3Npb25JZGVudGlmaWVyXCI6IHRoaXMuc2Vzc2lvbklkZW50aWZpZXJcbiAgICB9O1xuXG4gICAgcmV0dXJuIGpzb247XG4gIH1cblxuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xuICAgIGNvbnN0IGNvbnRlbnRKU09OID0ganNvbltcImNvbnRlbnRcIl0sXG4gICAgICAgICAgdXNlcklkZW50aWZpZXJKU09OID0ganNvbltcInVzZXJJZGVudGlmaWVyXCJdLFxuXHRcdFx0XHRcdHNlc3Npb25JZGVudGlmaWVySlNPTiA9IGpzb25bXCJzZXNzaW9uSWRlbnRpZmllclwiXSxcbiAgICAgICAgICBjb250ZW50ID0gY29udGVudEpTT04sICAvLy9cbiAgICAgICAgICB1c2VySWRlbnRpZmllciA9IHVzZXJJZGVudGlmaWVySlNPTiwgIC8vL1xuXHRcdFx0XHRcdHNlc3Npb25JZGVudGlmaWVyID0gc2Vzc2lvbklkZW50aWZpZXJKU09OLCAgLy8vXG4gICAgICAgICAgaW5pdGlhbGlzZVJlc3BvbnNlID0gbmV3IEluaXRpYWxpc2VSZXNwb25zZShjb250ZW50LCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpO1xuXG4gICAgcmV0dXJuIGluaXRpYWxpc2VSZXNwb25zZTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tQ29udGVudFVzZXJJZGVudGlmaWVyQW5kU2Vzc2lvbklkZW50aWZpZXIoY29udGVudCwgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyKSB7XG4gICAgY29uc3QgaW5pdGlhbGlzZVJlc3BvbnNlID0gbmV3IEluaXRpYWxpc2VSZXNwb25zZShjb250ZW50LCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpO1xuXG4gICAgcmV0dXJuIGluaXRpYWxpc2VSZXNwb25zZTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEluaXRpYWxpc2VSZXNwb25zZTtcbiJdfQ==