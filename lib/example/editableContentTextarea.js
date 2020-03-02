'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var easy = require('easy');

var InputElement = easy.InputElement;

var EditableContentTextarea = /*#__PURE__*/function (_InputElement) {
  _inherits(EditableContentTextarea, _InputElement);

  function EditableContentTextarea() {
    _classCallCheck(this, EditableContentTextarea);

    return _possibleConstructorReturn(this, _getPrototypeOf(EditableContentTextarea).apply(this, arguments));
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

Object.assign(EditableContentTextarea, {
  tagName: 'textarea',
  defaultProperties: {
    className: 'editable content',
    spellCheck: false
  }
});
module.exports = EditableContentTextarea;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXRhYmxlQ29udGVudFRleHRhcmVhLmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwiSW5wdXRFbGVtZW50IiwiRWRpdGFibGVDb250ZW50VGV4dGFyZWEiLCJlZGl0YWJsZUNvbnRlbnQiLCJ2YWx1ZSIsInNldFZhbHVlIiwiZ2V0VmFsdWUiLCJwcm9wZXJ0aWVzIiwiZnJvbVByb3BlcnRpZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJzcGVsbENoZWNrIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsSUFBSSxHQUFHQyxPQUFPLENBQUMsTUFBRCxDQUFwQjs7SUFFUUMsWSxHQUFpQkYsSSxDQUFqQkUsWTs7SUFFRkMsdUI7Ozs7Ozs7Ozs7O3VDQUNlQyxlLEVBQWlCO0FBQ2xDLFVBQU1DLEtBQUssR0FBR0QsZUFBZCxDQURrQyxDQUNGOztBQUVoQyxXQUFLRSxRQUFMLENBQWNELEtBQWQ7QUFDRDs7O3lDQUVvQjtBQUNuQixVQUFNQSxLQUFLLEdBQUcsS0FBS0UsUUFBTCxFQUFkO0FBQUEsVUFDTUgsZUFBZSxHQUFHQyxLQUR4QixDQURtQixDQUVZOztBQUUvQixhQUFPRCxlQUFQO0FBQ0Q7OzttQ0FFcUJJLFUsRUFBWTtBQUFFLGFBQU9OLFlBQVksQ0FBQ08sY0FBYixDQUE0Qk4sdUJBQTVCLEVBQXFESyxVQUFyRCxDQUFQO0FBQTBFOzs7O0VBZDFFTixZOztBQWlCdENRLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjUix1QkFBZCxFQUF1QztBQUNyQ1MsRUFBQUEsT0FBTyxFQUFFLFVBRDRCO0FBRXJDQyxFQUFBQSxpQkFBaUIsRUFBRTtBQUNqQkMsSUFBQUEsU0FBUyxFQUFFLGtCQURNO0FBRWpCQyxJQUFBQSxVQUFVLEVBQUU7QUFGSztBQUZrQixDQUF2QztBQVFBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJkLHVCQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKTtcblxuY29uc3QgeyBJbnB1dEVsZW1lbnQgfSA9IGVhc3k7XG5cbmNsYXNzIEVkaXRhYmxlQ29udGVudFRleHRhcmVhIGV4dGVuZHMgSW5wdXRFbGVtZW50IHtcbiAgc2V0RWRpdGFibGVDb250ZW50KGVkaXRhYmxlQ29udGVudCkge1xuICAgIGNvbnN0IHZhbHVlID0gZWRpdGFibGVDb250ZW50OyAgLy8vXG5cbiAgICB0aGlzLnNldFZhbHVlKHZhbHVlKTtcbiAgfVxuXG4gIGdldEVkaXRhYmxlQ29udGVudCgpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoKSxcbiAgICAgICAgICBlZGl0YWJsZUNvbnRlbnQgPSB2YWx1ZTsgLy8vXG5cbiAgICByZXR1cm4gZWRpdGFibGVDb250ZW50O1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHsgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tUHJvcGVydGllcyhFZGl0YWJsZUNvbnRlbnRUZXh0YXJlYSwgcHJvcGVydGllcyk7IH1cbn1cblxuT2JqZWN0LmFzc2lnbihFZGl0YWJsZUNvbnRlbnRUZXh0YXJlYSwge1xuICB0YWdOYW1lOiAndGV4dGFyZWEnLFxuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ2VkaXRhYmxlIGNvbnRlbnQnLFxuICAgIHNwZWxsQ2hlY2s6IGZhbHNlXG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVkaXRhYmxlQ29udGVudFRleHRhcmVhO1xuIl19