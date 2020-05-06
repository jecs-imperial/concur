"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _easyWithStyle = _interopRequireDefault(require("easy-with-style"));

var _easy = require("easy");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n\n  border: 1px solid black;\n  width: 40rem;\n  height: 20rem;\n  \n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EditableContentTextarea = /*#__PURE__*/function (_Textarea) {
  _inherits(EditableContentTextarea, _Textarea);

  var _super = _createSuper(EditableContentTextarea);

  function EditableContentTextarea() {
    _classCallCheck(this, EditableContentTextarea);

    return _super.apply(this, arguments);
  }

  _createClass(EditableContentTextarea, [{
    key: "setEditableContent",
    value: function setEditableContent(editableContent) {
      var value = editableContent; ///

      this.setValue(value);
    }
  }, {
    key: "getEditableContent",
    value: function getEditableContent() {
      var value = this.getValue(),
          editableContent = value; ///

      return editableContent;
    }
  }]);

  return EditableContentTextarea;
}(_easy.Textarea);

_defineProperty(EditableContentTextarea, "defaultProperties", {
  className: "editable content",
  spellCheck: false
});

var _default = (0, _easyWithStyle["default"])(EditableContentTextarea)(_templateObject());

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXRhYmxlQ29udGVudFRleHRhcmVhLmpzIl0sIm5hbWVzIjpbIkVkaXRhYmxlQ29udGVudFRleHRhcmVhIiwiZWRpdGFibGVDb250ZW50IiwidmFsdWUiLCJzZXRWYWx1ZSIsImdldFZhbHVlIiwiVGV4dGFyZWEiLCJjbGFzc05hbWUiLCJzcGVsbENoZWNrIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRU1BLHVCOzs7Ozs7Ozs7Ozs7O3VDQUNlQyxlLEVBQWlCO0FBQ2xDLFVBQU1DLEtBQUssR0FBR0QsZUFBZCxDQURrQyxDQUNGOztBQUVoQyxXQUFLRSxRQUFMLENBQWNELEtBQWQ7QUFDRDs7O3lDQUVvQjtBQUNuQixVQUFNQSxLQUFLLEdBQUcsS0FBS0UsUUFBTCxFQUFkO0FBQUEsVUFDTUgsZUFBZSxHQUFHQyxLQUR4QixDQURtQixDQUVZOztBQUUvQixhQUFPRCxlQUFQO0FBQ0Q7Ozs7RUFabUNJLGM7O2dCQUFoQ0wsdUIsdUJBY3VCO0FBQ3pCTSxFQUFBQSxTQUFTLEVBQUUsa0JBRGM7QUFFekJDLEVBQUFBLFVBQVUsRUFBRTtBQUZhLEM7O2VBTWQsK0JBQVVQLHVCQUFWLEMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHdpdGhTdHlsZSBmcm9tIFwiZWFzeS13aXRoLXN0eWxlXCI7ICAvLy9cblxuaW1wb3J0IHsgVGV4dGFyZWEgfSBmcm9tIFwiZWFzeVwiO1xuXG5jbGFzcyBFZGl0YWJsZUNvbnRlbnRUZXh0YXJlYSBleHRlbmRzIFRleHRhcmVhIHtcbiAgc2V0RWRpdGFibGVDb250ZW50KGVkaXRhYmxlQ29udGVudCkge1xuICAgIGNvbnN0IHZhbHVlID0gZWRpdGFibGVDb250ZW50OyAgLy8vXG5cbiAgICB0aGlzLnNldFZhbHVlKHZhbHVlKTtcbiAgfVxuXG4gIGdldEVkaXRhYmxlQ29udGVudCgpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoKSxcbiAgICAgICAgICBlZGl0YWJsZUNvbnRlbnQgPSB2YWx1ZTsgLy8vXG5cbiAgICByZXR1cm4gZWRpdGFibGVDb250ZW50O1xuICB9XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wZXJ0aWVzID0ge1xuICAgIGNsYXNzTmFtZTogXCJlZGl0YWJsZSBjb250ZW50XCIsXG4gICAgc3BlbGxDaGVjazogZmFsc2VcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlKEVkaXRhYmxlQ29udGVudFRleHRhcmVhKWBcblxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgd2lkdGg6IDQwcmVtO1xuICBoZWlnaHQ6IDIwcmVtO1xuICBcbmA7XG4iXX0=