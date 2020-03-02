'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transformContent = require('../content/transform'),
    _generateOperations = require('../operations/generate'),
    transformOperations = require('../operations/transform');

var Document = /*#__PURE__*/function () {
  function Document(workingContent, editableContentTextarea) {
    _classCallCheck(this, Document);

    this.workingContent = workingContent;
    this.editableContentTextarea = editableContentTextarea;
  }

  _createClass(Document, [{
    key: "getWorkingContent",
    value: function getWorkingContent() {
      return this.workingContent;
    }
  }, {
    key: "getEditableContent",
    value: function getEditableContent() {
      return this.editableContentTextarea.getEditableContent();
    }
  }, {
    key: "setEditableContent",
    value: function setEditableContent(editableContent) {
      this.editableContentTextarea.setEditableContent(editableContent);
    }
  }, {
    key: "synchroniseWorkingContent",
    value: function synchroniseWorkingContent() {
      var editableContent = this.getEditableContent(),
          workingContent = editableContent; ///

      this.workingContent = workingContent;
    }
  }, {
    key: "update",
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
    key: "generateOperations",
    value: function generateOperations() {
      var editableContent = this.getEditableContent(),
          operations = _generateOperations(this.workingContent, editableContent);

      return operations;
    }
  }], [{
    key: "fromEditableContentTextarea",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvY3VtZW50LmpzIl0sIm5hbWVzIjpbInRyYW5zZm9ybUNvbnRlbnQiLCJyZXF1aXJlIiwiZ2VuZXJhdGVPcGVyYXRpb25zIiwidHJhbnNmb3JtT3BlcmF0aW9ucyIsIkRvY3VtZW50Iiwid29ya2luZ0NvbnRlbnQiLCJlZGl0YWJsZUNvbnRlbnRUZXh0YXJlYSIsImdldEVkaXRhYmxlQ29udGVudCIsImVkaXRhYmxlQ29udGVudCIsInNldEVkaXRhYmxlQ29udGVudCIsInBlbmRpbmdPcGVyYXRpb25zIiwib3BlcmF0aW9ucyIsInRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMiLCJ0cmFuc2Zvcm1lZEVkaXRhYmxlQ29udGVudCIsInRyYW5zZm9ybWVkV29ya2luZ0NvbnRlbnQiLCJ1cFRvRGF0ZSIsImRvY3VtZW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBRUEsSUFBTUEsZ0JBQWdCLEdBQUdDLE9BQU8sQ0FBQyxzQkFBRCxDQUFoQztBQUFBLElBQ01DLG1CQUFrQixHQUFHRCxPQUFPLENBQUMsd0JBQUQsQ0FEbEM7QUFBQSxJQUVNRSxtQkFBbUIsR0FBR0YsT0FBTyxDQUFDLHlCQUFELENBRm5DOztJQUlNRyxRO0FBQ0osb0JBQVlDLGNBQVosRUFBNEJDLHVCQUE1QixFQUFxRDtBQUFBOztBQUNuRCxTQUFLRCxjQUFMLEdBQXNCQSxjQUF0QjtBQUNBLFNBQUtDLHVCQUFMLEdBQStCQSx1QkFBL0I7QUFDRDs7Ozt3Q0FFbUI7QUFDbEIsYUFBTyxLQUFLRCxjQUFaO0FBQ0Q7Ozt5Q0FFb0I7QUFBRSxhQUFPLEtBQUtDLHVCQUFMLENBQTZCQyxrQkFBN0IsRUFBUDtBQUEyRDs7O3VDQUUvREMsZSxFQUFpQjtBQUFFLFdBQUtGLHVCQUFMLENBQTZCRyxrQkFBN0IsQ0FBZ0RELGVBQWhEO0FBQW1FOzs7Z0RBRTdFO0FBQzFCLFVBQU1BLGVBQWUsR0FBRyxLQUFLRCxrQkFBTCxFQUF4QjtBQUFBLFVBQ01GLGNBQWMsR0FBR0csZUFEdkIsQ0FEMEIsQ0FFYzs7QUFFeEMsV0FBS0gsY0FBTCxHQUFzQkEsY0FBdEI7QUFDRDs7OzJCQUVNSyxpQixFQUFtQjtBQUN4QixVQUFJRixlQUFlLEdBQUcsS0FBS0Qsa0JBQUwsRUFBdEI7QUFFQSxVQUFNSSxVQUFVLEdBQUcsS0FBS1Qsa0JBQUwsRUFBbkI7QUFBQSxVQUNNVSw0QkFBNEIsR0FBR1QsbUJBQW1CLENBQUNPLGlCQUFELEVBQW9CQyxVQUFwQixDQUR4RDtBQUFBLFVBRU1FLDBCQUEwQixHQUFHYixnQkFBZ0IsQ0FBQ1EsZUFBRCxFQUFrQkksNEJBQWxCLENBRm5EO0FBQUEsVUFHTUUseUJBQXlCLEdBQUdkLGdCQUFnQixDQUFDLEtBQUtLLGNBQU4sRUFBc0JLLGlCQUF0QixDQUhsRDtBQUtBRixNQUFBQSxlQUFlLEdBQUdLLDBCQUFsQixDQVJ3QixDQVFzQjs7QUFFOUMsV0FBS0osa0JBQUwsQ0FBd0JELGVBQXhCO0FBRUEsV0FBS0gsY0FBTCxHQUFzQlMseUJBQXRCLENBWndCLENBWXlCOztBQUVqRCxVQUFNQyxRQUFRLEdBQUlQLGVBQWUsS0FBSyxLQUFLSCxjQUEzQztBQUVBLGFBQU9VLFFBQVA7QUFDRDs7O3lDQUVvQjtBQUNuQixVQUFNUCxlQUFlLEdBQUcsS0FBS0Qsa0JBQUwsRUFBeEI7QUFBQSxVQUNNSSxVQUFVLEdBQUdULG1CQUFrQixDQUFDLEtBQUtHLGNBQU4sRUFBc0JHLGVBQXRCLENBRHJDOztBQUdBLGFBQU9HLFVBQVA7QUFDRDs7O2dEQUVrQ0wsdUIsRUFBeUI7QUFDMUQsVUFBTUUsZUFBZSxHQUFHRix1QkFBdUIsQ0FBQ0Msa0JBQXhCLEVBQXhCO0FBQUEsVUFDTUYsY0FBYyxHQUFHRyxlQUR2QjtBQUFBLFVBQ3dDO0FBQ2xDUSxNQUFBQSxRQUFRLEdBQUcsSUFBSVosUUFBSixDQUFhQyxjQUFiLEVBQTZCQyx1QkFBN0IsQ0FGakI7QUFJQSxhQUFPVSxRQUFQO0FBQ0Q7Ozs7OztBQUdIQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJkLFFBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB0cmFuc2Zvcm1Db250ZW50ID0gcmVxdWlyZSgnLi4vY29udGVudC90cmFuc2Zvcm0nKSxcbiAgICAgIGdlbmVyYXRlT3BlcmF0aW9ucyA9IHJlcXVpcmUoJy4uL29wZXJhdGlvbnMvZ2VuZXJhdGUnKSxcbiAgICAgIHRyYW5zZm9ybU9wZXJhdGlvbnMgPSByZXF1aXJlKCcuLi9vcGVyYXRpb25zL3RyYW5zZm9ybScpO1xuXG5jbGFzcyBEb2N1bWVudCB7XG4gIGNvbnN0cnVjdG9yKHdvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnRUZXh0YXJlYSkge1xuICAgIHRoaXMud29ya2luZ0NvbnRlbnQgPSB3b3JraW5nQ29udGVudDtcbiAgICB0aGlzLmVkaXRhYmxlQ29udGVudFRleHRhcmVhID0gZWRpdGFibGVDb250ZW50VGV4dGFyZWE7XG4gIH1cblxuICBnZXRXb3JraW5nQ29udGVudCgpIHtcbiAgICByZXR1cm4gdGhpcy53b3JraW5nQ29udGVudDtcbiAgfVxuXG4gIGdldEVkaXRhYmxlQ29udGVudCgpIHsgcmV0dXJuIHRoaXMuZWRpdGFibGVDb250ZW50VGV4dGFyZWEuZ2V0RWRpdGFibGVDb250ZW50KCk7IH1cblxuICBzZXRFZGl0YWJsZUNvbnRlbnQoZWRpdGFibGVDb250ZW50KSB7IHRoaXMuZWRpdGFibGVDb250ZW50VGV4dGFyZWEuc2V0RWRpdGFibGVDb250ZW50KGVkaXRhYmxlQ29udGVudCk7IH1cblxuICBzeW5jaHJvbmlzZVdvcmtpbmdDb250ZW50KCkge1xuICAgIGNvbnN0IGVkaXRhYmxlQ29udGVudCA9IHRoaXMuZ2V0RWRpdGFibGVDb250ZW50KCksXG4gICAgICAgICAgd29ya2luZ0NvbnRlbnQgPSBlZGl0YWJsZUNvbnRlbnQ7IC8vL1xuXG4gICAgdGhpcy53b3JraW5nQ29udGVudCA9IHdvcmtpbmdDb250ZW50O1xuICB9XG5cbiAgdXBkYXRlKHBlbmRpbmdPcGVyYXRpb25zKSB7XG4gICAgbGV0IGVkaXRhYmxlQ29udGVudCA9IHRoaXMuZ2V0RWRpdGFibGVDb250ZW50KCk7XG5cbiAgICBjb25zdCBvcGVyYXRpb25zID0gdGhpcy5nZW5lcmF0ZU9wZXJhdGlvbnMoKSxcbiAgICAgICAgICB0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zID0gdHJhbnNmb3JtT3BlcmF0aW9ucyhwZW5kaW5nT3BlcmF0aW9ucywgb3BlcmF0aW9ucyksXG4gICAgICAgICAgdHJhbnNmb3JtZWRFZGl0YWJsZUNvbnRlbnQgPSB0cmFuc2Zvcm1Db250ZW50KGVkaXRhYmxlQ29udGVudCwgdHJhbnNmb3JtZWRQZW5kaW5nT3BlcmF0aW9ucyksXG4gICAgICAgICAgdHJhbnNmb3JtZWRXb3JraW5nQ29udGVudCA9IHRyYW5zZm9ybUNvbnRlbnQodGhpcy53b3JraW5nQ29udGVudCwgcGVuZGluZ09wZXJhdGlvbnMpO1xuXG4gICAgZWRpdGFibGVDb250ZW50ID0gdHJhbnNmb3JtZWRFZGl0YWJsZUNvbnRlbnQ7IC8vL1xuXG4gICAgdGhpcy5zZXRFZGl0YWJsZUNvbnRlbnQoZWRpdGFibGVDb250ZW50KTtcblxuICAgIHRoaXMud29ya2luZ0NvbnRlbnQgPSB0cmFuc2Zvcm1lZFdvcmtpbmdDb250ZW50OyAvLy9cblxuICAgIGNvbnN0IHVwVG9EYXRlID0gKGVkaXRhYmxlQ29udGVudCA9PT0gdGhpcy53b3JraW5nQ29udGVudCk7XG5cbiAgICByZXR1cm4gdXBUb0RhdGVcbiAgfVxuXG4gIGdlbmVyYXRlT3BlcmF0aW9ucygpIHtcbiAgICBjb25zdCBlZGl0YWJsZUNvbnRlbnQgPSB0aGlzLmdldEVkaXRhYmxlQ29udGVudCgpLFxuICAgICAgICAgIG9wZXJhdGlvbnMgPSBnZW5lcmF0ZU9wZXJhdGlvbnModGhpcy53b3JraW5nQ29udGVudCwgZWRpdGFibGVDb250ZW50KTtcblxuICAgIHJldHVybiBvcGVyYXRpb25zO1xuICB9XG5cbiAgc3RhdGljIGZyb21FZGl0YWJsZUNvbnRlbnRUZXh0YXJlYShlZGl0YWJsZUNvbnRlbnRUZXh0YXJlYSkge1xuICAgIGNvbnN0IGVkaXRhYmxlQ29udGVudCA9IGVkaXRhYmxlQ29udGVudFRleHRhcmVhLmdldEVkaXRhYmxlQ29udGVudCgpLFxuICAgICAgICAgIHdvcmtpbmdDb250ZW50ID0gZWRpdGFibGVDb250ZW50LCAvLy9cbiAgICAgICAgICBkb2N1bWVudCA9IG5ldyBEb2N1bWVudCh3b3JraW5nQ29udGVudCwgZWRpdGFibGVDb250ZW50VGV4dGFyZWEpO1xuXG4gICAgcmV0dXJuIGRvY3VtZW50O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRG9jdW1lbnQ7XG4iXX0=