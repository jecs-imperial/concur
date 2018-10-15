'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

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
      var value = content,
          ///
      previousContent = content; ///

      this.setValue(value);

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
      var previousContent = '';

      this.setState({
        previousContent: previousContent
      });
    }
  }, {
    key: 'initialise',
    value: function initialise() {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leGFtcGxlL3RleHRhcmVhL2NvbnRlbnQuanMiXSwibmFtZXMiOlsiZWFzeSIsInJlcXVpcmUiLCJJbnB1dEVsZW1lbnQiLCJDb250ZW50VGV4dGFyZWEiLCJzZWxlY3RvciIsImNoYW5nZUhhbmRsZXIiLCJzZXRJbml0aWFsU3RhdGUiLCJ2YWx1ZSIsImdldFZhbHVlIiwiY29udGVudCIsInByZXZpb3VzQ29udGVudCIsInNldFZhbHVlIiwic2V0UHJldmlvdXNDb250ZW50IiwiZ2V0Q29udGVudCIsImdldFByZXZpb3VzQ29udGVudCIsInN1Y2Nlc3MiLCJiaW5kIiwic2V0Q29udGVudCIsImdldFN0YXRlIiwic3RhdGUiLCJ1cGRhdGVTdGF0ZSIsInNldFN0YXRlIiwib24iLCJrZXlVcEhhbmRsZXIiLCJwcm9wZXJ0aWVzIiwib25DaGFuZ2UiLCJjb250ZW50VGV4dGFyZWEiLCJmcm9tUHJvcGVydGllcyIsImluaXRpYWxpc2UiLCJPYmplY3QiLCJhc3NpZ24iLCJ0YWdOYW1lIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJzcGVsbENoZWNrIiwiaWdub3JlZFByb3BlcnRpZXMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiOztJQUVRQyxZLEdBQWlCRixJLENBQWpCRSxZOztJQUVGQyxlOzs7QUFDSiwyQkFBWUMsUUFBWixFQUFzQkMsYUFBdEIsRUFBcUM7QUFBQTs7QUFBQSxrSUFDN0JELFFBRDZCOztBQUduQyxVQUFLQyxhQUFMLEdBQXFCQSxhQUFyQjs7QUFFQSxVQUFLQyxlQUFMO0FBTG1DO0FBTXBDOzs7O2lDQUVZO0FBQ1gsVUFBTUMsUUFBUSxLQUFLQyxRQUFMLEVBQWQ7QUFBQSxVQUNNQyxVQUFVRixLQURoQixDQURXLENBRVk7O0FBRXZCLGFBQU9FLE9BQVA7QUFDRDs7OytCQUVVQSxPLEVBQVM7QUFDbEIsVUFBTUYsUUFBUUUsT0FBZDtBQUFBLFVBQXdCO0FBQ2xCQyx3QkFBa0JELE9BRHhCLENBRGtCLENBRWdCOztBQUVsQyxXQUFLRSxRQUFMLENBQWNKLEtBQWQ7O0FBRUEsV0FBS0ssa0JBQUwsQ0FBd0JGLGVBQXhCO0FBQ0Q7OzttQ0FFYztBQUNiLFVBQUlELFVBQVUsS0FBS0ksVUFBTCxFQUFkO0FBQUEsVUFDSUgsa0JBQWtCLEtBQUtJLGtCQUFMLEVBRHRCOztBQUdBLFVBQUlMLFlBQVlDLGVBQWhCLEVBQWlDO0FBQy9CLFlBQU1LLFVBQVUsS0FBS1YsYUFBTCxDQUFtQkksT0FBbkIsRUFBNEJDLGVBQTVCLENBQWhCOztBQUVBLFlBQUlLLE9BQUosRUFBYTtBQUNYTCw0QkFBa0JELE9BQWxCLENBRFcsQ0FDaUI7O0FBRTVCLGVBQUtHLGtCQUFMLENBQXdCRixlQUF4QjtBQUNEO0FBQ0Y7QUFDRjs7O29DQUVlO0FBQ2QsVUFBTUcsYUFBYSxLQUFLQSxVQUFMLENBQWdCRyxJQUFoQixDQUFxQixJQUFyQixDQUFuQjtBQUFBLFVBQ01DLGFBQWEsS0FBS0EsVUFBTCxDQUFnQkQsSUFBaEIsQ0FBcUIsSUFBckIsQ0FEbkI7O0FBR0EsYUFBUTtBQUNOSCw4QkFETTtBQUVOSTtBQUZNLE9BQVI7QUFJRDs7O3lDQUVvQjtBQUNiLGtCQUFRLEtBQUtDLFFBQUwsRUFBUjtBQUFBLFVBQ0VSLGVBREYsR0FDc0JTLEtBRHRCLENBQ0VULGVBREY7OztBQUdOLGFBQU9BLGVBQVA7QUFDRDs7O3VDQUVrQkEsZSxFQUFpQjtBQUNsQyxXQUFLVSxXQUFMLENBQWlCO0FBQ2ZWO0FBRGUsT0FBakI7QUFHRDs7O3NDQUVpQjtBQUNoQixVQUFNQSxrQkFBa0IsRUFBeEI7O0FBRUEsV0FBS1csUUFBTCxDQUFjO0FBQ1pYO0FBRFksT0FBZDtBQUdEOzs7aUNBRVk7QUFDWCxXQUFLWSxFQUFMLENBQVEsT0FBUixFQUFpQixLQUFLQyxZQUF0QixFQUFvQyxJQUFwQztBQUNEOzs7bUNBRXFCQyxVLEVBQVk7QUFDMUIsVUFBRUMsUUFBRixHQUFlRCxVQUFmLENBQUVDLFFBQUY7QUFBQSxVQUNBcEIsYUFEQSxHQUNnQm9CLFFBRGhCO0FBQUEsVUFFQUMsZUFGQSxHQUVrQnhCLGFBQWF5QixjQUFiLENBQTRCeEIsZUFBNUIsRUFBNkNxQixVQUE3QyxFQUF5RG5CLGFBQXpELENBRmxCOzs7QUFJTnFCLHNCQUFnQkUsVUFBaEI7O0FBRUEsYUFBT0YsZUFBUDtBQUNEOzs7O0VBbkYyQnhCLFk7O0FBc0Y5QjJCLE9BQU9DLE1BQVAsQ0FBYzNCLGVBQWQsRUFBK0I7QUFDN0I0QixXQUFTLFVBRG9CO0FBRTdCQyxxQkFBbUI7QUFDakJDLGVBQVcsU0FETTtBQUVqQkMsZ0JBQVk7QUFGSyxHQUZVO0FBTTdCQyxxQkFBbUIsQ0FDakIsVUFEaUI7QUFOVSxDQUEvQjs7QUFXQUMsT0FBT0MsT0FBUCxHQUFpQmxDLGVBQWpCIiwiZmlsZSI6ImNvbnRlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5Jyk7XG5cbmNvbnN0IHsgSW5wdXRFbGVtZW50IH0gPSBlYXN5O1xuXG5jbGFzcyBDb250ZW50VGV4dGFyZWEgZXh0ZW5kcyBJbnB1dEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgY2hhbmdlSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHRoaXMuY2hhbmdlSGFuZGxlciA9IGNoYW5nZUhhbmRsZXI7XG5cbiAgICB0aGlzLnNldEluaXRpYWxTdGF0ZSgpO1xuICB9XG5cbiAgZ2V0Q29udGVudCgpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoKSxcbiAgICAgICAgICBjb250ZW50ID0gdmFsdWU7IC8vL1xuXG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBzZXRDb250ZW50KGNvbnRlbnQpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGNvbnRlbnQsICAvLy9cbiAgICAgICAgICBwcmV2aW91c0NvbnRlbnQgPSBjb250ZW50OyAgLy8vXG5cbiAgICB0aGlzLnNldFZhbHVlKHZhbHVlKTtcblxuICAgIHRoaXMuc2V0UHJldmlvdXNDb250ZW50KHByZXZpb3VzQ29udGVudCk7XG4gIH1cblxuICBrZXlVcEhhbmRsZXIoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQoKSxcbiAgICAgICAgcHJldmlvdXNDb250ZW50ID0gdGhpcy5nZXRQcmV2aW91c0NvbnRlbnQoKTtcblxuICAgIGlmIChjb250ZW50ICE9PSBwcmV2aW91c0NvbnRlbnQpIHtcbiAgICAgIGNvbnN0IHN1Y2Nlc3MgPSB0aGlzLmNoYW5nZUhhbmRsZXIoY29udGVudCwgcHJldmlvdXNDb250ZW50KTtcblxuICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgcHJldmlvdXNDb250ZW50ID0gY29udGVudDsgIC8vL1xuXG4gICAgICAgIHRoaXMuc2V0UHJldmlvdXNDb250ZW50KHByZXZpb3VzQ29udGVudCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcGFyZW50Q29udGV4dCgpIHtcbiAgICBjb25zdCBnZXRDb250ZW50ID0gdGhpcy5nZXRDb250ZW50LmJpbmQodGhpcyksXG4gICAgICAgICAgc2V0Q29udGVudCA9IHRoaXMuc2V0Q29udGVudC5iaW5kKHRoaXMpO1xuXG4gICAgcmV0dXJuICh7XG4gICAgICBnZXRDb250ZW50LFxuICAgICAgc2V0Q29udGVudFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0UHJldmlvdXNDb250ZW50KCkge1xuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxuICAgICAgICAgIHsgcHJldmlvdXNDb250ZW50IH0gPSBzdGF0ZTtcblxuICAgIHJldHVybiBwcmV2aW91c0NvbnRlbnQ7XG4gIH1cblxuICBzZXRQcmV2aW91c0NvbnRlbnQocHJldmlvdXNDb250ZW50KSB7XG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XG4gICAgICBwcmV2aW91c0NvbnRlbnRcbiAgICB9KTtcbiAgfVxuXG4gIHNldEluaXRpYWxTdGF0ZSgpIHtcbiAgICBjb25zdCBwcmV2aW91c0NvbnRlbnQgPSAnJztcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcHJldmlvdXNDb250ZW50XG4gICAgfSk7XG4gIH1cblxuICBpbml0aWFsaXNlKCkge1xuICAgIHRoaXMub24oJ2tleXVwJywgdGhpcy5rZXlVcEhhbmRsZXIsIHRoaXMpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGNoYW5nZUhhbmRsZXIgPSBvbkNoYW5nZSwgLy8vXG4gICAgICAgICAgY29udGVudFRleHRhcmVhID0gSW5wdXRFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKENvbnRlbnRUZXh0YXJlYSwgcHJvcGVydGllcywgY2hhbmdlSGFuZGxlcik7XG5cbiAgICBjb250ZW50VGV4dGFyZWEuaW5pdGlhbGlzZSgpO1xuXG4gICAgcmV0dXJuIGNvbnRlbnRUZXh0YXJlYTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKENvbnRlbnRUZXh0YXJlYSwge1xuICB0YWdOYW1lOiAndGV4dGFyZWEnLFxuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ2NvbnRlbnQnLFxuICAgIHNwZWxsQ2hlY2s6IGZhbHNlXG4gIH0sXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ29uQ2hhbmdlJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb250ZW50VGV4dGFyZWE7XG4iXX0=