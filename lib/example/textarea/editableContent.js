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
  }, {
    key: 'parentContext',
    value: function parentContext() {
      var getEditableContent = this.getEditableContent.bind(this),
          setEditableContent = this.setEditableContent.bind(this);

      return {
        getEditableContent: getEditableContent,
        setEditableContent: setEditableContent
      };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leGFtcGxlL3RleHRhcmVhL2VkaXRhYmxlQ29udGVudC5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIklucHV0RWxlbWVudCIsIkVkaXRhYmxlQ29udGVudFRleHRhcmVhIiwiZWRpdGFibGVDb250ZW50IiwidmFsdWUiLCJzZXRWYWx1ZSIsImdldFZhbHVlIiwiZ2V0RWRpdGFibGVDb250ZW50IiwiYmluZCIsInNldEVkaXRhYmxlQ29udGVudCIsInByb3BlcnRpZXMiLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsInRhZ05hbWUiLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsInNwZWxsQ2hlY2siLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiOztJQUVRQyxZLEdBQWlCRixJLENBQWpCRSxZOztJQUVGQyx1Qjs7Ozs7Ozs7Ozs7dUNBQ2VDLGUsRUFBaUI7QUFDbEMsVUFBTUMsUUFBUUQsZUFBZCxDQURrQyxDQUNGOztBQUVoQyxXQUFLRSxRQUFMLENBQWNELEtBQWQ7QUFDRDs7O3lDQUVvQjtBQUNuQixVQUFNQSxRQUFRLEtBQUtFLFFBQUwsRUFBZDtBQUFBLFVBQ01ILGtCQUFrQkMsS0FEeEIsQ0FEbUIsQ0FFWTs7QUFFL0IsYUFBT0QsZUFBUDtBQUNEOzs7b0NBRWU7QUFDZCxVQUFNSSxxQkFBcUIsS0FBS0Esa0JBQUwsQ0FBd0JDLElBQXhCLENBQTZCLElBQTdCLENBQTNCO0FBQUEsVUFDTUMscUJBQXFCLEtBQUtBLGtCQUFMLENBQXdCRCxJQUF4QixDQUE2QixJQUE3QixDQUQzQjs7QUFHQSxhQUFRO0FBQ05ELDhDQURNO0FBRU5FO0FBRk0sT0FBUjtBQUlEOzs7bUNBRXFCQyxVLEVBQVk7QUFBRSxhQUFPVCxhQUFhVSxjQUFiLENBQTRCVCx1QkFBNUIsRUFBcURRLFVBQXJELENBQVA7QUFBMEU7Ozs7RUF4QjFFVCxZOztBQTJCdENXLE9BQU9DLE1BQVAsQ0FBY1gsdUJBQWQsRUFBdUM7QUFDckNZLFdBQVMsVUFENEI7QUFFckNDLHFCQUFtQjtBQUNqQkMsZUFBVyxrQkFETTtBQUVqQkMsZ0JBQVk7QUFGSztBQUZrQixDQUF2Qzs7QUFRQUMsT0FBT0MsT0FBUCxHQUFpQmpCLHVCQUFqQiIsImZpbGUiOiJlZGl0YWJsZUNvbnRlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5Jyk7XG5cbmNvbnN0IHsgSW5wdXRFbGVtZW50IH0gPSBlYXN5O1xuXG5jbGFzcyBFZGl0YWJsZUNvbnRlbnRUZXh0YXJlYSBleHRlbmRzIElucHV0RWxlbWVudCB7XG4gIHNldEVkaXRhYmxlQ29udGVudChlZGl0YWJsZUNvbnRlbnQpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGVkaXRhYmxlQ29udGVudDsgIC8vL1xuXG4gICAgdGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XG4gIH1cblxuICBnZXRFZGl0YWJsZUNvbnRlbnQoKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldFZhbHVlKCksXG4gICAgICAgICAgZWRpdGFibGVDb250ZW50ID0gdmFsdWU7IC8vL1xuXG4gICAgcmV0dXJuIGVkaXRhYmxlQ29udGVudDtcbiAgfVxuXG4gIHBhcmVudENvbnRleHQoKSB7XG4gICAgY29uc3QgZ2V0RWRpdGFibGVDb250ZW50ID0gdGhpcy5nZXRFZGl0YWJsZUNvbnRlbnQuYmluZCh0aGlzKSxcbiAgICAgICAgICBzZXRFZGl0YWJsZUNvbnRlbnQgPSB0aGlzLnNldEVkaXRhYmxlQ29udGVudC5iaW5kKHRoaXMpO1xuXG4gICAgcmV0dXJuICh7XG4gICAgICBnZXRFZGl0YWJsZUNvbnRlbnQsXG4gICAgICBzZXRFZGl0YWJsZUNvbnRlbnRcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7IHJldHVybiBJbnB1dEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoRWRpdGFibGVDb250ZW50VGV4dGFyZWEsIHByb3BlcnRpZXMpOyB9XG59XG5cbk9iamVjdC5hc3NpZ24oRWRpdGFibGVDb250ZW50VGV4dGFyZWEsIHtcbiAgdGFnTmFtZTogJ3RleHRhcmVhJyxcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdlZGl0YWJsZSBjb250ZW50JyxcbiAgICBzcGVsbENoZWNrOiBmYWxzZVxuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFZGl0YWJsZUNvbnRlbnRUZXh0YXJlYTtcbiJdfQ==