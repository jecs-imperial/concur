"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = require("../index");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvY3VtZW50LmpzIl0sIm5hbWVzIjpbIkRvY3VtZW50Iiwid29ya2luZ0NvbnRlbnQiLCJyaWNoVGV4dGFyZWEiLCJjb250ZW50IiwiZ2V0Q29udGVudCIsImVkaXRhYmxlQ29udGVudCIsInNldENvbnRlbnQiLCJnZXRFZGl0YWJsZUNvbnRlbnQiLCJwZW5kaW5nT3BlcmF0aW9ucyIsIm9wZXJhdGlvbnMiLCJnZW5lcmF0ZU9wZXJhdGlvbnMiLCJ0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zIiwidHJhbnNmb3JtZWRFZGl0YWJsZUNvbnRlbnQiLCJ0cmFuc2Zvcm1lZFdvcmtpbmdDb250ZW50Iiwic2V0RWRpdGFibGVDb250ZW50IiwidXBUb0RhdGUiLCJkb2N1bWVudCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7Ozs7Ozs7SUFFcUJBLFE7QUFDbkIsb0JBQVlDLGNBQVosRUFBNEJDLFlBQTVCLEVBQTBDO0FBQUE7O0FBQ3hDLFNBQUtELGNBQUwsR0FBc0JBLGNBQXRCO0FBQ0EsU0FBS0MsWUFBTCxHQUFvQkEsWUFBcEI7QUFDRDs7Ozt3Q0FFbUI7QUFDbEIsYUFBTyxLQUFLRCxjQUFaO0FBQ0Q7Ozt5Q0FFb0I7QUFDbkIsVUFBTUUsT0FBTyxHQUFHLEtBQUtELFlBQUwsQ0FBa0JFLFVBQWxCLEVBQWhCO0FBQUEsVUFDTUMsZUFBZSxHQUFHRixPQUR4QixDQURtQixDQUVlOztBQUVsQyxhQUFPRSxlQUFQO0FBQ0Q7Ozt1Q0FFa0JBLGUsRUFBaUI7QUFDbEMsVUFBTUYsT0FBTyxHQUFHRSxlQUFoQixDQURrQyxDQUNBOztBQUVsQyxXQUFLSCxZQUFMLENBQWtCSSxVQUFsQixDQUE2QkgsT0FBN0I7QUFDRDs7O2dEQUUyQjtBQUMxQixVQUFNRSxlQUFlLEdBQUcsS0FBS0Usa0JBQUwsRUFBeEI7QUFBQSxVQUNNTixjQUFjLEdBQUdJLGVBRHZCLENBRDBCLENBRWM7O0FBRXhDLFdBQUtKLGNBQUwsR0FBc0JBLGNBQXRCO0FBQ0Q7OzsyQkFFTU8saUIsRUFBbUI7QUFDeEIsVUFBSUgsZUFBZSxHQUFHLEtBQUtFLGtCQUFMLEVBQXRCO0FBRUEsVUFBTUUsVUFBVSxHQUFHLEtBQUtDLGtCQUFMLEVBQW5CO0FBQUEsVUFDTUMsNEJBQTRCLEdBQUcsZ0NBQW9CSCxpQkFBcEIsRUFBdUNDLFVBQXZDLENBRHJDO0FBQUEsVUFFTUcsMEJBQTBCLEdBQUcsNkJBQWlCUCxlQUFqQixFQUFrQ00sNEJBQWxDLENBRm5DO0FBQUEsVUFHTUUseUJBQXlCLEdBQUcsNkJBQWlCLEtBQUtaLGNBQXRCLEVBQXNDTyxpQkFBdEMsQ0FIbEM7QUFLQUgsTUFBQUEsZUFBZSxHQUFHTywwQkFBbEIsQ0FSd0IsQ0FRc0I7O0FBRTlDLFdBQUtFLGtCQUFMLENBQXdCVCxlQUF4QjtBQUVBLFdBQUtKLGNBQUwsR0FBc0JZLHlCQUF0QixDQVp3QixDQVl5Qjs7QUFFakQsVUFBTUUsUUFBUSxHQUFJVixlQUFlLEtBQUssS0FBS0osY0FBM0M7QUFFQSxhQUFPYyxRQUFQO0FBQ0Q7Ozt5Q0FFb0I7QUFDbkIsVUFBTVYsZUFBZSxHQUFHLEtBQUtFLGtCQUFMLEVBQXhCO0FBQUEsVUFDTUUsVUFBVSxHQUFHLCtCQUFtQixLQUFLUixjQUF4QixFQUF3Q0ksZUFBeEMsQ0FEbkI7QUFHQSxhQUFPSSxVQUFQO0FBQ0Q7OztxQ0FFdUJQLFksRUFBYztBQUNwQyxVQUFNQyxPQUFPLEdBQUdELFlBQVksQ0FBQ0UsVUFBYixFQUFoQjtBQUFBLFVBQ01DLGVBQWUsR0FBR0YsT0FEeEI7QUFBQSxVQUNrQztBQUM1QkYsTUFBQUEsY0FBYyxHQUFHSSxlQUZ2QjtBQUFBLFVBRXdDO0FBQ2xDVyxNQUFBQSxRQUFRLEdBQUcsSUFBSWhCLFFBQUosQ0FBYUMsY0FBYixFQUE2QkMsWUFBN0IsQ0FIakI7QUFLQSxhQUFPYyxRQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgdHJhbnNmb3JtQ29udGVudCwgZ2VuZXJhdGVPcGVyYXRpb25zLCB0cmFuc2Zvcm1PcGVyYXRpb25zIH0gZnJvbSBcIi4uL2luZGV4XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IHtcbiAgY29uc3RydWN0b3Iod29ya2luZ0NvbnRlbnQsIHJpY2hUZXh0YXJlYSkge1xuICAgIHRoaXMud29ya2luZ0NvbnRlbnQgPSB3b3JraW5nQ29udGVudDtcbiAgICB0aGlzLnJpY2hUZXh0YXJlYSA9IHJpY2hUZXh0YXJlYTtcbiAgfVxuXG4gIGdldFdvcmtpbmdDb250ZW50KCkge1xuICAgIHJldHVybiB0aGlzLndvcmtpbmdDb250ZW50O1xuICB9XG5cbiAgZ2V0RWRpdGFibGVDb250ZW50KCkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLnJpY2hUZXh0YXJlYS5nZXRDb250ZW50KCksXG4gICAgICAgICAgZWRpdGFibGVDb250ZW50ID0gY29udGVudDsgIC8vL1xuXG4gICAgcmV0dXJuIGVkaXRhYmxlQ29udGVudDtcbiAgfVxuXG4gIHNldEVkaXRhYmxlQ29udGVudChlZGl0YWJsZUNvbnRlbnQpIHtcbiAgICBjb25zdCBjb250ZW50ID0gZWRpdGFibGVDb250ZW50OyAgLy8vXG5cbiAgICB0aGlzLnJpY2hUZXh0YXJlYS5zZXRDb250ZW50KGNvbnRlbnQpO1xuICB9XG5cbiAgc3luY2hyb25pc2VXb3JraW5nQ29udGVudCgpIHtcbiAgICBjb25zdCBlZGl0YWJsZUNvbnRlbnQgPSB0aGlzLmdldEVkaXRhYmxlQ29udGVudCgpLFxuICAgICAgICAgIHdvcmtpbmdDb250ZW50ID0gZWRpdGFibGVDb250ZW50OyAvLy9cblxuICAgIHRoaXMud29ya2luZ0NvbnRlbnQgPSB3b3JraW5nQ29udGVudDtcbiAgfVxuXG4gIHVwZGF0ZShwZW5kaW5nT3BlcmF0aW9ucykge1xuICAgIGxldCBlZGl0YWJsZUNvbnRlbnQgPSB0aGlzLmdldEVkaXRhYmxlQ29udGVudCgpO1xuXG4gICAgY29uc3Qgb3BlcmF0aW9ucyA9IHRoaXMuZ2VuZXJhdGVPcGVyYXRpb25zKCksXG4gICAgICAgICAgdHJhbnNmb3JtZWRQZW5kaW5nT3BlcmF0aW9ucyA9IHRyYW5zZm9ybU9wZXJhdGlvbnMocGVuZGluZ09wZXJhdGlvbnMsIG9wZXJhdGlvbnMpLFxuICAgICAgICAgIHRyYW5zZm9ybWVkRWRpdGFibGVDb250ZW50ID0gdHJhbnNmb3JtQ29udGVudChlZGl0YWJsZUNvbnRlbnQsIHRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMpLFxuICAgICAgICAgIHRyYW5zZm9ybWVkV29ya2luZ0NvbnRlbnQgPSB0cmFuc2Zvcm1Db250ZW50KHRoaXMud29ya2luZ0NvbnRlbnQsIHBlbmRpbmdPcGVyYXRpb25zKTtcblxuICAgIGVkaXRhYmxlQ29udGVudCA9IHRyYW5zZm9ybWVkRWRpdGFibGVDb250ZW50OyAvLy9cblxuICAgIHRoaXMuc2V0RWRpdGFibGVDb250ZW50KGVkaXRhYmxlQ29udGVudCk7XG5cbiAgICB0aGlzLndvcmtpbmdDb250ZW50ID0gdHJhbnNmb3JtZWRXb3JraW5nQ29udGVudDsgLy8vXG5cbiAgICBjb25zdCB1cFRvRGF0ZSA9IChlZGl0YWJsZUNvbnRlbnQgPT09IHRoaXMud29ya2luZ0NvbnRlbnQpO1xuXG4gICAgcmV0dXJuIHVwVG9EYXRlXG4gIH1cblxuICBnZW5lcmF0ZU9wZXJhdGlvbnMoKSB7XG4gICAgY29uc3QgZWRpdGFibGVDb250ZW50ID0gdGhpcy5nZXRFZGl0YWJsZUNvbnRlbnQoKSxcbiAgICAgICAgICBvcGVyYXRpb25zID0gZ2VuZXJhdGVPcGVyYXRpb25zKHRoaXMud29ya2luZ0NvbnRlbnQsIGVkaXRhYmxlQ29udGVudCk7XG5cbiAgICByZXR1cm4gb3BlcmF0aW9ucztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUmljaFRleHRhcmVhKHJpY2hUZXh0YXJlYSkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSByaWNoVGV4dGFyZWEuZ2V0Q29udGVudCgpLFxuICAgICAgICAgIGVkaXRhYmxlQ29udGVudCA9IGNvbnRlbnQsICAvLy9cbiAgICAgICAgICB3b3JraW5nQ29udGVudCA9IGVkaXRhYmxlQ29udGVudCwgLy8vXG4gICAgICAgICAgZG9jdW1lbnQgPSBuZXcgRG9jdW1lbnQod29ya2luZ0NvbnRlbnQsIHJpY2hUZXh0YXJlYSk7XG5cbiAgICByZXR1cm4gZG9jdW1lbnQ7XG4gIH1cbn1cbiJdfQ==