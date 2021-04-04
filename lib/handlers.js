"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _update = _interopRequireDefault(require("./transaction/update"));
var _initialise = _interopRequireDefault(require("./transaction/initialise"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function createHandler(Transaction) {
    return function(request, response, next) {
        var body = request.body;
        var json = body; ///
        var transaction = Transaction.fromJSON(json);
        json = transaction.toJSON();
        var statusCode = 200, headers = {
            "Content-Type": "application/json; charset=utf-8"
        }, content = JSON.stringify(json);
        response.writeHead(statusCode, headers);
        response.write(content);
        response.end();
    };
}
var updateTransactionHandler = createHandler(_update.default);
var initialiseTransactionHandler = createHandler(_initialise.default);
var _default = {
    updateTransactionHandler: updateTransactionHandler,
    initialiseTransactionHandler: initialiseTransactionHandler
};
exports.default = _default;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9oYW5kbGVycy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmltcG9ydCBVcGRhdGVUcmFuc2FjdGlvbiBmcm9tIFwiLi90cmFuc2FjdGlvbi91cGRhdGVcIjtcclxuaW1wb3J0IEluaXRpYWxpc2VUcmFuc2FjdGlvbiBmcm9tIFwiLi90cmFuc2FjdGlvbi9pbml0aWFsaXNlXCI7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVIYW5kbGVyKFRyYW5zYWN0aW9uKSB7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uKHJlcXVlc3QsIHJlc3BvbnNlLCBuZXh0KSB7XHJcbiAgICBjb25zdCB7IGJvZHkgfSA9IHJlcXVlc3Q7XHJcblxyXG4gICAgbGV0IGpzb24gPSBib2R5OyAgLy8vXHJcblxyXG4gICAgY29uc3QgdHJhbnNhY3Rpb24gPSBUcmFuc2FjdGlvbi5mcm9tSlNPTihqc29uKTtcclxuXHJcbiAgICBqc29uID0gdHJhbnNhY3Rpb24udG9KU09OKCk7XHJcblxyXG4gICAgY29uc3Qgc3RhdHVzQ29kZSA9IDIwMCxcclxuICAgICAgICAgIGhlYWRlcnMgPSB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiIH0sXHJcbiAgICAgICAgICBjb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoanNvbik7XHJcblxyXG4gICAgcmVzcG9uc2Uud3JpdGVIZWFkKHN0YXR1c0NvZGUsIGhlYWRlcnMpO1xyXG5cclxuICAgIHJlc3BvbnNlLndyaXRlKGNvbnRlbnQpO1xyXG5cclxuICAgIHJlc3BvbnNlLmVuZCgpO1xyXG4gIH07XHJcbn1cclxuXHJcbmNvbnN0IHVwZGF0ZVRyYW5zYWN0aW9uSGFuZGxlciA9IGNyZWF0ZUhhbmRsZXIoVXBkYXRlVHJhbnNhY3Rpb24pO1xyXG5jb25zdCBpbml0aWFsaXNlVHJhbnNhY3Rpb25IYW5kbGVyID0gY3JlYXRlSGFuZGxlcihJbml0aWFsaXNlVHJhbnNhY3Rpb24pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHVwZGF0ZVRyYW5zYWN0aW9uSGFuZGxlcixcclxuICBpbml0aWFsaXNlVHJhbnNhY3Rpb25IYW5kbGVyXHJcbn07XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQ0FBQSxVQUFBOzs7OztJQUVBLE9BQUE7SUFDQSxXQUFBOzs7Ozs7U0FFQSxhQUFBLENBQUEsV0FBQTtvQkFDQSxPQUFBLEVBQUEsUUFBQSxFQUFBLElBQUE7WUFDQSxJQUFBLEdBQUEsT0FBQSxDQUFBLElBQUE7WUFFQSxJQUFBLEdBQUEsSUFBQSxDQUFBLENBQUEsRUFBQSxDQUFBO1lBRUEsV0FBQSxHQUFBLFdBQUEsQ0FBQSxRQUFBLENBQUEsSUFBQTtBQUVBLFlBQUEsR0FBQSxXQUFBLENBQUEsTUFBQTtZQUVBLFVBQUEsR0FBQSxHQUFBLEVBQ0EsT0FBQTthQUFBLFlBQUEsSUFBQSwrQkFBQTtXQUNBLE9BQUEsR0FBQSxJQUFBLENBQUEsU0FBQSxDQUFBLElBQUE7QUFFQSxnQkFBQSxDQUFBLFNBQUEsQ0FBQSxVQUFBLEVBQUEsT0FBQTtBQUVBLGdCQUFBLENBQUEsS0FBQSxDQUFBLE9BQUE7QUFFQSxnQkFBQSxDQUFBLEdBQUE7OztJQUlBLHdCQUFBLEdBQUEsYUFBQSxDQXpCQSxPQUFBO0lBMEJBLDRCQUFBLEdBQUEsYUFBQSxDQXpCQSxXQUFBOztBQTRCQSw0QkFBQSxFQUFBLHdCQUFBO0FBQ0EsZ0NBQUEsRUFBQSw0QkFBQSJ9