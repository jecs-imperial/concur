'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var sufficient = require('sufficient');

var post = require('../../post'),
    UpdateRequest = require('../../request/update'),
    UpdateResponse = require('../../response/update'),
    generateOperations = require('../../../operations/generate');

var postUpdate = post.postUpdate,
    AsynchronousTask = sufficient.AsynchronousTask;

var UpdateAsynchronousTask = function (_AsynchronousTask) {
      _inherits(UpdateAsynchronousTask, _AsynchronousTask);

      function UpdateAsynchronousTask(userIdentifier, workingContent, editableContent, callback) {
            _classCallCheck(this, UpdateAsynchronousTask);

            return _possibleConstructorReturn(this, (UpdateAsynchronousTask.__proto__ || Object.getPrototypeOf(UpdateAsynchronousTask)).call(this, asynchronousMethod, userIdentifier, workingContent, editableContent, callback));
      }

      return UpdateAsynchronousTask;
}(AsynchronousTask);

module.exports = UpdateAsynchronousTask;

function asynchronousMethod(userIdentifier, workingContent, editableContent, callback) {
      var operations = generateOperations(workingContent, editableContent),
          updateRequest = UpdateRequest.fromOperationsAndUserIdentifier(operations, userIdentifier),
          json = updateRequest.toJSON();

      postUpdate(json, function (json) {
            var updateResponse = UpdateResponse.fromJSON(json),
                pendingOperations = updateResponse.getPendingOperations();

            callback(pendingOperations);
      });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2VzNi9leGFtcGxlL3Rhc2svYXN5bmNocm9ub3VzL3VwZGF0ZS5qcyJdLCJuYW1lcyI6WyJzdWZmaWNpZW50IiwicmVxdWlyZSIsInBvc3QiLCJVcGRhdGVSZXF1ZXN0IiwiVXBkYXRlUmVzcG9uc2UiLCJnZW5lcmF0ZU9wZXJhdGlvbnMiLCJwb3N0VXBkYXRlIiwiQXN5bmNocm9ub3VzVGFzayIsIlVwZGF0ZUFzeW5jaHJvbm91c1Rhc2siLCJ1c2VySWRlbnRpZmllciIsIndvcmtpbmdDb250ZW50IiwiZWRpdGFibGVDb250ZW50IiwiY2FsbGJhY2siLCJhc3luY2hyb25vdXNNZXRob2QiLCJtb2R1bGUiLCJleHBvcnRzIiwib3BlcmF0aW9ucyIsInVwZGF0ZVJlcXVlc3QiLCJmcm9tT3BlcmF0aW9uc0FuZFVzZXJJZGVudGlmaWVyIiwianNvbiIsInRvSlNPTiIsInVwZGF0ZVJlc3BvbnNlIiwiZnJvbUpTT04iLCJwZW5kaW5nT3BlcmF0aW9ucyIsImdldFBlbmRpbmdPcGVyYXRpb25zIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFFQSxJQUFNQSxhQUFhQyxRQUFRLFlBQVIsQ0FBbkI7O0FBRUEsSUFBTUMsT0FBT0QsUUFBUSxZQUFSLENBQWI7QUFBQSxJQUNNRSxnQkFBZ0JGLFFBQVEsc0JBQVIsQ0FEdEI7QUFBQSxJQUVNRyxpQkFBaUJILFFBQVEsdUJBQVIsQ0FGdkI7QUFBQSxJQUdNSSxxQkFBcUJKLFFBQVEsOEJBQVIsQ0FIM0I7O0FBS00sSUFBRUssVUFBRixHQUFpQkosSUFBakIsQ0FBRUksVUFBRjtBQUFBLElBQ0VDLGdCQURGLEdBQ3VCUCxVQUR2QixDQUNFTyxnQkFERjs7SUFHQUMsc0I7OztBQUNKLHNDQUFZQyxjQUFaLEVBQTRCQyxjQUE1QixFQUE0Q0MsZUFBNUMsRUFBNkRDLFFBQTdELEVBQXVFO0FBQUE7O0FBQUEsbUpBQy9EQyxrQkFEK0QsRUFDM0NKLGNBRDJDLEVBQzNCQyxjQUQyQixFQUNYQyxlQURXLEVBQ01DLFFBRE47QUFFdEU7OztFQUhrQ0wsZ0I7O0FBTXJDTyxPQUFPQyxPQUFQLEdBQWlCUCxzQkFBakI7O0FBRUEsU0FBU0ssa0JBQVQsQ0FBNEJKLGNBQTVCLEVBQTRDQyxjQUE1QyxFQUE0REMsZUFBNUQsRUFBNkVDLFFBQTdFLEVBQXVGO0FBQ3JGLFVBQU1JLGFBQWFYLG1CQUFtQkssY0FBbkIsRUFBbUNDLGVBQW5DLENBQW5CO0FBQUEsVUFDTU0sZ0JBQWdCZCxjQUFjZSwrQkFBZCxDQUE4Q0YsVUFBOUMsRUFBMERQLGNBQTFELENBRHRCO0FBQUEsVUFFTVUsT0FBT0YsY0FBY0csTUFBZCxFQUZiOztBQUlBZCxpQkFBV2EsSUFBWCxFQUFpQixVQUFTQSxJQUFULEVBQWU7QUFDOUIsZ0JBQU1FLGlCQUFpQmpCLGVBQWVrQixRQUFmLENBQXdCSCxJQUF4QixDQUF2QjtBQUFBLGdCQUNNSSxvQkFBb0JGLGVBQWVHLG9CQUFmLEVBRDFCOztBQUdBWixxQkFBU1csaUJBQVQ7QUFDRCxPQUxEO0FBTUQiLCJmaWxlIjoidXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBzdWZmaWNpZW50ID0gcmVxdWlyZSgnc3VmZmljaWVudCcpO1xuXG5jb25zdCBwb3N0ID0gcmVxdWlyZSgnLi4vLi4vcG9zdCcpLFxuICAgICAgVXBkYXRlUmVxdWVzdCA9IHJlcXVpcmUoJy4uLy4uL3JlcXVlc3QvdXBkYXRlJyksXG4gICAgICBVcGRhdGVSZXNwb25zZSA9IHJlcXVpcmUoJy4uLy4uL3Jlc3BvbnNlL3VwZGF0ZScpLFxuICAgICAgZ2VuZXJhdGVPcGVyYXRpb25zID0gcmVxdWlyZSgnLi4vLi4vLi4vb3BlcmF0aW9ucy9nZW5lcmF0ZScpO1xuXG5jb25zdCB7IHBvc3RVcGRhdGUgfSA9IHBvc3QsXG4gICAgICB7IEFzeW5jaHJvbm91c1Rhc2sgfSA9IHN1ZmZpY2llbnQ7XG5cbmNsYXNzIFVwZGF0ZUFzeW5jaHJvbm91c1Rhc2sgZXh0ZW5kcyBBc3luY2hyb25vdXNUYXNrIHtcbiAgY29uc3RydWN0b3IodXNlcklkZW50aWZpZXIsIHdvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnQsIGNhbGxiYWNrKSB7XG4gICAgc3VwZXIoYXN5bmNocm9ub3VzTWV0aG9kLCB1c2VySWRlbnRpZmllciwgd29ya2luZ0NvbnRlbnQsIGVkaXRhYmxlQ29udGVudCwgY2FsbGJhY2spXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBVcGRhdGVBc3luY2hyb25vdXNUYXNrO1xuXG5mdW5jdGlvbiBhc3luY2hyb25vdXNNZXRob2QodXNlcklkZW50aWZpZXIsIHdvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnQsIGNhbGxiYWNrKSB7XG4gIGNvbnN0IG9wZXJhdGlvbnMgPSBnZW5lcmF0ZU9wZXJhdGlvbnMod29ya2luZ0NvbnRlbnQsIGVkaXRhYmxlQ29udGVudCksXG4gICAgICAgIHVwZGF0ZVJlcXVlc3QgPSBVcGRhdGVSZXF1ZXN0LmZyb21PcGVyYXRpb25zQW5kVXNlcklkZW50aWZpZXIob3BlcmF0aW9ucywgdXNlcklkZW50aWZpZXIpLFxuICAgICAgICBqc29uID0gdXBkYXRlUmVxdWVzdC50b0pTT04oKTtcblxuICBwb3N0VXBkYXRlKGpzb24sIGZ1bmN0aW9uKGpzb24pIHtcbiAgICBjb25zdCB1cGRhdGVSZXNwb25zZSA9IFVwZGF0ZVJlc3BvbnNlLmZyb21KU09OKGpzb24pLFxuICAgICAgICAgIHBlbmRpbmdPcGVyYXRpb25zID0gdXBkYXRlUmVzcG9uc2UuZ2V0UGVuZGluZ09wZXJhdGlvbnMoKTtcblxuICAgIGNhbGxiYWNrKHBlbmRpbmdPcGVyYXRpb25zKTtcbiAgfSk7XG59XG4iXX0=