"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.updateCourse = exports.deleteCourseById = exports.getCourseById = exports.createCourse = exports.getCoures = void 0;
var express_validator_1 = require("express-validator");
var db_1 = __importDefault(require("../db"));
var prisma_pagination_1 = require("prisma-pagination");
// I would like to display 5 courses per page
var paginate = (0, prisma_pagination_1.createPaginator)({});
var getCoures = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                }
                return [4 /*yield*/, paginate(db_1["default"].course, {
                        where: {
                            // title: {
                            //     contains: 'Nodejs'
                            // }
                            instructorId: +req.params.instructorId
                        },
                        include: {
                            Instructor: true
                        },
                        orderBy: {
                            id: 'desc'
                        }
                    }, {
                        page: +req.query.page,
                        perPage: req.query.perPage
                    })
                    // const courses = await prisma.course.findMany({
                    //     where: {
                    //         instructorId: +req.params.instructorId
                    //     },
                    //     include: {
                    //         Instructor: true
                    //     }
                    // });
                ];
            case 1:
                results = _a.sent();
                // const courses = await prisma.course.findMany({
                //     where: {
                //         instructorId: +req.params.instructorId
                //     },
                //     include: {
                //         Instructor: true
                //     }
                // });
                res.status(200).json(results);
                return [2 /*return*/];
        }
    });
}); };
exports.getCoures = getCoures;
var createCourse = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, course;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                }
                return [4 /*yield*/, db_1["default"].course.create({
                        data: {
                            title: req.body.title,
                            desc: req.body.desc,
                            duration: req.body.duration,
                            instructorId: req.body.instructorId
                        }
                    })];
            case 1:
                course = _a.sent();
                return [2 /*return*/, res.status(201).json(course)];
        }
    });
}); };
exports.createCourse = createCourse;
var getCourseById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, course;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                }
                return [4 /*yield*/, db_1["default"].course.findUnique({ where: { id: +req.params.id } })];
            case 1:
                course = _a.sent();
                if (!course) {
                    return [2 /*return*/, res.status(404).json({ err: 'could not find course' })];
                }
                return [2 /*return*/, res.status(200).json(course)];
        }
    });
}); };
exports.getCourseById = getCourseById;
var deleteCourseById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, course, deletedCourse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                }
                return [4 /*yield*/, db_1["default"].course.findUnique({ where: { id: +req.params.id } })];
            case 1:
                course = _a.sent();
                if (!course) {
                    return [2 /*return*/, res.status(404).json({ err: 'could not find course' })];
                }
                return [4 /*yield*/, db_1["default"].course["delete"]({
                        where: {
                            id: parseInt(req.params.id)
                        }
                    })];
            case 2:
                deletedCourse = _a.sent();
                return [2 /*return*/, res.status(200).json(deletedCourse)];
        }
    });
}); };
exports.deleteCourseById = deleteCourseById;
// write the handler function
var updateCourse = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, course, updatedCourse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                }
                return [4 /*yield*/, db_1["default"].course.findUnique({ where: { id: +req.params.id } })];
            case 1:
                course = _a.sent();
                if (!course) {
                    return [2 /*return*/, res.status(404).json({ err: 'could not find course' })];
                }
                return [4 /*yield*/, db_1["default"].course.update({
                        where: {
                            id: parseInt(req.params.id)
                        },
                        data: req.body
                    })];
            case 2:
                updatedCourse = _a.sent();
                return [2 /*return*/, res.status(200).json(updatedCourse)];
        }
    });
}); };
exports.updateCourse = updateCourse;
//# sourceMappingURL=course.js.map