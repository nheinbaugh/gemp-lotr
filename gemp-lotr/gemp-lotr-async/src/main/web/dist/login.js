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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _temp_updated_communication_login_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../temp-updated/communication/login.service */ \"./src/temp-updated/communication/login.service.ts\");\n\r\nvar loginService = new _temp_updated_communication_login_service__WEBPACK_IMPORTED_MODULE_0__.LogInService(\"/gemp-lotr-server\");\r\nfunction register() {\r\n    var login = $(\"#login\").val().toString();\r\n    var password = $(\"#password\").val().toString();\r\n    var password2 = $(\"#password2\").val().toString();\r\n    if (password !== password2) {\r\n        $(\".error\").html(\"Password and Password repeated are different! Try again\");\r\n    }\r\n    else {\r\n        loginService.register(login.toString(), password.toString(), function () {\r\n            location.href = \"/gemp-lotr/hall.html\";\r\n        });\r\n    }\r\n}\r\nfunction registrationScreen() {\r\n    loginService.getRegistrationForm(function (html) {\r\n        $(\".error\").html();\r\n        $(\".interaction\").html(html);\r\n        $(\"#registerButton\").button().click(register);\r\n    });\r\n}\r\nfunction login() {\r\n    var login = $(\"#login\").val().toString();\r\n    var password = $(\"#password\").val().toString();\r\n    loginService.login(login, password, function () {\r\n        location.href = \"/gemp-lotr/hall.html\";\r\n    });\r\n}\r\nfunction loginScreen() {\r\n    $(\".interaction\").html(\"\");\r\n    $(\".interaction\").append(\"Login below, or \");\r\n    var registerButton = $(\"<div>Register</div>\").button();\r\n    registerButton.click(registrationScreen);\r\n    $(\".interaction\").append(registerButton);\r\n    $(\".interaction\").append(\"<br/>Login: <input id='login' type='text'><br/>Password: <input id='password' type='password'><br/>\");\r\n    var loginButton = $(\"<div>Login</div>\").button();\r\n    loginButton.click(login);\r\n    $(\"#password\").keypress(function (e) {\r\n        if (e.code === '13') {\r\n            login();\r\n            e.preventDefault();\r\n            return false;\r\n        }\r\n    });\r\n    $(\".interaction\").append(loginButton);\r\n}\r\n$(document).ready(function () {\r\n    loginScreen();\r\n});\r\n\n\n//# sourceURL=webpack://lotr-gemp-client/./src/Login/login.ts?");

/***/ }),

/***/ "./src/temp-updated/communication/login.service.ts":
/*!*********************************************************!*\
  !*** ./src/temp-updated/communication/login.service.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"LogInService\": () => (/* binding */ LogInService)\n/* harmony export */ });\nvar LogInService = /** @class */ (function () {\r\n    function LogInService(url) {\r\n        this.url = url;\r\n    }\r\n    LogInService.prototype.login = function (login, password, callback) {\r\n        $.ajax({\r\n            type: \"POST\",\r\n            url: this.url + \"/login\",\r\n            cache: false,\r\n            async: false,\r\n            data: {\r\n                login: login,\r\n                password: password,\r\n            },\r\n            success: callback,\r\n            dataType: \"html\"\r\n        });\r\n    };\r\n    LogInService.prototype.register = function (login, password, callback) {\r\n        $.ajax({\r\n            type: \"POST\",\r\n            url: this.url + \"/register\",\r\n            cache: false,\r\n            data: {\r\n                login: login,\r\n                password: password,\r\n            },\r\n            success: callback,\r\n            error: (function (xhr) {\r\n                var status = xhr.status.toString();\r\n                if (status === \"0\") {\r\n                    alert(\"Unable to connect to server, either server is down or there is a problem\" +\r\n                        \" with your internet connection\");\r\n                }\r\n                else if (status === \"400\") {\r\n                    $(\".error\").html(\"Login is invalid. Login must be between 2-10 characters long, and contain only<br/>\" +\r\n                        \" english letters, numbers or _ (underscore) and - (dash) characters.\");\r\n                }\r\n                else if (status === \"409\") {\r\n                    $(\".error\").html(\"User with this login already exists in the system. Try a different one.\");\r\n                }\r\n                else if (status === \"503\") {\r\n                    $(\".error\").html(\"Server is down for maintenance. Please come at a later time.\");\r\n                }\r\n            }),\r\n            dataType: \"html\"\r\n        });\r\n    };\r\n    LogInService.prototype.getRegistrationForm = function (callback) {\r\n        $.ajax({\r\n            type: \"POST\",\r\n            url: \"/gemp-lotr/includes/registrationForm.html\",\r\n            cache: false,\r\n            async: false,\r\n            success: callback,\r\n            dataType: \"html\"\r\n        });\r\n    };\r\n    return LogInService;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://lotr-gemp-client/./src/temp-updated/communication/login.service.ts?");

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