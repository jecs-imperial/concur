"use strict";

var _easy = require("easy");

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
      return _easy.InputElement.fromProperties(EditableContentTextarea, properties);
    }
  }]);

  return EditableContentTextarea;
}(_easy.InputElement);

_defineProperty(EditableContentTextarea, "tagName", "textarea");

_defineProperty(EditableContentTextarea, "defaultProperties", {
  className: "editable content",
  spellCheck: false
});

module.exports = EditableContentTextarea;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXRhYmxlQ29udGVudFRleHRhcmVhLmpzIl0sIm5hbWVzIjpbIkVkaXRhYmxlQ29udGVudFRleHRhcmVhIiwiZWRpdGFibGVDb250ZW50IiwidmFsdWUiLCJzZXRWYWx1ZSIsImdldFZhbHVlIiwicHJvcGVydGllcyIsIklucHV0RWxlbWVudCIsImZyb21Qcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwic3BlbGxDaGVjayIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVNQSx1Qjs7Ozs7Ozs7Ozs7Ozt1Q0FDZUMsZSxFQUFpQjtBQUNsQyxVQUFNQyxLQUFLLEdBQUdELGVBQWQsQ0FEa0MsQ0FDRjs7QUFFaEMsV0FBS0UsUUFBTCxDQUFjRCxLQUFkO0FBQ0Q7Ozt5Q0FFb0I7QUFDbkIsVUFBTUEsS0FBSyxHQUFHLEtBQUtFLFFBQUwsRUFBZDtBQUFBLFVBQ01ILGVBQWUsR0FBR0MsS0FEeEIsQ0FEbUIsQ0FFWTs7QUFFL0IsYUFBT0QsZUFBUDtBQUNEOzs7bUNBU3FCSSxVLEVBQVk7QUFBRSxhQUFPQyxtQkFBYUMsY0FBYixDQUE0QlAsdUJBQTVCLEVBQXFESyxVQUFyRCxDQUFQO0FBQTBFOzs7O0VBckIxRUMsa0I7O2dCQUFoQ04sdUIsYUFjYSxVOztnQkFkYkEsdUIsdUJBZ0J1QjtBQUN6QlEsRUFBQUEsU0FBUyxFQUFFLGtCQURjO0FBRXpCQyxFQUFBQSxVQUFVLEVBQUU7QUFGYSxDOztBQVE3QkMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCWCx1QkFBakIiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgSW5wdXRFbGVtZW50IH0gZnJvbSBcImVhc3lcIjtcblxuY2xhc3MgRWRpdGFibGVDb250ZW50VGV4dGFyZWEgZXh0ZW5kcyBJbnB1dEVsZW1lbnQge1xuICBzZXRFZGl0YWJsZUNvbnRlbnQoZWRpdGFibGVDb250ZW50KSB7XG4gICAgY29uc3QgdmFsdWUgPSBlZGl0YWJsZUNvbnRlbnQ7ICAvLy9cblxuICAgIHRoaXMuc2V0VmFsdWUodmFsdWUpO1xuICB9XG5cbiAgZ2V0RWRpdGFibGVDb250ZW50KCkge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRWYWx1ZSgpLFxuICAgICAgICAgIGVkaXRhYmxlQ29udGVudCA9IHZhbHVlOyAvLy9cblxuICAgIHJldHVybiBlZGl0YWJsZUNvbnRlbnQ7XG4gIH1cblxuICBzdGF0aWMgdGFnTmFtZSA9IFwidGV4dGFyZWFcIjtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BlcnRpZXMgPSB7XG4gICAgY2xhc3NOYW1lOiBcImVkaXRhYmxlIGNvbnRlbnRcIixcbiAgICBzcGVsbENoZWNrOiBmYWxzZVxuICB9O1xuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7IHJldHVybiBJbnB1dEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoRWRpdGFibGVDb250ZW50VGV4dGFyZWEsIHByb3BlcnRpZXMpOyB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRWRpdGFibGVDb250ZW50VGV4dGFyZWE7XG4iXX0=