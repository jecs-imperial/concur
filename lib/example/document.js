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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leGFtcGxlL2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbInRyYW5zZm9ybUNvbnRlbnQiLCJyZXF1aXJlIiwiZ2VuZXJhdGVPcGVyYXRpb25zIiwidHJhbnNmb3JtT3BlcmF0aW9ucyIsIkRvY3VtZW50Iiwid29ya2luZ0NvbnRlbnQiLCJlZGl0YWJsZUNvbnRlbnRUZXh0YXJlYSIsImdldEVkaXRhYmxlQ29udGVudCIsImVkaXRhYmxlQ29udGVudCIsInNldEVkaXRhYmxlQ29udGVudCIsInBlbmRpbmdPcGVyYXRpb25zIiwib3BlcmF0aW9ucyIsInRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMiLCJ0cmFuc2Zvcm1lZEVkaXRhYmxlQ29udGVudCIsInRyYW5zZm9ybWVkV29ya2luZ0NvbnRlbnQiLCJkb2N1bWVudCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFFQSxJQUFNQSxtQkFBbUJDLFFBQVEsc0JBQVIsQ0FBekI7QUFBQSxJQUNNQyxzQkFBcUJELFFBQVEsd0JBQVIsQ0FEM0I7QUFBQSxJQUVNRSxzQkFBc0JGLFFBQVEseUJBQVIsQ0FGNUI7O0lBSU1HLFE7QUFDSixvQkFBWUMsY0FBWixFQUE0QkMsdUJBQTVCLEVBQXFEO0FBQUE7O0FBQ25ELFNBQUtELGNBQUwsR0FBc0JBLGNBQXRCO0FBQ0EsU0FBS0MsdUJBQUwsR0FBK0JBLHVCQUEvQjtBQUNEOzs7O3dDQUVtQjtBQUNsQixhQUFPLEtBQUtELGNBQVo7QUFDRDs7O3lDQUVvQjtBQUFFLGFBQU8sS0FBS0MsdUJBQUwsQ0FBNkJDLGtCQUE3QixFQUFQO0FBQTJEOzs7dUNBRS9EQyxlLEVBQWlCO0FBQUUsV0FBS0YsdUJBQUwsQ0FBNkJHLGtCQUE3QixDQUFnREQsZUFBaEQ7QUFBbUU7OzsyQkFFbEdFLGlCLEVBQW1CO0FBQ3hCLFVBQUlGLGtCQUFrQixLQUFLRCxrQkFBTCxFQUF0Qjs7QUFFQSxVQUFNSSxhQUFhLEtBQUtULGtCQUFMLEVBQW5CO0FBQUEsVUFDTVUsK0JBQStCVCxvQkFBb0JPLGlCQUFwQixFQUF1Q0MsVUFBdkMsQ0FEckM7QUFBQSxVQUVNRSw2QkFBNkJiLGlCQUFpQlEsZUFBakIsRUFBa0NJLDRCQUFsQyxDQUZuQztBQUFBLFVBR01FLDRCQUE0QmQsaUJBQWlCLEtBQUtLLGNBQXRCLEVBQXNDSyxpQkFBdEMsQ0FIbEM7O0FBS0FGLHdCQUFrQkssMEJBQWxCLENBUndCLENBUXNCOztBQUU5QyxXQUFLSixrQkFBTCxDQUF3QkQsZUFBeEI7O0FBRUEsV0FBS0gsY0FBTCxHQUFzQlMseUJBQXRCLENBWndCLENBWXlCO0FBQ2xEOzs7eUNBRW9CO0FBQ25CLFVBQU1OLGtCQUFrQixLQUFLRCxrQkFBTCxFQUF4QjtBQUFBLFVBQ01JLGFBQWFULG9CQUFtQixLQUFLRyxjQUF4QixFQUF3Q0csZUFBeEMsQ0FEbkI7O0FBR0EsYUFBT0csVUFBUDtBQUNEOzs7Z0RBRTJCO0FBQzFCLFVBQU1ILGtCQUFrQixLQUFLRCxrQkFBTCxFQUF4Qjs7QUFFQSxXQUFLRixjQUFMLEdBQXNCRyxlQUF0QixDQUgwQixDQUdjO0FBQ3pDOzs7Z0RBRWtDRix1QixFQUF5QjtBQUMxRCxVQUFNRSxrQkFBa0JGLHdCQUF3QkMsa0JBQXhCLEVBQXhCO0FBQUEsVUFDTUYsaUJBQWlCRyxlQUR2QjtBQUFBLFVBQ3dDO0FBQ2xDTyxpQkFBVyxJQUFJWCxRQUFKLENBQWFDLGNBQWIsRUFBNkJDLHVCQUE3QixDQUZqQjs7QUFJQSxhQUFPUyxRQUFQO0FBQ0Q7Ozs7OztBQUdIQyxPQUFPQyxPQUFQLEdBQWlCYixRQUFqQiIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgdHJhbnNmb3JtQ29udGVudCA9IHJlcXVpcmUoJy4uL2NvbnRlbnQvdHJhbnNmb3JtJyksXG4gICAgICBnZW5lcmF0ZU9wZXJhdGlvbnMgPSByZXF1aXJlKCcuLi9vcGVyYXRpb25zL2dlbmVyYXRlJyksXG4gICAgICB0cmFuc2Zvcm1PcGVyYXRpb25zID0gcmVxdWlyZSgnLi4vb3BlcmF0aW9ucy90cmFuc2Zvcm0nKTtcblxuY2xhc3MgRG9jdW1lbnQge1xuICBjb25zdHJ1Y3Rvcih3b3JraW5nQ29udGVudCwgZWRpdGFibGVDb250ZW50VGV4dGFyZWEpIHtcbiAgICB0aGlzLndvcmtpbmdDb250ZW50ID0gd29ya2luZ0NvbnRlbnQ7XG4gICAgdGhpcy5lZGl0YWJsZUNvbnRlbnRUZXh0YXJlYSA9IGVkaXRhYmxlQ29udGVudFRleHRhcmVhO1xuICB9XG5cbiAgZ2V0V29ya2luZ0NvbnRlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMud29ya2luZ0NvbnRlbnQ7XG4gIH1cblxuICBnZXRFZGl0YWJsZUNvbnRlbnQoKSB7IHJldHVybiB0aGlzLmVkaXRhYmxlQ29udGVudFRleHRhcmVhLmdldEVkaXRhYmxlQ29udGVudCgpOyB9XG5cbiAgc2V0RWRpdGFibGVDb250ZW50KGVkaXRhYmxlQ29udGVudCkgeyB0aGlzLmVkaXRhYmxlQ29udGVudFRleHRhcmVhLnNldEVkaXRhYmxlQ29udGVudChlZGl0YWJsZUNvbnRlbnQpOyB9XG5cbiAgdXBkYXRlKHBlbmRpbmdPcGVyYXRpb25zKSB7XG4gICAgbGV0IGVkaXRhYmxlQ29udGVudCA9IHRoaXMuZ2V0RWRpdGFibGVDb250ZW50KCk7XG5cbiAgICBjb25zdCBvcGVyYXRpb25zID0gdGhpcy5nZW5lcmF0ZU9wZXJhdGlvbnMoKSxcbiAgICAgICAgICB0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zID0gdHJhbnNmb3JtT3BlcmF0aW9ucyhwZW5kaW5nT3BlcmF0aW9ucywgb3BlcmF0aW9ucyksXG4gICAgICAgICAgdHJhbnNmb3JtZWRFZGl0YWJsZUNvbnRlbnQgPSB0cmFuc2Zvcm1Db250ZW50KGVkaXRhYmxlQ29udGVudCwgdHJhbnNmb3JtZWRQZW5kaW5nT3BlcmF0aW9ucyksXG4gICAgICAgICAgdHJhbnNmb3JtZWRXb3JraW5nQ29udGVudCA9IHRyYW5zZm9ybUNvbnRlbnQodGhpcy53b3JraW5nQ29udGVudCwgcGVuZGluZ09wZXJhdGlvbnMpO1xuXG4gICAgZWRpdGFibGVDb250ZW50ID0gdHJhbnNmb3JtZWRFZGl0YWJsZUNvbnRlbnQ7IC8vL1xuXG4gICAgdGhpcy5zZXRFZGl0YWJsZUNvbnRlbnQoZWRpdGFibGVDb250ZW50KTtcblxuICAgIHRoaXMud29ya2luZ0NvbnRlbnQgPSB0cmFuc2Zvcm1lZFdvcmtpbmdDb250ZW50OyAvLy9cbiAgfVxuXG4gIGdlbmVyYXRlT3BlcmF0aW9ucygpIHtcbiAgICBjb25zdCBlZGl0YWJsZUNvbnRlbnQgPSB0aGlzLmdldEVkaXRhYmxlQ29udGVudCgpLFxuICAgICAgICAgIG9wZXJhdGlvbnMgPSBnZW5lcmF0ZU9wZXJhdGlvbnModGhpcy53b3JraW5nQ29udGVudCwgZWRpdGFibGVDb250ZW50KTtcblxuICAgIHJldHVybiBvcGVyYXRpb25zO1xuICB9XG5cbiAgc3luY2hyb25pc2VXb3JraW5nQ29udGVudCgpIHtcbiAgICBjb25zdCBlZGl0YWJsZUNvbnRlbnQgPSB0aGlzLmdldEVkaXRhYmxlQ29udGVudCgpO1xuXG4gICAgdGhpcy53b3JraW5nQ29udGVudCA9IGVkaXRhYmxlQ29udGVudDsgIC8vL1xuICB9XG5cbiAgc3RhdGljIGZyb21FZGl0YWJsZUNvbnRlbnRUZXh0YXJlYShlZGl0YWJsZUNvbnRlbnRUZXh0YXJlYSkge1xuICAgIGNvbnN0IGVkaXRhYmxlQ29udGVudCA9IGVkaXRhYmxlQ29udGVudFRleHRhcmVhLmdldEVkaXRhYmxlQ29udGVudCgpLFxuICAgICAgICAgIHdvcmtpbmdDb250ZW50ID0gZWRpdGFibGVDb250ZW50LCAvLy9cbiAgICAgICAgICBkb2N1bWVudCA9IG5ldyBEb2N1bWVudCh3b3JraW5nQ29udGVudCwgZWRpdGFibGVDb250ZW50VGV4dGFyZWEpO1xuXG4gICAgcmV0dXJuIGRvY3VtZW50O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRG9jdW1lbnQ7XG4iXX0=