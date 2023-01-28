/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Login/login.js":
/*!****************************!*\
  !*** ./src/Login/login.js ***!
  \****************************/
/***/ (() => {

eval("\r\nvar comm = new GempLotrCommunication(\"/gemp-lotr-server\", function () {\r\n    alert(\"Unable to contact the server\");\r\n});\r\n\r\nfunction register() {\r\n    var login = $(\"#login\").val();\r\n    var password = $(\"#password\").val();\r\n    var password2 = $(\"#password2\").val();\r\n    if (password != password2) {\r\n        $(\".error\").html(\"Password and Password repeated are different! Try again\");\r\n    } else {\r\n        comm.register(login, password, function () {\r\n                location.href = \"/gemp-lotr/hall.html\";\r\n            },\r\n            {\r\n                \"0\": function () {\r\n                    alert(\"Unable to connect to server, either server is down or there is a problem\" +\r\n                        \" with your internet connection\");\r\n                },\r\n                \"400\": function () {\r\n                    $(\".error\").html(\"Login is invalid. Login must be between 2-10 characters long, and contain only<br/>\" +\r\n                        \" english letters, numbers or _ (underscore) and - (dash) characters.\");\r\n                },\r\n                \"409\": function () {\r\n                    $(\".error\").html(\"User with this login already exists in the system. Try a different one.\");\r\n                },\r\n                \"503\": function () {\r\n                    $(\".error\").html(\"Server is down for maintenance. Please come at a later time.\");\r\n                }\r\n            });\r\n    }\r\n\r\n}\r\n\r\nfunction registrationScreen() {\r\n    comm.getRegistrationForm(\r\n        function (html) {\r\n            $(\".error\").html();\r\n            $(\".interaction\").html(html);\r\n            $(\"#registerButton\").button().click(register);\r\n        });\r\n}\r\n\r\nfunction login() {\r\n    var login = $(\"#login\").val();\r\n    var password = $(\"#password\").val();\r\n    comm.login(login, password, function () {\r\n            location.href = \"/gemp-lotr/hall.html\";\r\n        },\r\n        {\r\n            \"0\": function () {\r\n                alert(\"Unable to connect to server, either server is down or there is a problem\" +\r\n                    \" with your internet connection\");\r\n            },\r\n            \"401\": function () {\r\n                $(\".error\").html(\"Invalid username or password. Try again.\");\r\n                loginScreen();\r\n            },\r\n            \"403\": function () {\r\n                $(\".error\").html(\"You have been permanently banned. If you think it was a mistake you can try sending a private message to Merrick_H on <a href='http://lotrtcgwiki.com/forums/'>TLHH forums</a>.\");\r\n                $(\".interaction\").html(\"\");\r\n            },\r\n            \"409\": function () {\r\n                $(\".error\").html(\"You have been temporarily banned. You can try logging in at a later time. If you think it was a mistake you can try sending a private message to Merrick_H on <a href='http://lotrtcgwiki.com/forums/'>TLHH forums</a>.\");\r\n                $(\".interaction\").html(\"\");\r\n            },\r\n            \"503\": function () {\r\n                $(\".error\").html(\"Server is down for maintenance. Please come at a later time.\");\r\n            }\r\n        });\r\n}\r\n\r\nfunction loginScreen() {\r\n    $(\".interaction\").html(\"\");\r\n    $(\".interaction\").append(\"Login below, or \");\r\n    var registerButton = $(\"<div>Register</div>\").button();\r\n    registerButton.click(registrationScreen);\r\n\r\n    $(\".interaction\").append(registerButton);\r\n    $(\".interaction\").append(\"<br/>Login: <input id='login' type='text'><br/>Password: <input id='password' type='password'><br/>\");\r\n\r\n    var loginButton = $(\"<div>Login</div>\").button();\r\n    loginButton.click(login);\r\n\r\n    $(\"#password\").keypress(function (e) {\r\n        if (e.which == 13) {\r\n            login();\r\n            e.preventDefault();\r\n            return false;\r\n        }\r\n    });\r\n\r\n    $(\".interaction\").append(loginButton);\r\n}\r\n\r\n$(document).ready(\r\n    function () {\r\n        comm.getStatus(\r\n            function (html) {\r\n                $(\".status\").append(html);\r\n            });\r\n        loginScreen();\r\n    });\n\n//# sourceURL=webpack://lotr-gemp-client/./src/Login/login.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/Login/login.js"]();
/******/ 	
/******/ })()
;