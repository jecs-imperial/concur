'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var InputElement = easy.InputElement;

var EditableContentTextarea = function (_InputElement) {
  _inherits(EditableContentTextarea, _InputElement);

  function EditableContentTextarea() {
    _classCallCheck(this, EditableContentTextarea);

    return _possibleConstructorReturn(this, (EditableContentTextarea.__proto__ || Object.getPrototypeOf(EditableContentTextarea)).apply(this, arguments));
  }

  _createClass(EditableContentTextarea, [{
    key: 'setEditableContent',
    value: function setEditableContent(editableContent) {
      var value = editableContent; ///

      this.setValue(value);
    }
  }, {
    key: 'getEditableContent',
    value: function getEditableContent() {
      var value = this.getValue(),
          editableContent = value; ///

      return editableContent;
    }
  }], [{
    key: 'fromProperties',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leGFtcGxlL2VkaXRhYmxlQ29udGVudFRleHRhcmVhLmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwiSW5wdXRFbGVtZW50IiwiRWRpdGFibGVDb250ZW50VGV4dGFyZWEiLCJlZGl0YWJsZUNvbnRlbnQiLCJ2YWx1ZSIsInNldFZhbHVlIiwiZ2V0VmFsdWUiLCJwcm9wZXJ0aWVzIiwiZnJvbVByb3BlcnRpZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJzcGVsbENoZWNrIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPQyxRQUFRLE1BQVIsQ0FBYjs7SUFFUUMsWSxHQUFpQkYsSSxDQUFqQkUsWTs7SUFFRkMsdUI7Ozs7Ozs7Ozs7O3VDQUNlQyxlLEVBQWlCO0FBQ2xDLFVBQU1DLFFBQVFELGVBQWQsQ0FEa0MsQ0FDRjs7QUFFaEMsV0FBS0UsUUFBTCxDQUFjRCxLQUFkO0FBQ0Q7Ozt5Q0FFb0I7QUFDbkIsVUFBTUEsUUFBUSxLQUFLRSxRQUFMLEVBQWQ7QUFBQSxVQUNNSCxrQkFBa0JDLEtBRHhCLENBRG1CLENBRVk7O0FBRS9CLGFBQU9ELGVBQVA7QUFDRDs7O21DQUVxQkksVSxFQUFZO0FBQUUsYUFBT04sYUFBYU8sY0FBYixDQUE0Qk4sdUJBQTVCLEVBQXFESyxVQUFyRCxDQUFQO0FBQTBFOzs7O0VBZDFFTixZOztBQWlCdENRLE9BQU9DLE1BQVAsQ0FBY1IsdUJBQWQsRUFBdUM7QUFDckNTLFdBQVMsVUFENEI7QUFFckNDLHFCQUFtQjtBQUNqQkMsZUFBVyxrQkFETTtBQUVqQkMsZ0JBQVk7QUFGSztBQUZrQixDQUF2Qzs7QUFRQUMsT0FBT0MsT0FBUCxHQUFpQmQsdUJBQWpCIiwiZmlsZSI6ImVkaXRhYmxlQ29udGVudFRleHRhcmVhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xuXG5jb25zdCB7IElucHV0RWxlbWVudCB9ID0gZWFzeTtcblxuY2xhc3MgRWRpdGFibGVDb250ZW50VGV4dGFyZWEgZXh0ZW5kcyBJbnB1dEVsZW1lbnQge1xuICBzZXRFZGl0YWJsZUNvbnRlbnQoZWRpdGFibGVDb250ZW50KSB7XG4gICAgY29uc3QgdmFsdWUgPSBlZGl0YWJsZUNvbnRlbnQ7ICAvLy9cblxuICAgIHRoaXMuc2V0VmFsdWUodmFsdWUpO1xuICB9XG5cbiAgZ2V0RWRpdGFibGVDb250ZW50KCkge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRWYWx1ZSgpLFxuICAgICAgICAgIGVkaXRhYmxlQ29udGVudCA9IHZhbHVlOyAvLy9cblxuICAgIHJldHVybiBlZGl0YWJsZUNvbnRlbnQ7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykgeyByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKEVkaXRhYmxlQ29udGVudFRleHRhcmVhLCBwcm9wZXJ0aWVzKTsgfVxufVxuXG5PYmplY3QuYXNzaWduKEVkaXRhYmxlQ29udGVudFRleHRhcmVhLCB7XG4gIHRhZ05hbWU6ICd0ZXh0YXJlYScsXG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAnZWRpdGFibGUgY29udGVudCcsXG4gICAgc3BlbGxDaGVjazogZmFsc2VcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRWRpdGFibGVDb250ZW50VGV4dGFyZWE7XG4iXX0=