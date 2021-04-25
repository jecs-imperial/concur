"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = stringCompare;
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
    var codePointA = stringA.codePointAt(0), codePointB = stringB.codePointAt(0);
    if (codePointA < codePointB) {
        return true;
    }
    if (codePointA > codePointB) {
        return false;
    }
    var subStringA = stringA.substring(1), subStringB = stringB.substring(1);
    return stringCompare(subStringA, subStringB);
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zdHJpbmdDb21wYXJlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdHJpbmdDb21wYXJlKHN0cmluZ0EsIHN0cmluZ0IpIHtcbiAgaWYgKChzdHJpbmdBID09PSBcIlwiKSAmJiAoc3RyaW5nQiA9PT0gXCJcIikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoc3RyaW5nQSA9PT0gXCJcIikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKHN0cmluZ0IgPT09IFwiXCIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBjb2RlUG9pbnRBID0gc3RyaW5nQS5jb2RlUG9pbnRBdCgwKSxcbiAgICAgICAgY29kZVBvaW50QiA9IHN0cmluZ0IuY29kZVBvaW50QXQoMCk7XG5cbiAgaWYgKGNvZGVQb2ludEEgPCBjb2RlUG9pbnRCKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAoY29kZVBvaW50QSA+IGNvZGVQb2ludEIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBzdWJTdHJpbmdBID0gc3RyaW5nQS5zdWJzdHJpbmcoMSksXG4gICAgICAgIHN1YlN0cmluZ0IgPSBzdHJpbmdCLnN1YnN0cmluZygxKTtcblxuICByZXR1cm4gc3RyaW5nQ29tcGFyZShzdWJTdHJpbmdBLCBzdWJTdHJpbmdCKTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQ0FBQSxVQUFZOzs7O2tCQUVZLGFBQWE7U0FBYixhQUFhLENBQUMsT0FBTyxFQUFFLE9BQU87UUFDL0MsT0FBTyxXQUFhLE9BQU87ZUFDdkIsS0FBSzs7UUFHVixPQUFPO2VBQ0YsSUFBSTs7UUFHVCxPQUFPO2VBQ0YsS0FBSzs7UUFHUixVQUFVLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQ2xDLFVBQVUsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFcEMsVUFBVSxHQUFHLFVBQVU7ZUFDbEIsSUFBSTs7UUFHVCxVQUFVLEdBQUcsVUFBVTtlQUNsQixLQUFLOztRQUdSLFVBQVUsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsR0FDaEMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztXQUUvQixhQUFhLENBQUMsVUFBVSxFQUFFLFVBQVUifQ==