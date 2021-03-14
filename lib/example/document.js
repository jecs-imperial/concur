"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _index = require("../index");
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
var Document1 = function() {
    function Document1(workingContent, richTextarea) {
        _classCallCheck(this, Document1);
        this.workingContent = workingContent;
        this.richTextarea = richTextarea;
    }
    _createClass(Document1, [
        {
            key: "getWorkingContent",
            value: function getWorkingContent() {
                return this.workingContent;
            }
        },
        {
            key: "getEditableContent",
            value: function getEditableContent() {
                var content = this.richTextarea.getContent(), editableContent = content; ///
                return editableContent;
            }
        },
        {
            key: "setEditableContent",
            value: function setEditableContent(editableContent) {
                var content = editableContent; ///
                this.richTextarea.setContent(content);
            }
        },
        {
            key: "synchroniseWorkingContent",
            value: function synchroniseWorkingContent() {
                var editableContent = this.getEditableContent(), workingContent = editableContent; ///
                this.workingContent = workingContent;
            }
        },
        {
            key: "update",
            value: function update(pendingOperations) {
                var editableContent = this.getEditableContent();
                var operations = this.generateOperations(), transformedPendingOperations = _index.transformOperations(pendingOperations, operations), transformedEditableContent = _index.transformContent(editableContent, transformedPendingOperations), transformedWorkingContent = _index.transformContent(this.workingContent, pendingOperations);
                editableContent = transformedEditableContent; ///
                this.setEditableContent(editableContent);
                this.workingContent = transformedWorkingContent; ///
                var upToDate = editableContent === this.workingContent;
                return upToDate;
            }
        },
        {
            key: "generateOperations",
            value: function generateOperations() {
                var editableContent = this.getEditableContent(), operations = _index.generateOperations(this.workingContent, editableContent);
                return operations;
            }
        }
    ], [
        {
            key: "fromRichTextarea",
            value: function fromRichTextarea(richTextarea) {
                var content = richTextarea.getContent(), editableContent = content, workingContent = editableContent, document = new Document1(workingContent, richTextarea);
                return document;
            }
        }
    ]);
    return Document1;
}();
exports.default = Document1;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9leGFtcGxlL2RvY3VtZW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyB0cmFuc2Zvcm1Db250ZW50LCBnZW5lcmF0ZU9wZXJhdGlvbnMsIHRyYW5zZm9ybU9wZXJhdGlvbnMgfSBmcm9tIFwiLi4vaW5kZXhcIjsgLy8vXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IHtcbiAgY29uc3RydWN0b3Iod29ya2luZ0NvbnRlbnQsIHJpY2hUZXh0YXJlYSkge1xuICAgIHRoaXMud29ya2luZ0NvbnRlbnQgPSB3b3JraW5nQ29udGVudDtcbiAgICB0aGlzLnJpY2hUZXh0YXJlYSA9IHJpY2hUZXh0YXJlYTtcbiAgfVxuXG4gIGdldFdvcmtpbmdDb250ZW50KCkge1xuICAgIHJldHVybiB0aGlzLndvcmtpbmdDb250ZW50O1xuICB9XG5cbiAgZ2V0RWRpdGFibGVDb250ZW50KCkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLnJpY2hUZXh0YXJlYS5nZXRDb250ZW50KCksXG4gICAgICAgICAgZWRpdGFibGVDb250ZW50ID0gY29udGVudDsgIC8vL1xuXG4gICAgcmV0dXJuIGVkaXRhYmxlQ29udGVudDtcbiAgfVxuXG4gIHNldEVkaXRhYmxlQ29udGVudChlZGl0YWJsZUNvbnRlbnQpIHtcbiAgICBjb25zdCBjb250ZW50ID0gZWRpdGFibGVDb250ZW50OyAgLy8vXG5cbiAgICB0aGlzLnJpY2hUZXh0YXJlYS5zZXRDb250ZW50KGNvbnRlbnQpO1xuICB9XG5cbiAgc3luY2hyb25pc2VXb3JraW5nQ29udGVudCgpIHtcbiAgICBjb25zdCBlZGl0YWJsZUNvbnRlbnQgPSB0aGlzLmdldEVkaXRhYmxlQ29udGVudCgpLFxuICAgICAgICAgIHdvcmtpbmdDb250ZW50ID0gZWRpdGFibGVDb250ZW50OyAvLy9cblxuICAgIHRoaXMud29ya2luZ0NvbnRlbnQgPSB3b3JraW5nQ29udGVudDtcbiAgfVxuXG4gIHVwZGF0ZShwZW5kaW5nT3BlcmF0aW9ucykge1xuICAgIGxldCBlZGl0YWJsZUNvbnRlbnQgPSB0aGlzLmdldEVkaXRhYmxlQ29udGVudCgpO1xuXG4gICAgY29uc3Qgb3BlcmF0aW9ucyA9IHRoaXMuZ2VuZXJhdGVPcGVyYXRpb25zKCksXG4gICAgICAgICAgdHJhbnNmb3JtZWRQZW5kaW5nT3BlcmF0aW9ucyA9IHRyYW5zZm9ybU9wZXJhdGlvbnMocGVuZGluZ09wZXJhdGlvbnMsIG9wZXJhdGlvbnMpLFxuICAgICAgICAgIHRyYW5zZm9ybWVkRWRpdGFibGVDb250ZW50ID0gdHJhbnNmb3JtQ29udGVudChlZGl0YWJsZUNvbnRlbnQsIHRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMpLFxuICAgICAgICAgIHRyYW5zZm9ybWVkV29ya2luZ0NvbnRlbnQgPSB0cmFuc2Zvcm1Db250ZW50KHRoaXMud29ya2luZ0NvbnRlbnQsIHBlbmRpbmdPcGVyYXRpb25zKTtcblxuICAgIGVkaXRhYmxlQ29udGVudCA9IHRyYW5zZm9ybWVkRWRpdGFibGVDb250ZW50OyAvLy9cblxuICAgIHRoaXMuc2V0RWRpdGFibGVDb250ZW50KGVkaXRhYmxlQ29udGVudCk7XG5cbiAgICB0aGlzLndvcmtpbmdDb250ZW50ID0gdHJhbnNmb3JtZWRXb3JraW5nQ29udGVudDsgLy8vXG5cbiAgICBjb25zdCB1cFRvRGF0ZSA9IChlZGl0YWJsZUNvbnRlbnQgPT09IHRoaXMud29ya2luZ0NvbnRlbnQpO1xuXG4gICAgcmV0dXJuIHVwVG9EYXRlXG4gIH1cblxuICBnZW5lcmF0ZU9wZXJhdGlvbnMoKSB7XG4gICAgY29uc3QgZWRpdGFibGVDb250ZW50ID0gdGhpcy5nZXRFZGl0YWJsZUNvbnRlbnQoKSxcbiAgICAgICAgICBvcGVyYXRpb25zID0gZ2VuZXJhdGVPcGVyYXRpb25zKHRoaXMud29ya2luZ0NvbnRlbnQsIGVkaXRhYmxlQ29udGVudCk7XG5cbiAgICByZXR1cm4gb3BlcmF0aW9ucztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUmljaFRleHRhcmVhKHJpY2hUZXh0YXJlYSkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSByaWNoVGV4dGFyZWEuZ2V0Q29udGVudCgpLFxuICAgICAgICAgIGVkaXRhYmxlQ29udGVudCA9IGNvbnRlbnQsICAvLy9cbiAgICAgICAgICB3b3JraW5nQ29udGVudCA9IGVkaXRhYmxlQ29udGVudCwgLy8vXG4gICAgICAgICAgZG9jdW1lbnQgPSBuZXcgRG9jdW1lbnQod29ya2luZ0NvbnRlbnQsIHJpY2hUZXh0YXJlYSk7XG5cbiAgICByZXR1cm4gZG9jdW1lbnQ7XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQ0FBQSxVQUFBOzs7OztJQUVBLE1BQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRUEsU0FBQTthQUFBLFNBQUEsQ0FDQSxjQUFBLEVBQUEsWUFBQTs4QkFEQSxTQUFBO2FBRUEsY0FBQSxHQUFBLGNBQUE7YUFDQSxZQUFBLEdBQUEsWUFBQTs7aUJBSEEsU0FBQTs7QUFNQSxlQUFBLEdBQUEsaUJBQUE7NEJBQUEsaUJBQUE7NEJBQ0EsY0FBQTs7OztBQUdBLGVBQUEsR0FBQSxrQkFBQTs0QkFBQSxrQkFBQTtvQkFDQSxPQUFBLFFBQUEsWUFBQSxDQUFBLFVBQUEsSUFDQSxlQUFBLEdBQUEsT0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBO3VCQUVBLGVBQUE7Ozs7QUFHQSxlQUFBLEdBQUEsa0JBQUE7NEJBQUEsa0JBQUEsQ0FBQSxlQUFBO29CQUNBLE9BQUEsR0FBQSxlQUFBLENBQUEsQ0FBQSxFQUFBLENBQUE7cUJBRUEsWUFBQSxDQUFBLFVBQUEsQ0FBQSxPQUFBOzs7O0FBR0EsZUFBQSxHQUFBLHlCQUFBOzRCQUFBLHlCQUFBO29CQUNBLGVBQUEsUUFBQSxrQkFBQSxJQUNBLGNBQUEsR0FBQSxlQUFBLENBQUEsQ0FBQSxFQUFBLENBQUE7cUJBRUEsY0FBQSxHQUFBLGNBQUE7Ozs7QUFHQSxlQUFBLEdBQUEsTUFBQTs0QkFBQSxNQUFBLENBQUEsaUJBQUE7b0JBQ0EsZUFBQSxRQUFBLGtCQUFBO29CQUVBLFVBQUEsUUFBQSxrQkFBQSxJQUNBLDRCQUFBLEdBcENBLE1BQUEscUJBb0NBLGlCQUFBLEVBQUEsVUFBQSxHQUNBLDBCQUFBLEdBckNBLE1BQUEsa0JBcUNBLGVBQUEsRUFBQSw0QkFBQSxHQUNBLHlCQUFBLEdBdENBLE1BQUEsdUJBc0NBLGNBQUEsRUFBQSxpQkFBQTtBQUVBLCtCQUFBLEdBQUEsMEJBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQTtxQkFFQSxrQkFBQSxDQUFBLGVBQUE7cUJBRUEsY0FBQSxHQUFBLHlCQUFBLENBQUEsQ0FBQSxFQUFBLENBQUE7b0JBRUEsUUFBQSxHQUFBLGVBQUEsVUFBQSxjQUFBO3VCQUVBLFFBQUE7Ozs7QUFHQSxlQUFBLEdBQUEsa0JBQUE7NEJBQUEsa0JBQUE7b0JBQ0EsZUFBQSxRQUFBLGtCQUFBLElBQ0EsVUFBQSxHQXJEQSxNQUFBLHlCQXFEQSxjQUFBLEVBQUEsZUFBQTt1QkFFQSxVQUFBOzs7OztBQUdBLGVBQUEsR0FBQSxnQkFBQTs0QkFBQSxnQkFBQSxDQUFBLFlBQUE7b0JBQ0EsT0FBQSxHQUFBLFlBQUEsQ0FBQSxVQUFBLElBQ0EsZUFBQSxHQUFBLE9BQUEsRUFDQSxjQUFBLEdBQUEsZUFBQSxFQUNBLFFBQUEsT0FBQSxTQUFBLENBQUEsY0FBQSxFQUFBLFlBQUE7dUJBRUEsUUFBQTs7OztXQTlEQSxTQUFBOztrQkFBQSxTQUFBIn0=