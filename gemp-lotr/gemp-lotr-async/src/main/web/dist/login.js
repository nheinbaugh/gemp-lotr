/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Login/login.ts":
/*!****************************!*\
  !*** ./src/Login/login.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _services_login_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/login.service */ \"./src/Login/services/login.service.ts\");\n/* harmony import */ var _types_login_response_handlers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types/login-response.handlers */ \"./src/Login/types/login-response.handlers.ts\");\n/* harmony import */ var _types_register_response_handlers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types/register-response-handlers */ \"./src/Login/types/register-response-handlers.ts\");\n/* harmony import */ var _types_validate_registration_functions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types/validate-registration.functions */ \"./src/Login/types/validate-registration.functions.ts\");\n\r\n\r\n\r\n\r\nvar loginService = new _services_login_service__WEBPACK_IMPORTED_MODULE_0__.LogInService(\"/gemp-lotr-server\");\r\nvar getRegistrationValues = function () {\r\n    var userName = $(\"#login\").val().toString();\r\n    var password = $(\"#password\").val().toString();\r\n    var confirmationPassword = $(\"#password2\").val().toString();\r\n    return {\r\n        userName: userName,\r\n        password: password,\r\n        confirmationPassword: confirmationPassword\r\n    };\r\n};\r\nfunction buildRegistrationScreen() {\r\n    function register() {\r\n        var info = getRegistrationValues();\r\n        var isValid = (0,_types_validate_registration_functions__WEBPACK_IMPORTED_MODULE_3__.isValidRegistration)(info);\r\n        if (!isValid) {\r\n            $(\".error\").html(\"Password and Password repeated are different! Try again\");\r\n            return;\r\n        }\r\n        loginService.register(info, _types_register_response_handlers__WEBPACK_IMPORTED_MODULE_2__.handleRegistrationSuccess, _types_register_response_handlers__WEBPACK_IMPORTED_MODULE_2__.handleRegistrationError);\r\n    }\r\n    loginService.getRegistrationForm(function (html) {\r\n        $(\".error\").html();\r\n        $(\".interaction\").html(html);\r\n        $(\"#registerButton\").button().click(register);\r\n    });\r\n}\r\nfunction buildLoginScreen() {\r\n    function login() {\r\n        var login = $(\"#login\").val().toString();\r\n        var password = $(\"#password\").val().toString();\r\n        loginService.login(login, password, _types_login_response_handlers__WEBPACK_IMPORTED_MODULE_1__.onLoginSuccess, _types_login_response_handlers__WEBPACK_IMPORTED_MODULE_1__.onLoginError);\r\n    }\r\n    $(\".interaction\").html(\"\");\r\n    $(\".interaction\").append(\"Login below, or \");\r\n    var registerButton = $(\"<div>Register</div>\").button();\r\n    registerButton.click(buildRegistrationScreen);\r\n    $(\".interaction\").append(registerButton);\r\n    $(\".interaction\").append(\"<br/>Login: <input id='login' type='text'><br/>Password: <input id='password' type='password'><br/>\");\r\n    var loginButton = $(\"<div>Login</div>\").button();\r\n    loginButton.click(login);\r\n    $(\"#password\").keypress(function (e) {\r\n        if (e.code === '13') {\r\n            login();\r\n            e.preventDefault();\r\n            return false;\r\n        }\r\n    });\r\n    $(\".interaction\").append(loginButton);\r\n}\r\n$(document).ready(function () {\r\n    buildLoginScreen();\r\n});\r\n\n\n//# sourceURL=webpack://lotr-gemp-client/./src/Login/login.ts?");

/***/ }),

/***/ "./src/Login/services/login.service.ts":
/*!*********************************************!*\
  !*** ./src/Login/services/login.service.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"LogInService\": () => (/* binding */ LogInService)\n/* harmony export */ });\n/* harmony import */ var _types_ajax_success_callback_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../types/ajax-success-callback.functions */ \"./src/types/ajax-success-callback.functions.ts\");\n/* harmony import */ var _types_http_error_callback_functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../types/http-error-callback.functions */ \"./src/types/http-error-callback.functions.ts\");\n\r\n\r\nvar LogInService = /** @class */ (function () {\r\n    function LogInService(url) {\r\n        this.url = url;\r\n    }\r\n    LogInService.prototype.login = function (login, password, successCallback, errorCallback) {\r\n        $.ajax({\r\n            type: \"POST\",\r\n            url: this.url + \"/login\",\r\n            cache: false,\r\n            async: false,\r\n            data: {\r\n                login: login,\r\n                password: password,\r\n            },\r\n            success: function (res) { return successCallback((0,_types_ajax_success_callback_functions__WEBPACK_IMPORTED_MODULE_0__.convertAjaxResultToSuccess)(res)); },\r\n            error: function (res) { return errorCallback((0,_types_http_error_callback_functions__WEBPACK_IMPORTED_MODULE_1__.convertjQueryErrorToHttpError)(res)); },\r\n            dataType: \"html\"\r\n        });\r\n    };\r\n    LogInService.prototype.register = function (info, successCallback, errorCallback) {\r\n        $.ajax({\r\n            type: \"POST\",\r\n            url: this.url + \"/register\",\r\n            cache: false,\r\n            data: {\r\n                login: info.userName,\r\n                password: info.password,\r\n            },\r\n            success: function (res) { return successCallback((0,_types_ajax_success_callback_functions__WEBPACK_IMPORTED_MODULE_0__.convertAjaxResultToSuccess)(res)); },\r\n            error: function (res) { return errorCallback((0,_types_http_error_callback_functions__WEBPACK_IMPORTED_MODULE_1__.convertjQueryErrorToHttpError)(res)); },\r\n            dataType: \"html\"\r\n        });\r\n    };\r\n    LogInService.prototype.getRegistrationForm = function (callback) {\r\n        $.ajax({\r\n            type: \"POST\",\r\n            url: \"/gemp-lotr/includes/registrationForm.html\",\r\n            cache: false,\r\n            async: false,\r\n            success: callback,\r\n            dataType: \"html\"\r\n        });\r\n    };\r\n    return LogInService;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://lotr-gemp-client/./src/Login/services/login.service.ts?");

/***/ }),

/***/ "./src/Login/types/login-response.handlers.ts":
/*!****************************************************!*\
  !*** ./src/Login/types/login-response.handlers.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"onLoginError\": () => (/* binding */ onLoginError),\n/* harmony export */   \"onLoginSuccess\": () => (/* binding */ onLoginSuccess)\n/* harmony export */ });\nvar onLoginError = function (_a) {\r\n    var statusCode = _a.statusCode;\r\n    switch (statusCode) {\r\n        case \"0\":\r\n            alert(\"Unable to connect to server, either server is down or there is a problem\" +\r\n                \" with your internet connection\");\r\n            break;\r\n        case \"401\":\r\n            $(\".error\").html(\"Invalid username or password. Try again.\");\r\n            // loginScreen();\r\n            break;\r\n        case \"403\":\r\n            $(\".error\").html(\"You have been permanently banned. If you think it was a mistake you can try sending a private message to Merrick_H on <a href='http://lotrtcgwiki.com/forums/'>TLHH forums</a>.\");\r\n            $(\".interaction\").html(\"\");\r\n            break;\r\n        case \"409\":\r\n            $(\".error\").html(\"You have been temporarily banned. You can try logging in at a later time. If you think it was a mistake you can try sending a private message to Merrick_H on <a href='http://lotrtcgwiki.com/forums/'>TLHH forums</a>.\");\r\n            $(\".interaction\").html(\"\");\r\n            break;\r\n        case \"503\":\r\n            $(\".error\").html(\"Server is down for maintenance. Please come at a later time.\");\r\n            break;\r\n        default:\r\n            console.error(\"[login] - unknown login error \".concat(statusCode));\r\n            break;\r\n    }\r\n};\r\nvar onLoginSuccess = function () {\r\n    location.href = \"/gemp-lotr/hall.html\";\r\n};\r\n\n\n//# sourceURL=webpack://lotr-gemp-client/./src/Login/types/login-response.handlers.ts?");

/***/ }),

/***/ "./src/Login/types/register-response-handlers.ts":
/*!*******************************************************!*\
  !*** ./src/Login/types/register-response-handlers.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"handleRegistrationError\": () => (/* binding */ handleRegistrationError),\n/* harmony export */   \"handleRegistrationSuccess\": () => (/* binding */ handleRegistrationSuccess)\n/* harmony export */ });\nvar handleRegistrationError = function (_a) {\r\n    var statusCode = _a.statusCode;\r\n    switch (statusCode) {\r\n        case \"0\":\r\n            alert(\"Unable to connect to server, either server is down or there is a problem with your internet connection\");\r\n            break;\r\n        case \"400\":\r\n            $(\".error\").html(\"Login is invalid. Login must be between 2-10 characters long, and contain only<br/> english letters, numbers or _ (underscore) and - (dash) characters.\");\r\n            break;\r\n        case \"409\":\r\n            $(\".error\").html(\"User with this login already exists in the system. Try a different one.\");\r\n            break;\r\n        case \"503\":\r\n            $(\".error\").html(\"Server is down for maintenance. Please come at a later time.\");\r\n            break;\r\n        default:\r\n            console.error(\"[login] - unknown login error \".concat(statusCode));\r\n            break;\r\n    }\r\n};\r\nvar handleRegistrationSuccess = function () {\r\n    location.href = \"/gemp-lotr/hall.html\";\r\n};\r\n\n\n//# sourceURL=webpack://lotr-gemp-client/./src/Login/types/register-response-handlers.ts?");

/***/ }),

/***/ "./src/Login/types/validate-registration.functions.ts":
/*!************************************************************!*\
  !*** ./src/Login/types/validate-registration.functions.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"isValidRegistration\": () => (/* binding */ isValidRegistration)\n/* harmony export */ });\nvar isValidRegistration = function (info) {\r\n    return info.password === info.confirmationPassword;\r\n};\r\n\n\n//# sourceURL=webpack://lotr-gemp-client/./src/Login/types/validate-registration.functions.ts?");

/***/ }),

/***/ "./src/types/ajax-success-callback.functions.ts":
/*!******************************************************!*\
  !*** ./src/types/ajax-success-callback.functions.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"convertAjaxResultToSuccess\": () => (/* binding */ convertAjaxResultToSuccess)\n/* harmony export */ });\nvar convertAjaxResultToSuccess = function (input) {\r\n    return {\r\n        data: input\r\n    };\r\n};\r\n\n\n//# sourceURL=webpack://lotr-gemp-client/./src/types/ajax-success-callback.functions.ts?");

/***/ }),

/***/ "./src/types/http-error-callback.functions.ts":
/*!****************************************************!*\
  !*** ./src/types/http-error-callback.functions.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"convertjQueryErrorToHttpError\": () => (/* binding */ convertjQueryErrorToHttpError)\n/* harmony export */ });\nvar convertjQueryErrorToHttpError = function (_a) {\r\n    var status = _a.status;\r\n    // presumably other stuff has data it passes back. Who knows.\r\n    return {\r\n        statusCode: status.toString()\r\n    };\r\n};\r\n\n\n//# sourceURL=webpack://lotr-gemp-client/./src/types/http-error-callback.functions.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/Login/login.ts");
/******/ 	
/******/ })()
;