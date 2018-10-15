'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InitialiseResponse = function () {
  function InitialiseResponse(userIdentifier) {
    _classCallCheck(this, InitialiseResponse);

    this.userIdentifier = userIdentifier;
  }

  _createClass(InitialiseResponse, [{
    key: "getUserIdentifier",
    value: function getUserIdentifier() {
      return this.userIdentifier;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var json = {
        "userIdentifier": this.userIdentifier
      };

      return json;
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(json) {
      var userIdentifierJSON = json["userIdentifier"],
          userIdentifier = userIdentifierJSON,
          ///
      initialiseResponse = new InitialiseResponse(userIdentifier);

      return initialiseResponse;
    }
  }, {
    key: "fromUserIdentifier",
    value: function fromUserIdentifier(userIdentifier) {
      var initialiseResponse = new InitialiseResponse(userIdentifier);

      return initialiseResponse;
    }
  }]);

  return InitialiseResponse;
}();

module.exports = InitialiseResponse;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9yZXNwb25zZS9pbml0aWFsaXNlLmpzIl0sIm5hbWVzIjpbIkluaXRpYWxpc2VSZXNwb25zZSIsInVzZXJJZGVudGlmaWVyIiwianNvbiIsInVzZXJJZGVudGlmaWVySlNPTiIsImluaXRpYWxpc2VSZXNwb25zZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7SUFFTUEsa0I7QUFDSiw4QkFBWUMsY0FBWixFQUE0QjtBQUFBOztBQUMxQixTQUFLQSxjQUFMLEdBQXNCQSxjQUF0QjtBQUNEOzs7O3dDQUVtQjtBQUNsQixhQUFPLEtBQUtBLGNBQVo7QUFDRDs7OzZCQUVRO0FBQ1AsVUFBTUMsT0FBTztBQUNYLDBCQUFrQixLQUFLRDtBQURaLE9BQWI7O0FBSUEsYUFBT0MsSUFBUDtBQUNEOzs7NkJBRWVBLEksRUFBTTtBQUNwQixVQUFNQyxxQkFBcUJELEtBQUssZ0JBQUwsQ0FBM0I7QUFBQSxVQUNNRCxpQkFBaUJFLGtCQUR2QjtBQUFBLFVBQzRDO0FBQ3RDQywyQkFBcUIsSUFBSUosa0JBQUosQ0FBdUJDLGNBQXZCLENBRjNCOztBQUlBLGFBQU9HLGtCQUFQO0FBQ0Q7Ozt1Q0FFeUJILGMsRUFBZ0I7QUFDeEMsVUFBTUcscUJBQXFCLElBQUlKLGtCQUFKLENBQXVCQyxjQUF2QixDQUEzQjs7QUFFQSxhQUFPRyxrQkFBUDtBQUNEOzs7Ozs7QUFHSEMsT0FBT0MsT0FBUCxHQUFpQk4sa0JBQWpCIiwiZmlsZSI6ImluaXRpYWxpc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNsYXNzIEluaXRpYWxpc2VSZXNwb25zZSB7XG4gIGNvbnN0cnVjdG9yKHVzZXJJZGVudGlmaWVyKSB7XG4gICAgdGhpcy51c2VySWRlbnRpZmllciA9IHVzZXJJZGVudGlmaWVyO1xuICB9XG5cbiAgZ2V0VXNlcklkZW50aWZpZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMudXNlcklkZW50aWZpZXI7XG4gIH1cblxuICB0b0pTT04oKSB7XG4gICAgY29uc3QganNvbiA9IHtcbiAgICAgIFwidXNlcklkZW50aWZpZXJcIjogdGhpcy51c2VySWRlbnRpZmllclxuICAgIH07XG5cbiAgICByZXR1cm4ganNvbjtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XG4gICAgY29uc3QgdXNlcklkZW50aWZpZXJKU09OID0ganNvbltcInVzZXJJZGVudGlmaWVyXCJdLFxuICAgICAgICAgIHVzZXJJZGVudGlmaWVyID0gdXNlcklkZW50aWZpZXJKU09OLCAgLy8vXG4gICAgICAgICAgaW5pdGlhbGlzZVJlc3BvbnNlID0gbmV3IEluaXRpYWxpc2VSZXNwb25zZSh1c2VySWRlbnRpZmllcik7XG5cbiAgICByZXR1cm4gaW5pdGlhbGlzZVJlc3BvbnNlO1xuICB9XG5cbiAgc3RhdGljIGZyb21Vc2VySWRlbnRpZmllcih1c2VySWRlbnRpZmllcikge1xuICAgIGNvbnN0IGluaXRpYWxpc2VSZXNwb25zZSA9IG5ldyBJbml0aWFsaXNlUmVzcG9uc2UodXNlcklkZW50aWZpZXIpO1xuXG4gICAgcmV0dXJuIGluaXRpYWxpc2VSZXNwb25zZTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEluaXRpYWxpc2VSZXNwb25zZTtcbiJdfQ==