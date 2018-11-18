'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uuidV4 = require('uuid/v4'),
    ///
necessary = require('necessary');

var User = require('./user'),
    transformContent = require('../content/transform');

var arrayUtilities = necessary.arrayUtilities,
    filter = arrayUtilities.filter;

var Session = function () {
	function Session(map, content, identifier) {
		_classCallCheck(this, Session);

		this.map = map;
		this.content = content;
		this.identifier = identifier;
	}

	_createClass(Session, [{
		key: 'getMap',
		value: function getMap() {
			return this.map;
		}
	}, {
		key: 'getContent',
		value: function getContent() {
			return this.content;
		}
	}, {
		key: 'getIdentifier',
		value: function getIdentifier() {
			return this.identifier;
		}
	}, {
		key: 'getUser',
		value: function getUser(userIdentifier) {
			var user = this.map[userIdentifier];

			return user;
		}
	}, {
		key: 'getOtherUsers',
		value: function getOtherUsers(userIdentifier) {
			var otherUsers = Object.values(this.map);

			filter(otherUsers, function (otherUser) {
				var otherUserIdentifier = otherUser.getIdentifier();

				if (otherUserIdentifier !== userIdentifier) {
					return true;
				}
			});

			return otherUsers;
		}
	}, {
		key: 'hasExpired',
		value: function hasExpired(sessionIdentifier) {
			var expired = this.identifier !== sessionIdentifier;

			return expired;
		}
	}, {
		key: 'createUser',
		value: function createUser() {
			var user = User.fromNothing(),
			    userIdentifier = user.getIdentifier();

			this.map[userIdentifier] = user;

			return userIdentifier;
		}
	}, {
		key: 'update',
		value: function update(operations, userIdentifier, sessionExpired) {
			var pendingOperations = sessionExpired ? [] : this.updateUsers(operations, userIdentifier);

			return pendingOperations;
		}
	}, {
		key: 'updateUsers',
		value: function updateUsers(operations, userIdentifier) {
			var user = this.getUser(userIdentifier),
			    otherUsers = this.getOtherUsers(userIdentifier),
			    transformedOperations = user.transformOperations(operations),
			    transformedPendingOperations = user.transformedPendingOperations(operations);

			otherUsers.forEach(function (otherUser) {
				otherUser.update(transformedOperations);
			});

			this.content = transformContent(this.content, transformedOperations);

			user.reset();

			var pendingOperations = transformedPendingOperations; ///

			return pendingOperations;
		}
	}], [{
		key: 'fromNothing',
		value: function fromNothing() {
			var map = {},
			    content = '',
			    ///
			identifier = uuidV4(),
			    ///
			session = new Session(map, content, identifier);

			return session;
		}
	}]);

	return Session;
}();

var session = Session.fromNothing();

module.exports = session;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leGFtcGxlL3Nlc3Npb24uanMiXSwibmFtZXMiOlsidXVpZFY0IiwicmVxdWlyZSIsIm5lY2Vzc2FyeSIsIlVzZXIiLCJ0cmFuc2Zvcm1Db250ZW50IiwiYXJyYXlVdGlsaXRpZXMiLCJmaWx0ZXIiLCJTZXNzaW9uIiwibWFwIiwiY29udGVudCIsImlkZW50aWZpZXIiLCJ1c2VySWRlbnRpZmllciIsInVzZXIiLCJvdGhlclVzZXJzIiwiT2JqZWN0IiwidmFsdWVzIiwib3RoZXJVc2VyIiwib3RoZXJVc2VySWRlbnRpZmllciIsImdldElkZW50aWZpZXIiLCJzZXNzaW9uSWRlbnRpZmllciIsImV4cGlyZWQiLCJmcm9tTm90aGluZyIsIm9wZXJhdGlvbnMiLCJzZXNzaW9uRXhwaXJlZCIsInBlbmRpbmdPcGVyYXRpb25zIiwidXBkYXRlVXNlcnMiLCJnZXRVc2VyIiwiZ2V0T3RoZXJVc2VycyIsInRyYW5zZm9ybWVkT3BlcmF0aW9ucyIsInRyYW5zZm9ybU9wZXJhdGlvbnMiLCJ0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zIiwiZm9yRWFjaCIsInVwZGF0ZSIsInJlc2V0Iiwic2Vzc2lvbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFFQSxJQUFNQSxTQUFTQyxRQUFRLFNBQVIsQ0FBZjtBQUFBLElBQW9DO0FBQzlCQyxZQUFZRCxRQUFRLFdBQVIsQ0FEbEI7O0FBR0EsSUFBTUUsT0FBT0YsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNNRyxtQkFBbUJILFFBQVEsc0JBQVIsQ0FEekI7O0FBR00sSUFBRUksY0FBRixHQUFxQkgsU0FBckIsQ0FBRUcsY0FBRjtBQUFBLElBQ0VDLE1BREYsR0FDYUQsY0FEYixDQUNFQyxNQURGOztJQUdBQyxPO0FBQ0wsa0JBQVlDLEdBQVosRUFBaUJDLE9BQWpCLEVBQTBCQyxVQUExQixFQUFzQztBQUFBOztBQUNyQyxPQUFLRixHQUFMLEdBQVdBLEdBQVg7QUFDQSxPQUFLQyxPQUFMLEdBQWVBLE9BQWY7QUFDQSxPQUFLQyxVQUFMLEdBQWtCQSxVQUFsQjtBQUNBOzs7OzJCQUVRO0FBQ1IsVUFBTyxLQUFLRixHQUFaO0FBQ0E7OzsrQkFFWTtBQUNaLFVBQU8sS0FBS0MsT0FBWjtBQUNBOzs7a0NBRWU7QUFDZixVQUFPLEtBQUtDLFVBQVo7QUFDQTs7OzBCQUVPQyxjLEVBQWdCO0FBQ3ZCLE9BQU1DLE9BQU8sS0FBS0osR0FBTCxDQUFTRyxjQUFULENBQWI7O0FBRUEsVUFBT0MsSUFBUDtBQUNBOzs7Z0NBRWFELGMsRUFBZ0I7QUFDN0IsT0FBTUUsYUFBYUMsT0FBT0MsTUFBUCxDQUFjLEtBQUtQLEdBQW5CLENBQW5COztBQUVBRixVQUFPTyxVQUFQLEVBQW1CLFVBQVNHLFNBQVQsRUFBb0I7QUFDdEMsUUFBTUMsc0JBQXNCRCxVQUFVRSxhQUFWLEVBQTVCOztBQUVBLFFBQUlELHdCQUF3Qk4sY0FBNUIsRUFBNEM7QUFDM0MsWUFBTyxJQUFQO0FBQ0E7QUFDRCxJQU5EOztBQVFBLFVBQU9FLFVBQVA7QUFDQTs7OzZCQUVVTSxpQixFQUFtQjtBQUM3QixPQUFNQyxVQUFXLEtBQUtWLFVBQUwsS0FBb0JTLGlCQUFyQzs7QUFFQSxVQUFPQyxPQUFQO0FBQ0E7OzsrQkFFWTtBQUNaLE9BQU1SLE9BQU9ULEtBQUtrQixXQUFMLEVBQWI7QUFBQSxPQUNHVixpQkFBaUJDLEtBQUtNLGFBQUwsRUFEcEI7O0FBR0EsUUFBS1YsR0FBTCxDQUFTRyxjQUFULElBQTJCQyxJQUEzQjs7QUFFQSxVQUFPRCxjQUFQO0FBQ0E7Ozt5QkFFTVcsVSxFQUFZWCxjLEVBQWdCWSxjLEVBQWdCO0FBQ2pELE9BQU1DLG9CQUFvQkQsaUJBQ0csRUFESCxHQUVLLEtBQUtFLFdBQUwsQ0FBaUJILFVBQWpCLEVBQTZCWCxjQUE3QixDQUYvQjs7QUFJRCxVQUFPYSxpQkFBUDtBQUNBOzs7OEJBRVdGLFUsRUFBWVgsYyxFQUFnQjtBQUNyQyxPQUFNQyxPQUFPLEtBQUtjLE9BQUwsQ0FBYWYsY0FBYixDQUFiO0FBQUEsT0FDTUUsYUFBYSxLQUFLYyxhQUFMLENBQW1CaEIsY0FBbkIsQ0FEbkI7QUFBQSxPQUVNaUIsd0JBQXdCaEIsS0FBS2lCLG1CQUFMLENBQXlCUCxVQUF6QixDQUY5QjtBQUFBLE9BR01RLCtCQUErQmxCLEtBQUtrQiw0QkFBTCxDQUFrQ1IsVUFBbEMsQ0FIckM7O0FBS0FULGNBQVdrQixPQUFYLENBQW1CLFVBQVNmLFNBQVQsRUFBb0I7QUFDckNBLGNBQVVnQixNQUFWLENBQWlCSixxQkFBakI7QUFDRCxJQUZEOztBQUlBLFFBQUtuQixPQUFMLEdBQWVMLGlCQUFpQixLQUFLSyxPQUF0QixFQUErQm1CLHFCQUEvQixDQUFmOztBQUVBaEIsUUFBS3FCLEtBQUw7O0FBRUEsT0FBTVQsb0JBQW9CTSw0QkFBMUIsQ0FkcUMsQ0FjbUI7O0FBRXhELFVBQU9OLGlCQUFQO0FBQ0Q7OztnQ0FFbUI7QUFDcEIsT0FBTWhCLE1BQU0sRUFBWjtBQUFBLE9BQ0dDLFVBQVUsRUFEYjtBQUFBLE9BQ2lCO0FBQ2RDLGdCQUFhVixRQUZoQjtBQUFBLE9BRTJCO0FBQ3hCa0MsYUFBVSxJQUFJM0IsT0FBSixDQUFZQyxHQUFaLEVBQWlCQyxPQUFqQixFQUEwQkMsVUFBMUIsQ0FIYjs7QUFLQSxVQUFPd0IsT0FBUDtBQUNBOzs7Ozs7QUFHRixJQUFNQSxVQUFVM0IsUUFBUWMsV0FBUixFQUFoQjs7QUFFQWMsT0FBT0MsT0FBUCxHQUFpQkYsT0FBakIiLCJmaWxlIjoic2Vzc2lvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IHV1aWRWNCA9IHJlcXVpcmUoJ3V1aWQvdjQnKSwgIC8vL1xyXG4gICAgICBuZWNlc3NhcnkgPSByZXF1aXJlKCduZWNlc3NhcnknKTtcclxuXHJcbmNvbnN0IFVzZXIgPSByZXF1aXJlKCcuL3VzZXInKSxcclxuICAgICAgdHJhbnNmb3JtQ29udGVudCA9IHJlcXVpcmUoJy4uL2NvbnRlbnQvdHJhbnNmb3JtJyk7XHJcblxyXG5jb25zdCB7IGFycmF5VXRpbGl0aWVzIH0gPSBuZWNlc3NhcnksXHJcbiAgICAgIHsgZmlsdGVyIH0gPSBhcnJheVV0aWxpdGllcztcclxuXHJcbmNsYXNzIFNlc3Npb24ge1xyXG5cdGNvbnN0cnVjdG9yKG1hcCwgY29udGVudCwgaWRlbnRpZmllcikge1xyXG5cdFx0dGhpcy5tYXAgPSBtYXA7XHJcblx0XHR0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xyXG5cdFx0dGhpcy5pZGVudGlmaWVyID0gaWRlbnRpZmllcjtcclxuXHR9XHJcblxyXG5cdGdldE1hcCgpIHtcclxuXHRcdHJldHVybiB0aGlzLm1hcDtcclxuXHR9XHJcblxyXG5cdGdldENvbnRlbnQoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5jb250ZW50O1xyXG5cdH1cclxuXHJcblx0Z2V0SWRlbnRpZmllcigpIHtcclxuXHRcdHJldHVybiB0aGlzLmlkZW50aWZpZXI7XHJcblx0fVxyXG5cclxuXHRnZXRVc2VyKHVzZXJJZGVudGlmaWVyKSB7XHJcblx0XHRjb25zdCB1c2VyID0gdGhpcy5tYXBbdXNlcklkZW50aWZpZXJdO1xyXG5cclxuXHRcdHJldHVybiB1c2VyO1xyXG5cdH1cclxuXHJcblx0Z2V0T3RoZXJVc2Vycyh1c2VySWRlbnRpZmllcikge1xyXG5cdFx0Y29uc3Qgb3RoZXJVc2VycyA9IE9iamVjdC52YWx1ZXModGhpcy5tYXApO1xyXG5cclxuXHRcdGZpbHRlcihvdGhlclVzZXJzLCBmdW5jdGlvbihvdGhlclVzZXIpIHtcclxuXHRcdFx0Y29uc3Qgb3RoZXJVc2VySWRlbnRpZmllciA9IG90aGVyVXNlci5nZXRJZGVudGlmaWVyKCk7XHJcblxyXG5cdFx0XHRpZiAob3RoZXJVc2VySWRlbnRpZmllciAhPT0gdXNlcklkZW50aWZpZXIpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIG90aGVyVXNlcnM7XHJcblx0fVxyXG5cclxuXHRoYXNFeHBpcmVkKHNlc3Npb25JZGVudGlmaWVyKSB7XHJcblx0XHRjb25zdCBleHBpcmVkID0gKHRoaXMuaWRlbnRpZmllciAhPT0gc2Vzc2lvbklkZW50aWZpZXIpO1xyXG5cclxuXHRcdHJldHVybiBleHBpcmVkO1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlVXNlcigpIHtcclxuXHRcdGNvbnN0IHVzZXIgPSBVc2VyLmZyb21Ob3RoaW5nKCksXHJcblx0XHRcdFx0XHR1c2VySWRlbnRpZmllciA9IHVzZXIuZ2V0SWRlbnRpZmllcigpO1xyXG5cclxuXHRcdHRoaXMubWFwW3VzZXJJZGVudGlmaWVyXSA9IHVzZXI7XHJcblxyXG5cdFx0cmV0dXJuIHVzZXJJZGVudGlmaWVyO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlKG9wZXJhdGlvbnMsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uRXhwaXJlZCkge1xyXG5cdCAgY29uc3QgcGVuZGluZ09wZXJhdGlvbnMgPSBzZXNzaW9uRXhwaXJlZCA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW10gOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVVc2VycyhvcGVyYXRpb25zLCB1c2VySWRlbnRpZmllcik7XHJcblxyXG5cdFx0cmV0dXJuIHBlbmRpbmdPcGVyYXRpb25zO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlVXNlcnMob3BlcmF0aW9ucywgdXNlcklkZW50aWZpZXIpIHtcclxuICAgIGNvbnN0IHVzZXIgPSB0aGlzLmdldFVzZXIodXNlcklkZW50aWZpZXIpLFxyXG4gICAgICAgICAgb3RoZXJVc2VycyA9IHRoaXMuZ2V0T3RoZXJVc2Vycyh1c2VySWRlbnRpZmllciksXHJcbiAgICAgICAgICB0cmFuc2Zvcm1lZE9wZXJhdGlvbnMgPSB1c2VyLnRyYW5zZm9ybU9wZXJhdGlvbnMob3BlcmF0aW9ucyksXHJcbiAgICAgICAgICB0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zID0gdXNlci50cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zKG9wZXJhdGlvbnMpO1xyXG5cclxuICAgIG90aGVyVXNlcnMuZm9yRWFjaChmdW5jdGlvbihvdGhlclVzZXIpIHtcclxuICAgICAgb3RoZXJVc2VyLnVwZGF0ZSh0cmFuc2Zvcm1lZE9wZXJhdGlvbnMpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5jb250ZW50ID0gdHJhbnNmb3JtQ29udGVudCh0aGlzLmNvbnRlbnQsIHRyYW5zZm9ybWVkT3BlcmF0aW9ucyk7XHJcblxyXG4gICAgdXNlci5yZXNldCgpO1xyXG5cclxuICAgIGNvbnN0IHBlbmRpbmdPcGVyYXRpb25zID0gdHJhbnNmb3JtZWRQZW5kaW5nT3BlcmF0aW9uczsgLy8vXHJcblxyXG4gICAgcmV0dXJuIHBlbmRpbmdPcGVyYXRpb25zO1xyXG4gIH1cclxuXHJcblx0c3RhdGljIGZyb21Ob3RoaW5nKCkge1xyXG5cdFx0Y29uc3QgbWFwID0ge30sXHJcblx0XHRcdFx0XHRjb250ZW50ID0gJycsXHQvLy9cclxuXHRcdFx0XHRcdGlkZW50aWZpZXIgPSB1dWlkVjQoKSwgIC8vL1xyXG5cdFx0XHRcdFx0c2Vzc2lvbiA9IG5ldyBTZXNzaW9uKG1hcCwgY29udGVudCwgaWRlbnRpZmllcik7XHJcblxyXG5cdFx0cmV0dXJuIHNlc3Npb247XHJcblx0fVxyXG59XHJcblxyXG5jb25zdCBzZXNzaW9uID0gU2Vzc2lvbi5mcm9tTm90aGluZygpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBzZXNzaW9uO1xyXG4iXX0=