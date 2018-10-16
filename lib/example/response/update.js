'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var serialiseOperations = require('../../operations/serialise');

var _toJSON = serialiseOperations.toJSON,
    _fromJSON = serialiseOperations.fromJSON;

var UpdateResponse = function () {
  function UpdateResponse(sessionExpired, pendingOperations) {
    _classCallCheck(this, UpdateResponse);

    this.sessionExpired = sessionExpired;
    this.pendingOperations = pendingOperations;
  }

  _createClass(UpdateResponse, [{
    key: 'getSessionExpired',
    value: function getSessionExpired() {
      return this.sessionExpired;
    }
  }, {
    key: 'getPendingOperations',
    value: function getPendingOperations() {
      return this.pendingOperations;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var pendingOperationsJSON = _toJSON(this.pendingOperations),
          pendingOperations = pendingOperationsJSON,
          ///
      json = {
        "sessionExpired": this.sessionExpired,
        "pendingOperations": pendingOperations
      };

      return json;
    }
  }], [{
    key: 'fromJSON',
    value: function fromJSON(json) {
      var sessionExpiredJSON = json["sessionExpired"],
          pendingOperationsJSON = json["pendingOperations"],
          sessionExpired = sessionExpiredJSON,
          ///
      pendingOperations = _fromJSON(pendingOperationsJSON),
          updateResponse = new UpdateResponse(sessionExpired, pendingOperations);

      return updateResponse;
    }
  }, {
    key: 'fromSessionExpiredAndPendingOperations',
    value: function fromSessionExpiredAndPendingOperations(sessionExpired, pendingOperations) {
      var updateResponse = new UpdateResponse(sessionExpired, pendingOperations);

      return updateResponse;
    }
  }]);

  return UpdateResponse;
}();

module.exports = UpdateResponse;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leGFtcGxlL3Jlc3BvbnNlL3VwZGF0ZS5qcyJdLCJuYW1lcyI6WyJzZXJpYWxpc2VPcGVyYXRpb25zIiwicmVxdWlyZSIsInRvSlNPTiIsImZyb21KU09OIiwiVXBkYXRlUmVzcG9uc2UiLCJzZXNzaW9uRXhwaXJlZCIsInBlbmRpbmdPcGVyYXRpb25zIiwicGVuZGluZ09wZXJhdGlvbnNKU09OIiwianNvbiIsInNlc3Npb25FeHBpcmVkSlNPTiIsInVwZGF0ZVJlc3BvbnNlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBLElBQU1BLHNCQUFzQkMsUUFBUSw0QkFBUixDQUE1Qjs7SUFFUUMsTyxHQUFxQkYsbUIsQ0FBckJFLE07SUFBUUMsUyxHQUFhSCxtQixDQUFiRyxROztJQUVWQyxjO0FBQ0osMEJBQVlDLGNBQVosRUFBNEJDLGlCQUE1QixFQUErQztBQUFBOztBQUM5QyxTQUFLRCxjQUFMLEdBQXNCQSxjQUF0QjtBQUNDLFNBQUtDLGlCQUFMLEdBQXlCQSxpQkFBekI7QUFDRDs7Ozt3Q0FFbUI7QUFDbkIsYUFBTyxLQUFLRCxjQUFaO0FBQ0Q7OzsyQ0FFdUI7QUFDckIsYUFBTyxLQUFLQyxpQkFBWjtBQUNEOzs7NkJBRVE7QUFDUCxVQUFNQyx3QkFBd0JMLFFBQU8sS0FBS0ksaUJBQVosQ0FBOUI7QUFBQSxVQUNNQSxvQkFBb0JDLHFCQUQxQjtBQUFBLFVBQ2tEO0FBQzVDQyxhQUFPO0FBQ1QsMEJBQWtCLEtBQUtILGNBRGQ7QUFFTCw2QkFBcUJDO0FBRmhCLE9BRmI7O0FBT0EsYUFBT0UsSUFBUDtBQUNEOzs7NkJBRWVBLEksRUFBTTtBQUNwQixVQUFNQyxxQkFBcUJELEtBQUssZ0JBQUwsQ0FBM0I7QUFBQSxVQUNDRCx3QkFBd0JDLEtBQUssbUJBQUwsQ0FEekI7QUFBQSxVQUVDSCxpQkFBaUJJLGtCQUZsQjtBQUFBLFVBRXNDO0FBQ3JDSCwwQkFBb0JILFVBQVNJLHFCQUFULENBSHJCO0FBQUEsVUFJTUcsaUJBQWlCLElBQUlOLGNBQUosQ0FBbUJDLGNBQW5CLEVBQW1DQyxpQkFBbkMsQ0FKdkI7O0FBTUEsYUFBT0ksY0FBUDtBQUNEOzs7MkRBRTZDTCxjLEVBQWdCQyxpQixFQUFtQjtBQUMvRSxVQUFNSSxpQkFBaUIsSUFBSU4sY0FBSixDQUFtQkMsY0FBbkIsRUFBbUNDLGlCQUFuQyxDQUF2Qjs7QUFFQSxhQUFPSSxjQUFQO0FBQ0Q7Ozs7OztBQUdIQyxPQUFPQyxPQUFQLEdBQWlCUixjQUFqQiIsImZpbGUiOiJ1cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHNlcmlhbGlzZU9wZXJhdGlvbnMgPSByZXF1aXJlKCcuLi8uLi9vcGVyYXRpb25zL3NlcmlhbGlzZScpO1xuXG5jb25zdCB7IHRvSlNPTiwgZnJvbUpTT04gfSA9IHNlcmlhbGlzZU9wZXJhdGlvbnM7XG5cbmNsYXNzIFVwZGF0ZVJlc3BvbnNlIHtcbiAgY29uc3RydWN0b3Ioc2Vzc2lvbkV4cGlyZWQsIHBlbmRpbmdPcGVyYXRpb25zKSB7XG4gIFx0dGhpcy5zZXNzaW9uRXhwaXJlZCA9IHNlc3Npb25FeHBpcmVkO1xuICAgIHRoaXMucGVuZGluZ09wZXJhdGlvbnMgPSBwZW5kaW5nT3BlcmF0aW9ucztcbiAgfVxuXG4gIGdldFNlc3Npb25FeHBpcmVkKCkge1xuICBcdHJldHVybiB0aGlzLnNlc3Npb25FeHBpcmVkO1xuXHR9XG5cbiAgZ2V0UGVuZGluZ09wZXJhdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMucGVuZGluZ09wZXJhdGlvbnM7XG4gIH1cblxuICB0b0pTT04oKSB7XG4gICAgY29uc3QgcGVuZGluZ09wZXJhdGlvbnNKU09OID0gdG9KU09OKHRoaXMucGVuZGluZ09wZXJhdGlvbnMpLFxuICAgICAgICAgIHBlbmRpbmdPcGVyYXRpb25zID0gcGVuZGluZ09wZXJhdGlvbnNKU09OLCAgLy8vXG4gICAgICAgICAganNvbiA9IHtcbiAgICBcdFx0XHRcdFwic2Vzc2lvbkV4cGlyZWRcIjogdGhpcy5zZXNzaW9uRXhwaXJlZCxcbiAgICAgICAgICAgIFwicGVuZGluZ09wZXJhdGlvbnNcIjogcGVuZGluZ09wZXJhdGlvbnNcbiAgICAgICAgICB9O1xuXG4gICAgcmV0dXJuIGpzb247XG4gIH1cblxuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xuICAgIGNvbnN0IHNlc3Npb25FeHBpcmVkSlNPTiA9IGpzb25bXCJzZXNzaW9uRXhwaXJlZFwiXSxcblx0XHRcdFx0XHRwZW5kaW5nT3BlcmF0aW9uc0pTT04gPSBqc29uW1wicGVuZGluZ09wZXJhdGlvbnNcIl0sXG5cdFx0XHRcdFx0c2Vzc2lvbkV4cGlyZWQgPSBzZXNzaW9uRXhwaXJlZEpTT04sXHQvLy9cblx0XHRcdFx0XHRwZW5kaW5nT3BlcmF0aW9ucyA9IGZyb21KU09OKHBlbmRpbmdPcGVyYXRpb25zSlNPTiksXG4gICAgICAgICAgdXBkYXRlUmVzcG9uc2UgPSBuZXcgVXBkYXRlUmVzcG9uc2Uoc2Vzc2lvbkV4cGlyZWQsIHBlbmRpbmdPcGVyYXRpb25zKTtcblxuICAgIHJldHVybiB1cGRhdGVSZXNwb25zZTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tU2Vzc2lvbkV4cGlyZWRBbmRQZW5kaW5nT3BlcmF0aW9ucyhzZXNzaW9uRXhwaXJlZCwgcGVuZGluZ09wZXJhdGlvbnMpIHtcbiAgICBjb25zdCB1cGRhdGVSZXNwb25zZSA9IG5ldyBVcGRhdGVSZXNwb25zZShzZXNzaW9uRXhwaXJlZCwgcGVuZGluZ09wZXJhdGlvbnMpO1xuXG4gICAgcmV0dXJuIHVwZGF0ZVJlc3BvbnNlO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVXBkYXRlUmVzcG9uc2U7XG4iXX0=