"use strict";
exports.__esModule = true;
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var account_1 = require("./handlers/account");
var application_1 = require("./handlers/application");
var course_1 = require("./handlers/course");
var insturctor_1 = require("./handlers/insturctor");
var user_1 = require("./handlers/user");
var video_1 = require("./handlers/video");
var auth_1 = require("./middlewares/auth");
var router = (0, express_1.Router)();
/**
 * Course Routes
 */
router.get('/courses/:instructorId', (0, express_validator_1.param)('instructorId').isInt(), course_1.getCoures); // modify this route
router.post('/course', auth_1.authenticate, (0, express_validator_1.body)('title').isString().notEmpty(), (0, express_validator_1.body)('duration').isFloat().notEmpty(), (0, express_validator_1.body)('desc').isString().notEmpty(), (0, express_validator_1.body)('instructorId').isInt().optional(), course_1.createCourse);
router.get('/course/:id', (0, express_validator_1.param)('id').isInt(), course_1.getCourseById);
router["delete"]('/course/:id', (0, express_validator_1.param)('id').isInt(), course_1.deleteCourseById);
// write the route here
router.put('/course/:id', (0, express_validator_1.param)('id').isInt(), (0, express_validator_1.body)('title').isString().optional(), (0, express_validator_1.body)('duration').isFloat().optional(), (0, express_validator_1.body)('desc').isString().optional(), (0, express_validator_1.body)('instructorId').isInt().optional(), course_1.updateCourse);
/**
 * Instructor Routes
 */
router.post('/instructor', auth_1.authenticate, (0, express_validator_1.body)('name').isString().notEmpty(), (0, express_validator_1.body)('zip').isString().notEmpty(), (0, express_validator_1.body)('country').isString().notEmpty(), (0, express_validator_1.body)('city').isString().notEmpty(), insturctor_1.createInstructor);
router.get('/instructor/:id', (0, express_validator_1.param)('id').isInt(), insturctor_1.getInstructor);
/**
 * Video Routes
 */
router.post('/video', (0, express_validator_1.body)('title').isString().notEmpty(), (0, express_validator_1.body)('desc').isString().notEmpty(), (0, express_validator_1.body)('url').isString().notEmpty(), (0, express_validator_1.body)('hostingProvider').isString().notEmpty(), (0, express_validator_1.body)('key').isString().optional(), (0, express_validator_1.body)('metaData').isString().optional(), video_1.createVideo);
router.get('/videos', video_1.getVideos);
/**
 * User Routes
 */
router.post('/signup', (0, express_validator_1.body)('email').isString().isEmail().notEmpty(), (0, express_validator_1.body)('password').isString().notEmpty(), user_1.signup);
router.post('/signin', (0, express_validator_1.body)('email').isString().isEmail().notEmpty(), (0, express_validator_1.body)('password').isString().notEmpty(), user_1.signin);
router.get('/private', auth_1.authenticate, user_1.privateRoute);
/**
 * Application Route
 */
router.post('/application', application_1.createApplication);
router.get('/sequential', application_1.sequentialQueries);
/**
 * Accounts
 */
router.post('/account', (0, express_validator_1.body)('title').isString().notEmpty(), (0, express_validator_1.body)('balance').isFloat().notEmpty(), account_1.createAccounts);
router.post('/transfer', (0, express_validator_1.body)('sender').isFloat().notEmpty(), (0, express_validator_1.body)('receiver').isFloat().notEmpty(), account_1.transferHandler);
exports["default"] = router;
//# sourceMappingURL=router.js.map