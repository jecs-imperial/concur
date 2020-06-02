"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = require("../index");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

///
var Document = /*#__PURE__*/function () {
  function Document(workingContent, richTextarea) {
    _classCallCheck(this, Document);

    this.workingContent = workingContent;
    this.richTextarea = richTextarea;
  }

  _createClass(Document, [{
    key: "getWorkingContent",
    value: function getWorkingContent() {
      return this.workingContent;
    }
  }, {
    key: "getEditableContent",
    value: function getEditableContent() {
      var content = this.richTextarea.getContent(),
          editableContent = content; ///

      return editableContent;
    }
  }, {
    key: "setEditableContent",
    value: function setEditableContent(editableContent) {
      var content = editableContent; ///

      this.richTextarea.setContent(content);
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
          transformedPendingOperations = (0, _index.transformOperations)(pendingOperations, operations),
          transformedEditableContent = (0, _index.transformContent)(editableContent, transformedPendingOperations),
          transformedWorkingContent = (0, _index.transformContent)(this.workingContent, pendingOperations);
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
          operations = (0, _index.generateOperations)(this.workingContent, editableContent);
      return operations;
    }
  }], [{
    key: "fromRichTextarea",
    value: function fromRichTextarea(richTextarea) {
      var content = richTextarea.getContent(),
          editableContent = content,
          ///
      workingContent = editableContent,
          ///
      document = new Document(workingContent, richTextarea);
      return document;
    }
  }]);

  return Document;
}();

exports["default"] = Document;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvY3VtZW50LmpzIl0sIm5hbWVzIjpbIkRvY3VtZW50Iiwid29ya2luZ0NvbnRlbnQiLCJyaWNoVGV4dGFyZWEiLCJjb250ZW50IiwiZ2V0Q29udGVudCIsImVkaXRhYmxlQ29udGVudCIsInNldENvbnRlbnQiLCJnZXRFZGl0YWJsZUNvbnRlbnQiLCJwZW5kaW5nT3BlcmF0aW9ucyIsIm9wZXJhdGlvbnMiLCJnZW5lcmF0ZU9wZXJhdGlvbnMiLCJ0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zIiwidHJhbnNmb3JtZWRFZGl0YWJsZUNvbnRlbnQiLCJ0cmFuc2Zvcm1lZFdvcmtpbmdDb250ZW50Iiwic2V0RWRpdGFibGVDb250ZW50IiwidXBUb0RhdGUiLCJkb2N1bWVudCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7Ozs7Ozs7QUFBc0Y7SUFFakVBLFE7QUFDbkIsb0JBQVlDLGNBQVosRUFBNEJDLFlBQTVCLEVBQTBDO0FBQUE7O0FBQ3hDLFNBQUtELGNBQUwsR0FBc0JBLGNBQXRCO0FBQ0EsU0FBS0MsWUFBTCxHQUFvQkEsWUFBcEI7QUFDRDs7Ozt3Q0FFbUI7QUFDbEIsYUFBTyxLQUFLRCxjQUFaO0FBQ0Q7Ozt5Q0FFb0I7QUFDbkIsVUFBTUUsT0FBTyxHQUFHLEtBQUtELFlBQUwsQ0FBa0JFLFVBQWxCLEVBQWhCO0FBQUEsVUFDTUMsZUFBZSxHQUFHRixPQUR4QixDQURtQixDQUVlOztBQUVsQyxhQUFPRSxlQUFQO0FBQ0Q7Ozt1Q0FFa0JBLGUsRUFBaUI7QUFDbEMsVUFBTUYsT0FBTyxHQUFHRSxlQUFoQixDQURrQyxDQUNBOztBQUVsQyxXQUFLSCxZQUFMLENBQWtCSSxVQUFsQixDQUE2QkgsT0FBN0I7QUFDRDs7O2dEQUUyQjtBQUMxQixVQUFNRSxlQUFlLEdBQUcsS0FBS0Usa0JBQUwsRUFBeEI7QUFBQSxVQUNNTixjQUFjLEdBQUdJLGVBRHZCLENBRDBCLENBRWM7O0FBRXhDLFdBQUtKLGNBQUwsR0FBc0JBLGNBQXRCO0FBQ0Q7OzsyQkFFTU8saUIsRUFBbUI7QUFDeEIsVUFBSUgsZUFBZSxHQUFHLEtBQUtFLGtCQUFMLEVBQXRCO0FBRUEsVUFBTUUsVUFBVSxHQUFHLEtBQUtDLGtCQUFMLEVBQW5CO0FBQUEsVUFDTUMsNEJBQTRCLEdBQUcsZ0NBQW9CSCxpQkFBcEIsRUFBdUNDLFVBQXZDLENBRHJDO0FBQUEsVUFFTUcsMEJBQTBCLEdBQUcsNkJBQWlCUCxlQUFqQixFQUFrQ00sNEJBQWxDLENBRm5DO0FBQUEsVUFHTUUseUJBQXlCLEdBQUcsNkJBQWlCLEtBQUtaLGNBQXRCLEVBQXNDTyxpQkFBdEMsQ0FIbEM7QUFLQUgsTUFBQUEsZUFBZSxHQUFHTywwQkFBbEIsQ0FSd0IsQ0FRc0I7O0FBRTlDLFdBQUtFLGtCQUFMLENBQXdCVCxlQUF4QjtBQUVBLFdBQUtKLGNBQUwsR0FBc0JZLHlCQUF0QixDQVp3QixDQVl5Qjs7QUFFakQsVUFBTUUsUUFBUSxHQUFJVixlQUFlLEtBQUssS0FBS0osY0FBM0M7QUFFQSxhQUFPYyxRQUFQO0FBQ0Q7Ozt5Q0FFb0I7QUFDbkIsVUFBTVYsZUFBZSxHQUFHLEtBQUtFLGtCQUFMLEVBQXhCO0FBQUEsVUFDTUUsVUFBVSxHQUFHLCtCQUFtQixLQUFLUixjQUF4QixFQUF3Q0ksZUFBeEMsQ0FEbkI7QUFHQSxhQUFPSSxVQUFQO0FBQ0Q7OztxQ0FFdUJQLFksRUFBYztBQUNwQyxVQUFNQyxPQUFPLEdBQUdELFlBQVksQ0FBQ0UsVUFBYixFQUFoQjtBQUFBLFVBQ01DLGVBQWUsR0FBR0YsT0FEeEI7QUFBQSxVQUNrQztBQUM1QkYsTUFBQUEsY0FBYyxHQUFHSSxlQUZ2QjtBQUFBLFVBRXdDO0FBQ2xDVyxNQUFBQSxRQUFRLEdBQUcsSUFBSWhCLFFBQUosQ0FBYUMsY0FBYixFQUE2QkMsWUFBN0IsQ0FIakI7QUFLQSxhQUFPYyxRQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgdHJhbnNmb3JtQ29udGVudCwgZ2VuZXJhdGVPcGVyYXRpb25zLCB0cmFuc2Zvcm1PcGVyYXRpb25zIH0gZnJvbSBcIi4uL2luZGV4XCI7IC8vL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudCB7XG4gIGNvbnN0cnVjdG9yKHdvcmtpbmdDb250ZW50LCByaWNoVGV4dGFyZWEpIHtcbiAgICB0aGlzLndvcmtpbmdDb250ZW50ID0gd29ya2luZ0NvbnRlbnQ7XG4gICAgdGhpcy5yaWNoVGV4dGFyZWEgPSByaWNoVGV4dGFyZWE7XG4gIH1cblxuICBnZXRXb3JraW5nQ29udGVudCgpIHtcbiAgICByZXR1cm4gdGhpcy53b3JraW5nQ29udGVudDtcbiAgfVxuXG4gIGdldEVkaXRhYmxlQ29udGVudCgpIHtcbiAgICBjb25zdCBjb250ZW50ID0gdGhpcy5yaWNoVGV4dGFyZWEuZ2V0Q29udGVudCgpLFxuICAgICAgICAgIGVkaXRhYmxlQ29udGVudCA9IGNvbnRlbnQ7ICAvLy9cblxuICAgIHJldHVybiBlZGl0YWJsZUNvbnRlbnQ7XG4gIH1cblxuICBzZXRFZGl0YWJsZUNvbnRlbnQoZWRpdGFibGVDb250ZW50KSB7XG4gICAgY29uc3QgY29udGVudCA9IGVkaXRhYmxlQ29udGVudDsgIC8vL1xuXG4gICAgdGhpcy5yaWNoVGV4dGFyZWEuc2V0Q29udGVudChjb250ZW50KTtcbiAgfVxuXG4gIHN5bmNocm9uaXNlV29ya2luZ0NvbnRlbnQoKSB7XG4gICAgY29uc3QgZWRpdGFibGVDb250ZW50ID0gdGhpcy5nZXRFZGl0YWJsZUNvbnRlbnQoKSxcbiAgICAgICAgICB3b3JraW5nQ29udGVudCA9IGVkaXRhYmxlQ29udGVudDsgLy8vXG5cbiAgICB0aGlzLndvcmtpbmdDb250ZW50ID0gd29ya2luZ0NvbnRlbnQ7XG4gIH1cblxuICB1cGRhdGUocGVuZGluZ09wZXJhdGlvbnMpIHtcbiAgICBsZXQgZWRpdGFibGVDb250ZW50ID0gdGhpcy5nZXRFZGl0YWJsZUNvbnRlbnQoKTtcblxuICAgIGNvbnN0IG9wZXJhdGlvbnMgPSB0aGlzLmdlbmVyYXRlT3BlcmF0aW9ucygpLFxuICAgICAgICAgIHRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMgPSB0cmFuc2Zvcm1PcGVyYXRpb25zKHBlbmRpbmdPcGVyYXRpb25zLCBvcGVyYXRpb25zKSxcbiAgICAgICAgICB0cmFuc2Zvcm1lZEVkaXRhYmxlQ29udGVudCA9IHRyYW5zZm9ybUNvbnRlbnQoZWRpdGFibGVDb250ZW50LCB0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zKSxcbiAgICAgICAgICB0cmFuc2Zvcm1lZFdvcmtpbmdDb250ZW50ID0gdHJhbnNmb3JtQ29udGVudCh0aGlzLndvcmtpbmdDb250ZW50LCBwZW5kaW5nT3BlcmF0aW9ucyk7XG5cbiAgICBlZGl0YWJsZUNvbnRlbnQgPSB0cmFuc2Zvcm1lZEVkaXRhYmxlQ29udGVudDsgLy8vXG5cbiAgICB0aGlzLnNldEVkaXRhYmxlQ29udGVudChlZGl0YWJsZUNvbnRlbnQpO1xuXG4gICAgdGhpcy53b3JraW5nQ29udGVudCA9IHRyYW5zZm9ybWVkV29ya2luZ0NvbnRlbnQ7IC8vL1xuXG4gICAgY29uc3QgdXBUb0RhdGUgPSAoZWRpdGFibGVDb250ZW50ID09PSB0aGlzLndvcmtpbmdDb250ZW50KTtcblxuICAgIHJldHVybiB1cFRvRGF0ZVxuICB9XG5cbiAgZ2VuZXJhdGVPcGVyYXRpb25zKCkge1xuICAgIGNvbnN0IGVkaXRhYmxlQ29udGVudCA9IHRoaXMuZ2V0RWRpdGFibGVDb250ZW50KCksXG4gICAgICAgICAgb3BlcmF0aW9ucyA9IGdlbmVyYXRlT3BlcmF0aW9ucyh0aGlzLndvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnQpO1xuXG4gICAgcmV0dXJuIG9wZXJhdGlvbnM7XG4gIH1cblxuICBzdGF0aWMgZnJvbVJpY2hUZXh0YXJlYShyaWNoVGV4dGFyZWEpIHtcbiAgICBjb25zdCBjb250ZW50ID0gcmljaFRleHRhcmVhLmdldENvbnRlbnQoKSxcbiAgICAgICAgICBlZGl0YWJsZUNvbnRlbnQgPSBjb250ZW50LCAgLy8vXG4gICAgICAgICAgd29ya2luZ0NvbnRlbnQgPSBlZGl0YWJsZUNvbnRlbnQsIC8vL1xuICAgICAgICAgIGRvY3VtZW50ID0gbmV3IERvY3VtZW50KHdvcmtpbmdDb250ZW50LCByaWNoVGV4dGFyZWEpO1xuXG4gICAgcmV0dXJuIGRvY3VtZW50O1xuICB9XG59XG4iXX0=