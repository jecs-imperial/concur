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
		value: function update(operations, userIdentifier) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9leGFtcGxlL3Nlc3Npb24uanMiXSwibmFtZXMiOlsidXVpZFY0IiwicmVxdWlyZSIsIm5lY2Vzc2FyeSIsIlVzZXIiLCJ0cmFuc2Zvcm1Db250ZW50IiwiYXJyYXlVdGlsaXRpZXMiLCJmaWx0ZXIiLCJTZXNzaW9uIiwibWFwIiwiY29udGVudCIsImlkZW50aWZpZXIiLCJ1c2VySWRlbnRpZmllciIsInVzZXIiLCJvdGhlclVzZXJzIiwiT2JqZWN0IiwidmFsdWVzIiwib3RoZXJVc2VyIiwib3RoZXJVc2VySWRlbnRpZmllciIsImdldElkZW50aWZpZXIiLCJzZXNzaW9uSWRlbnRpZmllciIsImV4cGlyZWQiLCJmcm9tTm90aGluZyIsIm9wZXJhdGlvbnMiLCJnZXRVc2VyIiwiZ2V0T3RoZXJVc2VycyIsInRyYW5zZm9ybWVkT3BlcmF0aW9ucyIsInRyYW5zZm9ybU9wZXJhdGlvbnMiLCJ0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zIiwiZm9yRWFjaCIsInVwZGF0ZSIsInJlc2V0IiwicGVuZGluZ09wZXJhdGlvbnMiLCJzZXNzaW9uIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBLElBQU1BLFNBQVNDLFFBQVEsU0FBUixDQUFmO0FBQUEsSUFBb0M7QUFDOUJDLFlBQVlELFFBQVEsV0FBUixDQURsQjs7QUFHQSxJQUFNRSxPQUFPRixRQUFRLFFBQVIsQ0FBYjtBQUFBLElBQ01HLG1CQUFtQkgsUUFBUSxzQkFBUixDQUR6Qjs7QUFHTSxJQUFFSSxjQUFGLEdBQXFCSCxTQUFyQixDQUFFRyxjQUFGO0FBQUEsSUFDRUMsTUFERixHQUNhRCxjQURiLENBQ0VDLE1BREY7O0lBR0FDLE87QUFDTCxrQkFBWUMsR0FBWixFQUFpQkMsT0FBakIsRUFBMEJDLFVBQTFCLEVBQXNDO0FBQUE7O0FBQ3JDLE9BQUtGLEdBQUwsR0FBV0EsR0FBWDtBQUNBLE9BQUtDLE9BQUwsR0FBZUEsT0FBZjtBQUNBLE9BQUtDLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0E7Ozs7MkJBRVE7QUFDUixVQUFPLEtBQUtGLEdBQVo7QUFDQTs7OytCQUVZO0FBQ1osVUFBTyxLQUFLQyxPQUFaO0FBQ0E7OztrQ0FFZTtBQUNmLFVBQU8sS0FBS0MsVUFBWjtBQUNBOzs7MEJBRU9DLGMsRUFBZ0I7QUFDdkIsT0FBTUMsT0FBTyxLQUFLSixHQUFMLENBQVNHLGNBQVQsQ0FBYjs7QUFFQSxVQUFPQyxJQUFQO0FBQ0E7OztnQ0FFYUQsYyxFQUFnQjtBQUM3QixPQUFNRSxhQUFhQyxPQUFPQyxNQUFQLENBQWMsS0FBS1AsR0FBbkIsQ0FBbkI7O0FBRUFGLFVBQU9PLFVBQVAsRUFBbUIsVUFBU0csU0FBVCxFQUFvQjtBQUN0QyxRQUFNQyxzQkFBc0JELFVBQVVFLGFBQVYsRUFBNUI7O0FBRUEsUUFBSUQsd0JBQXdCTixjQUE1QixFQUE0QztBQUMzQyxZQUFPLElBQVA7QUFDQTtBQUNELElBTkQ7O0FBUUEsVUFBT0UsVUFBUDtBQUNBOzs7NkJBRVVNLGlCLEVBQW1CO0FBQzdCLE9BQU1DLFVBQVcsS0FBS1YsVUFBTCxLQUFvQlMsaUJBQXJDOztBQUVBLFVBQU9DLE9BQVA7QUFDQTs7OytCQUVZO0FBQ1osT0FBTVIsT0FBT1QsS0FBS2tCLFdBQUwsRUFBYjtBQUFBLE9BQ0dWLGlCQUFpQkMsS0FBS00sYUFBTCxFQURwQjs7QUFHQSxRQUFLVixHQUFMLENBQVNHLGNBQVQsSUFBMkJDLElBQTNCOztBQUVBLFVBQU9ELGNBQVA7QUFDQTs7O3lCQUVNVyxVLEVBQVlYLGMsRUFBZ0I7QUFDbEMsT0FBTUMsT0FBTyxLQUFLVyxPQUFMLENBQWFaLGNBQWIsQ0FBYjtBQUFBLE9BQ0dFLGFBQWEsS0FBS1csYUFBTCxDQUFtQmIsY0FBbkIsQ0FEaEI7QUFBQSxPQUVHYyx3QkFBd0JiLEtBQUtjLG1CQUFMLENBQXlCSixVQUF6QixDQUYzQjtBQUFBLE9BR0dLLCtCQUErQmYsS0FBS2UsNEJBQUwsQ0FBa0NMLFVBQWxDLENBSGxDOztBQUtBVCxjQUFXZSxPQUFYLENBQW1CLFVBQVNaLFNBQVQsRUFBb0I7QUFDdENBLGNBQVVhLE1BQVYsQ0FBaUJKLHFCQUFqQjtBQUNBLElBRkQ7O0FBSUEsUUFBS2hCLE9BQUwsR0FBZUwsaUJBQWlCLEtBQUtLLE9BQXRCLEVBQStCZ0IscUJBQS9CLENBQWY7O0FBRUFiLFFBQUtrQixLQUFMOztBQUVBLE9BQU1DLG9CQUFvQkosNEJBQTFCLENBZGtDLENBY3NCOztBQUV4RCxVQUFPSSxpQkFBUDtBQUNBOzs7Z0NBRW9CO0FBQ3BCLE9BQU12QixNQUFNLEVBQVo7QUFBQSxPQUNHQyxVQUFVLEVBRGI7QUFBQSxPQUNpQjtBQUNkQyxnQkFBYVYsUUFGaEI7QUFBQSxPQUUyQjtBQUN4QmdDLGFBQVUsSUFBSXpCLE9BQUosQ0FBWUMsR0FBWixFQUFpQkMsT0FBakIsRUFBMEJDLFVBQTFCLENBSGI7O0FBS0EsVUFBT3NCLE9BQVA7QUFDQTs7Ozs7O0FBR0YsSUFBTUEsVUFBVXpCLFFBQVFjLFdBQVIsRUFBaEI7O0FBRUFZLE9BQU9DLE9BQVAsR0FBaUJGLE9BQWpCIiwiZmlsZSI6InNlc3Npb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCB1dWlkVjQgPSByZXF1aXJlKCd1dWlkL3Y0JyksICAvLy9cclxuICAgICAgbmVjZXNzYXJ5ID0gcmVxdWlyZSgnbmVjZXNzYXJ5Jyk7XHJcblxyXG5jb25zdCBVc2VyID0gcmVxdWlyZSgnLi91c2VyJyksXHJcbiAgICAgIHRyYW5zZm9ybUNvbnRlbnQgPSByZXF1aXJlKCcuLi9jb250ZW50L3RyYW5zZm9ybScpO1xyXG5cclxuY29uc3QgeyBhcnJheVV0aWxpdGllcyB9ID0gbmVjZXNzYXJ5LFxyXG4gICAgICB7IGZpbHRlciB9ID0gYXJyYXlVdGlsaXRpZXM7XHJcblxyXG5jbGFzcyBTZXNzaW9uIHtcclxuXHRjb25zdHJ1Y3RvcihtYXAsIGNvbnRlbnQsIGlkZW50aWZpZXIpIHtcclxuXHRcdHRoaXMubWFwID0gbWFwO1xyXG5cdFx0dGhpcy5jb250ZW50ID0gY29udGVudDtcclxuXHRcdHRoaXMuaWRlbnRpZmllciA9IGlkZW50aWZpZXI7XHJcblx0fVxyXG5cclxuXHRnZXRNYXAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5tYXA7XHJcblx0fVxyXG5cclxuXHRnZXRDb250ZW50KCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuY29udGVudDtcclxuXHR9XHJcblxyXG5cdGdldElkZW50aWZpZXIoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5pZGVudGlmaWVyO1xyXG5cdH1cclxuXHJcblx0Z2V0VXNlcih1c2VySWRlbnRpZmllcikge1xyXG5cdFx0Y29uc3QgdXNlciA9IHRoaXMubWFwW3VzZXJJZGVudGlmaWVyXTtcclxuXHJcblx0XHRyZXR1cm4gdXNlcjtcclxuXHR9XHJcblxyXG5cdGdldE90aGVyVXNlcnModXNlcklkZW50aWZpZXIpIHtcclxuXHRcdGNvbnN0IG90aGVyVXNlcnMgPSBPYmplY3QudmFsdWVzKHRoaXMubWFwKTtcclxuXHJcblx0XHRmaWx0ZXIob3RoZXJVc2VycywgZnVuY3Rpb24ob3RoZXJVc2VyKSB7XHJcblx0XHRcdGNvbnN0IG90aGVyVXNlcklkZW50aWZpZXIgPSBvdGhlclVzZXIuZ2V0SWRlbnRpZmllcigpO1xyXG5cclxuXHRcdFx0aWYgKG90aGVyVXNlcklkZW50aWZpZXIgIT09IHVzZXJJZGVudGlmaWVyKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBvdGhlclVzZXJzO1xyXG5cdH1cclxuXHJcblx0aGFzRXhwaXJlZChzZXNzaW9uSWRlbnRpZmllcikge1xyXG5cdFx0Y29uc3QgZXhwaXJlZCA9ICh0aGlzLmlkZW50aWZpZXIgIT09IHNlc3Npb25JZGVudGlmaWVyKTtcclxuXHJcblx0XHRyZXR1cm4gZXhwaXJlZDtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZVVzZXIoKSB7XHJcblx0XHRjb25zdCB1c2VyID0gVXNlci5mcm9tTm90aGluZygpLFxyXG5cdFx0XHRcdFx0dXNlcklkZW50aWZpZXIgPSB1c2VyLmdldElkZW50aWZpZXIoKTtcclxuXHJcblx0XHR0aGlzLm1hcFt1c2VySWRlbnRpZmllcl0gPSB1c2VyO1xyXG5cclxuXHRcdHJldHVybiB1c2VySWRlbnRpZmllcjtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZShvcGVyYXRpb25zLCB1c2VySWRlbnRpZmllcikge1xyXG5cdFx0Y29uc3QgdXNlciA9IHRoaXMuZ2V0VXNlcih1c2VySWRlbnRpZmllciksXHJcblx0XHRcdFx0XHRvdGhlclVzZXJzID0gdGhpcy5nZXRPdGhlclVzZXJzKHVzZXJJZGVudGlmaWVyKSxcclxuXHRcdFx0XHRcdHRyYW5zZm9ybWVkT3BlcmF0aW9ucyA9IHVzZXIudHJhbnNmb3JtT3BlcmF0aW9ucyhvcGVyYXRpb25zKSxcclxuXHRcdFx0XHRcdHRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMgPSB1c2VyLnRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMob3BlcmF0aW9ucyk7XHJcblxyXG5cdFx0b3RoZXJVc2Vycy5mb3JFYWNoKGZ1bmN0aW9uKG90aGVyVXNlcikge1xyXG5cdFx0XHRvdGhlclVzZXIudXBkYXRlKHRyYW5zZm9ybWVkT3BlcmF0aW9ucyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmNvbnRlbnQgPSB0cmFuc2Zvcm1Db250ZW50KHRoaXMuY29udGVudCwgdHJhbnNmb3JtZWRPcGVyYXRpb25zKTtcclxuXHJcblx0XHR1c2VyLnJlc2V0KCk7XHJcblxyXG5cdFx0Y29uc3QgcGVuZGluZ09wZXJhdGlvbnMgPSB0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zOyAvLy9cclxuXHJcblx0XHRyZXR1cm4gcGVuZGluZ09wZXJhdGlvbnM7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZnJvbU5vdGhpbmcoKSB7XHJcblx0XHRjb25zdCBtYXAgPSB7fSxcclxuXHRcdFx0XHRcdGNvbnRlbnQgPSAnJyxcdC8vL1xyXG5cdFx0XHRcdFx0aWRlbnRpZmllciA9IHV1aWRWNCgpLCAgLy8vXHJcblx0XHRcdFx0XHRzZXNzaW9uID0gbmV3IFNlc3Npb24obWFwLCBjb250ZW50LCBpZGVudGlmaWVyKTtcclxuXHJcblx0XHRyZXR1cm4gc2Vzc2lvbjtcclxuXHR9XHJcbn1cclxuXHJcbmNvbnN0IHNlc3Npb24gPSBTZXNzaW9uLmZyb21Ob3RoaW5nKCk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHNlc3Npb247XHJcbiJdfQ==