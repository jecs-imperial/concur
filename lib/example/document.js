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
  }, {
    key: 'synchroniseWorkingContent',
    value: function synchroniseWorkingContent() {
      var editableContent = this.getEditableContent();

      this.workingContent = editableContent; ///
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leGFtcGxlL2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbInRyYW5zZm9ybUNvbnRlbnQiLCJyZXF1aXJlIiwiZ2VuZXJhdGVPcGVyYXRpb25zIiwidHJhbnNmb3JtT3BlcmF0aW9ucyIsIkRvY3VtZW50Iiwid29ya2luZ0NvbnRlbnQiLCJlZGl0YWJsZUNvbnRlbnRUZXh0YXJlYSIsImdldEVkaXRhYmxlQ29udGVudCIsImVkaXRhYmxlQ29udGVudCIsInNldEVkaXRhYmxlQ29udGVudCIsInBlbmRpbmdPcGVyYXRpb25zIiwib3BlcmF0aW9ucyIsInRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMiLCJ0cmFuc2Zvcm1lZEVkaXRhYmxlQ29udGVudCIsInRyYW5zZm9ybWVkV29ya2luZ0NvbnRlbnQiLCJ1cFRvRGF0ZSIsImRvY3VtZW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBLElBQU1BLG1CQUFtQkMsUUFBUSxzQkFBUixDQUF6QjtBQUFBLElBQ01DLHNCQUFxQkQsUUFBUSx3QkFBUixDQUQzQjtBQUFBLElBRU1FLHNCQUFzQkYsUUFBUSx5QkFBUixDQUY1Qjs7SUFJTUcsUTtBQUNKLG9CQUFZQyxjQUFaLEVBQTRCQyx1QkFBNUIsRUFBcUQ7QUFBQTs7QUFDbkQsU0FBS0QsY0FBTCxHQUFzQkEsY0FBdEI7QUFDQSxTQUFLQyx1QkFBTCxHQUErQkEsdUJBQS9CO0FBQ0Q7Ozs7d0NBRW1CO0FBQ2xCLGFBQU8sS0FBS0QsY0FBWjtBQUNEOzs7eUNBRW9CO0FBQUUsYUFBTyxLQUFLQyx1QkFBTCxDQUE2QkMsa0JBQTdCLEVBQVA7QUFBMkQ7Ozt1Q0FFL0RDLGUsRUFBaUI7QUFBRSxXQUFLRix1QkFBTCxDQUE2Qkcsa0JBQTdCLENBQWdERCxlQUFoRDtBQUFtRTs7OzJCQUVsR0UsaUIsRUFBbUI7QUFDeEIsVUFBSUYsa0JBQWtCLEtBQUtELGtCQUFMLEVBQXRCOztBQUVBLFVBQU1JLGFBQWEsS0FBS1Qsa0JBQUwsRUFBbkI7QUFBQSxVQUNNVSwrQkFBK0JULG9CQUFvQk8saUJBQXBCLEVBQXVDQyxVQUF2QyxDQURyQztBQUFBLFVBRU1FLDZCQUE2QmIsaUJBQWlCUSxlQUFqQixFQUFrQ0ksNEJBQWxDLENBRm5DO0FBQUEsVUFHTUUsNEJBQTRCZCxpQkFBaUIsS0FBS0ssY0FBdEIsRUFBc0NLLGlCQUF0QyxDQUhsQzs7QUFLQUYsd0JBQWtCSywwQkFBbEIsQ0FSd0IsQ0FRc0I7O0FBRTlDLFdBQUtKLGtCQUFMLENBQXdCRCxlQUF4Qjs7QUFFQSxXQUFLSCxjQUFMLEdBQXNCUyx5QkFBdEIsQ0Fad0IsQ0FZeUI7O0FBRWpELFVBQU1DLFdBQVlQLG9CQUFvQixLQUFLSCxjQUEzQzs7QUFFQSxhQUFPVSxRQUFQO0FBQ0Q7Ozt5Q0FFb0I7QUFDbkIsVUFBTVAsa0JBQWtCLEtBQUtELGtCQUFMLEVBQXhCO0FBQUEsVUFDTUksYUFBYVQsb0JBQW1CLEtBQUtHLGNBQXhCLEVBQXdDRyxlQUF4QyxDQURuQjs7QUFHQSxhQUFPRyxVQUFQO0FBQ0Q7OztnREFFMkI7QUFDMUIsVUFBTUgsa0JBQWtCLEtBQUtELGtCQUFMLEVBQXhCOztBQUVBLFdBQUtGLGNBQUwsR0FBc0JHLGVBQXRCLENBSDBCLENBR2M7QUFDekM7OztnREFFa0NGLHVCLEVBQXlCO0FBQzFELFVBQU1FLGtCQUFrQkYsd0JBQXdCQyxrQkFBeEIsRUFBeEI7QUFBQSxVQUNNRixpQkFBaUJHLGVBRHZCO0FBQUEsVUFDd0M7QUFDbENRLGlCQUFXLElBQUlaLFFBQUosQ0FBYUMsY0FBYixFQUE2QkMsdUJBQTdCLENBRmpCOztBQUlBLGFBQU9VLFFBQVA7QUFDRDs7Ozs7O0FBR0hDLE9BQU9DLE9BQVAsR0FBaUJkLFFBQWpCIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB0cmFuc2Zvcm1Db250ZW50ID0gcmVxdWlyZSgnLi4vY29udGVudC90cmFuc2Zvcm0nKSxcbiAgICAgIGdlbmVyYXRlT3BlcmF0aW9ucyA9IHJlcXVpcmUoJy4uL29wZXJhdGlvbnMvZ2VuZXJhdGUnKSxcbiAgICAgIHRyYW5zZm9ybU9wZXJhdGlvbnMgPSByZXF1aXJlKCcuLi9vcGVyYXRpb25zL3RyYW5zZm9ybScpO1xuXG5jbGFzcyBEb2N1bWVudCB7XG4gIGNvbnN0cnVjdG9yKHdvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnRUZXh0YXJlYSkge1xuICAgIHRoaXMud29ya2luZ0NvbnRlbnQgPSB3b3JraW5nQ29udGVudDtcbiAgICB0aGlzLmVkaXRhYmxlQ29udGVudFRleHRhcmVhID0gZWRpdGFibGVDb250ZW50VGV4dGFyZWE7XG4gIH1cblxuICBnZXRXb3JraW5nQ29udGVudCgpIHtcbiAgICByZXR1cm4gdGhpcy53b3JraW5nQ29udGVudDtcbiAgfVxuXG4gIGdldEVkaXRhYmxlQ29udGVudCgpIHsgcmV0dXJuIHRoaXMuZWRpdGFibGVDb250ZW50VGV4dGFyZWEuZ2V0RWRpdGFibGVDb250ZW50KCk7IH1cblxuICBzZXRFZGl0YWJsZUNvbnRlbnQoZWRpdGFibGVDb250ZW50KSB7IHRoaXMuZWRpdGFibGVDb250ZW50VGV4dGFyZWEuc2V0RWRpdGFibGVDb250ZW50KGVkaXRhYmxlQ29udGVudCk7IH1cblxuICB1cGRhdGUocGVuZGluZ09wZXJhdGlvbnMpIHtcbiAgICBsZXQgZWRpdGFibGVDb250ZW50ID0gdGhpcy5nZXRFZGl0YWJsZUNvbnRlbnQoKTtcblxuICAgIGNvbnN0IG9wZXJhdGlvbnMgPSB0aGlzLmdlbmVyYXRlT3BlcmF0aW9ucygpLFxuICAgICAgICAgIHRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMgPSB0cmFuc2Zvcm1PcGVyYXRpb25zKHBlbmRpbmdPcGVyYXRpb25zLCBvcGVyYXRpb25zKSxcbiAgICAgICAgICB0cmFuc2Zvcm1lZEVkaXRhYmxlQ29udGVudCA9IHRyYW5zZm9ybUNvbnRlbnQoZWRpdGFibGVDb250ZW50LCB0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zKSxcbiAgICAgICAgICB0cmFuc2Zvcm1lZFdvcmtpbmdDb250ZW50ID0gdHJhbnNmb3JtQ29udGVudCh0aGlzLndvcmtpbmdDb250ZW50LCBwZW5kaW5nT3BlcmF0aW9ucyk7XG5cbiAgICBlZGl0YWJsZUNvbnRlbnQgPSB0cmFuc2Zvcm1lZEVkaXRhYmxlQ29udGVudDsgLy8vXG5cbiAgICB0aGlzLnNldEVkaXRhYmxlQ29udGVudChlZGl0YWJsZUNvbnRlbnQpO1xuXG4gICAgdGhpcy53b3JraW5nQ29udGVudCA9IHRyYW5zZm9ybWVkV29ya2luZ0NvbnRlbnQ7IC8vL1xuXG4gICAgY29uc3QgdXBUb0RhdGUgPSAoZWRpdGFibGVDb250ZW50ID09PSB0aGlzLndvcmtpbmdDb250ZW50KTtcblxuICAgIHJldHVybiB1cFRvRGF0ZVxuICB9XG5cbiAgZ2VuZXJhdGVPcGVyYXRpb25zKCkge1xuICAgIGNvbnN0IGVkaXRhYmxlQ29udGVudCA9IHRoaXMuZ2V0RWRpdGFibGVDb250ZW50KCksXG4gICAgICAgICAgb3BlcmF0aW9ucyA9IGdlbmVyYXRlT3BlcmF0aW9ucyh0aGlzLndvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnQpO1xuXG4gICAgcmV0dXJuIG9wZXJhdGlvbnM7XG4gIH1cblxuICBzeW5jaHJvbmlzZVdvcmtpbmdDb250ZW50KCkge1xuICAgIGNvbnN0IGVkaXRhYmxlQ29udGVudCA9IHRoaXMuZ2V0RWRpdGFibGVDb250ZW50KCk7XG5cbiAgICB0aGlzLndvcmtpbmdDb250ZW50ID0gZWRpdGFibGVDb250ZW50OyAgLy8vXG4gIH1cblxuICBzdGF0aWMgZnJvbUVkaXRhYmxlQ29udGVudFRleHRhcmVhKGVkaXRhYmxlQ29udGVudFRleHRhcmVhKSB7XG4gICAgY29uc3QgZWRpdGFibGVDb250ZW50ID0gZWRpdGFibGVDb250ZW50VGV4dGFyZWEuZ2V0RWRpdGFibGVDb250ZW50KCksXG4gICAgICAgICAgd29ya2luZ0NvbnRlbnQgPSBlZGl0YWJsZUNvbnRlbnQsIC8vL1xuICAgICAgICAgIGRvY3VtZW50ID0gbmV3IERvY3VtZW50KHdvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnRUZXh0YXJlYSk7XG5cbiAgICByZXR1cm4gZG9jdW1lbnQ7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEb2N1bWVudDtcbiJdfQ==