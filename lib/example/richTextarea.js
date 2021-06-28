"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _easyWithStyle = _interopRequireDefault(require("easy-with-style"));
var _easyRichtextarea = require("easy-richtextarea");
function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
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
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
function _taggedTemplateLiteral(strings, raw) {
    if (!raw) {
        raw = strings.slice(0);
    }
    return Object.freeze(Object.defineProperties(strings, {
        raw: {
            value: Object.freeze(raw)
        }
    }));
}
var _typeof = function(obj) {
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _templateObject() {
    var data = _taggedTemplateLiteral([
        "\n\n  width: 40rem;\n  height: 20rem;\n  border: 1px solid black;\n  \n"
    ]);
    _templateObject = function _templateObject() {
        return data;
    };
    return data;
}
var _default = (0, _easyWithStyle).default(/*#__PURE__*/ function(RichTextarea) {
    _inherits(_class, RichTextarea);
    function _class() {
        _classCallCheck(this, _class);
        return _possibleConstructorReturn(this, _getPrototypeOf(_class).apply(this, arguments));
    }
    _createClass(_class, [
        {
            key: "getRichTextarea",
            value: function getRichTextarea() {
                var richTextarea = this; ///
                return richTextarea;
            }
        },
        {
            key: "parentContext",
            value: function parentContext() {
                var getRichTextarea = this.getRichTextarea.bind(this), activateRichTextarea = this.activate.bind(this), setRichTextareaContent = this.setContent.bind(this); ///
                return {
                    getRichTextarea: getRichTextarea,
                    activateRichTextarea: activateRichTextarea,
                    setRichTextareaContent: setRichTextareaContent
                };
            }
        }
    ]);
    return _class;
}(_easyRichtextarea.RichTextarea))(_templateObject());
exports.default = _default;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9leGFtcGxlL3JpY2hUZXh0YXJlYS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHdpdGhTdHlsZSBmcm9tIFwiZWFzeS13aXRoLXN0eWxlXCI7ICAvLy9cblxuaW1wb3J0IHsgUmljaFRleHRhcmVhIH0gZnJvbSBcImVhc3ktcmljaHRleHRhcmVhXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZShjbGFzcyBleHRlbmRzIFJpY2hUZXh0YXJlYSB7XG4gIGdldFJpY2hUZXh0YXJlYSgpIHtcbiAgICBjb25zdCByaWNoVGV4dGFyZWEgPSB0aGlzOyAgLy8vXG5cbiAgICByZXR1cm4gcmljaFRleHRhcmVhO1xuICB9XG5cbiAgcGFyZW50Q29udGV4dCgpIHtcbiAgICBjb25zdCBnZXRSaWNoVGV4dGFyZWEgPSB0aGlzLmdldFJpY2hUZXh0YXJlYS5iaW5kKHRoaXMpLFxuICAgICAgICAgIGFjdGl2YXRlUmljaFRleHRhcmVhID0gdGhpcy5hY3RpdmF0ZS5iaW5kKHRoaXMpLCAgLy8vXG4gICAgICAgICAgc2V0UmljaFRleHRhcmVhQ29udGVudCA9IHRoaXMuc2V0Q29udGVudC5iaW5kKHRoaXMpOyAgLy8vXG5cbiAgICByZXR1cm4gKHtcbiAgICAgIGdldFJpY2hUZXh0YXJlYSxcbiAgICAgIGFjdGl2YXRlUmljaFRleHRhcmVhLFxuICAgICAgc2V0UmljaFRleHRhcmVhQ29udGVudFxuICAgIH0pO1xuICB9XG59KWBcblxuICB3aWR0aDogNDByZW07XG4gIGhlaWdodDogMjByZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xuICBcbmA7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkNBQUEsVUFBWTs7Ozs7QUFFVSxHQUFpQixDQUFqQixjQUFpQjtBQUVWLEdBQW1CLENBQW5CLGlCQUFtQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBb0I3Qyx1RUFNSDs7Ozs7OzttQkE1QnNCLGNBQWlCOzs7Ozs7OztZQUtyQyxHQUFlLEdBQWYsZUFBZTs0QkFBZixlQUFlLEdBQUcsQ0FBQztnQkFDakIsR0FBSyxDQUFDLFlBQVksUUFBVSxDQUFHLEFBQUgsRUFBRyxBQUFILENBQUc7dUJBRXhCLFlBQVk7WUFDckIsQ0FBQzs7O1lBRUQsR0FBYSxHQUFiLGFBQWE7NEJBQWIsYUFBYSxHQUFHLENBQUM7Z0JBQ2YsR0FBSyxDQUFDLGVBQWUsUUFBUSxlQUFlLENBQUMsSUFBSSxRQUMzQyxvQkFBb0IsUUFBUSxRQUFRLENBQUMsSUFBSSxRQUN6QyxzQkFBc0IsUUFBUSxVQUFVLENBQUMsSUFBSSxPQUFTLENBQUcsQUFBSCxFQUFHLEFBQUgsQ0FBRzs7b0JBRzdELGVBQWUsRUFBZixlQUFlO29CQUNmLG9CQUFvQixFQUFwQixvQkFBb0I7b0JBQ3BCLHNCQUFzQixFQUF0QixzQkFBc0I7O1lBRTFCLENBQUM7Ozs7RUFuQjBCLGlCQUFtQiJ9