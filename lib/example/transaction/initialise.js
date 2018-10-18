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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leGFtcGxlL3RyYW5zYWN0aW9uL2luaXRpYWxpc2UuanMiXSwibmFtZXMiOlsic2Vzc2lvbiIsInJlcXVpcmUiLCJJbml0aWFsaXNlUmVzcG9uc2UiLCJJbml0aWFsaXNlVHJhbnNhY3Rpb24iLCJpbml0aWFsaXNlUmVzcG9uc2UiLCJ0b0pTT04iLCJqc29uIiwiY29udGVudCIsImdldENvbnRlbnQiLCJ1c2VySWRlbnRpZmllciIsImNyZWF0ZVVzZXIiLCJzZXNzaW9uSWRlbnRpZmllciIsImdldElkZW50aWZpZXIiLCJmcm9tQ29udGVudFVzZXJJZGVudGlmaWVyQW5kU2Vzc2lvbklkZW50aWZpZXIiLCJpbml0aWFsaXNlVHJhbnNhY3Rpb24iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBRUEsSUFBTUEsVUFBVUMsUUFBUSxZQUFSLENBQWhCO0FBQUEsSUFDTUMscUJBQXFCRCxRQUFRLHdCQUFSLENBRDNCOztJQUdNRSxxQjtBQUNKLGlDQUFZQyxrQkFBWixFQUFnQztBQUFBOztBQUM5QixTQUFLQSxrQkFBTCxHQUEwQkEsa0JBQTFCO0FBQ0Q7Ozs7NkJBRVE7QUFBRSxhQUFPLEtBQUtBLGtCQUFMLENBQXdCQyxNQUF4QixFQUFQO0FBQTBDOzs7NkJBRXJDQyxJLEVBQU07QUFDcEIsVUFBTUMsVUFBVVAsUUFBUVEsVUFBUixFQUFoQjtBQUFBLFVBQ01DLGlCQUFpQlQsUUFBUVUsVUFBUixFQUR2QjtBQUFBLFVBRUNDLG9CQUFvQlgsUUFBUVksYUFBUixFQUZyQjtBQUFBLFVBR01SLHFCQUFxQkYsbUJBQW1CVyw2Q0FBbkIsQ0FBaUVOLE9BQWpFLEVBQTBFRSxjQUExRSxFQUEwRkUsaUJBQTFGLENBSDNCO0FBQUEsVUFJTUcsd0JBQXdCLElBQUlYLHFCQUFKLENBQTBCQyxrQkFBMUIsQ0FKOUI7O0FBTUEsYUFBT1UscUJBQVA7QUFDRDs7Ozs7O0FBR0hDLE9BQU9DLE9BQVAsR0FBaUJiLHFCQUFqQiIsImZpbGUiOiJpbml0aWFsaXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBzZXNzaW9uID0gcmVxdWlyZSgnLi4vc2Vzc2lvbicpLFxuICAgICAgSW5pdGlhbGlzZVJlc3BvbnNlID0gcmVxdWlyZSgnLi4vcmVzcG9uc2UvaW5pdGlhbGlzZScpO1xuXG5jbGFzcyBJbml0aWFsaXNlVHJhbnNhY3Rpb24ge1xuICBjb25zdHJ1Y3Rvcihpbml0aWFsaXNlUmVzcG9uc2UpIHtcbiAgICB0aGlzLmluaXRpYWxpc2VSZXNwb25zZSA9IGluaXRpYWxpc2VSZXNwb25zZTtcbiAgfVxuXG4gIHRvSlNPTigpIHsgcmV0dXJuIHRoaXMuaW5pdGlhbGlzZVJlc3BvbnNlLnRvSlNPTigpOyB9XG5cbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcbiAgICBjb25zdCBjb250ZW50ID0gc2Vzc2lvbi5nZXRDb250ZW50KCksXG4gICAgICAgICAgdXNlcklkZW50aWZpZXIgPSBzZXNzaW9uLmNyZWF0ZVVzZXIoKSxcblx0XHRcdFx0XHRzZXNzaW9uSWRlbnRpZmllciA9IHNlc3Npb24uZ2V0SWRlbnRpZmllcigpLFxuICAgICAgICAgIGluaXRpYWxpc2VSZXNwb25zZSA9IEluaXRpYWxpc2VSZXNwb25zZS5mcm9tQ29udGVudFVzZXJJZGVudGlmaWVyQW5kU2Vzc2lvbklkZW50aWZpZXIoY29udGVudCwgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyKSxcbiAgICAgICAgICBpbml0aWFsaXNlVHJhbnNhY3Rpb24gPSBuZXcgSW5pdGlhbGlzZVRyYW5zYWN0aW9uKGluaXRpYWxpc2VSZXNwb25zZSk7XG5cbiAgICByZXR1cm4gaW5pdGlhbGlzZVRyYW5zYWN0aW9uO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSW5pdGlhbGlzZVRyYW5zYWN0aW9uO1xuIl19