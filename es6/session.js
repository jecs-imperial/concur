"use strict";

const uuidV4 = require("uuid/v4"),  ///
      necessary = require("necessary");

const User = require("./user"),
      transformContent = require("./content/transform");

const { arrayUtilities } = necessary,
      { filter } = arrayUtilities;

class Session {
	constructor(map, content, identifier) {
		this.map = map;
		this.content = content;
		this.identifier = identifier;
	}

	getMap() {
		return this.map;
	}

	getContent() {
		return this.content;
	}

	getIdentifier() {
		return this.identifier;
	}

	getUser(userIdentifier) {
		const user = this.map[userIdentifier];

		return user;
	}

	getOtherUsers(userIdentifier) {
		const otherUsers = Object.values(this.map);

		filter(otherUsers, function(otherUser) {
			const otherUserIdentifier = otherUser.getIdentifier();

			if (otherUserIdentifier !== userIdentifier) {
				return true;
			}
		});

		return otherUsers;
	}

	hasExpired(sessionIdentifier) {
		const expired = (this.identifier !== sessionIdentifier);

		return expired;
	}

	createUser() {
		const user = User.fromNothing(),
					userIdentifier = user.getIdentifier();

		this.map[userIdentifier] = user;

		return userIdentifier;
	}

	update(operations, userIdentifier, sessionExpired) {
	  const pendingOperations = sessionExpired ?
                                [] :
                                  this.updateUsers(operations, userIdentifier);

		return pendingOperations;
	}

	updateUsers(operations, userIdentifier) {
    const user = this.getUser(userIdentifier),
          otherUsers = this.getOtherUsers(userIdentifier),
          transformedOperations = user.transformOperations(operations),
          transformedPendingOperations = user.transformedPendingOperations(operations);

    otherUsers.forEach(function(otherUser) {
      otherUser.update(transformedOperations);
    });

    this.content = transformContent(this.content, transformedOperations);

    user.reset();

    const pendingOperations = transformedPendingOperations; ///

    return pendingOperations;
  }

	static fromNothing() {
		const map = {},
					content = "",	///
					identifier = uuidV4(),  ///
					session = new Session(map, content, identifier);

		return session;
	}
}

const session = Session.fromNothing();

module.exports = session;
