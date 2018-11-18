'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var transformContent = require('./content/transform'),
    _generateOperations = require('./operations/generate'),
    transformOperations = require('./operations/transform');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJ0cmFuc2Zvcm1Db250ZW50IiwicmVxdWlyZSIsImdlbmVyYXRlT3BlcmF0aW9ucyIsInRyYW5zZm9ybU9wZXJhdGlvbnMiLCJEb2N1bWVudCIsIndvcmtpbmdDb250ZW50IiwiZWRpdGFibGVDb250ZW50VGV4dGFyZWEiLCJnZXRFZGl0YWJsZUNvbnRlbnQiLCJlZGl0YWJsZUNvbnRlbnQiLCJzZXRFZGl0YWJsZUNvbnRlbnQiLCJwZW5kaW5nT3BlcmF0aW9ucyIsIm9wZXJhdGlvbnMiLCJ0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zIiwidHJhbnNmb3JtZWRFZGl0YWJsZUNvbnRlbnQiLCJ0cmFuc2Zvcm1lZFdvcmtpbmdDb250ZW50IiwidXBUb0RhdGUiLCJkb2N1bWVudCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFFQSxJQUFNQSxtQkFBbUJDLFFBQVEscUJBQVIsQ0FBekI7QUFBQSxJQUNNQyxzQkFBcUJELFFBQVEsdUJBQVIsQ0FEM0I7QUFBQSxJQUVNRSxzQkFBc0JGLFFBQVEsd0JBQVIsQ0FGNUI7O0lBSU1HLFE7QUFDSixvQkFBWUMsY0FBWixFQUE0QkMsdUJBQTVCLEVBQXFEO0FBQUE7O0FBQ25ELFNBQUtELGNBQUwsR0FBc0JBLGNBQXRCO0FBQ0EsU0FBS0MsdUJBQUwsR0FBK0JBLHVCQUEvQjtBQUNEOzs7O3dDQUVtQjtBQUNsQixhQUFPLEtBQUtELGNBQVo7QUFDRDs7O3lDQUVvQjtBQUFFLGFBQU8sS0FBS0MsdUJBQUwsQ0FBNkJDLGtCQUE3QixFQUFQO0FBQTJEOzs7dUNBRS9EQyxlLEVBQWlCO0FBQUUsV0FBS0YsdUJBQUwsQ0FBNkJHLGtCQUE3QixDQUFnREQsZUFBaEQ7QUFBbUU7Ozs0QkFFakc7QUFDTixVQUFNQSxrQkFBa0IsS0FBS0Qsa0JBQUwsRUFBeEI7O0FBRUEsV0FBS0YsY0FBTCxHQUFzQkcsZUFBdEIsQ0FITSxDQUdrQztBQUN6Qzs7OzJCQUVNRSxpQixFQUFtQjtBQUN4QixVQUFJRixrQkFBa0IsS0FBS0Qsa0JBQUwsRUFBdEI7O0FBRUEsVUFBTUksYUFBYSxLQUFLVCxrQkFBTCxFQUFuQjtBQUFBLFVBQ01VLCtCQUErQlQsb0JBQW9CTyxpQkFBcEIsRUFBdUNDLFVBQXZDLENBRHJDO0FBQUEsVUFFTUUsNkJBQTZCYixpQkFBaUJRLGVBQWpCLEVBQWtDSSw0QkFBbEMsQ0FGbkM7QUFBQSxVQUdNRSw0QkFBNEJkLGlCQUFpQixLQUFLSyxjQUF0QixFQUFzQ0ssaUJBQXRDLENBSGxDOztBQUtBRix3QkFBa0JLLDBCQUFsQixDQVJ3QixDQVFzQjs7QUFFOUMsV0FBS0osa0JBQUwsQ0FBd0JELGVBQXhCOztBQUVBLFdBQUtILGNBQUwsR0FBc0JTLHlCQUF0QixDQVp3QixDQVl5Qjs7QUFFakQsVUFBTUMsV0FBWVAsb0JBQW9CLEtBQUtILGNBQTNDOztBQUVBLGFBQU9VLFFBQVA7QUFDRDs7O3lDQUVvQjtBQUNuQixVQUFNUCxrQkFBa0IsS0FBS0Qsa0JBQUwsRUFBeEI7QUFBQSxVQUNNSSxhQUFhVCxvQkFBbUIsS0FBS0csY0FBeEIsRUFBd0NHLGVBQXhDLENBRG5COztBQUdBLGFBQU9HLFVBQVA7QUFDRDs7O2dEQUVrQ0wsdUIsRUFBeUI7QUFDMUQsVUFBTUUsa0JBQWtCRix3QkFBd0JDLGtCQUF4QixFQUF4QjtBQUFBLFVBQ01GLGlCQUFpQkcsZUFEdkI7QUFBQSxVQUN3QztBQUNsQ1EsaUJBQVcsSUFBSVosUUFBSixDQUFhQyxjQUFiLEVBQTZCQyx1QkFBN0IsQ0FGakI7O0FBSUEsYUFBT1UsUUFBUDtBQUNEOzs7Ozs7QUFHSEMsT0FBT0MsT0FBUCxHQUFpQmQsUUFBakIiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHRyYW5zZm9ybUNvbnRlbnQgPSByZXF1aXJlKCcuL2NvbnRlbnQvdHJhbnNmb3JtJyksXG4gICAgICBnZW5lcmF0ZU9wZXJhdGlvbnMgPSByZXF1aXJlKCcuL29wZXJhdGlvbnMvZ2VuZXJhdGUnKSxcbiAgICAgIHRyYW5zZm9ybU9wZXJhdGlvbnMgPSByZXF1aXJlKCcuL29wZXJhdGlvbnMvdHJhbnNmb3JtJyk7XG5cbmNsYXNzIERvY3VtZW50IHtcbiAgY29uc3RydWN0b3Iod29ya2luZ0NvbnRlbnQsIGVkaXRhYmxlQ29udGVudFRleHRhcmVhKSB7XG4gICAgdGhpcy53b3JraW5nQ29udGVudCA9IHdvcmtpbmdDb250ZW50O1xuICAgIHRoaXMuZWRpdGFibGVDb250ZW50VGV4dGFyZWEgPSBlZGl0YWJsZUNvbnRlbnRUZXh0YXJlYTtcbiAgfVxuXG4gIGdldFdvcmtpbmdDb250ZW50KCkge1xuICAgIHJldHVybiB0aGlzLndvcmtpbmdDb250ZW50O1xuICB9XG5cbiAgZ2V0RWRpdGFibGVDb250ZW50KCkgeyByZXR1cm4gdGhpcy5lZGl0YWJsZUNvbnRlbnRUZXh0YXJlYS5nZXRFZGl0YWJsZUNvbnRlbnQoKTsgfVxuXG4gIHNldEVkaXRhYmxlQ29udGVudChlZGl0YWJsZUNvbnRlbnQpIHsgdGhpcy5lZGl0YWJsZUNvbnRlbnRUZXh0YXJlYS5zZXRFZGl0YWJsZUNvbnRlbnQoZWRpdGFibGVDb250ZW50KTsgfVxuXG4gIHJlc2V0KCkge1xuICAgIGNvbnN0IGVkaXRhYmxlQ29udGVudCA9IHRoaXMuZ2V0RWRpdGFibGVDb250ZW50KCk7XG5cbiAgICB0aGlzLndvcmtpbmdDb250ZW50ID0gZWRpdGFibGVDb250ZW50OyAgLy8vXG4gIH1cblxuICB1cGRhdGUocGVuZGluZ09wZXJhdGlvbnMpIHtcbiAgICBsZXQgZWRpdGFibGVDb250ZW50ID0gdGhpcy5nZXRFZGl0YWJsZUNvbnRlbnQoKTtcblxuICAgIGNvbnN0IG9wZXJhdGlvbnMgPSB0aGlzLmdlbmVyYXRlT3BlcmF0aW9ucygpLFxuICAgICAgICAgIHRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMgPSB0cmFuc2Zvcm1PcGVyYXRpb25zKHBlbmRpbmdPcGVyYXRpb25zLCBvcGVyYXRpb25zKSxcbiAgICAgICAgICB0cmFuc2Zvcm1lZEVkaXRhYmxlQ29udGVudCA9IHRyYW5zZm9ybUNvbnRlbnQoZWRpdGFibGVDb250ZW50LCB0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zKSxcbiAgICAgICAgICB0cmFuc2Zvcm1lZFdvcmtpbmdDb250ZW50ID0gdHJhbnNmb3JtQ29udGVudCh0aGlzLndvcmtpbmdDb250ZW50LCBwZW5kaW5nT3BlcmF0aW9ucyk7XG5cbiAgICBlZGl0YWJsZUNvbnRlbnQgPSB0cmFuc2Zvcm1lZEVkaXRhYmxlQ29udGVudDsgLy8vXG5cbiAgICB0aGlzLnNldEVkaXRhYmxlQ29udGVudChlZGl0YWJsZUNvbnRlbnQpO1xuXG4gICAgdGhpcy53b3JraW5nQ29udGVudCA9IHRyYW5zZm9ybWVkV29ya2luZ0NvbnRlbnQ7IC8vL1xuXG4gICAgY29uc3QgdXBUb0RhdGUgPSAoZWRpdGFibGVDb250ZW50ID09PSB0aGlzLndvcmtpbmdDb250ZW50KTtcblxuICAgIHJldHVybiB1cFRvRGF0ZVxuICB9XG5cbiAgZ2VuZXJhdGVPcGVyYXRpb25zKCkge1xuICAgIGNvbnN0IGVkaXRhYmxlQ29udGVudCA9IHRoaXMuZ2V0RWRpdGFibGVDb250ZW50KCksXG4gICAgICAgICAgb3BlcmF0aW9ucyA9IGdlbmVyYXRlT3BlcmF0aW9ucyh0aGlzLndvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnQpO1xuXG4gICAgcmV0dXJuIG9wZXJhdGlvbnM7XG4gIH1cblxuICBzdGF0aWMgZnJvbUVkaXRhYmxlQ29udGVudFRleHRhcmVhKGVkaXRhYmxlQ29udGVudFRleHRhcmVhKSB7XG4gICAgY29uc3QgZWRpdGFibGVDb250ZW50ID0gZWRpdGFibGVDb250ZW50VGV4dGFyZWEuZ2V0RWRpdGFibGVDb250ZW50KCksXG4gICAgICAgICAgd29ya2luZ0NvbnRlbnQgPSBlZGl0YWJsZUNvbnRlbnQsIC8vL1xuICAgICAgICAgIGRvY3VtZW50ID0gbmV3IERvY3VtZW50KHdvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnRUZXh0YXJlYSk7XG5cbiAgICByZXR1cm4gZG9jdW1lbnQ7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEb2N1bWVudDtcbiJdfQ==