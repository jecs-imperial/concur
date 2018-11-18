'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var operationsToJSON = require('../operations/toJSON'),
    operationsFromJSON = require('../operations/fromJSON');

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
      var pendingOperationsJSON = operationsToJSON(this.pendingOperations),
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
      pendingOperations = operationsFromJSON(pendingOperationsJSON),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9yZXNwb25zZS91cGRhdGUuanMiXSwibmFtZXMiOlsib3BlcmF0aW9uc1RvSlNPTiIsInJlcXVpcmUiLCJvcGVyYXRpb25zRnJvbUpTT04iLCJVcGRhdGVSZXNwb25zZSIsInNlc3Npb25FeHBpcmVkIiwicGVuZGluZ09wZXJhdGlvbnMiLCJwZW5kaW5nT3BlcmF0aW9uc0pTT04iLCJqc29uIiwic2Vzc2lvbkV4cGlyZWRKU09OIiwidXBkYXRlUmVzcG9uc2UiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBRUEsSUFBTUEsbUJBQW1CQyxRQUFRLHNCQUFSLENBQXpCO0FBQUEsSUFDTUMscUJBQXFCRCxRQUFRLHdCQUFSLENBRDNCOztJQUdNRSxjO0FBQ0osMEJBQVlDLGNBQVosRUFBNEJDLGlCQUE1QixFQUErQztBQUFBOztBQUM5QyxTQUFLRCxjQUFMLEdBQXNCQSxjQUF0QjtBQUNDLFNBQUtDLGlCQUFMLEdBQXlCQSxpQkFBekI7QUFDRDs7Ozt3Q0FFbUI7QUFDbkIsYUFBTyxLQUFLRCxjQUFaO0FBQ0Q7OzsyQ0FFdUI7QUFDckIsYUFBTyxLQUFLQyxpQkFBWjtBQUNEOzs7NkJBRVE7QUFDUCxVQUFNQyx3QkFBd0JOLGlCQUFpQixLQUFLSyxpQkFBdEIsQ0FBOUI7QUFBQSxVQUNNQSxvQkFBb0JDLHFCQUQxQjtBQUFBLFVBQ2tEO0FBQzVDQyxhQUFPO0FBQ1QsMEJBQWtCLEtBQUtILGNBRGQ7QUFFTCw2QkFBcUJDO0FBRmhCLE9BRmI7O0FBT0EsYUFBT0UsSUFBUDtBQUNEOzs7NkJBRWVBLEksRUFBTTtBQUNwQixVQUFNQyxxQkFBcUJELEtBQUssZ0JBQUwsQ0FBM0I7QUFBQSxVQUNDRCx3QkFBd0JDLEtBQUssbUJBQUwsQ0FEekI7QUFBQSxVQUVDSCxpQkFBaUJJLGtCQUZsQjtBQUFBLFVBRXNDO0FBQ3JDSCwwQkFBb0JILG1CQUFtQkkscUJBQW5CLENBSHJCO0FBQUEsVUFJTUcsaUJBQWlCLElBQUlOLGNBQUosQ0FBbUJDLGNBQW5CLEVBQW1DQyxpQkFBbkMsQ0FKdkI7O0FBTUEsYUFBT0ksY0FBUDtBQUNEOzs7MkRBRTZDTCxjLEVBQWdCQyxpQixFQUFtQjtBQUMvRSxVQUFNSSxpQkFBaUIsSUFBSU4sY0FBSixDQUFtQkMsY0FBbkIsRUFBbUNDLGlCQUFuQyxDQUF2Qjs7QUFFQSxhQUFPSSxjQUFQO0FBQ0Q7Ozs7OztBQUdIQyxPQUFPQyxPQUFQLEdBQWlCUixjQUFqQiIsImZpbGUiOiJ1cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IG9wZXJhdGlvbnNUb0pTT04gPSByZXF1aXJlKCcuLi9vcGVyYXRpb25zL3RvSlNPTicpLFxuICAgICAgb3BlcmF0aW9uc0Zyb21KU09OID0gcmVxdWlyZSgnLi4vb3BlcmF0aW9ucy9mcm9tSlNPTicpO1xuXG5jbGFzcyBVcGRhdGVSZXNwb25zZSB7XG4gIGNvbnN0cnVjdG9yKHNlc3Npb25FeHBpcmVkLCBwZW5kaW5nT3BlcmF0aW9ucykge1xuICBcdHRoaXMuc2Vzc2lvbkV4cGlyZWQgPSBzZXNzaW9uRXhwaXJlZDtcbiAgICB0aGlzLnBlbmRpbmdPcGVyYXRpb25zID0gcGVuZGluZ09wZXJhdGlvbnM7XG4gIH1cblxuICBnZXRTZXNzaW9uRXhwaXJlZCgpIHtcbiAgXHRyZXR1cm4gdGhpcy5zZXNzaW9uRXhwaXJlZDtcblx0fVxuXG4gIGdldFBlbmRpbmdPcGVyYXRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLnBlbmRpbmdPcGVyYXRpb25zO1xuICB9XG5cbiAgdG9KU09OKCkge1xuICAgIGNvbnN0IHBlbmRpbmdPcGVyYXRpb25zSlNPTiA9IG9wZXJhdGlvbnNUb0pTT04odGhpcy5wZW5kaW5nT3BlcmF0aW9ucyksXG4gICAgICAgICAgcGVuZGluZ09wZXJhdGlvbnMgPSBwZW5kaW5nT3BlcmF0aW9uc0pTT04sICAvLy9cbiAgICAgICAgICBqc29uID0ge1xuICAgIFx0XHRcdFx0XCJzZXNzaW9uRXhwaXJlZFwiOiB0aGlzLnNlc3Npb25FeHBpcmVkLFxuICAgICAgICAgICAgXCJwZW5kaW5nT3BlcmF0aW9uc1wiOiBwZW5kaW5nT3BlcmF0aW9uc1xuICAgICAgICAgIH07XG5cbiAgICByZXR1cm4ganNvbjtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XG4gICAgY29uc3Qgc2Vzc2lvbkV4cGlyZWRKU09OID0ganNvbltcInNlc3Npb25FeHBpcmVkXCJdLFxuXHRcdFx0XHRcdHBlbmRpbmdPcGVyYXRpb25zSlNPTiA9IGpzb25bXCJwZW5kaW5nT3BlcmF0aW9uc1wiXSxcblx0XHRcdFx0XHRzZXNzaW9uRXhwaXJlZCA9IHNlc3Npb25FeHBpcmVkSlNPTixcdC8vL1xuXHRcdFx0XHRcdHBlbmRpbmdPcGVyYXRpb25zID0gb3BlcmF0aW9uc0Zyb21KU09OKHBlbmRpbmdPcGVyYXRpb25zSlNPTiksXG4gICAgICAgICAgdXBkYXRlUmVzcG9uc2UgPSBuZXcgVXBkYXRlUmVzcG9uc2Uoc2Vzc2lvbkV4cGlyZWQsIHBlbmRpbmdPcGVyYXRpb25zKTtcblxuICAgIHJldHVybiB1cGRhdGVSZXNwb25zZTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tU2Vzc2lvbkV4cGlyZWRBbmRQZW5kaW5nT3BlcmF0aW9ucyhzZXNzaW9uRXhwaXJlZCwgcGVuZGluZ09wZXJhdGlvbnMpIHtcbiAgICBjb25zdCB1cGRhdGVSZXNwb25zZSA9IG5ldyBVcGRhdGVSZXNwb25zZShzZXNzaW9uRXhwaXJlZCwgcGVuZGluZ09wZXJhdGlvbnMpO1xuXG4gICAgcmV0dXJuIHVwZGF0ZVJlc3BvbnNlO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVXBkYXRlUmVzcG9uc2U7XG4iXX0=