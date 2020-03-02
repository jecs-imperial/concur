'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var operationsToJSON = require('../operations/toJSON'),
    operationsFromJSON = require('../operations/fromJSON');

var UpdateResponse = /*#__PURE__*/function () {
  function UpdateResponse(sessionExpired, pendingOperations) {
    _classCallCheck(this, UpdateResponse);

    this.sessionExpired = sessionExpired;
    this.pendingOperations = pendingOperations;
  }

  _createClass(UpdateResponse, [{
    key: "getSessionExpired",
    value: function getSessionExpired() {
      return this.sessionExpired;
    }
  }, {
    key: "getPendingOperations",
    value: function getPendingOperations() {
      return this.pendingOperations;
    }
  }, {
    key: "toJSON",
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
    key: "fromJSON",
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
    key: "fromSessionExpiredAndPendingOperations",
    value: function fromSessionExpiredAndPendingOperations(sessionExpired, pendingOperations) {
      var updateResponse = new UpdateResponse(sessionExpired, pendingOperations);
      return updateResponse;
    }
  }]);

  return UpdateResponse;
}();

module.exports = UpdateResponse;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVwZGF0ZS5qcyJdLCJuYW1lcyI6WyJvcGVyYXRpb25zVG9KU09OIiwicmVxdWlyZSIsIm9wZXJhdGlvbnNGcm9tSlNPTiIsIlVwZGF0ZVJlc3BvbnNlIiwic2Vzc2lvbkV4cGlyZWQiLCJwZW5kaW5nT3BlcmF0aW9ucyIsInBlbmRpbmdPcGVyYXRpb25zSlNPTiIsImpzb24iLCJzZXNzaW9uRXhwaXJlZEpTT04iLCJ1cGRhdGVSZXNwb25zZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQUVBLElBQU1BLGdCQUFnQixHQUFHQyxPQUFPLENBQUMsc0JBQUQsQ0FBaEM7QUFBQSxJQUNNQyxrQkFBa0IsR0FBR0QsT0FBTyxDQUFDLHdCQUFELENBRGxDOztJQUdNRSxjO0FBQ0osMEJBQVlDLGNBQVosRUFBNEJDLGlCQUE1QixFQUErQztBQUFBOztBQUM5QyxTQUFLRCxjQUFMLEdBQXNCQSxjQUF0QjtBQUNDLFNBQUtDLGlCQUFMLEdBQXlCQSxpQkFBekI7QUFDRDs7Ozt3Q0FFbUI7QUFDbkIsYUFBTyxLQUFLRCxjQUFaO0FBQ0Q7OzsyQ0FFdUI7QUFDckIsYUFBTyxLQUFLQyxpQkFBWjtBQUNEOzs7NkJBRVE7QUFDUCxVQUFNQyxxQkFBcUIsR0FBR04sZ0JBQWdCLENBQUMsS0FBS0ssaUJBQU4sQ0FBOUM7QUFBQSxVQUNNQSxpQkFBaUIsR0FBR0MscUJBRDFCO0FBQUEsVUFDa0Q7QUFDNUNDLE1BQUFBLElBQUksR0FBRztBQUNULDBCQUFrQixLQUFLSCxjQURkO0FBRUwsNkJBQXFCQztBQUZoQixPQUZiO0FBT0EsYUFBT0UsSUFBUDtBQUNEOzs7NkJBRWVBLEksRUFBTTtBQUNwQixVQUFNQyxrQkFBa0IsR0FBR0QsSUFBSSxDQUFDLGdCQUFELENBQS9CO0FBQUEsVUFDQ0QscUJBQXFCLEdBQUdDLElBQUksQ0FBQyxtQkFBRCxDQUQ3QjtBQUFBLFVBRUNILGNBQWMsR0FBR0ksa0JBRmxCO0FBQUEsVUFFc0M7QUFDckNILE1BQUFBLGlCQUFpQixHQUFHSCxrQkFBa0IsQ0FBQ0kscUJBQUQsQ0FIdkM7QUFBQSxVQUlNRyxjQUFjLEdBQUcsSUFBSU4sY0FBSixDQUFtQkMsY0FBbkIsRUFBbUNDLGlCQUFuQyxDQUp2QjtBQU1BLGFBQU9JLGNBQVA7QUFDRDs7OzJEQUU2Q0wsYyxFQUFnQkMsaUIsRUFBbUI7QUFDL0UsVUFBTUksY0FBYyxHQUFHLElBQUlOLGNBQUosQ0FBbUJDLGNBQW5CLEVBQW1DQyxpQkFBbkMsQ0FBdkI7QUFFQSxhQUFPSSxjQUFQO0FBQ0Q7Ozs7OztBQUdIQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJSLGNBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBvcGVyYXRpb25zVG9KU09OID0gcmVxdWlyZSgnLi4vb3BlcmF0aW9ucy90b0pTT04nKSxcbiAgICAgIG9wZXJhdGlvbnNGcm9tSlNPTiA9IHJlcXVpcmUoJy4uL29wZXJhdGlvbnMvZnJvbUpTT04nKTtcblxuY2xhc3MgVXBkYXRlUmVzcG9uc2Uge1xuICBjb25zdHJ1Y3RvcihzZXNzaW9uRXhwaXJlZCwgcGVuZGluZ09wZXJhdGlvbnMpIHtcbiAgXHR0aGlzLnNlc3Npb25FeHBpcmVkID0gc2Vzc2lvbkV4cGlyZWQ7XG4gICAgdGhpcy5wZW5kaW5nT3BlcmF0aW9ucyA9IHBlbmRpbmdPcGVyYXRpb25zO1xuICB9XG5cbiAgZ2V0U2Vzc2lvbkV4cGlyZWQoKSB7XG4gIFx0cmV0dXJuIHRoaXMuc2Vzc2lvbkV4cGlyZWQ7XG5cdH1cblxuICBnZXRQZW5kaW5nT3BlcmF0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5wZW5kaW5nT3BlcmF0aW9ucztcbiAgfVxuXG4gIHRvSlNPTigpIHtcbiAgICBjb25zdCBwZW5kaW5nT3BlcmF0aW9uc0pTT04gPSBvcGVyYXRpb25zVG9KU09OKHRoaXMucGVuZGluZ09wZXJhdGlvbnMpLFxuICAgICAgICAgIHBlbmRpbmdPcGVyYXRpb25zID0gcGVuZGluZ09wZXJhdGlvbnNKU09OLCAgLy8vXG4gICAgICAgICAganNvbiA9IHtcbiAgICBcdFx0XHRcdFwic2Vzc2lvbkV4cGlyZWRcIjogdGhpcy5zZXNzaW9uRXhwaXJlZCxcbiAgICAgICAgICAgIFwicGVuZGluZ09wZXJhdGlvbnNcIjogcGVuZGluZ09wZXJhdGlvbnNcbiAgICAgICAgICB9O1xuXG4gICAgcmV0dXJuIGpzb247XG4gIH1cblxuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xuICAgIGNvbnN0IHNlc3Npb25FeHBpcmVkSlNPTiA9IGpzb25bXCJzZXNzaW9uRXhwaXJlZFwiXSxcblx0XHRcdFx0XHRwZW5kaW5nT3BlcmF0aW9uc0pTT04gPSBqc29uW1wicGVuZGluZ09wZXJhdGlvbnNcIl0sXG5cdFx0XHRcdFx0c2Vzc2lvbkV4cGlyZWQgPSBzZXNzaW9uRXhwaXJlZEpTT04sXHQvLy9cblx0XHRcdFx0XHRwZW5kaW5nT3BlcmF0aW9ucyA9IG9wZXJhdGlvbnNGcm9tSlNPTihwZW5kaW5nT3BlcmF0aW9uc0pTT04pLFxuICAgICAgICAgIHVwZGF0ZVJlc3BvbnNlID0gbmV3IFVwZGF0ZVJlc3BvbnNlKHNlc3Npb25FeHBpcmVkLCBwZW5kaW5nT3BlcmF0aW9ucyk7XG5cbiAgICByZXR1cm4gdXBkYXRlUmVzcG9uc2U7XG4gIH1cblxuICBzdGF0aWMgZnJvbVNlc3Npb25FeHBpcmVkQW5kUGVuZGluZ09wZXJhdGlvbnMoc2Vzc2lvbkV4cGlyZWQsIHBlbmRpbmdPcGVyYXRpb25zKSB7XG4gICAgY29uc3QgdXBkYXRlUmVzcG9uc2UgPSBuZXcgVXBkYXRlUmVzcG9uc2Uoc2Vzc2lvbkV4cGlyZWQsIHBlbmRpbmdPcGVyYXRpb25zKTtcblxuICAgIHJldHVybiB1cGRhdGVSZXNwb25zZTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFVwZGF0ZVJlc3BvbnNlO1xuIl19