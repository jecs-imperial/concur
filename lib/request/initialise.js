'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InitialiseRequest = function () {
  function InitialiseRequest() {
    _classCallCheck(this, InitialiseRequest);
  }

  _createClass(InitialiseRequest, [{
    key: 'toJSON',
    value: function toJSON() {
      var json = {}; ///

      return json;
    }
  }], [{
    key: 'fromNothing',
    value: function fromNothing() {
      var initialiseRequest = new InitialiseRequest();

      return initialiseRequest;
    }
  }]);

  return InitialiseRequest;
}();

module.exports = InitialiseRequest;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9yZXF1ZXN0L2luaXRpYWxpc2UuanMiXSwibmFtZXMiOlsiSW5pdGlhbGlzZVJlcXVlc3QiLCJqc29uIiwiaW5pdGlhbGlzZVJlcXVlc3QiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0lBRU1BLGlCOzs7Ozs7OzZCQUNLO0FBQ1AsVUFBTUMsT0FBTyxFQUFiLENBRE8sQ0FDVzs7QUFFbEIsYUFBT0EsSUFBUDtBQUNEOzs7a0NBRW9CO0FBQ25CLFVBQU1DLG9CQUFvQixJQUFJRixpQkFBSixFQUExQjs7QUFFQSxhQUFPRSxpQkFBUDtBQUNEOzs7Ozs7QUFHSEMsT0FBT0MsT0FBUCxHQUFpQkosaUJBQWpCIiwiZmlsZSI6ImluaXRpYWxpc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNsYXNzIEluaXRpYWxpc2VSZXF1ZXN0IHtcbiAgdG9KU09OKCkge1xuICAgIGNvbnN0IGpzb24gPSB7fTsgIC8vL1xuXG4gICAgcmV0dXJuIGpzb247XG4gIH1cblxuICBzdGF0aWMgZnJvbU5vdGhpbmcoKSB7XG4gICAgY29uc3QgaW5pdGlhbGlzZVJlcXVlc3QgPSBuZXcgSW5pdGlhbGlzZVJlcXVlc3QoKTtcblxuICAgIHJldHVybiBpbml0aWFsaXNlUmVxdWVzdDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEluaXRpYWxpc2VSZXF1ZXN0O1xuIl19