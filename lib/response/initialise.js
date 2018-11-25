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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9yZXNwb25zZS9pbml0aWFsaXNlLmpzIl0sIm5hbWVzIjpbIkluaXRpYWxpc2VSZXNwb25zZSIsImNvbnRlbnQiLCJ1c2VySWRlbnRpZmllciIsInNlc3Npb25JZGVudGlmaWVyIiwianNvbiIsImNvbnRlbnRKU09OIiwidXNlcklkZW50aWZpZXJKU09OIiwic2Vzc2lvbklkZW50aWZpZXJKU09OIiwiaW5pdGlhbGlzZVJlc3BvbnNlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztJQUVNQSxrQjtBQUNKLDhCQUFZQyxPQUFaLEVBQXFCQyxjQUFyQixFQUFxQ0MsaUJBQXJDLEVBQXdEO0FBQUE7O0FBQ3RELFNBQUtGLE9BQUwsR0FBZUEsT0FBZjtBQUNBLFNBQUtDLGNBQUwsR0FBc0JBLGNBQXRCO0FBQ0EsU0FBS0MsaUJBQUwsR0FBeUJBLGlCQUF6QjtBQUNEOzs7O2lDQUVZO0FBQ1gsYUFBTyxLQUFLRixPQUFaO0FBQ0Q7Ozt3Q0FFbUI7QUFDbEIsYUFBTyxLQUFLQyxjQUFaO0FBQ0Q7OzsyQ0FFc0I7QUFDdEIsYUFBTyxLQUFLQyxpQkFBWjtBQUNEOzs7NkJBRVM7QUFDUCxVQUFNQyxPQUFPO0FBQ1gsbUJBQVcsS0FBS0gsT0FETDtBQUVYLDBCQUFrQixLQUFLQyxjQUZaO0FBR2QsNkJBQXFCLEtBQUtDO0FBSFosT0FBYjs7QUFNQSxhQUFPQyxJQUFQO0FBQ0Q7Ozs2QkFFZUEsSSxFQUFNO0FBQ3BCLFVBQU1DLGNBQWNELEtBQUssU0FBTCxDQUFwQjtBQUFBLFVBQ01FLHFCQUFxQkYsS0FBSyxnQkFBTCxDQUQzQjtBQUFBLFVBRUNHLHdCQUF3QkgsS0FBSyxtQkFBTCxDQUZ6QjtBQUFBLFVBR01ILFVBQVVJLFdBSGhCO0FBQUEsVUFHOEI7QUFDeEJILHVCQUFpQkksa0JBSnZCO0FBQUEsVUFJNEM7QUFDM0NILDBCQUFvQkkscUJBTHJCO0FBQUEsVUFLNkM7QUFDdkNDLDJCQUFxQixJQUFJUixrQkFBSixDQUF1QkMsT0FBdkIsRUFBZ0NDLGNBQWhDLEVBQWdEQyxpQkFBaEQsQ0FOM0I7O0FBUUEsYUFBT0ssa0JBQVA7QUFDRDs7O2tFQUVvRFAsTyxFQUFTQyxjLEVBQWdCQyxpQixFQUFtQjtBQUMvRixVQUFNSyxxQkFBcUIsSUFBSVIsa0JBQUosQ0FBdUJDLE9BQXZCLEVBQWdDQyxjQUFoQyxFQUFnREMsaUJBQWhELENBQTNCOztBQUVBLGFBQU9LLGtCQUFQO0FBQ0Q7Ozs7OztBQUdIQyxPQUFPQyxPQUFQLEdBQWlCVixrQkFBakIiLCJmaWxlIjoiaW5pdGlhbGlzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgSW5pdGlhbGlzZVJlc3BvbnNlIHtcbiAgY29uc3RydWN0b3IoY29udGVudCwgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyKSB7XG4gICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcbiAgICB0aGlzLnVzZXJJZGVudGlmaWVyID0gdXNlcklkZW50aWZpZXI7XG4gICAgdGhpcy5zZXNzaW9uSWRlbnRpZmllciA9IHNlc3Npb25JZGVudGlmaWVyO1xuICB9XG5cbiAgZ2V0Q29udGVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZW50O1xuICB9XG5cbiAgZ2V0VXNlcklkZW50aWZpZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMudXNlcklkZW50aWZpZXI7XG4gIH1cblxuICBnZXRTZXNzaW9uSWRlbnRpZmllcigpIHtcbiAgXHRyZXR1cm4gdGhpcy5zZXNzaW9uSWRlbnRpZmllcjtcblx0fVxuXG4gIHRvSlNPTigpIHtcbiAgICBjb25zdCBqc29uID0ge1xuICAgICAgXCJjb250ZW50XCI6IHRoaXMuY29udGVudCxcbiAgICAgIFwidXNlcklkZW50aWZpZXJcIjogdGhpcy51c2VySWRlbnRpZmllcixcblx0XHRcdFwic2Vzc2lvbklkZW50aWZpZXJcIjogdGhpcy5zZXNzaW9uSWRlbnRpZmllclxuICAgIH07XG5cbiAgICByZXR1cm4ganNvbjtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XG4gICAgY29uc3QgY29udGVudEpTT04gPSBqc29uW1wiY29udGVudFwiXSxcbiAgICAgICAgICB1c2VySWRlbnRpZmllckpTT04gPSBqc29uW1widXNlcklkZW50aWZpZXJcIl0sXG5cdFx0XHRcdFx0c2Vzc2lvbklkZW50aWZpZXJKU09OID0ganNvbltcInNlc3Npb25JZGVudGlmaWVyXCJdLFxuICAgICAgICAgIGNvbnRlbnQgPSBjb250ZW50SlNPTiwgIC8vL1xuICAgICAgICAgIHVzZXJJZGVudGlmaWVyID0gdXNlcklkZW50aWZpZXJKU09OLCAgLy8vXG5cdFx0XHRcdFx0c2Vzc2lvbklkZW50aWZpZXIgPSBzZXNzaW9uSWRlbnRpZmllckpTT04sICAvLy9cbiAgICAgICAgICBpbml0aWFsaXNlUmVzcG9uc2UgPSBuZXcgSW5pdGlhbGlzZVJlc3BvbnNlKGNvbnRlbnQsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllcik7XG5cbiAgICByZXR1cm4gaW5pdGlhbGlzZVJlc3BvbnNlO1xuICB9XG5cbiAgc3RhdGljIGZyb21Db250ZW50VXNlcklkZW50aWZpZXJBbmRTZXNzaW9uSWRlbnRpZmllcihjb250ZW50LCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpIHtcbiAgICBjb25zdCBpbml0aWFsaXNlUmVzcG9uc2UgPSBuZXcgSW5pdGlhbGlzZVJlc3BvbnNlKGNvbnRlbnQsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllcik7XG5cbiAgICByZXR1cm4gaW5pdGlhbGlzZVJlc3BvbnNlO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSW5pdGlhbGlzZVJlc3BvbnNlO1xuIl19