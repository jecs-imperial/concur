"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _transform = _interopRequireDefault(require("../content/transform"));

var _generate = _interopRequireDefault(require("../operations/generate"));

var _transform2 = _interopRequireDefault(require("../operations/transform"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
          transformedPendingOperations = (0, _transform2["default"])(pendingOperations, operations),
          transformedEditableContent = (0, _transform["default"])(editableContent, transformedPendingOperations),
          transformedWorkingContent = (0, _transform["default"])(this.workingContent, pendingOperations);
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
          operations = (0, _generate["default"])(this.workingContent, editableContent);
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

exports["default"] = Document;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvY3VtZW50LmpzIl0sIm5hbWVzIjpbIkRvY3VtZW50Iiwid29ya2luZ0NvbnRlbnQiLCJlZGl0YWJsZUNvbnRlbnRUZXh0YXJlYSIsImdldEVkaXRhYmxlQ29udGVudCIsImVkaXRhYmxlQ29udGVudCIsInNldEVkaXRhYmxlQ29udGVudCIsInBlbmRpbmdPcGVyYXRpb25zIiwib3BlcmF0aW9ucyIsImdlbmVyYXRlT3BlcmF0aW9ucyIsInRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMiLCJ0cmFuc2Zvcm1lZEVkaXRhYmxlQ29udGVudCIsInRyYW5zZm9ybWVkV29ya2luZ0NvbnRlbnQiLCJ1cFRvRGF0ZSIsImRvY3VtZW50Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBRXFCQSxRO0FBQ25CLG9CQUFZQyxjQUFaLEVBQTRCQyx1QkFBNUIsRUFBcUQ7QUFBQTs7QUFDbkQsU0FBS0QsY0FBTCxHQUFzQkEsY0FBdEI7QUFDQSxTQUFLQyx1QkFBTCxHQUErQkEsdUJBQS9CO0FBQ0Q7Ozs7d0NBRW1CO0FBQ2xCLGFBQU8sS0FBS0QsY0FBWjtBQUNEOzs7eUNBRW9CO0FBQUUsYUFBTyxLQUFLQyx1QkFBTCxDQUE2QkMsa0JBQTdCLEVBQVA7QUFBMkQ7Ozt1Q0FFL0RDLGUsRUFBaUI7QUFBRSxXQUFLRix1QkFBTCxDQUE2Qkcsa0JBQTdCLENBQWdERCxlQUFoRDtBQUFtRTs7O2dEQUU3RTtBQUMxQixVQUFNQSxlQUFlLEdBQUcsS0FBS0Qsa0JBQUwsRUFBeEI7QUFBQSxVQUNNRixjQUFjLEdBQUdHLGVBRHZCLENBRDBCLENBRWM7O0FBRXhDLFdBQUtILGNBQUwsR0FBc0JBLGNBQXRCO0FBQ0Q7OzsyQkFFTUssaUIsRUFBbUI7QUFDeEIsVUFBSUYsZUFBZSxHQUFHLEtBQUtELGtCQUFMLEVBQXRCO0FBRUEsVUFBTUksVUFBVSxHQUFHLEtBQUtDLGtCQUFMLEVBQW5CO0FBQUEsVUFDTUMsNEJBQTRCLEdBQUcsNEJBQW9CSCxpQkFBcEIsRUFBdUNDLFVBQXZDLENBRHJDO0FBQUEsVUFFTUcsMEJBQTBCLEdBQUcsMkJBQWlCTixlQUFqQixFQUFrQ0ssNEJBQWxDLENBRm5DO0FBQUEsVUFHTUUseUJBQXlCLEdBQUcsMkJBQWlCLEtBQUtWLGNBQXRCLEVBQXNDSyxpQkFBdEMsQ0FIbEM7QUFLQUYsTUFBQUEsZUFBZSxHQUFHTSwwQkFBbEIsQ0FSd0IsQ0FRc0I7O0FBRTlDLFdBQUtMLGtCQUFMLENBQXdCRCxlQUF4QjtBQUVBLFdBQUtILGNBQUwsR0FBc0JVLHlCQUF0QixDQVp3QixDQVl5Qjs7QUFFakQsVUFBTUMsUUFBUSxHQUFJUixlQUFlLEtBQUssS0FBS0gsY0FBM0M7QUFFQSxhQUFPVyxRQUFQO0FBQ0Q7Ozt5Q0FFb0I7QUFDbkIsVUFBTVIsZUFBZSxHQUFHLEtBQUtELGtCQUFMLEVBQXhCO0FBQUEsVUFDTUksVUFBVSxHQUFHLDBCQUFtQixLQUFLTixjQUF4QixFQUF3Q0csZUFBeEMsQ0FEbkI7QUFHQSxhQUFPRyxVQUFQO0FBQ0Q7OztnREFFa0NMLHVCLEVBQXlCO0FBQzFELFVBQU1FLGVBQWUsR0FBR0YsdUJBQXVCLENBQUNDLGtCQUF4QixFQUF4QjtBQUFBLFVBQ01GLGNBQWMsR0FBR0csZUFEdkI7QUFBQSxVQUN3QztBQUNsQ1MsTUFBQUEsUUFBUSxHQUFHLElBQUliLFFBQUosQ0FBYUMsY0FBYixFQUE2QkMsdUJBQTdCLENBRmpCO0FBSUEsYUFBT1csUUFBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB0cmFuc2Zvcm1Db250ZW50IGZyb20gXCIuLi9jb250ZW50L3RyYW5zZm9ybVwiO1xuaW1wb3J0IGdlbmVyYXRlT3BlcmF0aW9ucyBmcm9tIFwiLi4vb3BlcmF0aW9ucy9nZW5lcmF0ZVwiO1xuaW1wb3J0IHRyYW5zZm9ybU9wZXJhdGlvbnMgZnJvbSBcIi4uL29wZXJhdGlvbnMvdHJhbnNmb3JtXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IHtcbiAgY29uc3RydWN0b3Iod29ya2luZ0NvbnRlbnQsIGVkaXRhYmxlQ29udGVudFRleHRhcmVhKSB7XG4gICAgdGhpcy53b3JraW5nQ29udGVudCA9IHdvcmtpbmdDb250ZW50O1xuICAgIHRoaXMuZWRpdGFibGVDb250ZW50VGV4dGFyZWEgPSBlZGl0YWJsZUNvbnRlbnRUZXh0YXJlYTtcbiAgfVxuXG4gIGdldFdvcmtpbmdDb250ZW50KCkge1xuICAgIHJldHVybiB0aGlzLndvcmtpbmdDb250ZW50O1xuICB9XG5cbiAgZ2V0RWRpdGFibGVDb250ZW50KCkgeyByZXR1cm4gdGhpcy5lZGl0YWJsZUNvbnRlbnRUZXh0YXJlYS5nZXRFZGl0YWJsZUNvbnRlbnQoKTsgfVxuXG4gIHNldEVkaXRhYmxlQ29udGVudChlZGl0YWJsZUNvbnRlbnQpIHsgdGhpcy5lZGl0YWJsZUNvbnRlbnRUZXh0YXJlYS5zZXRFZGl0YWJsZUNvbnRlbnQoZWRpdGFibGVDb250ZW50KTsgfVxuXG4gIHN5bmNocm9uaXNlV29ya2luZ0NvbnRlbnQoKSB7XG4gICAgY29uc3QgZWRpdGFibGVDb250ZW50ID0gdGhpcy5nZXRFZGl0YWJsZUNvbnRlbnQoKSxcbiAgICAgICAgICB3b3JraW5nQ29udGVudCA9IGVkaXRhYmxlQ29udGVudDsgLy8vXG5cbiAgICB0aGlzLndvcmtpbmdDb250ZW50ID0gd29ya2luZ0NvbnRlbnQ7XG4gIH1cblxuICB1cGRhdGUocGVuZGluZ09wZXJhdGlvbnMpIHtcbiAgICBsZXQgZWRpdGFibGVDb250ZW50ID0gdGhpcy5nZXRFZGl0YWJsZUNvbnRlbnQoKTtcblxuICAgIGNvbnN0IG9wZXJhdGlvbnMgPSB0aGlzLmdlbmVyYXRlT3BlcmF0aW9ucygpLFxuICAgICAgICAgIHRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMgPSB0cmFuc2Zvcm1PcGVyYXRpb25zKHBlbmRpbmdPcGVyYXRpb25zLCBvcGVyYXRpb25zKSxcbiAgICAgICAgICB0cmFuc2Zvcm1lZEVkaXRhYmxlQ29udGVudCA9IHRyYW5zZm9ybUNvbnRlbnQoZWRpdGFibGVDb250ZW50LCB0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zKSxcbiAgICAgICAgICB0cmFuc2Zvcm1lZFdvcmtpbmdDb250ZW50ID0gdHJhbnNmb3JtQ29udGVudCh0aGlzLndvcmtpbmdDb250ZW50LCBwZW5kaW5nT3BlcmF0aW9ucyk7XG5cbiAgICBlZGl0YWJsZUNvbnRlbnQgPSB0cmFuc2Zvcm1lZEVkaXRhYmxlQ29udGVudDsgLy8vXG5cbiAgICB0aGlzLnNldEVkaXRhYmxlQ29udGVudChlZGl0YWJsZUNvbnRlbnQpO1xuXG4gICAgdGhpcy53b3JraW5nQ29udGVudCA9IHRyYW5zZm9ybWVkV29ya2luZ0NvbnRlbnQ7IC8vL1xuXG4gICAgY29uc3QgdXBUb0RhdGUgPSAoZWRpdGFibGVDb250ZW50ID09PSB0aGlzLndvcmtpbmdDb250ZW50KTtcblxuICAgIHJldHVybiB1cFRvRGF0ZVxuICB9XG5cbiAgZ2VuZXJhdGVPcGVyYXRpb25zKCkge1xuICAgIGNvbnN0IGVkaXRhYmxlQ29udGVudCA9IHRoaXMuZ2V0RWRpdGFibGVDb250ZW50KCksXG4gICAgICAgICAgb3BlcmF0aW9ucyA9IGdlbmVyYXRlT3BlcmF0aW9ucyh0aGlzLndvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnQpO1xuXG4gICAgcmV0dXJuIG9wZXJhdGlvbnM7XG4gIH1cblxuICBzdGF0aWMgZnJvbUVkaXRhYmxlQ29udGVudFRleHRhcmVhKGVkaXRhYmxlQ29udGVudFRleHRhcmVhKSB7XG4gICAgY29uc3QgZWRpdGFibGVDb250ZW50ID0gZWRpdGFibGVDb250ZW50VGV4dGFyZWEuZ2V0RWRpdGFibGVDb250ZW50KCksXG4gICAgICAgICAgd29ya2luZ0NvbnRlbnQgPSBlZGl0YWJsZUNvbnRlbnQsIC8vL1xuICAgICAgICAgIGRvY3VtZW50ID0gbmV3IERvY3VtZW50KHdvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnRUZXh0YXJlYSk7XG5cbiAgICByZXR1cm4gZG9jdW1lbnQ7XG4gIH1cbn1cbiJdfQ==