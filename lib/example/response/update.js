'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var operationsToJSON = require('../../operations/toJSON'),
    operationsFromJSON = require('../../operations/fromJSON');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leGFtcGxlL3Jlc3BvbnNlL3VwZGF0ZS5qcyJdLCJuYW1lcyI6WyJvcGVyYXRpb25zVG9KU09OIiwicmVxdWlyZSIsIm9wZXJhdGlvbnNGcm9tSlNPTiIsIlVwZGF0ZVJlc3BvbnNlIiwic2Vzc2lvbkV4cGlyZWQiLCJwZW5kaW5nT3BlcmF0aW9ucyIsInBlbmRpbmdPcGVyYXRpb25zSlNPTiIsImpzb24iLCJzZXNzaW9uRXhwaXJlZEpTT04iLCJ1cGRhdGVSZXNwb25zZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFFQSxJQUFNQSxtQkFBbUJDLFFBQVEseUJBQVIsQ0FBekI7QUFBQSxJQUNNQyxxQkFBcUJELFFBQVEsMkJBQVIsQ0FEM0I7O0lBR01FLGM7QUFDSiwwQkFBWUMsY0FBWixFQUE0QkMsaUJBQTVCLEVBQStDO0FBQUE7O0FBQzlDLFNBQUtELGNBQUwsR0FBc0JBLGNBQXRCO0FBQ0MsU0FBS0MsaUJBQUwsR0FBeUJBLGlCQUF6QjtBQUNEOzs7O3dDQUVtQjtBQUNuQixhQUFPLEtBQUtELGNBQVo7QUFDRDs7OzJDQUV1QjtBQUNyQixhQUFPLEtBQUtDLGlCQUFaO0FBQ0Q7Ozs2QkFFUTtBQUNQLFVBQU1DLHdCQUF3Qk4saUJBQWlCLEtBQUtLLGlCQUF0QixDQUE5QjtBQUFBLFVBQ01BLG9CQUFvQkMscUJBRDFCO0FBQUEsVUFDa0Q7QUFDNUNDLGFBQU87QUFDVCwwQkFBa0IsS0FBS0gsY0FEZDtBQUVMLDZCQUFxQkM7QUFGaEIsT0FGYjs7QUFPQSxhQUFPRSxJQUFQO0FBQ0Q7Ozs2QkFFZUEsSSxFQUFNO0FBQ3BCLFVBQU1DLHFCQUFxQkQsS0FBSyxnQkFBTCxDQUEzQjtBQUFBLFVBQ0NELHdCQUF3QkMsS0FBSyxtQkFBTCxDQUR6QjtBQUFBLFVBRUNILGlCQUFpQkksa0JBRmxCO0FBQUEsVUFFc0M7QUFDckNILDBCQUFvQkgsbUJBQW1CSSxxQkFBbkIsQ0FIckI7QUFBQSxVQUlNRyxpQkFBaUIsSUFBSU4sY0FBSixDQUFtQkMsY0FBbkIsRUFBbUNDLGlCQUFuQyxDQUp2Qjs7QUFNQSxhQUFPSSxjQUFQO0FBQ0Q7OzsyREFFNkNMLGMsRUFBZ0JDLGlCLEVBQW1CO0FBQy9FLFVBQU1JLGlCQUFpQixJQUFJTixjQUFKLENBQW1CQyxjQUFuQixFQUFtQ0MsaUJBQW5DLENBQXZCOztBQUVBLGFBQU9JLGNBQVA7QUFDRDs7Ozs7O0FBR0hDLE9BQU9DLE9BQVAsR0FBaUJSLGNBQWpCIiwiZmlsZSI6InVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3Qgb3BlcmF0aW9uc1RvSlNPTiA9IHJlcXVpcmUoJy4uLy4uL29wZXJhdGlvbnMvdG9KU09OJyksXG4gICAgICBvcGVyYXRpb25zRnJvbUpTT04gPSByZXF1aXJlKCcuLi8uLi9vcGVyYXRpb25zL2Zyb21KU09OJyk7XG5cbmNsYXNzIFVwZGF0ZVJlc3BvbnNlIHtcbiAgY29uc3RydWN0b3Ioc2Vzc2lvbkV4cGlyZWQsIHBlbmRpbmdPcGVyYXRpb25zKSB7XG4gIFx0dGhpcy5zZXNzaW9uRXhwaXJlZCA9IHNlc3Npb25FeHBpcmVkO1xuICAgIHRoaXMucGVuZGluZ09wZXJhdGlvbnMgPSBwZW5kaW5nT3BlcmF0aW9ucztcbiAgfVxuXG4gIGdldFNlc3Npb25FeHBpcmVkKCkge1xuICBcdHJldHVybiB0aGlzLnNlc3Npb25FeHBpcmVkO1xuXHR9XG5cbiAgZ2V0UGVuZGluZ09wZXJhdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMucGVuZGluZ09wZXJhdGlvbnM7XG4gIH1cblxuICB0b0pTT04oKSB7XG4gICAgY29uc3QgcGVuZGluZ09wZXJhdGlvbnNKU09OID0gb3BlcmF0aW9uc1RvSlNPTih0aGlzLnBlbmRpbmdPcGVyYXRpb25zKSxcbiAgICAgICAgICBwZW5kaW5nT3BlcmF0aW9ucyA9IHBlbmRpbmdPcGVyYXRpb25zSlNPTiwgIC8vL1xuICAgICAgICAgIGpzb24gPSB7XG4gICAgXHRcdFx0XHRcInNlc3Npb25FeHBpcmVkXCI6IHRoaXMuc2Vzc2lvbkV4cGlyZWQsXG4gICAgICAgICAgICBcInBlbmRpbmdPcGVyYXRpb25zXCI6IHBlbmRpbmdPcGVyYXRpb25zXG4gICAgICAgICAgfTtcblxuICAgIHJldHVybiBqc29uO1xuICB9XG5cbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcbiAgICBjb25zdCBzZXNzaW9uRXhwaXJlZEpTT04gPSBqc29uW1wic2Vzc2lvbkV4cGlyZWRcIl0sXG5cdFx0XHRcdFx0cGVuZGluZ09wZXJhdGlvbnNKU09OID0ganNvbltcInBlbmRpbmdPcGVyYXRpb25zXCJdLFxuXHRcdFx0XHRcdHNlc3Npb25FeHBpcmVkID0gc2Vzc2lvbkV4cGlyZWRKU09OLFx0Ly8vXG5cdFx0XHRcdFx0cGVuZGluZ09wZXJhdGlvbnMgPSBvcGVyYXRpb25zRnJvbUpTT04ocGVuZGluZ09wZXJhdGlvbnNKU09OKSxcbiAgICAgICAgICB1cGRhdGVSZXNwb25zZSA9IG5ldyBVcGRhdGVSZXNwb25zZShzZXNzaW9uRXhwaXJlZCwgcGVuZGluZ09wZXJhdGlvbnMpO1xuXG4gICAgcmV0dXJuIHVwZGF0ZVJlc3BvbnNlO1xuICB9XG5cbiAgc3RhdGljIGZyb21TZXNzaW9uRXhwaXJlZEFuZFBlbmRpbmdPcGVyYXRpb25zKHNlc3Npb25FeHBpcmVkLCBwZW5kaW5nT3BlcmF0aW9ucykge1xuICAgIGNvbnN0IHVwZGF0ZVJlc3BvbnNlID0gbmV3IFVwZGF0ZVJlc3BvbnNlKHNlc3Npb25FeHBpcmVkLCBwZW5kaW5nT3BlcmF0aW9ucyk7XG5cbiAgICByZXR1cm4gdXBkYXRlUmVzcG9uc2U7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBVcGRhdGVSZXNwb25zZTtcbiJdfQ==