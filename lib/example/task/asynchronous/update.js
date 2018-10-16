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

      function UpdateAsynchronousTask(userIdentifier, sessionIdentifier, workingContent, editableContent, callback) {
            _classCallCheck(this, UpdateAsynchronousTask);

            return _possibleConstructorReturn(this, (UpdateAsynchronousTask.__proto__ || Object.getPrototypeOf(UpdateAsynchronousTask)).call(this, asynchronousMethod, userIdentifier, sessionIdentifier, workingContent, editableContent, callback));
      }

      return UpdateAsynchronousTask;
}(AsynchronousTask);

module.exports = UpdateAsynchronousTask;

function asynchronousMethod(userIdentifier, sessionIdentifier, workingContent, editableContent, callback) {
      var operations = generateOperations(workingContent, editableContent),
          updateRequest = UpdateRequest.fromOperationsUserIdentifierAndSessionIdentifier(operations, userIdentifier, sessionIdentifier),
          json = updateRequest.toJSON();

      postUpdate(json, function (json) {
            var updateResponse = UpdateResponse.fromJSON(json),
                pendingOperations = updateResponse.getPendingOperations();

            callback(pendingOperations);
      });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2VzNi9leGFtcGxlL3Rhc2svYXN5bmNocm9ub3VzL3VwZGF0ZS5qcyJdLCJuYW1lcyI6WyJzdWZmaWNpZW50IiwicmVxdWlyZSIsInBvc3QiLCJVcGRhdGVSZXF1ZXN0IiwiVXBkYXRlUmVzcG9uc2UiLCJnZW5lcmF0ZU9wZXJhdGlvbnMiLCJwb3N0VXBkYXRlIiwiQXN5bmNocm9ub3VzVGFzayIsIlVwZGF0ZUFzeW5jaHJvbm91c1Rhc2siLCJ1c2VySWRlbnRpZmllciIsInNlc3Npb25JZGVudGlmaWVyIiwid29ya2luZ0NvbnRlbnQiLCJlZGl0YWJsZUNvbnRlbnQiLCJjYWxsYmFjayIsImFzeW5jaHJvbm91c01ldGhvZCIsIm1vZHVsZSIsImV4cG9ydHMiLCJvcGVyYXRpb25zIiwidXBkYXRlUmVxdWVzdCIsImZyb21PcGVyYXRpb25zVXNlcklkZW50aWZpZXJBbmRTZXNzaW9uSWRlbnRpZmllciIsImpzb24iLCJ0b0pTT04iLCJ1cGRhdGVSZXNwb25zZSIsImZyb21KU09OIiwicGVuZGluZ09wZXJhdGlvbnMiLCJnZXRQZW5kaW5nT3BlcmF0aW9ucyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBRUEsSUFBTUEsYUFBYUMsUUFBUSxZQUFSLENBQW5COztBQUVBLElBQU1DLE9BQU9ELFFBQVEsWUFBUixDQUFiO0FBQUEsSUFDTUUsZ0JBQWdCRixRQUFRLHNCQUFSLENBRHRCO0FBQUEsSUFFTUcsaUJBQWlCSCxRQUFRLHVCQUFSLENBRnZCO0FBQUEsSUFHTUkscUJBQXFCSixRQUFRLDhCQUFSLENBSDNCOztBQUtNLElBQUVLLFVBQUYsR0FBaUJKLElBQWpCLENBQUVJLFVBQUY7QUFBQSxJQUNFQyxnQkFERixHQUN1QlAsVUFEdkIsQ0FDRU8sZ0JBREY7O0lBR0FDLHNCOzs7QUFDSixzQ0FBWUMsY0FBWixFQUE0QkMsaUJBQTVCLEVBQStDQyxjQUEvQyxFQUErREMsZUFBL0QsRUFBZ0ZDLFFBQWhGLEVBQTBGO0FBQUE7O0FBQUEsbUpBQ2xGQyxrQkFEa0YsRUFDOURMLGNBRDhELEVBQzlDQyxpQkFEOEMsRUFDM0JDLGNBRDJCLEVBQ1hDLGVBRFcsRUFDTUMsUUFETjtBQUV6Rjs7O0VBSGtDTixnQjs7QUFNckNRLE9BQU9DLE9BQVAsR0FBaUJSLHNCQUFqQjs7QUFFQSxTQUFTTSxrQkFBVCxDQUE0QkwsY0FBNUIsRUFBNENDLGlCQUE1QyxFQUErREMsY0FBL0QsRUFBK0VDLGVBQS9FLEVBQWdHQyxRQUFoRyxFQUEwRztBQUN4RyxVQUFNSSxhQUFhWixtQkFBbUJNLGNBQW5CLEVBQW1DQyxlQUFuQyxDQUFuQjtBQUFBLFVBQ01NLGdCQUFnQmYsY0FBY2dCLGdEQUFkLENBQStERixVQUEvRCxFQUEyRVIsY0FBM0UsRUFBMkZDLGlCQUEzRixDQUR0QjtBQUFBLFVBRU1VLE9BQU9GLGNBQWNHLE1BQWQsRUFGYjs7QUFJQWYsaUJBQVdjLElBQVgsRUFBaUIsVUFBU0EsSUFBVCxFQUFlO0FBQzlCLGdCQUFNRSxpQkFBaUJsQixlQUFlbUIsUUFBZixDQUF3QkgsSUFBeEIsQ0FBdkI7QUFBQSxnQkFDTUksb0JBQW9CRixlQUFlRyxvQkFBZixFQUQxQjs7QUFHQVoscUJBQVNXLGlCQUFUO0FBQ0QsT0FMRDtBQU1EIiwiZmlsZSI6InVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3Qgc3VmZmljaWVudCA9IHJlcXVpcmUoJ3N1ZmZpY2llbnQnKTtcblxuY29uc3QgcG9zdCA9IHJlcXVpcmUoJy4uLy4uL3Bvc3QnKSxcbiAgICAgIFVwZGF0ZVJlcXVlc3QgPSByZXF1aXJlKCcuLi8uLi9yZXF1ZXN0L3VwZGF0ZScpLFxuICAgICAgVXBkYXRlUmVzcG9uc2UgPSByZXF1aXJlKCcuLi8uLi9yZXNwb25zZS91cGRhdGUnKSxcbiAgICAgIGdlbmVyYXRlT3BlcmF0aW9ucyA9IHJlcXVpcmUoJy4uLy4uLy4uL29wZXJhdGlvbnMvZ2VuZXJhdGUnKTtcblxuY29uc3QgeyBwb3N0VXBkYXRlIH0gPSBwb3N0LFxuICAgICAgeyBBc3luY2hyb25vdXNUYXNrIH0gPSBzdWZmaWNpZW50O1xuXG5jbGFzcyBVcGRhdGVBc3luY2hyb25vdXNUYXNrIGV4dGVuZHMgQXN5bmNocm9ub3VzVGFzayB7XG4gIGNvbnN0cnVjdG9yKHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllciwgd29ya2luZ0NvbnRlbnQsIGVkaXRhYmxlQ29udGVudCwgY2FsbGJhY2spIHtcbiAgICBzdXBlcihhc3luY2hyb25vdXNNZXRob2QsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllciwgd29ya2luZ0NvbnRlbnQsIGVkaXRhYmxlQ29udGVudCwgY2FsbGJhY2spXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBVcGRhdGVBc3luY2hyb25vdXNUYXNrO1xuXG5mdW5jdGlvbiBhc3luY2hyb25vdXNNZXRob2QodXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyLCB3b3JraW5nQ29udGVudCwgZWRpdGFibGVDb250ZW50LCBjYWxsYmFjaykge1xuICBjb25zdCBvcGVyYXRpb25zID0gZ2VuZXJhdGVPcGVyYXRpb25zKHdvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnQpLFxuICAgICAgICB1cGRhdGVSZXF1ZXN0ID0gVXBkYXRlUmVxdWVzdC5mcm9tT3BlcmF0aW9uc1VzZXJJZGVudGlmaWVyQW5kU2Vzc2lvbklkZW50aWZpZXIob3BlcmF0aW9ucywgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyKSxcbiAgICAgICAganNvbiA9IHVwZGF0ZVJlcXVlc3QudG9KU09OKCk7XG5cbiAgcG9zdFVwZGF0ZShqc29uLCBmdW5jdGlvbihqc29uKSB7XG4gICAgY29uc3QgdXBkYXRlUmVzcG9uc2UgPSBVcGRhdGVSZXNwb25zZS5mcm9tSlNPTihqc29uKSxcbiAgICAgICAgICBwZW5kaW5nT3BlcmF0aW9ucyA9IHVwZGF0ZVJlc3BvbnNlLmdldFBlbmRpbmdPcGVyYXRpb25zKCk7XG5cbiAgICBjYWxsYmFjayhwZW5kaW5nT3BlcmF0aW9ucyk7XG4gIH0pO1xufVxuIl19