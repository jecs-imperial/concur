"use strict";

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

var easy = require("easy");

var InputElement = easy.InputElement;

var EditableContentTextarea = /*#__PURE__*/function (_InputElement) {
  _inherits(EditableContentTextarea, _InputElement);

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
  }], [{
    key: "fromProperties",
    value: function fromProperties(properties) {
      return InputElement.fromProperties(EditableContentTextarea, properties);
    }
  }]);

  return EditableContentTextarea;
}(InputElement);

_defineProperty(EditableContentTextarea, "tagName", "textarea");

_defineProperty(EditableContentTextarea, "defaultProperties", {
  className: "editable content",
  spellCheck: false
});

module.exports = EditableContentTextarea;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXRhYmxlQ29udGVudFRleHRhcmVhLmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwiSW5wdXRFbGVtZW50IiwiRWRpdGFibGVDb250ZW50VGV4dGFyZWEiLCJlZGl0YWJsZUNvbnRlbnQiLCJ2YWx1ZSIsInNldFZhbHVlIiwiZ2V0VmFsdWUiLCJwcm9wZXJ0aWVzIiwiZnJvbVByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJzcGVsbENoZWNrIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsSUFBSSxHQUFHQyxPQUFPLENBQUMsTUFBRCxDQUFwQjs7SUFFUUMsWSxHQUFpQkYsSSxDQUFqQkUsWTs7SUFFRkMsdUI7Ozs7Ozs7Ozs7Ozs7dUNBQ2VDLGUsRUFBaUI7QUFDbEMsVUFBTUMsS0FBSyxHQUFHRCxlQUFkLENBRGtDLENBQ0Y7O0FBRWhDLFdBQUtFLFFBQUwsQ0FBY0QsS0FBZDtBQUNEOzs7eUNBRW9CO0FBQ25CLFVBQU1BLEtBQUssR0FBRyxLQUFLRSxRQUFMLEVBQWQ7QUFBQSxVQUNNSCxlQUFlLEdBQUdDLEtBRHhCLENBRG1CLENBRVk7O0FBRS9CLGFBQU9ELGVBQVA7QUFDRDs7O21DQVNxQkksVSxFQUFZO0FBQUUsYUFBT04sWUFBWSxDQUFDTyxjQUFiLENBQTRCTix1QkFBNUIsRUFBcURLLFVBQXJELENBQVA7QUFBMEU7Ozs7RUFyQjFFTixZOztnQkFBaENDLHVCLGFBY2EsVTs7Z0JBZGJBLHVCLHVCQWdCdUI7QUFDekJPLEVBQUFBLFNBQVMsRUFBRSxrQkFEYztBQUV6QkMsRUFBQUEsVUFBVSxFQUFFO0FBRmEsQzs7QUFRN0JDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQlYsdUJBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKFwiZWFzeVwiKTtcblxuY29uc3QgeyBJbnB1dEVsZW1lbnQgfSA9IGVhc3k7XG5cbmNsYXNzIEVkaXRhYmxlQ29udGVudFRleHRhcmVhIGV4dGVuZHMgSW5wdXRFbGVtZW50IHtcbiAgc2V0RWRpdGFibGVDb250ZW50KGVkaXRhYmxlQ29udGVudCkge1xuICAgIGNvbnN0IHZhbHVlID0gZWRpdGFibGVDb250ZW50OyAgLy8vXG5cbiAgICB0aGlzLnNldFZhbHVlKHZhbHVlKTtcbiAgfVxuXG4gIGdldEVkaXRhYmxlQ29udGVudCgpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoKSxcbiAgICAgICAgICBlZGl0YWJsZUNvbnRlbnQgPSB2YWx1ZTsgLy8vXG5cbiAgICByZXR1cm4gZWRpdGFibGVDb250ZW50O1xuICB9XG5cbiAgc3RhdGljIHRhZ05hbWUgPSBcInRleHRhcmVhXCI7XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wZXJ0aWVzID0ge1xuICAgIGNsYXNzTmFtZTogXCJlZGl0YWJsZSBjb250ZW50XCIsXG4gICAgc3BlbGxDaGVjazogZmFsc2VcbiAgfTtcblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykgeyByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKEVkaXRhYmxlQ29udGVudFRleHRhcmVhLCBwcm9wZXJ0aWVzKTsgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEVkaXRhYmxlQ29udGVudFRleHRhcmVhO1xuIl19