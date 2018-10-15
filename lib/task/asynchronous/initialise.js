'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var necessary = require('necessary'),
    sufficient = require('sufficient');

var uris = require('../../uris'),
    InitialiseRequest = require('../../request/initialise'),
    InitialiseResponse = require('../../response/initialise');

var miscellaneousUtilities = necessary.miscellaneousUtilities,
    AsynchronousTask = sufficient.AsynchronousTask,
    post = miscellaneousUtilities.post,
    INITIALISE_URI = uris.INITIALISE_URI;

var InitialiseAsynchronousTask = function (_AsynchronousTask) {
      _inherits(InitialiseAsynchronousTask, _AsynchronousTask);

      function InitialiseAsynchronousTask(host, callback) {
            _classCallCheck(this, InitialiseAsynchronousTask);

            return _possibleConstructorReturn(this, (InitialiseAsynchronousTask.__proto__ || Object.getPrototypeOf(InitialiseAsynchronousTask)).call(this, asynchronousMethod, host, callback));
      }

      return InitialiseAsynchronousTask;
}(AsynchronousTask);

module.exports = InitialiseAsynchronousTask;

function asynchronousMethod(host, callback) {
      var initialiseRequest = InitialiseRequest.fromNothing(),
          uri = INITIALISE_URI,
          json = initialiseRequest.toJSON();

      post(host, uri, json, function (json) {
            var initialiseResponse = InitialiseResponse.fromJSON(json),
                userIdentifier = initialiseResponse.getUserIdentifier();

            callback(userIdentifier);
      });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi90YXNrL2FzeW5jaHJvbm91cy9pbml0aWFsaXNlLmpzIl0sIm5hbWVzIjpbIm5lY2Vzc2FyeSIsInJlcXVpcmUiLCJzdWZmaWNpZW50IiwidXJpcyIsIkluaXRpYWxpc2VSZXF1ZXN0IiwiSW5pdGlhbGlzZVJlc3BvbnNlIiwibWlzY2VsbGFuZW91c1V0aWxpdGllcyIsIkFzeW5jaHJvbm91c1Rhc2siLCJwb3N0IiwiSU5JVElBTElTRV9VUkkiLCJJbml0aWFsaXNlQXN5bmNocm9ub3VzVGFzayIsImhvc3QiLCJjYWxsYmFjayIsImFzeW5jaHJvbm91c01ldGhvZCIsIm1vZHVsZSIsImV4cG9ydHMiLCJpbml0aWFsaXNlUmVxdWVzdCIsImZyb21Ob3RoaW5nIiwidXJpIiwianNvbiIsInRvSlNPTiIsImluaXRpYWxpc2VSZXNwb25zZSIsImZyb21KU09OIiwidXNlcklkZW50aWZpZXIiLCJnZXRVc2VySWRlbnRpZmllciJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBRUEsSUFBTUEsWUFBWUMsUUFBUSxXQUFSLENBQWxCO0FBQUEsSUFDTUMsYUFBYUQsUUFBUSxZQUFSLENBRG5COztBQUdBLElBQU1FLE9BQU9GLFFBQVEsWUFBUixDQUFiO0FBQUEsSUFDTUcsb0JBQW9CSCxRQUFRLDBCQUFSLENBRDFCO0FBQUEsSUFFTUkscUJBQXFCSixRQUFRLDJCQUFSLENBRjNCOztBQUlNLElBQUVLLHNCQUFGLEdBQTZCTixTQUE3QixDQUFFTSxzQkFBRjtBQUFBLElBQ0VDLGdCQURGLEdBQ3VCTCxVQUR2QixDQUNFSyxnQkFERjtBQUFBLElBRUVDLElBRkYsR0FFV0Ysc0JBRlgsQ0FFRUUsSUFGRjtBQUFBLElBR0VDLGNBSEYsR0FHcUJOLElBSHJCLENBR0VNLGNBSEY7O0lBS0FDLDBCOzs7QUFDSiwwQ0FBWUMsSUFBWixFQUFrQkMsUUFBbEIsRUFBNEI7QUFBQTs7QUFBQSwySkFDcEJDLGtCQURvQixFQUNBRixJQURBLEVBQ01DLFFBRE47QUFFM0I7OztFQUhzQ0wsZ0I7O0FBTXpDTyxPQUFPQyxPQUFQLEdBQWlCTCwwQkFBakI7O0FBRUEsU0FBU0csa0JBQVQsQ0FBNEJGLElBQTVCLEVBQWtDQyxRQUFsQyxFQUE0QztBQUMxQyxVQUFNSSxvQkFBb0JaLGtCQUFrQmEsV0FBbEIsRUFBMUI7QUFBQSxVQUNNQyxNQUFNVCxjQURaO0FBQUEsVUFFTVUsT0FBT0gsa0JBQWtCSSxNQUFsQixFQUZiOztBQUlBWixXQUFLRyxJQUFMLEVBQVdPLEdBQVgsRUFBZ0JDLElBQWhCLEVBQXNCLFVBQVNBLElBQVQsRUFBZTtBQUNuQyxnQkFBTUUscUJBQXFCaEIsbUJBQW1CaUIsUUFBbkIsQ0FBNEJILElBQTVCLENBQTNCO0FBQUEsZ0JBQ01JLGlCQUFpQkYsbUJBQW1CRyxpQkFBbkIsRUFEdkI7O0FBR0FaLHFCQUFTVyxjQUFUO0FBQ0QsT0FMRDtBQU1EIiwiZmlsZSI6ImluaXRpYWxpc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IG5lY2Vzc2FyeSA9IHJlcXVpcmUoJ25lY2Vzc2FyeScpLFxuICAgICAgc3VmZmljaWVudCA9IHJlcXVpcmUoJ3N1ZmZpY2llbnQnKTtcblxuY29uc3QgdXJpcyA9IHJlcXVpcmUoJy4uLy4uL3VyaXMnKSxcbiAgICAgIEluaXRpYWxpc2VSZXF1ZXN0ID0gcmVxdWlyZSgnLi4vLi4vcmVxdWVzdC9pbml0aWFsaXNlJyksXG4gICAgICBJbml0aWFsaXNlUmVzcG9uc2UgPSByZXF1aXJlKCcuLi8uLi9yZXNwb25zZS9pbml0aWFsaXNlJyk7XG5cbmNvbnN0IHsgbWlzY2VsbGFuZW91c1V0aWxpdGllcyB9ID0gbmVjZXNzYXJ5LFxuICAgICAgeyBBc3luY2hyb25vdXNUYXNrIH0gPSBzdWZmaWNpZW50LFxuICAgICAgeyBwb3N0IH0gPSBtaXNjZWxsYW5lb3VzVXRpbGl0aWVzLFxuICAgICAgeyBJTklUSUFMSVNFX1VSSSB9ID0gdXJpcztcblxuY2xhc3MgSW5pdGlhbGlzZUFzeW5jaHJvbm91c1Rhc2sgZXh0ZW5kcyBBc3luY2hyb25vdXNUYXNrIHtcbiAgY29uc3RydWN0b3IoaG9zdCwgY2FsbGJhY2spIHtcbiAgICBzdXBlcihhc3luY2hyb25vdXNNZXRob2QsIGhvc3QsIGNhbGxiYWNrKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSW5pdGlhbGlzZUFzeW5jaHJvbm91c1Rhc2s7XG5cbmZ1bmN0aW9uIGFzeW5jaHJvbm91c01ldGhvZChob3N0LCBjYWxsYmFjaykge1xuICBjb25zdCBpbml0aWFsaXNlUmVxdWVzdCA9IEluaXRpYWxpc2VSZXF1ZXN0LmZyb21Ob3RoaW5nKCksXG4gICAgICAgIHVyaSA9IElOSVRJQUxJU0VfVVJJLFxuICAgICAgICBqc29uID0gaW5pdGlhbGlzZVJlcXVlc3QudG9KU09OKCk7XG5cbiAgcG9zdChob3N0LCB1cmksIGpzb24sIGZ1bmN0aW9uKGpzb24pIHtcbiAgICBjb25zdCBpbml0aWFsaXNlUmVzcG9uc2UgPSBJbml0aWFsaXNlUmVzcG9uc2UuZnJvbUpTT04oanNvbiksXG4gICAgICAgICAgdXNlcklkZW50aWZpZXIgPSBpbml0aWFsaXNlUmVzcG9uc2UuZ2V0VXNlcklkZW50aWZpZXIoKTtcblxuICAgIGNhbGxiYWNrKHVzZXJJZGVudGlmaWVyKTtcbiAgfSk7XG59XG4iXX0=