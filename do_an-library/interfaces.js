"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LangVersion = exports.OtpPurpose = exports.SplitType = exports.RecordFetchingType = exports.FetchingType = exports.Category = exports.Skill = exports.QuizType = exports.InvitationStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "Qu\u1EA3n tr\u1ECB vi\u00EAn";
    UserRole["SYS_ADMIN"] = "Qu\u1EA3n tr\u1ECB vi\u00EAn h\u1EC7 th\u1ED1ng";
    UserRole["EXAM_ADMIN"] = "Qu\u1EA3n tr\u1ECB vi\u00EAn \u0111\u1EC1 thi";
    UserRole["STUDENT"] = "H\u1ECDc vi\u00EAn";
    UserRole["PAID_USER"] = "Ng\u01B0\u1EDDi d\u00F9ng c\u00F3 tr\u1EA3 ph\u00ED";
    UserRole["NONPAID_USER"] = "Ng\u01B0\u1EDDi d\u00F9ng kh\u00F4ng tr\u1EA3 ph\u00ED";
})(UserRole || (exports.UserRole = UserRole = {}));
var InvitationStatus;
(function (InvitationStatus) {
    InvitationStatus["PENDING"] = "Ch\u01B0a ph\u1EA3n h\u1ED3i";
    InvitationStatus["ACCEPT"] = "Ch\u1EA5p nh\u1EADn";
    InvitationStatus["DECLINE"] = "T\u1EEB ch\u1ED1i";
})(InvitationStatus || (exports.InvitationStatus = InvitationStatus = {}));
// Quiz Interface
var QuizType;
(function (QuizType) {
    QuizType["MULTIPLE_CHOICE"] = "MULTIPLE CHOICE";
    QuizType["FILLING"] = "FILLING";
})(QuizType || (exports.QuizType = QuizType = {}));
var Skill;
(function (Skill) {
    Skill["READING"] = "READING";
    Skill["LISTENING"] = "LISTENING";
    Skill["WRITING"] = "WRITING";
    Skill["SPEAKING"] = "SPEAKING";
})(Skill || (exports.Skill = Skill = {}));
;
var Category;
(function (Category) {
    Category["THPTQG"] = "THPTQG";
    Category["IELTS"] = "IELTS";
    Category["HSK"] = "HSK";
})(Category || (exports.Category = Category = {}));
var FetchingType;
(function (FetchingType) {
    FetchingType["FULL"] = "full";
    FetchingType["AUTO"] = "auto";
})(FetchingType || (exports.FetchingType = FetchingType = {}));
var RecordFetchingType;
(function (RecordFetchingType) {
    RecordFetchingType["FULL"] = "full";
    RecordFetchingType["DEFAULT"] = "default";
})(RecordFetchingType || (exports.RecordFetchingType = RecordFetchingType = {}));
var SplitType;
(function (SplitType) {
    SplitType["QUIZ_LEVEL"] = "QUIZ_LEVEL";
    SplitType["GROUP_LEVEL"] = "GROUP_LEVEL";
})(SplitType || (exports.SplitType = SplitType = {}));
var OtpPurpose;
(function (OtpPurpose) {
    OtpPurpose["CREATE_ACCOUNT"] = "CREATE_ACCOUNT";
    OtpPurpose["RESET_PASSWORD"] = "RESET_PASSWORD";
})(OtpPurpose || (exports.OtpPurpose = OtpPurpose = {}));
var LangVersion;
(function (LangVersion) {
    LangVersion["en"] = "en";
    LangVersion["vi"] = "vi";
})(LangVersion || (exports.LangVersion = LangVersion = {}));
