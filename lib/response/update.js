'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var serialiseOperations = require('../operations/serialise');

var _toJSON = serialiseOperations.toJSON,
    _fromJSON = serialiseOperations.fromJSON;

var UpdateResponse = function () {
  function UpdateResponse(pendingOperations) {
    _classCallCheck(this, UpdateResponse);

    this.pendingOperations = pendingOperations;
  }

  _createClass(UpdateResponse, [{
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
        "pendingOperations": pendingOperations
      };

      return json;
    }
  }], [{
    key: 'fromJSON',
    value: function fromJSON(json) {
      var pendingOperationsJSON = json["pendingOperations"],
          pendingOperations = _fromJSON(pendingOperationsJSON),
          updateResponse = new UpdateResponse(pendingOperations);

      return updateResponse;
    }
  }, {
    key: 'fromPendingOperations',
    value: function fromPendingOperations(pendingOperations) {
      var updateResponse = new UpdateResponse(pendingOperations);

      return updateResponse;
    }
  }]);

  return UpdateResponse;
}();

module.exports = UpdateResponse;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9yZXNwb25zZS91cGRhdGUuanMiXSwibmFtZXMiOlsic2VyaWFsaXNlT3BlcmF0aW9ucyIsInJlcXVpcmUiLCJ0b0pTT04iLCJmcm9tSlNPTiIsIlVwZGF0ZVJlc3BvbnNlIiwicGVuZGluZ09wZXJhdGlvbnMiLCJwZW5kaW5nT3BlcmF0aW9uc0pTT04iLCJqc29uIiwidXBkYXRlUmVzcG9uc2UiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBRUEsSUFBTUEsc0JBQXNCQyxRQUFRLHlCQUFSLENBQTVCOztJQUVRQyxPLEdBQXFCRixtQixDQUFyQkUsTTtJQUFRQyxTLEdBQWFILG1CLENBQWJHLFE7O0lBRVZDLGM7QUFDSiwwQkFBWUMsaUJBQVosRUFBK0I7QUFBQTs7QUFDN0IsU0FBS0EsaUJBQUwsR0FBeUJBLGlCQUF6QjtBQUNEOzs7OzJDQUVzQjtBQUNyQixhQUFPLEtBQUtBLGlCQUFaO0FBQ0Q7Ozs2QkFFUTtBQUNQLFVBQU1DLHdCQUF3QkosUUFBTyxLQUFLRyxpQkFBWixDQUE5QjtBQUFBLFVBQ01BLG9CQUFvQkMscUJBRDFCO0FBQUEsVUFDa0Q7QUFDNUNDLGFBQU87QUFDTCw2QkFBcUJGO0FBRGhCLE9BRmI7O0FBTUEsYUFBT0UsSUFBUDtBQUNEOzs7NkJBRWVBLEksRUFBTTtBQUNwQixVQUFNRCx3QkFBd0JDLEtBQUssbUJBQUwsQ0FBOUI7QUFBQSxVQUNNRixvQkFBb0JGLFVBQVNHLHFCQUFULENBRDFCO0FBQUEsVUFFTUUsaUJBQWlCLElBQUlKLGNBQUosQ0FBbUJDLGlCQUFuQixDQUZ2Qjs7QUFJQSxhQUFPRyxjQUFQO0FBQ0Q7OzswQ0FFNEJILGlCLEVBQW1CO0FBQzlDLFVBQU1HLGlCQUFpQixJQUFJSixjQUFKLENBQW1CQyxpQkFBbkIsQ0FBdkI7O0FBRUEsYUFBT0csY0FBUDtBQUNEOzs7Ozs7QUFHSEMsT0FBT0MsT0FBUCxHQUFpQk4sY0FBakIiLCJmaWxlIjoidXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBzZXJpYWxpc2VPcGVyYXRpb25zID0gcmVxdWlyZSgnLi4vb3BlcmF0aW9ucy9zZXJpYWxpc2UnKTtcblxuY29uc3QgeyB0b0pTT04sIGZyb21KU09OIH0gPSBzZXJpYWxpc2VPcGVyYXRpb25zO1xuXG5jbGFzcyBVcGRhdGVSZXNwb25zZSB7XG4gIGNvbnN0cnVjdG9yKHBlbmRpbmdPcGVyYXRpb25zKSB7XG4gICAgdGhpcy5wZW5kaW5nT3BlcmF0aW9ucyA9IHBlbmRpbmdPcGVyYXRpb25zO1xuICB9XG5cbiAgZ2V0UGVuZGluZ09wZXJhdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMucGVuZGluZ09wZXJhdGlvbnM7XG4gIH1cblxuICB0b0pTT04oKSB7XG4gICAgY29uc3QgcGVuZGluZ09wZXJhdGlvbnNKU09OID0gdG9KU09OKHRoaXMucGVuZGluZ09wZXJhdGlvbnMpLFxuICAgICAgICAgIHBlbmRpbmdPcGVyYXRpb25zID0gcGVuZGluZ09wZXJhdGlvbnNKU09OLCAgLy8vXG4gICAgICAgICAganNvbiA9IHtcbiAgICAgICAgICAgIFwicGVuZGluZ09wZXJhdGlvbnNcIjogcGVuZGluZ09wZXJhdGlvbnNcbiAgICAgICAgICB9O1xuXG4gICAgcmV0dXJuIGpzb247XG4gIH1cblxuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xuICAgIGNvbnN0IHBlbmRpbmdPcGVyYXRpb25zSlNPTiA9IGpzb25bXCJwZW5kaW5nT3BlcmF0aW9uc1wiXSxcbiAgICAgICAgICBwZW5kaW5nT3BlcmF0aW9ucyA9IGZyb21KU09OKHBlbmRpbmdPcGVyYXRpb25zSlNPTiksXG4gICAgICAgICAgdXBkYXRlUmVzcG9uc2UgPSBuZXcgVXBkYXRlUmVzcG9uc2UocGVuZGluZ09wZXJhdGlvbnMpO1xuXG4gICAgcmV0dXJuIHVwZGF0ZVJlc3BvbnNlO1xuICB9XG5cbiAgc3RhdGljIGZyb21QZW5kaW5nT3BlcmF0aW9ucyhwZW5kaW5nT3BlcmF0aW9ucykge1xuICAgIGNvbnN0IHVwZGF0ZVJlc3BvbnNlID0gbmV3IFVwZGF0ZVJlc3BvbnNlKHBlbmRpbmdPcGVyYXRpb25zKTtcblxuICAgIHJldHVybiB1cGRhdGVSZXNwb25zZTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFVwZGF0ZVJlc3BvbnNlO1xuIl19