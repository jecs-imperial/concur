'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var transformContent = require('../content/transform'),
    _generateOperations = require('../operations/generate'),
    transformOperations = require('../operations/transform');

var Document = function () {
  function Document(workingContent, editableContentTextarea) {
    _classCallCheck(this, Document);

    this.workingContent = workingContent;
    this.editableContentTextarea = editableContentTextarea;
  }

  _createClass(Document, [{
    key: 'getWorkingContent',
    value: function getWorkingContent() {
      return this.workingContent;
    }
  }, {
    key: 'getEditableContent',
    value: function getEditableContent() {
      return this.editableContentTextarea.getEditableContent();
    }
  }, {
    key: 'setEditableContent',
    value: function setEditableContent(editableContent) {
      this.editableContentTextarea.setEditableContent(editableContent);
    }
  }, {
    key: 'reset',
    value: function reset() {
      var editableContent = this.getEditableContent();

      this.workingContent = editableContent; ///
    }
  }, {
    key: 'update',
    value: function update(pendingOperations) {
      var editableContent = this.getEditableContent();

      var operations = this.generateOperations(),
          transformedPendingOperations = transformOperations(pendingOperations, operations),
          transformedEditableContent = transformContent(editableContent, transformedPendingOperations),
          transformedWorkingContent = transformContent(this.workingContent, pendingOperations);

      editableContent = transformedEditableContent; ///

      this.setEditableContent(editableContent);

      this.workingContent = transformedWorkingContent; ///

      var upToDate = editableContent === this.workingContent;

      return upToDate;
    }
  }, {
    key: 'generateOperations',
    value: function generateOperations() {
      var editableContent = this.getEditableContent(),
          operations = _generateOperations(this.workingContent, editableContent);

      return operations;
    }
  }], [{
    key: 'fromEditableContentTextarea',
    value: function fromEditableContentTextarea(editableContentTextarea) {
      var editableContent = editableContentTextarea.getEditableContent(),
          workingContent = editableContent,
          ///
      document = new Document(workingContent, editableContentTextarea);

      return document;
    }
  }]);

  return Document;
}();

module.exports = Document;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leGFtcGxlL2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbInRyYW5zZm9ybUNvbnRlbnQiLCJyZXF1aXJlIiwiZ2VuZXJhdGVPcGVyYXRpb25zIiwidHJhbnNmb3JtT3BlcmF0aW9ucyIsIkRvY3VtZW50Iiwid29ya2luZ0NvbnRlbnQiLCJlZGl0YWJsZUNvbnRlbnRUZXh0YXJlYSIsImdldEVkaXRhYmxlQ29udGVudCIsImVkaXRhYmxlQ29udGVudCIsInNldEVkaXRhYmxlQ29udGVudCIsInBlbmRpbmdPcGVyYXRpb25zIiwib3BlcmF0aW9ucyIsInRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMiLCJ0cmFuc2Zvcm1lZEVkaXRhYmxlQ29udGVudCIsInRyYW5zZm9ybWVkV29ya2luZ0NvbnRlbnQiLCJ1cFRvRGF0ZSIsImRvY3VtZW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBLElBQU1BLG1CQUFtQkMsUUFBUSxzQkFBUixDQUF6QjtBQUFBLElBQ01DLHNCQUFxQkQsUUFBUSx3QkFBUixDQUQzQjtBQUFBLElBRU1FLHNCQUFzQkYsUUFBUSx5QkFBUixDQUY1Qjs7SUFJTUcsUTtBQUNKLG9CQUFZQyxjQUFaLEVBQTRCQyx1QkFBNUIsRUFBcUQ7QUFBQTs7QUFDbkQsU0FBS0QsY0FBTCxHQUFzQkEsY0FBdEI7QUFDQSxTQUFLQyx1QkFBTCxHQUErQkEsdUJBQS9CO0FBQ0Q7Ozs7d0NBRW1CO0FBQ2xCLGFBQU8sS0FBS0QsY0FBWjtBQUNEOzs7eUNBRW9CO0FBQUUsYUFBTyxLQUFLQyx1QkFBTCxDQUE2QkMsa0JBQTdCLEVBQVA7QUFBMkQ7Ozt1Q0FFL0RDLGUsRUFBaUI7QUFBRSxXQUFLRix1QkFBTCxDQUE2Qkcsa0JBQTdCLENBQWdERCxlQUFoRDtBQUFtRTs7OzRCQUVqRztBQUNOLFVBQU1BLGtCQUFrQixLQUFLRCxrQkFBTCxFQUF4Qjs7QUFFQSxXQUFLRixjQUFMLEdBQXNCRyxlQUF0QixDQUhNLENBR2tDO0FBQ3pDOzs7MkJBRU1FLGlCLEVBQW1CO0FBQ3hCLFVBQUlGLGtCQUFrQixLQUFLRCxrQkFBTCxFQUF0Qjs7QUFFQSxVQUFNSSxhQUFhLEtBQUtULGtCQUFMLEVBQW5CO0FBQUEsVUFDTVUsK0JBQStCVCxvQkFBb0JPLGlCQUFwQixFQUF1Q0MsVUFBdkMsQ0FEckM7QUFBQSxVQUVNRSw2QkFBNkJiLGlCQUFpQlEsZUFBakIsRUFBa0NJLDRCQUFsQyxDQUZuQztBQUFBLFVBR01FLDRCQUE0QmQsaUJBQWlCLEtBQUtLLGNBQXRCLEVBQXNDSyxpQkFBdEMsQ0FIbEM7O0FBS0FGLHdCQUFrQkssMEJBQWxCLENBUndCLENBUXNCOztBQUU5QyxXQUFLSixrQkFBTCxDQUF3QkQsZUFBeEI7O0FBRUEsV0FBS0gsY0FBTCxHQUFzQlMseUJBQXRCLENBWndCLENBWXlCOztBQUVqRCxVQUFNQyxXQUFZUCxvQkFBb0IsS0FBS0gsY0FBM0M7O0FBRUEsYUFBT1UsUUFBUDtBQUNEOzs7eUNBRW9CO0FBQ25CLFVBQU1QLGtCQUFrQixLQUFLRCxrQkFBTCxFQUF4QjtBQUFBLFVBQ01JLGFBQWFULG9CQUFtQixLQUFLRyxjQUF4QixFQUF3Q0csZUFBeEMsQ0FEbkI7O0FBR0EsYUFBT0csVUFBUDtBQUNEOzs7Z0RBRWtDTCx1QixFQUF5QjtBQUMxRCxVQUFNRSxrQkFBa0JGLHdCQUF3QkMsa0JBQXhCLEVBQXhCO0FBQUEsVUFDTUYsaUJBQWlCRyxlQUR2QjtBQUFBLFVBQ3dDO0FBQ2xDUSxpQkFBVyxJQUFJWixRQUFKLENBQWFDLGNBQWIsRUFBNkJDLHVCQUE3QixDQUZqQjs7QUFJQSxhQUFPVSxRQUFQO0FBQ0Q7Ozs7OztBQUdIQyxPQUFPQyxPQUFQLEdBQWlCZCxRQUFqQiIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgdHJhbnNmb3JtQ29udGVudCA9IHJlcXVpcmUoJy4uL2NvbnRlbnQvdHJhbnNmb3JtJyksXG4gICAgICBnZW5lcmF0ZU9wZXJhdGlvbnMgPSByZXF1aXJlKCcuLi9vcGVyYXRpb25zL2dlbmVyYXRlJyksXG4gICAgICB0cmFuc2Zvcm1PcGVyYXRpb25zID0gcmVxdWlyZSgnLi4vb3BlcmF0aW9ucy90cmFuc2Zvcm0nKTtcblxuY2xhc3MgRG9jdW1lbnQge1xuICBjb25zdHJ1Y3Rvcih3b3JraW5nQ29udGVudCwgZWRpdGFibGVDb250ZW50VGV4dGFyZWEpIHtcbiAgICB0aGlzLndvcmtpbmdDb250ZW50ID0gd29ya2luZ0NvbnRlbnQ7XG4gICAgdGhpcy5lZGl0YWJsZUNvbnRlbnRUZXh0YXJlYSA9IGVkaXRhYmxlQ29udGVudFRleHRhcmVhO1xuICB9XG5cbiAgZ2V0V29ya2luZ0NvbnRlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMud29ya2luZ0NvbnRlbnQ7XG4gIH1cblxuICBnZXRFZGl0YWJsZUNvbnRlbnQoKSB7IHJldHVybiB0aGlzLmVkaXRhYmxlQ29udGVudFRleHRhcmVhLmdldEVkaXRhYmxlQ29udGVudCgpOyB9XG5cbiAgc2V0RWRpdGFibGVDb250ZW50KGVkaXRhYmxlQ29udGVudCkgeyB0aGlzLmVkaXRhYmxlQ29udGVudFRleHRhcmVhLnNldEVkaXRhYmxlQ29udGVudChlZGl0YWJsZUNvbnRlbnQpOyB9XG5cbiAgcmVzZXQoKSB7XG4gICAgY29uc3QgZWRpdGFibGVDb250ZW50ID0gdGhpcy5nZXRFZGl0YWJsZUNvbnRlbnQoKTtcblxuICAgIHRoaXMud29ya2luZ0NvbnRlbnQgPSBlZGl0YWJsZUNvbnRlbnQ7ICAvLy9cbiAgfVxuXG4gIHVwZGF0ZShwZW5kaW5nT3BlcmF0aW9ucykge1xuICAgIGxldCBlZGl0YWJsZUNvbnRlbnQgPSB0aGlzLmdldEVkaXRhYmxlQ29udGVudCgpO1xuXG4gICAgY29uc3Qgb3BlcmF0aW9ucyA9IHRoaXMuZ2VuZXJhdGVPcGVyYXRpb25zKCksXG4gICAgICAgICAgdHJhbnNmb3JtZWRQZW5kaW5nT3BlcmF0aW9ucyA9IHRyYW5zZm9ybU9wZXJhdGlvbnMocGVuZGluZ09wZXJhdGlvbnMsIG9wZXJhdGlvbnMpLFxuICAgICAgICAgIHRyYW5zZm9ybWVkRWRpdGFibGVDb250ZW50ID0gdHJhbnNmb3JtQ29udGVudChlZGl0YWJsZUNvbnRlbnQsIHRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMpLFxuICAgICAgICAgIHRyYW5zZm9ybWVkV29ya2luZ0NvbnRlbnQgPSB0cmFuc2Zvcm1Db250ZW50KHRoaXMud29ya2luZ0NvbnRlbnQsIHBlbmRpbmdPcGVyYXRpb25zKTtcblxuICAgIGVkaXRhYmxlQ29udGVudCA9IHRyYW5zZm9ybWVkRWRpdGFibGVDb250ZW50OyAvLy9cblxuICAgIHRoaXMuc2V0RWRpdGFibGVDb250ZW50KGVkaXRhYmxlQ29udGVudCk7XG5cbiAgICB0aGlzLndvcmtpbmdDb250ZW50ID0gdHJhbnNmb3JtZWRXb3JraW5nQ29udGVudDsgLy8vXG5cbiAgICBjb25zdCB1cFRvRGF0ZSA9IChlZGl0YWJsZUNvbnRlbnQgPT09IHRoaXMud29ya2luZ0NvbnRlbnQpO1xuXG4gICAgcmV0dXJuIHVwVG9EYXRlXG4gIH1cblxuICBnZW5lcmF0ZU9wZXJhdGlvbnMoKSB7XG4gICAgY29uc3QgZWRpdGFibGVDb250ZW50ID0gdGhpcy5nZXRFZGl0YWJsZUNvbnRlbnQoKSxcbiAgICAgICAgICBvcGVyYXRpb25zID0gZ2VuZXJhdGVPcGVyYXRpb25zKHRoaXMud29ya2luZ0NvbnRlbnQsIGVkaXRhYmxlQ29udGVudCk7XG5cbiAgICByZXR1cm4gb3BlcmF0aW9ucztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tRWRpdGFibGVDb250ZW50VGV4dGFyZWEoZWRpdGFibGVDb250ZW50VGV4dGFyZWEpIHtcbiAgICBjb25zdCBlZGl0YWJsZUNvbnRlbnQgPSBlZGl0YWJsZUNvbnRlbnRUZXh0YXJlYS5nZXRFZGl0YWJsZUNvbnRlbnQoKSxcbiAgICAgICAgICB3b3JraW5nQ29udGVudCA9IGVkaXRhYmxlQ29udGVudCwgLy8vXG4gICAgICAgICAgZG9jdW1lbnQgPSBuZXcgRG9jdW1lbnQod29ya2luZ0NvbnRlbnQsIGVkaXRhYmxlQ29udGVudFRleHRhcmVhKTtcblxuICAgIHJldHVybiBkb2N1bWVudDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERvY3VtZW50O1xuIl19