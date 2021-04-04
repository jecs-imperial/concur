"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _sufficient = require("sufficient");
var _initialise = _interopRequireDefault(require("../request/initialise"));
var _initialise1 = _interopRequireDefault(require("../response/initialise"));
var _poster = require("../poster");
function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
var _typeof = function(obj) {
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
var InitialiseTask = function(Task) {
    _inherits(InitialiseTask, _sufficient.Task);
    function InitialiseTask(callback) {
        _classCallCheck(this, InitialiseTask);
        return _possibleConstructorReturn(this, _getPrototypeOf(InitialiseTask).call(this, asynchronousMethod, callback));
    }
    return InitialiseTask;
}(_sufficient.Task);
exports.default = InitialiseTask;
function asynchronousMethod(callback) {
    var initialiseRequest = _initialise.default.fromNothing(), json = initialiseRequest.toJSON();
    _poster.initialisePost(json, function(json1) {
        var initialiseResponse = _initialise1.default.fromJSON(json1), content = initialiseResponse.getContent(), userIdentifier = initialiseResponse.getUserIdentifier(), sessionIdentifier = initialiseResponse.getSessionIdentifier();
        callback(content, userIdentifier, sessionIdentifier);
    });
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90YXNrL2luaXRpYWxpc2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwic3VmZmljaWVudFwiO1xuXG5pbXBvcnQgSW5pdGlhbGlzZVJlcXVlc3QgZnJvbSBcIi4uL3JlcXVlc3QvaW5pdGlhbGlzZVwiO1xuaW1wb3J0IEluaXRpYWxpc2VSZXNwb25zZSBmcm9tIFwiLi4vcmVzcG9uc2UvaW5pdGlhbGlzZVwiO1xuXG5pbXBvcnQgeyBpbml0aWFsaXNlUG9zdCB9IGZyb20gXCIuLi9wb3N0ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5pdGlhbGlzZVRhc2sgZXh0ZW5kcyBUYXNrIHtcbiAgY29uc3RydWN0b3IoY2FsbGJhY2spIHtcbiAgICBzdXBlcihhc3luY2hyb25vdXNNZXRob2QsIGNhbGxiYWNrKVxuICB9XG59XG5cbmZ1bmN0aW9uIGFzeW5jaHJvbm91c01ldGhvZChjYWxsYmFjaykge1xuICBjb25zdCBpbml0aWFsaXNlUmVxdWVzdCA9IEluaXRpYWxpc2VSZXF1ZXN0LmZyb21Ob3RoaW5nKCksXG4gICAgICAgIGpzb24gPSBpbml0aWFsaXNlUmVxdWVzdC50b0pTT04oKTtcblxuICBpbml0aWFsaXNlUG9zdChqc29uLCAoanNvbikgPT4ge1xuICAgIGNvbnN0IGluaXRpYWxpc2VSZXNwb25zZSA9IEluaXRpYWxpc2VSZXNwb25zZS5mcm9tSlNPTihqc29uKSxcbiAgICAgICAgICBjb250ZW50ID0gaW5pdGlhbGlzZVJlc3BvbnNlLmdldENvbnRlbnQoKSxcbiAgICAgICAgICB1c2VySWRlbnRpZmllciA9IGluaXRpYWxpc2VSZXNwb25zZS5nZXRVc2VySWRlbnRpZmllcigpLFxuXHRcdFx0XHRcdHNlc3Npb25JZGVudGlmaWVyID0gaW5pdGlhbGlzZVJlc3BvbnNlLmdldFNlc3Npb25JZGVudGlmaWVyKCk7XG5cbiAgICBjYWxsYmFjayhjb250ZW50LCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpO1xuICB9KTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQ0FBQSxVQUFBOzs7OztJQUVBLFdBQUE7SUFFQSxXQUFBO0lBQ0EsWUFBQTtJQUVBLE9BQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFQSxjQUFBLFlBQUEsSUFBQTtjQUFBLGNBQUEsRUFQQSxXQUFBO2FBT0EsY0FBQSxDQUNBLFFBQUE7OEJBREEsY0FBQTtnRUFBQSxjQUFBLGFBRUEsa0JBQUEsRUFBQSxRQUFBOztXQUZBLGNBQUE7RUFQQSxXQUFBO2tCQU9BLGNBQUE7U0FNQSxrQkFBQSxDQUFBLFFBQUE7UUFDQSxpQkFBQSxHQVpBLFdBQUEsU0FZQSxXQUFBLElBQ0EsSUFBQSxHQUFBLGlCQUFBLENBQUEsTUFBQTtBQVZBLFdBQUEsZ0JBWUEsSUFBQSxXQUFBLEtBQUE7WUFDQSxrQkFBQSxHQWZBLFlBQUEsU0FlQSxRQUFBLENBQUEsS0FBQSxHQUNBLE9BQUEsR0FBQSxrQkFBQSxDQUFBLFVBQUEsSUFDQSxjQUFBLEdBQUEsa0JBQUEsQ0FBQSxpQkFBQSxJQUNBLGlCQUFBLEdBQUEsa0JBQUEsQ0FBQSxvQkFBQTtBQUVBLGdCQUFBLENBQUEsT0FBQSxFQUFBLGNBQUEsRUFBQSxpQkFBQSJ9