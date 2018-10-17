'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var types = require('../types'),
    stringCompare = require('../stringCompare'),
    DeleteOperation = require('../operation/delete');

var insertType = types.insertType;

var InsertOperation = function () {
  function InsertOperation(type, string, position) {
    _classCallCheck(this, InsertOperation);

    this.type = type;
    this.string = string;
    this.position = position;
  }

  _createClass(InsertOperation, [{
    key: 'clone',
    value: function clone() {
      return InsertOperation.fromStringAndPosition(this.string, this.position);
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var json = {
        "type": this.type,
        "string": this.string,
        "position": this.position
      };

      return json;
    }
  }, {
    key: 'transformOperation',
    value: function transformOperation(operation) {
      switch (operation.type) {
        case 'insert':
          return function (tau, rho) {

            if (tau.position < rho.position) {
              return [tau.clone()];
            }

            if (tau.position === rho.position) {
              if (tau.string === rho.string) {
                return [tau.clone()];
              }
              if (tau.string !== rho.string) {
                if (stringCompare(rho.string, tau.string)) {
                  return [rho.shift(tau)];
                } else {
                  return [tau.clone()];
                }
              }
            }

            if (tau.position > rho.position) {
              return [rho.shift(tau)];
            }
          }(operation, this);

        case 'delete':
          return function (tau, rho) {

            if (tau.position + tau.length <= rho.position) {
              return [tau.clone()];
            }

            if (tau.position < rho.position) {
              return [rho.left(tau), rho.left(tau).shift(rho.shift(rho.right(tau)))];
            }

            if (tau.position >= rho.position) {
              return [rho.shift(tau)];
            }
          }(operation, this);

        case 'empty':
          return function (tau, rho) {

            return [tau.clone()];
          }(operation, this);
      }
    }
  }, {
    key: 'transformContent',
    value: function transformContent(content) {
      return content.substring(0, this.position) + this.string + content.substring(this.position);
    }
  }, {
    key: 'transformSelection',
    value: function transformSelection(selection) {
      var transformedSelection = void 0;

      var startPosition = this.position,
          ///
      length = this.string.length,
          selectionStartPosition = selection.getStartPosition(),
          selectionEndPosition = selection.getEndPosition(),
          offset = length,
          ///
      endOffset = offset; ///

      if (false) {} else if (selectionStartPosition >= startPosition) {
        transformedSelection = selection.shifted(offset);
      } else if (selectionEndPosition > startPosition) {
        transformedSelection = selection.endPositionShifted(endOffset);
      } else {
        transformedSelection = selection.clone();
      }

      return transformedSelection;
    }
  }, {
    key: 'shifted',
    value: function shifted(offset) {
      var string = this.string,
          position = this.position + offset,
          insertOperation = InsertOperation.fromStringAndPosition(string, position);

      return insertOperation;
    }
  }, {
    key: 'shift',
    value: function shift(operation) {
      var length = this.string.length,
          offset = length,
          ///
      shiftedOperation = operation.shifted(offset);

      return shiftedOperation;
    }
  }, {
    key: 'left',
    value: function left(deleteOperation) {
      var position = deleteOperation.position,
          length = this.position - position;

      deleteOperation = DeleteOperation.fromLengthAndPosition(length, position);

      return deleteOperation;
    }
  }, {
    key: 'right',
    value: function right(deleteOperation) {
      var length = deleteOperation.length,
          position = deleteOperation.position;

      length = length - this.position + position;
      position = this.position;

      deleteOperation = DeleteOperation.fromLengthAndPosition(length, position);

      return deleteOperation;
    }
  }], [{
    key: 'fromStringAndPosition',
    value: function fromStringAndPosition(string, position) {
      var type = insertType,
          ///
      insertOperation = new InsertOperation(type, string, position);

      return insertOperation;
    }
  }, {
    key: 'fromJSON',
    value: function fromJSON(json) {
      var type = json["type"],
          string = json["string"],
          position = json["position"],
          insertOperation = new InsertOperation(type, string, position);

      return insertOperation;
    }
  }]);

  return InsertOperation;
}();

module.exports = InsertOperation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9vcGVyYXRpb24vaW5zZXJ0LmpzIl0sIm5hbWVzIjpbInR5cGVzIiwicmVxdWlyZSIsInN0cmluZ0NvbXBhcmUiLCJEZWxldGVPcGVyYXRpb24iLCJpbnNlcnRUeXBlIiwiSW5zZXJ0T3BlcmF0aW9uIiwidHlwZSIsInN0cmluZyIsInBvc2l0aW9uIiwiZnJvbVN0cmluZ0FuZFBvc2l0aW9uIiwianNvbiIsIm9wZXJhdGlvbiIsInRhdSIsInJobyIsImNsb25lIiwic2hpZnQiLCJsZW5ndGgiLCJsZWZ0IiwicmlnaHQiLCJjb250ZW50Iiwic3Vic3RyaW5nIiwic2VsZWN0aW9uIiwidHJhbnNmb3JtZWRTZWxlY3Rpb24iLCJzdGFydFBvc2l0aW9uIiwic2VsZWN0aW9uU3RhcnRQb3NpdGlvbiIsImdldFN0YXJ0UG9zaXRpb24iLCJzZWxlY3Rpb25FbmRQb3NpdGlvbiIsImdldEVuZFBvc2l0aW9uIiwib2Zmc2V0IiwiZW5kT2Zmc2V0Iiwic2hpZnRlZCIsImVuZFBvc2l0aW9uU2hpZnRlZCIsImluc2VydE9wZXJhdGlvbiIsInNoaWZ0ZWRPcGVyYXRpb24iLCJkZWxldGVPcGVyYXRpb24iLCJmcm9tTGVuZ3RoQW5kUG9zaXRpb24iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBRUEsSUFBTUEsUUFBUUMsUUFBUSxVQUFSLENBQWQ7QUFBQSxJQUNNQyxnQkFBZ0JELFFBQVEsa0JBQVIsQ0FEdEI7QUFBQSxJQUVNRSxrQkFBa0JGLFFBQVEscUJBQVIsQ0FGeEI7O0lBSVFHLFUsR0FBZUosSyxDQUFmSSxVOztJQUVGQyxlO0FBQ0osMkJBQVlDLElBQVosRUFBa0JDLE1BQWxCLEVBQTBCQyxRQUExQixFQUFvQztBQUFBOztBQUNuQyxTQUFLRixJQUFMLEdBQVlBLElBQVo7QUFDQyxTQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNEOzs7OzRCQUVPO0FBQ04sYUFBT0gsZ0JBQWdCSSxxQkFBaEIsQ0FBc0MsS0FBS0YsTUFBM0MsRUFBbUQsS0FBS0MsUUFBeEQsQ0FBUDtBQUNEOzs7NkJBRVE7QUFDUCxVQUFNRSxPQUFPO0FBQ04sZ0JBQVEsS0FBS0osSUFEUDtBQUVMLGtCQUFVLEtBQUtDLE1BRlY7QUFHTCxvQkFBWSxLQUFLQztBQUhaLE9BQWI7O0FBTUEsYUFBT0UsSUFBUDtBQUNEOzs7dUNBRWtCQyxTLEVBQVc7QUFDNUIsY0FBUUEsVUFBVUwsSUFBbEI7QUFDRSxhQUFLLFFBQUw7QUFDRSxpQkFBUSxVQUFTTSxHQUFULEVBQWNDLEdBQWQsRUFBbUI7O0FBRXpCLGdCQUFJRCxJQUFJSixRQUFKLEdBQWVLLElBQUlMLFFBQXZCLEVBQWlDO0FBQy9CLHFCQUFPLENBQUNJLElBQUlFLEtBQUosRUFBRCxDQUFQO0FBQ0Q7O0FBRUQsZ0JBQUlGLElBQUlKLFFBQUosS0FBaUJLLElBQUlMLFFBQXpCLEVBQW1DO0FBQ2pDLGtCQUFJSSxJQUFJTCxNQUFKLEtBQWVNLElBQUlOLE1BQXZCLEVBQStCO0FBQzdCLHVCQUFPLENBQUNLLElBQUlFLEtBQUosRUFBRCxDQUFQO0FBQ0Q7QUFDRCxrQkFBSUYsSUFBSUwsTUFBSixLQUFlTSxJQUFJTixNQUF2QixFQUErQjtBQUM3QixvQkFBSUwsY0FBY1csSUFBSU4sTUFBbEIsRUFBMEJLLElBQUlMLE1BQTlCLENBQUosRUFBMkM7QUFDekMseUJBQU8sQ0FBQ00sSUFBSUUsS0FBSixDQUFVSCxHQUFWLENBQUQsQ0FBUDtBQUNELGlCQUZELE1BRU87QUFDTCx5QkFBTyxDQUFDQSxJQUFJRSxLQUFKLEVBQUQsQ0FBUDtBQUNEO0FBQ0Y7QUFDRjs7QUFFRCxnQkFBSUYsSUFBSUosUUFBSixHQUFlSyxJQUFJTCxRQUF2QixFQUFpQztBQUMvQixxQkFBTyxDQUFDSyxJQUFJRSxLQUFKLENBQVVILEdBQVYsQ0FBRCxDQUFQO0FBQ0Q7QUFFRixXQXZCTSxDQXVCSkQsU0F2QkksRUF1Qk8sSUF2QlAsQ0FBUDs7QUF5QkYsYUFBSyxRQUFMO0FBQ0UsaUJBQVEsVUFBU0MsR0FBVCxFQUFjQyxHQUFkLEVBQW1COztBQUV6QixnQkFBSUQsSUFBSUosUUFBSixHQUFlSSxJQUFJSSxNQUFuQixJQUE2QkgsSUFBSUwsUUFBckMsRUFBK0M7QUFDN0MscUJBQU8sQ0FBQ0ksSUFBSUUsS0FBSixFQUFELENBQVA7QUFDRDs7QUFFRCxnQkFBSUYsSUFBSUosUUFBSixHQUFlSyxJQUFJTCxRQUF2QixFQUFpQztBQUMvQixxQkFBTyxDQUFDSyxJQUFJSSxJQUFKLENBQVNMLEdBQVQsQ0FBRCxFQUFnQkMsSUFBSUksSUFBSixDQUFTTCxHQUFULEVBQWNHLEtBQWQsQ0FBb0JGLElBQUlFLEtBQUosQ0FBVUYsSUFBSUssS0FBSixDQUFVTixHQUFWLENBQVYsQ0FBcEIsQ0FBaEIsQ0FBUDtBQUNEOztBQUVELGdCQUFJQSxJQUFJSixRQUFKLElBQWdCSyxJQUFJTCxRQUF4QixFQUFrQztBQUNoQyxxQkFBTyxDQUFDSyxJQUFJRSxLQUFKLENBQVVILEdBQVYsQ0FBRCxDQUFQO0FBQ0Q7QUFFRixXQWRNLENBY0pELFNBZEksRUFjTyxJQWRQLENBQVA7O0FBZ0JGLGFBQUssT0FBTDtBQUNFLGlCQUFRLFVBQVNDLEdBQVQsRUFBY0MsR0FBZCxFQUFtQjs7QUFFekIsbUJBQU8sQ0FBQ0QsSUFBSUUsS0FBSixFQUFELENBQVA7QUFFRCxXQUpNLENBSUpILFNBSkksRUFJTyxJQUpQLENBQVA7QUE3Q0o7QUFtREQ7OztxQ0FFZ0JRLE8sRUFBUztBQUN4QixhQUFPQSxRQUFRQyxTQUFSLENBQWtCLENBQWxCLEVBQXFCLEtBQUtaLFFBQTFCLElBQXNDLEtBQUtELE1BQTNDLEdBQW9EWSxRQUFRQyxTQUFSLENBQWtCLEtBQUtaLFFBQXZCLENBQTNEO0FBQ0Q7Ozt1Q0FFa0JhLFMsRUFBVztBQUM1QixVQUFJQyw2QkFBSjs7QUFFQSxVQUFNQyxnQkFBZ0IsS0FBS2YsUUFBM0I7QUFBQSxVQUFxQztBQUMvQlEsZUFBUyxLQUFLVCxNQUFMLENBQVlTLE1BRDNCO0FBQUEsVUFFTVEseUJBQXlCSCxVQUFVSSxnQkFBVixFQUYvQjtBQUFBLFVBR01DLHVCQUF1QkwsVUFBVU0sY0FBVixFQUg3QjtBQUFBLFVBSU1DLFNBQVNaLE1BSmY7QUFBQSxVQUl3QjtBQUNsQmEsa0JBQVlELE1BTGxCLENBSDRCLENBUUY7O0FBRTFCLFVBQUksS0FBSixFQUFXLENBRVYsQ0FGRCxNQUVPLElBQUlKLDBCQUEwQkQsYUFBOUIsRUFBNkM7QUFDbERELCtCQUF1QkQsVUFBVVMsT0FBVixDQUFrQkYsTUFBbEIsQ0FBdkI7QUFDRCxPQUZNLE1BRUEsSUFBSUYsdUJBQXVCSCxhQUEzQixFQUEwQztBQUMvQ0QsK0JBQXVCRCxVQUFVVSxrQkFBVixDQUE2QkYsU0FBN0IsQ0FBdkI7QUFDRCxPQUZNLE1BRUE7QUFDTFAsK0JBQXVCRCxVQUFVUCxLQUFWLEVBQXZCO0FBQ0Q7O0FBRUQsYUFBT1Esb0JBQVA7QUFDRDs7OzRCQUVPTSxNLEVBQVE7QUFDZCxVQUFNckIsU0FBUyxLQUFLQSxNQUFwQjtBQUFBLFVBQ01DLFdBQVcsS0FBS0EsUUFBTCxHQUFnQm9CLE1BRGpDO0FBQUEsVUFFTUksa0JBQWtCM0IsZ0JBQWdCSSxxQkFBaEIsQ0FBc0NGLE1BQXRDLEVBQThDQyxRQUE5QyxDQUZ4Qjs7QUFJQSxhQUFPd0IsZUFBUDtBQUNEOzs7MEJBRUtyQixTLEVBQVc7QUFDZixVQUFNSyxTQUFTLEtBQUtULE1BQUwsQ0FBWVMsTUFBM0I7QUFBQSxVQUNFWSxTQUFTWixNQURYO0FBQUEsVUFDb0I7QUFDZGlCLHlCQUFtQnRCLFVBQVVtQixPQUFWLENBQWtCRixNQUFsQixDQUZ6Qjs7QUFJQSxhQUFPSyxnQkFBUDtBQUNEOzs7eUJBRUlDLGUsRUFBaUI7QUFDcEIsVUFBTTFCLFdBQVcwQixnQkFBZ0IxQixRQUFqQztBQUFBLFVBQ01RLFNBQVMsS0FBS1IsUUFBTCxHQUFnQkEsUUFEL0I7O0FBR0EwQix3QkFBa0IvQixnQkFBZ0JnQyxxQkFBaEIsQ0FBc0NuQixNQUF0QyxFQUE4Q1IsUUFBOUMsQ0FBbEI7O0FBRUEsYUFBTzBCLGVBQVA7QUFDRDs7OzBCQUVLQSxlLEVBQWlCO0FBQ3JCLFVBQUlsQixTQUFTa0IsZ0JBQWdCbEIsTUFBN0I7QUFBQSxVQUNJUixXQUFXMEIsZ0JBQWdCMUIsUUFEL0I7O0FBR0FRLGVBQVNBLFNBQVMsS0FBS1IsUUFBZCxHQUF5QkEsUUFBbEM7QUFDQUEsaUJBQVcsS0FBS0EsUUFBaEI7O0FBRUEwQix3QkFBa0IvQixnQkFBZ0JnQyxxQkFBaEIsQ0FBc0NuQixNQUF0QyxFQUE4Q1IsUUFBOUMsQ0FBbEI7O0FBRUEsYUFBTzBCLGVBQVA7QUFDRDs7OzBDQUU0QjNCLE0sRUFBUUMsUSxFQUFVO0FBQzdDLFVBQU1GLE9BQU9GLFVBQWI7QUFBQSxVQUEwQjtBQUNwQjRCLHdCQUFrQixJQUFJM0IsZUFBSixDQUFvQkMsSUFBcEIsRUFBMEJDLE1BQTFCLEVBQWtDQyxRQUFsQyxDQUR4Qjs7QUFHQSxhQUFPd0IsZUFBUDtBQUNEOzs7NkJBRWV0QixJLEVBQU07QUFDcEIsVUFBTUosT0FBT0ksS0FBSyxNQUFMLENBQWI7QUFBQSxVQUNNSCxTQUFTRyxLQUFLLFFBQUwsQ0FEZjtBQUFBLFVBRU1GLFdBQVdFLEtBQUssVUFBTCxDQUZqQjtBQUFBLFVBR01zQixrQkFBa0IsSUFBSTNCLGVBQUosQ0FBb0JDLElBQXBCLEVBQTBCQyxNQUExQixFQUFrQ0MsUUFBbEMsQ0FIeEI7O0FBS0EsYUFBT3dCLGVBQVA7QUFDRDs7Ozs7O0FBR0hJLE9BQU9DLE9BQVAsR0FBaUJoQyxlQUFqQiIsImZpbGUiOiJpbnNlcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCB0eXBlcyA9IHJlcXVpcmUoJy4uL3R5cGVzJyksXHJcbiAgICAgIHN0cmluZ0NvbXBhcmUgPSByZXF1aXJlKCcuLi9zdHJpbmdDb21wYXJlJyksXHJcbiAgICAgIERlbGV0ZU9wZXJhdGlvbiA9IHJlcXVpcmUoJy4uL29wZXJhdGlvbi9kZWxldGUnKTtcclxuXHJcbmNvbnN0IHsgaW5zZXJ0VHlwZSB9ID0gdHlwZXM7XHJcblxyXG5jbGFzcyBJbnNlcnRPcGVyYXRpb24ge1xyXG4gIGNvbnN0cnVjdG9yKHR5cGUsIHN0cmluZywgcG9zaXRpb24pIHtcclxuXHQgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICB0aGlzLnN0cmluZyA9IHN0cmluZztcclxuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICB9XHJcblxyXG4gIGNsb25lKCkge1xyXG4gICAgcmV0dXJuIEluc2VydE9wZXJhdGlvbi5mcm9tU3RyaW5nQW5kUG9zaXRpb24odGhpcy5zdHJpbmcsIHRoaXMucG9zaXRpb24pO1xyXG4gIH1cclxuXHJcbiAgdG9KU09OKCkge1xyXG4gICAgY29uc3QganNvbiA9IHtcclxuXHQgICAgICAgICAgXCJ0eXBlXCI6IHRoaXMudHlwZSxcclxuICAgICAgICAgICAgXCJzdHJpbmdcIjogdGhpcy5zdHJpbmcsXHJcbiAgICAgICAgICAgIFwicG9zaXRpb25cIjogdGhpcy5wb3NpdGlvblxyXG4gICAgICAgICAgfTtcclxuICAgIFxyXG4gICAgcmV0dXJuIGpzb247XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1PcGVyYXRpb24ob3BlcmF0aW9uKSB7XHJcbiAgICBzd2l0Y2ggKG9wZXJhdGlvbi50eXBlKSB7XHJcbiAgICAgIGNhc2UgJ2luc2VydCc6XHJcbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbih0YXUsIHJobykge1xyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPCByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIFt0YXUuY2xvbmUoKV07XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA9PT0gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICh0YXUuc3RyaW5nID09PSByaG8uc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFt0YXUuY2xvbmUoKV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRhdS5zdHJpbmcgIT09IHJoby5zdHJpbmcpIHtcclxuICAgICAgICAgICAgICBpZiAoc3RyaW5nQ29tcGFyZShyaG8uc3RyaW5nLCB0YXUuc3RyaW5nKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtyaG8uc2hpZnQodGF1KV07XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbdGF1LmNsb25lKCldO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPiByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtyaG8uc2hpZnQodGF1KV07XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pKG9wZXJhdGlvbiwgdGhpcyk7XHJcblxyXG4gICAgICBjYXNlICdkZWxldGUnOlxyXG4gICAgICAgIHJldHVybiAoZnVuY3Rpb24odGF1LCByaG8pIHtcclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uICsgdGF1Lmxlbmd0aCA8PSByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIFt0YXUuY2xvbmUoKV07XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA8IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gW3Joby5sZWZ0KHRhdSksIHJoby5sZWZ0KHRhdSkuc2hpZnQocmhvLnNoaWZ0KHJoby5yaWdodCh0YXUpKSldO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPj0gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbcmhvLnNoaWZ0KHRhdSldO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KShvcGVyYXRpb24sIHRoaXMpO1xyXG5cclxuICAgICAgY2FzZSAnZW1wdHknOlxyXG4gICAgICAgIHJldHVybiAoZnVuY3Rpb24odGF1LCByaG8pIHtcclxuXHJcbiAgICAgICAgICByZXR1cm4gW3RhdS5jbG9uZSgpXTtcclxuXHJcbiAgICAgICAgfSkob3BlcmF0aW9uLCB0aGlzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybUNvbnRlbnQoY29udGVudCkge1xyXG4gICAgcmV0dXJuIGNvbnRlbnQuc3Vic3RyaW5nKDAsIHRoaXMucG9zaXRpb24pICsgdGhpcy5zdHJpbmcgKyBjb250ZW50LnN1YnN0cmluZyh0aGlzLnBvc2l0aW9uKTtcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybVNlbGVjdGlvbihzZWxlY3Rpb24pIHtcclxuICAgIGxldCB0cmFuc2Zvcm1lZFNlbGVjdGlvbjtcclxuXHJcbiAgICBjb25zdCBzdGFydFBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbiwgLy8vXHJcbiAgICAgICAgICBsZW5ndGggPSB0aGlzLnN0cmluZy5sZW5ndGgsXHJcbiAgICAgICAgICBzZWxlY3Rpb25TdGFydFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldFN0YXJ0UG9zaXRpb24oKSxcclxuICAgICAgICAgIHNlbGVjdGlvbkVuZFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldEVuZFBvc2l0aW9uKCksXHJcbiAgICAgICAgICBvZmZzZXQgPSBsZW5ndGgsICAvLy9cclxuICAgICAgICAgIGVuZE9mZnNldCA9IG9mZnNldDsgLy8vXHJcblxyXG4gICAgaWYgKGZhbHNlKSB7XHJcblxyXG4gICAgfSBlbHNlIGlmIChzZWxlY3Rpb25TdGFydFBvc2l0aW9uID49IHN0YXJ0UG9zaXRpb24pIHtcclxuICAgICAgdHJhbnNmb3JtZWRTZWxlY3Rpb24gPSBzZWxlY3Rpb24uc2hpZnRlZChvZmZzZXQpO1xyXG4gICAgfSBlbHNlIGlmIChzZWxlY3Rpb25FbmRQb3NpdGlvbiA+IHN0YXJ0UG9zaXRpb24pIHtcclxuICAgICAgdHJhbnNmb3JtZWRTZWxlY3Rpb24gPSBzZWxlY3Rpb24uZW5kUG9zaXRpb25TaGlmdGVkKGVuZE9mZnNldCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0cmFuc2Zvcm1lZFNlbGVjdGlvbiA9IHNlbGVjdGlvbi5jbG9uZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cmFuc2Zvcm1lZFNlbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIHNoaWZ0ZWQob2Zmc2V0KSB7XHJcbiAgICBjb25zdCBzdHJpbmcgPSB0aGlzLnN0cmluZyxcclxuICAgICAgICAgIHBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbiArIG9mZnNldCxcclxuICAgICAgICAgIGluc2VydE9wZXJhdGlvbiA9IEluc2VydE9wZXJhdGlvbi5mcm9tU3RyaW5nQW5kUG9zaXRpb24oc3RyaW5nLCBwb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIGluc2VydE9wZXJhdGlvbjtcclxuICB9XHJcblxyXG4gIHNoaWZ0KG9wZXJhdGlvbikge1xyXG4gICAgY29uc3QgbGVuZ3RoID0gdGhpcy5zdHJpbmcubGVuZ3RoLFxyXG5cdFx0XHRcdCAgb2Zmc2V0ID0gbGVuZ3RoLCAgLy8vXHJcbiAgICAgICAgICBzaGlmdGVkT3BlcmF0aW9uID0gb3BlcmF0aW9uLnNoaWZ0ZWQob2Zmc2V0KTtcclxuXHJcbiAgICByZXR1cm4gc2hpZnRlZE9wZXJhdGlvbjtcclxuICB9XHJcblxyXG4gIGxlZnQoZGVsZXRlT3BlcmF0aW9uKSB7XHJcbiAgICBjb25zdCBwb3NpdGlvbiA9IGRlbGV0ZU9wZXJhdGlvbi5wb3NpdGlvbixcclxuICAgICAgICAgIGxlbmd0aCA9IHRoaXMucG9zaXRpb24gLSBwb3NpdGlvbjtcclxuXHJcbiAgICBkZWxldGVPcGVyYXRpb24gPSBEZWxldGVPcGVyYXRpb24uZnJvbUxlbmd0aEFuZFBvc2l0aW9uKGxlbmd0aCwgcG9zaXRpb24pO1xyXG5cclxuICAgIHJldHVybiBkZWxldGVPcGVyYXRpb247XHJcbiAgfVxyXG5cclxuICByaWdodChkZWxldGVPcGVyYXRpb24pIHtcclxuICAgIGxldCBsZW5ndGggPSBkZWxldGVPcGVyYXRpb24ubGVuZ3RoLFxyXG4gICAgICAgIHBvc2l0aW9uID0gZGVsZXRlT3BlcmF0aW9uLnBvc2l0aW9uO1xyXG5cclxuICAgIGxlbmd0aCA9IGxlbmd0aCAtIHRoaXMucG9zaXRpb24gKyBwb3NpdGlvbjtcclxuICAgIHBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbjtcclxuXHJcbiAgICBkZWxldGVPcGVyYXRpb24gPSBEZWxldGVPcGVyYXRpb24uZnJvbUxlbmd0aEFuZFBvc2l0aW9uKGxlbmd0aCwgcG9zaXRpb24pO1xyXG5cclxuICAgIHJldHVybiBkZWxldGVPcGVyYXRpb247XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbVN0cmluZ0FuZFBvc2l0aW9uKHN0cmluZywgcG9zaXRpb24pIHtcclxuICAgIGNvbnN0IHR5cGUgPSBpbnNlcnRUeXBlLCAgLy8vXHJcbiAgICAgICAgICBpbnNlcnRPcGVyYXRpb24gPSBuZXcgSW5zZXJ0T3BlcmF0aW9uKHR5cGUsIHN0cmluZywgcG9zaXRpb24pO1xyXG5cclxuICAgIHJldHVybiBpbnNlcnRPcGVyYXRpb247XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xyXG4gICAgY29uc3QgdHlwZSA9IGpzb25bXCJ0eXBlXCJdLFxyXG4gICAgICAgICAgc3RyaW5nID0ganNvbltcInN0cmluZ1wiXSxcclxuICAgICAgICAgIHBvc2l0aW9uID0ganNvbltcInBvc2l0aW9uXCJdLFxyXG4gICAgICAgICAgaW5zZXJ0T3BlcmF0aW9uID0gbmV3IEluc2VydE9wZXJhdGlvbih0eXBlLCBzdHJpbmcsIHBvc2l0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gaW5zZXJ0T3BlcmF0aW9uO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBJbnNlcnRPcGVyYXRpb247XHJcbiJdfQ==