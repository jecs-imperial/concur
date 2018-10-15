'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var transformContent = require('../../content/transform'),
    generateOperations = require('../../operations/generate'),
    transformOperations = require('../../operations/transform');

var InputElement = easy.InputElement;

var ContentTextarea = function (_InputElement) {
  _inherits(ContentTextarea, _InputElement);

  function ContentTextarea(selector, changeHandler) {
    _classCallCheck(this, ContentTextarea);

    var _this = _possibleConstructorReturn(this, (ContentTextarea.__proto__ || Object.getPrototypeOf(ContentTextarea)).call(this, selector));

    _this.changeHandler = changeHandler;

    _this.setInitialState();
    return _this;
  }

  _createClass(ContentTextarea, [{
    key: 'getContent',
    value: function getContent() {
      var value = this.getValue(),
          content = value; ///

      return content;
    }
  }, {
    key: 'setContent',
    value: function setContent(content) {
      var value = content; ///

      this.setValue(value);
    }
  }, {
    key: 'getOperations',
    value: function getOperations() {
      var content = this.getContent(),
          previousContent = this.getPreviousContent(),
          operations = generateOperations(previousContent, content);

      return operations;
    }
  }, {
    key: 'update',
    value: function update(pendingOperations) {
      this.updateContent(pendingOperations);

      this.updatePreviousContent(pendingOperations);
    }
  }, {
    key: 'updateContent',
    value: function updateContent(pendingOperations) {
      var content = this.getContent();

      var operations = this.getOperations(),
          transformedPendingOperations = transformOperations(pendingOperations, operations),
          transformedContent = transformContent(content, transformedPendingOperations);

      content = transformedContent; ///

      this.setContent(content);
    }
  }, {
    key: 'updatePreviousContent',
    value: function updatePreviousContent(pendingOperations) {
      var previousContent = this.getPreviousContent();

      var transformedPreviousContent = transformContent(previousContent, pendingOperations);

      previousContent = transformedPreviousContent; ///

      this.setPreviousContent(previousContent);
    }
  }, {
    key: 'keyUpHandler',
    value: function keyUpHandler() {
      var content = this.getContent(),
          previousContent = this.getPreviousContent();

      if (content !== previousContent) {
        var success = this.changeHandler(content, previousContent);

        if (success) {
          previousContent = content; ///

          this.setPreviousContent(previousContent);
        }
      }
    }
  }, {
    key: 'parentContext',
    value: function parentContext() {
      var getContent = this.getContent.bind(this),
          setContent = this.setContent.bind(this);

      return {
        getContent: getContent,
        setContent: setContent
      };
    }
  }, {
    key: 'getPreviousContent',
    value: function getPreviousContent() {
      var state = this.getState(),
          previousContent = state.previousContent;


      return previousContent;
    }
  }, {
    key: 'setPreviousContent',
    value: function setPreviousContent(previousContent) {
      this.updateState({
        previousContent: previousContent
      });
    }
  }, {
    key: 'setInitialState',
    value: function setInitialState() {
      var previousContent = null;

      this.setState({
        previousContent: previousContent
      });
    }
  }, {
    key: 'initialise',
    value: function initialise() {
      var content = this.getContent(),
          previousContent = content; ///

      this.setPreviousContent(previousContent);

      this.on('keyup', this.keyUpHandler, this);
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var onChange = properties.onChange,
          changeHandler = onChange,
          contentTextarea = InputElement.fromProperties(ContentTextarea, properties, changeHandler);


      contentTextarea.initialise();

      return contentTextarea;
    }
  }]);

  return ContentTextarea;
}(InputElement);

Object.assign(ContentTextarea, {
  tagName: 'textarea',
  defaultProperties: {
    className: 'content',
    spellCheck: false
  },
  ignoredProperties: ['onChange']
});

module.exports = ContentTextarea;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leGFtcGxlL3RleHRhcmVhL2NvbnRlbnQuanMiXSwibmFtZXMiOlsiZWFzeSIsInJlcXVpcmUiLCJ0cmFuc2Zvcm1Db250ZW50IiwiZ2VuZXJhdGVPcGVyYXRpb25zIiwidHJhbnNmb3JtT3BlcmF0aW9ucyIsIklucHV0RWxlbWVudCIsIkNvbnRlbnRUZXh0YXJlYSIsInNlbGVjdG9yIiwiY2hhbmdlSGFuZGxlciIsInNldEluaXRpYWxTdGF0ZSIsInZhbHVlIiwiZ2V0VmFsdWUiLCJjb250ZW50Iiwic2V0VmFsdWUiLCJnZXRDb250ZW50IiwicHJldmlvdXNDb250ZW50IiwiZ2V0UHJldmlvdXNDb250ZW50Iiwib3BlcmF0aW9ucyIsInBlbmRpbmdPcGVyYXRpb25zIiwidXBkYXRlQ29udGVudCIsInVwZGF0ZVByZXZpb3VzQ29udGVudCIsImdldE9wZXJhdGlvbnMiLCJ0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zIiwidHJhbnNmb3JtZWRDb250ZW50Iiwic2V0Q29udGVudCIsInRyYW5zZm9ybWVkUHJldmlvdXNDb250ZW50Iiwic2V0UHJldmlvdXNDb250ZW50Iiwic3VjY2VzcyIsImJpbmQiLCJnZXRTdGF0ZSIsInN0YXRlIiwidXBkYXRlU3RhdGUiLCJzZXRTdGF0ZSIsIm9uIiwia2V5VXBIYW5kbGVyIiwicHJvcGVydGllcyIsIm9uQ2hhbmdlIiwiY29udGVudFRleHRhcmVhIiwiZnJvbVByb3BlcnRpZXMiLCJpbml0aWFsaXNlIiwiT2JqZWN0IiwiYXNzaWduIiwidGFnTmFtZSIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwic3BlbGxDaGVjayIsImlnbm9yZWRQcm9wZXJ0aWVzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPQyxRQUFRLE1BQVIsQ0FBYjs7QUFFQSxJQUFNQyxtQkFBbUJELFFBQVEseUJBQVIsQ0FBekI7QUFBQSxJQUNNRSxxQkFBcUJGLFFBQVEsMkJBQVIsQ0FEM0I7QUFBQSxJQUVNRyxzQkFBc0JILFFBQVEsNEJBQVIsQ0FGNUI7O0lBSVFJLFksR0FBaUJMLEksQ0FBakJLLFk7O0lBRUZDLGU7OztBQUNKLDJCQUFZQyxRQUFaLEVBQXNCQyxhQUF0QixFQUFxQztBQUFBOztBQUFBLGtJQUM3QkQsUUFENkI7O0FBR25DLFVBQUtDLGFBQUwsR0FBcUJBLGFBQXJCOztBQUVBLFVBQUtDLGVBQUw7QUFMbUM7QUFNcEM7Ozs7aUNBRVk7QUFDWCxVQUFNQyxRQUFRLEtBQUtDLFFBQUwsRUFBZDtBQUFBLFVBQ01DLFVBQVVGLEtBRGhCLENBRFcsQ0FFWTs7QUFFdkIsYUFBT0UsT0FBUDtBQUNEOzs7K0JBRVVBLE8sRUFBUztBQUNsQixVQUFNRixRQUFRRSxPQUFkLENBRGtCLENBQ007O0FBRXhCLFdBQUtDLFFBQUwsQ0FBY0gsS0FBZDtBQUNEOzs7b0NBRWU7QUFDZCxVQUFNRSxVQUFVLEtBQUtFLFVBQUwsRUFBaEI7QUFBQSxVQUNNQyxrQkFBa0IsS0FBS0Msa0JBQUwsRUFEeEI7QUFBQSxVQUVNQyxhQUFhZCxtQkFBbUJZLGVBQW5CLEVBQW9DSCxPQUFwQyxDQUZuQjs7QUFJQSxhQUFPSyxVQUFQO0FBQ0Q7OzsyQkFFTUMsaUIsRUFBbUI7QUFDeEIsV0FBS0MsYUFBTCxDQUFtQkQsaUJBQW5COztBQUVBLFdBQUtFLHFCQUFMLENBQTJCRixpQkFBM0I7QUFDRDs7O2tDQUVhQSxpQixFQUFtQjtBQUMvQixVQUFJTixVQUFVLEtBQUtFLFVBQUwsRUFBZDs7QUFFQSxVQUFNRyxhQUFhLEtBQUtJLGFBQUwsRUFBbkI7QUFBQSxVQUNNQywrQkFBK0JsQixvQkFBb0JjLGlCQUFwQixFQUF1Q0QsVUFBdkMsQ0FEckM7QUFBQSxVQUVNTSxxQkFBcUJyQixpQkFBaUJVLE9BQWpCLEVBQTBCVSw0QkFBMUIsQ0FGM0I7O0FBSUFWLGdCQUFVVyxrQkFBVixDQVArQixDQU9EOztBQUU5QixXQUFLQyxVQUFMLENBQWdCWixPQUFoQjtBQUNEOzs7MENBRXFCTSxpQixFQUFtQjtBQUN2QyxVQUFJSCxrQkFBa0IsS0FBS0Msa0JBQUwsRUFBdEI7O0FBRUEsVUFBTVMsNkJBQTZCdkIsaUJBQWlCYSxlQUFqQixFQUFrQ0csaUJBQWxDLENBQW5DOztBQUVBSCx3QkFBa0JVLDBCQUFsQixDQUx1QyxDQUtPOztBQUU5QyxXQUFLQyxrQkFBTCxDQUF3QlgsZUFBeEI7QUFDRDs7O21DQUVjO0FBQ2IsVUFBSUgsVUFBVSxLQUFLRSxVQUFMLEVBQWQ7QUFBQSxVQUNJQyxrQkFBa0IsS0FBS0Msa0JBQUwsRUFEdEI7O0FBR0EsVUFBSUosWUFBWUcsZUFBaEIsRUFBaUM7QUFDL0IsWUFBTVksVUFBVSxLQUFLbkIsYUFBTCxDQUFtQkksT0FBbkIsRUFBNEJHLGVBQTVCLENBQWhCOztBQUVBLFlBQUlZLE9BQUosRUFBYTtBQUNYWiw0QkFBa0JILE9BQWxCLENBRFcsQ0FDaUI7O0FBRTVCLGVBQUtjLGtCQUFMLENBQXdCWCxlQUF4QjtBQUNEO0FBQ0Y7QUFDRjs7O29DQUVlO0FBQ2QsVUFBTUQsYUFBYSxLQUFLQSxVQUFMLENBQWdCYyxJQUFoQixDQUFxQixJQUFyQixDQUFuQjtBQUFBLFVBQ01KLGFBQWEsS0FBS0EsVUFBTCxDQUFnQkksSUFBaEIsQ0FBcUIsSUFBckIsQ0FEbkI7O0FBR0EsYUFBUTtBQUNOZCw4QkFETTtBQUVOVTtBQUZNLE9BQVI7QUFJRDs7O3lDQUVvQjtBQUNiLGtCQUFRLEtBQUtLLFFBQUwsRUFBUjtBQUFBLFVBQ0VkLGVBREYsR0FDc0JlLEtBRHRCLENBQ0VmLGVBREY7OztBQUdOLGFBQU9BLGVBQVA7QUFDRDs7O3VDQUVrQkEsZSxFQUFpQjtBQUNsQyxXQUFLZ0IsV0FBTCxDQUFpQjtBQUNmaEI7QUFEZSxPQUFqQjtBQUdEOzs7c0NBRWlCO0FBQ2hCLFVBQU1BLGtCQUFrQixJQUF4Qjs7QUFFQSxXQUFLaUIsUUFBTCxDQUFjO0FBQ1pqQjtBQURZLE9BQWQ7QUFHRDs7O2lDQUVZO0FBQ1gsVUFBTUgsVUFBVSxLQUFLRSxVQUFMLEVBQWhCO0FBQUEsVUFDTUMsa0JBQWtCSCxPQUR4QixDQURXLENBRXVCOztBQUVsQyxXQUFLYyxrQkFBTCxDQUF3QlgsZUFBeEI7O0FBRUEsV0FBS2tCLEVBQUwsQ0FBUSxPQUFSLEVBQWlCLEtBQUtDLFlBQXRCLEVBQW9DLElBQXBDO0FBQ0Q7OzttQ0FFcUJDLFUsRUFBWTtBQUMxQixVQUFFQyxRQUFGLEdBQWVELFVBQWYsQ0FBRUMsUUFBRjtBQUFBLFVBQ0E1QixhQURBLEdBQ2dCNEIsUUFEaEI7QUFBQSxVQUVBQyxlQUZBLEdBRWtCaEMsYUFBYWlDLGNBQWIsQ0FBNEJoQyxlQUE1QixFQUE2QzZCLFVBQTdDLEVBQXlEM0IsYUFBekQsQ0FGbEI7OztBQUlONkIsc0JBQWdCRSxVQUFoQjs7QUFFQSxhQUFPRixlQUFQO0FBQ0Q7Ozs7RUF6SDJCaEMsWTs7QUE0SDlCbUMsT0FBT0MsTUFBUCxDQUFjbkMsZUFBZCxFQUErQjtBQUM3Qm9DLFdBQVMsVUFEb0I7QUFFN0JDLHFCQUFtQjtBQUNqQkMsZUFBVyxTQURNO0FBRWpCQyxnQkFBWTtBQUZLLEdBRlU7QUFNN0JDLHFCQUFtQixDQUNqQixVQURpQjtBQU5VLENBQS9COztBQVdBQyxPQUFPQyxPQUFQLEdBQWlCMUMsZUFBakIiLCJmaWxlIjoiY29udGVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKTtcblxuY29uc3QgdHJhbnNmb3JtQ29udGVudCA9IHJlcXVpcmUoJy4uLy4uL2NvbnRlbnQvdHJhbnNmb3JtJyksXG4gICAgICBnZW5lcmF0ZU9wZXJhdGlvbnMgPSByZXF1aXJlKCcuLi8uLi9vcGVyYXRpb25zL2dlbmVyYXRlJyksXG4gICAgICB0cmFuc2Zvcm1PcGVyYXRpb25zID0gcmVxdWlyZSgnLi4vLi4vb3BlcmF0aW9ucy90cmFuc2Zvcm0nKTtcblxuY29uc3QgeyBJbnB1dEVsZW1lbnQgfSA9IGVhc3k7XG5cbmNsYXNzIENvbnRlbnRUZXh0YXJlYSBleHRlbmRzIElucHV0RWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBjaGFuZ2VIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgdGhpcy5jaGFuZ2VIYW5kbGVyID0gY2hhbmdlSGFuZGxlcjtcblxuICAgIHRoaXMuc2V0SW5pdGlhbFN0YXRlKCk7XG4gIH1cblxuICBnZXRDb250ZW50KCkge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRWYWx1ZSgpLFxuICAgICAgICAgIGNvbnRlbnQgPSB2YWx1ZTsgLy8vXG5cbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIHNldENvbnRlbnQoY29udGVudCkge1xuICAgIGNvbnN0IHZhbHVlID0gY29udGVudDsgIC8vL1xuXG4gICAgdGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XG4gIH1cblxuICBnZXRPcGVyYXRpb25zKCkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQoKSxcbiAgICAgICAgICBwcmV2aW91c0NvbnRlbnQgPSB0aGlzLmdldFByZXZpb3VzQ29udGVudCgpLFxuICAgICAgICAgIG9wZXJhdGlvbnMgPSBnZW5lcmF0ZU9wZXJhdGlvbnMocHJldmlvdXNDb250ZW50LCBjb250ZW50KTtcblxuICAgIHJldHVybiBvcGVyYXRpb25zO1xuICB9XG5cbiAgdXBkYXRlKHBlbmRpbmdPcGVyYXRpb25zKSB7XG4gICAgdGhpcy51cGRhdGVDb250ZW50KHBlbmRpbmdPcGVyYXRpb25zKTtcblxuICAgIHRoaXMudXBkYXRlUHJldmlvdXNDb250ZW50KHBlbmRpbmdPcGVyYXRpb25zKTtcbiAgfVxuXG4gIHVwZGF0ZUNvbnRlbnQocGVuZGluZ09wZXJhdGlvbnMpIHtcbiAgICBsZXQgY29udGVudCA9IHRoaXMuZ2V0Q29udGVudCgpO1xuXG4gICAgY29uc3Qgb3BlcmF0aW9ucyA9IHRoaXMuZ2V0T3BlcmF0aW9ucygpLFxuICAgICAgICAgIHRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMgPSB0cmFuc2Zvcm1PcGVyYXRpb25zKHBlbmRpbmdPcGVyYXRpb25zLCBvcGVyYXRpb25zKSxcbiAgICAgICAgICB0cmFuc2Zvcm1lZENvbnRlbnQgPSB0cmFuc2Zvcm1Db250ZW50KGNvbnRlbnQsIHRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMpO1xuXG4gICAgY29udGVudCA9IHRyYW5zZm9ybWVkQ29udGVudDsgLy8vXG5cbiAgICB0aGlzLnNldENvbnRlbnQoY29udGVudCk7XG4gIH1cblxuICB1cGRhdGVQcmV2aW91c0NvbnRlbnQocGVuZGluZ09wZXJhdGlvbnMpIHtcbiAgICBsZXQgcHJldmlvdXNDb250ZW50ID0gdGhpcy5nZXRQcmV2aW91c0NvbnRlbnQoKTtcblxuICAgIGNvbnN0IHRyYW5zZm9ybWVkUHJldmlvdXNDb250ZW50ID0gdHJhbnNmb3JtQ29udGVudChwcmV2aW91c0NvbnRlbnQsIHBlbmRpbmdPcGVyYXRpb25zKTtcblxuICAgIHByZXZpb3VzQ29udGVudCA9IHRyYW5zZm9ybWVkUHJldmlvdXNDb250ZW50OyAvLy9cblxuICAgIHRoaXMuc2V0UHJldmlvdXNDb250ZW50KHByZXZpb3VzQ29udGVudCk7XG4gIH1cblxuICBrZXlVcEhhbmRsZXIoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQoKSxcbiAgICAgICAgcHJldmlvdXNDb250ZW50ID0gdGhpcy5nZXRQcmV2aW91c0NvbnRlbnQoKTtcblxuICAgIGlmIChjb250ZW50ICE9PSBwcmV2aW91c0NvbnRlbnQpIHtcbiAgICAgIGNvbnN0IHN1Y2Nlc3MgPSB0aGlzLmNoYW5nZUhhbmRsZXIoY29udGVudCwgcHJldmlvdXNDb250ZW50KTtcblxuICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgcHJldmlvdXNDb250ZW50ID0gY29udGVudDsgIC8vL1xuXG4gICAgICAgIHRoaXMuc2V0UHJldmlvdXNDb250ZW50KHByZXZpb3VzQ29udGVudCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcGFyZW50Q29udGV4dCgpIHtcbiAgICBjb25zdCBnZXRDb250ZW50ID0gdGhpcy5nZXRDb250ZW50LmJpbmQodGhpcyksXG4gICAgICAgICAgc2V0Q29udGVudCA9IHRoaXMuc2V0Q29udGVudC5iaW5kKHRoaXMpO1xuXG4gICAgcmV0dXJuICh7XG4gICAgICBnZXRDb250ZW50LFxuICAgICAgc2V0Q29udGVudFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0UHJldmlvdXNDb250ZW50KCkge1xuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxuICAgICAgICAgIHsgcHJldmlvdXNDb250ZW50IH0gPSBzdGF0ZTtcblxuICAgIHJldHVybiBwcmV2aW91c0NvbnRlbnQ7XG4gIH1cblxuICBzZXRQcmV2aW91c0NvbnRlbnQocHJldmlvdXNDb250ZW50KSB7XG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XG4gICAgICBwcmV2aW91c0NvbnRlbnRcbiAgICB9KTtcbiAgfVxuXG4gIHNldEluaXRpYWxTdGF0ZSgpIHtcbiAgICBjb25zdCBwcmV2aW91c0NvbnRlbnQgPSBudWxsO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwcmV2aW91c0NvbnRlbnRcbiAgICB9KTtcbiAgfVxuXG4gIGluaXRpYWxpc2UoKSB7XG4gICAgY29uc3QgY29udGVudCA9IHRoaXMuZ2V0Q29udGVudCgpLFxuICAgICAgICAgIHByZXZpb3VzQ29udGVudCA9IGNvbnRlbnQ7ICAvLy9cblxuICAgIHRoaXMuc2V0UHJldmlvdXNDb250ZW50KHByZXZpb3VzQ29udGVudCk7XG5cbiAgICB0aGlzLm9uKCdrZXl1cCcsIHRoaXMua2V5VXBIYW5kbGVyLCB0aGlzKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBjaGFuZ2VIYW5kbGVyID0gb25DaGFuZ2UsIC8vL1xuICAgICAgICAgIGNvbnRlbnRUZXh0YXJlYSA9IElucHV0RWxlbWVudC5mcm9tUHJvcGVydGllcyhDb250ZW50VGV4dGFyZWEsIHByb3BlcnRpZXMsIGNoYW5nZUhhbmRsZXIpO1xuXG4gICAgY29udGVudFRleHRhcmVhLmluaXRpYWxpc2UoKTtcblxuICAgIHJldHVybiBjb250ZW50VGV4dGFyZWE7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihDb250ZW50VGV4dGFyZWEsIHtcbiAgdGFnTmFtZTogJ3RleHRhcmVhJyxcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdjb250ZW50JyxcbiAgICBzcGVsbENoZWNrOiBmYWxzZVxuICB9LFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICdvbkNoYW5nZSdcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ29udGVudFRleHRhcmVhO1xuIl19