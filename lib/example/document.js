"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _browser = require("../browser");
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
var Document1 = /*#__PURE__*/ function() {
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
                var operations = this.generateOperations(), transformedPendingOperations = (0, _browser).transformOperations(pendingOperations, operations), transformedEditableContent = (0, _browser).transformContent(editableContent, transformedPendingOperations), transformedWorkingContent = (0, _browser).transformContent(this.workingContent, pendingOperations);
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
                var editableContent = this.getEditableContent(), operations = (0, _browser).generateOperations(this.workingContent, editableContent);
                return operations;
            }
        }
    ], [
        {
            key: "fromContentAndRichTextarea",
            value: function fromContentAndRichTextarea(content, richTextarea) {
                var workingContent = content, document = new Document1(workingContent, richTextarea);
                return document;
            }
        }
    ]);
    return Document1;
}();
exports.default = Document1;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9leGFtcGxlL2RvY3VtZW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyB0cmFuc2Zvcm1Db250ZW50LCBnZW5lcmF0ZU9wZXJhdGlvbnMsIHRyYW5zZm9ybU9wZXJhdGlvbnMgfSBmcm9tIFwiLi4vYnJvd3NlclwiOyAvLy9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdW1lbnQge1xuICBjb25zdHJ1Y3Rvcih3b3JraW5nQ29udGVudCwgcmljaFRleHRhcmVhKSB7XG4gICAgdGhpcy53b3JraW5nQ29udGVudCA9IHdvcmtpbmdDb250ZW50O1xuICAgIHRoaXMucmljaFRleHRhcmVhID0gcmljaFRleHRhcmVhO1xuICB9XG5cbiAgZ2V0V29ya2luZ0NvbnRlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMud29ya2luZ0NvbnRlbnQ7XG4gIH1cblxuICBnZXRFZGl0YWJsZUNvbnRlbnQoKSB7XG4gICAgY29uc3QgY29udGVudCA9IHRoaXMucmljaFRleHRhcmVhLmdldENvbnRlbnQoKSxcbiAgICAgICAgICBlZGl0YWJsZUNvbnRlbnQgPSBjb250ZW50OyAgLy8vXG5cbiAgICByZXR1cm4gZWRpdGFibGVDb250ZW50O1xuICB9XG5cbiAgc2V0RWRpdGFibGVDb250ZW50KGVkaXRhYmxlQ29udGVudCkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBlZGl0YWJsZUNvbnRlbnQ7ICAvLy9cblxuICAgIHRoaXMucmljaFRleHRhcmVhLnNldENvbnRlbnQoY29udGVudCk7XG4gIH1cblxuICBzeW5jaHJvbmlzZVdvcmtpbmdDb250ZW50KCkge1xuICAgIGNvbnN0IGVkaXRhYmxlQ29udGVudCA9IHRoaXMuZ2V0RWRpdGFibGVDb250ZW50KCksXG4gICAgICAgICAgd29ya2luZ0NvbnRlbnQgPSBlZGl0YWJsZUNvbnRlbnQ7IC8vL1xuXG4gICAgdGhpcy53b3JraW5nQ29udGVudCA9IHdvcmtpbmdDb250ZW50O1xuICB9XG5cbiAgdXBkYXRlKHBlbmRpbmdPcGVyYXRpb25zKSB7XG4gICAgbGV0IGVkaXRhYmxlQ29udGVudCA9IHRoaXMuZ2V0RWRpdGFibGVDb250ZW50KCk7XG5cbiAgICBjb25zdCBvcGVyYXRpb25zID0gdGhpcy5nZW5lcmF0ZU9wZXJhdGlvbnMoKSxcbiAgICAgICAgICB0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zID0gdHJhbnNmb3JtT3BlcmF0aW9ucyhwZW5kaW5nT3BlcmF0aW9ucywgb3BlcmF0aW9ucyksXG4gICAgICAgICAgdHJhbnNmb3JtZWRFZGl0YWJsZUNvbnRlbnQgPSB0cmFuc2Zvcm1Db250ZW50KGVkaXRhYmxlQ29udGVudCwgdHJhbnNmb3JtZWRQZW5kaW5nT3BlcmF0aW9ucyksXG4gICAgICAgICAgdHJhbnNmb3JtZWRXb3JraW5nQ29udGVudCA9IHRyYW5zZm9ybUNvbnRlbnQodGhpcy53b3JraW5nQ29udGVudCwgcGVuZGluZ09wZXJhdGlvbnMpO1xuXG4gICAgZWRpdGFibGVDb250ZW50ID0gdHJhbnNmb3JtZWRFZGl0YWJsZUNvbnRlbnQ7IC8vL1xuXG4gICAgdGhpcy5zZXRFZGl0YWJsZUNvbnRlbnQoZWRpdGFibGVDb250ZW50KTtcblxuICAgIHRoaXMud29ya2luZ0NvbnRlbnQgPSB0cmFuc2Zvcm1lZFdvcmtpbmdDb250ZW50OyAvLy9cblxuICAgIGNvbnN0IHVwVG9EYXRlID0gKGVkaXRhYmxlQ29udGVudCA9PT0gdGhpcy53b3JraW5nQ29udGVudCk7XG5cbiAgICByZXR1cm4gdXBUb0RhdGVcbiAgfVxuXG4gIGdlbmVyYXRlT3BlcmF0aW9ucygpIHtcbiAgICBjb25zdCBlZGl0YWJsZUNvbnRlbnQgPSB0aGlzLmdldEVkaXRhYmxlQ29udGVudCgpLFxuICAgICAgICAgIG9wZXJhdGlvbnMgPSBnZW5lcmF0ZU9wZXJhdGlvbnModGhpcy53b3JraW5nQ29udGVudCwgZWRpdGFibGVDb250ZW50KTtcblxuICAgIHJldHVybiBvcGVyYXRpb25zO1xuICB9XG5cbiAgc3RhdGljIGZyb21Db250ZW50QW5kUmljaFRleHRhcmVhKGNvbnRlbnQsIHJpY2hUZXh0YXJlYSkge1xuICAgIGNvbnN0IHdvcmtpbmdDb250ZW50ID0gY29udGVudCwgLy8vXG4gICAgICAgICAgZG9jdW1lbnQgPSBuZXcgRG9jdW1lbnQod29ya2luZ0NvbnRlbnQsIHJpY2hUZXh0YXJlYSk7XG5cbiAgICByZXR1cm4gZG9jdW1lbnQ7XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQ0FBQSxVQUFZOzs7OztBQUU4RCxHQUFZLENBQVosUUFBWTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFakUsU0FBUTthQUFSLFNBQVEsQ0FDZixjQUFjLEVBQUUsWUFBWTs4QkFEckIsU0FBUTthQUVwQixjQUFjLEdBQUcsY0FBYzthQUMvQixZQUFZLEdBQUcsWUFBWTs7aUJBSGYsU0FBUTs7WUFNM0IsR0FBaUIsR0FBakIsaUJBQWlCOzRCQUFqQixpQkFBaUIsR0FBRyxDQUFDOzRCQUNQLGNBQWM7WUFDNUIsQ0FBQzs7O1lBRUQsR0FBa0IsR0FBbEIsa0JBQWtCOzRCQUFsQixrQkFBa0IsR0FBRyxDQUFDO2dCQUNwQixHQUFLLENBQUMsT0FBTyxRQUFRLFlBQVksQ0FBQyxVQUFVLElBQ3RDLGVBQWUsR0FBRyxPQUFPLENBQUcsQ0FBRyxBQUFILEVBQUcsQUFBSCxDQUFHO3VCQUU5QixlQUFlO1lBQ3hCLENBQUM7OztZQUVELEdBQWtCLEdBQWxCLGtCQUFrQjs0QkFBbEIsa0JBQWtCLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ25DLEdBQUssQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFHLENBQUcsQUFBSCxFQUFHLEFBQUgsQ0FBRztxQkFFaEMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxPQUFPO1lBQ3RDLENBQUM7OztZQUVELEdBQXlCLEdBQXpCLHlCQUF5Qjs0QkFBekIseUJBQXlCLEdBQUcsQ0FBQztnQkFDM0IsR0FBSyxDQUFDLGVBQWUsUUFBUSxrQkFBa0IsSUFDekMsY0FBYyxHQUFHLGVBQWUsQ0FBRSxDQUFHLEFBQUgsRUFBRyxBQUFILENBQUc7cUJBRXRDLGNBQWMsR0FBRyxjQUFjO1lBQ3RDLENBQUM7OztZQUVELEdBQU0sR0FBTixNQUFNOzRCQUFOLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUN6QixHQUFHLENBQUMsZUFBZSxRQUFRLGtCQUFrQjtnQkFFN0MsR0FBSyxDQUFDLFVBQVUsUUFBUSxrQkFBa0IsSUFDcEMsNEJBQTRCLE9BcENvQyxRQUFZLHNCQW9DekIsaUJBQWlCLEVBQUUsVUFBVSxHQUNoRiwwQkFBMEIsT0FyQ3NDLFFBQVksbUJBcUM5QixlQUFlLEVBQUUsNEJBQTRCLEdBQzNGLHlCQUF5QixPQXRDdUMsUUFBWSx3QkFzQzFCLGNBQWMsRUFBRSxpQkFBaUI7Z0JBRXpGLGVBQWUsR0FBRywwQkFBMEIsQ0FBRSxDQUFHLEFBQUgsRUFBRyxBQUFILENBQUc7cUJBRTVDLGtCQUFrQixDQUFDLGVBQWU7cUJBRWxDLGNBQWMsR0FBRyx5QkFBeUIsQ0FBRSxDQUFHLEFBQUgsRUFBRyxBQUFILENBQUc7Z0JBRXBELEdBQUssQ0FBQyxRQUFRLEdBQUksZUFBZSxVQUFVLGNBQWM7dUJBRWxELFFBQVE7WUFDakIsQ0FBQzs7O1lBRUQsR0FBa0IsR0FBbEIsa0JBQWtCOzRCQUFsQixrQkFBa0IsR0FBRyxDQUFDO2dCQUNwQixHQUFLLENBQUMsZUFBZSxRQUFRLGtCQUFrQixJQUN6QyxVQUFVLE9BckRzRCxRQUFZLDBCQXFEdkMsY0FBYyxFQUFFLGVBQWU7dUJBRW5FLFVBQVU7WUFDbkIsQ0FBQzs7OztZQUVNLEdBQTBCLEdBQTFCLDBCQUEwQjs0QkFBMUIsMEJBQTBCLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxDQUFDO2dCQUN4RCxHQUFLLENBQUMsY0FBYyxHQUFHLE9BQU8sRUFDeEIsUUFBUSxHQUFHLEdBQUcsQ0FBQyxTQUFRLENBQUMsY0FBYyxFQUFFLFlBQVk7dUJBRW5ELFFBQVE7WUFDakIsQ0FBQzs7O1dBN0RrQixTQUFROztrQkFBUixTQUFRIn0=