'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var session = require('../session'),
    UpdateRequest = require('../request/update'),
    UpdateResponse = require('../response/update');

var UpdateTransaction = function () {
  function UpdateTransaction(updateResponse) {
    _classCallCheck(this, UpdateTransaction);

    this.updateResponse = updateResponse;
  }

  _createClass(UpdateTransaction, [{
    key: 'toJSON',
    value: function toJSON() {
      return this.updateResponse.toJSON();
    }
  }], [{
    key: 'fromJSON',
    value: function fromJSON(json) {
      var updateRequest = UpdateRequest.fromJSON(json),
          operations = updateRequest.getOperations(),
          userIdentifier = updateRequest.getUserIdentifier(),
          sessionIdentifier = updateRequest.getSessionIdentifier(),
          sessionExpired = session.hasExpired(sessionIdentifier),
          pendingOperations = session.update(operations, userIdentifier, sessionExpired),
          updateResponse = UpdateResponse.fromSessionExpiredAndPendingOperations(sessionExpired, pendingOperations),
          updateTransaction = new UpdateTransaction(updateResponse);

      return updateTransaction;
    }
  }]);

  return UpdateTransaction;
}();

module.exports = UpdateTransaction;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi90cmFuc2FjdGlvbi91cGRhdGUuanMiXSwibmFtZXMiOlsic2Vzc2lvbiIsInJlcXVpcmUiLCJVcGRhdGVSZXF1ZXN0IiwiVXBkYXRlUmVzcG9uc2UiLCJVcGRhdGVUcmFuc2FjdGlvbiIsInVwZGF0ZVJlc3BvbnNlIiwidG9KU09OIiwianNvbiIsInVwZGF0ZVJlcXVlc3QiLCJmcm9tSlNPTiIsIm9wZXJhdGlvbnMiLCJnZXRPcGVyYXRpb25zIiwidXNlcklkZW50aWZpZXIiLCJnZXRVc2VySWRlbnRpZmllciIsInNlc3Npb25JZGVudGlmaWVyIiwiZ2V0U2Vzc2lvbklkZW50aWZpZXIiLCJzZXNzaW9uRXhwaXJlZCIsImhhc0V4cGlyZWQiLCJwZW5kaW5nT3BlcmF0aW9ucyIsInVwZGF0ZSIsImZyb21TZXNzaW9uRXhwaXJlZEFuZFBlbmRpbmdPcGVyYXRpb25zIiwidXBkYXRlVHJhbnNhY3Rpb24iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBRUEsSUFBTUEsVUFBVUMsUUFBUSxZQUFSLENBQWhCO0FBQUEsSUFDTUMsZ0JBQWdCRCxRQUFRLG1CQUFSLENBRHRCO0FBQUEsSUFFTUUsaUJBQWlCRixRQUFRLG9CQUFSLENBRnZCOztJQUlNRyxpQjtBQUNKLDZCQUFZQyxjQUFaLEVBQTRCO0FBQUE7O0FBQzFCLFNBQUtBLGNBQUwsR0FBc0JBLGNBQXRCO0FBQ0Q7Ozs7NkJBRVE7QUFBRSxhQUFPLEtBQUtBLGNBQUwsQ0FBb0JDLE1BQXBCLEVBQVA7QUFBc0M7Ozs2QkFFakNDLEksRUFBTTtBQUNwQixVQUFNQyxnQkFBZ0JOLGNBQWNPLFFBQWQsQ0FBdUJGLElBQXZCLENBQXRCO0FBQUEsVUFDTUcsYUFBYUYsY0FBY0csYUFBZCxFQURuQjtBQUFBLFVBRU1DLGlCQUFpQkosY0FBY0ssaUJBQWQsRUFGdkI7QUFBQSxVQUdDQyxvQkFBb0JOLGNBQWNPLG9CQUFkLEVBSHJCO0FBQUEsVUFJQ0MsaUJBQWlCaEIsUUFBUWlCLFVBQVIsQ0FBbUJILGlCQUFuQixDQUpsQjtBQUFBLFVBS0NJLG9CQUFvQmxCLFFBQVFtQixNQUFSLENBQWVULFVBQWYsRUFBMkJFLGNBQTNCLEVBQTJDSSxjQUEzQyxDQUxyQjtBQUFBLFVBTU1YLGlCQUFpQkYsZUFBZWlCLHNDQUFmLENBQXNESixjQUF0RCxFQUFzRUUsaUJBQXRFLENBTnZCO0FBQUEsVUFPTUcsb0JBQW9CLElBQUlqQixpQkFBSixDQUFzQkMsY0FBdEIsQ0FQMUI7O0FBU0EsYUFBT2dCLGlCQUFQO0FBQ0Q7Ozs7OztBQUdIQyxPQUFPQyxPQUFQLEdBQWlCbkIsaUJBQWpCIiwiZmlsZSI6InVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3Qgc2Vzc2lvbiA9IHJlcXVpcmUoJy4uL3Nlc3Npb24nKSxcbiAgICAgIFVwZGF0ZVJlcXVlc3QgPSByZXF1aXJlKCcuLi9yZXF1ZXN0L3VwZGF0ZScpLFxuICAgICAgVXBkYXRlUmVzcG9uc2UgPSByZXF1aXJlKCcuLi9yZXNwb25zZS91cGRhdGUnKTtcblxuY2xhc3MgVXBkYXRlVHJhbnNhY3Rpb24ge1xuICBjb25zdHJ1Y3Rvcih1cGRhdGVSZXNwb25zZSkge1xuICAgIHRoaXMudXBkYXRlUmVzcG9uc2UgPSB1cGRhdGVSZXNwb25zZTtcbiAgfVxuXG4gIHRvSlNPTigpIHsgcmV0dXJuIHRoaXMudXBkYXRlUmVzcG9uc2UudG9KU09OKCk7IH1cblxuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xuICAgIGNvbnN0IHVwZGF0ZVJlcXVlc3QgPSBVcGRhdGVSZXF1ZXN0LmZyb21KU09OKGpzb24pLFxuICAgICAgICAgIG9wZXJhdGlvbnMgPSB1cGRhdGVSZXF1ZXN0LmdldE9wZXJhdGlvbnMoKSxcbiAgICAgICAgICB1c2VySWRlbnRpZmllciA9IHVwZGF0ZVJlcXVlc3QuZ2V0VXNlcklkZW50aWZpZXIoKSxcblx0XHRcdFx0XHRzZXNzaW9uSWRlbnRpZmllciA9IHVwZGF0ZVJlcXVlc3QuZ2V0U2Vzc2lvbklkZW50aWZpZXIoKSxcblx0XHRcdFx0XHRzZXNzaW9uRXhwaXJlZCA9IHNlc3Npb24uaGFzRXhwaXJlZChzZXNzaW9uSWRlbnRpZmllciksXG5cdFx0XHRcdFx0cGVuZGluZ09wZXJhdGlvbnMgPSBzZXNzaW9uLnVwZGF0ZShvcGVyYXRpb25zLCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbkV4cGlyZWQpLFxuICAgICAgICAgIHVwZGF0ZVJlc3BvbnNlID0gVXBkYXRlUmVzcG9uc2UuZnJvbVNlc3Npb25FeHBpcmVkQW5kUGVuZGluZ09wZXJhdGlvbnMoc2Vzc2lvbkV4cGlyZWQsIHBlbmRpbmdPcGVyYXRpb25zKSxcbiAgICAgICAgICB1cGRhdGVUcmFuc2FjdGlvbiA9IG5ldyBVcGRhdGVUcmFuc2FjdGlvbih1cGRhdGVSZXNwb25zZSk7XG5cbiAgICByZXR1cm4gdXBkYXRlVHJhbnNhY3Rpb247XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBVcGRhdGVUcmFuc2FjdGlvbjtcbiJdfQ==