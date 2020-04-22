(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _client = _interopRequireDefault(require("./client"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Agent = /*#__PURE__*/function () {
  function Agent(client, busy, document, userIdentifier, sessionIdentifier, intervalIdentifier) {
    _classCallCheck(this, Agent);

    this.busy = busy;
    this.client = client;
    this.document = document;
    this.userIdentifier = userIdentifier;
    this.sessionIdentifier = sessionIdentifier;
    this.intervalIdentifier = intervalIdentifier;
  }

  _createClass(Agent, [{
    key: "initialise",
    value: function initialise(callback) {
      var _this = this;

      this.client.initialise(function (content, userIdentifier, sessionIdentifier) {
        _this.userIdentifier = userIdentifier;
        _this.sessionIdentifier = sessionIdentifier;

        _this.startUpdates();

        callback(content);
      });
    }
  }, {
    key: "setDocument",
    value: function setDocument(document) {
      this.document = document;
    }
  }, {
    key: "startUpdates",
    value: function startUpdates() {
      var _this2 = this;

      this.resetUpdates();
      var interval = _constants.UPDATE_INTERVAL;
      this.intervalIdentifier = setInterval(function () {
        return _this2.update();
      }, interval);
    }
  }, {
    key: "stopUpdates",
    value: function stopUpdates() {
      this.resetUpdates();
    }
  }, {
    key: "resetUpdates",
    value: function resetUpdates() {
      if (this.intervalIdentifier !== null) {
        clearInterval(this.intervalIdentifier);
        this.intervalIdentifier = null;
      }
    }
  }, {
    key: "update",
    value: function update() {
      var _this3 = this;

      if (this.busy) {
        return;
      }

      var workingContent = this.document.getWorkingContent(),
          editableContent = this.document.getEditableContent();
      this.busy = true;
      var success = this.client.updateDocument(this.userIdentifier, this.sessionIdentifier, workingContent, editableContent, function (sessionExpired, pendingOperations) {
        if (sessionExpired) {
          alert("The session has expired. Please refresh!");
          return;
        }

        _this3.document.update(pendingOperations);

        _this3.busy = false;
      });

      if (success) {
        this.document.synchroniseWorkingContent();
      } else {
        this.busy = false;
      }
    }
  }], [{
    key: "fromNothing",
    value: function fromNothing() {
      var client = _client["default"].fromNothing(),
          busy = false,
          document = null,
          ///
      userIdentifier = null,
          ///
      sessionIdentifier = null,
          ///
      intervalIdentifier = null,
          ///
      agent = new Agent(client, busy, document, userIdentifier, sessionIdentifier, intervalIdentifier);

      return agent;
    }
  }]);

  return Agent;
}();

exports["default"] = Agent;

},{"./client":2,"./constants":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sufficient = require("sufficient");

var _update = _interopRequireDefault(require("./task/update"));

var _initialise = _interopRequireDefault(require("./task/initialise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Client = /*#__PURE__*/function () {
  function Client(scheduler) {
    _classCallCheck(this, Client);

    this.scheduler = scheduler;
  }

  _createClass(Client, [{
    key: "updateDocument",
    value: function updateDocument(userIdentifier, sessionIdentifier, workingContent, editableContent, callback) {
      var updateTask = new _update["default"](userIdentifier, sessionIdentifier, workingContent, editableContent, callback);
      var success = this.scheduler.executeTaskImmediately(updateTask);
      return success;
    }
  }, {
    key: "initialise",
    value: function initialise(callback) {
      var initialiseTask = new _initialise["default"](callback);
      this.scheduler.addTaskToQueue(initialiseTask);
    }
  }], [{
    key: "fromNothing",
    value: function fromNothing() {
      var scheduler = _sufficient.Scheduler.fromNothing(),
          client = new Client(scheduler);

      return client;
    }
  }]);

  return Client;
}();

exports["default"] = Client;

},{"./task/initialise":21,"./task/update":22,"sufficient":71}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UPDATE_INTERVAL = void 0;
var UPDATE_INTERVAL = 1000;
exports.UPDATE_INTERVAL = UPDATE_INTERVAL;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = transformContent;

function transformContent(content, operations) {
  return operations.reduce(function (content, operation) {
    return operation.transformContent(content);
  }, content);
}

},{}],5:[function(require,module,exports){
"use strict";

require("juxtapose");

var _easy = require("easy");

var _agent = _interopRequireDefault(require("./agent"));

var _document = _interopRequireDefault(require("./example/document"));

var _editableContentTextarea = _interopRequireDefault(require("./example/editableContentTextarea"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var agent = _agent["default"].fromNothing();

agent.initialise(function (content) {
  var body = new _easy.Body(),
      editableContent = content,
      ///
  editableContentTextarea = /*#__PURE__*/React.createElement(_editableContentTextarea["default"], {
    onKeyUp: function onKeyUp() {
      agent.update();
    }
  }, editableContent),
      document = _document["default"].fromEditableContentTextarea(editableContentTextarea);

  agent.setDocument(document);
  body.append( /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h1", null, "Concur Example"), editableContentTextarea));
});

},{"./agent":1,"./example/document":6,"./example/editableContentTextarea":7,"easy":26,"juxtapose":54}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _transform = _interopRequireDefault(require("../content/transform"));

var _generate = _interopRequireDefault(require("../operations/generate"));

var _transform2 = _interopRequireDefault(require("../operations/transform"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Document = /*#__PURE__*/function () {
  function Document(workingContent, editableContentTextarea) {
    _classCallCheck(this, Document);

    this.workingContent = workingContent;
    this.editableContentTextarea = editableContentTextarea;
  }

  _createClass(Document, [{
    key: "getWorkingContent",
    value: function getWorkingContent() {
      return this.workingContent;
    }
  }, {
    key: "getEditableContent",
    value: function getEditableContent() {
      return this.editableContentTextarea.getEditableContent();
    }
  }, {
    key: "setEditableContent",
    value: function setEditableContent(editableContent) {
      this.editableContentTextarea.setEditableContent(editableContent);
    }
  }, {
    key: "synchroniseWorkingContent",
    value: function synchroniseWorkingContent() {
      var editableContent = this.getEditableContent(),
          workingContent = editableContent; ///

      this.workingContent = workingContent;
    }
  }, {
    key: "update",
    value: function update(pendingOperations) {
      var editableContent = this.getEditableContent();
      var operations = this.generateOperations(),
          transformedPendingOperations = (0, _transform2["default"])(pendingOperations, operations),
          transformedEditableContent = (0, _transform["default"])(editableContent, transformedPendingOperations),
          transformedWorkingContent = (0, _transform["default"])(this.workingContent, pendingOperations);
      editableContent = transformedEditableContent; ///

      this.setEditableContent(editableContent);
      this.workingContent = transformedWorkingContent; ///

      var upToDate = editableContent === this.workingContent;
      return upToDate;
    }
  }, {
    key: "generateOperations",
    value: function generateOperations() {
      var editableContent = this.getEditableContent(),
          operations = (0, _generate["default"])(this.workingContent, editableContent);
      return operations;
    }
  }], [{
    key: "fromEditableContentTextarea",
    value: function fromEditableContentTextarea(editableContentTextarea) {
      var editableContent = editableContentTextarea.getEditableContent(),
          workingContent = editableContent,
          ///
      document = new Document(workingContent, editableContentTextarea);
      return document;
    }
  }]);

  return Document;
}();

exports["default"] = Document;

},{"../content/transform":4,"../operations/generate":12,"../operations/transform":14}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _easy = require("easy");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EditableContentTextarea = /*#__PURE__*/function (_InputElement) {
  _inherits(EditableContentTextarea, _InputElement);

  var _super = _createSuper(EditableContentTextarea);

  function EditableContentTextarea() {
    _classCallCheck(this, EditableContentTextarea);

    return _super.apply(this, arguments);
  }

  _createClass(EditableContentTextarea, [{
    key: "setEditableContent",
    value: function setEditableContent(editableContent) {
      var value = editableContent; ///

      this.setValue(value);
    }
  }, {
    key: "getEditableContent",
    value: function getEditableContent() {
      var value = this.getValue(),
          editableContent = value; ///

      return editableContent;
    }
  }], [{
    key: "fromProperties",
    value: function fromProperties(properties) {
      return _easy.InputElement.fromProperties(EditableContentTextarea, properties);
    }
  }]);

  return EditableContentTextarea;
}(_easy.InputElement);

exports["default"] = EditableContentTextarea;

_defineProperty(EditableContentTextarea, "tagName", "textarea");

_defineProperty(EditableContentTextarea, "defaultProperties", {
  className: "editable content",
  spellCheck: false
});

},{"easy":26}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _empty = _interopRequireDefault(require("../operation/empty"));

var _types = require("../types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DeleteOperation = /*#__PURE__*/function () {
  function DeleteOperation(type, length, position) {
    _classCallCheck(this, DeleteOperation);

    this.type = type;
    this.length = length;
    this.position = position;
  }

  _createClass(DeleteOperation, [{
    key: "clone",
    value: function clone() {
      return DeleteOperation.fromLengthAndPosition(this.length, this.position);
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var json = {
        "type": this.type,
        "length": this.length,
        "position": this.position
      };
      return json;
    }
  }, {
    key: "transformOperation",
    value: function transformOperation(operation) {
      switch (operation.type) {
        case "insert":
          return function (tau, rho) {
            if (tau.position <= rho.position) {
              return [tau.clone()];
            }

            if (tau.position > rho.position) {
              if (tau.position < rho.length + rho.position) {
                return [tau.left(rho).shift(tau)];
              }

              if (tau.position >= rho.length + rho.position) {
                return [rho.shift(tau)];
              }
            }
          }(operation, this);

        case "delete":
          return function (tau, rho) {
            if (tau.position < rho.position) {
              if (tau.length + tau.position <= rho.position) {
                return [tau.clone()];
              }

              if (tau.length + tau.position <= rho.length + rho.position) {
                return [rho.takenFrom(tau)];
              }

              if (tau.length + tau.position > rho.length + rho.position) {
                return [rho.split(tau)];
              }
            }

            if (tau.position === rho.position) {
              if (tau.length + tau.position <= rho.length + rho.position) {
                return [_empty["default"].fromNothing()];
              }

              if (tau.length + tau.position > rho.length + rho.position) {
                return [rho.shift(rho.takenFrom(tau))];
              }
            }

            if (tau.position >= rho.length + rho.position) {
              return [rho.shift(tau)];
            }

            if (tau.position > rho.position) {
              if (tau.length + tau.position <= rho.length + rho.position) {
                return [_empty["default"].fromNothing()];
              }

              if (tau.length + tau.position > rho.length + rho.position) {
                return [rho.shift(rho.takenFrom(tau))];
              }
            }
          }(operation, this);

        case "empty":
          return function (tau, rho) {
            return [tau.clone()];
          }(operation, this);
      }
    }
  }, {
    key: "transformContent",
    value: function transformContent(content) {
      return content.substring(0, this.position) + content.substring(this.length + this.position);
    }
  }, {
    key: "transformSelection",
    value: function transformSelection(selection) {
      var transformedSelection;
      var length = this.length,
          ///
      startPosition = this.position,
          ///
      endPosition = startPosition + length,
          selectionStartPosition = selection.getStartPosition(),
          selectionEndPosition = selection.getEndPosition();
      var offset, endOffset;

      if (false) {} else if (selectionStartPosition >= endPosition) {
        offset = -length;
        transformedSelection = selection.shifted(offset);
      } else if (selectionStartPosition >= startPosition) {
        if (selectionEndPosition > endPosition) {
          offset = startPosition - selectionStartPosition;
          endOffset = selectionStartPosition - endPosition;
          transformedSelection = selection.shifted(offset).endPositionShifted(endOffset);
        } else {
          var Selection = selection.constructor; ///

          transformedSelection = new Selection(startPosition, startPosition);
        }
      } else if (selectionEndPosition > endPosition) {
        endOffset = -length;
        transformedSelection = selection.endPositionShifted(endOffset);
      } else if (selectionEndPosition > startPosition) {
        endOffset = startPosition - selectionEndPosition;
        transformedSelection = selection.endPositionShifted(endOffset);
      } else {
        transformedSelection = selection.clone();
      }

      return transformedSelection;
    }
  }, {
    key: "shifted",
    value: function shifted(offset) {
      var length = this.length,
          position = this.position + offset,
          deleteOperation = DeleteOperation.fromLengthAndPosition(length, position);
      return deleteOperation;
    }
  }, {
    key: "shift",
    value: function shift(operation) {
      var offset = -this.length,
          shiftedOperation = operation.shifted(offset);
      return shiftedOperation;
    }
  }, {
    key: "takenFrom",
    value: function takenFrom(deleteOperation) {
      var length = deleteOperation.length,
          position = deleteOperation.position;

      if (this.position > position && this.length + this.position >= length + position) {
        length = this.position - position;
        deleteOperation = DeleteOperation.fromLengthAndPosition(length, position);
      }

      if (this.position <= position && this.length + this.position < length + position) {
        length = length + position - this.position - this.length;
        position = this.length + this.position;
        deleteOperation = DeleteOperation.fromLengthAndPosition(length, position);
      }

      return deleteOperation;
    }
  }, {
    key: "split",
    value: function split(deleteOperation) {
      var length = deleteOperation.length,
          position = deleteOperation.position;
      length = length - this.length;
      deleteOperation = DeleteOperation.fromLengthAndPosition(length, position);
      return deleteOperation;
    }
  }], [{
    key: "fromLengthAndPosition",
    value: function fromLengthAndPosition(length, position) {
      var type = _types.deleteType,
          ///
      deleteOperation = new DeleteOperation(type, length, position);
      return deleteOperation;
    }
  }, {
    key: "fromJSON",
    value: function fromJSON(json) {
      var type = json["type"],
          length = json["length"],
          position = json["position"],
          deleteOperation = new DeleteOperation(type, length, position);
      return deleteOperation;
    }
  }]);

  return DeleteOperation;
}();

exports["default"] = DeleteOperation;

},{"../operation/empty":9,"../types":23}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _types = require("../types");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EmptyOperation = /*#__PURE__*/function () {
  function EmptyOperation(type) {
    _classCallCheck(this, EmptyOperation);

    this.type = type;
  }

  _createClass(EmptyOperation, [{
    key: "clone",
    value: function clone() {
      return EmptyOperation.fromNothing();
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var json = {
        "type": this.type
      };
      return json;
    }
  }, {
    key: "transformOperation",
    value: function transformOperation(operation) {
      return function (tau, rho) {
        return [tau.clone()];
      }(operation, this);
    }
  }, {
    key: "transformContent",
    value: function transformContent(content) {
      return content;
    }
  }, {
    key: "transformSelection",
    value: function transformSelection(selection) {
      var transformedSelection = selection.clone();
      return transformedSelection;
    }
  }, {
    key: "shift",
    value: function shift(operation) {
      var offset = 0,
          shiftedOperation = operation.shifted(offset);
      return shiftedOperation;
    }
  }], [{
    key: "fromNothing",
    value: function fromNothing() {
      var type = _types.emptyType,
          ///
      emptyOperation = new EmptyOperation(type);
      return emptyOperation;
    }
  }, {
    key: "fromJSON",
    value: function fromJSON(json) {
      var type = json["type"],
          emptyOperation = new EmptyOperation(type);
      return emptyOperation;
    }
  }]);

  return EmptyOperation;
}();

exports["default"] = EmptyOperation;

},{"../types":23}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _stringCompare = _interopRequireDefault(require("../stringCompare"));

var _delete = _interopRequireDefault(require("../operation/delete"));

var _types = require("../types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var InsertOperation = /*#__PURE__*/function () {
  function InsertOperation(type, string, position) {
    _classCallCheck(this, InsertOperation);

    this.type = type;
    this.string = string;
    this.position = position;
  }

  _createClass(InsertOperation, [{
    key: "clone",
    value: function clone() {
      return InsertOperation.fromStringAndPosition(this.string, this.position);
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var json = {
        "type": this.type,
        "string": this.string,
        "position": this.position
      };
      return json;
    }
  }, {
    key: "transformOperation",
    value: function transformOperation(operation) {
      switch (operation.type) {
        case "insert":
          return function (tau, rho) {
            if (tau.position < rho.position) {
              return [tau.clone()];
            }

            if (tau.position === rho.position) {
              if (tau.string === rho.string) {
                return [tau.clone()];
              }

              if (tau.string !== rho.string) {
                if ((0, _stringCompare["default"])(rho.string, tau.string)) {
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

        case "delete":
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

        case "empty":
          return function (tau, rho) {
            return [tau.clone()];
          }(operation, this);
      }
    }
  }, {
    key: "transformContent",
    value: function transformContent(content) {
      return content.substring(0, this.position) + this.string + content.substring(this.position);
    }
  }, {
    key: "transformSelection",
    value: function transformSelection(selection) {
      var transformedSelection;
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
    key: "shifted",
    value: function shifted(offset) {
      var string = this.string,
          position = this.position + offset,
          insertOperation = InsertOperation.fromStringAndPosition(string, position);
      return insertOperation;
    }
  }, {
    key: "shift",
    value: function shift(operation) {
      var length = this.string.length,
          offset = length,
          ///
      shiftedOperation = operation.shifted(offset);
      return shiftedOperation;
    }
  }, {
    key: "left",
    value: function left(deleteOperation) {
      var position = deleteOperation.position,
          length = this.position - position;
      deleteOperation = _delete["default"].fromLengthAndPosition(length, position);
      return deleteOperation;
    }
  }, {
    key: "right",
    value: function right(deleteOperation) {
      var length = deleteOperation.length,
          position = deleteOperation.position;
      length = length - this.position + position;
      position = this.position;
      deleteOperation = _delete["default"].fromLengthAndPosition(length, position);
      return deleteOperation;
    }
  }], [{
    key: "fromStringAndPosition",
    value: function fromStringAndPosition(string, position) {
      var type = _types.insertType,
          ///
      insertOperation = new InsertOperation(type, string, position);
      return insertOperation;
    }
  }, {
    key: "fromJSON",
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

exports["default"] = InsertOperation;

},{"../operation/delete":8,"../stringCompare":20,"../types":23}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = operationsFromJSON;

var _empty = _interopRequireDefault(require("../operation/empty"));

var _delete = _interopRequireDefault(require("../operation/delete"));

var _insert = _interopRequireDefault(require("../operation/insert"));

var _types = require("../types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function operationsFromJSON(operationsJSON) {
  var operations = operationsJSON.map(function (operationJSON) {
    var operation;
    var json = operationJSON,
        ///
    type = json["type"];

    switch (type) {
      case _types.emptyType:
        operation = _empty["default"].fromJSON(json);
        break;

      case _types.deleteType:
        operation = _delete["default"].fromJSON(json);
        break;

      case _types.insertType:
        operation = _insert["default"].fromJSON(json);
        break;
    }

    return operation;
  });
  return operations;
}

},{"../operation/delete":8,"../operation/empty":9,"../operation/insert":10,"../types":23}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateOperations;

var _insert = _interopRequireDefault(require("../operation/insert"));

var _delete = _interopRequireDefault(require("../operation/delete"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function generateOperations(workingContent, editableContent) {
  var operations = [];
  var left, right, length, string, position;

  for (left = 0; left < workingContent.length && left < editableContent.length && workingContent[left] === editableContent[left]; left++) {}

  for (right = 0; right < workingContent.length - left && right < editableContent.length - left && workingContent[workingContent.length - right - 1] === editableContent[editableContent.length - right - 1]; right++) {}

  if (left + right !== workingContent.length) {
    length = workingContent.length - left - right; ///

    position = left; ///

    var deleteOperation = _delete["default"].fromLengthAndPosition(length, position);

    operations.push(deleteOperation);
  }

  if (left + right !== editableContent.length) {
    string = editableContent.substring(left, editableContent.length - right); ///

    position = left; ///

    var insertOperation = _insert["default"].fromStringAndPosition(string, position);

    operations.push(insertOperation);
  }

  return operations;
}

},{"../operation/delete":8,"../operation/insert":10}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = operationsToJSON;

function operationsToJSON(operations) {
  return operations.map(function (operation) {
    return operation.toJSON();
  });
}

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = transformOperations;

var _necessary = require("necessary");

var first = _necessary.arrayUtilities.first,
    tail = _necessary.arrayUtilities.tail;

function transformOperations(tau, rho) {
  if (tau.length === 0 || rho.length === 0) {
    return tau;
  }

  var tau1 = [first(tau)],
      tau2 = tail(tau),
      rho1 = [first(rho)],
      rho2 = tail(rho);

  if (tau.length > 1 && rho.length > 1) {
    return transformOperations(transformOperations(tau1, rho1), rho2).concat(transformOperations(transformOperations(tau2, transformOperations(rho1, tau1)), transformOperations(rho2, transformOperations(tau1, rho1))));
  } else if (tau.length > 1 && rho.length === 1) {
    return transformOperations(tau1, rho).concat(transformOperations(tau2, transformOperations(rho, tau1)));
  } else if (tau.length === 1 && rho.length > 1) {
    return transformOperations(transformOperations(tau, rho1), rho2);
  } else {
    tau = first(tau); ///

    rho = first(rho); ///

    return rho.transformOperation(tau);
  }
}

},{"necessary":57}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePost = updatePost;
exports.initialisePost = initialisePost;

var _necessary = require("necessary");

var _uris = require("./uris");

var post = _necessary.miscellaneousUtilities.post;
var host = ""; ///

function updatePost(json, callback) {
  post(host, _uris.UPDATE_URI, json, callback);
}

function initialisePost(json, callback) {
  post(host, _uris.INITIALISE_URI, json, callback);
}

},{"./uris":24,"necessary":57}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var InitialiseRequest = /*#__PURE__*/function () {
  function InitialiseRequest() {
    _classCallCheck(this, InitialiseRequest);
  }

  _createClass(InitialiseRequest, [{
    key: "toJSON",
    value: function toJSON() {
      var json = {}; ///

      return json;
    }
  }], [{
    key: "fromNothing",
    value: function fromNothing() {
      var initialiseRequest = new InitialiseRequest();
      return initialiseRequest;
    }
  }]);

  return InitialiseRequest;
}();

exports["default"] = InitialiseRequest;

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toJSON = _interopRequireDefault(require("../operations/toJSON"));

var _fromJSON = _interopRequireDefault(require("../operations/fromJSON"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UpdateRequest = /*#__PURE__*/function () {
  function UpdateRequest(operations, userIdentifier, sessionIdentifier) {
    _classCallCheck(this, UpdateRequest);

    this.operations = operations;
    this.userIdentifier = userIdentifier;
    this.sessionIdentifier = sessionIdentifier;
  }

  _createClass(UpdateRequest, [{
    key: "getOperations",
    value: function getOperations() {
      return this.operations;
    }
  }, {
    key: "getUserIdentifier",
    value: function getUserIdentifier() {
      return this.userIdentifier;
    }
  }, {
    key: "getSessionIdentifier",
    value: function getSessionIdentifier() {
      return this.sessionIdentifier;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var operationsJSON = (0, _toJSON["default"])(this.operations),
          operations = operationsJSON,
          ///
      json = {
        "operations": operations,
        "userIdentifier": this.userIdentifier,
        "sessionIdentifier": this.sessionIdentifier
      };
      return json;
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(json) {
      var operationsJSON = json["operations"],
          userIdentifierJSON = json["userIdentifier"],
          sessionIdentifierJSON = json["sessionIdentifier"],
          operations = (0, _fromJSON["default"])(operationsJSON),
          userIdentifier = userIdentifierJSON,
          ///
      sessionIdentifier = sessionIdentifierJSON,
          ///
      updateRequest = new UpdateRequest(operations, userIdentifier, sessionIdentifier);
      return updateRequest;
    }
  }, {
    key: "fromOperationsUserIdentifierAndSessionIdentifier",
    value: function fromOperationsUserIdentifierAndSessionIdentifier(operations, userIdentifier, sessionIdentifier) {
      var updateRequest = new UpdateRequest(operations, userIdentifier, sessionIdentifier);
      return updateRequest;
    }
  }]);

  return UpdateRequest;
}();

exports["default"] = UpdateRequest;

},{"../operations/fromJSON":11,"../operations/toJSON":13}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var InitialiseResponse = /*#__PURE__*/function () {
  function InitialiseResponse(content, userIdentifier, sessionIdentifier) {
    _classCallCheck(this, InitialiseResponse);

    this.content = content;
    this.userIdentifier = userIdentifier;
    this.sessionIdentifier = sessionIdentifier;
  }

  _createClass(InitialiseResponse, [{
    key: "getContent",
    value: function getContent() {
      return this.content;
    }
  }, {
    key: "getUserIdentifier",
    value: function getUserIdentifier() {
      return this.userIdentifier;
    }
  }, {
    key: "getSessionIdentifier",
    value: function getSessionIdentifier() {
      return this.sessionIdentifier;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var json = {
        "content": this.content,
        "userIdentifier": this.userIdentifier,
        "sessionIdentifier": this.sessionIdentifier
      };
      return json;
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(json) {
      var contentJSON = json["content"],
          userIdentifierJSON = json["userIdentifier"],
          sessionIdentifierJSON = json["sessionIdentifier"],
          content = contentJSON,
          ///
      userIdentifier = userIdentifierJSON,
          ///
      sessionIdentifier = sessionIdentifierJSON,
          ///
      initialiseResponse = new InitialiseResponse(content, userIdentifier, sessionIdentifier);
      return initialiseResponse;
    }
  }, {
    key: "fromContentUserIdentifierAndSessionIdentifier",
    value: function fromContentUserIdentifierAndSessionIdentifier(content, userIdentifier, sessionIdentifier) {
      var initialiseResponse = new InitialiseResponse(content, userIdentifier, sessionIdentifier);
      return initialiseResponse;
    }
  }]);

  return InitialiseResponse;
}();

exports["default"] = InitialiseResponse;

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toJSON = _interopRequireDefault(require("../operations/toJSON"));

var _fromJSON = _interopRequireDefault(require("../operations/fromJSON"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UpdateResponse = /*#__PURE__*/function () {
  function UpdateResponse(sessionExpired, pendingOperations) {
    _classCallCheck(this, UpdateResponse);

    this.sessionExpired = sessionExpired;
    this.pendingOperations = pendingOperations;
  }

  _createClass(UpdateResponse, [{
    key: "getSessionExpired",
    value: function getSessionExpired() {
      return this.sessionExpired;
    }
  }, {
    key: "getPendingOperations",
    value: function getPendingOperations() {
      return this.pendingOperations;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var pendingOperationsJSON = (0, _toJSON["default"])(this.pendingOperations),
          pendingOperations = pendingOperationsJSON,
          ///
      json = {
        "sessionExpired": this.sessionExpired,
        "pendingOperations": pendingOperations
      };
      return json;
    }
  }], [{
    key: "fromJSON",
    value: function fromJSON(json) {
      var sessionExpiredJSON = json["sessionExpired"],
          pendingOperationsJSON = json["pendingOperations"],
          sessionExpired = sessionExpiredJSON,
          ///
      pendingOperations = (0, _fromJSON["default"])(pendingOperationsJSON),
          updateResponse = new UpdateResponse(sessionExpired, pendingOperations);
      return updateResponse;
    }
  }, {
    key: "fromSessionExpiredAndPendingOperations",
    value: function fromSessionExpiredAndPendingOperations(sessionExpired, pendingOperations) {
      var updateResponse = new UpdateResponse(sessionExpired, pendingOperations);
      return updateResponse;
    }
  }]);

  return UpdateResponse;
}();

exports["default"] = UpdateResponse;

},{"../operations/fromJSON":11,"../operations/toJSON":13}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = stringCompare;

function stringCompare(stringA, stringB) {
  if (stringA === "" && stringB === "") {
    return false;
  }

  if (stringA === "") {
    return true;
  }

  if (stringB === "") {
    return false;
  }

  var codePointA = stringA.codePointAt(0),
      codePointB = stringB.codePointAt(0);

  if (codePointA < codePointB) {
    return true;
  }

  if (codePointA > codePointB) {
    return false;
  }

  var subStringA = stringA.substring(1),
      subStringB = stringB.substring(1);
  return stringCompare(subStringA, subStringB);
}

},{}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sufficient = require("sufficient");

var _initialise = _interopRequireDefault(require("../request/initialise"));

var _initialise2 = _interopRequireDefault(require("../response/initialise"));

var _poster = require("../poster");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var InitialiseTask = /*#__PURE__*/function (_AsynchronousTask) {
  _inherits(InitialiseTask, _AsynchronousTask);

  var _super = _createSuper(InitialiseTask);

  function InitialiseTask(callback) {
    _classCallCheck(this, InitialiseTask);

    return _super.call(this, asynchronousMethod, callback);
  }

  return InitialiseTask;
}(_sufficient.AsynchronousTask);

exports["default"] = InitialiseTask;

function asynchronousMethod(callback) {
  var initialiseRequest = _initialise["default"].fromNothing(),
      json = initialiseRequest.toJSON();

  (0, _poster.initialisePost)(json, function (json) {
    var initialiseResponse = _initialise2["default"].fromJSON(json),
        content = initialiseResponse.getContent(),
        userIdentifier = initialiseResponse.getUserIdentifier(),
        sessionIdentifier = initialiseResponse.getSessionIdentifier();

    callback(content, userIdentifier, sessionIdentifier);
  });
}

},{"../poster":15,"../request/initialise":16,"../response/initialise":18,"sufficient":71}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sufficient = require("sufficient");

var _update = _interopRequireDefault(require("../request/update"));

var _update2 = _interopRequireDefault(require("../response/update"));

var _generate = _interopRequireDefault(require("../operations/generate"));

var _poster = require("../poster");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var UpdateTask = /*#__PURE__*/function (_AsynchronousTask) {
  _inherits(UpdateTask, _AsynchronousTask);

  var _super = _createSuper(UpdateTask);

  function UpdateTask(userIdentifier, sessionIdentifier, workingContent, editableContent, callback) {
    _classCallCheck(this, UpdateTask);

    return _super.call(this, asynchronousMethod, userIdentifier, sessionIdentifier, workingContent, editableContent, callback);
  }

  return UpdateTask;
}(_sufficient.AsynchronousTask);

exports["default"] = UpdateTask;

function asynchronousMethod(userIdentifier, sessionIdentifier, workingContent, editableContent, callback) {
  var operations = (0, _generate["default"])(workingContent, editableContent),
      updateRequest = _update["default"].fromOperationsUserIdentifierAndSessionIdentifier(operations, userIdentifier, sessionIdentifier),
      json = updateRequest.toJSON();

  (0, _poster.updatePost)(json, function (json) {
    var updateResponse = _update2["default"].fromJSON(json),
        sessionExpired = updateResponse.getSessionExpired(),
        pendingOperations = updateResponse.getPendingOperations();

    callback(sessionExpired, pendingOperations);
  });
}

},{"../operations/generate":12,"../poster":15,"../request/update":17,"../response/update":19,"sufficient":71}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertType = exports.deleteType = exports.emptyType = void 0;
var emptyType = "empty";
exports.emptyType = emptyType;
var deleteType = "delete";
exports.deleteType = deleteType;
var insertType = "insert";
exports.insertType = insertType;

},{}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INITIALISE_URI = exports.UPDATE_URI = void 0;
var UPDATE_URI = "/UPDATE";
exports.UPDATE_URI = UPDATE_URI;
var INITIALISE_URI = "/INITIALISE";
exports.INITIALISE_URI = INITIALISE_URI;

},{}],25:[function(require,module,exports){

},{}],26:[function(require,module,exports){
'use strict';

module.exports = {
  window: require('./lib/window'),
  document: require('./lib/document'),
  Div: require('./lib/element/div'),
  Span: require('./lib/element/span'),
  Body: require('./lib/element/body'),
  Link: require('./lib/element/link'),
  Select: require('./lib/element/select'),
  Button: require('./lib/element/button'),
  Checkbox: require('./lib/element/checkbox'),
  Element: require('./lib/element'),
  TextElement: require('./lib/textElement'),
  Input: require('./lib/inputElement/input'),
  Textarea: require('./lib/inputElement/textarea'),
  InputElement: require('./lib/inputElement'),
  Bounds: require('./lib/miscellaneous/bounds'),
  Offset: require('./lib/miscellaneous/offset'),
  React: require('./lib/react')
};

},{"./lib/document":27,"./lib/element":28,"./lib/element/body":29,"./lib/element/button":30,"./lib/element/checkbox":31,"./lib/element/div":32,"./lib/element/link":33,"./lib/element/select":34,"./lib/element/span":35,"./lib/inputElement":36,"./lib/inputElement/input":37,"./lib/inputElement/textarea":38,"./lib/miscellaneous/bounds":39,"./lib/miscellaneous/offset":40,"./lib/react":48,"./lib/textElement":49,"./lib/window":53}],27:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var keyMixins = require('./mixins/key'),
    eventMixins = require('./mixins/event'),
    clickMixins = require('./mixins/click'),
    mouseMixins = require('./mixins/mouse');

var Document = function Document() {
  _classCallCheck(this, Document);

  this.domElement = document; ///
};

Object.assign(Document.prototype, keyMixins);
Object.assign(Document.prototype, eventMixins);
Object.assign(Document.prototype, clickMixins);
Object.assign(Document.prototype, mouseMixins);

module.exports = new Document(); ///

},{"./mixins/click":41,"./mixins/event":42,"./mixins/key":44,"./mixins/mouse":45}],28:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var jsxMixins = require('./mixins/jsx'),
    keyMixins = require('./mixins/key'),
    mouseMixins = require('./mixins/mouse'),
    eventMixins = require('./mixins/event'),
    clickMixins = require('./mixins/click'),
    scrollMixins = require('./mixins/scroll'),
    resizeMixins = require('./mixins/resize'),
    Offset = require('./miscellaneous/offset'),
    Bounds = require('./miscellaneous/bounds'),
    domUtilities = require('./utilities/dom'),
    arrayUtilities = require('./utilities/array'),
    objectUtilities = require('./utilities/object');

var combine = objectUtilities.combine,
    first = arrayUtilities.first,
    augment = arrayUtilities.augment,
    domNodeMatchesSelector = domUtilities.domNodeMatchesSelector,
    domElementFromSelector = domUtilities.domElementFromSelector,
    elementsFromDOMElements = domUtilities.elementsFromDOMElements,
    filterDOMNodesBySelector = domUtilities.filterDOMNodesBySelector,
    descendantDOMNodesFromDOMNode = domUtilities.descendantDOMNodesFromDOMNode;

var Element = function () {
  function Element(selector) {
    _classCallCheck(this, Element);

    this.domElement = domElementFromSelector(selector);

    this.domElement.__element__ = this; ///
  }

  _createClass(Element, [{
    key: 'clone',
    value: function clone() {
      return Element.clone(this);
    }
  }, {
    key: 'getDOMElement',
    value: function getDOMElement() {
      return this.domElement;
    }
  }, {
    key: 'getOffset',
    value: function getOffset() {
      var top = this.domElement.offsetTop,
          ///
      left = this.domElement.offsetLeft,
          ///
      offset = new Offset(top, left);

      return offset;
    }
  }, {
    key: 'getBounds',
    value: function getBounds() {
      var boundingClientRect = this.domElement.getBoundingClientRect(),
          bounds = Bounds.fromBoundingClientRect(boundingClientRect);

      return bounds;
    }
  }, {
    key: 'getWidth',
    value: function getWidth() {
      var includeBorder = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      var width = includeBorder ? this.domElement.offsetWidth : this.domElement.clientWidth;

      return width;
    }
  }, {
    key: 'setWidth',
    value: function setWidth(width) {
      width = width + 'px'; ///

      this.style('width', width);
    }
  }, {
    key: 'getHeight',
    value: function getHeight() {
      var includeBorder = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      var height = includeBorder ? this.domElement.offsetHeight : this.domElement.clientHeight;

      return height;
    }
  }, {
    key: 'setHeight',
    value: function setHeight(height) {
      height = height + 'px'; ///

      this.style('height', height);
    }
  }, {
    key: 'hasAttribute',
    value: function hasAttribute(name) {
      return this.domElement.hasAttribute(name);
    }
  }, {
    key: 'getAttribute',
    value: function getAttribute(name) {
      return this.domElement.getAttribute(name);
    }
  }, {
    key: 'setAttribute',
    value: function setAttribute(name, value) {
      this.domElement.setAttribute(name, value);
    }
  }, {
    key: 'clearAttribute',
    value: function clearAttribute(name) {
      this.domElement.removeAttribute(name);
    }
  }, {
    key: 'addAttribute',
    value: function addAttribute(name, value) {
      this.setAttribute(name, value);
    }
  }, {
    key: 'removeAttribute',
    value: function removeAttribute(name) {
      this.clearAttribute(name);
    }
  }, {
    key: 'setClass',
    value: function setClass(className) {
      this.domElement.className = className;
    }
  }, {
    key: 'addClass',
    value: function addClass(className) {
      this.domElement.classList.add(className);
    }
  }, {
    key: 'removeClass',
    value: function removeClass(className) {
      this.domElement.classList.remove(className);
    }
  }, {
    key: 'toggleClass',
    value: function toggleClass(className) {
      this.domElement.classList.toggle(className);
    }
  }, {
    key: 'hasClass',
    value: function hasClass(className) {
      return this.domElement.classList.contains(className);
    }
  }, {
    key: 'clearClasses',
    value: function clearClasses() {
      this.domElement.className = '';
    }
  }, {
    key: 'prependTo',
    value: function prependTo(parentElement) {
      parentElement.prepend(this);
    }
  }, {
    key: 'appendTo',
    value: function appendTo(parentElement) {
      parentElement.append(this);
    }
  }, {
    key: 'addTo',
    value: function addTo(parentElement) {
      parentElement.add(this);
    }
  }, {
    key: 'removeFrom',
    value: function removeFrom(parentElement) {
      parentElement.remove(this);
    }
  }, {
    key: 'insertBefore',
    value: function insertBefore(siblingElement) {
      var parentDOMNode = siblingElement.domElement.parentNode,
          siblingDOMElement = siblingElement.domElement;

      parentDOMNode.insertBefore(this.domElement, siblingDOMElement);
    }
  }, {
    key: 'insertAfter',
    value: function insertAfter(siblingElement) {
      var parentDOMNode = siblingElement.domElement.parentNode,
          siblingDOMElement = siblingElement.domElement;

      parentDOMNode.insertBefore(this.domElement, siblingDOMElement.nextSibling); ///
    }
  }, {
    key: 'prepend',
    value: function prepend(element) {
      var domElement = element.domElement,
          firstChildDOMElement = this.domElement.firstChild;

      this.domElement.insertBefore(domElement, firstChildDOMElement);
    }
  }, {
    key: 'append',
    value: function append(element) {
      var domElement = element.domElement;

      this.domElement.insertBefore(domElement, null); ///
    }
  }, {
    key: 'add',
    value: function add(element) {
      this.append(element);
    }
  }, {
    key: 'remove',
    value: function remove(element) {
      if (element) {
        var domElement = element.domElement;

        this.domElement.removeChild(domElement);
      } else {
        this.domElement.remove();
      }
    }
  }, {
    key: 'show',
    value: function show() {
      var displayStyle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'block';
      this.display(displayStyle);
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.style('display', 'none');
    }
  }, {
    key: 'display',
    value: function display(_display) {
      this.style('display', _display);
    }
  }, {
    key: 'enable',
    value: function enable() {
      this.clearAttribute('disabled');
    }
  }, {
    key: 'disable',
    value: function disable() {
      this.setAttribute('disabled', 'disabled');
    }
  }, {
    key: 'isEnabled',
    value: function isEnabled() {
      var disabled = this.isDisabled(),
          enabled = !disabled;

      return enabled;
    }
  }, {
    key: 'isDisabled',
    value: function isDisabled() {
      var disabled = this.hasAttribute('disabled');

      return disabled;
    }
  }, {
    key: 'isDisplayed',
    value: function isDisplayed() {
      var display = this.style('display'),
          displayed = display !== 'none';

      return displayed;
    }
  }, {
    key: 'isShowing',
    value: function isShowing() {
      var displayed = this.isDisplayed(),
          showing = displayed; ///

      return showing;
    }
  }, {
    key: 'isHidden',
    value: function isHidden() {
      var displayed = this.isDisplayed(),
          hidden = !displayed;

      return hidden;
    }
  }, {
    key: 'style',
    value: function style(name, value) {
      if (value !== undefined) {
        this.domElement.style[name] = value;
      } else {
        var style = this.domElement.style[name];

        return style;
      }
    }
  }, {
    key: 'html',
    value: function html(_html) {
      if (_html === undefined) {
        var innerHTML = this.domElement.innerHTML;

        _html = innerHTML; ///

        return _html;
      } else {
        var _innerHTML = _html; ///

        this.domElement.innerHTML = _innerHTML;
      }
    }
  }, {
    key: 'css',
    value: function css(_css) {
      if (_css === undefined) {
        var computedStyle = getComputedStyle(this.domElement),
            css = {};

        for (var index = 0; index < computedStyle.length; index++) {
          var name = computedStyle[0],
              ///
          value = computedStyle.getPropertyValue(name); ///

          css[name] = value;
        }

        return css;
      } else if (typeof _css === 'string') {
        var _name = _css; ///

        var _computedStyle = getComputedStyle(this.domElement),
            _value = _computedStyle.getPropertyValue(_name); ///

        _css = _value; ///

        return _css;
      } else {
        var names = Object.keys(_css); ///

        names.forEach(function (name) {
          var value = _css[name];

          this.style(name, value);
        }.bind(this));
      }
    }
  }, {
    key: 'blur',
    value: function blur() {
      this.domElement.blur();
    }
  }, {
    key: 'focus',
    value: function focus() {
      this.domElement.focus();
    }
  }, {
    key: 'hasFocus',
    value: function hasFocus() {
      var focus = document.activeElement === this.domElement; ///

      return focus;
    }
  }, {
    key: 'getDescendantElements',
    value: function getDescendantElements() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';

      var domNode = this.domElement,
          ///
      descendantDOMNodes = descendantDOMNodesFromDOMNode(domNode),
          descendantDOMElements = filterDOMNodesBySelector(descendantDOMNodes, selector),
          descendantElements = elementsFromDOMElements(descendantDOMElements);

      return descendantElements;
    }
  }, {
    key: 'getChildElements',
    value: function getChildElements() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';

      var childDOMNodes = this.domElement.childNodes,
          childDOMElements = filterDOMNodesBySelector(childDOMNodes, selector),
          childElements = elementsFromDOMElements(childDOMElements);

      return childElements;
    }
  }, {
    key: 'getParentElement',
    value: function getParentElement() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';

      var parentElement = null;

      var parentDOMElement = this.domElement.parentElement;

      if (parentDOMElement !== null) {
        if (parentDOMElement.matches(selector)) {
          var parentDOMElements = [parentDOMElement],
              parentElements = elementsFromDOMElements(parentDOMElements),
              firstParentElement = first(parentElements);

          parentElement = firstParentElement || null;
        }
      }

      return parentElement;
    }
  }, {
    key: 'getAscendantElements',
    value: function getAscendantElements() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';

      var ascendantDOMElements = [],
          parentDOMElement = this.domElement.parentElement;

      var ascendantDOMElement = parentDOMElement; ///
      while (ascendantDOMElement !== null) {
        if (ascendantDOMElement.matches(selector)) {
          ascendantDOMElements.push(ascendantDOMElement);
        }

        ascendantDOMElement = ascendantDOMElement.parentElement;
      }

      var ascendantElements = elementsFromDOMElements(ascendantDOMElements);

      return ascendantElements;
    }
  }, {
    key: 'getPreviousSiblingElement',
    value: function getPreviousSiblingElement() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';

      var previousSiblingElement = null;

      var previousSiblingDOMNode = this.domElement.previousSibling; ///

      if (previousSiblingDOMNode !== null && domNodeMatchesSelector(previousSiblingDOMNode, selector)) {
        previousSiblingElement = previousSiblingDOMNode.__element__ || null;
      }

      return previousSiblingElement;
    }
  }, {
    key: 'getNextSiblingElement',
    value: function getNextSiblingElement() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';

      var nextSiblingElement = null;

      var nextSiblingDOMNode = this.domElement.nextSibling;

      if (nextSiblingDOMNode !== null && domNodeMatchesSelector(nextSiblingDOMNode, selector)) {
        nextSiblingElement = nextSiblingDOMNode.__element__ || null;
      }

      return nextSiblingElement;
    }
  }], [{
    key: 'clone',
    value: function clone(Class, element) {
      var _Function$prototype$b;

      var deep = true,
          domElement = element.domElement.cloneNode(deep);

      for (var _len = arguments.length, remainingArguments = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        remainingArguments[_key - 2] = arguments[_key];
      }

      remainingArguments.unshift(domElement);
      remainingArguments.unshift(null);

      return new ((_Function$prototype$b = Function.prototype.bind).call.apply(_Function$prototype$b, [Class].concat(remainingArguments)))();
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(Class, html) {
      var _Function$prototype$b2;

      var outerDOMElement = document.createElement('div');

      outerDOMElement.innerHTML = html; ///

      var domElement = outerDOMElement.firstChild;

      for (var _len2 = arguments.length, remainingArguments = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        remainingArguments[_key2 - 2] = arguments[_key2];
      }

      remainingArguments.unshift(domElement);
      remainingArguments.unshift(null);

      return new ((_Function$prototype$b2 = Function.prototype.bind).call.apply(_Function$prototype$b2, [Class].concat(remainingArguments)))();
    }
  }, {
    key: 'fromDOMElement',
    value: function fromDOMElement(Class, domElement) {
      var _Function$prototype$b3;

      for (var _len3 = arguments.length, remainingArguments = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        remainingArguments[_key3 - 2] = arguments[_key3];
      }

      remainingArguments.unshift(domElement);
      remainingArguments.unshift(null);

      return new ((_Function$prototype$b3 = Function.prototype.bind).call.apply(_Function$prototype$b3, [Class].concat(remainingArguments)))();
    }
  }, {
    key: 'fromProperties',
    value: function fromProperties(Class, properties) {
      for (var _len4 = arguments.length, remainingArguments = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
        remainingArguments[_key4 - 2] = arguments[_key4];
      }

      var tagName = Class.tagName,
          html = '<' + tagName + ' />',
          element = Element.fromHTML.apply(Element, [Class, html].concat(remainingArguments)),
          defaultProperties = defaultPropertiesFromClass(Class),
          ignoredProperties = ignoredPropertiesFromClass(Class);

      element.applyProperties(properties, defaultProperties, ignoredProperties);

      return element;
    }
  }, {
    key: 'fromString',
    value: function fromString(string, properties) {
      for (var _len5 = arguments.length, remainingArguments = Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
        remainingArguments[_key5 - 2] = arguments[_key5];
      }

      var tagName = string,
          ///
      html = '<' + tagName + ' />',
          element = Element.fromHTML.apply(Element, [Element, html].concat(remainingArguments)),
          defaultProperties = {},
          ///
      ignoredProperties = []; ///

      element.applyProperties(properties, defaultProperties, ignoredProperties);

      return element;
    }
  }]);

  return Element;
}();

Object.assign(Element.prototype, jsxMixins);
Object.assign(Element.prototype, keyMixins);
Object.assign(Element.prototype, mouseMixins);
Object.assign(Element.prototype, eventMixins);
Object.assign(Element.prototype, clickMixins);
Object.assign(Element.prototype, scrollMixins);
Object.assign(Element.prototype, resizeMixins);

Object.assign(Element, {
  LEFT_MOUSE_BUTTON: 0,
  RIGHT_MOUSE_BUTTON: 2,
  MIDDLE_MOUSE_BUTTON: 1
});

module.exports = Element;

function defaultPropertiesFromClass(Class) {
  var defaultProperties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (Class.hasOwnProperty('defaultProperties')) {
    combine(defaultProperties, Class.defaultProperties);
  }

  var superClass = Object.getPrototypeOf(Class);

  if (superClass !== null) {
    defaultPropertiesFromClass(superClass, defaultProperties);
  }

  return defaultProperties;
}

function ignoredPropertiesFromClass(Class) {
  var ignoredProperties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (Class.hasOwnProperty('ignoredProperties')) {
    augment(ignoredProperties, Class.ignoredProperties, function (ignoredProperty) {
      return !ignoredProperties.includes(ignoredProperty);
    });
  }

  var superClass = Object.getPrototypeOf(Class);

  if (superClass !== null) {
    ignoredPropertiesFromClass(superClass, ignoredProperties);
  }

  return ignoredProperties;
}

},{"./miscellaneous/bounds":39,"./miscellaneous/offset":40,"./mixins/click":41,"./mixins/event":42,"./mixins/jsx":43,"./mixins/key":44,"./mixins/mouse":45,"./mixins/resize":46,"./mixins/scroll":47,"./utilities/array":50,"./utilities/dom":51,"./utilities/object":52}],29:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = require('../element');

var Body = function (_Element) {
  _inherits(Body, _Element);

  function Body() {
    var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';

    _classCallCheck(this, Body);

    return _possibleConstructorReturn(this, (Body.__proto__ || Object.getPrototypeOf(Body)).call(this, selector));
  }

  _createClass(Body, [{
    key: 'clone',
    value: function clone() {
      return Body.clone(this);
    }
  }], [{
    key: 'clone',
    value: function clone(element) {
      return Element.clone(Body, element);
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(html) {
      return Element.fromHTML(Body, html);
    }
  }, {
    key: 'fromDOMElement',
    value: function fromDOMElement(domElement) {
      return Element.fromDOMElement(Body, domElement);
    }
  }, {
    key: 'fromProperties',
    value: function fromProperties(properties) {
      return Element.fromProperties(Body, properties);
    }
  }]);

  return Body;
}(Element);

Object.assign(Body, {
  tagName: 'body'
});

module.exports = Body;

},{"../element":28}],30:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = require('../element');

var Button = function (_Element) {
  _inherits(Button, _Element);

  function Button(selector, clickHandler) {
    _classCallCheck(this, Button);

    var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, selector));

    if (clickHandler !== undefined) {
      _this.onClick(clickHandler);
    }
    return _this;
  }

  _createClass(Button, [{
    key: 'clone',
    value: function clone(clickHandler) {
      return Button.clone(this, clickHandler);
    }
  }, {
    key: 'onClick',
    value: function onClick(clickHandler, object) {
      var intermediateClickHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateClickHandler;

      _get(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), 'onClick', this).call(this, clickHandler, object, intermediateClickHandler);
    }
  }, {
    key: 'offClick',
    value: function offClick(clickHandler, object) {
      _get(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), 'offClick', this).call(this, clickHandler, object);
    }
  }], [{
    key: 'clone',
    value: function clone(element, clickHandler) {
      return Element.clone(Button, element, clickHandler);
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(html, clickHandler) {
      return Element.fromHTML(Button, html, clickHandler);
    }
  }, {
    key: 'fromDOMElement',
    value: function fromDOMElement(domElement, clickHandler) {
      return Element.fromDOMElement(Button, domElement, clickHandler);
    }
  }, {
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var onClick = properties.onClick,
          clickHandler = onClick,
          button = Element.fromProperties(Button, properties, clickHandler);


      return button;
    }
  }]);

  return Button;
}(Element);

Object.assign(Button, {
  tagName: 'button',
  ignoredProperties: ['onClick']
});

module.exports = Button;

function defaultIntermediateClickHandler(clickHandler, event, element) {
  var button = event.button,
      mouseButton = button; ///

  clickHandler.call(element, mouseButton, event);
}

},{"../element":28}],31:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = require('../element');

var Checkbox = function (_Element) {
  _inherits(Checkbox, _Element);

  function Checkbox(selector, changeHandler, checked) {
    _classCallCheck(this, Checkbox);

    var _this = _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call(this, selector));

    if (changeHandler !== undefined) {
      _this.onChange(changeHandler);
    }

    if (checked !== undefined) {
      _this.check(checked);
    }
    return _this;
  }

  _createClass(Checkbox, [{
    key: 'clone',
    value: function clone(changeHandler) {
      return Checkbox.clone(this, changeHandler);
    }
  }, {
    key: 'onChange',
    value: function onChange(changeHandler, object) {
      var intermediateChangeHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateChangeHandler;

      this.on('click', changeHandler, object, intermediateChangeHandler); ///
    }
  }, {
    key: 'offChange',
    value: function offChange(changeHandler, object) {
      this.off('click', changeHandler, object); ///
    }
  }, {
    key: 'check',
    value: function check() {
      var checked = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      checked ? this.setAttribute('checked', 'checked') : this.clearAttribute('checked');
    }
  }, {
    key: 'isChecked',
    value: function isChecked() {
      var domElement = this.getDOMElement(),
          checked = domElement.checked;

      return checked;
    }
  }, {
    key: 'onResize',
    value: function onResize() {}
  }, {
    key: 'offResize',
    value: function offResize() {}
  }], [{
    key: 'clone',
    value: function clone(element, changeHandler) {
      return Element.clone(Checkbox, element, changeHandler);
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(html, changeHandler) {
      return Element.fromHTML(Checkbox, html, changeHandler);
    }
  }, {
    key: 'fromDOMElement',
    value: function fromDOMElement(domElement, changeHandler) {
      return Element.fromDOMElement(Checkbox, domElement, changeHandler);
    }
  }, {
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var onChange = properties.onChange,
          checked = properties.checked,
          changeHandler = onChange,
          checkbox = Element.fromProperties(Checkbox, properties, changeHandler, checked);


      return checkbox;
    }
  }]);

  return Checkbox;
}(Element);

Object.assign(Checkbox, {
  tagName: 'input',
  ignoredProperties: ['onChange', 'checked'],
  defaultProperties: {
    type: 'checkbox'
  }
});

module.exports = Checkbox;

function defaultIntermediateChangeHandler(changeHandler, event, element) {
  var checkbox = element,
      ///
  checked = checkbox.isChecked();

  changeHandler.call(checkbox, checked, event);
}

},{"../element":28}],32:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = require('../element');

var Div = function (_Element) {
  _inherits(Div, _Element);

  function Div(selector) {
    _classCallCheck(this, Div);

    return _possibleConstructorReturn(this, (Div.__proto__ || Object.getPrototypeOf(Div)).call(this, selector));
  }

  _createClass(Div, [{
    key: 'clone',
    value: function clone() {
      return Div.clone(this);
    }
  }], [{
    key: 'clone',
    value: function clone(element) {
      return Element.clone(Div, element);
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(html) {
      return Element.fromHTML(Div, html);
    }
  }, {
    key: 'fromDOMElement',
    value: function fromDOMElement(domElement) {
      return Element.fromDOMElement(Div, domElement);
    }
  }, {
    key: 'fromProperties',
    value: function fromProperties(properties) {
      return Element.fromProperties(Div, properties);
    }
  }]);

  return Div;
}(Element);

Object.assign(Div, {
  tagName: 'div'
});

module.exports = Div;

},{"../element":28}],33:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = require('../element');

var Link = function (_Element) {
  _inherits(Link, _Element);

  function Link(selector, clickHandler) {
    _classCallCheck(this, Link);

    var _this = _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).call(this, selector));

    if (clickHandler !== undefined) {
      _this.onClick(clickHandler);
    }
    return _this;
  }

  _createClass(Link, [{
    key: 'clone',
    value: function clone(clickHandler) {
      return Link.clone(this, clickHandler);
    }
  }, {
    key: 'onClick',
    value: function onClick(clickHandler, object) {
      var intermediateClickHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateClickHandler;

      this.on('click', clickHandler, object, intermediateClickHandler);
    }
  }, {
    key: 'offClick',
    value: function offClick(clickHandler, object) {
      this.off('click', clickHandler, object);
    }
  }], [{
    key: 'clone',
    value: function clone(element, clickHandler) {
      return Element.clone(Link, element, clickHandler);
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(html, clickHandler) {
      return Element.fromHTML(Link, html, clickHandler);
    }
  }, {
    key: 'fromDOMElement',
    value: function fromDOMElement(domElement, clickHandler) {
      return Element.fromDOMElement(Link, domElement, clickHandler);
    }
  }, {
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var onClick = properties.onClick,
          clickHandler = onClick,
          link = Element.fromProperties(Link, properties, clickHandler);


      return link;
    }
  }]);

  return Link;
}(Element);

Object.assign(Link, {
  tagName: 'a',
  ignoredProperties: ['onClick']
});

module.exports = Link;

function defaultIntermediateClickHandler(clickHandler, event, element) {
  var link = element,
      ///
  href = link.getAttribute('href');

  clickHandler.call(link, href, event);
}

},{"../element":28}],34:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = require('../element');

var Select = function (_Element) {
  _inherits(Select, _Element);

  function Select(selector, changeHandler) {
    _classCallCheck(this, Select);

    var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, selector));

    if (changeHandler !== undefined) {
      _this.onChange(changeHandler);
    }
    return _this;
  }

  _createClass(Select, [{
    key: 'clone',
    value: function clone(changeHandler) {
      return Select.clone(this, changeHandler);
    }
  }, {
    key: 'onChange',
    value: function onChange(changeHandler, object) {
      var intermediateChangeHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateChangeHandler;

      this.on('change', changeHandler, object, intermediateChangeHandler);
    }
  }, {
    key: 'offChange',
    value: function offChange(changeHandler, object) {
      this.off('change', changeHandler, object);
    }
  }, {
    key: 'getSelectedOptionValue',
    value: function getSelectedOptionValue() {
      var domElement = this.getDOMElement(),
          selectedOptionValue = domElement.value; ///

      return selectedOptionValue;
    }
  }, {
    key: 'setSelectedOptionByValue',
    value: function setSelectedOptionByValue(selectedOptionValue) {
      var value = selectedOptionValue,
          ///
      domElement = this.getDOMElement();

      domElement.value = value;
    }
  }], [{
    key: 'clone',
    value: function clone(element, changeHandler) {
      return Element.clone(Select, element, changeHandler);
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(html, changeHandler) {
      return Element.fromHTML(Select, html, changeHandler);
    }
  }, {
    key: 'fromDOMElement',
    value: function fromDOMElement(domElement, changeHandler) {
      return Element.fromDOMElement(Select, domElement, changeHandler);
    }
  }, {
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var onChange = properties.onChange,
          changeHandler = onChange,
          select = Element.fromProperties(Select, properties, changeHandler);


      return select;
    }
  }]);

  return Select;
}(Element);

Object.assign(Select, {
  tagName: 'select',
  ignoredProperties: ['onChange']
});

module.exports = Select;

function defaultIntermediateChangeHandler(changeHandler, event, element) {
  var select = element,
      ///
  selectedOptionValue = select.getSelectedOptionValue();

  changeHandler.call(element, selectedOptionValue, event);
}

},{"../element":28}],35:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = require('../element');

var Span = function (_Element) {
  _inherits(Span, _Element);

  function Span() {
    _classCallCheck(this, Span);

    return _possibleConstructorReturn(this, (Span.__proto__ || Object.getPrototypeOf(Span)).apply(this, arguments));
  }

  _createClass(Span, [{
    key: 'clone',
    value: function clone() {
      return Span.clone(this);
    }
  }, {
    key: 'onResize',
    value: function onResize() {}
  }, {
    key: 'offResize',
    value: function offResize() {}
  }], [{
    key: 'clone',
    value: function clone(element) {
      return Element.clone(Span, element);
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(html) {
      return Element.fromHTML(Span, html);
    }
  }, {
    key: 'fromDOMElement',
    value: function fromDOMElement(domElement) {
      return Element.fromDOMElement(Span, domElement);
    }
  }, {
    key: 'fromProperties',
    value: function fromProperties(properties) {
      return Element.fromProperties(properties);
    }
  }]);

  return Span;
}(Element);

Object.assign(Span, {
  tagName: 'span'
});

module.exports = Span;

},{"../element":28}],36:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = require('./element');

var InputElement = function (_Element) {
  _inherits(InputElement, _Element);

  function InputElement(selector, changeHandler) {
    _classCallCheck(this, InputElement);

    var _this = _possibleConstructorReturn(this, (InputElement.__proto__ || Object.getPrototypeOf(InputElement)).call(this, selector));

    if (changeHandler !== undefined) {
      _this.onChange(changeHandler);
    }
    return _this;
  }

  _createClass(InputElement, [{
    key: 'onResize',
    value: function onResize() {}
  }, {
    key: 'offResize',
    value: function offResize() {}
  }, {
    key: 'onChange',
    value: function onChange(changeHandler) {
      var intermediateChangeHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultIntermediateChangeHandler;

      this.on('change', changeHandler, intermediateChangeHandler);
    }
  }, {
    key: 'offChange',
    value: function offChange(changeHandler) {
      this.off('change', changeHandler);
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.domElement.value;
    }
  }, {
    key: 'getSelectionStart',
    value: function getSelectionStart() {
      return this.domElement.selectionStart;
    }
  }, {
    key: 'getSelectionEnd',
    value: function getSelectionEnd() {
      return this.domElement.selectionEnd;
    }
  }, {
    key: 'isReadOnly',
    value: function isReadOnly() {
      return this.domElement.readOnly;
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      this.domElement.value = value;
    }
  }, {
    key: 'setSelectionStart',
    value: function setSelectionStart(selectionStart) {
      this.domElement.selectionStart = selectionStart;
    }
  }, {
    key: 'setSelectionEnd',
    value: function setSelectionEnd(selectionEnd) {
      this.domElement.selectionEnd = selectionEnd;
    }
  }, {
    key: 'setReadOnly',
    value: function setReadOnly(readOnly) {
      this.domElement.readOnly = readOnly;
    }
  }, {
    key: 'select',
    value: function select() {
      this.domElement.select();
    }
  }], [{
    key: 'clone',
    value: function clone(Class, element) {
      for (var _len = arguments.length, remainingArguments = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        remainingArguments[_key - 2] = arguments[_key];
      }

      return Element.clone.apply(Element, [Class, element].concat(remainingArguments));
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(Class, html) {
      for (var _len2 = arguments.length, remainingArguments = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        remainingArguments[_key2 - 2] = arguments[_key2];
      }

      return Element.fromHTML.apply(Element, [Class, html].concat(remainingArguments));
    }
  }, {
    key: 'fromDOMElement',
    value: function fromDOMElement(Class, domElement) {
      for (var _len3 = arguments.length, remainingArguments = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        remainingArguments[_key3 - 2] = arguments[_key3];
      }

      return Element.fromDOMElement.apply(Element, [Class, domElement].concat(remainingArguments));
    }
  }, {
    key: 'fromProperties',
    value: function fromProperties(Class, properties) {
      var onChange = properties.onChange,
          changeHandler = onChange; ///

      for (var _len4 = arguments.length, remainingArguments = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
        remainingArguments[_key4 - 2] = arguments[_key4];
      }

      return Element.fromProperties.apply(Element, [Class, properties, changeHandler].concat(remainingArguments));
    }
  }, {
    key: 'fromString',
    value: function fromString(string, properties) {
      var onChange = properties.onChange,
          changeHandler = onChange; ///

      for (var _len5 = arguments.length, remainingArguments = Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
        remainingArguments[_key5 - 2] = arguments[_key5];
      }

      return Element.fromString.apply(Element, [string, properties, changeHandler].concat(remainingArguments));
    }
  }]);

  return InputElement;
}(Element);

Object.assign(InputElement, {
  ignoredProperties: ['onChange']
});

module.exports = InputElement;

function defaultIntermediateChangeHandler(changeHandler, event, element) {
  var inputElement = element,
      ///
  value = inputElement.getValue();

  changeHandler.call(inputElement, value, event);
}

},{"./element":28}],37:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputElement = require('../inputElement');

var Input = function (_InputElement) {
  _inherits(Input, _InputElement);

  function Input() {
    _classCallCheck(this, Input);

    return _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).apply(this, arguments));
  }

  _createClass(Input, [{
    key: 'clone',
    value: function clone(changeHandler) {
      return Input.clone(this, changeHandler);
    }
  }], [{
    key: 'clone',
    value: function clone(element, changeHandler) {
      return InputElement.clone(Input, element, changeHandler);
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(html, changeHandler) {
      return InputElement.fromHTML(Input, html, changeHandler);
    }
  }, {
    key: 'fromDOMElement',
    value: function fromDOMElement(domElement, changeHandler) {
      return InputElement.fromDOMElement(Input, domElement, changeHandler);
    }
  }, {
    key: 'fromProperties',
    value: function fromProperties(properties) {
      return InputElement.fromProperties(Input, properties);
    }
  }]);

  return Input;
}(InputElement);

Object.assign(Input, {
  tagName: 'input'
});

module.exports = Input;

},{"../inputElement":36}],38:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputElement = require('../inputElement');

var Textarea = function (_InputElement) {
  _inherits(Textarea, _InputElement);

  function Textarea() {
    _classCallCheck(this, Textarea);

    return _possibleConstructorReturn(this, (Textarea.__proto__ || Object.getPrototypeOf(Textarea)).apply(this, arguments));
  }

  _createClass(Textarea, [{
    key: 'clone',
    value: function clone(changeHandler) {
      return Textarea.clone(this, changeHandler);
    }
  }], [{
    key: 'clone',
    value: function clone(element, changeHandler) {
      return InputElement.clone(Textarea, element, changeHandler);
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(html, changeHandler) {
      return InputElement.fromHTML(Textarea, html, changeHandler);
    }
  }, {
    key: 'fromDOMElement',
    value: function fromDOMElement(domElement, changeHandler) {
      return InputElement.fromDOMElement(Textarea, domElement, changeHandler);
    }
  }, {
    key: 'fromProperties',
    value: function fromProperties(properties) {
      return InputElement.fromProperties(Textarea, properties);
    }
  }]);

  return Textarea;
}(InputElement);

Object.assign(Textarea, {
  tagName: 'textarea'
});

module.exports = Textarea;

},{"../inputElement":36}],39:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bounds = function () {
  function Bounds(top, left, bottom, right) {
    _classCallCheck(this, Bounds);

    this.top = top;
    this.left = left;
    this.bottom = bottom;
    this.right = right;
  }

  _createClass(Bounds, [{
    key: 'getTop',
    value: function getTop() {
      return this.top;
    }
  }, {
    key: 'getLeft',
    value: function getLeft() {
      return this.left;
    }
  }, {
    key: 'getBottom',
    value: function getBottom() {
      return this.bottom;
    }
  }, {
    key: 'getRight',
    value: function getRight() {
      return this.right;
    }
  }, {
    key: 'getWidth',
    value: function getWidth() {
      var width = this.right - this.left;

      return width;
    }
  }, {
    key: 'getHeight',
    value: function getHeight() {
      var height = this.bottom - this.top;

      return height;
    }
  }, {
    key: 'setTop',
    value: function setTop(top) {
      this.top = top;
    }
  }, {
    key: 'setLeft',
    value: function setLeft(left) {
      this.left = left;
    }
  }, {
    key: 'setBottom',
    value: function setBottom(bottom) {
      this.bottom = bottom;
    }
  }, {
    key: 'setRight',
    value: function setRight(right) {
      this.right = right;
    }
  }, {
    key: 'shift',
    value: function shift(horizontalOffset, verticalOffset) {
      this.top += verticalOffset;
      this.left += horizontalOffset;
      this.bottom += verticalOffset;
      this.right += horizontalOffset;
    }
  }, {
    key: 'isOverlappingMouse',
    value: function isOverlappingMouse(mouseTop, mouseLeft) {
      return this.top < mouseTop && this.left < mouseLeft && this.bottom > mouseTop && this.right > mouseLeft;
    }
  }, {
    key: 'areOverlapping',
    value: function areOverlapping(bounds) {
      return this.top < bounds.bottom && this.left < bounds.right && this.bottom > bounds.top && this.right > bounds.left;
    }
  }], [{
    key: 'fromBoundingClientRect',
    value: function fromBoundingClientRect(boundingClientRect) {
      var windowScrollTop = window.pageYOffset,
          ///
      windowScrollLeft = window.pageXOffset,
          ///
      top = boundingClientRect.top + windowScrollTop,
          left = boundingClientRect.left + windowScrollLeft,
          bottom = boundingClientRect.bottom + windowScrollTop,
          right = boundingClientRect.right + windowScrollLeft,
          bounds = new Bounds(top, left, bottom, right);

      return bounds;
    }
  }, {
    key: 'fromTopLeftWidthAndHeight',
    value: function fromTopLeftWidthAndHeight(top, left, width, height) {
      var bottom = top + height,
          right = left + width,
          bounds = new Bounds(top, left, bottom, right);

      return bounds;
    }
  }]);

  return Bounds;
}();

module.exports = Bounds;

},{}],40:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Offset = function () {
  function Offset(top, left) {
    _classCallCheck(this, Offset);

    this.top = top;
    this.left = left;
  }

  _createClass(Offset, [{
    key: 'getTop',
    value: function getTop() {
      return this.top;
    }
  }, {
    key: 'getLeft',
    value: function getLeft() {
      return this.left;
    }
  }]);

  return Offset;
}();

module.exports = Offset;

},{}],41:[function(require,module,exports){
'use strict';

function onClick(handler, element) {
  var intermediateHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateHandler;

  this.on('click', handler, element, intermediateHandler);
}

function offClick(handler, element) {
  this.off('click', handler, element);
}

module.exports = {
  onClick: onClick,
  offClick: offClick
};

function defaultIntermediateHandler(handler, event, element) {
  var pageY = event.pageY,
      pageX = event.pageX,
      button = event.button,
      mouseTop = pageY,
      mouseLeft = pageX,
      mouseButton = button; ///

  handler.call(element, mouseTop, mouseLeft, mouseButton, event);
}

},{}],42:[function(require,module,exports){
'use strict';

function on(eventTypes, handler) {
  var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;
  var intermediateHandler = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  eventTypes = eventTypes.split(' '); ///

  eventTypes.forEach(function (eventType) {
    var eventListener = this.addEventListener(eventType, handler, element, intermediateHandler);

    this.domElement.addEventListener(eventType, eventListener);
  }.bind(this));
}

function off(eventTypes, handler) {
  var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;

  eventTypes = eventTypes.split(' '); ///

  eventTypes.forEach(function (eventType) {
    var eventListener = this.removeEventListener(eventType, handler, element);

    this.domElement.removeEventListener(eventType, eventListener);
  }.bind(this));
}

module.exports = {
  on: on,
  off: off,
  addEventListener: addEventListener,
  removeEventListener: removeEventListener
};

function addEventListener(eventType, handler, element, intermediateHandler) {
  if (!this.hasOwnProperty('eventListeners')) {
    this.eventListeners = [];
  }

  var eventListeners = this.eventListeners,
      eventListener = createEventListener(eventType, handler, element, intermediateHandler);

  eventListeners.push(eventListener);

  return eventListener;
}

function removeEventListener(eventType, handler, element) {
  var eventListeners = this.eventListeners,
      eventListener = findEventListener(eventListeners, eventType, handler, element),
      index = eventListeners.indexOf(eventListener),
      start = index,
      ///
  deleteCount = 1;

  eventListeners.splice(start, deleteCount);

  if (eventListeners.length === 0) {
    delete this.eventListeners;
  }

  return eventListener;
}

function createEventListener(eventType, handler, element, intermediateHandler) {
  var eventListener = void 0;

  if (intermediateHandler === null) {
    eventListener = function eventListener(event) {
      handler.call(element, event);
    };
  } else {
    eventListener = function eventListener(event) {
      intermediateHandler(handler, event, element);
    };
  }

  Object.assign(eventListener, {
    eventType: eventType,
    handler: handler,
    element: element
  });

  return eventListener;
}

function findEventListener(eventListeners, eventType, handler, element) {
  var eventListener = eventListeners.find(function (eventListener) {
    var found = eventListener.element === element && eventListener.handler === handler && eventListener.eventType === eventType; ///

    return found;
  });

  return eventListener;
}

},{}],43:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var TextElement = require('../textElement'),
    arrayUtilities = require('../utilities/array'),
    objectUtilities = require('../utilities/object');

var first = arrayUtilities.first,
    combine = objectUtilities.combine,
    prune = objectUtilities.prune;


function applyProperties() {
  var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaultProperties = arguments[1];
  var ignoredProperties = arguments[2];

  combine(properties, defaultProperties);

  var element = this,
      ///
  childElements = childElementsFromElementAndProperties(element, properties);

  prune(properties, ignoredProperties);

  var names = Object.keys(properties); ///

  names.forEach(function (name) {
    var value = properties[name];

    if (false) {} else if (isHandlerName(name)) {
      addHandler(this, name, value);
    } else if (isAttributeName(name)) {
      addAttribute(this, name, value);
    } else {
      if (!this.hasOwnProperty('properties')) {
        var _properties = {};

        Object.assign(this, {
          properties: _properties
        });
      }

      this.properties[name] = value;
    }
  }.bind(this));

  var parentElement = this; ///

  childElements.forEach(function (childElement) {
    updateParentElementContext(childElement, parentElement);

    childElement.addTo(parentElement);
  }.bind(this));
}

function getProperties() {
  return this.properties;
}

function getContext() {
  return this.context;
}

function getState() {
  return this.state;
}

function setState(state) {
  this.state = state;
}

function updateState(update) {
  Object.assign(this.state, update);
}

function assignContext(names, thenDelete) {
  var argumentsLength = arguments.length;

  if (argumentsLength === 1) {
    var firstArgument = first(arguments);

    if (typeof firstArgument === 'boolean') {
      names = Object.keys(this.context);

      thenDelete = firstArgument;
    } else {
      thenDelete = true;
    }
  }

  if (argumentsLength === 0) {
    names = Object.keys(this.context);

    thenDelete = true;
  }

  names.forEach(function (name) {
    var value = this.context[name],
        propertyName = name,
        ///
    descriptor = {
      value: value
    };

    Object.defineProperty(this, propertyName, descriptor);

    if (thenDelete) {
      delete this.context[name];
    }
  }.bind(this), []);
}

module.exports = {
  applyProperties: applyProperties,
  getProperties: getProperties,
  getContext: getContext,
  getState: getState,
  setState: setState,
  updateState: updateState,
  assignContext: assignContext
};

function updateParentElementContext(childElement, parentElement) {
  var parentContext = typeof childElement.parentContext === 'function' ? childElement.parentContext() : childElement.context;

  parentElement.context = Object.assign({}, parentElement.context, parentContext);

  delete childElement.context;
}

function childElementsFromElementAndProperties(element, properties) {
  var childElements = typeof element.childElements === 'function' ? element.childElements(properties) : properties.childElements;

  childElements = childElements !== undefined ? childElements instanceof Array ? childElements : [childElements] : [];

  childElements = childElements.map(function (childElement) {
    if (typeof childElement === 'string') {
      var text = childElement,
          ///
      textElement = new TextElement(text);

      childElement = textElement; ///
    }

    return childElement;
  });

  return childElements;
}

function addHandler(element, name, value) {
  var eventType = name.substr(2).toLowerCase(),
      ///
  handler = value; ///

  element.on(eventType, handler);
}

function addAttribute(element, name, value) {
  if (name === 'className') {
    name = 'class';
  }

  if (name === 'htmlFor') {
    name = 'for';
  }

  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
    var keys = Object.keys(value);

    keys.forEach(function (key) {
      element.domElement[name][key] = value[key];
    }.bind(this));
  } else if (typeof value === 'boolean') {
    if (value) {
      value = name; ///

      element.addAttribute(name, value);
    }
  } else {
    element.addAttribute(name, value);
  }
}

function isHandlerName(name) {
  return name.match(/^on/);
}

function isAttributeName(name) {
  return attributeNames.includes(name);
}

var attributeNames = ['accept', 'acceptCharset', 'accessKey', 'action', 'allowFullScreen', 'allowTransparency', 'alt', 'async', 'autoComplete', 'autoFocus', 'autoPlay', 'capture', 'cellPadding', 'cellSpacing', 'challenge', 'charSet', 'checked', 'cite', 'classID', 'className', 'colSpan', 'cols', 'content', 'contentEditable', 'contextMenu', 'controls', 'coords', 'crossOrigin', 'data', 'dateTime', 'default', 'defer', 'dir', 'disabled', 'download', 'draggable', 'encType', 'form', 'formAction', 'formEncType', 'formMethod', 'formNoValidate', 'formTarget', 'frameBorder', 'headers', 'height', 'hidden', 'high', 'href', 'hrefLang', 'htmlFor', 'httpEquiv', 'icon', 'id', 'inputMode', 'integrity', 'is', 'keyParams', 'keyType', 'kind', 'label', 'lang', 'list', 'loop', 'low', 'manifest', 'marginHeight', 'marginWidth', 'max', 'maxLength', 'media', 'mediaGroup', 'method', 'min', 'minLength', 'multiple', 'muted', 'name', 'noValidate', 'nonce', 'open', 'optimum', 'pattern', 'placeholder', 'poster', 'preload', 'profile', 'radioGroup', 'readOnly', 'rel', 'required', 'reversed', 'role', 'rowSpan', 'rows', 'sandbox', 'scope', 'scoped', 'scrolling', 'seamless', 'selected', 'shape', 'size', 'sizes', 'span', 'spellCheck', 'src', 'srcDoc', 'srcLang', 'srcSet', 'start', 'step', 'style', 'summary', 'tabIndex', 'target', 'title', 'type', 'useMap', 'value', 'width', 'wmode', 'wrap'];

},{"../textElement":49,"../utilities/array":50,"../utilities/object":52}],44:[function(require,module,exports){
'use strict';

function onKeyUp(handler, element) {
  var intermediateHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateHandler;

  this.on('keyup', handler, element, intermediateHandler);
}

function onKeyDown(handler, element) {
  var intermediateHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateHandler;

  this.on('keydown', handler, element, intermediateHandler);
}

function offKeyUp(handler, element) {
  this.off('keyup', handler, element);
}

function offKeyDown(handler, element) {
  this.off('keydown', handler, element);
}

module.exports = {
  onKeyUp: onKeyUp,
  onKeyDown: onKeyDown,
  offKeyUp: offKeyUp,
  offKeyDown: offKeyDown
};

function defaultIntermediateHandler(handler, event, element) {
  var keyCode = event.keyCode;


  handler.call(element, keyCode, event);
}

},{}],45:[function(require,module,exports){
'use strict';

function onMouseUp(handler, element) {
  var intermediateHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateHandler;

  this.on('mouseup', handler, element, intermediateHandler);
}

function onMouseDown(handler, element) {
  var intermediateHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateHandler;

  this.on('mousedown', handler, element, intermediateHandler);
}

function onMouseOver(handler, element) {
  var intermediateHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateHandler;

  this.on('mouseover', handler, element, intermediateHandler);
}

function onMouseOut(handler, element) {
  var intermediateHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateHandler;

  this.on('mouseout', handler, element, intermediateHandler);
}

function onMouseMove(handler, element) {
  var intermediateHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateHandler;

  this.on('mousemove', handler, element, intermediateHandler);
}

function offMouseUp(handler, element) {
  this.off('mouseup', handler, element);
}

function offMouseDown(handler, element) {
  this.off('mousedown', handler, element);
}

function offMouseOver(handler, element) {
  this.off('mouseover', handler, element);
}

function offMouseOut(handler, element) {
  this.off('mouseout', handler, element);
}

function offMouseMove(handler, element) {
  this.off('mousemove', handler, element);
}

module.exports = {
  onMouseUp: onMouseUp,
  onMouseDown: onMouseDown,
  onMouseOver: onMouseOver,
  onMouseOut: onMouseOut,
  onMouseMove: onMouseMove,
  offMouseUp: offMouseUp,
  offMouseDown: offMouseDown,
  offMouseOver: offMouseOver,
  offMouseOut: offMouseOut,
  offMouseMove: offMouseMove
};

function defaultIntermediateHandler(handler, event, element) {
  var pageY = event.pageY,
      pageX = event.pageX,
      button = event.button,
      mouseTop = pageY,
      mouseLeft = pageX,
      mouseButton = button; ///

  handler.call(element, mouseTop, mouseLeft, mouseButton, event);
}

},{}],46:[function(require,module,exports){
'use strict';

function onResize(handler, element) {
  var intermediateHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateResizeHandler;

  var resizeEventListeners = findResizeEventListeners(element);

  if (resizeEventListeners.length === 0) {
    addResizeObject(element);
  }

  var eventType = 'resize';

  this.addEventListener(eventType, handler, element, intermediateHandler);
}

function offResize(handler, element) {
  var eventType = 'resize';

  this.removeEventListener(eventType, handler, element);

  var resizeEventListeners = findResizeEventListeners(element);

  if (resizeEventListeners.length === 0) {
    removeResizeObject(element);
  }
}

module.exports = {
  onResize: onResize,
  offResize: offResize
};

function addResizeObject(element) {
  var resizeObject = document.createElement('object'),
      domElement = element.getDOMElement(),
      style = 'display: block; \n                 position: absolute; \n                 top: 0; \n                 left: 0; \n                 height: 100%; \n                 width: 100%; \n                 overflow: hidden; \n                 pointer-events: none; \n                 z-index: -1;',
      data = 'about:blank',
      type = 'text/html';

  resizeObject.setAttribute('style', style);
  resizeObject.data = data;
  resizeObject.type = type;

  element.__resizeObject__ = resizeObject;

  resizeObject.onload = function () {
    resizeObjectLoadHandler(element);
  };

  domElement.appendChild(resizeObject);
}

function removeResizeObject(element) {
  var domElement = element.getDOMElement(),
      resizeObject = element.__resizeObject__,
      objectWindow = resizeObject.contentDocument.defaultView; ///

  objectWindow.removeEventListener('resize', resizeEventListener);

  domElement.removeChild(resizeObject);
}

function resizeObjectLoadHandler(element) {
  var resizeObject = element.__resizeObject__,
      resizeObjectWindow = resizeObject.contentDocument.defaultView; ///

  resizeObjectWindow.addEventListener('resize', function (event) {
    var resizeEventListeners = findResizeEventListeners(element);

    resizeEventListeners.forEach(function (resizeEventListener) {
      resizeEventListener(event);
    });
  });
}

function findResizeEventListeners(element) {
  var resizeEventListeners = [];

  if (element.hasOwnProperty('eventListeners')) {
    var eventListeners = element.eventListeners; ///

    eventListeners.forEach(function (eventListener) {
      if (eventListener.eventType === 'resize') {
        var _resizeEventListener = eventListener;

        resizeEventListeners.push(_resizeEventListener);
      }
    });
  }

  return resizeEventListeners;
}

function defaultIntermediateResizeHandler(handler, event, element) {
  var window = element,
      ///
  width = window.getWidth(),
      height = window.getHeight();

  handler.call(element, width, height, event);
}

},{}],47:[function(require,module,exports){
'use strict';

function onScroll(handler, element) {
  var intermediateHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateHandler;

  this.on('scroll', handler, element, intermediateHandler);
}

function offScroll(handler, element) {
  this.off('scroll', handler, element);
}

function getScrollTop() {
  return this.domElement.scrollTop;
}

function getScrollLeft() {
  return this.domElement.scrollLeft;
}

function setScrollTop(scrollTop) {
  this.domElement.scrollTop = scrollTop;
}

function setScrollLeft(scrollLeft) {
  this.domElement.scrollLeft = scrollLeft;
}

module.exports = {
  onScroll: onScroll,
  offScroll: offScroll,
  getScrollTop: getScrollTop,
  getScrollLeft: getScrollLeft,
  setScrollTop: setScrollTop,
  setScrollLeft: setScrollLeft
};

function defaultIntermediateHandler(handler, event, element) {
  var scrollTop = element.getScrollTop(),
      scrollLeft = element.getScrollLeft();

  handler.call(element, scrollTop, scrollLeft, event);
}

},{}],48:[function(require,module,exports){
'use strict';

var Element = require('./element'),
    TextElement = require('./textElement');

function createElement(firstArgument, properties) {
  var element = null;

  if (firstArgument !== undefined) {
    for (var _len = arguments.length, childArguments = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      childArguments[_key - 2] = arguments[_key];
    }

    var childElements = childElementsFromChildArguments(childArguments);

    properties = Object.assign({
      childElements: childElements
    }, properties);

    if (false) {} else if (isSubclassOf(firstArgument, Element)) {
      var Class = firstArgument; ///

      element = Class.fromProperties(properties);
    } else if (typeof firstArgument === 'string') {
      var string = firstArgument; ///

      element = Element.fromString(string, properties);
    } else if (typeof firstArgument === 'function') {
      var elementFunction = firstArgument; ///

      element = elementFunction(properties);
    }
  }

  return element;
}

var React = {
  createElement: createElement
};

module.exports = React;

function childElementsFromChildArguments(childArguments) {
  childArguments = childArguments.reduce(function (childArguments, childArgument) {
    childArguments = childArguments.concat(childArgument);

    return childArguments;
  }, []);

  var childElements = childArguments.map(function (childArgument) {
    var childElement = void 0;

    if (typeof childArgument === 'string') {
      var text = childArgument,
          ///
      textElement = new TextElement(text);

      childElement = textElement;
    } else {
      childElement = childArgument; ///
    }

    return childElement;
  });

  return childElements;
}

function isSubclassOf(argument, Class) {
  var typeOf = false;

  if (argument.name === Class.name) {
    ///
    typeOf = true;
  } else {
    argument = Object.getPrototypeOf(argument); ///

    if (argument) {
      typeOf = isSubclassOf(argument, Class);
    }
  }

  return typeOf;
}

},{"./element":28,"./textElement":49}],49:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Offset = require('./miscellaneous/offset'),
    Bounds = require('./miscellaneous/bounds');

var TextElement = function () {
  function TextElement(text) {
    _classCallCheck(this, TextElement);

    this.domElement = document.createTextNode(text); ///

    this.domElement.__element__ = this;
  }

  _createClass(TextElement, [{
    key: 'clone',
    value: function clone() {
      return TextElement.clone(this);
    }
  }, {
    key: 'getText',
    value: function getText() {
      var nodeValue = this.domElement.nodeValue,
          text = nodeValue; ///

      return text;
    }
  }, {
    key: 'setText',
    value: function setText(text) {
      var nodeValue = text; ///

      this.domElement.nodeValue = nodeValue;
    }
  }, {
    key: 'getOffset',
    value: function getOffset() {
      var top = this.domElement.offsetTop,
          ///
      left = this.domElement.offsetLeft,
          ///
      offset = new Offset(top, left);

      return offset;
    }
  }, {
    key: 'getBounds',
    value: function getBounds() {
      var boundingClientRect = this.domElement.getBoundingClientRect(),
          bounds = Bounds.fromBoundingClientRect(boundingClientRect);

      return bounds;
    }
  }, {
    key: 'getWidth',
    value: function getWidth() {
      var width = this.domElement.clientWidth;

      return width;
    }
  }, {
    key: 'getHeight',
    value: function getHeight() {
      var height = this.domElement.clientHeight;

      return height;
    }
  }, {
    key: 'prependTo',
    value: function prependTo(parentElement) {
      parentElement.prepend(this);
    }
  }, {
    key: 'appendTo',
    value: function appendTo(parentElement) {
      parentElement.append(this);
    }
  }, {
    key: 'addTo',
    value: function addTo(parentElement) {
      parentElement.add(this);
    }
  }, {
    key: 'removeFrom',
    value: function removeFrom(parentElement) {
      parentElement.remove(this);
    }
  }, {
    key: 'insertBefore',
    value: function insertBefore(siblingElement) {
      var parentDOMNode = siblingElement.domElement.parentNode,
          siblingDOMElement = siblingElement.domElement;

      parentDOMNode.insertBefore(this.domElement, siblingDOMElement);
    }
  }, {
    key: 'insertAfter',
    value: function insertAfter(siblingElement) {
      var parentDOMNode = siblingElement.domElement.parentNode,
          siblingDOMElement = siblingElement.domElement;

      parentDOMNode.insertBefore(this.domElement, siblingDOMElement.nextSibling); ///
    }
  }, {
    key: 'remove',
    value: function remove() {
      this.domElement.remove();
    }
  }]);

  return TextElement;
}();

module.exports = TextElement;

},{"./miscellaneous/bounds":39,"./miscellaneous/offset":40}],50:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function first(array) {
  return array[0];
}

function splice(array1, start) {
  var deleteCount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Infinity;
  var array2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  var args = [start, deleteCount].concat(_toConsumableArray(array2)),
      deletedItemsArray = Array.prototype.splice.apply(array1, args);

  return deletedItemsArray;
}

function augment(array1, array2, test) {
  array2.forEach(function (element, index) {
    var passed = test(element, index);

    if (passed) {
      array1.push(element);
    }
  });
}

module.exports = {
  first: first,
  splice: splice,
  augment: augment
};

},{}],51:[function(require,module,exports){
'use strict';

var arrayUtilities = require('../utilities/array');

var splice = arrayUtilities.splice;


function domElementFromSelector(selector) {
  var domElement = typeof selector === 'string' ? document.querySelectorAll(selector)[0] : ///
  selector; ///

  return domElement;
}

function elementsFromDOMElements(domElements) {
  var domElementsWithElements = filterDOMNodes(domElements, function (domElement) {
    return domElement.__element__ !== undefined;
  }),
      elements = domElementsWithElements.map(function (domElement) {
    return domElement.__element__;
  });

  return elements;
}

function descendantDOMNodesFromDOMNode(domNode) {
  var descendantDOMNodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var start = -1,
      deleteCount = 0,
      childDOMNodes = domNode.childNodes; ///

  splice(descendantDOMNodes, start, deleteCount, childDOMNodes);

  childDOMNodes.forEach(function (childDOMNode) {
    descendantDOMNodesFromDOMNode(childDOMNode, descendantDOMNodes);
  });

  return descendantDOMNodes;
}

function filterDOMNodesBySelector(domNodes, selector) {
  var filteredDOMNodes = filterDOMNodes(domNodes, function (domNode) {
    return domNodeMatchesSelector(domNode, selector);
  });

  return filteredDOMNodes;
}

function domNodeMatchesSelector(domNode, selector) {
  var domNodeType = domNode.nodeType;

  switch (domNodeType) {
    case Node.ELEMENT_NODE:
      {
        var domElement = domNode; ///

        return domElement.matches(selector);
      }

    case Node.TEXT_NODE:
      {
        if (selector === '*') {
          return true;
        }
      }
  }

  return false;
}

function filterDOMNodes(domNodes, test) {
  var filteredDOMNodes = [],
      domNodesLength = domNodes.length;

  for (var index = 0; index < domNodesLength; index++) {
    var domNode = domNodes[index],
        result = test(domNode);

    if (result) {
      filteredDOMNodes.push(domNode);
    }
  }

  return filteredDOMNodes;
}

module.exports = {
  domElementFromSelector: domElementFromSelector,
  elementsFromDOMElements: elementsFromDOMElements,
  descendantDOMNodesFromDOMNode: descendantDOMNodesFromDOMNode,
  filterDOMNodesBySelector: filterDOMNodesBySelector,
  domNodeMatchesSelector: domNodeMatchesSelector,
  filterDOMNodes: filterDOMNodes
};

},{"../utilities/array":50}],52:[function(require,module,exports){
'use strict';

function combine(targetObject) {
  var sourceObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var sourceKeys = Object.keys(sourceObject);

  sourceKeys.forEach(function (sourceKey) {
    var targetProperty = targetObject[sourceKey],
        sourceProperty = sourceObject[sourceKey];

    targetObject[sourceKey] = targetObject.hasOwnProperty(sourceKey) ? targetProperty + ' ' + sourceProperty : sourceProperty;
  });
}

function prune(targetObject, sourceKeys) {
  sourceKeys.forEach(function (sourceKey) {
    if (targetObject.hasOwnProperty(sourceKey)) {
      delete targetObject[sourceKey];
    }
  });
}

module.exports = {
  combine: combine,
  prune: prune
};

},{}],53:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var keyMixins = require('./mixins/key'),
    eventMixins = require('./mixins/event'),
    clickMixins = require('./mixins/click'),
    mouseMixins = require('./mixins/mouse');

var Window = function () {
  function Window() {
    _classCallCheck(this, Window);

    this.domElement = window; ///
  }

  _createClass(Window, [{
    key: 'assign',
    value: function assign() {
      var target = this.domElement; ///

      for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
        sources[_key] = arguments[_key];
      }

      Object.assign.apply(Object, [target].concat(sources));
    }
  }, {
    key: 'getWidth',
    value: function getWidth() {
      return this.domElement.innerWidth;
    } ///

  }, {
    key: 'getHeight',
    value: function getHeight() {
      return this.domElement.innerHeight;
    } ///

  }, {
    key: 'getScrollTop',
    value: function getScrollTop() {
      return this.domElement.pageYOffset;
    } ///

  }, {
    key: 'getScrollLeft',
    value: function getScrollLeft() {
      return this.domElement.pageXOffset;
    } ///

  }, {
    key: 'onResize',
    value: function onResize(handler, object) {
      var intermediateHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateResizeHandler;

      var eventTypes = 'resize';

      this.on(eventTypes, handler, object, intermediateHandler);
    }
  }, {
    key: 'offResize',
    value: function offResize(handler, object) {
      var eventTypes = 'resize';

      this.off(eventTypes, handler, object);
    }
  }]);

  return Window;
}();

Object.assign(Window.prototype, keyMixins);
Object.assign(Window.prototype, eventMixins);
Object.assign(Window.prototype, clickMixins);
Object.assign(Window.prototype, mouseMixins);

module.exports = new Window(); ///

function defaultIntermediateResizeHandler(handler, event, element) {
  var window = element,
      ///
  width = window.getWidth(),
      height = window.getHeight();

  handler.call(window, width, height, event);
}

},{"./mixins/click":41,"./mixins/event":42,"./mixins/key":44,"./mixins/mouse":45}],54:[function(require,module,exports){
'use strict';

require('./lib/juxtapose');

},{"./lib/juxtapose":55}],55:[function(require,module,exports){
'use strict';

var easy = require('easy');

var React = easy.React;


Object.defineProperty(window, 'React', {
  get: function get() {
    return React;
  }
});

},{"easy":26}],56:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_RC_BASE_EXTENSION = exports.CARRIAGE_RETURN_CHARACTER = exports.LINE_FEED_CHARACTER = exports.BACKSPACE_CHARACTER = exports.ETX_CHARACTER = exports.CTRL_C = exports.UTF8_ENCODING = exports.DATA_EVENT = exports.APPLICATION_JSON_CHARSET_UTF8_CONTENT_TYPE = exports.POST_METHOD = exports.GET_METHOD = exports.DEFAULT_LOG_FILE_BASE_NAME = exports.DEFAULT_LOG_DIRECTORY_PATH = exports.DEFAULT_LOG_LEVEL = exports.FATAL = exports.ERROR = exports.WARNING = exports.INFO = exports.DEBUG = exports.TRACE = void 0;
var TRACE = "TRACE";
exports.TRACE = TRACE;
var DEBUG = "DEBUG";
exports.DEBUG = DEBUG;
var INFO = "INFO";
exports.INFO = INFO;
var WARNING = "WARNING";
exports.WARNING = WARNING;
var ERROR = "ERROR";
exports.ERROR = ERROR;
var FATAL = "FATAL";
exports.FATAL = FATAL;
var DEFAULT_LOG_LEVEL = WARNING;
exports.DEFAULT_LOG_LEVEL = DEFAULT_LOG_LEVEL;
var DEFAULT_LOG_DIRECTORY_PATH = null;
exports.DEFAULT_LOG_DIRECTORY_PATH = DEFAULT_LOG_DIRECTORY_PATH;
var DEFAULT_LOG_FILE_BASE_NAME = "default";
exports.DEFAULT_LOG_FILE_BASE_NAME = DEFAULT_LOG_FILE_BASE_NAME;
var GET_METHOD = "GET";
exports.GET_METHOD = GET_METHOD;
var POST_METHOD = "POST";
exports.POST_METHOD = POST_METHOD;
var APPLICATION_JSON_CHARSET_UTF8_CONTENT_TYPE = "application/json;charset=UTF-8";
exports.APPLICATION_JSON_CHARSET_UTF8_CONTENT_TYPE = APPLICATION_JSON_CHARSET_UTF8_CONTENT_TYPE;
var DATA_EVENT = "data";
exports.DATA_EVENT = DATA_EVENT;
var UTF8_ENCODING = "utf8";
exports.UTF8_ENCODING = UTF8_ENCODING;
var CTRL_C = "^C";
exports.CTRL_C = CTRL_C;
var ETX_CHARACTER = "\x03";
exports.ETX_CHARACTER = ETX_CHARACTER;
var BACKSPACE_CHARACTER = String.fromCharCode(127);
exports.BACKSPACE_CHARACTER = BACKSPACE_CHARACTER;
var LINE_FEED_CHARACTER = "\n";
exports.LINE_FEED_CHARACTER = LINE_FEED_CHARACTER;
var CARRIAGE_RETURN_CHARACTER = "\r";
exports.CARRIAGE_RETURN_CHARACTER = CARRIAGE_RETURN_CHARACTER;
var DEFAULT_RC_BASE_EXTENSION = "";
exports.DEFAULT_RC_BASE_EXTENSION = DEFAULT_RC_BASE_EXTENSION;

},{}],57:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "pathUtilities", {
  enumerable: true,
  get: function get() {
    return _path["default"];
  }
});
Object.defineProperty(exports, "arrayUtilities", {
  enumerable: true,
  get: function get() {
    return _array["default"];
  }
});
Object.defineProperty(exports, "templateUtilities", {
  enumerable: true,
  get: function get() {
    return _template["default"];
  }
});
Object.defineProperty(exports, "fileSystemUtilities", {
  enumerable: true,
  get: function get() {
    return _fileSystem["default"];
  }
});
Object.defineProperty(exports, "asynchronousUtilities", {
  enumerable: true,
  get: function get() {
    return _asynchronous["default"];
  }
});
Object.defineProperty(exports, "miscellaneousUtilities", {
  enumerable: true,
  get: function get() {
    return _miscellaneous["default"];
  }
});

var _path = _interopRequireDefault(require("./utilities/path"));

var _array = _interopRequireDefault(require("./utilities/array"));

var _template = _interopRequireDefault(require("./utilities/template"));

var _fileSystem = _interopRequireDefault(require("./utilities/fileSystem"));

var _asynchronous = _interopRequireDefault(require("./utilities/asynchronous"));

var _miscellaneous = _interopRequireDefault(require("./utilities/miscellaneous"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

},{"./utilities/array":58,"./utilities/asynchronous":59,"./utilities/fileSystem":60,"./utilities/miscellaneous":61,"./utilities/path":67,"./utilities/template":68}],58:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.first = first;
exports.second = second;
exports.third = third;
exports.fourth = fourth;
exports.fifth = fifth;
exports.fifthLast = fifthLast;
exports.fourthLast = fourthLast;
exports.thirdLast = thirdLast;
exports.secondLast = secondLast;
exports.last = last;
exports.tail = tail;
exports.push = push;
exports.unshift = unshift;
exports.concat = concat;
exports.clear = clear;
exports.copy = copy;
exports.merge = merge;
exports.splice = splice;
exports.replace = replace;
exports.filter = filter;
exports.find = find;
exports.prune = prune;
exports.patch = patch;
exports.augment = augment;
exports.separate = separate;
exports.forwardsSome = forwardsSome;
exports.backwardsSome = backwardsSome;
exports.forwardsEvery = forwardsEvery;
exports.backwardsEvery = backwardsEvery;
exports.forwardsReduce = forwardsReduce;
exports.backwardsReduce = backwardsReduce;
exports.forwardsForEach = forwardsForEach;
exports.backwardsForEach = backwardsForEach;
exports["default"] = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function first(array) {
  return array[0];
}

function second(array) {
  return array[1];
}

function third(array) {
  return array[2];
}

function fourth(array) {
  return array[3];
}

function fifth(array) {
  return array[4];
}

function fifthLast(array) {
  return array[array.length - 5];
}

function fourthLast(array) {
  return array[array.length - 4];
}

function thirdLast(array) {
  return array[array.length - 3];
}

function secondLast(array) {
  return array[array.length - 2];
}

function last(array) {
  return array[array.length - 1];
}

function tail(array) {
  return array.slice(1);
}

function push(array1, array2) {
  Array.prototype.push.apply(array1, array2);
}

function unshift(array1, array2) {
  Array.prototype.unshift.apply(array1, array2);
}

function concat(array1, elementOrArray2) {
  var array2 = elementOrArray2 instanceof Array ? elementOrArray2 : [elementOrArray2];
  push(array1, array2);
}

function clear(array) {
  var start = 0;
  return array.splice(start);
}

function copy(array1, array2) {
  var start = 0,
      deleteCount = array2.length; ///

  splice(array1, start, deleteCount, array2);
}

function merge(array1, array2) {
  Array.prototype.push.apply(array1, array2);
}

function splice(array1, start) {
  var deleteCount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Infinity;
  var array2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var args = [start, deleteCount].concat(_toConsumableArray(array2)),
      deletedItemsArray = Array.prototype.splice.apply(array1, args);
  return deletedItemsArray;
}

function replace(array, element, test) {
  var start = -1;
  var found = array.some(function (element, index) {
    var passed = test(element, index);

    if (passed) {
      start = index; ///

      return true;
    }
  });

  if (found) {
    var deleteCount = 1;
    array.splice(start, deleteCount, element);
  }

  return found;
}

function filter(array, test) {
  var filteredElements = [];
  backwardsForEach(array, function (element, index) {
    var passed = test(element, index);

    if (!passed) {
      var start = index,
          ///
      deleteCount = 1,
          deletedElements = array.splice(start, deleteCount),
          firstDeletedElement = first(deletedElements);
      filteredElements.unshift(firstDeletedElement); ///
    }
  });
  return filteredElements;
}

function find(array, test) {
  var elements = [];
  forwardsForEach(array, function (element, index) {
    var passed = test(element, index);

    if (passed) {
      elements.push(element);
    }
  });
  return elements;
}

function prune(array, test) {
  var prunedElement = undefined;
  array.some(function (element, index) {
    var passed = test(element, index);

    if (!passed) {
      var start = index,
          ///
      deleteCount = 1,
          deletedElements = array.splice(start, deleteCount),
          firstDeletedElement = first(deletedElements);
      prunedElement = firstDeletedElement; ///

      return true;
    }
  });
  return prunedElement;
}

function patch(array, element, test) {
  var found = array.some(function (element, index) {
    var passed = test(element, index);

    if (passed) {
      return true;
    }
  });

  if (found) {
    array.push(element);
  }

  return found;
}

function augment(array1, array2, test) {
  array2.forEach(function (element, index) {
    var passed = test(element, index);

    if (passed) {
      array1.push(element);
    }
  });
}

function separate(array, array1, array2, test) {
  array.forEach(function (element, index) {
    var passed = test(element, index);
    passed ? array1.push(element) : array2.push(element);
  });
}

function forwardsSome(array, callback) {
  var arrayLength = array.length;

  for (var index = 0; index < arrayLength; index++) {
    var element = array[index],
        result = callback(element, index);

    if (result) {
      return true;
    }
  }

  return false;
}

function backwardsSome(array, callback) {
  var arrayLength = array.length;

  for (var index = arrayLength - 1; index >= 0; index--) {
    var element = array[index],
        result = callback(element, index);

    if (result) {
      return true;
    }
  }

  return false;
}

function forwardsEvery(array, callback) {
  var arrayLength = array.length;

  for (var index = 0; index < arrayLength; index++) {
    var element = array[index],
        result = callback(element, index);

    if (!result) {
      return false;
    }
  }

  return true;
}

function backwardsEvery(array, callback) {
  var arrayLength = array.length;

  for (var index = arrayLength - 1; index >= 0; index--) {
    var element = array[index],
        result = callback(element, index);

    if (!result) {
      return false;
    }
  }

  return true;
}

function forwardsReduce(array, callback, initialValue) {
  var value = initialValue;
  forwardsForEach(array, function (element, index) {
    value = callback(value, element, index);
  });
  return value;
}

function backwardsReduce(array, callback, initialValue) {
  var value = initialValue;
  backwardsForEach(array, function (element, index) {
    value = callback(value, element, index);
  });
  return value;
}

function forwardsForEach(array, callback) {
  var arrayLength = array.length;

  for (var index = 0; index < arrayLength; index++) {
    var element = array[index];
    callback(element, index);
  }
}

function backwardsForEach(array, callback) {
  var arrayLength = array.length;

  for (var index = arrayLength - 1; index >= 0; index--) {
    var element = array[index];
    callback(element, index);
  }
}

var _default = {
  first: first,
  second: second,
  third: third,
  fourth: fourth,
  fifth: fifth,
  fifthLast: fifthLast,
  fourthLast: fourthLast,
  thirdLast: thirdLast,
  secondLast: secondLast,
  last: last,
  tail: tail,
  push: push,
  unshift: unshift,
  concat: concat,
  clear: clear,
  copy: copy,
  merge: merge,
  splice: splice,
  replace: replace,
  filter: filter,
  find: find,
  prune: prune,
  patch: patch,
  augment: augment,
  separate: separate,
  forwardsSome: forwardsSome,
  backwardsSome: backwardsSome,
  forwardsEvery: forwardsEvery,
  backwardsEvery: backwardsEvery,
  forwardsReduce: forwardsReduce,
  backwardsReduce: backwardsReduce,
  forwardsForEach: forwardsForEach,
  backwardsForEach: backwardsForEach
};
exports["default"] = _default;

},{}],59:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.whilst = whilst;
exports.forEach = forEach;
exports.sequence = sequence;
exports.eventually = eventually;
exports.repeatedly = repeatedly;
exports.forwardsForEach = forwardsForEach;
exports.backwardsForEach = backwardsForEach;
exports["default"] = void 0;

function whilst(callback, done, context) {
  var count = -1;

  function next() {
    count++;
    var index = count,
        ///
    terminate = callback(next, done, context, index);

    if (terminate) {
      done();
    }
  }

  next();
}

function forEach(array, callback, done, context) {
  var length = array.length; ///

  var count = -1;

  function next() {
    count++;
    var terminate = count === length;

    if (terminate) {
      done();
    } else {
      var index = count,
          ///
      element = array[index];
      callback(element, next, done, context, index);
    }
  }

  next();
}

function sequence(callbacks, done, context) {
  var length = callbacks.length; ///

  var count = -1;

  function next() {
    count++;
    var terminate = count === length;

    if (terminate) {
      done();
    } else {
      var index = count,
          ///
      callback = callbacks[index];
      callback(next, done, context, index);
    }
  }

  next();
}

function eventually(callbacks, done, context) {
  var length = callbacks.length; ///

  var count = 0;

  function next() {
    count++;
    var terminate = count === length;

    if (terminate) {
      done();
    }
  }

  callbacks.forEach(function (callback, index) {
    callback(next, done, context, index);
  });
}

function repeatedly(callback, length, done, context) {
  var count = 0;

  function next() {
    count++;
    var terminate = count === length;

    if (terminate) {
      done();
    }
  }

  for (var index = 0; index < length; index++) {
    callback(next, done, context, index);
  }
}

function forwardsForEach(array, callback, done, context) {
  var length = array.length; ///

  var count = -1;

  function next() {
    count++;
    var terminate = count === length;

    if (terminate) {
      done();
    } else {
      var index = count,
          ///
      element = array[index];
      callback(element, next, done, context, index);
    }
  }

  next();
}

function backwardsForEach(array, callback, done, context) {
  var length = array.length; ///

  var count = length;

  function next() {
    count--;
    var terminate = count === -1;

    if (terminate) {
      done();
    } else {
      var index = count,
          ///
      element = array[index];
      callback(element, next, done, context, index);
    }
  }

  next();
}

var _default = {
  whilst: whilst,
  forEach: forEach,
  sequence: sequence,
  eventually: eventually,
  repeatedly: repeatedly,
  forwardsForEach: forwardsForEach,
  backwardsForEach: backwardsForEach
};
exports["default"] = _default;

},{}],60:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkEntryExists = checkEntryExists;
exports.checkFileExists = checkFileExists;
exports.checkDirectoryExists = checkDirectoryExists;
exports.isEntryFile = isEntryFile;
exports.isEntryDirectory = isEntryDirectory;
exports.isDirectoryEmpty = isDirectoryEmpty;
exports.readDirectory = readDirectory;
exports.readFile = readFile;
exports.writeFile = writeFile;
exports.appendToFile = appendToFile;
exports.createDirectory = createDirectory;
exports.renameFile = renameFile;
exports.getStats = getStats;
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _constants = require("../constants");

var _path = require("../utilities/path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function checkEntryExists(entryPath) {
  var entryExists = _fs["default"].existsSync(entryPath);

  return entryExists;
}

function checkFileExists(filePath) {
  var fileExists = false;
  var entryPath = filePath,
      ///
  entryExists = checkEntryExists(entryPath);

  if (entryExists) {
    var entryFile = isEntryFile(entryPath);

    if (entryFile) {
      fileExists = true;
    }
  }

  return fileExists;
}

function checkDirectoryExists(directoryPath) {
  var directoryExists = false;
  var entryPath = directoryPath,
      ///
  entryExists = checkEntryExists(entryPath);

  if (entryExists) {
    var entryDirectory = isEntryDirectory(entryPath);

    if (entryDirectory) {
      directoryExists = true;
    }
  }

  return directoryExists;
}

function isEntryFile(entryPath) {
  var stat = _fs["default"].statSync(entryPath),
      entryDirectory = stat.isDirectory(),
      entryFile = !entryDirectory;

  return entryFile;
}

function isEntryDirectory(entryPath) {
  var stat = _fs["default"].statSync(entryPath),
      entryDirectory = stat.isDirectory();

  return entryDirectory;
}

function isDirectoryEmpty(directoryPath) {
  var subEntryNames = readDirectory(directoryPath),
      subEntryNamesLength = subEntryNames.length,
      directoryEmpty = subEntryNamesLength === 0;
  return directoryEmpty;
}

function readDirectory(directoryPath) {
  var subEntryNames = _fs["default"].readdirSync(directoryPath);

  return subEntryNames;
}

function readFile(filePath) {
  var encoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.UTF8_ENCODING;

  var options = {
    encoding: encoding
  },
      content = _fs["default"].readFileSync(filePath, options);

  return content;
}

function writeFile(filePath, content) {
  _fs["default"].writeFileSync(filePath, content);
}

function appendToFile(filePath, content) {
  _fs["default"].appendFileSync(filePath, content);
}

function createDirectory(directoryPath) {
  var directoryPathWithoutBottommostName = (0, _path.pathWithoutBottommostNameFromPath)(directoryPath);

  if (directoryPathWithoutBottommostName !== "." && directoryPathWithoutBottommostName !== null) {
    var parentDirectoryPath = directoryPathWithoutBottommostName,
        ///
    parentDirectoryExists = checkDirectoryExists(parentDirectoryPath);

    if (!parentDirectoryExists) {
      createDirectory(parentDirectoryPath);
    }
  }

  _fs["default"].mkdirSync(directoryPath);
}

function renameFile(oldFilePath, newFilePath) {
  _fs["default"].renameSync(oldFilePath, newFilePath);
}

function getStats(filePath) {
  return _fs["default"].statSync(filePath);
}

var _default = {
  checkEntryExists: checkEntryExists,
  checkFileExists: checkFileExists,
  checkDirectoryExists: checkDirectoryExists,
  isEntryFile: isEntryFile,
  isEntryDirectory: isEntryDirectory,
  isDirectoryEmpty: isDirectoryEmpty,
  readDirectory: readDirectory,
  readFile: readFile,
  writeFile: writeFile,
  appendToFile: appendToFile,
  createDirectory: createDirectory,
  renameFile: renameFile,
  getStats: getStats
};
exports["default"] = _default;

},{"../constants":56,"../utilities/path":67,"fs":25}],61:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _rc = _interopRequireDefault(require("./miscellaneous/rc"));

var _log = _interopRequireDefault(require("./miscellaneous/log"));

var _onETX = _interopRequireDefault(require("./miscellaneous/onETX"));

var _prompt = _interopRequireDefault(require("./miscellaneous/prompt"));

var _ajax = require("./miscellaneous/ajax");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  log: _log["default"],
  rc: _rc["default"],
  get: _ajax.get,
  post: _ajax.post,
  onETX: _onETX["default"],
  prompt: _prompt["default"]
};
exports["default"] = _default;

},{"./miscellaneous/ajax":62,"./miscellaneous/log":63,"./miscellaneous/onETX":64,"./miscellaneous/prompt":65,"./miscellaneous/rc":66}],62:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.post = post;

var _constants = require("../../constants");

function get(host, uri, parameters, callback) {
  if (callback === undefined) {
    callback = parameters; ///

    parameters = {};
  }

  var method = _constants.GET_METHOD,
      body = undefined;
  request(host, uri, parameters, method, body, callback);
}

function post(host, uri, json, parameters, callback) {
  if (callback === undefined) {
    callback = parameters; ///

    parameters = {};
  }

  var method = _constants.POST_METHOD,
      body = JSON.stringify(json);
  request(host, uri, parameters, method, body, callback);
}

function request(host, uri, parameters, method, body, callback) {
  var url = urlFromHostURIAndParameters(host, uri, parameters),
      xmlHttpRequest = new XMLHttpRequest();

  xmlHttpRequest.onreadystatechange = function () {
    var readyState = xmlHttpRequest.readyState,
        status = xmlHttpRequest.status,
        responseText = xmlHttpRequest.responseText;

    if (readyState == 4) {
      var json = null;

      if (status == 200) {
        var jsonString = responseText; ///

        try {
          json = JSON.parse(jsonString);
        } catch (error) {///
        }

        callback(json);
      }
    }
  };

  var contentType = _constants.APPLICATION_JSON_CHARSET_UTF8_CONTENT_TYPE;
  xmlHttpRequest.open(method, url);
  xmlHttpRequest.setRequestHeader("content-type", contentType);
  xmlHttpRequest.send(body);
}

function queryStringFromParameters(parameters) {
  var names = Object.keys(parameters),
      namesLength = names.length,
      lastIndex = namesLength - 1,
      queryString = names.reduce(function (queryString, name, index) {
    var value = parameters[name],
        encodedName = encodeURIComponent(name),
        encodedValue = encodeURIComponent(value),
        ampersandOrNothing = index !== lastIndex ? "&" : "";
    queryString += "".concat(encodedName, "=").concat(encodedValue).concat(ampersandOrNothing);
    return queryString;
  }, "");
  return queryString;
}

function urlFromHostURIAndParameters(host, uri, parameters) {
  var queryString = queryStringFromParameters(parameters),
      url = queryString === "" ? "".concat(host).concat(uri) : "".concat(host).concat(uri, "?").concat(queryString);
  return url;
}

},{"../../constants":56}],63:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = log;

var _path = _interopRequireDefault(require("path"));

var _array = require("../../utilities/array");

var _path2 = require("../../utilities/path");

var _fileSystem = require("../../utilities/fileSystem");

var _constants = require("../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var logLevel = _constants.DEFAULT_LOG_LEVEL,
    logFileBaseName = _constants.DEFAULT_LOG_FILE_BASE_NAME,
    logDirectoryPath = _constants.DEFAULT_LOG_DIRECTORY_PATH;

function log(messageOrError) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var salientStackMessageIndex = 1;
  var levels = [_constants.TRACE, _constants.DEBUG, _constants.INFO, _constants.WARNING, _constants.ERROR, _constants.FATAL];

  if (level !== "") {
    var levelIndex = levels.indexOf(level),
        logLevelIndex = levels.indexOf(logLevel);

    if (levelIndex < logLevelIndex) {
      return;
    }

    salientStackMessageIndex += 1;
    level = "".concat(level, " "); ///
  }

  var error, message;

  if (messageOrError instanceof Error) {
    error = messageOrError; ///

    var _error = error;
    message = _error.message;
  } else {
    message = messageOrError; ///

    error = new Error(message);
  }

  var _error2 = error,
      stack = _error2.stack,
      stackMessages = stackMessagesFromStack(stack),
      pertinentStackMessage = stackMessages[salientStackMessageIndex],
      stackMessage = pertinentStackMessage,
      currentDateAndTimeString = getCurrentDateAndTimeString(),
      filePath = filePathFromStackMessage(stackMessage),
      lineNumber = lineNumberFromStackMessage(stackMessage),
      logMessage = "".concat(level).concat(currentDateAndTimeString, " ").concat(filePath, "(").concat(lineNumber, ") ").concat(message);
  console.log(logMessage);

  if (logDirectoryPath !== null) {
    rollOverLogFile();
    var logFilePath = getLogFilePath(),
        logFileContent = "".concat(logMessage, "\n");
    (0, _fileSystem.appendToFile)(logFilePath, logFileContent);
  }

  return logMessage;
}

function trace(message) {
  return log(message, _constants.TRACE);
}

function debug(message) {
  return log(message, _constants.DEBUG);
}

function info(message) {
  return log(message, _constants.INFO);
}

function warning(message) {
  return log(message, _constants.WARNING);
}

function error(message) {
  return log(message, _constants.ERROR);
}

function fatal(message) {
  return log(message, _constants.FATAL);
}

function setLogLevel(level) {
  logLevel = level;
}

function setLogFileBaseName(fileBaseName) {
  logFileBaseName = fileBaseName;
}

function setLogDirectoryPath(directoryPath) {
  logDirectoryPath = directoryPath;
}

function setLogOptions(logOptions) {
  var level = logOptions.level,
      fileBaseName = logOptions.fileBaseName,
      directoryPath = logOptions.directoryPath;
  setLogLevel(level);
  setLogFileBaseName(fileBaseName);
  setLogDirectoryPath(directoryPath);
}

function getLogFileContent() {
  var logFilePath = getLogFilePath(),
      logFileContent = (0, _fileSystem.readFile)(logFilePath);
  return logFileContent;
}

Object.assign(log, {
  TRACE: _constants.TRACE,
  DEBUG: _constants.DEBUG,
  INFO: _constants.INFO,
  WARNING: _constants.WARNING,
  ERROR: _constants.ERROR,
  FATAL: _constants.FATAL,
  trace: trace,
  debug: debug,
  info: info,
  warning: warning,
  error: error,
  fatal: fatal,
  setLogLevel: setLogLevel,
  setLogFileBaseName: setLogFileBaseName,
  setLogDirectoryPath: setLogDirectoryPath,
  setLogOptions: setLogOptions,
  getLogFileContent: getLogFileContent
});

function getLogFilePath() {
  var logFileName = "".concat(logFileBaseName, ".log"),
      logFilePath = (0, _path2.concatenatePaths)(logDirectoryPath, logFileName);
  return logFilePath;
}

function getRolledOverLogFilePath() {
  var currentDateString = getCurrentDateString(),
      rolledOverLogFileName = "".concat(logFileBaseName, ".").concat(currentDateString, ".log"),
      rolledOverLogFilePath = (0, _path2.concatenatePaths)(logDirectoryPath, rolledOverLogFileName);
  return rolledOverLogFilePath;
}

function getLogFileLastModifiedDate() {
  var logFilePath = getLogFilePath(),
      logFileStats = (0, _fileSystem.getStats)(logFilePath),
      mtime = logFileStats.mtime,
      logFileLastModifiedDate = new Date(mtime); ///

  return logFileLastModifiedDate;
}

function rollOverLogFile() {
  var logFilePath = getLogFilePath(),
      logFileExists = (0, _fileSystem.checkFileExists)(logFilePath);

  if (!logFileExists) {
    return;
  }

  var logFileLastModifiedDate = getLogFileLastModifiedDate(),
      logFileLastModifiedDateCurrentDate = isDateCurrentDate(logFileLastModifiedDate);

  if (!logFileLastModifiedDateCurrentDate) {
    var rolledOverLogFilePath = getRolledOverLogFilePath();
    (0, _fileSystem.renameFile)(logFilePath, rolledOverLogFilePath);
  }
}

function isDateCurrentDate(date) {
  var currentDate = new Date(),
      dateString = date.toDateString(),
      currentDateString = currentDate.toDateString(),
      dateCurrentDate = dateString === currentDateString;
  return dateCurrentDate;
}

function getCurrentDateString() {
  var date = new Date(),
      day = padStartWithZeroes(date.getDate(), 2),
      ///
  month = padStartWithZeroes(date.getMonth() + 1, 2),
      ///
  year = date.getFullYear(),
      currentDateAndTimeString = "".concat(day, "-").concat(month, "-").concat(year);
  return currentDateAndTimeString;
}

function getCurrentDateAndTimeString() {
  var date = new Date(),
      day = padStartWithZeroes(date.getDate(), 2),
      ///
  month = padStartWithZeroes(date.getMonth() + 1, 2),
      ///
  year = date.getFullYear(),
      hours = padStartWithZeroes(date.getHours(), 2),
      minutes = padStartWithZeroes(date.getMinutes(), 2),
      seconds = padStartWithZeroes(date.getSeconds(), 2),
      milliseconds = padStartWithZeroes(date.getMilliseconds(), 3),
      currentDateAndTimeString = "".concat(day, "-").concat(month, "-").concat(year, " ").concat(hours, ":").concat(minutes, ":").concat(seconds, ".").concat(milliseconds);
  return currentDateAndTimeString;
}

function stackMessagesFromStack(stack) {
  var stackMessages = [],
      stackLines = stack.split(/\r\n|\n/);
  var stackMessage = "";
  stackLines.forEach(function (stackLine) {
    var matches = /^\s*at.*/.test(stackLine);
    stackMessage = stackMessage === "" ? stackLine : "".concat(stackMessage, "\n").concat(stackLine);

    if (matches) {
      stackMessages.push(stackMessage);
      stackMessage = "";
    }
  });
  return stackMessages;
}

function filePathFromStackMessage(stackMessage) {
  var matches = stackMessage.match(/(\/.+):\d+:\d+/m),
      secondMatch = (0, _array.second)(matches),
      absoluteFilePath = secondMatch,
      ///
  currentWorkingDirectoryPath = _path["default"].resolve("."),
      ///
  currentWorkingDirectoryPathLength = currentWorkingDirectoryPath.length,
      start = currentWorkingDirectoryPathLength + 1,
      ///
  filePath = absoluteFilePath.substr(start);

  return filePath;
}

function lineNumberFromStackMessage(stackMessage) {
  var matches = stackMessage.match(/:(\d+)/m),
      secondMatch = (0, _array.second)(matches),
      lineNumber = secondMatch; ///

  return lineNumber;
}

function padStartWithZeroes(string, targetLength) {
  var padString = "0",
      paddedString = padStart(string, targetLength, padString);
  return paddedString;
}

function padStart(string, targetLength, padString) {
  var padding = "";

  for (var index = 0; index < targetLength; index++) {
    padding += padString;
  }

  var paddedString = "".concat(padding).concat(string).substr(-targetLength);
  return paddedString;
}

},{"../../constants":56,"../../utilities/array":58,"../../utilities/fileSystem":60,"../../utilities/path":67,"path":69}],64:[function(require,module,exports){
(function (process){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = onETX;

var _constants = require("../../constants");

function onETX(handler) {
  var event = _constants.DATA_EVENT;

  if (process.stdin.setRawMode) {
    var rawMode = true,
        encoding = _constants.UTF8_ENCODING;
    process.stdin.setRawMode(rawMode);
    process.stdin.setEncoding(encoding);
    process.stdin.resume();
    process.stdin.addListener(event, dataHandler);
    return offExt;
  }

  function offExt() {
    process.stdin.removeListener(event, dataHandler);
  }

  function dataHandler(character) {
    if (character === _constants.ETX_CHARACTER) {
      handler();
    }
  }
}

}).call(this,require('_process'))

},{"../../constants":56,"_process":70}],65:[function(require,module,exports){
(function (process){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = prompt;

var _onETX = _interopRequireDefault(require("./onETX"));

var _asynchronous = require("../../utilities/asynchronous");

var _constants = require("../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function prompt(options, callback) {
  var value = null,
      _options$attempts = options.attempts,
      attempts = _options$attempts === void 0 ? 3 : _options$attempts,
      context = {
    value: value,
    attempts: attempts,
    options: options
  };
  (0, _asynchronous.whilst)(attempt, function () {
    var value = context.value;
    callback(value);
  }, context);
}

function attempt(next, done, context) {
  var attempts = context.attempts;
  var terminate = attempts-- === 0;

  if (terminate) {
    done();
    return;
  }

  var options = context.options,
      _options$hidden = options.hidden,
      hidden = _options$hidden === void 0 ? false : _options$hidden,
      _options$encoding = options.encoding,
      encoding = _options$encoding === void 0 ? "utf8" : _options$encoding,
      description = options.description,
      _options$initialValue = options.initialValue,
      initialValue = _options$initialValue === void 0 ? "" : _options$initialValue,
      errorMessage = options.errorMessage,
      validationPattern = options.validationPattern,
      validationFunction = options.validationFunction;
  input(description, initialValue, encoding, hidden, callback);

  function callback(value) {
    var valid = validationFunction ? ///
    validationFunction(value) : validationPattern.test(value);

    if (valid) {
      Object.assign(context, {
        value: value
      });
      done();
    } else {
      console.log(errorMessage);
      Object.assign(context, {
        attempts: attempts
      });
      next();
    }
  }
}

function input(description, initialValue, encoding, hidden, callback) {
  var value = initialValue; ///

  var event = _constants.DATA_EVENT,
      rawMode = true,
      offETX = (0, _onETX["default"])(function () {
    console.log(_constants.CTRL_C);
    process.exit();
  });
  process.stdin.setEncoding(encoding);
  process.stdin.setRawMode(rawMode);
  process.stdout.write(description);

  if (!hidden) {
    process.stdout.write(value);
  }

  process.stdin.resume();
  process.stdin.on(event, listener);

  function listener(chunk) {
    var character = chunk.toString(encoding);

    switch (character) {
      case _constants.LINE_FEED_CHARACTER:
      case _constants.CARRIAGE_RETURN_CHARACTER:
        process.stdout.write(_constants.LINE_FEED_CHARACTER);
        process.stdin.removeListener(event, listener);
        process.stdin.pause();
        offETX();
        callback(value);
        break;

      case _constants.BACKSPACE_CHARACTER:
        value = value.slice(0, value.length - 1);
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(description);

        if (!hidden) {
          process.stdout.write(value);
        }

        break;

      default:
        value += character;

        if (!hidden) {
          process.stdout.clearLine();
          process.stdout.cursorTo(0);
          process.stdout.write(description);
          process.stdout.write(value);
        }

        break;
    }
  }
}

}).call(this,require('_process'))

},{"../../constants":56,"../../utilities/asynchronous":59,"./onETX":64,"_process":70}],66:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = rc;

var _path = _interopRequireDefault(require("path"));

var _array = require("../../utilities/array");

var _constants = require("../../constants");

var _fileSystem = require("../../utilities/fileSystem");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var pathResolver = _path["default"].resolve,
    baseExtension = _constants.DEFAULT_RC_BASE_EXTENSION;

function rc() {
  var environmentNameOrArgv = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var environment,
      environmentName,
      environmentNameOrArgvArgv = environmentNameOrArgv instanceof Array;

  if (environmentNameOrArgvArgv) {
    var argv = environmentNameOrArgv; ///

    environmentName = environmentNameFromArgv(argv);
  } else {
    environmentName = environmentNameOrArgv; ///
  }

  var json = readRCFile(),
      environments = json.environments;

  if (environmentName === null) {
    var firstEnvironment = (0, _array.first)(environments);
    environment = firstEnvironment; ///
  } else {
    environment = environments.find(function (environment) {
      var name = environment.name,
          found = name === environmentName;
      return found;
    });
  }

  delete environment.name;
  Object.assign(rc, environment);
  return environment;
}

function readRCFile() {
  var absoluteRCFilePath = absoluteRCFilePathFromNothing(),
      fileContent = (0, _fileSystem.readFile)(absoluteRCFilePath),
      json = JSON.parse(fileContent);
  return json;
}

function writeRCFile(json) {
  var absoluteRCFilePath = absoluteRCFilePathFromNothing(),
      fileContent = JSON.stringify(json, null, "\t");
  (0, _fileSystem.writeFile)(absoluteRCFilePath, fileContent);
}

function updateRCFile(addedProperties) {
  var json = readRCFile();

  if (addedProperties) {
    Object.assign(json, addedProperties);
  }

  for (var _len = arguments.length, deletedPropertyNames = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    deletedPropertyNames[_key - 1] = arguments[_key];
  }

  deletedPropertyNames.forEach(function (deletedPropertyName) {
    delete json[deletedPropertyName];
  });
  writeRCFile(json);
}

function checkRCFileExists() {
  var absoluteRCFilePath = absoluteRCFilePathFromNothing(),
      rcFileExists = (0, _fileSystem.checkFileExists)(absoluteRCFilePath);
  return rcFileExists;
}

function createVacuousRCFile() {
  var json = {
    "environments": [{}]
  };
  writeRCFile(json);
}

function setRCBaseExtension(rcBaseExtension) {
  baseExtension = rcBaseExtension;
}

function setRCPathResolver(rcPathResolver) {
  pathResolver = rcPathResolver;
}

Object.assign(rc, {
  readRCFile: readRCFile,
  writeRCFile: writeRCFile,
  updateRCFile: updateRCFile,
  checkRCFileExists: checkRCFileExists,
  createVacuousRCFile: createVacuousRCFile,
  setRCBaseExtension: setRCBaseExtension,
  setRCPathResolver: setRCPathResolver
});

function environmentNameFromArgv(argv) {
  var environmentName = null;
  argv.find(function (argument) {
    ///
    var matches = argument.match(/--environment=(.+)/),
        found = matches !== null;

    if (found) {
      var secondMatch = (0, _array.second)(matches);
      environmentName = secondMatch;
    }

    return found;
  });
  return environmentName;
}

function absoluteRCFilePathFromNothing() {
  var filePath = "./.".concat(baseExtension, "rc"),
      absoluteRCFilePath = pathResolver(filePath);
  return absoluteRCFilePath;
}

},{"../../constants":56,"../../utilities/array":58,"../../utilities/fileSystem":60,"path":69}],67:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPathName = isPathName;
exports.isPathTopmostName = isPathTopmostName;
exports.isPathRelativePath = isPathRelativePath;
exports.isPathAbsolutePath = isPathAbsolutePath;
exports.isTopmostNameInAbsolutePath = isTopmostNameInAbsolutePath;
exports.combinePaths = combinePaths;
exports.concatenatePaths = concatenatePaths;
exports.bottommostNameFromPath = bottommostNameFromPath;
exports.topmostDirectoryPathFromPath = topmostDirectoryPathFromPath;
exports.topmostDirectoryNameFromPath = topmostDirectoryNameFromPath;
exports.pathWithoutBottommostNameFromPath = pathWithoutBottommostNameFromPath;
exports.pathWithoutTopmostDirectoryNameFromPath = pathWithoutTopmostDirectoryNameFromPath;
exports["default"] = void 0;

var _array = require("../utilities/array");

function isPathName(path) {
  path = path.replace(/^\//, "").replace(/\/$/, ""); ///

  var pathName = /\//.test(path) === false;
  return pathName;
}

function isPathTopmostName(path) {
  var pathName = isPathName(path),
      pathAbsolutePath = isPathAbsolutePath(path),
      pathTopmostName = pathName && pathAbsolutePath;
  return pathTopmostName;
}

function isPathRelativePath(path) {
  var pathRelativePath = !/^\//.test(path);
  return pathRelativePath;
}

function isPathAbsolutePath(path) {
  var pathAbsolutePath = /^\//.test(path);
  return pathAbsolutePath;
}

function isTopmostNameInAbsolutePath(topmostName, absolutePath) {
  var regExp = new RegExp("^".concat(topmostName, "(?:\\/.+)?$")),
      topmostNameInAbsolutePath = regExp.test(absolutePath);
  return topmostNameInAbsolutePath;
}

function combinePaths(path, relativePath) {
  var combinedPath = null;
  var pathNames = path.split(/\//),
      relativePathNames = relativePath.split(/\//);
  var lastPathName,
      firstRelativePathName = (0, _array.first)(relativePathNames);

  if (firstRelativePathName === ".") {
    relativePathNames.shift();
  }

  firstRelativePathName = (0, _array.first)(relativePathNames);
  lastPathName = (0, _array.last)(pathNames);

  while (firstRelativePathName === ".." && lastPathName !== undefined) {
    relativePathNames.shift();
    pathNames.pop();
    firstRelativePathName = (0, _array.first)(relativePathNames);
    lastPathName = (0, _array.last)(pathNames);
  }

  if (lastPathName !== undefined) {
    var combinedPathNames = [].concat(pathNames).concat(relativePathNames);
    combinedPath = combinedPathNames.join("/");
  }

  return combinedPath;
}

function concatenatePaths(path, relativePath) {
  path = path.replace(/\/$/, ""); ///

  var concatenatedPath = "".concat(path, "/").concat(relativePath);
  return concatenatedPath;
}

function bottommostNameFromPath(path) {
  var bottommostName = null;
  var matches = path.match(/^.*\/([^\/]+\/?)$/);

  if (matches !== null) {
    var secondMatch = (0, _array.second)(matches);
    bottommostName = secondMatch; ///
  }

  return bottommostName;
}

function topmostDirectoryPathFromPath(path) {
  var matches = path.match(/^(.+)\/[^\/]+\/?$/),
      secondMatch = (0, _array.second)(matches),
      topmostDirectoryPath = secondMatch; ///

  return topmostDirectoryPath;
}

function topmostDirectoryNameFromPath(path) {
  var topmostDirectoryName = null;
  var matches = path.match(/^([^\/]+)\/.+$/);

  if (matches !== null) {
    var secondMatch = (0, _array.second)(matches);
    topmostDirectoryName = secondMatch; ///
  }

  return topmostDirectoryName;
}

function pathWithoutBottommostNameFromPath(path) {
  var pathWithoutBottommostName = null;
  var matches = path.match(/^(.*)\/[^\/]+\/?$/);

  if (matches !== null) {
    var secondMatch = (0, _array.second)(matches);
    pathWithoutBottommostName = secondMatch; ///
  }

  return pathWithoutBottommostName;
}

function pathWithoutTopmostDirectoryNameFromPath(path) {
  var pathWithoutTopmostDirectoryName = null;
  var matches = path.match(/^[^\/]+\/(.+)$/);

  if (matches !== null) {
    var secondMatch = (0, _array.second)(matches);
    pathWithoutTopmostDirectoryName = secondMatch;
  }

  return pathWithoutTopmostDirectoryName;
}

var _default = {
  isPathName: isPathName,
  isPathTopmostName: isPathTopmostName,
  isPathRelativePath: isPathRelativePath,
  isPathAbsolutePath: isPathAbsolutePath,
  isTopmostNameInAbsolutePath: isTopmostNameInAbsolutePath,
  combinePaths: combinePaths,
  concatenatePaths: concatenatePaths,
  bottommostNameFromPath: bottommostNameFromPath,
  topmostDirectoryPathFromPath: topmostDirectoryPathFromPath,
  topmostDirectoryNameFromPath: topmostDirectoryNameFromPath,
  pathWithoutBottommostNameFromPath: pathWithoutBottommostNameFromPath,
  pathWithoutTopmostDirectoryNameFromPath: pathWithoutTopmostDirectoryNameFromPath
};
exports["default"] = _default;

},{"../utilities/array":58}],68:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseFile = parseFile;
exports.parseContent = parseContent;
exports.parseLine = parseLine;
exports["default"] = void 0;

var _fileSystem = require("../utilities/fileSystem");

function parseFile(filePath, args, regex) {
  var content = (0, _fileSystem.readFile)(filePath),
      parsedContent = parseContent(content, args, regex);
  return parsedContent;
}

function parseContent(content, args, regex) {
  var lines = content.split("\n"),
      parsedLines = parseLines(lines, args, regex),
      parsedContent = parsedLines.join("\n");
  return parsedContent;
}

function parseLine(line, args) {
  var regex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : /\${(.+?)}/g;
  var parsedLine = line.replace(regex, function (match, token) {
    var parsedToken = parseToken(token, args);
    return parsedToken;
  });
  return parsedLine;
}

var _default = {
  parseFile: parseFile,
  parseContent: parseContent,
  parseLine: parseLine
};
exports["default"] = _default;

function parseLines(lines, args, regex) {
  var parsedLines = lines.map(function (line) {
    var parsedLine = parseLine(line, args, regex);
    return parsedLine;
  });
  return parsedLines;
}

function parseToken(token, args) {
  var parsedToken = "";

  if (args.hasOwnProperty(token)) {
    parsedToken = args[token];
  }

  return parsedToken;
}

},{"../utilities/fileSystem":60}],69:[function(require,module,exports){
(function (process){
// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))

},{"_process":70}],70:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],71:[function(require,module,exports){
'use strict';

module.exports = {
  Scheduler: require('./lib/scheduler'),
  controller: require('./lib/controller'),
  SynchronousTask: require('./lib/task/synchronous'),
  AsynchronousTask: require('./lib/task/asynchronous')
};

},{"./lib/controller":72,"./lib/scheduler":74,"./lib/task/asynchronous":76,"./lib/task/synchronous":77}],72:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
  function Controller() {
    _classCallCheck(this, Controller);
  }

  _createClass(Controller, [{
    key: 'assignMethods',
    value: function assignMethods(createMethods, scheduler, model, view) {
      for (var _len = arguments.length, remainingArguments = Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
        remainingArguments[_key - 4] = arguments[_key];
      }

      var methods = createMethods.apply(undefined, [scheduler, model, view].concat(remainingArguments));

      Object.assign(this, methods);
    }
  }]);

  return Controller;
}();

var controller = new Controller();

module.exports = controller;

},{}],73:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var necessary = require('necessary');

var arrayUtilities = necessary.arrayUtilities,
    first = arrayUtilities.first;

var Queue = function () {
  function Queue(tasks) {
    _classCallCheck(this, Queue);

    this.tasks = tasks;
  }

  _createClass(Queue, [{
    key: 'addTask',
    value: function addTask(task) {
      this.tasks.push(task);

      var tasksLength = this.getTasksLength();

      if (tasksLength === 1) {
        this.executeNextTask();
      }
    }
  }, {
    key: 'executeNextTask',
    value: function executeNextTask() {
      var firstTask = first(this.tasks),
          nextTask = firstTask,
          ///
      nextTaskSynchronous = nextTask.isSynchronous();

      if (nextTaskSynchronous) {
        ///
        var synchronousTask = nextTask; ///

        this.executeSynchronousTask(synchronousTask);
      } else {
        var asynchronousTask = nextTask; ///

        this.executeAsynchronousTask(asynchronousTask);
      }
    }
  }, {
    key: 'executeSynchronousTask',
    value: function executeSynchronousTask(synchronousTask) {
      synchronousTask.execute();

      this.next();
    }
  }, {
    key: 'executeAsynchronousTask',
    value: function executeAsynchronousTask(asynchronousTask) {
      asynchronousTask.execute(function () {
        var callback = asynchronousTask.getCallback();

        callback.apply(asynchronousTask, arguments);

        this.next();
      }.bind(this));
    }
  }, {
    key: 'next',
    value: function next() {
      this.tasks.shift();

      var empty = this.isEmpty();

      if (!empty) {
        this.executeNextTask();
      }
    }
  }, {
    key: 'getTasksLength',
    value: function getTasksLength() {
      var tasksLength = this.tasks.length;

      return tasksLength;
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      var tasksLength = this.getTasksLength(),
          empty = tasksLength === 0;

      return empty;
    }
  }], [{
    key: 'fromNothing',
    value: function fromNothing() {
      var tasks = [],
          queue = new Queue(tasks);

      return queue;
    }
  }]);

  return Queue;
}();

module.exports = Queue;

},{"necessary":78}],74:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Queue = require('./queue');

var Scheduler = function () {
  function Scheduler(queue) {
    _classCallCheck(this, Scheduler);

    this.queue = queue;
  }

  _createClass(Scheduler, [{
    key: 'addTaskToQueue',
    value: function addTaskToQueue(task) {
      this.queue.addTask(task);
    }
  }, {
    key: 'executeTaskImmediately',
    value: function executeTaskImmediately(task) {
      var queueEmpty = this.queue.isEmpty(),
          successful = queueEmpty; //

      if (queueEmpty) {
        this.queue.addTask(task);
      }

      return successful;
    }
  }], [{
    key: 'fromNothing',
    value: function fromNothing() {
      var queue = Queue.fromNothing(),
          scheduler = new Scheduler(queue);

      return scheduler;
    }
  }]);

  return Scheduler;
}();

module.exports = Scheduler;

},{"./queue":73}],75:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Task = function () {
  function Task(synchronous, method, remainingArguments) {
    _classCallCheck(this, Task);

    this.synchronous = synchronous;
    this.method = method;
    this.remainingArguments = remainingArguments;
  }

  _createClass(Task, [{
    key: 'isSynchronous',
    value: function isSynchronous() {
      return this.synchronous;
    }
  }, {
    key: 'getMethod',
    value: function getMethod() {
      return this.method;
    }
  }, {
    key: 'getRemainingArguments',
    value: function getRemainingArguments() {
      return this.remainingArguments;
    }
  }]);

  return Task;
}();

module.exports = Task;

},{}],76:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Task = require('../task');

var AsynchronousTask = function (_Task) {
  _inherits(AsynchronousTask, _Task);

  function AsynchronousTask(asynchronousMethod) {
    _classCallCheck(this, AsynchronousTask);

    for (var _len = arguments.length, remainingArgumentsThenCallback = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      remainingArgumentsThenCallback[_key - 1] = arguments[_key];
    }

    var synchronous = false,
        method = asynchronousMethod,
        ///
    callback = remainingArgumentsThenCallback.pop(),
        ///
    remainingArguments = remainingArgumentsThenCallback; ///

    var _this = _possibleConstructorReturn(this, (AsynchronousTask.__proto__ || Object.getPrototypeOf(AsynchronousTask)).call(this, synchronous, method, remainingArguments));

    _this.callback = callback;
    return _this;
  }

  _createClass(AsynchronousTask, [{
    key: 'getCallback',
    value: function getCallback() {
      return this.callback;
    }
  }, {
    key: 'execute',
    value: function execute(callback) {
      var method = this.getMethod(),
          asynchronousMethod = method,
          ///
      remainingArguments = this.getRemainingArguments();

      asynchronousMethod.call.apply(asynchronousMethod, [null].concat(_toConsumableArray(remainingArguments), [callback]));
    }
  }]);

  return AsynchronousTask;
}(Task);

module.exports = AsynchronousTask;

},{"../task":75}],77:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Task = require('../task');

var SynchronousTask = function (_Task) {
  _inherits(SynchronousTask, _Task);

  function SynchronousTask(synchronousMethod) {
    _classCallCheck(this, SynchronousTask);

    var synchronous = true,
        method = synchronousMethod; ///

    for (var _len = arguments.length, remainingArguments = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      remainingArguments[_key - 1] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (SynchronousTask.__proto__ || Object.getPrototypeOf(SynchronousTask)).call(this, synchronous, method, remainingArguments));
  }

  _createClass(SynchronousTask, [{
    key: 'execute',
    value: function execute() {
      var method = this.getMethod(),
          synchronousMethod = method,
          ///
      remainingArguments = this.getRemainingArguments();

      synchronousMethod.call.apply(synchronousMethod, [null].concat(_toConsumableArray(remainingArguments)));
    }
  }]);

  return SynchronousTask;
}(Task);

module.exports = SynchronousTask;

},{"../task":75}],78:[function(require,module,exports){
'use strict';

module.exports = {
  pathUtilities: require('./lib/utilities/path'),
  arrayUtilities: require('./lib/utilities/array'),
  templateUtilities: require('./lib/utilities/template'),
  fileSystemUtilities: require('./lib/utilities/fileSystem'),
  asynchronousUtilities: require('./lib/utilities/asynchronous'),
  miscellaneousUtilities: require('./lib/utilities/miscellaneous')
};

},{"./lib/utilities/array":79,"./lib/utilities/asynchronous":80,"./lib/utilities/fileSystem":81,"./lib/utilities/miscellaneous":82,"./lib/utilities/path":83,"./lib/utilities/template":84}],79:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function first(array) {
  return array[0];
}

function second(array) {
  return array[1];
}

function third(array) {
  return array[2];
}

function fourth(array) {
  return array[3];
}

function fifth(array) {
  return array[4];
}

function fifthLast(array) {
  return array[array.length - 5];
}

function fourthLast(array) {
  return array[array.length - 4];
}

function thirdLast(array) {
  return array[array.length - 3];
}

function secondLast(array) {
  return array[array.length - 2];
}

function last(array) {
  return array[array.length - 1];
}

function tail(array) {
  return array.slice(1);
}

function push(array1, array2) {
  Array.prototype.push.apply(array1, array2);
}

function unshift(array1, array2) {
  Array.prototype.unshift.apply(array1, array2);
}

function clear(array) {
  var start = 0;

  return array.splice(start);
}

function copy(array1, array2) {
  var start = 0,
      deleteCount = array2.length; ///

  splice(array1, start, deleteCount, array2);
}

function merge(array1, array2) {
  var start = array2.length,
      ///
  deleteCount = 0;

  splice(array1, start, deleteCount, array2);
}

function splice(array1, start, deleteCount) {
  var array2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  var args = [start, deleteCount].concat(_toConsumableArray(array2)),
      deletedItemsArray = Array.prototype.splice.apply(array1, args);

  return deletedItemsArray;
}

function replace(array, element, test) {
  var start = -1;

  var found = array.some(function (element, index) {
    var passed = test(element, index);

    if (passed) {
      start = index; ///

      return true;
    }
  });

  if (found) {
    var deleteCount = 1;

    array.splice(start, deleteCount, element);
  }

  return found;
}

function filter(array, test) {
  var filteredElements = [];

  backwardsForEach(array, function (element, index) {
    var passed = test(element, index);

    if (!passed) {
      var start = index,
          ///
      deleteCount = 1,
          deletedElements = array.splice(start, deleteCount),
          firstDeletedElement = first(deletedElements);

      filteredElements.unshift(firstDeletedElement); ///
    }
  });

  return filteredElements;
}

function find(array, test) {
  var elements = [];

  forwardsForEach(array, function (element, index) {
    var passed = test(element, index);

    if (passed) {
      elements.push(element);
    }
  });

  return elements;
}

function prune(array, test) {
  var prunedElement = undefined;

  array.some(function (element, index) {
    var passed = test(element, index);

    if (passed) {
      var start = index,
          ///
      deleteCount = 1,
          deletedElements = array.splice(start, deleteCount),
          firstDeletedElement = first(deletedElements);

      prunedElement = firstDeletedElement; ///

      return true;
    }
  });

  return prunedElement;
}

function patch(array, element, test) {
  var found = array.some(function (element, index) {
    var passed = test(element, index);

    if (passed) {
      return true;
    }
  });

  if (found) {
    array.push(element);
  }

  return found;
}

function augment(array1, array2, test) {
  array2.forEach(function (element, index) {
    var passed = test(element, index);

    if (passed) {
      array1.push(element);
    }
  });
}

function separate(array, array1, array2, test) {
  array.forEach(function (element, index) {
    var passed = test(element, index);

    passed ? array1.push(element) : array2.push(element);
  });
}

function forwardsSome(array, callback) {
  var arrayLength = array.length;

  for (var index = 0; index < arrayLength; index++) {
    var element = array[index],
        result = callback(element, index);

    if (result) {
      return true;
    }
  }

  return false;
}

function backwardsSome(array, callback) {
  var arrayLength = array.length;

  for (var index = arrayLength - 1; index >= 0; index--) {
    var element = array[index],
        result = callback(element, index);

    if (result) {
      return true;
    }
  }

  return false;
}

function forwardsForEach(array, callback) {
  var arrayLength = array.length;

  for (var index = 0; index < arrayLength; index++) {
    var element = array[index];

    callback(element, index);
  }
}

function backwardsForEach(array, callback) {
  var arrayLength = array.length;

  for (var index = arrayLength - 1; index >= 0; index--) {
    var element = array[index];

    callback(element, index);
  }
}

module.exports = {
  first: first,
  second: second,
  third: third,
  fourth: fourth,
  fifth: fifth,
  fifthLast: fifthLast,
  fourthLast: fourthLast,
  thirdLast: thirdLast,
  secondLast: secondLast,
  last: last,
  tail: tail,
  push: push,
  unshift: unshift,
  clear: clear,
  copy: copy,
  merge: merge,
  splice: splice,
  replace: replace,
  filter: filter,
  find: find,
  prune: prune,
  patch: patch,
  augment: augment,
  separate: separate,
  forwardsSome: forwardsSome,
  backwardsSome: backwardsSome,
  forwardsForEach: forwardsForEach,
  backwardsForEach: backwardsForEach
};

},{}],80:[function(require,module,exports){
'use strict';

function whilst(callback, done, context) {
  var count = -1;

  function next() {
    count++;

    var index = count,
        ///
    terminate = callback(next, done, context, index);

    if (terminate) {
      done();
    }
  }

  next();
}

function forEach(array, callback, done, context) {
  var length = array.length; ///

  var count = -1;

  function next() {
    count++;

    var terminate = count === length;

    if (terminate) {
      done();
    } else {
      var index = count,
          ///
      element = array[index];

      callback(element, next, done, context, index);
    }
  }

  next();
}

function sequence(callbacks, done, context) {
  var length = callbacks.length; ///

  var count = -1;

  function next() {
    count++;

    var terminate = count === length;

    if (terminate) {
      done();
    } else {
      var index = count,
          ///
      callback = callbacks[index];

      callback(next, done, context, index);
    }
  }

  next();
}

function eventually(callbacks, done, context) {
  var length = callbacks.length; ///

  var count = 0;

  function next() {
    count++;

    var terminate = count === length;

    if (terminate) {
      done();
    }
  }

  callbacks.forEach(function (callback, index) {
    callback(next, done, context, index);
  });
}

function repeatedly(callback, length, done, context) {
  var count = 0;

  function next() {
    count++;

    var terminate = count === length;

    if (terminate) {
      done();
    }
  }

  for (var index = 0; index < length; index++) {
    callback(next, done, context, index);
  }
}

function forwardsForEach(array, callback, done, context) {
  var length = array.length; ///

  var count = -1;

  function next() {
    count++;

    var terminate = count === length;

    if (terminate) {
      done();
    } else {
      var index = count,
          ///
      element = array[index];

      callback(element, next, done, context, index);
    }
  }

  next();
}

function backwardsForEach(array, callback, done, context) {
  var length = array.length; ///

  var count = length;

  function next() {
    count--;

    var terminate = count === -1;

    if (terminate) {
      done();
    } else {
      var index = count,
          ///
      element = array[index];

      callback(element, next, done, context, index);
    }
  }

  next();
}

module.exports = {
  whilst: whilst,
  forEach: forEach,
  sequence: sequence,
  eventually: eventually,
  repeatedly: repeatedly,
  forwardsForEach: forwardsForEach,
  backwardsForEach: backwardsForEach
};

},{}],81:[function(require,module,exports){
'use strict';

var fs = require('fs');

function entryExists(absolutePath) {
  return fs.existsSync(absolutePath);
}

function fileExists(absoluteFilePath) {
  var fileExists = false;

  var absolutePath = absoluteFilePath,
      ///
  entryExists = entryExists(absolutePath);

  if (entryExists) {
    var entryFile = isEntryFile(absolutePath);

    if (entryFile) {
      fileExists = true;
    }
  }

  return fileExists;
}

function isEntryFile(absolutePath) {
  var stat = fs.statSync(absolutePath),
      entryDirectory = stat.isDirectory(),
      entryFile = !entryDirectory;

  return entryFile;
}

function directoryExists(absoluteDirectoryPath) {
  var directoryExists = false;

  var absolutePath = absoluteDirectoryPath,
      ///
  entryExists = entryExists(absolutePath);

  if (entryExists) {
    var entryDirectory = isEntryDirectory(absolutePath);

    if (entryDirectory) {
      directoryExists = true;
    }
  }

  return directoryExists;
}

function isEntryDirectory(absolutePath) {
  var stat = fs.statSync(absolutePath),
      entryDirectory = stat.isDirectory();

  return entryDirectory;
}

function isDirectoryEmpty(absoluteDirectoryPath) {
  var subEntryNames = readDirectory(absoluteDirectoryPath),
      subEntryNamesLength = subEntryNames.length,
      directoryEmpty = subEntryNamesLength === 0;

  return directoryEmpty;
}

function readDirectory(absoluteDirectoryPath) {
  var subEntryNames = fs.readdirSync(absoluteDirectoryPath);

  return subEntryNames;
}

function readFile(absoluteFilePath) {
  var encoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'utf8';

  var options = {
    encoding: encoding
  },
      content = fs.readFileSync(absoluteFilePath, options);

  return content;
}

function writeFile(absoluteFilePath, content) {
  fs.writeFileSync(absoluteFilePath, content);
}

module.exports = {
  entryExists: entryExists,
  fileExists: fileExists,
  isEntryFile: isEntryFile,
  directoryExists: directoryExists,
  isEntryDirectory: isEntryDirectory,
  isDirectoryEmpty: isDirectoryEmpty,
  readDirectory: readDirectory,
  readFile: readFile,
  writeFile: writeFile
};

},{"fs":25}],82:[function(require,module,exports){
(function (process){
'use strict';

var GET_METHOD = 'GET',
    POST_METHOD = 'POST',
    ETX_CHARACTER = '\x03';

function get(host, uri, parameters, callback) {
  if (callback === undefined) {
    callback = parameters; ///
    parameters = {};
  }

  var method = GET_METHOD,
      body = undefined;

  request(host, uri, parameters, method, body, callback);
}

function post(host, uri, json, parameters, callback) {
  if (callback === undefined) {
    callback = parameters; ///
    parameters = {};
  }

  var method = POST_METHOD,
      body = JSON.stringify(json);

  request(host, uri, parameters, method, body, callback);
}

function onETX(handler) {
  var _process = process,
      stdin = _process.stdin,
      setRawMode = stdin.setRawMode;


  if (setRawMode) {
    var rawMode = true,
        encoding = 'utf8';

    stdin.setRawMode(rawMode);
    stdin.setEncoding(encoding);

    stdin.resume();

    stdin.addListener('data', dataHandler);

    return offExt;
  }

  function offExt() {
    stdin.removeListener('data', dataHandler);
  }

  function dataHandler(character) {
    if (character === ETX_CHARACTER) {
      handler();
    }
  }
}

module.exports = {
  get: get,
  post: post,
  onETX: onETX
};

function request(host, uri, parameters, method, body, callback) {
  var url = urlFromHostURIAndParameters(host, uri, parameters),
      xmlHttpRequest = new XMLHttpRequest();

  xmlHttpRequest.onreadystatechange = function () {
    var readyState = xmlHttpRequest.readyState,
        status = xmlHttpRequest.status,
        responseText = xmlHttpRequest.responseText;


    if (readyState == 4) {
      if (status == 200) {
        var jsonString = responseText,
            ///
        json = JSON.parse(jsonString);

        callback(json);
      } else {
        callback(null);
      }
    }
  };

  xmlHttpRequest.open(method, url, true);

  xmlHttpRequest.send(body);
}

function urlFromHostURIAndParameters(host, uri, parameters) {
  var queryString = queryStringFromParameters(parameters),
      url = queryString === '' ? host + '/' + uri : host + '/' + uri + '?' + queryString;

  return url;
}

function queryStringFromParameters(parameters) {
  var names = Object.keys(parameters),
      namesLength = names.length,
      lastIndex = namesLength - 1,
      queryString = names.reduce(function (queryString, name, index) {
    var value = parameters[name],
        encodedName = encodeURIComponent(name),
        encodedValue = encodeURIComponent(value),
        ampersandOrNothing = index !== lastIndex ? '&' : '';

    queryString += encodedName + '=' + encodedValue + ampersandOrNothing;

    return queryString;
  }, '');

  return queryString;
}

}).call(this,require('_process'))

},{"_process":70}],83:[function(require,module,exports){
'use strict';

var array = require('./array');

var first = array.first,
    second = array.second,
    last = array.last;


function isPathRelativePath(path) {
  var position = path.search(/^\.{1,2}\//),
      pathRelativePath = position !== -1;

  return pathRelativePath;
}

function isPathAbsolutePath(path) {
  var pathRelativePath = isPathRelativePath(path),
      pathAbsolutePath = !pathRelativePath; ///

  return pathAbsolutePath;
}

function isPathTopmostDirectoryName(path) {
  var position = path.search(/^[^\/]+\/?$/),
      pathTopmostDirectoryName = position !== -1;

  return pathTopmostDirectoryName;
}

function isTopmostDirectoryNameContainedInPath(topmostDirectoryName, path) {
  topmostDirectoryName = topmostDirectoryName.replace(/\/$/, ''); ///

  var regExp = new RegExp('^' + topmostDirectoryName + '(?:\\/.+)?$'),
      position = path.search(regExp),
      topmostDirectoryNameContainedInFilePath = position !== -1;

  return topmostDirectoryNameContainedInFilePath;
}

function combinePaths(directoryPath, relativePath) {
  var absolutePath = null;

  var directoryPathSubEntryNames = directoryPath.split('/'),
      relativeFilePathSubEntryNames = relativePath.split('/');

  var firstRelativeFilePathSubEntryName = first(relativeFilePathSubEntryNames),
      lastDirectoryPathSubEntryName = void 0;

  if (firstRelativeFilePathSubEntryName === '.') {
    relativeFilePathSubEntryNames.shift();
  }

  firstRelativeFilePathSubEntryName = first(relativeFilePathSubEntryNames);
  lastDirectoryPathSubEntryName = last(directoryPathSubEntryNames);

  while (firstRelativeFilePathSubEntryName === '..' && lastDirectoryPathSubEntryName !== undefined) {
    relativeFilePathSubEntryNames.shift();
    directoryPathSubEntryNames.pop();

    firstRelativeFilePathSubEntryName = first(relativeFilePathSubEntryNames);
    lastDirectoryPathSubEntryName = last(directoryPathSubEntryNames);
  }

  if (lastDirectoryPathSubEntryName !== undefined) {
    var absoluteFilePathSubEntryNames = [].concat(directoryPathSubEntryNames).concat(relativeFilePathSubEntryNames);

    absolutePath = absoluteFilePathSubEntryNames.join('/');
  }

  return absolutePath;
}

function concatenatePaths(path1, path2) {
  path1 = path1.replace(/\/$/, ''); ///

  var combinedPath = path1 + '/' + path2;

  return combinedPath;
}

function bottommostNameFromPath(path) {
  var bottommostName = null;

  var matches = path.match(/^.+\/([^\/]+\/?)$/);

  if (matches !== null) {
    var secondMatch = second(matches);

    bottommostName = secondMatch; ///
  }

  return bottommostName;
}

function topmostDirectoryPathFromPath(path) {
  var matches = path.match(/^(.+)\/[^\/]+\/?$/),
      secondMatch = second(matches),
      directoryPath = secondMatch; ///

  return directoryPath;
}

function topmostDirectoryNameFromPath(path) {
  var topmostDirectoryName = null;

  var matches = path.match(/^([^\/]+)\/.+$/);

  if (matches !== null) {
    var secondMatch = second(matches);

    topmostDirectoryName = secondMatch; ///
  }

  return topmostDirectoryName;
}

function pathWithoutBottommostNameFromPath(path) {
  var pathWithoutBottommostName = null;

  var matches = path.match(/(^.+)\/[^\/]+\/?$/);

  if (matches !== null) {
    var secondMatch = second(matches);

    pathWithoutBottommostName = secondMatch; ///
  }

  return pathWithoutBottommostName;
}

function pathWithoutTopmostDirectoryNameFromPath(path) {
  var pathWithoutTopmostDirectoryName = null;

  var matches = path.match(/^[^\/]+\/(.+)$/);

  if (matches !== null) {
    var secondMatch = second(matches);

    pathWithoutTopmostDirectoryName = secondMatch;
  }

  return pathWithoutTopmostDirectoryName;
}

module.exports = {
  isPathRelativePath: isPathRelativePath,
  isPathAbsolutePath: isPathAbsolutePath,
  isPathTopmostDirectoryName: isPathTopmostDirectoryName,
  isTopmostDirectoryNameContainedInPath: isTopmostDirectoryNameContainedInPath,
  combinePaths: combinePaths,
  concatenatePaths: concatenatePaths,
  bottommostNameFromPath: bottommostNameFromPath,
  topmostDirectoryPathFromPath: topmostDirectoryPathFromPath,
  topmostDirectoryNameFromPath: topmostDirectoryNameFromPath,
  pathWithoutBottommostNameFromPath: pathWithoutBottommostNameFromPath,
  pathWithoutTopmostDirectoryNameFromPath: pathWithoutTopmostDirectoryNameFromPath
};

},{"./array":79}],84:[function(require,module,exports){
'use strict';

var fileSystemUtilities = require('../utilities/fileSystem');

var readFile = fileSystemUtilities.readFile;


function parseFile(filePath, args) {
  var content = readFile(filePath),
      parsedContent = parseContent(content, args);

  return parsedContent;
}

function parseContent(content, args) {
  var lines = content.split('\n'),
      parsedLines = parseLines(lines, args),
      parsedContent = parsedLines.join('\n');

  return parsedContent;
}

function parseLine(line, args) {
  var parsedLine = line.replace(/\$\{(.+?)\}/g, function (match, token) {
    var parsedToken = parseToken(token, args);

    return parsedToken;
  });

  return parsedLine;
}

module.exports = {
  parseFile: parseFile,
  parseContent: parseContent,
  parseLine: parseLine
};

function parseLines(lines, args) {
  var parsedLines = lines.map(function (line) {
    var parsedLine = parseLine(line, args);

    return parsedLine;
  });

  return parsedLines;
}

function parseToken(token, args) {
  var parsedToken = '';

  if (args.hasOwnProperty(token)) {
    parsedToken = args[token];
  }

  return parsedToken;
}

},{"../utilities/fileSystem":81}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvYWdlbnQuanMiLCJsaWIvY2xpZW50LmpzIiwibGliL2NvbnN0YW50cy5qcyIsImxpYi9jb250ZW50L3RyYW5zZm9ybS5qcyIsImxpYi9leGFtcGxlLmpzIiwibGliL2V4YW1wbGUvZG9jdW1lbnQuanMiLCJsaWIvZXhhbXBsZS9lZGl0YWJsZUNvbnRlbnRUZXh0YXJlYS5qcyIsImxpYi9vcGVyYXRpb24vZGVsZXRlLmpzIiwibGliL29wZXJhdGlvbi9lbXB0eS5qcyIsImxpYi9vcGVyYXRpb24vaW5zZXJ0LmpzIiwibGliL29wZXJhdGlvbnMvZnJvbUpTT04uanMiLCJsaWIvb3BlcmF0aW9ucy9nZW5lcmF0ZS5qcyIsImxpYi9vcGVyYXRpb25zL3RvSlNPTi5qcyIsImxpYi9vcGVyYXRpb25zL3RyYW5zZm9ybS5qcyIsImxpYi9wb3N0ZXIuanMiLCJsaWIvcmVxdWVzdC9pbml0aWFsaXNlLmpzIiwibGliL3JlcXVlc3QvdXBkYXRlLmpzIiwibGliL3Jlc3BvbnNlL2luaXRpYWxpc2UuanMiLCJsaWIvcmVzcG9uc2UvdXBkYXRlLmpzIiwibGliL3N0cmluZ0NvbXBhcmUuanMiLCJsaWIvdGFzay9pbml0aWFsaXNlLmpzIiwibGliL3Rhc2svdXBkYXRlLmpzIiwibGliL3R5cGVzLmpzIiwibGliL3VyaXMuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9saWIvX2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvZG9jdW1lbnQuanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvZWxlbWVudC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi9lbGVtZW50L2JvZHkuanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvZWxlbWVudC9idXR0b24uanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvZWxlbWVudC9jaGVja2JveC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi9lbGVtZW50L2Rpdi5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi9lbGVtZW50L2xpbmsuanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvZWxlbWVudC9zZWxlY3QuanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvZWxlbWVudC9zcGFuLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L2lucHV0RWxlbWVudC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi9pbnB1dEVsZW1lbnQvaW5wdXQuanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvaW5wdXRFbGVtZW50L3RleHRhcmVhLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L21pc2NlbGxhbmVvdXMvYm91bmRzLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L21pc2NlbGxhbmVvdXMvb2Zmc2V0LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L21peGlucy9jbGljay5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi9taXhpbnMvZXZlbnQuanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvbWl4aW5zL2pzeC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi9taXhpbnMva2V5LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L21peGlucy9tb3VzZS5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi9taXhpbnMvcmVzaXplLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L21peGlucy9zY3JvbGwuanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvcmVhY3QuanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvdGV4dEVsZW1lbnQuanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvdXRpbGl0aWVzL2FycmF5LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L3V0aWxpdGllcy9kb20uanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvdXRpbGl0aWVzL29iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi93aW5kb3cuanMiLCJub2RlX21vZHVsZXMvanV4dGFwb3NlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2p1eHRhcG9zZS9lczYvanV4dGFwb3NlLmpzIiwibm9kZV9tb2R1bGVzL25lY2Vzc2FyeS9saWIvY29uc3RhbnRzLmpzIiwibm9kZV9tb2R1bGVzL25lY2Vzc2FyeS9saWIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbmVjZXNzYXJ5L2xpYi91dGlsaXRpZXMvYXJyYXkuanMiLCJub2RlX21vZHVsZXMvbmVjZXNzYXJ5L2xpYi91dGlsaXRpZXMvYXN5bmNocm9ub3VzLmpzIiwibm9kZV9tb2R1bGVzL25lY2Vzc2FyeS9saWIvdXRpbGl0aWVzL2ZpbGVTeXN0ZW0uanMiLCJub2RlX21vZHVsZXMvbmVjZXNzYXJ5L2xpYi91dGlsaXRpZXMvbWlzY2VsbGFuZW91cy5qcyIsIm5vZGVfbW9kdWxlcy9uZWNlc3NhcnkvbGliL3V0aWxpdGllcy9taXNjZWxsYW5lb3VzL2FqYXguanMiLCJub2RlX21vZHVsZXMvbmVjZXNzYXJ5L2xpYi91dGlsaXRpZXMvbWlzY2VsbGFuZW91cy9sb2cuanMiLCJub2RlX21vZHVsZXMvbmVjZXNzYXJ5L2xpYi91dGlsaXRpZXMvbWlzY2VsbGFuZW91cy9vbkVUWC5qcyIsIm5vZGVfbW9kdWxlcy9uZWNlc3NhcnkvbGliL3V0aWxpdGllcy9taXNjZWxsYW5lb3VzL3Byb21wdC5qcyIsIm5vZGVfbW9kdWxlcy9uZWNlc3NhcnkvbGliL3V0aWxpdGllcy9taXNjZWxsYW5lb3VzL3JjLmpzIiwibm9kZV9tb2R1bGVzL25lY2Vzc2FyeS9saWIvdXRpbGl0aWVzL3BhdGguanMiLCJub2RlX21vZHVsZXMvbmVjZXNzYXJ5L2xpYi91dGlsaXRpZXMvdGVtcGxhdGUuanMiLCJub2RlX21vZHVsZXMvcGF0aC1icm93c2VyaWZ5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9zdWZmaWNpZW50L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3N1ZmZpY2llbnQvZXM2L2NvbnRyb2xsZXIuanMiLCJub2RlX21vZHVsZXMvc3VmZmljaWVudC9lczYvcXVldWUuanMiLCJub2RlX21vZHVsZXMvc3VmZmljaWVudC9lczYvc2NoZWR1bGVyLmpzIiwibm9kZV9tb2R1bGVzL3N1ZmZpY2llbnQvZXM2L3Rhc2suanMiLCJub2RlX21vZHVsZXMvc3VmZmljaWVudC9lczYvdGFzay9hc3luY2hyb25vdXMuanMiLCJub2RlX21vZHVsZXMvc3VmZmljaWVudC9lczYvdGFzay9zeW5jaHJvbm91cy5qcyIsIm5vZGVfbW9kdWxlcy9zdWZmaWNpZW50L25vZGVfbW9kdWxlcy9uZWNlc3NhcnkvaW5kZXguanMiLCJub2RlX21vZHVsZXMvc3VmZmljaWVudC9ub2RlX21vZHVsZXMvbmVjZXNzYXJ5L2VzNi91dGlsaXRpZXMvYXJyYXkuanMiLCJub2RlX21vZHVsZXMvc3VmZmljaWVudC9ub2RlX21vZHVsZXMvbmVjZXNzYXJ5L2VzNi91dGlsaXRpZXMvYXN5bmNocm9ub3VzLmpzIiwibm9kZV9tb2R1bGVzL3N1ZmZpY2llbnQvbm9kZV9tb2R1bGVzL25lY2Vzc2FyeS9lczYvdXRpbGl0aWVzL2ZpbGVTeXN0ZW0uanMiLCJub2RlX21vZHVsZXMvc3VmZmljaWVudC9ub2RlX21vZHVsZXMvbmVjZXNzYXJ5L2xpYi91dGlsaXRpZXMvbm9kZV9tb2R1bGVzL3N1ZmZpY2llbnQvbm9kZV9tb2R1bGVzL25lY2Vzc2FyeS9lczYvdXRpbGl0aWVzL21pc2NlbGxhbmVvdXMuanMiLCJub2RlX21vZHVsZXMvc3VmZmljaWVudC9ub2RlX21vZHVsZXMvbmVjZXNzYXJ5L2VzNi91dGlsaXRpZXMvcGF0aC5qcyIsIm5vZGVfbW9kdWxlcy9zdWZmaWNpZW50L25vZGVfbW9kdWxlcy9uZWNlc3NhcnkvZXM2L3V0aWxpdGllcy90ZW1wbGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOzs7Ozs7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7SUFFcUIsSztBQUNuQixp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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzlTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBDbGllbnQgZnJvbSBcIi4vY2xpZW50XCI7XG5cbmltcG9ydCB7IFVQREFURV9JTlRFUlZBTCB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZ2VudCB7XG4gIGNvbnN0cnVjdG9yKGNsaWVudCwgYnVzeSwgZG9jdW1lbnQsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllciwgaW50ZXJ2YWxJZGVudGlmaWVyKSB7XG4gICAgdGhpcy5idXN5ID0gYnVzeTtcbiAgICB0aGlzLmNsaWVudCA9IGNsaWVudDtcbiAgICB0aGlzLmRvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgdGhpcy51c2VySWRlbnRpZmllciA9IHVzZXJJZGVudGlmaWVyO1xuICAgIHRoaXMuc2Vzc2lvbklkZW50aWZpZXIgPSBzZXNzaW9uSWRlbnRpZmllcjtcbiAgICB0aGlzLmludGVydmFsSWRlbnRpZmllciA9IGludGVydmFsSWRlbnRpZmllcjtcbiAgfVxuXG4gIGluaXRpYWxpc2UoY2FsbGJhY2spIHtcbiAgICB0aGlzLmNsaWVudC5pbml0aWFsaXNlKChjb250ZW50LCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpID0+IHtcbiAgICAgIHRoaXMudXNlcklkZW50aWZpZXIgPSB1c2VySWRlbnRpZmllcjtcblxuICAgICAgdGhpcy5zZXNzaW9uSWRlbnRpZmllciA9IHNlc3Npb25JZGVudGlmaWVyO1xuXG4gICAgICB0aGlzLnN0YXJ0VXBkYXRlcygpO1xuXG4gICAgICBjYWxsYmFjayhjb250ZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldERvY3VtZW50KGRvY3VtZW50KSB7XG4gICAgdGhpcy5kb2N1bWVudCA9IGRvY3VtZW50O1xuICB9XG5cbiAgc3RhcnRVcGRhdGVzKCkge1xuICAgIHRoaXMucmVzZXRVcGRhdGVzKCk7XG5cbiAgICBjb25zdCBpbnRlcnZhbCA9IFVQREFURV9JTlRFUlZBTDtcblxuICAgIHRoaXMuaW50ZXJ2YWxJZGVudGlmaWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy51cGRhdGUoKSwgaW50ZXJ2YWwpO1xuICB9XG5cbiAgc3RvcFVwZGF0ZXMoKSB7XG4gICAgdGhpcy5yZXNldFVwZGF0ZXMoKTtcbiAgfVxuXG4gIHJlc2V0VXBkYXRlcygpIHtcbiAgICBpZiAodGhpcy5pbnRlcnZhbElkZW50aWZpZXIgIT09IG51bGwpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElkZW50aWZpZXIpO1xuXG4gICAgICB0aGlzLmludGVydmFsSWRlbnRpZmllciA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIGlmICh0aGlzLmJ1c3kpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB3b3JraW5nQ29udGVudCA9IHRoaXMuZG9jdW1lbnQuZ2V0V29ya2luZ0NvbnRlbnQoKSxcbiAgICAgICAgICBlZGl0YWJsZUNvbnRlbnQgPSB0aGlzLmRvY3VtZW50LmdldEVkaXRhYmxlQ29udGVudCgpO1xuXG4gICAgdGhpcy5idXN5ID0gdHJ1ZTtcblxuICAgIGNvbnN0IHN1Y2Nlc3MgPSB0aGlzLmNsaWVudC51cGRhdGVEb2N1bWVudCh0aGlzLnVzZXJJZGVudGlmaWVyLCB0aGlzLnNlc3Npb25JZGVudGlmaWVyLCB3b3JraW5nQ29udGVudCwgZWRpdGFibGVDb250ZW50LCAoc2Vzc2lvbkV4cGlyZWQsIHBlbmRpbmdPcGVyYXRpb25zKSA9PiB7XG4gICAgXHRpZiAoc2Vzc2lvbkV4cGlyZWQpIHtcblx0XHRcdFx0YWxlcnQoXCJUaGUgc2Vzc2lvbiBoYXMgZXhwaXJlZC4gUGxlYXNlIHJlZnJlc2ghXCIpO1xuXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuICAgICAgdGhpcy5kb2N1bWVudC51cGRhdGUocGVuZGluZ09wZXJhdGlvbnMpO1xuXG4gICAgXHR0aGlzLmJ1c3kgPSBmYWxzZTtcblx0XHR9KTtcblxuICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICB0aGlzLmRvY3VtZW50LnN5bmNocm9uaXNlV29ya2luZ0NvbnRlbnQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5idXN5ID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZyb21Ob3RoaW5nKCkge1xuICAgIGNvbnN0IGNsaWVudCA9IENsaWVudC5mcm9tTm90aGluZygpLFxuICAgICAgICAgIGJ1c3kgPSBmYWxzZSxcbiAgICAgICAgICBkb2N1bWVudCA9IG51bGwsICAvLy9cbiAgICAgICAgICB1c2VySWRlbnRpZmllciA9IG51bGwsICAvLy9cblx0XHRcdFx0XHRzZXNzaW9uSWRlbnRpZmllciA9IG51bGwsXHQvLy9cbiAgICAgICAgICBpbnRlcnZhbElkZW50aWZpZXIgPSBudWxsLCAvLy9cbiAgICAgICAgICBhZ2VudCA9IG5ldyBBZ2VudChjbGllbnQsIGJ1c3ksIGRvY3VtZW50LCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIsIGludGVydmFsSWRlbnRpZmllcik7XG5cbiAgICByZXR1cm4gYWdlbnQ7XG4gIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBTY2hlZHVsZXIgfSBmcm9tIFwic3VmZmljaWVudFwiO1xuXG5pbXBvcnQgVXBkYXRlVGFzayBmcm9tIFwiLi90YXNrL3VwZGF0ZVwiO1xuaW1wb3J0IEluaXRpYWxpc2VUYXNrIGZyb20gXCIuL3Rhc2svaW5pdGlhbGlzZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGllbnQge1xuICBjb25zdHJ1Y3RvcihzY2hlZHVsZXIpIHtcbiAgICB0aGlzLnNjaGVkdWxlciA9IHNjaGVkdWxlcjtcbiAgfVxuXG4gIHVwZGF0ZURvY3VtZW50KHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllciwgd29ya2luZ0NvbnRlbnQsIGVkaXRhYmxlQ29udGVudCwgY2FsbGJhY2spIHtcbiAgICBjb25zdCB1cGRhdGVUYXNrID0gbmV3IFVwZGF0ZVRhc2sodXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyLCB3b3JraW5nQ29udGVudCwgZWRpdGFibGVDb250ZW50LCBjYWxsYmFjayk7XG5cbiAgICBjb25zdCBzdWNjZXNzID0gdGhpcy5zY2hlZHVsZXIuZXhlY3V0ZVRhc2tJbW1lZGlhdGVseSh1cGRhdGVUYXNrKTtcblxuICAgIHJldHVybiBzdWNjZXNzO1xuICB9XG5cbiAgaW5pdGlhbGlzZShjYWxsYmFjaykge1xuICAgIGNvbnN0IGluaXRpYWxpc2VUYXNrID0gbmV3IEluaXRpYWxpc2VUYXNrKGNhbGxiYWNrKTtcblxuICAgIHRoaXMuc2NoZWR1bGVyLmFkZFRhc2tUb1F1ZXVlKGluaXRpYWxpc2VUYXNrKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tTm90aGluZygpIHtcbiAgICBjb25zdCBzY2hlZHVsZXIgPSBTY2hlZHVsZXIuZnJvbU5vdGhpbmcoKSxcbiAgICAgICAgICBjbGllbnQgPSBuZXcgQ2xpZW50KHNjaGVkdWxlcik7XG5cbiAgICByZXR1cm4gY2xpZW50O1xuICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGNvbnN0IFVQREFURV9JTlRFUlZBTCA9IDEwMDA7XG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyYW5zZm9ybUNvbnRlbnQoY29udGVudCwgb3BlcmF0aW9ucykge1xyXG4gIHJldHVybiBvcGVyYXRpb25zLnJlZHVjZSgoY29udGVudCwgb3BlcmF0aW9uKSA9PiB7XHJcbiAgICByZXR1cm4gb3BlcmF0aW9uLnRyYW5zZm9ybUNvbnRlbnQoY29udGVudCk7XHJcbiAgfSwgY29udGVudCk7XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBcImp1eHRhcG9zZVwiO1xuXG5pbXBvcnQgeyBCb2R5IH0gZnJvbVwiZWFzeVwiO1xuXG5pbXBvcnQgQWdlbnQgZnJvbSBcIi4vYWdlbnRcIjtcbmltcG9ydCBEb2N1bWVudCBmcm9tIFwiLi9leGFtcGxlL2RvY3VtZW50XCI7XG5pbXBvcnQgRWRpdGFibGVDb250ZW50VGV4dGFyZWEgZnJvbSBcIi4vZXhhbXBsZS9lZGl0YWJsZUNvbnRlbnRUZXh0YXJlYVwiO1xuXG5jb25zdCBhZ2VudCA9IEFnZW50LmZyb21Ob3RoaW5nKCk7XG5cbmFnZW50LmluaXRpYWxpc2UoKGNvbnRlbnQpID0+IHtcbiAgY29uc3QgYm9keSA9IG5ldyBCb2R5KCksXG4gICAgICAgIGVkaXRhYmxlQ29udGVudCA9IGNvbnRlbnQsICAvLy9cbiAgICAgICAgZWRpdGFibGVDb250ZW50VGV4dGFyZWEgPVxuXG4gICAgICAgICAgPEVkaXRhYmxlQ29udGVudFRleHRhcmVhIG9uS2V5VXA9eygpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFnZW50LnVwZGF0ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2VkaXRhYmxlQ29udGVudH1cbiAgICAgICAgICA8L0VkaXRhYmxlQ29udGVudFRleHRhcmVhPlxuXG4gICAgICAgICxcbiAgICAgICAgZG9jdW1lbnQgPSBEb2N1bWVudC5mcm9tRWRpdGFibGVDb250ZW50VGV4dGFyZWEoZWRpdGFibGVDb250ZW50VGV4dGFyZWEpO1xuXG4gIGFnZW50LnNldERvY3VtZW50KGRvY3VtZW50KTtcblxuICBib2R5LmFwcGVuZChcblxuICAgIDxzZWN0aW9uPlxuICAgICAgPGgxPlxuICAgICAgICBDb25jdXIgRXhhbXBsZVxuICAgICAgPC9oMT5cbiAgICAgIHtlZGl0YWJsZUNvbnRlbnRUZXh0YXJlYX1cbiAgICA8L3NlY3Rpb24+XG5cbiAgKTtcbn0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB0cmFuc2Zvcm1Db250ZW50IGZyb20gXCIuLi9jb250ZW50L3RyYW5zZm9ybVwiO1xuaW1wb3J0IGdlbmVyYXRlT3BlcmF0aW9ucyBmcm9tIFwiLi4vb3BlcmF0aW9ucy9nZW5lcmF0ZVwiO1xuaW1wb3J0IHRyYW5zZm9ybU9wZXJhdGlvbnMgZnJvbSBcIi4uL29wZXJhdGlvbnMvdHJhbnNmb3JtXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IHtcbiAgY29uc3RydWN0b3Iod29ya2luZ0NvbnRlbnQsIGVkaXRhYmxlQ29udGVudFRleHRhcmVhKSB7XG4gICAgdGhpcy53b3JraW5nQ29udGVudCA9IHdvcmtpbmdDb250ZW50O1xuICAgIHRoaXMuZWRpdGFibGVDb250ZW50VGV4dGFyZWEgPSBlZGl0YWJsZUNvbnRlbnRUZXh0YXJlYTtcbiAgfVxuXG4gIGdldFdvcmtpbmdDb250ZW50KCkge1xuICAgIHJldHVybiB0aGlzLndvcmtpbmdDb250ZW50O1xuICB9XG5cbiAgZ2V0RWRpdGFibGVDb250ZW50KCkgeyByZXR1cm4gdGhpcy5lZGl0YWJsZUNvbnRlbnRUZXh0YXJlYS5nZXRFZGl0YWJsZUNvbnRlbnQoKTsgfVxuXG4gIHNldEVkaXRhYmxlQ29udGVudChlZGl0YWJsZUNvbnRlbnQpIHsgdGhpcy5lZGl0YWJsZUNvbnRlbnRUZXh0YXJlYS5zZXRFZGl0YWJsZUNvbnRlbnQoZWRpdGFibGVDb250ZW50KTsgfVxuXG4gIHN5bmNocm9uaXNlV29ya2luZ0NvbnRlbnQoKSB7XG4gICAgY29uc3QgZWRpdGFibGVDb250ZW50ID0gdGhpcy5nZXRFZGl0YWJsZUNvbnRlbnQoKSxcbiAgICAgICAgICB3b3JraW5nQ29udGVudCA9IGVkaXRhYmxlQ29udGVudDsgLy8vXG5cbiAgICB0aGlzLndvcmtpbmdDb250ZW50ID0gd29ya2luZ0NvbnRlbnQ7XG4gIH1cblxuICB1cGRhdGUocGVuZGluZ09wZXJhdGlvbnMpIHtcbiAgICBsZXQgZWRpdGFibGVDb250ZW50ID0gdGhpcy5nZXRFZGl0YWJsZUNvbnRlbnQoKTtcblxuICAgIGNvbnN0IG9wZXJhdGlvbnMgPSB0aGlzLmdlbmVyYXRlT3BlcmF0aW9ucygpLFxuICAgICAgICAgIHRyYW5zZm9ybWVkUGVuZGluZ09wZXJhdGlvbnMgPSB0cmFuc2Zvcm1PcGVyYXRpb25zKHBlbmRpbmdPcGVyYXRpb25zLCBvcGVyYXRpb25zKSxcbiAgICAgICAgICB0cmFuc2Zvcm1lZEVkaXRhYmxlQ29udGVudCA9IHRyYW5zZm9ybUNvbnRlbnQoZWRpdGFibGVDb250ZW50LCB0cmFuc2Zvcm1lZFBlbmRpbmdPcGVyYXRpb25zKSxcbiAgICAgICAgICB0cmFuc2Zvcm1lZFdvcmtpbmdDb250ZW50ID0gdHJhbnNmb3JtQ29udGVudCh0aGlzLndvcmtpbmdDb250ZW50LCBwZW5kaW5nT3BlcmF0aW9ucyk7XG5cbiAgICBlZGl0YWJsZUNvbnRlbnQgPSB0cmFuc2Zvcm1lZEVkaXRhYmxlQ29udGVudDsgLy8vXG5cbiAgICB0aGlzLnNldEVkaXRhYmxlQ29udGVudChlZGl0YWJsZUNvbnRlbnQpO1xuXG4gICAgdGhpcy53b3JraW5nQ29udGVudCA9IHRyYW5zZm9ybWVkV29ya2luZ0NvbnRlbnQ7IC8vL1xuXG4gICAgY29uc3QgdXBUb0RhdGUgPSAoZWRpdGFibGVDb250ZW50ID09PSB0aGlzLndvcmtpbmdDb250ZW50KTtcblxuICAgIHJldHVybiB1cFRvRGF0ZVxuICB9XG5cbiAgZ2VuZXJhdGVPcGVyYXRpb25zKCkge1xuICAgIGNvbnN0IGVkaXRhYmxlQ29udGVudCA9IHRoaXMuZ2V0RWRpdGFibGVDb250ZW50KCksXG4gICAgICAgICAgb3BlcmF0aW9ucyA9IGdlbmVyYXRlT3BlcmF0aW9ucyh0aGlzLndvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnQpO1xuXG4gICAgcmV0dXJuIG9wZXJhdGlvbnM7XG4gIH1cblxuICBzdGF0aWMgZnJvbUVkaXRhYmxlQ29udGVudFRleHRhcmVhKGVkaXRhYmxlQ29udGVudFRleHRhcmVhKSB7XG4gICAgY29uc3QgZWRpdGFibGVDb250ZW50ID0gZWRpdGFibGVDb250ZW50VGV4dGFyZWEuZ2V0RWRpdGFibGVDb250ZW50KCksXG4gICAgICAgICAgd29ya2luZ0NvbnRlbnQgPSBlZGl0YWJsZUNvbnRlbnQsIC8vL1xuICAgICAgICAgIGRvY3VtZW50ID0gbmV3IERvY3VtZW50KHdvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnRUZXh0YXJlYSk7XG5cbiAgICByZXR1cm4gZG9jdW1lbnQ7XG4gIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBJbnB1dEVsZW1lbnQgfSBmcm9tIFwiZWFzeVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0YWJsZUNvbnRlbnRUZXh0YXJlYSBleHRlbmRzIElucHV0RWxlbWVudCB7XG4gIHNldEVkaXRhYmxlQ29udGVudChlZGl0YWJsZUNvbnRlbnQpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGVkaXRhYmxlQ29udGVudDsgIC8vL1xuXG4gICAgdGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XG4gIH1cblxuICBnZXRFZGl0YWJsZUNvbnRlbnQoKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldFZhbHVlKCksXG4gICAgICAgICAgZWRpdGFibGVDb250ZW50ID0gdmFsdWU7IC8vL1xuXG4gICAgcmV0dXJuIGVkaXRhYmxlQ29udGVudDtcbiAgfVxuXG4gIHN0YXRpYyB0YWdOYW1lID0gXCJ0ZXh0YXJlYVwiO1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcGVydGllcyA9IHtcbiAgICBjbGFzc05hbWU6IFwiZWRpdGFibGUgY29udGVudFwiLFxuICAgIHNwZWxsQ2hlY2s6IGZhbHNlXG4gIH07XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHsgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tUHJvcGVydGllcyhFZGl0YWJsZUNvbnRlbnRUZXh0YXJlYSwgcHJvcGVydGllcyk7IH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IEVtcHR5T3BlcmF0aW9uIGZyb20gXCIuLi9vcGVyYXRpb24vZW1wdHlcIjtcclxuXHJcbmltcG9ydCB7IGRlbGV0ZVR5cGUgfSBmcm9tIFwiLi4vdHlwZXNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlbGV0ZU9wZXJhdGlvbiB7XHJcbiAgY29uc3RydWN0b3IodHlwZSwgbGVuZ3RoLCBwb3NpdGlvbikge1xyXG5cdCAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gIH1cclxuXHJcbiAgY2xvbmUoKSB7XHJcbiAgICByZXR1cm4gRGVsZXRlT3BlcmF0aW9uLmZyb21MZW5ndGhBbmRQb3NpdGlvbih0aGlzLmxlbmd0aCwgdGhpcy5wb3NpdGlvbik7XHJcbiAgfVxyXG5cclxuICB0b0pTT04oKSB7XHJcbiAgICBjb25zdCBqc29uID0ge1xyXG5cdCAgICAgICAgICBcInR5cGVcIjogdGhpcy50eXBlLFxyXG4gICAgICAgICAgICBcImxlbmd0aFwiOiB0aGlzLmxlbmd0aCxcclxuICAgICAgICAgICAgXCJwb3NpdGlvblwiOiB0aGlzLnBvc2l0aW9uLFxyXG4gICAgICAgICAgfTtcclxuICAgIFxyXG4gICAgcmV0dXJuIGpzb247XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1PcGVyYXRpb24ob3BlcmF0aW9uKSB7XHJcbiAgICBzd2l0Y2ggKG9wZXJhdGlvbi50eXBlKSB7XHJcbiAgICAgIGNhc2UgXCJpbnNlcnRcIjpcclxuICAgICAgICByZXR1cm4gKCh0YXUsIHJobykgPT4ge1xyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPD0gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbdGF1LmNsb25lKCldO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPiByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA8IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW3RhdS5sZWZ0KHJobykuc2hpZnQodGF1KV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA+PSByaG8ubGVuZ3RoICsgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFtyaG8uc2hpZnQodGF1KV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSkob3BlcmF0aW9uLCB0aGlzKTtcclxuXHJcbiAgICAgIGNhc2UgXCJkZWxldGVcIjpcclxuICAgICAgICByZXR1cm4gKCh0YXUsIHJobykgPT4ge1xyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPCByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgaWYgKHRhdS5sZW5ndGggKyB0YXUucG9zaXRpb24gPD0gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFt0YXUuY2xvbmUoKV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRhdS5sZW5ndGggKyB0YXUucG9zaXRpb24gPD0gcmhvLmxlbmd0aCArIHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgIHJldHVybiBbcmhvLnRha2VuRnJvbSh0YXUpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGF1Lmxlbmd0aCArIHRhdS5wb3NpdGlvbiA+IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW3Joby5zcGxpdCh0YXUpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPT09IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICBpZiAodGF1Lmxlbmd0aCArIHRhdS5wb3NpdGlvbiA8PSByaG8ubGVuZ3RoICsgcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFtFbXB0eU9wZXJhdGlvbi5mcm9tTm90aGluZygpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGF1Lmxlbmd0aCArIHRhdS5wb3NpdGlvbiA+IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW3Joby5zaGlmdChyaG8udGFrZW5Gcm9tKHRhdSkpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPj0gcmhvLmxlbmd0aCArIHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gW3Joby5zaGlmdCh0YXUpXTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uID4gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICh0YXUubGVuZ3RoICsgdGF1LnBvc2l0aW9uIDw9IHJoby5sZW5ndGggKyByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW0VtcHR5T3BlcmF0aW9uLmZyb21Ob3RoaW5nKCldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0YXUubGVuZ3RoICsgdGF1LnBvc2l0aW9uID4gcmhvLmxlbmd0aCArIHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgIHJldHVybiBbcmhvLnNoaWZ0KHJoby50YWtlbkZyb20odGF1KSldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pKG9wZXJhdGlvbiwgdGhpcyk7XHJcblxyXG4gICAgICBjYXNlIFwiZW1wdHlcIjpcclxuICAgICAgICByZXR1cm4gKCh0YXUsIHJobykgPT4ge1xyXG5cclxuICAgICAgICAgIHJldHVybiBbdGF1LmNsb25lKCldO1xyXG5cclxuICAgICAgICB9KShvcGVyYXRpb24sIHRoaXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtQ29udGVudChjb250ZW50KSB7XHJcbiAgICByZXR1cm4gY29udGVudC5zdWJzdHJpbmcoMCwgdGhpcy5wb3NpdGlvbikgKyBjb250ZW50LnN1YnN0cmluZyh0aGlzLmxlbmd0aCArIHRoaXMucG9zaXRpb24pO1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtU2VsZWN0aW9uKHNlbGVjdGlvbikge1xyXG4gICAgbGV0IHRyYW5zZm9ybWVkU2VsZWN0aW9uO1xyXG5cclxuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMubGVuZ3RoLCAgLy8vXHJcbiAgICAgICAgICBzdGFydFBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbiwgLy8vXHJcbiAgICAgICAgICBlbmRQb3NpdGlvbiA9IHN0YXJ0UG9zaXRpb24gKyBsZW5ndGgsXHJcbiAgICAgICAgICBzZWxlY3Rpb25TdGFydFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldFN0YXJ0UG9zaXRpb24oKSxcclxuICAgICAgICAgIHNlbGVjdGlvbkVuZFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldEVuZFBvc2l0aW9uKCk7XHJcblxyXG4gICAgbGV0IG9mZnNldCxcclxuICAgICAgICBlbmRPZmZzZXQ7XHJcblxyXG4gICAgaWYgKGZhbHNlKSB7XHJcblxyXG4gICAgfSBlbHNlIGlmIChzZWxlY3Rpb25TdGFydFBvc2l0aW9uID49IGVuZFBvc2l0aW9uKSB7XHJcbiAgICAgIG9mZnNldCA9IC1sZW5ndGg7XHJcblxyXG4gICAgICB0cmFuc2Zvcm1lZFNlbGVjdGlvbiA9IHNlbGVjdGlvbi5zaGlmdGVkKG9mZnNldCk7XHJcbiAgICB9IGVsc2UgaWYgKHNlbGVjdGlvblN0YXJ0UG9zaXRpb24gPj0gc3RhcnRQb3NpdGlvbikge1xyXG4gICAgICBpZiAoc2VsZWN0aW9uRW5kUG9zaXRpb24gPiBlbmRQb3NpdGlvbikge1xyXG4gICAgICAgIG9mZnNldCA9IHN0YXJ0UG9zaXRpb24gLSBzZWxlY3Rpb25TdGFydFBvc2l0aW9uO1xyXG4gICAgICAgIGVuZE9mZnNldCA9IHNlbGVjdGlvblN0YXJ0UG9zaXRpb24gLSBlbmRQb3NpdGlvbjtcclxuXHJcbiAgICAgICAgdHJhbnNmb3JtZWRTZWxlY3Rpb24gPSBzZWxlY3Rpb24uc2hpZnRlZChvZmZzZXQpLmVuZFBvc2l0aW9uU2hpZnRlZChlbmRPZmZzZXQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IFNlbGVjdGlvbiA9IHNlbGVjdGlvbi5jb25zdHJ1Y3RvcjsgIC8vL1xyXG5cclxuICAgICAgICB0cmFuc2Zvcm1lZFNlbGVjdGlvbiA9IG5ldyBTZWxlY3Rpb24oc3RhcnRQb3NpdGlvbiwgc3RhcnRQb3NpdGlvbik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoc2VsZWN0aW9uRW5kUG9zaXRpb24gPiBlbmRQb3NpdGlvbikge1xyXG4gICAgICBlbmRPZmZzZXQgPSAtbGVuZ3RoO1xyXG5cclxuICAgICAgdHJhbnNmb3JtZWRTZWxlY3Rpb24gPSBzZWxlY3Rpb24uZW5kUG9zaXRpb25TaGlmdGVkKGVuZE9mZnNldCk7XHJcbiAgICB9IGVsc2UgaWYgKHNlbGVjdGlvbkVuZFBvc2l0aW9uID4gc3RhcnRQb3NpdGlvbikge1xyXG4gICAgICBlbmRPZmZzZXQgPSBzdGFydFBvc2l0aW9uIC0gc2VsZWN0aW9uRW5kUG9zaXRpb247XHJcblxyXG4gICAgICB0cmFuc2Zvcm1lZFNlbGVjdGlvbiA9IHNlbGVjdGlvbi5lbmRQb3NpdGlvblNoaWZ0ZWQoZW5kT2Zmc2V0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRyYW5zZm9ybWVkU2VsZWN0aW9uID0gc2VsZWN0aW9uLmNsb25lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRyYW5zZm9ybWVkU2VsZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgc2hpZnRlZChvZmZzZXQpIHtcclxuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMubGVuZ3RoLFxyXG4gICAgICAgICAgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uICsgb2Zmc2V0LFxyXG4gICAgICAgICAgZGVsZXRlT3BlcmF0aW9uID0gRGVsZXRlT3BlcmF0aW9uLmZyb21MZW5ndGhBbmRQb3NpdGlvbihsZW5ndGgsIHBvc2l0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gZGVsZXRlT3BlcmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgc2hpZnQob3BlcmF0aW9uKSB7XHJcbiAgICBjb25zdCBvZmZzZXQgPSAtdGhpcy5sZW5ndGgsXHJcbiAgICAgICAgICBzaGlmdGVkT3BlcmF0aW9uID0gb3BlcmF0aW9uLnNoaWZ0ZWQob2Zmc2V0KTtcclxuXHJcbiAgICByZXR1cm4gc2hpZnRlZE9wZXJhdGlvblxyXG4gIH1cclxuXHJcbiAgdGFrZW5Gcm9tKGRlbGV0ZU9wZXJhdGlvbikge1xyXG4gICAgbGV0IGxlbmd0aCA9IGRlbGV0ZU9wZXJhdGlvbi5sZW5ndGgsXHJcbiAgICAgICAgcG9zaXRpb24gPSBkZWxldGVPcGVyYXRpb24ucG9zaXRpb247XHJcblxyXG4gICAgaWYgKHRoaXMucG9zaXRpb24gPiBwb3NpdGlvbiAmJiB0aGlzLmxlbmd0aCArIHRoaXMucG9zaXRpb24gPj0gbGVuZ3RoICsgcG9zaXRpb24pIHtcclxuICAgICAgbGVuZ3RoID0gdGhpcy5wb3NpdGlvbiAtIHBvc2l0aW9uO1xyXG5cclxuICAgICAgZGVsZXRlT3BlcmF0aW9uID0gRGVsZXRlT3BlcmF0aW9uLmZyb21MZW5ndGhBbmRQb3NpdGlvbihsZW5ndGgsIHBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5wb3NpdGlvbiA8PSBwb3NpdGlvbiAmJiB0aGlzLmxlbmd0aCArIHRoaXMucG9zaXRpb24gPCBsZW5ndGggKyBwb3NpdGlvbikge1xyXG4gICAgICBsZW5ndGggPSBsZW5ndGggKyBwb3NpdGlvbiAtIHRoaXMucG9zaXRpb24gLSB0aGlzLmxlbmd0aDtcclxuICAgICAgcG9zaXRpb24gPSB0aGlzLmxlbmd0aCArIHRoaXMucG9zaXRpb247XHJcblxyXG4gICAgICBkZWxldGVPcGVyYXRpb24gPSBEZWxldGVPcGVyYXRpb24uZnJvbUxlbmd0aEFuZFBvc2l0aW9uKGxlbmd0aCwgcG9zaXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkZWxldGVPcGVyYXRpb247XHJcbiAgfVxyXG5cclxuICBzcGxpdChkZWxldGVPcGVyYXRpb24pIHtcclxuICAgIGxldCBsZW5ndGggPSBkZWxldGVPcGVyYXRpb24ubGVuZ3RoLFxyXG4gICAgICAgIHBvc2l0aW9uID0gZGVsZXRlT3BlcmF0aW9uLnBvc2l0aW9uO1xyXG5cclxuICAgIGxlbmd0aCA9IGxlbmd0aCAtIHRoaXMubGVuZ3RoO1xyXG5cclxuICAgIGRlbGV0ZU9wZXJhdGlvbiA9IERlbGV0ZU9wZXJhdGlvbi5mcm9tTGVuZ3RoQW5kUG9zaXRpb24obGVuZ3RoLCBwb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIGRlbGV0ZU9wZXJhdGlvbjtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tTGVuZ3RoQW5kUG9zaXRpb24obGVuZ3RoLCBwb3NpdGlvbikge1xyXG4gICAgY29uc3QgdHlwZSA9IGRlbGV0ZVR5cGUsIC8vL1xyXG4gICAgICAgICAgZGVsZXRlT3BlcmF0aW9uID0gbmV3IERlbGV0ZU9wZXJhdGlvbih0eXBlLCBsZW5ndGgsIHBvc2l0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gZGVsZXRlT3BlcmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcclxuICAgIGNvbnN0IHR5cGUgPSBqc29uW1widHlwZVwiXSxcclxuICAgICAgICAgIGxlbmd0aCA9IGpzb25bXCJsZW5ndGhcIl0sXHJcbiAgICAgICAgICBwb3NpdGlvbiA9IGpzb25bXCJwb3NpdGlvblwiXSxcclxuICAgICAgICAgIGRlbGV0ZU9wZXJhdGlvbiA9IG5ldyBEZWxldGVPcGVyYXRpb24odHlwZSwgbGVuZ3RoLCBwb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIGRlbGV0ZU9wZXJhdGlvbjtcclxuICB9XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5pbXBvcnQgeyBlbXB0eVR5cGUgfSBmcm9tIFwiLi4vdHlwZXNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVtcHR5T3BlcmF0aW9uIHtcclxuICBjb25zdHJ1Y3Rvcih0eXBlKSB7XHJcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG5cclxuXHJcbiAgfVxyXG5cclxuICBjbG9uZSgpIHtcclxuICAgIHJldHVybiBFbXB0eU9wZXJhdGlvbi5mcm9tTm90aGluZygpO1xyXG4gIH1cclxuXHJcbiAgdG9KU09OKCkge1xyXG4gICAgY29uc3QganNvbiA9IHtcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IHRoaXMudHlwZVxyXG4gICAgICAgICAgfTtcclxuXHJcblxyXG4gICAgXHJcbiAgICByZXR1cm4ganNvbjtcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybU9wZXJhdGlvbihvcGVyYXRpb24pIHtcclxuICAgIHJldHVybiAoKHRhdSwgcmhvKSA9PiB7XHJcblxyXG4gICAgICByZXR1cm4gW3RhdS5jbG9uZSgpXTtcclxuXHJcbiAgICB9KShvcGVyYXRpb24sIHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtQ29udGVudChjb250ZW50KSB7XHJcbiAgICByZXR1cm4gY29udGVudDtcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybVNlbGVjdGlvbihzZWxlY3Rpb24pIHtcclxuICAgIGNvbnN0IHRyYW5zZm9ybWVkU2VsZWN0aW9uID0gc2VsZWN0aW9uLmNsb25lKCk7XHJcblxyXG4gICAgcmV0dXJuIHRyYW5zZm9ybWVkU2VsZWN0aW9uO1xyXG4gIH1cclxuXHJcblxyXG5cclxuICBzaGlmdChvcGVyYXRpb24pIHtcclxuICBcdGNvbnN0IG9mZnNldCA9IDAsXHJcbiAgICAgICAgICBzaGlmdGVkT3BlcmF0aW9uID0gb3BlcmF0aW9uLnNoaWZ0ZWQob2Zmc2V0KTtcclxuXHJcbiAgXHRyZXR1cm4gc2hpZnRlZE9wZXJhdGlvbjtcclxuICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuICBzdGF0aWMgZnJvbU5vdGhpbmcoKSB7XHJcbiAgICBjb25zdCB0eXBlID0gZW1wdHlUeXBlLCAvLy9cclxuICAgICAgICAgICAgZW1wdHlPcGVyYXRpb24gPSBuZXcgRW1wdHlPcGVyYXRpb24odHlwZSk7XHJcblxyXG4gICAgcmV0dXJuIGVtcHR5T3BlcmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcclxuICAgIGNvbnN0IHR5cGUgPSBqc29uW1widHlwZVwiXSxcclxuICAgICAgICAgIGVtcHR5T3BlcmF0aW9uID0gbmV3IEVtcHR5T3BlcmF0aW9uKHR5cGUpO1xyXG5cclxuICAgIHJldHVybiBlbXB0eU9wZXJhdGlvbjtcclxuICB9XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5pbXBvcnQgc3RyaW5nQ29tcGFyZSBmcm9tIFwiLi4vc3RyaW5nQ29tcGFyZVwiO1xyXG5pbXBvcnQgRGVsZXRlT3BlcmF0aW9uIGZyb20gXCIuLi9vcGVyYXRpb24vZGVsZXRlXCI7XHJcblxyXG5pbXBvcnQgeyBpbnNlcnRUeXBlIH0gZnJvbSBcIi4uL3R5cGVzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnNlcnRPcGVyYXRpb24ge1xyXG4gIGNvbnN0cnVjdG9yKHR5cGUsIHN0cmluZywgcG9zaXRpb24pIHtcclxuXHQgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICB0aGlzLnN0cmluZyA9IHN0cmluZztcclxuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICB9XHJcblxyXG4gIGNsb25lKCkge1xyXG4gICAgcmV0dXJuIEluc2VydE9wZXJhdGlvbi5mcm9tU3RyaW5nQW5kUG9zaXRpb24odGhpcy5zdHJpbmcsIHRoaXMucG9zaXRpb24pO1xyXG4gIH1cclxuXHJcbiAgdG9KU09OKCkge1xyXG4gICAgY29uc3QganNvbiA9IHtcclxuXHQgICAgICAgICAgXCJ0eXBlXCI6IHRoaXMudHlwZSxcclxuICAgICAgICAgICAgXCJzdHJpbmdcIjogdGhpcy5zdHJpbmcsXHJcbiAgICAgICAgICAgIFwicG9zaXRpb25cIjogdGhpcy5wb3NpdGlvblxyXG4gICAgICAgICAgfTtcclxuICAgIFxyXG4gICAgcmV0dXJuIGpzb247XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1PcGVyYXRpb24ob3BlcmF0aW9uKSB7XHJcbiAgICBzd2l0Y2ggKG9wZXJhdGlvbi50eXBlKSB7XHJcbiAgICAgIGNhc2UgXCJpbnNlcnRcIjpcclxuICAgICAgICByZXR1cm4gKCh0YXUsIHJobykgPT4ge1xyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPCByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIFt0YXUuY2xvbmUoKV07XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA9PT0gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICh0YXUuc3RyaW5nID09PSByaG8uc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIFt0YXUuY2xvbmUoKV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRhdS5zdHJpbmcgIT09IHJoby5zdHJpbmcpIHtcclxuICAgICAgICAgICAgICBpZiAoc3RyaW5nQ29tcGFyZShyaG8uc3RyaW5nLCB0YXUuc3RyaW5nKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtyaG8uc2hpZnQodGF1KV07XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbdGF1LmNsb25lKCldO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPiByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtyaG8uc2hpZnQodGF1KV07XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pKG9wZXJhdGlvbiwgdGhpcyk7XHJcblxyXG4gICAgICBjYXNlIFwiZGVsZXRlXCI6XHJcbiAgICAgICAgcmV0dXJuICgodGF1LCByaG8pID0+IHtcclxuXHJcbiAgICAgICAgICBpZiAodGF1LnBvc2l0aW9uICsgdGF1Lmxlbmd0aCA8PSByaG8ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIFt0YXUuY2xvbmUoKV07XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHRhdS5wb3NpdGlvbiA8IHJoby5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gW3Joby5sZWZ0KHRhdSksIHJoby5sZWZ0KHRhdSkuc2hpZnQocmhvLnNoaWZ0KHJoby5yaWdodCh0YXUpKSldO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0YXUucG9zaXRpb24gPj0gcmhvLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbcmhvLnNoaWZ0KHRhdSldO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KShvcGVyYXRpb24sIHRoaXMpO1xyXG5cclxuICAgICAgY2FzZSBcImVtcHR5XCI6XHJcbiAgICAgICAgcmV0dXJuICgodGF1LCByaG8pID0+IHtcclxuXHJcbiAgICAgICAgICByZXR1cm4gW3RhdS5jbG9uZSgpXTtcclxuXHJcbiAgICAgICAgfSkob3BlcmF0aW9uLCB0aGlzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybUNvbnRlbnQoY29udGVudCkge1xyXG4gICAgcmV0dXJuIGNvbnRlbnQuc3Vic3RyaW5nKDAsIHRoaXMucG9zaXRpb24pICsgdGhpcy5zdHJpbmcgKyBjb250ZW50LnN1YnN0cmluZyh0aGlzLnBvc2l0aW9uKTtcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybVNlbGVjdGlvbihzZWxlY3Rpb24pIHtcclxuICAgIGxldCB0cmFuc2Zvcm1lZFNlbGVjdGlvbjtcclxuXHJcbiAgICBjb25zdCBzdGFydFBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbiwgLy8vXHJcbiAgICAgICAgICBsZW5ndGggPSB0aGlzLnN0cmluZy5sZW5ndGgsXHJcbiAgICAgICAgICBzZWxlY3Rpb25TdGFydFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldFN0YXJ0UG9zaXRpb24oKSxcclxuICAgICAgICAgIHNlbGVjdGlvbkVuZFBvc2l0aW9uID0gc2VsZWN0aW9uLmdldEVuZFBvc2l0aW9uKCksXHJcbiAgICAgICAgICBvZmZzZXQgPSBsZW5ndGgsICAvLy9cclxuICAgICAgICAgIGVuZE9mZnNldCA9IG9mZnNldDsgLy8vXHJcblxyXG4gICAgaWYgKGZhbHNlKSB7XHJcblxyXG4gICAgfSBlbHNlIGlmIChzZWxlY3Rpb25TdGFydFBvc2l0aW9uID49IHN0YXJ0UG9zaXRpb24pIHtcclxuICAgICAgdHJhbnNmb3JtZWRTZWxlY3Rpb24gPSBzZWxlY3Rpb24uc2hpZnRlZChvZmZzZXQpO1xyXG4gICAgfSBlbHNlIGlmIChzZWxlY3Rpb25FbmRQb3NpdGlvbiA+IHN0YXJ0UG9zaXRpb24pIHtcclxuICAgICAgdHJhbnNmb3JtZWRTZWxlY3Rpb24gPSBzZWxlY3Rpb24uZW5kUG9zaXRpb25TaGlmdGVkKGVuZE9mZnNldCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0cmFuc2Zvcm1lZFNlbGVjdGlvbiA9IHNlbGVjdGlvbi5jbG9uZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cmFuc2Zvcm1lZFNlbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIHNoaWZ0ZWQob2Zmc2V0KSB7XHJcbiAgICBjb25zdCBzdHJpbmcgPSB0aGlzLnN0cmluZyxcclxuICAgICAgICAgIHBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbiArIG9mZnNldCxcclxuICAgICAgICAgIGluc2VydE9wZXJhdGlvbiA9IEluc2VydE9wZXJhdGlvbi5mcm9tU3RyaW5nQW5kUG9zaXRpb24oc3RyaW5nLCBwb3NpdGlvbik7XHJcblxyXG4gICAgcmV0dXJuIGluc2VydE9wZXJhdGlvbjtcclxuICB9XHJcblxyXG4gIHNoaWZ0KG9wZXJhdGlvbikge1xyXG4gICAgY29uc3QgbGVuZ3RoID0gdGhpcy5zdHJpbmcubGVuZ3RoLFxyXG5cdFx0XHRcdCAgb2Zmc2V0ID0gbGVuZ3RoLCAgLy8vXHJcbiAgICAgICAgICBzaGlmdGVkT3BlcmF0aW9uID0gb3BlcmF0aW9uLnNoaWZ0ZWQob2Zmc2V0KTtcclxuXHJcbiAgICByZXR1cm4gc2hpZnRlZE9wZXJhdGlvbjtcclxuICB9XHJcblxyXG4gIGxlZnQoZGVsZXRlT3BlcmF0aW9uKSB7XHJcbiAgICBjb25zdCBwb3NpdGlvbiA9IGRlbGV0ZU9wZXJhdGlvbi5wb3NpdGlvbixcclxuICAgICAgICAgIGxlbmd0aCA9IHRoaXMucG9zaXRpb24gLSBwb3NpdGlvbjtcclxuXHJcbiAgICBkZWxldGVPcGVyYXRpb24gPSBEZWxldGVPcGVyYXRpb24uZnJvbUxlbmd0aEFuZFBvc2l0aW9uKGxlbmd0aCwgcG9zaXRpb24pO1xyXG5cclxuICAgIHJldHVybiBkZWxldGVPcGVyYXRpb247XHJcbiAgfVxyXG5cclxuICByaWdodChkZWxldGVPcGVyYXRpb24pIHtcclxuICAgIGxldCBsZW5ndGggPSBkZWxldGVPcGVyYXRpb24ubGVuZ3RoLFxyXG4gICAgICAgIHBvc2l0aW9uID0gZGVsZXRlT3BlcmF0aW9uLnBvc2l0aW9uO1xyXG5cclxuICAgIGxlbmd0aCA9IGxlbmd0aCAtIHRoaXMucG9zaXRpb24gKyBwb3NpdGlvbjtcclxuICAgIHBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbjtcclxuXHJcbiAgICBkZWxldGVPcGVyYXRpb24gPSBEZWxldGVPcGVyYXRpb24uZnJvbUxlbmd0aEFuZFBvc2l0aW9uKGxlbmd0aCwgcG9zaXRpb24pO1xyXG5cclxuICAgIHJldHVybiBkZWxldGVPcGVyYXRpb247XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbVN0cmluZ0FuZFBvc2l0aW9uKHN0cmluZywgcG9zaXRpb24pIHtcclxuICAgIGNvbnN0IHR5cGUgPSBpbnNlcnRUeXBlLCAgLy8vXHJcbiAgICAgICAgICBpbnNlcnRPcGVyYXRpb24gPSBuZXcgSW5zZXJ0T3BlcmF0aW9uKHR5cGUsIHN0cmluZywgcG9zaXRpb24pO1xyXG5cclxuICAgIHJldHVybiBpbnNlcnRPcGVyYXRpb247XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xyXG4gICAgY29uc3QgdHlwZSA9IGpzb25bXCJ0eXBlXCJdLFxyXG4gICAgICAgICAgc3RyaW5nID0ganNvbltcInN0cmluZ1wiXSxcclxuICAgICAgICAgIHBvc2l0aW9uID0ganNvbltcInBvc2l0aW9uXCJdLFxyXG4gICAgICAgICAgaW5zZXJ0T3BlcmF0aW9uID0gbmV3IEluc2VydE9wZXJhdGlvbih0eXBlLCBzdHJpbmcsIHBvc2l0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gaW5zZXJ0T3BlcmF0aW9uO1xyXG4gIH1cclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmltcG9ydCBFbXB0eU9wZXJhdGlvbiBmcm9tIFwiLi4vb3BlcmF0aW9uL2VtcHR5XCI7XHJcbmltcG9ydCBEZWxldGVPcGVyYXRpb24gZnJvbSBcIi4uL29wZXJhdGlvbi9kZWxldGVcIjtcclxuaW1wb3J0IEluc2VydE9wZXJhdGlvbiBmcm9tIFwiLi4vb3BlcmF0aW9uL2luc2VydFwiO1xyXG5cclxuaW1wb3J0IHsgZW1wdHlUeXBlLCBkZWxldGVUeXBlLCBpbnNlcnRUeXBlIH0gZnJvbSBcIi4uL3R5cGVzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvcGVyYXRpb25zRnJvbUpTT04ob3BlcmF0aW9uc0pTT04pIHtcclxuICBjb25zdCBvcGVyYXRpb25zID0gb3BlcmF0aW9uc0pTT04ubWFwKChvcGVyYXRpb25KU09OKSA9PiB7XHJcbiAgICBsZXQgb3BlcmF0aW9uO1xyXG5cclxuICAgIGNvbnN0IGpzb24gPSBvcGVyYXRpb25KU09OLCAvLy9cclxuICAgICAgICAgIHR5cGUgPSBqc29uW1widHlwZVwiXTtcclxuXHJcbiAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgY2FzZSBlbXB0eVR5cGU6XHJcbiAgICAgICAgb3BlcmF0aW9uID0gRW1wdHlPcGVyYXRpb24uZnJvbUpTT04oanNvbik7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIGRlbGV0ZVR5cGU6XHJcbiAgICAgICAgb3BlcmF0aW9uID0gRGVsZXRlT3BlcmF0aW9uLmZyb21KU09OKGpzb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSBpbnNlcnRUeXBlOlxyXG4gICAgICAgIG9wZXJhdGlvbiA9IEluc2VydE9wZXJhdGlvbi5mcm9tSlNPTihqc29uKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb3BlcmF0aW9uO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gb3BlcmF0aW9ucztcclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmltcG9ydCBJbnNlcnRPcGVyYXRpb24gZnJvbSBcIi4uL29wZXJhdGlvbi9pbnNlcnRcIjtcclxuaW1wb3J0IERlbGV0ZU9wZXJhdGlvbiBmcm9tIFwiLi4vb3BlcmF0aW9uL2RlbGV0ZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2VuZXJhdGVPcGVyYXRpb25zKHdvcmtpbmdDb250ZW50LCBlZGl0YWJsZUNvbnRlbnQpIHtcclxuICBjb25zdCBvcGVyYXRpb25zID0gW107XHJcbiAgXHJcbiAgbGV0IGxlZnQsIHJpZ2h0LCBsZW5ndGgsIHN0cmluZywgcG9zaXRpb247XHJcblxyXG4gIGZvciAobGVmdCA9IDA7IChsZWZ0IDwgd29ya2luZ0NvbnRlbnQubGVuZ3RoKSAmJiAobGVmdCA8IGVkaXRhYmxlQ29udGVudC5sZW5ndGgpICYmICh3b3JraW5nQ29udGVudFtsZWZ0XSA9PT0gZWRpdGFibGVDb250ZW50W2xlZnRdKTsgbGVmdCsrKSB7fVxyXG5cclxuICBmb3IgKHJpZ2h0ID0gMDsgKHJpZ2h0IDwgd29ya2luZ0NvbnRlbnQubGVuZ3RoIC0gbGVmdCkgJiYgKHJpZ2h0IDwgZWRpdGFibGVDb250ZW50Lmxlbmd0aCAtIGxlZnQpICYmICh3b3JraW5nQ29udGVudFt3b3JraW5nQ29udGVudC5sZW5ndGggLSByaWdodCAtIDFdID09PSBlZGl0YWJsZUNvbnRlbnRbZWRpdGFibGVDb250ZW50Lmxlbmd0aCAtIHJpZ2h0IC0gMV0pOyByaWdodCsrKSB7fVxyXG5cclxuICBpZiAobGVmdCArIHJpZ2h0ICE9PSB3b3JraW5nQ29udGVudC5sZW5ndGgpIHtcclxuICAgIGxlbmd0aCA9IHdvcmtpbmdDb250ZW50Lmxlbmd0aCAtIGxlZnQgLSByaWdodDsgIC8vL1xyXG4gICAgcG9zaXRpb24gPSBsZWZ0OyAvLy9cclxuICAgIFxyXG4gICAgY29uc3QgZGVsZXRlT3BlcmF0aW9uID0gRGVsZXRlT3BlcmF0aW9uLmZyb21MZW5ndGhBbmRQb3NpdGlvbihsZW5ndGgsIHBvc2l0aW9uKTtcclxuXHJcbiAgICBvcGVyYXRpb25zLnB1c2goZGVsZXRlT3BlcmF0aW9uKTtcclxuICB9XHJcblxyXG4gIGlmIChsZWZ0ICsgcmlnaHQgIT09IGVkaXRhYmxlQ29udGVudC5sZW5ndGgpIHtcclxuICAgIHN0cmluZyA9IGVkaXRhYmxlQ29udGVudC5zdWJzdHJpbmcobGVmdCwgZWRpdGFibGVDb250ZW50Lmxlbmd0aCAtIHJpZ2h0KTsgIC8vL1xyXG4gICAgcG9zaXRpb24gPSBsZWZ0OyAvLy9cclxuICAgIFxyXG4gICAgY29uc3QgaW5zZXJ0T3BlcmF0aW9uID0gSW5zZXJ0T3BlcmF0aW9uLmZyb21TdHJpbmdBbmRQb3NpdGlvbihzdHJpbmcsIHBvc2l0aW9uKTtcclxuXHJcbiAgICBvcGVyYXRpb25zLnB1c2goaW5zZXJ0T3BlcmF0aW9uKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBvcGVyYXRpb25zO1xyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb3BlcmF0aW9uc1RvSlNPTihvcGVyYXRpb25zKSB7XHJcbiAgcmV0dXJuIG9wZXJhdGlvbnMubWFwKChvcGVyYXRpb24pID0+IHtcclxuICAgIHJldHVybiBvcGVyYXRpb24udG9KU09OKCk7XHJcbiAgfSk7XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5pbXBvcnQgeyBhcnJheVV0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIjtcclxuXHJcbmNvbnN0IHsgZmlyc3QsIHRhaWwgfSA9IGFycmF5VXRpbGl0aWVzO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJhbnNmb3JtT3BlcmF0aW9ucyh0YXUsIHJobykge1xyXG4gIGlmICgodGF1Lmxlbmd0aCA9PT0gMCkgfHwgKHJoby5sZW5ndGggPT09IDApKSB7XHJcbiAgICByZXR1cm4gdGF1O1xyXG4gIH1cclxuXHJcbiAgY29uc3QgdGF1MSA9IFtmaXJzdCh0YXUpXSxcclxuICAgICAgICB0YXUyID0gdGFpbCh0YXUpLFxyXG4gICAgICAgIHJobzEgPSBbZmlyc3QocmhvKV0sXHJcbiAgICAgICAgcmhvMiA9IHRhaWwocmhvKTtcclxuXHJcbiAgaWYgKHRhdS5sZW5ndGggPiAxICYmIHJoby5sZW5ndGggPiAxKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB0cmFuc2Zvcm1PcGVyYXRpb25zKFxyXG4gICAgICAgIHRyYW5zZm9ybU9wZXJhdGlvbnModGF1MSwgcmhvMSksXHJcbiAgICAgICAgcmhvMlxyXG4gICAgICApLmNvbmNhdChcclxuICAgICAgICB0cmFuc2Zvcm1PcGVyYXRpb25zKFxyXG4gICAgICAgICAgdHJhbnNmb3JtT3BlcmF0aW9ucyhcclxuICAgICAgICAgICAgdGF1MixcclxuICAgICAgICAgICAgdHJhbnNmb3JtT3BlcmF0aW9ucyhyaG8xLCB0YXUxKVxyXG4gICAgICAgICAgKSxcclxuICAgICAgICAgIHRyYW5zZm9ybU9wZXJhdGlvbnMoXHJcbiAgICAgICAgICAgIHJobzIsXHJcbiAgICAgICAgICAgIHRyYW5zZm9ybU9wZXJhdGlvbnModGF1MSwgcmhvMSlcclxuICAgICAgICAgIClcclxuICAgICAgICApXHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgfSBlbHNlIGlmICgodGF1Lmxlbmd0aCA+IDEpICYmIChyaG8ubGVuZ3RoID09PSAxKSkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgdHJhbnNmb3JtT3BlcmF0aW9ucyh0YXUxLCByaG8pLmNvbmNhdChcclxuICAgICAgICB0cmFuc2Zvcm1PcGVyYXRpb25zKFxyXG4gICAgICAgICAgdGF1MixcclxuICAgICAgICAgIHRyYW5zZm9ybU9wZXJhdGlvbnMocmhvLCB0YXUxKVxyXG4gICAgICAgIClcclxuICAgICAgKVxyXG4gICAgKTtcclxuICB9IGVsc2UgaWYgKCh0YXUubGVuZ3RoID09PSAxKSAmJiAocmhvLmxlbmd0aCA+IDEpKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB0cmFuc2Zvcm1PcGVyYXRpb25zKFxyXG4gICAgICAgIHRyYW5zZm9ybU9wZXJhdGlvbnModGF1LCByaG8xKSxcclxuICAgICAgICByaG8yXHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRhdSA9IGZpcnN0KHRhdSk7IC8vL1xyXG4gICAgcmhvID0gZmlyc3QocmhvKTsgLy8vXHJcblxyXG4gICAgcmV0dXJuIHJoby50cmFuc2Zvcm1PcGVyYXRpb24odGF1KTtcclxuICB9XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IG1pc2NlbGxhbmVvdXNVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCB7IFVQREFURV9VUkksIElOSVRJQUxJU0VfVVJJIH0gZnJvbSBcIi4vdXJpc1wiO1xuXG5jb25zdCB7IHBvc3QgfSA9IG1pc2NlbGxhbmVvdXNVdGlsaXRpZXM7XG5cbmNvbnN0IGhvc3QgPSBcIlwiOyAgLy8vXG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVQb3N0KGpzb24sIGNhbGxiYWNrKSB7IHBvc3QoaG9zdCwgVVBEQVRFX1VSSSwganNvbiwgY2FsbGJhY2spOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXNlUG9zdChqc29uLCBjYWxsYmFjaykgeyBwb3N0KGhvc3QsIElOSVRJQUxJU0VfVVJJLCBqc29uLCBjYWxsYmFjayk7IH1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbml0aWFsaXNlUmVxdWVzdCB7XG4gIHRvSlNPTigpIHtcbiAgICBjb25zdCBqc29uID0ge307ICAvLy9cblxuICAgIHJldHVybiBqc29uO1xuICB9XG5cbiAgc3RhdGljIGZyb21Ob3RoaW5nKCkge1xuICAgIGNvbnN0IGluaXRpYWxpc2VSZXF1ZXN0ID0gbmV3IEluaXRpYWxpc2VSZXF1ZXN0KCk7XG5cbiAgICByZXR1cm4gaW5pdGlhbGlzZVJlcXVlc3Q7XG4gIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgb3BlcmF0aW9uc1RvSlNPTiBmcm9tIFwiLi4vb3BlcmF0aW9ucy90b0pTT05cIjtcbmltcG9ydCBvcGVyYXRpb25zRnJvbUpTT04gZnJvbSBcIi4uL29wZXJhdGlvbnMvZnJvbUpTT05cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXBkYXRlUmVxdWVzdCB7XG4gIGNvbnN0cnVjdG9yKG9wZXJhdGlvbnMsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllcikge1xuICAgIHRoaXMub3BlcmF0aW9ucyA9IG9wZXJhdGlvbnM7XG4gICAgdGhpcy51c2VySWRlbnRpZmllciA9IHVzZXJJZGVudGlmaWVyO1xuICAgIHRoaXMuc2Vzc2lvbklkZW50aWZpZXIgPSBzZXNzaW9uSWRlbnRpZmllcjtcbiAgfVxuXG4gIGdldE9wZXJhdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMub3BlcmF0aW9ucztcbiAgfVxuXG4gIGdldFVzZXJJZGVudGlmaWVyKCkge1xuICAgIHJldHVybiB0aGlzLnVzZXJJZGVudGlmaWVyO1xuICB9XG5cbiAgZ2V0U2Vzc2lvbklkZW50aWZpZXIoKSB7XG4gIFx0cmV0dXJuIHRoaXMuc2Vzc2lvbklkZW50aWZpZXI7XG5cdH1cblxuICB0b0pTT04oKSB7XG4gICAgY29uc3Qgb3BlcmF0aW9uc0pTT04gPSBvcGVyYXRpb25zVG9KU09OKHRoaXMub3BlcmF0aW9ucyksXG4gICAgICAgICAgb3BlcmF0aW9ucyA9IG9wZXJhdGlvbnNKU09OLCAgLy8vXG4gICAgICAgICAganNvbiA9IHtcbiAgICAgICAgICAgIFwib3BlcmF0aW9uc1wiOiBvcGVyYXRpb25zLFxuICAgICAgICAgICAgXCJ1c2VySWRlbnRpZmllclwiOiB0aGlzLnVzZXJJZGVudGlmaWVyLFxuXHRcdFx0XHRcdFx0XCJzZXNzaW9uSWRlbnRpZmllclwiOiB0aGlzLnNlc3Npb25JZGVudGlmaWVyXG4gICAgICAgICAgfTtcblxuICAgIHJldHVybiBqc29uO1xuICB9XG5cbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcbiAgICBjb25zdCBvcGVyYXRpb25zSlNPTiA9IGpzb25bXCJvcGVyYXRpb25zXCJdLFxuICAgICAgICAgIHVzZXJJZGVudGlmaWVySlNPTiA9IGpzb25bXCJ1c2VySWRlbnRpZmllclwiXSxcblx0XHRcdFx0XHRzZXNzaW9uSWRlbnRpZmllckpTT04gPSBqc29uW1wic2Vzc2lvbklkZW50aWZpZXJcIl0sXG4gICAgICAgICAgb3BlcmF0aW9ucyA9IG9wZXJhdGlvbnNGcm9tSlNPTihvcGVyYXRpb25zSlNPTiksXG4gICAgICAgICAgdXNlcklkZW50aWZpZXIgPSB1c2VySWRlbnRpZmllckpTT04sICAvLy9cblx0XHRcdFx0XHRzZXNzaW9uSWRlbnRpZmllciA9IHNlc3Npb25JZGVudGlmaWVySlNPTiwgIC8vL1xuICAgICAgICAgIHVwZGF0ZVJlcXVlc3QgPSBuZXcgVXBkYXRlUmVxdWVzdChvcGVyYXRpb25zLCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpO1xuXG4gICAgcmV0dXJuIHVwZGF0ZVJlcXVlc3Q7XG4gIH1cblxuICBzdGF0aWMgZnJvbU9wZXJhdGlvbnNVc2VySWRlbnRpZmllckFuZFNlc3Npb25JZGVudGlmaWVyKG9wZXJhdGlvbnMsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllcikge1xuICAgIGNvbnN0IHVwZGF0ZVJlcXVlc3QgPSBuZXcgVXBkYXRlUmVxdWVzdChvcGVyYXRpb25zLCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpO1xuXG4gICAgcmV0dXJuIHVwZGF0ZVJlcXVlc3Q7XG4gIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbml0aWFsaXNlUmVzcG9uc2Uge1xuICBjb25zdHJ1Y3Rvcihjb250ZW50LCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpIHtcbiAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICAgIHRoaXMudXNlcklkZW50aWZpZXIgPSB1c2VySWRlbnRpZmllcjtcbiAgICB0aGlzLnNlc3Npb25JZGVudGlmaWVyID0gc2Vzc2lvbklkZW50aWZpZXI7XG4gIH1cblxuICBnZXRDb250ZW50KCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnQ7XG4gIH1cblxuICBnZXRVc2VySWRlbnRpZmllcigpIHtcbiAgICByZXR1cm4gdGhpcy51c2VySWRlbnRpZmllcjtcbiAgfVxuXG4gIGdldFNlc3Npb25JZGVudGlmaWVyKCkge1xuICBcdHJldHVybiB0aGlzLnNlc3Npb25JZGVudGlmaWVyO1xuXHR9XG5cbiAgdG9KU09OKCkge1xuICAgIGNvbnN0IGpzb24gPSB7XG4gICAgICBcImNvbnRlbnRcIjogdGhpcy5jb250ZW50LFxuICAgICAgXCJ1c2VySWRlbnRpZmllclwiOiB0aGlzLnVzZXJJZGVudGlmaWVyLFxuXHRcdFx0XCJzZXNzaW9uSWRlbnRpZmllclwiOiB0aGlzLnNlc3Npb25JZGVudGlmaWVyXG4gICAgfTtcblxuICAgIHJldHVybiBqc29uO1xuICB9XG5cbiAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcbiAgICBjb25zdCBjb250ZW50SlNPTiA9IGpzb25bXCJjb250ZW50XCJdLFxuICAgICAgICAgIHVzZXJJZGVudGlmaWVySlNPTiA9IGpzb25bXCJ1c2VySWRlbnRpZmllclwiXSxcblx0XHRcdFx0XHRzZXNzaW9uSWRlbnRpZmllckpTT04gPSBqc29uW1wic2Vzc2lvbklkZW50aWZpZXJcIl0sXG4gICAgICAgICAgY29udGVudCA9IGNvbnRlbnRKU09OLCAgLy8vXG4gICAgICAgICAgdXNlcklkZW50aWZpZXIgPSB1c2VySWRlbnRpZmllckpTT04sICAvLy9cblx0XHRcdFx0XHRzZXNzaW9uSWRlbnRpZmllciA9IHNlc3Npb25JZGVudGlmaWVySlNPTiwgIC8vL1xuICAgICAgICAgIGluaXRpYWxpc2VSZXNwb25zZSA9IG5ldyBJbml0aWFsaXNlUmVzcG9uc2UoY29udGVudCwgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyKTtcblxuICAgIHJldHVybiBpbml0aWFsaXNlUmVzcG9uc2U7XG4gIH1cblxuICBzdGF0aWMgZnJvbUNvbnRlbnRVc2VySWRlbnRpZmllckFuZFNlc3Npb25JZGVudGlmaWVyKGNvbnRlbnQsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllcikge1xuICAgIGNvbnN0IGluaXRpYWxpc2VSZXNwb25zZSA9IG5ldyBJbml0aWFsaXNlUmVzcG9uc2UoY29udGVudCwgdXNlcklkZW50aWZpZXIsIHNlc3Npb25JZGVudGlmaWVyKTtcblxuICAgIHJldHVybiBpbml0aWFsaXNlUmVzcG9uc2U7XG4gIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgb3BlcmF0aW9uc1RvSlNPTiBmcm9tIFwiLi4vb3BlcmF0aW9ucy90b0pTT05cIjtcbmltcG9ydCBvcGVyYXRpb25zRnJvbUpTT04gZnJvbSBcIi4uL29wZXJhdGlvbnMvZnJvbUpTT05cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXBkYXRlUmVzcG9uc2Uge1xuICBjb25zdHJ1Y3RvcihzZXNzaW9uRXhwaXJlZCwgcGVuZGluZ09wZXJhdGlvbnMpIHtcbiAgXHR0aGlzLnNlc3Npb25FeHBpcmVkID0gc2Vzc2lvbkV4cGlyZWQ7XG4gICAgdGhpcy5wZW5kaW5nT3BlcmF0aW9ucyA9IHBlbmRpbmdPcGVyYXRpb25zO1xuICB9XG5cbiAgZ2V0U2Vzc2lvbkV4cGlyZWQoKSB7XG4gIFx0cmV0dXJuIHRoaXMuc2Vzc2lvbkV4cGlyZWQ7XG5cdH1cblxuICBnZXRQZW5kaW5nT3BlcmF0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5wZW5kaW5nT3BlcmF0aW9ucztcbiAgfVxuXG4gIHRvSlNPTigpIHtcbiAgICBjb25zdCBwZW5kaW5nT3BlcmF0aW9uc0pTT04gPSBvcGVyYXRpb25zVG9KU09OKHRoaXMucGVuZGluZ09wZXJhdGlvbnMpLFxuICAgICAgICAgIHBlbmRpbmdPcGVyYXRpb25zID0gcGVuZGluZ09wZXJhdGlvbnNKU09OLCAgLy8vXG4gICAgICAgICAganNvbiA9IHtcbiAgICBcdFx0XHRcdFwic2Vzc2lvbkV4cGlyZWRcIjogdGhpcy5zZXNzaW9uRXhwaXJlZCxcbiAgICAgICAgICAgIFwicGVuZGluZ09wZXJhdGlvbnNcIjogcGVuZGluZ09wZXJhdGlvbnNcbiAgICAgICAgICB9O1xuXG4gICAgcmV0dXJuIGpzb247XG4gIH1cblxuICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xuICAgIGNvbnN0IHNlc3Npb25FeHBpcmVkSlNPTiA9IGpzb25bXCJzZXNzaW9uRXhwaXJlZFwiXSxcblx0XHRcdFx0XHRwZW5kaW5nT3BlcmF0aW9uc0pTT04gPSBqc29uW1wicGVuZGluZ09wZXJhdGlvbnNcIl0sXG5cdFx0XHRcdFx0c2Vzc2lvbkV4cGlyZWQgPSBzZXNzaW9uRXhwaXJlZEpTT04sXHQvLy9cblx0XHRcdFx0XHRwZW5kaW5nT3BlcmF0aW9ucyA9IG9wZXJhdGlvbnNGcm9tSlNPTihwZW5kaW5nT3BlcmF0aW9uc0pTT04pLFxuICAgICAgICAgIHVwZGF0ZVJlc3BvbnNlID0gbmV3IFVwZGF0ZVJlc3BvbnNlKHNlc3Npb25FeHBpcmVkLCBwZW5kaW5nT3BlcmF0aW9ucyk7XG5cbiAgICByZXR1cm4gdXBkYXRlUmVzcG9uc2U7XG4gIH1cblxuICBzdGF0aWMgZnJvbVNlc3Npb25FeHBpcmVkQW5kUGVuZGluZ09wZXJhdGlvbnMoc2Vzc2lvbkV4cGlyZWQsIHBlbmRpbmdPcGVyYXRpb25zKSB7XG4gICAgY29uc3QgdXBkYXRlUmVzcG9uc2UgPSBuZXcgVXBkYXRlUmVzcG9uc2Uoc2Vzc2lvbkV4cGlyZWQsIHBlbmRpbmdPcGVyYXRpb25zKTtcblxuICAgIHJldHVybiB1cGRhdGVSZXNwb25zZTtcbiAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0cmluZ0NvbXBhcmUoc3RyaW5nQSwgc3RyaW5nQikge1xuICBpZiAoKHN0cmluZ0EgPT09IFwiXCIpICYmIChzdHJpbmdCID09PSBcIlwiKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChzdHJpbmdBID09PSBcIlwiKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAoc3RyaW5nQiA9PT0gXCJcIikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IGNvZGVQb2ludEEgPSBzdHJpbmdBLmNvZGVQb2ludEF0KDApLFxuICAgICAgICBjb2RlUG9pbnRCID0gc3RyaW5nQi5jb2RlUG9pbnRBdCgwKTtcblxuICBpZiAoY29kZVBvaW50QSA8IGNvZGVQb2ludEIpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmIChjb2RlUG9pbnRBID4gY29kZVBvaW50Qikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHN1YlN0cmluZ0EgPSBzdHJpbmdBLnN1YnN0cmluZygxKSxcbiAgICAgICAgc3ViU3RyaW5nQiA9IHN0cmluZ0Iuc3Vic3RyaW5nKDEpO1xuXG4gIHJldHVybiBzdHJpbmdDb21wYXJlKHN1YlN0cmluZ0EsIHN1YlN0cmluZ0IpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IEFzeW5jaHJvbm91c1Rhc2sgfSBmcm9tIFwic3VmZmljaWVudFwiO1xuXG5pbXBvcnQgSW5pdGlhbGlzZVJlcXVlc3QgZnJvbSBcIi4uL3JlcXVlc3QvaW5pdGlhbGlzZVwiO1xuaW1wb3J0IEluaXRpYWxpc2VSZXNwb25zZSBmcm9tIFwiLi4vcmVzcG9uc2UvaW5pdGlhbGlzZVwiO1xuXG5pbXBvcnQgeyBpbml0aWFsaXNlUG9zdCB9IGZyb20gXCIuLi9wb3N0ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5pdGlhbGlzZVRhc2sgZXh0ZW5kcyBBc3luY2hyb25vdXNUYXNrIHtcbiAgY29uc3RydWN0b3IoY2FsbGJhY2spIHtcbiAgICBzdXBlcihhc3luY2hyb25vdXNNZXRob2QsIGNhbGxiYWNrKVxuICB9XG59XG5cbmZ1bmN0aW9uIGFzeW5jaHJvbm91c01ldGhvZChjYWxsYmFjaykge1xuICBjb25zdCBpbml0aWFsaXNlUmVxdWVzdCA9IEluaXRpYWxpc2VSZXF1ZXN0LmZyb21Ob3RoaW5nKCksXG4gICAgICAgIGpzb24gPSBpbml0aWFsaXNlUmVxdWVzdC50b0pTT04oKTtcblxuICBpbml0aWFsaXNlUG9zdChqc29uLCAoanNvbikgPT4ge1xuICAgIGNvbnN0IGluaXRpYWxpc2VSZXNwb25zZSA9IEluaXRpYWxpc2VSZXNwb25zZS5mcm9tSlNPTihqc29uKSxcbiAgICAgICAgICBjb250ZW50ID0gaW5pdGlhbGlzZVJlc3BvbnNlLmdldENvbnRlbnQoKSxcbiAgICAgICAgICB1c2VySWRlbnRpZmllciA9IGluaXRpYWxpc2VSZXNwb25zZS5nZXRVc2VySWRlbnRpZmllcigpLFxuXHRcdFx0XHRcdHNlc3Npb25JZGVudGlmaWVyID0gaW5pdGlhbGlzZVJlc3BvbnNlLmdldFNlc3Npb25JZGVudGlmaWVyKCk7XG5cbiAgICBjYWxsYmFjayhjb250ZW50LCB1c2VySWRlbnRpZmllciwgc2Vzc2lvbklkZW50aWZpZXIpO1xuICB9KTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBBc3luY2hyb25vdXNUYXNrIH0gZnJvbSBcInN1ZmZpY2llbnRcIjtcblxuaW1wb3J0IFVwZGF0ZVJlcXVlc3QgZnJvbSBcIi4uL3JlcXVlc3QvdXBkYXRlXCI7XG5pbXBvcnQgVXBkYXRlUmVzcG9uc2UgZnJvbSBcIi4uL3Jlc3BvbnNlL3VwZGF0ZVwiO1xuaW1wb3J0IGdlbmVyYXRlT3BlcmF0aW9ucyBmcm9tIFwiLi4vb3BlcmF0aW9ucy9nZW5lcmF0ZVwiO1xuXG5pbXBvcnQgeyB1cGRhdGVQb3N0IH0gZnJvbSBcIi4uL3Bvc3RlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVcGRhdGVUYXNrIGV4dGVuZHMgQXN5bmNocm9ub3VzVGFzayB7XG4gIGNvbnN0cnVjdG9yKHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllciwgd29ya2luZ0NvbnRlbnQsIGVkaXRhYmxlQ29udGVudCwgY2FsbGJhY2spIHtcbiAgICBzdXBlcihhc3luY2hyb25vdXNNZXRob2QsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllciwgd29ya2luZ0NvbnRlbnQsIGVkaXRhYmxlQ29udGVudCwgY2FsbGJhY2spXG4gIH1cbn1cblxuZnVuY3Rpb24gYXN5bmNocm9ub3VzTWV0aG9kKHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllciwgd29ya2luZ0NvbnRlbnQsIGVkaXRhYmxlQ29udGVudCwgY2FsbGJhY2spIHtcbiAgY29uc3Qgb3BlcmF0aW9ucyA9IGdlbmVyYXRlT3BlcmF0aW9ucyh3b3JraW5nQ29udGVudCwgZWRpdGFibGVDb250ZW50KSxcbiAgICAgICAgdXBkYXRlUmVxdWVzdCA9IFVwZGF0ZVJlcXVlc3QuZnJvbU9wZXJhdGlvbnNVc2VySWRlbnRpZmllckFuZFNlc3Npb25JZGVudGlmaWVyKG9wZXJhdGlvbnMsIHVzZXJJZGVudGlmaWVyLCBzZXNzaW9uSWRlbnRpZmllciksXG4gICAgICAgIGpzb24gPSB1cGRhdGVSZXF1ZXN0LnRvSlNPTigpO1xuXG4gIHVwZGF0ZVBvc3QoanNvbiwgKGpzb24pID0+IHtcbiAgICBjb25zdCB1cGRhdGVSZXNwb25zZSA9IFVwZGF0ZVJlc3BvbnNlLmZyb21KU09OKGpzb24pLFxuXHRcdFx0XHRcdHNlc3Npb25FeHBpcmVkID0gdXBkYXRlUmVzcG9uc2UuZ2V0U2Vzc2lvbkV4cGlyZWQoKSxcbiAgICAgICAgICBwZW5kaW5nT3BlcmF0aW9ucyA9IHVwZGF0ZVJlc3BvbnNlLmdldFBlbmRpbmdPcGVyYXRpb25zKCk7XG5cbiAgICBjYWxsYmFjayhzZXNzaW9uRXhwaXJlZCwgcGVuZGluZ09wZXJhdGlvbnMpO1xuICB9KTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgY29uc3QgZW1wdHlUeXBlID0gXCJlbXB0eVwiO1xuZXhwb3J0IGNvbnN0IGRlbGV0ZVR5cGUgPSBcImRlbGV0ZVwiO1xuZXhwb3J0IGNvbnN0IGluc2VydFR5cGUgPSBcImluc2VydFwiO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCBjb25zdCBVUERBVEVfVVJJID0gXCIvVVBEQVRFXCI7XG5leHBvcnQgY29uc3QgSU5JVElBTElTRV9VUkkgPSBcIi9JTklUSUFMSVNFXCI7XG4iLCIiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB3aW5kb3c6IHJlcXVpcmUoJy4vbGliL3dpbmRvdycpLFxuICBkb2N1bWVudDogcmVxdWlyZSgnLi9saWIvZG9jdW1lbnQnKSxcbiAgRGl2OiByZXF1aXJlKCcuL2xpYi9lbGVtZW50L2RpdicpLFxuICBTcGFuOiByZXF1aXJlKCcuL2xpYi9lbGVtZW50L3NwYW4nKSxcbiAgQm9keTogcmVxdWlyZSgnLi9saWIvZWxlbWVudC9ib2R5JyksXG4gIExpbms6IHJlcXVpcmUoJy4vbGliL2VsZW1lbnQvbGluaycpLFxuICBTZWxlY3Q6IHJlcXVpcmUoJy4vbGliL2VsZW1lbnQvc2VsZWN0JyksXG4gIEJ1dHRvbjogcmVxdWlyZSgnLi9saWIvZWxlbWVudC9idXR0b24nKSxcbiAgQ2hlY2tib3g6IHJlcXVpcmUoJy4vbGliL2VsZW1lbnQvY2hlY2tib3gnKSxcbiAgRWxlbWVudDogcmVxdWlyZSgnLi9saWIvZWxlbWVudCcpLFxuICBUZXh0RWxlbWVudDogcmVxdWlyZSgnLi9saWIvdGV4dEVsZW1lbnQnKSxcbiAgSW5wdXQ6IHJlcXVpcmUoJy4vbGliL2lucHV0RWxlbWVudC9pbnB1dCcpLFxuICBUZXh0YXJlYTogcmVxdWlyZSgnLi9saWIvaW5wdXRFbGVtZW50L3RleHRhcmVhJyksXG4gIElucHV0RWxlbWVudDogcmVxdWlyZSgnLi9saWIvaW5wdXRFbGVtZW50JyksXG4gIEJvdW5kczogcmVxdWlyZSgnLi9saWIvbWlzY2VsbGFuZW91cy9ib3VuZHMnKSxcbiAgT2Zmc2V0OiByZXF1aXJlKCcuL2xpYi9taXNjZWxsYW5lb3VzL29mZnNldCcpLFxuICBSZWFjdDogcmVxdWlyZSgnLi9saWIvcmVhY3QnKVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3Qga2V5TWl4aW5zID0gcmVxdWlyZSgnLi9taXhpbnMva2V5JyksXG4gICAgICBldmVudE1peGlucyA9IHJlcXVpcmUoJy4vbWl4aW5zL2V2ZW50JyksXG4gICAgICBjbGlja01peGlucyA9IHJlcXVpcmUoJy4vbWl4aW5zL2NsaWNrJyksXG4gICAgICBtb3VzZU1peGlucyA9IHJlcXVpcmUoJy4vbWl4aW5zL21vdXNlJyk7XG5cbmNsYXNzIERvY3VtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5kb21FbGVtZW50ID0gZG9jdW1lbnQ7IC8vL1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRG9jdW1lbnQucHJvdG90eXBlLCBrZXlNaXhpbnMpO1xuT2JqZWN0LmFzc2lnbihEb2N1bWVudC5wcm90b3R5cGUsIGV2ZW50TWl4aW5zKTtcbk9iamVjdC5hc3NpZ24oRG9jdW1lbnQucHJvdG90eXBlLCBjbGlja01peGlucyk7XG5PYmplY3QuYXNzaWduKERvY3VtZW50LnByb3RvdHlwZSwgbW91c2VNaXhpbnMpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBEb2N1bWVudCgpOyAgLy8vXG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGpzeE1peGlucyA9IHJlcXVpcmUoJy4vbWl4aW5zL2pzeCcpLFxuICAgICAga2V5TWl4aW5zID0gcmVxdWlyZSgnLi9taXhpbnMva2V5JyksXG4gICAgICBtb3VzZU1peGlucyA9IHJlcXVpcmUoJy4vbWl4aW5zL21vdXNlJyksXG4gICAgICBldmVudE1peGlucyA9IHJlcXVpcmUoJy4vbWl4aW5zL2V2ZW50JyksXG4gICAgICBjbGlja01peGlucyA9IHJlcXVpcmUoJy4vbWl4aW5zL2NsaWNrJyksXG4gICAgICBzY3JvbGxNaXhpbnMgPSByZXF1aXJlKCcuL21peGlucy9zY3JvbGwnKSxcbiAgICAgIHJlc2l6ZU1peGlucyA9IHJlcXVpcmUoJy4vbWl4aW5zL3Jlc2l6ZScpLFxuICAgICAgT2Zmc2V0ID0gcmVxdWlyZSgnLi9taXNjZWxsYW5lb3VzL29mZnNldCcpLFxuICAgICAgQm91bmRzID0gcmVxdWlyZSgnLi9taXNjZWxsYW5lb3VzL2JvdW5kcycpLFxuICAgICAgZG9tVXRpbGl0aWVzID0gcmVxdWlyZSgnLi91dGlsaXRpZXMvZG9tJyksXG4gICAgICBhcnJheVV0aWxpdGllcyA9IHJlcXVpcmUoJy4vdXRpbGl0aWVzL2FycmF5JyksXG4gICAgICBvYmplY3RVdGlsaXRpZXMgPSByZXF1aXJlKCcuL3V0aWxpdGllcy9vYmplY3QnKTtcblxuY29uc3QgeyBjb21iaW5lIH0gPSBvYmplY3RVdGlsaXRpZXMsXG4gICAgICB7IGZpcnN0LCBhdWdtZW50IH0gPSBhcnJheVV0aWxpdGllcyxcbiAgICAgIHsgZG9tTm9kZU1hdGNoZXNTZWxlY3RvciwgZG9tRWxlbWVudEZyb21TZWxlY3RvciwgZWxlbWVudHNGcm9tRE9NRWxlbWVudHMsIGZpbHRlckRPTU5vZGVzQnlTZWxlY3RvciwgZGVzY2VuZGFudERPTU5vZGVzRnJvbURPTU5vZGUgfSA9IGRvbVV0aWxpdGllcztcblxuY2xhc3MgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yKSB7XG4gICAgdGhpcy5kb21FbGVtZW50ID0gZG9tRWxlbWVudEZyb21TZWxlY3RvcihzZWxlY3Rvcik7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuX19lbGVtZW50X18gPSB0aGlzOyAvLy9cbiAgfVxuXG4gIGNsb25lKCkgeyByZXR1cm4gRWxlbWVudC5jbG9uZSh0aGlzKTsgfVxuICBcbiAgZ2V0RE9NRWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5kb21FbGVtZW50O1xuICB9XG5cbiAgZ2V0T2Zmc2V0KCkge1xuICAgIGNvbnN0IHRvcCA9IHRoaXMuZG9tRWxlbWVudC5vZmZzZXRUb3AsICAvLy9cbiAgICAgICAgICBsZWZ0ID0gdGhpcy5kb21FbGVtZW50Lm9mZnNldExlZnQsICAvLy9cbiAgICAgICAgICBvZmZzZXQgPSBuZXcgT2Zmc2V0KHRvcCwgbGVmdCk7XG5cbiAgICByZXR1cm4gb2Zmc2V0O1xuICB9XG5cbiAgZ2V0Qm91bmRzKCkge1xuICAgIGNvbnN0IGJvdW5kaW5nQ2xpZW50UmVjdCA9IHRoaXMuZG9tRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgICBib3VuZHMgPSBCb3VuZHMuZnJvbUJvdW5kaW5nQ2xpZW50UmVjdChib3VuZGluZ0NsaWVudFJlY3QpO1xuXG4gICAgcmV0dXJuIGJvdW5kcztcbiAgfVxuXG4gIGdldFdpZHRoKGluY2x1ZGVCb3JkZXIgPSB0cnVlKSB7XG4gICAgY29uc3Qgd2lkdGggPSBpbmNsdWRlQm9yZGVyID9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb21FbGVtZW50Lm9mZnNldFdpZHRoIDpcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvbUVsZW1lbnQuY2xpZW50V2lkdGg7XG5cbiAgICByZXR1cm4gd2lkdGg7XG4gIH1cblxuICBzZXRXaWR0aCh3aWR0aCkge1xuICAgIHdpZHRoID0gYCR7d2lkdGh9cHhgOyAvLy9cblxuICAgIHRoaXMuc3R5bGUoJ3dpZHRoJywgd2lkdGgpO1xuICB9XG5cbiAgZ2V0SGVpZ2h0KGluY2x1ZGVCb3JkZXIgPSB0cnVlKSB7XG4gICAgY29uc3QgaGVpZ2h0ID0gaW5jbHVkZUJvcmRlciA/XG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmRvbUVsZW1lbnQub2Zmc2V0SGVpZ2h0IDpcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kb21FbGVtZW50LmNsaWVudEhlaWdodDtcblxuICAgIHJldHVybiBoZWlnaHQ7XG4gIH1cblxuICBzZXRIZWlnaHQoaGVpZ2h0KSB7XG4gICAgaGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YDsgLy8vXG5cbiAgICB0aGlzLnN0eWxlKCdoZWlnaHQnLCBoZWlnaHQpO1xuICB9XG5cbiAgaGFzQXR0cmlidXRlKG5hbWUpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5oYXNBdHRyaWJ1dGUobmFtZSk7IH1cblxuICBnZXRBdHRyaWJ1dGUobmFtZSkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LmdldEF0dHJpYnV0ZShuYW1lKTsgfVxuXG4gIHNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSkgeyB0aGlzLmRvbUVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTsgfVxuXG4gIGNsZWFyQXR0cmlidXRlKG5hbWUpIHsgdGhpcy5kb21FbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShuYW1lKTsgfVxuXG4gIGFkZEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSkgeyB0aGlzLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7IH1cblxuICByZW1vdmVBdHRyaWJ1dGUobmFtZSkgeyB0aGlzLmNsZWFyQXR0cmlidXRlKG5hbWUpOyB9XG5cbiAgc2V0Q2xhc3MoY2xhc3NOYW1lKSB7IHRoaXMuZG9tRWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc05hbWU7IH1cblxuICBhZGRDbGFzcyhjbGFzc05hbWUpIHsgdGhpcy5kb21FbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTsgfVxuXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkgeyB0aGlzLmRvbUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpOyB9XG5cbiAgdG9nZ2xlQ2xhc3MoY2xhc3NOYW1lKSB7IHRoaXMuZG9tRWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKGNsYXNzTmFtZSk7IH1cblxuICBoYXNDbGFzcyhjbGFzc05hbWUpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTsgfVxuXG4gIGNsZWFyQ2xhc3NlcygpIHsgdGhpcy5kb21FbGVtZW50LmNsYXNzTmFtZSA9ICcnOyB9XG5cbiAgcHJlcGVuZFRvKHBhcmVudEVsZW1lbnQpIHsgcGFyZW50RWxlbWVudC5wcmVwZW5kKHRoaXMpOyB9XG5cbiAgYXBwZW5kVG8ocGFyZW50RWxlbWVudCkgeyBwYXJlbnRFbGVtZW50LmFwcGVuZCh0aGlzKTsgfVxuXG4gIGFkZFRvKHBhcmVudEVsZW1lbnQpIHsgcGFyZW50RWxlbWVudC5hZGQodGhpcyk7IH1cblxuICByZW1vdmVGcm9tKHBhcmVudEVsZW1lbnQpIHsgcGFyZW50RWxlbWVudC5yZW1vdmUodGhpcyk7IH1cblxuICBpbnNlcnRCZWZvcmUoc2libGluZ0VsZW1lbnQpIHtcbiAgICBjb25zdCBwYXJlbnRET01Ob2RlID0gc2libGluZ0VsZW1lbnQuZG9tRWxlbWVudC5wYXJlbnROb2RlLFxuICAgICAgICAgIHNpYmxpbmdET01FbGVtZW50ID0gc2libGluZ0VsZW1lbnQuZG9tRWxlbWVudDtcblxuICAgIHBhcmVudERPTU5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMuZG9tRWxlbWVudCwgc2libGluZ0RPTUVsZW1lbnQpO1xuICB9XG5cbiAgaW5zZXJ0QWZ0ZXIoc2libGluZ0VsZW1lbnQpIHtcbiAgICBjb25zdCBwYXJlbnRET01Ob2RlID0gc2libGluZ0VsZW1lbnQuZG9tRWxlbWVudC5wYXJlbnROb2RlLFxuICAgICAgICAgIHNpYmxpbmdET01FbGVtZW50ID0gc2libGluZ0VsZW1lbnQuZG9tRWxlbWVudDtcblxuICAgIHBhcmVudERPTU5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMuZG9tRWxlbWVudCwgc2libGluZ0RPTUVsZW1lbnQubmV4dFNpYmxpbmcpOyAgLy8vXG4gIH1cblxuICBwcmVwZW5kKGVsZW1lbnQpIHtcbiAgICBjb25zdCBkb21FbGVtZW50ID0gZWxlbWVudC5kb21FbGVtZW50LFxuICAgICAgICAgIGZpcnN0Q2hpbGRET01FbGVtZW50ID0gdGhpcy5kb21FbGVtZW50LmZpcnN0Q2hpbGQ7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGRvbUVsZW1lbnQsIGZpcnN0Q2hpbGRET01FbGVtZW50KTtcbiAgfVxuXG4gIGFwcGVuZChlbGVtZW50KSB7XG4gICAgY29uc3QgZG9tRWxlbWVudCA9IGVsZW1lbnQuZG9tRWxlbWVudDtcblxuICAgIHRoaXMuZG9tRWxlbWVudC5pbnNlcnRCZWZvcmUoZG9tRWxlbWVudCwgbnVsbCk7IC8vL1xuICB9XG5cbiAgYWRkKGVsZW1lbnQpIHsgdGhpcy5hcHBlbmQoZWxlbWVudCk7IH1cblxuICByZW1vdmUoZWxlbWVudCkge1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBjb25zdCBkb21FbGVtZW50ID0gZWxlbWVudC5kb21FbGVtZW50O1xuXG4gICAgICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlQ2hpbGQoZG9tRWxlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICBzaG93KGRpc3BsYXlTdHlsZSA9ICdibG9jaycpIHsgdGhpcy5kaXNwbGF5KGRpc3BsYXlTdHlsZSk7IH1cblxuICBoaWRlKCkgeyB0aGlzLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKTsgfVxuXG4gIGRpc3BsYXkoZGlzcGxheSkgeyB0aGlzLnN0eWxlKCdkaXNwbGF5JywgZGlzcGxheSk7IH1cblxuICBlbmFibGUoKSB7IHRoaXMuY2xlYXJBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7IH1cblxuICBkaXNhYmxlKCkgeyB0aGlzLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTsgfVxuXG4gIGlzRW5hYmxlZCgpIHtcbiAgICBjb25zdCBkaXNhYmxlZCA9IHRoaXMuaXNEaXNhYmxlZCgpLFxuICAgICAgICAgIGVuYWJsZWQgPSAhZGlzYWJsZWQ7XG5cbiAgICByZXR1cm4gZW5hYmxlZDtcbiAgfVxuXG4gIGlzRGlzYWJsZWQoKSB7XG4gICAgY29uc3QgZGlzYWJsZWQgPSB0aGlzLmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcblxuICAgIHJldHVybiBkaXNhYmxlZDtcbiAgfVxuICBcbiAgaXNEaXNwbGF5ZWQoKSB7XG4gICAgY29uc3QgZGlzcGxheSA9IHRoaXMuc3R5bGUoJ2Rpc3BsYXknKSxcbiAgICAgICAgICBkaXNwbGF5ZWQgPSAoZGlzcGxheSAhPT0gJ25vbmUnKTtcbiAgICBcbiAgICByZXR1cm4gZGlzcGxheWVkO1xuICB9XG5cbiAgaXNTaG93aW5nKCkge1xuICAgIGNvbnN0IGRpc3BsYXllZCA9IHRoaXMuaXNEaXNwbGF5ZWQoKSxcbiAgICAgICAgICBzaG93aW5nID0gZGlzcGxheWVkOyAgLy8vXG5cbiAgICByZXR1cm4gc2hvd2luZztcbiAgfVxuXG4gIGlzSGlkZGVuKCkge1xuICAgIGNvbnN0IGRpc3BsYXllZCA9IHRoaXMuaXNEaXNwbGF5ZWQoKSxcbiAgICAgICAgICBoaWRkZW4gPSAhZGlzcGxheWVkO1xuXG4gICAgcmV0dXJuIGhpZGRlbjtcbiAgfVxuXG4gIHN0eWxlKG5hbWUsIHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZVtuYW1lXSA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzdHlsZSA9IHRoaXMuZG9tRWxlbWVudC5zdHlsZVtuYW1lXTtcblxuICAgICAgcmV0dXJuIHN0eWxlO1xuICAgIH1cbiAgfVxuXG4gIGh0bWwoaHRtbCkge1xuICAgIGlmIChodG1sID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IGlubmVySFRNTCA9IHRoaXMuZG9tRWxlbWVudC5pbm5lckhUTUw7XG5cbiAgICAgIGh0bWwgPSBpbm5lckhUTUw7IC8vL1xuXG4gICAgICByZXR1cm4gaHRtbDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaW5uZXJIVE1MID0gaHRtbDsgLy8vXG5cbiAgICAgIHRoaXMuZG9tRWxlbWVudC5pbm5lckhUTUwgPSBpbm5lckhUTUxcbiAgICB9XG4gIH1cblxuICBjc3MoY3NzKSB7XG4gICAgaWYgKGNzcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBjb21wdXRlZFN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmRvbUVsZW1lbnQpLFxuICAgICAgICAgICAgY3NzID0ge307XG5cbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjb21wdXRlZFN0eWxlLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBjb25zdCBuYW1lID0gY29tcHV0ZWRTdHlsZVswXSwgIC8vL1xuICAgICAgICAgICAgICB2YWx1ZSA9IGNvbXB1dGVkU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShuYW1lKTsgLy8vXG5cbiAgICAgICAgY3NzW25hbWVdID0gdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjc3M7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY3NzID09PSAnc3RyaW5nJykge1xuICAgICAgbGV0IG5hbWUgPSBjc3M7IC8vL1xuXG4gICAgICBjb25zdCBjb21wdXRlZFN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmRvbUVsZW1lbnQpLFxuICAgICAgICAgICAgdmFsdWUgPSBjb21wdXRlZFN0eWxlLmdldFByb3BlcnR5VmFsdWUobmFtZSk7IC8vL1xuXG4gICAgICBjc3MgPSB2YWx1ZTsgIC8vL1xuXG4gICAgICByZXR1cm4gY3NzO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBuYW1lcyA9IE9iamVjdC5rZXlzKGNzcyk7IC8vL1xuXG4gICAgICBuYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBjc3NbbmFtZV07XG5cbiAgICAgICAgdGhpcy5zdHlsZShuYW1lLCB2YWx1ZSk7XG4gICAgICB9LmJpbmQodGhpcykpO1xuICAgIH1cbiAgfVxuICBcbiAgYmx1cigpIHsgdGhpcy5kb21FbGVtZW50LmJsdXIoKTsgfVxuXG4gIGZvY3VzKCkgeyB0aGlzLmRvbUVsZW1lbnQuZm9jdXMoKTsgfVxuXG4gIGhhc0ZvY3VzKCkge1xuICAgIGNvbnN0IGZvY3VzID0gKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHRoaXMuZG9tRWxlbWVudCk7ICAvLy9cblxuICAgIHJldHVybiBmb2N1cztcbiAgfVxuXG4gIGdldERlc2NlbmRhbnRFbGVtZW50cyhzZWxlY3RvciA9ICcqJykge1xuICAgIGNvbnN0IGRvbU5vZGUgPSB0aGlzLmRvbUVsZW1lbnQsICAvLy9cbiAgICAgICAgICBkZXNjZW5kYW50RE9NTm9kZXMgPSBkZXNjZW5kYW50RE9NTm9kZXNGcm9tRE9NTm9kZShkb21Ob2RlKSxcbiAgICAgICAgICBkZXNjZW5kYW50RE9NRWxlbWVudHMgPSBmaWx0ZXJET01Ob2Rlc0J5U2VsZWN0b3IoZGVzY2VuZGFudERPTU5vZGVzLCBzZWxlY3RvciksXG4gICAgICAgICAgZGVzY2VuZGFudEVsZW1lbnRzID0gZWxlbWVudHNGcm9tRE9NRWxlbWVudHMoZGVzY2VuZGFudERPTUVsZW1lbnRzKTtcblxuICAgIHJldHVybiBkZXNjZW5kYW50RWxlbWVudHM7XG4gIH1cblxuICBnZXRDaGlsZEVsZW1lbnRzKHNlbGVjdG9yID0gJyonKSB7XG4gICAgY29uc3QgY2hpbGRET01Ob2RlcyA9IHRoaXMuZG9tRWxlbWVudC5jaGlsZE5vZGVzLFxuICAgICAgICAgIGNoaWxkRE9NRWxlbWVudHMgPSBmaWx0ZXJET01Ob2Rlc0J5U2VsZWN0b3IoY2hpbGRET01Ob2Rlcywgc2VsZWN0b3IpLFxuICAgICAgICAgIGNoaWxkRWxlbWVudHMgPSBlbGVtZW50c0Zyb21ET01FbGVtZW50cyhjaGlsZERPTUVsZW1lbnRzKTtcblxuICAgIHJldHVybiBjaGlsZEVsZW1lbnRzO1xuICB9XG5cbiAgZ2V0UGFyZW50RWxlbWVudChzZWxlY3RvciA9ICcqJykge1xuICAgIGxldCBwYXJlbnRFbGVtZW50ID0gbnVsbDtcblxuICAgIGNvbnN0IHBhcmVudERPTUVsZW1lbnQgPSB0aGlzLmRvbUVsZW1lbnQucGFyZW50RWxlbWVudDtcblxuICAgIGlmIChwYXJlbnRET01FbGVtZW50ICE9PSBudWxsKSB7XG4gICAgICBpZiAocGFyZW50RE9NRWxlbWVudC5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgICBjb25zdCBwYXJlbnRET01FbGVtZW50cyA9IFtwYXJlbnRET01FbGVtZW50XSxcbiAgICAgICAgICAgICAgcGFyZW50RWxlbWVudHMgPSBlbGVtZW50c0Zyb21ET01FbGVtZW50cyhwYXJlbnRET01FbGVtZW50cyksXG4gICAgICAgICAgICAgIGZpcnN0UGFyZW50RWxlbWVudCA9IGZpcnN0KHBhcmVudEVsZW1lbnRzKTtcblxuICAgICAgICBwYXJlbnRFbGVtZW50ID0gZmlyc3RQYXJlbnRFbGVtZW50IHx8IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmVudEVsZW1lbnQ7XG4gIH1cblxuICBnZXRBc2NlbmRhbnRFbGVtZW50cyhzZWxlY3RvciA9ICcqJykge1xuICAgIGNvbnN0IGFzY2VuZGFudERPTUVsZW1lbnRzID0gW10sXG4gICAgICAgICAgcGFyZW50RE9NRWxlbWVudCA9IHRoaXMuZG9tRWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXG4gICAgbGV0IGFzY2VuZGFudERPTUVsZW1lbnQgPSBwYXJlbnRET01FbGVtZW50OyAgLy8vXG4gICAgd2hpbGUgKGFzY2VuZGFudERPTUVsZW1lbnQgIT09IG51bGwpIHtcbiAgICAgIGlmIChhc2NlbmRhbnRET01FbGVtZW50Lm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgICAgIGFzY2VuZGFudERPTUVsZW1lbnRzLnB1c2goYXNjZW5kYW50RE9NRWxlbWVudCk7XG4gICAgICB9XG5cbiAgICAgIGFzY2VuZGFudERPTUVsZW1lbnQgPSBhc2NlbmRhbnRET01FbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgY29uc3QgYXNjZW5kYW50RWxlbWVudHMgPSBlbGVtZW50c0Zyb21ET01FbGVtZW50cyhhc2NlbmRhbnRET01FbGVtZW50cyk7XG5cbiAgICByZXR1cm4gYXNjZW5kYW50RWxlbWVudHM7XG4gIH1cblxuICBnZXRQcmV2aW91c1NpYmxpbmdFbGVtZW50KHNlbGVjdG9yID0gJyonKSB7XG4gICAgbGV0IHByZXZpb3VzU2libGluZ0VsZW1lbnQgPSBudWxsO1xuXG4gICAgY29uc3QgcHJldmlvdXNTaWJsaW5nRE9NTm9kZSA9IHRoaXMuZG9tRWxlbWVudC5wcmV2aW91c1NpYmxpbmc7ICAvLy9cblxuICAgIGlmICgocHJldmlvdXNTaWJsaW5nRE9NTm9kZSAhPT0gbnVsbCkgJiYgZG9tTm9kZU1hdGNoZXNTZWxlY3RvcihwcmV2aW91c1NpYmxpbmdET01Ob2RlLCBzZWxlY3RvcikpIHtcbiAgICAgIHByZXZpb3VzU2libGluZ0VsZW1lbnQgPSBwcmV2aW91c1NpYmxpbmdET01Ob2RlLl9fZWxlbWVudF9fIHx8IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByZXZpb3VzU2libGluZ0VsZW1lbnQ7XG4gIH1cblxuICBnZXROZXh0U2libGluZ0VsZW1lbnQoc2VsZWN0b3IgPSAnKicpIHtcbiAgICBsZXQgbmV4dFNpYmxpbmdFbGVtZW50ID0gbnVsbDtcblxuICAgIGNvbnN0IG5leHRTaWJsaW5nRE9NTm9kZSA9IHRoaXMuZG9tRWxlbWVudC5uZXh0U2libGluZztcblxuICAgIGlmICgobmV4dFNpYmxpbmdET01Ob2RlICE9PSBudWxsKSAmJiBkb21Ob2RlTWF0Y2hlc1NlbGVjdG9yKG5leHRTaWJsaW5nRE9NTm9kZSwgc2VsZWN0b3IpKSB7XG4gICAgICBuZXh0U2libGluZ0VsZW1lbnQgPSBuZXh0U2libGluZ0RPTU5vZGUuX19lbGVtZW50X18gfHwgbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV4dFNpYmxpbmdFbGVtZW50O1xuICB9XG5cbiAgc3RhdGljIGNsb25lKENsYXNzLCBlbGVtZW50LCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICBjb25zdCBkZWVwID0gdHJ1ZSxcbiAgICAgICAgICBkb21FbGVtZW50ID0gZWxlbWVudC5kb21FbGVtZW50LmNsb25lTm9kZShkZWVwKTtcblxuICAgIHJlbWFpbmluZ0FyZ3VtZW50cy51bnNoaWZ0KGRvbUVsZW1lbnQpO1xuICAgIHJlbWFpbmluZ0FyZ3VtZW50cy51bnNoaWZ0KG51bGwpO1xuXG4gICAgcmV0dXJuIG5ldyAoRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuY2FsbChDbGFzcywgLi4ucmVtYWluaW5nQXJndW1lbnRzKSk7XG4gIH1cblxuICBzdGF0aWMgZnJvbUhUTUwoQ2xhc3MsIGh0bWwsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIGNvbnN0IG91dGVyRE9NRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgb3V0ZXJET01FbGVtZW50LmlubmVySFRNTCA9IGh0bWw7ICAvLy9cblxuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSBvdXRlckRPTUVsZW1lbnQuZmlyc3RDaGlsZDtcblxuICAgIHJlbWFpbmluZ0FyZ3VtZW50cy51bnNoaWZ0KGRvbUVsZW1lbnQpO1xuICAgIHJlbWFpbmluZ0FyZ3VtZW50cy51bnNoaWZ0KG51bGwpO1xuXG4gICAgcmV0dXJuIG5ldyAoRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuY2FsbChDbGFzcywgLi4ucmVtYWluaW5nQXJndW1lbnRzKSk7XG4gIH1cblxuICBzdGF0aWMgZnJvbURPTUVsZW1lbnQoQ2xhc3MsIGRvbUVsZW1lbnQsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIHJlbWFpbmluZ0FyZ3VtZW50cy51bnNoaWZ0KGRvbUVsZW1lbnQpO1xuICAgIHJlbWFpbmluZ0FyZ3VtZW50cy51bnNoaWZ0KG51bGwpO1xuXG4gICAgcmV0dXJuIG5ldyAoRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuY2FsbChDbGFzcywgLi4ucmVtYWluaW5nQXJndW1lbnRzKSk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIGNvbnN0IHRhZ05hbWUgPSBDbGFzcy50YWdOYW1lLFxuICAgICAgICAgIGh0bWwgPSBgPCR7dGFnTmFtZX0gLz5gLFxuICAgICAgICAgIGVsZW1lbnQgPSBFbGVtZW50LmZyb21IVE1MKENsYXNzLCBodG1sLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpLFxuICAgICAgICAgIGRlZmF1bHRQcm9wZXJ0aWVzID0gZGVmYXVsdFByb3BlcnRpZXNGcm9tQ2xhc3MoQ2xhc3MpLFxuICAgICAgICAgIGlnbm9yZWRQcm9wZXJ0aWVzID0gaWdub3JlZFByb3BlcnRpZXNGcm9tQ2xhc3MoQ2xhc3MpO1xuXG4gICAgZWxlbWVudC5hcHBseVByb3BlcnRpZXMocHJvcGVydGllcywgZGVmYXVsdFByb3BlcnRpZXMsIGlnbm9yZWRQcm9wZXJ0aWVzKTtcblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgc3RhdGljIGZyb21TdHJpbmcoc3RyaW5nLCBwcm9wZXJ0aWVzLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICBjb25zdCB0YWdOYW1lID0gc3RyaW5nLCAgLy8vXG4gICAgICAgICAgaHRtbCA9IGA8JHt0YWdOYW1lfSAvPmAsXG4gICAgICAgICAgZWxlbWVudCA9IEVsZW1lbnQuZnJvbUhUTUwoRWxlbWVudCwgaHRtbCwgLi4ucmVtYWluaW5nQXJndW1lbnRzKSxcbiAgICAgICAgICBkZWZhdWx0UHJvcGVydGllcyA9IHt9LCAvLy9cbiAgICAgICAgICBpZ25vcmVkUHJvcGVydGllcyA9IFtdOyAvLy9cblxuICAgIGVsZW1lbnQuYXBwbHlQcm9wZXJ0aWVzKHByb3BlcnRpZXMsIGRlZmF1bHRQcm9wZXJ0aWVzLCBpZ25vcmVkUHJvcGVydGllcyk7XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEVsZW1lbnQucHJvdG90eXBlLCBqc3hNaXhpbnMpO1xuT2JqZWN0LmFzc2lnbihFbGVtZW50LnByb3RvdHlwZSwga2V5TWl4aW5zKTtcbk9iamVjdC5hc3NpZ24oRWxlbWVudC5wcm90b3R5cGUsIG1vdXNlTWl4aW5zKTtcbk9iamVjdC5hc3NpZ24oRWxlbWVudC5wcm90b3R5cGUsIGV2ZW50TWl4aW5zKTtcbk9iamVjdC5hc3NpZ24oRWxlbWVudC5wcm90b3R5cGUsIGNsaWNrTWl4aW5zKTtcbk9iamVjdC5hc3NpZ24oRWxlbWVudC5wcm90b3R5cGUsIHNjcm9sbE1peGlucyk7XG5PYmplY3QuYXNzaWduKEVsZW1lbnQucHJvdG90eXBlLCByZXNpemVNaXhpbnMpO1xuXG5PYmplY3QuYXNzaWduKEVsZW1lbnQsIHtcbiAgTEVGVF9NT1VTRV9CVVRUT046IDAsXG4gIFJJR0hUX01PVVNFX0JVVFRPTjogMixcbiAgTUlERExFX01PVVNFX0JVVFRPTjogMVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRWxlbWVudDtcblxuZnVuY3Rpb24gZGVmYXVsdFByb3BlcnRpZXNGcm9tQ2xhc3MoQ2xhc3MsIGRlZmF1bHRQcm9wZXJ0aWVzID0ge30pIHtcbiAgaWYgKENsYXNzLmhhc093blByb3BlcnR5KCdkZWZhdWx0UHJvcGVydGllcycpKSB7XG4gICAgY29tYmluZShkZWZhdWx0UHJvcGVydGllcywgQ2xhc3MuZGVmYXVsdFByb3BlcnRpZXMpO1xuICB9XG5cbiAgY29uc3Qgc3VwZXJDbGFzcyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihDbGFzcyk7XG5cbiAgaWYgKHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICBkZWZhdWx0UHJvcGVydGllc0Zyb21DbGFzcyhzdXBlckNsYXNzLCBkZWZhdWx0UHJvcGVydGllcyk7XG4gIH1cblxuICByZXR1cm4gZGVmYXVsdFByb3BlcnRpZXM7XG59XG5cbmZ1bmN0aW9uIGlnbm9yZWRQcm9wZXJ0aWVzRnJvbUNsYXNzKENsYXNzLCBpZ25vcmVkUHJvcGVydGllcyA9IFtdKSB7XG4gIGlmIChDbGFzcy5oYXNPd25Qcm9wZXJ0eSgnaWdub3JlZFByb3BlcnRpZXMnKSkge1xuICAgIGF1Z21lbnQoaWdub3JlZFByb3BlcnRpZXMsIENsYXNzLmlnbm9yZWRQcm9wZXJ0aWVzLCBmdW5jdGlvbihpZ25vcmVkUHJvcGVydHkpIHtcbiAgICAgIHJldHVybiAhaWdub3JlZFByb3BlcnRpZXMuaW5jbHVkZXMoaWdub3JlZFByb3BlcnR5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IHN1cGVyQ2xhc3MgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ2xhc3MpO1xuXG4gIGlmIChzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgaWdub3JlZFByb3BlcnRpZXNGcm9tQ2xhc3Moc3VwZXJDbGFzcywgaWdub3JlZFByb3BlcnRpZXMpO1xuICB9XG5cbiAgcmV0dXJuIGlnbm9yZWRQcm9wZXJ0aWVzO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnLi4vZWxlbWVudCcpO1xuXG5jbGFzcyBCb2R5IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yID0gJ2JvZHknKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuICB9XG5cbiAgY2xvbmUoKSB7IHJldHVybiBCb2R5LmNsb25lKHRoaXMpOyB9XG5cbiAgc3RhdGljIGNsb25lKGVsZW1lbnQpIHsgcmV0dXJuIEVsZW1lbnQuY2xvbmUoQm9keSwgZWxlbWVudCk7IH1cblxuICBzdGF0aWMgZnJvbUhUTUwoaHRtbCkgeyByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChCb2R5LCBodG1sKTsgfVxuXG4gIHN0YXRpYyBmcm9tRE9NRWxlbWVudChkb21FbGVtZW50KSB7IHJldHVybiBFbGVtZW50LmZyb21ET01FbGVtZW50KEJvZHksIGRvbUVsZW1lbnQpOyB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHsgcmV0dXJuIEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoQm9keSwgcHJvcGVydGllcyk7IH1cbn1cblxuT2JqZWN0LmFzc2lnbihCb2R5LCB7XG4gIHRhZ05hbWU6ICdib2R5J1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQm9keTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJy4uL2VsZW1lbnQnKTtcblxuY2xhc3MgQnV0dG9uIGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBjbGlja0hhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICBpZiAoY2xpY2tIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMub25DbGljayhjbGlja0hhbmRsZXIpO1xuICAgIH1cbiAgfVxuXG4gIGNsb25lKGNsaWNrSGFuZGxlcikgeyByZXR1cm4gQnV0dG9uLmNsb25lKHRoaXMsIGNsaWNrSGFuZGxlcik7IH1cblxuICBvbkNsaWNrKGNsaWNrSGFuZGxlciwgb2JqZWN0LCBpbnRlcm1lZGlhdGVDbGlja0hhbmRsZXIgPSBkZWZhdWx0SW50ZXJtZWRpYXRlQ2xpY2tIYW5kbGVyKSB7XG4gICAgc3VwZXIub25DbGljayhjbGlja0hhbmRsZXIsIG9iamVjdCwgaW50ZXJtZWRpYXRlQ2xpY2tIYW5kbGVyKTtcbiAgfVxuXG4gIG9mZkNsaWNrKGNsaWNrSGFuZGxlciwgb2JqZWN0KSB7XG4gICAgc3VwZXIub2ZmQ2xpY2soY2xpY2tIYW5kbGVyLCBvYmplY3QpO1xuICB9XG5cbiAgc3RhdGljIGNsb25lKGVsZW1lbnQsIGNsaWNrSGFuZGxlcikgeyByZXR1cm4gRWxlbWVudC5jbG9uZShCdXR0b24sIGVsZW1lbnQsIGNsaWNrSGFuZGxlcik7IH1cblxuICBzdGF0aWMgZnJvbUhUTUwoaHRtbCwgY2xpY2tIYW5kbGVyKSB7IHJldHVybiBFbGVtZW50LmZyb21IVE1MKEJ1dHRvbiwgaHRtbCwgY2xpY2tIYW5kbGVyKTsgfVxuXG4gIHN0YXRpYyBmcm9tRE9NRWxlbWVudChkb21FbGVtZW50LCBjbGlja0hhbmRsZXIpIHsgcmV0dXJuIEVsZW1lbnQuZnJvbURPTUVsZW1lbnQoQnV0dG9uLCBkb21FbGVtZW50LCBjbGlja0hhbmRsZXIpOyB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uQ2xpY2sgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgY2xpY2tIYW5kbGVyID0gb25DbGljaywgLy8vXG4gICAgICAgICAgYnV0dG9uID0gRWxlbWVudC5mcm9tUHJvcGVydGllcyhCdXR0b24sIHByb3BlcnRpZXMsIGNsaWNrSGFuZGxlcik7XG4gICAgXG4gICAgcmV0dXJuIGJ1dHRvbjtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEJ1dHRvbiwge1xuICB0YWdOYW1lOiAnYnV0dG9uJyxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnb25DbGljaydcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQnV0dG9uO1xuXG5mdW5jdGlvbiBkZWZhdWx0SW50ZXJtZWRpYXRlQ2xpY2tIYW5kbGVyKGNsaWNrSGFuZGxlciwgZXZlbnQsIGVsZW1lbnQpIHtcbiAgY29uc3QgeyBidXR0b24gfSA9IGV2ZW50LFxuXHRcdFx0XHRtb3VzZUJ1dHRvbiA9IGJ1dHRvbjtcdC8vL1xuICBcbiAgY2xpY2tIYW5kbGVyLmNhbGwoZWxlbWVudCwgbW91c2VCdXR0b24sIGV2ZW50KTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJy4uL2VsZW1lbnQnKTtcblxuY2xhc3MgQ2hlY2tib3ggZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGNoYW5nZUhhbmRsZXIsIGNoZWNrZWQpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICBpZiAoY2hhbmdlSGFuZGxlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlKGNoYW5nZUhhbmRsZXIpO1xuICAgIH1cbiAgICBcbiAgICBpZiAoY2hlY2tlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmNoZWNrKGNoZWNrZWQpO1xuICAgIH1cbiAgfVxuXG4gIGNsb25lKGNoYW5nZUhhbmRsZXIpIHsgcmV0dXJuIENoZWNrYm94LmNsb25lKHRoaXMsIGNoYW5nZUhhbmRsZXIpOyB9XG5cbiAgb25DaGFuZ2UoY2hhbmdlSGFuZGxlciwgb2JqZWN0LCBpbnRlcm1lZGlhdGVDaGFuZ2VIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUNoYW5nZUhhbmRsZXIpIHtcbiAgICB0aGlzLm9uKCdjbGljaycsIGNoYW5nZUhhbmRsZXIsIG9iamVjdCwgaW50ZXJtZWRpYXRlQ2hhbmdlSGFuZGxlcik7ICAvLy9cbiAgfVxuICBcbiAgb2ZmQ2hhbmdlKGNoYW5nZUhhbmRsZXIsIG9iamVjdCkge1xuICAgIHRoaXMub2ZmKCdjbGljaycsIGNoYW5nZUhhbmRsZXIsIG9iamVjdCk7ICAvLy9cbiAgfVxuXG4gIGNoZWNrKGNoZWNrZWQgPSB0cnVlKSB7XG4gICAgY2hlY2tlZCA/XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICdjaGVja2VkJykgOlxuICAgICAgICB0aGlzLmNsZWFyQXR0cmlidXRlKCdjaGVja2VkJyk7XG4gIH1cblxuICBpc0NoZWNrZWQoKSB7XG4gICAgY29uc3QgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpLFxuICAgICAgICBjaGVja2VkID0gZG9tRWxlbWVudC5jaGVja2VkO1xuXG4gICAgcmV0dXJuIGNoZWNrZWQ7XG4gIH1cblxuICBvblJlc2l6ZSgpIHt9XG5cbiAgb2ZmUmVzaXplKCkge31cblxuICBzdGF0aWMgY2xvbmUoZWxlbWVudCwgY2hhbmdlSGFuZGxlcikgeyByZXR1cm4gRWxlbWVudC5jbG9uZShDaGVja2JveCwgZWxlbWVudCwgY2hhbmdlSGFuZGxlcik7IH1cblxuICBzdGF0aWMgZnJvbUhUTUwoaHRtbCwgY2hhbmdlSGFuZGxlcikgeyByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChDaGVja2JveCwgaHRtbCwgY2hhbmdlSGFuZGxlcik7IH1cblxuICBzdGF0aWMgZnJvbURPTUVsZW1lbnQoZG9tRWxlbWVudCwgY2hhbmdlSGFuZGxlcikgeyByZXR1cm4gRWxlbWVudC5mcm9tRE9NRWxlbWVudChDaGVja2JveCwgZG9tRWxlbWVudCwgY2hhbmdlSGFuZGxlcik7IH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UsIGNoZWNrZWQgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgY2hhbmdlSGFuZGxlciA9IG9uQ2hhbmdlLCAvLy8gICAgXG4gICAgICAgICAgY2hlY2tib3ggPSBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKENoZWNrYm94LCBwcm9wZXJ0aWVzLCBjaGFuZ2VIYW5kbGVyLCBjaGVja2VkKTtcbiAgICBcbiAgICByZXR1cm4gY2hlY2tib3g7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihDaGVja2JveCwge1xuICB0YWdOYW1lOiAnaW5wdXQnLFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICdvbkNoYW5nZScsXG4gICAgJ2NoZWNrZWQnXG4gIF0sXG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgdHlwZTogJ2NoZWNrYm94J1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBDaGVja2JveDtcblxuZnVuY3Rpb24gZGVmYXVsdEludGVybWVkaWF0ZUNoYW5nZUhhbmRsZXIoY2hhbmdlSGFuZGxlciwgZXZlbnQsIGVsZW1lbnQpIHtcbiAgY29uc3QgY2hlY2tib3ggPSBlbGVtZW50LCAvLy9cbiAgICAgICAgY2hlY2tlZCA9IGNoZWNrYm94LmlzQ2hlY2tlZCgpO1xuICBcbiAgY2hhbmdlSGFuZGxlci5jYWxsKGNoZWNrYm94LCBjaGVja2VkLCBldmVudCk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCcuLi9lbGVtZW50Jyk7XG5cbmNsYXNzIERpdiBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcbiAgfVxuXG4gIGNsb25lKCkgeyByZXR1cm4gRGl2LmNsb25lKHRoaXMpOyB9XG5cbiAgc3RhdGljIGNsb25lKGVsZW1lbnQpIHsgcmV0dXJuIEVsZW1lbnQuY2xvbmUoRGl2LCBlbGVtZW50KTsgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sKSB7IHJldHVybiBFbGVtZW50LmZyb21IVE1MKERpdiwgaHRtbCk7IH1cblxuICBzdGF0aWMgZnJvbURPTUVsZW1lbnQoZG9tRWxlbWVudCkgeyByZXR1cm4gRWxlbWVudC5mcm9tRE9NRWxlbWVudChEaXYsIGRvbUVsZW1lbnQpOyB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHsgcmV0dXJuIEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoRGl2LCBwcm9wZXJ0aWVzKTsgfVxufVxuXG5PYmplY3QuYXNzaWduKERpdiwge1xuICB0YWdOYW1lOiAnZGl2J1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRGl2O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnLi4vZWxlbWVudCcpO1xuXG5jbGFzcyBMaW5rIGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBjbGlja0hhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICBpZiAoY2xpY2tIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMub25DbGljayhjbGlja0hhbmRsZXIpO1xuICAgIH1cbiAgfVxuXG4gIGNsb25lKGNsaWNrSGFuZGxlcikgeyByZXR1cm4gTGluay5jbG9uZSh0aGlzLCBjbGlja0hhbmRsZXIpOyB9XG5cbiAgb25DbGljayhjbGlja0hhbmRsZXIsIG9iamVjdCwgaW50ZXJtZWRpYXRlQ2xpY2tIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUNsaWNrSGFuZGxlcikge1xuICAgIHRoaXMub24oJ2NsaWNrJywgY2xpY2tIYW5kbGVyLCBvYmplY3QsIGludGVybWVkaWF0ZUNsaWNrSGFuZGxlcik7XG4gIH1cbiAgXG4gIG9mZkNsaWNrKGNsaWNrSGFuZGxlciwgb2JqZWN0KSB7XG4gICAgdGhpcy5vZmYoJ2NsaWNrJywgY2xpY2tIYW5kbGVyLCBvYmplY3QpO1xuICB9XG5cbiAgc3RhdGljIGNsb25lKGVsZW1lbnQsIGNsaWNrSGFuZGxlcikgeyByZXR1cm4gRWxlbWVudC5jbG9uZShMaW5rLCBlbGVtZW50LCBjbGlja0hhbmRsZXIpOyB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIGNsaWNrSGFuZGxlcikgeyByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChMaW5rLCBodG1sLCBjbGlja0hhbmRsZXIpOyB9XG5cbiAgc3RhdGljIGZyb21ET01FbGVtZW50KGRvbUVsZW1lbnQsIGNsaWNrSGFuZGxlcikgeyByZXR1cm4gRWxlbWVudC5mcm9tRE9NRWxlbWVudChMaW5rLCBkb21FbGVtZW50LCBjbGlja0hhbmRsZXIpOyB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uQ2xpY2sgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgY2xpY2tIYW5kbGVyID0gb25DbGljaywgLy8vXG4gICAgICAgICAgbGluayA9IEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoTGluaywgcHJvcGVydGllcywgY2xpY2tIYW5kbGVyKTtcbiAgICBcbiAgICByZXR1cm4gbGluaztcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKExpbmssIHtcbiAgdGFnTmFtZTogJ2EnLFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICdvbkNsaWNrJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBMaW5rO1xuXG5mdW5jdGlvbiBkZWZhdWx0SW50ZXJtZWRpYXRlQ2xpY2tIYW5kbGVyKGNsaWNrSGFuZGxlciwgZXZlbnQsIGVsZW1lbnQpIHtcbiAgY29uc3QgbGluayA9IGVsZW1lbnQsIC8vL1xuICAgICAgICBocmVmID0gbGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgXG4gIGNsaWNrSGFuZGxlci5jYWxsKGxpbmssIGhyZWYsIGV2ZW50KTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCcuLi9lbGVtZW50Jyk7XG5cbmNsYXNzIFNlbGVjdCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgY2hhbmdlSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIGlmIChjaGFuZ2VIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMub25DaGFuZ2UoY2hhbmdlSGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgY2xvbmUoY2hhbmdlSGFuZGxlcikgeyByZXR1cm4gU2VsZWN0LmNsb25lKHRoaXMsIGNoYW5nZUhhbmRsZXIpOyB9XG5cbiAgb25DaGFuZ2UoY2hhbmdlSGFuZGxlciwgb2JqZWN0LCBpbnRlcm1lZGlhdGVDaGFuZ2VIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUNoYW5nZUhhbmRsZXIpIHtcbiAgICB0aGlzLm9uKCdjaGFuZ2UnLCBjaGFuZ2VIYW5kbGVyLCBvYmplY3QsIGludGVybWVkaWF0ZUNoYW5nZUhhbmRsZXIpO1xuICB9XG5cbiAgb2ZmQ2hhbmdlKGNoYW5nZUhhbmRsZXIsIG9iamVjdCkge1xuICAgIHRoaXMub2ZmKCdjaGFuZ2UnLCBjaGFuZ2VIYW5kbGVyLCBvYmplY3QpO1xuICB9XG5cbiAgZ2V0U2VsZWN0ZWRPcHRpb25WYWx1ZSgpIHtcbiAgICBjb25zdCBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCksXG4gICAgICAgICAgc2VsZWN0ZWRPcHRpb25WYWx1ZSA9IGRvbUVsZW1lbnQudmFsdWU7ICAvLy9cbiAgICBcbiAgICByZXR1cm4gc2VsZWN0ZWRPcHRpb25WYWx1ZTtcbiAgfVxuXG4gIHNldFNlbGVjdGVkT3B0aW9uQnlWYWx1ZShzZWxlY3RlZE9wdGlvblZhbHVlKSB7XG4gICAgY29uc3QgdmFsdWUgPSBzZWxlY3RlZE9wdGlvblZhbHVlLCAgLy8vXG4gICAgICAgICAgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpO1xuICAgIFxuICAgIGRvbUVsZW1lbnQudmFsdWUgPSB2YWx1ZTsgXG4gIH1cblxuICBzdGF0aWMgY2xvbmUoZWxlbWVudCwgY2hhbmdlSGFuZGxlcikgeyByZXR1cm4gRWxlbWVudC5jbG9uZShTZWxlY3QsIGVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpOyB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIGNoYW5nZUhhbmRsZXIpIHsgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoU2VsZWN0LCBodG1sLCBjaGFuZ2VIYW5kbGVyKTsgfVxuXG4gIHN0YXRpYyBmcm9tRE9NRWxlbWVudChkb21FbGVtZW50LCBjaGFuZ2VIYW5kbGVyKSB7IHJldHVybiBFbGVtZW50LmZyb21ET01FbGVtZW50KFNlbGVjdCwgZG9tRWxlbWVudCwgY2hhbmdlSGFuZGxlcik7IH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgY2hhbmdlSGFuZGxlciA9IG9uQ2hhbmdlLCAvLy9cbiAgICAgICAgICBzZWxlY3QgPSBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKFNlbGVjdCwgcHJvcGVydGllcywgY2hhbmdlSGFuZGxlcik7XG4gICAgXG4gICAgcmV0dXJuIHNlbGVjdDtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKFNlbGVjdCwge1xuICB0YWdOYW1lOiAnc2VsZWN0JyxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnb25DaGFuZ2UnXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlbGVjdDtcblxuZnVuY3Rpb24gZGVmYXVsdEludGVybWVkaWF0ZUNoYW5nZUhhbmRsZXIoY2hhbmdlSGFuZGxlciwgZXZlbnQsIGVsZW1lbnQpIHtcbiAgY29uc3Qgc2VsZWN0ID0gZWxlbWVudCwgLy8vXG4gICAgICAgIHNlbGVjdGVkT3B0aW9uVmFsdWUgPSBzZWxlY3QuZ2V0U2VsZWN0ZWRPcHRpb25WYWx1ZSgpO1xuICBcbiAgY2hhbmdlSGFuZGxlci5jYWxsKGVsZW1lbnQsIHNlbGVjdGVkT3B0aW9uVmFsdWUsIGV2ZW50KTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJy4uL2VsZW1lbnQnKTtcblxuY2xhc3MgU3BhbiBleHRlbmRzIEVsZW1lbnQge1xuICBjbG9uZSgpIHsgcmV0dXJuIFNwYW4uY2xvbmUodGhpcyk7IH1cblxuICBvblJlc2l6ZSgpIHt9XG5cbiAgb2ZmUmVzaXplKCkge31cblxuICBzdGF0aWMgY2xvbmUoZWxlbWVudCkgeyByZXR1cm4gRWxlbWVudC5jbG9uZShTcGFuLCBlbGVtZW50KTsgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sKSB7IHJldHVybiBFbGVtZW50LmZyb21IVE1MKFNwYW4sIGh0bWwpOyB9XG5cbiAgc3RhdGljIGZyb21ET01FbGVtZW50KGRvbUVsZW1lbnQpIHsgcmV0dXJuIEVsZW1lbnQuZnJvbURPTUVsZW1lbnQoU3BhbiwgZG9tRWxlbWVudCk7IH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykgeyByZXR1cm4gRWxlbWVudC5mcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKTsgfVxufVxuXG5PYmplY3QuYXNzaWduKFNwYW4sIHtcbiAgdGFnTmFtZTogJ3NwYW4nXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTcGFuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnLi9lbGVtZW50Jyk7XG5cbmNsYXNzIElucHV0RWxlbWVudCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgY2hhbmdlSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIGlmIChjaGFuZ2VIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMub25DaGFuZ2UoY2hhbmdlSGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgb25SZXNpemUoKSB7fVxuXG4gIG9mZlJlc2l6ZSgpIHt9XG5cbiAgb25DaGFuZ2UoY2hhbmdlSGFuZGxlciwgaW50ZXJtZWRpYXRlQ2hhbmdlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVDaGFuZ2VIYW5kbGVyKSB7XG4gICAgdGhpcy5vbignY2hhbmdlJywgY2hhbmdlSGFuZGxlciwgaW50ZXJtZWRpYXRlQ2hhbmdlSGFuZGxlcik7XG4gIH1cblxuICBvZmZDaGFuZ2UoY2hhbmdlSGFuZGxlcikge1xuICAgIHRoaXMub2ZmKCdjaGFuZ2UnLCBjaGFuZ2VIYW5kbGVyKTtcbiAgfVxuXG4gIGdldFZhbHVlKCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LnZhbHVlOyB9XG5cbiAgZ2V0U2VsZWN0aW9uU3RhcnQoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQ7IH1cblxuICBnZXRTZWxlY3Rpb25FbmQoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0aW9uRW5kOyB9XG4gIFxuICBpc1JlYWRPbmx5KCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LnJlYWRPbmx5OyB9XG5cbiAgc2V0VmFsdWUodmFsdWUpIHsgdGhpcy5kb21FbGVtZW50LnZhbHVlID0gdmFsdWU7IH1cblxuICBzZXRTZWxlY3Rpb25TdGFydChzZWxlY3Rpb25TdGFydCkgeyB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25TdGFydDsgfVxuXG4gIHNldFNlbGVjdGlvbkVuZChzZWxlY3Rpb25FbmQpIHsgdGhpcy5kb21FbGVtZW50LnNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZDsgfVxuXG4gIHNldFJlYWRPbmx5KHJlYWRPbmx5KSB7IHRoaXMuZG9tRWxlbWVudC5yZWFkT25seSA9IHJlYWRPbmx5OyB9XG5cbiAgc2VsZWN0KCkgeyB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0KCk7IH1cblxuICBzdGF0aWMgY2xvbmUoQ2xhc3MsIGVsZW1lbnQsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIHJldHVybiBFbGVtZW50LmNsb25lKENsYXNzLCBlbGVtZW50LCAuLi5yZW1haW5pbmdBcmd1bWVudHMpO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbUhUTUwoQ2xhc3MsIGh0bWwsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21IVE1MKENsYXNzLCBodG1sLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpO1xuICB9XG5cbiAgc3RhdGljIGZyb21ET01FbGVtZW50KENsYXNzLCBkb21FbGVtZW50LCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tRE9NRWxlbWVudChDbGFzcywgZG9tRWxlbWVudCwgLi4ucmVtYWluaW5nQXJndW1lbnRzKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBjaGFuZ2VIYW5kbGVyID0gb25DaGFuZ2U7IC8vL1xuXG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIGNoYW5nZUhhbmRsZXIsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cyk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVN0cmluZyhzdHJpbmcsIHByb3BlcnRpZXMsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgY2hhbmdlSGFuZGxlciA9IG9uQ2hhbmdlOyAvLy9cblxuICAgIHJldHVybiBFbGVtZW50LmZyb21TdHJpbmcoc3RyaW5nLCBwcm9wZXJ0aWVzLCBjaGFuZ2VIYW5kbGVyLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oSW5wdXRFbGVtZW50LCB7XG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ29uQ2hhbmdlJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dEVsZW1lbnQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRJbnRlcm1lZGlhdGVDaGFuZ2VIYW5kbGVyKGNoYW5nZUhhbmRsZXIsIGV2ZW50LCBlbGVtZW50KSB7XG4gIGNvbnN0IGlucHV0RWxlbWVudCA9IGVsZW1lbnQsIC8vL1xuICAgICAgICB2YWx1ZSA9IGlucHV0RWxlbWVudC5nZXRWYWx1ZSgpO1xuICBcbiAgY2hhbmdlSGFuZGxlci5jYWxsKGlucHV0RWxlbWVudCwgdmFsdWUsIGV2ZW50KTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgSW5wdXRFbGVtZW50ID0gcmVxdWlyZSgnLi4vaW5wdXRFbGVtZW50Jyk7XG5cbmNsYXNzIElucHV0IGV4dGVuZHMgSW5wdXRFbGVtZW50IHtcbiAgY2xvbmUoY2hhbmdlSGFuZGxlcikgeyByZXR1cm4gSW5wdXQuY2xvbmUodGhpcywgY2hhbmdlSGFuZGxlcik7IH1cblxuICBzdGF0aWMgY2xvbmUoZWxlbWVudCwgY2hhbmdlSGFuZGxlcikgeyByZXR1cm4gSW5wdXRFbGVtZW50LmNsb25lKElucHV0LCBlbGVtZW50LCBjaGFuZ2VIYW5kbGVyKTsgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sLCBjaGFuZ2VIYW5kbGVyKSB7IHJldHVybiBJbnB1dEVsZW1lbnQuZnJvbUhUTUwoSW5wdXQsIGh0bWwsIGNoYW5nZUhhbmRsZXIpOyB9XG5cbiAgc3RhdGljIGZyb21ET01FbGVtZW50KGRvbUVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpIHsgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tRE9NRWxlbWVudChJbnB1dCwgZG9tRWxlbWVudCwgY2hhbmdlSGFuZGxlcik7IH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykgeyByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKElucHV0LCBwcm9wZXJ0aWVzKTsgfVxufVxuXG5PYmplY3QuYXNzaWduKElucHV0LCB7XG4gIHRhZ05hbWU6ICdpbnB1dCdcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBJbnB1dEVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnB1dEVsZW1lbnQnKTtcblxuY2xhc3MgVGV4dGFyZWEgZXh0ZW5kcyBJbnB1dEVsZW1lbnQge1xuICBjbG9uZShjaGFuZ2VIYW5kbGVyKSB7IHJldHVybiBUZXh0YXJlYS5jbG9uZSh0aGlzLCBjaGFuZ2VIYW5kbGVyKTsgfVxuXG4gIHN0YXRpYyBjbG9uZShlbGVtZW50LCBjaGFuZ2VIYW5kbGVyKSB7IHJldHVybiBJbnB1dEVsZW1lbnQuY2xvbmUoVGV4dGFyZWEsIGVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpOyB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIGNoYW5nZUhhbmRsZXIpIHsgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tSFRNTChUZXh0YXJlYSwgaHRtbCwgY2hhbmdlSGFuZGxlcik7IH1cblxuICBzdGF0aWMgZnJvbURPTUVsZW1lbnQoZG9tRWxlbWVudCwgY2hhbmdlSGFuZGxlcikgeyByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21ET01FbGVtZW50KFRleHRhcmVhLCBkb21FbGVtZW50LCBjaGFuZ2VIYW5kbGVyKTsgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7IHJldHVybiBJbnB1dEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoVGV4dGFyZWEsIHByb3BlcnRpZXMpOyB9XG59XG5cbk9iamVjdC5hc3NpZ24oVGV4dGFyZWEsIHtcbiAgdGFnTmFtZTogJ3RleHRhcmVhJ1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVGV4dGFyZWE7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIEJvdW5kcyB7XG4gIGNvbnN0cnVjdG9yKHRvcCwgbGVmdCwgYm90dG9tLCByaWdodCkge1xuICAgIHRoaXMudG9wID0gdG9wO1xuICAgIHRoaXMubGVmdCA9IGxlZnQ7XG4gICAgdGhpcy5ib3R0b20gPSBib3R0b207XG4gICAgdGhpcy5yaWdodCA9IHJpZ2h0O1xuICB9XG5cbiAgZ2V0VG9wKCkge1xuICAgIHJldHVybiB0aGlzLnRvcDtcbiAgfVxuXG4gIGdldExlZnQoKSB7XG4gICAgcmV0dXJuIHRoaXMubGVmdDtcbiAgfVxuXG4gIGdldEJvdHRvbSgpIHtcbiAgICByZXR1cm4gdGhpcy5ib3R0b207XG4gIH1cblxuICBnZXRSaWdodCgpIHtcbiAgICByZXR1cm4gdGhpcy5yaWdodDtcbiAgfVxuXG4gIGdldFdpZHRoKCkge1xuICAgIGNvbnN0IHdpZHRoID0gdGhpcy5yaWdodCAtIHRoaXMubGVmdDtcblxuICAgIHJldHVybiB3aWR0aDtcbiAgfVxuXG4gIGdldEhlaWdodCgpIHtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmJvdHRvbSAtIHRoaXMudG9wO1xuXG4gICAgcmV0dXJuIGhlaWdodDtcbiAgfVxuICBcbiAgc2V0VG9wKHRvcCkge1xuICAgIHRoaXMudG9wID0gdG9wO1xuICB9XG5cbiAgc2V0TGVmdChsZWZ0KSB7XG4gICAgdGhpcy5sZWZ0ID0gbGVmdDtcbiAgfVxuXG4gIHNldEJvdHRvbShib3R0b20pIHtcbiAgICB0aGlzLmJvdHRvbSA9IGJvdHRvbTtcbiAgfVxuXG4gIHNldFJpZ2h0KHJpZ2h0KSB7XG4gICAgdGhpcy5yaWdodCA9IHJpZ2h0O1xuICB9XG5cbiAgc2hpZnQoaG9yaXpvbnRhbE9mZnNldCwgdmVydGljYWxPZmZzZXQpIHtcbiAgICB0aGlzLnRvcCArPSB2ZXJ0aWNhbE9mZnNldDtcbiAgICB0aGlzLmxlZnQgKz0gaG9yaXpvbnRhbE9mZnNldDtcbiAgICB0aGlzLmJvdHRvbSArPSB2ZXJ0aWNhbE9mZnNldDtcbiAgICB0aGlzLnJpZ2h0ICs9IGhvcml6b250YWxPZmZzZXQ7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nTW91c2UobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIHJldHVybiAoICAodGhpcy50b3AgPCBtb3VzZVRvcClcbiAgICAgICAgICAgJiYgKHRoaXMubGVmdCA8IG1vdXNlTGVmdClcbiAgICAgICAgICAgJiYgKHRoaXMuYm90dG9tID4gbW91c2VUb3ApXG4gICAgICAgICAgICYmICh0aGlzLnJpZ2h0ID4gbW91c2VMZWZ0KSAgKTtcbiAgfVxuXG4gIGFyZU92ZXJsYXBwaW5nKGJvdW5kcykge1xuICAgIHJldHVybiAoICAodGhpcy50b3AgPCBib3VuZHMuYm90dG9tKVxuICAgICAgICAgICAmJiAodGhpcy5sZWZ0IDwgYm91bmRzLnJpZ2h0KVxuICAgICAgICAgICAmJiAodGhpcy5ib3R0b20gPiBib3VuZHMudG9wKVxuICAgICAgICAgICAmJiAodGhpcy5yaWdodCA+IGJvdW5kcy5sZWZ0KSAgKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tQm91bmRpbmdDbGllbnRSZWN0KGJvdW5kaW5nQ2xpZW50UmVjdCkge1xuICAgIGNvbnN0IHdpbmRvd1Njcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCwgLy8vXG4gICAgICAgICAgd2luZG93U2Nyb2xsTGVmdCA9IHdpbmRvdy5wYWdlWE9mZnNldCwgIC8vL1xuICAgICAgICAgIHRvcCA9IGJvdW5kaW5nQ2xpZW50UmVjdC50b3AgKyB3aW5kb3dTY3JvbGxUb3AsXG4gICAgICAgICAgbGVmdCA9IGJvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0ICsgd2luZG93U2Nyb2xsTGVmdCxcbiAgICAgICAgICBib3R0b20gPSBib3VuZGluZ0NsaWVudFJlY3QuYm90dG9tICsgd2luZG93U2Nyb2xsVG9wLFxuICAgICAgICAgIHJpZ2h0ID0gYm91bmRpbmdDbGllbnRSZWN0LnJpZ2h0ICsgd2luZG93U2Nyb2xsTGVmdCxcbiAgICAgICAgICBib3VuZHMgPSBuZXcgQm91bmRzKHRvcCwgbGVmdCwgYm90dG9tLCByaWdodCk7XG5cbiAgICByZXR1cm4gYm91bmRzO1xuICB9XG5cbiAgc3RhdGljIGZyb21Ub3BMZWZ0V2lkdGhBbmRIZWlnaHQodG9wLCBsZWZ0LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgY29uc3QgYm90dG9tID0gdG9wICsgaGVpZ2h0LFxuICAgICAgICAgIHJpZ2h0ID0gbGVmdCArIHdpZHRoLFxuICAgICAgICAgIGJvdW5kcyA9IG5ldyBCb3VuZHModG9wLCBsZWZ0LCBib3R0b20sIHJpZ2h0KTtcblxuICAgIHJldHVybiBib3VuZHM7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCb3VuZHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIE9mZnNldCB7XG4gIGNvbnN0cnVjdG9yKHRvcCwgbGVmdCkge1xuICAgIHRoaXMudG9wID0gdG9wO1xuICAgIHRoaXMubGVmdCA9IGxlZnQ7XG4gIH1cblxuICBnZXRUb3AoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9wO1xuICB9XG5cbiAgZ2V0TGVmdCgpIHtcbiAgICByZXR1cm4gdGhpcy5sZWZ0O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gT2Zmc2V0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBvbkNsaWNrKGhhbmRsZXIsIGVsZW1lbnQsIGludGVybWVkaWF0ZUhhbmRsZXIgPSBkZWZhdWx0SW50ZXJtZWRpYXRlSGFuZGxlcikge1xuICB0aGlzLm9uKCdjbGljaycsIGhhbmRsZXIsIGVsZW1lbnQsIGludGVybWVkaWF0ZUhhbmRsZXIpO1xufVxuXG5mdW5jdGlvbiBvZmZDbGljayhoYW5kbGVyLCBlbGVtZW50KSB7IHRoaXMub2ZmKCdjbGljaycsIGhhbmRsZXIsIGVsZW1lbnQpOyB9XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBvbkNsaWNrLFxuICBvZmZDbGlja1xufTtcblxuZnVuY3Rpb24gZGVmYXVsdEludGVybWVkaWF0ZUhhbmRsZXIoaGFuZGxlciwgZXZlbnQsIGVsZW1lbnQpIHtcbiAgY29uc3QgeyBwYWdlWSwgcGFnZVgsIGJ1dHRvbiB9ID0gZXZlbnQsXG5cdFx0XHRcdG1vdXNlVG9wID0gcGFnZVksICAvLy9cbiAgICAgICAgbW91c2VMZWZ0ID0gcGFnZVgsIC8vL1xuICAgICAgICBtb3VzZUJ1dHRvbiA9IGJ1dHRvbjsgLy8vXG4gIFxuICBoYW5kbGVyLmNhbGwoZWxlbWVudCwgbW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24sIGV2ZW50KTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gb24oZXZlbnRUeXBlcywgaGFuZGxlciwgZWxlbWVudCA9IHRoaXMsIGludGVybWVkaWF0ZUhhbmRsZXIgPSBudWxsKSB7XG4gIGV2ZW50VHlwZXMgPSBldmVudFR5cGVzLnNwbGl0KCcgJyk7IC8vL1xuXG4gIGV2ZW50VHlwZXMuZm9yRWFjaChmdW5jdGlvbihldmVudFR5cGUpIHtcbiAgICBjb25zdCBldmVudExpc3RlbmVyID0gdGhpcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgaGFuZGxlciwgZWxlbWVudCwgaW50ZXJtZWRpYXRlSGFuZGxlcik7XG4gICAgXG4gICAgdGhpcy5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBldmVudExpc3RlbmVyKTtcbiAgfS5iaW5kKHRoaXMpKTtcbn1cblxuZnVuY3Rpb24gb2ZmKGV2ZW50VHlwZXMsIGhhbmRsZXIsIGVsZW1lbnQgPSB0aGlzKSB7XG4gIGV2ZW50VHlwZXMgPSBldmVudFR5cGVzLnNwbGl0KCcgJyk7IC8vL1xuXG4gIGV2ZW50VHlwZXMuZm9yRWFjaChmdW5jdGlvbihldmVudFR5cGUpIHtcbiAgICBjb25zdCBldmVudExpc3RlbmVyID0gdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgaGFuZGxlciwgZWxlbWVudCk7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGV2ZW50TGlzdGVuZXIpO1xuICB9LmJpbmQodGhpcykpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgb24sXG4gIG9mZixcbiAgYWRkRXZlbnRMaXN0ZW5lcixcbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lclxufTtcblxuZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIsIGVsZW1lbnQsIGludGVybWVkaWF0ZUhhbmRsZXIpIHtcbiAgaWYgKCF0aGlzLmhhc093blByb3BlcnR5KCdldmVudExpc3RlbmVycycpKSB7XG4gICAgdGhpcy5ldmVudExpc3RlbmVycyA9IFtdO1xuICB9XG4gIFxuICBjb25zdCBldmVudExpc3RlbmVycyA9IHRoaXMuZXZlbnRMaXN0ZW5lcnMsXG4gICAgICAgIGV2ZW50TGlzdGVuZXIgPSBjcmVhdGVFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgaGFuZGxlciwgZWxlbWVudCwgaW50ZXJtZWRpYXRlSGFuZGxlcik7XG5cbiAgZXZlbnRMaXN0ZW5lcnMucHVzaChldmVudExpc3RlbmVyKTtcblxuICByZXR1cm4gZXZlbnRMaXN0ZW5lcjtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIsIGVsZW1lbnQpIHtcbiAgY29uc3QgZXZlbnRMaXN0ZW5lcnMgPSB0aGlzLmV2ZW50TGlzdGVuZXJzLFxuICAgICAgICBldmVudExpc3RlbmVyID0gZmluZEV2ZW50TGlzdGVuZXIoZXZlbnRMaXN0ZW5lcnMsIGV2ZW50VHlwZSwgaGFuZGxlciwgZWxlbWVudCksXG4gICAgICAgIGluZGV4ID0gZXZlbnRMaXN0ZW5lcnMuaW5kZXhPZihldmVudExpc3RlbmVyKSxcbiAgICAgICAgc3RhcnQgPSBpbmRleCwgIC8vL1xuICAgICAgICBkZWxldGVDb3VudCA9IDE7XG5cbiAgZXZlbnRMaXN0ZW5lcnMuc3BsaWNlKHN0YXJ0LCBkZWxldGVDb3VudCk7XG5cbiAgaWYgKGV2ZW50TGlzdGVuZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgIGRlbGV0ZSB0aGlzLmV2ZW50TGlzdGVuZXJzO1xuICB9XG4gIFxuICByZXR1cm4gZXZlbnRMaXN0ZW5lcjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIsIGVsZW1lbnQsIGludGVybWVkaWF0ZUhhbmRsZXIpIHtcbiAgbGV0IGV2ZW50TGlzdGVuZXI7XG5cbiAgaWYgKGludGVybWVkaWF0ZUhhbmRsZXIgPT09IG51bGwpIHtcbiAgICBldmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGhhbmRsZXIuY2FsbChlbGVtZW50LCBldmVudClcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIGV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgaW50ZXJtZWRpYXRlSGFuZGxlcihoYW5kbGVyLCBldmVudCwgZWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgT2JqZWN0LmFzc2lnbihldmVudExpc3RlbmVyLCB7XG4gICAgZXZlbnRUeXBlLFxuICAgIGhhbmRsZXIsXG4gICAgZWxlbWVudFxuICB9KTtcblxuICByZXR1cm4gZXZlbnRMaXN0ZW5lcjtcbn1cblxuZnVuY3Rpb24gZmluZEV2ZW50TGlzdGVuZXIoZXZlbnRMaXN0ZW5lcnMsIGV2ZW50VHlwZSwgaGFuZGxlciwgZWxlbWVudCkge1xuICBjb25zdCBldmVudExpc3RlbmVyID0gZXZlbnRMaXN0ZW5lcnMuZmluZChmdW5jdGlvbihldmVudExpc3RlbmVyKSB7XG4gICAgY29uc3QgZm91bmQgPSAoIChldmVudExpc3RlbmVyLmVsZW1lbnQgPT09IGVsZW1lbnQpICYmXG4gICAgICAgICAgICAgICAgICAgIChldmVudExpc3RlbmVyLmhhbmRsZXIgPT09IGhhbmRsZXIpICYmXG4gICAgICAgICAgICAgICAgICAgIChldmVudExpc3RlbmVyLmV2ZW50VHlwZSA9PT0gZXZlbnRUeXBlKSApOyAgLy8vXG4gICAgXG4gICAgcmV0dXJuIGZvdW5kO1xuICB9KTtcbiAgXG4gIHJldHVybiBldmVudExpc3RlbmVyO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBUZXh0RWxlbWVudCA9IHJlcXVpcmUoJy4uL3RleHRFbGVtZW50JyksXG4gICAgICBhcnJheVV0aWxpdGllcyA9IHJlcXVpcmUoJy4uL3V0aWxpdGllcy9hcnJheScpLFxuICAgICAgb2JqZWN0VXRpbGl0aWVzID0gcmVxdWlyZSgnLi4vdXRpbGl0aWVzL29iamVjdCcpO1xuXG5jb25zdCB7IGZpcnN0IH0gPSBhcnJheVV0aWxpdGllcyxcbiAgICAgIHsgY29tYmluZSwgcHJ1bmUgfSA9IG9iamVjdFV0aWxpdGllcztcblxuZnVuY3Rpb24gYXBwbHlQcm9wZXJ0aWVzKHByb3BlcnRpZXMgPSB7fSwgZGVmYXVsdFByb3BlcnRpZXMsIGlnbm9yZWRQcm9wZXJ0aWVzKSB7XG4gIGNvbWJpbmUocHJvcGVydGllcywgZGVmYXVsdFByb3BlcnRpZXMpO1xuXG4gIGNvbnN0IGVsZW1lbnQgPSB0aGlzLCAvLy9cbiAgICAgICAgY2hpbGRFbGVtZW50cyA9IGNoaWxkRWxlbWVudHNGcm9tRWxlbWVudEFuZFByb3BlcnRpZXMoZWxlbWVudCwgcHJvcGVydGllcyk7XG5cbiAgcHJ1bmUocHJvcGVydGllcywgaWdub3JlZFByb3BlcnRpZXMpO1xuXG4gIGNvbnN0IG5hbWVzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyk7ICAvLy9cblxuICBuYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHByb3BlcnRpZXNbbmFtZV07XG5cbiAgICBpZiAoZmFsc2UpIHtcblxuICAgIH0gZWxzZSBpZiAoaXNIYW5kbGVyTmFtZShuYW1lKSkge1xuICAgICAgYWRkSGFuZGxlcih0aGlzLCBuYW1lLCB2YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChpc0F0dHJpYnV0ZU5hbWUobmFtZSkpIHtcbiAgICAgIGFkZEF0dHJpYnV0ZSh0aGlzLCBuYW1lLCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5oYXNPd25Qcm9wZXJ0eSgncHJvcGVydGllcycpKSB7XG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSB7fTtcblxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIHtcbiAgICAgICAgICBwcm9wZXJ0aWVzXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnByb3BlcnRpZXNbbmFtZV0gPSB2YWx1ZTtcbiAgICB9XG4gIH0uYmluZCh0aGlzKSk7XG5cbiAgY29uc3QgcGFyZW50RWxlbWVudCA9IHRoaXM7IC8vL1xuXG4gIGNoaWxkRWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbihjaGlsZEVsZW1lbnQpIHtcbiAgICB1cGRhdGVQYXJlbnRFbGVtZW50Q29udGV4dChjaGlsZEVsZW1lbnQsIHBhcmVudEVsZW1lbnQpO1xuXG4gICAgY2hpbGRFbGVtZW50LmFkZFRvKHBhcmVudEVsZW1lbnQpO1xuICB9LmJpbmQodGhpcykpO1xufVxuXG5mdW5jdGlvbiBnZXRQcm9wZXJ0aWVzKCkge1xuICByZXR1cm4gdGhpcy5wcm9wZXJ0aWVzO1xufVxuXG5mdW5jdGlvbiBnZXRDb250ZXh0KCkge1xuICByZXR1cm4gdGhpcy5jb250ZXh0O1xufVxuXG5mdW5jdGlvbiBnZXRTdGF0ZSgpIHtcbiAgcmV0dXJuIHRoaXMuc3RhdGU7XG59XG5cbmZ1bmN0aW9uIHNldFN0YXRlKHN0YXRlKSB7XG4gIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlU3RhdGUodXBkYXRlKSB7XG4gIE9iamVjdC5hc3NpZ24odGhpcy5zdGF0ZSwgdXBkYXRlKTtcbn1cblxuZnVuY3Rpb24gYXNzaWduQ29udGV4dChuYW1lcywgdGhlbkRlbGV0ZSkge1xuICBjb25zdCBhcmd1bWVudHNMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuXG4gIGlmIChhcmd1bWVudHNMZW5ndGggPT09IDEpIHtcbiAgICBjb25zdCBmaXJzdEFyZ3VtZW50ID0gZmlyc3QoYXJndW1lbnRzKTtcblxuICAgIGlmICh0eXBlb2YgZmlyc3RBcmd1bWVudCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBuYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMuY29udGV4dCk7XG5cbiAgICAgIHRoZW5EZWxldGUgPSBmaXJzdEFyZ3VtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGVuRGVsZXRlID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBpZiAoYXJndW1lbnRzTGVuZ3RoID09PSAwKSB7XG4gICAgbmFtZXMgPSBPYmplY3Qua2V5cyh0aGlzLmNvbnRleHQpO1xuXG4gICAgdGhlbkRlbGV0ZSA9IHRydWU7XG4gIH1cblxuICBuYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuY29udGV4dFtuYW1lXSxcbiAgICAgICAgICBwcm9wZXJ0eU5hbWUgPSBuYW1lLCAgLy8vXG4gICAgICAgICAgZGVzY3JpcHRvciA9IHtcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICAgIH07XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgcHJvcGVydHlOYW1lLCBkZXNjcmlwdG9yKTtcblxuICAgIGlmICh0aGVuRGVsZXRlKSB7XG4gICAgICBkZWxldGUgdGhpcy5jb250ZXh0W25hbWVdO1xuICAgIH1cbiAgfS5iaW5kKHRoaXMpLCBbXSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhcHBseVByb3BlcnRpZXMsXG4gIGdldFByb3BlcnRpZXMsXG4gIGdldENvbnRleHQsXG4gIGdldFN0YXRlLFxuICBzZXRTdGF0ZSxcbiAgdXBkYXRlU3RhdGUsXG4gIGFzc2lnbkNvbnRleHRcbn07XG5cbmZ1bmN0aW9uIHVwZGF0ZVBhcmVudEVsZW1lbnRDb250ZXh0KGNoaWxkRWxlbWVudCwgcGFyZW50RWxlbWVudCkge1xuICBjb25zdCBwYXJlbnRDb250ZXh0ID0gKHR5cGVvZiBjaGlsZEVsZW1lbnQucGFyZW50Q29udGV4dCA9PT0gJ2Z1bmN0aW9uJykgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZEVsZW1lbnQucGFyZW50Q29udGV4dCgpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZEVsZW1lbnQuY29udGV4dDtcblxuICBwYXJlbnRFbGVtZW50LmNvbnRleHQgPSBPYmplY3QuYXNzaWduKHt9LCBwYXJlbnRFbGVtZW50LmNvbnRleHQsIHBhcmVudENvbnRleHQpO1xuXG4gIGRlbGV0ZSBjaGlsZEVsZW1lbnQuY29udGV4dDtcbn1cblxuZnVuY3Rpb24gY2hpbGRFbGVtZW50c0Zyb21FbGVtZW50QW5kUHJvcGVydGllcyhlbGVtZW50LCBwcm9wZXJ0aWVzKSB7XG4gIGxldCBjaGlsZEVsZW1lbnRzID0gKHR5cGVvZiBlbGVtZW50LmNoaWxkRWxlbWVudHMgPT09ICdmdW5jdGlvbicpID9cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2hpbGRFbGVtZW50cyhwcm9wZXJ0aWVzKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXMuY2hpbGRFbGVtZW50cztcblxuICBjaGlsZEVsZW1lbnRzID0gKGNoaWxkRWxlbWVudHMgIT09IHVuZGVmaW5lZCkgP1xuICAgICAgICAgICAgICAgICAgICgoY2hpbGRFbGVtZW50cyBpbnN0YW5jZW9mIEFycmF5KSA/XG4gICAgICAgICAgICAgICAgICAgICAgIGNoaWxkRWxlbWVudHMgOlxuICAgICAgICAgICAgICAgICAgICAgICAgW2NoaWxkRWxlbWVudHNdKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtdO1xuXG4gIGNoaWxkRWxlbWVudHMgPSBjaGlsZEVsZW1lbnRzLm1hcChmdW5jdGlvbihjaGlsZEVsZW1lbnQpIHtcbiAgICBpZiAodHlwZW9mIGNoaWxkRWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IHRleHQgPSBjaGlsZEVsZW1lbnQsICAvLy9cbiAgICAgICAgICAgIHRleHRFbGVtZW50ID0gbmV3IFRleHRFbGVtZW50KHRleHQpO1xuXG4gICAgICBjaGlsZEVsZW1lbnQgPSB0ZXh0RWxlbWVudDsgLy8vXG4gICAgfVxuXG4gICAgcmV0dXJuIGNoaWxkRWxlbWVudDtcbiAgfSk7XG5cbiAgcmV0dXJuIGNoaWxkRWxlbWVudHM7XG59XG5cbmZ1bmN0aW9uIGFkZEhhbmRsZXIoZWxlbWVudCwgbmFtZSwgdmFsdWUpIHtcbiAgY29uc3QgZXZlbnRUeXBlID0gbmFtZS5zdWJzdHIoMikudG9Mb3dlckNhc2UoKSwgLy8vXG4gICAgICAgIGhhbmRsZXIgPSB2YWx1ZTsgIC8vL1xuXG4gIGVsZW1lbnQub24oZXZlbnRUeXBlLCBoYW5kbGVyKTtcbn1cblxuZnVuY3Rpb24gYWRkQXR0cmlidXRlKGVsZW1lbnQsIG5hbWUsIHZhbHVlKSB7XG4gIGlmIChuYW1lID09PSAnY2xhc3NOYW1lJykge1xuICAgIG5hbWUgPSAnY2xhc3MnO1xuICB9XG5cbiAgaWYgKG5hbWUgPT09ICdodG1sRm9yJykge1xuICAgIG5hbWUgPSAnZm9yJztcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlKTtcblxuICAgIGtleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBlbGVtZW50LmRvbUVsZW1lbnRbbmFtZV1ba2V5XSA9IHZhbHVlW2tleV07XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdmFsdWUgPSBuYW1lOyAvLy9cblxuICAgICAgZWxlbWVudC5hZGRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBlbGVtZW50LmFkZEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNIYW5kbGVyTmFtZShuYW1lKSB7XG4gIHJldHVybiBuYW1lLm1hdGNoKC9eb24vKTtcbn1cblxuZnVuY3Rpb24gaXNBdHRyaWJ1dGVOYW1lKG5hbWUpIHtcbiAgcmV0dXJuIGF0dHJpYnV0ZU5hbWVzLmluY2x1ZGVzKG5hbWUpO1xufVxuXG5jb25zdCBhdHRyaWJ1dGVOYW1lcyA9IFtcbiAgJ2FjY2VwdCcsICdhY2NlcHRDaGFyc2V0JywgJ2FjY2Vzc0tleScsICdhY3Rpb24nLCAnYWxsb3dGdWxsU2NyZWVuJywgJ2FsbG93VHJhbnNwYXJlbmN5JywgJ2FsdCcsICdhc3luYycsICdhdXRvQ29tcGxldGUnLCAnYXV0b0ZvY3VzJywgJ2F1dG9QbGF5JyxcbiAgJ2NhcHR1cmUnLCAnY2VsbFBhZGRpbmcnLCAnY2VsbFNwYWNpbmcnLCAnY2hhbGxlbmdlJywgJ2NoYXJTZXQnLCAnY2hlY2tlZCcsICdjaXRlJywgJ2NsYXNzSUQnLCAnY2xhc3NOYW1lJywgJ2NvbFNwYW4nLCAnY29scycsICdjb250ZW50JywgJ2NvbnRlbnRFZGl0YWJsZScsICdjb250ZXh0TWVudScsICdjb250cm9scycsICdjb29yZHMnLCAnY3Jvc3NPcmlnaW4nLFxuICAnZGF0YScsICdkYXRlVGltZScsICdkZWZhdWx0JywgJ2RlZmVyJywgJ2RpcicsICdkaXNhYmxlZCcsICdkb3dubG9hZCcsICdkcmFnZ2FibGUnLFxuICAnZW5jVHlwZScsXG4gICdmb3JtJywgJ2Zvcm1BY3Rpb24nLCAnZm9ybUVuY1R5cGUnLCAnZm9ybU1ldGhvZCcsICdmb3JtTm9WYWxpZGF0ZScsICdmb3JtVGFyZ2V0JywgJ2ZyYW1lQm9yZGVyJyxcbiAgJ2hlYWRlcnMnLCAnaGVpZ2h0JywgJ2hpZGRlbicsICdoaWdoJywgJ2hyZWYnLCAnaHJlZkxhbmcnLCAnaHRtbEZvcicsICdodHRwRXF1aXYnLFxuICAnaWNvbicsICdpZCcsICdpbnB1dE1vZGUnLCAnaW50ZWdyaXR5JywgJ2lzJyxcbiAgJ2tleVBhcmFtcycsICdrZXlUeXBlJywgJ2tpbmQnLFxuICAnbGFiZWwnLCAnbGFuZycsICdsaXN0JywgJ2xvb3AnLCAnbG93JyxcbiAgJ21hbmlmZXN0JywgJ21hcmdpbkhlaWdodCcsICdtYXJnaW5XaWR0aCcsICdtYXgnLCAnbWF4TGVuZ3RoJywgJ21lZGlhJywgJ21lZGlhR3JvdXAnLCAnbWV0aG9kJywgJ21pbicsICdtaW5MZW5ndGgnLCAnbXVsdGlwbGUnLCAnbXV0ZWQnLFxuICAnbmFtZScsICdub1ZhbGlkYXRlJywgJ25vbmNlJyxcbiAgJ29wZW4nLCAnb3B0aW11bScsXG4gICdwYXR0ZXJuJywgJ3BsYWNlaG9sZGVyJywgJ3Bvc3RlcicsICdwcmVsb2FkJywgJ3Byb2ZpbGUnLFxuICAncmFkaW9Hcm91cCcsICdyZWFkT25seScsICdyZWwnLCAncmVxdWlyZWQnLCAncmV2ZXJzZWQnLCAncm9sZScsICdyb3dTcGFuJywgJ3Jvd3MnLFxuICAnc2FuZGJveCcsICdzY29wZScsICdzY29wZWQnLCAnc2Nyb2xsaW5nJywgJ3NlYW1sZXNzJywgJ3NlbGVjdGVkJywgJ3NoYXBlJywgJ3NpemUnLCAnc2l6ZXMnLCAnc3BhbicsICdzcGVsbENoZWNrJywgJ3NyYycsICdzcmNEb2MnLCAnc3JjTGFuZycsICdzcmNTZXQnLCAnc3RhcnQnLCAnc3RlcCcsICdzdHlsZScsICdzdW1tYXJ5JyxcbiAgJ3RhYkluZGV4JywgJ3RhcmdldCcsICd0aXRsZScsICd0eXBlJyxcbiAgJ3VzZU1hcCcsXG4gICd2YWx1ZScsXG4gICd3aWR0aCcsXG4gICd3bW9kZScsXG4gICd3cmFwJ1xuXTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gb25LZXlVcChoYW5kbGVyLCBlbGVtZW50LCBpbnRlcm1lZGlhdGVIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUhhbmRsZXIpIHtcbiAgdGhpcy5vbigna2V5dXAnLCBoYW5kbGVyLCBlbGVtZW50LCBpbnRlcm1lZGlhdGVIYW5kbGVyKTtcbn1cblxuZnVuY3Rpb24gb25LZXlEb3duKGhhbmRsZXIsIGVsZW1lbnQsIGludGVybWVkaWF0ZUhhbmRsZXIgPSBkZWZhdWx0SW50ZXJtZWRpYXRlSGFuZGxlcikge1xuICB0aGlzLm9uKCdrZXlkb3duJywgaGFuZGxlciwgZWxlbWVudCwgaW50ZXJtZWRpYXRlSGFuZGxlcik7XG59XG5cbmZ1bmN0aW9uIG9mZktleVVwKGhhbmRsZXIsIGVsZW1lbnQpIHsgdGhpcy5vZmYoJ2tleXVwJywgaGFuZGxlciwgZWxlbWVudCk7IH1cblxuZnVuY3Rpb24gb2ZmS2V5RG93bihoYW5kbGVyLCBlbGVtZW50KSB7IHRoaXMub2ZmKCdrZXlkb3duJywgaGFuZGxlciwgZWxlbWVudCk7IH1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG9uS2V5VXAsXG4gIG9uS2V5RG93bixcbiAgb2ZmS2V5VXAsXG4gIG9mZktleURvd25cbn07XG5cbmZ1bmN0aW9uIGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyKGhhbmRsZXIsIGV2ZW50LCBlbGVtZW50KSB7XG4gIGNvbnN0IHsga2V5Q29kZSB9ID0gZXZlbnQ7XG4gIFxuICBoYW5kbGVyLmNhbGwoZWxlbWVudCwga2V5Q29kZSwgZXZlbnQpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBvbk1vdXNlVXAoaGFuZGxlciwgZWxlbWVudCwgaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyKSB7XG4gIHRoaXMub24oJ21vdXNldXAnLCBoYW5kbGVyLCBlbGVtZW50LCBpbnRlcm1lZGlhdGVIYW5kbGVyKTtcbn1cblxuZnVuY3Rpb24gb25Nb3VzZURvd24oaGFuZGxlciwgZWxlbWVudCwgaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyKSB7XG4gIHRoaXMub24oJ21vdXNlZG93bicsIGhhbmRsZXIsIGVsZW1lbnQsIGludGVybWVkaWF0ZUhhbmRsZXIpO1xufVxuXG5mdW5jdGlvbiBvbk1vdXNlT3ZlcihoYW5kbGVyLCBlbGVtZW50LCBpbnRlcm1lZGlhdGVIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUhhbmRsZXIpIHtcbiAgdGhpcy5vbignbW91c2VvdmVyJywgaGFuZGxlciwgZWxlbWVudCwgaW50ZXJtZWRpYXRlSGFuZGxlcik7XG59XG5cbmZ1bmN0aW9uIG9uTW91c2VPdXQoaGFuZGxlciwgZWxlbWVudCwgaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyKSB7XG4gIHRoaXMub24oJ21vdXNlb3V0JywgaGFuZGxlciwgZWxlbWVudCwgaW50ZXJtZWRpYXRlSGFuZGxlcik7XG59XG5cbmZ1bmN0aW9uIG9uTW91c2VNb3ZlKGhhbmRsZXIsIGVsZW1lbnQsIGludGVybWVkaWF0ZUhhbmRsZXIgPSBkZWZhdWx0SW50ZXJtZWRpYXRlSGFuZGxlcikge1xuICB0aGlzLm9uKCdtb3VzZW1vdmUnLCBoYW5kbGVyLCBlbGVtZW50LCBpbnRlcm1lZGlhdGVIYW5kbGVyKTtcbn1cblxuZnVuY3Rpb24gb2ZmTW91c2VVcChoYW5kbGVyLCBlbGVtZW50KSB7IHRoaXMub2ZmKCdtb3VzZXVwJywgaGFuZGxlciwgZWxlbWVudCk7IH1cblxuZnVuY3Rpb24gb2ZmTW91c2VEb3duKGhhbmRsZXIsIGVsZW1lbnQpIHsgdGhpcy5vZmYoJ21vdXNlZG93bicsIGhhbmRsZXIsIGVsZW1lbnQpOyB9XG5cbmZ1bmN0aW9uIG9mZk1vdXNlT3ZlcihoYW5kbGVyLCBlbGVtZW50KSB7IHRoaXMub2ZmKCdtb3VzZW92ZXInLCBoYW5kbGVyLCBlbGVtZW50KTsgfVxuXG5mdW5jdGlvbiBvZmZNb3VzZU91dChoYW5kbGVyLCBlbGVtZW50KSB7IHRoaXMub2ZmKCdtb3VzZW91dCcsIGhhbmRsZXIsIGVsZW1lbnQpOyB9XG5cbmZ1bmN0aW9uIG9mZk1vdXNlTW92ZShoYW5kbGVyLCBlbGVtZW50KSB7IHRoaXMub2ZmKCdtb3VzZW1vdmUnLCBoYW5kbGVyLCBlbGVtZW50KTsgfVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgb25Nb3VzZVVwLFxuICBvbk1vdXNlRG93bixcbiAgb25Nb3VzZU92ZXIsXG4gIG9uTW91c2VPdXQsXG4gIG9uTW91c2VNb3ZlLFxuICBvZmZNb3VzZVVwLFxuICBvZmZNb3VzZURvd24sXG4gIG9mZk1vdXNlT3ZlcixcbiAgb2ZmTW91c2VPdXQsXG4gIG9mZk1vdXNlTW92ZVxufTtcblxuZnVuY3Rpb24gZGVmYXVsdEludGVybWVkaWF0ZUhhbmRsZXIoaGFuZGxlciwgZXZlbnQsIGVsZW1lbnQpIHtcbiAgY29uc3QgeyBwYWdlWSwgcGFnZVgsIGJ1dHRvbiB9ID0gZXZlbnQsXG5cdFx0XHRcdG1vdXNlVG9wID0gcGFnZVksICAvLy9cbiAgICAgICAgbW91c2VMZWZ0ID0gcGFnZVgsIC8vL1xuICAgICAgICBtb3VzZUJ1dHRvbiA9IGJ1dHRvbjsgLy8vXG4gIFxuICBoYW5kbGVyLmNhbGwoZWxlbWVudCwgbW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24sIGV2ZW50KTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gb25SZXNpemUoaGFuZGxlciwgZWxlbWVudCwgaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVSZXNpemVIYW5kbGVyKSB7XG4gIGNvbnN0IHJlc2l6ZUV2ZW50TGlzdGVuZXJzID0gZmluZFJlc2l6ZUV2ZW50TGlzdGVuZXJzKGVsZW1lbnQpO1xuXG4gIGlmIChyZXNpemVFdmVudExpc3RlbmVycy5sZW5ndGggPT09IDApIHtcbiAgICBhZGRSZXNpemVPYmplY3QoZWxlbWVudCk7XG4gIH1cblxuICBjb25zdCBldmVudFR5cGUgPSAncmVzaXplJztcblxuICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyLCBlbGVtZW50LCBpbnRlcm1lZGlhdGVIYW5kbGVyKTtcbn1cblxuZnVuY3Rpb24gb2ZmUmVzaXplKGhhbmRsZXIsIGVsZW1lbnQpIHtcbiAgY29uc3QgZXZlbnRUeXBlID0gJ3Jlc2l6ZSc7XG5cbiAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgaGFuZGxlciwgZWxlbWVudCk7XG5cbiAgY29uc3QgcmVzaXplRXZlbnRMaXN0ZW5lcnMgPSBmaW5kUmVzaXplRXZlbnRMaXN0ZW5lcnMoZWxlbWVudCk7XG4gIFxuICBpZiAocmVzaXplRXZlbnRMaXN0ZW5lcnMubGVuZ3RoID09PSAwKSB7XG4gICAgcmVtb3ZlUmVzaXplT2JqZWN0KGVsZW1lbnQpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBvblJlc2l6ZSxcbiAgb2ZmUmVzaXplXG59O1xuXG5mdW5jdGlvbiBhZGRSZXNpemVPYmplY3QoZWxlbWVudCkge1xuICBjb25zdCByZXNpemVPYmplY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvYmplY3QnKSxcbiAgICAgICAgZG9tRWxlbWVudCA9IGVsZW1lbnQuZ2V0RE9NRWxlbWVudCgpLFxuICAgICAgICBzdHlsZSA9IGBkaXNwbGF5OiBibG9jazsgXG4gICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsgXG4gICAgICAgICAgICAgICAgIHRvcDogMDsgXG4gICAgICAgICAgICAgICAgIGxlZnQ6IDA7IFxuICAgICAgICAgICAgICAgICBoZWlnaHQ6IDEwMCU7IFxuICAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTsgXG4gICAgICAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47IFxuICAgICAgICAgICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTsgXG4gICAgICAgICAgICAgICAgIHotaW5kZXg6IC0xO2AsXG4gICAgICAgIGRhdGEgPSAnYWJvdXQ6YmxhbmsnLFxuICAgICAgICB0eXBlID0gJ3RleHQvaHRtbCc7XG5cbiAgcmVzaXplT2JqZWN0LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBzdHlsZSk7XG4gIHJlc2l6ZU9iamVjdC5kYXRhID0gZGF0YTtcbiAgcmVzaXplT2JqZWN0LnR5cGUgPSB0eXBlO1xuXG4gIGVsZW1lbnQuX19yZXNpemVPYmplY3RfXyA9IHJlc2l6ZU9iamVjdDtcblxuICByZXNpemVPYmplY3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgcmVzaXplT2JqZWN0TG9hZEhhbmRsZXIoZWxlbWVudClcbiAgfTtcblxuICBkb21FbGVtZW50LmFwcGVuZENoaWxkKHJlc2l6ZU9iamVjdCk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVJlc2l6ZU9iamVjdChlbGVtZW50KSB7XG4gIGNvbnN0IGRvbUVsZW1lbnQgPSBlbGVtZW50LmdldERPTUVsZW1lbnQoKSxcbiAgICAgICAgcmVzaXplT2JqZWN0ID0gZWxlbWVudC5fX3Jlc2l6ZU9iamVjdF9fLFxuICAgICAgICBvYmplY3RXaW5kb3cgPSByZXNpemVPYmplY3QuY29udGVudERvY3VtZW50LmRlZmF1bHRWaWV3OyAgLy8vXG5cbiAgb2JqZWN0V2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZUV2ZW50TGlzdGVuZXIpO1xuXG4gIGRvbUVsZW1lbnQucmVtb3ZlQ2hpbGQocmVzaXplT2JqZWN0KTtcbn1cblxuZnVuY3Rpb24gcmVzaXplT2JqZWN0TG9hZEhhbmRsZXIoZWxlbWVudCkge1xuICBjb25zdCByZXNpemVPYmplY3QgPSBlbGVtZW50Ll9fcmVzaXplT2JqZWN0X18sXG4gICAgICAgIHJlc2l6ZU9iamVjdFdpbmRvdyA9IHJlc2l6ZU9iamVjdC5jb250ZW50RG9jdW1lbnQuZGVmYXVsdFZpZXc7ICAvLy9cblxuICByZXNpemVPYmplY3RXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBjb25zdCByZXNpemVFdmVudExpc3RlbmVycyA9IGZpbmRSZXNpemVFdmVudExpc3RlbmVycyhlbGVtZW50KTtcblxuICAgIHJlc2l6ZUV2ZW50TGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24ocmVzaXplRXZlbnRMaXN0ZW5lcil7XG4gICAgICByZXNpemVFdmVudExpc3RlbmVyKGV2ZW50KTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGZpbmRSZXNpemVFdmVudExpc3RlbmVycyhlbGVtZW50KSB7XG4gIGNvbnN0IHJlc2l6ZUV2ZW50TGlzdGVuZXJzID0gW107XG4gIFxuICBpZiAoZWxlbWVudC5oYXNPd25Qcm9wZXJ0eSgnZXZlbnRMaXN0ZW5lcnMnKSkge1xuICAgIGNvbnN0IGV2ZW50TGlzdGVuZXJzID0gZWxlbWVudC5ldmVudExpc3RlbmVyczsgIC8vL1xuXG4gICAgZXZlbnRMaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbihldmVudExpc3RlbmVyKSB7XG4gICAgICBpZiAoZXZlbnRMaXN0ZW5lci5ldmVudFR5cGUgPT09ICdyZXNpemUnKSB7XG4gICAgICAgIGNvbnN0IHJlc2l6ZUV2ZW50TGlzdGVuZXIgPSBldmVudExpc3RlbmVyO1xuXG4gICAgICAgIHJlc2l6ZUV2ZW50TGlzdGVuZXJzLnB1c2gocmVzaXplRXZlbnRMaXN0ZW5lcik7XG4gICAgICB9ICAgICAgXG4gICAgfSk7XG4gIH0gIFxuICBcbiAgcmV0dXJuIHJlc2l6ZUV2ZW50TGlzdGVuZXJzO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0SW50ZXJtZWRpYXRlUmVzaXplSGFuZGxlcihoYW5kbGVyLCBldmVudCwgZWxlbWVudCkge1xuICBjb25zdCB3aW5kb3cgPSBlbGVtZW50LCAvLy9cbiAgICAgICAgd2lkdGggPSB3aW5kb3cuZ2V0V2lkdGgoKSxcbiAgICAgICAgaGVpZ2h0ID0gd2luZG93LmdldEhlaWdodCgpO1xuXG4gIGhhbmRsZXIuY2FsbChlbGVtZW50LCB3aWR0aCwgaGVpZ2h0LCBldmVudCk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG9uU2Nyb2xsKGhhbmRsZXIsIGVsZW1lbnQsIGludGVybWVkaWF0ZUhhbmRsZXIgPSBkZWZhdWx0SW50ZXJtZWRpYXRlSGFuZGxlcikge1xuICB0aGlzLm9uKCdzY3JvbGwnLCBoYW5kbGVyLCBlbGVtZW50LCBpbnRlcm1lZGlhdGVIYW5kbGVyKTtcbn1cblxuZnVuY3Rpb24gb2ZmU2Nyb2xsKGhhbmRsZXIsIGVsZW1lbnQpIHsgdGhpcy5vZmYoJ3Njcm9sbCcsIGhhbmRsZXIsIGVsZW1lbnQpOyB9XG5cbmZ1bmN0aW9uIGdldFNjcm9sbFRvcCgpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5zY3JvbGxUb3A7IH1cblxuZnVuY3Rpb24gZ2V0U2Nyb2xsTGVmdCgpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5zY3JvbGxMZWZ0OyB9XG5cbmZ1bmN0aW9uIHNldFNjcm9sbFRvcChzY3JvbGxUb3ApIHsgdGhpcy5kb21FbGVtZW50LnNjcm9sbFRvcCA9IHNjcm9sbFRvcDsgfVxuXG5mdW5jdGlvbiBzZXRTY3JvbGxMZWZ0KHNjcm9sbExlZnQpIHsgdGhpcy5kb21FbGVtZW50LnNjcm9sbExlZnQgPSBzY3JvbGxMZWZ0OyB9XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBvblNjcm9sbCxcbiAgb2ZmU2Nyb2xsLFxuICBnZXRTY3JvbGxUb3AsXG4gIGdldFNjcm9sbExlZnQsXG4gIHNldFNjcm9sbFRvcCxcbiAgc2V0U2Nyb2xsTGVmdFxufTtcblxuZnVuY3Rpb24gZGVmYXVsdEludGVybWVkaWF0ZUhhbmRsZXIoaGFuZGxlciwgZXZlbnQsIGVsZW1lbnQpIHtcbiAgY29uc3Qgc2Nyb2xsVG9wID0gZWxlbWVudC5nZXRTY3JvbGxUb3AoKSxcbiAgICAgICAgc2Nyb2xsTGVmdCA9IGVsZW1lbnQuZ2V0U2Nyb2xsTGVmdCgpO1xuICBcbiAgaGFuZGxlci5jYWxsKGVsZW1lbnQsIHNjcm9sbFRvcCwgc2Nyb2xsTGVmdCwgZXZlbnQpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnLi9lbGVtZW50JyksXG4gICAgICBUZXh0RWxlbWVudCA9IHJlcXVpcmUoJy4vdGV4dEVsZW1lbnQnKTtcblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudChmaXJzdEFyZ3VtZW50LCBwcm9wZXJ0aWVzLCAuLi5jaGlsZEFyZ3VtZW50cykge1xuICBsZXQgZWxlbWVudCA9IG51bGw7XG5cbiAgaWYgKGZpcnN0QXJndW1lbnQgIT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IGNoaWxkRWxlbWVudHMgPSBjaGlsZEVsZW1lbnRzRnJvbUNoaWxkQXJndW1lbnRzKGNoaWxkQXJndW1lbnRzKTtcblxuICAgIHByb3BlcnRpZXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGNoaWxkRWxlbWVudHNcbiAgICB9LCBwcm9wZXJ0aWVzKTtcblxuICAgIGlmIChmYWxzZSkge1xuXG4gICAgfSBlbHNlIGlmIChpc1N1YmNsYXNzT2YoZmlyc3RBcmd1bWVudCwgRWxlbWVudCkpIHtcbiAgICAgIGNvbnN0IENsYXNzID0gZmlyc3RBcmd1bWVudDsgIC8vL1xuXG4gICAgICBlbGVtZW50ID0gQ2xhc3MuZnJvbVByb3BlcnRpZXMocHJvcGVydGllcyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZmlyc3RBcmd1bWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IHN0cmluZyA9IGZpcnN0QXJndW1lbnQ7IC8vL1xuXG4gICAgICBlbGVtZW50ID0gRWxlbWVudC5mcm9tU3RyaW5nKHN0cmluZywgcHJvcGVydGllcyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZmlyc3RBcmd1bWVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc3QgZWxlbWVudEZ1bmN0aW9uID0gZmlyc3RBcmd1bWVudDsgIC8vL1xuXG4gICAgICBlbGVtZW50ID0gZWxlbWVudEZ1bmN0aW9uKHByb3BlcnRpZXMpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5jb25zdCBSZWFjdCA9IHtcbiAgY3JlYXRlRWxlbWVudDogY3JlYXRlRWxlbWVudFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdDtcblxuZnVuY3Rpb24gY2hpbGRFbGVtZW50c0Zyb21DaGlsZEFyZ3VtZW50cyhjaGlsZEFyZ3VtZW50cykge1xuICBjaGlsZEFyZ3VtZW50cyA9IGNoaWxkQXJndW1lbnRzLnJlZHVjZShmdW5jdGlvbihjaGlsZEFyZ3VtZW50cywgY2hpbGRBcmd1bWVudCkge1xuICAgIGNoaWxkQXJndW1lbnRzID0gY2hpbGRBcmd1bWVudHMuY29uY2F0KGNoaWxkQXJndW1lbnQpO1xuXG4gICAgcmV0dXJuIGNoaWxkQXJndW1lbnRzO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgY2hpbGRFbGVtZW50cyA9IGNoaWxkQXJndW1lbnRzLm1hcChmdW5jdGlvbihjaGlsZEFyZ3VtZW50KSB7XG4gICAgbGV0IGNoaWxkRWxlbWVudDtcbiAgICBcbiAgICBpZiAodHlwZW9mIGNoaWxkQXJndW1lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCB0ZXh0ID0gY2hpbGRBcmd1bWVudCwgLy8vXG4gICAgICAgICAgICB0ZXh0RWxlbWVudCA9IG5ldyBUZXh0RWxlbWVudCh0ZXh0KTtcblxuICAgICAgY2hpbGRFbGVtZW50ID0gdGV4dEVsZW1lbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoaWxkRWxlbWVudCA9IGNoaWxkQXJndW1lbnQ7ICAvLy9cbiAgICB9XG5cbiAgICByZXR1cm4gY2hpbGRFbGVtZW50O1xuICB9KTtcblxuICByZXR1cm4gY2hpbGRFbGVtZW50cztcbn1cblxuZnVuY3Rpb24gaXNTdWJjbGFzc09mKGFyZ3VtZW50LCBDbGFzcykge1xuICBsZXQgdHlwZU9mID0gZmFsc2U7XG5cbiAgaWYgKGFyZ3VtZW50Lm5hbWUgPT09IENsYXNzLm5hbWUpIHsgLy8vXG4gICAgdHlwZU9mID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBhcmd1bWVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihhcmd1bWVudCk7IC8vL1xuXG4gICAgaWYgKGFyZ3VtZW50KSB7XG4gICAgICB0eXBlT2YgPSBpc1N1YmNsYXNzT2YoYXJndW1lbnQsIENsYXNzKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHlwZU9mO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBPZmZzZXQgPSByZXF1aXJlKCcuL21pc2NlbGxhbmVvdXMvb2Zmc2V0JyksXG4gICAgICBCb3VuZHMgPSByZXF1aXJlKCcuL21pc2NlbGxhbmVvdXMvYm91bmRzJyk7XG5cbmNsYXNzIFRleHRFbGVtZW50IHtcbiAgY29uc3RydWN0b3IodGV4dCkge1xuICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpOyAvLy9cblxuICAgIHRoaXMuZG9tRWxlbWVudC5fX2VsZW1lbnRfXyA9IHRoaXM7XG4gIH1cblxuICBjbG9uZSgpIHsgcmV0dXJuIFRleHRFbGVtZW50LmNsb25lKHRoaXMpOyB9XG5cbiAgZ2V0VGV4dCgpIHtcbiAgICBjb25zdCBub2RlVmFsdWUgPSB0aGlzLmRvbUVsZW1lbnQubm9kZVZhbHVlLFxuICAgICAgICAgIHRleHQgPSBub2RlVmFsdWU7IC8vL1xuXG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cblxuICBzZXRUZXh0KHRleHQpIHtcbiAgICBjb25zdCBub2RlVmFsdWUgPSB0ZXh0OyAvLy9cblxuICAgIHRoaXMuZG9tRWxlbWVudC5ub2RlVmFsdWUgPSBub2RlVmFsdWU7XG4gIH1cblxuICBnZXRPZmZzZXQoKSB7XG4gICAgY29uc3QgdG9wID0gdGhpcy5kb21FbGVtZW50Lm9mZnNldFRvcCwgIC8vL1xuICAgICAgICAgIGxlZnQgPSB0aGlzLmRvbUVsZW1lbnQub2Zmc2V0TGVmdCwgIC8vL1xuICAgICAgICAgIG9mZnNldCA9IG5ldyBPZmZzZXQodG9wLCBsZWZ0KTtcblxuICAgIHJldHVybiBvZmZzZXQ7XG4gIH1cblxuICBnZXRCb3VuZHMoKSB7XG4gICAgY29uc3QgYm91bmRpbmdDbGllbnRSZWN0ID0gdGhpcy5kb21FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICAgIGJvdW5kcyA9IEJvdW5kcy5mcm9tQm91bmRpbmdDbGllbnRSZWN0KGJvdW5kaW5nQ2xpZW50UmVjdCk7XG5cbiAgICByZXR1cm4gYm91bmRzO1xuICB9XG5cbiAgZ2V0V2lkdGgoKSB7XG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLmRvbUVsZW1lbnQuY2xpZW50V2lkdGg7XG5cbiAgICByZXR1cm4gd2lkdGg7XG4gIH1cblxuICBnZXRIZWlnaHQoKSB7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5kb21FbGVtZW50LmNsaWVudEhlaWdodDtcblxuICAgIHJldHVybiBoZWlnaHQ7XG4gIH1cblxuICBwcmVwZW5kVG8ocGFyZW50RWxlbWVudCkgeyBwYXJlbnRFbGVtZW50LnByZXBlbmQodGhpcyk7IH1cblxuICBhcHBlbmRUbyhwYXJlbnRFbGVtZW50KSB7IHBhcmVudEVsZW1lbnQuYXBwZW5kKHRoaXMpOyB9XG5cbiAgYWRkVG8ocGFyZW50RWxlbWVudCkgeyBwYXJlbnRFbGVtZW50LmFkZCh0aGlzKTsgfVxuXG4gIHJlbW92ZUZyb20ocGFyZW50RWxlbWVudCkgeyBwYXJlbnRFbGVtZW50LnJlbW92ZSh0aGlzKTsgfVxuXG4gIGluc2VydEJlZm9yZShzaWJsaW5nRWxlbWVudCkge1xuICAgIGNvbnN0IHBhcmVudERPTU5vZGUgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50LnBhcmVudE5vZGUsXG4gICAgICAgICAgc2libGluZ0RPTUVsZW1lbnQgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50O1xuXG4gICAgcGFyZW50RE9NTm9kZS5pbnNlcnRCZWZvcmUodGhpcy5kb21FbGVtZW50LCBzaWJsaW5nRE9NRWxlbWVudCk7XG4gIH1cblxuICBpbnNlcnRBZnRlcihzaWJsaW5nRWxlbWVudCkge1xuICAgIGNvbnN0IHBhcmVudERPTU5vZGUgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50LnBhcmVudE5vZGUsXG4gICAgICAgICAgc2libGluZ0RPTUVsZW1lbnQgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50O1xuXG4gICAgcGFyZW50RE9NTm9kZS5pbnNlcnRCZWZvcmUodGhpcy5kb21FbGVtZW50LCBzaWJsaW5nRE9NRWxlbWVudC5uZXh0U2libGluZyk7ICAvLy9cbiAgfVxuXG4gIHJlbW92ZSgpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlKCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUZXh0RWxlbWVudDtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gZmlyc3QoYXJyYXkpIHsgcmV0dXJuIGFycmF5WzBdOyB9XG5cbmZ1bmN0aW9uIHNwbGljZShhcnJheTEsIHN0YXJ0LCBkZWxldGVDb3VudCA9IEluZmluaXR5LCBhcnJheTIgPSBbXSkge1xuICBjb25zdCBhcmdzID0gW3N0YXJ0LCBkZWxldGVDb3VudCwgLi4uYXJyYXkyXSxcbiAgICAgICBkZWxldGVkSXRlbXNBcnJheSA9IEFycmF5LnByb3RvdHlwZS5zcGxpY2UuYXBwbHkoYXJyYXkxLCBhcmdzKTtcblxuICByZXR1cm4gZGVsZXRlZEl0ZW1zQXJyYXk7XG59XG5cbmZ1bmN0aW9uIGF1Z21lbnQoYXJyYXkxLCBhcnJheTIsIHRlc3QpIHtcbiAgYXJyYXkyLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgpIHtcbiAgICBjb25zdCBwYXNzZWQgPSB0ZXN0KGVsZW1lbnQsIGluZGV4KTtcblxuICAgIGlmIChwYXNzZWQpIHtcbiAgICAgIGFycmF5MS5wdXNoKGVsZW1lbnQpO1xuICAgIH1cbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBmaXJzdCxcbiAgc3BsaWNlLFxuICBhdWdtZW50XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBhcnJheVV0aWxpdGllcyA9IHJlcXVpcmUoJy4uL3V0aWxpdGllcy9hcnJheScpO1xuXG5jb25zdCB7IHNwbGljZSB9ID0gYXJyYXlVdGlsaXRpZXM7XG5cbmZ1bmN0aW9uIGRvbUVsZW1lbnRGcm9tU2VsZWN0b3Ioc2VsZWN0b3IpIHtcbiAgY29uc3QgZG9tRWxlbWVudCA9ICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSA/XG4gICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpWzBdIDogIC8vL1xuICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOyAgLy8vXG5cbiAgcmV0dXJuIGRvbUVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGVsZW1lbnRzRnJvbURPTUVsZW1lbnRzKGRvbUVsZW1lbnRzKSB7XG4gIGNvbnN0IGRvbUVsZW1lbnRzV2l0aEVsZW1lbnRzID0gZmlsdGVyRE9NTm9kZXMoZG9tRWxlbWVudHMsIGZ1bmN0aW9uKGRvbUVsZW1lbnQpIHtcbiAgICAgICAgICByZXR1cm4gKGRvbUVsZW1lbnQuX19lbGVtZW50X18gIT09IHVuZGVmaW5lZCk7XG4gICAgICAgIH0pLFxuICAgICAgICBlbGVtZW50cyA9IGRvbUVsZW1lbnRzV2l0aEVsZW1lbnRzLm1hcChmdW5jdGlvbihkb21FbGVtZW50KSB7XG4gICAgICAgICAgcmV0dXJuIGRvbUVsZW1lbnQuX19lbGVtZW50X187XG4gICAgICAgIH0pO1xuXG4gIHJldHVybiBlbGVtZW50cztcbn1cblxuZnVuY3Rpb24gZGVzY2VuZGFudERPTU5vZGVzRnJvbURPTU5vZGUoZG9tTm9kZSwgZGVzY2VuZGFudERPTU5vZGVzID0gW10pIHtcbiAgY29uc3Qgc3RhcnQgPSAtMSxcbiAgICAgICAgZGVsZXRlQ291bnQgPSAwLFxuICAgICAgICBjaGlsZERPTU5vZGVzID0gZG9tTm9kZS5jaGlsZE5vZGVzOyAgLy8vXG5cbiAgc3BsaWNlKGRlc2NlbmRhbnRET01Ob2Rlcywgc3RhcnQsIGRlbGV0ZUNvdW50LCBjaGlsZERPTU5vZGVzKTtcblxuICBjaGlsZERPTU5vZGVzLmZvckVhY2goZnVuY3Rpb24oY2hpbGRET01Ob2RlKSB7XG4gICAgZGVzY2VuZGFudERPTU5vZGVzRnJvbURPTU5vZGUoY2hpbGRET01Ob2RlLCBkZXNjZW5kYW50RE9NTm9kZXMpO1xuICB9KTtcblxuICByZXR1cm4gZGVzY2VuZGFudERPTU5vZGVzO1xufVxuXG5mdW5jdGlvbiBmaWx0ZXJET01Ob2Rlc0J5U2VsZWN0b3IoZG9tTm9kZXMsIHNlbGVjdG9yKSB7XG4gIGNvbnN0IGZpbHRlcmVkRE9NTm9kZXMgPSBmaWx0ZXJET01Ob2Rlcyhkb21Ob2RlcywgZnVuY3Rpb24oZG9tTm9kZSkge1xuICAgIHJldHVybiBkb21Ob2RlTWF0Y2hlc1NlbGVjdG9yKGRvbU5vZGUsIHNlbGVjdG9yKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGZpbHRlcmVkRE9NTm9kZXM7XG59XG5cbmZ1bmN0aW9uIGRvbU5vZGVNYXRjaGVzU2VsZWN0b3IoZG9tTm9kZSwgc2VsZWN0b3IpIHtcbiAgY29uc3QgZG9tTm9kZVR5cGUgPSBkb21Ob2RlLm5vZGVUeXBlO1xuXG4gIHN3aXRjaCAoZG9tTm9kZVR5cGUpIHtcbiAgICBjYXNlIE5vZGUuRUxFTUVOVF9OT0RFIDoge1xuICAgICAgY29uc3QgZG9tRWxlbWVudCA9IGRvbU5vZGU7IC8vL1xuXG4gICAgICByZXR1cm4gZG9tRWxlbWVudC5tYXRjaGVzKHNlbGVjdG9yKTtcbiAgICB9XG5cbiAgICBjYXNlIE5vZGUuVEVYVF9OT0RFIDoge1xuICAgICAgaWYgKHNlbGVjdG9yID09PSAnKicpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBmaWx0ZXJET01Ob2Rlcyhkb21Ob2RlcywgdGVzdCkge1xuICBjb25zdCBmaWx0ZXJlZERPTU5vZGVzID0gW10sXG4gICAgICAgIGRvbU5vZGVzTGVuZ3RoID0gZG9tTm9kZXMubGVuZ3RoO1xuXG4gIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBkb21Ob2Rlc0xlbmd0aDsgaW5kZXgrKykge1xuICAgIGNvbnN0IGRvbU5vZGUgPSBkb21Ob2Rlc1tpbmRleF0sXG4gICAgICAgICAgcmVzdWx0ID0gdGVzdChkb21Ob2RlKTtcblxuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIGZpbHRlcmVkRE9NTm9kZXMucHVzaChkb21Ob2RlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmlsdGVyZWRET01Ob2Rlcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGRvbUVsZW1lbnRGcm9tU2VsZWN0b3IsXG4gIGVsZW1lbnRzRnJvbURPTUVsZW1lbnRzLFxuICBkZXNjZW5kYW50RE9NTm9kZXNGcm9tRE9NTm9kZSxcbiAgZmlsdGVyRE9NTm9kZXNCeVNlbGVjdG9yLFxuICBkb21Ob2RlTWF0Y2hlc1NlbGVjdG9yLFxuICBmaWx0ZXJET01Ob2Rlc1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gY29tYmluZSh0YXJnZXRPYmplY3QsIHNvdXJjZU9iamVjdCA9IHt9KSB7XG4gIGNvbnN0IHNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2VPYmplY3QpO1xuXG4gIHNvdXJjZUtleXMuZm9yRWFjaChmdW5jdGlvbihzb3VyY2VLZXkpIHtcbiAgICBjb25zdCB0YXJnZXRQcm9wZXJ0eSA9IHRhcmdldE9iamVjdFtzb3VyY2VLZXldLFxuICAgICAgICAgIHNvdXJjZVByb3BlcnR5ID0gc291cmNlT2JqZWN0W3NvdXJjZUtleV07XG5cbiAgICB0YXJnZXRPYmplY3Rbc291cmNlS2V5XSA9IHRhcmdldE9iamVjdC5oYXNPd25Qcm9wZXJ0eShzb3VyY2VLZXkpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgJHt0YXJnZXRQcm9wZXJ0eX0gJHtzb3VyY2VQcm9wZXJ0eX1gIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VQcm9wZXJ0eTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHBydW5lKHRhcmdldE9iamVjdCwgc291cmNlS2V5cykge1xuICBzb3VyY2VLZXlzLmZvckVhY2goZnVuY3Rpb24oc291cmNlS2V5KSB7XG4gICAgaWYgKHRhcmdldE9iamVjdC5oYXNPd25Qcm9wZXJ0eShzb3VyY2VLZXkpKSB7XG4gICAgICBkZWxldGUgdGFyZ2V0T2JqZWN0W3NvdXJjZUtleV07XG4gICAgfVxuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNvbWJpbmUsXG4gIHBydW5lXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBrZXlNaXhpbnMgPSByZXF1aXJlKCcuL21peGlucy9rZXknKSxcbiAgICAgIGV2ZW50TWl4aW5zID0gcmVxdWlyZSgnLi9taXhpbnMvZXZlbnQnKSxcbiAgICAgIGNsaWNrTWl4aW5zID0gcmVxdWlyZSgnLi9taXhpbnMvY2xpY2snKSxcbiAgICAgIG1vdXNlTWl4aW5zID0gcmVxdWlyZSgnLi9taXhpbnMvbW91c2UnKTtcblxuY2xhc3MgV2luZG93IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5kb21FbGVtZW50ID0gd2luZG93OyAvLy9cbiAgfVxuXG4gIGFzc2lnbiguLi5zb3VyY2VzKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5kb21FbGVtZW50OyAvLy9cblxuICAgIE9iamVjdC5hc3NpZ24odGFyZ2V0LCAuLi5zb3VyY2VzKTtcbiAgfVxuICBcbiAgZ2V0V2lkdGgoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuaW5uZXJXaWR0aDsgfSAvLy9cbiAgXG4gIGdldEhlaWdodCgpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5pbm5lckhlaWdodDsgfSAvLy9cblxuICBnZXRTY3JvbGxUb3AoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQucGFnZVlPZmZzZXQ7IH0gIC8vL1xuXG4gIGdldFNjcm9sbExlZnQoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQucGFnZVhPZmZzZXQ7IH0gLy8vXG5cbiAgb25SZXNpemUoaGFuZGxlciwgb2JqZWN0LCBpbnRlcm1lZGlhdGVIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZVJlc2l6ZUhhbmRsZXIpIHtcbiAgICBjb25zdCBldmVudFR5cGVzID0gJ3Jlc2l6ZSc7XG4gICAgXG4gICAgdGhpcy5vbihldmVudFR5cGVzLCBoYW5kbGVyLCBvYmplY3QsIGludGVybWVkaWF0ZUhhbmRsZXIpO1xuICB9XG5cbiAgb2ZmUmVzaXplKGhhbmRsZXIsIG9iamVjdCkge1xuICAgIGNvbnN0IGV2ZW50VHlwZXMgPSAncmVzaXplJztcblxuICAgIHRoaXMub2ZmKGV2ZW50VHlwZXMsIGhhbmRsZXIsIG9iamVjdCk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihXaW5kb3cucHJvdG90eXBlLCBrZXlNaXhpbnMpO1xuT2JqZWN0LmFzc2lnbihXaW5kb3cucHJvdG90eXBlLCBldmVudE1peGlucyk7XG5PYmplY3QuYXNzaWduKFdpbmRvdy5wcm90b3R5cGUsIGNsaWNrTWl4aW5zKTtcbk9iamVjdC5hc3NpZ24oV2luZG93LnByb3RvdHlwZSwgbW91c2VNaXhpbnMpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBXaW5kb3coKTsgIC8vL1xuXG5mdW5jdGlvbiBkZWZhdWx0SW50ZXJtZWRpYXRlUmVzaXplSGFuZGxlcihoYW5kbGVyLCBldmVudCwgZWxlbWVudCkge1xuICBjb25zdCB3aW5kb3cgPSBlbGVtZW50LCAvLy9cbiAgICAgICAgd2lkdGggPSB3aW5kb3cuZ2V0V2lkdGgoKSxcbiAgICAgICAgaGVpZ2h0ID0gd2luZG93LmdldEhlaWdodCgpO1xuICBcbiAgaGFuZGxlci5jYWxsKHdpbmRvdywgd2lkdGgsIGhlaWdodCwgZXZlbnQpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5yZXF1aXJlKCcuL2xpYi9qdXh0YXBvc2UnKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKTtcblxuY29uc3QgeyBSZWFjdCB9ID0gZWFzeTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdywgJ1JlYWN0Jywge1xuICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBSZWFjdDtcbiAgfVxufSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGNvbnN0IFRSQUNFID0gXCJUUkFDRVwiO1xuZXhwb3J0IGNvbnN0IERFQlVHID0gXCJERUJVR1wiO1xuZXhwb3J0IGNvbnN0IElORk8gPSBcIklORk9cIjtcbmV4cG9ydCBjb25zdCBXQVJOSU5HID0gXCJXQVJOSU5HXCI7XG5leHBvcnQgY29uc3QgRVJST1IgPSBcIkVSUk9SXCI7XG5leHBvcnQgY29uc3QgRkFUQUwgPSBcIkZBVEFMXCI7XG5leHBvcnQgY29uc3QgREVGQVVMVF9MT0dfTEVWRUwgPSBXQVJOSU5HO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfTE9HX0RJUkVDVE9SWV9QQVRIID0gbnVsbDtcbmV4cG9ydCBjb25zdCBERUZBVUxUX0xPR19GSUxFX0JBU0VfTkFNRSA9IFwiZGVmYXVsdFwiO1xuXG5leHBvcnQgY29uc3QgR0VUX01FVEhPRCA9IFwiR0VUXCI7XG5leHBvcnQgY29uc3QgUE9TVF9NRVRIT0QgPSBcIlBPU1RcIjtcbmV4cG9ydCBjb25zdCBBUFBMSUNBVElPTl9KU09OX0NIQVJTRVRfVVRGOF9DT05URU5UX1RZUEUgPSBcImFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOFwiO1xuXG5leHBvcnQgY29uc3QgREFUQV9FVkVOVCA9IFwiZGF0YVwiO1xuZXhwb3J0IGNvbnN0IFVURjhfRU5DT0RJTkcgPSBcInV0ZjhcIjtcblxuZXhwb3J0IGNvbnN0IENUUkxfQyA9IFwiXkNcIjtcbmV4cG9ydCBjb25zdCBFVFhfQ0hBUkFDVEVSID0gXCJcXHUwMDAzXCI7XG5leHBvcnQgY29uc3QgQkFDS1NQQUNFX0NIQVJBQ1RFUiA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMTI3KTtcbmV4cG9ydCBjb25zdCBMSU5FX0ZFRURfQ0hBUkFDVEVSID0gXCJcXG5cIjtcbmV4cG9ydCBjb25zdCBDQVJSSUFHRV9SRVRVUk5fQ0hBUkFDVEVSID0gXCJcXHJcIjtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfUkNfQkFTRV9FWFRFTlNJT04gPSBcIlwiOyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgeyBkZWZhdWx0IGFzIHBhdGhVdGlsaXRpZXMgfSBmcm9tIFwiLi91dGlsaXRpZXMvcGF0aFwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBhcnJheVV0aWxpdGllcyB9IGZyb20gXCIuL3V0aWxpdGllcy9hcnJheVwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB0ZW1wbGF0ZVV0aWxpdGllcyB9IGZyb20gXCIuL3V0aWxpdGllcy90ZW1wbGF0ZVwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBmaWxlU3lzdGVtVXRpbGl0aWVzIH0gZnJvbSBcIi4vdXRpbGl0aWVzL2ZpbGVTeXN0ZW1cIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgYXN5bmNocm9ub3VzVXRpbGl0aWVzIH0gZnJvbSBcIi4vdXRpbGl0aWVzL2FzeW5jaHJvbm91c1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBtaXNjZWxsYW5lb3VzVXRpbGl0aWVzIH0gZnJvbSBcIi4vdXRpbGl0aWVzL21pc2NlbGxhbmVvdXNcIjtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gZmlyc3QoYXJyYXkpIHsgcmV0dXJuIGFycmF5WzBdO31cblxuZXhwb3J0IGZ1bmN0aW9uIHNlY29uZChhcnJheSkgeyByZXR1cm4gYXJyYXlbMV07IH1cblxuZXhwb3J0IGZ1bmN0aW9uIHRoaXJkKGFycmF5KSB7IHJldHVybiBhcnJheVsyXTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gZm91cnRoKGFycmF5KSB7IHJldHVybiBhcnJheVszXTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gZmlmdGgoYXJyYXkpIHsgcmV0dXJuIGFycmF5WzRdOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWZ0aExhc3QoYXJyYXkpIHsgcmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDVdOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3VydGhMYXN0KGFycmF5KSB7IHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSA0XTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gdGhpcmRMYXN0KGFycmF5KSB7IHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAzXTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gc2Vjb25kTGFzdChhcnJheSkgeyByZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMl07IH1cblxuZXhwb3J0IGZ1bmN0aW9uIGxhc3QoYXJyYXkpIHsgcmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiB0YWlsKGFycmF5KSB7IHJldHVybiBhcnJheS5zbGljZSgxKTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gcHVzaChhcnJheTEsIGFycmF5MikgeyBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShhcnJheTEsIGFycmF5Mik7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuc2hpZnQoYXJyYXkxLCBhcnJheTIpIHsgQXJyYXkucHJvdG90eXBlLnVuc2hpZnQuYXBwbHkoYXJyYXkxLCBhcnJheTIpOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25jYXQoYXJyYXkxLCBlbGVtZW50T3JBcnJheTIpIHtcbiAgY29uc3QgYXJyYXkyID0gKGVsZW1lbnRPckFycmF5MiBpbnN0YW5jZW9mIEFycmF5KSA/XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRPckFycmF5MiA6XG4gICAgICAgICAgICAgICAgICAgICBbZWxlbWVudE9yQXJyYXkyXTtcbiAgXG4gIHB1c2goYXJyYXkxLCBhcnJheTIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXIoYXJyYXkpIHtcbiAgY29uc3Qgc3RhcnQgPSAwO1xuICBcbiAgcmV0dXJuIGFycmF5LnNwbGljZShzdGFydCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5KGFycmF5MSwgYXJyYXkyKSB7XG4gIGNvbnN0IHN0YXJ0ID0gMCxcbiAgICAgICAgZGVsZXRlQ291bnQgPSBhcnJheTIubGVuZ3RoOyAgLy8vXG4gIFxuICBzcGxpY2UoYXJyYXkxLCBzdGFydCwgZGVsZXRlQ291bnQsIGFycmF5Mik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZShhcnJheTEsIGFycmF5MikgeyBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShhcnJheTEsIGFycmF5Mik7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIHNwbGljZShhcnJheTEsIHN0YXJ0LCBkZWxldGVDb3VudCA9IEluZmluaXR5LCBhcnJheTIgPSBbXSkge1xuICBjb25zdCBhcmdzID0gW3N0YXJ0LCBkZWxldGVDb3VudCwgLi4uYXJyYXkyXSxcbiAgICAgICAgZGVsZXRlZEl0ZW1zQXJyYXkgPSBBcnJheS5wcm90b3R5cGUuc3BsaWNlLmFwcGx5KGFycmF5MSwgYXJncyk7XG5cbiAgcmV0dXJuIGRlbGV0ZWRJdGVtc0FycmF5O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZShhcnJheSwgZWxlbWVudCwgdGVzdCkge1xuICBsZXQgc3RhcnQgPSAtMTtcbiAgXG4gIGNvbnN0IGZvdW5kID0gYXJyYXkuc29tZSgoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBwYXNzZWQgPSB0ZXN0KGVsZW1lbnQsIGluZGV4KTtcblxuICAgIGlmIChwYXNzZWQpIHtcbiAgICAgIHN0YXJ0ID0gaW5kZXg7ICAvLy9cbiAgICAgIFxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KTtcbiAgXG4gIGlmIChmb3VuZCkge1xuICAgIGNvbnN0IGRlbGV0ZUNvdW50ID0gMTtcblxuICAgIGFycmF5LnNwbGljZShzdGFydCwgZGVsZXRlQ291bnQsIGVsZW1lbnQpO1xuICB9XG5cbiAgcmV0dXJuIGZvdW5kO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyKGFycmF5LCB0ZXN0KSB7XG4gIGNvbnN0IGZpbHRlcmVkRWxlbWVudHMgPSBbXTtcbiAgXG4gIGJhY2t3YXJkc0ZvckVhY2goYXJyYXksIChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IHBhc3NlZCA9IHRlc3QoZWxlbWVudCwgaW5kZXgpO1xuXG4gICAgaWYgKCFwYXNzZWQpIHtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gaW5kZXgsICAvLy9cbiAgICAgICAgICAgIGRlbGV0ZUNvdW50ID0gMSxcbiAgICAgICAgICAgIGRlbGV0ZWRFbGVtZW50cyA9IGFycmF5LnNwbGljZShzdGFydCwgZGVsZXRlQ291bnQpLFxuICAgICAgICAgICAgZmlyc3REZWxldGVkRWxlbWVudCA9IGZpcnN0KGRlbGV0ZWRFbGVtZW50cyk7XG4gICAgICBcbiAgICAgIGZpbHRlcmVkRWxlbWVudHMudW5zaGlmdChmaXJzdERlbGV0ZWRFbGVtZW50KTsgIC8vL1xuICAgIH1cbiAgfSk7XG4gIFxuICByZXR1cm4gZmlsdGVyZWRFbGVtZW50cztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmQoYXJyYXksIHRlc3QpIHtcbiAgY29uc3QgZWxlbWVudHMgPSBbXTtcblxuICBmb3J3YXJkc0ZvckVhY2goYXJyYXksIChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IHBhc3NlZCA9IHRlc3QoZWxlbWVudCwgaW5kZXgpO1xuXG4gICAgaWYgKHBhc3NlZCkge1xuICAgICAgZWxlbWVudHMucHVzaChlbGVtZW50KTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBlbGVtZW50cztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBydW5lKGFycmF5LCB0ZXN0KSB7XG4gIGxldCBwcnVuZWRFbGVtZW50ID0gdW5kZWZpbmVkO1xuICBcbiAgYXJyYXkuc29tZSgoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBwYXNzZWQgPSB0ZXN0KGVsZW1lbnQsIGluZGV4KTtcblxuICAgIGlmICghcGFzc2VkKSB7XG4gICAgICBjb25zdCBzdGFydCA9IGluZGV4LCAgLy8vXG4gICAgICAgICAgICBkZWxldGVDb3VudCA9IDEsXG4gICAgICAgICAgICBkZWxldGVkRWxlbWVudHMgPSBhcnJheS5zcGxpY2Uoc3RhcnQsIGRlbGV0ZUNvdW50KSxcbiAgICAgICAgICAgIGZpcnN0RGVsZXRlZEVsZW1lbnQgPSBmaXJzdChkZWxldGVkRWxlbWVudHMpO1xuICAgICAgXG4gICAgICBwcnVuZWRFbGVtZW50ID0gZmlyc3REZWxldGVkRWxlbWVudDsgIC8vL1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuICBcbiAgcmV0dXJuIHBydW5lZEVsZW1lbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXRjaChhcnJheSwgZWxlbWVudCwgdGVzdCkge1xuICBjb25zdCBmb3VuZCA9IGFycmF5LnNvbWUoKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgcGFzc2VkID0gdGVzdChlbGVtZW50LCBpbmRleCk7XG5cbiAgICBpZiAocGFzc2VkKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuXG5cbiAgaWYgKGZvdW5kKSB7XG4gICAgYXJyYXkucHVzaChlbGVtZW50KTtcbiAgfVxuXG4gIHJldHVybiBmb3VuZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGF1Z21lbnQoYXJyYXkxLCBhcnJheTIsIHRlc3QpIHtcbiAgYXJyYXkyLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgcGFzc2VkID0gdGVzdChlbGVtZW50LCBpbmRleCk7XG5cbiAgICBpZiAocGFzc2VkKSB7XG4gICAgICBhcnJheTEucHVzaChlbGVtZW50KTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VwYXJhdGUoYXJyYXksIGFycmF5MSwgYXJyYXkyLCB0ZXN0KSB7XG4gIGFycmF5LmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgcGFzc2VkID0gdGVzdChlbGVtZW50LCBpbmRleCk7XG5cbiAgICBwYXNzZWQgP1xuICAgICAgYXJyYXkxLnB1c2goZWxlbWVudCkgOlxuICAgICAgICBhcnJheTIucHVzaChlbGVtZW50KTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3J3YXJkc1NvbWUoYXJyYXksIGNhbGxiYWNrKSB7XG4gIGNvbnN0IGFycmF5TGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhcnJheUxlbmd0aDsgaW5kZXgrKykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBhcnJheVtpbmRleF0sXG4gICAgICAgICAgcmVzdWx0ID0gY2FsbGJhY2soZWxlbWVudCwgaW5kZXgpO1xuICAgIFxuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJhY2t3YXJkc1NvbWUoYXJyYXksIGNhbGxiYWNrKSB7XG4gIGNvbnN0IGFycmF5TGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIGZvciAobGV0IGluZGV4ID0gYXJyYXlMZW5ndGggLSAxOyBpbmRleCA+PSAwOyBpbmRleC0tKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgICByZXN1bHQgPSBjYWxsYmFjayhlbGVtZW50LCBpbmRleCk7XG5cbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3J3YXJkc0V2ZXJ5KGFycmF5LCBjYWxsYmFjaykge1xuICBjb25zdCBhcnJheUxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYXJyYXlMZW5ndGg7IGluZGV4KyspIHtcbiAgICBjb25zdCBlbGVtZW50ID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICAgIHJlc3VsdCA9IGNhbGxiYWNrKGVsZW1lbnQsIGluZGV4KTtcblxuICAgIGlmICghcmVzdWx0KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiYWNrd2FyZHNFdmVyeShhcnJheSwgY2FsbGJhY2spIHtcbiAgY29uc3QgYXJyYXlMZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgZm9yIChsZXQgaW5kZXggPSBhcnJheUxlbmd0aCAtIDE7IGluZGV4ID49IDA7IGluZGV4LS0pIHtcbiAgICBjb25zdCBlbGVtZW50ID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICAgIHJlc3VsdCA9IGNhbGxiYWNrKGVsZW1lbnQsIGluZGV4KTtcblxuICAgIGlmICghcmVzdWx0KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3J3YXJkc1JlZHVjZShhcnJheSwgY2FsbGJhY2ssIGluaXRpYWxWYWx1ZSkge1xuICBsZXQgdmFsdWUgPSBpbml0aWFsVmFsdWU7XG5cbiAgZm9yd2FyZHNGb3JFYWNoKGFycmF5LCAoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICB2YWx1ZSA9IGNhbGxiYWNrKHZhbHVlLCBlbGVtZW50LCBpbmRleCk7XG4gIH0pO1xuXG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJhY2t3YXJkc1JlZHVjZShhcnJheSwgY2FsbGJhY2ssIGluaXRpYWxWYWx1ZSkge1xuICBsZXQgdmFsdWUgPSBpbml0aWFsVmFsdWU7XG5cbiAgYmFja3dhcmRzRm9yRWFjaChhcnJheSwgKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgdmFsdWUgPSBjYWxsYmFjayh2YWx1ZSwgZWxlbWVudCwgaW5kZXgpO1xuICB9KTtcblxuICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3J3YXJkc0ZvckVhY2goYXJyYXksIGNhbGxiYWNrKSB7XG4gIGNvbnN0IGFycmF5TGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhcnJheUxlbmd0aDsgaW5kZXgrKykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBhcnJheVtpbmRleF07XG5cbiAgICBjYWxsYmFjayhlbGVtZW50LCBpbmRleCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJhY2t3YXJkc0ZvckVhY2goYXJyYXksIGNhbGxiYWNrKSB7XG4gIGNvbnN0IGFycmF5TGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIGZvciAobGV0IGluZGV4ID0gYXJyYXlMZW5ndGggLSAxOyBpbmRleCA+PSAwOyBpbmRleC0tKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGFycmF5W2luZGV4XTtcblxuICAgIGNhbGxiYWNrKGVsZW1lbnQsIGluZGV4KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGZpcnN0LFxuICBzZWNvbmQsXG4gIHRoaXJkLFxuICBmb3VydGgsXG4gIGZpZnRoLFxuICBmaWZ0aExhc3QsXG4gIGZvdXJ0aExhc3QsXG4gIHRoaXJkTGFzdCxcbiAgc2Vjb25kTGFzdCxcbiAgbGFzdCxcbiAgdGFpbCxcbiAgcHVzaCxcbiAgdW5zaGlmdCxcbiAgY29uY2F0LFxuICBjbGVhcixcbiAgY29weSxcbiAgbWVyZ2UsXG4gIHNwbGljZSxcbiAgcmVwbGFjZSxcbiAgZmlsdGVyLFxuICBmaW5kLFxuICBwcnVuZSxcbiAgcGF0Y2gsXG4gIGF1Z21lbnQsXG4gIHNlcGFyYXRlLFxuICBmb3J3YXJkc1NvbWUsXG4gIGJhY2t3YXJkc1NvbWUsXG4gIGZvcndhcmRzRXZlcnksXG4gIGJhY2t3YXJkc0V2ZXJ5LFxuICBmb3J3YXJkc1JlZHVjZSxcbiAgYmFja3dhcmRzUmVkdWNlLFxuICBmb3J3YXJkc0ZvckVhY2gsXG4gIGJhY2t3YXJkc0ZvckVhY2hcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB3aGlsc3QoY2FsbGJhY2ssIGRvbmUsIGNvbnRleHQpIHtcclxuICBsZXQgY291bnQgPSAtMTtcclxuXHJcbiAgZnVuY3Rpb24gbmV4dCgpIHtcclxuICAgIGNvdW50Kys7XHJcblxyXG4gICAgY29uc3QgaW5kZXggPSBjb3VudCwgIC8vL1xyXG4gICAgICAgICAgdGVybWluYXRlID0gY2FsbGJhY2sobmV4dCwgZG9uZSwgY29udGV4dCwgaW5kZXgpO1xyXG5cclxuICAgIGlmICh0ZXJtaW5hdGUpIHtcclxuICAgICAgZG9uZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmV4dCgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZm9yRWFjaChhcnJheSwgY2FsbGJhY2ssIGRvbmUsIGNvbnRleHQpIHtcclxuICBjb25zdCBsZW5ndGggPSBhcnJheS5sZW5ndGg7ICAvLy9cclxuXHJcbiAgbGV0IGNvdW50ID0gLTE7XHJcblxyXG4gIGZ1bmN0aW9uIG5leHQoKSB7XHJcbiAgICBjb3VudCsrO1xyXG5cclxuICAgIGNvbnN0IHRlcm1pbmF0ZSA9IChjb3VudCA9PT0gbGVuZ3RoKTtcclxuXHJcbiAgICBpZiAodGVybWluYXRlKSB7XHJcbiAgICAgIGRvbmUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gY291bnQsICAvLy9cclxuICAgICAgICAgICAgZWxlbWVudCA9IGFycmF5W2luZGV4XTtcclxuXHJcbiAgICAgIGNhbGxiYWNrKGVsZW1lbnQsIG5leHQsIGRvbmUsIGNvbnRleHQsIGluZGV4KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5leHQoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNlcXVlbmNlKGNhbGxiYWNrcywgZG9uZSwgY29udGV4dCkge1xyXG4gIGNvbnN0IGxlbmd0aCA9IGNhbGxiYWNrcy5sZW5ndGg7ICAvLy9cclxuXHJcbiAgbGV0IGNvdW50ID0gLTE7XHJcblxyXG4gIGZ1bmN0aW9uIG5leHQoKSB7XHJcbiAgICBjb3VudCsrO1xyXG5cclxuICAgIGNvbnN0IHRlcm1pbmF0ZSA9IChjb3VudCA9PT0gbGVuZ3RoKTtcclxuXHJcbiAgICBpZiAodGVybWluYXRlKSB7XHJcbiAgICAgIGRvbmUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gY291bnQsICAvLy9cclxuICAgICAgICAgICAgY2FsbGJhY2sgPSBjYWxsYmFja3NbaW5kZXhdO1xyXG5cclxuICAgICAgY2FsbGJhY2sobmV4dCwgZG9uZSwgY29udGV4dCwgaW5kZXgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmV4dCgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZXZlbnR1YWxseShjYWxsYmFja3MsIGRvbmUsIGNvbnRleHQpIHtcclxuICBjb25zdCBsZW5ndGggPSBjYWxsYmFja3MubGVuZ3RoOyAgLy8vXHJcblxyXG4gIGxldCBjb3VudCA9IDA7XHJcblxyXG4gIGZ1bmN0aW9uIG5leHQoKSB7XHJcbiAgICBjb3VudCsrO1xyXG5cclxuICAgIGNvbnN0IHRlcm1pbmF0ZSA9IChjb3VudCA9PT0gbGVuZ3RoKTtcclxuXHJcbiAgICBpZiAodGVybWluYXRlKSB7XHJcbiAgICAgIGRvbmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNhbGxiYWNrcy5mb3JFYWNoKChjYWxsYmFjaywgaW5kZXgpID0+IHtcclxuICAgIGNhbGxiYWNrKG5leHQsIGRvbmUsIGNvbnRleHQsIGluZGV4KTtcclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlcGVhdGVkbHkoY2FsbGJhY2ssIGxlbmd0aCwgZG9uZSwgY29udGV4dCkge1xyXG4gIGxldCBjb3VudCA9IDA7XHJcblxyXG4gIGZ1bmN0aW9uIG5leHQoKSB7XHJcbiAgICBjb3VudCsrO1xyXG5cclxuICAgIGNvbnN0IHRlcm1pbmF0ZSA9IChjb3VudCA9PT0gbGVuZ3RoKTtcclxuXHJcbiAgICBpZiAodGVybWluYXRlKSB7XHJcbiAgICAgIGRvbmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcclxuICAgIGNhbGxiYWNrKG5leHQsIGRvbmUsIGNvbnRleHQsIGluZGV4KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmb3J3YXJkc0ZvckVhY2goYXJyYXksIGNhbGxiYWNrLCBkb25lLCBjb250ZXh0KSB7XHJcbiAgY29uc3QgbGVuZ3RoID0gYXJyYXkubGVuZ3RoOyAgLy8vXHJcblxyXG4gIGxldCBjb3VudCA9IC0xO1xyXG5cclxuICBmdW5jdGlvbiBuZXh0KCkge1xyXG4gICAgY291bnQrKztcclxuXHJcbiAgICBjb25zdCB0ZXJtaW5hdGUgPSAoY291bnQgPT09IGxlbmd0aCk7XHJcblxyXG4gICAgaWYgKHRlcm1pbmF0ZSkge1xyXG4gICAgICBkb25lKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBpbmRleCA9IGNvdW50LCAgLy8vXHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBhcnJheVtpbmRleF07XHJcblxyXG4gICAgICBjYWxsYmFjayhlbGVtZW50LCBuZXh0LCBkb25lLCBjb250ZXh0LCBpbmRleCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZXh0KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBiYWNrd2FyZHNGb3JFYWNoKGFycmF5LCBjYWxsYmFjaywgZG9uZSwgY29udGV4dCkge1xyXG4gIGNvbnN0IGxlbmd0aCA9IGFycmF5Lmxlbmd0aDsgIC8vL1xyXG5cclxuICBsZXQgY291bnQgPSBsZW5ndGg7XHJcblxyXG4gIGZ1bmN0aW9uIG5leHQoKSB7XHJcbiAgICBjb3VudC0tO1xyXG5cclxuICAgIGNvbnN0IHRlcm1pbmF0ZSA9IChjb3VudCA9PT0gLTEpO1xyXG5cclxuICAgIGlmICh0ZXJtaW5hdGUpIHtcclxuICAgICAgZG9uZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgaW5kZXggPSBjb3VudCwgIC8vL1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gYXJyYXlbaW5kZXhdO1xyXG5cclxuICAgICAgY2FsbGJhY2soZWxlbWVudCwgbmV4dCwgZG9uZSwgY29udGV4dCwgaW5kZXgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmV4dCgpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgd2hpbHN0LFxyXG4gIGZvckVhY2gsXHJcbiAgc2VxdWVuY2UsXHJcbiAgZXZlbnR1YWxseSxcclxuICByZXBlYXRlZGx5LFxyXG4gIGZvcndhcmRzRm9yRWFjaCxcclxuICBiYWNrd2FyZHNGb3JFYWNoXHJcbn07XHJcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgZnMgZnJvbSBcImZzXCI7XG5cbmltcG9ydCB7IFVURjhfRU5DT0RJTkcgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lRnJvbVBhdGggfSBmcm9tIFwiLi4vdXRpbGl0aWVzL3BhdGhcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrRW50cnlFeGlzdHMoZW50cnlQYXRoKSB7XG4gIGNvbnN0IGVudHJ5RXhpc3RzID0gZnMuZXhpc3RzU3luYyhlbnRyeVBhdGgpO1xuXG4gIHJldHVybiBlbnRyeUV4aXN0cztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrRmlsZUV4aXN0cyhmaWxlUGF0aCkge1xuICBsZXQgZmlsZUV4aXN0cyA9IGZhbHNlO1xuICBcbiAgY29uc3QgZW50cnlQYXRoID0gZmlsZVBhdGgsIC8vL1xuICAgICAgICBlbnRyeUV4aXN0cyA9IGNoZWNrRW50cnlFeGlzdHMoZW50cnlQYXRoKTtcbiAgXG4gIGlmIChlbnRyeUV4aXN0cykge1xuICAgIGNvbnN0IGVudHJ5RmlsZSA9IGlzRW50cnlGaWxlKGVudHJ5UGF0aCk7XG4gICAgXG4gICAgaWYgKGVudHJ5RmlsZSkge1xuICAgICAgZmlsZUV4aXN0cyA9IHRydWU7XG4gICAgfVxuICB9XG4gIFxuICByZXR1cm4gZmlsZUV4aXN0cztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrRGlyZWN0b3J5RXhpc3RzKGRpcmVjdG9yeVBhdGgpIHtcbiAgbGV0IGRpcmVjdG9yeUV4aXN0cyA9IGZhbHNlO1xuXG4gIGNvbnN0IGVudHJ5UGF0aCA9IGRpcmVjdG9yeVBhdGgsIC8vL1xuICAgICAgICBlbnRyeUV4aXN0cyA9IGNoZWNrRW50cnlFeGlzdHMoZW50cnlQYXRoKTtcblxuICBpZiAoZW50cnlFeGlzdHMpIHtcbiAgICBjb25zdCBlbnRyeURpcmVjdG9yeSA9IGlzRW50cnlEaXJlY3RvcnkoZW50cnlQYXRoKTtcblxuICAgIGlmIChlbnRyeURpcmVjdG9yeSkge1xuICAgICAgZGlyZWN0b3J5RXhpc3RzID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZGlyZWN0b3J5RXhpc3RzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFbnRyeUZpbGUoZW50cnlQYXRoKSB7XG4gIGNvbnN0IHN0YXQgPSBmcy5zdGF0U3luYyhlbnRyeVBhdGgpLFxuICAgICAgICBlbnRyeURpcmVjdG9yeSA9IHN0YXQuaXNEaXJlY3RvcnkoKSxcbiAgICAgICAgZW50cnlGaWxlID0gIWVudHJ5RGlyZWN0b3J5O1xuXG4gIHJldHVybiBlbnRyeUZpbGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VudHJ5RGlyZWN0b3J5KGVudHJ5UGF0aCkge1xuICBjb25zdCBzdGF0ID0gZnMuc3RhdFN5bmMoZW50cnlQYXRoKSxcbiAgICAgICAgZW50cnlEaXJlY3RvcnkgPSBzdGF0LmlzRGlyZWN0b3J5KCk7XG5cbiAgcmV0dXJuIGVudHJ5RGlyZWN0b3J5O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEaXJlY3RvcnlFbXB0eShkaXJlY3RvcnlQYXRoKSB7XG4gIGNvbnN0IHN1YkVudHJ5TmFtZXMgPSByZWFkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpLFxuICAgICAgICBzdWJFbnRyeU5hbWVzTGVuZ3RoID0gc3ViRW50cnlOYW1lcy5sZW5ndGgsXG4gICAgICAgIGRpcmVjdG9yeUVtcHR5ID0gKHN1YkVudHJ5TmFtZXNMZW5ndGggPT09IDApO1xuXG4gIHJldHVybiBkaXJlY3RvcnlFbXB0eTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlYWREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCkge1xuICBjb25zdCBzdWJFbnRyeU5hbWVzID0gZnMucmVhZGRpclN5bmMoZGlyZWN0b3J5UGF0aCk7XG5cbiAgcmV0dXJuIHN1YkVudHJ5TmFtZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWFkRmlsZShmaWxlUGF0aCwgZW5jb2RpbmcgPSBVVEY4X0VOQ09ESU5HKSB7XG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgZW5jb2RpbmdcbiAgICAgICAgfSxcbiAgICAgICAgY29udGVudCA9IGZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aCwgb3B0aW9ucyk7XG5cbiAgcmV0dXJuIGNvbnRlbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3cml0ZUZpbGUoZmlsZVBhdGgsIGNvbnRlbnQpIHtcbiAgZnMud3JpdGVGaWxlU3luYyhmaWxlUGF0aCwgY29udGVudCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmRUb0ZpbGUoZmlsZVBhdGgsIGNvbnRlbnQpIHtcbiAgZnMuYXBwZW5kRmlsZVN5bmMoZmlsZVBhdGgsIGNvbnRlbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpIHtcbiAgY29uc3QgZGlyZWN0b3J5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWVGcm9tUGF0aChkaXJlY3RvcnlQYXRoKTtcblxuICBpZiAoKGRpcmVjdG9yeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgIT09IFwiLlwiKSAmJiAoZGlyZWN0b3J5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSAhPT0gbnVsbCkpIHtcbiAgICBjb25zdCBwYXJlbnREaXJlY3RvcnlQYXRoID0gZGlyZWN0b3J5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSwgIC8vL1xuICAgICAgICAgIHBhcmVudERpcmVjdG9yeUV4aXN0cyA9IGNoZWNrRGlyZWN0b3J5RXhpc3RzKHBhcmVudERpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKCFwYXJlbnREaXJlY3RvcnlFeGlzdHMpIHtcbiAgICAgIGNyZWF0ZURpcmVjdG9yeShwYXJlbnREaXJlY3RvcnlQYXRoKTtcbiAgICB9XG4gIH1cblxuICBmcy5ta2RpclN5bmMoZGlyZWN0b3J5UGF0aCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5hbWVGaWxlKG9sZEZpbGVQYXRoLCBuZXdGaWxlUGF0aCkge1xuICBmcy5yZW5hbWVTeW5jKG9sZEZpbGVQYXRoLCBuZXdGaWxlUGF0aCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGF0cyhmaWxlUGF0aCkge1xuICByZXR1cm4gZnMuc3RhdFN5bmMoZmlsZVBhdGgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNoZWNrRW50cnlFeGlzdHMsXG4gIGNoZWNrRmlsZUV4aXN0cyxcbiAgY2hlY2tEaXJlY3RvcnlFeGlzdHMsXG4gIGlzRW50cnlGaWxlLFxuICBpc0VudHJ5RGlyZWN0b3J5LFxuICBpc0RpcmVjdG9yeUVtcHR5LFxuICByZWFkRGlyZWN0b3J5LFxuICByZWFkRmlsZSxcbiAgd3JpdGVGaWxlLFxuICBhcHBlbmRUb0ZpbGUsXG4gIGNyZWF0ZURpcmVjdG9yeSxcbiAgcmVuYW1lRmlsZSxcbiAgZ2V0U3RhdHNcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHJjIGZyb20gXCIuL21pc2NlbGxhbmVvdXMvcmNcIjtcbmltcG9ydCBsb2cgZnJvbSBcIi4vbWlzY2VsbGFuZW91cy9sb2dcIjtcbmltcG9ydCBvbkVUWCBmcm9tIFwiLi9taXNjZWxsYW5lb3VzL29uRVRYXCI7XG5pbXBvcnQgcHJvbXB0IGZyb20gXCIuL21pc2NlbGxhbmVvdXMvcHJvbXB0XCI7XG5cbmltcG9ydCB7IGdldCwgcG9zdCB9IGZyb20gXCIuL21pc2NlbGxhbmVvdXMvYWpheFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGxvZyxcbiAgcmMsXG4gIGdldCxcbiAgcG9zdCxcbiAgb25FVFgsXG4gIHByb21wdFxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBHRVRfTUVUSE9ELCBQT1NUX01FVEhPRCwgQVBQTElDQVRJT05fSlNPTl9DSEFSU0VUX1VURjhfQ09OVEVOVF9UWVBFIH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0KGhvc3QsIHVyaSwgcGFyYW1ldGVycywgY2FsbGJhY2spIHtcbiAgaWYgKGNhbGxiYWNrID09PSB1bmRlZmluZWQpIHtcbiAgICBjYWxsYmFjayA9IHBhcmFtZXRlcnM7IC8vL1xuICAgIHBhcmFtZXRlcnMgPSB7fTtcbiAgfVxuXG4gIGNvbnN0IG1ldGhvZCA9IEdFVF9NRVRIT0QsXG4gICAgICAgIGJvZHkgPSB1bmRlZmluZWQ7XG5cbiAgcmVxdWVzdChob3N0LCB1cmksIHBhcmFtZXRlcnMsIG1ldGhvZCwgYm9keSwgY2FsbGJhY2spO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcG9zdChob3N0LCB1cmksIGpzb24sIHBhcmFtZXRlcnMsIGNhbGxiYWNrKSB7XG4gIGlmIChjYWxsYmFjayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY2FsbGJhY2sgPSBwYXJhbWV0ZXJzOyAvLy9cbiAgICBwYXJhbWV0ZXJzID0ge307XG4gIH1cblxuICBjb25zdCBtZXRob2QgPSBQT1NUX01FVEhPRCxcbiAgICAgICAgYm9keSA9IEpTT04uc3RyaW5naWZ5KGpzb24pO1xuXG4gIHJlcXVlc3QoaG9zdCwgdXJpLCBwYXJhbWV0ZXJzLCBtZXRob2QsIGJvZHksIGNhbGxiYWNrKTtcbn1cblxuZnVuY3Rpb24gcmVxdWVzdChob3N0LCB1cmksIHBhcmFtZXRlcnMsIG1ldGhvZCwgYm9keSwgY2FsbGJhY2spIHtcbiAgY29uc3QgdXJsID0gdXJsRnJvbUhvc3RVUklBbmRQYXJhbWV0ZXJzKGhvc3QsIHVyaSwgcGFyYW1ldGVycyksXG4gICAgICAgIHhtbEh0dHBSZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgeG1sSHR0cFJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgcmVhZHlTdGF0ZSwgc3RhdHVzLCByZXNwb25zZVRleHQgfSA9IHhtbEh0dHBSZXF1ZXN0O1xuXG4gICAgaWYgKHJlYWR5U3RhdGUgPT0gNCkge1xuICAgICAgbGV0IGpzb24gPSBudWxsO1xuXG4gICAgICBpZiAoc3RhdHVzID09IDIwMCkge1xuICAgICAgICBjb25zdCBqc29uU3RyaW5nID0gcmVzcG9uc2VUZXh0OyAvLy9cblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGpzb24gPSBKU09OLnBhcnNlKGpzb25TdHJpbmcpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIC8vL1xuICAgICAgICB9XG5cbiAgICAgICAgY2FsbGJhY2soanNvbik7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGNvbnRlbnRUeXBlID0gQVBQTElDQVRJT05fSlNPTl9DSEFSU0VUX1VURjhfQ09OVEVOVF9UWVBFO1xuXG4gIHhtbEh0dHBSZXF1ZXN0Lm9wZW4obWV0aG9kLCB1cmwpO1xuXG4gIHhtbEh0dHBSZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJjb250ZW50LXR5cGVcIiwgY29udGVudFR5cGUpO1xuXG4gIHhtbEh0dHBSZXF1ZXN0LnNlbmQoYm9keSk7XG59XG5cbmZ1bmN0aW9uIHF1ZXJ5U3RyaW5nRnJvbVBhcmFtZXRlcnMocGFyYW1ldGVycykge1xuICBjb25zdCBuYW1lcyA9IE9iamVjdC5rZXlzKHBhcmFtZXRlcnMpLFxuICAgICAgICBuYW1lc0xlbmd0aCA9IG5hbWVzLmxlbmd0aCxcbiAgICAgICAgbGFzdEluZGV4ID0gbmFtZXNMZW5ndGggLSAxLFxuICAgICAgICBxdWVyeVN0cmluZyA9IG5hbWVzLnJlZHVjZSgocXVlcnlTdHJpbmcsIG5hbWUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBwYXJhbWV0ZXJzW25hbWVdLFxuICAgICAgICAgICAgICAgIGVuY29kZWROYW1lID0gZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpLFxuICAgICAgICAgICAgICAgIGVuY29kZWRWYWx1ZSA9IGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSksXG4gICAgICAgICAgICAgICAgYW1wZXJzYW5kT3JOb3RoaW5nID0gKGluZGV4ICE9PSBsYXN0SW5kZXgpID8gXCImXCIgOiBcIlwiO1xuICBcbiAgICAgICAgICBxdWVyeVN0cmluZyArPSBgJHtlbmNvZGVkTmFtZX09JHtlbmNvZGVkVmFsdWV9JHthbXBlcnNhbmRPck5vdGhpbmd9YDtcbiAgXG4gICAgICAgICAgcmV0dXJuIHF1ZXJ5U3RyaW5nO1xuICAgICAgICB9LCBcIlwiKTtcblxuICByZXR1cm4gcXVlcnlTdHJpbmc7XG59XG5cbmZ1bmN0aW9uIHVybEZyb21Ib3N0VVJJQW5kUGFyYW1ldGVycyhob3N0LCB1cmksIHBhcmFtZXRlcnMpIHtcbiAgY29uc3QgcXVlcnlTdHJpbmcgPSBxdWVyeVN0cmluZ0Zyb21QYXJhbWV0ZXJzKHBhcmFtZXRlcnMpLFxuICAgICAgICB1cmwgPSAocXVlcnlTdHJpbmcgPT09IFwiXCIpID9cbiAgICAgICAgICAgICAgYCR7aG9zdH0ke3VyaX1gIDpcbiAgICAgICAgICAgICAgICBgJHtob3N0fSR7dXJpfT8ke3F1ZXJ5U3RyaW5nfWA7XG5cbiAgcmV0dXJuIHVybDtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG5pbXBvcnQgeyBzZWNvbmQgfSBmcm9tIFwiLi4vLi4vdXRpbGl0aWVzL2FycmF5XCI7XG5pbXBvcnQgeyBjb25jYXRlbmF0ZVBhdGhzIH0gZnJvbSBcIi4uLy4uL3V0aWxpdGllcy9wYXRoXCI7XG5pbXBvcnQgeyBjaGVja0ZpbGVFeGlzdHMsIHJlYWRGaWxlLCBhcHBlbmRUb0ZpbGUsIHJlbmFtZUZpbGUsIGdldFN0YXRzIH0gZnJvbSBcIi4uLy4uL3V0aWxpdGllcy9maWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBUUkFDRSwgREVCVUcsIElORk8sIFdBUk5JTkcsIEVSUk9SLCBGQVRBTCwgREVGQVVMVF9MT0dfTEVWRUwsIERFRkFVTFRfTE9HX0ZJTEVfQkFTRV9OQU1FLCBERUZBVUxUX0xPR19ESVJFQ1RPUllfUEFUSCB9IGZyb20gXCIuLi8uLi9jb25zdGFudHNcIjtcblxubGV0IGxvZ0xldmVsID0gREVGQVVMVF9MT0dfTEVWRUwsXG4gICAgbG9nRmlsZUJhc2VOYW1lID0gREVGQVVMVF9MT0dfRklMRV9CQVNFX05BTUUsXG4gICAgbG9nRGlyZWN0b3J5UGF0aCA9IERFRkFVTFRfTE9HX0RJUkVDVE9SWV9QQVRIO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2cobWVzc2FnZU9yRXJyb3IsIGxldmVsID0gXCJcIikge1xuICBsZXQgc2FsaWVudFN0YWNrTWVzc2FnZUluZGV4ID0gMTtcblxuICBjb25zdCBsZXZlbHMgPSBbXG4gICAgVFJBQ0UsXG4gICAgREVCVUcsXG4gICAgSU5GTyxcbiAgICBXQVJOSU5HLFxuICAgIEVSUk9SLFxuICAgIEZBVEFMLFxuICBdO1xuXG4gIGlmIChsZXZlbCAhPT0gXCJcIikge1xuICAgIGNvbnN0IGxldmVsSW5kZXggPSBsZXZlbHMuaW5kZXhPZihsZXZlbCksXG4gICAgICAgICAgbG9nTGV2ZWxJbmRleCA9IGxldmVscy5pbmRleE9mKGxvZ0xldmVsKTtcblxuICAgIGlmIChsZXZlbEluZGV4IDwgbG9nTGV2ZWxJbmRleCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNhbGllbnRTdGFja01lc3NhZ2VJbmRleCArPSAxO1xuXG4gICAgbGV2ZWwgPSBgJHtsZXZlbH0gYDsgIC8vL1xuICB9XG5cbiAgbGV0IGVycm9yLFxuICAgICAgbWVzc2FnZTtcblxuICBpZiAobWVzc2FnZU9yRXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgIGVycm9yID0gbWVzc2FnZU9yRXJyb3I7IC8vL1xuXG4gICAgKHsgbWVzc2FnZSB9ID0gZXJyb3IpO1xuICB9IGVsc2Uge1xuICAgIG1lc3NhZ2UgPSBtZXNzYWdlT3JFcnJvcjsgLy8vXG5cbiAgICBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgfVxuXG4gIGNvbnN0IHsgc3RhY2sgfSA9IGVycm9yLFxuICAgICAgICBzdGFja01lc3NhZ2VzID0gc3RhY2tNZXNzYWdlc0Zyb21TdGFjayhzdGFjayksXG4gICAgICAgIHBlcnRpbmVudFN0YWNrTWVzc2FnZSA9IHN0YWNrTWVzc2FnZXNbc2FsaWVudFN0YWNrTWVzc2FnZUluZGV4XSxcbiAgICAgICAgc3RhY2tNZXNzYWdlID0gcGVydGluZW50U3RhY2tNZXNzYWdlLCAvLy9cbiAgICAgICAgY3VycmVudERhdGVBbmRUaW1lU3RyaW5nID0gZ2V0Q3VycmVudERhdGVBbmRUaW1lU3RyaW5nKCksXG4gICAgICAgIGZpbGVQYXRoID0gZmlsZVBhdGhGcm9tU3RhY2tNZXNzYWdlKHN0YWNrTWVzc2FnZSksXG4gICAgICAgIGxpbmVOdW1iZXIgPSBsaW5lTnVtYmVyRnJvbVN0YWNrTWVzc2FnZShzdGFja01lc3NhZ2UpLFxuICAgICAgICBsb2dNZXNzYWdlID0gYCR7bGV2ZWx9JHtjdXJyZW50RGF0ZUFuZFRpbWVTdHJpbmd9ICR7ZmlsZVBhdGh9KCR7bGluZU51bWJlcn0pICR7bWVzc2FnZX1gO1xuXG4gIGNvbnNvbGUubG9nKGxvZ01lc3NhZ2UpO1xuXG4gIGlmIChsb2dEaXJlY3RvcnlQYXRoICE9PSBudWxsKSB7XG4gICAgcm9sbE92ZXJMb2dGaWxlKCk7XG5cbiAgICBjb25zdCBsb2dGaWxlUGF0aCA9IGdldExvZ0ZpbGVQYXRoKCksXG4gICAgICAgICAgbG9nRmlsZUNvbnRlbnQgPSBgJHtsb2dNZXNzYWdlfVxcbmA7XG5cbiAgICBhcHBlbmRUb0ZpbGUobG9nRmlsZVBhdGgsIGxvZ0ZpbGVDb250ZW50KTtcbiAgfVxuXG4gIHJldHVybiBsb2dNZXNzYWdlO1xufVxuXG5mdW5jdGlvbiB0cmFjZShtZXNzYWdlKSB7IHJldHVybiBsb2cobWVzc2FnZSwgVFJBQ0UpOyB9XG5cbmZ1bmN0aW9uIGRlYnVnKG1lc3NhZ2UpIHsgcmV0dXJuIGxvZyhtZXNzYWdlLCBERUJVRyk7IH1cblxuZnVuY3Rpb24gaW5mbyhtZXNzYWdlKSB7IHJldHVybiBsb2cobWVzc2FnZSwgSU5GTyk7IH1cblxuZnVuY3Rpb24gd2FybmluZyhtZXNzYWdlKSB7IHJldHVybiBsb2cobWVzc2FnZSwgV0FSTklORyk7IH1cblxuZnVuY3Rpb24gZXJyb3IobWVzc2FnZSkgeyByZXR1cm4gbG9nKG1lc3NhZ2UsIEVSUk9SKTsgfVxuXG5mdW5jdGlvbiBmYXRhbChtZXNzYWdlKSB7IHJldHVybiBsb2cobWVzc2FnZSwgRkFUQUwpOyB9XG5cbmZ1bmN0aW9uIHNldExvZ0xldmVsKGxldmVsKSB7IGxvZ0xldmVsID0gbGV2ZWw7IH1cblxuZnVuY3Rpb24gc2V0TG9nRmlsZUJhc2VOYW1lKGZpbGVCYXNlTmFtZSkgeyBsb2dGaWxlQmFzZU5hbWUgPSBmaWxlQmFzZU5hbWU7IH1cblxuZnVuY3Rpb24gc2V0TG9nRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKSB7IGxvZ0RpcmVjdG9yeVBhdGggPSBkaXJlY3RvcnlQYXRoOyB9XG5cbmZ1bmN0aW9uIHNldExvZ09wdGlvbnMobG9nT3B0aW9ucykge1xuICBjb25zdCB7IGxldmVsLCBmaWxlQmFzZU5hbWUsIGRpcmVjdG9yeVBhdGggfSA9IGxvZ09wdGlvbnM7XG5cbiAgc2V0TG9nTGV2ZWwobGV2ZWwpO1xuXG4gIHNldExvZ0ZpbGVCYXNlTmFtZShmaWxlQmFzZU5hbWUpO1xuXG4gIHNldExvZ0RpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCk7XG59XG5cbmZ1bmN0aW9uIGdldExvZ0ZpbGVDb250ZW50KCkge1xuICBjb25zdCBsb2dGaWxlUGF0aCA9IGdldExvZ0ZpbGVQYXRoKCksXG4gICAgICAgIGxvZ0ZpbGVDb250ZW50ID0gcmVhZEZpbGUobG9nRmlsZVBhdGgpO1xuXG4gIHJldHVybiBsb2dGaWxlQ29udGVudDtcbn1cblxuT2JqZWN0LmFzc2lnbihsb2csIHtcbiAgVFJBQ0UsXG4gIERFQlVHLFxuICBJTkZPLFxuICBXQVJOSU5HLFxuICBFUlJPUixcbiAgRkFUQUwsXG4gIHRyYWNlLFxuICBkZWJ1ZyxcbiAgaW5mbyxcbiAgd2FybmluZyxcbiAgZXJyb3IsXG4gIGZhdGFsLFxuICBzZXRMb2dMZXZlbCxcbiAgc2V0TG9nRmlsZUJhc2VOYW1lLFxuICBzZXRMb2dEaXJlY3RvcnlQYXRoLFxuICBzZXRMb2dPcHRpb25zLFxuICBnZXRMb2dGaWxlQ29udGVudFxufSk7XG5cbmZ1bmN0aW9uIGdldExvZ0ZpbGVQYXRoKCkge1xuICBjb25zdCBsb2dGaWxlTmFtZSA9IGAke2xvZ0ZpbGVCYXNlTmFtZX0ubG9nYCxcbiAgICAgICAgbG9nRmlsZVBhdGggPSBjb25jYXRlbmF0ZVBhdGhzKGxvZ0RpcmVjdG9yeVBhdGgsIGxvZ0ZpbGVOYW1lKTtcblxuICByZXR1cm4gbG9nRmlsZVBhdGg7XG59XG5cbmZ1bmN0aW9uIGdldFJvbGxlZE92ZXJMb2dGaWxlUGF0aCgpIHtcbiAgY29uc3QgY3VycmVudERhdGVTdHJpbmcgPSBnZXRDdXJyZW50RGF0ZVN0cmluZygpLFxuICAgICAgICByb2xsZWRPdmVyTG9nRmlsZU5hbWUgPSBgJHtsb2dGaWxlQmFzZU5hbWV9LiR7Y3VycmVudERhdGVTdHJpbmd9LmxvZ2AsXG4gICAgICAgIHJvbGxlZE92ZXJMb2dGaWxlUGF0aCA9IGNvbmNhdGVuYXRlUGF0aHMobG9nRGlyZWN0b3J5UGF0aCwgcm9sbGVkT3ZlckxvZ0ZpbGVOYW1lKTtcblxuICByZXR1cm4gcm9sbGVkT3ZlckxvZ0ZpbGVQYXRoO1xufVxuXG5mdW5jdGlvbiBnZXRMb2dGaWxlTGFzdE1vZGlmaWVkRGF0ZSgpIHtcbiAgY29uc3QgbG9nRmlsZVBhdGggPSBnZXRMb2dGaWxlUGF0aCgpLFxuICAgICAgICBsb2dGaWxlU3RhdHMgPSBnZXRTdGF0cyhsb2dGaWxlUGF0aCksXG4gICAgICAgIHsgbXRpbWUgfSA9IGxvZ0ZpbGVTdGF0cyxcbiAgICAgICAgbG9nRmlsZUxhc3RNb2RpZmllZERhdGUgPSBuZXcgRGF0ZShtdGltZSk7ICAvLy9cblxuICByZXR1cm4gbG9nRmlsZUxhc3RNb2RpZmllZERhdGU7XG59XG5cbmZ1bmN0aW9uIHJvbGxPdmVyTG9nRmlsZSgpIHtcbiAgY29uc3QgbG9nRmlsZVBhdGggPSBnZXRMb2dGaWxlUGF0aCgpLFxuICAgICAgICBsb2dGaWxlRXhpc3RzID0gY2hlY2tGaWxlRXhpc3RzKGxvZ0ZpbGVQYXRoKTtcblxuICBpZiAoIWxvZ0ZpbGVFeGlzdHMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBsb2dGaWxlTGFzdE1vZGlmaWVkRGF0ZSA9IGdldExvZ0ZpbGVMYXN0TW9kaWZpZWREYXRlKCksXG4gICAgICAgIGxvZ0ZpbGVMYXN0TW9kaWZpZWREYXRlQ3VycmVudERhdGUgPSBpc0RhdGVDdXJyZW50RGF0ZShsb2dGaWxlTGFzdE1vZGlmaWVkRGF0ZSk7XG5cbiAgaWYgKCFsb2dGaWxlTGFzdE1vZGlmaWVkRGF0ZUN1cnJlbnREYXRlKSB7XG4gICAgY29uc3Qgcm9sbGVkT3ZlckxvZ0ZpbGVQYXRoID0gZ2V0Um9sbGVkT3ZlckxvZ0ZpbGVQYXRoKCk7XG5cbiAgICByZW5hbWVGaWxlKGxvZ0ZpbGVQYXRoLCByb2xsZWRPdmVyTG9nRmlsZVBhdGgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzRGF0ZUN1cnJlbnREYXRlKGRhdGUpIHtcbiAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpLFxuICAgICAgICBkYXRlU3RyaW5nID0gZGF0ZS50b0RhdGVTdHJpbmcoKSxcbiAgICAgICAgY3VycmVudERhdGVTdHJpbmcgPSBjdXJyZW50RGF0ZS50b0RhdGVTdHJpbmcoKSxcbiAgICAgICAgZGF0ZUN1cnJlbnREYXRlID0gKGRhdGVTdHJpbmcgPT09IGN1cnJlbnREYXRlU3RyaW5nKTtcblxuICByZXR1cm4gZGF0ZUN1cnJlbnREYXRlO1xufVxuXG5mdW5jdGlvbiBnZXRDdXJyZW50RGF0ZVN0cmluZygpIHtcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCksXG4gICAgICAgIGRheSA9IHBhZFN0YXJ0V2l0aFplcm9lcyhkYXRlLmdldERhdGUoKSwgMiksICAvLy9cbiAgICAgICAgbW9udGggPSBwYWRTdGFydFdpdGhaZXJvZXMoZGF0ZS5nZXRNb250aCgpICsgMSwgMiksIC8vL1xuICAgICAgICB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgICBjdXJyZW50RGF0ZUFuZFRpbWVTdHJpbmcgPSBgJHtkYXl9LSR7bW9udGh9LSR7eWVhcn1gO1xuXG4gIHJldHVybiBjdXJyZW50RGF0ZUFuZFRpbWVTdHJpbmc7XG59XG5cbmZ1bmN0aW9uIGdldEN1cnJlbnREYXRlQW5kVGltZVN0cmluZygpIHtcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCksXG4gICAgICAgIGRheSA9IHBhZFN0YXJ0V2l0aFplcm9lcyhkYXRlLmdldERhdGUoKSwgMiksICAvLy9cbiAgICAgICAgbW9udGggPSBwYWRTdGFydFdpdGhaZXJvZXMoZGF0ZS5nZXRNb250aCgpICsgMSwgMiksIC8vL1xuICAgICAgICB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgICBob3VycyA9IHBhZFN0YXJ0V2l0aFplcm9lcyhkYXRlLmdldEhvdXJzKCksIDIpLFxuICAgICAgICBtaW51dGVzID0gcGFkU3RhcnRXaXRoWmVyb2VzKGRhdGUuZ2V0TWludXRlcygpLCAyKSxcbiAgICAgICAgc2Vjb25kcyA9IHBhZFN0YXJ0V2l0aFplcm9lcyhkYXRlLmdldFNlY29uZHMoKSwgMiksXG4gICAgICAgIG1pbGxpc2Vjb25kcyA9IHBhZFN0YXJ0V2l0aFplcm9lcyhkYXRlLmdldE1pbGxpc2Vjb25kcygpLCAzKSxcbiAgICAgICAgY3VycmVudERhdGVBbmRUaW1lU3RyaW5nID0gYCR7ZGF5fS0ke21vbnRofS0ke3llYXJ9ICR7aG91cnN9OiR7bWludXRlc306JHtzZWNvbmRzfS4ke21pbGxpc2Vjb25kc31gO1xuXG4gIHJldHVybiBjdXJyZW50RGF0ZUFuZFRpbWVTdHJpbmc7XG59XG5cbmZ1bmN0aW9uIHN0YWNrTWVzc2FnZXNGcm9tU3RhY2soc3RhY2spIHtcbiAgY29uc3Qgc3RhY2tNZXNzYWdlcyA9IFtdLFxuICAgICAgICBzdGFja0xpbmVzID0gc3RhY2suc3BsaXQoL1xcclxcbnxcXG4vKTtcblxuICBsZXQgc3RhY2tNZXNzYWdlID0gXCJcIjtcblxuICBzdGFja0xpbmVzLmZvckVhY2goKHN0YWNrTGluZSkgPT4ge1xuICAgIGNvbnN0IG1hdGNoZXMgPSAvXlxccyphdC4qLy50ZXN0KHN0YWNrTGluZSk7XG5cbiAgICBzdGFja01lc3NhZ2UgPSAoc3RhY2tNZXNzYWdlID09PSBcIlwiKSA/XG4gICAgICAgICAgICAgICAgICAgICAgc3RhY2tMaW5lIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGAke3N0YWNrTWVzc2FnZX1cXG4ke3N0YWNrTGluZX1gO1xuXG4gICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgIHN0YWNrTWVzc2FnZXMucHVzaChzdGFja01lc3NhZ2UpO1xuXG4gICAgICBzdGFja01lc3NhZ2UgPSBcIlwiO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHN0YWNrTWVzc2FnZXM7XG59XG5cbmZ1bmN0aW9uIGZpbGVQYXRoRnJvbVN0YWNrTWVzc2FnZShzdGFja01lc3NhZ2UpIHtcbiAgY29uc3QgbWF0Y2hlcyA9IHN0YWNrTWVzc2FnZS5tYXRjaCgvKFxcLy4rKTpcXGQrOlxcZCsvbSksXG4gICAgICAgIHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpLFxuICAgICAgICBhYnNvbHV0ZUZpbGVQYXRoID0gc2Vjb25kTWF0Y2gsICAvLy9cbiAgICAgICAgY3VycmVudFdvcmtpbmdEaXJlY3RvcnlQYXRoID0gcGF0aC5yZXNvbHZlKFwiLlwiKSwgIC8vL1xuICAgICAgICBjdXJyZW50V29ya2luZ0RpcmVjdG9yeVBhdGhMZW5ndGggPSBjdXJyZW50V29ya2luZ0RpcmVjdG9yeVBhdGgubGVuZ3RoLFxuICAgICAgICBzdGFydCA9IGN1cnJlbnRXb3JraW5nRGlyZWN0b3J5UGF0aExlbmd0aCArIDEsICAvLy9cbiAgICAgICAgZmlsZVBhdGggPSBhYnNvbHV0ZUZpbGVQYXRoLnN1YnN0cihzdGFydCk7XG5cbiAgcmV0dXJuIGZpbGVQYXRoO1xufVxuXG5mdW5jdGlvbiBsaW5lTnVtYmVyRnJvbVN0YWNrTWVzc2FnZShzdGFja01lc3NhZ2UpIHtcbiAgY29uc3QgbWF0Y2hlcyA9IHN0YWNrTWVzc2FnZS5tYXRjaCgvOihcXGQrKS9tKSxcbiAgICAgICAgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyksXG4gICAgICAgIGxpbmVOdW1iZXIgPSBzZWNvbmRNYXRjaDsgLy8vXG5cbiAgcmV0dXJuIGxpbmVOdW1iZXI7XG59XG5cbmZ1bmN0aW9uIHBhZFN0YXJ0V2l0aFplcm9lcyhzdHJpbmcsIHRhcmdldExlbmd0aCkge1xuICBjb25zdCBwYWRTdHJpbmcgPSBcIjBcIixcbiAgICAgICAgcGFkZGVkU3RyaW5nID0gcGFkU3RhcnQoc3RyaW5nLCB0YXJnZXRMZW5ndGgsIHBhZFN0cmluZyk7XG5cbiAgcmV0dXJuIHBhZGRlZFN0cmluZztcbn1cblxuZnVuY3Rpb24gcGFkU3RhcnQoc3RyaW5nLCB0YXJnZXRMZW5ndGgsIHBhZFN0cmluZykge1xuICBsZXQgcGFkZGluZyA9IFwiXCI7XG5cbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRhcmdldExlbmd0aDsgaW5kZXgrKykge1xuICAgIHBhZGRpbmcgKz0gcGFkU3RyaW5nO1xuICB9XG5cbiAgY29uc3QgcGFkZGVkU3RyaW5nID0gYCR7cGFkZGluZ30ke3N0cmluZ31gLnN1YnN0cigtdGFyZ2V0TGVuZ3RoKTtcblxuICByZXR1cm4gcGFkZGVkU3RyaW5nO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IERBVEFfRVZFTlQsIEVUWF9DSEFSQUNURVIsIFVURjhfRU5DT0RJTkcgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9uRVRYKGhhbmRsZXIpIHtcbiAgY29uc3QgZXZlbnQgPSBEQVRBX0VWRU5UO1xuXG4gIGlmIChwcm9jZXNzLnN0ZGluLnNldFJhd01vZGUpIHtcbiAgICBjb25zdCByYXdNb2RlID0gdHJ1ZSxcbiAgICAgICAgICBlbmNvZGluZyA9IFVURjhfRU5DT0RJTkc7XG5cbiAgICBwcm9jZXNzLnN0ZGluLnNldFJhd01vZGUocmF3TW9kZSk7XG4gICAgcHJvY2Vzcy5zdGRpbi5zZXRFbmNvZGluZyhlbmNvZGluZyk7XG5cbiAgICBwcm9jZXNzLnN0ZGluLnJlc3VtZSgpO1xuXG4gICAgcHJvY2Vzcy5zdGRpbi5hZGRMaXN0ZW5lcihldmVudCwgZGF0YUhhbmRsZXIpO1xuXG4gICAgcmV0dXJuIG9mZkV4dDtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9mZkV4dCgpIHtcbiAgICBwcm9jZXNzLnN0ZGluLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBkYXRhSGFuZGxlcik7XG4gIH1cblxuICBmdW5jdGlvbiBkYXRhSGFuZGxlcihjaGFyYWN0ZXIpIHtcbiAgICBpZiAoY2hhcmFjdGVyID09PSBFVFhfQ0hBUkFDVEVSKSB7XG4gICAgICBoYW5kbGVyKCk7XG4gICAgfVxuICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IG9uRVRYIGZyb20gXCIuL29uRVRYXCI7XG5cbmltcG9ydCB7IHdoaWxzdCB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvYXN5bmNocm9ub3VzXCI7XG5cbmltcG9ydCB7IENUUkxfQywgREFUQV9FVkVOVCwgQkFDS1NQQUNFX0NIQVJBQ1RFUiwgTElORV9GRUVEX0NIQVJBQ1RFUiwgQ0FSUklBR0VfUkVUVVJOX0NIQVJBQ1RFUiB9IGZyb20gXCIuLi8uLi9jb25zdGFudHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJvbXB0KG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gIGNvbnN0IHZhbHVlID0gbnVsbCxcbiAgICAgICAgeyBhdHRlbXB0cyA9IDMgfSA9IG9wdGlvbnMsXG4gICAgICAgIGNvbnRleHQgPSB7XG4gICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgYXR0ZW1wdHMsXG4gICAgICAgICAgb3B0aW9uc1xuICAgICAgICB9O1xuXG4gIHdoaWxzdChhdHRlbXB0LCAoKSA9PiB7XG4gICAgY29uc3QgeyB2YWx1ZSB9ID0gY29udGV4dDtcbiAgICBcbiAgICBjYWxsYmFjayh2YWx1ZSk7XG4gIH0sIGNvbnRleHQpO1xufVxuXG5mdW5jdGlvbiBhdHRlbXB0KG5leHQsIGRvbmUsIGNvbnRleHQpIHtcbiAgbGV0IHsgYXR0ZW1wdHMgfSA9IGNvbnRleHQ7XG5cbiAgY29uc3QgdGVybWluYXRlID0gKGF0dGVtcHRzLS0gPT09IDApO1xuICBcbiAgaWYgKHRlcm1pbmF0ZSkge1xuICAgIGRvbmUoKTtcbiAgICBcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCB7IG9wdGlvbnMgfSA9IGNvbnRleHQsXG4gICAgICAgIHsgaGlkZGVuID0gZmFsc2UsXG4gICAgICAgICAgZW5jb2RpbmcgPSBcInV0ZjhcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgICBpbml0aWFsVmFsdWUgPSBcIlwiLFxuICAgICAgICAgIGVycm9yTWVzc2FnZSxcbiAgICAgICAgICB2YWxpZGF0aW9uUGF0dGVybixcbiAgICAgICAgICB2YWxpZGF0aW9uRnVuY3Rpb24gfSA9IG9wdGlvbnM7XG5cbiAgaW5wdXQoZGVzY3JpcHRpb24sIGluaXRpYWxWYWx1ZSwgZW5jb2RpbmcsIGhpZGRlbiwgY2FsbGJhY2spO1xuXG4gIGZ1bmN0aW9uIGNhbGxiYWNrKHZhbHVlKSB7XG4gICAgY29uc3QgdmFsaWQgPSB2YWxpZGF0aW9uRnVuY3Rpb24gPyAgLy8vXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25GdW5jdGlvbih2YWx1ZSkgOlxuICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25QYXR0ZXJuLnRlc3QodmFsdWUpO1xuXG4gICAgaWYgKHZhbGlkKSB7XG4gICAgICBPYmplY3QuYXNzaWduKGNvbnRleHQsIHtcbiAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICB9KTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvck1lc3NhZ2UpO1xuXG4gICAgICBPYmplY3QuYXNzaWduKGNvbnRleHQsIHtcbiAgICAgICAgYXR0ZW1wdHNcbiAgICAgIH0pO1xuXG4gICAgICBuZXh0KCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGlucHV0KGRlc2NyaXB0aW9uLCBpbml0aWFsVmFsdWUsIGVuY29kaW5nLCBoaWRkZW4sIGNhbGxiYWNrKSB7XG4gIGxldCB2YWx1ZSA9IGluaXRpYWxWYWx1ZTsgLy8vXG5cbiAgY29uc3QgZXZlbnQgPSBEQVRBX0VWRU5ULFxuICAgICAgICByYXdNb2RlID0gdHJ1ZSxcbiAgICAgICAgb2ZmRVRYID0gb25FVFgoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKENUUkxfQyk7XG5cbiAgICAgICAgICBwcm9jZXNzLmV4aXQoKTtcbiAgICAgICAgfSk7XG5cbiAgcHJvY2Vzcy5zdGRpbi5zZXRFbmNvZGluZyhlbmNvZGluZyk7XG5cbiAgcHJvY2Vzcy5zdGRpbi5zZXRSYXdNb2RlKHJhd01vZGUpO1xuXG4gIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGRlc2NyaXB0aW9uKTtcblxuICBpZiAoIWhpZGRlbikge1xuICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKHZhbHVlKTtcbiAgfVxuXG4gIHByb2Nlc3Muc3RkaW4ucmVzdW1lKCk7XG5cbiAgcHJvY2Vzcy5zdGRpbi5vbihldmVudCwgbGlzdGVuZXIpO1xuXG4gIGZ1bmN0aW9uIGxpc3RlbmVyKGNodW5rKSB7XG4gICAgY29uc3QgY2hhcmFjdGVyID0gY2h1bmsudG9TdHJpbmcoZW5jb2RpbmcpO1xuXG4gICAgc3dpdGNoIChjaGFyYWN0ZXIpIHtcbiAgICAgIGNhc2UgTElORV9GRUVEX0NIQVJBQ1RFUiA6XG4gICAgICBjYXNlIENBUlJJQUdFX1JFVFVSTl9DSEFSQUNURVIgOlxuICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShMSU5FX0ZFRURfQ0hBUkFDVEVSKTtcblxuICAgICAgICBwcm9jZXNzLnN0ZGluLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcik7XG5cbiAgICAgICAgcHJvY2Vzcy5zdGRpbi5wYXVzZSgpO1xuXG4gICAgICAgIG9mZkVUWCgpO1xuXG4gICAgICAgIGNhbGxiYWNrKHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgQkFDS1NQQUNFX0NIQVJBQ1RFUiA6XG4gICAgICAgIHZhbHVlID0gdmFsdWUuc2xpY2UoMCwgdmFsdWUubGVuZ3RoIC0gMSk7XG5cbiAgICAgICAgcHJvY2Vzcy5zdGRvdXQuY2xlYXJMaW5lKCk7XG5cbiAgICAgICAgcHJvY2Vzcy5zdGRvdXQuY3Vyc29yVG8oMCk7XG5cbiAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoZGVzY3JpcHRpb24pO1xuXG4gICAgICAgIGlmICghaGlkZGVuKSB7XG4gICAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB2YWx1ZSArPSBjaGFyYWN0ZXI7XG5cbiAgICAgICAgaWYgKCFoaWRkZW4pIHtcbiAgICAgICAgICBwcm9jZXNzLnN0ZG91dC5jbGVhckxpbmUoKTtcblxuICAgICAgICAgIHByb2Nlc3Muc3Rkb3V0LmN1cnNvclRvKDApO1xuXG4gICAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoZGVzY3JpcHRpb24pO1xuXG4gICAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5cbmltcG9ydCB7IGZpcnN0LCBzZWNvbmQgfSBmcm9tIFwiLi4vLi4vdXRpbGl0aWVzL2FycmF5XCI7XG5pbXBvcnQgeyBERUZBVUxUX1JDX0JBU0VfRVhURU5TSU9OIH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgcmVhZEZpbGUsIHdyaXRlRmlsZSwgY2hlY2tGaWxlRXhpc3RzIH0gZnJvbSBcIi4uLy4uL3V0aWxpdGllcy9maWxlU3lzdGVtXCI7XG5cbmxldCBwYXRoUmVzb2x2ZXIgPSBwYXRoLnJlc29sdmUsXG4gICAgYmFzZUV4dGVuc2lvbiA9IERFRkFVTFRfUkNfQkFTRV9FWFRFTlNJT047XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJjKGVudmlyb25tZW50TmFtZU9yQXJndiA9IG51bGwpIHtcbiAgbGV0IGVudmlyb25tZW50LFxuICAgICAgZW52aXJvbm1lbnROYW1lLFxuICAgICAgZW52aXJvbm1lbnROYW1lT3JBcmd2QXJndiA9IChlbnZpcm9ubWVudE5hbWVPckFyZ3YgaW5zdGFuY2VvZiBBcnJheSk7XG5cbiAgaWYgKGVudmlyb25tZW50TmFtZU9yQXJndkFyZ3YpIHtcbiAgICBjb25zdCBhcmd2ID0gZW52aXJvbm1lbnROYW1lT3JBcmd2OyAvLy9cblxuICAgIGVudmlyb25tZW50TmFtZSA9IGVudmlyb25tZW50TmFtZUZyb21Bcmd2KGFyZ3YpO1xuICB9IGVsc2Uge1xuICAgIGVudmlyb25tZW50TmFtZSA9IGVudmlyb25tZW50TmFtZU9yQXJndjsgIC8vL1xuICB9XG5cbiAgY29uc3QganNvbiA9IHJlYWRSQ0ZpbGUoKSxcbiAgICAgICAgeyBlbnZpcm9ubWVudHMgfSA9IGpzb247XG5cbiAgaWYgKGVudmlyb25tZW50TmFtZSA9PT0gbnVsbCkge1xuICAgIGNvbnN0IGZpcnN0RW52aXJvbm1lbnQgPSBmaXJzdChlbnZpcm9ubWVudHMpO1xuXG4gICAgZW52aXJvbm1lbnQgPSBmaXJzdEVudmlyb25tZW50OyAvLy9cbiAgfSBlbHNlIHtcbiAgICBlbnZpcm9ubWVudCA9IGVudmlyb25tZW50cy5maW5kKChlbnZpcm9ubWVudCkgPT4ge1xuICAgICAgY29uc3QgeyBuYW1lIH0gPSBlbnZpcm9ubWVudCxcbiAgICAgICAgICAgIGZvdW5kID0gKG5hbWUgPT09IGVudmlyb25tZW50TmFtZSk7XG5cbiAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZSBlbnZpcm9ubWVudC5uYW1lO1xuXG4gIE9iamVjdC5hc3NpZ24ocmMsIGVudmlyb25tZW50KTtcblxuICByZXR1cm4gZW52aXJvbm1lbnQ7XG59XG5cbmZ1bmN0aW9uIHJlYWRSQ0ZpbGUoKSB7XG4gIGNvbnN0IGFic29sdXRlUkNGaWxlUGF0aCA9IGFic29sdXRlUkNGaWxlUGF0aEZyb21Ob3RoaW5nKCksXG4gICAgICAgIGZpbGVDb250ZW50ID0gcmVhZEZpbGUoYWJzb2x1dGVSQ0ZpbGVQYXRoKSxcbiAgICAgICAganNvbiA9IEpTT04ucGFyc2UoZmlsZUNvbnRlbnQpO1xuXG4gIHJldHVybiBqc29uOyAgICAgIFxufVxuXG5mdW5jdGlvbiB3cml0ZVJDRmlsZShqc29uKSB7XG4gIGNvbnN0IGFic29sdXRlUkNGaWxlUGF0aCA9IGFic29sdXRlUkNGaWxlUGF0aEZyb21Ob3RoaW5nKCksXG4gICAgICAgIGZpbGVDb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoanNvbiwgbnVsbCwgYFxcdGApO1xuXG4gIHdyaXRlRmlsZShhYnNvbHV0ZVJDRmlsZVBhdGgsIGZpbGVDb250ZW50KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlUkNGaWxlKGFkZGVkUHJvcGVydGllcywgLi4uZGVsZXRlZFByb3BlcnR5TmFtZXMpIHtcbiAgbGV0IGpzb24gPSByZWFkUkNGaWxlKCk7XG5cbiAgaWYgKGFkZGVkUHJvcGVydGllcykge1xuICAgIE9iamVjdC5hc3NpZ24oanNvbiwgYWRkZWRQcm9wZXJ0aWVzKTtcbiAgfVxuXG4gIGRlbGV0ZWRQcm9wZXJ0eU5hbWVzLmZvckVhY2goKGRlbGV0ZWRQcm9wZXJ0eU5hbWUpID0+IHtcbiAgICBkZWxldGUganNvbltkZWxldGVkUHJvcGVydHlOYW1lXTtcbiAgfSk7XG5cbiAgd3JpdGVSQ0ZpbGUoanNvbik7ICAgICAgXG59XG5cbmZ1bmN0aW9uIGNoZWNrUkNGaWxlRXhpc3RzKCkge1xuICBjb25zdCBhYnNvbHV0ZVJDRmlsZVBhdGggPSBhYnNvbHV0ZVJDRmlsZVBhdGhGcm9tTm90aGluZygpLFxuICAgICAgICByY0ZpbGVFeGlzdHMgPSBjaGVja0ZpbGVFeGlzdHMoYWJzb2x1dGVSQ0ZpbGVQYXRoKTtcblxuICByZXR1cm4gcmNGaWxlRXhpc3RzO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVWYWN1b3VzUkNGaWxlKCkge1xuICBjb25zdCBqc29uID0ge1xuICAgIFwiZW52aXJvbm1lbnRzXCI6IFtcbiAgICAgIHt9XG4gICAgXVxuICB9O1xuXG4gIHdyaXRlUkNGaWxlKGpzb24pO1xufVxuXG5mdW5jdGlvbiBzZXRSQ0Jhc2VFeHRlbnNpb24ocmNCYXNlRXh0ZW5zaW9uKSB7IGJhc2VFeHRlbnNpb24gPSByY0Jhc2VFeHRlbnNpb247IH1cblxuZnVuY3Rpb24gc2V0UkNQYXRoUmVzb2x2ZXIocmNQYXRoUmVzb2x2ZXIpIHsgcGF0aFJlc29sdmVyID0gcmNQYXRoUmVzb2x2ZXI7IH1cblxuT2JqZWN0LmFzc2lnbihyYywge1xuICByZWFkUkNGaWxlLFxuICB3cml0ZVJDRmlsZSxcbiAgdXBkYXRlUkNGaWxlLFxuICBjaGVja1JDRmlsZUV4aXN0cyxcbiAgY3JlYXRlVmFjdW91c1JDRmlsZSxcbiAgc2V0UkNCYXNlRXh0ZW5zaW9uLFxuICBzZXRSQ1BhdGhSZXNvbHZlclxufSk7XG5cbmZ1bmN0aW9uIGVudmlyb25tZW50TmFtZUZyb21Bcmd2KGFyZ3YpIHtcbiAgbGV0IGVudmlyb25tZW50TmFtZSA9IG51bGw7XG5cbiAgYXJndi5maW5kKChhcmd1bWVudCkgPT4geyAgLy8vXG4gICAgY29uc3QgbWF0Y2hlcyA9IGFyZ3VtZW50Lm1hdGNoKC8tLWVudmlyb25tZW50PSguKykvKSxcbiAgICAgICAgICBmb3VuZCA9IChtYXRjaGVzICE9PSBudWxsKTtcblxuICAgIGlmIChmb3VuZCkge1xuICAgICAgY29uc3Qgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyk7XG5cbiAgICAgIGVudmlyb25tZW50TmFtZSA9IHNlY29uZE1hdGNoO1xuICAgIH1cblxuICAgIHJldHVybiBmb3VuZDtcbiAgfSk7XG5cbiAgcmV0dXJuIGVudmlyb25tZW50TmFtZTtcbn1cblxuZnVuY3Rpb24gYWJzb2x1dGVSQ0ZpbGVQYXRoRnJvbU5vdGhpbmcoKSB7XG4gIGNvbnN0IGZpbGVQYXRoID0gYC4vLiR7YmFzZUV4dGVuc2lvbn1yY2AsXG4gICAgICAgIGFic29sdXRlUkNGaWxlUGF0aCA9IHBhdGhSZXNvbHZlcihmaWxlUGF0aCk7XG5cbiAgcmV0dXJuIGFic29sdXRlUkNGaWxlUGF0aDtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBmaXJzdCwgc2Vjb25kLCBsYXN0IH0gZnJvbSBcIi4uL3V0aWxpdGllcy9hcnJheVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNQYXRoTmFtZShwYXRoKSB7XG4gIHBhdGggPSBwYXRoLnJlcGxhY2UoL15cXC8vLFwiXCIpLnJlcGxhY2UoL1xcLyQvLCBcIlwiKTsgLy8vXG5cbiAgY29uc3QgcGF0aE5hbWUgPSAoL1xcLy8udGVzdChwYXRoKSA9PT0gZmFsc2UpO1xuXG4gIHJldHVybiBwYXRoTmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUGF0aFRvcG1vc3ROYW1lKHBhdGgpIHtcbiAgY29uc3QgcGF0aE5hbWUgPSBpc1BhdGhOYW1lKHBhdGgpLFxuICAgICAgICBwYXRoQWJzb2x1dGVQYXRoID0gaXNQYXRoQWJzb2x1dGVQYXRoKHBhdGgpLFxuICAgICAgICBwYXRoVG9wbW9zdE5hbWUgPSAocGF0aE5hbWUgJiYgcGF0aEFic29sdXRlUGF0aCk7XG5cbiAgcmV0dXJuIHBhdGhUb3Btb3N0TmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUGF0aFJlbGF0aXZlUGF0aChwYXRoKSB7XG4gIGNvbnN0IHBhdGhSZWxhdGl2ZVBhdGggPSAhL15cXC8vLnRlc3QocGF0aCk7XG5cbiAgcmV0dXJuIHBhdGhSZWxhdGl2ZVBhdGg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1BhdGhBYnNvbHV0ZVBhdGgocGF0aCkge1xuICBjb25zdCBwYXRoQWJzb2x1dGVQYXRoID0gL15cXC8vLnRlc3QocGF0aCk7XG5cbiAgcmV0dXJuIHBhdGhBYnNvbHV0ZVBhdGg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1RvcG1vc3ROYW1lSW5BYnNvbHV0ZVBhdGgodG9wbW9zdE5hbWUsIGFic29sdXRlUGF0aCkge1xuICBjb25zdCByZWdFeHAgPSBuZXcgUmVnRXhwKGBeJHt0b3Btb3N0TmFtZX0oPzpcXFxcLy4rKT8kYCksXG4gICAgICAgIHRvcG1vc3ROYW1lSW5BYnNvbHV0ZVBhdGggPSByZWdFeHAudGVzdChhYnNvbHV0ZVBhdGgpO1xuXG4gIHJldHVybiB0b3Btb3N0TmFtZUluQWJzb2x1dGVQYXRoXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lUGF0aHMocGF0aCwgcmVsYXRpdmVQYXRoKSB7XG4gIGxldCBjb21iaW5lZFBhdGggPSBudWxsO1xuXG4gIGNvbnN0IHBhdGhOYW1lcyA9IHBhdGguc3BsaXQoL1xcLy8pLFxuICAgICAgICByZWxhdGl2ZVBhdGhOYW1lcyA9IHJlbGF0aXZlUGF0aC5zcGxpdCgvXFwvLyk7XG5cbiAgbGV0IGxhc3RQYXRoTmFtZSxcbiAgICAgIGZpcnN0UmVsYXRpdmVQYXRoTmFtZSA9IGZpcnN0KHJlbGF0aXZlUGF0aE5hbWVzKTtcblxuICBpZiAoZmlyc3RSZWxhdGl2ZVBhdGhOYW1lID09PSBcIi5cIikge1xuICAgIHJlbGF0aXZlUGF0aE5hbWVzLnNoaWZ0KCk7XG4gIH1cblxuICBmaXJzdFJlbGF0aXZlUGF0aE5hbWUgPSBmaXJzdChyZWxhdGl2ZVBhdGhOYW1lcyk7XG4gIGxhc3RQYXRoTmFtZSA9IGxhc3QocGF0aE5hbWVzKTtcblxuICB3aGlsZSAoKGZpcnN0UmVsYXRpdmVQYXRoTmFtZSA9PT0gXCIuLlwiKSAmJiAobGFzdFBhdGhOYW1lICE9PSB1bmRlZmluZWQpKSB7XG4gICAgcmVsYXRpdmVQYXRoTmFtZXMuc2hpZnQoKTtcbiAgICBwYXRoTmFtZXMucG9wKCk7XG5cbiAgICBmaXJzdFJlbGF0aXZlUGF0aE5hbWUgPSBmaXJzdChyZWxhdGl2ZVBhdGhOYW1lcyk7XG4gICAgbGFzdFBhdGhOYW1lID0gbGFzdChwYXRoTmFtZXMpO1xuICB9XG5cbiAgaWYgKGxhc3RQYXRoTmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc3QgY29tYmluZWRQYXRoTmFtZXMgPSBbXS5jb25jYXQocGF0aE5hbWVzKS5jb25jYXQocmVsYXRpdmVQYXRoTmFtZXMpO1xuXG4gICAgY29tYmluZWRQYXRoID0gY29tYmluZWRQYXRoTmFtZXMuam9pbihcIi9cIik7XG4gIH1cblxuICByZXR1cm4gY29tYmluZWRQYXRoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29uY2F0ZW5hdGVQYXRocyhwYXRoLCByZWxhdGl2ZVBhdGgpIHtcbiAgcGF0aCA9IHBhdGgucmVwbGFjZSgvXFwvJC8sIFwiXCIpOyAgLy8vXG5cbiAgY29uc3QgY29uY2F0ZW5hdGVkUGF0aCA9IGAke3BhdGh9LyR7cmVsYXRpdmVQYXRofWA7XG5cbiAgcmV0dXJuIGNvbmNhdGVuYXRlZFBhdGg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBib3R0b21tb3N0TmFtZUZyb21QYXRoKHBhdGgpIHtcbiAgbGV0IGJvdHRvbW1vc3ROYW1lID0gbnVsbDtcblxuICBjb25zdCBtYXRjaGVzID0gcGF0aC5tYXRjaCgvXi4qXFwvKFteXFwvXStcXC8/KSQvKTtcblxuICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgIGNvbnN0IHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuXG4gICAgYm90dG9tbW9zdE5hbWUgPSBzZWNvbmRNYXRjaDsgIC8vL1xuICB9XG5cbiAgcmV0dXJuIGJvdHRvbW1vc3ROYW1lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9wbW9zdERpcmVjdG9yeVBhdGhGcm9tUGF0aChwYXRoKSB7XG4gIGNvbnN0IG1hdGNoZXMgPSBwYXRoLm1hdGNoKC9eKC4rKVxcL1teXFwvXStcXC8/JC8pLFxuICAgICAgICBzZWNvbmRNYXRjaCA9IHNlY29uZChtYXRjaGVzKSxcbiAgICAgICAgdG9wbW9zdERpcmVjdG9yeVBhdGggPSBzZWNvbmRNYXRjaDsgLy8vXG5cbiAgcmV0dXJuIHRvcG1vc3REaXJlY3RvcnlQYXRoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChwYXRoKSB7XG4gIGxldCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IG51bGw7XG5cbiAgY29uc3QgbWF0Y2hlcyA9IHBhdGgubWF0Y2goL14oW15cXC9dKylcXC8uKyQvKTtcblxuICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgIGNvbnN0IHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuXG4gICAgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSBzZWNvbmRNYXRjaDsgIC8vL1xuICB9XG5cbiAgcmV0dXJuIHRvcG1vc3REaXJlY3RvcnlOYW1lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoKHBhdGgpIHtcbiAgbGV0IHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSBudWxsO1xuXG4gIGNvbnN0IG1hdGNoZXMgPSBwYXRoLm1hdGNoKC9eKC4qKVxcL1teXFwvXStcXC8/JC8pO1xuXG4gIGlmIChtYXRjaGVzICE9PSBudWxsKSB7XG4gICAgY29uc3Qgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyk7XG5cbiAgICBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gc2Vjb25kTWF0Y2g7IC8vL1xuICB9XG5cbiAgcmV0dXJuIHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgocGF0aCkge1xuICBsZXQgcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IG51bGw7XG5cbiAgY29uc3QgbWF0Y2hlcyA9IHBhdGgubWF0Y2goL15bXlxcL10rXFwvKC4rKSQvKTtcblxuICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgIGNvbnN0IHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuXG4gICAgcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHNlY29uZE1hdGNoO1xuICB9XG5cbiAgcmV0dXJuIHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaXNQYXRoTmFtZSxcbiAgaXNQYXRoVG9wbW9zdE5hbWUsXG4gIGlzUGF0aFJlbGF0aXZlUGF0aCxcbiAgaXNQYXRoQWJzb2x1dGVQYXRoLFxuICBpc1RvcG1vc3ROYW1lSW5BYnNvbHV0ZVBhdGgsXG4gIGNvbWJpbmVQYXRocyxcbiAgY29uY2F0ZW5hdGVQYXRocyxcbiAgYm90dG9tbW9zdE5hbWVGcm9tUGF0aCxcbiAgdG9wbW9zdERpcmVjdG9yeVBhdGhGcm9tUGF0aCxcbiAgdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCxcbiAgcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoLFxuICBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGhcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgcmVhZEZpbGUgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2ZpbGVTeXN0ZW1cIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmlsZShmaWxlUGF0aCwgYXJncywgcmVnZXgpIHtcbiAgY29uc3QgY29udGVudCA9IHJlYWRGaWxlKGZpbGVQYXRoKSxcbiAgICAgICAgcGFyc2VkQ29udGVudCA9IHBhcnNlQ29udGVudChjb250ZW50LCBhcmdzLCByZWdleCk7XG5cbiAgcmV0dXJuIHBhcnNlZENvbnRlbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUNvbnRlbnQoY29udGVudCwgYXJncywgcmVnZXgpIHtcbiAgY29uc3QgbGluZXMgPSBjb250ZW50LnNwbGl0KFwiXFxuXCIpLFxuICAgICAgICBwYXJzZWRMaW5lcyA9IHBhcnNlTGluZXMobGluZXMsIGFyZ3MsIHJlZ2V4KSxcbiAgICAgICAgcGFyc2VkQ29udGVudCA9IHBhcnNlZExpbmVzLmpvaW4oXCJcXG5cIik7XG5cbiAgcmV0dXJuIHBhcnNlZENvbnRlbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUxpbmUobGluZSwgYXJncywgcmVnZXggPSAvXFwkeyguKz8pfS9nKSB7XG4gIGNvbnN0IHBhcnNlZExpbmUgPSBsaW5lLnJlcGxhY2UocmVnZXgsIChtYXRjaCwgdG9rZW4pID0+IHtcbiAgICBjb25zdCBwYXJzZWRUb2tlbiA9IHBhcnNlVG9rZW4odG9rZW4sIGFyZ3MpO1xuXG4gICAgcmV0dXJuIHBhcnNlZFRva2VuO1xuICB9KTtcblxuICByZXR1cm4gcGFyc2VkTGluZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBwYXJzZUZpbGUsXG4gIHBhcnNlQ29udGVudCxcbiAgcGFyc2VMaW5lXG59O1xuXG5mdW5jdGlvbiBwYXJzZUxpbmVzKGxpbmVzLCBhcmdzLCByZWdleCkge1xuICBjb25zdCBwYXJzZWRMaW5lcyA9IGxpbmVzLm1hcCgobGluZSkgPT4ge1xuICAgIGNvbnN0IHBhcnNlZExpbmUgPSBwYXJzZUxpbmUobGluZSwgYXJncywgcmVnZXgpO1xuXG4gICAgcmV0dXJuIHBhcnNlZExpbmU7XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWRMaW5lcztcbn1cblxuZnVuY3Rpb24gcGFyc2VUb2tlbih0b2tlbiwgYXJncykge1xuICBsZXQgcGFyc2VkVG9rZW4gPSBcIlwiO1xuXG4gIGlmIChhcmdzLmhhc093blByb3BlcnR5KHRva2VuKSkge1xuICAgIHBhcnNlZFRva2VuID0gYXJnc1t0b2tlbl07XG4gIH1cblxuICByZXR1cm4gcGFyc2VkVG9rZW47XG59XG4iLCIvLyAuZGlybmFtZSwgLmJhc2VuYW1lLCBhbmQgLmV4dG5hbWUgbWV0aG9kcyBhcmUgZXh0cmFjdGVkIGZyb20gTm9kZS5qcyB2OC4xMS4xLFxuLy8gYmFja3BvcnRlZCBhbmQgdHJhbnNwbGl0ZWQgd2l0aCBCYWJlbCwgd2l0aCBiYWNrd2FyZHMtY29tcGF0IGZpeGVzXG5cbi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4vLyByZXNvbHZlcyAuIGFuZCAuLiBlbGVtZW50cyBpbiBhIHBhdGggYXJyYXkgd2l0aCBkaXJlY3RvcnkgbmFtZXMgdGhlcmVcbi8vIG11c3QgYmUgbm8gc2xhc2hlcywgZW1wdHkgZWxlbWVudHMsIG9yIGRldmljZSBuYW1lcyAoYzpcXCkgaW4gdGhlIGFycmF5XG4vLyAoc28gYWxzbyBubyBsZWFkaW5nIGFuZCB0cmFpbGluZyBzbGFzaGVzIC0gaXQgZG9lcyBub3QgZGlzdGluZ3Vpc2hcbi8vIHJlbGF0aXZlIGFuZCBhYnNvbHV0ZSBwYXRocylcbmZ1bmN0aW9uIG5vcm1hbGl6ZUFycmF5KHBhcnRzLCBhbGxvd0Fib3ZlUm9vdCkge1xuICAvLyBpZiB0aGUgcGF0aCB0cmllcyB0byBnbyBhYm92ZSB0aGUgcm9vdCwgYHVwYCBlbmRzIHVwID4gMFxuICB2YXIgdXAgPSAwO1xuICBmb3IgKHZhciBpID0gcGFydHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICB2YXIgbGFzdCA9IHBhcnRzW2ldO1xuICAgIGlmIChsYXN0ID09PSAnLicpIHtcbiAgICAgIHBhcnRzLnNwbGljZShpLCAxKTtcbiAgICB9IGVsc2UgaWYgKGxhc3QgPT09ICcuLicpIHtcbiAgICAgIHBhcnRzLnNwbGljZShpLCAxKTtcbiAgICAgIHVwKys7XG4gICAgfSBlbHNlIGlmICh1cCkge1xuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xuICAgICAgdXAtLTtcbiAgICB9XG4gIH1cblxuICAvLyBpZiB0aGUgcGF0aCBpcyBhbGxvd2VkIHRvIGdvIGFib3ZlIHRoZSByb290LCByZXN0b3JlIGxlYWRpbmcgLi5zXG4gIGlmIChhbGxvd0Fib3ZlUm9vdCkge1xuICAgIGZvciAoOyB1cC0tOyB1cCkge1xuICAgICAgcGFydHMudW5zaGlmdCgnLi4nKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcGFydHM7XG59XG5cbi8vIHBhdGgucmVzb2x2ZShbZnJvbSAuLi5dLCB0bylcbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMucmVzb2x2ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcmVzb2x2ZWRQYXRoID0gJycsXG4gICAgICByZXNvbHZlZEFic29sdXRlID0gZmFsc2U7XG5cbiAgZm9yICh2YXIgaSA9IGFyZ3VtZW50cy5sZW5ndGggLSAxOyBpID49IC0xICYmICFyZXNvbHZlZEFic29sdXRlOyBpLS0pIHtcbiAgICB2YXIgcGF0aCA9IChpID49IDApID8gYXJndW1lbnRzW2ldIDogcHJvY2Vzcy5jd2QoKTtcblxuICAgIC8vIFNraXAgZW1wdHkgYW5kIGludmFsaWQgZW50cmllc1xuICAgIGlmICh0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50cyB0byBwYXRoLnJlc29sdmUgbXVzdCBiZSBzdHJpbmdzJyk7XG4gICAgfSBlbHNlIGlmICghcGF0aCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgcmVzb2x2ZWRQYXRoID0gcGF0aCArICcvJyArIHJlc29sdmVkUGF0aDtcbiAgICByZXNvbHZlZEFic29sdXRlID0gcGF0aC5jaGFyQXQoMCkgPT09ICcvJztcbiAgfVxuXG4gIC8vIEF0IHRoaXMgcG9pbnQgdGhlIHBhdGggc2hvdWxkIGJlIHJlc29sdmVkIHRvIGEgZnVsbCBhYnNvbHV0ZSBwYXRoLCBidXRcbiAgLy8gaGFuZGxlIHJlbGF0aXZlIHBhdGhzIHRvIGJlIHNhZmUgKG1pZ2h0IGhhcHBlbiB3aGVuIHByb2Nlc3MuY3dkKCkgZmFpbHMpXG5cbiAgLy8gTm9ybWFsaXplIHRoZSBwYXRoXG4gIHJlc29sdmVkUGF0aCA9IG5vcm1hbGl6ZUFycmF5KGZpbHRlcihyZXNvbHZlZFBhdGguc3BsaXQoJy8nKSwgZnVuY3Rpb24ocCkge1xuICAgIHJldHVybiAhIXA7XG4gIH0pLCAhcmVzb2x2ZWRBYnNvbHV0ZSkuam9pbignLycpO1xuXG4gIHJldHVybiAoKHJlc29sdmVkQWJzb2x1dGUgPyAnLycgOiAnJykgKyByZXNvbHZlZFBhdGgpIHx8ICcuJztcbn07XG5cbi8vIHBhdGgubm9ybWFsaXplKHBhdGgpXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgdmFyIGlzQWJzb2x1dGUgPSBleHBvcnRzLmlzQWJzb2x1dGUocGF0aCksXG4gICAgICB0cmFpbGluZ1NsYXNoID0gc3Vic3RyKHBhdGgsIC0xKSA9PT0gJy8nO1xuXG4gIC8vIE5vcm1hbGl6ZSB0aGUgcGF0aFxuICBwYXRoID0gbm9ybWFsaXplQXJyYXkoZmlsdGVyKHBhdGguc3BsaXQoJy8nKSwgZnVuY3Rpb24ocCkge1xuICAgIHJldHVybiAhIXA7XG4gIH0pLCAhaXNBYnNvbHV0ZSkuam9pbignLycpO1xuXG4gIGlmICghcGF0aCAmJiAhaXNBYnNvbHV0ZSkge1xuICAgIHBhdGggPSAnLic7XG4gIH1cbiAgaWYgKHBhdGggJiYgdHJhaWxpbmdTbGFzaCkge1xuICAgIHBhdGggKz0gJy8nO1xuICB9XG5cbiAgcmV0dXJuIChpc0Fic29sdXRlID8gJy8nIDogJycpICsgcGF0aDtcbn07XG5cbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMuaXNBYnNvbHV0ZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSAnLyc7XG59O1xuXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLmpvaW4gPSBmdW5jdGlvbigpIHtcbiAgdmFyIHBhdGhzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgcmV0dXJuIGV4cG9ydHMubm9ybWFsaXplKGZpbHRlcihwYXRocywgZnVuY3Rpb24ocCwgaW5kZXgpIHtcbiAgICBpZiAodHlwZW9mIHAgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgdG8gcGF0aC5qb2luIG11c3QgYmUgc3RyaW5ncycpO1xuICAgIH1cbiAgICByZXR1cm4gcDtcbiAgfSkuam9pbignLycpKTtcbn07XG5cblxuLy8gcGF0aC5yZWxhdGl2ZShmcm9tLCB0bylcbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMucmVsYXRpdmUgPSBmdW5jdGlvbihmcm9tLCB0bykge1xuICBmcm9tID0gZXhwb3J0cy5yZXNvbHZlKGZyb20pLnN1YnN0cigxKTtcbiAgdG8gPSBleHBvcnRzLnJlc29sdmUodG8pLnN1YnN0cigxKTtcblxuICBmdW5jdGlvbiB0cmltKGFycikge1xuICAgIHZhciBzdGFydCA9IDA7XG4gICAgZm9yICg7IHN0YXJ0IDwgYXJyLmxlbmd0aDsgc3RhcnQrKykge1xuICAgICAgaWYgKGFycltzdGFydF0gIT09ICcnKSBicmVhaztcbiAgICB9XG5cbiAgICB2YXIgZW5kID0gYXJyLmxlbmd0aCAtIDE7XG4gICAgZm9yICg7IGVuZCA+PSAwOyBlbmQtLSkge1xuICAgICAgaWYgKGFycltlbmRdICE9PSAnJykgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0ID4gZW5kKSByZXR1cm4gW107XG4gICAgcmV0dXJuIGFyci5zbGljZShzdGFydCwgZW5kIC0gc3RhcnQgKyAxKTtcbiAgfVxuXG4gIHZhciBmcm9tUGFydHMgPSB0cmltKGZyb20uc3BsaXQoJy8nKSk7XG4gIHZhciB0b1BhcnRzID0gdHJpbSh0by5zcGxpdCgnLycpKTtcblxuICB2YXIgbGVuZ3RoID0gTWF0aC5taW4oZnJvbVBhcnRzLmxlbmd0aCwgdG9QYXJ0cy5sZW5ndGgpO1xuICB2YXIgc2FtZVBhcnRzTGVuZ3RoID0gbGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGZyb21QYXJ0c1tpXSAhPT0gdG9QYXJ0c1tpXSkge1xuICAgICAgc2FtZVBhcnRzTGVuZ3RoID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHZhciBvdXRwdXRQYXJ0cyA9IFtdO1xuICBmb3IgKHZhciBpID0gc2FtZVBhcnRzTGVuZ3RoOyBpIDwgZnJvbVBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgb3V0cHV0UGFydHMucHVzaCgnLi4nKTtcbiAgfVxuXG4gIG91dHB1dFBhcnRzID0gb3V0cHV0UGFydHMuY29uY2F0KHRvUGFydHMuc2xpY2Uoc2FtZVBhcnRzTGVuZ3RoKSk7XG5cbiAgcmV0dXJuIG91dHB1dFBhcnRzLmpvaW4oJy8nKTtcbn07XG5cbmV4cG9ydHMuc2VwID0gJy8nO1xuZXhwb3J0cy5kZWxpbWl0ZXIgPSAnOic7XG5cbmV4cG9ydHMuZGlybmFtZSA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gIGlmICh0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHBhdGggPSBwYXRoICsgJyc7XG4gIGlmIChwYXRoLmxlbmd0aCA9PT0gMCkgcmV0dXJuICcuJztcbiAgdmFyIGNvZGUgPSBwYXRoLmNoYXJDb2RlQXQoMCk7XG4gIHZhciBoYXNSb290ID0gY29kZSA9PT0gNDcgLyovKi87XG4gIHZhciBlbmQgPSAtMTtcbiAgdmFyIG1hdGNoZWRTbGFzaCA9IHRydWU7XG4gIGZvciAodmFyIGkgPSBwYXRoLmxlbmd0aCAtIDE7IGkgPj0gMTsgLS1pKSB7XG4gICAgY29kZSA9IHBhdGguY2hhckNvZGVBdChpKTtcbiAgICBpZiAoY29kZSA9PT0gNDcgLyovKi8pIHtcbiAgICAgICAgaWYgKCFtYXRjaGVkU2xhc2gpIHtcbiAgICAgICAgICBlbmQgPSBpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgLy8gV2Ugc2F3IHRoZSBmaXJzdCBub24tcGF0aCBzZXBhcmF0b3JcbiAgICAgIG1hdGNoZWRTbGFzaCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGlmIChlbmQgPT09IC0xKSByZXR1cm4gaGFzUm9vdCA/ICcvJyA6ICcuJztcbiAgaWYgKGhhc1Jvb3QgJiYgZW5kID09PSAxKSB7XG4gICAgLy8gcmV0dXJuICcvLyc7XG4gICAgLy8gQmFja3dhcmRzLWNvbXBhdCBmaXg6XG4gICAgcmV0dXJuICcvJztcbiAgfVxuICByZXR1cm4gcGF0aC5zbGljZSgwLCBlbmQpO1xufTtcblxuZnVuY3Rpb24gYmFzZW5hbWUocGF0aCkge1xuICBpZiAodHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSBwYXRoID0gcGF0aCArICcnO1xuXG4gIHZhciBzdGFydCA9IDA7XG4gIHZhciBlbmQgPSAtMTtcbiAgdmFyIG1hdGNoZWRTbGFzaCA9IHRydWU7XG4gIHZhciBpO1xuXG4gIGZvciAoaSA9IHBhdGgubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICBpZiAocGF0aC5jaGFyQ29kZUF0KGkpID09PSA0NyAvKi8qLykge1xuICAgICAgICAvLyBJZiB3ZSByZWFjaGVkIGEgcGF0aCBzZXBhcmF0b3IgdGhhdCB3YXMgbm90IHBhcnQgb2YgYSBzZXQgb2YgcGF0aFxuICAgICAgICAvLyBzZXBhcmF0b3JzIGF0IHRoZSBlbmQgb2YgdGhlIHN0cmluZywgc3RvcCBub3dcbiAgICAgICAgaWYgKCFtYXRjaGVkU2xhc2gpIHtcbiAgICAgICAgICBzdGFydCA9IGkgKyAxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGVuZCA9PT0gLTEpIHtcbiAgICAgIC8vIFdlIHNhdyB0aGUgZmlyc3Qgbm9uLXBhdGggc2VwYXJhdG9yLCBtYXJrIHRoaXMgYXMgdGhlIGVuZCBvZiBvdXJcbiAgICAgIC8vIHBhdGggY29tcG9uZW50XG4gICAgICBtYXRjaGVkU2xhc2ggPSBmYWxzZTtcbiAgICAgIGVuZCA9IGkgKyAxO1xuICAgIH1cbiAgfVxuXG4gIGlmIChlbmQgPT09IC0xKSByZXR1cm4gJyc7XG4gIHJldHVybiBwYXRoLnNsaWNlKHN0YXJ0LCBlbmQpO1xufVxuXG4vLyBVc2VzIGEgbWl4ZWQgYXBwcm9hY2ggZm9yIGJhY2t3YXJkcy1jb21wYXRpYmlsaXR5LCBhcyBleHQgYmVoYXZpb3IgY2hhbmdlZFxuLy8gaW4gbmV3IE5vZGUuanMgdmVyc2lvbnMsIHNvIG9ubHkgYmFzZW5hbWUoKSBhYm92ZSBpcyBiYWNrcG9ydGVkIGhlcmVcbmV4cG9ydHMuYmFzZW5hbWUgPSBmdW5jdGlvbiAocGF0aCwgZXh0KSB7XG4gIHZhciBmID0gYmFzZW5hbWUocGF0aCk7XG4gIGlmIChleHQgJiYgZi5zdWJzdHIoLTEgKiBleHQubGVuZ3RoKSA9PT0gZXh0KSB7XG4gICAgZiA9IGYuc3Vic3RyKDAsIGYubGVuZ3RoIC0gZXh0Lmxlbmd0aCk7XG4gIH1cbiAgcmV0dXJuIGY7XG59O1xuXG5leHBvcnRzLmV4dG5hbWUgPSBmdW5jdGlvbiAocGF0aCkge1xuICBpZiAodHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSBwYXRoID0gcGF0aCArICcnO1xuICB2YXIgc3RhcnREb3QgPSAtMTtcbiAgdmFyIHN0YXJ0UGFydCA9IDA7XG4gIHZhciBlbmQgPSAtMTtcbiAgdmFyIG1hdGNoZWRTbGFzaCA9IHRydWU7XG4gIC8vIFRyYWNrIHRoZSBzdGF0ZSBvZiBjaGFyYWN0ZXJzIChpZiBhbnkpIHdlIHNlZSBiZWZvcmUgb3VyIGZpcnN0IGRvdCBhbmRcbiAgLy8gYWZ0ZXIgYW55IHBhdGggc2VwYXJhdG9yIHdlIGZpbmRcbiAgdmFyIHByZURvdFN0YXRlID0gMDtcbiAgZm9yICh2YXIgaSA9IHBhdGgubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICB2YXIgY29kZSA9IHBhdGguY2hhckNvZGVBdChpKTtcbiAgICBpZiAoY29kZSA9PT0gNDcgLyovKi8pIHtcbiAgICAgICAgLy8gSWYgd2UgcmVhY2hlZCBhIHBhdGggc2VwYXJhdG9yIHRoYXQgd2FzIG5vdCBwYXJ0IG9mIGEgc2V0IG9mIHBhdGhcbiAgICAgICAgLy8gc2VwYXJhdG9ycyBhdCB0aGUgZW5kIG9mIHRoZSBzdHJpbmcsIHN0b3Agbm93XG4gICAgICAgIGlmICghbWF0Y2hlZFNsYXNoKSB7XG4gICAgICAgICAgc3RhcnRQYXJ0ID0gaSArIDE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgaWYgKGVuZCA9PT0gLTEpIHtcbiAgICAgIC8vIFdlIHNhdyB0aGUgZmlyc3Qgbm9uLXBhdGggc2VwYXJhdG9yLCBtYXJrIHRoaXMgYXMgdGhlIGVuZCBvZiBvdXJcbiAgICAgIC8vIGV4dGVuc2lvblxuICAgICAgbWF0Y2hlZFNsYXNoID0gZmFsc2U7XG4gICAgICBlbmQgPSBpICsgMTtcbiAgICB9XG4gICAgaWYgKGNvZGUgPT09IDQ2IC8qLiovKSB7XG4gICAgICAgIC8vIElmIHRoaXMgaXMgb3VyIGZpcnN0IGRvdCwgbWFyayBpdCBhcyB0aGUgc3RhcnQgb2Ygb3VyIGV4dGVuc2lvblxuICAgICAgICBpZiAoc3RhcnREb3QgPT09IC0xKVxuICAgICAgICAgIHN0YXJ0RG90ID0gaTtcbiAgICAgICAgZWxzZSBpZiAocHJlRG90U3RhdGUgIT09IDEpXG4gICAgICAgICAgcHJlRG90U3RhdGUgPSAxO1xuICAgIH0gZWxzZSBpZiAoc3RhcnREb3QgIT09IC0xKSB7XG4gICAgICAvLyBXZSBzYXcgYSBub24tZG90IGFuZCBub24tcGF0aCBzZXBhcmF0b3IgYmVmb3JlIG91ciBkb3QsIHNvIHdlIHNob3VsZFxuICAgICAgLy8gaGF2ZSBhIGdvb2QgY2hhbmNlIGF0IGhhdmluZyBhIG5vbi1lbXB0eSBleHRlbnNpb25cbiAgICAgIHByZURvdFN0YXRlID0gLTE7XG4gICAgfVxuICB9XG5cbiAgaWYgKHN0YXJ0RG90ID09PSAtMSB8fCBlbmQgPT09IC0xIHx8XG4gICAgICAvLyBXZSBzYXcgYSBub24tZG90IGNoYXJhY3RlciBpbW1lZGlhdGVseSBiZWZvcmUgdGhlIGRvdFxuICAgICAgcHJlRG90U3RhdGUgPT09IDAgfHxcbiAgICAgIC8vIFRoZSAocmlnaHQtbW9zdCkgdHJpbW1lZCBwYXRoIGNvbXBvbmVudCBpcyBleGFjdGx5ICcuLidcbiAgICAgIHByZURvdFN0YXRlID09PSAxICYmIHN0YXJ0RG90ID09PSBlbmQgLSAxICYmIHN0YXJ0RG90ID09PSBzdGFydFBhcnQgKyAxKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIHJldHVybiBwYXRoLnNsaWNlKHN0YXJ0RG90LCBlbmQpO1xufTtcblxuZnVuY3Rpb24gZmlsdGVyICh4cywgZikge1xuICAgIGlmICh4cy5maWx0ZXIpIHJldHVybiB4cy5maWx0ZXIoZik7XG4gICAgdmFyIHJlcyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgeHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGYoeHNbaV0sIGksIHhzKSkgcmVzLnB1c2goeHNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xufVxuXG4vLyBTdHJpbmcucHJvdG90eXBlLnN1YnN0ciAtIG5lZ2F0aXZlIGluZGV4IGRvbid0IHdvcmsgaW4gSUU4XG52YXIgc3Vic3RyID0gJ2FiJy5zdWJzdHIoLTEpID09PSAnYidcbiAgICA/IGZ1bmN0aW9uIChzdHIsIHN0YXJ0LCBsZW4pIHsgcmV0dXJuIHN0ci5zdWJzdHIoc3RhcnQsIGxlbikgfVxuICAgIDogZnVuY3Rpb24gKHN0ciwgc3RhcnQsIGxlbikge1xuICAgICAgICBpZiAoc3RhcnQgPCAwKSBzdGFydCA9IHN0ci5sZW5ndGggKyBzdGFydDtcbiAgICAgICAgcmV0dXJuIHN0ci5zdWJzdHIoc3RhcnQsIGxlbik7XG4gICAgfVxuO1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFNjaGVkdWxlcjogcmVxdWlyZSgnLi9saWIvc2NoZWR1bGVyJyksXG4gIGNvbnRyb2xsZXI6IHJlcXVpcmUoJy4vbGliL2NvbnRyb2xsZXInKSxcbiAgU3luY2hyb25vdXNUYXNrOiByZXF1aXJlKCcuL2xpYi90YXNrL3N5bmNocm9ub3VzJyksXG4gIEFzeW5jaHJvbm91c1Rhc2s6IHJlcXVpcmUoJy4vbGliL3Rhc2svYXN5bmNocm9ub3VzJylcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIENvbnRyb2xsZXIge1xuICBhc3NpZ25NZXRob2RzKGNyZWF0ZU1ldGhvZHMsIHNjaGVkdWxlciwgbW9kZWwsIHZpZXcsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIGNvbnN0IG1ldGhvZHMgPSBjcmVhdGVNZXRob2RzKHNjaGVkdWxlciwgbW9kZWwsIHZpZXcsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cyk7XG5cbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIG1ldGhvZHMpO1xuICB9XG59XG5cbmNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQ29udHJvbGxlcigpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnRyb2xsZXI7XG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBuZWNlc3NhcnkgPSByZXF1aXJlKCduZWNlc3NhcnknKTtcclxuXHJcbmNvbnN0IHsgYXJyYXlVdGlsaXRpZXMgfSA9IG5lY2Vzc2FyeSxcclxuICAgICAgeyBmaXJzdCB9ID0gYXJyYXlVdGlsaXRpZXM7XHJcblxyXG5jbGFzcyBRdWV1ZSB7XHJcbiAgY29uc3RydWN0b3IodGFza3MpIHtcclxuICAgIHRoaXMudGFza3MgPSB0YXNrcztcclxuICB9XHJcblxyXG4gIGFkZFRhc2sodGFzaykge1xyXG4gICAgdGhpcy50YXNrcy5wdXNoKHRhc2spO1xyXG4gICAgXHJcbiAgICBjb25zdCB0YXNrc0xlbmd0aCA9IHRoaXMuZ2V0VGFza3NMZW5ndGgoKTtcclxuICAgIFxyXG4gICAgaWYgKHRhc2tzTGVuZ3RoID09PSAxKSB7XHJcbiAgICAgIHRoaXMuZXhlY3V0ZU5leHRUYXNrKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBleGVjdXRlTmV4dFRhc2soKSB7XHJcbiAgICBjb25zdCBmaXJzdFRhc2sgPSBmaXJzdCh0aGlzLnRhc2tzKSxcclxuICAgICAgICAgIG5leHRUYXNrID0gZmlyc3RUYXNrLCAvLy9cclxuICAgICAgICAgIG5leHRUYXNrU3luY2hyb25vdXMgPSBuZXh0VGFzay5pc1N5bmNocm9ub3VzKCk7XHJcbiAgICBcclxuICAgIGlmIChuZXh0VGFza1N5bmNocm9ub3VzKSB7IC8vL1xyXG4gICAgICBjb25zdCBzeW5jaHJvbm91c1Rhc2sgPSBuZXh0VGFzazsgIC8vL1xyXG5cclxuICAgICAgdGhpcy5leGVjdXRlU3luY2hyb25vdXNUYXNrKHN5bmNocm9ub3VzVGFzayk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBhc3luY2hyb25vdXNUYXNrID0gbmV4dFRhc2s7ICAvLy9cclxuXHJcbiAgICAgIHRoaXMuZXhlY3V0ZUFzeW5jaHJvbm91c1Rhc2soYXN5bmNocm9ub3VzVGFzayk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBleGVjdXRlU3luY2hyb25vdXNUYXNrKHN5bmNocm9ub3VzVGFzaykge1xyXG4gICAgc3luY2hyb25vdXNUYXNrLmV4ZWN1dGUoKTtcclxuXHJcbiAgICB0aGlzLm5leHQoKTtcclxuICB9XHJcblxyXG4gIGV4ZWN1dGVBc3luY2hyb25vdXNUYXNrKGFzeW5jaHJvbm91c1Rhc2spIHtcclxuICAgIGFzeW5jaHJvbm91c1Rhc2suZXhlY3V0ZShmdW5jdGlvbigpIHtcclxuICAgICAgY29uc3QgY2FsbGJhY2sgPSBhc3luY2hyb25vdXNUYXNrLmdldENhbGxiYWNrKCk7XHJcbiAgICAgIFxyXG4gICAgICBjYWxsYmFjay5hcHBseShhc3luY2hyb25vdXNUYXNrLCBhcmd1bWVudHMpO1xyXG4gICAgICBcclxuICAgICAgdGhpcy5uZXh0KCk7XHJcbiAgICB9LmJpbmQodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgbmV4dCgpIHtcclxuICAgIHRoaXMudGFza3Muc2hpZnQoKTtcclxuXHJcbiAgICBjb25zdCBlbXB0eSA9IHRoaXMuaXNFbXB0eSgpO1xyXG5cclxuICAgIGlmICghZW1wdHkpIHtcclxuICAgICAgdGhpcy5leGVjdXRlTmV4dFRhc2soKTtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgZ2V0VGFza3NMZW5ndGgoKSB7XHJcbiAgICBjb25zdCB0YXNrc0xlbmd0aCA9IHRoaXMudGFza3MubGVuZ3RoO1xyXG4gICAgXHJcbiAgICByZXR1cm4gdGFza3NMZW5ndGg7XHJcbiAgfVxyXG5cclxuICBpc0VtcHR5KCkge1xyXG4gICAgY29uc3QgdGFza3NMZW5ndGggPSB0aGlzLmdldFRhc2tzTGVuZ3RoKCksXHJcbiAgICAgICAgICBlbXB0eSA9ICh0YXNrc0xlbmd0aCA9PT0gMCk7XHJcblxyXG4gICAgcmV0dXJuIGVtcHR5O1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21Ob3RoaW5nKCkge1xyXG4gICAgY29uc3QgdGFza3MgPSBbXSxcclxuICAgICAgICAgIHF1ZXVlID0gbmV3IFF1ZXVlKHRhc2tzKTtcclxuXHJcbiAgICByZXR1cm4gcXVldWU7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFF1ZXVlO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBRdWV1ZSA9IHJlcXVpcmUoJy4vcXVldWUnKTtcclxuXHJcbmNsYXNzIFNjaGVkdWxlciB7XHJcbiAgY29uc3RydWN0b3IocXVldWUpIHtcclxuICAgIHRoaXMucXVldWUgPSBxdWV1ZTtcclxuICB9XHJcblxyXG4gIGFkZFRhc2tUb1F1ZXVlKHRhc2spIHtcclxuICAgIHRoaXMucXVldWUuYWRkVGFzayh0YXNrKTtcclxuICB9XHJcblxyXG4gIGV4ZWN1dGVUYXNrSW1tZWRpYXRlbHkodGFzaykge1xyXG4gICAgY29uc3QgcXVldWVFbXB0eSA9IHRoaXMucXVldWUuaXNFbXB0eSgpLFxyXG4gICAgICAgICAgc3VjY2Vzc2Z1bCA9IHF1ZXVlRW1wdHk7ICAvL1xyXG5cclxuICAgIGlmIChxdWV1ZUVtcHR5KSB7XHJcbiAgICAgIHRoaXMucXVldWUuYWRkVGFzayh0YXNrKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3VjY2Vzc2Z1bDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tTm90aGluZygpIHtcclxuICAgIGNvbnN0IHF1ZXVlID0gUXVldWUuZnJvbU5vdGhpbmcoKSxcclxuICAgICAgICAgIHNjaGVkdWxlciA9IG5ldyBTY2hlZHVsZXIocXVldWUpO1xyXG5cclxuICAgIHJldHVybiBzY2hlZHVsZXI7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNjaGVkdWxlcjtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY2xhc3MgVGFzayB7XHJcbiAgY29uc3RydWN0b3Ioc3luY2hyb25vdXMsIG1ldGhvZCwgcmVtYWluaW5nQXJndW1lbnRzKSB7XHJcbiAgICB0aGlzLnN5bmNocm9ub3VzID0gc3luY2hyb25vdXM7ICAgIFxyXG4gICAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XHJcbiAgICB0aGlzLnJlbWFpbmluZ0FyZ3VtZW50cyA9IHJlbWFpbmluZ0FyZ3VtZW50czsgICAgXHJcbiAgfVxyXG4gIFxyXG4gIGlzU3luY2hyb25vdXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zeW5jaHJvbm91cztcclxuICB9XHJcbiAgXHJcbiAgZ2V0TWV0aG9kKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubWV0aG9kO1xyXG4gIH1cclxuICBcclxuICBnZXRSZW1haW5pbmdBcmd1bWVudHMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZW1haW5pbmdBcmd1bWVudHM7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFRhc2s7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IFRhc2sgPSByZXF1aXJlKCcuLi90YXNrJyk7XHJcblxyXG5jbGFzcyBBc3luY2hyb25vdXNUYXNrIGV4dGVuZHMgVGFzayB7XHJcbiAgY29uc3RydWN0b3IoYXN5bmNocm9ub3VzTWV0aG9kLCAuLi5yZW1haW5pbmdBcmd1bWVudHNUaGVuQ2FsbGJhY2spIHtcclxuICAgIGNvbnN0IHN5bmNocm9ub3VzID0gZmFsc2UsXHJcbiAgICAgICAgICBtZXRob2QgPSBhc3luY2hyb25vdXNNZXRob2QsICAvLy9cclxuICAgICAgICAgIGNhbGxiYWNrID0gcmVtYWluaW5nQXJndW1lbnRzVGhlbkNhbGxiYWNrLnBvcCgpLCAvLy9cclxuICAgICAgICAgIHJlbWFpbmluZ0FyZ3VtZW50cyA9IHJlbWFpbmluZ0FyZ3VtZW50c1RoZW5DYWxsYmFjazsgIC8vL1xyXG5cclxuICAgIHN1cGVyKHN5bmNocm9ub3VzLCBtZXRob2QsIHJlbWFpbmluZ0FyZ3VtZW50cyk7XHJcblxyXG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gIH1cclxuICBcclxuICBnZXRDYWxsYmFjaygpIHtcclxuICAgIHJldHVybiB0aGlzLmNhbGxiYWNrO1xyXG4gIH1cclxuXHJcbiAgZXhlY3V0ZShjYWxsYmFjaykge1xyXG4gICAgY29uc3QgbWV0aG9kID0gdGhpcy5nZXRNZXRob2QoKSxcclxuICAgICAgICAgIGFzeW5jaHJvbm91c01ldGhvZCA9IG1ldGhvZCwgIC8vL1xyXG4gICAgICAgICAgcmVtYWluaW5nQXJndW1lbnRzID0gdGhpcy5nZXRSZW1haW5pbmdBcmd1bWVudHMoKTtcclxuXHJcbiAgICBhc3luY2hyb25vdXNNZXRob2QuY2FsbChudWxsLCAuLi5yZW1haW5pbmdBcmd1bWVudHMsIGNhbGxiYWNrKTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQXN5bmNocm9ub3VzVGFzaztcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgVGFzayA9IHJlcXVpcmUoJy4uL3Rhc2snKTtcclxuXHJcbmNsYXNzIFN5bmNocm9ub3VzVGFzayBleHRlbmRzIFRhc2sge1xyXG4gIGNvbnN0cnVjdG9yKHN5bmNocm9ub3VzTWV0aG9kLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcclxuICAgIGNvbnN0IHN5bmNocm9ub3VzID0gdHJ1ZSxcclxuICAgICAgICAgIG1ldGhvZCA9IHN5bmNocm9ub3VzTWV0aG9kOyAvLy9cclxuICAgIFxyXG4gICAgc3VwZXIoc3luY2hyb25vdXMsIG1ldGhvZCwgcmVtYWluaW5nQXJndW1lbnRzKTtcclxuICB9XHJcblxyXG4gIGV4ZWN1dGUoKSB7XHJcbiAgICBjb25zdCBtZXRob2QgPSB0aGlzLmdldE1ldGhvZCgpLFxyXG4gICAgICAgICAgc3luY2hyb25vdXNNZXRob2QgPSBtZXRob2QsIC8vL1xyXG4gICAgICAgICAgcmVtYWluaW5nQXJndW1lbnRzID0gdGhpcy5nZXRSZW1haW5pbmdBcmd1bWVudHMoKTtcclxuXHJcbiAgICBzeW5jaHJvbm91c01ldGhvZC5jYWxsKG51bGwsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cyk7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFN5bmNocm9ub3VzVGFzaztcclxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcGF0aFV0aWxpdGllczogcmVxdWlyZSgnLi9saWIvdXRpbGl0aWVzL3BhdGgnKSxcbiAgYXJyYXlVdGlsaXRpZXM6IHJlcXVpcmUoJy4vbGliL3V0aWxpdGllcy9hcnJheScpLFxuICB0ZW1wbGF0ZVV0aWxpdGllczogcmVxdWlyZSgnLi9saWIvdXRpbGl0aWVzL3RlbXBsYXRlJyksXG4gIGZpbGVTeXN0ZW1VdGlsaXRpZXM6IHJlcXVpcmUoJy4vbGliL3V0aWxpdGllcy9maWxlU3lzdGVtJyksXG4gIGFzeW5jaHJvbm91c1V0aWxpdGllczogcmVxdWlyZSgnLi9saWIvdXRpbGl0aWVzL2FzeW5jaHJvbm91cycpLFxuICBtaXNjZWxsYW5lb3VzVXRpbGl0aWVzOiByZXF1aXJlKCcuL2xpYi91dGlsaXRpZXMvbWlzY2VsbGFuZW91cycpXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBmaXJzdChhcnJheSkgeyByZXR1cm4gYXJyYXlbMF07IH1cblxuZnVuY3Rpb24gc2Vjb25kKGFycmF5KSB7IHJldHVybiBhcnJheVsxXTsgfVxuXG5mdW5jdGlvbiB0aGlyZChhcnJheSkgeyByZXR1cm4gYXJyYXlbMl07IH1cblxuZnVuY3Rpb24gZm91cnRoKGFycmF5KSB7IHJldHVybiBhcnJheVszXTsgfVxuXG5mdW5jdGlvbiBmaWZ0aChhcnJheSkgeyByZXR1cm4gYXJyYXlbNF07IH1cblxuZnVuY3Rpb24gZmlmdGhMYXN0KGFycmF5KSB7IHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSA1XTsgfVxuXG5mdW5jdGlvbiBmb3VydGhMYXN0KGFycmF5KSB7IHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSA0XTsgfVxuXG5mdW5jdGlvbiB0aGlyZExhc3QoYXJyYXkpIHsgcmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDNdOyB9XG5cbmZ1bmN0aW9uIHNlY29uZExhc3QoYXJyYXkpIHsgcmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDJdOyB9XG5cbmZ1bmN0aW9uIGxhc3QoYXJyYXkpIHsgcmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdOyB9XG5cbmZ1bmN0aW9uIHRhaWwoYXJyYXkpIHsgcmV0dXJuIGFycmF5LnNsaWNlKDEpOyB9XG5cbmZ1bmN0aW9uIHB1c2goYXJyYXkxLCBhcnJheTIpIHsgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoYXJyYXkxLCBhcnJheTIpOyB9XG5cbmZ1bmN0aW9uIHVuc2hpZnQoYXJyYXkxLCBhcnJheTIpIHsgQXJyYXkucHJvdG90eXBlLnVuc2hpZnQuYXBwbHkoYXJyYXkxLCBhcnJheTIpOyB9XG5cbmZ1bmN0aW9uIGNsZWFyKGFycmF5KSB7XG4gIGNvbnN0IHN0YXJ0ID0gMDtcbiAgXG4gIHJldHVybiBhcnJheS5zcGxpY2Uoc3RhcnQpO1xufVxuXG5mdW5jdGlvbiBjb3B5KGFycmF5MSwgYXJyYXkyKSB7XG4gIGNvbnN0IHN0YXJ0ID0gMCxcbiAgICAgICAgZGVsZXRlQ291bnQgPSBhcnJheTIubGVuZ3RoOyAgLy8vXG4gIFxuICBzcGxpY2UoYXJyYXkxLCBzdGFydCwgZGVsZXRlQ291bnQsIGFycmF5Mik7XG59XG5cbmZ1bmN0aW9uIG1lcmdlKGFycmF5MSwgYXJyYXkyKSB7XG4gIGNvbnN0IHN0YXJ0ID0gYXJyYXkyLmxlbmd0aCwgIC8vL1xuICAgICAgICBkZWxldGVDb3VudCA9IDA7XG5cbiAgc3BsaWNlKGFycmF5MSwgc3RhcnQsIGRlbGV0ZUNvdW50LCBhcnJheTIpO1xufVxuXG5mdW5jdGlvbiBzcGxpY2UoYXJyYXkxLCBzdGFydCwgZGVsZXRlQ291bnQsIGFycmF5MiA9IFtdKSB7XG4gIGNvbnN0IGFyZ3MgPSBbc3RhcnQsIGRlbGV0ZUNvdW50LCAuLi5hcnJheTJdLFxuICAgICAgICBkZWxldGVkSXRlbXNBcnJheSA9IEFycmF5LnByb3RvdHlwZS5zcGxpY2UuYXBwbHkoYXJyYXkxLCBhcmdzKTtcblxuICByZXR1cm4gZGVsZXRlZEl0ZW1zQXJyYXk7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2UoYXJyYXksIGVsZW1lbnQsIHRlc3QpIHtcbiAgbGV0IHN0YXJ0ID0gLTE7XG4gIFxuICBjb25zdCBmb3VuZCA9IGFycmF5LnNvbWUoZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgpIHtcbiAgICBjb25zdCBwYXNzZWQgPSB0ZXN0KGVsZW1lbnQsIGluZGV4KTtcblxuICAgIGlmIChwYXNzZWQpIHtcbiAgICAgIHN0YXJ0ID0gaW5kZXg7ICAvLy9cbiAgICAgIFxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KTtcbiAgXG4gIGlmIChmb3VuZCkge1xuICAgIGNvbnN0IGRlbGV0ZUNvdW50ID0gMTtcblxuICAgIGFycmF5LnNwbGljZShzdGFydCwgZGVsZXRlQ291bnQsIGVsZW1lbnQpO1xuICB9XG5cbiAgcmV0dXJuIGZvdW5kO1xufVxuXG5mdW5jdGlvbiBmaWx0ZXIoYXJyYXksIHRlc3QpIHtcbiAgY29uc3QgZmlsdGVyZWRFbGVtZW50cyA9IFtdO1xuICBcbiAgYmFja3dhcmRzRm9yRWFjaChhcnJheSwgZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgpIHtcbiAgICBjb25zdCBwYXNzZWQgPSB0ZXN0KGVsZW1lbnQsIGluZGV4KTtcblxuICAgIGlmICghcGFzc2VkKSB7XG4gICAgICBjb25zdCBzdGFydCA9IGluZGV4LCAgLy8vXG4gICAgICAgICAgICBkZWxldGVDb3VudCA9IDEsXG4gICAgICAgICAgICBkZWxldGVkRWxlbWVudHMgPSBhcnJheS5zcGxpY2Uoc3RhcnQsIGRlbGV0ZUNvdW50KSxcbiAgICAgICAgICAgIGZpcnN0RGVsZXRlZEVsZW1lbnQgPSBmaXJzdChkZWxldGVkRWxlbWVudHMpO1xuICAgICAgXG4gICAgICBmaWx0ZXJlZEVsZW1lbnRzLnVuc2hpZnQoZmlyc3REZWxldGVkRWxlbWVudCk7ICAvLy9cbiAgICB9XG4gIH0pO1xuICBcbiAgcmV0dXJuIGZpbHRlcmVkRWxlbWVudHM7XG59XG5cbmZ1bmN0aW9uIGZpbmQoYXJyYXksIHRlc3QpIHtcbiAgY29uc3QgZWxlbWVudHMgPSBbXTtcblxuICBmb3J3YXJkc0ZvckVhY2goYXJyYXksIGZ1bmN0aW9uKGVsZW1lbnQsIGluZGV4KSB7XG4gICAgY29uc3QgcGFzc2VkID0gdGVzdChlbGVtZW50LCBpbmRleCk7XG5cbiAgICBpZiAocGFzc2VkKSB7XG4gICAgICBlbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGVsZW1lbnRzO1xufVxuXG5mdW5jdGlvbiBwcnVuZShhcnJheSwgdGVzdCkge1xuICBsZXQgcHJ1bmVkRWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgXG4gIGFycmF5LnNvbWUoZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgpIHtcbiAgICBjb25zdCBwYXNzZWQgPSB0ZXN0KGVsZW1lbnQsIGluZGV4KTtcblxuICAgIGlmIChwYXNzZWQpIHtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gaW5kZXgsICAvLy9cbiAgICAgICAgICAgIGRlbGV0ZUNvdW50ID0gMSxcbiAgICAgICAgICAgIGRlbGV0ZWRFbGVtZW50cyA9IGFycmF5LnNwbGljZShzdGFydCwgZGVsZXRlQ291bnQpLFxuICAgICAgICAgICAgZmlyc3REZWxldGVkRWxlbWVudCA9IGZpcnN0KGRlbGV0ZWRFbGVtZW50cyk7XG4gICAgICBcbiAgICAgIHBydW5lZEVsZW1lbnQgPSBmaXJzdERlbGV0ZWRFbGVtZW50OyAgLy8vXG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSk7XG4gIFxuICByZXR1cm4gcHJ1bmVkRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gcGF0Y2goYXJyYXksIGVsZW1lbnQsIHRlc3QpIHtcbiAgY29uc3QgZm91bmQgPSBhcnJheS5zb21lKGZ1bmN0aW9uKGVsZW1lbnQsIGluZGV4KSB7XG4gICAgY29uc3QgcGFzc2VkID0gdGVzdChlbGVtZW50LCBpbmRleCk7XG5cbiAgICBpZiAocGFzc2VkKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuXG5cbiAgaWYgKGZvdW5kKSB7XG4gICAgYXJyYXkucHVzaChlbGVtZW50KTtcbiAgfVxuXG4gIHJldHVybiBmb3VuZDtcbn1cblxuZnVuY3Rpb24gYXVnbWVudChhcnJheTEsIGFycmF5MiwgdGVzdCkge1xuICBhcnJheTIuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50LCBpbmRleCkge1xuICAgIGNvbnN0IHBhc3NlZCA9IHRlc3QoZWxlbWVudCwgaW5kZXgpO1xuXG4gICAgaWYgKHBhc3NlZCkge1xuICAgICAgYXJyYXkxLnB1c2goZWxlbWVudCk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gc2VwYXJhdGUoYXJyYXksIGFycmF5MSwgYXJyYXkyLCB0ZXN0KSB7XG4gIGFycmF5LmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgpIHtcbiAgICBjb25zdCBwYXNzZWQgPSB0ZXN0KGVsZW1lbnQsIGluZGV4KTtcblxuICAgIHBhc3NlZCA/XG4gICAgICBhcnJheTEucHVzaChlbGVtZW50KSA6XG4gICAgICAgIGFycmF5Mi5wdXNoKGVsZW1lbnQpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZm9yd2FyZHNTb21lKGFycmF5LCBjYWxsYmFjaykge1xuICBjb25zdCBhcnJheUxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgYXJyYXlMZW5ndGg7IGluZGV4KyspIHtcbiAgICBjb25zdCBlbGVtZW50ID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICAgIHJlc3VsdCA9IGNhbGxiYWNrKGVsZW1lbnQsIGluZGV4KTtcbiAgICBcbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGJhY2t3YXJkc1NvbWUoYXJyYXksIGNhbGxiYWNrKSB7XG4gIGNvbnN0IGFycmF5TGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIGZvciAodmFyIGluZGV4ID0gYXJyYXlMZW5ndGggLSAxOyBpbmRleCA+PSAwOyBpbmRleC0tKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgICByZXN1bHQgPSBjYWxsYmFjayhlbGVtZW50LCBpbmRleCk7XG5cbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGZvcndhcmRzRm9yRWFjaChhcnJheSwgY2FsbGJhY2spIHtcbiAgY29uc3QgYXJyYXlMZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGFycmF5TGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGFycmF5W2luZGV4XTtcblxuICAgIGNhbGxiYWNrKGVsZW1lbnQsIGluZGV4KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBiYWNrd2FyZHNGb3JFYWNoKGFycmF5LCBjYWxsYmFjaykge1xuICBjb25zdCBhcnJheUxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICBmb3IgKHZhciBpbmRleCA9IGFycmF5TGVuZ3RoIC0gMTsgaW5kZXggPj0gMDsgaW5kZXgtLSkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBhcnJheVtpbmRleF07XG5cbiAgICBjYWxsYmFjayhlbGVtZW50LCBpbmRleCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGZpcnN0OiBmaXJzdCxcbiAgc2Vjb25kOiBzZWNvbmQsXG4gIHRoaXJkOiB0aGlyZCxcbiAgZm91cnRoOiBmb3VydGgsXG4gIGZpZnRoOiBmaWZ0aCxcbiAgZmlmdGhMYXN0OiBmaWZ0aExhc3QsXG4gIGZvdXJ0aExhc3Q6IGZvdXJ0aExhc3QsXG4gIHRoaXJkTGFzdDogdGhpcmRMYXN0LFxuICBzZWNvbmRMYXN0OiBzZWNvbmRMYXN0LFxuICBsYXN0OiBsYXN0LFxuICB0YWlsOiB0YWlsLFxuICBwdXNoOiBwdXNoLFxuICB1bnNoaWZ0OiB1bnNoaWZ0LFxuICBjbGVhcjogY2xlYXIsXG4gIGNvcHk6IGNvcHksXG4gIG1lcmdlOiBtZXJnZSxcbiAgc3BsaWNlOiBzcGxpY2UsXG4gIHJlcGxhY2U6IHJlcGxhY2UsXG4gIGZpbHRlcjogZmlsdGVyLFxuICBmaW5kOiBmaW5kLFxuICBwcnVuZTogcHJ1bmUsXG4gIHBhdGNoOiBwYXRjaCxcbiAgYXVnbWVudDogYXVnbWVudCxcbiAgc2VwYXJhdGU6IHNlcGFyYXRlLFxuICBmb3J3YXJkc1NvbWU6IGZvcndhcmRzU29tZSxcbiAgYmFja3dhcmRzU29tZTogYmFja3dhcmRzU29tZSxcbiAgZm9yd2FyZHNGb3JFYWNoOiBmb3J3YXJkc0ZvckVhY2gsXG4gIGJhY2t3YXJkc0ZvckVhY2g6IGJhY2t3YXJkc0ZvckVhY2hcbn07XG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5mdW5jdGlvbiB3aGlsc3QoY2FsbGJhY2ssIGRvbmUsIGNvbnRleHQpIHtcclxuICBsZXQgY291bnQgPSAtMTtcclxuXHJcbiAgZnVuY3Rpb24gbmV4dCgpIHtcclxuICAgIGNvdW50Kys7XHJcblxyXG4gICAgY29uc3QgaW5kZXggPSBjb3VudCwgIC8vL1xyXG4gICAgICAgICAgdGVybWluYXRlID0gY2FsbGJhY2sobmV4dCwgZG9uZSwgY29udGV4dCwgaW5kZXgpO1xyXG5cclxuICAgIGlmICh0ZXJtaW5hdGUpIHtcclxuICAgICAgZG9uZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmV4dCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmb3JFYWNoKGFycmF5LCBjYWxsYmFjaywgZG9uZSwgY29udGV4dCkge1xyXG4gIGNvbnN0IGxlbmd0aCA9IGFycmF5Lmxlbmd0aDsgIC8vL1xyXG5cclxuICBsZXQgY291bnQgPSAtMTtcclxuXHJcbiAgZnVuY3Rpb24gbmV4dCgpIHtcclxuICAgIGNvdW50Kys7XHJcblxyXG4gICAgY29uc3QgdGVybWluYXRlID0gKGNvdW50ID09PSBsZW5ndGgpO1xyXG5cclxuICAgIGlmICh0ZXJtaW5hdGUpIHtcclxuICAgICAgZG9uZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgaW5kZXggPSBjb3VudCwgIC8vL1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gYXJyYXlbaW5kZXhdO1xyXG5cclxuICAgICAgY2FsbGJhY2soZWxlbWVudCwgbmV4dCwgZG9uZSwgY29udGV4dCwgaW5kZXgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmV4dCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXF1ZW5jZShjYWxsYmFja3MsIGRvbmUsIGNvbnRleHQpIHtcclxuICBjb25zdCBsZW5ndGggPSBjYWxsYmFja3MubGVuZ3RoOyAgLy8vXHJcblxyXG4gIGxldCBjb3VudCA9IC0xO1xyXG5cclxuICBmdW5jdGlvbiBuZXh0KCkge1xyXG4gICAgY291bnQrKztcclxuXHJcbiAgICBjb25zdCB0ZXJtaW5hdGUgPSAoY291bnQgPT09IGxlbmd0aCk7XHJcblxyXG4gICAgaWYgKHRlcm1pbmF0ZSkge1xyXG4gICAgICBkb25lKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBpbmRleCA9IGNvdW50LCAgLy8vXHJcbiAgICAgICAgICAgIGNhbGxiYWNrID0gY2FsbGJhY2tzW2luZGV4XTtcclxuXHJcbiAgICAgIGNhbGxiYWNrKG5leHQsIGRvbmUsIGNvbnRleHQsIGluZGV4KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5leHQoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZXZlbnR1YWxseShjYWxsYmFja3MsIGRvbmUsIGNvbnRleHQpIHtcclxuICBjb25zdCBsZW5ndGggPSBjYWxsYmFja3MubGVuZ3RoOyAgLy8vXHJcblxyXG4gIGxldCBjb3VudCA9IDA7XHJcblxyXG4gIGZ1bmN0aW9uIG5leHQoKSB7XHJcbiAgICBjb3VudCsrO1xyXG5cclxuICAgIGNvbnN0IHRlcm1pbmF0ZSA9IChjb3VudCA9PT0gbGVuZ3RoKTtcclxuXHJcbiAgICBpZiAodGVybWluYXRlKSB7XHJcbiAgICAgIGRvbmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNhbGxiYWNrcy5mb3JFYWNoKGZ1bmN0aW9uKGNhbGxiYWNrLCBpbmRleCkge1xyXG4gICAgY2FsbGJhY2sobmV4dCwgZG9uZSwgY29udGV4dCwgaW5kZXgpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZXBlYXRlZGx5KGNhbGxiYWNrLCBsZW5ndGgsIGRvbmUsIGNvbnRleHQpIHtcclxuICBsZXQgY291bnQgPSAwO1xyXG5cclxuICBmdW5jdGlvbiBuZXh0KCkge1xyXG4gICAgY291bnQrKztcclxuXHJcbiAgICBjb25zdCB0ZXJtaW5hdGUgPSAoY291bnQgPT09IGxlbmd0aCk7XHJcblxyXG4gICAgaWYgKHRlcm1pbmF0ZSkge1xyXG4gICAgICBkb25lKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICBjYWxsYmFjayhuZXh0LCBkb25lLCBjb250ZXh0LCBpbmRleCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBmb3J3YXJkc0ZvckVhY2goYXJyYXksIGNhbGxiYWNrLCBkb25lLCBjb250ZXh0KSB7XHJcbiAgY29uc3QgbGVuZ3RoID0gYXJyYXkubGVuZ3RoOyAgLy8vXHJcblxyXG4gIGxldCBjb3VudCA9IC0xO1xyXG5cclxuICBmdW5jdGlvbiBuZXh0KCkge1xyXG4gICAgY291bnQrKztcclxuXHJcbiAgICBjb25zdCB0ZXJtaW5hdGUgPSAoY291bnQgPT09IGxlbmd0aCk7XHJcblxyXG4gICAgaWYgKHRlcm1pbmF0ZSkge1xyXG4gICAgICBkb25lKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBpbmRleCA9IGNvdW50LCAgLy8vXHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBhcnJheVtpbmRleF07XHJcblxyXG4gICAgICBjYWxsYmFjayhlbGVtZW50LCBuZXh0LCBkb25lLCBjb250ZXh0LCBpbmRleCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZXh0KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJhY2t3YXJkc0ZvckVhY2goYXJyYXksIGNhbGxiYWNrLCBkb25lLCBjb250ZXh0KSB7XHJcbiAgY29uc3QgbGVuZ3RoID0gYXJyYXkubGVuZ3RoOyAgLy8vXHJcblxyXG4gIGxldCBjb3VudCA9IGxlbmd0aDtcclxuXHJcbiAgZnVuY3Rpb24gbmV4dCgpIHtcclxuICAgIGNvdW50LS07XHJcblxyXG4gICAgY29uc3QgdGVybWluYXRlID0gKGNvdW50ID09PSAtMSk7XHJcblxyXG4gICAgaWYgKHRlcm1pbmF0ZSkge1xyXG4gICAgICBkb25lKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBpbmRleCA9IGNvdW50LCAgLy8vXHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBhcnJheVtpbmRleF07XHJcblxyXG4gICAgICBjYWxsYmFjayhlbGVtZW50LCBuZXh0LCBkb25lLCBjb250ZXh0LCBpbmRleCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZXh0KCk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIHdoaWxzdDogd2hpbHN0LFxyXG4gIGZvckVhY2g6IGZvckVhY2gsXHJcbiAgc2VxdWVuY2U6IHNlcXVlbmNlLFxyXG4gIGV2ZW50dWFsbHk6IGV2ZW50dWFsbHksXHJcbiAgcmVwZWF0ZWRseTogcmVwZWF0ZWRseSxcclxuICBmb3J3YXJkc0ZvckVhY2g6IGZvcndhcmRzRm9yRWFjaCxcclxuICBiYWNrd2FyZHNGb3JFYWNoOiBiYWNrd2FyZHNGb3JFYWNoXHJcbn07XHJcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuXG5mdW5jdGlvbiBlbnRyeUV4aXN0cyhhYnNvbHV0ZVBhdGgpIHtcbiAgcmV0dXJuIGZzLmV4aXN0c1N5bmMoYWJzb2x1dGVQYXRoKTtcbn1cblxuZnVuY3Rpb24gZmlsZUV4aXN0cyhhYnNvbHV0ZUZpbGVQYXRoKSB7XG4gIGxldCBmaWxlRXhpc3RzID0gZmFsc2U7XG4gIFxuICBjb25zdCBhYnNvbHV0ZVBhdGggPSBhYnNvbHV0ZUZpbGVQYXRoLCAvLy9cbiAgICAgICAgZW50cnlFeGlzdHMgPSBlbnRyeUV4aXN0cyhhYnNvbHV0ZVBhdGgpO1xuICBcbiAgaWYgKGVudHJ5RXhpc3RzKSB7XG4gICAgY29uc3QgZW50cnlGaWxlID0gaXNFbnRyeUZpbGUoYWJzb2x1dGVQYXRoKTtcbiAgICBcbiAgICBpZiAoZW50cnlGaWxlKSB7XG4gICAgICBmaWxlRXhpc3RzID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgXG4gIHJldHVybiBmaWxlRXhpc3RzO1xufVxuXG5mdW5jdGlvbiBpc0VudHJ5RmlsZShhYnNvbHV0ZVBhdGgpIHtcbiAgY29uc3Qgc3RhdCA9IGZzLnN0YXRTeW5jKGFic29sdXRlUGF0aCksXG4gICAgICBlbnRyeURpcmVjdG9yeSA9IHN0YXQuaXNEaXJlY3RvcnkoKSxcbiAgICAgIGVudHJ5RmlsZSA9ICFlbnRyeURpcmVjdG9yeTtcblxuICByZXR1cm4gZW50cnlGaWxlO1xufVxuXG5mdW5jdGlvbiBkaXJlY3RvcnlFeGlzdHMoYWJzb2x1dGVEaXJlY3RvcnlQYXRoKSB7XG4gIGxldCBkaXJlY3RvcnlFeGlzdHMgPSBmYWxzZTtcblxuICBjb25zdCBhYnNvbHV0ZVBhdGggPSBhYnNvbHV0ZURpcmVjdG9yeVBhdGgsIC8vL1xuICAgICAgICBlbnRyeUV4aXN0cyA9IGVudHJ5RXhpc3RzKGFic29sdXRlUGF0aCk7XG5cbiAgaWYgKGVudHJ5RXhpc3RzKSB7XG4gICAgY29uc3QgZW50cnlEaXJlY3RvcnkgPSBpc0VudHJ5RGlyZWN0b3J5KGFic29sdXRlUGF0aCk7XG5cbiAgICBpZiAoZW50cnlEaXJlY3RvcnkpIHtcbiAgICAgIGRpcmVjdG9yeUV4aXN0cyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRpcmVjdG9yeUV4aXN0cztcbn1cblxuZnVuY3Rpb24gaXNFbnRyeURpcmVjdG9yeShhYnNvbHV0ZVBhdGgpIHtcbiAgY29uc3Qgc3RhdCA9IGZzLnN0YXRTeW5jKGFic29sdXRlUGF0aCksXG4gICAgICAgIGVudHJ5RGlyZWN0b3J5ID0gc3RhdC5pc0RpcmVjdG9yeSgpO1xuXG4gIHJldHVybiBlbnRyeURpcmVjdG9yeTtcbn1cblxuZnVuY3Rpb24gaXNEaXJlY3RvcnlFbXB0eShhYnNvbHV0ZURpcmVjdG9yeVBhdGgpIHtcbiAgY29uc3Qgc3ViRW50cnlOYW1lcyA9IHJlYWREaXJlY3RvcnkoYWJzb2x1dGVEaXJlY3RvcnlQYXRoKSxcbiAgICAgICAgc3ViRW50cnlOYW1lc0xlbmd0aCA9IHN1YkVudHJ5TmFtZXMubGVuZ3RoLFxuICAgICAgICBkaXJlY3RvcnlFbXB0eSA9IChzdWJFbnRyeU5hbWVzTGVuZ3RoID09PSAwKTtcblxuICByZXR1cm4gZGlyZWN0b3J5RW1wdHk7XG59XG5cbmZ1bmN0aW9uIHJlYWREaXJlY3RvcnkoYWJzb2x1dGVEaXJlY3RvcnlQYXRoKSB7XG4gIGNvbnN0IHN1YkVudHJ5TmFtZXMgPSBmcy5yZWFkZGlyU3luYyhhYnNvbHV0ZURpcmVjdG9yeVBhdGgpO1xuXG4gIHJldHVybiBzdWJFbnRyeU5hbWVzO1xufVxuXG5mdW5jdGlvbiByZWFkRmlsZShhYnNvbHV0ZUZpbGVQYXRoLCBlbmNvZGluZyA9ICd1dGY4Jykge1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgIGVuY29kaW5nOiBlbmNvZGluZ1xuICAgICAgICB9LFxuICAgICAgICBjb250ZW50ID0gZnMucmVhZEZpbGVTeW5jKGFic29sdXRlRmlsZVBhdGgsIG9wdGlvbnMpO1xuXG4gIHJldHVybiBjb250ZW50O1xufVxuXG5mdW5jdGlvbiB3cml0ZUZpbGUoYWJzb2x1dGVGaWxlUGF0aCwgY29udGVudCkge1xuICBmcy53cml0ZUZpbGVTeW5jKGFic29sdXRlRmlsZVBhdGgsIGNvbnRlbnQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZW50cnlFeGlzdHM6IGVudHJ5RXhpc3RzLFxuICBmaWxlRXhpc3RzOiBmaWxlRXhpc3RzLFxuICBpc0VudHJ5RmlsZTogaXNFbnRyeUZpbGUsXG4gIGRpcmVjdG9yeUV4aXN0czogZGlyZWN0b3J5RXhpc3RzLFxuICBpc0VudHJ5RGlyZWN0b3J5OiBpc0VudHJ5RGlyZWN0b3J5LFxuICBpc0RpcmVjdG9yeUVtcHR5OiBpc0RpcmVjdG9yeUVtcHR5LFxuICByZWFkRGlyZWN0b3J5OiByZWFkRGlyZWN0b3J5LFxuICByZWFkRmlsZTogcmVhZEZpbGUsXG4gIHdyaXRlRmlsZTogd3JpdGVGaWxlXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBHRVRfTUVUSE9EID0gJ0dFVCcsXG4gICAgICBQT1NUX01FVEhPRCA9ICdQT1NUJyxcbiAgICAgIEVUWF9DSEFSQUNURVIgPSAnXFx1MDAwMyc7XG5cbmZ1bmN0aW9uIGdldChob3N0LCB1cmksIHBhcmFtZXRlcnMsIGNhbGxiYWNrKSB7XG4gIGlmIChjYWxsYmFjayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY2FsbGJhY2sgPSBwYXJhbWV0ZXJzOyAvLy9cbiAgICBwYXJhbWV0ZXJzID0ge307XG4gIH1cblxuICBjb25zdCBtZXRob2QgPSBHRVRfTUVUSE9ELFxuICAgICAgICBib2R5ID0gdW5kZWZpbmVkO1xuXG4gIHJlcXVlc3QoaG9zdCwgdXJpLCBwYXJhbWV0ZXJzLCBtZXRob2QsIGJvZHksIGNhbGxiYWNrKTtcbn1cblxuZnVuY3Rpb24gcG9zdChob3N0LCB1cmksIGpzb24sIHBhcmFtZXRlcnMsIGNhbGxiYWNrKSB7XG4gIGlmIChjYWxsYmFjayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY2FsbGJhY2sgPSBwYXJhbWV0ZXJzOyAvLy9cbiAgICBwYXJhbWV0ZXJzID0ge307XG4gIH1cblxuICBjb25zdCBtZXRob2QgPSBQT1NUX01FVEhPRCxcbiAgICAgICAgYm9keSA9IEpTT04uc3RyaW5naWZ5KGpzb24pO1xuXG4gIHJlcXVlc3QoaG9zdCwgdXJpLCBwYXJhbWV0ZXJzLCBtZXRob2QsIGJvZHksIGNhbGxiYWNrKTtcbn1cblxuZnVuY3Rpb24gb25FVFgoaGFuZGxlcikge1xuICBjb25zdCB7IHN0ZGluIH0gPSBwcm9jZXNzLFxuICAgICAgICB7IHNldFJhd01vZGUgfSA9IHN0ZGluO1xuXG4gIGlmIChzZXRSYXdNb2RlKSB7XG4gICAgY29uc3QgcmF3TW9kZSA9IHRydWUsXG4gICAgICAgICAgZW5jb2RpbmcgPSAndXRmOCc7XG5cbiAgICBzdGRpbi5zZXRSYXdNb2RlKHJhd01vZGUpO1xuICAgIHN0ZGluLnNldEVuY29kaW5nKGVuY29kaW5nKTtcblxuICAgIHN0ZGluLnJlc3VtZSgpO1xuXG4gICAgc3RkaW4uYWRkTGlzdGVuZXIoJ2RhdGEnLCBkYXRhSGFuZGxlcik7XG5cbiAgICByZXR1cm4gb2ZmRXh0O1xuICB9XG5cbiAgZnVuY3Rpb24gb2ZmRXh0KCkge1xuICAgIHN0ZGluLnJlbW92ZUxpc3RlbmVyKCdkYXRhJywgZGF0YUhhbmRsZXIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGF0YUhhbmRsZXIoY2hhcmFjdGVyKSB7XG4gICAgaWYgKGNoYXJhY3RlciA9PT0gRVRYX0NIQVJBQ1RFUikge1xuICAgICAgaGFuZGxlcigpO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0OiBnZXQsXG4gIHBvc3Q6IHBvc3QsXG4gIG9uRVRYOiBvbkVUWFxufTtcblxuZnVuY3Rpb24gcmVxdWVzdChob3N0LCB1cmksIHBhcmFtZXRlcnMsIG1ldGhvZCwgYm9keSwgY2FsbGJhY2spIHtcbiAgY29uc3QgdXJsID0gdXJsRnJvbUhvc3RVUklBbmRQYXJhbWV0ZXJzKGhvc3QsIHVyaSwgcGFyYW1ldGVycyksXG4gICAgICAgIHhtbEh0dHBSZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgeG1sSHR0cFJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgeyByZWFkeVN0YXRlLCBzdGF0dXMsIHJlc3BvbnNlVGV4dCB9ID0geG1sSHR0cFJlcXVlc3Q7XG5cbiAgICBpZiAocmVhZHlTdGF0ZSA9PSA0KSB7XG4gICAgICBpZiAoc3RhdHVzID09IDIwMCkge1xuICAgICAgICBjb25zdCBqc29uU3RyaW5nID0gcmVzcG9uc2VUZXh0LCAvLy9cbiAgICAgICAgICAgICAganNvbiA9IEpTT04ucGFyc2UoanNvblN0cmluZyk7XG5cbiAgICAgICAgY2FsbGJhY2soanNvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFjayhudWxsKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgeG1sSHR0cFJlcXVlc3Qub3BlbihtZXRob2QsIHVybCwgdHJ1ZSk7XG5cbiAgeG1sSHR0cFJlcXVlc3Quc2VuZChib2R5KTtcbn1cblxuZnVuY3Rpb24gdXJsRnJvbUhvc3RVUklBbmRQYXJhbWV0ZXJzKGhvc3QsIHVyaSwgcGFyYW1ldGVycykge1xuICBjb25zdCBxdWVyeVN0cmluZyA9IHF1ZXJ5U3RyaW5nRnJvbVBhcmFtZXRlcnMocGFyYW1ldGVycyksXG4gICAgICAgIHVybCA9IChxdWVyeVN0cmluZyA9PT0gJycpID9cbiAgICAgICAgICAgICAgICBgJHtob3N0fS8ke3VyaX1gIDpcbiAgICAgICAgICAgICAgICAgIGAke2hvc3R9LyR7dXJpfT8ke3F1ZXJ5U3RyaW5nfWA7XG5cbiAgcmV0dXJuIHVybDtcbn1cblxuZnVuY3Rpb24gcXVlcnlTdHJpbmdGcm9tUGFyYW1ldGVycyhwYXJhbWV0ZXJzKSB7XG4gIGNvbnN0IG5hbWVzID0gT2JqZWN0LmtleXMocGFyYW1ldGVycyksXG4gICAgICAgIG5hbWVzTGVuZ3RoID0gbmFtZXMubGVuZ3RoLFxuICAgICAgICBsYXN0SW5kZXggPSBuYW1lc0xlbmd0aCAtIDEsXG4gICAgICAgIHF1ZXJ5U3RyaW5nID0gbmFtZXMucmVkdWNlKGZ1bmN0aW9uKHF1ZXJ5U3RyaW5nLCBuYW1lLCBpbmRleCkge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gcGFyYW1ldGVyc1tuYW1lXSxcbiAgICAgICAgICAgICAgICBlbmNvZGVkTmFtZSA9IGVuY29kZVVSSUNvbXBvbmVudChuYW1lKSxcbiAgICAgICAgICAgICAgICBlbmNvZGVkVmFsdWUgPSBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpLFxuICAgICAgICAgICAgICAgIGFtcGVyc2FuZE9yTm90aGluZyA9IChpbmRleCAhPT0gbGFzdEluZGV4KSA/ICcmJyA6ICcnO1xuXG4gICAgICAgICAgcXVlcnlTdHJpbmcgKz0gYCR7ZW5jb2RlZE5hbWV9PSR7ZW5jb2RlZFZhbHVlfSR7YW1wZXJzYW5kT3JOb3RoaW5nfWA7XG5cbiAgICAgICAgICByZXR1cm4gcXVlcnlTdHJpbmc7XG4gICAgICAgIH0sICcnKTtcblxuICByZXR1cm4gcXVlcnlTdHJpbmc7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGFycmF5ID0gcmVxdWlyZSgnLi9hcnJheScpO1xuXG5jb25zdCB7IGZpcnN0LCBzZWNvbmQsIGxhc3QgfSA9IGFycmF5O1xuXG5mdW5jdGlvbiBpc1BhdGhSZWxhdGl2ZVBhdGgocGF0aCkge1xuICBjb25zdCBwb3NpdGlvbiA9IHBhdGguc2VhcmNoKC9eXFwuezEsMn1cXC8vKSxcbiAgICAgICAgcGF0aFJlbGF0aXZlUGF0aCA9IChwb3NpdGlvbiAhPT0gLTEpO1xuXG4gIHJldHVybiBwYXRoUmVsYXRpdmVQYXRoO1xufVxuXG5mdW5jdGlvbiBpc1BhdGhBYnNvbHV0ZVBhdGgocGF0aCkge1xuICBjb25zdCBwYXRoUmVsYXRpdmVQYXRoID0gaXNQYXRoUmVsYXRpdmVQYXRoKHBhdGgpLFxuICAgICAgICBwYXRoQWJzb2x1dGVQYXRoID0gIXBhdGhSZWxhdGl2ZVBhdGg7IC8vL1xuXG4gIHJldHVybiBwYXRoQWJzb2x1dGVQYXRoO1xufVxuXG5mdW5jdGlvbiBpc1BhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZShwYXRoKSB7XG4gIGNvbnN0IHBvc2l0aW9uID0gcGF0aC5zZWFyY2goL15bXlxcL10rXFwvPyQvKSxcbiAgICAgICAgcGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lID0gKHBvc2l0aW9uICE9PSAtMSk7XG5cbiAgcmV0dXJuIHBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZTtcbn1cblxuZnVuY3Rpb24gaXNUb3Btb3N0RGlyZWN0b3J5TmFtZUNvbnRhaW5lZEluUGF0aCh0b3Btb3N0RGlyZWN0b3J5TmFtZSwgcGF0aCkge1xuICB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lLnJlcGxhY2UoL1xcLyQvLCAnJyk7IC8vL1xuXG4gIGNvbnN0IHJlZ0V4cCA9IG5ldyBSZWdFeHAoYF4ke3RvcG1vc3REaXJlY3RvcnlOYW1lfSg/OlxcXFwvLispPyRgKSxcbiAgICAgICAgcG9zaXRpb24gPSBwYXRoLnNlYXJjaChyZWdFeHApLFxuICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZUNvbnRhaW5lZEluRmlsZVBhdGggPSAocG9zaXRpb24gIT09IC0xKTtcblxuICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU5hbWVDb250YWluZWRJbkZpbGVQYXRoO1xufVxuXG5mdW5jdGlvbiBjb21iaW5lUGF0aHMoZGlyZWN0b3J5UGF0aCwgcmVsYXRpdmVQYXRoKSB7XG4gIGxldCBhYnNvbHV0ZVBhdGggPSBudWxsO1xuXG4gIGNvbnN0IGRpcmVjdG9yeVBhdGhTdWJFbnRyeU5hbWVzID0gZGlyZWN0b3J5UGF0aC5zcGxpdCgnLycpLFxuICAgICAgICByZWxhdGl2ZUZpbGVQYXRoU3ViRW50cnlOYW1lcyA9IHJlbGF0aXZlUGF0aC5zcGxpdCgnLycpO1xuXG4gIGxldCBmaXJzdFJlbGF0aXZlRmlsZVBhdGhTdWJFbnRyeU5hbWUgPSBmaXJzdChyZWxhdGl2ZUZpbGVQYXRoU3ViRW50cnlOYW1lcyksXG4gICAgICBsYXN0RGlyZWN0b3J5UGF0aFN1YkVudHJ5TmFtZTtcblxuICBpZiAoZmlyc3RSZWxhdGl2ZUZpbGVQYXRoU3ViRW50cnlOYW1lID09PSAnLicpIHtcbiAgICByZWxhdGl2ZUZpbGVQYXRoU3ViRW50cnlOYW1lcy5zaGlmdCgpO1xuICB9XG5cbiAgZmlyc3RSZWxhdGl2ZUZpbGVQYXRoU3ViRW50cnlOYW1lID0gZmlyc3QocmVsYXRpdmVGaWxlUGF0aFN1YkVudHJ5TmFtZXMpO1xuICBsYXN0RGlyZWN0b3J5UGF0aFN1YkVudHJ5TmFtZSA9IGxhc3QoZGlyZWN0b3J5UGF0aFN1YkVudHJ5TmFtZXMpO1xuXG4gIHdoaWxlICgoZmlyc3RSZWxhdGl2ZUZpbGVQYXRoU3ViRW50cnlOYW1lID09PSAnLi4nKSAmJiAobGFzdERpcmVjdG9yeVBhdGhTdWJFbnRyeU5hbWUgIT09IHVuZGVmaW5lZCkpIHtcbiAgICByZWxhdGl2ZUZpbGVQYXRoU3ViRW50cnlOYW1lcy5zaGlmdCgpO1xuICAgIGRpcmVjdG9yeVBhdGhTdWJFbnRyeU5hbWVzLnBvcCgpO1xuXG4gICAgZmlyc3RSZWxhdGl2ZUZpbGVQYXRoU3ViRW50cnlOYW1lID0gZmlyc3QocmVsYXRpdmVGaWxlUGF0aFN1YkVudHJ5TmFtZXMpO1xuICAgIGxhc3REaXJlY3RvcnlQYXRoU3ViRW50cnlOYW1lID0gbGFzdChkaXJlY3RvcnlQYXRoU3ViRW50cnlOYW1lcyk7XG4gIH1cblxuICBpZiAobGFzdERpcmVjdG9yeVBhdGhTdWJFbnRyeU5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IGFic29sdXRlRmlsZVBhdGhTdWJFbnRyeU5hbWVzID0gW10uY29uY2F0KGRpcmVjdG9yeVBhdGhTdWJFbnRyeU5hbWVzKS5jb25jYXQocmVsYXRpdmVGaWxlUGF0aFN1YkVudHJ5TmFtZXMpO1xuXG4gICAgYWJzb2x1dGVQYXRoID0gYWJzb2x1dGVGaWxlUGF0aFN1YkVudHJ5TmFtZXMuam9pbignLycpO1xuICB9XG5cbiAgcmV0dXJuIGFic29sdXRlUGF0aDtcbn1cblxuZnVuY3Rpb24gY29uY2F0ZW5hdGVQYXRocyhwYXRoMSwgcGF0aDIpIHtcbiAgcGF0aDEgPSBwYXRoMS5yZXBsYWNlKC9cXC8kLywgJycpOyAgLy8vXG5cbiAgY29uc3QgY29tYmluZWRQYXRoID0gYCR7cGF0aDF9LyR7cGF0aDJ9YDtcblxuICByZXR1cm4gY29tYmluZWRQYXRoO1xufVxuXG5mdW5jdGlvbiBib3R0b21tb3N0TmFtZUZyb21QYXRoKHBhdGgpIHtcbiAgbGV0IGJvdHRvbW1vc3ROYW1lID0gbnVsbDtcblxuICBjb25zdCBtYXRjaGVzID0gcGF0aC5tYXRjaCgvXi4rXFwvKFteXFwvXStcXC8/KSQvKTtcblxuICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgIGNvbnN0IHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuXG4gICAgYm90dG9tbW9zdE5hbWUgPSBzZWNvbmRNYXRjaDsgIC8vL1xuICB9XG5cbiAgcmV0dXJuIGJvdHRvbW1vc3ROYW1lO1xufVxuXG5mdW5jdGlvbiB0b3Btb3N0RGlyZWN0b3J5UGF0aEZyb21QYXRoKHBhdGgpIHtcbiAgY29uc3QgbWF0Y2hlcyA9IHBhdGgubWF0Y2goL14oLispXFwvW15cXC9dK1xcLz8kLyksXG4gICAgICAgIHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpLFxuICAgICAgICBkaXJlY3RvcnlQYXRoID0gc2Vjb25kTWF0Y2g7IC8vL1xuXG4gIHJldHVybiBkaXJlY3RvcnlQYXRoO1xufVxuXG5mdW5jdGlvbiB0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKHBhdGgpIHtcbiAgbGV0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gbnVsbDtcblxuICBjb25zdCBtYXRjaGVzID0gcGF0aC5tYXRjaCgvXihbXlxcL10rKVxcLy4rJC8pO1xuXG4gIGlmIChtYXRjaGVzICE9PSBudWxsKSB7XG4gICAgY29uc3Qgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyk7XG5cbiAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHNlY29uZE1hdGNoOyAgLy8vXG4gIH1cblxuICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU5hbWU7XG59XG5cbmZ1bmN0aW9uIHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWVGcm9tUGF0aChwYXRoKSB7XG4gIGxldCBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gbnVsbDtcblxuICBjb25zdCBtYXRjaGVzID0gcGF0aC5tYXRjaCgvKF4uKylcXC9bXlxcL10rXFwvPyQvKTtcblxuICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgIGNvbnN0IHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuXG4gICAgcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IHNlY29uZE1hdGNoOyAvLy9cbiAgfVxuXG4gIHJldHVybiBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lO1xufVxuXG5mdW5jdGlvbiBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgocGF0aCkge1xuICBsZXQgcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IG51bGw7XG5cbiAgY29uc3QgbWF0Y2hlcyA9IHBhdGgubWF0Y2goL15bXlxcL10rXFwvKC4rKSQvKTtcblxuICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgIGNvbnN0IHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuXG4gICAgcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHNlY29uZE1hdGNoO1xuICB9XG5cbiAgcmV0dXJuIHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc1BhdGhSZWxhdGl2ZVBhdGg6IGlzUGF0aFJlbGF0aXZlUGF0aCxcbiAgaXNQYXRoQWJzb2x1dGVQYXRoOiBpc1BhdGhBYnNvbHV0ZVBhdGgsXG4gIGlzUGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lOiBpc1BhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSxcbiAgaXNUb3Btb3N0RGlyZWN0b3J5TmFtZUNvbnRhaW5lZEluUGF0aDogaXNUb3Btb3N0RGlyZWN0b3J5TmFtZUNvbnRhaW5lZEluUGF0aCxcbiAgY29tYmluZVBhdGhzOiBjb21iaW5lUGF0aHMsXG4gIGNvbmNhdGVuYXRlUGF0aHM6IGNvbmNhdGVuYXRlUGF0aHMsXG4gIGJvdHRvbW1vc3ROYW1lRnJvbVBhdGg6IGJvdHRvbW1vc3ROYW1lRnJvbVBhdGgsXG4gIHRvcG1vc3REaXJlY3RvcnlQYXRoRnJvbVBhdGg6IHRvcG1vc3REaXJlY3RvcnlQYXRoRnJvbVBhdGgsXG4gIHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGg6IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgsXG4gIHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWVGcm9tUGF0aDogcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoLFxuICBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGg6IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZmlsZVN5c3RlbVV0aWxpdGllcyA9IHJlcXVpcmUoJy4uL3V0aWxpdGllcy9maWxlU3lzdGVtJyk7XG5cbmNvbnN0IHsgcmVhZEZpbGUgfSA9IGZpbGVTeXN0ZW1VdGlsaXRpZXM7XG5cbmZ1bmN0aW9uIHBhcnNlRmlsZShmaWxlUGF0aCwgYXJncykge1xuICBjb25zdCBjb250ZW50ID0gcmVhZEZpbGUoZmlsZVBhdGgpLFxuICAgICAgICBwYXJzZWRDb250ZW50ID0gcGFyc2VDb250ZW50KGNvbnRlbnQsIGFyZ3MpO1xuXG4gIHJldHVybiBwYXJzZWRDb250ZW50O1xufVxuXG5mdW5jdGlvbiBwYXJzZUNvbnRlbnQoY29udGVudCwgYXJncykge1xuICBjb25zdCBsaW5lcyA9IGNvbnRlbnQuc3BsaXQoJ1xcbicpLFxuICAgICAgICBwYXJzZWRMaW5lcyA9IHBhcnNlTGluZXMobGluZXMsIGFyZ3MpLFxuICAgICAgICBwYXJzZWRDb250ZW50ID0gcGFyc2VkTGluZXMuam9pbignXFxuJyk7XG5cbiAgcmV0dXJuIHBhcnNlZENvbnRlbnQ7XG59XG5cbmZ1bmN0aW9uIHBhcnNlTGluZShsaW5lLCBhcmdzKSB7XG4gIGNvbnN0IHBhcnNlZExpbmUgPSBsaW5lLnJlcGxhY2UoL1xcJFxceyguKz8pXFx9L2csIGZ1bmN0aW9uKG1hdGNoLCB0b2tlbikge1xuICAgIGNvbnN0IHBhcnNlZFRva2VuID0gcGFyc2VUb2tlbih0b2tlbiwgYXJncyk7XG5cbiAgICByZXR1cm4gcGFyc2VkVG9rZW47XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWRMaW5lO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcGFyc2VGaWxlOiBwYXJzZUZpbGUsXG4gIHBhcnNlQ29udGVudDogcGFyc2VDb250ZW50LFxuICBwYXJzZUxpbmU6IHBhcnNlTGluZVxufTtcblxuZnVuY3Rpb24gcGFyc2VMaW5lcyhsaW5lcywgYXJncykge1xuICBjb25zdCBwYXJzZWRMaW5lcyA9IGxpbmVzLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgY29uc3QgcGFyc2VkTGluZSA9IHBhcnNlTGluZShsaW5lLCBhcmdzKTtcblxuICAgIHJldHVybiBwYXJzZWRMaW5lO1xuICB9KTtcblxuICByZXR1cm4gcGFyc2VkTGluZXM7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVG9rZW4odG9rZW4sIGFyZ3MpIHtcbiAgbGV0IHBhcnNlZFRva2VuID0gJyc7XG5cbiAgaWYgKGFyZ3MuaGFzT3duUHJvcGVydHkodG9rZW4pKSB7XG4gICAgcGFyc2VkVG9rZW4gPSBhcmdzW3Rva2VuXTtcbiAgfVxuXG4gIHJldHVybiBwYXJzZWRUb2tlbjtcbn1cbiJdfQ==
