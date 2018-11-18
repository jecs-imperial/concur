'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uuidV4 = require('uuid/v4'),
    ///
necessary = require('necessary');

var User = require('./user'),
    transformContent = require('./content/transform');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9zZXNzaW9uLmpzIl0sIm5hbWVzIjpbInV1aWRWNCIsInJlcXVpcmUiLCJuZWNlc3NhcnkiLCJVc2VyIiwidHJhbnNmb3JtQ29udGVudCIsImFycmF5VXRpbGl0aWVzIiwiZmlsdGVyIiwiU2Vzc2lvbiIsIm1hcCIsImNvbnRlbnQiLCJpZGVudGlmaWVyIiwidXNlcklkZW50aWZpZXIiLCJ1c2VyIiwib3RoZXJVc2VycyIsIk9iamVjdCIsInZhbHVlcyIsIm90aGVyVXNlciIsIm90aGVyVXNlcklkZW50aWZpZXIiLCJnZXRJZGVudGlmaWVyIiwic2Vzc2lvbklkZW50aWZpZXIiLCJleHBpcmVkIiwiZnJvbU5vdGhpbmciLCJvcGVyYXRpb25zIiwic2Vzc2lvbkV4cGlyZWQiLCJwZW5kaW5nT3BlcmF0aW9ucyIsInVwZGF0ZVVzZXJzIiwiZ2V0VXNlciIsImdldE90aGVyVXNlcnMiLCJ0cmFuc2Zvcm1lZE9wZXJhdGlvbnMiLCJ0cmFuc2Zvcm1PcGVyYXRpb25zIiwidHJhbnNmb3JtZWRQZW5kaW5nT3BlcmF0aW9ucyIsImZvckVhY2giLCJ1cGRhdGUiLCJyZXNldCIsInNlc3Npb24iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBRUEsSUFBTUEsU0FBU0MsUUFBUSxTQUFSLENBQWY7QUFBQSxJQUFvQztBQUM5QkMsWUFBWUQsUUFBUSxXQUFSLENBRGxCOztBQUdBLElBQU1FLE9BQU9GLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDTUcsbUJBQW1CSCxRQUFRLHFCQUFSLENBRHpCOztBQUdNLElBQUVJLGNBQUYsR0FBcUJILFNBQXJCLENBQUVHLGNBQUY7QUFBQSxJQUNFQyxNQURGLEdBQ2FELGNBRGIsQ0FDRUMsTUFERjs7SUFHQUMsTztBQUNMLGtCQUFZQyxHQUFaLEVBQWlCQyxPQUFqQixFQUEwQkMsVUFBMUIsRUFBc0M7QUFBQTs7QUFDckMsT0FBS0YsR0FBTCxHQUFXQSxHQUFYO0FBQ0EsT0FBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsT0FBS0MsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQTs7OzsyQkFFUTtBQUNSLFVBQU8sS0FBS0YsR0FBWjtBQUNBOzs7K0JBRVk7QUFDWixVQUFPLEtBQUtDLE9BQVo7QUFDQTs7O2tDQUVlO0FBQ2YsVUFBTyxLQUFLQyxVQUFaO0FBQ0E7OzswQkFFT0MsYyxFQUFnQjtBQUN2QixPQUFNQyxPQUFPLEtBQUtKLEdBQUwsQ0FBU0csY0FBVCxDQUFiOztBQUVBLFVBQU9DLElBQVA7QUFDQTs7O2dDQUVhRCxjLEVBQWdCO0FBQzdCLE9BQU1FLGFBQWFDLE9BQU9DLE1BQVAsQ0FBYyxLQUFLUCxHQUFuQixDQUFuQjs7QUFFQUYsVUFBT08sVUFBUCxFQUFtQixVQUFTRyxTQUFULEVBQW9CO0FBQ3RDLFFBQU1DLHNCQUFzQkQsVUFBVUUsYUFBVixFQUE1Qjs7QUFFQSxRQUFJRCx3QkFBd0JOLGNBQTVCLEVBQTRDO0FBQzNDLFlBQU8sSUFBUDtBQUNBO0FBQ0QsSUFORDs7QUFRQSxVQUFPRSxVQUFQO0FBQ0E7Ozs2QkFFVU0saUIsRUFBbUI7QUFDN0IsT0FBTUMsVUFBVyxLQUFLVixVQUFMLEtBQW9CUyxpQkFBckM7O0FBRUEsVUFBT0MsT0FBUDtBQUNBOzs7K0JBRVk7QUFDWixPQUFNUixPQUFPVCxLQUFLa0IsV0FBTCxFQUFiO0FBQUEsT0FDR1YsaUJBQWlCQyxLQUFLTSxhQUFMLEVBRHBCOztBQUdBLFFBQUtWLEdBQUwsQ0FBU0csY0FBVCxJQUEyQkMsSUFBM0I7O0FBRUEsVUFBT0QsY0FBUDtBQUNBOzs7eUJBRU1XLFUsRUFBWVgsYyxFQUFnQlksYyxFQUFnQjtBQUNqRCxPQUFNQyxvQkFBb0JELGlCQUNHLEVBREgsR0FFSyxLQUFLRSxXQUFMLENBQWlCSCxVQUFqQixFQUE2QlgsY0FBN0IsQ0FGL0I7O0FBSUQsVUFBT2EsaUJBQVA7QUFDQTs7OzhCQUVXRixVLEVBQVlYLGMsRUFBZ0I7QUFDckMsT0FBTUMsT0FBTyxLQUFLYyxPQUFMLENBQWFmLGNBQWIsQ0FBYjtBQUFBLE9BQ01FLGFBQWEsS0FBS2MsYUFBTCxDQUFtQmhCLGNBQW5CLENBRG5CO0FBQUEsT0FFTWlCLHdCQUF3QmhCLEtBQUtpQixtQkFBTCxDQUF5QlAsVUFBekIsQ0FGOUI7QUFBQSxPQUdNUSwrQkFBK0JsQixLQUFLa0IsNEJBQUwsQ0FBa0NSLFVBQWxDLENBSHJDOztBQUtBVCxjQUFXa0IsT0FBWCxDQUFtQixVQUFTZixTQUFULEVBQW9CO0FBQ3JDQSxjQUFVZ0IsTUFBVixDQUFpQkoscUJBQWpCO0FBQ0QsSUFGRDs7QUFJQSxRQUFLbkIsT0FBTCxHQUFlTCxpQkFBaUIsS0FBS0ssT0FBdEIsRUFBK0JtQixxQkFBL0IsQ0FBZjs7QUFFQWhCLFFBQUtxQixLQUFMOztBQUVBLE9BQU1ULG9CQUFvQk0sNEJBQTFCLENBZHFDLENBY21COztBQUV4RCxVQUFPTixpQkFBUDtBQUNEOzs7Z0NBRW1CO0FBQ3BCLE9BQU1oQixNQUFNLEVBQVo7QUFBQSxPQUNHQyxVQUFVLEVBRGI7QUFBQSxPQUNpQjtBQUNkQyxnQkFBYVYsUUFGaEI7QUFBQSxPQUUyQjtBQUN4QmtDLGFBQVUsSUFBSTNCLE9BQUosQ0FBWUMsR0FBWixFQUFpQkMsT0FBakIsRUFBMEJDLFVBQTFCLENBSGI7O0FBS0EsVUFBT3dCLE9BQVA7QUFDQTs7Ozs7O0FBR0YsSUFBTUEsVUFBVTNCLFFBQVFjLFdBQVIsRUFBaEI7O0FBRUFjLE9BQU9DLE9BQVAsR0FBaUJGLE9BQWpCIiwiZmlsZSI6InNlc3Npb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCB1dWlkVjQgPSByZXF1aXJlKCd1dWlkL3Y0JyksICAvLy9cclxuICAgICAgbmVjZXNzYXJ5ID0gcmVxdWlyZSgnbmVjZXNzYXJ5Jyk7XHJcblxyXG5jb25zdCBVc2VyID0gcmVxdWlyZSgnLi91c2VyJyksXHJcbiAgICAgIHRyYW5zZm9ybUNvbnRlbnQgPSByZXF1aXJlKCcuL2NvbnRlbnQvdHJhbnNmb3JtJyk7XHJcblxyXG5jb25zdCB7IGFycmF5VXRpbGl0aWVzIH0gPSBuZWNlc3NhcnksXHJcbiAgICAgIHsgZmlsdGVyIH0gPSBhcnJheVV0aWxpdGllcztcclxuXHJcbmNsYXNzIFNlc3Npb24ge1xyXG5cdGNvbnN0cnVjdG9yKG1hcCwgY29udGVudCwgaWRlbnRpZmllcikge1xyXG5cdFx0dGhpcy5tYXAgPSBtYXA7XHJcblx0XHR0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xyXG5cdFx0dGhpcy5pZGVudGlmaWVyID0gaWRlbnRpZmllcjtcclxuXHR9XHJcblxyXG5cdGdldE1hcCgpIHtcclxuXHRcdHJldHVybiB0aGlzLm1hcDtcclxuXHR9XHJcblxyXG5cdGdldENvbnRlbnQoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5jb250ZW50O1xyXG5cdH1cclxuXHJcblx0Z2V0SWRlbnRpZmllcigpIHtcclxuXHRcdHJldHVybiB0aGlzLmlkZW50aWZpZXI7XHJcblx0fVxyXG5cclxuXHRnZXRVc2VyKHVzZXJJZGVudGlmaWVyKSB7XHJcblx0XHRjb25zdCB1c2VyID0gdGhpcy5tYXBbdXNlcklkZW50aWZpZXJdO1xyXG5cclxuXHRcdHJldHVybiB1c2VyO1xyXG5cdH1cclxuXHJcblx0Z2V0T3RoZXJVc2Vycyh1c2VySWRlbnRpZmllcikge1xyXG5cdFx0Y29uc3Qgb3RoZXJVc2VycyA9IE9iamVjdC52YWx1ZXModGhpcy5tYXApO1xyXG5cclxuXHRcdGZpbHRlcihvdGhlclVzZXJzLCBmdW5jdGlvbihvdGhlclVzZXIpIHtcclxuXHRcdFx0Y29uc3Qgb3RoZXJVc2VySWRlbnRpZmllciA9IG90aGVyVXNlci5nZXRJZGVudGlmaWVyKCk7XHJcblxyXG5cdFx0XHRpZiAob3RoZXJVc2VySWRlbnRpZmllciAhPT0gdXNlcklkZW50aWZpZXIpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIG90aGVyVXNlcnM7XHJcblx0fVxyXG5cclxuXHRoYXNFeHBpcmVkKHNlc3Npb25JZGVudGlmaWVyKSB7XHJcblx0XHRjb25zdCBleHBpcmVkID0gKHRoaXMuaWRlbnRpZmllciAhPT0gc2Vzc2lvbklkZW50aWZpZXIpO1xyXG5cclxuXHRcdHJldHVybiBleHBpcmVkO1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlVXNlcigpIHtcclxuXHRcdGNvbnN0IHVzZXIgPSBVc2VyLmZyb21Ob3RoaW5nKCksXHJcblx0XHRcdFx0XHR1c2VySWRlbnRpZmllciA9IHVzZXIuZ2V0SWRlbnRpZmllcigpO1xyXG5cclxuXHRcdHRoaXMubWFwW3VzZXJJZGVudGlmaWVyXSA9IHVzZXI7XHJcblxyXG5cdFx0cmV0dXJuIHVzZXJJZGVudGlmaWVyO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlKG9wZXJhdGlvbnMsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uRXhwaXJlZCkge1xyXG5cdCAgY29uc3QgcGVuZGluZ09wZXJhdGlvbnMgPSBzZXNzaW9uRXhwaXJlZCA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW10gOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVVc2VycyhvcGVyYXRpb25zLCB1c2VySWRlbnRpZmllcik7XHJcblxyXG5cdFx0cmV0dXJuIHBlbmRpbmdPcGVyYXRpb25zO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlVXNlcnMob3BlcmF0aW9ucywgdXNlcklkZW50aWZpZXIpIHtcclxuICAgIGNvbnN0IHVzZXIgPSB0aGlzLmdldFVzZXIodXNlcklkZW50aWZpZXIpLFxyXG4gICAgICAgICAgb3RoZXJVc2VycyA9IHRoaXMuZ2V0T3RoZXJVc2Vycyh1c2VySWRlbnRpZmllciksXHJcbiAgICAgICAgICB0cmFuc2Zvcm1lZE9wZXJhdGlvbnMgPSB1c2VyLnRyYW5zZm9ybU9wZXJhdGlvbnMob3BlcmF0aW9ucyksXHJcbiAgICAgICAgICB0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zID0gdXNlci50cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zKG9wZXJhdGlvbnMpO1xyXG5cclxuICAgIG90aGVyVXNlcnMuZm9yRWFjaChmdW5jdGlvbihvdGhlclVzZXIpIHtcclxuICAgICAgb3RoZXJVc2VyLnVwZGF0ZSh0cmFuc2Zvcm1lZE9wZXJhdGlvbnMpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5jb250ZW50ID0gdHJhbnNmb3JtQ29udGVudCh0aGlzLmNvbnRlbnQsIHRyYW5zZm9ybWVkT3BlcmF0aW9ucyk7XHJcblxyXG4gICAgdXNlci5yZXNldCgpO1xyXG5cclxuICAgIGNvbnN0IHBlbmRpbmdPcGVyYXRpb25zID0gdHJhbnNmb3JtZWRQZW5kaW5nT3BlcmF0aW9uczsgLy8vXHJcblxyXG4gICAgcmV0dXJuIHBlbmRpbmdPcGVyYXRpb25zO1xyXG4gIH1cclxuXHJcblx0c3RhdGljIGZyb21Ob3RoaW5nKCkge1xyXG5cdFx0Y29uc3QgbWFwID0ge30sXHJcblx0XHRcdFx0XHRjb250ZW50ID0gJycsXHQvLy9cclxuXHRcdFx0XHRcdGlkZW50aWZpZXIgPSB1dWlkVjQoKSwgIC8vL1xyXG5cdFx0XHRcdFx0c2Vzc2lvbiA9IG5ldyBTZXNzaW9uKG1hcCwgY29udGVudCwgaWRlbnRpZmllcik7XHJcblxyXG5cdFx0cmV0dXJuIHNlc3Npb247XHJcblx0fVxyXG59XHJcblxyXG5jb25zdCBzZXNzaW9uID0gU2Vzc2lvbi5mcm9tTm90aGluZygpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBzZXNzaW9uO1xyXG4iXX0=