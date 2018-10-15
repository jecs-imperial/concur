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

      function UpdateAsynchronousTask(userIdentifier, content, previousContent, callback) {
            _classCallCheck(this, UpdateAsynchronousTask);

            return _possibleConstructorReturn(this, (UpdateAsynchronousTask.__proto__ || Object.getPrototypeOf(UpdateAsynchronousTask)).call(this, asynchronousMethod, userIdentifier, content, previousContent, callback));
      }

      return UpdateAsynchronousTask;
}(AsynchronousTask);

module.exports = UpdateAsynchronousTask;

function asynchronousMethod(userIdentifier, content, previousContent, callback) {
      var operations = generateOperations(content, previousContent),
          updateRequest = UpdateRequest.fromOperationsAndUserIdentifier(operations, userIdentifier),
          json = updateRequest.toJSON();

      postUpdate(json, function (json) {
            var updateResponse = UpdateResponse.fromJSON(json),
                pendingOperations = updateResponse.getPendingOperations();

            callback(pendingOperations);
      });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2VzNi9leGFtcGxlL3Rhc2svYXN5bmNocm9ub3VzL3VwZGF0ZS5qcyJdLCJuYW1lcyI6WyJzdWZmaWNpZW50IiwicmVxdWlyZSIsInBvc3QiLCJVcGRhdGVSZXF1ZXN0IiwiVXBkYXRlUmVzcG9uc2UiLCJnZW5lcmF0ZU9wZXJhdGlvbnMiLCJwb3N0VXBkYXRlIiwiQXN5bmNocm9ub3VzVGFzayIsIlVwZGF0ZUFzeW5jaHJvbm91c1Rhc2siLCJ1c2VySWRlbnRpZmllciIsImNvbnRlbnQiLCJwcmV2aW91c0NvbnRlbnQiLCJjYWxsYmFjayIsImFzeW5jaHJvbm91c01ldGhvZCIsIm1vZHVsZSIsImV4cG9ydHMiLCJvcGVyYXRpb25zIiwidXBkYXRlUmVxdWVzdCIsImZyb21PcGVyYXRpb25zQW5kVXNlcklkZW50aWZpZXIiLCJqc29uIiwidG9KU09OIiwidXBkYXRlUmVzcG9uc2UiLCJmcm9tSlNPTiIsInBlbmRpbmdPcGVyYXRpb25zIiwiZ2V0UGVuZGluZ09wZXJhdGlvbnMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQUVBLElBQU1BLGFBQWFDLFFBQVEsWUFBUixDQUFuQjs7QUFFQSxJQUFNQyxPQUFPRCxRQUFRLFlBQVIsQ0FBYjtBQUFBLElBQ01FLGdCQUFnQkYsUUFBUSxzQkFBUixDQUR0QjtBQUFBLElBRU1HLGlCQUFpQkgsUUFBUSx1QkFBUixDQUZ2QjtBQUFBLElBR01JLHFCQUFxQkosUUFBUSw4QkFBUixDQUgzQjs7QUFLTSxJQUFFSyxVQUFGLEdBQWlCSixJQUFqQixDQUFFSSxVQUFGO0FBQUEsSUFDRUMsZ0JBREYsR0FDdUJQLFVBRHZCLENBQ0VPLGdCQURGOztJQUdBQyxzQjs7O0FBQ0osc0NBQVlDLGNBQVosRUFBNEJDLE9BQTVCLEVBQXFDQyxlQUFyQyxFQUFzREMsUUFBdEQsRUFBZ0U7QUFBQTs7QUFBQSxtSkFDeERDLGtCQUR3RCxFQUNwQ0osY0FEb0MsRUFDcEJDLE9BRG9CLEVBQ1hDLGVBRFcsRUFDTUMsUUFETjtBQUUvRDs7O0VBSGtDTCxnQjs7QUFNckNPLE9BQU9DLE9BQVAsR0FBaUJQLHNCQUFqQjs7QUFFQSxTQUFTSyxrQkFBVCxDQUE0QkosY0FBNUIsRUFBNENDLE9BQTVDLEVBQXFEQyxlQUFyRCxFQUFzRUMsUUFBdEUsRUFBZ0Y7QUFDOUUsVUFBTUksYUFBYVgsbUJBQW1CSyxPQUFuQixFQUE0QkMsZUFBNUIsQ0FBbkI7QUFBQSxVQUNNTSxnQkFBZ0JkLGNBQWNlLCtCQUFkLENBQThDRixVQUE5QyxFQUEwRFAsY0FBMUQsQ0FEdEI7QUFBQSxVQUVNVSxPQUFPRixjQUFjRyxNQUFkLEVBRmI7O0FBSUFkLGlCQUFXYSxJQUFYLEVBQWlCLFVBQVNBLElBQVQsRUFBZTtBQUM5QixnQkFBTUUsaUJBQWlCakIsZUFBZWtCLFFBQWYsQ0FBd0JILElBQXhCLENBQXZCO0FBQUEsZ0JBQ01JLG9CQUFvQkYsZUFBZUcsb0JBQWYsRUFEMUI7O0FBR0FaLHFCQUFTVyxpQkFBVDtBQUNELE9BTEQ7QUFNRCIsImZpbGUiOiJ1cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHN1ZmZpY2llbnQgPSByZXF1aXJlKCdzdWZmaWNpZW50Jyk7XG5cbmNvbnN0IHBvc3QgPSByZXF1aXJlKCcuLi8uLi9wb3N0JyksXG4gICAgICBVcGRhdGVSZXF1ZXN0ID0gcmVxdWlyZSgnLi4vLi4vcmVxdWVzdC91cGRhdGUnKSxcbiAgICAgIFVwZGF0ZVJlc3BvbnNlID0gcmVxdWlyZSgnLi4vLi4vcmVzcG9uc2UvdXBkYXRlJyksXG4gICAgICBnZW5lcmF0ZU9wZXJhdGlvbnMgPSByZXF1aXJlKCcuLi8uLi8uLi9vcGVyYXRpb25zL2dlbmVyYXRlJyk7XG5cbmNvbnN0IHsgcG9zdFVwZGF0ZSB9ID0gcG9zdCxcbiAgICAgIHsgQXN5bmNocm9ub3VzVGFzayB9ID0gc3VmZmljaWVudDtcblxuY2xhc3MgVXBkYXRlQXN5bmNocm9ub3VzVGFzayBleHRlbmRzIEFzeW5jaHJvbm91c1Rhc2sge1xuICBjb25zdHJ1Y3Rvcih1c2VySWRlbnRpZmllciwgY29udGVudCwgcHJldmlvdXNDb250ZW50LCBjYWxsYmFjaykge1xuICAgIHN1cGVyKGFzeW5jaHJvbm91c01ldGhvZCwgdXNlcklkZW50aWZpZXIsIGNvbnRlbnQsIHByZXZpb3VzQ29udGVudCwgY2FsbGJhY2spXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBVcGRhdGVBc3luY2hyb25vdXNUYXNrO1xuXG5mdW5jdGlvbiBhc3luY2hyb25vdXNNZXRob2QodXNlcklkZW50aWZpZXIsIGNvbnRlbnQsIHByZXZpb3VzQ29udGVudCwgY2FsbGJhY2spIHtcbiAgY29uc3Qgb3BlcmF0aW9ucyA9IGdlbmVyYXRlT3BlcmF0aW9ucyhjb250ZW50LCBwcmV2aW91c0NvbnRlbnQpLFxuICAgICAgICB1cGRhdGVSZXF1ZXN0ID0gVXBkYXRlUmVxdWVzdC5mcm9tT3BlcmF0aW9uc0FuZFVzZXJJZGVudGlmaWVyKG9wZXJhdGlvbnMsIHVzZXJJZGVudGlmaWVyKSxcbiAgICAgICAganNvbiA9IHVwZGF0ZVJlcXVlc3QudG9KU09OKCk7XG5cbiAgcG9zdFVwZGF0ZShqc29uLCBmdW5jdGlvbihqc29uKSB7XG4gICAgY29uc3QgdXBkYXRlUmVzcG9uc2UgPSBVcGRhdGVSZXNwb25zZS5mcm9tSlNPTihqc29uKSxcbiAgICAgICAgICBwZW5kaW5nT3BlcmF0aW9ucyA9IHVwZGF0ZVJlc3BvbnNlLmdldFBlbmRpbmdPcGVyYXRpb25zKCk7XG5cbiAgICBjYWxsYmFjayhwZW5kaW5nT3BlcmF0aW9ucyk7XG4gIH0pO1xufVxuIl19