'use strict';

require('juxtapose');

var easy = require('easy');

var model = require('./model'),
    ContentTextarea = require('./example/textarea/content');

var Body = easy.Body,
    initialise = model.initialise,
    update = model.update;


initialise(function () {
  var body = new Body();

  body.append(React.createElement(
    'section',
    null,
    React.createElement(
      'h1',
      null,
      'Concur example'
    ),
    React.createElement(ContentTextarea, { onKeyUp: function onKeyUp() {
        var _this = this;

        var content = this.getContent();

        update(content, function (content) {
          return _this.setContent(content);
        });
      }
    })
  ));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9leGFtcGxlLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJlYXN5IiwibW9kZWwiLCJDb250ZW50VGV4dGFyZWEiLCJCb2R5IiwiaW5pdGlhbGlzZSIsInVwZGF0ZSIsImJvZHkiLCJhcHBlbmQiLCJjb250ZW50IiwiZ2V0Q29udGVudCIsInNldENvbnRlbnQiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBQSxRQUFRLFdBQVI7O0FBRUEsSUFBTUMsT0FBT0QsUUFBUSxNQUFSLENBQWI7O0FBRUEsSUFBTUUsUUFBUUYsUUFBUSxTQUFSLENBQWQ7QUFBQSxJQUNNRyxrQkFBa0JILFFBQVEsNEJBQVIsQ0FEeEI7O0FBR00sSUFBRUksSUFBRixHQUFXSCxJQUFYLENBQUVHLElBQUY7QUFBQSxJQUNFQyxVQURGLEdBQ3lCSCxLQUR6QixDQUNFRyxVQURGO0FBQUEsSUFDY0MsTUFEZCxHQUN5QkosS0FEekIsQ0FDY0ksTUFEZDs7O0FBR05ELFdBQVcsWUFBVztBQUNwQixNQUFNRSxPQUFPLElBQUlILElBQUosRUFBYjs7QUFFQUcsT0FBS0MsTUFBTCxDQUVFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FERjtBQUVFLHdCQUFDLGVBQUQsSUFBaUIsU0FBUyxtQkFBVztBQUFBOztBQUVsQixZQUFNQyxVQUFVLEtBQUtDLFVBQUwsRUFBaEI7O0FBRUFKLGVBQU9HLE9BQVAsRUFBZ0I7QUFBQSxpQkFBVyxNQUFLRSxVQUFMLENBQWdCRixPQUFoQixDQUFYO0FBQUEsU0FBaEI7QUFFRDtBQU5sQjtBQUZGLEdBRkY7QUFlRCxDQWxCRCIsImZpbGUiOiJleGFtcGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5yZXF1aXJlKCdqdXh0YXBvc2UnKTtcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKTtcblxuY29uc3QgbW9kZWwgPSByZXF1aXJlKCcuL21vZGVsJyksXG4gICAgICBDb250ZW50VGV4dGFyZWEgPSByZXF1aXJlKCcuL2V4YW1wbGUvdGV4dGFyZWEvY29udGVudCcpO1xuXG5jb25zdCB7IEJvZHkgfSA9IGVhc3ksXG4gICAgICB7IGluaXRpYWxpc2UsIHVwZGF0ZSB9ID0gbW9kZWw7XG5cbmluaXRpYWxpc2UoZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGJvZHkgPSBuZXcgQm9keSgpO1xuXG4gIGJvZHkuYXBwZW5kKFxuXG4gICAgPHNlY3Rpb24+XG4gICAgICA8aDE+Q29uY3VyIGV4YW1wbGU8L2gxPlxuICAgICAgPENvbnRlbnRUZXh0YXJlYSBvbktleVVwPXtmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZShjb250ZW50LCBjb250ZW50ID0+IHRoaXMuc2V0Q29udGVudChjb250ZW50KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgPC9zZWN0aW9uPlxuXG4gICk7XG59KTtcbiJdfQ==