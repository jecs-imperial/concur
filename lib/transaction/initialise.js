'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var session = require('../session'),
    InitialiseResponse = require('../response/initialise');

var InitialiseTransaction = function () {
  function InitialiseTransaction(initialiseResponse) {
    _classCallCheck(this, InitialiseTransaction);

    this.initialiseResponse = initialiseResponse;
  }

  _createClass(InitialiseTransaction, [{
    key: 'toJSON',
    value: function toJSON() {
      return this.initialiseResponse.toJSON();
    }
  }], [{
    key: 'fromJSON',
    value: function fromJSON(json) {
      var content = session.getContent(),
          userIdentifier = session.createUser(),
          sessionIdentifier = session.getIdentifier(),
          initialiseResponse = InitialiseResponse.fromContentUserIdentifierAndSessionIdentifier(content, userIdentifier, sessionIdentifier),
          initialiseTransaction = new InitialiseTransaction(initialiseResponse);

      return initialiseTransaction;
    }
  }]);

  return InitialiseTransaction;
}();

module.exports = InitialiseTransaction;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi90cmFuc2FjdGlvbi9pbml0aWFsaXNlLmpzIl0sIm5hbWVzIjpbInNlc3Npb24iLCJyZXF1aXJlIiwiSW5pdGlhbGlzZVJlc3BvbnNlIiwiSW5pdGlhbGlzZVRyYW5zYWN0aW9uIiwiaW5pdGlhbGlzZVJlc3BvbnNlIiwidG9KU09OIiwianNvbiIsImNvbnRlbnQiLCJnZXRDb250ZW50IiwidXNlcklkZW50aWZpZXIiLCJjcmVhdGVVc2VyIiwic2Vzc2lvbklkZW50aWZpZXIiLCJnZXRJZGVudGlmaWVyIiwiZnJvbUNvbnRlbnRVc2VySWRlbnRpZmllckFuZFNlc3Npb25JZGVudGlmaWVyIiwiaW5pdGlhbGlzZVRyYW5zYWN0aW9uIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBLElBQU1BLFVBQVVDLFFBQVEsWUFBUixDQUFoQjtBQUFBLElBQ01DLHFCQUFxQkQsUUFBUSx3QkFBUixDQUQzQjs7SUFHTUUscUI7QUFDSixpQ0FBWUMsa0JBQVosRUFBZ0M7QUFBQTs7QUFDOUIsU0FBS0Esa0JBQUwsR0FBMEJBLGtCQUExQjtBQUNEOzs7OzZCQUVRO0FBQUUsYUFBTyxLQUFLQSxrQkFBTCxDQUF3QkMsTUFBeEIsRUFBUDtBQUEwQzs7OzZCQUVyQ0MsSSxFQUFNO0FBQ3BCLFVBQU1DLFVBQVVQLFFBQVFRLFVBQVIsRUFBaEI7QUFBQSxVQUNNQyxpQkFBaUJULFFBQVFVLFVBQVIsRUFEdkI7QUFBQSxVQUVDQyxvQkFBb0JYLFFBQVFZLGFBQVIsRUFGckI7QUFBQSxVQUdNUixxQkFBcUJGLG1CQUFtQlcsNkNBQW5CLENBQWlFTixPQUFqRSxFQUEwRUUsY0FBMUUsRUFBMEZFLGlCQUExRixDQUgzQjtBQUFBLFVBSU1HLHdCQUF3QixJQUFJWCxxQkFBSixDQUEwQkMsa0JBQTFCLENBSjlCOztBQU1BLGFBQU9VLHFCQUFQO0FBQ0Q7Ozs7OztBQUdIQyxPQUFPQyxPQUFQLEdBQWlCYixxQkFBakIiLCJmaWxlIjoiaW5pdGlhbGlzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3Qgc2Vzc2lvbiA9IHJlcXVpcmUoJy4uL3Nlc3Npb24nKSxcbiAgICAgIEluaXRpYWxpc2VSZXNwb25zZSA9IHJlcXVpcmUoJy4uL3Jlc3BvbnNlL2luaXRpYWxpc2UnKTtcblxuY2xhc3MgSW5pdGlhbGlzZVRyYW5zYWN0aW9uIHtcbiAgY29uc3RydWN0b3IoaW5pdGlhbGlzZVJlc3BvbnNlKSB7XG4gICAgdGhpcy5pbml0aWFsaXNlUmVzcG9uc2UgPSBpbml0aWFsaXNlUmVzcG9uc2U7XG4gIH1cblxuICB0b0pTT04oKSB7IHJldHVybiB0aGlzLmluaXRpYWxpc2VSZXNwb25zZS50b0pTT04oKTsgfVxuXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XG4gICAgY29uc3QgY29udGVudCA9IHNlc3Npb24uZ2V0Q29udGVudCgpLFxuICAgICAgICAgIHVzZXJJZGVudGlmaWVyID0gc2Vzc2lvbi5jcmVhdGVVc2VyKCksXG5cdFx0XHRcdFx0c2Vzc2lvbklkZW50aWZpZXIgPSBzZXNzaW9uLmdldElkZW50aWZpZXIoKSxcbiAgICAgICAgICBpbml0aWFsaXNlUmVzcG9uc2UgPSBJbml0aWFsaXNlUmVzcG9uc2UuZnJvbUNvbnRlbnRVc2VySWRlbnRpZmllckFuZFNlc3Npb25JZGVudGlmaWVyKGNvbnRlbnQsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllciksXG4gICAgICAgICAgaW5pdGlhbGlzZVRyYW5zYWN0aW9uID0gbmV3IEluaXRpYWxpc2VUcmFuc2FjdGlvbihpbml0aWFsaXNlUmVzcG9uc2UpO1xuXG4gICAgcmV0dXJuIGluaXRpYWxpc2VUcmFuc2FjdGlvbjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEluaXRpYWxpc2VUcmFuc2FjdGlvbjtcbiJdfQ==