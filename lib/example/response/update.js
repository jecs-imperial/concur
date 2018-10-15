'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var serialiseOperations = require('../../operations/serialise');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leGFtcGxlL3Jlc3BvbnNlL3VwZGF0ZS5qcyJdLCJuYW1lcyI6WyJzZXJpYWxpc2VPcGVyYXRpb25zIiwicmVxdWlyZSIsInRvSlNPTiIsImZyb21KU09OIiwiVXBkYXRlUmVzcG9uc2UiLCJwZW5kaW5nT3BlcmF0aW9ucyIsInBlbmRpbmdPcGVyYXRpb25zSlNPTiIsImpzb24iLCJ1cGRhdGVSZXNwb25zZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFFQSxJQUFNQSxzQkFBc0JDLFFBQVEsNEJBQVIsQ0FBNUI7O0lBRVFDLE8sR0FBcUJGLG1CLENBQXJCRSxNO0lBQVFDLFMsR0FBYUgsbUIsQ0FBYkcsUTs7SUFFVkMsYztBQUNKLDBCQUFZQyxpQkFBWixFQUErQjtBQUFBOztBQUM3QixTQUFLQSxpQkFBTCxHQUF5QkEsaUJBQXpCO0FBQ0Q7Ozs7MkNBRXNCO0FBQ3JCLGFBQU8sS0FBS0EsaUJBQVo7QUFDRDs7OzZCQUVRO0FBQ1AsVUFBTUMsd0JBQXdCSixRQUFPLEtBQUtHLGlCQUFaLENBQTlCO0FBQUEsVUFDTUEsb0JBQW9CQyxxQkFEMUI7QUFBQSxVQUNrRDtBQUM1Q0MsYUFBTztBQUNMLDZCQUFxQkY7QUFEaEIsT0FGYjs7QUFNQSxhQUFPRSxJQUFQO0FBQ0Q7Ozs2QkFFZUEsSSxFQUFNO0FBQ3BCLFVBQU1ELHdCQUF3QkMsS0FBSyxtQkFBTCxDQUE5QjtBQUFBLFVBQ01GLG9CQUFvQkYsVUFBU0cscUJBQVQsQ0FEMUI7QUFBQSxVQUVNRSxpQkFBaUIsSUFBSUosY0FBSixDQUFtQkMsaUJBQW5CLENBRnZCOztBQUlBLGFBQU9HLGNBQVA7QUFDRDs7OzBDQUU0QkgsaUIsRUFBbUI7QUFDOUMsVUFBTUcsaUJBQWlCLElBQUlKLGNBQUosQ0FBbUJDLGlCQUFuQixDQUF2Qjs7QUFFQSxhQUFPRyxjQUFQO0FBQ0Q7Ozs7OztBQUdIQyxPQUFPQyxPQUFQLEdBQWlCTixjQUFqQiIsImZpbGUiOiJ1cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHNlcmlhbGlzZU9wZXJhdGlvbnMgPSByZXF1aXJlKCcuLi8uLi9vcGVyYXRpb25zL3NlcmlhbGlzZScpO1xuXG5jb25zdCB7IHRvSlNPTiwgZnJvbUpTT04gfSA9IHNlcmlhbGlzZU9wZXJhdGlvbnM7XG5cbmNsYXNzIFVwZGF0ZVJlc3BvbnNlIHtcbiAgY29uc3RydWN0b3IocGVuZGluZ09wZXJhdGlvbnMpIHtcbiAgICB0aGlzLnBlbmRpbmdPcGVyYXRpb25zID0gcGVuZGluZ09wZXJhdGlvbnM7XG4gIH1cblxuICBnZXRQZW5kaW5nT3BlcmF0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5wZW5kaW5nT3BlcmF0aW9ucztcbiAgfVxuXG4gIHRvSlNPTigpIHtcbiAgICBjb25zdCBwZW5kaW5nT3BlcmF0aW9uc0pTT04gPSB0b0pTT04odGhpcy5wZW5kaW5nT3BlcmF0aW9ucyksXG4gICAgICAgICAgcGVuZGluZ09wZXJhdGlvbnMgPSBwZW5kaW5nT3BlcmF0aW9uc0pTT04sICAvLy9cbiAgICAgICAgICBqc29uID0ge1xuICAgICAgICAgICAgXCJwZW5kaW5nT3BlcmF0aW9uc1wiOiBwZW5kaW5nT3BlcmF0aW9uc1xuICAgICAgICAgIH07XG5cbiAgICByZXR1cm4ganNvbjtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XG4gICAgY29uc3QgcGVuZGluZ09wZXJhdGlvbnNKU09OID0ganNvbltcInBlbmRpbmdPcGVyYXRpb25zXCJdLFxuICAgICAgICAgIHBlbmRpbmdPcGVyYXRpb25zID0gZnJvbUpTT04ocGVuZGluZ09wZXJhdGlvbnNKU09OKSxcbiAgICAgICAgICB1cGRhdGVSZXNwb25zZSA9IG5ldyBVcGRhdGVSZXNwb25zZShwZW5kaW5nT3BlcmF0aW9ucyk7XG5cbiAgICByZXR1cm4gdXBkYXRlUmVzcG9uc2U7XG4gIH1cblxuICBzdGF0aWMgZnJvbVBlbmRpbmdPcGVyYXRpb25zKHBlbmRpbmdPcGVyYXRpb25zKSB7XG4gICAgY29uc3QgdXBkYXRlUmVzcG9uc2UgPSBuZXcgVXBkYXRlUmVzcG9uc2UocGVuZGluZ09wZXJhdGlvbnMpO1xuXG4gICAgcmV0dXJuIHVwZGF0ZVJlc3BvbnNlO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVXBkYXRlUmVzcG9uc2U7XG4iXX0=