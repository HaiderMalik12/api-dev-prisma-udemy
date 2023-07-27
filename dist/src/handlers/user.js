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
exports.privateRoute = exports.signin = exports.signup = void 0;
var express_validator_1 = require("express-validator");
var db_1 = __importDefault(require("../db"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var signup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, salt, hash, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                }
                salt = bcrypt_1["default"].genSaltSync(10);
                hash = bcrypt_1["default"].hashSync(req.body.password, salt);
                return [4 /*yield*/, db_1["default"].user.create({
                        data: {
                            email: req.body.email,
                            password: hash
                        }
                    })];
            case 1:
                user = _a.sent();
                res.status(201).json({ msg: 'Signup successful!' });
                return [2 /*return*/];
        }
    });
}); };
exports.signup = signup;
var signin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, user, matched, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                }
                return [4 /*yield*/, db_1["default"].user.findUnique({ where: { email: req.body.email } })];
            case 1:
                user = _a.sent();
                // if there is no user then send the error with 401 status code
                if (!user) {
                    return [2 /*return*/, res.status(401).json({ msg: 'Unauthorized' })];
                }
                matched = bcrypt_1["default"].compareSync(req.body.password, user.password);
                // you can use the compare method from bcyrpt
                // if password matched then
                if (matched) {
                    token = jsonwebtoken_1["default"].sign({ id: user.id }, process.env.WEB_TOKEN_SECRET, { expiresIn: '2d' });
                    return [2 /*return*/, res.status(200).json({ token: token })];
                }
                return [2 /*return*/, res.status(401).json({ msg: 'UnAuthorized: Invalid Email or password' })];
        }
    });
}); };
exports.signin = signin;
/**
 * Only authenticated user can see this route or access this route
 * @param req
 * @param res
 */
var privateRoute = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // privat route implementation
        console.log(req.user);
        return [2 /*return*/, res.json({ msg: 'I am in authenticated route' })];
    });
}); };
exports.privateRoute = privateRoute;
//# sourceMappingURL=user.js.map