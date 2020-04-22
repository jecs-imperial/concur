"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transformContent = require("../content/transform"),
    _generateOperations = require("../operations/generate"),
    transformOperations = require("../operations/transform");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvY3VtZW50LmpzIl0sIm5hbWVzIjpbInRyYW5zZm9ybUNvbnRlbnQiLCJyZXF1aXJlIiwiZ2VuZXJhdGVPcGVyYXRpb25zIiwidHJhbnNmb3JtT3BlcmF0aW9ucyIsIkRvY3VtZW50Iiwid29ya2luZ0NvbnRlbnQiLCJlZGl0YWJsZUNvbnRlbnRUZXh0YXJlYSIsImdldEVkaXRhYmxlQ29udGVudCIsImVkaXRhYmxlQ29udGVudCIsInNldEVkaXRhYmxlQ29udGVudCIsInBlbmRpbmdPcGVyYXRpb25zIiwib3BlcmF0aW9ucyIsInRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMiLCJ0cmFuc2Zvcm1lZEVkaXRhYmxlQ29udGVudCIsInRyYW5zZm9ybWVkV29ya2luZ0NvbnRlbnQiLCJ1cFRvRGF0ZSIsImRvY3VtZW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBRUEsSUFBTUEsZ0JBQWdCLEdBQUdDLE9BQU8sQ0FBQyxzQkFBRCxDQUFoQztBQUFBLElBQ01DLG1CQUFrQixHQUFHRCxPQUFPLENBQUMsd0JBQUQsQ0FEbEM7QUFBQSxJQUVNRSxtQkFBbUIsR0FBR0YsT0FBTyxDQUFDLHlCQUFELENBRm5DOztJQUlNRyxRO0FBQ0osb0JBQVlDLGNBQVosRUFBNEJDLHVCQUE1QixFQUFxRDtBQUFBOztBQUNuRCxTQUFLRCxjQUFMLEdBQXNCQSxjQUF0QjtBQUNBLFNBQUtDLHVCQUFMLEdBQStCQSx1QkFBL0I7QUFDRDs7Ozt3Q0FFbUI7QUFDbEIsYUFBTyxLQUFLRCxjQUFaO0FBQ0Q7Ozt5Q0FFb0I7QUFBRSxhQUFPLEtBQUtDLHVCQUFMLENBQTZCQyxrQkFBN0IsRUFBUDtBQUEyRDs7O3VDQUUvREMsZSxFQUFpQjtBQUFFLFdBQUtGLHVCQUFMLENBQTZCRyxrQkFBN0IsQ0FBZ0RELGVBQWhEO0FBQW1FOzs7Z0RBRTdFO0FBQzFCLFVBQU1BLGVBQWUsR0FBRyxLQUFLRCxrQkFBTCxFQUF4QjtBQUFBLFVBQ01GLGNBQWMsR0FBR0csZUFEdkIsQ0FEMEIsQ0FFYzs7QUFFeEMsV0FBS0gsY0FBTCxHQUFzQkEsY0FBdEI7QUFDRDs7OzJCQUVNSyxpQixFQUFtQjtBQUN4QixVQUFJRixlQUFlLEdBQUcsS0FBS0Qsa0JBQUwsRUFBdEI7QUFFQSxVQUFNSSxVQUFVLEdBQUcsS0FBS1Qsa0JBQUwsRUFBbkI7QUFBQSxVQUNNVSw0QkFBNEIsR0FBR1QsbUJBQW1CLENBQUNPLGlCQUFELEVBQW9CQyxVQUFwQixDQUR4RDtBQUFBLFVBRU1FLDBCQUEwQixHQUFHYixnQkFBZ0IsQ0FBQ1EsZUFBRCxFQUFrQkksNEJBQWxCLENBRm5EO0FBQUEsVUFHTUUseUJBQXlCLEdBQUdkLGdCQUFnQixDQUFDLEtBQUtLLGNBQU4sRUFBc0JLLGlCQUF0QixDQUhsRDtBQUtBRixNQUFBQSxlQUFlLEdBQUdLLDBCQUFsQixDQVJ3QixDQVFzQjs7QUFFOUMsV0FBS0osa0JBQUwsQ0FBd0JELGVBQXhCO0FBRUEsV0FBS0gsY0FBTCxHQUFzQlMseUJBQXRCLENBWndCLENBWXlCOztBQUVqRCxVQUFNQyxRQUFRLEdBQUlQLGVBQWUsS0FBSyxLQUFLSCxjQUEzQztBQUVBLGFBQU9VLFFBQVA7QUFDRDs7O3lDQUVvQjtBQUNuQixVQUFNUCxlQUFlLEdBQUcsS0FBS0Qsa0JBQUwsRUFBeEI7QUFBQSxVQUNNSSxVQUFVLEdBQUdULG1CQUFrQixDQUFDLEtBQUtHLGNBQU4sRUFBc0JHLGVBQXRCLENBRHJDOztBQUdBLGFBQU9HLFVBQVA7QUFDRDs7O2dEQUVrQ0wsdUIsRUFBeUI7QUFDMUQsVUFBTUUsZUFBZSxHQUFHRix1QkFBdUIsQ0FBQ0Msa0JBQXhCLEVBQXhCO0FBQUEsVUFDTUYsY0FBYyxHQUFHRyxlQUR2QjtBQUFBLFVBQ3dDO0FBQ2xDUSxNQUFBQSxRQUFRLEdBQUcsSUFBSVosUUFBSixDQUFhQyxjQUFiLEVBQTZCQyx1QkFBN0IsQ0FGakI7QUFJQSxhQUFPVSxRQUFQO0FBQ0Q7Ozs7OztBQUdIQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJkLFFBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IHRyYW5zZm9ybUNvbnRlbnQgPSByZXF1aXJlKFwiLi4vY29udGVudC90cmFuc2Zvcm1cIiksXG4gICAgICBnZW5lcmF0ZU9wZXJhdGlvbnMgPSByZXF1aXJlKFwiLi4vb3BlcmF0aW9ucy9nZW5lcmF0ZVwiKSxcbiAgICAgIHRyYW5zZm9ybU9wZXJhdGlvbnMgPSByZXF1aXJlKFwiLi4vb3BlcmF0aW9ucy90cmFuc2Zvcm1cIik7XG5cbmNsYXNzIERvY3VtZW50IHtcbiAgY29uc3RydWN0b3Iod29ya2luZ0NvbnRlbnQsIGVkaXRhYmxlQ29udGVudFRleHRhcmVhKSB7XG4gICAgdGhpcy53b3JraW5nQ29udGVudCA9IHdvcmtpbmdDb250ZW50O1xuICAgIHRoaXMuZWRpdGFibGVDb250ZW50VGV4dGFyZWEgPSBlZGl0YWJsZUNvbnRlbnRUZXh0YXJlYTtcbiAgfVxuXG4gIGdldFdvcmtpbmdDb250ZW50KCkge1xuICAgIHJldHVybiB0aGlzLndvcmtpbmdDb250ZW50O1xuICB9XG5cbiAgZ2V0RWRpdGFibGVDb250ZW50KCkgeyByZXR1cm4gdGhpcy5lZGl0YWJsZUNvbnRlbnRUZXh0YXJlYS5nZXRFZGl0YWJsZUNvbnRlbnQoKTsgfVxuXG4gIHNldEVkaXRhYmxlQ29udGVudChlZGl0YWJsZUNvbnRlbnQpIHsgdGhpcy5lZGl0YWJsZUNvbnRlbnRUZXh0YXJlYS5zZXRFZGl0YWJsZUNvbnRlbnQoZWRpdGFibGVDb250ZW50KTsgfVxuXG4gIHN5bmNocm9uaXNlV29ya2luZ0NvbnRlbnQoKSB7XG4gICAgY29uc3QgZWRpdGFibGVDb250ZW50ID0gdGhpcy5nZXRFZGl0YWJsZUNvbnRlbnQoKSxcbiAgICAgICAgICB3b3JraW5nQ29udGVudCA9IGVkaXRhYmxlQ29udGVudDsgLy8vXG5cbiAgICB0aGlzLndvcmtpbmdDb250ZW50ID0gd29ya2luZ0NvbnRlbnQ7XG4gIH1cblxuICB1cGRhdGUocGVuZGluZ09wZXJhdGlvbnMpIHtcbiAgICBsZXQgZWRpdGFibGVDb250ZW50ID0gdGhpcy5nZXRFZGl0YWJsZUNvbnRlbnQoKTtcblxuICAgIGNvbnN0IG9wZXJhdGlvbnMgPSB0aGlzLmdlbmVyYXRlT3BlcmF0aW9ucygpLFxuICAgICAgICAgIHRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMgPSB0cmFuc2Zvcm1PcGVyYXRpb25zKHBlbmRpbmdPcGVyYXRpb25zLCBvcGVyYXRpb25zKSxcbiAgICAgICAgICB0cmFuc2Zvcm1lZEVkaXRhYmxlQ29udGVudCA9IHRyYW5zZm9ybUNvbnRlbnQoZWRpdGFibGVDb250ZW50LCB0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zKSxcbiAgICAgICAgICB0cmFuc2Zvcm1lZFdvcmtpbmdDb250ZW50ID0gdHJhbnNmb3JtQ29udGVudCh0aGlzLndvcmtpbmdDb250ZW50LCBwZW5kaW5nT3BlcmF0aW9ucyk7XG5cbiAgICBlZGl0YWJsZUNvbnRlbnQgPSB0cmFuc2Zvcm1lZEVkaXRhYmxlQ29udGVudDsgLy8vXG5cbiAgICB0aGlzLnNldEVkaXRhYmxlQ29udGVudChlZGl0YWJsZUNvbnRlbnQpO1xuXG4gICAgdGhpcy53b3JraW5nQ29udGVudCA9IHRyYW5zZm9ybWVkV29ya2luZ0NvbnRlbnQ7IC8vL1xuXG4gICAgY29uc3QgdXBUb0RhdGUgPSAoZWRpdGFibGVDb250ZW50ID09PSB0aGlzLndvcmtpbmdDb250ZW50KTtcblxuICAgIHJldHVybiB1cFRvRGF0ZVxuICB9XG5cbiAgZ2VuZXJhdGVPcGVyYXRpb25zKCkge1xuICAgIGNvbnN0IGVkaXRhYmxlQ29udGVudCA9IHRoaXMuZ2V0RWRpdGFibGVDb250ZW50KCksXG4gICAgICAgICAgb3BlcmF0aW9ucyA9IGdlbmVyYXRlT3BlcmF0aW9ucyh0aGlzLndvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnQpO1xuXG4gICAgcmV0dXJuIG9wZXJhdGlvbnM7XG4gIH1cblxuICBzdGF0aWMgZnJvbUVkaXRhYmxlQ29udGVudFRleHRhcmVhKGVkaXRhYmxlQ29udGVudFRleHRhcmVhKSB7XG4gICAgY29uc3QgZWRpdGFibGVDb250ZW50ID0gZWRpdGFibGVDb250ZW50VGV4dGFyZWEuZ2V0RWRpdGFibGVDb250ZW50KCksXG4gICAgICAgICAgd29ya2luZ0NvbnRlbnQgPSBlZGl0YWJsZUNvbnRlbnQsIC8vL1xuICAgICAgICAgIGRvY3VtZW50ID0gbmV3IERvY3VtZW50KHdvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnRUZXh0YXJlYSk7XG5cbiAgICByZXR1cm4gZG9jdW1lbnQ7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEb2N1bWVudDtcbiJdfQ==